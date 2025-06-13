"""
Risk Assessment Prompt
Proactive risk identification and mitigation planning.
"""

from datetime import datetime
from typing import Dict, List


async def risk_assessment_prompt(project_id: str, assessment_scope: str = "comprehensive") -> str:
    """
    Comprehensive risk identification and mitigation planning.
    """

    # Load project data
    project_data = await _load_project_data(project_id)
    
    if not project_data:
        return f"❌ Project `{project_id}` not found. Run `/project-management/project-kickoff` first."
    
    # Perform risk analysis
    risk_analysis = await _analyze_project_risks(project_data, assessment_scope)
    
    # Generate mitigation strategies
    mitigation_plan = await _create_mitigation_strategies(risk_analysis)
    
    # Create risk matrix
    risk_matrix = await _create_risk_matrix(risk_analysis["risks"])
    
    return f"""
⚠️ **Risk Assessment Complete: {project_data['name']}**

**Assessment Scope:** {assessment_scope.title()}
**Total Risks Identified:** {len(risk_analysis['risks'])}
**Risk Level:** {risk_analysis['overall_risk_level']}

**Risk Categories:**
{_format_risk_categories(risk_analysis['risk_categories'])}

**High Priority Risks:**
{_format_high_priority_risks(risk_analysis['risks'])}

**Risk Matrix:**
{_format_risk_matrix(risk_matrix)}

**Mitigation Plan:**
{_format_mitigation_plan(mitigation_plan)}

**Monitoring Plan:**
{_format_monitoring_plan(risk_analysis)}

**Next Steps:**
• Use `track-progress` tool to monitor risk indicators
• Run `/project-management/progress-review {project_id}` for regular risk updates
• Consider `/project-management/resource-optimization {project_id}` to address resource risks

**Risk Assessment Complete ✅**
"""


async def _load_project_data(project_id: str) -> Dict:
    """Load project data."""
    return {
        "name": f"Project {project_id}",
        "type": "Software Development",
        "complexity": "moderate",
        "duration_weeks": 12,
        "team_size": 5
    }


async def _analyze_project_risks(project_data: Dict, scope: str) -> Dict:
    """Analyze project risks comprehensively."""
    
    risks = [
        {
            "id": "RISK-001",
            "category": "technical",
            "title": "Technology Integration Complexity",
            "description": "Multiple technology integrations may cause delays",
            "probability": "medium",
            "impact": "high",
            "severity": "high",
            "indicators": ["API failures", "Integration test failures"],
            "root_causes": ["Insufficient technical analysis", "Third-party dependencies"]
        },
        {
            "id": "RISK-002", 
            "category": "resource",
            "title": "Key Person Dependency",
            "description": "Critical team members may become unavailable",
            "probability": "medium",
            "impact": "high",
            "severity": "high",
            "indicators": ["Single points of knowledge", "No cross-training"],
            "root_causes": ["Insufficient knowledge sharing", "Specialization"]
        },
        {
            "id": "RISK-003",
            "category": "schedule",
            "title": "Scope Creep",
            "description": "Additional requirements may extend timeline",
            "probability": "high",
            "impact": "medium",
            "severity": "high",
            "indicators": ["Unclear requirements", "Stakeholder requests"],
            "root_causes": ["Insufficient requirements analysis", "Poor scope management"]
        }
    ]
    
    risk_categories = {}
    for risk in risks:
        category = risk["category"]
        if category not in risk_categories:
            risk_categories[category] = 0
        risk_categories[category] += 1
    
    high_risks = [r for r in risks if r["severity"] == "high"]
    overall_risk_level = "high" if len(high_risks) > 2 else "medium"
    
    return {
        "risks": risks,
        "risk_categories": risk_categories,
        "overall_risk_level": overall_risk_level
    }


async def _create_mitigation_strategies(risk_analysis: Dict) -> Dict:
    """Create mitigation strategies for identified risks."""
    
    strategies = {}
    
    for risk in risk_analysis["risks"]:
        risk_id = risk["id"]
        
        # Generate mitigation based on category
        if risk["category"] == "technical":
            strategies[risk_id] = {
                "prevention": ["Conduct technical spikes", "Create prototypes", "Review architecture"],
                "mitigation": ["Have backup technology options", "Increase testing coverage"],
                "contingency": ["Bring in technical consultants", "Extend timeline"]
            }
        elif risk["category"] == "resource":
            strategies[risk_id] = {
                "prevention": ["Cross-train team members", "Document knowledge", "Create backups"],
                "mitigation": ["Maintain contractor relationships", "Overlap responsibilities"],
                "contingency": ["Hire contractors", "Reassign work"]
            }
        elif risk["category"] == "schedule":
            strategies[risk_id] = {
                "prevention": ["Lock down requirements", "Regular scope reviews", "Change control"],
                "mitigation": ["Build buffer time", "Prioritize features", "Parallel work"],
                "contingency": ["Reduce scope", "Extend deadline", "Add resources"]
            }
    
    return strategies


async def _create_risk_matrix(risks: List[Dict]) -> Dict:
    """Create risk probability/impact matrix."""
    
    matrix = {
        "high_probability": {"high_impact": [], "medium_impact": [], "low_impact": []},
        "medium_probability": {"high_impact": [], "medium_impact": [], "low_impact": []},
        "low_probability": {"high_impact": [], "medium_impact": [], "low_impact": []}
    }
    
    for risk in risks:
        prob = risk["probability"]
        impact = risk["impact"]
        matrix[f"{prob}_probability"][f"{impact}_impact"].append(risk["title"])
    
    return matrix


def _format_risk_categories(categories: Dict) -> str:
    """Format risk categories."""
    lines = []
    for category, count in categories.items():
        lines.append(f"• {category.title()}: {count} risks")
    return "\n".join(lines)


def _format_high_priority_risks(risks: List[Dict]) -> str:
    """Format high priority risks."""
    high_risks = [r for r in risks if r["severity"] == "high"]
    
    lines = []
    for risk in high_risks[:5]:  # Top 5
        lines.append(f"🔴 **{risk['title']}**")
        lines.append(f"   {risk['description']}")
        lines.append(f"   Impact: {risk['impact']} | Probability: {risk['probability']}")
        lines.append("")
    
    return "\n".join(lines)


def _format_risk_matrix(matrix: Dict) -> str:
    """Format risk matrix."""
    lines = ["**Probability vs Impact Matrix:**"]
    
    for prob_level, impacts in matrix.items():
        prob_name = prob_level.replace("_", " ").title()
        lines.append(f"\n{prob_name}:")
        for impact_level, risk_titles in impacts.items():
            if risk_titles:
                impact_name = impact_level.replace("_", " ").title()
                lines.append(f"  {impact_name}: {len(risk_titles)} risks")
    
    return "\n".join(lines)


def _format_mitigation_plan(strategies: Dict) -> str:
    """Format mitigation plan."""
    lines = ["**Key Mitigation Strategies:**"]
    
    for risk_id, strategy in list(strategies.items())[:3]:  # Top 3
        lines.append(f"\n{risk_id}:")
        lines.append(f"• Prevention: {', '.join(strategy['prevention'][:2])}")
        lines.append(f"• Mitigation: {', '.join(strategy['mitigation'][:2])}")
    
    return "\n".join(lines)


def _format_monitoring_plan(risk_analysis: Dict) -> str:
    """Format monitoring plan."""
    return """**Risk Monitoring:**
• Weekly risk review meetings
• Automated indicator tracking
• Stakeholder risk reporting
• Mitigation progress tracking"""
