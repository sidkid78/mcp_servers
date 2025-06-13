"""
Assign Tasks Tool
Resource allocation and task assignment with optimization.
"""

from typing import Dict, List
from datetime import datetime, timedelta


async def assign_tasks_tool(
    project_id: str,
    tasks: List[Dict],
    assignment_strategy: str = "balanced"
) -> Dict:
    """
    Assign tasks to team members with intelligent resource optimization.
    """

    try:
        # Load project context
        project_context = await _load_project_context(project_id)
        
        # Analyze tasks and requirements
        task_analysis = await _analyze_tasks(tasks)
        
        # Generate optimal assignments
        assignments = await _generate_assignments(tasks, project_context, assignment_strategy)
        
        # Calculate resource utilization
        utilization = await _calculate_utilization(assignments, project_context)
        
        # Identify potential conflicts
        conflicts = await _identify_conflicts(assignments)
        
        return {
            "success": True,
            "project_id": project_id,
            "total_tasks": len(tasks),
            "assignments": assignments,
            "task_analysis": task_analysis,
            "utilization": utilization,
            "conflicts": conflicts,
            "strategy_used": assignment_strategy,
            "message": f"Successfully assigned {len(tasks)} tasks using {assignment_strategy} strategy",
            "recommendations": _generate_assignment_recommendations(assignments, conflicts)
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Task assignment failed: {str(e)}",
            "message": "Please check task data and try again."
        }


async def _load_project_context(project_id: str) -> Dict:
    """Load project context and team information."""
    return {
        "team_members": [
            {"id": "tm001", "name": "Alice Johnson", "role": "Project Manager", "skills": ["Project Management", "Business Analysis"], "capacity": 40},
            {"id": "tm002", "name": "Bob Smith", "role": "Senior Developer", "skills": ["Backend Development", "Database Design"], "capacity": 40},
            {"id": "tm003", "name": "Carol Davis", "role": "Frontend Developer", "skills": ["Frontend Development", "UI/UX"], "capacity": 40},
            {"id": "tm004", "name": "David Wilson", "role": "QA Engineer", "skills": ["Quality Assurance", "Test Automation"], "capacity": 35},
            {"id": "tm005", "name": "Eva Brown", "role": "DevOps Engineer", "skills": ["DevOps", "System Administration"], "capacity": 30}
        ],
        "project_timeline": 12,
        "current_week": 3
    }


async def _analyze_tasks(tasks: List[Dict]) -> Dict:
    """Analyze task characteristics and requirements."""
    total_effort = sum(task.get("effort_hours", 8) for task in tasks)
    
    skill_requirements = {}
    priority_distribution = {"high": 0, "medium": 0, "low": 0}
    
    for task in tasks:
        # Count skill requirements
        for skill in task.get("required_skills", []):
            skill_requirements[skill] = skill_requirements.get(skill, 0) + 1
        
        # Count priority distribution
        priority = task.get("priority", "medium")
        priority_distribution[priority] = priority_distribution.get(priority, 0) + 1
    
    return {
        "total_effort_hours": total_effort,
        "average_effort_per_task": total_effort / len(tasks) if tasks else 0,
        "skill_requirements": skill_requirements,
        "priority_distribution": priority_distribution,
        "complexity_score": _calculate_complexity_score(tasks)
    }


def _calculate_complexity_score(tasks: List[Dict]) -> str:
    """Calculate overall task complexity."""
    complexity_points = 0
    
    for task in tasks:
        # Add points based on various factors
        if task.get("effort_hours", 0) > 40:
            complexity_points += 3
        elif task.get("effort_hours", 0) > 20:
            complexity_points += 2
        
        if len(task.get("required_skills", [])) > 2:
            complexity_points += 2
        
        if task.get("priority") == "high":
            complexity_points += 1
        
        if len(task.get("dependencies", [])) > 0:
            complexity_points += 1
    
    avg_complexity = complexity_points / len(tasks) if tasks else 0
    
    if avg_complexity >= 4:
        return "very_high"
    elif avg_complexity >= 3:
        return "high"
    elif avg_complexity >= 2:
        return "medium"
    else:
        return "low"


async def _generate_assignments(tasks: List[Dict], context: Dict, strategy: str) -> List[Dict]:
    """Generate optimal task assignments."""
    assignments = []
    team_members = context["team_members"]
    
    # Sort tasks by priority and effort
    sorted_tasks = sorted(tasks, key=lambda t: (
        {"high": 3, "medium": 2, "low": 1}.get(t.get("priority", "medium"), 2),
        -t.get("effort_hours", 8)
    ), reverse=True)
    
    # Track member workloads
    member_workloads = {member["id"]: 0 for member in team_members}
    
    for task in sorted_tasks:
        best_assignee = _find_best_assignee(task, team_members, member_workloads, strategy)
        
        if best_assignee:
            assignment = {
                "task_id": task.get("id", f"task_{len(assignments)+1}"),
                "task_name": task.get("name", "Unnamed Task"),
                "assignee_id": best_assignee["id"],
                "assignee_name": best_assignee["name"],
                "effort_hours": task.get("effort_hours", 8),
                "priority": task.get("priority", "medium"),
                "start_date": (datetime.now() + timedelta(days=len(assignments))).strftime("%Y-%m-%d"),
                "estimated_completion": (datetime.now() + timedelta(days=len(assignments) + task.get("effort_hours", 8)//8)).strftime("%Y-%m-%d"),
                "skill_match_score": _calculate_skill_match(task, best_assignee),
                "workload_after_assignment": member_workloads[best_assignee["id"]] + task.get("effort_hours", 8)
            }
            
            assignments.append(assignment)
            member_workloads[best_assignee["id"]] += task.get("effort_hours", 8)
    
    return assignments


def _find_best_assignee(task: Dict, team_members: List[Dict], workloads: Dict, strategy: str) -> Dict:
    """Find the best team member for a task."""
    candidates = []
    
    for member in team_members:
        # Check skill match
        member_skills = set(member.get("skills", []))
        required_skills = set(task.get("required_skills", []))
        
        skill_match = len(member_skills.intersection(required_skills))
        skill_coverage = skill_match / len(required_skills) if required_skills else 1
        
        # Check capacity
        current_workload = workloads.get(member["id"], 0)
        remaining_capacity = member.get("capacity", 40) - current_workload
        
        if remaining_capacity >= task.get("effort_hours", 8):
            score = 0
            
            if strategy == "skill_based":
                score = skill_coverage * 100
            elif strategy == "balanced":
                score = (skill_coverage * 60) + ((remaining_capacity / member.get("capacity", 40)) * 40)
            else:  # priority_first
                priority_bonus = {"high": 30, "medium": 20, "low": 10}.get(task.get("priority", "medium"), 20)
                score = (skill_coverage * 50) + priority_bonus + (remaining_capacity / member.get("capacity", 40) * 20)
            
            candidates.append({
                "member": member,
                "score": score,
                "skill_coverage": skill_coverage,
                "remaining_capacity": remaining_capacity
            })
    
    # Return the best candidate
    if candidates:
        best_candidate = max(candidates, key=lambda c: c["score"])
        return best_candidate["member"]
    
    return None


def _calculate_skill_match(task: Dict, member: Dict) -> float:
    """Calculate skill match percentage."""
    member_skills = set(member.get("skills", []))
    required_skills = set(task.get("required_skills", []))
    
    if not required_skills:
        return 1.0
    
    return len(member_skills.intersection(required_skills)) / len(required_skills)


async def _calculate_utilization(assignments: List[Dict], context: Dict) -> Dict:
    """Calculate resource utilization metrics."""
    team_members = context["team_members"]
    member_utilization = {}
    
    for member in team_members:
        assigned_hours = sum(
            assignment["effort_hours"] 
            for assignment in assignments 
            if assignment["assignee_id"] == member["id"]
        )
        
        utilization_rate = (assigned_hours / member.get("capacity", 40)) * 100
        
        member_utilization[member["id"]] = {
            "name": member["name"],
            "assigned_hours": assigned_hours,
            "capacity": member.get("capacity", 40),
            "utilization_rate": utilization_rate,
            "remaining_capacity": member.get("capacity", 40) - assigned_hours
        }
    
    # Calculate team-wide metrics
    total_assigned = sum(assignment["effort_hours"] for assignment in assignments)
    total_capacity = sum(member.get("capacity", 40) for member in team_members)
    
    return {
        "team_utilization_rate": (total_assigned / total_capacity) * 100 if total_capacity > 0 else 0,
        "total_assigned_hours": total_assigned,
        "total_team_capacity": total_capacity,
        "member_utilization": member_utilization,
        "overutilized_members": [
            util for util in member_utilization.values() 
            if util["utilization_rate"] > 100
        ],
        "underutilized_members": [
            util for util in member_utilization.values() 
            if util["utilization_rate"] < 60
        ]
    }


async def _identify_conflicts(assignments: List[Dict]) -> List[Dict]:
    """Identify potential scheduling and resource conflicts."""
    conflicts = []
    
    # Check for overallocation
    assignee_workloads = {}
    for assignment in assignments:
        assignee_id = assignment["assignee_id"]
        if assignee_id not in assignee_workloads:
            assignee_workloads[assignee_id] = []
        assignee_workloads[assignee_id].append(assignment)
    
    for assignee_id, workload in assignee_workloads.items():
        total_hours = sum(task["effort_hours"] for task in workload)
        if total_hours > 40:  # Assuming 40-hour capacity
            conflicts.append({
                "type": "overallocation",
                "severity": "high",
                "assignee_id": assignee_id,
                "assignee_name": workload[0]["assignee_name"],
                "total_hours": total_hours,
                "description": f"Assigned {total_hours} hours, exceeding capacity"
            })
    
    # Check for skill mismatches
    for assignment in assignments:
        if assignment["skill_match_score"] < 0.5:
            conflicts.append({
                "type": "skill_mismatch",
                "severity": "medium",
                "task_id": assignment["task_id"],
                "task_name": assignment["task_name"],
                "assignee_name": assignment["assignee_name"],
                "skill_match_score": assignment["skill_match_score"],
                "description": f"Low skill match ({assignment['skill_match_score']:.1%}) for assigned task"
            })
    
    return conflicts


def _generate_assignment_recommendations(assignments: List[Dict], conflicts: List[Dict]) -> List[str]:
    """Generate recommendations for task assignments."""
    recommendations = []
    
    if conflicts:
        high_severity_conflicts = [c for c in conflicts if c["severity"] == "high"]
        if high_severity_conflicts:
            recommendations.append(f"🔴 Address {len(high_severity_conflicts)} high-severity conflicts immediately")
    
    # Check for workload balance
    utilization_rates = [a["workload_after_assignment"] for a in assignments]
    if utilization_rates:
        max_util = max(utilization_rates)
        min_util = min(utilization_rates)
        if max_util - min_util > 20:
            recommendations.append("⚖️ Consider rebalancing workload - significant utilization variance detected")
    
    # Check for skill coverage
    if any(a["skill_match_score"] < 0.7 for a in assignments):
        recommendations.append("🛠️ Some tasks assigned with suboptimal skill match - consider training or reassignment")
    
    if not recommendations:
        recommendations.append("✅ Task assignments look well-balanced")
    
    return recommendations
