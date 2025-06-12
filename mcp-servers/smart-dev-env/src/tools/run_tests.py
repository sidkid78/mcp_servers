"""
Run Tests Tool
Execute test suites with detailed reporting.
"""

import subprocess
from pathlib import Path
from typing import Dict, List
import json

async def run_tests_tool(test_path: str, test_type: str = "all", coverage: bool = True) -> Dict:
    """
    Execute test suites with detailed reporting.
    """
    
    try:
        # Validate test path
        target_path = Path(test_path)
        if not target_path.exists():
            return {"error": f"Test path does not exist: {test_path}"}
        
        # Detect test framework and run appropriate tests
        test_framework = await _detect_test_framework(target_path)
        
        if test_framework == "unknown":
            return {"error": "No supported test framework detected"}
        
        # Execute tests based on framework and type
        test_results = await _execute_tests(test_framework, target_path, test_type, coverage)
        
        return test_results
    
    except Exception as e:
        return {"error": f"Test execution failed: {str(e)}"}


async def _detect_test_framework(test_path: Path) -> str:
    """Detect the test framework being used."""
    
    # Check for common test framework indicators
    framework_indicators = {
        "pytest": ["pytest.ini", "conftest.py", "test_*.py", "*_test.py"],
        "jest": ["jest.config.js", "package.json"],
        "mocha": ["mocha.opts", ".mocharc.json"],
        "unittest": ["test*.py"],
        "go_test": ["*_test.go"],
        "cargo_test": ["Cargo.toml"],
        "maven": ["pom.xml"],
        "gradle": ["build.gradle"]
    }
    
    project_root = test_path if test_path.is_dir() else test_path.parent
    
    # Look for framework files
    for framework, indicators in framework_indicators.items():
        for indicator in indicators:
            if list(project_root.glob(indicator)) or list(project_root.rglob(indicator)):
                return framework
    
    # Check package.json for test scripts
    package_json = project_root / "package.json"
    if package_json.exists():
        try:
            with open(package_json) as f:
                package_data = json.load(f)
                test_script = package_data.get("scripts", {}).get("test", "")
                if "jest" in test_script:
                    return "jest"
                elif "mocha" in test_script:
                    return "mocha"
                else:
                    return "npm_test"
        except:
            pass
    
    return "unknown"


async def _execute_tests(framework: str, test_path: Path, test_type: str, coverage: bool) -> Dict:
    """Execute tests based on the detected framework."""
    
    results = {
        "framework": framework,
        "status": "unknown",
        "summary": {},
        "details": [],
        "coverage": {},
        "recommendations": []
    }
    
    try:
        if framework == "pytest":
            results = await _run_pytest(test_path, test_type, coverage)
        elif framework in ["jest", "npm_test"]:
            results = await _run_npm_tests(test_path, test_type, coverage)
        elif framework == "go_test":
            results = await _run_go_tests(test_path, test_type, coverage)
        elif framework == "cargo_test":
            results = await _run_cargo_tests(test_path, test_type, coverage)
        elif framework == "unittest":
            results = await _run_python_unittest(test_path, test_type, coverage)
        else:
            results = await _run_generic_tests(test_path, test_type)
        
        # Add recommendations based on results
        results["recommendations"] = _generate_test_recommendations(results)
        
    except Exception as e:
        results["status"] = "error"
        results["error"] = str(e)
    
    return results


async def _run_pytest(test_path: Path, test_type: str, coverage: bool) -> Dict:
    """Run pytest tests."""
    
    cmd = ["python", "-m", "pytest"]
    
    # Add coverage if requested
    if coverage:
        cmd.extend(["--cov=.", "--cov-report=term-missing"])
    
    # Add test type filters
    if test_type == "unit":
        cmd.extend(["-k", "unit"])
    elif test_type == "integration":
        cmd.extend(["-k", "integration"])
    
    # Add path
    cmd.append(str(test_path))
    
    # Add output format
    cmd.extend(["-v", "--tb=short"])
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, cwd=test_path.parent, timeout=300)
        
        return {
            "framework": "pytest",
            "status": "passed" if result.returncode == 0 else "failed",
            "summary": _parse_pytest_output(result.stdout, result.stderr),
            "details": result.stdout.split('\n')[-20:],  # Last 20 lines
            "coverage": _parse_pytest_coverage(result.stdout) if coverage else {},
            "exit_code": result.returncode
        }
    
    except subprocess.TimeoutExpired:
        return {"framework": "pytest", "status": "timeout", "error": "Tests timed out after 5 minutes"}
    except Exception as e:
        return {"framework": "pytest", "status": "error", "error": str(e)}


async def _run_npm_tests(test_path: Path, test_type: str, coverage: bool) -> Dict:
    """Run npm/jest tests."""
    
    cmd = ["npm", "test"]
    
    # Set environment variables for coverage
    env = {}
    if coverage:
        env["CI"] = "true"  # Many test runners enable coverage in CI mode
    
    try:
        result = subprocess.run(
            cmd, 
            capture_output=True, 
            text=True, 
            cwd=test_path.parent,
            timeout=300,
            env={**subprocess.os.environ, **env}
        )
        
        return {
            "framework": "npm/jest",
            "status": "passed" if result.returncode == 0 else "failed",
            "summary": _parse_npm_test_output(result.stdout, result.stderr),
            "details": result.stdout.split('\n')[-15:],
            "coverage": _parse_jest_coverage(result.stdout) if coverage else {},
            "exit_code": result.returncode
        }
    
    except subprocess.TimeoutExpired:
        return {"framework": "npm/jest", "status": "timeout", "error": "Tests timed out after 5 minutes"}
    except Exception as e:
        return {"framework": "npm/jest", "status": "error", "error": str(e)}


async def _run_go_tests(test_path: Path, test_type: str, coverage: bool) -> Dict:
    """Run Go tests."""
    
    cmd = ["go", "test"]
    
    if coverage:
        cmd.extend(["-cover", "-coverprofile=coverage.out"])
    
    cmd.extend(["-v", "./..."])
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, cwd=test_path.parent, timeout=300)
        
        return {
            "framework": "go_test",
            "status": "passed" if result.returncode == 0 else "failed",
            "summary": _parse_go_test_output(result.stdout, result.stderr),
            "details": result.stdout.split('\n')[-15:],
            "coverage": _parse_go_coverage(result.stdout) if coverage else {},
            "exit_code": result.returncode
        }
    
    except subprocess.TimeoutExpired:
        return {"framework": "go_test", "status": "timeout", "error": "Tests timed out after 5 minutes"}
    except Exception as e:
        return {"framework": "go_test", "status": "error", "error": str(e)}


async def _run_cargo_tests(test_path: Path, test_type: str, coverage: bool) -> Dict:
    """Run Rust/Cargo tests."""
    
    cmd = ["cargo", "test"]
    
    if test_type == "unit":
        cmd.append("--lib")
    elif test_type == "integration":
        cmd.append("--test")
    
    cmd.append("--verbose")
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, cwd=test_path.parent, timeout=300)
        
        return {
            "framework": "cargo_test",
            "status": "passed" if result.returncode == 0 else "failed",
            "summary": _parse_cargo_test_output(result.stdout, result.stderr),
            "details": result.stdout.split('\n')[-15:],
            "coverage": {},  # Rust coverage requires additional tools
            "exit_code": result.returncode
        }
    
    except subprocess.TimeoutExpired:
        return {"framework": "cargo_test", "status": "timeout", "error": "Tests timed out after 5 minutes"}
    except Exception as e:
        return {"framework": "cargo_test", "status": "error", "error": str(e)}


async def _run_python_unittest(test_path: Path, test_type: str, coverage: bool) -> Dict:
    """Run Python unittest tests."""
    
    cmd = ["python", "-m", "unittest", "discover"]
    
    if coverage:
        cmd = ["python", "-m", "coverage", "run", "-m", "unittest", "discover"]
    
    cmd.extend(["-s", str(test_path), "-v"])
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, cwd=test_path.parent, timeout=300)
        
        coverage_data = {}
        if coverage:
            # Run coverage report
            cov_result = subprocess.run(
                ["python", "-m", "coverage", "report"],
                capture_output=True, text=True, cwd=test_path.parent
            )
            coverage_data = _parse_coverage_report(cov_result.stdout)
        
        return {
            "framework": "unittest",
            "status": "passed" if result.returncode == 0 else "failed",
            "summary": _parse_unittest_output(result.stdout, result.stderr),
            "details": result.stdout.split('\n')[-15:],
            "coverage": coverage_data,
            "exit_code": result.returncode
        }
    
    except subprocess.TimeoutExpired:
        return {"framework": "unittest", "status": "timeout", "error": "Tests timed out after 5 minutes"}
    except Exception as e:
        return {"framework": "unittest", "status": "error", "error": str(e)}


async def _run_generic_tests(test_path: Path, test_type: str) -> Dict:
    """Run generic test discovery."""
    
    # Try to find and count test files
    test_files = []
    test_patterns = ["test_*.py", "*_test.py", "*.test.js", "test/*.js", "tests/*.py"]
    
    for pattern in test_patterns:
        test_files.extend(test_path.rglob(pattern))
    
    return {
        "framework": "generic",
        "status": "discovered",
        "summary": {
            "test_files_found": len(test_files),
            "message": "Test files discovered but no specific framework runner executed"
        },
        "details": [str(f) for f in test_files[:10]],
        "coverage": {},
        "recommendations": [
            "Install a test framework (pytest, jest, etc.)",
            "Configure test runner in package.json or requirements.txt"
        ]
    }


def _parse_pytest_output(stdout: str, stderr: str) -> Dict:
    """Parse pytest output for summary information."""
    
    import re
    
    summary = {"tests_run": 0, "passed": 0, "failed": 0, "skipped": 0}
    
    # Look for test results summary
    summary_match = re.search(r'(\d+) passed.*?(\d+) failed.*?(\d+) skipped', stdout)
    if summary_match:
        summary["passed"] = int(summary_match.group(1))
        summary["failed"] = int(summary_match.group(2))
        summary["skipped"] = int(summary_match.group(3))
        summary["tests_run"] = summary["passed"] + summary["failed"] + summary["skipped"]
    
    # Simple fallback parsing
    if summary["tests_run"] == 0:
        passed_matches = re.findall(r'PASSED', stdout)
        failed_matches = re.findall(r'FAILED', stdout)
        summary["passed"] = len(passed_matches)
        summary["failed"] = len(failed_matches)
        summary["tests_run"] = summary["passed"] + summary["failed"]
    
    return summary


def _parse_npm_test_output(stdout: str, stderr: str) -> Dict:
    """Parse npm test output."""
    
    import re
    
    summary = {"tests_run": 0, "passed": 0, "failed": 0}
    
    # Look for Jest-style output
    test_match = re.search(r'Tests:\s+(\d+) failed,\s+(\d+) passed,\s+(\d+) total', stdout)
    if test_match:
        summary["failed"] = int(test_match.group(1))
        summary["passed"] = int(test_match.group(2))
        summary["tests_run"] = int(test_match.group(3))
    
    return summary


def _parse_go_test_output(stdout: str, stderr: str) -> Dict:
    """Parse Go test output."""
    
    import re
    
    summary = {"tests_run": 0, "passed": 0, "failed": 0}
    
    # Count PASS and FAIL
    passed_matches = re.findall(r'PASS', stdout)
    failed_matches = re.findall(r'FAIL', stdout)
    
    summary["passed"] = len(passed_matches)
    summary["failed"] = len(failed_matches)
    summary["tests_run"] = summary["passed"] + summary["failed"]
    
    return summary


def _parse_cargo_test_output(stdout: str, stderr: str) -> Dict:
    """Parse Cargo test output."""
    
    import re
    
    summary = {"tests_run": 0, "passed": 0, "failed": 0}
    
    # Look for test result summary
    result_match = re.search(r'test result: (\w+)\. (\d+) passed; (\d+) failed', stdout)
    if result_match:
        summary["passed"] = int(result_match.group(2))
        summary["failed"] = int(result_match.group(3))
        summary["tests_run"] = summary["passed"] + summary["failed"]
    
    return summary


def _parse_unittest_output(stdout: str, stderr: str) -> Dict:
    """Parse unittest output."""
    
    import re
    
    summary = {"tests_run": 0, "passed": 0, "failed": 0, "errors": 0}
    
    # Look for unittest summary
    result_match = re.search(r'Ran (\d+) tests', stdout)
    if result_match:
        summary["tests_run"] = int(result_match.group(1))
    
    # Check for failures and errors
    if "FAILED" in stdout:
        fail_match = re.search(r'failures=(\d+)', stdout)
        error_match = re.search(r'errors=(\d+)', stdout)
        
        summary["failed"] = int(fail_match.group(1)) if fail_match else 0
        summary["errors"] = int(error_match.group(1)) if error_match else 0
        summary["passed"] = summary["tests_run"] - summary["failed"] - summary["errors"]
    else:
        summary["passed"] = summary["tests_run"]
    
    return summary


def _parse_pytest_coverage(stdout: str) -> Dict:
    """Parse pytest coverage output."""
    
    import re
    
    coverage = {"total_coverage": 0, "files": []}
    
    # Look for coverage percentage
    coverage_match = re.search(r'TOTAL.*?(\d+)%', stdout)
    if coverage_match:
        coverage["total_coverage"] = int(coverage_match.group(1))
    
    return coverage


def _parse_jest_coverage(stdout: str) -> Dict:
    """Parse Jest coverage output."""
    
    import re
    
    coverage = {"total_coverage": 0}
    
    # Look for coverage summary
    coverage_match = re.search(r'All files.*?(\d+\.?\d*)%', stdout)
    if coverage_match:
        coverage["total_coverage"] = float(coverage_match.group(1))
    
    return coverage


def _parse_go_coverage(stdout: str) -> Dict:
    """Parse Go coverage output."""
    
    import re
    
    coverage = {"total_coverage": 0}
    
    # Look for coverage percentage
    coverage_match = re.search(r'coverage: (\d+\.?\d*)% of statements', stdout)
    if coverage_match:
        coverage["total_coverage"] = float(coverage_match.group(1))
    
    return coverage


def _parse_coverage_report(stdout: str) -> Dict:
    """Parse generic coverage report."""
    
    import re
    
    coverage = {"total_coverage": 0}
    
    # Look for total coverage line
    coverage_match = re.search(r'TOTAL.*?(\d+)%', stdout)
    if coverage_match:
        coverage["total_coverage"] = int(coverage_match.group(1))
    
    return coverage


def _generate_test_recommendations(results: Dict) -> List[str]:
    """Generate recommendations based on test results."""
    
    recommendations = []
    
    status = results.get("status")
    summary = results.get("summary", {})
    coverage = results.get("coverage", {})
    
    # Based on test status
    if status == "failed":
        recommendations.append("Fix failing tests before proceeding with deployment")
        failed_count = summary.get("failed", 0)
        if failed_count > 0:
            recommendations.append(f"Address {failed_count} failing test(s)")
    
    elif status == "passed":
        recommendations.append("All tests passing - good to proceed")
    
    elif status == "timeout":
        recommendations.append("Optimize test performance - tests are taking too long")
    
    elif status == "discovered":
        recommendations.append("Set up a proper test runner for automated testing")
    
    # Based on coverage
    total_coverage = coverage.get("total_coverage", 0)
    if total_coverage > 0:
        if total_coverage < 50:
            recommendations.append("Increase test coverage - currently below 50%")
        elif total_coverage < 80:
            recommendations.append("Consider adding more tests to reach 80% coverage")
        else:
            recommendations.append("Excellent test coverage!")
    
    # Based on test count
    tests_run = summary.get("tests_run", 0)
    if tests_run == 0:
        recommendations.append("No tests found - consider adding unit tests")
    elif tests_run < 10:
        recommendations.append("Consider adding more comprehensive test coverage")
    
    return recommendations
