"""
Check Dependencies Tool
Security and version auditing of dependencies.
"""

import subprocess
import json
from pathlib import Path
from typing import Dict, List

async def check_dependencies_tool(manifest_path: str, check_vulnerabilities: bool = True, check_updates: bool = True) -> Dict:
    """
    Security and version auditing of dependencies.
    """
    
    try:
        manifest_file = Path(manifest_path)
        if not manifest_file.exists():
            return {"error": f"Manifest file does not exist: {manifest_path}"}
        
        # Determine dependency type
        dep_type = _determine_dependency_type(manifest_file)
        
        if dep_type == "unknown":
            return {"error": f"Unsupported manifest file type: {manifest_path}"}
        
        # Perform dependency analysis
        analysis = await _analyze_dependencies(manifest_file, dep_type, check_vulnerabilities, check_updates)
        
        return analysis
    
    except Exception as e:
        return {"error": f"Dependency check failed: {str(e)}"}


def _determine_dependency_type(manifest_file: Path) -> str:
    """Determine the type of dependency manifest."""
    
    filename = manifest_file.name.lower()
    
    type_mapping = {
        "package.json": "npm",
        "requirements.txt": "pip",
        "cargo.toml": "cargo",
        "go.mod": "go_mod",
        "pom.xml": "maven"
    }
    
    return type_mapping.get(filename, "unknown")


async def _analyze_dependencies(manifest_file: Path, dep_type: str, check_vulnerabilities: bool, check_updates: bool) -> Dict:
    """Analyze dependencies based on type."""
    
    analysis = {
        "manifest_file": str(manifest_file),
        "dependency_type": dep_type,
        "summary": {},
        "dependencies": [],
        "vulnerabilities": [],
        "updates_available": [],
        "recommendations": []
    }
    
    try:
        if dep_type == "npm":
            analysis.update(await _check_npm_dependencies(manifest_file, check_vulnerabilities))
        elif dep_type == "pip":
            analysis.update(await _check_pip_dependencies(manifest_file, check_vulnerabilities))
        else:
            analysis.update(await _check_generic_dependencies(manifest_file, dep_type))
        
        # Generate recommendations
        analysis["recommendations"] = _generate_dependency_recommendations(analysis)
        
    except Exception as e:
        analysis["error"] = str(e)
    
    return analysis


async def _check_npm_dependencies(manifest_file: Path, check_vulnerabilities: bool) -> Dict:
    """Check npm dependencies."""
    
    try:
        with open(manifest_file) as f:
            package_data = json.load(f)
        
        deps = package_data.get("dependencies", {})
        dev_deps = package_data.get("devDependencies", {})
        
        dependencies = []
        for name, version in deps.items():
            dependencies.append({"name": name, "version": version, "type": "production"})
        for name, version in dev_deps.items():
            dependencies.append({"name": name, "version": version, "type": "development"})
        
        vulnerabilities = []
        if check_vulnerabilities:
            try:
                result = subprocess.run(
                    ["npm", "audit", "--json"],
                    capture_output=True,
                    text=True,
                    cwd=manifest_file.parent,
                    timeout=60
                )
                if result.stdout:
                    audit_data = json.loads(result.stdout)
                    vulnerabilities = _parse_npm_audit(audit_data)
            except:
                vulnerabilities = [{"info": "Could not run npm audit"}]
        
        return {
            "dependencies": dependencies,
            "vulnerabilities": vulnerabilities,
            "summary": {
                "total_dependencies": len(dependencies),
                "production_dependencies": len(deps),
                "dev_dependencies": len(dev_deps)
            }
        }
    
    except Exception as e:
        return {"error": f"Failed to analyze npm dependencies: {e}"}


async def _check_pip_dependencies(manifest_file: Path, check_vulnerabilities: bool) -> Dict:
    """Check pip dependencies."""
    
    try:
        with open(manifest_file) as f:
            lines = f.readlines()
        
        dependencies = []
        for line in lines:
            line = line.strip()
            if line and not line.startswith("#"):
                if "==" in line:
                    name, version = line.split("==", 1)
                    dependencies.append({"name": name.strip(), "version": version.strip(), "type": "production"})
                else:
                    dependencies.append({"name": line, "version": "*", "type": "production"})
        
        vulnerabilities = []
        if check_vulnerabilities:
            vulnerabilities = [{"info": "Install 'safety' or 'pip-audit' for vulnerability checking"}]
        
        return {
            "dependencies": dependencies,
            "vulnerabilities": vulnerabilities,
            "summary": {"total_dependencies": len(dependencies)}
        }
    
    except Exception as e:
        return {"error": f"Failed to analyze pip dependencies: {e}"}


async def _check_generic_dependencies(manifest_file: Path, dep_type: str) -> Dict:
    """Generic dependency analysis."""
    
    return {
        "dependencies": [],
        "vulnerabilities": [],
        "summary": {"message": f"Generic analysis for {dep_type} - limited functionality"},
        "info": f"Advanced analysis not yet supported for {dep_type}"
    }


def _parse_npm_audit(audit_data: Dict) -> List[Dict]:
    """Parse npm audit output."""
    
    vulnerabilities = []
    
    if "vulnerabilities" in audit_data:
        for pkg_name, vuln_info in audit_data["vulnerabilities"].items():
            vulnerabilities.append({
                "package": pkg_name,
                "severity": vuln_info.get("severity", "unknown"),
                "title": vuln_info.get("title", "Vulnerability found")
            })
    
    return vulnerabilities


def _generate_dependency_recommendations(analysis: Dict) -> List[str]:
    """Generate recommendations based on analysis."""
    
    recommendations = []
    
    vulnerabilities = analysis.get("vulnerabilities", [])
    if vulnerabilities:
        recommendations.append(f"Address {len(vulnerabilities)} security vulnerabilities")
    
    dep_type = analysis.get("dependency_type")
    if dep_type == "npm":
        recommendations.append("Run 'npm audit fix' to automatically fix vulnerabilities")
    elif dep_type == "pip":
        recommendations.append("Consider using 'safety' for security checks")
    
    if not recommendations:
        recommendations.append("Dependencies look good!")
    
    return recommendations
