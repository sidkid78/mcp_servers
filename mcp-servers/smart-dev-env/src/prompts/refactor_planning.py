"""
Refactor Planning Prompt
Safe refactoring workflows with rollback strategies.
"""

from pathlib import Path
from typing import Dict, List

async def refactor_planning_prompt(target_code: str, goals: str = "") -> str:
    """
    Plan safe refactoring with rollback strategies.
    """
    
    try:
        refactor_analysis = await _analyze_refactor_target(target_code)
        refactor_plan = await _create_refactor_plan(refactor_analysis, goals)
        risk_assessment = await _assess_refactor_risks(refactor_analysis, refactor_plan)
        
        return f"""
♻️ **Refactor Planning: {refactor_analysis['name']}**

**Target Analysis:**
{refactor_analysis['summary']}

**Refactoring Goals:**
{goals or 'General code improvement'}

**Refactor Plan:**
{_format_refactor_plan(refactor_plan)}

**Risk Assessment:**
{_format_risk_assessment(risk_assessment)}

**Safety Measures:**
{_format_safety_measures(risk_assessment)}

**Next Steps:**
{_suggest_refactor_next_steps(refactor_analysis, refactor_plan)}

**Available Tools:**
• `analyze-codebase` - Detailed impact analysis
• `run-tests` - Verify refactoring safety
• `rollback-changes` - Revert if needed
• `deploy-preview` - Test in staging

**Related Workflows:**
• `/smart-dev/code-review` - Review refactored code
• `/smart-dev/performance-audit` - Verify improvements
"""
        
    except Exception as e:
        return f"❌ Refactor planning failed: {str(e)}"


async def _analyze_refactor_target(target_code: str) -> Dict:
    """Analyze the code targeted for refactoring."""
    
    analysis = {
        "name": target_code or "Unknown",
        "summary": "",
        "type": "unknown",
        "complexity": "medium",
        "dependencies": [],
        "test_coverage": "unknown"
    }
    
    if not target_code:
        analysis["summary"] = "No target specified - analyzing entire codebase"
        return analysis
    
    target_path = Path(target_code)
    
    if target_path.exists():
        if target_path.is_file():
            analysis["type"] = "file"
            analysis["summary"] = f"Single file refactoring: {target_code}"
        else:
            analysis["type"] = "directory"
            files = list(target_path.rglob("*.*"))
            analysis["summary"] = f"Directory refactoring: {len(files)} files"
    else:
        analysis["summary"] = f"Target '{target_code}' not found"
    
    return analysis


async def _create_refactor_plan(analysis: Dict, goals: str) -> Dict:
    """Create detailed refactoring plan."""
    
    plan = {
        "phases": [],
        "strategies": [],
        "timeline": "unknown"
    }
    
    # Phase 1: Preparation
    plan["phases"].append({
        "name": "Preparation",
        "steps": [
            "Create backup of current code",
            "Run full test suite to establish baseline",
            "Document current behavior",
            "Set up monitoring for regressions"
        ]
    })
    
    # Phase 2: Incremental Changes
    plan["phases"].append({
        "name": "Incremental Refactoring",
        "steps": [
            "Make small, isolated changes",
            "Run tests after each change",
            "Commit frequently with clear messages",
            "Monitor for unexpected behavior"
        ]
    })
    
    # Phase 3: Validation
    plan["phases"].append({
        "name": "Validation",
        "steps": [
            "Run comprehensive test suite",
            "Perform manual testing",
            "Check performance impact",
            "Review code quality metrics"
        ]
    })
    
    # Strategies based on goals
    if "performance" in goals.lower():
        plan["strategies"].append("Performance optimization")
    if "maintainability" in goals.lower():
        plan["strategies"].append("Code structure improvement")
    if "security" in goals.lower():
        plan["strategies"].append("Security enhancement")
    
    if not plan["strategies"]:
        plan["strategies"] = ["General code improvement"]
    
    return plan


async def _assess_refactor_risks(analysis: Dict, plan: Dict) -> Dict:
    """Assess risks associated with refactoring."""
    
    risks = {
        "level": "medium",
        "factors": [],
        "mitigation": []
    }
    
    # Risk factors
    if analysis["type"] == "directory":
        risks["factors"].append("Large scope increases complexity")
        risks["level"] = "high"
    
    if analysis["test_coverage"] == "unknown":
        risks["factors"].append("Unknown test coverage")
        risks["mitigation"].append("Add comprehensive tests before refactoring")
    
    # Default mitigations
    risks["mitigation"].extend([
        "Use version control for easy rollback",
        "Make incremental changes",
        "Test thoroughly at each step"
    ])
    
    return risks


def _format_refactor_plan(plan: Dict) -> str:
    """Format refactoring plan."""
    
    formatted = []
    
    for i, phase in enumerate(plan["phases"], 1):
        formatted.append(f"**Phase {i}: {phase['name']}**")
        for step in phase["steps"]:
            formatted.append(f"• {step}")
        formatted.append("")
    
    if plan["strategies"]:
        formatted.append("**Strategies:**")
        for strategy in plan["strategies"]:
            formatted.append(f"• {strategy}")
    
    return '\n'.join(formatted)


def _format_risk_assessment(risks: Dict) -> str:
    """Format risk assessment."""
    
    risk_emoji = "🔴" if risks["level"] == "high" else "🟡" if risks["level"] == "medium" else "🟢"
    
    formatted = [f"{risk_emoji} **Risk Level:** {risks['level'].title()}"]
    
    if risks["factors"]:
        formatted.append("\n**Risk Factors:**")
        for factor in risks["factors"]:
            formatted.append(f"⚠️ {factor}")
    
    return '\n'.join(formatted)


def _format_safety_measures(risks: Dict) -> str:
    """Format safety measures."""
    
    if not risks["mitigation"]:
        return "• Standard refactoring safety practices"
    
    return '\n'.join(f"• {measure}" for measure in risks["mitigation"])


def _suggest_refactor_next_steps(analysis: Dict, plan: Dict) -> str:
    """Suggest next steps for refactoring."""
    
    steps = [
        "🔍 Run `analyze-codebase` to understand current state",
        "🧪 Execute `run-tests` to establish baseline",
        "📝 Document current behavior and expectations",
        "🚀 Begin with Phase 1: Preparation"
    ]
    
    if analysis["type"] == "directory":
        steps.insert(1, "📊 Consider breaking down into smaller refactoring tasks")
    
    return '\n'.join(f"• {step}" for step in steps)
