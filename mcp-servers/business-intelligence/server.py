#!/usr/bin/env python3
"""
Business Intelligence MCP Server
A sophisticated data analysis platform with guided business insights discovery.
"""

import asyncio
import json
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

from mcp.server import Server
from mcp.server.models import InitializationOptions
from mcp.server.stdio import stdio_server
from mcp.types import (
    CallToolResult,
    GetPromptResult,
    ListPromptsResult,
    ListToolsResult,
    Prompt,
    PromptMessage,
    TextContent,
    Tool,
)

# Add src directory to path for imports
sys.path.append(str(Path(__file__).parent / "src"))

from prompts.bi_discovery import bi_discovery_prompt
from prompts.insight_investigation import insight_investigation_prompt
from prompts.correlation_deep_dive import correlation_deep_dive_prompt
from prompts.trend_analysis import trend_analysis_prompt
from prompts.executive_summary import executive_summary_prompt
from prompts.action_recommendations import action_recommendations_prompt

from tools.load_datasource import load_datasource_tool
from tools.profile_dataset import profile_dataset_tool
from tools.create_visualization import create_visualization_tool
from tools.run_correlation import run_correlation_tool
from tools.export_report import export_report_tool
from tools.schedule_analysis import schedule_analysis_tool

app = Server("business-intelligence")

# Prompt definitions - The highest leverage primitives for BI workflows
PROMPTS = {
    "bi-discovery": Prompt(
        name="bi-discovery",
        description="Data source discovery and initial profiling with business context",
        arguments=[
            {"name": "data_path", "description": "Path to data files or directory", "required": False},
            {"name": "business_context", "description": "Business domain context for analysis", "required": False}
        ]
    ),
    "insight-investigation": Prompt(
        name="insight-investigation", 
        description="Guided exploration of business metrics with automated insights",
        arguments=[
            {"name": "dataset_name", "description": "Name of loaded dataset", "required": True},
            {"name": "focus_area", "description": "Business area to focus on: revenue, customers, operations, growth", "required": False},
            {"name": "time_period", "description": "Time period for analysis", "required": False}
        ]
    ),
    "correlation-deep-dive": Prompt(
        name="correlation-deep-dive",
        description="Multi-dimensional correlation analysis with business interpretation",
        arguments=[
            {"name": "dataset_name", "description": "Name of loaded dataset", "required": True},
            {"name": "target_metric", "description": "Primary metric to correlate against", "required": False},
            {"name": "hypothesis", "description": "Business hypothesis to test", "required": False}
        ]
    ),
    "trend-analysis": Prompt(
        name="trend-analysis",
        description="Time-series pattern detection with forecasting insights",
        arguments=[
            {"name": "dataset_name", "description": "Name of loaded dataset", "required": True},
            {"name": "time_column", "description": "Column containing time/date data", "required": False},
            {"name": "metrics", "description": "Metrics to analyze for trends", "required": False}
        ]
    ),
    "executive-summary": Prompt(
        name="executive-summary",
        description="Auto-generate C-suite ready business reports",
        arguments=[
            {"name": "analysis_results", "description": "Previous analysis results to summarize", "required": False},
            {"name": "audience", "description": "Target audience: CEO, CFO, COO, Board", "required": False},
            {"name": "format", "description": "Report format: brief, detailed, presentation", "required": False}
        ]
    ),
    "action-recommendations": Prompt(
        name="action-recommendations", 
        description="Data-driven business recommendations with impact analysis",
        arguments=[
            {"name": "insights", "description": "Key insights from analysis", "required": False},
            {"name": "business_goals", "description": "Current business objectives", "required": False},
            {"name": "constraints", "description": "Known business constraints", "required": False}
        ]
    ),
}

# Tool definitions - Individual actions that prompts compose together
TOOLS = {
    "load-datasource": Tool(
        name="load-datasource",
        description="ETL from various sources (CSV, Excel, JSON, databases)",
        inputSchema={
            "type": "object",
            "properties": {
                "source_path": {"type": "string", "description": "Path to data source"},
                "source_type": {"type": "string", "description": "Type: csv, excel, json, database, api"},
                "dataset_name": {"type": "string", "description": "Name for the dataset"},
                "options": {"type": "object", "description": "Source-specific options"}
            },
            "required": ["source_path", "dataset_name"]
        }
    ),
    "profile-dataset": Tool(
        name="profile-dataset",
        description="Statistical profiling and data quality assessment",
        inputSchema={
            "type": "object", 
            "properties": {
                "dataset_name": {"type": "string", "description": "Name of loaded dataset"},
                "detailed": {"type": "boolean", "description": "Include detailed statistical analysis"},
                "sample_size": {"type": "number", "description": "Sample size for profiling"}
            },
            "required": ["dataset_name"]
        }
    ),
    "create-visualization": Tool(
        name="create-visualization",
        description="Generate charts, dashboards, and interactive visualizations",
        inputSchema={
            "type": "object",
            "properties": {
                "dataset_name": {"type": "string", "description": "Source dataset"},
                "chart_type": {"type": "string", "description": "Type: bar, line, scatter, heatmap, dashboard"},
                "x_column": {"type": "string", "description": "X-axis column"},
                "y_column": {"type": "string", "description": "Y-axis column"},
                "group_by": {"type": "string", "description": "Column to group/color by"},
                "title": {"type": "string", "description": "Chart title"},
                "output_path": {"type": "string", "description": "Where to save visualization"}
            },
            "required": ["dataset_name", "chart_type"]
        }
    ),
    "run-correlation": Tool(
        name="run-correlation",
        description="Statistical correlation analysis with business interpretation",
        inputSchema={
            "type": "object",
            "properties": {
                "dataset_name": {"type": "string", "description": "Source dataset"},
                "method": {"type": "string", "description": "Method: pearson, spearman, kendall"},
                "target_column": {"type": "string", "description": "Target variable for correlation"},
                "columns": {"type": "array", "description": "Specific columns to analyze"},
                "threshold": {"type": "number", "description": "Correlation significance threshold"}
            },
            "required": ["dataset_name"]
        }
    ),
    "export-report": Tool(
        name="export-report",
        description="Generate formatted business reports (PDF, PowerPoint, HTML)",
        inputSchema={
            "type": "object",
            "properties": {
                "content": {"type": "object", "description": "Report content and insights"},
                "format": {"type": "string", "description": "Format: pdf, pptx, html, markdown"},
                "template": {"type": "string", "description": "Report template to use"},
                "output_path": {"type": "string", "description": "Where to save report"}
            },
            "required": ["content", "format"]
        }
    ),
    "schedule-analysis": Tool(
        name="schedule-analysis",
        description="Set up automated recurring insights and monitoring",
        inputSchema={
            "type": "object",
            "properties": {
                "analysis_config": {"type": "object", "description": "Analysis configuration"},
                "schedule": {"type": "string", "description": "Cron-style schedule"},
                "notification_channels": {"type": "array", "description": "Where to send results"},
                "alert_conditions": {"type": "object", "description": "Conditions for alerts"}
            },
            "required": ["analysis_config", "schedule"]
        }
    ),
}

@app.list_prompts()
async def list_prompts() -> ListPromptsResult:
    """List available BI prompts."""
    return ListPromptsResult(prompts=list(PROMPTS.values()))

@app.get_prompt()
async def get_prompt(name: str, arguments: Optional[Dict[str, str]] = None) -> GetPromptResult:
    """Execute a BI prompt with given arguments."""
    if name not in PROMPTS:
        raise ValueError(f"Unknown prompt: {name}")
    
    args = arguments or {}
    
    if name == "bi-discovery":
        result = await bi_discovery_prompt(
            args.get("data_path", "."),
            args.get("business_context", "")
        )
    elif name == "insight-investigation":
        result = await insight_investigation_prompt(
            args.get("dataset_name", ""),
            args.get("focus_area", "general"),
            args.get("time_period", "")
        )
    elif name == "correlation-deep-dive":
        result = await correlation_deep_dive_prompt(
            args.get("dataset_name", ""),
            args.get("target_metric", ""),
            args.get("hypothesis", "")
        )
    elif name == "trend-analysis":
        result = await trend_analysis_prompt(
            args.get("dataset_name", ""),
            args.get("time_column", ""),
            args.get("metrics", "")
        )
    elif name == "executive-summary":
        result = await executive_summary_prompt(
            args.get("analysis_results", ""),
            args.get("audience", "CEO"),
            args.get("format", "detailed")
        )
    elif name == "action-recommendations":
        result = await action_recommendations_prompt(
            args.get("insights", ""),
            args.get("business_goals", ""),
            args.get("constraints", "")
        )
    else:
        result = "Unknown prompt"
    
    return GetPromptResult(
        description=f"Executed {name} BI workflow",
        messages=[
            PromptMessage(
                role="user",
                content=TextContent(type="text", text=result)
            )
        ]
    )

@app.list_tools()
async def list_tools() -> ListToolsResult:
    """List available BI tools."""
    return ListToolsResult(tools=list(TOOLS.values()))

@app.call_tool()
async def call_tool(name: str, arguments: Optional[Dict[str, Any]] = None) -> CallToolResult:
    """Execute a BI tool with given arguments."""
    if name not in TOOLS:
        raise ValueError(f"Unknown tool: {name}")
    
    args = arguments or {}
    
    try:
        if name == "load-datasource":
            result = await load_datasource_tool(
                args.get("source_path", ""),
                args.get("source_type", "auto"),
                args.get("dataset_name", ""),
                args.get("options", {})
            )
        elif name == "profile-dataset":
            result = await profile_dataset_tool(
                args.get("dataset_name", ""),
                args.get("detailed", True),
                args.get("sample_size", 10000)
            )
        elif name == "create-visualization":
            result = await create_visualization_tool(
                args.get("dataset_name", ""),
                args.get("chart_type", "bar"),
                args.get("x_column", ""),
                args.get("y_column", ""),
                args.get("group_by", ""),
                args.get("title", ""),
                args.get("output_path", "")
            )
        elif name == "run-correlation":
            result = await run_correlation_tool(
                args.get("dataset_name", ""),
                args.get("method", "pearson"),
                args.get("target_column", ""),
                args.get("columns", []),
                args.get("threshold", 0.3)
            )
        elif name == "export-report":
            result = await export_report_tool(
                args.get("content", {}),
                args.get("format", "pdf"),
                args.get("template", "standard"),
                args.get("output_path", "")
            )
        elif name == "schedule-analysis":
            result = await schedule_analysis_tool(
                args.get("analysis_config", {}),
                args.get("schedule", "0 9 * * 1"),  # Default: Monday 9am
                args.get("notification_channels", []),
                args.get("alert_conditions", {})
            )
        else:
            result = {"error": f"Unknown tool: {name}"}
        
        return CallToolResult(content=[TextContent(type="text", text=json.dumps(result, indent=2))])
    
    except Exception as e:
        return CallToolResult(
            content=[TextContent(type="text", text=f"Error executing {name}: {str(e)}")],
            isError=True
        )

async def main():
    """Main entry point for the BI MCP server."""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="business-intelligence",
                server_version="1.0.0",
                capabilities=app.get_capabilities(
                    notification_options=None,
                    experimental_capabilities=None
                )
            )
        )

if __name__ == "__main__":
    asyncio.run(main())
