"""
Scale Resources Tool
Scale infrastructure resources up or down based on demand and metrics.
"""

import json
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List
import random


async def scale_resources_tool(
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
    
    Returns:
        Dict containing scaling operation results and recommendations
    """
    
    # Validate inputs
    valid_resource_types = ["compute", "storage", "network", "database", "cache"]
    if resource_type not in valid_resource_types:
        resource_type = "compute"
    
    target_capacity = max(10, min(1000, target_capacity))  # Reasonable bounds
    
    # Initialize scaling operation
    scaling_data = {
        "operation_id": f"scale-{resource_type}-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
        "resource_type": resource_type,
        "target_capacity": target_capacity,
        "auto_scaling_enabled": auto_scaling,
        "metrics_based_enabled": metrics_based,
        "start_time": datetime.now().isoformat(),
        "status": "initializing",
        "current_state": {},
        "target_state": {},
        "scaling_actions": [],
        "metrics": {},
        "recommendations": []
    }
    
    try:
        # Assess current resource state
        current_state = await _assess_current_resource_state(resource_type)
        scaling_data["current_state"] = current_state
        
        # Calculate target state
        target_state = await _calculate_target_state(
            current_state, target_capacity, metrics_based
        )
        scaling_data["target_state"] = target_state
        
        # Determine if scaling is needed
        scaling_needed = await _evaluate_scaling_necessity(current_state, target_state)
        
        if not scaling_needed["required"]:
            scaling_data["status"] = "no_action_needed"
            scaling_data["reason"] = scaling_needed["reason"]
        else:
            # Execute scaling operations
            scaling_result = await _execute_scaling_operations(
                resource_type, current_state, target_state, auto_scaling
            )
            scaling_data.update(scaling_result)
        
        # Configure auto-scaling policies if requested
        if auto_scaling and scaling_data["status"] in ["completed", "no_action_needed"]:
            auto_scaling_config = await _configure_auto_scaling(
                resource_type, target_state, metrics_based
            )
            scaling_data["auto_scaling_config"] = auto_scaling_config
        
        # Collect post-scaling metrics
        scaling_data["metrics"] = await _collect_scaling_metrics(
            resource_type, scaling_data
        )
        
        # Generate recommendations
        scaling_data["recommendations"] = await _generate_scaling_recommendations(
            scaling_data
        )
        
        scaling_data["end_time"] = datetime.now().isoformat()
        scaling_data["duration_minutes"] = 2.5
        
    except Exception as e:
        scaling_data["status"] = "failed"
        scaling_data["error"] = str(e)
        scaling_data["end_time"] = datetime.now().isoformat()
    
    return scaling_data


async def _assess_current_resource_state(resource_type: str) -> Dict:
    """Assess current state of the specified resource type."""
    
    if resource_type == "compute":
        return {
            "resource_type": "compute",
            "instances": {
                "running": random.randint(8, 15),
                "stopped": random.randint(0, 3),
                "total": 12
            },
            "utilization": {
                "avg_cpu_percent": random.uniform(45, 75),
                "avg_memory_percent": random.uniform(50, 80),
                "peak_cpu_percent": random.uniform(75, 95)
            }
        }
    elif resource_type == "storage":
        return {
            "resource_type": "storage",
            "volumes": {
                "total_size_gb": random.randint(5000, 15000),
                "utilization_percent": random.uniform(60, 85)
            }
        }
    else:
        return {"resource_type": resource_type, "placeholder": True}


async def _calculate_target_state(current_state: Dict, target_capacity: int, metrics_based: bool) -> Dict:
    """Calculate target resource state."""
    resource_type = current_state["resource_type"]
    
    if resource_type == "compute":
        current_instances = current_state["instances"]["running"]
        scale_factor = target_capacity / 100
        target_instances = max(1, round(current_instances * scale_factor))
        
        return {
            "resource_type": resource_type,
            "instances": {
                "target_running": target_instances,
                "current_running": current_instances,
                "change": target_instances - current_instances
            }
        }
    else:
        return {"resource_type": resource_type}


async def _evaluate_scaling_necessity(current_state: Dict, target_state: Dict) -> Dict:
    """Evaluate if scaling is needed."""
    if current_state["resource_type"] == "compute":
        change = target_state["instances"]["change"]
        if abs(change) < 1:
            return {"required": False, "reason": "No significant change needed"}
    
    return {"required": True, "reason": "Scaling will improve utilization"}


async def _execute_scaling_operations(resource_type: str, current_state: Dict, target_state: Dict, auto_scaling: bool) -> Dict:
    """Execute scaling operations."""
    await asyncio.sleep(0.2)  # Simulate operation time
    
    return {
        "status": "completed" if random.random() > 0.1 else "failed",
        "scaling_actions": [
            {
                "action": f"scale_{resource_type}",
                "status": "completed",
                "timestamp": datetime.now().isoformat()
            }
        ]
    }


async def _configure_auto_scaling(resource_type: str, target_state: Dict, metrics_based: bool) -> Dict:
    """Configure auto-scaling policies."""
    return {
        "enabled": True,
        "resource_type": resource_type,
        "policies": [
            {
                "name": "scale_up_policy",
                "metric": "cpu_utilization",
                "threshold": 75
            }
        ]
    }


async def _collect_scaling_metrics(resource_type: str, scaling_data: Dict) -> Dict:
    """Collect scaling metrics."""
    return {
        "collection_time": datetime.now().isoformat(),
        "resource_type": resource_type,
        "operation_success": scaling_data["status"] == "completed"
    }


async def _generate_scaling_recommendations(scaling_data: Dict) -> List[str]:
    """Generate scaling recommendations."""
    status = scaling_data["status"]
    
    if status == "completed":
        return [
            "✅ Scaling completed successfully",
            "📊 Monitor performance metrics",
            "🔍 Verify application performance"
        ]
    elif status == "failed":
        return [
            "❌ Scaling operation failed",
            "🔍 Check resource quotas",
            "🔄 Retry after resolving issues"
        ]
    else:
        return [
            "✅ Resources already optimally sized",
            "📈 Continue monitoring trends"
        ]
