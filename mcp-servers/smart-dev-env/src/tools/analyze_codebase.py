"""
Analyze Codebase Tool
Perform static analysis and generate code metrics.
"""

from pathlib import Path
from typing import Dict, List
import re

async def analyze_codebase_tool(path: str, analysis_type: str = "full") -> Dict:
    """
    Perform static analysis and generate code metrics.
    """
    
    try:
        # Validate path
        target_path = Path(path)
        if not target_path.exists():
            return {"error": f"Path does not exist: {path}"}
        
        # Perform analysis based on type
        if analysis_type == "complexity":
            return await _analyze_complexity(target_path)
        elif analysis_type == "quality":
            return await _analyze_quality(target_path)
        elif analysis_type == "security":
            return await _analyze_security(target_path)
        else:  # full analysis
            return await _analyze_full(target_path)
    
    except Exception as e:
        return {"error": f"Analysis failed: {str(e)}"}


async def _analyze_full(target_path: Path) -> Dict:
    """Perform comprehensive codebase analysis."""
    
    analysis = {
        "summary": {},
        "metrics": {},
        "files": [],
        "issues": [],
        "recommendations": []
    }
    
    # Discover files
    source_files = []
    if target_path.is_file():
        source_files = [target_path]
    else:
        # Common source file extensions
        extensions = ['.py', '.js', '.ts', '.jsx', '.tsx', '.java', '.go', '.rs', '.cpp', '.h', '.c']
        for ext in extensions:
            source_files.extend(target_path.rglob(f'*{ext}'))
    
    if not source_files:
        return {"error": "No source files found", "searched_path": str(target_path)}
    
    # Analyze each file
    total_lines = 0
    total_complexity = 0
    issues_found = []
    
    for file_path in source_files[:50]:  # Limit for performance
        try:
            file_analysis = await _analyze_single_file(file_path)
            total_lines += file_analysis.get("lines", 0)
            total_complexity += file_analysis.get("complexity", 0)
            issues_found.extend(file_analysis.get("issues", []))
            
            analysis["files"].append({
                "path": str(file_path.relative_to(target_path.parent if target_path.is_file() else target_path)),
                "lines": file_analysis.get("lines", 0),
                "complexity": file_analysis.get("complexity", 0),
                "issues": len(file_analysis.get("issues", [])),
                "language": _detect_language(file_path)
            })
        except Exception:
            continue
    
    # Generate summary
    analysis["summary"] = {
        "total_files": len(source_files),
        "analyzed_files": len(analysis["files"]),
        "total_lines": total_lines,
        "average_complexity": round(total_complexity / max(len(analysis["files"]), 1), 2),
        "languages_detected": list(set(f.get("language", "unknown") for f in analysis["files"]))
    }
    
    # Generate metrics
    analysis["metrics"] = {
        "complexity_score": _calculate_complexity_score(total_complexity, len(analysis["files"])),
        "quality_score": _calculate_quality_score(issues_found, total_lines),
        "maintainability": _calculate_maintainability_score(analysis["files"]),
        "technical_debt": _calculate_technical_debt(issues_found, total_lines)
    }
    
    # Extract top issues
    analysis["issues"] = sorted(issues_found, key=lambda x: _get_issue_priority(x), reverse=True)[:15]
    
    # Generate recommendations
    analysis["recommendations"] = _generate_recommendations(analysis["metrics"], issues_found, analysis["summary"])
    
    return analysis


async def _analyze_single_file(file_path: Path) -> Dict:
    """Analyze a single source file."""
    
    file_analysis = {
        "lines": 0,
        "complexity": 0,
        "issues": [],
        "functions": [],
        "classes": []
    }
    
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
        
        content = ''.join(lines)
        
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
            "message": f"Could not analyze file: {e}"
        })
    
    return file_analysis


def _detect_language(file_path: Path) -> str:
    """Detect programming language from file extension."""
    
    ext_mapping = {
        '.py': 'Python',
        '.js': 'JavaScript',
        '.ts': 'TypeScript',
        '.jsx': 'React/JSX',
        '.tsx': 'TypeScript React',
        '.java': 'Java',
        '.go': 'Go',
        '.rs': 'Rust',
        '.cpp': 'C++',
        '.c': 'C',
        '.h': 'C/C++ Header',
        '.cs': 'C#',
        '.php': 'PHP',
        '.rb': 'Ruby',
        '.swift': 'Swift',
        '.kt': 'Kotlin'
    }
    
    return ext_mapping.get(file_path.suffix.lower(), 'Unknown')


def _is_comment_line(line: str, file_ext: str) -> bool:
    """Check if a line is a comment."""
    
    comment_patterns = {
        '.py': ['#'],
        '.js': ['//', '/*'],
        '.ts': ['//', '/*'],
        '.jsx': ['//', '/*'],
        '.tsx': ['//', '/*'],
        '.java': ['//', '/*'],
        '.go': ['//', '/*'],
        '.rs': ['//', '/*'],
        '.cpp': ['//', '/*'],
        '.c': ['//', '/*'],
        '.h': ['//', '/*']
    }
    
    patterns = comment_patterns.get(file_ext, ['#', '//'])
    return any(line.startswith(pattern) for pattern in patterns)


def _calculate_file_complexity(lines: List[str], file_ext: str) -> int:
    """Calculate cyclomatic complexity for a file."""
    
    complexity = 1  # Base complexity
    
    # Language-specific complexity indicators
    if file_ext in ['.py']:
        indicators = ['if ', 'elif ', 'else:', 'for ', 'while ', 'try:', 'except:', 'with ', 'and ', 'or ']
    elif file_ext in ['.js', '.ts', '.jsx', '.tsx']:
        indicators = ['if ', 'else ', 'for ', 'while ', 'switch ', 'case ', 'catch ', '&&', '||', '?']
    elif file_ext in ['.java', '.cpp', '.c', '.cs']:
        indicators = ['if ', 'else ', 'for ', 'while ', 'switch ', 'case ', 'catch ', '&&', '||', '?']
    elif file_ext == '.go':
        indicators = ['if ', 'else ', 'for ', 'switch ', 'case ', 'select ', '&&', '||']
    elif file_ext == '.rs':
        indicators = ['if ', 'else ', 'for ', 'while ', 'match ', 'loop ', '&&', '||']
    else:
        indicators = ['if ', 'else', 'for ', 'while ', 'switch', 'case']
    
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
        if len(line) > 120:
            issues.append({
                "type": "long_line",
                "file": str(file_path),
                "line": i,
                "severity": "low",
                "message": f"Line too long ({len(line)} characters)",
                "suggestion": "Consider breaking long lines for better readability"
            })
        
        # TODO/FIXME comments
        if any(keyword in line_stripped.upper() for keyword in ['TODO', 'FIXME', 'HACK', 'XXX']):
            issues.append({
                "type": "todo_comment",
                "file": str(file_path),
                "line": i,
                "severity": "low",
                "message": "TODO/FIXME comment found",
                "suggestion": "Resolve or create issue to track this work"
            })
        
        # Potential debugging code
        debug_patterns = ['console.log', 'print(', 'debugger', 'alert(', 'dump(', 'var_dump', 'println!']
        if any(pattern in line_stripped for pattern in debug_patterns):
            issues.append({
                "type": "debug_code",
                "file": str(file_path),
                "line": i,
                "severity": "medium",
                "message": "Potential debugging code",
                "suggestion": "Remove debugging code before production"
            })
        
        # Hardcoded secrets (simple patterns)
        secret_patterns = [
            r'password\s*[=:]\s*["\'][^"\']{3,}["\']',
            r'api_key\s*[=:]\s*["\'][^"\']{10,}["\']',
            r'secret\s*[=:]\s*["\'][^"\']{5,}["\']',
            r'token\s*[=:]\s*["\'][^"\']{10,}["\']'
        ]
        
        for pattern in secret_patterns:
            if re.search(pattern, line_stripped, re.IGNORECASE):
                issues.append({
                    "type": "hardcoded_secret",
                    "file": str(file_path),
                    "line": i,
                    "severity": "high",
                    "message": "Potential hardcoded secret",
                    "suggestion": "Move secrets to environment variables or secure config"
                })
        
        # Deep nesting (excessive indentation)
        if len(line) - len(line.lstrip()) > 24:  # More than 6 levels of 4-space indentation
            issues.append({
                "type": "deep_nesting",
                "file": str(file_path),
                "line": i,
                "severity": "medium",
                "message": "Deeply nested code detected",
                "suggestion": "Consider extracting functions to reduce nesting"
            })
        
        # Empty catch blocks (simple detection)
        if file_path.suffix in ['.java', '.js', '.ts', '.cs'] and 'catch' in line_stripped.lower():
            # Look ahead for empty catch block
            if i < len(lines) and lines[i].strip() in ['{}', '}']:
                issues.append({
                    "type": "empty_catch",
                    "file": str(file_path),
                    "line": i,
                    "severity": "medium",
                    "message": "Empty catch block",
                    "suggestion": "Add proper error handling or logging"
                })
    
    return issues


def _extract_functions(content: str, file_path: Path) -> List[Dict]:
    """Extract function definitions from content."""
    
    functions = []
    
    # Python functions
    if file_path.suffix == '.py':
        pattern = r'def\s+(\w+)\s*\([^)]*\):'
        matches = re.finditer(pattern, content, re.MULTILINE)
        
        for match in matches:
            functions.append({
                "name": match.group(1),
                "type": "function",
                "line": content[:match.start()].count('\n') + 1
            })
    
    # JavaScript/TypeScript functions
    elif file_path.suffix in ['.js', '.ts', '.jsx', '.tsx']:
        patterns = [
            r'function\s+(\w+)\s*\(',
            r'(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?(?:function|\([^)]*\)\s*=>)',
            r'(\w+):\s*(?:async\s+)?function'
        ]
        
        for pattern in patterns:
            matches = re.finditer(pattern, content, re.MULTILINE)
            for match in matches:
                func_name = match.group(1)
                functions.append({
                    "name": func_name,
                    "type": "function",
                    "line": content[:match.start()].count('\n') + 1
                })
    
    # Java methods
    elif file_path.suffix == '.java':
        pattern = r'(?:public|private|protected)\s+(?:static\s+)?(?:\w+\s+)?(\w+)\s*\([^)]*\)\s*{'
        matches = re.finditer(pattern, content, re.MULTILINE)
        
        for match in matches:
            functions.append({
                "name": match.group(1),
                "type": "method",
                "line": content[:match.start()].count('\n') + 1
            })
    
    return functions[:10]  # Limit results


def _extract_classes(content: str, file_path: Path) -> List[Dict]:
    """Extract class definitions from content."""
    
    classes = []
    
    # Python classes
    if file_path.suffix == '.py':
        pattern = r'class\s+(\w+)(?:\([^)]*\))?:'
        matches = re.finditer(pattern, content, re.MULTILINE)
        
        for match in matches:
            classes.append({
                "name": match.group(1),
                "type": "class",
                "line": content[:match.start()].count('\n') + 1
            })
    
    # JavaScript/TypeScript classes
    elif file_path.suffix in ['.js', '.ts', '.jsx', '.tsx']:
        pattern = r'class\s+(\w+)(?:\s+extends\s+\w+)?\s*{'
        matches = re.finditer(pattern, content, re.MULTILINE)
        
        for match in matches:
            classes.append({
                "name": match.group(1),
                "type": "class",
                "line": content[:match.start()].count('\n') + 1
            })
    
    # Java classes
    elif file_path.suffix == '.java':
        pattern = r'(?:public\s+)?class\s+(\w+)(?:\s+extends\s+\w+)?(?:\s+implements\s+[\w,\s]+)?\s*{'
        matches = re.finditer(pattern, content, re.MULTILINE)
        
        for match in matches:
            classes.append({
                "name": match.group(1),
                "type": "class",
                "line": content[:match.start()].count('\n') + 1
            })
    
    return classes[:10]  # Limit results


def _calculate_complexity_score(total_complexity: int, file_count: int) -> int:
    """Calculate complexity score (0-100, higher is better)."""
    
    if file_count == 0:
        return 0
    
    avg_complexity = total_complexity / file_count
    
    # Score based on average complexity per file
    if avg_complexity <= 5:
        return 100
    elif avg_complexity <= 10:
        return 85
    elif avg_complexity <= 15:
        return 70
    elif avg_complexity <= 25:
        return 50
    elif avg_complexity <= 40:
        return 30
    else:
        return 10


def _calculate_quality_score(issues: List[Dict], total_lines: int) -> int:
    """Calculate quality score (0-100, higher is better)."""
    
    if total_lines == 0:
        return 0
    
    # Weight issues by severity
    severity_weights = {"high": 3, "medium": 2, "low": 1}
    weighted_issues = sum(severity_weights.get(issue.get("severity", "low"), 1) for issue in issues)
    
    # Calculate issue density (weighted issues per 100 lines)
    issue_density = (weighted_issues / total_lines) * 100
    
    # Score based on issue density
    if issue_density <= 0.5:
        return 100
    elif issue_density <= 1:
        return 90
    elif issue_density <= 2:
        return 75
    elif issue_density <= 4:
        return 60
    elif issue_density <= 8:
        return 40
    else:
        return 20


def _calculate_maintainability_score(files: List[Dict]) -> int:
    """Calculate maintainability score (0-100, higher is better)."""
    
    if not files:
        return 0
    
    # Factors affecting maintainability
    avg_lines_per_file = sum(f.get("lines", 0) for f in files) / len(files)
    avg_complexity_per_file = sum(f.get("complexity", 0) for f in files) / len(files)
    
    score = 100
    
    # Penalize large files
    if avg_lines_per_file > 500:
        score -= 25
    elif avg_lines_per_file > 300:
        score -= 15
    elif avg_lines_per_file > 200:
        score -= 8
    
    # Penalize high complexity
    if avg_complexity_per_file > 30:
        score -= 35
    elif avg_complexity_per_file > 20:
        score -= 25
    elif avg_complexity_per_file > 10:
        score -= 10
    
    # Bonus for good file organization
    if avg_lines_per_file < 100 and avg_complexity_per_file < 8:
        score += 5
    
    return max(0, min(100, score))


def _calculate_technical_debt(issues: List[Dict], total_lines: int) -> Dict:
    """Calculate technical debt metrics."""
    
    debt_by_type = {}
    for issue in issues:
        issue_type = issue.get("type", "unknown")
        if issue_type not in debt_by_type:
            debt_by_type[issue_type] = 0
        debt_by_type[issue_type] += 1
    
    # Estimate effort to fix (in hours)
    effort_estimates = {
        "hardcoded_secret": 0.5,
        "debug_code": 0.1,
        "todo_comment": 1.0,
        "deep_nesting": 2.0,
        "long_line": 0.1,
        "empty_catch": 0.5
    }
    
    total_effort = sum(
        debt_by_type.get(issue_type, 0) * effort_estimates.get(issue_type, 0.5)
        for issue_type in debt_by_type
    )
    
    return {
        "total_issues": len(issues),
        "issues_by_type": debt_by_type,
        "estimated_effort_hours": round(total_effort, 1),
        "debt_ratio": round((len(issues) / max(total_lines, 1)) * 1000, 2)  # Issues per 1000 lines
    }


def _get_issue_priority(issue: Dict) -> int:
    """Get priority score for sorting issues."""
    
    severity_scores = {"high": 10, "medium": 5, "low": 1}
    type_scores = {
        "hardcoded_secret": 10,
        "debug_code": 7,
        "empty_catch": 6,
        "deep_nesting": 5,
        "todo_comment": 2,
        "long_line": 1
    }
    
    severity_score = severity_scores.get(issue.get("severity", "low"), 1)
    type_score = type_scores.get(issue.get("type", "unknown"), 1)
    
    return severity_score * type_score


def _generate_recommendations(metrics: Dict, issues: List[Dict], summary: Dict) -> List[str]:
    """Generate improvement recommendations."""
    
    recommendations = []
    
    # Based on complexity
    complexity_score = metrics.get("complexity_score", 0)
    if complexity_score < 60:
        recommendations.append("🔄 Refactor complex functions - break them into smaller, focused functions")
    elif complexity_score < 80:
        recommendations.append("📊 Monitor complexity - some functions are getting complex")
    
    # Based on quality
    quality_score = metrics.get("quality_score", 0)
    if quality_score < 70:
        recommendations.append("🧹 Address code quality issues - prioritize high-severity problems")
    
    # Based on maintainability
    maintainability = metrics.get("maintainability", 0)
    if maintainability < 70:
        recommendations.append("⚡ Improve maintainability - reduce file sizes and complexity")
    
    # Based on specific issues
    issue_types = set(issue.get("type") for issue in issues)
    
    if "hardcoded_secret" in issue_types:
        recommendations.append("🔐 SECURITY: Move hardcoded secrets to environment variables immediately")
    
    if "debug_code" in issue_types:
        recommendations.append("🐛 Remove debugging code before deployment")
    
    if "deep_nesting" in issue_types:
        recommendations.append("📝 Reduce code nesting - extract helper functions")
    
    if "todo_comment" in issue_types:
        recommendations.append("📋 Create issues for TODO comments and resolve them")
    
    # Based on technical debt
    tech_debt = metrics.get("technical_debt", {})
    effort_hours = tech_debt.get("estimated_effort_hours", 0)
    
    if effort_hours > 20:
        recommendations.append(f"⏰ High technical debt detected - {effort_hours} hours estimated to resolve")
    elif effort_hours > 5:
        recommendations.append(f"📈 Consider dedicating time to technical debt ({effort_hours} hours estimated)")
    
    # Based on codebase size
    total_files = summary.get("analyzed_files", 0)
    if total_files > 100:
        recommendations.append("📁 Large codebase - consider modularization and dependency management")
    
    # Positive feedback
    if not recommendations or (complexity_score > 80 and quality_score > 80 and maintainability > 80):
        recommendations.append("✨ Code quality looks excellent! Consider adding automated quality gates")
    
    return recommendations


# Analysis type-specific functions
async def _analyze_complexity(target_path: Path) -> Dict:
    """Perform complexity-focused analysis."""
    
    full_analysis = await _analyze_full(target_path)
    
    high_complexity_files = [
        f for f in full_analysis["files"] 
        if f.get("complexity", 0) > 20
    ]
    
    return {
        "analysis_type": "complexity",
        "complexity_metrics": {
            "average_complexity": full_analysis["summary"].get("average_complexity", 0),
            "complexity_score": full_analysis["metrics"].get("complexity_score", 0),
            "high_complexity_files": high_complexity_files,
            "complexity_distribution": _get_complexity_distribution(full_analysis["files"])
        },
        "recommendations": [
            rec for rec in full_analysis["recommendations"] 
            if any(word in rec.lower() for word in ["complex", "refactor", "function"])
        ],
        "summary": f"Analyzed {len(full_analysis['files'])} files for complexity patterns"
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
            "high_priority_issues": [
                issue for issue in full_analysis["issues"] 
                if issue.get("severity") == "high"
            ]
        },
        "issues": full_analysis["issues"],
        "recommendations": [
            rec for rec in full_analysis["recommendations"] 
            if any(word in rec.lower() for word in ["quality", "issue", "clean", "debug"])
        ],
        "summary": f"Found {len(full_analysis['issues'])} quality issues across {len(full_analysis['files'])} files"
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
            "risk_level": "high" if any(i.get("type") == "hardcoded_secret" for i in security_issues) else "medium" if security_issues else "low",
            "vulnerability_types": list(set(i.get("type") for i in security_issues))
        },
        "security_issues": security_issues,
        "recommendations": [
            "🔐 Implement secrets management (environment variables, key vaults)",
            "🛡️ Add security linting to CI/CD pipeline", 
            "🔍 Regular security audits and dependency scanning",
            "📋 Establish security coding standards"
        ],
        "summary": f"Security analysis found {len(security_issues)} potential security issues"
    }


def _get_complexity_distribution(files: List[Dict]) -> Dict:
    """Get distribution of complexity across files."""
    
    distribution = {"low": 0, "medium": 0, "high": 0, "very_high": 0}
    
    for file_info in files:
        complexity = file_info.get("complexity", 0)
        if complexity <= 5:
            distribution["low"] += 1
        elif complexity <= 15:
            distribution["medium"] += 1
        elif complexity <= 30:
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
