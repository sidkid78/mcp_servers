"""
Deployment Strategy Prompt
Guided deployment planning with risk assessment and rollback strategies.
"""

import json
from datetime import datetime, timedelta
from typing import Dict, List


async def deployment_strategy_prompt(application: str, target_env: str = "production") -> str:
    """
    Guided deployment planning with risk assessment and rollback strategies.
    This prompt helps plan safe deployments with comprehensive risk mitigation.
    """

    # Validate environment
    valid_environments = ["dev", "staging", "production"]
    if target_env not in valid_environments:
        target_env = "production"

    # Perform deployment planning
    deployment_plan = await _create_deployment_plan(application, target_env)
    
    # Generate risk assessment
    risk_assessment = await _assess_deployment_risks(deployment_plan)
    
    # Create rollback strategy
    rollback_strategy = await _create_rollback_strategy(deployment_plan)
    
    # Generate deployment recommendations
    recommendations = await _generate_deployment_recommendations(deployment_plan, risk_assessment)

    # Generate comprehensive deployment strategy report
    strategy_report = f"""
🚀 **Deployment Strategy Plan**

**Application:** {application}
**Target Environment:** {target_env.title()}
**Strategy Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}

**📋 Deployment Overview:**
{_format_deployment_overview(deployment_plan)}

**🎯 Recommended Strategy:**
{_format_recommended_strategy(deployment_plan)}

**📊 Risk Assessment:**
{_format_risk_assessment(risk_assessment)}

**🔄 Rollback Strategy:**
{_format_rollback_strategy(rollback_strategy)}

**⚡ Deployment Execution Plan:**
{_format_execution_plan(deployment_plan)}

**🔍 Pre-Deployment Checklist:**
{_format_pre_deployment_checklist(deployment_plan, target_env)}

**📈 Post-Deployment Monitoring:**
{_format_monitoring_plan(deployment_plan, target_env)}

**🎪 Available Tools for Execution:**
• `deploy-application` - Execute the deployment with chosen strategy
• `monitor-services` - Real-time monitoring during deployment
• `scale-resources` - Adjust capacity before/during deployment
• `backup-data` - Create pre-deployment backups
• `analyze-logs` - Monitor deployment logs and issues

**⚡ Recommended Next Steps:**
{_format_next_steps(deployment_plan, target_env)}

**Deployment readiness: {_get_deployment_readiness(risk_assessment)} ✅**
Ready to deploy {application} to {target_env}. Follow the execution plan for best results.
"""

    return strategy_report


async def _create_deployment_plan(application: str, target_env: str) -> Dict:
    """Create a comprehensive deployment plan."""
    
    plan = {
        "application": application,
        "target_environment": target_env,
        "timestamp": datetime.now().isoformat(),
        "deployment_config": {},
        "strategy_recommendation": {},
        "timeline": {},
        "resource_requirements": {},
        "dependencies": []
    }

    # Determine deployment configuration based on environment
    plan["deployment_config"] = await _determine_deployment_config(application, target_env)
    
    # Recommend deployment strategy
    plan["strategy_recommendation"] = await _recommend_deployment_strategy(application, target_env)
    
    # Create deployment timeline
    plan["timeline"] = await _create_deployment_timeline(plan["strategy_recommendation"])
    
    # Assess resource requirements
    plan["resource_requirements"] = await _assess_resource_requirements(application, target_env)
    
    # Identify dependencies
    plan["dependencies"] = await _identify_deployment_dependencies(application, target_env)

    return plan


async def _determine_deployment_config(application: str, target_env: str) -> Dict:
    """Determine deployment configuration based on application and environment."""
    
    # Base configuration varies by environment
    base_configs = {
        "dev": {
            "replicas": 1,
            "resource_allocation": "minimal",
            "monitoring_level": "basic",
            "backup_required": False,
            "approval_required": False
        },
        "staging": {
            "replicas": 2,
            "resource_allocation": "moderate",
            "monitoring_level": "standard",
            "backup_required": True,
            "approval_required": False
        },
        "production": {
            "replicas": 3,
            "resource_allocation": "full",
            "monitoring_level": "comprehensive",
            "backup_required": True,
            "approval_required": True
        }
    }
    
    config = base_configs.get(target_env, base_configs["production"])
    
    # Application-specific adjustments
    if "critical" in application.lower() or "payment" in application.lower():
        config["replicas"] = max(config["replicas"], 3)
        config["backup_required"] = True
        config["monitoring_level"] = "comprehensive"
    
    config.update({
        "health_checks": {
            "enabled": True,
            "initial_delay": 30,
            "interval": 10,
            "timeout": 5,
            "failure_threshold": 3
        },
        "rolling_update": {
            "max_unavailable": "25%",
            "max_surge": "25%"
        },
        "security": {
            "scan_required": target_env == "production",
            "secrets_rotation": target_env in ["staging", "production"],
            "compliance_check": target_env == "production"
        }
    })
    
    return config


async def _recommend_deployment_strategy(application: str, target_env: str) -> Dict:
    """Recommend the best deployment strategy for the application and environment."""
    
    # Analyze application characteristics
    app_characteristics = {
        "is_stateful": "database" in application.lower() or "state" in application.lower(),
        "is_critical": "critical" in application.lower() or "payment" in application.lower() or target_env == "production",
        "has_dependencies": True,  # Assume most apps have dependencies
        "traffic_pattern": "high" if target_env == "production" else "moderate"
    }
    
    # Determine best strategy based on characteristics and environment
    if target_env == "production" and app_characteristics["is_critical"]:
        recommended_strategy = "blue_green"
        rationale = "Blue-green deployment recommended for critical production applications to enable instant rollback"
    elif target_env == "production" and app_characteristics["traffic_pattern"] == "high":
        recommended_strategy = "canary"
        rationale = "Canary deployment recommended for high-traffic production applications to minimize risk"
    elif app_characteristics["is_stateful"]:
        recommended_strategy = "rolling"
        rationale = "Rolling deployment recommended for stateful applications to maintain data consistency"
    elif target_env in ["dev", "staging"]:
        recommended_strategy = "recreate"
        rationale = "Recreate deployment acceptable for non-production environments"
    else:
        recommended_strategy = "rolling"
        rationale = "Rolling deployment provides good balance of safety and simplicity"
    
    # Alternative strategies
    alternatives = []
    for strategy in ["rolling", "blue_green", "canary", "recreate"]:
        if strategy != recommended_strategy:
            alternatives.append({
                "strategy": strategy,
                "pros": _get_strategy_pros(strategy),
                "cons": _get_strategy_cons(strategy),
                "use_case": _get_strategy_use_case(strategy)
            })
    
    return {
        "recommended_strategy": recommended_strategy,
        "rationale": rationale,
        "confidence": "high" if target_env == "production" else "medium",
        "application_characteristics": app_characteristics,
        "alternative_strategies": alternatives,
        "strategy_details": _get_strategy_details(recommended_strategy)
    }


def _get_strategy_pros(strategy: str) -> List[str]:
    """Get pros for a deployment strategy."""
    
    pros_map = {
        "rolling": ["Zero downtime", "Resource efficient", "Simple rollback", "Good for stateful apps"],
        "blue_green": ["Instant rollback", "Full testing environment", "Zero downtime", "Complete isolation"],
        "canary": ["Risk mitigation", "Real user feedback", "Gradual rollout", "Easy monitoring"],
        "recreate": ["Simple implementation", "Clean environment", "Resource efficient", "Fast deployment"]
    }
    
    return pros_map.get(strategy, ["Unknown strategy"])


def _get_strategy_cons(strategy: str) -> List[str]:
    """Get cons for a deployment strategy."""
    
    cons_map = {
        "rolling": ["Slower deployment", "Mixed versions during deploy", "Partial rollback complexity"],
        "blue_green": ["Double resource usage", "Database migration complexity", "Higher cost"],
        "canary": ["Complex configuration", "Longer deployment time", "Monitoring overhead"],
        "recreate": ["Downtime required", "No rollback during deploy", "User impact"]
    }
    
    return cons_map.get(strategy, ["Unknown strategy"])


def _get_strategy_use_case(strategy: str) -> str:
    """Get ideal use case for a deployment strategy."""
    
    use_cases = {
        "rolling": "Standard applications with moderate risk tolerance",
        "blue_green": "Critical applications requiring instant rollback capability",
        "canary": "High-traffic applications where gradual rollout reduces risk",
        "recreate": "Development environments or applications tolerating brief downtime"
    }
    
    return use_cases.get(strategy, "Unknown use case")


def _get_strategy_details(strategy: str) -> Dict:
    """Get detailed configuration for a deployment strategy."""
    
    details_map = {
        "rolling": {
            "max_unavailable": "25%",
            "max_surge": "25%",
            "estimated_duration": "10-15 minutes",
            "rollback_time": "5-10 minutes"
        },
        "blue_green": {
            "traffic_switch": "instant",
            "resource_overhead": "100%",
            "estimated_duration": "15-20 minutes",
            "rollback_time": "instant"
        },
        "canary": {
            "initial_traffic": "10%",
            "increment_steps": "25%, 50%, 75%, 100%",
            "estimated_duration": "30-45 minutes",
            "rollback_time": "2-5 minutes"
        },
        "recreate": {
            "downtime": "2-5 minutes",
            "resource_usage": "minimal",
            "estimated_duration": "5-10 minutes",
            "rollback_time": "5-10 minutes"
        }
    }
    
    return details_map.get(strategy, {"estimated_duration": "unknown"})


async def _create_deployment_timeline(strategy_recommendation: Dict) -> Dict:
    """Create a detailed deployment timeline."""
    
    strategy = strategy_recommendation["recommended_strategy"]
    base_time = datetime.now()
    
    # Define timeline based on strategy
    if strategy == "blue_green":
        timeline = {
            "total_duration_minutes": 25,
            "phases": [
                {"phase": "Pre-deployment checks", "duration_minutes": 5, "start_offset": 0},
                {"phase": "Deploy to green environment", "duration_minutes": 8, "start_offset": 5},
                {"phase": "Health check green environment", "duration_minutes": 5, "start_offset": 13},
                {"phase": "Switch traffic to green", "duration_minutes": 2, "start_offset": 18},
                {"phase": "Post-deployment verification", "duration_minutes": 5, "start_offset": 20}
            ]
        }
    elif strategy == "canary":
        timeline = {
            "total_duration_minutes": 45,
            "phases": [
                {"phase": "Pre-deployment checks", "duration_minutes": 5, "start_offset": 0},
                {"phase": "Deploy canary (10%)", "duration_minutes": 8, "start_offset": 5},
                {"phase": "Monitor canary metrics", "duration_minutes": 10, "start_offset": 13},
                {"phase": "Increase to 50%", "duration_minutes": 5, "start_offset": 23},
                {"phase": "Monitor expanded canary", "duration_minutes": 10, "start_offset": 28},
                {"phase": "Complete rollout (100%)", "duration_minutes": 5, "start_offset": 38},
                {"phase": "Final verification", "duration_minutes": 2, "start_offset": 43}
            ]
        }
    elif strategy == "rolling":
        timeline = {
            "total_duration_minutes": 15,
            "phases": [
                {"phase": "Pre-deployment checks", "duration_minutes": 3, "start_offset": 0},
                {"phase": "Rolling update instances", "duration_minutes": 8, "start_offset": 3},
                {"phase": "Health verification", "duration_minutes": 3, "start_offset": 11},
                {"phase": "Post-deployment checks", "duration_minutes": 1, "start_offset": 14}
            ]
        }
    else:  # recreate
        timeline = {
            "total_duration_minutes": 10,
            "phases": [
                {"phase": "Pre-deployment checks", "duration_minutes": 2, "start_offset": 0},
                {"phase": "Stop current version", "duration_minutes": 2, "start_offset": 2},
                {"phase": "Deploy new version", "duration_minutes": 4, "start_offset": 4},
                {"phase": "Health verification", "duration_minutes": 2, "start_offset": 8}
            ]
        }
    
    # Add timestamps to phases
    for phase in timeline["phases"]:
        phase_start = base_time + timedelta(minutes=phase["start_offset"])
        phase_end = phase_start + timedelta(minutes=phase["duration_minutes"])
        phase["start_time"] = phase_start.strftime("%H:%M")
        phase["end_time"] = phase_end.strftime("%H:%M")
    
    timeline["deployment_window"] = {
        "start": base_time.strftime("%H:%M"),
        "end": (base_time + timedelta(minutes=timeline["total_duration_minutes"])).strftime("%H:%M")
    }
    
    return timeline


async def _assess_resource_requirements(application: str, target_env: str) -> Dict:
    """Assess resource requirements for deployment."""
    
    # Base requirements by environment
    base_requirements = {
        "dev": {"cpu": "0.5 cores", "memory": "512MB", "storage": "2GB"},
        "staging": {"cpu": "1 core", "memory": "1GB", "storage": "5GB"},
        "production": {"cpu": "2 cores", "memory": "2GB", "storage": "10GB"}
    }
    
    requirements = base_requirements.get(target_env, base_requirements["production"])
    
    # Application-specific adjustments
    if "database" in application.lower():
        requirements["memory"] = "4GB" if target_env == "production" else "2GB"
        requirements["storage"] = "50GB" if target_env == "production" else "20GB"
    elif "cache" in application.lower():
        requirements["memory"] = "8GB" if target_env == "production" else "4GB"
    
    # Add deployment-specific requirements
    requirements.update({
        "network_bandwidth": "100Mbps" if target_env == "production" else "50Mbps",
        "deployment_overhead": {
            "blue_green": "100% additional resources during deployment",
            "canary": "20% additional resources during canary phase",
            "rolling": "25% additional resources during rolling update",
            "recreate": "No additional resources required"
        },
        "persistent_storage": "database" in application.lower() or "stateful" in application.lower(),
        "load_balancer": target_env in ["staging", "production"]
    })
    
    return requirements


async def _identify_deployment_dependencies(application: str, target_env: str) -> List[Dict]:
    """Identify deployment dependencies and prerequisites."""
    
    dependencies = [
        {
            "name": "Database migrations",
            "type": "data",
            "required": "database" in application.lower(),
            "description": "Execute any pending database schema changes",
            "estimated_time": "2-5 minutes"
        },
        {
            "name": "Configuration updates",
            "type": "config",
            "required": True,
            "description": "Update application configuration for target environment",
            "estimated_time": "1-2 minutes"
        },
        {
            "name": "External service validation",
            "type": "service",
            "required": target_env == "production",
            "description": "Verify all external service dependencies are available",
            "estimated_time": "1-3 minutes"
        },
        {
            "name": "SSL certificate deployment",
            "type": "security",
            "required": target_env in ["staging", "production"],
            "description": "Deploy and configure SSL certificates",
            "estimated_time": "1-2 minutes"
        },
        {
            "name": "Load balancer configuration",
            "type": "infrastructure",
            "required": target_env in ["staging", "production"],
            "description": "Configure load balancer for new application version",
            "estimated_time": "1-2 minutes"
        },
        {
            "name": "Monitoring setup",
            "type": "observability",
            "required": target_env == "production",
            "description": "Configure monitoring and alerting for the application",
            "estimated_time": "2-3 minutes"
        }
    ]
    
    # Filter to only required dependencies
    required_dependencies = [dep for dep in dependencies if dep["required"]]
    
    return required_dependencies


async def _assess_deployment_risks(deployment_plan: Dict) -> Dict:
    """Assess risks associated with the deployment."""
    
    target_env = deployment_plan["target_environment"]
    strategy = deployment_plan["strategy_recommendation"]["recommended_strategy"]
    dependencies = deployment_plan["dependencies"]
    
    risks = []
    
    # Environment-based risks
    if target_env == "production":
        risks.extend([
            {
                "risk": "Service disruption",
                "probability": "low" if strategy in ["blue_green", "canary"] else "medium",
                "impact": "high",
                "mitigation": "Use zero-downtime deployment strategy with health checks"
            },
            {
                "risk": "Data corruption",
                "probability": "low",
                "impact": "critical",
                "mitigation": "Backup data before deployment and test database migrations"
            },
            {
                "risk": "Performance degradation",
                "probability": "medium",
                "impact": "medium",
                "mitigation": "Monitor performance metrics and have rollback plan ready"
            }
        ])
    
    # Strategy-based risks
    if strategy == "blue_green":
        risks.append({
            "risk": "Resource constraints",
            "probability": "medium",
            "impact": "medium",
            "mitigation": "Ensure sufficient resources for dual environment deployment"
        })
    elif strategy == "canary":
        risks.append({
            "risk": "Partial user impact",
            "probability": "low",
            "impact": "low",
            "mitigation": "Monitor canary metrics closely and rollback if issues detected"
        })
    elif strategy == "recreate":
        risks.append({
            "risk": "Service downtime",
            "probability": "high",
            "impact": "medium" if target_env != "production" else "high",
            "mitigation": "Schedule deployment during maintenance window"
        })
    
    # Dependency-based risks
    if any(dep["type"] == "data" for dep in dependencies):
        risks.append({
            "risk": "Database migration failure",
            "probability": "low",
            "impact": "high",
            "mitigation": "Test migrations in staging and have rollback scripts ready"
        })
    
    # Calculate overall risk score
    risk_scores = {"low": 1, "medium": 2, "high": 3, "critical": 4}
    impact_scores = {"low": 1, "medium": 2, "high": 3, "critical": 4}
    
    total_risk_score = 0
    for risk in risks:
        prob_score = risk_scores.get(risk["probability"], 2)
        impact_score = impact_scores.get(risk["impact"], 2)
        total_risk_score += prob_score * impact_score
    
    # Normalize risk score
    max_possible_score = len(risks) * 16  # max probability (4) * max impact (4)
    overall_risk = "low"
    if max_possible_score > 0:
        risk_percentage = (total_risk_score / max_possible_score) * 100
        if risk_percentage > 70:
            overall_risk = "high"
        elif risk_percentage > 40:
            overall_risk = "medium"
    
    return {
        "overall_risk": overall_risk,
        "risk_score": total_risk_score,
        "risk_percentage": round(risk_percentage, 1) if max_possible_score > 0 else 0,
        "identified_risks": risks,
        "risk_mitigation_summary": _generate_risk_mitigation_summary(risks)
    }


def _generate_risk_mitigation_summary(risks: List[Dict]) -> List[str]:
    """Generate summary of risk mitigation strategies."""
    
    mitigations = []
    
    high_impact_risks = [r for r in risks if r["impact"] in ["high", "critical"]]
    if high_impact_risks:
        mitigations.append("🔒 Backup critical data before deployment starts")
        mitigations.append("🧪 Test all changes thoroughly in staging environment")
    
    high_prob_risks = [r for r in risks if r["probability"] == "high"]
    if high_prob_risks:
        mitigations.append("⏰ Schedule deployment during low-traffic maintenance window")
    
    mitigations.extend([
        "📊 Monitor key metrics throughout deployment process",
        "🔄 Have rollback plan tested and ready to execute",
        "👥 Ensure operations team is available during deployment",
        "📞 Establish communication channels for incident response"
    ])
    
    return mitigations


async def _create_rollback_strategy(deployment_plan: Dict) -> Dict:
    """Create comprehensive rollback strategy."""
    
    strategy = deployment_plan["strategy_recommendation"]["recommended_strategy"]
    target_env = deployment_plan["target_environment"]
    
    rollback_strategy = {
        "rollback_capability": _get_rollback_capability(strategy),
        "rollback_triggers": _define_rollback_triggers(target_env),
        "rollback_procedures": _define_rollback_procedures(strategy),
        "rollback_timeline": _estimate_rollback_timeline(strategy),
        "data_considerations": _assess_data_rollback_considerations(deployment_plan)
    }
    
    return rollback_strategy


def _get_rollback_capability(strategy: str) -> Dict:
    """Get rollback capability for deployment strategy."""
    
    capabilities = {
        "blue_green": {
            "rollback_speed": "instant",
            "rollback_complexity": "low",
            "data_safety": "high",
            "automatic_rollback": "supported"
        },
        "canary": {
            "rollback_speed": "fast",
            "rollback_complexity": "low",
            "data_safety": "high",
            "automatic_rollback": "supported"
        },
        "rolling": {
            "rollback_speed": "moderate",
            "rollback_complexity": "medium",
            "data_safety": "medium",
            "automatic_rollback": "limited"
        },
        "recreate": {
            "rollback_speed": "moderate",
            "rollback_complexity": "medium",
            "data_safety": "medium",
            "automatic_rollback": "manual"
        }
    }
    
    return capabilities.get(strategy, capabilities["rolling"])


def _define_rollback_triggers(target_env: str) -> List[Dict]:
    """Define conditions that should trigger a rollback."""
    
    triggers = [
        {
            "trigger": "Health check failure",
            "threshold": "3 consecutive failures",
            "automatic": True,
            "severity": "high"
        },
        {
            "trigger": "Error rate spike",
            "threshold": ">5% error rate for 2 minutes",
            "automatic": target_env == "production",
            "severity": "high"
        },
        {
            "trigger": "Response time degradation",
            "threshold": ">50% increase in average response time",
            "automatic": False,
            "severity": "medium"
        },
        {
            "trigger": "Critical business function failure",
            "threshold": "Any critical path failure",
            "automatic": False,
            "severity": "critical"
        }
    ]
    
    if target_env == "production":
        triggers.append({
            "trigger": "User complaints",
            "threshold": ">10 support tickets in 5 minutes",
            "automatic": False,
            "severity": "medium"
        })
    
    return triggers


def _define_rollback_procedures(strategy: str) -> Dict:
    """Define step-by-step rollback procedures."""
    
    procedures = {
        "blue_green": {
            "steps": [
                "Switch load balancer back to blue environment",
                "Verify blue environment health",
                "Monitor for 5 minutes to confirm stability",
                "Document rollback reason and timeline"
            ],
            "estimated_time": "2-3 minutes",
            "automation_level": "high"
        },
        "canary": {
            "steps": [
                "Immediately stop traffic to canary instances",
                "Route all traffic back to stable version",
                "Terminate canary instances",
                "Verify system stability",
                "Document rollback details"
            ],
            "estimated_time": "3-5 minutes",
            "automation_level": "high"
        },
        "rolling": {
            "steps": [
                "Pause rolling update process",
                "Scale down new version instances",
                "Scale up previous version instances",
                "Update load balancer configuration",
                "Verify service health and performance"
            ],
            "estimated_time": "5-8 minutes",
            "automation_level": "medium"
        },
        "recreate": {
            "steps": [
                "Stop current application instances",
                "Deploy previous version from backup",
                "Start application with previous configuration",
                "Verify functionality and health",
                "Restore any necessary data from backup"
            ],
            "estimated_time": "8-12 minutes",
            "automation_level": "low"
        }
    }
    
    return procedures.get(strategy, procedures["rolling"])


def _estimate_rollback_timeline(strategy: str) -> Dict:
    """Estimate rollback timeline based on strategy."""
    
    timelines = {
        "blue_green": {
            "detection_time": "1-2 minutes",
            "decision_time": "1-2 minutes",
            "execution_time": "1-2 minutes",
            "verification_time": "2-3 minutes",
            "total_time": "5-9 minutes"
        },
        "canary": {
            "detection_time": "1-3 minutes",
            "decision_time": "1-2 minutes",
            "execution_time": "2-3 minutes",
            "verification_time": "2-3 minutes",
            "total_time": "6-11 minutes"
        },
        "rolling": {
            "detection_time": "2-5 minutes",
            "decision_time": "1-3 minutes",
            "execution_time": "5-8 minutes",
            "verification_time": "3-5 minutes",
            "total_time": "11-21 minutes"
        },
        "recreate": {
            "detection_time": "2-5 minutes",
            "decision_time": "1-3 minutes",
            "execution_time": "8-12 minutes",
            "verification_time": "3-5 minutes",
            "total_time": "14-25 minutes"
        }
    }
    
    return timelines.get(strategy, timelines["rolling"])


def _assess_data_rollback_considerations(deployment_plan: Dict) -> Dict:
    """Assess data-related rollback considerations."""
    
    application = deployment_plan["application"]
    has_database = "database" in application.lower()
    has_state = "stateful" in application.lower() or has_database
    
    considerations = {
        "data_compatibility": "forward_compatible" if not has_state else "requires_analysis",
        "backup_required": has_state,
        "migration_rollback": has_database,
        "data_loss_risk": "low" if not has_state else "medium",
        "recommendations": []
    }
    
    if has_database:
        considerations["recommendations"].extend([
            "Create database backup before deployment",
            "Test database migration rollback procedures",
            "Ensure rollback scripts are tested and ready"
        ])
    
    if has_state:
        considerations["recommendations"].extend([
            "Document data compatibility requirements",
            "Plan for potential data loss scenarios",
            "Consider point-in-time recovery options"
        ])
    
    return considerations


async def _generate_deployment_recommendations(
    deployment_plan: Dict, 
    risk_assessment: Dict
) -> List[str]:
    """Generate deployment recommendations based on plan and risk assessment."""
    
    recommendations = []
    target_env = deployment_plan["target_environment"]
    strategy = deployment_plan["strategy_recommendation"]["recommended_strategy"]
    overall_risk = risk_assessment["overall_risk"]
    
    # Risk-based recommendations
    if overall_risk == "high":
        recommendations.extend([
            "🚨 High risk deployment - consider additional testing in staging",
            "👥 Ensure senior team members are available during deployment",
            "📅 Schedule deployment during maintenance window with minimal traffic"
        ])
    elif overall_risk == "medium":
        recommendations.extend([
            "⚠️ Medium risk deployment - monitor closely during execution",
            "🔄 Have rollback plan tested and ready"
        ])
    
    # Strategy-specific recommendations
    if strategy == "blue_green":
        recommendations.append("💰 Ensure sufficient resources for dual environment deployment")
    elif strategy == "canary":
        recommendations.append("📊 Set up detailed monitoring for canary metrics analysis")
    elif strategy == "recreate" and target_env == "production":
        recommendations.append("⏰ Notify users about planned maintenance window")
    
    # Environment-specific recommendations
    if target_env == "production":
        recommendations.extend([
            "🔒 Complete security scan and compliance check",
            "📋 Verify change management approval is in place",
            "📞 Notify stakeholders about deployment schedule"
        ])
    
    # General best practices
    recommendations.extend([
        "🧪 Verify all tests pass in staging environment",
        "💾 Create backup of current production state",
        "📊 Prepare monitoring dashboards for deployment tracking",
        "📚 Review and update deployment documentation"
    ])
    
    return recommendations


def _format_deployment_overview(deployment_plan: Dict) -> str:
    """Format deployment overview section."""
    
    config = deployment_plan["deployment_config"]
    strategy = deployment_plan["strategy_recommendation"]
    
    return f"""Application: {deployment_plan['application']}
Target Environment: {deployment_plan['target_environment'].title()}
Recommended Strategy: {strategy['recommended_strategy'].replace('_', '-').title()}
Estimated Duration: {deployment_plan['timeline']['total_duration_minutes']} minutes
Resource Requirements: {config['replicas']} replicas, {config['resource_allocation']} resources
Health Checks: {'Enabled' if config['health_checks']['enabled'] else 'Disabled'}"""


def _format_recommended_strategy(deployment_plan: Dict) -> str:
    """Format recommended strategy section."""
    
    strategy = deployment_plan["strategy_recommendation"]
    details = strategy["strategy_details"]
    
    strategy_name = strategy["recommended_strategy"].replace('_', '-').title()
    rationale = strategy["rationale"]
    
    strategy_info = f"""**{strategy_name} Deployment**
Rationale: {rationale}
Confidence Level: {strategy["confidence"].title()}

**Strategy Details:**
• Estimated Duration: {details.get('estimated_duration', 'Unknown')}
• Rollback Time: {details.get('rollback_time', 'Unknown')}"""

    if 'resource_overhead' in details:
        strategy_info += f"\n• Resource Overhead: {details['resource_overhead']}"
    if 'traffic_switch' in details:
        strategy_info += f"\n• Traffic Switch: {details['traffic_switch']}"
    
    return strategy_info


def _format_risk_assessment(risk_assessment: Dict) -> str:
    """Format risk assessment section."""
    
    overall_risk = risk_assessment["overall_risk"].title()
    risk_score = risk_assessment["risk_score"]
    risks = risk_assessment["identified_risks"]
    
    risk_info = f"""Overall Risk Level: {overall_risk}
Risk Score: {risk_score} ({risk_assessment['risk_percentage']}%)

**Key Risks Identified:**"""
    
    for risk in risks[:5]:  # Show top 5 risks
        impact_icon = {"low": "🟢", "medium": "🟡", "high": "🔴", "critical": "🚨"}.get(risk["impact"], "⚪")
        risk_info += f"\n{impact_icon} {risk['risk']}: {risk['probability']} probability, {risk['impact']} impact"
    
    return risk_info


def _format_rollback_strategy(rollback_strategy: Dict) -> str:
    """Format rollback strategy section."""
    
    capability = rollback_strategy["rollback_capability"]
    procedures = rollback_strategy["rollback_procedures"]
    timeline = rollback_strategy["rollback_timeline"]
    
    return f"""**Rollback Capability:**
• Speed: {capability['rollback_speed'].title()}
• Complexity: {capability['rollback_complexity'].title()}
• Automatic Rollback: {capability['automatic_rollback'].title()}

**Rollback Timeline:**
• Total Time: {timeline['total_time']}
• Execution: {timeline['execution_time']}

**Key Triggers:**
• Health check failures (automatic)
• Error rate spikes (>5%)
• Performance degradation (>50% response time increase)"""


def _format_execution_plan(deployment_plan: Dict) -> str:
    """Format execution plan section."""
    
    timeline = deployment_plan["timeline"]
    dependencies = deployment_plan["dependencies"]
    
    plan_info = f"""**Deployment Timeline ({timeline['total_duration_minutes']} minutes):**"""
    
    for phase in timeline["phases"]:
        plan_info += f"\n{phase['start_time']}-{phase['end_time']}: {phase['phase']} ({phase['duration_minutes']}min)"
    
    if dependencies:
        plan_info += "\n\n**Dependencies to Address:**"
        for dep in dependencies:
            plan_info += f"\n• {dep['name']}: {dep['description']} ({dep['estimated_time']})"
    
    return plan_info


def _format_pre_deployment_checklist(deployment_plan: Dict, target_env: str) -> str:
    """Format pre-deployment checklist."""
    
    checklist_items = [
        "✅ Code review and approval completed",
        "✅ All tests passing in staging environment",
        "✅ Security scan completed (if required)",
        "✅ Database migration scripts tested",
        "✅ Rollback procedures tested and documented",
        "✅ Monitoring and alerting configured",
        "✅ Team availability confirmed for deployment window"
    ]
    
    if target_env == "production":
        checklist_items.extend([
            "✅ Change management approval obtained",
            "✅ Stakeholder notifications sent",
            "✅ Backup verification completed"
        ])
    
    return "\n".join(checklist_items)


def _format_monitoring_plan(deployment_plan: Dict, target_env: str) -> str:
    """Format post-deployment monitoring plan."""
    
    monitoring_duration = "30 minutes" if target_env == "production" else "15 minutes"
    
    return f"""**Monitoring Duration:** {monitoring_duration}

**Key Metrics to Monitor:**
• Application health and readiness endpoints
• Response time and throughput
• Error rate and success rate
• Resource utilization (CPU, memory)
• Database connection pool status
• External dependency health

**Alert Thresholds:**
• Error rate >2% for production, >5% for staging
• Response time >500ms average
• Health check failures >3 consecutive"""


def _format_next_steps(deployment_plan: Dict, target_env: str) -> str:
    """Format recommended next steps."""
    
    strategy = deployment_plan["strategy_recommendation"]["recommended_strategy"]
    
    next_steps = [
        f"1. 🔍 Run `monitor-services detailed` to check current system health",
        f"2. 💾 Execute `backup-data {deployment_plan['application']}` for safety",
        f"3. 🚀 Deploy using `deploy-application {deployment_plan['application']} {target_env} {strategy}`",
        f"4. 📊 Monitor with `monitor-services` during deployment",
        f"5. 🔍 Analyze deployment logs with `analyze-logs application 30m`"
    ]
    
    if target_env == "production":
        next_steps.insert(1, "1.5. 🔐 Run `rotate-secrets` if credentials need updating")
    
    return "\n".join(next_steps)


def _get_deployment_readiness(risk_assessment: Dict) -> str:
    """Determine deployment readiness status."""
    
    overall_risk = risk_assessment["overall_risk"]
    
    if overall_risk == "low":
        return "READY"
    elif overall_risk == "medium":
        return "READY WITH CAUTION"
    else:
        return "REVIEW REQUIRED"
