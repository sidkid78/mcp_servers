"""
Infrastructure Health Check Prompt
Comprehensive system assessment and monitoring workflow.
"""

import json
from datetime import datetime, timedelta
from typing import Dict, List


async def infra_health_check_prompt(scope: str = "all") -> str:
    """
    Perform comprehensive infrastructure health assessment.
    This is the main discovery prompt that provides a complete system overview.
    """

    # Validate scope
    valid_scopes = ["all", "compute", "storage", "network", "security", "applications"]
    if scope not in valid_scopes:
        scope = "all"

    # Perform health assessment
    health_summary = await _perform_health_assessment(scope)
    
    # Generate prioritized recommendations
    recommendations = await _generate_health_recommendations(health_summary)
    
    # Create next steps suggestions
    next_steps = await _suggest_next_workflows(health_summary, scope)

    # Generate comprehensive health report
    health_report = f"""
🏥 **Infrastructure Health Check Complete**

**Assessment Scope:** {scope.title()}
**Timestamp:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}

**🔍 System Overview:**
{_format_system_overview(health_summary)}

**📊 Health Metrics:**
{_format_health_metrics(health_summary)}

**⚠️ Issues Detected:**
{_format_issues(health_summary.get('issues', []))}

**🎯 Critical Actions Required:**
{_format_recommendations(recommendations)}

**🔄 Available Workflows:**
🚀 `/infra/deployment-strategy` - Plan safe deployments with rollback strategies
📈 `/infra/scaling-analysis` - Optimize resource capacity and auto-scaling
🚨 `/infra/incident-response` - Handle active incidents or prepare response plans
🔒 `/infra/security-audit` - Comprehensive security assessment
💾 `/infra/disaster-recovery` - Backup and recovery planning

**⚡ Individual Tools Available:**
• `monitor-services` - Real-time service monitoring and alerts
• `deploy-application` - Automated deployment with health checks
• `scale-resources` - Dynamic resource scaling and optimization
• `backup-data` - Data protection and backup management
• `rotate-secrets` - Security credential rotation
• `analyze-logs` - Log analysis and anomaly detection

**🎪 Next Steps:**
{_format_next_steps(next_steps)}

**Infrastructure Status: {_get_overall_status(health_summary)} ✅**
Ready for infrastructure management and automation. What would you like to focus on?
"""

    return health_report


async def _perform_health_assessment(scope: str) -> Dict:
    """Perform comprehensive infrastructure health assessment."""
    
    assessment = {
        "scope": scope,
        "timestamp": datetime.now().isoformat(),
        "services": {},
        "resources": {},
        "security": {},
        "performance": {},
        "issues": [],
        "metrics": {}
    }

    # Simulate comprehensive health check based on scope
    if scope in ["all", "compute"]:
        assessment["services"]["compute"] = await _assess_compute_health()
    
    if scope in ["all", "storage"]:
        assessment["services"]["storage"] = await _assess_storage_health()
    
    if scope in ["all", "network"]:
        assessment["services"]["network"] = await _assess_network_health()
    
    if scope in ["all", "security"]:
        assessment["security"] = await _assess_security_posture()
    
    if scope in ["all", "applications"]:
        assessment["services"]["applications"] = await _assess_application_health()

    # Calculate overall metrics
    assessment["metrics"] = await _calculate_health_metrics(assessment)
    
    # Identify issues
    assessment["issues"] = await _identify_health_issues(assessment)

    return assessment


async def _assess_compute_health() -> Dict:
    """Assess compute resource health."""
    
    return {
        "status": "healthy",
        "instances": {
            "total": 12,
            "running": 11,
            "stopped": 1,
            "failing": 0
        },
        "cpu_utilization": {
            "average": 65.3,
            "peak": 89.2,
            "threshold": 80.0
        },
        "memory_utilization": {
            "average": 72.1,
            "peak": 91.5,
            "threshold": 85.0
        },
        "disk_utilization": {
            "average": 58.7,
            "peak": 78.3,
            "threshold": 90.0
        },
        "auto_scaling": {
            "enabled": True,
            "policies": 3,
            "recent_scaling_events": 2
        },
        "alerts": [
            {
                "severity": "warning",
                "message": "Instance i-abc123 approaching memory threshold",
                "timestamp": "2025-06-25T14:30:00Z"
            }
        ]
    }


async def _assess_storage_health() -> Dict:
    """Assess storage resource health."""
    
    return {
        "status": "healthy",
        "volumes": {
            "total": 8,
            "healthy": 8,
            "degraded": 0,
            "failed": 0
        },
        "storage_utilization": {
            "total_capacity_tb": 50.0,
            "used_capacity_tb": 32.5,
            "utilization_percent": 65.0,
            "threshold": 80.0
        },
        "iops_performance": {
            "current_iops": 2150,
            "max_iops": 10000,
            "utilization_percent": 21.5
        },
        "backup_status": {
            "last_backup": "2025-06-25T02:00:00Z",
            "backup_success_rate": 98.5,
            "retention_policy": "30 days"
        },
        "alerts": []
    }


async def _assess_network_health() -> Dict:
    """Assess network infrastructure health."""
    
    return {
        "status": "healthy",
        "connectivity": {
            "external_connectivity": True,
            "internal_connectivity": True,
            "dns_resolution": True,
            "load_balancer_health": True
        },
        "bandwidth_utilization": {
            "ingress_mbps": 450.2,
            "egress_mbps": 380.7,
            "capacity_mbps": 1000.0,
            "peak_utilization": 67.8
        },
        "latency_metrics": {
            "average_latency_ms": 12.3,
            "p99_latency_ms": 45.7,
            "threshold_ms": 100.0
        },
        "security": {
            "firewall_rules": 24,
            "blocked_attacks": 15,
            "ssl_certificates": {
                "total": 6,
                "expiring_soon": 1,
                "expired": 0
            }
        },
        "alerts": [
            {
                "severity": "info",
                "message": "SSL certificate for api.example.com expires in 14 days",
                "timestamp": "2025-06-25T12:00:00Z"
            }
        ]
    }


async def _assess_security_posture() -> Dict:
    """Assess overall security posture."""
    
    return {
        "status": "good",
        "access_management": {
            "active_users": 45,
            "privileged_accounts": 8,
            "mfa_adoption": 89.0,
            "inactive_accounts": 3
        },
        "secrets_management": {
            "secrets_total": 120,
            "rotation_compliant": 115,
            "expiring_soon": 5,
            "last_rotation_check": "2025-06-25T06:00:00Z"
        },
        "vulnerability_scanning": {
            "last_scan": "2025-06-24T22:00:00Z",
            "high_severity": 0,
            "medium_severity": 3,
            "low_severity": 12,
            "remediation_rate": 95.2
        },
        "compliance": {
            "frameworks": ["SOC2", "GDPR"],
            "compliance_score": 94.0,
            "last_audit": "2025-06-01"
        },
        "alerts": [
            {
                "severity": "medium",
                "message": "5 secrets expiring within 30 days",
                "timestamp": "2025-06-25T08:00:00Z"
            }
        ]
    }


async def _assess_application_health() -> Dict:
    """Assess application-level health."""
    
    return {
        "status": "healthy",
        "applications": {
            "total": 15,
            "healthy": 14,
            "degraded": 1,
            "down": 0
        },
        "response_times": {
            "average_ms": 185.0,
            "p95_ms": 420.0,
            "p99_ms": 850.0,
            "threshold_ms": 500.0
        },
        "error_rates": {
            "2xx_percent": 96.8,
            "4xx_percent": 2.1,
            "5xx_percent": 1.1,
            "target_success_rate": 99.0
        },
        "deployment_status": {
            "last_deployment": "2025-06-24T16:30:00Z",
            "deployment_success_rate": 98.5,
            "rollback_rate": 1.2
        },
        "dependencies": {
            "external_apis": 8,
            "database_connections": 12,
            "healthy_dependencies": 19,
            "degraded_dependencies": 1
        },
        "alerts": [
            {
                "severity": "warning",
                "message": "User service showing elevated 5xx error rate (2.3%)",
                "timestamp": "2025-06-25T13:45:00Z"
            }
        ]
    }


async def _calculate_health_metrics(assessment: Dict) -> Dict:
    """Calculate overall health metrics."""
    
    metrics = {
        "overall_health_score": 0,
        "availability": 0,
        "performance": 0,
        "security": 0,
        "reliability": 0
    }

    # Calculate component scores
    component_scores = []
    
    for service_type, service_data in assessment.get("services", {}).items():
        if isinstance(service_data, dict) and "status" in service_data:
            status = service_data["status"]
            if status == "healthy":
                component_scores.append(100)
            elif status == "degraded":
                component_scores.append(70)
            elif status == "critical":
                component_scores.append(30)
            else:
                component_scores.append(50)

    # Security score
    security_data = assessment.get("security", {})
    if security_data.get("status") == "good":
        security_score = 85
    elif security_data.get("status") == "fair":
        security_score = 65
    else:
        security_score = 45

    # Calculate weighted scores
    if component_scores:
        availability = sum(component_scores) / len(component_scores)
        performance = min(availability + 5, 100)  # Performance usually correlates with availability
        reliability = availability - 5 if availability > 5 else availability
    else:
        availability = performance = reliability = 85

    metrics.update({
        "overall_health_score": round((availability + performance + security_score + reliability) / 4, 1),
        "availability": round(availability, 1),
        "performance": round(performance, 1),
        "security": security_score,
        "reliability": round(reliability, 1)
    })

    return metrics


async def _identify_health_issues(assessment: Dict) -> List[Dict]:
    """Identify and prioritize health issues."""
    
    issues = []

    # Collect all alerts from different components
    for service_type, service_data in assessment.get("services", {}).items():
        if isinstance(service_data, dict) and "alerts" in service_data:
            for alert in service_data["alerts"]:
                issues.append({
                    **alert,
                    "component": service_type,
                    "category": "service_alert"
                })

    # Add security alerts
    security_alerts = assessment.get("security", {}).get("alerts", [])
    for alert in security_alerts:
        issues.append({
            **alert,
            "component": "security",
            "category": "security_alert"
        })

    # Add capacity warnings
    compute = assessment.get("services", {}).get("compute", {})
    if compute.get("cpu_utilization", {}).get("peak", 0) > 85:
        issues.append({
            "severity": "warning",
            "message": f"High CPU utilization detected: {compute['cpu_utilization']['peak']}%",
            "component": "compute",
            "category": "capacity",
            "timestamp": datetime.now().isoformat()
        })

    if compute.get("memory_utilization", {}).get("peak", 0) > 90:
        issues.append({
            "severity": "critical",
            "message": f"Critical memory utilization: {compute['memory_utilization']['peak']}%",
            "component": "compute",
            "category": "capacity",
            "timestamp": datetime.now().isoformat()
        })

    # Sort by severity and timestamp
    severity_order = {"critical": 4, "high": 3, "medium": 2, "warning": 1, "info": 0}
    issues.sort(key=lambda x: (severity_order.get(x.get("severity", "info"), 0), x.get("timestamp", "")), reverse=True)

    return issues[:10]  # Return top 10 issues


async def _generate_health_recommendations(assessment: Dict) -> List[str]:
    """Generate prioritized recommendations based on health assessment."""
    
    recommendations = []
    metrics = assessment.get("metrics", {})
    issues = assessment.get("issues", [])

    # Critical issues first
    critical_issues = [i for i in issues if i.get("severity") == "critical"]
    if critical_issues:
        recommendations.append(
            f"🚨 CRITICAL: {len(critical_issues)} critical issues require immediate attention"
        )
        recommendations.append(
            "→ Run `/infra/incident-response critical` to activate emergency procedures"
        )

    # High severity issues
    high_issues = [i for i in issues if i.get("severity") in ["high", "warning"]]
    if high_issues:
        recommendations.append(
            f"⚠️ {len(high_issues)} high-priority issues need resolution within 24 hours"
        )

    # Performance optimization
    performance_score = metrics.get("performance", 100)
    if performance_score < 80:
        recommendations.append(
            "⚡ Performance degradation detected - consider running `/infra/scaling-analysis`"
        )

    # Security recommendations
    security_score = metrics.get("security", 100)
    if security_score < 90:
        recommendations.append(
            "🔒 Security improvements needed - run `/infra/security-audit` for detailed assessment"
        )

    # Capacity planning
    compute = assessment.get("services", {}).get("compute", {})
    if compute.get("cpu_utilization", {}).get("average", 0) > 70:
        recommendations.append(
            "📈 High resource utilization - consider `/infra/scaling-analysis compute` for optimization"
        )

    # Backup and disaster recovery
    storage = assessment.get("services", {}).get("storage", {})
    backup_age_hours = 26  # Simulated
    if backup_age_hours > 24:
        recommendations.append(
            "💾 Backup schedule review needed - run `/infra/disaster-recovery backup-review`"
        )

    # Deployment readiness
    overall_score = metrics.get("overall_health_score", 100)
    if overall_score > 90:
        recommendations.append(
            "🚀 System health excellent - ready for deployments via `/infra/deployment-strategy`"
        )
    elif overall_score > 75:
        recommendations.append(
            "🔄 System stable but monitor during deployments - use `/infra/deployment-strategy` with caution"
        )

    # Default recommendations if everything is healthy
    if not recommendations:
        recommendations.extend([
            "✨ Infrastructure health is excellent!",
            "🔍 Consider proactive monitoring with `monitor-services`",
            "📋 Schedule regular `/infra/security-audit` assessments",
            "📈 Optimize costs with `/infra/scaling-analysis resource-optimization`"
        ])

    return recommendations[:5]  # Return top 5 recommendations


async def _suggest_next_workflows(assessment: Dict, scope: str) -> List[str]:
    """Suggest contextual next workflows based on current state."""
    
    suggestions = []
    issues = assessment.get("issues", [])
    metrics = assessment.get("metrics", {})

    # Critical path suggestions
    if any(i.get("severity") == "critical" for i in issues):
        suggestions.append(
            "🚨 **URGENT**: `/infra/incident-response` - Address critical infrastructure issues"
        )

    if metrics.get("security", 100) < 85:
        suggestions.append(
            "🔒 `/infra/security-audit full` - Comprehensive security assessment required"
        )

    # Capacity management
    compute = assessment.get("services", {}).get("compute", {})
    if compute.get("cpu_utilization", {}).get("average", 0) > 65:
        suggestions.append(
            "📈 `/infra/scaling-analysis` - Optimize resource allocation and auto-scaling"
        )

    # Deployment readiness
    overall_health = metrics.get("overall_health_score", 100)
    if overall_health > 85:
        suggestions.append(
            "🚀 `/infra/deployment-strategy` - Plan your next deployment with confidence"
        )

    # Proactive suggestions
    if scope == "all":
        suggestions.extend([
            "💾 `/infra/disaster-recovery test-scenario` - Validate backup and recovery procedures",
            "🔍 `monitor-services detailed` - Set up comprehensive monitoring dashboard",
            "🔐 `rotate-secrets api_keys` - Refresh security credentials proactively"
        ])

    # Tool-specific suggestions
    if len(issues) > 3:
        suggestions.append(
            "📊 `analyze-logs ERROR 24h` - Deep dive into recent error patterns"
        )

    return suggestions[:4]  # Return top 4 suggestions


def _format_system_overview(assessment: Dict) -> str:
    """Format system overview for display."""
    
    services = assessment.get("services", {})
    overview_lines = []

    if "compute" in services:
        compute = services["compute"]
        instances = compute.get("instances", {})
        overview_lines.append(
            f"💻 Compute: {instances.get('running', 0)}/{instances.get('total', 0)} instances running"
        )

    if "storage" in services:
        storage = services["storage"]
        utilization = storage.get("storage_utilization", {})
        overview_lines.append(
            f"💾 Storage: {utilization.get('utilization_percent', 0):.1f}% utilized ({utilization.get('used_capacity_tb', 0):.1f}TB used)"
        )

    if "network" in services:
        network = services["network"]
        bandwidth = network.get("bandwidth_utilization", {})
        overview_lines.append(
            f"🌐 Network: {bandwidth.get('peak_utilization', 0):.1f}% peak utilization"
        )

    if "applications" in services:
        apps = services["applications"]
        app_status = apps.get("applications", {})
        overview_lines.append(
            f"🔧 Applications: {app_status.get('healthy', 0)}/{app_status.get('total', 0)} healthy"
        )

    security = assessment.get("security", {})
    if security:
        vuln = security.get("vulnerability_scanning", {})
        overview_lines.append(
            f"🔒 Security: {vuln.get('high_severity', 0)} high-severity vulnerabilities"
        )

    return "\n".join(overview_lines) if overview_lines else "No systems assessed in current scope"


def _format_health_metrics(assessment: Dict) -> str:
    """Format health metrics for display."""
    
    metrics = assessment.get("metrics", {})
    
    return f"""
Overall Health Score: {metrics.get('overall_health_score', 0)}/100
• Availability: {metrics.get('availability', 0)}/100
• Performance: {metrics.get('performance', 0)}/100  
• Security: {metrics.get('security', 0)}/100
• Reliability: {metrics.get('reliability', 0)}/100"""


def _format_issues(issues: List[Dict]) -> str:
    """Format issues for display."""
    
    if not issues:
        return "✅ No critical issues detected"

    issue_lines = []
    severity_icons = {
        "critical": "🚨",
        "high": "🔥", 
        "medium": "⚠️",
        "warning": "⚠️",
        "info": "ℹ️"
    }

    for issue in issues[:5]:  # Show top 5 issues
        icon = severity_icons.get(issue.get("severity", "info"), "•")
        component = issue.get("component", "unknown")
        message = issue.get("message", "Unknown issue")
        issue_lines.append(f"{icon} [{component.upper()}] {message}")

    if len(issues) > 5:
        issue_lines.append(f"... and {len(issues) - 5} more issues")

    return "\n".join(issue_lines)


def _format_recommendations(recommendations: List[str]) -> str:
    """Format recommendations for display."""
    
    if not recommendations:
        return "✅ No immediate actions required"

    return "\n".join(f"• {rec}" for rec in recommendations)


def _format_next_steps(next_steps: List[str]) -> str:
    """Format next steps for display."""
    
    if not next_steps:
        return "🔍 Run individual monitoring tools or explore other workflows"

    return "\n".join(f"• {step}" for step in next_steps)


def _get_overall_status(assessment: Dict) -> str:
    """Determine overall infrastructure status."""
    
    metrics = assessment.get("metrics", {})
    issues = assessment.get("issues", [])
    overall_score = metrics.get("overall_health_score", 0)

    critical_issues = [i for i in issues if i.get("severity") == "critical"]
    
    if critical_issues:
        return "CRITICAL - Immediate Action Required"
    elif overall_score >= 90:
        return "EXCELLENT"
    elif overall_score >= 80:
        return "GOOD"
    elif overall_score >= 70:
        return "FAIR"
    elif overall_score >= 60:
        return "DEGRADED"
    else:
        return "POOR - Requires Attention"
