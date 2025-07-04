#!/usr/bin/env python3
"""
Infrastructure Automation MCP Server (FastMCP Version)
A comprehensive infrastructure management and automation assistant that provides
monitoring, deployment, scaling, and incident response capabilities.
"""

import sys
from pathlib import Path
from typing import Dict, Optional

from mcp.server.fastmcp import FastMCP

# Add src directory to path for imports
sys.path.append(str(Path(__file__).parent / "src"))

from src.prompts.infra_health_check import infra_health_check_prompt
from src.prompts.deployment_strategy import deployment_strategy_prompt
from src.prompts.scaling_analysis import scaling_analysis_prompt
from src.prompts.incident_response import incident_response_prompt
from src.prompts.security_audit import security_audit_prompt
from src.prompts.disaster_recovery import disaster_recovery_prompt

from src.tools.monitor_services import monitor_services_tool
from src.tools.deploy_application import deploy_application_tool
from src.tools.scale_resources import scale_resources_tool
from src.tools.backup_data import backup_data_tool
from src.tools.rotate_secrets import rotate_secrets_tool
from src.tools.analyze_logs import analyze_logs_tool

# Create FastMCP server instance
mcp = FastMCP("infrastructure-automation")

# =============================================================================
# TOOLS (Model-controlled functions)
# =============================================================================

@mcp.tool()
async def monitor_services(
    service_filter: str = "all", 
    metrics: str = "standard",
    alert_threshold: float = 80.0
) -> Dict:
    """
    Real-time monitoring of infrastructure services and health checks.
    
    Args:
        service_filter: Filter services by name, tag, or "all"
        metrics: Type of metrics - standard, detailed, or performance
        alert_threshold: Threshold percentage for alerts (0-100)
    """
    return await monitor_services_tool(service_filter, metrics, alert_threshold)


@mcp.tool()
async def deploy_application(
    app_name: str,
    environment: str = "staging",
    deployment_type: str = "rolling",
    health_check: bool = True
) -> Dict:
    """
    Deploy applications with various deployment strategies.
    
    Args:
        app_name: Name of the application to deploy
        environment: Target environment - staging, production, dev
        deployment_type: Deployment strategy - rolling, blue_green, canary
        health_check: Perform health checks during deployment
    """
    return await deploy_application_tool(app_name, environment, deployment_type, health_check)


@mcp.tool()
async def scale_resources(
    resource_type: str,
    target_capacity: int,
    auto_scaling: bool = True,
    metrics_based: bool = True
) -> Dict:
    """
    Scale infrastructure resources up or down based on demand.
    
    Args:
        resource_type: Type of resource - compute, storage, network
        target_capacity: Desired capacity (percentage or absolute value)
        auto_scaling: Enable automatic scaling policies
        metrics_based: Use metrics-based scaling decisions
    """
    return await scale_resources_tool(resource_type, target_capacity, auto_scaling, metrics_based)


@mcp.tool()
async def backup_data(
    data_source: str,
    backup_type: str = "incremental",
    retention_days: int = 30,
    verify: bool = True
) -> Dict:
    """
    Backup critical data with configurable policies.
    
    Args:
        data_source: Source system, database, or path to backup
        backup_type: Type of backup - full, incremental, differential
        retention_days: Number of days to retain backups
        verify: Verify backup integrity after creation
    """
    return await backup_data_tool(data_source, backup_type, retention_days, verify)


@mcp.tool()
async def rotate_secrets(
    secret_type: str,
    environment: str = "all",
    force_rotation: bool = False,
    notify: bool = True
) -> Dict:
    """
    Rotate security credentials and secrets safely.
    
    Args:
        secret_type: Type of secret - api_keys, certificates, passwords, database
        environment: Target environment or "all"
        force_rotation: Force rotation even if not due
        notify: Send notifications about rotation status
    """
    return await rotate_secrets_tool(secret_type, environment, force_rotation, notify)


@mcp.tool()
async def analyze_logs(
    log_source: str,
    time_range: str = "1h",
    log_level: str = "ERROR",
    pattern: str = ""
) -> Dict:
    """
    Analyze logs for patterns, errors, and anomalies.
    
    Args:
        log_source: Log source - application, system, security, or specific service
        time_range: Time range to analyze - 15m, 1h, 6h, 24h, 7d
        log_level: Minimum log level - DEBUG, INFO, WARN, ERROR, FATAL
        pattern: Optional regex pattern to search for
    """
    return await analyze_logs_tool(log_source, time_range, log_level, pattern)


# =============================================================================
# PROMPTS (User-controlled agentic workflows)
# =============================================================================

@mcp.prompt("infra-health-check")
async def infra_health_check_prompt_handler(scope: str = "all") -> str:
    """Comprehensive infrastructure health assessment and monitoring."""
    return await infra_health_check_prompt(scope)


@mcp.prompt("deployment-strategy") 
async def deployment_strategy_prompt_handler(
    application: str, 
    target_env: str = "production"
) -> str:
    """Guided deployment planning with risk assessment and rollback strategies."""
    return await deployment_strategy_prompt(application, target_env)


@mcp.prompt("scaling-analysis")
async def scaling_analysis_prompt_handler(
    resource_focus: str = "compute",
    capacity_target: str = "auto"
) -> str:
    """Capacity planning and auto-scaling optimization."""
    return await scaling_analysis_prompt(resource_focus, capacity_target)


@mcp.prompt("incident-response")
async def incident_response_prompt_handler(
    incident_type: str,
    severity: str = "medium"
) -> str:
    """Automated incident management and response workflows.""" 
    return await incident_response_prompt(incident_type, severity)


@mcp.prompt("security-audit")
async def security_audit_prompt_handler(
    audit_scope: str = "full",
    compliance_framework: str = ""
) -> str:
    """Infrastructure security assessment and compliance checking."""
    return await security_audit_prompt(audit_scope, compliance_framework)


@mcp.prompt("disaster-recovery")
async def disaster_recovery_prompt_handler(
    scenario: str,
    rto_target: str = "4h"
) -> str:
    """Backup and disaster recovery planning and testing."""
    return await disaster_recovery_prompt(scenario, rto_target)


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    mcp.run()
