#!/usr/bin/env python3
"""
Smart Development Environment MCP Server
A senior developer pair programmer that guides code reviews, architecture decisions, and debugging workflows.
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

from src.prompts.dev_setup import dev_setup_prompt
from src.prompts.code_review import code_review_prompt
from src.prompts.architecture_analysis import architecture_analysis_prompt
from src.prompts.debug_investigation import debug_investigation_prompt
from src.prompts.refactor_planning import refactor_planning_prompt
from src.prompts.performance_audit import performance_audit_prompt

from src.tools.analyze_codebase import analyze_codebase_tool
from src.tools.run_tests import run_tests_tool
from src.tools.check_dependencies import check_dependencies_tool
from src.tools.generate_docs import generate_docs_tool
from src.tools.deploy_preview import deploy_preview_tool
from src.tools.rollback_changes import rollback_changes_tool

app = Server("smart-dev-env")

# Prompt definitions
PROMPTS = {
    "dev-setup": Prompt(
        name="dev-setup",
        description="Prime agent with project context and development standards",
        arguments=[
            {"name": "project_path", "description": "Path to the project directory", "required": True}
        ]
    ),
    "code-review": Prompt(
        name="code-review",
        description="Multi-step code review workflow with quality gates",
        arguments=[
            {"name": "target", "description": "Files, commits, or branch to review", "required": True},
            {"name": "severity", "description": "Review severity: basic, thorough, or critical", "required": False}
        ]
    ),
    "architecture-analysis": Prompt(
        name="architecture-analysis",
        description="Guided architecture decision trees and recommendations",
        arguments=[
            {"name": "component", "description": "Component or system to analyze", "required": True},
            {"name": "focus", "description": "Focus area: scalability, maintainability, security", "required": False}
        ]
    ),
    "debug-investigation": Prompt(
        name="debug-investigation",
        description="Systematic debugging methodology with guided workflows",
        arguments=[
            {"name": "issue_description", "description": "Description of the bug or issue", "required": True},
            {"name": "error_logs", "description": "Error logs or stack traces", "required": False}
        ]
    ),
    "refactor-planning": Prompt(
        name="refactor-planning",
        description="Safe refactoring workflows with rollback strategies",
        arguments=[
            {"name": "target_code", "description": "Code area to refactor", "required": True},
            {"name": "goals", "description": "Refactoring goals and constraints", "required": False}
        ]
    ),
    "performance-audit": Prompt(
        name="performance-audit",
        description="End-to-end performance analysis pipeline",
        arguments=[
            {"name": "scope", "description": "Audit scope: frontend, backend, database, or full-stack", "required": True}
        ]
    ),
}

# Tool definitions
TOOLS = {
    "analyze-codebase": Tool(
        name="analyze-codebase",
        description="Perform static analysis and generate code metrics",
        inputSchema={
            "type": "object",
            "properties": {
                "path": {"type": "string", "description": "Path to analyze"},
                "analysis_type": {"type": "string", "description": "Type of analysis: complexity, quality, security, or full"}
            },
            "required": ["path"]
        }
    ),
    "run-tests": Tool(
        name="run-tests",
        description="Execute test suites with detailed reporting",
        inputSchema={
            "type": "object",
            "properties": {
                "test_path": {"type": "string", "description": "Path to tests"},
                "test_type": {"type": "string", "description": "Type: unit, integration, e2e, or all"},
                "coverage": {"type": "boolean", "description": "Include coverage report"}
            },
            "required": ["test_path"]
        }
    ),
    "check-dependencies": Tool(
        name="check-dependencies",
        description="Security and version auditing of dependencies",
        inputSchema={
            "type": "object",
            "properties": {
                "manifest_path": {"type": "string", "description": "Path to package.json, requirements.txt, etc."},
                "check_vulnerabilities": {"type": "boolean", "description": "Check for security vulnerabilities"},
                "check_updates": {"type": "boolean", "description": "Check for available updates"}
            },
            "required": ["manifest_path"]
        }
    ),
    "generate-docs": Tool(
        name="generate-docs",
        description="Auto-generate documentation from code",
        inputSchema={
            "type": "object",
            "properties": {
                "source_path": {"type": "string", "description": "Path to source code"},
                "doc_type": {"type": "string", "description": "Type: api, readme, or full"},
                "output_path": {"type": "string", "description": "Where to save documentation"}
            },
            "required": ["source_path"]
        }
    ),
    "deploy-preview": Tool(
        name="deploy-preview",
        description="Deploy to staging environment for testing",
        inputSchema={
            "type": "object",
            "properties": {
                "environment": {"type": "string", "description": "Target environment: staging, preview, or test"},
                "branch": {"type": "string", "description": "Git branch to deploy"},
                "notify": {"type": "boolean", "description": "Send deployment notifications"}
            },
            "required": ["environment"]
        }
    ),
    "rollback-changes": Tool(
        name="rollback-changes",
        description="Safe rollback mechanisms for deployments or code changes",
        inputSchema={
            "type": "object",
            "properties": {
                "target": {"type": "string", "description": "What to rollback: deployment, commit, or migration"},
                "identifier": {"type": "string", "description": "Deployment ID, commit hash, or migration version"},
                "confirm": {"type": "boolean", "description": "Confirm rollback operation"}
            },
            "required": ["target", "identifier"]
        }
    ),
}

@app.list_prompts()
async def list_prompts() -> ListPromptsResult:
    """List available prompts."""
    return ListPromptsResult(prompts=list(PROMPTS.values()))

@app.get_prompt()
async def get_prompt(name: str, arguments: Optional[Dict[str, str]] = None) -> GetPromptResult:
    """Execute a prompt with given arguments."""
    if name not in PROMPTS:
        raise ValueError(f"Unknown prompt: {name}")
    
    args = arguments or {}
    
    if name == "dev-setup":
        result = await dev_setup_prompt(args.get("project_path", "."))
    elif name == "code-review":
        result = await code_review_prompt(
            args.get("target", "HEAD"),
            args.get("severity", "thorough")
        )
    elif name == "architecture-analysis":
        result = await architecture_analysis_prompt(
            args.get("component", ""),
            args.get("focus", "maintainability")
        )
    elif name == "debug-investigation":
        result = await debug_investigation_prompt(
            args.get("issue_description", ""),
            args.get("error_logs", "")
        )
    elif name == "refactor-planning":
        result = await refactor_planning_prompt(
            args.get("target_code", ""),
            args.get("goals", "")
        )
    elif name == "performance-audit":
        result = await performance_audit_prompt(
            args.get("scope", "full-stack")
        )
    else:
        result = "Unknown prompt"
    
    return GetPromptResult(
        description=f"Executed {name} prompt",
        messages=[
            PromptMessage(
                role="user",
                content=TextContent(type="text", text=result)
            )
        ]
    )

@app.list_tools()
async def list_tools() -> ListToolsResult:
    """List available tools."""
    return ListToolsResult(tools=list(TOOLS.values()))

@app.call_tool()
async def call_tool(name: str, arguments: Optional[Dict[str, Any]] = None) -> CallToolResult:
    """Execute a tool with given arguments."""
    if name not in TOOLS:
        raise ValueError(f"Unknown tool: {name}")
    
    args = arguments or {}
    
    try:
        if name == "analyze-codebase":
            result = await analyze_codebase_tool(
                args.get("path", "."),
                args.get("analysis_type", "full")
            )
        elif name == "run-tests":
            result = await run_tests_tool(
                args.get("test_path", "tests"),
                args.get("test_type", "all"),
                args.get("coverage", True)
            )
        elif name == "check-dependencies":
            result = await check_dependencies_tool(
                args.get("manifest_path", ""),
                args.get("check_vulnerabilities", True),
                args.get("check_updates", True)
            )
        elif name == "generate-docs":
            result = await generate_docs_tool(
                args.get("source_path", "src"),
                args.get("doc_type", "full"),
                args.get("output_path", "docs")
            )
        elif name == "deploy-preview":
            result = await deploy_preview_tool(
                args.get("environment", "staging"),
                args.get("branch", "main"),
                args.get("notify", True)
            )
        elif name == "rollback-changes":
            result = await rollback_changes_tool(
                args.get("target", ""),
                args.get("identifier", ""),
                args.get("confirm", False)
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
    """Main entry point for the MCP server."""
    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            InitializationOptions(
                server_name="smart-dev-env",
                server_version="1.0.0",
                capabilities=app.get_capabilities(
                    notification_options=None,
                    experimental_capabilities=None
                )
            )
        )

if __name__ == "__main__":
    asyncio.run(main())
