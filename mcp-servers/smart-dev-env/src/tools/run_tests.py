"""
Run Tests Tool
Execute test suites with detailed reporting.
"""

import subprocess
import json
import os
from pathlib import Path
from typing import Dict, List


async def run_tests_tool(
    test_path: str, test_type: str = "all", coverage: bool = True
) -> Dict:
    """
    Execute test suites with detailed reporting.
    """
    try:
        path = Path(test_path)
        if not path.exists():
            return {
                "error": f"Test path does not exist: {test_path}",
                "suggestion": "Verify the path to your test files or test directory",
            }

        # Detect test framework and choose appropriate runner
        framework = await _detect_test_framework(path)
        runners = {
            "pytest": _run_pytest,
            "unittest": _run_unittest,
            "jest": _run_jest,
        }
        if framework in runners:
            return await runners[framework](path, test_type, coverage)
        else:
            return await _run_generic_tests(path, test_type, coverage)
    except Exception as e:
        return {"error": f"Test execution failed: {str(e)}"}


async def _detect_test_framework(path: Path) -> str:
    """Detect the testing framework being used."""
    if (path / "pytest.ini").exists() or (path / "pyproject.toml").exists():
        return "pytest"
    if (path / "jest.config.js").exists() or (path / "package.json").exists():
        return "jest"
    test_files = list(path.rglob("test_*.py")) + list(path.rglob("*_test.py"))
    if test_files:
        return "unittest"
    return "generic"


def _execute_command(cmd: List[str], cwd: str, timeout: int = 300):
    """Helper to execute a shell command."""
    return subprocess.run(
        cmd, capture_output=True, text=True, cwd=cwd, timeout=timeout
    )


def _append_common_results(results: Dict, cmd: List[str], retcode: int, framework: str) -> Dict:
    """Append common execution details to the test results."""
    results["command_executed"] = " ".join(cmd)
    results["exit_code"] = retcode
    results["framework"] = framework
    return results


async def _run_pytest(path: Path, test_type: str, coverage: bool) -> Dict:
    """Run pytest with comprehensive reporting."""
    cmd = ["python", "-m", "pytest"]
    if coverage:
        cmd.extend(["--cov=.", "--cov-report=json", "--cov-report=term"])
    if test_type in {"unit", "integration", "e2e"}:
        cmd.extend(["-k", test_type])
    cmd.extend(["-v", "--tb=short", str(path)])
    try:
        result = _execute_command(cmd, str(path))
        test_results = await _parse_pytest_output(result.stdout, result.stderr)
        if coverage:
            test_results["coverage"] = await _parse_coverage_report(path)
        return _append_common_results(test_results, cmd, result.returncode, "pytest")
    except subprocess.TimeoutExpired:
        return {
            "error": "Test execution timed out (5 minutes)",
            "suggestion": "Tests may be hanging or taking too long",
        }
    except Exception as e:
        return {"error": f"Failed to run pytest: {str(e)}"}


async def _run_unittest(path: Path, test_type: str, coverage: bool) -> Dict:
    """Run Python unittest with reporting."""
    cmd = ["python", "-m", "unittest", "discover", "-s", str(path), "-v"]
    try:
        result = _execute_command(cmd, str(path))
        test_results = await _parse_unittest_output(result.stdout, result.stderr)
        return _append_common_results(test_results, cmd, result.returncode, "unittest")
    except Exception as e:
        return {"error": f"Failed to run unittest: {str(e)}"}


async def _run_jest(path: Path, test_type: str, coverage: bool) -> Dict:
    """Run Jest tests for JavaScript/TypeScript."""
    cmd = ["npm", "run", "test:coverage"] if coverage else ["npm", "test"]
    try:
        result = _execute_command(cmd, str(path))
        test_results = await _parse_jest_output(result.stdout, result.stderr)
        return _append_common_results(test_results, cmd, result.returncode, "jest")
    except Exception as e:
        return {"error": f"Failed to run Jest: {str(e)}"}


async def _run_generic_tests(path: Path, test_type: str, coverage: bool) -> Dict:
    """Run generic test discovery and execution."""
    patterns = ["test_*.py", "*_test.py", "*.test.js", "*.spec.js"]
    test_files = [f for pattern in patterns for f in path.rglob(pattern)]
    if not test_files:
        return {
            "error": "No test files found",
            "searched_patterns": patterns,
            "suggestion": "Create test files following standard naming conventions",
        }
    return {
        "framework": "generic",
        "test_files_found": len(test_files),
        "test_files": [str(f) for f in test_files[:10]],
        "message": "Test files detected but no specific framework found",
        "recommendations": [
            "Install pytest for Python testing: pip install pytest",
            "Install Jest for JavaScript testing: npm install --save-dev jest",
            "Add test configuration files (pytest.ini, jest.config.js)",
        ],
    }


async def _parse_pytest_output(stdout: str, stderr: str) -> Dict:
    """Parse pytest output for test results."""
    results = {
        "summary": {},
        "tests": [],
        "failures": [],
        "errors": [],
        "warnings": []
    }
    for line in stdout.splitlines():
        if " PASSED " in line:
            results["tests"].append({"name": line.split("::")[0], "status": "passed"})
        elif " FAILED " in line:
            results["tests"].append({"name": line.split("::")[0], "status": "failed"})
            results["failures"].append(line)
        elif " ERROR " in line:
            results["errors"].append(line)
        elif "warning" in line.lower():
            results["warnings"].append(line)

    for line in stdout.splitlines():
        if "passed" in line and "failed" in line:
            results["summary"]["raw"] = line
            break
        elif line.startswith("=") and "passed" in line:
            results["summary"]["raw"] = line
            break

    results["summary"]["total_tests"] = len(results["tests"])
    results["summary"]["passed"] = sum(1 for t in results["tests"] if t["status"] == "passed")
    results["summary"]["failed"] = sum(1 for t in results["tests"] if t["status"] == "failed")
    results["summary"]["errors"] = len(results["errors"])
    results["summary"]["warnings"] = len(results["warnings"])
    return results


async def _parse_unittest_output(stdout: str, stderr: str) -> Dict:
    """Parse unittest output for test results."""
    results = {"summary": {}, "tests": [], "failures": [], "errors": []}
    for line in stdout.splitlines():
        if line.startswith("test_"):
            if " ... ok" in line:
                results["tests"].append({"name": line.split()[0], "status": "passed"})
            elif " ... FAIL" in line:
                results["tests"].append({"name": line.split()[0], "status": "failed"})
                results["failures"].append(line)
            elif " ... ERROR" in line:
                results["errors"].append(line)

    for line in stdout.splitlines():
        if line.startswith("Ran "):
            results["summary"]["raw"] = line
            break

    results["summary"]["total_tests"] = len(results["tests"])
    results["summary"]["passed"] = sum(1 for t in results["tests"] if t["status"] == "passed")
    results["summary"]["failed"] = sum(1 for t in results["tests"] if t["status"] == "failed")
    results["summary"]["errors"] = len(results["errors"])
    return results


async def _parse_jest_output(stdout: str, stderr: str) -> Dict:
    """Parse Jest output for test results."""
    results = {"summary": {}, "tests": [], "failures": []}
    for line in stdout.splitlines():
        if " PASS " in line:
            results["tests"].append({"name": line.split()[-1], "status": "passed"})
        elif " FAIL " in line:
            results["tests"].append({"name": line.split()[-1], "status": "failed"})
            results["failures"].append(line)

    results["summary"]["total_tests"] = len(results["tests"])
    results["summary"]["passed"] = sum(1 for t in results["tests"] if t["status"] == "passed")
    results["summary"]["failed"] = sum(1 for t in results["tests"] if t["status"] == "failed")
    return results


async def _parse_coverage_report(path: Path) -> Dict:
    """Parse coverage report if available."""
    coverage_file = path / "coverage.json"
    if coverage_file.exists():
        try:
            with open(coverage_file, "r") as f:
                coverage_data = json.load(f)
            if "totals" in coverage_data:
                return {
                    "line_coverage": coverage_data["totals"].get("percent_covered", 0),
                    "lines_covered": coverage_data["totals"].get("covered_lines", 0),
                    "lines_total": coverage_data["totals"].get("num_statements", 0),
                    "files_analyzed": len(coverage_data.get("files", {})),
                }
        except Exception:
            pass
    return {
        "message": "Coverage data not available",
        "suggestion": "Install coverage.py: pip install coverage",
    }

if __name__ == "__main__":
    import asyncio
    result = asyncio.run(run_tests_tool("test_files"))
    print(result)
