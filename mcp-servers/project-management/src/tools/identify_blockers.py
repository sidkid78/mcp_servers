"""
Identify Blockers Tool
Detect and analyze project blockers and bottlenecks.
"""

from typing import Dict, List
from datetime import datetime


async def identify_blockers_tool(
    project_id: str,
    scope: str = "all",
    severity_threshold: str = "medium"
) -> Dict:
    """
    Identify and analyze project blockers and bottlenecks.
    """

    try:
        # Load project context
        project_data = await _load_project_data(project_id)
        
        # Scan for blockers
        blockers = await _scan_for_blockers(project_data, scope)
        
        # Analyze blocker impact
        impact_analysis = await _analyze_blocker_impact(blockers)
        
        # Generate resolution strategies
        resolution_strategies = await _generate_resolution_strategies(blockers)
        
        # Filter by severity threshold
        filtered_blockers = _filter_by_severity(blockers, severity_threshold)
        
        return {
            "success": True,
            "project_id": project_id,
            "scan_scope": scope,
            "total_blockers": len(blockers),
            "filtered_blockers": len(filtered_blockers),
            "blockers": filtered_blockers,
            "impact_analysis": impact_analysis,
            "resolution_strategies": resolution_strategies,
            "critical_path_impact": _assess_critical_path_impact(filtered_blockers),
            "recommendations": _generate_blocker_recommendations(filtered_blockers),
            "message": f"Found {len(filtered_blockers)} blockers above {severity_threshold} severity threshold"
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Blocker identification failed: {str(e)}",
            "message": "Unable to identify blockers. Please check project status."
        }


async def _load_project_data(project_id: str) -> Dict:
    """Load project data for blocker analysis."""
    return {
        "project_id": project_id,
        "current_phase": "Development",
        "milestones": [
            {"name": "Backend API", "status": "blocked", "blocker_reason": "Database connection issues"},
            {"name": "Frontend UI", "status": "in_progress", "progress": 60},
            {"name": "Testing Setup", "status": "waiting", "dependency": "Backend API"}
        ],
        "resources": [
            {"name": "Senior Developer", "status": "overallocated", "utilization": 120},
            {"name": "Database Admin", "status": "unavailable", "reason": "On vacation"}
        ],
        "dependencies": [
            {"from": "Frontend UI", "to": "Backend API", "type": "technical"},
            {"from": "Testing", "to": "Frontend UI", "type": "sequential"}
        ]
    }


async def _scan_for_blockers(project_data: Dict, scope: str) -> List[Dict]:
    """Scan for various types of blockers."""
    blockers = []
    
    # Milestone blockers
    for milestone in project_data.get("milestones", []):
        if milestone["status"] == "blocked":
            blockers.append({
                "id": f"milestone_blocker_{len(blockers)+1}",
                "type": "milestone_block",
                "category": "execution",
                "severity": "high",
                "title": f"{milestone['name']} is blocked",
                "description": milestone.get("blocker_reason", "Unknown blocking reason"),
                "affected_milestone": milestone["name"],
                "impact": "Prevents milestone completion",
                "detected_date": datetime.now().isoformat()
            })
    
    # Resource blockers
    for resource in project_data.get("resources", []):
        if resource["status"] in ["overallocated", "unavailable"]:
            severity = "high" if resource["status"] == "unavailable" else "medium"
            blockers.append({
                "id": f"resource_blocker_{len(blockers)+1}",
                "type": "resource_constraint",
                "category": "resource",
                "severity": severity,
                "title": f"{resource['name']} {resource['status']}",
                "description": resource.get("reason", f"Resource is {resource['status']}"),
                "affected_resource": resource["name"],
                "impact": "May delay dependent tasks",
                "detected_date": datetime.now().isoformat()
            })
    
    # Dependency blockers
    dependencies = project_data.get("dependencies", [])
    for dep in dependencies:
        # Check if dependency is creating a block
        from_milestone = next((m for m in project_data["milestones"] if m["name"] == dep["from"]), None)
        to_milestone = next((m for m in project_data["milestones"] if m["name"] == dep["to"]), None)
        
        if from_milestone and to_milestone:
            if from_milestone["status"] in ["blocked", "delayed"] and to_milestone["status"] == "waiting":
                blockers.append({
                    "id": f"dependency_blocker_{len(blockers)+1}",
                    "type": "dependency_block",
                    "category": "dependency",
                    "severity": "medium",
                    "title": f"Dependency blocking {dep['to']}",
                    "description": f"{dep['from']} must complete before {dep['to']} can proceed",
                    "affected_milestone": dep["to"],
                    "blocking_milestone": dep["from"],
                    "impact": "Creates cascading delays",
                    "detected_date": datetime.now().isoformat()
                })
    
    # Technical debt blockers (simulated)
    blockers.append({
        "id": f"technical_blocker_{len(blockers)+1}",
        "type": "technical_debt",
        "category": "technical",
        "severity": "medium",
        "title": "Legacy system integration complexity",
        "description": "Integration with legacy systems is more complex than anticipated",
        "affected_milestone": "Backend API",
        "impact": "Requires additional architecture work",
        "detected_date": datetime.now().isoformat()
    })
    
    return blockers


async def _analyze_blocker_impact(blockers: List[Dict]) -> Dict:
    """Analyze the overall impact of blockers."""
    impact_by_category = {}
    impact_by_severity = {"high": 0, "medium": 0, "low": 0}
    
    for blocker in blockers:
        category = blocker["category"]
        severity = blocker["severity"]
        
        impact_by_category[category] = impact_by_category.get(category, 0) + 1
        impact_by_severity[severity] += 1
    
    # Calculate overall impact score
    impact_score = (impact_by_severity["high"] * 3 + 
                   impact_by_severity["medium"] * 2 + 
                   impact_by_severity["low"] * 1)
    
    return {
        "total_blockers": len(blockers),
        "impact_by_category": impact_by_category,
        "impact_by_severity": impact_by_severity,
        "overall_impact_score": impact_score,
        "risk_level": "high" if impact_score > 8 else "medium" if impact_score > 4 else "low",
        "estimated_delay_days": impact_score * 2  # Rough estimate
    }


async def _generate_resolution_strategies(blockers: List[Dict]) -> Dict:
    """Generate resolution strategies for blockers."""
    strategies = {}
    
    for blocker in blockers:
        blocker_id = blocker["id"]
        blocker_type = blocker["type"]
        
        if blocker_type == "milestone_block":
            strategies[blocker_id] = {
                "immediate_actions": ["Investigate root cause", "Engage technical team", "Assess workarounds"],
                "short_term": ["Implement temporary solution", "Adjust milestone scope", "Reallocate resources"],
                "long_term": ["Address underlying system issues", "Improve process", "Prevent recurrence"]
            }
        elif blocker_type == "resource_constraint":
            strategies[blocker_id] = {
                "immediate_actions": ["Find backup resource", "Redistribute workload", "Adjust timeline"],
                "short_term": ["Cross-train team members", "Hire contractor", "Reduce scope"],
                "long_term": ["Improve resource planning", "Build team redundancy", "Skill development"]
            }
        elif blocker_type == "dependency_block":
            strategies[blocker_id] = {
                "immediate_actions": ["Parallelize work where possible", "Remove dependencies", "Fast-track blocker"],
                "short_term": ["Adjust sequence", "Create mock dependencies", "Renegotiate scope"],
                "long_term": ["Improve dependency management", "Architectural changes", "Better planning"]
            }
        else:  # technical_debt, etc.
            strategies[blocker_id] = {
                "immediate_actions": ["Technical spike", "Expert consultation", "Risk assessment"],
                "short_term": ["Implement solution", "Update architecture", "Testing"],
                "long_term": ["Refactor systems", "Documentation", "Knowledge sharing"]
            }
    
    return strategies


def _filter_by_severity(blockers: List[Dict], threshold: str) -> List[Dict]:
    """Filter blockers by severity threshold."""
    severity_order = {"low": 1, "medium": 2, "high": 3}
    threshold_level = severity_order.get(threshold, 2)
    
    return [
        blocker for blocker in blockers 
        if severity_order.get(blocker["severity"], 1) >= threshold_level
    ]


def _assess_critical_path_impact(blockers: List[Dict]) -> Dict:
    """Assess impact on critical path."""
    critical_path_blockers = []
    
    # Identify blockers that affect critical milestones
    critical_milestones = ["Backend API", "Frontend UI"]  # Simulated critical path
    
    for blocker in blockers:
        affected = blocker.get("affected_milestone", "")
        if affected in critical_milestones:
            critical_path_blockers.append(blocker)
    
    return {
        "critical_path_affected": len(critical_path_blockers) > 0,
        "critical_blockers": len(critical_path_blockers),
        "estimated_delay": len(critical_path_blockers) * 3,  # Days
        "risk_level": "high" if len(critical_path_blockers) > 2 else "medium" if len(critical_path_blockers) > 0 else "low"
    }


def _generate_blocker_recommendations(blockers: List[Dict]) -> List[str]:
    """Generate recommendations for addressing blockers."""
    recommendations = []
    
    high_severity_count = len([b for b in blockers if b["severity"] == "high"])
    if high_severity_count > 0:
        recommendations.append(f"🔴 Address {high_severity_count} high-severity blockers immediately")
    
    resource_blockers = len([b for b in blockers if b["category"] == "resource"])
    if resource_blockers > 1:
        recommendations.append("👥 Multiple resource constraints detected - review resource allocation")
    
    dependency_blockers = len([b for b in blockers if b["category"] == "dependency"])
    if dependency_blockers > 0:
        recommendations.append("🔗 Review project dependencies and consider parallel work opportunities")
    
    if len(blockers) > 5:
        recommendations.append("📊 High number of blockers - consider emergency project review meeting")
    
    if not recommendations:
        recommendations.append("✅ Blocker levels are manageable with current mitigation strategies")
    
    return recommendations
