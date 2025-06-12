"""
Code Review Prompt
Multi-step code review workflow with quality gates.
"""

import subprocess
from pathlib import Path
from typing import Dict, List

async def code_review_prompt(target: str, severity: str = "thorough") -> str:
    """
    Execute a comprehensive code review workflow.
    This prompt composes multiple tools and guides the review process.
    """
    
    try:
        # Step 1: Analyze what we're reviewing
        review_scope = await _determine_review_scope(target)
        
        # Step 2: Run appropriate analysis based on severity
        analysis_results = await _run_analysis_pipeline(review_scope, severity)
        
        # Step 3: Generate review report
        review_report = await _generate_review_report(analysis_results, severity)
        
        # Step 4: Provide next steps
        next_steps = await _suggest_next_steps(analysis_results, severity)
        
        return f"""
🔍 **Code Review Complete: {target}**

**Review Scope:**
{review_scope['summary']}

**Analysis Results:**
{review_report}

**Quality Gates:**
{_format_quality_gates(analysis_results)}

**Recommendations:**
{_format_recommendations(analysis_results, severity)}

**Next Steps:**
{next_steps}

**Available Actions:**
• `analyze-codebase` - Deep dive into specific metrics
• `run-tests` - Execute test suite to verify quality
• `check-dependencies` - Security audit of dependencies
• `deploy-preview` - Deploy changes for testing
• `rollback-changes` - Revert if issues found

**Continue Review Workflow:**
• Run `/smart-dev/debug-investigation` if issues found
• Use `/smart-dev/refactor-planning` for improvement strategies
• Execute `/smart-dev/performance-audit` for optimization opportunities
"""
        
    except Exception as e:
        return f"❌ Code review failed: {str(e)}\n\nTry:\n• Verify target exists: {target}\n• Check git repository status\n• Run `/smart-dev/dev-setup` to initialize"


async def _determine_review_scope(target: str) -> Dict:
    """Determine what files/changes to review."""
    
    scope = {
        "type": "unknown",
        "files": [],
        "summary": "",
        "change_count": 0
    }
    
    try:
        # Check if target is a git reference
        if target in ['HEAD', 'main', 'master', 'develop']:
            scope = await _analyze_git_changes(target)
        elif Path(target).exists():
            scope = await _analyze_file_or_directory(target)
        else:
            scope = await _analyze_pattern(target)
            
    except Exception as e:
        scope["summary"] = f"Could not determine scope: {e}"
    
    return scope


async def _analyze_git_changes(target: str) -> Dict:
    """Analyze git changes for review."""
    
    try:
        if target == "HEAD":
            cmd = ["git", "diff", "--name-only", "HEAD~1", "HEAD"]
        else:
            cmd = ["git", "diff", "--name-only", target]
            
        result = subprocess.run(cmd, capture_output=True, text=True, cwd=".")
        
        if result.returncode == 0:
            files = [f.strip() for f in result.stdout.split('\n') if f.strip()]
            return {
                "type": "git_changes",
                "files": files,
                "change_count": len(files),
                "summary": f"Git changes in {target}: {len(files)} files modified"
            }
        else:
            return {
                "type": "error",
                "files": [],
                "change_count": 0,
                "summary": f"Git error: {result.stderr}"
            }
            
    except Exception as e:
        return {
            "type": "error",
            "files": [],
            "change_count": 0,
            "summary": f"Could not analyze git changes: {e}"
        }


async def _analyze_file_or_directory(target: str) -> Dict:
    """Analyze a specific file or directory."""
    
    target_path = Path(target)
    
    if target_path.is_file():
        return {
            "type": "single_file",
            "files": [target],
            "change_count": 1,
            "summary": f"Single file review: {target}"
        }
    elif target_path.is_dir():
        files = []
        for ext in ['.py', '.js', '.ts', '.jsx', '.tsx', '.java', '.go', '.rs']:
            files.extend(target_path.rglob(f'*{ext}'))
        
        file_list = [str(f) for f in files]
        return {
            "type": "directory",
            "files": file_list,
            "change_count": len(file_list),
            "summary": f"Directory review: {target} ({len(file_list)} source files)"
        }
    else:
        return {
            "type": "error",
            "files": [],
            "change_count": 0,
            "summary": f"Path not found: {target}"
        }


async def _analyze_pattern(target: str) -> Dict:
    """Analyze files matching a pattern."""
    
    try:
        import glob
        files = glob.glob(target, recursive=True)
        
        return {
            "type": "pattern",
            "files": files,
            "change_count": len(files),
            "summary": f"Pattern match: {target} ({len(files)} files)"
        }
    except Exception as e:
        return {
            "type": "error",
            "files": [],
            "change_count": 0,
            "summary": f"Pattern error: {e}"
        }


async def _run_analysis_pipeline(scope: Dict, severity: str) -> Dict:
    """Run analysis based on severity level."""
    
    results = {
        "complexity": {},
        "quality": {},
        "security": {},
        "tests": {}
    }
    
    files = scope.get("files", [])
    if not files:
        return results
    
    # Basic analysis
    results["complexity"] = await _analyze_complexity(files)
    results["quality"] = await _analyze_code_quality(files)
    
    # Additional analysis for thorough/critical
    if severity in ["thorough", "critical"]:
        results["security"] = await _analyze_security(files)
        results["tests"] = await _analyze_test_coverage(files)
    
    return results


async def _analyze_complexity(files: List[str]) -> Dict:
    """Analyze code complexity metrics."""
    
    complexity_data = {
        "high_complexity_files": [],
        "total_lines": 0,
        "file_count": len(files)
    }
    
    total_lines = 0
    complex_files = []
    
    for file_path in files[:10]:  # Limit for performance
        try:
            if Path(file_path).exists():
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    line_count = len([l for l in lines if l.strip() and not l.strip().startswith('#')])
                    total_lines += line_count
                    
                    complexity_score = _calculate_simple_complexity(lines)
                    
                    if complexity_score > 10:
                        complex_files.append({
                            "file": file_path,
                            "lines": line_count,
                            "complexity": complexity_score
                        })
        except Exception:
            continue
    
    complexity_data["high_complexity_files"] = complex_files
    complexity_data["total_lines"] = total_lines
    
    return complexity_data


def _calculate_simple_complexity(lines: List[str]) -> int:
    """Calculate a simple complexity score."""
    
    complexity = 0
    for line in lines:
        line = line.strip().lower()
        
        # Control flow adds complexity
        if any(keyword in line for keyword in ['if ', 'elif ', 'else:', 'for ', 'while ', 'try:', 'except:']):
            complexity += 1
        
        # Deep nesting adds complexity
        indentation = len(line) - len(line.lstrip())
        if indentation > 8:
            complexity += 1
        
        # Long lines suggest complexity
        if len(line) > 120:
            complexity += 1
    
    return complexity


async def _analyze_code_quality(files: List[str]) -> Dict:
    """Analyze code quality indicators."""
    
    quality_data = {
        "issues": [],
        "score": 0,
        "suggestions": []
    }
    
    issues = []
    
    for file_path in files[:5]:  # Limit for performance
        try:
            if Path(file_path).exists():
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    lines = f.readlines()
                    
                    file_issues = _check_quality_issues(file_path, lines)
                    issues.extend(file_issues)
                    
        except Exception:
            continue
    
    # Generate suggestions
    suggestions = []
    if any('long_line' in issue['type'] for issue in issues):
        suggestions.append("Consider using a code formatter like Prettier or Black")
    
    if any('todo' in issue['type'] for issue in issues):
        suggestions.append("Review and resolve TODO comments")
    
    if any('debug_code' in issue['type'] for issue in issues):
        suggestions.append("Remove debugging code before deployment")
    
    # Calculate quality score
    total_lines = sum(len(open(f, 'r', encoding='utf-8', errors='ignore').readlines()) 
                     for f in files[:5] if Path(f).exists())
    
    issue_density = len(issues) / max(total_lines, 1) * 100
    quality_score = max(0, 100 - issue_density * 10)
    
    quality_data["issues"] = issues
    quality_data["score"] = round(quality_score, 1)
    quality_data["suggestions"] = suggestions
    
    return quality_data


def _check_quality_issues(file_path: str, lines: List[str]) -> List[Dict]:
    """Check for common quality issues."""
    
    issues = []
    
    for i, line in enumerate(lines, 1):
        # Long lines
        if len(line) > 120:
            issues.append({
                "type": "long_line",
                "file": file_path,
                "line": i,
                "message": f"Line too long ({len(line)} characters)"
            })
        
        # TODO comments
        if 'todo' in line.lower():
            issues.append({
                "type": "todo",
                "file": file_path,
                "line": i,
                "message": "TODO comment found"
            })
        
        # Potential debugging code
        if any(debug in line.lower() for debug in ['console.log', 'print(', 'debugger']):
            issues.append({
                "type": "debug_code",
                "file": file_path,
                "line": i,
                "message": "Potential debugging code"
            })
    
    return issues


async def _analyze_security(files: List[str]) -> Dict:
    """Analyze potential security issues."""
    
    security_data = {
        "vulnerabilities": [],
        "risk_level": "low",
        "recommendations": []
    }
    
    vulnerabilities = []
    
    # Simple security pattern detection
    security_patterns = {
        'hardcoded_secrets': ['password.*=.*["\']', 'api_key.*=.*["\']', 'secret.*=.*["\']'],
        'sql_injection': ['SELECT.*WHERE.*=.*\\$', 'INSERT.*VALUES.*\\$'],
        'xss': ['innerHTML.*=', 'document\\.write\\('],
    }
    
    for file_path in files:
        try:
            if Path(file_path).exists():
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    
                    for vuln_type, patterns in security_patterns.items():
                        for pattern in patterns:
                            import re
                            if re.search(pattern, content, re.IGNORECASE):
                                vulnerabilities.append({
                                    "type": vuln_type,
                                    "file": file_path,
                                    "description": f"Potential {vuln_type.replace('_', ' ')} vulnerability"
                                })
        except Exception:
            continue
    
    # Determine risk level
    if any(v['type'] in ['sql_injection', 'xss', 'hardcoded_secrets'] for v in vulnerabilities):
        security_data["risk_level"] = "high"
    elif vulnerabilities:
        security_data["risk_level"] = "medium"
    
    security_data["vulnerabilities"] = vulnerabilities
    
    if vulnerabilities:
        security_data["recommendations"] = [
            "Run `check-dependencies` tool for dependency vulnerabilities",
            "Review code for input validation and sanitization"
        ]
    
    return security_data


async def _analyze_test_coverage(files: List[str]) -> Dict:
    """Analyze test coverage and test quality."""
    
    test_data = {
        "test_files": [],
        "coverage_estimate": 0,
        "recommendations": []
    }
    
    # Find test files
    test_files = []
    source_files = []
    
    for file_path in files:
        if any(pattern in file_path.lower() for pattern in ['test', 'spec', '__test__']):
            test_files.append(file_path)
        else:
            source_files.append(file_path)
    
    test_data["test_files"] = test_files
    
    # Rough coverage estimate
    if source_files:
        coverage_ratio = len(test_files) / len(source_files)
        coverage_estimate = min(coverage_ratio * 70, 90)  # Cap at 90%
        test_data["coverage_estimate"] = round(coverage_estimate, 1)
    
    # Generate recommendations
    recommendations = []
    if len(test_files) == 0:
        recommendations.append("No test files found - consider adding unit tests")
    elif coverage_estimate < 50:
        recommendations.append("Low test coverage - add more comprehensive tests")
    
    if test_files:
        recommendations.append("Run `run-tests` tool to execute test suite")
    
    test_data["recommendations"] = recommendations
    
    return test_data


async def _generate_review_report(analysis_results: Dict, severity: str) -> str:
    """Generate a formatted review report."""
    
    report_sections = []
    
    # Complexity Report
    complexity = analysis_results.get("complexity", {})
    if complexity:
        report_sections.append(f"""
📊 **Complexity Analysis:**
• Files analyzed: {complexity.get('file_count', 0)}
• Total lines: {complexity.get('total_lines', 0)}
• High complexity files: {len(complexity.get('high_complexity_files', []))}
""")
    
    # Quality Report
    quality = analysis_results.get("quality", {})
    if quality:
        score = quality.get("score", 0)
        score_emoji = "🟢" if score > 80 else "🟡" if score > 60 else "🔴"
        
        report_sections.append(f"""
{score_emoji} **Quality Score:** {score}/100
• Issues found: {len(quality.get('issues', []))}
• Suggestions: {len(quality.get('suggestions', []))}
""")
    
    # Security Report
    security = analysis_results.get("security", {})
    if security:
        risk_level = security.get("risk_level", "low")
        risk_emoji = "🔴" if risk_level == "high" else "🟡" if risk_level == "medium" else "🟢"
        
        report_sections.append(f"""
{risk_emoji} **Security Risk:** {risk_level.title()}
• Vulnerabilities: {len(security.get('vulnerabilities', []))}
""")
    
    # Test Coverage
    tests = analysis_results.get("tests", {})
    if tests:
        coverage = tests.get("coverage_estimate", 0)
        coverage_emoji = "🟢" if coverage > 80 else "🟡" if coverage > 50 else "🔴"
        
        report_sections.append(f"""
{coverage_emoji} **Test Coverage:** ~{coverage}%
• Test files: {len(tests.get('test_files', []))}
""")
    
    return '\n'.join(report_sections) if report_sections else "Analysis complete - no major issues detected."


def _format_quality_gates(analysis_results: Dict) -> str:
    """Format quality gate results."""
    
    gates = []
    
    quality = analysis_results.get("quality", {})
    quality_score = quality.get("score", 0)
    
    if quality_score >= 80:
        gates.append("✅ Code Quality: PASS")
    else:
        gates.append("❌ Code Quality: FAIL (needs improvement)")
    
    security = analysis_results.get("security", {})
    risk_level = security.get("risk_level", "low")
    
    if risk_level == "low":
        gates.append("✅ Security: PASS")
    else:
        gates.append(f"⚠️ Security: REVIEW NEEDED ({risk_level} risk)")
    
    tests = analysis_results.get("tests", {})
    coverage = tests.get("coverage_estimate", 0)
    
    if coverage >= 70:
        gates.append("✅ Test Coverage: PASS")
    elif coverage >= 40:
        gates.append("⚠️ Test Coverage: MARGINAL")
    else:
        gates.append("❌ Test Coverage: FAIL")
    
    return '\n'.join(gates) if gates else "No quality gates configured"


def _format_recommendations(analysis_results: Dict, severity: str) -> str:
    """Format actionable recommendations."""
    
    recommendations = []
    
    # Collect recommendations from all analyses
    for analysis_type, data in analysis_results.items():
        if isinstance(data, dict) and 'recommendations' in data:
            recommendations.extend(data['recommendations'])
        elif isinstance(data, dict) and 'suggestions' in data:
            recommendations.extend(data['suggestions'])
    
    if severity == "critical":
        recommendations.insert(0, "Critical review mode: Address all high-severity issues before deployment")
    
    # Deduplicate and format
    unique_recommendations = list(dict.fromkeys(recommendations))
    
    if unique_recommendations:
        return '\n'.join(f"• {rec}" for rec in unique_recommendations[:5])
    else:
        return "• Code looks good! Consider running performance audit next."


async def _suggest_next_steps(analysis_results: Dict, severity: str) -> str:
    """Suggest logical next steps based on review results."""
    
    steps = []
    
    quality = analysis_results.get("quality", {})
    security = analysis_results.get("security", {})
    tests = analysis_results.get("tests", {})
    
    quality_score = quality.get("score", 100)
    risk_level = security.get("risk_level", "low")
    coverage = tests.get("coverage_estimate", 100)
    
    if quality_score < 70:
        steps.append("🔧 Run `/smart-dev/refactor-planning` to improve code quality")
    
    if risk_level in ["medium", "high"]:
        steps.append("🔒 Investigate security issues with `check-dependencies` tool")
    
    if coverage < 50:
        steps.append("🧪 Add tests before deploying with `run-tests` tool")
    
    if quality_score >= 80 and risk_level == "low":
        steps.append("🚀 Ready for deployment! Use `deploy-preview` tool")
        steps.append("⚡ Consider `/smart-dev/performance-audit` for optimization")
    
    if not steps:
        steps = [
            "✨ Code review passed! Consider these options:",
            "• `deploy-preview` - Deploy to staging environment",
            "• `/smart-dev/performance-audit` - Optimize performance",
            "• `/smart-dev/architecture-analysis` - Review system design"
        ]
    
    return '\n'.join(steps)
