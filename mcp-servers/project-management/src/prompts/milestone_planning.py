"""
Milestone Planning Prompt
Break down complex projects into manageable phases and milestones.
"""

from datetime import datetime, timedelta
from typing import Dict, List
import json


async def milestone_planning_prompt(
    project_id: str,
    planning_horizon: str = "full_project"
) -> str:
    """
    Break down project into detailed milestones with dependencies and deliverables.
    """

    # Load project data (simulated)
    project_data = await _load_project_data(project_id)
    
    if not project_data:
        return f"❌ Project `{project_id}` not found. Run `/project-management/project-kickoff` first."
    
    # Analyze current project state
    project_analysis = await _analyze_project_for_milestones(project_data)
    
    # Generate detailed milestones
    milestones = await _generate_detailed_milestones(project_data, planning_horizon)
    
    # Create dependency mapping
    dependencies = await _map_milestone_dependencies(milestones)
    
    # Calculate timeline and critical path
    timeline_analysis = await _analyze_milestone_timeline(milestones, dependencies)
    
    # Identify resource requirements
    resource_requirements = await _calculate_milestone_resources(milestones)
    
    # Generate milestone summary
    milestone_summary = f"""
🗓️ **Milestone Planning Complete: {project_data['name']}**

**Project Overview:**
🆔 Project ID: `{project_id}`
📊 Planning Horizon: {planning_horizon.replace('_', ' ').title()}
🎯 Total Milestones: {len(milestones)}
⏱️ Planned Duration: {timeline_analysis['total_weeks']} weeks

**Milestone Breakdown:**
{_format_milestone_details(milestones)}

**Critical Path Analysis:**
{_format_critical_path(timeline_analysis)}

**Dependency Map:**
{_format_dependencies(dependencies)}

**Resource Requirements:**
{_format_resource_requirements(resource_requirements)}

**Timeline Summary:**
📅 Start Date: {timeline_analysis['start_date']}
📅 End Date: {timeline_analysis['end_date']}
🎯 Key Deliverables: {timeline_analysis['major_deliverables']}

**Risk Factors:**
{_identify_milestone_risks(milestones, dependencies)}

**Recommended Actions:**
{_generate_milestone_recommendations(project_analysis, timeline_analysis)}

**Next Steps:**
• Use `/project-management/resource-optimization {project_id}` to assign teams to milestones
• Run `/project-management/risk-assessment {project_id}` to analyze milestone risks
• Use `generate-timeline` tool to create detailed Gantt chart
• Use `assign-tasks` tool to break down milestones into specific tasks

**Milestone Planning Complete ✅**
Ready to proceed with resource allocation and detailed task planning.
"""

    # Store milestone data
    await _store_milestone_data(project_id, {
        "milestones": milestones,
        "dependencies": dependencies,
        "timeline": timeline_analysis,
        "resources": resource_requirements,
        "planning_date": datetime.now().isoformat()
    })

    return milestone_summary


async def _load_project_data(project_id: str) -> Dict:
    """Load project data from storage."""
    # Simulated project data - in real implementation would load from database
    return {
        "name": f"Project {project_id}",
        "type": "Software Development",
        "complexity": "moderate",
        "duration_weeks": 12,
        "team_size": 5,
        "scope": "Mobile application development with backend API",
        "phases": [
            {"name": "Planning & Design", "duration_weeks": 2},
            {"name": "Development", "duration_weeks": 8},
            {"name": "Testing & QA", "duration_weeks": 2}
        ]
    }


async def _analyze_project_for_milestones(project_data: Dict) -> Dict:
    """Analyze project characteristics for milestone planning."""
    
    analysis = {
        "milestone_density": "medium",  # How many milestones needed
        "complexity_factors": [],
        "dependency_level": "medium",
        "risk_factors": []
    }
    
    # Analyze based on project type
    project_type = project_data.get("type", "").lower()
    
    if "software" in project_type or "development" in project_type:
        analysis["complexity_factors"].extend([
            "Technical integration points",
            "User interface dependencies", 
            "Testing phases"
        ])
        analysis["dependency_level"] = "high"
    
    # Analyze based on duration
    duration = project_data.get("duration_weeks", 0)
    if duration > 20:
        analysis["milestone_density"] = "high"
        analysis["risk_factors"].append("Long project duration increases coordination complexity")
    elif duration < 6:
        analysis["milestone_density"] = "low"
    
    # Analyze team size impact
    team_size = project_data.get("team_size", 0)
    if team_size > 8:
        analysis["dependency_level"] = "high"
        analysis["risk_factors"].append("Large team requires more coordination milestones")
    
    return analysis


async def _generate_detailed_milestones(project_data: Dict, planning_horizon: str) -> List[Dict]:
    """Generate detailed milestones based on project data."""
    
    milestones = []
    
    # Base milestones templates by project type
    if "software" in project_data.get("type", "").lower():
        milestone_templates = [
            {
                "name": "Requirements Finalization",
                "phase": "Planning",
                "duration_weeks": 1,
                "effort_percentage": 8,
                "deliverables": ["Requirements document", "User stories", "Acceptance criteria"],
                "success_criteria": ["All requirements reviewed and approved", "User stories prioritized"],
                "risk_level": "medium"
            },
            {
                "name": "System Architecture Design", 
                "phase": "Planning",
                "duration_weeks": 1,
                "effort_percentage": 10,
                "deliverables": ["Architecture diagram", "Technical specifications", "Technology stack decisions"],
                "success_criteria": ["Architecture approved by tech lead", "Performance requirements defined"],
                "risk_level": "high"
            },
            {
                "name": "Development Environment Setup",
                "phase": "Setup",
                "duration_weeks": 0.5,
                "effort_percentage": 5,
                "deliverables": ["Development environment", "CI/CD pipeline", "Code repositories"],
                "success_criteria": ["All developers can build and deploy", "Automated testing pipeline working"],
                "risk_level": "medium"
            },
            {
                "name": "Core Backend Development",
                "phase": "Development",
                "duration_weeks": 3,
                "effort_percentage": 25,
                "deliverables": ["Core API endpoints", "Database schema", "Authentication system"],
                "success_criteria": ["All core APIs functional", "Database performs within requirements"],
                "risk_level": "high"
            },
            {
                "name": "Frontend Development",
                "phase": "Development", 
                "duration_weeks": 3,
                "effort_percentage": 25,
                "deliverables": ["User interface", "Frontend components", "API integration"],
                "success_criteria": ["UI matches designs", "All user flows functional"],
                "risk_level": "medium"
            },
            {
                "name": "Integration & Testing",
                "phase": "Testing",
                "duration_weeks": 2,
                "effort_percentage": 15,
                "deliverables": ["Integration tests", "End-to-end tests", "Performance tests"],
                "success_criteria": ["All tests passing", "Performance targets met"],
                "risk_level": "high"
            },
            {
                "name": "User Acceptance Testing",
                "phase": "Testing",
                "duration_weeks": 1,
                "effort_percentage": 8,
                "deliverables": ["UAT results", "Bug fixes", "User documentation"],
                "success_criteria": ["Users approve functionality", "Critical bugs resolved"],
                "risk_level": "medium"
            },
            {
                "name": "Production Deployment",
                "phase": "Deployment",
                "duration_weeks": 0.5,
                "effort_percentage": 4,
                "deliverables": ["Production deployment", "Monitoring setup", "Documentation"],
                "success_criteria": ["System live and stable", "Monitoring alerts configured"],
                "risk_level": "high"
            }
        ]
    else:
        # Generic milestone template
        milestone_templates = [
            {
                "name": "Project Initiation",
                "phase": "Planning",
                "duration_weeks": 1,
                "effort_percentage": 10,
                "deliverables": ["Project charter", "Team assignments", "Communication plan"],
                "success_criteria": ["Project charter approved", "Team members confirmed"],
                "risk_level": "low"
            },
            {
                "name": "Planning & Design",
                "phase": "Planning",
                "duration_weeks": 2,
                "effort_percentage": 20,
                "deliverables": ["Detailed plan", "Design documents", "Resource allocation"],
                "success_criteria": ["Plan approved by stakeholders", "Resources confirmed"],
                "risk_level": "medium"
            },
            {
                "name": "Implementation Phase 1",
                "phase": "Execution",
                "duration_weeks": 4,
                "effort_percentage": 35,
                "deliverables": ["Core deliverables", "Progress reports", "Quality reviews"],
                "success_criteria": ["Phase 1 objectives met", "Quality standards achieved"],
                "risk_level": "medium"
            },
            {
                "name": "Implementation Phase 2",
                "phase": "Execution",
                "duration_weeks": 3,
                "effort_percentage": 25,
                "deliverables": ["Final deliverables", "Testing results", "Documentation"],
                "success_criteria": ["All deliverables complete", "Testing successful"],
                "risk_level": "medium"
            },
            {
                "name": "Project Closure",
                "phase": "Closure",
                "duration_weeks": 1,
                "effort_percentage": 10,
                "deliverables": ["Final reports", "Lessons learned", "Knowledge transfer"],
                "success_criteria": ["Project officially closed", "Lessons documented"],
                "risk_level": "low"
            }
        ]
    
    # Add milestone IDs and dates
    start_date = datetime.now()
    current_date = start_date
    
    for i, template in enumerate(milestone_templates):
        milestone = template.copy()
        milestone["id"] = f"milestone_{i+1:02d}"
        milestone["start_date"] = current_date.strftime("%Y-%m-%d")
        
        # Calculate end date
        end_date = current_date + timedelta(weeks=milestone["duration_weeks"])
        milestone["end_date"] = end_date.strftime("%Y-%m-%d")
        milestone["status"] = "planned"
        
        # Add buffer for high-risk milestones
        if milestone["risk_level"] == "high":
            buffer_days = int(milestone["duration_weeks"] * 7 * 0.2)  # 20% buffer
            end_date += timedelta(days=buffer_days)
            milestone["buffer_days"] = buffer_days
        
        current_date = end_date
        milestones.append(milestone)
    
    return milestones


async def _map_milestone_dependencies(milestones: List[Dict]) -> Dict:
    """Map dependencies between milestones."""
    
    dependencies = {
        "blocking": [],  # Milestone X blocks milestone Y
        "predecessor": [],  # Milestone X must complete before Y starts
        "concurrent": [],  # Milestones that can run in parallel
        "critical_path": []  # Milestones on the critical path
    }
    
    # Create dependency rules based on milestone types
    for i, milestone in enumerate(milestones):
        milestone_id = milestone["id"]
        
        # Sequential dependencies (most milestones depend on previous)
        if i > 0:
            prev_milestone = milestones[i-1]
            dependencies["predecessor"].append({
                "from": prev_milestone["id"],
                "to": milestone_id,
                "type": "finish_to_start",
                "lag_days": 0
            })
        
        # Identify critical path milestones
        if milestone["risk_level"] == "high" or milestone["effort_percentage"] > 20:
            dependencies["critical_path"].append(milestone_id)
    
    # Find concurrent opportunities
    for i, milestone in enumerate(milestones):
        for j, other_milestone in enumerate(milestones[i+1:], i+1):
            # Check if milestones can run concurrently
            if (milestone["phase"] == other_milestone["phase"] and 
                milestone["risk_level"] != "high" and 
                other_milestone["risk_level"] != "high"):
                
                dependencies["concurrent"].append({
                    "milestone_1": milestone["id"],
                    "milestone_2": other_milestone["id"],
                    "overlap_percentage": 50
                })
    
    return dependencies


async def _analyze_milestone_timeline(milestones: List[Dict], dependencies: Dict) -> Dict:
    """Analyze timeline and calculate critical path."""
    
    if not milestones:
        return {}
    
    total_weeks = sum(m["duration_weeks"] for m in milestones)
    start_date = milestones[0]["start_date"]
    end_date = milestones[-1]["end_date"]
    
    # Calculate critical path duration
    critical_milestones = [m for m in milestones if m["id"] in dependencies["critical_path"]]
    critical_path_weeks = sum(m["duration_weeks"] for m in critical_milestones)
    
    # Identify major deliverables
    major_deliverables = []
    for milestone in milestones:
        if milestone["effort_percentage"] > 15:
            major_deliverables.extend(milestone["deliverables"][:2])  # Top 2 deliverables
    
    return {
        "total_weeks": total_weeks,
        "critical_path_weeks": critical_path_weeks,
        "start_date": start_date,
        "end_date": end_date,
        "major_deliverables": major_deliverables[:5],  # Top 5
        "buffer_percentage": ((total_weeks * 1.2) - total_weeks) / total_weeks * 100,
        "parallel_opportunities": len(dependencies["concurrent"])
    }


async def _calculate_milestone_resources(milestones: List[Dict]) -> Dict:
    """Calculate resource requirements for milestones."""
    
    resource_summary = {
        "peak_effort_period": "",
        "resource_distribution": {},
        "skill_requirements": {},
        "capacity_warnings": []
    }
    
    # Find peak effort period
    max_effort = 0
    peak_milestone = ""
    
    for milestone in milestones:
        if milestone["effort_percentage"] > max_effort:
            max_effort = milestone["effort_percentage"]
            peak_milestone = milestone["name"]
    
    resource_summary["peak_effort_period"] = f"{peak_milestone} ({max_effort}% of total effort)"
    
    # Estimate skill requirements by phase
    skill_requirements = {}
    for milestone in milestones:
        phase = milestone["phase"]
        
        if phase not in skill_requirements:
            skill_requirements[phase] = []
        
        # Map phases to required skills
        phase_skills = {
            "Planning": ["Business Analysis", "Project Management", "System Architecture"],
            "Setup": ["DevOps", "System Administration", "Configuration Management"],
            "Development": ["Software Development", "Database Design", "API Development"],
            "Testing": ["Quality Assurance", "Test Automation", "Performance Testing"],
            "Deployment": ["DevOps", "System Administration", "Monitoring"],
            "Execution": ["Domain Expertise", "Project Management", "Quality Control"],
            "Closure": ["Documentation", "Knowledge Management", "Process Improvement"]
        }
        
        if phase in phase_skills:
            skill_requirements[phase].extend(phase_skills[phase])
    
    # Remove duplicates
    for phase in skill_requirements:
        skill_requirements[phase] = list(set(skill_requirements[phase]))
    
    resource_summary["skill_requirements"] = skill_requirements
    
    # Check for capacity warnings
    warnings = []
    high_effort_milestones = [m for m in milestones if m["effort_percentage"] > 20]
    
    if len(high_effort_milestones) > 3:
        warnings.append("Multiple high-effort milestones may strain team capacity")
    
    if any(m["risk_level"] == "high" for m in milestones):
        warnings.append("High-risk milestones require experienced team members")
    
    resource_summary["capacity_warnings"] = warnings
    
    return resource_summary


def _format_milestone_details(milestones: List[Dict]) -> str:
    """Format milestone details for display."""
    
    lines = []
    
    for milestone in milestones:
        risk_icon = "🔴" if milestone["risk_level"] == "high" else "🟡" if milestone["risk_level"] == "medium" else "🟢"
        
        lines.append(f"**{milestone['name']}** {risk_icon}")
        lines.append(f"  📅 {milestone['start_date']} → {milestone['end_date']} ({milestone['duration_weeks']} weeks)")
        lines.append(f"  💪 Effort: {milestone['effort_percentage']}% of total project")
        lines.append(f"  📦 Key Deliverables: {', '.join(milestone['deliverables'][:3])}")
        lines.append(f"  ✅ Success: {', '.join(milestone['success_criteria'][:2])}")
        
        if milestone.get("buffer_days"):
            lines.append(f"  ⏰ Buffer: {milestone['buffer_days']} days added for risk")
        
        lines.append("")  # Spacing
    
    return "\n".join(lines)


def _format_critical_path(timeline_analysis: Dict) -> str:
    """Format critical path analysis."""
    
    lines = [
        f"⚡ Critical Path Duration: {timeline_analysis['critical_path_weeks']} weeks",
        f"📊 Total Project Duration: {timeline_analysis['total_weeks']} weeks",
        f"🎯 Buffer Capacity: {timeline_analysis['buffer_percentage']:.1f}%"
    ]
    
    if timeline_analysis["parallel_opportunities"] > 0:
        lines.append(f"🔄 Parallel Work Opportunities: {timeline_analysis['parallel_opportunities']} identified")
    
    return "\n".join(lines)


def _format_dependencies(dependencies: Dict) -> str:
    """Format dependency information."""
    
    lines = []
    
    if dependencies["predecessor"]:
        lines.append(f"🔗 Sequential Dependencies: {len(dependencies['predecessor'])}")
        
    if dependencies["concurrent"]:
        lines.append(f"⚡ Parallel Opportunities: {len(dependencies['concurrent'])}")
        for concurrent in dependencies["concurrent"][:3]:  # Show first 3
            lines.append(f"  • {concurrent['milestone_1']} ↔ {concurrent['milestone_2']}")
    
    if dependencies["critical_path"]:
        lines.append(f"🎯 Critical Path Milestones: {len(dependencies['critical_path'])}")
    
    return "\n".join(lines) if lines else "ℹ️ No complex dependencies identified"


def _format_resource_requirements(resource_requirements: Dict) -> str:
    """Format resource requirements."""
    
    lines = [
        f"⚡ Peak Effort: {resource_requirements['peak_effort_period']}"
    ]
    
    if resource_requirements["skill_requirements"]:
        lines.append("🛠️ Skills Needed by Phase:")
        for phase, skills in resource_requirements["skill_requirements"].items():
            lines.append(f"  • {phase}: {', '.join(skills[:3])}")
    
    if resource_requirements["capacity_warnings"]:
        lines.append("⚠️ Capacity Warnings:")
        for warning in resource_requirements["capacity_warnings"]:
            lines.append(f"  • {warning}")
    
    return "\n".join(lines)


def _identify_milestone_risks(milestones: List[Dict], dependencies: Dict) -> str:
    """Identify risks in milestone plan."""
    
    risks = []
    
    # Timeline risks
    high_risk_milestones = [m for m in milestones if m["risk_level"] == "high"]
    if len(high_risk_milestones) > 2:
        risks.append(f"⚠️ {len(high_risk_milestones)} high-risk milestones may cause delays")
    
    # Dependency risks
    if len(dependencies["critical_path"]) > len(milestones) * 0.6:
        risks.append("⚠️ Too many critical path milestones - limited flexibility")
    
    # Resource risks
    high_effort_count = len([m for m in milestones if m["effort_percentage"] > 20])
    if high_effort_count > 3:
        risks.append("⚠️ Multiple high-effort milestones may strain resources")
    
    # Buffer risks
    total_buffer_days = sum(m.get("buffer_days", 0) for m in milestones)
    if total_buffer_days > 14:
        risks.append(f"⚠️ High buffer allocation ({total_buffer_days} days) indicates uncertainty")
    
    return "\n".join(risks) if risks else "✅ No significant milestone risks identified"


def _generate_milestone_recommendations(project_analysis: Dict, timeline_analysis: Dict) -> str:
    """Generate recommendations for milestone execution."""
    
    recommendations = []
    
    # Based on complexity
    if "high" in str(project_analysis):
        recommendations.append("🎯 Schedule weekly milestone reviews for high-complexity project")
    
    # Based on timeline
    if timeline_analysis["parallel_opportunities"] > 2:
        recommendations.append("⚡ Leverage parallel work opportunities to accelerate delivery")
    
    # Based on critical path
    if timeline_analysis["critical_path_weeks"] > timeline_analysis["total_weeks"] * 0.8:
        recommendations.append("🔍 Focus project management efforts on critical path milestones")
    
    # Always include
    recommendations.append("📊 Set up automated progress tracking for each milestone")
    recommendations.append("👥 Assign milestone owners and define clear accountability")
    
    return "\n".join(f"• {rec}" for rec in recommendations[:4])


async def _store_milestone_data(project_id: str, data: Dict) -> None:
    """Store milestone data for later retrieval."""
    # In a real implementation, this would save to a database or file system
    pass
