"""
Delivery Planning Prompt
End-to-end delivery orchestration and planning.
"""

from datetime import datetime, timedelta
from typing import Dict, List


async def delivery_planning_prompt(project_id: str, delivery_strategy: str = "incremental") -> str:
    """
    End-to-end delivery orchestration with strategy optimization.
    """

    # Load project data
    project_data = await _load_project_data(project_id)
    
    if not project_data:
        return f"❌ Project `{project_id}` not found. Run `/project-management/project-kickoff` first."
    
    # Analyze delivery requirements
    delivery_analysis = await _analyze_delivery_requirements(project_data, delivery_strategy)
    
    # Create delivery plan
    delivery_plan = await _create_delivery_plan(delivery_analysis, delivery_strategy)
    
    # Generate release strategy
    release_strategy = await _generate_release_strategy(delivery_plan)
    
    # Create deployment pipeline
    deployment_pipeline = await _design_deployment_pipeline(project_data, delivery_strategy)
    
    # Calculate delivery metrics
    delivery_metrics = await _calculate_delivery_metrics(delivery_plan)
    
    return f"""
🚀 **Delivery Planning Complete: {project_data['name']}**

**Delivery Strategy:** {delivery_strategy.replace('_', ' ').title()}
**Release Phases:** {len(delivery_plan['phases'])}
**Total Deliverables:** {delivery_metrics['total_deliverables']}

**Delivery Timeline:**
{_format_delivery_timeline(delivery_plan)}

**Release Strategy:**
{_format_release_strategy(release_strategy)}

**Deployment Pipeline:**
{_format_deployment_pipeline(deployment_pipeline)}

**Quality Gates:**
{_format_quality_gates(delivery_plan['quality_gates'])}

**Risk Management:**
{_format_delivery_risks(delivery_analysis['risks'])}

**Success Metrics:**
{_format_delivery_metrics(delivery_metrics)}

**Stakeholder Communication:**
{_format_communication_plan(delivery_plan['communication_plan'])}

**Next Steps:**
• Use `deploy-preview` tool to set up staging environments
• Use `generate-timeline` tool to create detailed delivery schedule
• Use `send-notifications` tool to inform stakeholders of delivery plan
• Run `/project-management/progress-review {project_id}` to track delivery progress

**Delivery Planning Complete ✅**
Ready for execution and deployment.
"""


async def _load_project_data(project_id: str) -> Dict:
    """Load project data."""
    return {
        "name": f"Project {project_id}",
        "type": "Software Development",
        "complexity": "moderate",
        "duration_weeks": 12,
        "stakeholders": ["Product Team", "Engineering", "QA", "Operations"]
    }


async def _analyze_delivery_requirements(project_data: Dict, strategy: str) -> Dict:
    """Analyze delivery requirements and constraints."""
    
    # Identify deliverables
    deliverables = [
        {"name": "Core API", "type": "backend", "priority": "high", "dependencies": []},
        {"name": "Web Application", "type": "frontend", "priority": "high", "dependencies": ["Core API"]},
        {"name": "Mobile App", "type": "mobile", "priority": "medium", "dependencies": ["Core API"]},
        {"name": "Admin Dashboard", "type": "frontend", "priority": "low", "dependencies": ["Core API"]},
        {"name": "Documentation", "type": "documentation", "priority": "medium", "dependencies": ["Web Application"]}
    ]
    
    # Identify constraints
    constraints = {
        "regulatory": ["Data privacy compliance", "Security standards"],
        "technical": ["Performance requirements", "Scalability needs"],
        "business": ["Market timing", "Budget constraints"],
        "operational": ["Support readiness", "Infrastructure capacity"]
    }
    
    # Identify risks
    risks = [
        {"category": "delivery", "description": "Integration delays may impact timeline", "probability": "medium", "impact": "high"},
        {"category": "quality", "description": "Insufficient testing time may affect quality", "probability": "low", "impact": "high"},
        {"category": "operational", "description": "Production deployment complexity", "probability": "medium", "impact": "medium"}
    ]
    
    return {
        "deliverables": deliverables,
        "constraints": constraints,
        "risks": risks,
        "strategy_requirements": _get_strategy_requirements(strategy)
    }


def _get_strategy_requirements(strategy: str) -> Dict:
    """Get requirements for specific delivery strategy."""
    
    strategies = {
        "incremental": {
            "min_phases": 3,
            "max_phase_duration": 4,
            "requires_mvp": True,
            "testing_approach": "continuous"
        },
        "big_bang": {
            "min_phases": 1,
            "max_phase_duration": 12,
            "requires_mvp": False,
            "testing_approach": "comprehensive"
        },
        "phased": {
            "min_phases": 2,
            "max_phase_duration": 6,
            "requires_mvp": False,
            "testing_approach": "phase_based"
        }
    }
    
    return strategies.get(strategy, strategies["incremental"])


async def _create_delivery_plan(delivery_analysis: Dict, strategy: str) -> Dict:
    """Create detailed delivery plan."""
    
    deliverables = delivery_analysis["deliverables"]
    strategy_req = delivery_analysis["strategy_requirements"]
    
    # Group deliverables into phases
    phases = []
    
    if strategy == "incremental":
        # MVP first, then incremental improvements
        phases = [
            {
                "name": "MVP Release",
                "duration_weeks": 3,
                "deliverables": ["Core API", "Web Application"],
                "goals": ["Basic functionality", "User feedback"],
                "success_criteria": ["API functional", "Basic user workflows working"]
            },
            {
                "name": "Enhanced Features",
                "duration_weeks": 3,
                "deliverables": ["Mobile App", "Enhanced Web App"],
                "goals": ["Mobile support", "Feature completeness"],
                "success_criteria": ["Mobile app published", "Feature parity achieved"]
            },
            {
                "name": "Full Platform",
                "duration_weeks": 2,
                "deliverables": ["Admin Dashboard", "Documentation"],
                "goals": ["Complete platform", "Operational readiness"],
                "success_criteria": ["All features complete", "Documentation published"]
            }
        ]
    elif strategy == "phased":
        phases = [
            {
                "name": "Backend Phase",
                "duration_weeks": 4,
                "deliverables": ["Core API"],
                "goals": ["Stable backend", "API completion"],
                "success_criteria": ["API tested", "Performance benchmarks met"]
            },
            {
                "name": "Frontend Phase",
                "duration_weeks": 6,
                "deliverables": ["Web Application", "Mobile App", "Admin Dashboard"],
                "goals": ["Complete user interfaces", "End-to-end functionality"],
                "success_criteria": ["All UIs complete", "Integration successful"]
            },
            {
                "name": "Launch Phase",
                "duration_weeks": 2,
                "deliverables": ["Documentation", "Production deployment"],
                "goals": ["Production readiness", "Go-live"],
                "success_criteria": ["Production stable", "Users onboarded"]
            }
        ]
    else:  # big_bang
        phases = [
            {
                "name": "Complete Delivery",
                "duration_weeks": 12,
                "deliverables": ["Core API", "Web Application", "Mobile App", "Admin Dashboard", "Documentation"],
                "goals": ["Complete solution", "Full functionality"],
                "success_criteria": ["All requirements met", "Full system operational"]
            }
        ]
    
    # Add quality gates
    quality_gates = [
        {"name": "Code Review", "criteria": ["All code reviewed", "Standards compliance"], "phase": "all"},
        {"name": "Testing", "criteria": ["Unit tests pass", "Integration tests pass"], "phase": "all"},
        {"name": "Security Review", "criteria": ["Security scan complete", "Vulnerabilities addressed"], "phase": "before_production"},
        {"name": "Performance Testing", "criteria": ["Load tests pass", "Performance targets met"], "phase": "before_production"}
    ]
    
    # Communication plan
    communication_plan = {
        "stakeholder_updates": "Weekly",
        "demo_schedule": "End of each phase",
        "feedback_collection": "Continuous",
        "escalation_process": "24-hour response for critical issues"
    }
    
    return {
        "phases": phases,
        "quality_gates": quality_gates,
        "communication_plan": communication_plan,
        "total_duration": sum(phase["duration_weeks"] for phase in phases)
    }


async def _generate_release_strategy(delivery_plan: Dict) -> Dict:
    """Generate release strategy."""
    
    strategy = {
        "release_cadence": "Per phase completion",
        "rollback_strategy": "Blue-green deployment with instant rollback",
        "monitoring": "Real-time metrics and alerting",
        "user_communication": "In-app notifications and email updates"
    }
    
    # Release schedule
    release_schedule = []
    current_date = datetime.now()
    
    for i, phase in enumerate(delivery_plan["phases"]):
        release_date = current_date + timedelta(weeks=sum(p["duration_weeks"] for p in delivery_plan["phases"][:i+1]))
        
        release_schedule.append({
            "phase": phase["name"],
            "release_date": release_date.strftime("%Y-%m-%d"),
            "deliverables": phase["deliverables"],
            "rollback_plan": f"Automated rollback to previous stable version"
        })
    
    strategy["release_schedule"] = release_schedule
    
    return strategy


async def _design_deployment_pipeline(project_data: Dict, strategy: str) -> Dict:
    """Design deployment pipeline."""
    
    pipeline = {
        "stages": [
            {
                "name": "Build",
                "duration_minutes": 15,
                "activities": ["Code compilation", "Dependency resolution", "Asset optimization"],
                "success_criteria": ["Build succeeds", "No compilation errors"]
            },
            {
                "name": "Test",
                "duration_minutes": 30,
                "activities": ["Unit tests", "Integration tests", "Code coverage"],
                "success_criteria": ["All tests pass", "Coverage > 80%"]
            },
            {
                "name": "Security Scan",
                "duration_minutes": 10,
                "activities": ["Vulnerability scan", "Dependency check", "Security analysis"],
                "success_criteria": ["No critical vulnerabilities", "Dependencies secure"]
            },
            {
                "name": "Deploy to Staging",
                "duration_minutes": 5,
                "activities": ["Staging deployment", "Smoke tests", "Integration verification"],
                "success_criteria": ["Deployment successful", "Smoke tests pass"]
            },
            {
                "name": "Production Deployment",
                "duration_minutes": 10,
                "activities": ["Blue-green deployment", "Health checks", "Monitoring setup"],
                "success_criteria": ["Production healthy", "Monitoring active"]
            }
        ],
        "total_duration_minutes": 70,
        "automation_level": "95%",
        "manual_gates": ["Production deployment approval"]
    }
    
    return pipeline


async def _calculate_delivery_metrics(delivery_plan: Dict) -> Dict:
    """Calculate delivery metrics."""
    
    total_deliverables = sum(len(phase["deliverables"]) for phase in delivery_plan["phases"])
    
    return {
        "total_deliverables": total_deliverables,
        "delivery_phases": len(delivery_plan["phases"]),
        "total_duration_weeks": delivery_plan["total_duration"],
        "average_phase_duration": delivery_plan["total_duration"] / len(delivery_plan["phases"]),
        "quality_gates": len(delivery_plan["quality_gates"]),
        "delivery_velocity": total_deliverables / delivery_plan["total_duration"]
    }


def _format_delivery_timeline(delivery_plan: Dict) -> str:
    """Format delivery timeline."""
    lines = []
    current_week = 0
    
    for phase in delivery_plan["phases"]:
        start_week = current_week
        end_week = current_week + phase["duration_weeks"]
        
        lines.append(f"📅 **{phase['name']}** (Weeks {start_week}-{end_week})")
        lines.append(f"   🎯 Goals: {', '.join(phase['goals'])}")
        lines.append(f"   📦 Deliverables: {', '.join(phase['deliverables'])}")
        lines.append("")
        
        current_week = end_week
    
    return "\n".join(lines)


def _format_release_strategy(strategy: Dict) -> str:
    """Format release strategy."""
    lines = [
        f"🔄 Release Cadence: {strategy['release_cadence']}",
        f"🔙 Rollback Strategy: {strategy['rollback_strategy']}",
        f"📊 Monitoring: {strategy['monitoring']}",
        f"📢 User Communication: {strategy['user_communication']}"
    ]
    
    lines.append("\n**Release Schedule:**")
    for release in strategy["release_schedule"]:
        lines.append(f"• {release['phase']}: {release['release_date']}")
    
    return "\n".join(lines)


def _format_deployment_pipeline(pipeline: Dict) -> str:
    """Format deployment pipeline."""
    lines = [
        f"⚡ Total Duration: {pipeline['total_duration_minutes']} minutes",
        f"🤖 Automation Level: {pipeline['automation_level']}",
        f"✋ Manual Gates: {', '.join(pipeline['manual_gates'])}"
    ]
    
    lines.append("\n**Pipeline Stages:**")
    for stage in pipeline["stages"]:
        lines.append(f"• {stage['name']} ({stage['duration_minutes']}min)")
    
    return "\n".join(lines)


def _format_quality_gates(quality_gates: List[Dict]) -> str:
    """Format quality gates."""
    lines = []
    
    for gate in quality_gates:
        lines.append(f"🚪 **{gate['name']}** ({gate['phase']})")
        lines.append(f"   Criteria: {', '.join(gate['criteria'])}")
    
    return "\n".join(lines)


def _format_delivery_risks(risks: List[Dict]) -> str:
    """Format delivery risks."""
    lines = []
    
    for risk in risks:
        lines.append(f"⚠️ **{risk['category'].title()}**: {risk['description']}")
        lines.append(f"   Probability: {risk['probability']} | Impact: {risk['impact']}")
    
    return "\n".join(lines)


def _format_delivery_metrics(metrics: Dict) -> str:
    """Format delivery metrics."""
    return f"""📊 Total Deliverables: {metrics['total_deliverables']}
📅 Delivery Phases: {metrics['delivery_phases']}
⏱️ Total Duration: {metrics['total_duration_weeks']} weeks
📈 Delivery Velocity: {metrics['delivery_velocity']:.1f} deliverables/week
🚪 Quality Gates: {metrics['quality_gates']}"""


def _format_communication_plan(comm_plan: Dict) -> str:
    """Format communication plan."""
    return f"""📢 Stakeholder Updates: {comm_plan['stakeholder_updates']}
🎬 Demo Schedule: {comm_plan['demo_schedule']}
💬 Feedback Collection: {comm_plan['feedback_collection']}
🚨 Escalation Process: {comm_plan['escalation_process']}"""
