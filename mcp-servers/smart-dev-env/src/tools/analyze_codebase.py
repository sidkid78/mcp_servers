"""
Analyze Codebase Tool
Perform static analysis and generate code metrics.
"""

import os
import pickle
import asyncio
from pathlib import Path
from typing import Dict, List, Tuple, Set
import re
import ast
from dataclasses import dataclass, field

# Global cache for file analysis results with file modification time.
FILE_CACHE_PATH = "analysis_cache.pkl"
FILE_ANALYSIS_CACHE: Dict[str, Dict] = {}
FILE_READ_SEMAPHORE = asyncio.Semaphore(10)

def load_cache() -> None:
    global FILE_ANALYSIS_CACHE
    if os.path.exists(FILE_CACHE_PATH):
        try:
            with open(FILE_CACHE_PATH, "rb") as f:
                FILE_ANALYSIS_CACHE = pickle.load(f)
        except Exception:
            FILE_ANALYSIS_CACHE = {}

def save_cache() -> None:
    with open(FILE_CACHE_PATH, "wb") as f:
        pickle.dump(FILE_ANALYSIS_CACHE, f)

@dataclass
class AnalysisConfig:
    max_line_length: int = 120
    indent_threshold: int = 24
    max_files_to_analyze: int = 50
    exclude_dirs: Set[str] = field(default_factory=lambda: {
        ".venv", "venv", "env", ".env",
        "node_modules", ".node_modules",
        ".git", ".svn", ".hg",
        "__pycache__", ".pytest_cache", ".mypy_cache",
        "build", "dist", ".build", ".dist",
        "target", "bin", "obj",
        ".idea", ".vscode", ".vs",
        "coverage", ".coverage", ".nyc_output",
        "logs", "log", ".logs",
        "tmp", "temp", ".tmp", ".temp"
    })
    complexity_thresholds: Dict[str, int] = field(default_factory=lambda: {
        "excellent": 5,
        "good": 10,
        "average": 15,
        "poor": 25,
        "bad": 40
    })
    complexity_score_map: List[Tuple[int, int]] = field(default_factory=lambda: [
        (5, 100),
        (10, 85),
        (15, 70),
        (25, 50),
        (40, 30)
    ])
    quality_issue_density_thresholds: Dict[str, float] = field(default_factory=lambda: {
        "excellent": 0.5,
        "good": 1,
        "average": 2,
        "poor": 4,
        "bad": 8
    })
    quality_score_map: List[Tuple[float, int]] = field(default_factory=lambda: [
        (0.5, 100),
        (1, 90),
        (2, 75),
        (4, 60),
        (8, 40)
    ])
    maintainability_lines_penalties: List[Tuple[float, int]] = field(default_factory=lambda: [
        (500, 25),
        (300, 15),
        (200, 8)
    ])
    maintainability_complexity_penalties: List[Tuple[float, int]] = field(default_factory=lambda: [
        (30, 35),
        (20, 25),
        (10, 10)
    ])
    maintainability_bonus: int = 5
    maintainability_bonus_conditions: Tuple[float, float] = (100, 8)
    rec_complexity_threshold_low: int = 60
    rec_complexity_threshold_medium: int = 80
    rec_quality_threshold: int = 70
    rec_maintainability_threshold: int = 70
    rec_effort_threshold_high: float = 20.0
    rec_effort_threshold_medium: float = 5.0
    rec_large_codebase_threshold: int = 100
    effort_estimates: Dict[str, float] = field(default_factory=lambda: {
        "hardcoded_secret": 0.5,
        "debug_code": 0.1,
        "todo_comment": 1.0,
        "deep_nesting": 2.0,
        "long_line": 0.1,
        "empty_catch": 0.5,
    })
    severity_weights: Dict[str, int] = field(default_factory=lambda: {"high": 3, "medium": 2, "low": 1})
    issue_priority_severity: Dict[str, int] = field(default_factory=lambda: {"high": 10, "medium": 5, "low": 1})
    issue_priority_type: Dict[str, int] = field(default_factory=lambda: {
        "hardcoded_secret": 10,
        "debug_code": 7,
        "empty_catch": 6,
        "deep_nesting": 5,
        "todo_comment": 2,
        "long_line": 1,
    })
    high_complexity_threshold: int = 20
    complexity_distribution_thresholds: List[Tuple[int, str]] = field(default_factory=lambda: [
        (5, "low"),
        (15, "medium"),
        (30, "high")
    ])

# Global configuration instance
CONFIG = AnalysisConfig()

async def analyze_codebase_tool(path: str, analysis_type: str = "full") -> Dict:
    """
    Perform static analysis and generate code metrics.
    """
    try:
        load_cache()  # Load cached analysis results before starting
        target_path = Path(path)
        if not target_path.exists():
            return {"error": f"Path does not exist: {path}"}

        if analysis_type == "complexity":
            result = await _analyze_complexity(target_path)
        elif analysis_type == "quality":
            result = await _analyze_quality(target_path)
        elif analysis_type == "security":
            result = await _analyze_security(target_path)
        else:  # full analysis
            result = await _analyze_full(target_path)

        save_cache()  # Persist cache after analysis
        return result

    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}

async def _analyze_full(target_path: Path) -> Dict:
    """Perform comprehensive codebase analysis."""
    analysis = {
        "summary": {},
        "metrics": {},
        "files": [],
        "issues": [],
        "recommendations": [],
    }

    # Discover source files
    source_files = []
    if target_path.is_file():
        source_files = [target_path]
    else:
        for ext in [
            ".py", ".js", ".ts", ".jsx", ".tsx", ".java",
            ".go", ".rs", ".cpp", ".h", ".c"
        ]:
            for file_path in target_path.rglob(f"*{ext}"):
                if not any(excluded in file_path.parts for excluded in CONFIG.exclude_dirs):
                    source_files.append(file_path)

    if not source_files:
        return {"error": "No source files found", "searched_path": str(target_path)}

    # Analyze files concurrently with caching and I/O throttling
    tasks = [
        asyncio.create_task(_cached_analyze_single_file(fp))
        for fp in source_files[:CONFIG.max_files_to_analyze]
    ]
    file_results = await asyncio.gather(*tasks, return_exceptions=True)

    total_lines = 0
    total_complexity = 0
    issues_found = []

    for file_path, file_analysis in zip(source_files, file_results):
        if isinstance(file_analysis, Exception):
            continue
        total_lines += file_analysis.get("lines", 0)
        total_complexity += file_analysis.get("complexity", 0)
        issues_found.extend(file_analysis.get("issues", []))
        analysis["files"].append({
            "path": str(file_path.relative_to(target_path.parent if target_path.is_file() else target_path)),
            "lines": file_analysis.get("lines", 0),
            "complexity": file_analysis.get("complexity", 0),
            "issues": len(file_analysis.get("issues", [])),
            "language": _detect_language(file_path),
        })

    analysis["summary"] = {
        "total_files": len(source_files),
        "analyzed_files": len(analysis["files"]),
        "total_lines": total_lines,
        "average_complexity": round(total_complexity / max(len(analysis["files"]), 1), 2),
        "languages_detected": list({f.get("language", "unknown") for f in analysis["files"]}),
    }

    analysis["metrics"] = {
        "complexity_score": _calculate_complexity_score(total_complexity, len(analysis["files"])),
        "quality_score": _calculate_quality_score(issues_found, total_lines),
        "maintainability": _calculate_maintainability_score(analysis["files"]),
        "technical_debt": _calculate_technical_debt(issues_found, total_lines),
    }

    analysis["issues"] = sorted(
        issues_found, key=lambda x: _get_issue_priority(x), reverse=True
    )[:15]

    analysis["recommendations"] = _generate_recommendations(
        analysis["metrics"], issues_found, analysis["summary"]
    )

    return analysis

async def _cached_analyze_single_file(file_path: Path) -> Dict:
    """Analyze a single file with caching and I/O throttling based on file mtime."""
    try:
        mtime = file_path.stat().st_mtime
    except Exception:
        mtime = 0
    key = str(file_path)
    cached = FILE_ANALYSIS_CACHE.get(key)
    if cached and cached.get("mtime") == mtime:
        return cached.get("result")
    async with FILE_READ_SEMAPHORE:
        result = await _analyze_single_file(file_path)
    FILE_ANALYSIS_CACHE[key] = {"mtime": mtime, "result": result}
    return result

async def _analyze_single_file(file_path: Path) -> Dict:
    """Analyze a single source file."""
    file_analysis = {
        "lines": 0,
        "complexity": 0,
        "issues": [],
        "functions": [],
        "classes": [],
    }
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()
        content = "".join(lines)

        # Count non-empty, non-comment lines
        code_lines = []
        for line in lines:
            stripped = line.strip()
            if stripped and not _is_comment_line(stripped, file_path.suffix):
                code_lines.append(line)
        file_analysis["lines"] = len(code_lines)

        # Calculate complexity
        file_analysis["complexity"] = _calculate_file_complexity(lines, file_path.suffix)

        # Find issues
        file_analysis["issues"] = _find_file_issues(file_path, lines)

        # Extract functions and classes
        file_analysis["functions"] = _extract_functions(content, file_path)
        file_analysis["classes"] = _extract_classes(content, file_path)

    except Exception as e:
        file_analysis["issues"].append({
            "type": "file_error",
            "file": str(file_path),
            "line": 0,
            "severity": "medium",
            "message": f"Could not analyze file: {e}",
        })

    return file_analysis

def _detect_language(file_path: Path) -> str:
    """Detect programming language from file extension."""
    ext_mapping = {
        ".py": "Python",
        ".js": "JavaScript",
        ".ts": "TypeScript",
        ".jsx": "React/JSX",
        ".tsx": "TypeScript React",
        ".java": "Java",
        ".go": "Go",
        ".rs": "Rust",
        ".cpp": "C++",
        ".c": "C",
        ".h": "C/C++ Header",
        ".cs": "C#",
        ".php": "PHP",
        ".rb": "Ruby",
        ".swift": "Swift",
        ".kt": "Kotlin",
    }
    return ext_mapping.get(file_path.suffix.lower(), "Unknown")

def _is_comment_line(line: str, file_ext: str) -> bool:
    """Check if a line is a comment."""
    comment_patterns = {
        ".py": ["#"],
        ".js": ["//", "/*"],
        ".ts": ["//", "/*"],
        ".jsx": ["//", "/*"],
        ".tsx": ["//", "/*"],
        ".java": ["//", "/*"],
        ".go": ["//", "/*"],
        ".rs": ["//", "/*"],
        ".cpp": ["//", "/*"],
        ".c": ["//", "/*"],
        ".h": ["//", "/*"],
    }
    patterns = comment_patterns.get(file_ext, ["#", "//"])
    return any(line.startswith(pattern) for pattern in patterns)

def _calculate_file_complexity(lines: List[str], file_ext: str) -> int:
    """Calculate cyclomatic complexity for a file."""
    if file_ext == ".py":
        source = "".join(lines)
        try:
            tree = ast.parse(source)
        except Exception:
            return 1
        complexity = 1  # Base complexity
        for node in ast.walk(tree):
            if isinstance(node, (ast.If, ast.For, ast.While, ast.Try, ast.BoolOp, ast.With)):
                complexity += 1
        return complexity
    else:
        complexity = 1  # Base complexity
        if file_ext in [".js", ".ts", ".jsx", ".tsx"]:
            indicators = [
                "if ", "else ", "for ",
                "while ", "switch ", "case ",
                "catch ", "&&", "||", "?"
            ]
        elif file_ext in [".java", ".cpp", ".c", ".cs"]:
            indicators = [
                "if ", "else ", "for ",
                "while ", "switch ", "case ",
                "catch ", "&&", "||", "?"
            ]
        elif file_ext == ".go":
            indicators = ["if ", "else ", "for ", "switch ", "case ", "select ", "&&", "||"]
        elif file_ext == ".rs":
            indicators = ["if ", "else ", "for ", "while ", "match ", "loop ", "&&", "||"]
        else:
            indicators = ["if ", "else", "for ", "while ", "switch", "case"]

        for line in lines:
            line_lower = line.lower().strip()
            for indicator in indicators:
                if indicator in line_lower:
                    complexity += 1
                    break  # Only count once per line
        return complexity

def _find_file_issues(file_path: Path, lines: List[str]) -> List[Dict]:
    """Find code quality issues in a file."""
    issues = []
    for i, line in enumerate(lines, 1):
        line_stripped = line.strip()
        # Long lines
        if len(line) > CONFIG.max_line_length:
            issues.append({
                "type": "long_line",
                "file": str(file_path),
                "line": i,
                "severity": "low",
                "message": f"Line too long ({len(line)} characters)",
                "suggestion": "Consider breaking long lines for better readability",
            })
        # TODO/FIXME comments
        if any(keyword in line_stripped.upper() for keyword in ["TODO", "FIXME", "HACK", "XXX"]):
            issues.append({
                "type": "todo_comment",
                "file": str(file_path),
                "line": i,
                "severity": "low",
                "message": "TODO/FIXME comment found",
                "suggestion": "Resolve or create issue to track this work",
            })
        # Potential debugging code
        debug_patterns = [
            "console.log", "print(", "debugger",
            "alert(", "dump(", "var_dump", "println!"
        ]
        if any(pattern in line_stripped for pattern in debug_patterns):
            issues.append({
                "type": "debug_code",
                "file": str(file_path),
                "line": i,
                "severity": "medium",
                "message": "Potential debugging code",
                "suggestion": "Remove debugging code before production",
            })
        # Hardcoded secrets (simple patterns)
        secret_patterns = [
            r'password\s*[=:]\s*["\'][^"\']{3,}["\']',
            r'api_key\s*[=:]\s*["\'][^"\']{10,}["\']',
            r'secret\s*[=:]\s*["\'][^"\']{5,}["\']',
            r'token\s*[=:]\s*["\'][^"\']{10,}["\']',
        ]
        for pattern in secret_patterns:
            if re.search(pattern, line_stripped, re.IGNORECASE):
                issues.append({
                    "type": "hardcoded_secret",
                    "file": str(file_path),
                    "line": i,
                    "severity": "high",
                    "message": "Potential hardcoded secret",
                    "suggestion": "Move secrets to environment variables or secure config",
                })
        # Deep nesting (excessive indentation)
        if (len(line) - len(line.lstrip())) > CONFIG.indent_threshold:
            issues.append({
                "type": "deep_nesting",
                "file": str(file_path),
                "line": i,
                "severity": "medium",
                "message": "Deeply nested code detected",
                "suggestion": "Consider extracting functions to reduce nesting",
            })
        # Empty catch blocks (simple detection)
        if (file_path.suffix in [".java", ".js", ".ts", ".cs"] and "catch" in line_stripped.lower()):
            if i < len(lines) and lines[i].strip() in ["{}", "}"]:
                issues.append({
                    "type": "empty_catch",
                    "file": str(file_path),
                    "line": i,
                    "severity": "medium",
                    "message": "Empty catch block",
                    "suggestion": "Add proper error handling or logging",
                })
    return issues

def _extract_functions(content: str, file_path: Path) -> List[Dict]:
    """Extract function definitions from content."""
    functions = []
    if file_path.suffix == ".py":
        try:
            tree = ast.parse(content)
            for node in ast.walk(tree):
                if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
                    functions.append({
                        "name": node.name,
                        "type": "function",
                        "line": node.lineno,
                        "arg_count": len(node.args.args) if hasattr(node, "args") else 0,
                    })
        except Exception:
            pass
    elif file_path.suffix in [".js", ".ts", ".jsx", ".tsx"]:
        patterns = [
            r"function\s+(\w+)\s*\(",
            r"(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>)",
            r"(\w+):\s*(?:async\s+)?function",
        ]
        for pattern in patterns:
            matches = re.finditer(pattern, content, re.MULTILINE)
            for match in matches:
                functions.append({
                    "name": match.group(1),
                    "type": "function",
                    "line": content[:match.start()].count("\n") + 1,
                })
    elif file_path.suffix == ".java":
        pattern = r"(?:public|private|protected)\s+(?:static\s+)?(?:\w+\s+)?(\w+)\s*\([^)]*\)\s*{"
        matches = re.finditer(pattern, content, re.MULTILINE)
        for match in matches:
            functions.append({
                "name": match.group(1),
                "type": "method",
                "line": content[:match.start()].count("\n") + 1,
            })
    return functions[:10]

def _extract_classes(content: str, file_path: Path) -> List[Dict]:
    """Extract class definitions from content."""
    classes = []
    if file_path.suffix == ".py":
        try:
            tree = ast.parse(content)
            for node in ast.walk(tree):
                if isinstance(node, ast.ClassDef):
                    classes.append({
                        "name": node.name,
                        "type": "class",
                        "line": node.lineno,
                    })
        except Exception:
            pass
    elif file_path.suffix in [".js", ".ts", ".jsx", ".tsx"]:
        pattern = r"class\s+(\w+)(?:\s+extends\s+\w+)?\s*{"
        matches = re.finditer(pattern, content, re.MULTILINE)
        for match in matches:
            classes.append({
                "name": match.group(1),
                "type": "class",
                "line": content[:match.start()].count("\n") + 1,
            })
    elif file_path.suffix == ".java":
        pattern = r"(?:public\s+)?class\s+(\w+)(?:\s+extends\s+\w+)?(?:\s+implements\s+[\w,\s]+)?\s*{"
        matches = re.finditer(pattern, content, re.MULTILINE)
        for match in matches:
            classes.append({
                "name": match.group(1),
                "type": "class",
                "line": content[:match.start()].count("\n") + 1,
            })
    return classes[:10]

def _calculate_complexity_score(total_complexity: int, file_count: int) -> int:
    """Calculate complexity score (0-100, higher is better)."""
    if file_count == 0:
        return 0
    avg_complexity = total_complexity / file_count
    for threshold, score in CONFIG.complexity_score_map:
        if avg_complexity <= threshold:
            return score
    return 10

def _calculate_quality_score(issues: List[Dict], total_lines: int) -> int:
    """Calculate quality score (0-100, higher is better)."""
    if total_lines == 0:
        return 0
    weighted_issues = sum(CONFIG.severity_weights.get(issue.get("severity", "low"), 1) for issue in issues)
    issue_density = (weighted_issues / total_lines) * 100
    for threshold, score in CONFIG.quality_score_map:
        if issue_density <= threshold:
            return score
    return 20

def _calculate_maintainability_score(files: List[Dict]) -> int:
    """Calculate maintainability score (0-100, higher is better)."""
    if not files:
        return 0
    avg_lines_per_file = sum(f.get("lines", 0) for f in files) / len(files)
    avg_complexity_per_file = sum(f.get("complexity", 0) for f in files) / len(files)
    score = 100
    for threshold, penalty in CONFIG.maintainability_lines_penalties:
        if avg_lines_per_file > threshold:
            score -= penalty
            break
    for threshold, penalty in CONFIG.maintainability_complexity_penalties:
        if avg_complexity_per_file > threshold:
            score -= penalty
            break
    if avg_lines_per_file < CONFIG.maintainability_bonus_conditions[0] and avg_complexity_per_file < CONFIG.maintainability_bonus_conditions[1]:
        score += CONFIG.maintainability_bonus
    return max(0, min(100, score))

def _calculate_technical_debt(issues: List[Dict], total_lines: int) -> Dict:
    """Calculate technical debt metrics."""
    debt_by_type = {}
    for issue in issues:
        issue_type = issue.get("type", "unknown")
        debt_by_type[issue_type] = debt_by_type.get(issue_type, 0) + 1
    total_effort = sum(
        debt_by_type.get(issue_type, 0) * CONFIG.effort_estimates.get(issue_type, 0.5)
        for issue_type in debt_by_type
    )
    return {
        "total_issues": len(issues),
        "issues_by_type": debt_by_type,
        "estimated_effort_hours": round(total_effort, 1),
        "debt_ratio": round((len(issues) / max(total_lines, 1)) * 1000, 2),
    }

def _get_issue_priority(issue: Dict) -> int:
    """Get priority score for sorting issues."""
    severity_score = CONFIG.issue_priority_severity.get(issue.get("severity", "low"), 1)
    type_score = CONFIG.issue_priority_type.get(issue.get("type", "unknown"), 1)
    return severity_score * type_score

def _generate_recommendations(metrics: Dict, issues: List[Dict], summary: Dict) -> List[str]:
    """Generate improvement recommendations."""
    recommendations = []
    complexity_score = metrics.get("complexity_score", 0)
    if complexity_score < CONFIG.rec_complexity_threshold_low:
        recommendations.append("🔄 Refactor complex functions - break them into smaller, focused functions")
    elif complexity_score < CONFIG.rec_complexity_threshold_medium:
        recommendations.append("📊 Monitor complexity - some functions are getting complex")
    quality_score = metrics.get("quality_score", 0)
    if quality_score < CONFIG.rec_quality_threshold:
        recommendations.append("🧹 Address code quality issues - prioritize high-severity problems")
    maintainability = metrics.get("maintainability", 0)
    if maintainability < CONFIG.rec_maintainability_threshold:
        recommendations.append("⚡ Improve maintainability - reduce file sizes and complexity")
    issue_types = {issue.get("type") for issue in issues}
    if "hardcoded_secret" in issue_types:
        recommendations.append("🔐 SECURITY: Move hardcoded secrets to environment variables immediately")
    if "debug_code" in issue_types:
        recommendations.append("🐛 Remove debugging code before deployment")
    if "deep_nesting" in issue_types:
        recommendations.append("📝 Reduce code nesting - extract helper functions")
    if "todo_comment" in issue_types:
        recommendations.append("📋 Create issues for TODO comments and resolve them")
    tech_debt = metrics.get("technical_debt", {})
    effort_hours = tech_debt.get("estimated_effort_hours", 0)
    if effort_hours > CONFIG.rec_effort_threshold_high:
        recommendations.append(f"⏰ High technical debt detected - {effort_hours} hours estimated to resolve")
    elif effort_hours > CONFIG.rec_effort_threshold_medium:
        recommendations.append(f"📈 Consider dedicating time to technical debt ({effort_hours} hours estimated)")
    total_files = summary.get("analyzed_files", 0)
    if total_files > CONFIG.rec_large_codebase_threshold:
        recommendations.append("📁 Large codebase - consider modularization and dependency management")
    if not recommendations or (complexity_score > 80 and quality_score > 80 and maintainability > 80):
        recommendations.append("✨ Code quality looks excellent! Consider adding automated quality gates")
    return recommendations

async def _analyze_complexity(target_path: Path) -> Dict:
    """Perform complexity-focused analysis."""
    full_analysis = await _analyze_full(target_path)
    high_complexity_files = [
        f for f in full_analysis["files"]
        if f.get("complexity", 0) > CONFIG.high_complexity_threshold
    ]
    return {
        "analysis_type": "complexity",
        "complexity_metrics": {
            "average_complexity": full_analysis["summary"].get("average_complexity", 0),
            "complexity_score": full_analysis["metrics"].get("complexity_score", 0),
            "high_complexity_files": high_complexity_files,
            "complexity_distribution": _get_complexity_distribution(full_analysis["files"]),
        },
        "recommendations": [
            rec for rec in full_analysis["recommendations"]
            if any(word in rec.lower() for word in ["complex", "refactor", "function"])
        ],
        "summary": f"Analyzed {len(full_analysis['files'])} files for complexity patterns",
    }

async def _analyze_quality(target_path: Path) -> Dict:
    """Perform quality-focused analysis."""
    full_analysis = await _analyze_full(target_path)
    return {
        "analysis_type": "quality",
        "quality_metrics": {
            "quality_score": full_analysis["metrics"].get("quality_score", 0),
            "total_issues": len(full_analysis["issues"]),
            "issue_breakdown": _count_issue_types(full_analysis["issues"]),
            "high_priority_issues": [issue for issue in full_analysis["issues"] if issue.get("severity") == "high"],
        },
        "issues": full_analysis["issues"],
        "recommendations": [
            rec for rec in full_analysis["recommendations"]
            if any(word in rec.lower() for word in ["quality", "issue", "clean", "debug"])
        ],
        "summary": f"Found {len(full_analysis['issues'])} quality issues across {len(full_analysis['files'])} files",
    }

async def _analyze_security(target_path: Path) -> Dict:
    """Perform security-focused analysis."""
    full_analysis = await _analyze_full(target_path)
    security_issues = [
        issue for issue in full_analysis["issues"]
        if issue.get("type") in ["hardcoded_secret", "empty_catch"] or issue.get("severity") == "high"
    ]
    return {
        "analysis_type": "security",
        "security_metrics": {
            "security_issues": len(security_issues),
            "risk_level": "high" if any(i.get("type") == "hardcoded_secret" for i in security_issues)
                          else "medium" if security_issues else "low",
            "vulnerability_types": list({i.get("type") for i in security_issues}),
        },
        "security_issues": security_issues,
        "recommendations": [
            "🔐 Implement secrets management (environment variables, key vaults)",
            "🛡️ Add security linting to CI/CD pipeline",
            "🔍 Regular security audits and dependency scanning",
            "📋 Establish security coding standards",
        ],
        "summary": f"Security analysis found {len(security_issues)} potential security issues",
    }

def _get_complexity_distribution(files: List[Dict]) -> Dict:
    """Get distribution of complexity across files."""
    distribution = {"low": 0, "medium": 0, "high": 0, "very_high": 0}
    for file_info in files:
        complexity = file_info.get("complexity", 0)
        if complexity <= CONFIG.complexity_distribution_thresholds[0][0]:
            distribution["low"] += 1
        elif complexity <= CONFIG.complexity_distribution_thresholds[1][0]:
            distribution["medium"] += 1
        elif complexity <= CONFIG.complexity_distribution_thresholds[2][0]:
            distribution["high"] += 1
        else:
            distribution["very_high"] += 1
    return distribution

def _count_issue_types(issues: List[Dict]) -> Dict[str, int]:
    """Count issues by type."""
    counts = {}
    for issue in issues:
        issue_type = issue.get("type", "unknown")
        counts[issue_type] = counts.get(issue_type, 0) + 1
    return counts
