"""
Monitor Services Tool
Real-time monitoring of infrastructure services and health checks.
"""

import json
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List
import random


async def monitor_services_tool(
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
    
    Returns:
        Dict containing service monitoring data and health status
    """
    
    # Validate inputs
    valid_metrics = ["standard", "detailed", "performance"]
    if metrics not in valid_metrics:
        metrics = "standard"
    
    alert_threshold = max(0.0, min(100.0, alert_threshold))
    
    # Perform service monitoring
    monitoring_data = {
        "timestamp": datetime.now().isoformat(),
        "filter": service_filter,
        "metrics_level": metrics,
        "alert_threshold": alert_threshold,
        "services": await _discover_services(service_filter),
        "summary": {},
        "alerts": [],
        "recommendations": []
    }
    
    # Collect metrics for discovered services
    for service in monitoring_data["services"]:
        service["metrics"] = await _collect_service_metrics(service["name"], metrics)
        service["health_score"] = await _calculate_health_score(service["metrics"])
        service["status"] = _determine_service_status(service["health_score"], alert_threshold)
        
        # Generate alerts for unhealthy services
        if service["health_score"] < alert_threshold:
            alert = await _generate_service_alert(service, alert_threshold)
            monitoring_data["alerts"].append(alert)
    
    # Generate monitoring summary
    monitoring_data["summary"] = await _generate_monitoring_summary(monitoring_data["services"])
    
    # Generate actionable recommendations
    monitoring_data["recommendations"] = await _generate_monitoring_recommendations(
        monitoring_data["services"], monitoring_data["alerts"]
    )
    
    return monitoring_data


async def _discover_services(service_filter: str) -> List[Dict]:
    """Discover services based on filter criteria."""
    
    # Simulated service discovery
    all_services = [
        {
            "name": "web-frontend",
            "type": "web_application",
            "tags": ["frontend", "production", "critical"],
            "instances": 3,
            "load_balancer": True,
            "environment": "production"
        },
        {
            "name": "api-gateway",
            "type": "api_service", 
            "tags": ["api", "production", "critical"],
            "instances": 2,
            "load_balancer": True,
            "environment": "production"
        },
        {
            "name": "user-service",
            "type": "microservice",
            "tags": ["backend", "production", "critical"],
            "instances": 4,
            "load_balancer": False,
            "environment": "production"
        },
        {
            "name": "payment-service",
            "type": "microservice",
            "tags": ["backend", "production", "critical", "pci-compliant"],
            "instances": 2,
            "load_balancer": False,
            "environment": "production"
        },
        {
            "name": "notification-service",
            "type": "microservice",
            "tags": ["backend", "production"],
            "instances": 2,
            "load_balancer": False,
            "environment": "production"
        },
        {
            "name": "database-primary",
            "type": "database",
            "tags": ["database", "production", "critical"],
            "instances": 1,
            "load_balancer": False,
            "environment": "production"
        },
        {
            "name": "database-replica",
            "type": "database",
            "tags": ["database", "production", "read-replica"],
            "instances": 2,
            "load_balancer": False,
            "environment": "production"
        },
        {
            "name": "redis-cache",
            "type": "cache",
            "tags": ["cache", "production"],
            "instances": 3,
            "load_balancer": False,
            "environment": "production"
        },
        {
            "name": "monitoring-stack",
            "type": "monitoring",
            "tags": ["monitoring", "production"],
            "instances": 1,
            "load_balancer": False,
            "environment": "production"
        },
        {
            "name": "staging-web",
            "type": "web_application",
            "tags": ["frontend", "staging"],
            "instances": 1,
            "load_balancer": False,
            "environment": "staging"
        }
    ]
    
    # Apply filtering
    if service_filter == "all":
        filtered_services = all_services
    elif service_filter == "production":
        filtered_services = [s for s in all_services if s["environment"] == "production"]
    elif service_filter == "critical":
        filtered_services = [s for s in all_services if "critical" in s["tags"]]
    elif service_filter == "database":
        filtered_services = [s for s in all_services if s["type"] == "database"]
    elif service_filter == "microservice":
        filtered_services = [s for s in all_services if s["type"] == "microservice"]
    else:
        # Filter by name or tag
        filtered_services = [
            s for s in all_services 
            if service_filter.lower() in s["name"].lower() or 
               service_filter.lower() in s["tags"]
        ]
    
    return filtered_services


async def _collect_service_metrics(service_name: str, metrics_level: str) -> Dict:
    """Collect metrics for a specific service."""
    
    # Simulate metric collection with realistic patterns
    base_metrics = {
        "response_time_ms": _generate_response_time(),
        "error_rate_percent": _generate_error_rate(),
        "throughput_rps": _generate_throughput(),
        "cpu_usage_percent": _generate_cpu_usage(),
        "memory_usage_percent": _generate_memory_usage(),
        "disk_usage_percent": _generate_disk_usage(),
        "network_io_mbps": _generate_network_io(),
        "uptime_hours": _generate_uptime(),
        "last_updated": datetime.now().isoformat()
    }
    
    if metrics_level == "detailed":
        base_metrics.update({
            "p50_response_time_ms": base_metrics["response_time_ms"] * 0.7,
            "p95_response_time_ms": base_metrics["response_time_ms"] * 1.8,
            "p99_response_time_ms": base_metrics["response_time_ms"] * 3.2,
            "2xx_responses_percent": 100 - base_metrics["error_rate_percent"],
            "4xx_responses_percent": base_metrics["error_rate_percent"] * 0.7,
            "5xx_responses_percent": base_metrics["error_rate_percent"] * 0.3,
            "concurrent_connections": random.randint(50, 500),
            "queue_length": random.randint(0, 20),
            "gc_collections_per_hour": random.randint(100, 800),
            "jvm_heap_usage_percent": random.uniform(40, 80) if "java" in service_name else None
        })
    
    if metrics_level == "performance":
        base_metrics.update({
            "database_connections": random.randint(5, 50),
            "cache_hit_rate_percent": random.uniform(85, 98),
            "io_wait_percent": random.uniform(1, 15),
            "context_switches_per_sec": random.randint(1000, 10000),
            "file_descriptors_used": random.randint(100, 1000),
            "tcp_connections_active": random.randint(50, 300),
            "ssl_handshakes_per_min": random.randint(10, 200)
        })
    
    return base_metrics


def _generate_response_time() -> float:
    """Generate realistic response time values."""
    # Most services have good response times with occasional spikes
    if random.random() < 0.9:
        return round(random.uniform(50, 200), 2)
    else:
        return round(random.uniform(500, 2000), 2)


def _generate_error_rate() -> float:
    """Generate realistic error rates."""
    # Most services have low error rates
    if random.random() < 0.8:
        return round(random.uniform(0.1, 2.0), 2)
    else:
        return round(random.uniform(3.0, 8.0), 2)


def _generate_throughput() -> int:
    """Generate realistic throughput values."""
    return random.randint(10, 500)


def _generate_cpu_usage() -> float:
    """Generate realistic CPU usage."""
    return round(random.uniform(20, 85), 1)


def _generate_memory_usage() -> float:
    """Generate realistic memory usage."""
    return round(random.uniform(40, 90), 1)


def _generate_disk_usage() -> float:
    """Generate realistic disk usage."""
    return round(random.uniform(30, 75), 1)


def _generate_network_io() -> float:
    """Generate realistic network I/O."""
    return round(random.uniform(5, 100), 2)


def _generate_uptime() -> float:
    """Generate realistic uptime in hours."""
    # Most services have been up for a while
    return round(random.uniform(24, 720), 1)  # 1 day to 30 days


async def _calculate_health_score(metrics: Dict) -> float:
    """Calculate overall health score for a service."""
    
    score = 100.0
    
    # Response time impact (0-30 points)
    response_time = metrics.get("response_time_ms", 100)
    if response_time > 1000:
        score -= 30
    elif response_time > 500:
        score -= 20
    elif response_time > 200:
        score -= 10
    
    # Error rate impact (0-25 points)
    error_rate = metrics.get("error_rate_percent", 0)
    if error_rate > 5:
        score -= 25
    elif error_rate > 2:
        score -= 15
    elif error_rate > 1:
        score -= 5
    
    # CPU usage impact (0-20 points)
    cpu_usage = metrics.get("cpu_usage_percent", 50)
    if cpu_usage > 90:
        score -= 20
    elif cpu_usage > 80:
        score -= 10
    elif cpu_usage > 70:
        score -= 5
    
    # Memory usage impact (0-15 points)
    memory_usage = metrics.get("memory_usage_percent", 50)
    if memory_usage > 95:
        score -= 15
    elif memory_usage > 85:
        score -= 10
    elif memory_usage > 75:
        score -= 5
    
    # Uptime impact (0-10 points)
    uptime = metrics.get("uptime_hours", 24)
    if uptime < 1:
        score -= 10
    elif uptime < 6:
        score -= 5
    
    return max(0.0, round(score, 1))


def _determine_service_status(health_score: float, threshold: float) -> str:
    """Determine service status based on health score."""
    
    if health_score >= threshold:
        return "healthy"
    elif health_score >= threshold - 20:
        return "degraded"
    elif health_score >= threshold - 40:
        return "unhealthy"
    else:
        return "critical"


async def _generate_service_alert(service: Dict, threshold: float) -> Dict:
    """Generate alert for unhealthy service."""
    
    health_score = service["health_score"]
    metrics = service["metrics"]
    
    # Determine primary issue
    issues = []
    
    if metrics.get("response_time_ms", 0) > 500:
        issues.append(f"High response time: {metrics['response_time_ms']}ms")
    
    if metrics.get("error_rate_percent", 0) > 2:
        issues.append(f"Elevated error rate: {metrics['error_rate_percent']}%")
    
    if metrics.get("cpu_usage_percent", 0) > 80:
        issues.append(f"High CPU usage: {metrics['cpu_usage_percent']}%")
    
    if metrics.get("memory_usage_percent", 0) > 85:
        issues.append(f"High memory usage: {metrics['memory_usage_percent']}%")
    
    if metrics.get("uptime_hours", 24) < 6:
        issues.append(f"Recent restart: {metrics['uptime_hours']} hours uptime")
    
    # Determine severity
    if health_score < threshold - 40:
        severity = "critical"
    elif health_score < threshold - 20:
        severity = "high"
    else:
        severity = "medium"
    
    return {
        "service": service["name"],
        "severity": severity,
        "health_score": health_score,
        "threshold": threshold,
        "issues": issues,
        "environment": service["environment"],
        "instances_affected": service["instances"],
        "timestamp": datetime.now().isoformat(),
        "message": f"Service {service['name']} health score ({health_score}) below threshold ({threshold})"
    }


async def _generate_monitoring_summary(services: List[Dict]) -> Dict:
    """Generate monitoring summary across all services."""
    
    total_services = len(services)
    healthy_services = len([s for s in services if s["status"] == "healthy"])
    degraded_services = len([s for s in services if s["status"] == "degraded"])
    unhealthy_services = len([s for s in services if s["status"] == "unhealthy"])
    critical_services = len([s for s in services if s["status"] == "critical"])
    
    # Calculate average metrics
    if services:
        avg_health_score = sum(s["health_score"] for s in services) / len(services)
        avg_response_time = sum(s["metrics"]["response_time_ms"] for s in services) / len(services)
        avg_error_rate = sum(s["metrics"]["error_rate_percent"] for s in services) / len(services)
        avg_cpu_usage = sum(s["metrics"]["cpu_usage_percent"] for s in services) / len(services)
        avg_memory_usage = sum(s["metrics"]["memory_usage_percent"] for s in services) / len(services)
        total_throughput = sum(s["metrics"]["throughput_rps"] for s in services)
    else:
        avg_health_score = avg_response_time = avg_error_rate = 0
        avg_cpu_usage = avg_memory_usage = total_throughput = 0
    
    return {
        "total_services": total_services,
        "healthy_services": healthy_services,
        "degraded_services": degraded_services,
        "unhealthy_services": unhealthy_services,
        "critical_services": critical_services,
        "overall_health_percent": round((healthy_services / total_services * 100), 1) if total_services > 0 else 0,
        "average_health_score": round(avg_health_score, 1),
        "average_response_time_ms": round(avg_response_time, 1),
        "average_error_rate_percent": round(avg_error_rate, 2),
        "average_cpu_usage_percent": round(avg_cpu_usage, 1),
        "average_memory_usage_percent": round(avg_memory_usage, 1),
        "total_throughput_rps": round(total_throughput, 0),
        "last_updated": datetime.now().isoformat()
    }


async def _generate_monitoring_recommendations(services: List[Dict], alerts: List[Dict]) -> List[str]:
    """Generate actionable monitoring recommendations."""
    
    recommendations = []
    
    # Critical service recommendations
    critical_services = [s for s in services if s["status"] == "critical"]
    if critical_services:
        recommendations.append(
            f"🚨 URGENT: {len(critical_services)} critical services require immediate attention"
        )
        for service in critical_services[:3]:  # Show top 3
            recommendations.append(
                f"   → {service['name']}: Health score {service['health_score']}/100"
            )
    
    # Performance recommendations
    high_response_time_services = [
        s for s in services 
        if s["metrics"]["response_time_ms"] > 500
    ]
    if high_response_time_services:
        recommendations.append(
            f"⚡ {len(high_response_time_services)} services showing high response times - consider scaling"
        )
    
    # Resource recommendations
    high_cpu_services = [
        s for s in services 
        if s["metrics"]["cpu_usage_percent"] > 80
    ]
    if high_cpu_services:
        recommendations.append(
            f"💻 {len(high_cpu_services)} services with high CPU usage - review capacity planning"
        )
    
    high_memory_services = [
        s for s in services 
        if s["metrics"]["memory_usage_percent"] > 85
    ]
    if high_memory_services:
        recommendations.append(
            f"🧠 {len(high_memory_services)} services with high memory usage - check for memory leaks"
        )
    
    # Error rate recommendations
    high_error_services = [
        s for s in services 
        if s["metrics"]["error_rate_percent"] > 2
    ]
    if high_error_services:
        recommendations.append(
            f"❌ {len(high_error_services)} services with elevated error rates - investigate logs"
        )
    
    # Recent restart recommendations
    recent_restart_services = [
        s for s in services 
        if s["metrics"]["uptime_hours"] < 6
    ]
    if recent_restart_services:
        recommendations.append(
            f"🔄 {len(recent_restart_services)} services recently restarted - monitor stability"
        )
    
    # Positive recommendations
    healthy_services = [s for s in services if s["status"] == "healthy"]
    if len(healthy_services) == len(services) and len(services) > 0:
        recommendations.append("✅ All services healthy - maintain current monitoring practices")
    
    # General recommendations
    if len(services) > 0:
        recommendations.extend([
            "📊 Set up automated alerts for threshold breaches",
            "📈 Review trending patterns over time",
            "🔍 Enable detailed logging for error analysis"
        ])
    
    return recommendations[:8]  # Limit to 8 recommendations
