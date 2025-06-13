"""
Resource Optimization Prompt
Optimize team allocation and capacity planning for project success.
"""

from datetime import datetime, timedelta
from typing import Dict, List, Tuple
import json


async def resource_optimization_prompt(
    project_id: str,
    constraint_type: str = "time_and_budget"
) -> str:
    """
    Optimize resource allocation with intelligent team assignment and capacity planning.
    """

    # Load project and milestone data
    project_data = await _load_project_data(project_id)
    milestone_data = await _load_milestone_data(project_id)
    
    if not project_data:
        return f"❌ Project `{project_id}` not found. Run `/project-management/project-kickoff` first."
    
    # Analyze current resource landscape
    resource_analysis = await _analyze_resource_landscape(project_data, milestone_data)
    
    # Generate optimal team structure
    optimal_team = await _design_optimal_team(project_data, resource_analysis, constraint_type)
    
    # Create resource allocation plan
    allocation_plan = await _create_allocation_plan(milestone_data, optimal_team)
    
    # Calculate capacity utilization
    capacity_analysis = await _analyze_capacity_utilization(allocation_plan, optimal_team)
    
    # Identify optimization opportunities
    optimizations = await _identify_optimizations(allocation_plan, capacity_analysis, constraint_type)
    
    # Generate cost analysis
    cost_analysis = await _calculate_resource_costs(optimal_team, allocation_plan)
    
    # Create resource optimization summary
    optimization_summary = f"""
👥 **Resource Optimization Complete: {project_data['name']}**

**Optimization Focus:** {constraint_type.replace('_', ' ').title()}
**Team Structure Optimized:** {len(optimal_team['roles'])} roles identified

**Optimal Team Structure:**
{_format_team_structure(optimal_team)}

**Resource Allocation Plan:**
{_format_allocation_plan(allocation_plan)}

**Capacity Analysis:**
{_format_capacity_analysis(capacity_analysis)}

**Cost Analysis:**
{_format_cost_analysis(cost_analysis)}

**Optimization Opportunities:**
{_format_optimizations(optimizations)}

**Resource Utilization:**
📊 Average Utilization: {capacity_analysis['average_utilization']:.1f}%
⚡ Peak Utilization: {capacity_analysis['peak_utilization']:.1f}%
📉 Minimum Utilization: {capacity_analysis['minimum_utilization']:.1f}%

**Risk Assessment:**
{_assess_resource_risks(optimal_team, capacity_analysis)}

**Recommendations:**
{_generate_resource_recommendations(resource_analysis, optimizations)}

**Next Steps:**
• Use `assign-tasks` tool to implement resource assignments
• Run `/project-management/delivery-planning {project_id}` to align delivery with resources
• Use `track-progress` tool to monitor resource utilization
• Consider `/project-management/risk-assessment {project_id}` for resource-related risks

**Resource Optimization Complete ✅**
Team structure and allocation plan ready for implementation.
"""

    # Store optimization data
    await _store_optimization_data(project_id, {
        "optimal_team": optimal_team,
        "allocation_plan": allocation_plan,
        "capacity_analysis": capacity_analysis,
        "optimizations": optimizations,
        "cost_analysis": cost_analysis,
        "optimization_date": datetime.now().isoformat()
    })

    return optimization_summary


async def _load_project_data(project_id: str) -> Dict:
    """Load project data."""
    # Simulated - in real implementation would load from database
    return {
        "name": f"Project {project_id}",
        "type": "Software Development",
        "complexity": "moderate",
        "duration_weeks": 12,
        "team_size": 5,
        "budget_range": {"min": 240000, "max": 336000}
    }


async def _load_milestone_data(project_id: str) -> Dict:
    """Load milestone data."""
    # Simulated milestone data
    return {
        "milestones": [
            {"name": "Requirements", "duration_weeks": 1, "skills_needed": ["Business Analysis", "Project Management"]},
            {"name": "Architecture", "duration_weeks": 1, "skills_needed": ["System Architecture", "Technical Leadership"]},
            {"name": "Backend Development", "duration_weeks": 3, "skills_needed": ["Backend Development", "Database Design"]},
            {"name": "Frontend Development", "duration_weeks": 3, "skills_needed": ["Frontend Development", "UI/UX"]},
            {"name": "Testing", "duration_weeks": 2, "skills_needed": ["Quality Assurance", "Test Automation"]},
            {"name": "Deployment", "duration_weeks": 1, "skills_needed": ["DevOps", "System Administration"]}
        ]
    }


async def _analyze_resource_landscape(project_data: Dict, milestone_data: Dict) -> Dict:
    """Analyze the resource requirements and constraints."""
    
    # Extract all required skills
    all_skills = set()
    if milestone_data and "milestones" in milestone_data:
        for milestone in milestone_data["milestones"]:
            all_skills.update(milestone.get("skills_needed", []))
    
    # Categorize skills
    skill_categories = _categorize_skills(list(all_skills))
    
    # Estimate workload distribution
    workload_analysis = _analyze_workload_distribution(milestone_data)
    
    # Assess project constraints
    constraints = _identify_project_constraints(project_data)
    
    return {
        "required_skills": list(all_skills),
        "skill_categories": skill_categories,
        "workload_distribution": workload_analysis,
        "constraints": constraints,
        "resource_complexity": "high" if len(all_skills) > 8 else "medium" if len(all_skills) > 5 else "low"
    }


def _categorize_skills(skills: List[str]) -> Dict:
    """Categorize skills into functional areas."""
    
    categories = {
        "technical": [],
        "management": [],
        "quality": [],
        "design": [],
        "domain": []
    }
    
    skill_mapping = {
        "technical": ["Backend Development", "Frontend Development", "Database Design", "DevOps", "System Architecture", "API Development"],
        "management": ["Project Management", "Technical Leadership", "Team Leadership", "Business Analysis"],
        "quality": ["Quality Assurance", "Test Automation", "Performance Testing", "Security Testing"],
        "design": ["UI/UX", "System Design", "Architecture Design", "User Experience"],
        "domain": ["Business Analysis", "Domain Expertise", "Requirements Analysis"]
    }
    
    for skill in skills:
        categorized = False
        for category, category_skills in skill_mapping.items():
            if any(cat_skill in skill for cat_skill in category_skills):
                categories[category].append(skill)
                categorized = True
                break
        
        if not categorized:
            categories["domain"].append(skill)
    
    return categories


def _analyze_workload_distribution(milestone_data: Dict) -> Dict:
    """Analyze how workload is distributed across time."""
    
    if not milestone_data or "milestones" not in milestone_data:
        return {"pattern": "unknown", "peak_periods": [], "utilization": "unknown"}
    
    milestones = milestone_data["milestones"]
    
    # Calculate workload by time period
    timeline = []
    current_week = 0
    
    for milestone in milestones:
        duration = milestone.get("duration_weeks", 1)
        skills_count = len(milestone.get("skills_needed", []))
        
        timeline.append({
            "start_week": current_week,
            "end_week": current_week + duration,
            "milestone": milestone["name"],
            "skills_required": skills_count,
            "intensity": skills_count * duration
        })
        
        current_week += duration
    
    # Find peak periods
    peak_periods = []
    max_intensity = max(period["intensity"] for period in timeline)
    
    for period in timeline:
        if period["intensity"] >= max_intensity * 0.8:  # 80% of max
            peak_periods.append(period["milestone"])
    
    return {
        "pattern": "front_loaded" if timeline[0]["intensity"] == max_intensity else "back_loaded" if timeline[-1]["intensity"] == max_intensity else "balanced",
        "peak_periods": peak_periods,
        "timeline": timeline
    }


def _identify_project_constraints(project_data: Dict) -> Dict:
    """Identify resource constraints."""
    
    constraints = {
        "budget": "medium",
        "time": "medium", 
        "team_size": "medium",
        "skill_availability": "medium"
    }
    
    # Budget constraints
    budget_range = project_data.get("budget_range", {})
    if budget_range.get("max", 0) - budget_range.get("min", 0) < budget_range.get("min", 0) * 0.3:
        constraints["budget"] = "high"
    
    # Time constraints
    duration = project_data.get("duration_weeks", 0)
    if duration < 8:
        constraints["time"] = "high"
    elif duration > 20:
        constraints["time"] = "low"
    
    # Team size constraints
    team_size = project_data.get("team_size", 0)
    if team_size < 4:
        constraints["team_size"] = "high"
    elif team_size > 10:
        constraints["team_size"] = "low"
    
    return constraints


async def _design_optimal_team(project_data: Dict, resource_analysis: Dict, constraint_type: str) -> Dict:
    """Design the optimal team structure."""
    
    required_skills = resource_analysis["required_skills"]
    skill_categories = resource_analysis["skill_categories"]
    constraints = resource_analysis["constraints"]
    
    # Define role templates based on project type
    role_templates = _get_role_templates(project_data.get("type", ""))
    
    # Optimize team composition based on constraints
    if constraint_type == "time":
        team_structure = _optimize_for_time(role_templates, required_skills, constraints)
    elif constraint_type == "budget":
        team_structure = _optimize_for_budget(role_templates, required_skills, constraints)
    else:  # time_and_budget
        team_structure = _optimize_for_balanced(role_templates, required_skills, constraints)
    
    # Calculate team metrics
    team_metrics = _calculate_team_metrics(team_structure)
    
    return {
        "roles": team_structure["roles"],
        "total_members": team_structure["total_members"],
        "skill_coverage": team_structure["skill_coverage"],
        "metrics": team_metrics,
        "optimization_focus": constraint_type
    }


def _get_role_templates(project_type: str) -> Dict:
    """Get role templates based on project type."""
    
    if "software" in project_type.lower():
        return {
            "Project Manager": {
                "skills": ["Project Management", "Team Leadership", "Business Analysis"],
                "utilization": 0.8,
                "cost_per_week": 2500,
                "criticality": "high"
            },
            "Technical Lead": {
                "skills": ["System Architecture", "Technical Leadership", "Backend Development"],
                "utilization": 0.9,
                "cost_per_week": 3000,
                "criticality": "high"
            },
            "Senior Developer": {
                "skills": ["Backend Development", "Frontend Development", "Database Design"],
                "utilization": 0.9,
                "cost_per_week": 2500,
                "criticality": "high"
            },
            "Frontend Developer": {
                "skills": ["Frontend Development", "UI/UX"],
                "utilization": 0.85,
                "cost_per_week": 2200,
                "criticality": "medium"
            },
            "DevOps Engineer": {
                "skills": ["DevOps", "System Administration"],
                "utilization": 0.6,
                "cost_per_week": 2800,
                "criticality": "medium"
            },
            "QA Engineer": {
                "skills": ["Quality Assurance", "Test Automation"],
                "utilization": 0.7,
                "cost_per_week": 2000,
                "criticality": "medium"
            }
        }
    else:
        # Generic roles
        return {
            "Project Manager": {
                "skills": ["Project Management", "Team Leadership"],
                "utilization": 0.8,
                "cost_per_week": 2500,
                "criticality": "high"
            },
            "Team Lead": {
                "skills": ["Technical Leadership", "Domain Expertise"],
                "utilization": 0.9,
                "cost_per_week": 2800,
                "criticality": "high"
            },
            "Senior Specialist": {
                "skills": ["Domain Expertise", "Business Analysis"],
                "utilization": 0.9,
                "cost_per_week": 2300,
                "criticality": "high"
            },
            "Specialist": {
                "skills": ["Domain Expertise"],
                "utilization": 0.85,
                "cost_per_week": 2000,
                "criticality": "medium"
            }
        }


def _optimize_for_time(role_templates: Dict, required_skills: List[str], constraints: Dict) -> Dict:
    """Optimize team for fastest delivery."""
    
    # Add more parallel capacity
    selected_roles = {}
    skill_coverage = set()
    
    # Always include critical roles
    for role, template in role_templates.items():
        if template["criticality"] == "high":
            selected_roles[role] = {
                "count": 1,
                "skills": template["skills"],
                "utilization": template["utilization"],
                "cost_per_week": template["cost_per_week"]
            }
            skill_coverage.update(template["skills"])
    
    # Add additional capacity for uncovered skills
    for skill in required_skills:
        if skill not in skill_coverage:
            # Find best role to add
            best_role = None
            for role, template in role_templates.items():
                if skill in template["skills"] and role not in selected_roles:
                    best_role = role
                    break
            
            if best_role:
                selected_roles[best_role] = {
                    "count": 1,
                    "skills": role_templates[best_role]["skills"],
                    "utilization": role_templates[best_role]["utilization"],
                    "cost_per_week": role_templates[best_role]["cost_per_week"]
                }
                skill_coverage.update(role_templates[best_role]["skills"])
    
    return {
        "roles": selected_roles,
        "total_members": sum(role["count"] for role in selected_roles.values()),
        "skill_coverage": list(skill_coverage)
    }


def _optimize_for_budget(role_templates: Dict, required_skills: List[str], constraints: Dict) -> Dict:
    """Optimize team for lowest cost."""
    
    # Select minimum viable team
    selected_roles = {}
    skill_coverage = set()
    
    # Sort roles by cost efficiency (skills per cost)
    role_efficiency = []
    for role, template in role_templates.items():
        efficiency = len(template["skills"]) / template["cost_per_week"]
        role_efficiency.append((role, efficiency, template))
    
    role_efficiency.sort(key=lambda x: x[1], reverse=True)
    
    # Select roles to cover all skills with minimum cost
    for role, efficiency, template in role_efficiency:
        new_skills = set(template["skills"]) - skill_coverage
        if new_skills or template["criticality"] == "high":
            selected_roles[role] = {
                "count": 1,
                "skills": template["skills"],
                "utilization": min(template["utilization"] * 1.1, 1.0),  # Slightly higher utilization
                "cost_per_week": template["cost_per_week"]
            }
            skill_coverage.update(template["skills"])
        
        # Stop if all skills covered
        if all(skill in skill_coverage for skill in required_skills):
            break
    
    return {
        "roles": selected_roles,
        "total_members": sum(role["count"] for role in selected_roles.values()),
        "skill_coverage": list(skill_coverage)
    }


def _optimize_for_balanced(role_templates: Dict, required_skills: List[str], constraints: Dict) -> Dict:
    """Optimize team for balanced time and budget."""
    
    # Balanced approach - core team with some flexibility
    selected_roles = {}
    skill_coverage = set()
    
    # Start with essential roles
    essential_roles = [role for role, template in role_templates.items() if template["criticality"] == "high"]
    
    for role in essential_roles:
        template = role_templates[role]
        selected_roles[role] = {
            "count": 1,
            "skills": template["skills"],
            "utilization": template["utilization"],
            "cost_per_week": template["cost_per_week"]
        }
        skill_coverage.update(template["skills"])
    
    # Add roles for uncovered critical skills
    uncovered_skills = [skill for skill in required_skills if skill not in skill_coverage]
    
    for skill in uncovered_skills:
        # Find most cost-effective role that covers this skill
        best_role = None
        best_value = 0
        
        for role, template in role_templates.items():
            if skill in template["skills"] and role not in selected_roles:
                # Value = skills covered / cost
                value = len([s for s in template["skills"] if s in uncovered_skills]) / template["cost_per_week"]
                if value > best_value:
                    best_value = value
                    best_role = role
        
        if best_role:
            template = role_templates[best_role]
            selected_roles[best_role] = {
                "count": 1,
                "skills": template["skills"],
                "utilization": template["utilization"],
                "cost_per_week": template["cost_per_week"]
            }
            skill_coverage.update(template["skills"])
    
    return {
        "roles": selected_roles,
        "total_members": sum(role["count"] for role in selected_roles.values()),
        "skill_coverage": list(skill_coverage)
    }


def _calculate_team_metrics(team_structure: Dict) -> Dict:
    """Calculate team performance metrics."""
    
    total_cost = sum(role["count"] * role["cost_per_week"] for role in team_structure["roles"].values())
    avg_utilization = sum(role["utilization"] for role in team_structure["roles"].values()) / len(team_structure["roles"])
    
    return {
        "weekly_cost": total_cost,
        "average_utilization": avg_utilization * 100,
        "skill_coverage_percentage": len(team_structure["skill_coverage"]) / max(len(team_structure["skill_coverage"]), 1) * 100,
        "team_efficiency": avg_utilization * len(team_structure["skill_coverage"])
    }


async def _create_allocation_plan(milestone_data: Dict, optimal_team: Dict) -> Dict:
    """Create detailed resource allocation plan."""
    
    if not milestone_data or "milestones" not in milestone_data:
        return {"allocations": [], "timeline": []}
    
    allocations = []
    current_week = 0
    
    for milestone in milestone_data["milestones"]:
        milestone_name = milestone["name"]
        duration = milestone.get("duration_weeks", 1)
        required_skills = milestone.get("skills_needed", [])
        
        # Find team members who can work on this milestone
        assigned_roles = []
        for role, role_info in optimal_team["roles"].items():
            # Check if role has required skills
            role_skills = set(role_info["skills"])
            milestone_skills = set(required_skills)
            
            if role_skills.intersection(milestone_skills):
                assigned_roles.append({
                    "role": role,
                    "count": role_info["count"],
                    "utilization": role_info["utilization"],
                    "matching_skills": list(role_skills.intersection(milestone_skills))
                })
        
        allocations.append({
            "milestone": milestone_name,
            "start_week": current_week,
            "end_week": current_week + duration,
            "duration_weeks": duration,
            "required_skills": required_skills,
            "assigned_roles": assigned_roles,
            "total_assigned": sum(role["count"] for role in assigned_roles)
        })
        
        current_week += duration
    
    return {"allocations": allocations}


async def _analyze_capacity_utilization(allocation_plan: Dict, optimal_team: Dict) -> Dict:
    """Analyze capacity utilization across the project."""
    
    if not allocation_plan.get("allocations"):
        return {"average_utilization": 0, "peak_utilization": 0, "minimum_utilization": 0}
    
    # Calculate utilization for each time period
    utilizations = []
    
    for allocation in allocation_plan["allocations"]:
        total_capacity = sum(role["count"] * role["utilization"] for role in allocation["assigned_roles"])
        total_team_capacity = sum(role["count"] * role["utilization"] for role in optimal_team["roles"].values())
        
        utilization = (total_capacity / max(total_team_capacity, 1)) * 100
        utilizations.append(utilization)
    
    return {
        "average_utilization": sum(utilizations) / len(utilizations) if utilizations else 0,
        "peak_utilization": max(utilizations) if utilizations else 0,
        "minimum_utilization": min(utilizations) if utilizations else 0,
        "utilization_timeline": utilizations
    }


async def _identify_optimizations(allocation_plan: Dict, capacity_analysis: Dict, constraint_type: str) -> List[Dict]:
    """Identify optimization opportunities."""
    
    optimizations = []
    
    # Utilization optimizations
    if capacity_analysis["peak_utilization"] > 95:
        optimizations.append({
            "type": "capacity",
            "priority": "high",
            "description": "Peak utilization exceeds 95% - risk of burnout",
            "recommendation": "Add buffer capacity or extend timeline",
            "impact": "Reduces delivery risk"
        })
    
    if capacity_analysis["minimum_utilization"] < 50:
        optimizations.append({
            "type": "efficiency",
            "priority": "medium", 
            "description": "Low utilization periods detected",
            "recommendation": "Reassign resources or bring forward other work",
            "impact": "Improves cost efficiency"
        })
    
    # Resource allocation optimizations
    if allocation_plan.get("allocations"):
        skill_gaps = []
        for allocation in allocation_plan["allocations"]:
            required_skills = set(allocation["required_skills"])
            available_skills = set()
            for role in allocation["assigned_roles"]:
                available_skills.update(role["matching_skills"])
            
            gaps = required_skills - available_skills
            if gaps:
                skill_gaps.extend(gaps)
        
        if skill_gaps:
            optimizations.append({
                "type": "skills",
                "priority": "high",
                "description": f"Skill gaps identified: {', '.join(set(skill_gaps))}",
                "recommendation": "Add specialists or provide training",
                "impact": "Ensures milestone success"
            })
    
    return optimizations


async def _calculate_resource_costs(optimal_team: Dict, allocation_plan: Dict) -> Dict:
    """Calculate comprehensive cost analysis."""
    
    # Weekly costs
    weekly_cost = sum(role["count"] * role["cost_per_week"] for role in optimal_team["roles"].values())
    
    # Project duration (from allocation plan)
    if allocation_plan.get("allocations"):
        total_weeks = max(allocation["end_week"] for allocation in allocation_plan["allocations"])
    else:
        total_weeks = 12  # Default
    
    total_cost = weekly_cost * total_weeks
    
    # Cost breakdown by role
    cost_breakdown = {}
    for role, role_info in optimal_team["roles"].items():
        role_total = role_info["count"] * role_info["cost_per_week"] * total_weeks
        cost_breakdown[role] = {
            "weekly": role_info["count"] * role_info["cost_per_week"],
            "total": role_total,
            "percentage": (role_total / total_cost) * 100 if total_cost > 0 else 0
        }
    
    return {
        "weekly_cost": weekly_cost,
        "total_cost": total_cost,
        "project_duration_weeks": total_weeks,
        "cost_per_week_per_person": weekly_cost / optimal_team["total_members"] if optimal_team["total_members"] > 0 else 0,
        "cost_breakdown": cost_breakdown
    }


def _format_team_structure(optimal_team: Dict) -> str:
    """Format team structure for display."""
    
    lines = [f"👥 Team Size: {optimal_team['total_members']} members"]
    lines.append(f"🛠️ Skills Covered: {len(optimal_team['skill_coverage'])} unique skills")
    lines.append(f"💰 Weekly Cost: ${optimal_team['metrics']['weekly_cost']:,.2f}")
    lines.append("")
    lines.append("**Team Composition:**")
    
    for role, role_info in optimal_team["roles"].items():
        count_text = f"({role_info['count']}x)" if role_info["count"] > 1 else ""
        utilization = role_info["utilization"] * 100
        lines.append(f"• **{role}** {count_text} - {utilization:.0f}% utilization")
        lines.append(f"  Skills: {', '.join(role_info['skills'][:3])}")
    
    return "\n".join(lines)


def _format_allocation_plan(allocation_plan: Dict) -> str:
    """Format allocation plan for display."""
    
    if not allocation_plan.get("allocations"):
        return "No allocation plan available"
    
    lines = ["**Resource Allocation by Milestone:**"]
    
    for allocation in allocation_plan["allocations"]:
        lines.append(f"📊 **{allocation['milestone']}** (Weeks {allocation['start_week']}-{allocation['end_week']})")
        lines.append(f"  👥 Team Members: {allocation['total_assigned']}")
        lines.append(f"  🛠️ Skills: {', '.join(allocation['required_skills'][:3])}")
        
        if allocation["assigned_roles"]:
            assigned = [f"{role['role']} ({role['count']})" for role in allocation["assigned_roles"][:3]]
            lines.append(f"  📋 Assigned: {', '.join(assigned)}")
        lines.append("")
    
    return "\n".join(lines)


def _format_capacity_analysis(capacity_analysis: Dict) -> str:
    """Format capacity analysis for display."""
    
    lines = [
        f"📊 Average Utilization: {capacity_analysis['average_utilization']:.1f}%",
        f"⚡ Peak Utilization: {capacity_analysis['peak_utilization']:.1f}%",
        f"📉 Minimum Utilization: {capacity_analysis['minimum_utilization']:.1f}%"
    ]
    
    # Add utilization assessment
    avg_util = capacity_analysis['average_utilization']
    if avg_util > 90:
        lines.append("⚠️ High utilization - monitor for burnout risk")
    elif avg_util < 60:
        lines.append("💡 Low utilization - opportunity for efficiency gains")
    else:
        lines.append("✅ Healthy utilization levels")
    
    return "\n".join(lines)


def _format_cost_analysis(cost_analysis: Dict) -> str:
    """Format cost analysis for display."""
    
    lines = [
        f"💰 Total Project Cost: ${cost_analysis['total_cost']:,.2f}",
        f"📅 Duration: {cost_analysis['project_duration_weeks']} weeks",
        f"💵 Weekly Cost: ${cost_analysis['weekly_cost']:,.2f}",
        f"👤 Cost per Person per Week: ${cost_analysis['cost_per_week_per_person']:,.2f}"
    ]
    
    lines.append("\n**Cost Breakdown by Role:**")
    for role, cost_info in cost_analysis["cost_breakdown"].items():
        lines.append(f"• {role}: ${cost_info['total']:,.2f} ({cost_info['percentage']:.1f}%)")
    
    return "\n".join(lines)


def _format_optimizations(optimizations: List[Dict]) -> str:
    """Format optimization opportunities."""
    
    if not optimizations:
        return "✅ No significant optimization opportunities identified"
    
    lines = [f"🎯 {len(optimizations)} Optimization Opportunities:"]
    
    for opt in optimizations:
        priority_icon = "🔴" if opt["priority"] == "high" else "🟡" if opt["priority"] == "medium" else "🟢"
        lines.append(f"{priority_icon} **{opt['type'].title()}**: {opt['description']}")
        lines.append(f"   💡 {opt['recommendation']}")
        lines.append(f"   📈 Impact: {opt['impact']}")
        lines.append("")
    
    return "\n".join(lines)


def _assess_resource_risks(optimal_team: Dict, capacity_analysis: Dict) -> str:
    """Assess resource-related risks."""
    
    risks = []
    
    # Team size risks
    if optimal_team["total_members"] < 3:
        risks.append("⚠️ Small team size increases key person dependency risk")
    elif optimal_team["total_members"] > 10:
        risks.append("⚠️ Large team size may increase coordination overhead")
    
    # Utilization risks
    if capacity_analysis["peak_utilization"] > 95:
        risks.append("⚠️ Very high peak utilization may lead to burnout")
    
    # Skill coverage risks
    if len(optimal_team["skill_coverage"]) < 5:
        risks.append("⚠️ Limited skill diversity increases technical risk")
    
    return "\n".join(risks) if risks else "✅ No significant resource risks identified"


def _generate_resource_recommendations(resource_analysis: Dict, optimizations: List[Dict]) -> str:
    """Generate resource management recommendations."""
    
    recommendations = []
    
    # Based on resource complexity
    if resource_analysis["resource_complexity"] == "high":
        recommendations.append("🎯 Implement weekly resource reviews due to high complexity")
    
    # Based on optimizations
    high_priority_opts = [opt for opt in optimizations if opt["priority"] == "high"]
    if high_priority_opts:
        recommendations.append(f"🔴 Address {len(high_priority_opts)} high-priority optimizations immediately")
    
    # General recommendations
    recommendations.append("📊 Set up automated resource utilization tracking")
    recommendations.append("👥 Establish clear role definitions and responsibilities")
    recommendations.append("🔄 Plan for knowledge sharing and cross-training")
    
    return "\n".join(f"• {rec}" for rec in recommendations[:4])


async def _store_optimization_data(project_id: str, data: Dict) -> None:
    """Store optimization data for later retrieval."""
    # In a real implementation, this would save to a database or file system
    pass
