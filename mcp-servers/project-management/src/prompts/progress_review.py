"""
Progress Review Prompt
Automated status reporting and bottleneck detection.
"""

from datetime import datetime, timedelta
from typing import Dict, List


async def progress_review_prompt(project_id: str, review_period: str = "current_sprint") -> str:
    """
    Automated progress review with bottleneck detection and recommendations.
    """

    # Load project data
    project_data = await _load_project_data(project_id)
    
    if not project_data:
        return f"❌ Project `{project_id}` not found. Run `/project-management/project-kickoff` first."
    
    # Analyze current progress
    progress_analysis = await _analyze_current_progress(project_data, review_period)
    
    # Detect bottlenecks
    bottlenecks = await _detect_bottlenecks(progress_analysis)
    
    # Generate performance metrics
    performance_metrics = await _calculate_performance_metrics(progress_analysis)
    
    # Create action recommendations
    recommendations = await _generate_action_recommendations(progress_analysis, bottlenecks)
    
    return f"""
📊 **Progress Review Complete: {project_data['name']}**

**Review Period:** {review_period.replace('_', ' ').title()}
**Overall Status:** {progress_analysis['overall_status']}
**Completion:** {progress_analysis['completion_percentage']:.1f}%

**Milestone Progress:**
{_format_milestone_progress(progress_analysis['milestones'])}

**Performance Metrics:**
{_format_performance_metrics(performance_metrics)}

**Bottleneck Analysis:**
{_format_bottlenecks(bottlenecks)}

**Resource Utilization:**
{_format_resource_utilization(progress_analysis['resource_utilization'])}

**Risk Indicators:**
{_format_risk_indicators(progress_analysis['risk_indicators'])}

**Action Items:**
{_format_action_recommendations(recommendations)}

**Next Review:** {_calculate_next_review_date(review_period)}

**Next Steps:**
• Use `identify-blockers` tool for detailed bottleneck analysis
• Run `/project-management/resource-optimization {project_id}` if resource issues detected
• Use `send-notifications` tool to communicate status to stakeholders

**Progress Review Complete ✅**
"""


async def _load_project_data(project_id: str) -> Dict:
    """Load project data."""
    return {
        "name": f"Project {project_id}",
        "type": "Software Development",
        "start_date": "2024-01-15",
        "duration_weeks": 12,
        "team_size": 5
    }


async def _analyze_current_progress(project_data: Dict, review_period: str) -> Dict:
    """Analyze current project progress."""
    
    # Simulated milestone progress
    milestones = [
        {"name": "Requirements", "planned_end": "2024-01-22", "actual_end": "2024-01-20", "status": "completed", "completion": 100},
        {"name": "Architecture", "planned_end": "2024-01-29", "actual_end": "2024-02-02", "status": "completed", "completion": 100},
        {"name": "Backend Development", "planned_end": "2024-02-19", "actual_end": None, "status": "in_progress", "completion": 65},
        {"name": "Frontend Development", "planned_end": "2024-03-11", "actual_end": None, "status": "in_progress", "completion": 40},
        {"name": "Testing", "planned_end": "2024-03-25", "actual_end": None, "status": "not_started", "completion": 0},
        {"name": "Deployment", "planned_end": "2024-04-01", "actual_end": None, "status": "not_started", "completion": 0}
    ]
    
    # Calculate overall completion
    total_completion = sum(m["completion"] for m in milestones) / len(milestones)
    
    # Determine overall status
    if total_completion >= 90:
        overall_status = "on_track"
    elif total_completion >= 70:
        overall_status = "at_risk"
    else:
        overall_status = "behind_schedule"
    
    # Resource utilization (simulated)
    resource_utilization = {
        "current_utilization": 85.0,
        "planned_utilization": 80.0,
        "efficiency_score": 92.0,
        "burnout_risk": "medium"
    }
    
    # Risk indicators
    risk_indicators = [
        {"indicator": "Schedule Variance", "status": "yellow", "value": "+3 days", "trend": "increasing"},
        {"indicator": "Budget Variance", "status": "green", "value": "-2%", "trend": "stable"},
        {"indicator": "Quality Metrics", "status": "green", "value": "95% pass rate", "trend": "stable"},
        {"indicator": "Team Velocity", "status": "yellow", "value": "85% of target", "trend": "decreasing"}
    ]
    
    return {
        "milestones": milestones,
        "completion_percentage": total_completion,
        "overall_status": overall_status,
        "resource_utilization": resource_utilization,
        "risk_indicators": risk_indicators,
        "review_date": datetime.now().isoformat()
    }


async def _detect_bottlenecks(progress_analysis: Dict) -> List[Dict]:
    """Detect bottlenecks in project progress."""
    
    bottlenecks = []
    
    # Milestone-based bottlenecks
    for milestone in progress_analysis["milestones"]:
        if milestone["status"] == "in_progress" and milestone["completion"] < 50:
            bottlenecks.append({
                "type": "milestone_delay",
                "severity": "high",
                "description": f"{milestone['name']} is behind schedule",
                "impact": "May delay dependent milestones",
                "location": milestone["name"]
            })
    
    # Resource bottlenecks
    resource_util = progress_analysis["resource_utilization"]
    if resource_util["current_utilization"] > 95:
        bottlenecks.append({
            "type": "resource_overload",
            "severity": "high", 
            "description": "Team utilization exceeds 95%",
            "impact": "Risk of burnout and quality issues",
            "location": "Team capacity"
        })
    
    # Quality bottlenecks
    for indicator in progress_analysis["risk_indicators"]:
        if indicator["status"] == "red" or (indicator["status"] == "yellow" and indicator["trend"] == "decreasing"):
            bottlenecks.append({
                "type": "quality_issue",
                "severity": "medium",
                "description": f"{indicator['indicator']} showing concerning trend",
                "impact": "May require rework or additional effort",
                "location": indicator["indicator"]
            })
    
    return bottlenecks


async def _calculate_performance_metrics(progress_analysis: Dict) -> Dict:
    """Calculate project performance metrics."""
    
    # Schedule performance
    completed_milestones = [m for m in progress_analysis["milestones"] if m["status"] == "completed"]
    on_time_milestones = 0
    
    for milestone in completed_milestones:
        if milestone["actual_end"] and milestone["planned_end"]:
            actual = datetime.fromisoformat(milestone["actual_end"])
            planned = datetime.fromisoformat(milestone["planned_end"])
            if actual <= planned:
                on_time_milestones += 1
    
    schedule_performance = (on_time_milestones / max(len(completed_milestones), 1)) * 100
    
    # Budget performance (simulated)
    budget_performance = 102.0  # 2% over budget
    
    # Quality metrics
    quality_score = 95.0
    
    # Team velocity
    velocity_score = progress_analysis["resource_utilization"]["efficiency_score"]
    
    return {
        "schedule_performance": schedule_performance,
        "budget_performance": budget_performance,
        "quality_score": quality_score,
        "velocity_score": velocity_score,
        "overall_performance": (schedule_performance + quality_score + velocity_score) / 3
    }


async def _generate_action_recommendations(progress_analysis: Dict, bottlenecks: List[Dict]) -> List[Dict]:
    """Generate action recommendations based on analysis."""
    
    recommendations = []
    
    # Based on overall status
    if progress_analysis["overall_status"] == "behind_schedule":
        recommendations.append({
            "priority": "high",
            "category": "schedule",
            "action": "Conduct emergency schedule review",
            "description": "Review critical path and identify acceleration opportunities",
            "timeline": "immediate"
        })
    
    # Based on bottlenecks
    for bottleneck in bottlenecks:
        if bottleneck["severity"] == "high":
            recommendations.append({
                "priority": "high",
                "category": bottleneck["type"],
                "action": f"Address {bottleneck['type']} in {bottleneck['location']}",
                "description": bottleneck["description"],
                "timeline": "this_week"
            })
    
    # Based on resource utilization
    resource_util = progress_analysis["resource_utilization"]
    if resource_util["burnout_risk"] == "high":
        recommendations.append({
            "priority": "medium",
            "category": "resource",
            "action": "Implement workload balancing",
            "description": "Redistribute work to prevent team burnout",
            "timeline": "next_week"
        })
    
    return recommendations


def _format_milestone_progress(milestones: List[Dict]) -> str:
    """Format milestone progress."""
    lines = []
    
    for milestone in milestones:
        status_icon = "✅" if milestone["status"] == "completed" else "🔄" if milestone["status"] == "in_progress" else "⏳"
        
        lines.append(f"{status_icon} **{milestone['name']}** - {milestone['completion']}%")
        
        if milestone["status"] == "completed":
            delay_info = ""
            if milestone["actual_end"] and milestone["planned_end"]:
                actual = datetime.fromisoformat(milestone["actual_end"])
                planned = datetime.fromisoformat(milestone["planned_end"])
                delay_days = (actual - planned).days
                if delay_days > 0:
                    delay_info = f" ({delay_days} days late)"
                elif delay_days < 0:
                    delay_info = f" ({abs(delay_days)} days early)"
            lines.append(f"  Completed: {milestone['actual_end']}{delay_info}")
        else:
            lines.append(f"  Target: {milestone['planned_end']}")
    
    return "\n".join(lines)


def _format_performance_metrics(metrics: Dict) -> str:
    """Format performance metrics."""
    return f"""📈 Overall Performance: {metrics['overall_performance']:.1f}%
⏱️ Schedule Performance: {metrics['schedule_performance']:.1f}%
💰 Budget Performance: {metrics['budget_performance']:.1f}%
🎯 Quality Score: {metrics['quality_score']:.1f}%
🚀 Team Velocity: {metrics['velocity_score']:.1f}%"""


def _format_bottlenecks(bottlenecks: List[Dict]) -> str:
    """Format bottleneck analysis."""
    if not bottlenecks:
        return "✅ No significant bottlenecks detected"
    
    lines = [f"⚠️ {len(bottlenecks)} Bottlenecks Identified:"]
    
    for bottleneck in bottlenecks:
        severity_icon = "🔴" if bottleneck["severity"] == "high" else "🟡"
        lines.append(f"{severity_icon} **{bottleneck['type'].replace('_', ' ').title()}**: {bottleneck['description']}")
        lines.append(f"   Impact: {bottleneck['impact']}")
    
    return "\n".join(lines)


def _format_resource_utilization(utilization: Dict) -> str:
    """Format resource utilization."""
    return f"""👥 Current Utilization: {utilization['current_utilization']:.1f}%
📊 Planned Utilization: {utilization['planned_utilization']:.1f}%
⚡ Efficiency Score: {utilization['efficiency_score']:.1f}%
🔥 Burnout Risk: {utilization['burnout_risk'].title()}"""


def _format_risk_indicators(indicators: List[Dict]) -> str:
    """Format risk indicators."""
    lines = []
    
    for indicator in indicators:
        status_icon = "🔴" if indicator["status"] == "red" else "🟡" if indicator["status"] == "yellow" else "🟢"
        trend_icon = "📈" if indicator["trend"] == "increasing" else "📉" if indicator["trend"] == "decreasing" else "➡️"
        
        lines.append(f"{status_icon} {indicator['indicator']}: {indicator['value']} {trend_icon}")
    
    return "\n".join(lines)


def _format_action_recommendations(recommendations: List[Dict]) -> str:
    """Format action recommendations."""
    if not recommendations:
        return "✅ No immediate actions required"
    
    lines = []
    for rec in recommendations:
        priority_icon = "🔴" if rec["priority"] == "high" else "🟡" if rec["priority"] == "medium" else "🟢"
        lines.append(f"{priority_icon} **{rec['action']}** ({rec['timeline']})")
        lines.append(f"   {rec['description']}")
    
    return "\n".join(lines)


def _calculate_next_review_date(review_period: str) -> str:
    """Calculate next review date."""
    if review_period == "daily":
        next_date = datetime.now() + timedelta(days=1)
    elif review_period == "weekly":
        next_date = datetime.now() + timedelta(weeks=1)
    else:  # current_sprint or other
        next_date = datetime.now() + timedelta(weeks=2)
    
    return next_date.strftime("%Y-%m-%d")
