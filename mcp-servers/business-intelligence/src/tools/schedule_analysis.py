"""
Schedule Analysis Tool
Set up automated recurring insights and monitoring.
"""

import pandas as pd
import json
from typing import Dict, Any, List, Optional
from pathlib import Path
from datetime import datetime, timedelta
import croniter
import uuid


async def schedule_analysis_tool(
    analysis_config: Dict[str, Any],
    schedule: str = "0 9 * * 1",  # Default: Monday 9am
    notification_channels: List[str] = [],
    alert_conditions: Dict[str, Any] = {}
) -> Dict[str, Any]:
    """
    Set up automated recurring insights and monitoring.
    """
    
    try:
        # Validate parameters
        validation_result = await _validate_schedule_params(
            analysis_config, schedule, notification_channels, alert_conditions
        )
        if "error" in validation_result:
            return validation_result
        
        # Create schedule configuration
        schedule_config = await _create_schedule_config(
            analysis_config, schedule, notification_channels, alert_conditions
        )
        
        # Validate cron expression
        schedule_info = await _parse_schedule(schedule)
        
        # Store schedule (in real implementation, this would be stored in a job scheduler)
        storage_result = await _store_schedule(schedule_config)
        
        # Generate monitoring setup
        monitoring_setup = await _setup_monitoring(schedule_config, alert_conditions)
        
        return {
            "schedule_status": "created",
            "schedule_id": schedule_config["id"],
            "analysis_type": schedule_config["analysis_type"],
            "schedule_info": schedule_info,
            "next_runs": await _calculate_next_runs(schedule, 5),
            "monitoring": monitoring_setup,
            "configuration": {
                "analysis_config": analysis_config,
                "schedule": schedule,
                "notification_channels": notification_channels,
                "alert_conditions": alert_conditions
            },
            "management": {
                "status": "active",
                "created_at": datetime.now().isoformat(),
                "can_modify": True,
                "can_pause": True,
                "can_delete": True
            },
            "recommendations": await _generate_schedule_recommendations(schedule_config)
        }
        
    except Exception as e:
        return {
            "schedule_status": "failed",
            "error": f"Failed to create scheduled analysis: {str(e)}",
            "troubleshooting": [
                "Verify cron expression is valid",
                "Check analysis configuration is complete",
                "Ensure notification channels are valid",
                "Verify alert conditions are properly structured"
            ]
        }


async def _validate_schedule_params(
    analysis_config: Dict[str, Any],
    schedule: str,
    notification_channels: List[str],
    alert_conditions: Dict[str, Any]
) -> Dict[str, Any]:
    """Validate scheduling parameters."""
    
    # Validate analysis configuration
    if not analysis_config:
        return {
            "error": "Analysis configuration is required",
            "suggestion": "Provide analysis type and parameters"
        }
    
    required_fields = ["analysis_type", "dataset_name"]
    missing_fields = [field for field in required_fields if field not in analysis_config]
    if missing_fields:
        return {
            "error": f"Missing required fields in analysis config: {missing_fields}",
            "required_fields": required_fields,
            "suggestion": "Ensure analysis configuration includes all required fields"
        }
    
    # Validate analysis type
    supported_analysis_types = [
        "correlation", "profiling", "trend", "visualization", "insight_investigation"
    ]
    if analysis_config["analysis_type"] not in supported_analysis_types:
        return {
            "error": f"Unsupported analysis type: {analysis_config['analysis_type']}",
            "supported_types": supported_analysis_types,
            "suggestion": "Choose from supported analysis types"
        }
    
    # Validate cron expression
    try:
        cron = croniter.croniter(schedule)
        # Test that we can get next execution
        next_run = cron.get_next(datetime)
    except (ValueError, TypeError) as e:
        return {
            "error": f"Invalid cron expression: {schedule}",
            "cron_error": str(e),
            "suggestion": "Use valid cron format (minute hour day month weekday)",
            "examples": [
                "0 9 * * 1 (Every Monday at 9 AM)",
                "0 0 1 * * (First day of every month at midnight)",
                "0 */6 * * * (Every 6 hours)",
                "30 8 * * 1-5 (8:30 AM on weekdays)"
            ]
        }
    
    # Validate notification channels
    if notification_channels:
        supported_channels = ["email", "slack", "webhook", "file", "console"]
        invalid_channels = [ch for ch in notification_channels if ch not in supported_channels]
        if invalid_channels:
            return {
                "error": f"Unsupported notification channels: {invalid_channels}",
                "supported_channels": supported_channels,
                "suggestion": "Use supported notification channels"
            }
    
    return {"status": "valid"}


async def _create_schedule_config(
    analysis_config: Dict[str, Any],
    schedule: str,
    notification_channels: List[str],
    alert_conditions: Dict[str, Any]
) -> Dict[str, Any]:
    """Create comprehensive schedule configuration."""
    
    schedule_id = str(uuid.uuid4())
    
    config = {
        "id": schedule_id,
        "name": f"{analysis_config['analysis_type']}_analysis_{analysis_config['dataset_name']}",
        "description": f"Automated {analysis_config['analysis_type']} analysis for {analysis_config['dataset_name']}",
        "analysis_type": analysis_config["analysis_type"],
        "analysis_config": analysis_config.copy(),
        "schedule": {
            "cron_expression": schedule,
            "timezone": "UTC",  # In real implementation, use user's timezone
            "enabled": True
        },
        "notifications": {
            "channels": notification_channels,
            "on_success": True,
            "on_failure": True,
            "on_alert": True,
            "custom_templates": {}
        },
        "alerts": {
            "conditions": alert_conditions,
            "enabled": bool(alert_conditions)
        },
        "execution": {
            "timeout_minutes": 30,
            "retry_attempts": 3,
            "retry_delay_minutes": 5
        },
        "output": {
            "save_results": True,
            "output_path": f"scheduled_analysis/{schedule_id}",
            "retain_days": 90,
            "formats": ["json", "html"]
        },
        "metadata": {
            "created_at": datetime.now().isoformat(),
            "created_by": "BI MCP Server",
            "version": "1.0.0",
            "status": "active"
        }
    }
    
    return config


async def _parse_schedule(schedule: str) -> Dict[str, Any]:
    """Parse and interpret cron schedule."""
    
    try:
        cron = croniter.croniter(schedule)
        
        # Get next few executions
        now = datetime.now()
        next_runs = []
        for _ in range(3):
            next_run = cron.get_next(datetime)
            next_runs.append(next_run.isoformat())
        
        # Parse schedule components
        parts = schedule.split()
        if len(parts) != 5:
            raise ValueError("Cron expression must have 5 parts")
        
        minute, hour, day, month, weekday = parts
        
        # Generate human-readable description
        description = await _generate_schedule_description(schedule, minute, hour, day, month, weekday)
        
        return {
            "cron_expression": schedule,
            "description": description,
            "next_executions": next_runs,
            "components": {
                "minute": minute,
                "hour": hour,
                "day": day,
                "month": month,
                "weekday": weekday
            },
            "valid": True
        }
    
    except Exception as e:
        return {
            "cron_expression": schedule,
            "description": "Invalid schedule",
            "error": str(e),
            "valid": False
        }


async def _generate_schedule_description(schedule: str, minute: str, hour: str, day: str, month: str, weekday: str) -> str:
    """Generate human-readable schedule description."""
    
    # Common patterns
    if schedule == "0 9 * * 1":
        return "Every Monday at 9:00 AM"
    elif schedule == "0 0 1 * *":
        return "First day of every month at midnight"
    elif schedule == "0 */6 * * *":
        return "Every 6 hours"
    elif schedule == "30 8 * * 1-5":
        return "8:30 AM on weekdays"
    
    # Build description from components
    desc_parts = []
    
    # Frequency
    if minute == "0" and hour != "*":
        if hour.startswith("*/"):
            freq = hour[2:]
            desc_parts.append(f"Every {freq} hours")
        else:
            desc_parts.append(f"At {hour}:00")
    elif minute != "*" and hour != "*":
        desc_parts.append(f"At {hour}:{minute.zfill(2)}")
    elif minute.startswith("*/"):
        freq = minute[2:]
        desc_parts.append(f"Every {freq} minutes")
    
    # Day patterns
    if weekday != "*":
        if weekday.isdigit():
            days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            desc_parts.append(f"on {days[int(weekday)]}")
        elif "-" in weekday:
            desc_parts.append("on weekdays" if weekday == "1-5" else f"on days {weekday}")
    elif day != "*":
        if day.isdigit():
            desc_parts.append(f"on day {day} of the month")
        else:
            desc_parts.append(f"on day {day}")
    
    # Month
    if month != "*":
        if month.isdigit():
            months = ["", "January", "February", "March", "April", "May", "June",
                     "July", "August", "September", "October", "November", "December"]
            desc_parts.append(f"in {months[int(month)]}")
    
    return " ".join(desc_parts) if desc_parts else "Complex schedule"


async def _calculate_next_runs(schedule: str, count: int = 5) -> List[Dict[str, str]]:
    """Calculate next scheduled runs."""
    
    try:
        cron = croniter.croniter(schedule)
        next_runs = []
        
        for i in range(count):
            next_run = cron.get_next(datetime)
            
            # Calculate time until execution
            time_until = next_run - datetime.now()
            
            next_runs.append({
                "datetime": next_run.isoformat(),
                "formatted": next_run.strftime("%Y-%m-%d %H:%M:%S"),
                "relative": _format_time_delta(time_until),
                "timestamp": int(next_run.timestamp())
            })
        
        return next_runs
    
    except Exception:
        return []


def _format_time_delta(delta: timedelta) -> str:
    """Format time delta in human-readable format."""
    
    total_seconds = int(delta.total_seconds())
    
    if total_seconds < 60:
        return f"in {total_seconds} seconds"
    elif total_seconds < 3600:
        minutes = total_seconds // 60
        return f"in {minutes} minute{'s' if minutes != 1 else ''}"
    elif total_seconds < 86400:
        hours = total_seconds // 3600
        return f"in {hours} hour{'s' if hours != 1 else ''}"
    else:
        days = total_seconds // 86400
        return f"in {days} day{'s' if days != 1 else ''}"


async def _store_schedule(schedule_config: Dict[str, Any]) -> Dict[str, Any]:
    """Store schedule configuration (mock implementation)."""
    
    # In real implementation, this would store in a persistent job scheduler
    # like Celery, APScheduler, or a database with a cron processor
    
    storage_path = Path(__file__).parent.parent.parent / "schedules"
    storage_path.mkdir(exist_ok=True)
    
    schedule_file = storage_path / f"{schedule_config['id']}.json"
    
    try:
        with open(schedule_file, 'w') as f:
            json.dump(schedule_config, f, indent=2, default=str)
        
        return {
            "stored": True,
            "storage_path": str(schedule_file),
            "schedule_id": schedule_config["id"]
        }
    
    except Exception as e:
        return {
            "stored": False,
            "error": f"Failed to store schedule: {str(e)}"
        }


async def _setup_monitoring(
    schedule_config: Dict[str, Any],
    alert_conditions: Dict[str, Any]
) -> Dict[str, Any]:
    """Setup monitoring and alerting for scheduled analysis."""
    
    monitoring = {
        "enabled": True,
        "metrics_tracked": [
            "execution_time",
            "success_rate",
            "data_quality_score",
            "result_changes"
        ],
        "alert_types": [],
        "dashboards": [],
        "health_checks": {
            "data_availability": True,
            "execution_success": True,
            "result_quality": True
        }
    }
    
    # Setup alert types based on conditions
    if alert_conditions:
        for condition_type, condition_value in alert_conditions.items():
            if condition_type == "data_quality_threshold":
                monitoring["alert_types"].append({
                    "type": "data_quality",
                    "threshold": condition_value,
                    "description": f"Alert when data quality drops below {condition_value}%"
                })
            
            elif condition_type == "significant_change":
                monitoring["alert_types"].append({
                    "type": "trend_change",
                    "threshold": condition_value,
                    "description": f"Alert when key metrics change by more than {condition_value}%"
                })
            
            elif condition_type == "execution_failure":
                monitoring["alert_types"].append({
                    "type": "execution_failure",
                    "description": "Alert when scheduled analysis fails"
                })
            
            elif condition_type == "correlation_threshold":
                monitoring["alert_types"].append({
                    "type": "correlation_alert",
                    "threshold": condition_value,
                    "description": f"Alert when correlations exceed {condition_value}"
                })
    
    # Default alerts
    monitoring["alert_types"].extend([
        {
            "type": "execution_failure",
            "description": "Alert when scheduled analysis fails to execute"
        },
        {
            "type": "data_unavailable",
            "description": "Alert when source data is not available"
        }
    ])
    
    # Setup dashboard recommendations
    analysis_type = schedule_config["analysis_type"]
    
    if analysis_type == "correlation":
        monitoring["dashboards"].append({
            "name": "Correlation Monitoring",
            "metrics": ["correlation_strength", "significant_relationships", "data_quality"],
            "refresh_rate": "hourly"
        })
    
    elif analysis_type == "trend":
        monitoring["dashboards"].append({
            "name": "Trend Analysis Dashboard",
            "metrics": ["trend_direction", "seasonality", "forecast_accuracy"],
            "refresh_rate": "daily"
        })
    
    elif analysis_type == "profiling":
        monitoring["dashboards"].append({
            "name": "Data Quality Dashboard",
            "metrics": ["completeness", "consistency", "data_drift"],
            "refresh_rate": "daily"
        })
    
    return monitoring


async def _generate_schedule_recommendations(schedule_config: Dict[str, Any]) -> List[str]:
    """Generate recommendations for schedule optimization."""
    
    recommendations = []
    
    analysis_type = schedule_config["analysis_type"]
    schedule_freq = schedule_config["schedule"]["cron_expression"]
    
    # Frequency recommendations
    if "*/5 * * * *" in schedule_freq:  # Every 5 minutes
        recommendations.append("⚠️ Very frequent execution (5 minutes) - ensure data updates justify this frequency")
    elif "0 */1 * * *" in schedule_freq:  # Every hour
        recommendations.append("⏰ Hourly execution - good for real-time monitoring scenarios")
    elif "0 9 * * *" in schedule_freq:  # Daily
        recommendations.append("📅 Daily execution - suitable for most business intelligence needs")
    elif "0 9 * * 1" in schedule_freq:  # Weekly
        recommendations.append("📊 Weekly execution - good for trend analysis and reporting")
    
    # Analysis-specific recommendations
    if analysis_type == "correlation":
        recommendations.append("🔗 Correlation analysis - consider monthly frequency unless data changes rapidly")
        recommendations.append("📈 Monitor correlation stability over time for data quality insights")
    
    elif analysis_type == "profiling":
        recommendations.append("🔍 Data profiling - daily or weekly frequency recommended for quality monitoring")
        recommendations.append("🚨 Set up alerts for significant data quality changes")
    
    elif analysis_type == "trend":
        recommendations.append("📊 Trend analysis - frequency should match business reporting cycles")
        recommendations.append("🔮 Consider forecasting accuracy monitoring")
    
    # Notification recommendations
    channels = schedule_config["notifications"]["channels"]
    if not channels:
        recommendations.append("📧 Consider adding notification channels for execution status updates")
    elif "email" in channels:
        recommendations.append("✉️ Email notifications configured - ensure recipients are up to date")
    
    # Performance recommendations
    if schedule_config["execution"]["timeout_minutes"] < 10:
        recommendations.append("⏱️ Short timeout configured - ensure adequate time for complex analyses")
    
    # Storage recommendations
    retain_days = schedule_config["output"]["retain_days"]
    if retain_days > 365:
        recommendations.append("💾 Long retention period - consider storage costs and compliance requirements")
    elif retain_days < 30:
        recommendations.append("📁 Short retention period - ensure sufficient time for historical analysis")
    
    # General best practices
    recommendations.append("📊 Monitor execution success rate and adjust retry settings as needed")
    recommendations.append("🔄 Review and update analysis parameters periodically")
    recommendations.append("📈 Set up performance metrics dashboard for schedule monitoring")
    
    return recommendations[:8]  # Limit to most important recommendations


# Additional utility functions for schedule management

async def list_schedules() -> List[Dict[str, Any]]:
    """List all scheduled analyses."""
    
    schedules_path = Path(__file__).parent.parent.parent / "schedules"
    schedules = []
    
    if schedules_path.exists():
        for schedule_file in schedules_path.glob("*.json"):
            try:
                with open(schedule_file, 'r') as f:
                    schedule_config = json.load(f)
                    
                    # Add summary info
                    summary = {
                        "id": schedule_config["id"],
                        "name": schedule_config["name"],
                        "analysis_type": schedule_config["analysis_type"],
                        "schedule": schedule_config["schedule"]["cron_expression"],
                        "status": schedule_config["metadata"]["status"],
                        "created_at": schedule_config["metadata"]["created_at"],
                        "next_run": await _calculate_next_runs(schedule_config["schedule"]["cron_expression"], 1)
                    }
                    schedules.append(summary)
            
            except Exception:
                continue  # Skip invalid schedule files
    
    return schedules


async def pause_schedule(schedule_id: str) -> Dict[str, Any]:
    """Pause a scheduled analysis."""
    
    schedules_path = Path(__file__).parent.parent.parent / "schedules"
    schedule_file = schedules_path / f"{schedule_id}.json"
    
    if not schedule_file.exists():
        return {"error": f"Schedule {schedule_id} not found"}
    
    try:
        with open(schedule_file, 'r') as f:
            schedule_config = json.load(f)
        
        schedule_config["schedule"]["enabled"] = False
        schedule_config["metadata"]["status"] = "paused"
        schedule_config["metadata"]["paused_at"] = datetime.now().isoformat()
        
        with open(schedule_file, 'w') as f:
            json.dump(schedule_config, f, indent=2, default=str)
        
        return {
            "status": "paused",
            "schedule_id": schedule_id,
            "paused_at": schedule_config["metadata"]["paused_at"]
        }
    
    except Exception as e:
        return {"error": f"Failed to pause schedule: {str(e)}"}


async def resume_schedule(schedule_id: str) -> Dict[str, Any]:
    """Resume a paused scheduled analysis."""
    
    schedules_path = Path(__file__).parent.parent.parent / "schedules"
    schedule_file = schedules_path / f"{schedule_id}.json"
    
    if not schedule_file.exists():
        return {"error": f"Schedule {schedule_id} not found"}
    
    try:
        with open(schedule_file, 'r') as f:
            schedule_config = json.load(f)
        
        schedule_config["schedule"]["enabled"] = True
        schedule_config["metadata"]["status"] = "active"
        schedule_config["metadata"]["resumed_at"] = datetime.now().isoformat()
        
        with open(schedule_file, 'w') as f:
            json.dump(schedule_config, f, indent=2, default=str)
        
        return {
            "status": "active",
            "schedule_id": schedule_id,
            "resumed_at": schedule_config["metadata"]["resumed_at"],
            "next_runs": await _calculate_next_runs(schedule_config["schedule"]["cron_expression"], 3)
        }
    
    except Exception as e:
        return {"error": f"Failed to resume schedule: {str(e)}"}


async def delete_schedule(schedule_id: str) -> Dict[str, Any]:
    """Delete a scheduled analysis."""
    
    schedules_path = Path(__file__).parent.parent.parent / "schedules"
    schedule_file = schedules_path / f"{schedule_id}.json"
    
    if not schedule_file.exists():
        return {"error": f"Schedule {schedule_id} not found"}
    
    try:
        schedule_file.unlink()
        
        return {
            "status": "deleted",
            "schedule_id": schedule_id,
            "deleted_at": datetime.now().isoformat()
        }
    
    except Exception as e:
        return {"error": f"Failed to delete schedule: {str(e)}"}
