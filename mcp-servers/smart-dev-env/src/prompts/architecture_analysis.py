"""
Architecture Analysis Prompt
Guided architecture decision trees and recommendations.
"""

from pathlib import Path
from typing import Dict, List

async def architecture_analysis_prompt(component: str, focus: str = "maintainability") -> str:
    """
    Analyze system architecture and provide guided recommendations.
    """
    
    try:
        project_analysis = await _analyze_project_architecture()
        component_analysis = await _analyze_component(component, project_analysis)
        focused_analysis = await _apply_architectural_focus(component_analysis, focus)
        recommendations = await _generate_architecture_recommendations(focused_analysis, focus)
        
        return f"""
🏛️ **Architecture Analysis: {component or 'Full System'}**

**Project Overview:**
{project_analysis['summary']}

**Component Analysis:**
{component_analysis['details']}

**{focus.title()} Assessment:**
{focused_analysis['assessment']}

**Architecture Patterns:**
{_format_patterns(focused_analysis['patterns'])}

**Recommendations:**
{_format_recommendations(recommendations['immediate'])}

**Strategic Improvements:**
{_format_recommendations(recommendations['strategic'])}

**Next Steps:**
{_suggest_architecture_next_steps(focused_analysis, focus)}

**Available Tools:**
• `analyze-codebase` - Deep dive into code structure
• `generate-docs` - Create architecture documentation
• `check-dependencies` - Analyze external dependencies

**Related Workflows:**
• `/smart-dev/refactor-planning` - Plan architectural refactoring
• `/smart-dev/performance-audit` - Assess performance implications
• `/smart-dev/code-review` - Review implementation quality
"""
        
    except Exception as e:
        return f"❌ Architecture analysis failed: {str(e)}"


async def _analyze_project_architecture() -> Dict:
    """Analyze overall project architecture."""
    
    try:
        patterns = await _detect_architectural_patterns()
        layers = await _identify_architectural_layers()
        components = await _identify_key_components()
        
        return {
            "type": patterns["primary_pattern"],
            "layers": layers,
            "components": components,
            "summary": f"{patterns['primary_pattern']} architecture with {len(layers)} layers and {len(components)} components"
        }
    except Exception as e:
        return {"summary": f"Could not analyze architecture: {e}"}


async def _detect_architectural_patterns() -> Dict:
    """Detect common architectural patterns."""
    
    pattern_indicators = {
        "MVC": ["models", "views", "controllers"],
        "Frontend": ["src", "public", "components"],
        "Backend API": ["routes", "api", "controllers"],
        "Microservices": ["services", "gateway"],
        "Monolithic": ["src", "lib", "app"]
    }
    
    detected = []
    for pattern_name, indicators in pattern_indicators.items():
        matches = sum(1 for indicator in indicators if Path(indicator).exists())
        if matches > 0:
            detected.append({"pattern": pattern_name, "confidence": matches / len(indicators) * 100})
    
    detected.sort(key=lambda x: x["confidence"], reverse=True)
    
    return {
        "primary_pattern": detected[0]["pattern"] if detected else "Unknown",
        "confidence": detected[0]["confidence"] if detected else 0
    }


async def _identify_architectural_layers() -> List[Dict]:
    """Identify architectural layers."""
    
    layer_patterns = {
        "presentation": ["views", "ui", "components", "frontend"],
        "application": ["controllers", "routes", "api", "services"],
        "business": ["models", "domain", "logic"],
        "data": ["data", "database", "repositories"],
        "infrastructure": ["config", "utils", "lib"]
    }
    
    layers = []
    for layer_name, patterns in layer_patterns.items():
        layer_dirs = [p for p in patterns if Path(p).exists()]
        if layer_dirs:
            layers.append({"name": layer_name, "directories": layer_dirs})
    
    return layers


async def _identify_key_components() -> List[Dict]:
    """Identify key components."""
    
    components = []
    
    config_files = {
        "package.json": "Node.js",
        "requirements.txt": "Python",
        "Cargo.toml": "Rust",
        "go.mod": "Go"
    }
    
    for config_file, tech in config_files.items():
        if Path(config_file).exists():
            components.append({"name": config_file, "type": tech})
    
    return components


async def _analyze_component(component: str, project_analysis: Dict) -> Dict:
    """Analyze specific component."""
    
    if not component:
        return {
            "name": "Full System",
            "details": "Analyzing entire project architecture",
            "responsibilities": []
        }
    
    component_path = Path(component)
    if component_path.exists():
        files = [str(f) for f in component_path.rglob("*.*")][:10] if component_path.is_dir() else [component]
        responsibilities = _analyze_component_responsibilities(files)
        
        return {
            "name": component,
            "details": f"Component with {len(files)} files" if component_path.is_dir() else "Single file component",
            "files": files,
            "responsibilities": responsibilities
        }
    
    return {
        "name": component,
        "details": f"Component '{component}' not found",
        "responsibilities": []
    }


def _analyze_component_responsibilities(files: List[str]) -> List[str]:
    """Analyze component responsibilities."""
    
    responsibility_patterns = {
        "Data Management": ["model", "schema", "database"],
        "User Interface": [".html", ".css", ".jsx", "component"],
        "Business Logic": ["service", "business", "logic"],
        "API": ["api", "route", "endpoint"],
        "Configuration": ["config", ".env"],
        "Testing": ["test", "spec"]
    }
    
    responsibilities = []
    for responsibility, patterns in responsibility_patterns.items():
        if any(any(pattern in file.lower() for pattern in patterns) for file in files):
            responsibilities.append(responsibility)
    
    return responsibilities


async def _apply_architectural_focus(component_analysis: Dict, focus: str) -> Dict:
    """Apply architectural focus."""
    
    if focus == "maintainability":
        return await _assess_maintainability(component_analysis)
    elif focus == "scalability":
        return await _assess_scalability(component_analysis)
    elif focus == "security":
        return await _assess_security_architecture(component_analysis)
    
    return {
        "assessment": f"General architecture assessment for {component_analysis['name']}",
        "patterns": [],
        "concerns": [],
        "metrics": {}
    }


async def _assess_maintainability(component_analysis: Dict) -> Dict:
    """Assess maintainability."""
    
    files = component_analysis.get("files", [])
    responsibilities = component_analysis.get("responsibilities", [])
    
    patterns = []
    concerns = []
    
    if any("test" in file.lower() for file in files):
        patterns.append("Test Coverage")
    
    if len(responsibilities) > 3:
        concerns.append("Component has too many responsibilities")
    
    if len(files) > 50:
        concerns.append("Large number of files may impact maintainability")
    
    score = 100 - len(concerns) * 20 + len(patterns) * 10
    
    return {
        "assessment": f"Maintainability score: {max(0, score)}/100",
        "patterns": patterns,
        "concerns": concerns,
        "metrics": {"maintainability_score": max(0, score)}
    }


async def _assess_scalability(component_analysis: Dict) -> Dict:
    """Assess scalability."""
    
    responsibilities = component_analysis.get("responsibilities", [])
    
    patterns = []
    concerns = []
    
    if "API" in responsibilities:
        patterns.append("Service-Oriented Design")
    
    if "Data Management" in responsibilities and "User Interface" in responsibilities:
        concerns.append("Mixing data and UI concerns limits scalability")
    
    score = 70 + len(patterns) * 15 - len(concerns) * 20
    
    return {
        "assessment": f"Scalability score: {max(0, score)}/100",
        "patterns": patterns,
        "concerns": concerns,
        "metrics": {"scalability_score": max(0, score)}
    }


async def _assess_security_architecture(component_analysis: Dict) -> Dict:
    """Assess security architecture."""
    
    files = component_analysis.get("files", [])
    responsibilities = component_analysis.get("responsibilities", [])
    
    patterns = []
    concerns = []
    
    auth_files = ["auth", "login", "token", "security"]
    if any(any(pattern in file.lower() for pattern in auth_files) for file in files):
        patterns.append("Authentication/Authorization")
    
    if "Data Management" in responsibilities and "API" in responsibilities:
        concerns.append("Direct data access from API needs security review")
    
    score = 60 + len(patterns) * 20 - len(concerns) * 25
    
    return {
        "assessment": f"Security score: {max(0, score)}/100",
        "patterns": patterns,
        "concerns": concerns,
        "metrics": {"security_score": max(0, score)}
    }


def _format_patterns(patterns: List[str]) -> str:
    """Format patterns for display."""
    
    if not patterns:
        return "• No specific patterns detected"
    
    return '\n'.join(f"• {pattern}" for pattern in patterns)


def _format_recommendations(recommendations: List[str]) -> str:
    """Format recommendations for display."""
    
    if not recommendations:
        return "• No specific recommendations"
    
    return '\n'.join(f"• {rec}" for rec in recommendations)


async def _generate_architecture_recommendations(focused_analysis: Dict, focus: str) -> Dict:
    """Generate recommendations."""
    
    concerns = focused_analysis.get("concerns", [])
    patterns = focused_analysis.get("patterns", [])
    metrics = focused_analysis.get("metrics", {})
    
    immediate = []
    strategic = []
    
    if concerns:
        immediate = [f"Address: {concern}" for concern in concerns]
    else:
        immediate = ["No immediate concerns identified"]
    
    if focus == "maintainability":
        score = metrics.get("maintainability_score", 70)
        if score < 60:
            strategic.append("Consider major refactoring")
        if "Test Coverage" not in patterns:
            strategic.append("Implement testing strategy")
    
    elif focus == "scalability":
        if "Service-Oriented Design" not in patterns:
            strategic.append("Introduce API-first design")
        strategic.append("Plan for load testing")
    
    elif focus == "security":
        if "Authentication/Authorization" not in patterns:
            strategic.append("Implement authentication")
        strategic.append("Regular security audits")
    
    return {"immediate": immediate, "strategic": strategic}


def _suggest_architecture_next_steps(focused_analysis: Dict, focus: str) -> str:
    """Suggest next steps."""
    
    steps = []
    concerns = focused_analysis.get("concerns", [])
    
    if concerns:
        steps.append("Address identified concerns")
        steps.append("Run `analyze-codebase` for detailed metrics")
    
    if focus == "maintainability":
        steps.append("Use `/smart-dev/refactor-planning` for improvements")
    elif focus == "scalability":
        steps.append("Run `/smart-dev/performance-audit`")
    elif focus == "security":
        steps.append("Use `check-dependencies` for vulnerabilities")
    
    steps.append("Document architectural decisions with `generate-docs`")
    
    return '\n'.join(f"• {step}" for step in steps)
