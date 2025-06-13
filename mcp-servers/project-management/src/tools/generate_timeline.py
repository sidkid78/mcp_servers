"""
Generate Timeline Tool
Create optimized project timeline with critical path analysis.
"""

from typing import Dict, List
from datetime import datetime, timedelta


async def generate_timeline_tool(
    project_id: str,
    optimization_focus: str = "time",
    include_buffer: bool = True
) -> Dict:
    """
    Generate optimized project timeline with critical path analysis.
    """

    try:
        # Load project data
        project_data = await _load_project_data(project_id)
        
        # Build task network
        task_network = await _build_task_network(project_data)
        
        # Calculate critical path
        critical_path = await _calculate_critical_path(task_network)
        
        # Generate optimized timeline
        timeline = await _generate_optimized_timeline(
            task_network, critical_path, optimization_focus, include_buffer
        )
        
        # Calculate timeline metrics
        metrics = await _calculate_timeline_metrics(timeline, critical_path)
        
        # Identify optimization opportunities
        optimizations = await _identify_optimizations(timeline, optimization_focus)
        
        return {
            "success": True,
            "project_id": project_id,
            "optimization_focus": optimization_focus,
            "timeline": timeline,
            "critical_path": critical_path,
            "metrics": metrics,
            "optimizations": optimizations,
            "gantt_data": _prepare_gantt_data(timeline),
            "milestones": _extract_milestones(timeline),
            "message": f"Timeline generated with {optimization_focus} optimization - {metrics['total_duration']} days total"
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Timeline generation failed: {str(e)}",
            "message": "Unable to generate timeline. Please check project data."
        }


async def _load_project_data(project_id: str) -> Dict:
    """Load project data for timeline generation."""
    return {
        "project_id": project_id,
        "name": f"Project {project_id}",
        "tasks": [
            {"id": "T001", "name": "Requirements Analysis", "duration": 5, "dependencies": [], "resources": ["BA"], "priority": "high"},
            {"id": "T002", "name": "System Design", "duration": 8, "dependencies": ["T001"], "resources": ["Architect"], "priority": "high"},
            {"id": "T003", "name": "Database Design", "duration": 6, "dependencies": ["T002"], "resources": ["DBA"], "priority": "high"},
            {"id": "T004", "name": "Backend Development", "duration": 15, "dependencies": ["T003"], "resources": ["Dev1", "Dev2"], "priority": "high"},
            {"id": "T005", "name": "Frontend Development", "duration": 12, "dependencies": ["T002"], "resources": ["FE Dev"], "priority": "high"},
            {"id": "T006", "name": "API Integration", "duration": 8, "dependencies": ["T004", "T005"], "resources": ["Dev1"], "priority": "medium"},
            {"id": "T007", "name": "Testing", "duration": 10, "dependencies": ["T006"], "resources": ["QA"], "priority": "high"},
            {"id": "T008", "name": "Deployment", "duration": 3, "dependencies": ["T007"], "resources": ["DevOps"], "priority": "high"}
        ],
        "resources": {
            "BA": {"availability": 1.0, "cost_per_day": 500},
            "Architect": {"availability": 1.0, "cost_per_day": 800},
            "DBA": {"availability": 0.5, "cost_per_day": 600},
            "Dev1": {"availability": 1.0, "cost_per_day": 600},
            "Dev2": {"availability": 1.0, "cost_per_day": 600},
            "FE Dev": {"availability": 1.0, "cost_per_day": 550},
            "QA": {"availability": 1.0, "cost_per_day": 450},
            "DevOps": {"availability": 0.8, "cost_per_day": 700}
        }
    }


async def _build_task_network(project_data: Dict) -> Dict:
    """Build task network with dependencies."""
    tasks = project_data["tasks"]
    
    # Create task lookup
    task_dict = {task["id"]: task for task in tasks}
    
    # Add predecessor and successor relationships
    for task in tasks:
        task["predecessors"] = task.get("dependencies", [])
        task["successors"] = []
        
        # Find successors
        for other_task in tasks:
            if task["id"] in other_task.get("dependencies", []):
                task["successors"].append(other_task["id"])
    
    return {
        "tasks": task_dict,
        "task_order": [task["id"] for task in tasks],
        "start_date": datetime.now(),
        "resources": project_data["resources"]
    }


async def _calculate_critical_path(task_network: Dict) -> Dict:
    """Calculate critical path using CPM algorithm."""
    tasks = task_network["tasks"]
    
    # Forward pass - calculate earliest start/finish
    for task_id in task_network["task_order"]:
        task = tasks[task_id]
        
        if not task["predecessors"]:
            task["earliest_start"] = 0
        else:
            predecessor_finishes = [
                tasks[pred_id]["earliest_finish"] 
                for pred_id in task["predecessors"]
            ]
            task["earliest_start"] = max(predecessor_finishes) if predecessor_finishes else 0
        
        task["earliest_finish"] = task["earliest_start"] + task["duration"]
    
    # Backward pass - calculate latest start/finish
    project_finish = max(task["earliest_finish"] for task in tasks.values())
    
    for task_id in reversed(task_network["task_order"]):
        task = tasks[task_id]
        
        if not task["successors"]:
            task["latest_finish"] = project_finish
        else:
            successor_starts = [
                tasks[succ_id]["latest_start"] 
                for succ_id in task["successors"]
            ]
            task["latest_finish"] = min(successor_starts) if successor_starts else project_finish
        
        task["latest_start"] = task["latest_finish"] - task["duration"]
        task["total_float"] = task["latest_start"] - task["earliest_start"]
    
    # Identify critical path
    critical_tasks = [
        task_id for task_id, task in tasks.items() 
        if task["total_float"] == 0
    ]
    
    return {
        "critical_tasks": critical_tasks,
        "project_duration": project_finish,
        "critical_path_duration": project_finish,
        "float_analysis": {
            task_id: task["total_float"] 
            for task_id, task in tasks.items()
        }
    }


async def _generate_optimized_timeline(
    task_network: Dict, 
    critical_path: Dict, 
    optimization_focus: str, 
    include_buffer: bool
) -> Dict:
    """Generate optimized timeline based on focus."""
    tasks = task_network["tasks"]
    start_date = task_network["start_date"]
    
    timeline_tasks = []
    
    for task_id, task in tasks.items():
        # Calculate actual start date
        actual_start = start_date + timedelta(days=task["earliest_start"])
        actual_end = actual_start + timedelta(days=task["duration"])
        
        # Add buffer for critical tasks if requested
        if include_buffer and task_id in critical_path["critical_tasks"]:
            buffer_days = max(1, task["duration"] * 0.1)  # 10% buffer
            actual_end += timedelta(days=buffer_days)
            task["buffer_days"] = buffer_days
        
        # Apply optimization
        if optimization_focus == "resources":
            # Resource optimization might extend duration but balance workload
            if len(task["resources"]) > 1:
                # Assume parallel work reduces duration
                optimized_duration = task["duration"] * 0.8
                actual_end = actual_start + timedelta(days=optimized_duration)
        elif optimization_focus == "risk":
            # Risk optimization adds more buffer to high-risk tasks
            if task["priority"] == "high":
                risk_buffer = task["duration"] * 0.15
                actual_end += timedelta(days=risk_buffer)
        
        timeline_task = {
            "task_id": task_id,
            "name": task["name"],
            "start_date": actual_start.strftime("%Y-%m-%d"),
            "end_date": actual_end.strftime("%Y-%m-%d"),
            "duration": task["duration"],
            "is_critical": task_id in critical_path["critical_tasks"],
            "float_days": task["total_float"],
            "resources": task["resources"],
            "priority": task["priority"],
            "predecessors": task["predecessors"],
            "successors": task["successors"]
        }
        
        if include_buffer and task_id in critical_path["critical_tasks"]:
            timeline_task["buffer_days"] = task.get("buffer_days", 0)
        
        timeline_tasks.append(timeline_task)
    
    # Calculate total timeline
    end_dates = [datetime.fromisoformat(task["end_date"]) for task in timeline_tasks]
    project_end = max(end_dates)
    total_duration = (project_end - start_date).days
    
    return {
        "start_date": start_date.strftime("%Y-%m-%d"),
        "end_date": project_end.strftime("%Y-%m-%d"),
        "total_duration": total_duration,
        "tasks": timeline_tasks,
        "optimization_applied": optimization_focus,
        "buffer_included": include_buffer
    }


async def _calculate_timeline_metrics(timeline: Dict, critical_path: Dict) -> Dict:
    """Calculate timeline performance metrics."""
    tasks = timeline["tasks"]
    
    # Resource utilization
    resource_usage = {}
    for task in tasks:
        for resource in task["resources"]:
            if resource not in resource_usage:
                resource_usage[resource] = 0
            resource_usage[resource] += task["duration"]
    
    # Critical path metrics
    critical_tasks = [task for task in tasks if task["is_critical"]]
    
    return {
        "total_duration": timeline["total_duration"],
        "critical_path_length": len(critical_tasks),
        "critical_path_percentage": (len(critical_tasks) / len(tasks)) * 100,
        "average_task_duration": sum(task["duration"] for task in tasks) / len(tasks),
        "longest_task": max(tasks, key=lambda t: t["duration"])["duration"],
        "shortest_task": min(tasks, key=lambda t: t["duration"])["duration"],
        "resource_utilization": resource_usage,
        "schedule_compression_potential": sum(task["float_days"] for task in tasks if not task["is_critical"]),
        "buffer_percentage": (sum(task.get("buffer_days", 0) for task in tasks) / timeline["total_duration"]) * 100
    }


async def _identify_optimizations(timeline: Dict, focus: str) -> List[Dict]:
    """Identify timeline optimization opportunities."""
    optimizations = []
    tasks = timeline["tasks"]
    
    # Fast-tracking opportunities
    parallel_candidates = []
    for task in tasks:
        if task["float_days"] > 0 and not task["is_critical"]:
            parallel_candidates.append(task)
    
    if parallel_candidates:
        optimizations.append({
            "type": "fast_tracking",
            "potential_saving": max(t["float_days"] for t in parallel_candidates),
            "description": f"Run {len(parallel_candidates)} non-critical tasks in parallel",
            "tasks_affected": [t["task_id"] for t in parallel_candidates[:3]]
        })
    
    # Resource leveling opportunities
    resource_conflicts = []
    # Simplified resource conflict detection
    for i, task1 in enumerate(tasks):
        for task2 in tasks[i+1:]:
            if (set(task1["resources"]) & set(task2["resources"]) and
                _tasks_overlap(task1, task2)):
                resource_conflicts.append((task1["task_id"], task2["task_id"]))
    
    if resource_conflicts:
        optimizations.append({
            "type": "resource_leveling",
            "potential_saving": len(resource_conflicts) * 2,
            "description": f"Resolve {len(resource_conflicts)} resource conflicts",
            "conflicts": resource_conflicts[:3]
        })
    
    # Crashing opportunities (add resources to critical path)
    critical_tasks = [task for task in tasks if task["is_critical"]]
    crashable_tasks = [task for task in critical_tasks if len(task["resources"]) == 1]
    
    if crashable_tasks:
        optimizations.append({
            "type": "crashing",
            "potential_saving": len(crashable_tasks) * 3,
            "description": f"Add resources to {len(crashable_tasks)} critical tasks",
            "tasks_affected": [t["task_id"] for t in crashable_tasks[:3]]
        })
    
    return optimizations


def _tasks_overlap(task1: Dict, task2: Dict) -> bool:
    """Check if two tasks have overlapping schedules."""
    start1 = datetime.fromisoformat(task1["start_date"])
    end1 = datetime.fromisoformat(task1["end_date"])
    start2 = datetime.fromisoformat(task2["start_date"])
    end2 = datetime.fromisoformat(task2["end_date"])
    
    return not (end1 <= start2 or end2 <= start1)


def _prepare_gantt_data(timeline: Dict) -> Dict:
    """Prepare data for Gantt chart visualization."""
    gantt_tasks = []
    
    for task in timeline["tasks"]:
        gantt_task = {
            "id": task["task_id"],
            "name": task["name"],
            "start": task["start_date"],
            "end": task["end_date"],
            "duration": task["duration"],
            "progress": 0,  # Default
            "color": "#ff6b6b" if task["is_critical"] else "#4ecdc4",
            "dependencies": task["predecessors"]
        }
        gantt_tasks.append(gantt_task)
    
    return {
        "tasks": gantt_tasks,
        "start_date": timeline["start_date"],
        "end_date": timeline["end_date"],
        "view_mode": "Day"
    }


def _extract_milestones(timeline: Dict) -> List[Dict]:
    """Extract key milestones from timeline."""
    milestones = []
    
    # Major deliverable tasks become milestones
    major_tasks = [
        task for task in timeline["tasks"] 
        if task["is_critical"] and task["duration"] >= 5
    ]
    
    for task in major_tasks:
        milestone = {
            "name": f"{task['name']} Complete",
            "date": task["end_date"],
            "type": "deliverable",
            "critical": task["is_critical"],
            "description": f"Completion of {task['name']}"
        }
        milestones.append(milestone)
    
    # Add project start and end milestones
    milestones.insert(0, {
        "name": "Project Start",
        "date": timeline["start_date"],
        "type": "project_start",
        "critical": True,
        "description": "Project kickoff"
    })
    
    milestones.append({
        "name": "Project Completion",
        "date": timeline["end_date"],
        "type": "project_end",
        "critical": True,
        "description": "Project delivery"
    })
    
    return milestones
