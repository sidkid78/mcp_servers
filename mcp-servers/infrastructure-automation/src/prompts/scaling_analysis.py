"""
Scaling Analysis Prompt
Capacity planning and auto-scaling optimization workflow.
"""

import json
from datetime import datetime, timedelta
from typing import Dict, List


async def scaling_analysis_prompt(
    resource_focus: str = "compute",
    capacity_target: str = "auto"
) -> str:
    """
    Capacity planning and auto-scaling optimization.
    This prompt analyzes current resource utilization and provides scaling recommendations.
    """

    # Validate inputs
    valid_resource_types = ["compute", "storage", "network", "database", "cache", "all"]
    if resource_focus not in valid_resource_types:
        resource_focus = "compute"

    # Perform comprehensive scaling analysis
    current_state = await _analyze_current_resource_state(resource_focus)
    
    # Perform capacity planning
    capacity_analysis = await _perform_capacity_planning(current_state, capacity_target)
    
    # Generate scaling recommendations
    scaling_recommendations = await _generate_scaling_recommendations(
        current_state, capacity_analysis
    )
    
    # Create auto-scaling strategy
    auto_scaling_strategy = await _create_auto_scaling_strategy(
        current_state, capacity_analysis
    )
    
    # Generate cost analysis
    cost_analysis = await _analyze_scaling_costs(current_state, capacity_analysis)

    # Generate comprehensive scaling analysis report
    analysis_report = f"""
📈 **Infrastructure Scaling Analysis**

**Resource Focus:** {resource_focus.title()}
**Capacity Target:** {capacity_target.title()}
**Analysis Generated:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}

**🔍 Current Resource State:**
{_format_current_state(current_state)}

**📊 Capacity Analysis:**
{_format_capacity_analysis(capacity_analysis)}

**🎯 Scaling Recommendations:**
{_format_scaling_recommendations(scaling_recommendations)}

**🤖 Auto-Scaling Strategy:**
{_format_auto_scaling_strategy(auto_scaling_strategy)}

**💰 Cost Impact Analysis:**
{_format_cost_analysis(cost_analysis)}

**⚡ Performance Optimization:**
{_format_performance_optimization(current_state, capacity_analysis)}

**📈 Growth Projections:**
{_format_growth_projections(capacity_analysis)}

**🔧 Implementation Plan:**
{_format_implementation_plan(scaling_recommendations, auto_scaling_strategy)}

**🎪 Available Tools for Execution:**
• `scale-resources` - Execute scaling operations with recommended parameters
• `monitor-services` - Monitor resource utilization and performance
• `deploy-application` - Deploy with optimized resource configurations
• `analyze-logs` - Review performance logs and scaling events

**⚡ Recommended Actions:**
{_format_recommended_actions(scaling_recommendations, resource_focus)}

**Resource Optimization Status: {_get_optimization_status(current_state, capacity_analysis)} ✅**
Ready to optimize {resource_focus} resources for improved performance and cost efficiency.
"""

    return analysis_report


async def _analyze_current_resource_state(resource_focus: str) -> Dict:
    """Analyze current state of infrastructure resources."""
    
    state = {
        "focus": resource_focus,
        "timestamp": datetime.now().isoformat(),
        "resources": {},
        "utilization_summary": {},
        "bottlenecks": [],
        "efficiency_metrics": {}
    }

    if resource_focus == "all":
        # Analyze all resource types
        state["resources"]["compute"] = await _analyze_compute_state()
        state["resources"]["storage"] = await _analyze_storage_state()
        state["resources"]["network"] = await _analyze_network_state()
        state["resources"]["database"] = await _analyze_database_state()
        state["resources"]["cache"] = await _analyze_cache_state()
    else:
        # Analyze specific resource type
        if resource_focus == "compute":
            state["resources"]["compute"] = await _analyze_compute_state()
        elif resource_focus == "storage":
            state["resources"]["storage"] = await _analyze_storage_state()
        elif resource_focus == "network":
            state["resources"]["network"] = await _analyze_network_state()
        elif resource_focus == "database":
            state["resources"]["database"] = await _analyze_database_state()
        elif resource_focus == "cache":
            state["resources"]["cache"] = await _analyze_cache_state()

    # Generate utilization summary
    state["utilization_summary"] = await _generate_utilization_summary(state["resources"])
    
    # Identify bottlenecks
    state["bottlenecks"] = await _identify_resource_bottlenecks(state["resources"])
    
    # Calculate efficiency metrics
    state["efficiency_metrics"] = await _calculate_efficiency_metrics(state["resources"])

    return state


async def _analyze_compute_state() -> Dict:
    """Analyze current compute resource state."""
    
    # Simulate realistic compute analysis
    from random import randint, uniform
    
    instances = randint(8, 20)
    
    return {
        "type": "compute",
        "instances": {
            "total": instances,
            "running": instances - randint(0, 2),
            "stopped": randint(0, 2),
            "auto_scaling_group": randint(5, 15)
        },
        "utilization": {
            "cpu_average": round(uniform(45, 85), 1),
            "cpu_peak": round(uniform(75, 95), 1),
            "memory_average": round(uniform(50, 80), 1),
            "memory_peak": round(uniform(70, 90), 1),
            "network_average": round(uniform(20, 60), 1)
        },
        "capacity": {
            "total_vcpus": instances * randint(2, 8),
            "total_memory_gb": instances * randint(4, 16),
            "reserved_capacity": round(uniform(60, 90), 1)
        },
        "auto_scaling": {
            "enabled": True,
            "min_instances": randint(2, 5),
            "max_instances": randint(20, 40),
            "target_cpu": randint(60, 80),
            "scale_out_events_24h": randint(0, 5),
            "scale_in_events_24h": randint(0, 3)
        },
        "performance": {
            "response_time_p95": round(uniform(100, 300), 1),
            "throughput_rps": randint(500, 2000),
            "error_rate": round(uniform(0.1, 2.0), 2)
        }
    }


async def _analyze_storage_state() -> Dict:
    """Analyze current storage resource state."""
    
    from random import randint, uniform
    
    total_storage = randint(1000, 5000)
    used_storage = randint(int(total_storage * 0.4), int(total_storage * 0.9))
    
    return {
        "type": "storage",
        "volumes": {
            "total_count": randint(15, 40),
            "total_size_gb": total_storage,
            "used_size_gb": used_storage,
            "available_size_gb": total_storage - used_storage,
            "utilization_percent": round((used_storage / total_storage) * 100, 1)
        },
        "performance": {
            "iops_provisioned": randint(5000, 20000),
            "iops_utilized": randint(2000, 15000),
            "throughput_mbps": randint(250, 1000),
            "latency_p95": round(uniform(5, 25), 1)
        },
        "growth": {
            "daily_growth_gb": round(uniform(5, 50), 1),
            "monthly_projected_gb": round(uniform(150, 1500), 1),
            "growth_rate_percent": round(uniform(2, 15), 1)
        },
        "optimization": {
            "compression_enabled": True,
            "deduplication_ratio": round(uniform(1.2, 3.5), 1),
            "cold_storage_eligible_gb": randint(100, 1000)
        }
    }


async def _analyze_network_state() -> Dict:
    """Analyze current network resource state."""
    
    from random import randint, uniform
    
    bandwidth_capacity = randint(10, 100)
    current_usage = round(uniform(bandwidth_capacity * 0.2, bandwidth_capacity * 0.8), 1)
    
    return {
        "type": "network",
        "bandwidth": {
            "total_capacity_gbps": bandwidth_capacity,
            "current_usage_gbps": current_usage,
            "peak_usage_gbps": round(uniform(current_usage, bandwidth_capacity * 0.95), 1),
            "utilization_percent": round((current_usage / bandwidth_capacity) * 100, 1)
        },
        "connections": {
            "active_connections": randint(5000, 50000),
            "connection_limit": randint(100000, 500000),
            "connection_rate_per_sec": randint(100, 1000)
        },
        "latency": {
            "internal_latency_ms": round(uniform(1, 5), 2),
            "external_latency_ms": round(uniform(10, 50), 1),
            "cdn_latency_ms": round(uniform(15, 100), 1)
        },
        "load_balancers": {
            "count": randint(2, 6),
            "healthy_targets": randint(8, 25),
            "total_targets": randint(10, 30),
            "requests_per_second": randint(1000, 10000)
        }
    }


async def _analyze_database_state() -> Dict:
    """Analyze current database resource state."""
    
    from random import randint, uniform
    
    return {
        "type": "database",
        "instances": {
            "primary": {
                "instance_class": "db.r5.2xlarge",
                "cpu_utilization": round(uniform(40, 80), 1),
                "memory_utilization": round(uniform(50, 85), 1),
                "connection_count": randint(50, 200),
                "connection_limit": randint(500, 1000)
            },
            "read_replicas": randint(2, 5),
            "replica_lag_seconds": round(uniform(0.1, 2.0), 1)
        },
        "performance": {
            "queries_per_second": randint(500, 3000),
            "avg_query_time_ms": round(uniform(10, 100), 1),
            "slow_queries_per_hour": randint(0, 50),
            "cache_hit_ratio": round(uniform(85, 98), 1)
        },
        "storage": {
            "allocated_gb": randint(500, 3000),
            "used_gb": randint(300, 2500),
            "iops_baseline": randint(3000, 12000),
            "iops_burst_balance": round(uniform(50, 100), 1)
        },
        "scaling": {
            "read_replica_auto_scaling": True,
            "connection_pooling": True,
            "query_cache_enabled": True
        }
    }


async def _analyze_cache_state() -> Dict:
    """Analyze current cache resource state."""
    
    from random import randint, uniform
    
    return {
        "type": "cache",
        "clusters": [
            {
                "name": "primary-cache",
                "node_count": randint(3, 8),
                "node_type": "cache.r6g.large",
                "memory_utilization": round(uniform(40, 80), 1),
                "cpu_utilization": round(uniform(15, 60), 1),
                "network_utilization": round(uniform(20, 70), 1)
            }
        ],
        "performance": {
            "hit_rate_percent": round(uniform(85, 98), 1),
            "miss_rate_percent": round(uniform(2, 15), 1),
            "commands_per_second": randint(2000, 15000),
            "avg_latency_ms": round(uniform(0.5, 5.0), 2),
            "p99_latency_ms": round(uniform(2, 15), 1)
        },
        "memory": {
            "total_memory_gb": randint(24, 192),
            "used_memory_gb": randint(15, 150),
            "evictions_per_hour": randint(0, 200),
            "fragmentation_ratio": round(uniform(1.1, 1.8), 2)
        }
    }


async def _generate_utilization_summary(resources: Dict) -> Dict:
    """Generate overall utilization summary across all resources."""
    
    summary = {
        "overall_efficiency": 0,
        "resource_scores": {},
        "critical_resources": [],
        "underutilized_resources": [],
        "optimization_potential": 0
    }
    
    total_score = 0
    resource_count = 0
    
    for resource_type, resource_data in resources.items():
        if resource_type == "compute":
            cpu_util = resource_data["utilization"]["cpu_average"]
            memory_util = resource_data["utilization"]["memory_average"]
            score = _calculate_utilization_score([cpu_util, memory_util])
            
            if cpu_util > 80 or memory_util > 80:
                summary["critical_resources"].append(f"{resource_type}_utilization")
            elif cpu_util < 30 and memory_util < 30:
                summary["underutilized_resources"].append(f"{resource_type}_capacity")
                
        elif resource_type == "storage":
            storage_util = resource_data["volumes"]["utilization_percent"]
            iops_util = (resource_data["performance"]["iops_utilized"] / 
                        resource_data["performance"]["iops_provisioned"]) * 100
            score = _calculate_utilization_score([storage_util, iops_util])
            
            if storage_util > 85:
                summary["critical_resources"].append(f"{resource_type}_space")
                
        elif resource_type == "network":
            bandwidth_util = resource_data["bandwidth"]["utilization_percent"]
            score = _calculate_utilization_score([bandwidth_util])
            
            if bandwidth_util > 80:
                summary["critical_resources"].append(f"{resource_type}_bandwidth")
                
        elif resource_type == "database":
            cpu_util = resource_data["instances"]["primary"]["cpu_utilization"]
            memory_util = resource_data["instances"]["primary"]["memory_utilization"]
            connection_util = (resource_data["instances"]["primary"]["connection_count"] /
                             resource_data["instances"]["primary"]["connection_limit"]) * 100
            score = _calculate_utilization_score([cpu_util, memory_util, connection_util])
            
            if cpu_util > 80 or connection_util > 80:
                summary["critical_resources"].append(f"{resource_type}_capacity")
                
        elif resource_type == "cache":
            memory_util = resource_data["clusters"][0]["memory_utilization"]
            hit_rate = resource_data["performance"]["hit_rate_percent"]
            score = _calculate_utilization_score([memory_util, hit_rate])
            
            if hit_rate < 85:
                summary["critical_resources"].append(f"{resource_type}_efficiency")
        else:
            score = 75  # Default score
        
        summary["resource_scores"][resource_type] = round(score, 1)
        total_score += score
        resource_count += 1
    
    if resource_count > 0:
        summary["overall_efficiency"] = round(total_score / resource_count, 1)
        summary["optimization_potential"] = max(0, 90 - summary["overall_efficiency"])
    
    return summary


def _calculate_utilization_score(utilization_values: List[float]) -> float:
    """Calculate utilization efficiency score."""
    
    scores = []
    for util in utilization_values:
        # Optimal utilization is 60-75%
        if 60 <= util <= 75:
            scores.append(100)
        elif 50 <= util < 60 or 75 < util <= 85:
            scores.append(85)
        elif 40 <= util < 50 or 85 < util <= 90:
            scores.append(70)
        elif util < 40:
            scores.append(50)  # Underutilized
        else:  # util > 90
            scores.append(30)  # Over-utilized
    
    return sum(scores) / len(scores) if scores else 75


async def _identify_resource_bottlenecks(resources: Dict) -> List[Dict]:
    """Identify resource bottlenecks and constraints."""
    
    bottlenecks = []
    
    for resource_type, resource_data in resources.items():
        if resource_type == "compute":
            cpu_util = resource_data["utilization"]["cpu_average"]
            memory_util = resource_data["utilization"]["memory_average"]
            
            if cpu_util > 80:
                bottlenecks.append({
                    "resource": "compute_cpu",
                    "severity": "high" if cpu_util > 90 else "medium",
                    "current_utilization": cpu_util,
                    "threshold": 80,
                    "impact": "Performance degradation and response time increases"
                })
            
            if memory_util > 85:
                bottlenecks.append({
                    "resource": "compute_memory",
                    "severity": "high" if memory_util > 95 else "medium",
                    "current_utilization": memory_util,
                    "threshold": 85,
                    "impact": "Memory pressure leading to swapping and crashes"
                })
                
        elif resource_type == "storage":
            storage_util = resource_data["volumes"]["utilization_percent"]
            iops_util = (resource_data["performance"]["iops_utilized"] / 
                        resource_data["performance"]["iops_provisioned"]) * 100
            
            if storage_util > 85:
                bottlenecks.append({
                    "resource": "storage_space",
                    "severity": "critical" if storage_util > 95 else "high",
                    "current_utilization": storage_util,
                    "threshold": 85,
                    "impact": "Risk of storage exhaustion and application failures"
                })
                
            if iops_util > 80:
                bottlenecks.append({
                    "resource": "storage_iops",
                    "severity": "medium",
                    "current_utilization": iops_util,
                    "threshold": 80,
                    "impact": "I/O bottleneck causing slow database operations"
                })
                
        elif resource_type == "network":
            bandwidth_util = resource_data["bandwidth"]["utilization_percent"]
            
            if bandwidth_util > 80:
                bottlenecks.append({
                    "resource": "network_bandwidth",
                    "severity": "high" if bandwidth_util > 90 else "medium",
                    "current_utilization": bandwidth_util,
                    "threshold": 80,
                    "impact": "Network congestion affecting user experience"
                })
                
        elif resource_type == "database":
            cpu_util = resource_data["instances"]["primary"]["cpu_utilization"]
            connection_util = (resource_data["instances"]["primary"]["connection_count"] /
                             resource_data["instances"]["primary"]["connection_limit"]) * 100
            
            if cpu_util > 80:
                bottlenecks.append({
                    "resource": "database_cpu",
                    "severity": "high",
                    "current_utilization": cpu_util,
                    "threshold": 80,
                    "impact": "Database query performance degradation"
                })
                
            if connection_util > 80:
                bottlenecks.append({
                    "resource": "database_connections",
                    "severity": "critical" if connection_util > 95 else "high",
                    "current_utilization": connection_util,
                    "threshold": 80,
                    "impact": "Connection pool exhaustion blocking new requests"
                })
    
    # Sort by severity
    severity_order = {"critical": 3, "high": 2, "medium": 1, "low": 0}
    bottlenecks.sort(key=lambda x: severity_order.get(x["severity"], 0), reverse=True)
    
    return bottlenecks


async def _calculate_efficiency_metrics(resources: Dict) -> Dict:
    """Calculate resource efficiency metrics."""
    
    metrics = {
        "cost_efficiency": 0,
        "performance_efficiency": 0,
        "utilization_efficiency": 0,
        "scaling_efficiency": 0,
        "recommendations": []
    }
    
    efficiency_scores = []
    
    for resource_type, resource_data in resources.items():
        if resource_type == "compute":
            # Calculate compute efficiency
            cpu_util = resource_data["utilization"]["cpu_average"]
            instances = resource_data["instances"]["total"]
            auto_scaling = resource_data["auto_scaling"]["enabled"]
            
            compute_efficiency = (cpu_util / 100) * 0.6  # Utilization weight
            if auto_scaling:
                compute_efficiency += 0.2  # Auto-scaling bonus
            if 60 <= cpu_util <= 75:
                compute_efficiency += 0.2  # Optimal range bonus
                
            efficiency_scores.append(min(1.0, compute_efficiency) * 100)
            
        elif resource_type == "storage":
            # Calculate storage efficiency
            storage_util = resource_data["volumes"]["utilization_percent"]
            compression_enabled = resource_data["optimization"]["compression_enabled"]
            dedup_ratio = resource_data["optimization"]["deduplication_ratio"]
            
            storage_efficiency = (storage_util / 100) * 0.5
            if compression_enabled:
                storage_efficiency += 0.2
            if dedup_ratio > 2.0:
                storage_efficiency += 0.3
                
            efficiency_scores.append(min(1.0, storage_efficiency) * 100)
            
        elif resource_type == "cache":
            # Calculate cache efficiency
            hit_rate = resource_data["performance"]["hit_rate_percent"]
            memory_util = resource_data["clusters"][0]["memory_utilization"]
            
            cache_efficiency = (hit_rate / 100) * 0.7 + (memory_util / 100) * 0.3
            efficiency_scores.append(cache_efficiency * 100)
    
    if efficiency_scores:
        overall_efficiency = sum(efficiency_scores) / len(efficiency_scores)
        metrics["utilization_efficiency"] = round(overall_efficiency, 1)
        metrics["cost_efficiency"] = round(overall_efficiency * 0.9, 1)  # Cost follows utilization
        metrics["performance_efficiency"] = round(overall_efficiency * 1.1, 1)  # Performance related
        metrics["scaling_efficiency"] = round(overall_efficiency * 0.8, 1)  # Scaling opportunity
    
    # Generate efficiency recommendations
    if metrics["utilization_efficiency"] < 60:
        metrics["recommendations"].append("Right-size resources to improve cost efficiency")
    if metrics["performance_efficiency"] < 70:
        metrics["recommendations"].append("Optimize resource allocation for better performance")
    if metrics["scaling_efficiency"] < 50:
        metrics["recommendations"].append("Implement auto-scaling for dynamic resource management")
    
    return metrics


async def _perform_capacity_planning(current_state: Dict, capacity_target: str) -> Dict:
    """Perform capacity planning analysis."""
    
    analysis = {
        "capacity_target": capacity_target,
        "current_capacity": {},
        "projected_demand": {},
        "scaling_recommendations": {},
        "timeline": {},
        "growth_scenarios": {}
    }
    
    # Analyze current capacity
    analysis["current_capacity"] = await _assess_current_capacity(current_state)
    
    # Project future demand
    analysis["projected_demand"] = await _project_future_demand(current_state, capacity_target)
    
    # Generate scaling recommendations
    analysis["scaling_recommendations"] = await _recommend_capacity_changes(
        analysis["current_capacity"], analysis["projected_demand"]
    )
    
    # Create implementation timeline
    analysis["timeline"] = await _create_scaling_timeline(analysis["scaling_recommendations"])
    
    # Model different growth scenarios
    analysis["growth_scenarios"] = await _model_growth_scenarios(current_state)
    
    return analysis


async def _assess_current_capacity(current_state: Dict) -> Dict:
    """Assess current infrastructure capacity."""
    
    capacity = {
        "compute": {"utilization": 0, "headroom": 0, "max_capacity": 0},
        "storage": {"utilization": 0, "headroom": 0, "max_capacity": 0},
        "network": {"utilization": 0, "headroom": 0, "max_capacity": 0},
        "database": {"utilization": 0, "headroom": 0, "max_capacity": 0}
    }
    
    resources = current_state["resources"]
    
    if "compute" in resources:
        compute = resources["compute"]
        cpu_util = compute["utilization"]["cpu_average"]
        capacity["compute"]["utilization"] = cpu_util
        capacity["compute"]["headroom"] = 100 - cpu_util
        capacity["compute"]["max_capacity"] = compute["capacity"]["total_vcpus"]
    
    if "storage" in resources:
        storage = resources["storage"]
        storage_util = storage["volumes"]["utilization_percent"]
        capacity["storage"]["utilization"] = storage_util
        capacity["storage"]["headroom"] = 100 - storage_util
        capacity["storage"]["max_capacity"] = storage["volumes"]["total_size_gb"]
    
    if "network" in resources:
        network = resources["network"]
        bandwidth_util = network["bandwidth"]["utilization_percent"]
        capacity["network"]["utilization"] = bandwidth_util
        capacity["network"]["headroom"] = 100 - bandwidth_util
        capacity["network"]["max_capacity"] = network["bandwidth"]["total_capacity_gbps"]
    
    if "database" in resources:
        database = resources["database"]
        db_cpu_util = database["instances"]["primary"]["cpu_utilization"]
        capacity["database"]["utilization"] = db_cpu_util
        capacity["database"]["headroom"] = 100 - db_cpu_util
        capacity["database"]["max_capacity"] = 100  # Percentage based
    
    return capacity


async def _project_future_demand(current_state: Dict, capacity_target: str) -> Dict:
    """Project future resource demand based on trends and targets."""
    
    from random import uniform
    
    # Simulate demand projection based on capacity target
    if capacity_target == "auto":
        # Use historical growth patterns
        growth_rates = {
            "compute": uniform(5, 25),  # 5-25% growth
            "storage": uniform(10, 40),  # 10-40% growth
            "network": uniform(8, 30),   # 8-30% growth
            "database": uniform(3, 20)   # 3-20% growth
        }
    elif capacity_target.endswith("%"):
        # Use specified percentage target
        target_pct = float(capacity_target[:-1])
        growth_rates = {res: target_pct for res in ["compute", "storage", "network", "database"]}
    else:
        # Default moderate growth
        growth_rates = {res: 15 for res in ["compute", "storage", "network", "database"]}
    
    projection = {
        "timeframe": "6 months",
        "growth_assumptions": growth_rates,
        "projected_demand": {},
        "peak_demand_multiplier": 1.5,  # Peak traffic is 50% higher
        "seasonal_factors": {
            "q1": 0.9, "q2": 1.0, "q3": 1.1, "q4": 1.3  # Holiday season peak
        }
    }
    
    # Calculate projected demand for each resource
    current_capacity = await _assess_current_capacity(current_state)
    
    for resource_type, current_cap in current_capacity.items():
        if current_cap["utilization"] > 0:
            base_growth = growth_rates.get(resource_type, 15)
            current_util = current_cap["utilization"]
            
            # Project 6-month demand
            projected_util = current_util * (1 + base_growth / 100)
            peak_util = projected_util * projection["peak_demand_multiplier"]
            
            projection["projected_demand"][resource_type] = {
                "current_utilization": current_util,
                "projected_utilization": round(projected_util, 1),
                "peak_utilization": round(peak_util, 1),
                "growth_rate": base_growth,
                "capacity_needed": "increase" if projected_util > 75 else "maintain"
            }
    
    return projection


async def _recommend_capacity_changes(current_capacity: Dict, projected_demand: Dict) -> Dict:
    """Recommend specific capacity changes based on analysis."""
    
    recommendations = {
        "immediate_actions": [],
        "short_term_planning": [],
        "long_term_strategy": [],
        "cost_impact": {},
        "priority_matrix": {}
    }
    
    for resource_type, demand in projected_demand["projected_demand"].items():
        current_util = demand["current_utilization"]
        projected_util = demand["projected_utilization"]
        peak_util = demand["peak_utilization"]
        
        # Immediate actions (next 30 days)
        if current_util > 85:
            recommendations["immediate_actions"].append({
                "resource": resource_type,
                "action": "scale_up",
                "urgency": "high",
                "target": "reduce current utilization to <80%",
                "estimated_capacity_increase": "20-30%"
            })
        elif current_util < 30:
            recommendations["immediate_actions"].append({
                "resource": resource_type,
                "action": "scale_down",
                "urgency": "medium",
                "target": "optimize costs while maintaining 40%+ utilization",
                "estimated_capacity_decrease": "20-40%"
            })
        
        # Short-term planning (1-6 months)
        if projected_util > 75:
            recommendations["short_term_planning"].append({
                "resource": resource_type,
                "action": "capacity_expansion",
                "timeline": "next 3 months",
                "target": f"handle projected {projected_util}% utilization",
                "capacity_increase_needed": f"{max(0, projected_util - 75)}% above current"
            })
        
        # Long-term strategy (6+ months)
        if peak_util > 90:
            recommendations["long_term_strategy"].append({
                "resource": resource_type,
                "action": "infrastructure_redesign",
                "timeline": "6-12 months",
                "target": f"handle peak {peak_util}% demand",
                "strategy": "auto-scaling, load balancing, or architecture optimization"
            })
    
    # Priority matrix
    for resource_type in projected_demand["projected_demand"].keys():
        current = projected_demand["projected_demand"][resource_type]["current_utilization"]
        projected = projected_demand["projected_demand"][resource_type]["projected_utilization"]
        
        if current > 85 or projected > 90:
            priority = "critical"
        elif current > 75 or projected > 80:
            priority = "high"
        elif current < 30:
            priority = "medium"  # Cost optimization
        else:
            priority = "low"
        
        recommendations["priority_matrix"][resource_type] = priority
    
    return recommendations


async def _create_scaling_timeline(scaling_recommendations: Dict) -> Dict:
    """Create implementation timeline for scaling recommendations."""
    
    timeline = {
        "phases": [],
        "total_duration_weeks": 0,
        "dependencies": [],
        "milestones": []
    }
    
    # Phase 1: Immediate actions (Week 1-2)
    if scaling_recommendations["immediate_actions"]:
        timeline["phases"].append({
            "phase": "immediate_scaling",
            "duration_weeks": 2,
            "start_week": 1,
            "actions": scaling_recommendations["immediate_actions"],
            "deliverables": ["Critical resource bottlenecks resolved", "Immediate performance improvements"]
        })
    
    # Phase 2: Short-term capacity planning (Week 3-12)
    if scaling_recommendations["short_term_planning"]:
        timeline["phases"].append({
            "phase": "capacity_expansion",
            "duration_weeks": 10,
            "start_week": 3,
            "actions": scaling_recommendations["short_term_planning"],
            "deliverables": ["Resource capacity aligned with 6-month projections", "Auto-scaling policies implemented"]
        })
    
    # Phase 3: Long-term infrastructure optimization (Week 13-26)
    if scaling_recommendations["long_term_strategy"]:
        timeline["phases"].append({
            "phase": "strategic_optimization",
            "duration_weeks": 14,
            "start_week": 13,
            "actions": scaling_recommendations["long_term_strategy"],
            "deliverables": ["Architecture optimized for future growth", "Cost-efficient scaling strategy implemented"]
        })
    
    # Calculate total duration
    if timeline["phases"]:
        last_phase = timeline["phases"][-1]
        timeline["total_duration_weeks"] = last_phase["start_week"] + last_phase["duration_weeks"] - 1
    
    # Define key milestones
    timeline["milestones"] = [
        {"week": 2, "milestone": "Critical bottlenecks resolved"},
        {"week": 6, "milestone": "Auto-scaling policies active"},
        {"week": 12, "milestone": "Capacity aligned with 6-month demand"},
        {"week": 20, "milestone": "Long-term strategy implementation 50% complete"},
        {"week": 26, "milestone": "Infrastructure optimization complete"}
    ]
    
    return timeline


async def _model_growth_scenarios(current_state: Dict) -> Dict:
    """Model different growth scenarios for capacity planning."""
    
    from random import uniform
    
    scenarios = {
        "conservative": {"growth_rate": 10, "peak_multiplier": 1.2},
        "moderate": {"growth_rate": 20, "peak_multiplier": 1.5},
        "aggressive": {"growth_rate": 40, "peak_multiplier": 2.0},
        "exponential": {"growth_rate": 100, "peak_multiplier": 3.0}
    }
    
    scenario_analysis = {}
    
    for scenario_name, params in scenarios.items():
        growth_rate = params["growth_rate"]
        peak_multiplier = params["peak_multiplier"]
        
        scenario_analysis[scenario_name] = {
            "growth_rate_percent": growth_rate,
            "peak_multiplier": peak_multiplier,
            "resource_requirements": {},
            "cost_impact": f"{growth_rate * 0.8}% increase",  # Cost scales with capacity
            "timeline": f"{max(12, 52 - growth_rate)}+ weeks to implement",
            "risk_level": _assess_scenario_risk(growth_rate)
        }
        
        # Calculate resource requirements for each scenario
        utilization_summary = current_state["utilization_summary"]
        for resource_type, score in utilization_summary["resource_scores"].items():
            current_util = 75  # Approximate current utilization
            
            # Project utilization under this growth scenario
            projected_util = current_util * (1 + growth_rate / 100)
            peak_util = projected_util * peak_multiplier
            
            if peak_util > 100:
                capacity_increase_needed = ((peak_util - 75) / 75) * 100
                scenario_analysis[scenario_name]["resource_requirements"][resource_type] = {
                    "capacity_increase_needed": f"{round(capacity_increase_needed)}%",
                    "urgency": "high" if peak_util > 150 else "medium"
                }
    
    return scenario_analysis


def _assess_scenario_risk(growth_rate: float) -> str:
    """Assess risk level for growth scenario."""
    
    if growth_rate <= 15:
        return "low"
    elif growth_rate <= 30:
        return "medium"
    elif growth_rate <= 60:
        return "high"
    else:
        return "very_high"


async def _generate_scaling_recommendations(current_state: Dict, capacity_analysis: Dict) -> Dict:
    """Generate comprehensive scaling recommendations."""
    
    recommendations = {
        "priority_actions": [],
        "optimization_opportunities": [],
        "cost_savings": [],
        "performance_improvements": [],
        "automation_suggestions": []
    }
    
    bottlenecks = current_state["bottlenecks"]
    utilization_summary = current_state["utilization_summary"]
    scaling_recs = capacity_analysis["scaling_recommendations"]
    
    # Priority actions based on bottlenecks
    for bottleneck in bottlenecks[:3]:  # Top 3 bottlenecks
        if bottleneck["severity"] in ["critical", "high"]:
            recommendations["priority_actions"].append({
                "action": f"Scale up {bottleneck['resource']}",
                "reason": f"Current {bottleneck['current_utilization']}% exceeds {bottleneck['threshold']}% threshold",
                "impact": bottleneck["impact"],
                "timeline": "immediate",
                "estimated_improvement": "30-50% performance gain"
            })
    
    # Optimization opportunities
    for resource in utilization_summary["underutilized_resources"]:
        recommendations["optimization_opportunities"].append({
            "opportunity": f"Right-size {resource}",
            "potential_savings": "15-40% cost reduction",
            "implementation": "scale-down during low usage periods",
            "risk": "low"
        })
    
    # Cost savings recommendations
    if utilization_summary["optimization_potential"] > 20:
        recommendations["cost_savings"].append({
            "savings_opportunity": "Resource optimization",
            "potential_savings": f"{utilization_summary['optimization_potential']}% efficiency gain",
            "methods": ["Right-sizing", "Reserved instances", "Spot instances"],
            "estimated_monthly_savings": "$2,000-$10,000"
        })
    
    # Performance improvement suggestions
    recommendations["performance_improvements"].extend([
        {
            "improvement": "Implement auto-scaling",
            "benefit": "Automatic resource adjustment based on demand",
            "impact": "Reduced response times during peak loads"
        },
        {
            "improvement": "Optimize resource allocation",
            "benefit": "Better resource distribution across workloads",
            "impact": "15-25% performance improvement"
        }
    ])
    
    # Automation suggestions
    recommendations["automation_suggestions"].extend([
        {
            "automation": "Predictive scaling",
            "description": "Use ML to predict demand and scale proactively",
            "benefit": "Prevent performance degradation before it occurs"
        },
        {
            "automation": "Cost optimization automation",
            "description": "Automatically right-size resources based on usage patterns",
            "benefit": "Continuous cost optimization without manual intervention"
        }
    ])
    
    return recommendations


async def _create_auto_scaling_strategy(current_state: Dict, capacity_analysis: Dict) -> Dict:
    """Create comprehensive auto-scaling strategy."""
    
    strategy = {
        "scaling_policies": {},
        "metrics_configuration": {},
        "scaling_schedules": {},
        "cost_optimization": {},
        "monitoring_setup": {}
    }
    
    resources = current_state["resources"]
    projected_demand = capacity_analysis["projected_demand"]
    
    # Configure scaling policies for each resource type
    for resource_type in resources.keys():
        if resource_type == "compute":
            strategy["scaling_policies"][resource_type] = {
                "scale_out_policy": {
                    "metric": "CPU_Utilization",
                    "threshold": 75,
                    "action": "add_instances",
                    "adjustment": 2,
                    "cooldown": 300
                },
                "scale_in_policy": {
                    "metric": "CPU_Utilization", 
                    "threshold": 25,
                    "action": "remove_instances",
                    "adjustment": 1,
                    "cooldown": 600
                },
                "min_instances": 2,
                "max_instances": 20,
                "target_capacity": "80% CPU utilization"
            }
        
        elif resource_type == "storage":
            strategy["scaling_policies"][resource_type] = {
                "expansion_policy": {
                    "metric": "Storage_Utilization",
                    "threshold": 80,
                    "action": "expand_volume",
                    "adjustment": "20%",
                    "cooldown": 3600
                },
                "optimization_policy": {
                    "metric": "IOPS_Utilization",
                    "threshold": 70,
                    "action": "increase_iops",
                    "adjustment": "30%",
                    "cooldown": 1800
                }
            }
        
        elif resource_type == "database":
            strategy["scaling_policies"][resource_type] = {
                "read_replica_scaling": {
                    "metric": "Read_Latency",
                    "threshold": 100,  # ms
                    "action": "add_read_replica",
                    "adjustment": 1,
                    "cooldown": 1800
                },
                "connection_scaling": {
                    "metric": "Connection_Utilization",
                    "threshold": 80,
                    "action": "increase_max_connections",
                    "adjustment": "20%",
                    "cooldown": 3600
                }
            }
    
    # Configure metrics and monitoring
    strategy["metrics_configuration"] = {
        "collection_interval": 60,  # seconds
        "retention_period": 90,     # days
        "custom_metrics": [
            "Application_Response_Time",
            "Queue_Length",
            "Active_Users",
            "Transaction_Rate"
        ],
        "alerting_thresholds": {
            "cpu_high": 85,
            "memory_high": 90,
            "disk_high": 85,
            "network_high": 80
        }
    }
    
    # Schedule-based scaling
    strategy["scaling_schedules"] = {
        "business_hours": {
            "schedule": "Mon-Fri 08:00-18:00",
            "target_capacity": "100%",
            "min_instances": 3
        },
        "off_hours": {
            "schedule": "Mon-Fri 18:00-08:00, Sat-Sun all day",
            "target_capacity": "60%",
            "min_instances": 2
        },
        "peak_season": {
            "schedule": "Nov-Dec",
            "target_capacity": "150%",
            "min_instances": 5
        }
    }
    
    # Cost optimization strategies
    strategy["cost_optimization"] = {
        "spot_instances": {
            "enabled": True,
            "percentage": 50,
            "fallback": "on_demand"
        },
        "reserved_instances": {
            "baseline_capacity": 30,
            "term": "1_year",
            "payment": "partial_upfront"
        },
        "rightsizing": {
            "analysis_frequency": "weekly",
            "auto_adjust": True,
            "cost_threshold": "10%"
        }
    }
    
    return strategy


async def _analyze_scaling_costs(current_state: Dict, capacity_analysis: Dict) -> Dict:
    """Analyze cost impact of scaling recommendations."""
    
    from random import uniform, randint
    
    cost_analysis = {
        "current_monthly_cost": 0,
        "projected_monthly_cost": 0,
        "cost_breakdown": {},
        "savings_opportunities": {},
        "roi_analysis": {}
    }
    
    # Simulate current costs
    resources = current_state["resources"]
    
    base_costs = {
        "compute": randint(5000, 20000),
        "storage": randint(1000, 8000),
        "network": randint(500, 3000),
        "database": randint(2000, 12000),
        "cache": randint(300, 2000)
    }
    
    total_current_cost = 0
    for resource_type in resources.keys():
        cost = base_costs.get(resource_type, 1000)
        cost_analysis["cost_breakdown"][resource_type] = {
            "current_monthly": cost,
            "projected_monthly": 0,
            "change_percent": 0
        }
        total_current_cost += cost
    
    cost_analysis["current_monthly_cost"] = total_current_cost
    
    # Calculate projected costs based on scaling recommendations
    scaling_recs = capacity_analysis["scaling_recommendations"]
    total_projected_cost = total_current_cost
    
    for resource_type, cost_info in cost_analysis["cost_breakdown"].items():
        # Apply scaling impact to costs
        growth_factor = 1.0
        
        # Check if resource needs scaling
        priority = scaling_recs["priority_matrix"].get(resource_type, "low")
        if priority == "critical":
            growth_factor = uniform(1.3, 1.8)  # 30-80% increase
        elif priority == "high":
            growth_factor = uniform(1.15, 1.4)  # 15-40% increase
        elif priority == "medium":
            growth_factor = uniform(0.8, 1.1)  # Cost optimization potential
        
        projected_cost = int(cost_info["current_monthly"] * growth_factor)
        cost_info["projected_monthly"] = projected_cost
        cost_info["change_percent"] = round(((projected_cost - cost_info["current_monthly"]) / 
                                           cost_info["current_monthly"]) * 100, 1)
        
        total_projected_cost += (projected_cost - cost_info["current_monthly"])
    
    cost_analysis["projected_monthly_cost"] = int(total_projected_cost)
    
    # Identify savings opportunities
    underutilized = current_state["utilization_summary"]["underutilized_resources"]
    if underutilized:
        potential_savings = int(total_current_cost * uniform(0.1, 0.3))
        cost_analysis["savings_opportunities"] = {
            "rightsizing_savings": potential_savings,
            "automation_savings": int(total_current_cost * 0.05),
            "reserved_instance_savings": int(total_current_cost * 0.2),
            "total_potential_savings": potential_savings + int(total_current_cost * 0.25)
        }
    
    # ROI analysis
    implementation_cost = randint(10000, 50000)
    monthly_savings = cost_analysis.get("savings_opportunities", {}).get("total_potential_savings", 0)
    
    if monthly_savings > 0:
        payback_months = implementation_cost / monthly_savings
        cost_analysis["roi_analysis"] = {
            "implementation_cost": implementation_cost,
            "monthly_savings": monthly_savings,
            "payback_period_months": round(payback_months, 1),
            "annual_roi_percent": round(((monthly_savings * 12 - implementation_cost) / 
                                       implementation_cost) * 100, 1)
        }
    
    return cost_analysis


def _format_current_state(current_state: Dict) -> str:
    """Format current resource state for display."""
    
    utilization = current_state["utilization_summary"]
    bottlenecks = current_state["bottlenecks"]
    
    state_info = f"""Overall Efficiency: {utilization['overall_efficiency']}/100
Optimization Potential: {utilization['optimization_potential']}%

**Resource Utilization:**"""
    
    for resource, score in utilization["resource_scores"].items():
        status_icon = "🟢" if score >= 80 else "🟡" if score >= 60 else "🔴"
        state_info += f"\n{status_icon} {resource.title()}: {score}/100"
    
    if bottlenecks:
        state_info += "\n\n**Critical Bottlenecks:**"
        for bottleneck in bottlenecks[:3]:
            severity_icon = {"critical": "🚨", "high": "🔴", "medium": "🟡"}.get(bottleneck["severity"], "⚪")
            state_info += f"\n{severity_icon} {bottleneck['resource']}: {bottleneck['current_utilization']}% (threshold: {bottleneck['threshold']}%)"
    
    return state_info


def _format_capacity_analysis(capacity_analysis: Dict) -> str:
    """Format capacity analysis for display."""
    
    projected = capacity_analysis["projected_demand"]
    timeline = capacity_analysis["timeline"]
    
    analysis_info = f"""**Demand Projection ({projected['timeframe']}):**"""
    
    for resource, demand in projected["projected_demand"].items():
        trend_icon = "📈" if demand["growth_rate"] > 20 else "📊" if demand["growth_rate"] > 10 else "📉"
        analysis_info += f"\n{trend_icon} {resource.title()}: {demand['current_utilization']}% → {demand['projected_utilization']}% (+{demand['growth_rate']}%)"
    
    if timeline["phases"]:
        analysis_info += f"\n\n**Implementation Timeline:** {timeline['total_duration_weeks']} weeks"
        for phase in timeline["phases"]:
            analysis_info += f"\n• {phase['phase'].replace('_', ' ').title()}: Week {phase['start_week']}-{phase['start_week'] + phase['duration_weeks'] - 1}"
    
    return analysis_info


def _format_scaling_recommendations(recommendations: Dict) -> str:
    """Format scaling recommendations for display."""
    
    rec_info = ""
    
    if recommendations["priority_actions"]:
        rec_info += "**Immediate Priority Actions:**"
        for action in recommendations["priority_actions"][:3]:
            rec_info += f"\n🚨 {action['action']}: {action['reason']}"
    
    if recommendations["optimization_opportunities"]:
        rec_info += "\n\n**Optimization Opportunities:**"
        for opp in recommendations["optimization_opportunities"][:3]:
            rec_info += f"\n💡 {opp['opportunity']}: {opp['potential_savings']} savings"
    
    if recommendations["cost_savings"]:
        rec_info += "\n\n**Cost Optimization:**"
        for saving in recommendations["cost_savings"]:
            rec_info += f"\n💰 {saving['savings_opportunity']}: {saving['potential_savings']}"
    
    return rec_info


def _format_auto_scaling_strategy(strategy: Dict) -> str:
    """Format auto-scaling strategy for display."""
    
    strategy_info = "**Scaling Policies Configured:**"
    
    for resource, policies in strategy["scaling_policies"].items():
        strategy_info += f"\n🤖 {resource.title()}:"
        if "scale_out_policy" in policies:
            strategy_info += f"\n   • Scale out at {policies['scale_out_policy']['threshold']}% {policies['scale_out_policy']['metric']}"
        if "scale_in_policy" in policies:
            strategy_info += f"\n   • Scale in at {policies['scale_in_policy']['threshold']}% {policies['scale_in_policy']['metric']}"
    
    if strategy["scaling_schedules"]:
        strategy_info += "\n\n**Scheduled Scaling:**"
        for schedule_name, schedule in strategy["scaling_schedules"].items():
            strategy_info += f"\n📅 {schedule_name.replace('_', ' ').title()}: {schedule['target_capacity']} capacity"
    
    return strategy_info


def _format_cost_analysis(cost_analysis: Dict) -> str:
    """Format cost analysis for display."""
    
    current_cost = cost_analysis["current_monthly_cost"]
    projected_cost = cost_analysis["projected_monthly_cost"]
    cost_change = projected_cost - current_cost
    
    cost_info = f"""**Monthly Cost Analysis:**
Current: ${current_cost:,}
Projected: ${projected_cost:,}
Change: ${cost_change:+,} ({((cost_change/current_cost)*100):+.1f}%)"""
    
    if "savings_opportunities" in cost_analysis:
        savings = cost_analysis["savings_opportunities"]
        cost_info += f"\n\n**Savings Potential:**"
        cost_info += f"\n💰 Right-sizing: ${savings.get('rightsizing_savings', 0):,}/month"
        cost_info += f"\n🤖 Automation: ${savings.get('automation_savings', 0):,}/month"
        cost_info += f"\n📋 Reserved Instances: ${savings.get('reserved_instance_savings', 0):,}/month"
    
    if "roi_analysis" in cost_analysis:
        roi = cost_analysis["roi_analysis"]
        cost_info += f"\n\n**ROI Analysis:**"
        cost_info += f"\n📊 Payback Period: {roi['payback_period_months']} months"
        cost_info += f"\n📈 Annual ROI: {roi['annual_roi_percent']}%"
    
    return cost_info


def _format_performance_optimization(current_state: Dict, capacity_analysis: Dict) -> str:
    """Format performance optimization recommendations."""
    
    bottlenecks = current_state["bottlenecks"]
    
    perf_info = "**Performance Improvements:**"
    
    if bottlenecks:
        for bottleneck in bottlenecks[:3]:
            if bottleneck["severity"] in ["critical", "high"]:
                improvement = "50-80%" if bottleneck["severity"] == "critical" else "30-50%"
                perf_info += f"\n⚡ Resolve {bottleneck['resource']}: {improvement} performance gain"
    
    perf_info += "\n\n**Optimization Strategies:**"
    perf_info += "\n🔄 Auto-scaling: Automatic performance adjustment"
    perf_info += "\n📊 Load balancing: Better traffic distribution"
    perf_info += "\n💾 Caching optimization: Reduced response times"
    perf_info += "\n🗄️ Database optimization: Query performance improvement"
    
    return perf_info


def _format_growth_projections(capacity_analysis: Dict) -> str:
    """Format growth projection scenarios."""
    
    scenarios = capacity_analysis["growth_scenarios"]
    
    growth_info = "**Growth Scenario Planning:**"
    
    for scenario_name, scenario in scenarios.items():
        risk_icon = {"low": "🟢", "medium": "🟡", "high": "🔴", "very_high": "🚨"}.get(scenario["risk_level"], "⚪")
        growth_info += f"\n{risk_icon} {scenario_name.title()}: {scenario['growth_rate_percent']}% growth, {scenario['cost_impact']} cost impact"
    
    return growth_info


def _format_implementation_plan(scaling_recommendations: Dict, auto_scaling_strategy: Dict) -> str:
    """Format implementation plan."""
    
    plan_info = "**Phase 1: Immediate Actions (Week 1-2)**"
    for action in scaling_recommendations["priority_actions"][:2]:
        plan_info += f"\n• {action['action']} - {action['timeline']}"
    
    plan_info += "\n\n**Phase 2: Auto-scaling Setup (Week 3-4)**"
    plan_info += "\n• Configure scaling policies and metrics"
    plan_info += "\n• Set up monitoring and alerting"
    plan_info += "\n• Test scaling behavior"
    
    plan_info += "\n\n**Phase 3: Optimization (Week 5-8)**"
    plan_info += "\n• Implement cost optimization strategies"
    plan_info += "\n• Fine-tune scaling parameters"
    plan_info += "\n• Establish monitoring dashboards"
    
    return plan_info


def _format_recommended_actions(recommendations: Dict, resource_focus: str) -> str:
    """Format recommended next actions."""
    
    actions = [
        f"1. 🔍 Run `monitor-services {resource_focus}` to verify current resource state",
        f"2. 📈 Execute `scale-resources {resource_focus} auto` for optimal scaling",
        f"3. 📊 Monitor with `monitor-services detailed` during scaling operations",
        f"4. 🔍 Analyze impact with `analyze-logs application 1h` after scaling"
    ]
    
    if recommendations["priority_actions"]:
        actions.insert(1, "1.5. 🚨 Address critical bottlenecks identified in priority actions")
    
    if recommendations["cost_savings"]:
        actions.append("5. 💰 Review cost optimization opportunities for additional savings")
    
    return "\n".join(actions)


def _get_optimization_status(current_state: Dict, capacity_analysis: Dict) -> str:
    """Determine optimization readiness status."""
    
    efficiency = current_state["utilization_summary"]["overall_efficiency"]
    critical_bottlenecks = len([b for b in current_state["bottlenecks"] if b["severity"] == "critical"])
    
    if critical_bottlenecks > 0:
        return "CRITICAL ACTION REQUIRED"
    elif efficiency < 50:
        return "OPTIMIZATION NEEDED"
    elif efficiency < 75:
        return "IMPROVEMENT RECOMMENDED"
    else:
        return "WELL OPTIMIZED"
