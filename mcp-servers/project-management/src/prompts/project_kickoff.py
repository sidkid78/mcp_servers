"""
Project Kickoff Prompt
Complete project initiation workflow with stakeholder analysis and setup.
"""

import uuid
from datetime import datetime, timedelta
from typing import Dict, List
import json


async def project_kickoff_prompt(
    project_name: str, 
    project_scope: str = "", 
    stakeholders: str = ""
) -> str:
    """
    Complete project initiation workflow with comprehensive setup.
    This is the discovery prompt that sets up the project foundation.
    """

    # Generate unique project ID
    project_id = f"proj_{uuid.uuid4().hex[:8]}"
    
    # Parse stakeholders if provided
    stakeholder_list = []
    if stakeholders:
        stakeholder_list = [s.strip() for s in stakeholders.split(",") if s.strip()]
    
    # Analyze project scope
    scope_analysis = await _analyze_project_scope(project_scope)
    
    # Identify project type and complexity
    project_classification = await _classify_project(project_name, project_scope)
    
    # Generate stakeholder analysis
    stakeholder_analysis = await _analyze_stakeholders(stakeholder_list, project_classification["type"])
    
    # Determine project phases
    suggested_phases = await _suggest_project_phases(project_classification)
    
    # Calculate initial estimates
    initial_estimates = await _calculate_initial_estimates(scope_analysis, project_classification)
    
    # Generate risk factors
    initial_risks = await _identify_initial_risks(project_classification, scope_analysis)
    
    # Create project summary
    kickoff_summary = f"""
🚀 **Project Kickoff Complete: {project_name}**

**Project Details:**
🆔 Project ID: `{project_id}`
🎯 Type: {project_classification["type"]}
📊 Complexity: {project_classification["complexity"]}
⏱️ Estimated Duration: {initial_estimates["duration_weeks"]} weeks
👥 Recommended Team Size: {initial_estimates["team_size"]} members

**Scope Analysis:**
{_format_scope_analysis(scope_analysis)}

**Stakeholder Matrix:**
{_format_stakeholder_analysis(stakeholder_analysis)}

**Suggested Project Phases:**
{_format_project_phases(suggested_phases)}

**Initial Risk Assessment:**
{_format_initial_risks(initial_risks)}

**Initial Estimates:**
💰 Budget Range: ${initial_estimates["budget_range"]["min"]:,} - ${initial_estimates["budget_range"]["max"]:,}
📅 Timeline: {initial_estimates["start_date"]} to {initial_estimates["end_date"]}
🎯 Success Criteria: {initial_estimates["success_metrics"]}

**Recommended Next Steps:**
{_generate_next_steps(project_classification, stakeholder_analysis)}

**Available Workflows:**
🗓️ `/project-management/milestone-planning {project_id}` - Break down into detailed milestones
👥 `/project-management/resource-optimization {project_id}` - Optimize team allocation
⚠️ `/project-management/risk-assessment {project_id}` - Comprehensive risk analysis
📊 `/project-management/delivery-planning {project_id}` - Plan delivery strategy

**Individual Tools Available:**
• `create-project` - Initialize project structure
• `assign-tasks` - Resource allocation and task assignment
• `generate-timeline` - Critical path analysis and scheduling
• `track-progress` - Progress monitoring and reporting
• `identify-blockers` - Bottleneck detection and resolution
• `send-notifications` - Stakeholder communication

**Project Context Loaded ✅**
Project `{project_id}` is ready for detailed planning. What would you like to focus on first?
"""

    # Store project data for later use
    await _store_project_data(project_id, {
        "name": project_name,
        "scope": project_scope,
        "stakeholders": stakeholder_list,
        "classification": project_classification,
        "estimates": initial_estimates,
        "phases": suggested_phases,
        "risks": initial_risks,
        "created_at": datetime.now().isoformat()
    })

    return kickoff_summary


async def _analyze_project_scope(scope: str) -> Dict:
    """Analyze and categorize the project scope."""
    
    if not scope:
        return {
            "clarity": "undefined",
            "components": [],
            "deliverables": [],
            "complexity_indicators": [],
            "scope_score": 0
        }
    
    # Keywords for different aspects
    deliverable_keywords = ["app", "website", "system", "platform", "tool", "service", "product"]
    complexity_keywords = ["integration", "api", "database", "ml", "ai", "enterprise", "scalable"]
    technology_keywords = ["mobile", "web", "desktop", "cloud", "microservices", "blockchain"]
    
    scope_lower = scope.lower()
    
    # Identify deliverables
    deliverables = [keyword for keyword in deliverable_keywords if keyword in scope_lower]
    
    # Identify complexity indicators
    complexity_indicators = [keyword for keyword in complexity_keywords if keyword in scope_lower]
    
    # Identify technology components
    tech_components = [keyword for keyword in technology_keywords if keyword in scope_lower]
    
    # Calculate scope clarity score
    scope_score = len(scope.split()) * 2  # Basic word count
    if deliverables:
        scope_score += 20
    if complexity_indicators:
        scope_score += len(complexity_indicators) * 10
    if tech_components:
        scope_score += len(tech_components) * 5
    
    clarity = "high" if scope_score > 50 else "medium" if scope_score > 20 else "low"
    
    return {
        "clarity": clarity,
        "components": tech_components,
        "deliverables": deliverables,
        "complexity_indicators": complexity_indicators,
        "scope_score": min(scope_score, 100)
    }


async def _classify_project(name: str, scope: str) -> Dict:
    """Classify project type and complexity."""
    
    combined_text = f"{name} {scope}".lower()
    
    # Project type classification
    type_indicators = {
        "software_development": ["app", "software", "website", "platform", "system", "development"],
        "infrastructure": ["deployment", "infrastructure", "server", "cloud", "devops"],
        "data_science": ["analytics", "ml", "ai", "data", "model", "prediction"],
        "research": ["research", "analysis", "study", "investigation", "prototype"],
        "marketing": ["campaign", "marketing", "brand", "promotion", "launch"],
        "process_improvement": ["optimization", "process", "workflow", "efficiency", "automation"]
    }
    
    # Complexity indicators
    complexity_indicators = {
        "simple": ["prototype", "poc", "simple", "basic", "minimal"],
        "moderate": ["integration", "api", "database", "user", "interface"],
        "complex": ["enterprise", "scalable", "microservices", "distributed", "ml", "ai"],
        "very_complex": ["blockchain", "real-time", "high-performance", "mission-critical"]
    }
    
    # Determine project type
    project_type = "general"
    max_matches = 0
    
    for ptype, keywords in type_indicators.items():
        matches = sum(1 for keyword in keywords if keyword in combined_text)
        if matches > max_matches:
            max_matches = matches
            project_type = ptype
    
    # Determine complexity
    complexity = "moderate"  # default
    for complexity_level, keywords in complexity_indicators.items():
        if any(keyword in combined_text for keyword in keywords):
            complexity = complexity_level
    
    return {
        "type": project_type.replace("_", " ").title(),
        "complexity": complexity,
        "confidence": min(max_matches * 25, 100)
    }


async def _analyze_stakeholders(stakeholder_list: List[str], project_type: str) -> Dict:
    """Analyze stakeholders and suggest roles."""
    
    if not stakeholder_list:
        # Suggest default stakeholders based on project type
        default_stakeholders = {
            "Software Development": ["Product Owner", "Development Team", "QA Team", "DevOps Engineer"],
            "Infrastructure": ["Infrastructure Team", "Security Team", "Operations Team", "Management"],
            "Data Science": ["Data Scientists", "Data Engineers", "Business Analysts", "Domain Experts"],
            "Research": ["Researchers", "Subject Matter Experts", "Stakeholders", "Review Board"],
            "Marketing": ["Marketing Team", "Creative Team", "Sales Team", "Brand Manager"],
            "General": ["Project Manager", "Team Lead", "Stakeholders", "End Users"]
        }
        
        suggested = default_stakeholders.get(project_type, default_stakeholders["General"])
        
        return {
            "provided": [],
            "suggested": suggested,
            "analysis": "No stakeholders provided - showing recommended roles",
            "risk_level": "medium"
        }
    
    # Analyze provided stakeholders
    role_categories = {
        "decision_makers": ["manager", "director", "executive", "ceo", "cto", "lead"],
        "technical": ["developer", "engineer", "architect", "qa", "devops", "technical"],
        "business": ["analyst", "owner", "product", "business", "customer", "user"],
        "support": ["admin", "support", "operations", "maintenance"]
    }
    
    categorized = {category: [] for category in role_categories.keys()}
    uncategorized = []
    
    for stakeholder in stakeholder_list:
        stakeholder_lower = stakeholder.lower()
        categorized_flag = False
        
        for category, keywords in role_categories.items():
            if any(keyword in stakeholder_lower for keyword in keywords):
                categorized[category].append(stakeholder)
                categorized_flag = True
                break
        
        if not categorized_flag:
            uncategorized.append(stakeholder)
    
    # Assess stakeholder coverage
    coverage_score = sum(1 for cat in categorized.values() if cat) * 25
    risk_level = "low" if coverage_score >= 75 else "medium" if coverage_score >= 50 else "high"
    
    return {
        "provided": stakeholder_list,
        "categorized": categorized,
        "uncategorized": uncategorized,
        "coverage_score": coverage_score,
        "risk_level": risk_level,
        "gaps": _identify_stakeholder_gaps(categorized, project_type)
    }


async def _suggest_project_phases(classification: Dict) -> List[Dict]:
    """Suggest project phases based on type and complexity."""
    
    project_type = classification["type"].lower()
    complexity = classification["complexity"]
    
    # Base phases for different project types
    phase_templates = {
        "software development": [
            {"name": "Planning & Design", "duration_weeks": 2, "key_activities": ["Requirements gathering", "System design", "Architecture planning"]},
            {"name": "Development", "duration_weeks": 8, "key_activities": ["Core development", "Feature implementation", "Code reviews"]},
            {"name": "Testing & QA", "duration_weeks": 2, "key_activities": ["Unit testing", "Integration testing", "Bug fixes"]},
            {"name": "Deployment", "duration_weeks": 1, "key_activities": ["Production deployment", "Monitoring setup", "Documentation"]}
        ],
        "infrastructure": [
            {"name": "Assessment & Planning", "duration_weeks": 1, "key_activities": ["Current state analysis", "Requirements definition", "Architecture design"]},
            {"name": "Implementation", "duration_weeks": 4, "key_activities": ["Infrastructure setup", "Configuration", "Security implementation"]},
            {"name": "Testing & Validation", "duration_weeks": 1, "key_activities": ["Performance testing", "Security validation", "Disaster recovery testing"]},
            {"name": "Migration & Go-Live", "duration_weeks": 1, "key_activities": ["Data migration", "Go-live", "Monitoring"]}
        ],
        "data science": [
            {"name": "Data Discovery", "duration_weeks": 2, "key_activities": ["Data exploration", "Quality assessment", "Requirements analysis"]},
            {"name": "Model Development", "duration_weeks": 6, "key_activities": ["Feature engineering", "Model training", "Validation"]},
            {"name": "Testing & Evaluation", "duration_weeks": 2, "key_activities": ["Model testing", "Performance evaluation", "Bias analysis"]},
            {"name": "Deployment", "duration_weeks": 2, "key_activities": ["Model deployment", "Monitoring setup", "Documentation"]}
        ]
    }
    
    # Get base phases
    phases = phase_templates.get(project_type, phase_templates["software development"])
    
    # Adjust for complexity
    complexity_multipliers = {
        "simple": 0.7,
        "moderate": 1.0,
        "complex": 1.3,
        "very_complex": 1.6
    }
    
    multiplier = complexity_multipliers.get(complexity, 1.0)
    
    # Apply complexity adjustment
    adjusted_phases = []
    for phase in phases:
        adjusted_phase = phase.copy()
        adjusted_phase["duration_weeks"] = max(1, int(phase["duration_weeks"] * multiplier))
        adjusted_phases.append(adjusted_phase)
    
    return adjusted_phases


async def _calculate_initial_estimates(scope_analysis: Dict, classification: Dict) -> Dict:
    """Calculate initial project estimates."""
    
    # Base estimates
    base_weeks = 8
    base_team_size = 4
    base_cost_per_week = 10000
    
    # Scope adjustments
    scope_score = scope_analysis["scope_score"]
    scope_multiplier = 1 + (scope_score / 100)
    
    # Complexity adjustments
    complexity_multipliers = {
        "simple": 0.6,
        "moderate": 1.0,
        "complex": 1.5,
        "very_complex": 2.2
    }
    
    complexity_multiplier = complexity_multipliers.get(classification["complexity"], 1.0)
    
    # Calculate estimates
    duration_weeks = max(4, int(base_weeks * scope_multiplier * complexity_multiplier))
    team_size = max(2, int(base_team_size * complexity_multiplier))
    
    base_cost = duration_weeks * base_cost_per_week * team_size
    
    # Add uncertainty buffer
    budget_min = int(base_cost * 0.8)
    budget_max = int(base_cost * 1.4)
    
    start_date = datetime.now().strftime("%Y-%m-%d")
    end_date = (datetime.now() + timedelta(weeks=duration_weeks)).strftime("%Y-%m-%d")
    
    return {
        "duration_weeks": duration_weeks,
        "team_size": team_size,
        "budget_range": {"min": budget_min, "max": budget_max},
        "start_date": start_date,
        "end_date": end_date,
        "success_metrics": _generate_success_metrics(classification["type"])
    }


async def _identify_initial_risks(classification: Dict, scope_analysis: Dict) -> List[Dict]:
    """Identify initial project risks."""
    
    risks = []
    
    # Scope-related risks
    if scope_analysis["clarity"] == "low":
        risks.append({
            "category": "scope",
            "description": "Unclear project scope may lead to scope creep",
            "probability": "high",
            "impact": "high",
            "mitigation": "Conduct detailed requirements workshop"
        })
    
    # Complexity-related risks
    if classification["complexity"] in ["complex", "very_complex"]:
        risks.append({
            "category": "technical",
            "description": "High technical complexity may cause delays",
            "probability": "medium",
            "impact": "high",
            "mitigation": "Plan for technical spikes and proof-of-concepts"
        })
    
    # Resource risks
    risks.append({
        "category": "resource",
        "description": "Key team members may become unavailable",
        "probability": "medium",
        "impact": "medium",
        "mitigation": "Cross-train team members and document knowledge"
    })
    
    # Timeline risks
    risks.append({
        "category": "schedule",
        "description": "Dependencies may cause schedule delays",
        "probability": "medium",
        "impact": "medium",
        "mitigation": "Identify and manage critical path dependencies"
    })
    
    return risks


def _generate_success_metrics(project_type: str) -> str:
    """Generate success metrics based on project type."""
    
    metrics = {
        "Software Development": "Functional requirements met, performance targets achieved, user acceptance criteria passed",
        "Infrastructure": "System uptime > 99.9%, performance benchmarks met, security requirements satisfied",
        "Data Science": "Model accuracy targets achieved, business value delivered, production deployment successful",
        "Research": "Research objectives met, findings documented, recommendations provided",
        "Marketing": "Campaign KPIs achieved, ROI targets met, brand awareness increased",
        "General": "Project deliverables completed on time, within budget, and meeting quality standards"
    }
    
    return metrics.get(project_type, metrics["General"])


def _identify_stakeholder_gaps(categorized: Dict, project_type: str) -> List[str]:
    """Identify missing stakeholder categories."""
    
    required_categories = {
        "Software Development": ["decision_makers", "technical", "business"],
        "Infrastructure": ["decision_makers", "technical", "support"],
        "Data Science": ["decision_makers", "technical", "business"],
        "General": ["decision_makers", "business"]
    }
    
    required = required_categories.get(project_type, required_categories["General"])
    gaps = [cat for cat in required if not categorized.get(cat)]
    
    return gaps


async def _store_project_data(project_id: str, data: Dict) -> None:
    """Store project data for later retrieval."""
    # In a real implementation, this would save to a database or file system
    # For now, we'll just pass
    pass


def _format_scope_analysis(analysis: Dict) -> str:
    """Format scope analysis for display."""
    
    if analysis["clarity"] == "undefined":
        return "⚠️ Project scope not defined - recommend scope definition workshop"
    
    lines = [
        f"📊 Clarity Level: {analysis['clarity'].title()}",
        f"📈 Scope Score: {analysis['scope_score']}/100"
    ]
    
    if analysis["deliverables"]:
        lines.append(f"📦 Key Deliverables: {', '.join(analysis['deliverables'])}")
    
    if analysis["components"]:
        lines.append(f"🛠️ Technology Components: {', '.join(analysis['components'])}")
    
    if analysis["complexity_indicators"]:
        lines.append(f"⚡ Complexity Factors: {', '.join(analysis['complexity_indicators'])}")
    
    return "\n".join(lines)


def _format_stakeholder_analysis(analysis: Dict) -> str:
    """Format stakeholder analysis for display."""
    
    if not analysis["provided"]:
        lines = ["⚠️ No stakeholders provided"]
        lines.append("📋 Recommended Roles:")
        for role in analysis["suggested"]:
            lines.append(f"  • {role}")
        return "\n".join(lines)
    
    lines = [f"👥 Stakeholders Identified: {len(analysis['provided'])}"]
    lines.append(f"📊 Coverage Score: {analysis['coverage_score']}/100")
    lines.append(f"⚠️ Risk Level: {analysis['risk_level'].title()}")
    
    if analysis["categorized"]:
        for category, stakeholders in analysis["categorized"].items():
            if stakeholders:
                lines.append(f"• {category.replace('_', ' ').title()}: {', '.join(stakeholders)}")
    
    if analysis["gaps"]:
        lines.append(f"❌ Missing Categories: {', '.join(analysis['gaps'])}")
    
    return "\n".join(lines)


def _format_project_phases(phases: List[Dict]) -> str:
    """Format project phases for display."""
    
    lines = []
    total_weeks = sum(phase["duration_weeks"] for phase in phases)
    
    for i, phase in enumerate(phases, 1):
        lines.append(f"{i}. **{phase['name']}** ({phase['duration_weeks']} weeks)")
        for activity in phase["key_activities"]:
            lines.append(f"   • {activity}")
    
    lines.append(f"\n📅 Total Duration: {total_weeks} weeks")
    
    return "\n".join(lines)


def _format_initial_risks(risks: List[Dict]) -> str:
    """Format initial risks for display."""
    
    if not risks:
        return "✅ No immediate risks identified"
    
    lines = [f"⚠️ {len(risks)} Initial Risks Identified:"]
    
    for risk in risks:
        icon = "🔴" if risk["probability"] == "high" else "🟡" if risk["probability"] == "medium" else "🟢"
        lines.append(f"{icon} **{risk['category'].title()}**: {risk['description']}")
        lines.append(f"   💡 Mitigation: {risk['mitigation']}")
    
    return "\n".join(lines)


def _generate_next_steps(classification: Dict, stakeholder_analysis: Dict) -> str:
    """Generate recommended next steps."""
    
    steps = []
    
    # Based on project type
    if classification["type"] == "Software Development":
        steps.append("🔍 Run `/project-management/milestone-planning` for detailed development phases")
        steps.append("👥 Use `/project-management/resource-optimization` to plan team structure")
    
    # Based on stakeholder gaps
    if stakeholder_analysis["risk_level"] == "high":
        steps.append("👥 Address stakeholder gaps before proceeding")
    
    # Based on complexity
    if classification["complexity"] in ["complex", "very_complex"]:
        steps.append("⚠️ Run `/project-management/risk-assessment` for comprehensive risk analysis")
    
    # Always include these
    steps.append("📊 Use `create-project` tool to initialize project structure")
    steps.append("📅 Run `/project-management/delivery-planning` for delivery strategy")
    
    return "\n".join(f"• {step}" for step in steps[:4])
