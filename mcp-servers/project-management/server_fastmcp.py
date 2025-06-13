#!/usr/bin/env python3
"""
Project Management MCP Server (FastMCP Version)
Agentic workflows for project planning, resource optimization, and delivery management.
"""

import sys
from pathlib import Path
from typing import Dict, Optional, List

from mcp.server.fastmcp import FastMCP

# Add src directory to path for imports
sys.path.append(str(Path(__file__).parent / "src"))

from src.prompts.project_kickoff import project_kickoff_prompt
from src.prompts.milestone_planning import milestone_planning_prompt
from src.prompts.resource_optimization import resource_optimization_prompt
from src.prompts.risk_assessment import risk_assessment_prompt
from src.prompts.progress_review import progress_review_prompt
from src.prompts.delivery_planning import delivery_planning_prompt

from src.tools.create_project import create_project_tool
from src.tools.assign_tasks import assign_tasks_tool
from src.tools.track_progress import track_progress_tool
from src.tools.identify_blockers import identify_blockers_tool
from src.tools.generate_timeline import generate_timeline_tool
from src.tools.send_notifications import send_notifications_tool

# Create FastMCP server instance
mcp = FastMCP("project-management")

# =============================================================================
# TOOLS (Model-controlled functions)
# =============================================================================

@mcp.tool()
async def create_project(
    name: str,
    description: str = "",
    team_size: int = 5,
    duration_weeks: int = 12
) -> Dict:
    """
    Create project structure and initialize project workspace.
    
    Args:
        name: Project name
        description: Project description and goals
        team_size: Expected team size
        duration_weeks: Expected project duration in weeks
    """
    return await create_project_tool(name, description, team_size, duration_weeks)


@mcp.tool()
async def assign_tasks(
    project_id: str,
    tasks: List[Dict],
    assignment_strategy: str = "balanced"
) -> Dict:
    """
    Assign tasks to team members with resource optimization.
    
    Args:
        project_id: Project identifier
        tasks: List of tasks with requirements and priorities
        assignment_strategy: Strategy - balanced, skill_based, or priority_first
    """
    return await assign_tasks_tool(project_id, tasks, assignment_strategy)


@mcp.tool()
async def track_progress(
    project_id: str,
    include_predictions: bool = True,
    detailed_metrics: bool = False
) -> Dict:
    """
    Monitor project progress and generate status reports.
    
    Args:
        project_id: Project identifier
        include_predictions: Include completion predictions
        detailed_metrics: Include detailed performance metrics
    """
    return await track_progress_tool(project_id, include_predictions, detailed_metrics)


@mcp.tool()
async def identify_blockers(
    project_id: str,
    scope: str = "all",
    severity_threshold: str = "medium"
) -> Dict:
    """
    Identify and analyze project blockers and bottlenecks.
    
    Args:
        project_id: Project identifier
        scope: Scope - all, critical_path, or resource_conflicts
        severity_threshold: Minimum severity - low, medium, high
    """
    return await identify_blockers_tool(project_id, scope, severity_threshold)


@mcp.tool()
async def generate_timeline(
    project_id: str,
    optimization_focus: str = "time",
    include_buffer: bool = True
) -> Dict:
    """
    Generate optimized project timeline with critical path analysis.
    
    Args:
        project_id: Project identifier
        optimization_focus: Focus - time, resources, or risk
        include_buffer: Include time buffers for risk mitigation
    """
    return await generate_timeline_tool(project_id, optimization_focus, include_buffer)


@mcp.tool()
async def send_notifications(
    project_id: str,
    notification_type: str,
    recipients: List[str],
    custom_message: str = ""
) -> Dict:
    """
    Send project notifications and updates to stakeholders.
    
    Args:
        project_id: Project identifier
        notification_type: Type - status_update, milestone, alert, or custom
        recipients: List of recipient roles or IDs
        custom_message: Custom message content
    """
    return await send_notifications_tool(project_id, notification_type, recipients, custom_message)


# =============================================================================
# PROMPTS (User-controlled agentic workflows)
# =============================================================================

@mcp.prompt("project-kickoff")
async def project_kickoff_prompt_handler(
    project_name: str,
    project_scope: str = "",
    stakeholders: str = ""
) -> str:
    """Complete project initiation workflow with stakeholder analysis."""
    return await project_kickoff_prompt(project_name, project_scope, stakeholders)


@mcp.prompt("milestone-planning")
async def milestone_planning_prompt_handler(
    project_id: str,
    planning_horizon: str = "full_project"
) -> str:
    """Break down complex projects into manageable phases and milestones."""
    return await milestone_planning_prompt(project_id, planning_horizon)


@mcp.prompt("resource-optimization")
async def resource_optimization_prompt_handler(
    project_id: str,
    constraint_type: str = "time_and_budget"
) -> str:
    """Optimize team allocation and capacity planning."""
    return await resource_optimization_prompt(project_id, constraint_type)


@mcp.prompt("risk-assessment")
async def risk_assessment_prompt_handler(
    project_id: str,
    assessment_scope: str = "comprehensive"
) -> str:
    """Proactive risk identification and mitigation planning."""
    return await risk_assessment_prompt(project_id, assessment_scope)


@mcp.prompt("progress-review")
async def progress_review_prompt_handler(
    project_id: str,
    review_period: str = "current_sprint"
) -> str:
    """Automated status reporting and bottleneck detection."""
    return await progress_review_prompt(project_id, review_period)


@mcp.prompt("delivery-planning")
async def delivery_planning_prompt_handler(
    project_id: str,
    delivery_strategy: str = "incremental"
) -> str:
    """End-to-end delivery orchestration and planning."""
    return await delivery_planning_prompt(project_id, delivery_strategy)


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    mcp.run()
