#!/usr/bin/env python3
"""
Business Intelligence MCP Server (FastMCP Version)
A sophisticated data analysis platform with guided business insights discovery.
"""

import sys
from pathlib import Path
from typing import Dict, Optional

from mcp.server.fastmcp import FastMCP

# Add src directory to path for imports
sys.path.append(str(Path(__file__).parent / "src"))

from src.prompts.bi_discovery import bi_discovery_prompt
from src.prompts.insight_investigation import insight_investigation_prompt
from src.prompts.correlation_deep_dive import correlation_deep_dive_prompt
from src.prompts.trend_analysis import trend_analysis_prompt
from src.prompts.executive_summary import executive_summary_prompt
from src.prompts.action_recommendations import action_recommendations_prompt

from src.tools.load_datasource import load_datasource_tool
from src.tools.profile_dataset import profile_dataset_tool
from src.tools.create_visualization import create_visualization_tool
from src.tools.run_correlation import run_correlation_tool
from src.tools.export_report import export_report_tool
from src.tools.schedule_analysis import schedule_analysis_tool

# Create FastMCP server instance
mcp = FastMCP("business-intelligence")

# =============================================================================
# TOOLS (Model-controlled functions)
# =============================================================================

@mcp.tool()
async def load_datasource(
    source_path: str, 
    dataset_name: str,
    source_type: str = "auto",
    options: Dict = None
) -> Dict:
    """
    ETL from various sources (CSV, Excel, JSON, databases).
    
    Args:
        source_path: Path to data source
        dataset_name: Name for the dataset
        source_type: Type - csv, excel, json, database, api
        options: Source-specific options
    """
    return await load_datasource_tool(source_path, source_type, dataset_name, options or {})


@mcp.tool()
async def profile_dataset(
    dataset_name: str,
    detailed: bool = True,
    sample_size: int = 10000
) -> Dict:
    """
    Statistical profiling and data quality assessment.
    
    Args:
        dataset_name: Name of loaded dataset
        detailed: Include detailed statistical analysis
        sample_size: Sample size for profiling
    """
    return await profile_dataset_tool(dataset_name, detailed, sample_size)


@mcp.tool()
async def create_visualization(
    dataset_name: str,
    chart_type: str,
    x_column: str = "",
    y_column: str = "",
    group_by: str = "",
    title: str = "",
    output_path: str = ""
) -> Dict:
    """
    Generate charts, dashboards, and interactive visualizations.
    
    Args:
        dataset_name: Source dataset
        chart_type: Type - bar, line, scatter, heatmap, dashboard
        x_column: X-axis column
        y_column: Y-axis column
        group_by: Column to group/color by
        title: Chart title
        output_path: Where to save visualization
    """
    return await create_visualization_tool(dataset_name, chart_type, x_column, y_column, group_by, title, output_path)


@mcp.tool()
async def run_correlation(
    dataset_name: str,
    method: str = "pearson",
    target_column: str = "",
    columns: list = None,
    threshold: float = 0.3
) -> Dict:
    """
    Statistical correlation analysis with business interpretation.
    
    Args:
        dataset_name: Source dataset
        method: Method - pearson, spearman, kendall
        target_column: Target variable for correlation
        columns: Specific columns to analyze
        threshold: Correlation significance threshold
    """
    return await run_correlation_tool(dataset_name, method, target_column, columns or [], threshold)


@mcp.tool()
async def export_report(
    content: Dict,
    format: str,
    template: str = "standard",
    output_path: str = ""
) -> Dict:
    """
    Generate formatted business reports (PDF, PowerPoint, HTML).
    
    Args:
        content: Report content and insights
        format: Format - pdf, pptx, html, markdown
        template: Report template to use
        output_path: Where to save report
    """
    return await export_report_tool(content, format, template, output_path)


@mcp.tool()
async def schedule_analysis(
    analysis_config: Dict,
    schedule: str,
    notification_channels: list = None,
    alert_conditions: Dict = None
) -> Dict:
    """
    Set up automated recurring insights and monitoring.
    
    Args:
        analysis_config: Analysis configuration
        schedule: Cron-style schedule
        notification_channels: Where to send results
        alert_conditions: Conditions for alerts
    """
    return await schedule_analysis_tool(analysis_config, schedule, notification_channels or [], alert_conditions or {})


# =============================================================================
# PROMPTS (User-controlled agentic workflows)
# =============================================================================

@mcp.prompt("bi-discovery")
async def bi_discovery_prompt_handler(
    data_path: str = ".",
    business_context: str = ""
) -> str:
    """Data source discovery and initial profiling with business context."""
    return await bi_discovery_prompt(data_path, business_context)


@mcp.prompt("insight-investigation")
async def insight_investigation_prompt_handler(
    dataset_name: str,
    focus_area: str = "general",
    time_period: str = ""
) -> str:
    """Guided exploration of business metrics with automated insights."""
    return await insight_investigation_prompt(dataset_name, focus_area, time_period)


@mcp.prompt("correlation-deep-dive")
async def correlation_deep_dive_prompt_handler(
    dataset_name: str,
    target_metric: str = "",
    hypothesis: str = ""
) -> str:
    """Multi-dimensional correlation analysis with business interpretation."""
    return await correlation_deep_dive_prompt(dataset_name, target_metric, hypothesis)


@mcp.prompt("trend-analysis")
async def trend_analysis_prompt_handler(
    dataset_name: str,
    time_column: str = "",
    metrics: str = ""
) -> str:
    """Time-series pattern detection with forecasting insights."""
    return await trend_analysis_prompt(dataset_name, time_column, metrics)


@mcp.prompt("executive-summary")
async def executive_summary_prompt_handler(
    analysis_results: str = "",
    audience: str = "CEO",
    format: str = "detailed"
) -> str:
    """Auto-generate C-suite ready business reports."""
    return await executive_summary_prompt(analysis_results, audience, format)


@mcp.prompt("action-recommendations")
async def action_recommendations_prompt_handler(
    insights: str = "",
    business_goals: str = "",
    constraints: str = ""
) -> str:
    """Data-driven business recommendations with impact analysis."""
    return await action_recommendations_prompt(insights, business_goals, constraints)


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    mcp.run()
