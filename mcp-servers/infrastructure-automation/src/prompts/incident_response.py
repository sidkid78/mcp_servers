"""
Incident Response Prompt
Automated incident management and response workflows.
"""

import json
from datetime import datetime, timedelta
from typing import Dict, List


async def incident_response_prompt(incident_type: str, severity: str = "medium") -> str:
    """
    Automated incident management and response workflows.
    This prompt provides structured incident response procedures and automation.
    """

    # Validate inputs
    valid_incident_types = [
        "performance", "outage", "security", "data_loss", "capacity", 
        "network", "database", "application", "infrastructure", "custom"
    ]
    valid_severities = ["low", "medium", "high", "critical"]
    
    if incident_type not in valid_incident_types:
        incident_type = "performance"
    
    if severity not in valid_severities:
        severity = "medium"

    # Initialize incident response
    incident_data = await _initialize_incident_response(incident_type, severity)
    
    # Perform incident assessment
    assessment = await _perform_incident_assessment(incident_data)
    
    # Generate response plan
    response_plan = await _generate_response_plan(incident_data, assessment)
    
    # Create communication strategy
    communication_plan = await _create_communication_strategy(incident_data)
    
    # Prepare recovery procedures
    recovery_procedures = await _prepare_recovery_procedures(incident_data, assessment)

    # Generate comprehensive incident response report
    response_report = f"""
🚨 **Incident Response Activation**

**Incident Type:** {incident_type.title()}
**Severity Level:** {severity.upper()}
**Response Initiated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}
**Incident ID:** {incident_data['incident_id']}

**🔍 Incident Assessment:**
{_format_incident_assessment(assessment)}

**📋 Response Plan:**
{_format_response_plan(response_plan)}

**📞 Communication Strategy:**
{_format_communication_plan(communication_plan)}

**🔧 Recovery Procedures:**
{_format_recovery_procedures(recovery_procedures)}

**📊 Incident Timeline:**
{_format_incident_timeline(response_plan)}

**🎯 Immediate Actions Required:**
{_format_immediate_actions(response_plan, severity)}

**🔍 Investigation Checklist:**
{_format_investigation_checklist(incident_type, assessment)}

**📈 Monitoring & Metrics:**
{_format_monitoring_strategy(incident_data, assessment)}

**🎪 Available Tools for Response:**
• `monitor-services` - Real-time system health monitoring
• `analyze-logs` - Investigate incident patterns and root causes
• `scale-resources` - Address capacity-related incidents
• `backup-data` - Data protection and recovery operations
• `deploy-application` - Deploy fixes or rollback changes

**⚡ Recommended Response Actions:**
{_format_response_actions(incident_type, severity)}

**📋 Post-Incident Requirements:**
{_format_post_incident_tasks(incident_data)}

**Incident Status: {_get_incident_status(severity)} - Response Plan Activated**
All response procedures are ready for execution. Follow the timeline for optimal incident resolution.
"""

    return response_report


async def _initialize_incident_response(incident_type: str, severity: str) -> Dict:
    """Initialize incident response with basic metadata and classification."""
    
    incident_id = f"INC-{datetime.now().strftime('%Y%m%d-%H%M%S')}"
    
    incident_data = {
        "incident_id": incident_id,
        "incident_type": incident_type,
        "severity": severity,
        "start_time": datetime.now().isoformat(),
        "classification": await _classify_incident(incident_type, severity),
        "escalation_level": _determine_escalation_level(severity),
        "response_team": await _assemble_response_team(incident_type, severity),
        "sla_targets": await _get_sla_targets(severity),
        "initial_impact": await _assess_initial_impact(incident_type, severity)
    }
    
    return incident_data


async def _classify_incident(incident_type: str, severity: str) -> Dict:
    """Classify the incident for appropriate response procedures."""
    
    classification = {
        "category": incident_type,
        "severity": severity,
        "urgency": _calculate_urgency(incident_type, severity),
        "business_impact": _assess_business_impact(incident_type, severity),
        "technical_complexity": _assess_technical_complexity(incident_type),
        "resource_requirements": _estimate_resource_requirements(incident_type, severity)
    }
    
    return classification


def _determine_escalation_level(severity: str) -> int:
    """Determine escalation level based on severity."""
    
    escalation_map = {
        "low": 1,
        "medium": 2,
        "high": 3,
        "critical": 4
    }
    
    return escalation_map.get(severity, 2)


def _calculate_urgency(incident_type: str, severity: str) -> str:
    """Calculate incident urgency based on type and severity."""
    
    high_urgency_types = ["outage", "security", "data_loss"]
    
    if severity == "critical":
        return "critical"
    elif severity == "high" or incident_type in high_urgency_types:
        return "high"
    elif severity == "medium":
        return "medium"
    else:
        return "low"


def _assess_business_impact(incident_type: str, severity: str) -> str:
    """Assess business impact of the incident."""
    
    business_critical_types = ["outage", "security", "data_loss", "performance"]
    
    if severity == "critical":
        return "severe"
    elif incident_type in business_critical_types and severity in ["high", "medium"]:
        return "significant"
    elif severity == "high":
        return "moderate"
    else:
        return "minimal"


def _assess_technical_complexity(incident_type: str) -> str:
    """Assess technical complexity of resolving the incident."""
    
    complex_types = ["security", "data_loss", "network", "database"]
    moderate_types = ["performance", "capacity", "infrastructure"]
    
    if incident_type in complex_types:
        return "high"
    elif incident_type in moderate_types:
        return "medium"
    else:
        return "low"


def _estimate_resource_requirements(incident_type: str, severity: str) -> Dict:
    """Estimate resource requirements for incident response."""
    
    base_requirements = {
        "team_size": 2,
        "specialist_needed": False,
        "external_vendor": False,
        "estimated_hours": 4
    }
    
    if severity == "critical":
        base_requirements.update({
            "team_size": 6,
            "specialist_needed": True,
            "external_vendor": incident_type in ["security", "data_loss"],
            "estimated_hours": 12
        })
    elif severity == "high":
        base_requirements.update({
            "team_size": 4,
            "specialist_needed": incident_type in ["security", "database"],
            "estimated_hours": 8
        })
    elif incident_type in ["security", "data_loss"]:
        base_requirements.update({
            "specialist_needed": True,
            "estimated_hours": 6
        })
    
    return base_requirements


async def _assemble_response_team(incident_type: str, severity: str) -> Dict:
    """Assemble appropriate response team based on incident characteristics."""
    
    team = {
        "incident_commander": "senior_engineer",
        "primary_responders": [],
        "specialists": [],
        "stakeholders": [],
        "escalation_contacts": []
    }
    
    # Base team always includes
    team["primary_responders"] = ["operations_engineer", "platform_engineer"]
    
    # Add specialists based on incident type
    if incident_type == "security":
        team["specialists"].extend(["security_engineer", "compliance_officer"])
    elif incident_type == "database":
        team["specialists"].append("database_administrator")
    elif incident_type == "network":
        team["specialists"].append("network_engineer")
    elif incident_type == "performance":
        team["specialists"].append("performance_engineer")
    
    # Add stakeholders based on severity
    if severity in ["critical", "high"]:
        team["stakeholders"].extend(["engineering_manager", "product_manager"])
    
    if severity == "critical":
        team["stakeholders"].extend(["director_engineering", "customer_success"])
        team["escalation_contacts"].extend(["cto", "ceo"])
    
    # Assign incident commander based on severity
    if severity == "critical":
        team["incident_commander"] = "engineering_manager"
    elif severity == "high":
        team["incident_commander"] = "senior_engineer"
    
    return team


async def _get_sla_targets(severity: str) -> Dict:
    """Get SLA targets based on incident severity."""
    
    sla_targets = {
        "critical": {
            "response_time_minutes": 15,
            "acknowledgment_time_minutes": 5,
            "resolution_time_hours": 4,
            "communication_frequency_minutes": 30
        },
        "high": {
            "response_time_minutes": 30,
            "acknowledgment_time_minutes": 15,
            "resolution_time_hours": 8,
            "communication_frequency_minutes": 60
        },
        "medium": {
            "response_time_minutes": 60,
            "acknowledgment_time_minutes": 30,
            "resolution_time_hours": 24,
            "communication_frequency_minutes": 120
        },
        "low": {
            "response_time_minutes": 240,
            "acknowledgment_time_minutes": 120,
            "resolution_time_hours": 72,
            "communication_frequency_minutes": 480
        }
    }
    
    return sla_targets.get(severity, sla_targets["medium"])


async def _assess_initial_impact(incident_type: str, severity: str) -> Dict:
    """Assess initial impact of the incident."""
    
    from random import randint, uniform, choice
    
    # Simulate realistic impact assessment
    impact = {
        "users_affected": 0,
        "services_impacted": [],
        "performance_degradation": 0,
        "revenue_impact_hourly": 0,
        "reputation_risk": "low"
    }
    
    # Calculate impact based on severity
    if severity == "critical":
        impact.update({
            "users_affected": randint(10000, 100000),
            "services_impacted": ["primary_application", "user_authentication", "payment_processing"],
            "performance_degradation": randint(50, 100),
            "revenue_impact_hourly": randint(50000, 500000),
            "reputation_risk": "high"
        })
    elif severity == "high":
        impact.update({
            "users_affected": randint(1000, 10000),
            "services_impacted": ["secondary_services", "reporting_system"],
            "performance_degradation": randint(25, 50),
            "revenue_impact_hourly": randint(5000, 50000),
            "reputation_risk": "medium"
        })
    elif severity == "medium":
        impact.update({
            "users_affected": randint(100, 1000),
            "services_impacted": ["non_critical_features"],
            "performance_degradation": randint(10, 25),
            "revenue_impact_hourly": randint(500, 5000),
            "reputation_risk": "low"
        })
    else:  # low
        impact.update({
            "users_affected": randint(0, 100),
            "services_impacted": ["internal_tools"],
            "performance_degradation": randint(0, 10),
            "revenue_impact_hourly": randint(0, 500),
            "reputation_risk": "minimal"
        })
    
    # Adjust impact based on incident type
    if incident_type == "outage":
        impact["users_affected"] = int(impact["users_affected"] * 1.5)
        impact["revenue_impact_hourly"] = int(impact["revenue_impact_hourly"] * 2)
    elif incident_type == "security":
        impact["reputation_risk"] = "high" if severity in ["critical", "high"] else "medium"
    elif incident_type == "performance":
        impact["performance_degradation"] = min(100, int(impact["performance_degradation"] * 1.3))
    
    return impact


async def _perform_incident_assessment(incident_data: Dict) -> Dict:
    """Perform comprehensive incident assessment."""
    
    assessment = {
        "current_status": await _assess_current_system_status(incident_data),
        "root_cause_analysis": await _initial_root_cause_analysis(incident_data),
        "affected_components": await _identify_affected_components(incident_data),
        "dependencies": await _analyze_system_dependencies(incident_data),
        "risk_factors": await _identify_risk_factors(incident_data),
        "containment_options": await _evaluate_containment_options(incident_data)
    }
    
    return assessment


async def _assess_current_system_status(incident_data: Dict) -> Dict:
    """Assess current system status during incident."""
    
    from random import uniform, randint, choice
    
    # Simulate system status assessment
    status = {
        "overall_health": choice(["degraded", "impaired", "critical", "failing"]),
        "service_availability": {
            "web_frontend": uniform(60, 95) if incident_data["severity"] != "critical" else uniform(0, 60),
            "api_services": uniform(70, 98) if incident_data["severity"] != "critical" else uniform(20, 70),
            "database": uniform(80, 99) if incident_data["incident_type"] != "database" else uniform(30, 80),
            "cache_layer": uniform(85, 99),
            "monitoring": uniform(90, 99)
        },
        "performance_metrics": {
            "response_time_p95": uniform(200, 2000),
            "error_rate_percent": uniform(1, 20),
            "throughput_rps": randint(100, 1000),
            "cpu_utilization": uniform(50, 95),
            "memory_utilization": uniform(60, 90)
        },
        "active_alerts": randint(5, 25),
        "system_load": choice(["normal", "elevated", "high", "critical"])
    }
    
    return status


async def _initial_root_cause_analysis(incident_data: Dict) -> Dict:
    """Perform initial root cause analysis."""
    
    incident_type = incident_data["incident_type"]
    severity = incident_data["severity"]
    
    # Define potential root causes by incident type
    root_cause_patterns = {
        "performance": [
            "Database query optimization needed",
            "Memory leak in application code",
            "Insufficient server capacity",
            "Network latency issues",
            "Cache invalidation problems"
        ],
        "outage": [
            "Infrastructure component failure",
            "Deployment rollback required",
            "Third-party service dependency",
            "DNS resolution issues",
            "Load balancer misconfiguration"
        ],
        "security": [
            "Unauthorized access attempt",
            "DDoS attack in progress",
            "Malware detection",
            "Data breach suspected",
            "Authentication system compromise"
        ],
        "database": [
            "Connection pool exhaustion",
            "Disk space shortage",
            "Query deadlock situation",
            "Replication lag issues",
            "Index corruption detected"
        ],
        "capacity": [
            "Resource utilization exceeded",
            "Auto-scaling limits reached",
            "Storage capacity exhausted",
            "Network bandwidth saturated",
            "Connection limits exceeded"
        ]
    }
    
    potential_causes = root_cause_patterns.get(incident_type, [
        "System configuration issue",
        "Resource contention",
        "External dependency failure"
    ])
    
    analysis = {
        "incident_type": incident_type,
        "potential_root_causes": potential_causes[:3],  # Top 3 likely causes
        "investigation_priority": [
            "Check recent deployments and changes",
            "Review system logs and metrics",
            "Verify external dependencies",
            "Analyze resource utilization patterns"
        ],
        "evidence_required": [
            "System logs from past 2 hours",
            "Performance metrics trending",
            "Recent deployment history",
            "External service status"
        ],
        "confidence_level": "preliminary"
    }
    
    return analysis


async def _identify_affected_components(incident_data: Dict) -> Dict:
    """Identify system components affected by the incident."""
    
    incident_type = incident_data["incident_type"]
    severity = incident_data["severity"]
    
    from random import choice, sample
    
    all_components = [
        "web_frontend", "api_gateway", "user_service", "payment_service",
        "notification_service", "database_primary", "database_replica",
        "cache_cluster", "load_balancer", "cdn", "monitoring_system",
        "logging_system", "authentication_service", "file_storage"
    ]
    
    # Determine affected components based on incident type
    if incident_type == "outage":
        affected_count = len(all_components) if severity == "critical" else len(all_components) // 2
        affected_components = sample(all_components, min(affected_count, len(all_components)))
    elif incident_type == "database":
        affected_components = ["database_primary", "database_replica", "api_gateway", "user_service"]
    elif incident_type == "performance":
        affected_components = sample(all_components, min(6, len(all_components)))
    elif incident_type == "security":
        affected_components = ["authentication_service", "api_gateway", "user_service"]
    else:
        affected_components = sample(all_components, min(4, len(all_components)))
    
    # Determine impact level for each component
    component_analysis = {}
    for component in affected_components:
        impact_level = choice(["minor", "moderate", "major", "critical"])
        if severity == "critical":
            impact_level = choice(["major", "critical"])
        elif severity == "low":
            impact_level = choice(["minor", "moderate"])
        
        component_analysis[component] = {
            "impact_level": impact_level,
            "status": choice(["degraded", "unavailable", "intermittent"]),
            "recovery_priority": "high" if impact_level in ["major", "critical"] else "medium"
        }
    
    return {
        "total_affected": len(affected_components),
        "component_details": component_analysis,
        "critical_path_impact": len([c for c in component_analysis.values() if c["recovery_priority"] == "high"]) > 0
    }


async def _analyze_system_dependencies(incident_data: Dict) -> Dict:
    """Analyze system dependencies that might be impacted."""
    
    dependencies = {
        "internal_services": [
            {"service": "user_authentication", "status": "healthy", "criticality": "high"},
            {"service": "payment_processing", "status": "degraded", "criticality": "high"},
            {"service": "notification_system", "status": "healthy", "criticality": "medium"},
            {"service": "reporting_service", "status": "healthy", "criticality": "low"}
        ],
        "external_services": [
            {"service": "payment_gateway", "status": "healthy", "criticality": "high"},
            {"service": "email_provider", "status": "healthy", "criticality": "medium"},
            {"service": "analytics_service", "status": "unknown", "criticality": "low"},
            {"service": "cdn_provider", "status": "healthy", "criticality": "medium"}
        ],
        "infrastructure": [
            {"component": "database_cluster", "status": "degraded", "criticality": "high"},
            {"component": "cache_cluster", "status": "healthy", "criticality": "high"},
            {"component": "load_balancers", "status": "healthy", "criticality": "high"},
            {"component": "monitoring_stack", "status": "healthy", "criticality": "medium"}
        ],
        "dependency_risks": [
            "Cascade failure risk if database degradation worsens",
            "Payment processing dependency on external gateway",
            "Single point of failure in authentication service"
        ]
    }
    
    return dependencies


async def _identify_risk_factors(incident_data: Dict) -> List[Dict]:
    """Identify risk factors that could worsen the incident."""
    
    severity = incident_data["severity"]
    incident_type = incident_data["incident_type"]
    
    risk_factors = []
    
    # Common risk factors
    risk_factors.extend([
        {
            "risk": "Incident escalation",
            "probability": "medium" if severity != "critical" else "high",
            "impact": "high",
            "mitigation": "Follow escalation procedures and maintain communication"
        },
        {
            "risk": "User frustration and churn",
            "probability": "high" if severity in ["critical", "high"] else "medium",
            "impact": "medium",
            "mitigation": "Proactive user communication and status updates"
        },
        {
            "risk": "Revenue loss",
            "probability": "high" if incident_type in ["outage", "payment"] else "medium",
            "impact": "high",
            "mitigation": "Rapid resolution and customer compensation if needed"
        }
    ])
    
    # Incident-type specific risks
    if incident_type == "security":
        risk_factors.extend([
            {
                "risk": "Data breach",
                "probability": "medium",
                "impact": "critical",
                "mitigation": "Immediate security containment and forensic analysis"
            },
            {
                "risk": "Regulatory compliance violation",
                "probability": "medium",
                "impact": "high",
                "mitigation": "Document all actions and notify compliance team"
            }
        ])
    elif incident_type == "database":
        risk_factors.append({
            "risk": "Data corruption",
            "probability": "low",
            "impact": "critical",
            "mitigation": "Immediate backup verification and read-only mode if needed"
        })
    elif incident_type == "performance":
        risk_factors.append({
            "risk": "System overload",
            "probability": "medium",
            "impact": "high",
            "mitigation": "Load shedding and traffic throttling"
        })
    
    return risk_factors


async def _evaluate_containment_options(incident_data: Dict) -> Dict:
    """Evaluate incident containment options."""
    
    incident_type = incident_data["incident_type"]
    severity = incident_data["severity"]
    
    containment = {
        "immediate_options": [],
        "short_term_options": [],
        "recovery_options": [],
        "recommended_approach": ""
    }
    
    # Immediate containment options
    if incident_type == "security":
        containment["immediate_options"].extend([
            "Isolate affected systems",
            "Block suspicious IP addresses",
            "Disable compromised accounts",
            "Enable additional monitoring"
        ])
    elif incident_type == "outage":
        containment["immediate_options"].extend([
            "Activate failover systems",
            "Route traffic to healthy instances",
            "Enable maintenance mode",
            "Scale up healthy resources"
        ])
    elif incident_type == "performance":
        containment["immediate_options"].extend([
            "Enable load shedding",
            "Scale up resources",
            "Restart affected services",
            "Clear cache if needed"
        ])
    elif incident_type == "database":
        containment["immediate_options"].extend([
            "Switch to read replicas",
            "Reduce connection pool size",
            "Kill long-running queries",
            "Enable read-only mode"
        ])
    
    # Short-term options
    containment["short_term_options"].extend([
        "Deploy temporary fixes",
        "Implement workarounds",
        "Increase monitoring frequency",
        "Prepare rollback procedures"
    ])
    
    # Recovery options
    containment["recovery_options"].extend([
        "Full system restart",
        "Rollback to previous version",
        "Apply permanent fixes",
        "Gradual service restoration"
    ])
    
    # Recommended approach based on severity
    if severity == "critical":
        containment["recommended_approach"] = "Immediate containment with parallel investigation"
    elif severity == "high":
        containment["recommended_approach"] = "Quick containment followed by rapid resolution"
    else:
        containment["recommended_approach"] = "Controlled investigation with staged resolution"
    
    return containment


async def _generate_response_plan(incident_data: Dict, assessment: Dict) -> Dict:
    """Generate comprehensive incident response plan."""
    
    severity = incident_data["severity"]
    
    response_plan = {
        "phases": await _create_response_phases(incident_data, assessment),
        "resource_allocation": await _plan_resource_allocation(incident_data),
        "decision_points": await _identify_decision_points(incident_data),
        "success_criteria": await _define_success_criteria(incident_data),
        "contingency_plans": await _create_contingency_plans(incident_data)
    }
    
    return response_plan


async def _create_response_phases(incident_data: Dict, assessment: Dict) -> List[Dict]:
    """Create detailed response phases."""
    
    phases = []
    
    # Phase 1: Immediate Response (0-15 minutes)
    phases.append({
        "phase": "immediate_response",
        "duration_minutes": 15,
        "start_time": datetime.now().isoformat(),
        "objectives": [
            "Assess incident scope and impact",
            "Activate response team",
            "Begin initial containment",
            "Establish communication channels"
        ],
        "activities": [
            "Acknowledge incident and assign incident commander",
            "Gather initial assessment data",
            "Notify response team members",
            "Implement immediate containment measures",
            "Set up incident communication channels"
        ],
        "deliverables": [
            "Incident classification confirmed",
            "Response team assembled",
            "Initial containment activated",
            "Stakeholder notifications sent"
        ]
    })
    
    # Phase 2: Investigation & Diagnosis (15-60 minutes)
    phases.append({
        "phase": "investigation_diagnosis",
        "duration_minutes": 45,
        "start_time": (datetime.now() + timedelta(minutes=15)).isoformat(),
        "objectives": [
            "Identify root cause",
            "Assess full impact",
            "Develop resolution strategy",
            "Implement additional containment"
        ],
        "activities": [
            "Analyze logs and system metrics",
            "Interview stakeholders and witnesses",
            "Test hypotheses about root cause",
            "Evaluate resolution options",
            "Implement enhanced monitoring"
        ],
        "deliverables": [
            "Root cause identified",
            "Impact assessment completed",
            "Resolution plan developed",
            "Risk assessment updated"
        ]
    })
    
    # Phase 3: Resolution & Recovery (60-240 minutes)
    phases.append({
        "phase": "resolution_recovery",
        "duration_minutes": 180,
        "start_time": (datetime.now() + timedelta(minutes=60)).isoformat(),
        "objectives": [
            "Implement resolution",
            "Restore services",
            "Verify system stability",
            "Monitor for regression"
        ],
        "activities": [
            "Execute resolution procedures",
            "Gradually restore services",
            "Perform system health checks",
            "Monitor for any issues",
            "Update stakeholders on progress"
        ],
        "deliverables": [
            "Services restored to normal operation",
            "System stability confirmed",
            "User impact resolved",
            "Monitoring restored to normal"
        ]
    })
    
    # Phase 4: Post-Incident (Ongoing)
    phases.append({
        "phase": "post_incident",
        "duration_minutes": None,
        "start_time": (datetime.now() + timedelta(minutes=240)).isoformat(),
        "objectives": [
            "Conduct post-incident review",
            "Document lessons learned",
            "Implement preventive measures",
            "Update procedures"
        ],
        "activities": [
            "Schedule post-incident review meeting",
            "Document timeline and decisions",
            "Analyze response effectiveness",
            "Identify improvement opportunities",
            "Update incident response procedures"
        ],
        "deliverables": [
            "Post-incident review report",
            "Action items for improvements",
            "Updated response procedures",
            "Prevention measures implemented"
        ]
    })
    
    return phases


async def _plan_resource_allocation(incident_data: Dict) -> Dict:
    """Plan resource allocation for incident response."""
    
    severity = incident_data["severity"]
    response_team = incident_data["response_team"]
    
    allocation = {
        "human_resources": {
            "incident_commander": 1,
            "primary_responders": len(response_team["primary_responders"]),
            "specialists": len(response_team["specialists"]),
            "communication_lead": 1 if severity in ["critical", "high"] else 0
        },
        "technical_resources": {
            "monitoring_systems": "enhanced_mode",
            "logging_retention": "extended",
            "backup_systems": "activated" if severity == "critical" else "standby",
            "communication_tools": ["slack", "pagerduty", "zoom"]
        },
        "budget_allocation": {
            "emergency_cloud_resources": 5000 if severity == "critical" else 1000,
            "external_consultants": 10000 if severity == "critical" else 0,
            "overtime_budget": 2000 if severity in ["critical", "high"] else 500
        }
    }
    
    return allocation


async def _identify_decision_points(incident_data: Dict) -> List[Dict]:
    """Identify key decision points during incident response."""
    
    decision_points = [
        {
            "decision": "Escalation to next level",
            "timing": "If no progress in 30 minutes",
            "criteria": "SLA breach imminent or impact worsening",
            "decision_maker": "incident_commander",
            "options": ["escalate", "continue_current_approach", "change_strategy"]
        },
        {
            "decision": "Public communication",
            "timing": "If incident affects external users",
            "criteria": "User-facing service degradation >15 minutes",
            "decision_maker": "communication_lead",
            "options": ["status_page_update", "email_notification", "social_media_post"]
        },
        {
            "decision": "Rollback vs. forward fix",
            "timing": "When resolution approach is determined",
            "criteria": "Risk assessment and time to resolution",
            "decision_maker": "incident_commander",
            "options": ["rollback_to_stable", "implement_forward_fix", "hybrid_approach"]
        },
        {
            "decision": "Activate disaster recovery",
            "timing": "If primary systems cannot be restored",
            "criteria": "Recovery time estimate >RTO",
            "decision_maker": "engineering_manager",
            "options": ["activate_dr_site", "continue_primary_recovery", "partial_failover"]
        }
    ]
    
    return decision_points


async def _define_success_criteria(incident_data: Dict) -> Dict:
    """Define success criteria for incident resolution."""
    
    criteria = {
        "primary_objectives": [
            "Service availability restored to >99%",
            "User-reported issues resolved",
            "System performance within normal parameters",
            "No data loss or corruption"
        ],
        "performance_targets": {
            "response_time_p95": "<500ms",
            "error_rate": "<1%",
            "uptime": ">99.9%",
            "user_satisfaction": ">95%"
        },
        "business_objectives": [
            "Revenue impact minimized",
            "Customer trust maintained",
            "SLA commitments met",
            "Regulatory compliance maintained"
        ],
        "technical_objectives": [
            "Root cause identified and addressed",
            "System stability confirmed",
            "Monitoring and alerting verified",
            "Documentation updated"
        ]
    }
    
    return criteria


async def _create_contingency_plans(incident_data: Dict) -> Dict:
    """Create contingency plans for various scenarios."""
    
    contingencies = {
        "if_primary_approach_fails": {
            "trigger": "No improvement after 60 minutes",
            "action": "Switch to emergency rollback procedures",
            "resources_needed": "Database administrator, deployment engineer",
            "estimated_time": "30 minutes"
        },
        "if_incident_escalates": {
            "trigger": "Impact spreads to additional services",
            "action": "Activate full incident response team",
            "resources_needed": "All specialists, management team",
            "estimated_time": "15 minutes"
        },
        "if_data_integrity_questioned": {
            "trigger": "Any indication of data corruption",
            "action": "Immediately enable read-only mode",
            "resources_needed": "Database team, data integrity specialist",
            "estimated_time": "10 minutes"
        },
        "if_security_breach_suspected": {
            "trigger": "Unusual access patterns detected",
            "action": "Activate security incident response",
            "resources_needed": "Security team, legal, compliance",
            "estimated_time": "20 minutes"
        }
    }
    
    return contingencies


async def _create_communication_strategy(incident_data: Dict) -> Dict:
    """Create communication strategy for incident response."""
    
    severity = incident_data["severity"]
    response_team = incident_data["response_team"]
    
    communication = {
        "internal_communication": await _plan_internal_communication(severity, response_team),
        "external_communication": await _plan_external_communication(severity, incident_data),
        "communication_schedule": await _create_communication_schedule(severity),
        "message_templates": await _prepare_message_templates(incident_data),
        "escalation_communication": await _plan_escalation_communication(severity)
    }
    
    return communication


async def _plan_internal_communication(severity: str, response_team: Dict) -> Dict:
    """Plan internal communication strategy."""
    
    internal_comm = {
        "primary_channels": ["slack_incident_channel", "pagerduty", "zoom_bridge"],
        "notification_groups": {
            "immediate": response_team["primary_responders"] + [response_team["incident_commander"]],
            "15_minutes": response_team["stakeholders"],
            "30_minutes": response_team["escalation_contacts"] if severity == "critical" else []
        },
        "update_frequency": {
            "critical": "every 15 minutes",
            "high": "every 30 minutes",
            "medium": "every hour",
            "low": "every 4 hours"
        }.get(severity, "every hour"),
        "communication_lead": response_team.get("stakeholders", ["incident_commander"])[0]
    }
    
    return internal_comm


async def _plan_external_communication(severity: str, incident_data: Dict) -> Dict:
    """Plan external communication strategy."""
    
    impact = incident_data["initial_impact"]
    users_affected = impact["users_affected"]
    
    external_comm = {
        "status_page_update": {
            "required": users_affected > 100,
            "initial_message": "investigating",
            "update_frequency": "every 30 minutes" if severity in ["critical", "high"] else "hourly"
        },
        "customer_notifications": {
            "email_notification": users_affected > 1000,
            "in_app_notification": users_affected > 500,
            "push_notification": severity == "critical"
        },
        "media_communication": {
            "press_release": severity == "critical" and users_affected > 50000,
            "social_media": severity in ["critical", "high"] and users_affected > 10000,
            "blog_post": severity in ["critical", "high"]
        },
        "regulatory_notification": {
            "required": incident_data["incident_type"] == "security" and severity in ["critical", "high"],
            "timeline": "within 72 hours",
            "authorities": ["data_protection_authority", "financial_regulators"]
        }
    }
    
    return external_comm


async def _create_communication_schedule(severity: str) -> List[Dict]:
    """Create communication schedule based on severity."""
    
    base_time = datetime.now()
    schedule = []
    
    # Immediate notifications (0-5 minutes)
    schedule.append({
        "time": base_time.strftime("%H:%M"),
        "audience": "response_team",
        "message_type": "initial_notification",
        "content": "Incident declared, response team assembling"
    })
    
    # 15-minute update
    schedule.append({
        "time": (base_time + timedelta(minutes=15)).strftime("%H:%M"),
        "audience": "stakeholders",
        "message_type": "initial_assessment",
        "content": "Initial assessment complete, response plan activated"
    })
    
    # Ongoing updates based on severity
    if severity == "critical":
        for i in range(2, 10):  # Every 15 minutes for critical
            schedule.append({
                "time": (base_time + timedelta(minutes=i*15)).strftime("%H:%M"),
                "audience": "all_stakeholders",
                "message_type": "progress_update",
                "content": f"Status update #{i-1}"
            })
    elif severity == "high":
        for i in range(1, 6):  # Every 30 minutes for high
            schedule.append({
                "time": (base_time + timedelta(minutes=30 + i*30)).strftime("%H:%M"),
                "audience": "key_stakeholders",
                "message_type": "progress_update",
                "content": f"Status update #{i}"
            })
    
    return schedule


async def _prepare_message_templates(incident_data: Dict) -> Dict:
    """Prepare message templates for different scenarios."""
    
    incident_id = incident_data["incident_id"]
    
    templates = {
        "initial_notification": f"""
🚨 INCIDENT DECLARED - {incident_id}

Severity: {incident_data['severity'].upper()}
Type: {incident_data['incident_type'].title()}
Impact: {incident_data['initial_impact']['users_affected']} users affected

Response team has been assembled and investigation is underway.
Next update in 15 minutes.

Incident Commander: [NAME]
""",
        "status_page_update": f"""
We are currently investigating reports of [ISSUE_DESCRIPTION]. 
Our team is actively working to resolve this issue.

Incident ID: {incident_id}
Started: {datetime.now().strftime('%Y-%m-%d %H:%M UTC')}
Next update: [TIME]
""",
        "resolution_notification": f"""
✅ INCIDENT RESOLVED - {incident_id}

The incident affecting [SERVICES] has been resolved.
All services are now operating normally.

Duration: [DURATION]
Root cause: [ROOT_CAUSE]
Prevention measures: [MEASURES]

Post-incident review will be conducted within 24 hours.
""",
        "escalation_notification": f"""
🚨 INCIDENT ESCALATION - {incident_id}

This incident has been escalated due to:
- [ESCALATION_REASON]

Additional resources have been engaged.
Leadership team has been notified.

Current status: [STATUS]
Next update: [TIME]
"""
    }
    
    return templates


async def _plan_escalation_communication(severity: str) -> Dict:
    """Plan escalation communication procedures."""
    
    escalation = {
        "escalation_triggers": [
            "SLA breach imminent (within 15 minutes)",
            "Impact spreading to additional services",
            "Resolution time estimate exceeds 4 hours",
            "Customer complaints exceeding threshold"
        ],
        "escalation_levels": {
            "level_1": {
                "trigger": "30 minutes without progress",
                "notify": ["engineering_manager", "product_manager"],
                "approval_needed": False
            },
            "level_2": {
                "trigger": "60 minutes or SLA breach",
                "notify": ["director_engineering", "vp_product"],
                "approval_needed": True
            },
            "level_3": {
                "trigger": "Major outage or security breach",
                "notify": ["cto", "ceo", "board_if_required"],
                "approval_needed": True
            }
        },
        "escalation_process": [
            "Document escalation trigger and rationale",
            "Notify next level stakeholders",
            "Brief leadership on current status",
            "Request additional resources if needed",
            "Update communication frequency"
        ]
    }
    
    return escalation


async def _prepare_recovery_procedures(incident_data: Dict, assessment: Dict) -> Dict:
    """Prepare detailed recovery procedures."""
    
    recovery = {
        "immediate_recovery_steps": await _define_immediate_recovery_steps(incident_data),
        "service_restoration_plan": await _create_service_restoration_plan(incident_data, assessment),
        "verification_procedures": await _define_verification_procedures(incident_data),
        "rollback_procedures": await _prepare_rollback_procedures(incident_data),
        "monitoring_plan": await _create_recovery_monitoring_plan(incident_data)
    }
    
    return recovery


async def _define_immediate_recovery_steps(incident_data: Dict) -> List[Dict]:
    """Define immediate recovery steps based on incident type."""
    
    incident_type = incident_data["incident_type"]
    
    recovery_steps = []
    
    if incident_type == "performance":
        recovery_steps.extend([
            {
                "step": "Scale up resources",
                "command": "scale-resources compute 150",
                "estimated_time": "5 minutes",
                "verification": "Check CPU and memory utilization"
            },
            {
                "step": "Restart affected services",
                "command": "deploy-application [service] production rolling",
                "estimated_time": "10 minutes",
                "verification": "Verify service health endpoints"
            },
            {
                "step": "Clear caches",
                "command": "Clear application and database caches",
                "estimated_time": "2 minutes",
                "verification": "Monitor cache hit rates"
            }
        ])
    elif incident_type == "database":
        recovery_steps.extend([
            {
                "step": "Switch to read replicas",
                "command": "Route read traffic to replica instances",
                "estimated_time": "3 minutes",
                "verification": "Confirm read query success rate"
            },
            {
                "step": "Optimize database connections",
                "command": "Adjust connection pool settings",
                "estimated_time": "5 minutes",
                "verification": "Monitor connection pool metrics"
            },
            {
                "step": "Analyze slow queries",
                "command": "analyze-logs database 1h ERROR",
                "estimated_time": "10 minutes",
                "verification": "Identify and kill problematic queries"
            }
        ])
    elif incident_type == "outage":
        recovery_steps.extend([
            {
                "step": "Activate backup systems",
                "command": "Failover to secondary infrastructure",
                "estimated_time": "15 minutes",
                "verification": "Confirm all services running on backup"
            },
            {
                "step": "Reroute traffic",
                "command": "Update DNS and load balancer config",
                "estimated_time": "10 minutes",
                "verification": "Monitor traffic distribution"
            }
        ])
    
    return recovery_steps


async def _create_service_restoration_plan(incident_data: Dict, assessment: Dict) -> Dict:
    """Create service restoration plan."""
    
    affected_components = assessment["affected_components"]
    
    restoration_plan = {
        "restoration_order": [],
        "dependencies": {},
        "parallel_activities": [],
        "estimated_timeline": {}
    }
    
    # Define restoration order based on criticality
    critical_services = [
        comp for comp, details in affected_components["component_details"].items()
        if details["recovery_priority"] == "high"
    ]
    
    normal_services = [
        comp for comp, details in affected_components["component_details"].items()
        if details["recovery_priority"] != "high"
    ]
    
    restoration_plan["restoration_order"] = critical_services + normal_services
    
    # Define dependencies
    restoration_plan["dependencies"] = {
        "web_frontend": ["api_gateway", "authentication_service"],
        "api_gateway": ["database_primary", "cache_cluster"],
        "user_service": ["database_primary", "authentication_service"],
        "payment_service": ["database_primary", "external_payment_gateway"]
    }
    
    # Activities that can be done in parallel
    restoration_plan["parallel_activities"] = [
        "Monitor system metrics",
        "Analyze logs for issues",
        "Prepare rollback procedures",
        "Update stakeholders"
    ]
    
    return restoration_plan


async def _define_verification_procedures(incident_data: Dict) -> List[Dict]:
    """Define verification procedures for recovery."""
    
    procedures = [
        {
            "verification": "Service health checks",
            "method": "monitor-services detailed",
            "success_criteria": "All services showing healthy status",
            "frequency": "Every 2 minutes"
        },
        {
            "verification": "Performance validation",
            "method": "Check response times and error rates",
            "success_criteria": "Response time <500ms, error rate <1%",
            "frequency": "Every 5 minutes"
        },
        {
            "verification": "User experience testing",
            "method": "Execute critical user journeys",
            "success_criteria": "All critical flows working correctly",
            "frequency": "Once after restoration"
        },
        {
            "verification": "Data integrity check",
            "method": "Database consistency checks",
            "success_criteria": "No data corruption detected",
            "frequency": "Once after database recovery"
        },
        {
            "verification": "External dependency status",
            "method": "Verify all external services responding",
            "success_criteria": "All external APIs healthy",
            "frequency": "Every 10 minutes"
        }
    ]
    
    return procedures


async def _prepare_rollback_procedures(incident_data: Dict) -> Dict:
    """Prepare rollback procedures if recovery fails."""
    
    rollback = {
        "rollback_triggers": [
            "Recovery procedures not showing improvement after 30 minutes",
            "New issues introduced during recovery",
            "System instability detected",
            "Data integrity concerns arise"
        ],
        "rollback_steps": [
            {
                "step": "Stop current recovery activities",
                "action": "Halt all in-progress recovery procedures",
                "time_estimate": "2 minutes"
            },
            {
                "step": "Restore to last known good state",
                "action": "deploy-application [service] production blue_green",
                "time_estimate": "15 minutes"
            },
            {
                "step": "Verify rollback success",
                "action": "monitor-services and validate functionality",
                "time_estimate": "10 minutes"
            }
        ],
        "rollback_decision_criteria": [
            "Engineering manager approval required",
            "Document rollback rationale",
            "Notify all stakeholders",
            "Prepare alternative recovery approach"
        ]
    }
    
    return rollback


async def _create_recovery_monitoring_plan(incident_data: Dict) -> Dict:
    """Create monitoring plan during recovery."""
    
    monitoring = {
        "enhanced_monitoring_duration": "4 hours post-recovery",
        "key_metrics": [
            "Service availability and response times",
            "Error rates and success rates",
            "Resource utilization (CPU, memory, disk)",
            "Database performance and connection counts",
            "User activity and satisfaction metrics"
        ],
        "alerting_adjustments": {
            "lower_thresholds": "Temporary lower alert thresholds for early detection",
            "additional_alerts": "Monitor for any regression indicators",
            "escalation_changes": "Direct escalation to incident team for any new issues"
        },
        "monitoring_tools": [
            "monitor-services detailed - Real-time service monitoring",
            "analyze-logs application 15m - Continuous log analysis",
            "Custom dashboards - Business metric tracking"
        ]
    }
    
    return monitoring


def _format_incident_assessment(assessment: Dict) -> str:
    """Format incident assessment for display."""
    
    current_status = assessment["current_status"]
    root_cause = assessment["root_cause_analysis"]
    affected = assessment["affected_components"]
    
    assessment_info = f"""**System Status:** {current_status['overall_health'].title()}
**Active Alerts:** {current_status['active_alerts']}
**System Load:** {current_status['system_load'].title()}

**Service Availability:**"""
    
    for service, availability in current_status["service_availability"].items():
        status_icon = "🟢" if availability > 95 else "🟡" if availability > 80 else "🔴"
        assessment_info += f"\n{status_icon} {service.replace('_', ' ').title()}: {availability:.1f}%"
    
    assessment_info += f"\n\n**Affected Components:** {affected['total_affected']} components"
    assessment_info += f"\n**Critical Path Impact:** {'Yes' if affected['critical_path_impact'] else 'No'}"
    
    assessment_info += "\n\n**Likely Root Causes:**"
    for cause in root_cause["potential_root_causes"]:
        assessment_info += f"\n• {cause}"
    
    return assessment_info


def _format_response_plan(response_plan: Dict) -> str:
    """Format response plan for display."""
    
    phases = response_plan["phases"]
    
    plan_info = "**Response Phases:**"
    
    for i, phase in enumerate(phases, 1):
        duration_text = f"{phase['duration_minutes']}min" if phase['duration_minutes'] else "Ongoing"
        plan_info += f"\n\n**Phase {i}: {phase['phase'].replace('_', ' ').title()}** ({duration_text})"
        plan_info += f"\nObjectives: {', '.join(phase['objectives'][:2])}..."
        
        if i <= 2:  # Show details for first two phases
            plan_info += f"\nKey Activities:"
            for activity in phase['activities'][:3]:
                plan_info += f"\n• {activity}"
    
    return plan_info


def _format_communication_plan(communication_plan: Dict) -> str:
    """Format communication plan for display."""
    
    internal = communication_plan["internal_communication"]
    external = communication_plan["external_communication"]
    
    comm_info = f"""**Internal Communication:**
Update Frequency: {internal['update_frequency']}
Primary Channels: {', '.join(internal['primary_channels'])}
Communication Lead: {internal['communication_lead']}

**External Communication:**"""
    
    if external["status_page_update"]["required"]:
        comm_info += f"\n🔔 Status Page: Updates {external['status_page_update']['update_frequency']}"
    
    if external["customer_notifications"]["email_notification"]:
        comm_info += "\n📧 Email notifications to affected customers"
    
    if external["customer_notifications"]["in_app_notification"]:
        comm_info += "\n📱 In-app notifications enabled"
    
    return comm_info


def _format_recovery_procedures(recovery_procedures: Dict) -> str:
    """Format recovery procedures for display."""
    
    immediate_steps = recovery_procedures["immediate_recovery_steps"]
    restoration = recovery_procedures["service_restoration_plan"]
    
    recovery_info = "**Immediate Recovery Steps:**"
    
    for i, step in enumerate(immediate_steps[:3], 1):
        recovery_info += f"\n{i}. {step['step']} - {step['estimated_time']}"
        recovery_info += f"\n   Command: `{step['command']}`"
    
    recovery_info += f"\n\n**Service Restoration Order:**"
    for i, service in enumerate(restoration["restoration_order"][:5], 1):
        recovery_info += f"\n{i}. {service.replace('_', ' ').title()}"
    
    return recovery_info


def _format_incident_timeline(response_plan: Dict) -> str:
    """Format incident timeline for display."""
    
    phases = response_plan["phases"]
    
    timeline_info = "**Incident Response Timeline:**"
    current_time = datetime.now()
    
    for phase in phases[:3]:  # Show first 3 phases
        phase_start = datetime.fromisoformat(phase['start_time'])
        start_offset = int((phase_start - current_time).total_seconds() / 60)
        
        if start_offset <= 0:
            time_display = "NOW"
        else:
            time_display = f"+{start_offset}min"
        
        timeline_info += f"\n{time_display}: {phase['phase'].replace('_', ' ').title()}"
        
        if phase['duration_minutes']:
            timeline_info += f" ({phase['duration_minutes']}min)"
    
    return timeline_info


def _format_immediate_actions(response_plan: Dict, severity: str) -> str:
    """Format immediate actions for display."""
    
    actions = []
    
    if severity == "critical":
        actions.extend([
            "🚨 Activate full incident response team immediately",
            "📞 Notify senior leadership and stakeholders",
            "🔧 Begin immediate containment procedures",
            "📋 Start detailed incident logging and documentation"
        ])
    elif severity == "high":
        actions.extend([
            "⚠️ Assemble incident response team",
            "🔧 Implement immediate containment measures",
            "📞 Notify key stakeholders",
            "📊 Enable enhanced monitoring"
        ])
    else:
        actions.extend([
            "🔍 Assign incident owner and begin investigation",
            "📊 Gather system metrics and logs",
            "📞 Notify relevant team members",
            "🔧 Prepare containment options"
        ])
    
    return "\n".join(actions)


def _format_investigation_checklist(incident_type: str, assessment: Dict) -> str:
    """Format investigation checklist for display."""
    
    root_cause = assessment["root_cause_analysis"]
    
    checklist_info = "**Investigation Priority:**"
    
    for priority in root_cause["investigation_priority"][:4]:
        checklist_info += f"\n☐ {priority}"
    
    checklist_info += "\n\n**Evidence to Collect:**"
    for evidence in root_cause["evidence_required"]:
        checklist_info += f"\n☐ {evidence}"
    
    return checklist_info


def _format_monitoring_strategy(incident_data: Dict, assessment: Dict) -> str:
    """Format monitoring strategy for display."""
    
    monitoring_info = """**Enhanced Monitoring Activated:**
• Real-time service health monitoring
• Increased log retention and analysis
• Alert threshold adjustments
• Dashboard updates every 30 seconds

**Key Metrics to Watch:**
• Service availability and response times
• Error rates and user impact
• Resource utilization trends
• External dependency health"""
    
    return monitoring_info


def _format_response_actions(incident_type: str, severity: str) -> str:
    """Format recommended response actions."""
    
    actions = [
        f"1. 🔍 Run `monitor-services detailed` to assess current system state",
        f"2. 📊 Execute `analyze-logs {incident_type} 1h {severity.upper()}` for investigation",
        f"3. 🔧 Use appropriate tools based on findings (scale-resources, deploy-application, etc.)",
        f"4. 📞 Follow communication plan and update stakeholders",
        f"5. 📋 Document all actions and findings in incident log"
    ]
    
    if incident_type == "security":
        actions.insert(2, "2.5. 🔒 Activate security containment procedures immediately")
    elif incident_type == "database":
        actions.insert(2, "2.5. 🗄️ Switch to read replicas if needed for stability")
    
    return "\n".join(actions)


def _format_post_incident_tasks(incident_data: Dict) -> str:
    """Format post-incident tasks."""
    
    tasks = f"""**Post-Incident Requirements:**
☐ Schedule post-incident review within 24 hours
☐ Document complete incident timeline and actions taken
☐ Identify root cause and contributing factors
☐ Create action items for prevention measures
☐ Update incident response procedures based on lessons learned
☐ Communicate final status to all stakeholders
☐ Archive incident documentation in knowledge base

**Timeline:** Post-incident review scheduled for {(datetime.now() + timedelta(hours=24)).strftime('%Y-%m-%d %H:%M')}"""
    
    return tasks


def _get_incident_status(severity: str) -> str:
    """Get incident status display."""
    
    status_map = {
        "critical": "🚨 CRITICAL",
        "high": "🔴 HIGH",
        "medium": "🟡 MEDIUM", 
        "low": "🟢 LOW"
    }
    
    return status_map.get(severity, "🟡 MEDIUM")
