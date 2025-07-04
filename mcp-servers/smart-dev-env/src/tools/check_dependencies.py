"""
Check Dependencies Tool
Security and version auditing of dependencies.
"""

import json
import sqlite3
import time
import aiohttp
from pathlib import Path
from typing import Dict, List

try:
    import toml
except ImportError:
    toml = None

# Global flag for cache initialization
_CACHE_INITIALIZED = False

# Module-level constants for dependency patterns and type mapping
DEPENDENCY_PATTERNS = [
    "package.json",
    "requirements.txt",
    "requirements-dev.txt",
    "pyproject.toml",
    "Pipfile",
    "cargo.toml",
    "go.mod",
    "pom.xml",
    "build.gradle",
    "composer.json",
]

DEPENDENCY_TYPE_MAPPING = {
    "package.json": "npm",
    "requirements.txt": "pip",
    "requirements-dev.txt": "pip",
    "pyproject.toml": "pyproject",
    "pipfile": "pipenv",
    "cargo.toml": "cargo",
    "go.mod": "go_mod",
    "pom.xml": "maven",
    "build.gradle": "gradle",
    "composer.json": "composer",
}


async def check_dependencies_tool(
    manifest_path: str, check_vulnerabilities: bool = True, check_updates: bool = True
) -> Dict:
    """
    Security and version auditing of dependencies.
    """
    try:
        path = Path(manifest_path)
        if path.is_dir():
            found_manifests = await _scan_for_dependency_files(path)
            if not found_manifests:
                return {
                    "error": f"No dependency files found in directory: {manifest_path}",
                    "searched_for": [
                        "package.json",
                        "requirements.txt",
                        "pyproject.toml",
                        "Pipfile",
                        "cargo.toml",
                        "go.mod",
                        "pom.xml",
                    ],
                    "suggestion": "Specify a direct path to a dependency file, or ensure dependency files exist",
                }
            results = []
            for manifest_file in found_manifests:
                result = await _analyze_single_manifest(
                    manifest_file, check_vulnerabilities, check_updates
                )
                results.append(result)
            return {
                "scan_type": "directory",
                "directory_scanned": str(path),
                "manifests_found": len(found_manifests),
                "results": results,
                "summary": _combine_analysis_results(results),
            }
        elif path.is_file():
            return await _analyze_single_manifest(path, check_vulnerabilities, check_updates)
        else:
            parent = path.parent if path.parent.exists() else Path.cwd()
            suggestions = await _scan_for_dependency_files(parent)
            return {
                "error": f"Path does not exist: {manifest_path}",
                "suggestion": "Did you mean one of these files?",
                "found_in_directory": [str(f) for f in suggestions],
                "help": "Use full path to an existing dependency file or directory containing dependency files",
            }
    except Exception as exc:
        return {"error": f"Dependency check failed: {str(exc)}"}


async def _scan_for_dependency_files(directory: Path) -> List[Path]:
    """Scan directory for common dependency files."""
    found = set()
    # Check current directory
    for pattern in DEPENDENCY_PATTERNS:
        found.update(directory.glob(pattern))
    # Check one-level subdirectories (ignoring hidden directories)
    for subdir in directory.iterdir():
        if subdir.is_dir() and not subdir.name.startswith("."):
            for pattern in DEPENDENCY_PATTERNS:
                found.update(subdir.glob(pattern))
    return list(found)


async def _analyze_single_manifest(
    manifest_file: Path, check_vulnerabilities: bool, check_updates: bool
) -> Dict:
    """Analyze a single manifest file."""
    dep_type = _determine_dependency_type(manifest_file)
    if dep_type == "unknown":
        return {
            "manifest_file": str(manifest_file),
            "error": f"Unsupported manifest file type: {manifest_file.name}",
            "supported_types": [
                "package.json",
                "requirements.txt",
                "pyproject.toml",
                "cargo.toml",
                "go.mod",
                "pom.xml",
            ],
        }
    return await _analyze_dependencies(manifest_file, dep_type, check_vulnerabilities, check_updates)


def _combine_analysis_results(results: List[Dict]) -> Dict:
    """Combine multiple analysis results into a summary."""
    total_deps = sum(result.get("summary", {}).get("total_dependencies", 0) for result in results)
    total_vulns = sum(len(result.get("vulnerabilities", [])) for result in results)
    dep_types = {result.get("dependency_type") for result in results if result.get("dependency_type")}
    return {
        "total_manifest_files": len(results),
        "dependency_types_found": list(dep_types),
        "total_dependencies": total_deps,
        "total_vulnerabilities": total_vulns,
        "status": "completed",
    }


def _determine_dependency_type(manifest_file: Path) -> str:
    """Determine the type of dependency manifest."""
    filename = manifest_file.name.lower()
    return DEPENDENCY_TYPE_MAPPING.get(filename, "unknown")


async def _analyze_dependencies(
    manifest_file: Path, dep_type: str, check_vulnerabilities: bool, check_updates: bool
) -> Dict:
    """Analyze dependencies based on type."""
    analysis = {
        "manifest_file": str(manifest_file),
        "dependency_type": dep_type,
        "summary": {},
        "dependencies": [],
        "vulnerabilities": [],
        "updates_available": [],
        "recommendations": [],
    }
    try:
        if dep_type == "npm":
            analysis.update(await _check_npm_dependencies(manifest_file, check_vulnerabilities))
        elif dep_type == "pip":
            analysis.update(await _check_pip_dependencies(manifest_file, check_vulnerabilities))
        else:
            analysis.update(await _check_generic_dependencies(manifest_file, dep_type))
        analysis["recommendations"] = _generate_dependency_recommendations(analysis)
    except Exception as exc:
        analysis["error"] = str(exc)
    return analysis


async def _check_npm_dependencies(manifest_file: Path, check_vulnerabilities: bool) -> Dict:
    """Check npm dependencies with OSS Index vulnerability data and lockfile parsing."""
    try:
        lockfile_path = manifest_file.parent / "package-lock.json"
        dependencies = []
        if lockfile_path.exists():
            with open(lockfile_path) as lf:
                lock_data = json.load(lf)
            for name, info in lock_data.get("dependencies", {}).items():
                version = info.get("version", "")
                dependencies.append({"name": name, "version": version, "type": "production"})
        else:
            with open(manifest_file) as f:
                package_data = json.load(f)
            for name, version in package_data.get("dependencies", {}).items():
                dependencies.append({"name": name, "version": version, "type": "production"})
            for name, version in package_data.get("devDependencies", {}).items():
                dependencies.append({"name": name, "version": version, "type": "development"})

        vulnerabilities = []
        if check_vulnerabilities:
            for dep in dependencies:
                vuln_info = await _fetch_vulnerability_data(dep["name"], dep["version"], "npm")
                if vuln_info:
                    vulnerabilities.extend(vuln_info)
        return {
            "dependencies": dependencies,
            "vulnerabilities": vulnerabilities,
            "summary": {
                "total_dependencies": len(dependencies),
                "production_dependencies": len([d for d in dependencies if d["type"] == "production"]),
                "dev_dependencies": len([d for d in dependencies if d["type"] == "development"]),
            },
        }
    except Exception as exc:
        return {"error": f"Failed to analyze npm dependencies: {exc}"}


async def _check_pip_dependencies(manifest_file: Path, check_vulnerabilities: bool) -> Dict:
    """Check pip dependencies using exact versions from Pipfile.lock if available and external vulnerability API."""
    try:
        lockfile_path = manifest_file.parent / "Pipfile.lock"
        dependencies = []
        if lockfile_path.exists():
            with open(lockfile_path) as f:
                lock_data = json.load(f)
            for name, info in lock_data.get("default", {}).items():
                version = info.get("version", "").lstrip("==")
                dependencies.append({"name": name, "version": version, "type": "production"})
            for name, info in lock_data.get("develop", {}).items():
                version = info.get("version", "").lstrip("==")
                dependencies.append({"name": name, "version": version, "type": "development"})
        else:
            with open(manifest_file) as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith("#"):
                        if "==" in line:
                            name, version = line.split("==", 1)
                            dependencies.append({"name": name.strip(), "version": version.strip(), "type": "production"})
                        else:
                            dependencies.append({"name": line, "version": "*", "type": "production"})

        vulnerabilities = []
        if check_vulnerabilities:
            for dep in dependencies:
                vuln_info = await _fetch_vulnerability_data(dep["name"], dep["version"], "pypi")
                if vuln_info:
                    vulnerabilities.extend(vuln_info)
        return {
            "dependencies": dependencies,
            "vulnerabilities": vulnerabilities,
            "summary": {"total_dependencies": len(dependencies)},
        }
    except Exception as exc:
        return {"error": f"Failed to analyze pip dependencies: {exc}"}


async def _check_generic_dependencies(manifest_file: Path, dep_type: str) -> Dict:
    """Enhanced generic dependency analysis with lockfile support and vulnerability API integration."""
    result = {
        "summary": {"message": f"Enhanced analysis for {dep_type}"},
        "dependencies": [],
        "vulnerabilities": [],
        "updates_available": [],
    }
    try:
        if dep_type == "pyproject":
            lockfile_path = manifest_file.parent / "poetry.lock"
            dependencies_list = []
            if lockfile_path.exists() and toml:
                with open(lockfile_path, "r") as f:
                    lock_data = toml.load(f)
                for pkg in lock_data.get("package", []):
                    dependencies_list.append(f"{pkg.get('name')}=={pkg.get('version')}")
            else:
                with open(manifest_file, "r") as f:
                    pyproject_data = toml.load(f)
                if "project" in pyproject_data and "dependencies" in pyproject_data["project"]:
                    dependencies_list.extend(pyproject_data["project"]["dependencies"])
                if "tool" in pyproject_data and "poetry" in pyproject_data["tool"]:
                    poetry_deps = pyproject_data["tool"]["poetry"].get("dependencies", {})
                    dependencies_list.extend(
                        [f"{k}=={v}" if isinstance(v, str) else k for k, v in poetry_deps.items() if k != "python"]
                    )
            result["dependencies"] = [
                {
                    "name": dep.split("==")[0].split(">=")[0].split("~=")[0],
                    "version": dep.split("==")[1] if "==" in dep else "unknown",
                    "source": dep,
                }
                for dep in dependencies_list
            ]
            result["summary"]["total_dependencies"] = len(dependencies_list)
            result["summary"]["message"] = f"Found {len(dependencies_list)} Python dependencies in pyproject.toml/poetry.lock"
            vulnerabilities = []
            for dep in dependencies_list:
                pkg_name = dep.split("==")[0].split(">=")[0].split("~=")[0]
                version = dep.split("==")[1] if "==" in dep else "unknown"
                vuln_info = await _fetch_vulnerability_data(pkg_name, version, "pypi")
                if vuln_info:
                    vulnerabilities.extend(vuln_info)
            result["vulnerabilities"] = vulnerabilities
        else:
            result["summary"]["message"] = f"Basic analysis for {dep_type} - limited functionality"
    except Exception as exc:
        result["summary"]["message"] = f"Analysis failed: {exc}"
    return result


def _generate_dependency_recommendations(analysis: Dict) -> List[str]:
    """Generate recommendations based on analysis."""
    recommendations = []
    vulnerabilities = analysis.get("vulnerabilities", [])
    if vulnerabilities:
        recommendations.append(f"Address {len(vulnerabilities)} security vulnerabilities")
    dep_type = analysis.get("dependency_type")
    if dep_type == "npm":
        recommendations.append("Review npm package vulnerabilities and update as needed")
    elif dep_type == "pip":
        recommendations.append("Review Python package vulnerabilities and update as needed")
    if not recommendations:
        recommendations.append("Dependencies look good!")
    return recommendations


def _init_vuln_cache():
    global _CACHE_INITIALIZED
    try:
        with sqlite3.connect("vuln_cache.db") as conn:
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS vulnerabilities (
                    package TEXT,
                    version TEXT,
                    ecosystem TEXT,
                    data TEXT,
                    timestamp INTEGER,
                    PRIMARY KEY (package, version, ecosystem)
                )
                """
            )
            conn.commit()
        _CACHE_INITIALIZED = True
    except Exception:
        _CACHE_INITIALIZED = False


def _get_cached_vulnerability(package: str, version: str, ecosystem: str):
    try:
        with sqlite3.connect("vuln_cache.db") as conn:
            cur = conn.cursor()
            cur.execute(
                "SELECT data, timestamp FROM vulnerabilities WHERE package=? AND version=? AND ecosystem=?",
                (package, version, ecosystem),
            )
            row = cur.fetchone()
            if row:
                data_str, timestamp_val = row
                if time.time() - timestamp_val < 86400:  # TTL of 1 day
                    return json.loads(data_str)
    except Exception:
        pass
    return None


def _store_vulnerability_cache(package: str, version: str, ecosystem: str, vulnerabilities: List[Dict]):
    try:
        with sqlite3.connect("vuln_cache.db") as conn:
            conn.execute(
                "REPLACE INTO vulnerabilities (package, version, ecosystem, data, timestamp) VALUES (?, ?, ?, ?, ?)",
                (package, version, ecosystem, json.dumps(vulnerabilities), int(time.time())),
            )
            conn.commit()
    except Exception:
        pass


async def _fetch_vulnerability_data(package: str, version: str, ecosystem: str) -> List[Dict]:
    """
    Fetch vulnerability data from external APIs (e.g., OSS Index) and cache the results.
    """
    global _CACHE_INITIALIZED
    if not _CACHE_INITIALIZED:
        _init_vuln_cache()

    cached = _get_cached_vulnerability(package, version, ecosystem)
    if cached is not None:
        return cached

    coordinate = f"pkg:{ecosystem}/{package}@{version}"
    vulnerabilities = []
    try:
        async with aiohttp.ClientSession() as session:
            url = "https://ossindex.sonatype.org/api/v3/component-report"
            payload = [{"coordinates": coordinate}]
            async with session.post(url, json=payload) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    if data and len(data) > 0:
                        vulnerabilities = data[0].get("vulnerabilities", [])
                else:
                    vulnerabilities = [{"info": f"API request failed with status {resp.status}"}]
    except Exception as exc:
        vulnerabilities = [{"info": f"API request error: {exc}"}]

    _store_vulnerability_cache(package, version, ecosystem, vulnerabilities)
    return vulnerabilities
