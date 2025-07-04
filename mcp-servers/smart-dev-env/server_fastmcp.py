#!/usr/bin/env python3
"""
Smart Development Environment MCP Server (FastMCP Version)
A senior developer pair programmer that guides code reviews, architecture decisions, and debugging workflows.
"""

import sys
import logging
from pathlib import Path
from typing import Dict, Optional

from mcp.server.fastmcp import FastMCP

# Setup logging to capture conversations and save to file
logger = logging.getLogger("smart-dev-env")
if not logger.handlers:
    logger.setLevel(logging.DEBUG)
    file_handler = logging.FileHandler("smart-dev-env.log")
    file_handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

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

# Create FastMCP server instance
mcp = FastMCP("smart-dev-env")

# =============================================================================
# TOOLS (Model-controlled functions)
# =============================================================================

@mcp.tool()
async def analyze_codebase(
    path: str, 
    analysis_type: str = "full"
) -> Dict:
    """
    Perform static analysis and generate code metrics.
    
    Args:
        path: Path to analyze
        analysis_type: Type of analysis - complexity, quality, security, or full
    """
    logger.info(f"Tool 'analyze_codebase' called with path='{path}', analysis_type='{analysis_type}'")
    result = await analyze_codebase_tool(path, analysis_type)
    logger.info(f"Tool 'analyze_codebase' result: {result}")
    return result


@mcp.tool()
async def run_tests(
    test_path: str, 
    test_type: str = "all", 
    coverage: bool = True
) -> Dict:
    """
    Execute test suites with detailed reporting.
    
    Args:
        test_path: Path to tests
        test_type: Type - unit, integration, e2e, or all
        coverage: Include coverage report
    """
    logger.info(f"Tool 'run_tests' called with test_path='{test_path}', test_type='{test_type}', coverage={coverage}")
    result = await run_tests_tool(test_path, test_type, coverage)
    logger.info(f"Tool 'run_tests' result: {result}")
    return result


@mcp.tool()
async def check_dependencies(
    manifest_path: str,
    check_vulnerabilities: bool = True,
    check_updates: bool = True
) -> Dict:
    """
    Security and version auditing of dependencies.
    
    Args:
        manifest_path: Path to package.json, requirements.txt, etc.
        check_vulnerabilities: Check for security vulnerabilities
        check_updates: Check for available updates
    """
    logger.info(f"Tool 'check_dependencies' called with manifest_path='{manifest_path}', check_vulnerabilities={check_vulnerabilities}, check_updates={check_updates}")
    result = await check_dependencies_tool(manifest_path, check_vulnerabilities, check_updates)
    logger.info(f"Tool 'check_dependencies' result: {result}")
    return result


@mcp.tool()
async def generate_docs(
    source_path: str,
    doc_type: str = "full",
    output_path: str = "docs"
) -> Dict:
    """
    Auto-generate documentation from code.
    
    Args:
        source_path: Path to source code
        doc_type: Type - api, readme, or full
        output_path: Where to save documentation
    """
    logger.info(f"Tool 'generate_docs' called with source_path='{source_path}', doc_type='{doc_type}', output_path='{output_path}'")
    result = await generate_docs_tool(source_path, doc_type, output_path)
    logger.info(f"Tool 'generate_docs' result: {result}")
    return result


@mcp.tool()
async def deploy_preview(
    environment: str = "staging",
    branch: str = "main",
    notify: bool = True
) -> Dict:
    """
    Deploy to staging environment for testing.
    
    Args:
        environment: Target environment - staging, preview, or test
        branch: Git branch to deploy
        notify: Send deployment notifications
    """
    logger.info(f"Tool 'deploy_preview' called with environment='{environment}', branch='{branch}', notify={notify}")
    result = await deploy_preview_tool(environment, branch, notify)
    logger.info(f"Tool 'deploy_preview' result: {result}")
    return result


@mcp.tool()
async def rollback_changes(
    target: str,
    identifier: str,
    confirm: bool = False
) -> Dict:
    """
    Safe rollback mechanisms for deployments or code changes.
    
    Args:
        target: What to rollback - deployment, commit, or migration
        identifier: Deployment ID, commit hash, or migration version
        confirm: Confirm rollback operation
    """
    logger.info(f"Tool 'rollback_changes' called with target='{target}', identifier='{identifier}', confirm={confirm}")
    result = await rollback_changes_tool(target, identifier, confirm)
    logger.info(f"Tool 'rollback_changes' result: {result}")
    return result


# =============================================================================
# PROMPTS (User-controlled agentic workflows)
# =============================================================================

@mcp.prompt("dev-setup")
async def dev_setup_prompt_handler(project_path: str) -> str:
    """Prime agent with project context and development standards."""
    logger.info(f"Prompt 'dev-setup' called with project_path='{project_path}'")
    result = await dev_setup_prompt(project_path)
    logger.info(f"Prompt 'dev-setup' result: {result}")
    return result


@mcp.prompt("code-review") 
async def code_review_prompt_handler(
    target: str, 
    severity: str = "thorough"
) -> str:
    """Multi-step code review workflow with quality gates."""
    logger.info(f"Prompt 'code-review' called with target='{target}', severity='{severity}'")
    result = await code_review_prompt(target, severity)
    logger.info(f"Prompt 'code-review' result: {result}")
    return result


@mcp.prompt("architecture-analysis")
async def architecture_analysis_prompt_handler(
    component: str,
    focus: str = "maintainability"
) -> str:
    """Guided architecture decision trees and recommendations."""
    logger.info(f"Prompt 'architecture-analysis' called with component='{component}', focus='{focus}'")
    result = await architecture_analysis_prompt(component, focus)
    logger.info(f"Prompt 'architecture-analysis' result: {result}")
    return result


@mcp.prompt("debug-investigation")
async def debug_investigation_prompt_handler(
    issue_description: str,
    error_logs: str = ""
) -> str:
    """Systematic debugging methodology with guided workflows.""" 
    logger.info(f"Prompt 'debug-investigation' called with issue_description='{issue_description}', error_logs='{error_logs}'")
    result = await debug_investigation_prompt(issue_description, error_logs)
    logger.info(f"Prompt 'debug-investigation' result: {result}")
    return result


@mcp.prompt("refactor-planning")
async def refactor_planning_prompt_handler(
    target_code: str,
    goals: str = ""
) -> str:
    """Safe refactoring workflows with rollback strategies."""
    logger.info(f"Prompt 'refactor-planning' called with target_code='{target_code}', goals='{goals}'")
    result = await refactor_planning_prompt(target_code, goals)
    logger.info(f"Prompt 'refactor-planning' result: {result}")
    return result


@mcp.prompt("performance-audit")
async def performance_audit_prompt_handler(scope: str) -> str:
    """End-to-end performance analysis pipeline."""
    logger.info(f"Prompt 'performance-audit' called with scope='{scope}'")
    result = await performance_audit_prompt(scope)
    logger.info(f"Prompt 'performance-audit' result: {result}")
    return result


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    logger.info("Smart Development Environment MCP Server starting...")
    mcp.run() 