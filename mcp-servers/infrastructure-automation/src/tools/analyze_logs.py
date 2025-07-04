"""
Analyze Logs Tool
Analyze logs for patterns, errors, and anomalies across systems.
"""

import json
import asyncio
from datetime import datetime, timedelta
from typing import Dict, List
import random
import re


async def analyze_logs_tool(
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
    
    Returns:
        Dict containing log analysis results and insights
    """
    
    # Validate inputs
    valid_time_ranges = ["15m", "1h", "6h", "24h", "7d"]
    valid_log_levels = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"]
    
    if time_range not in valid_time_ranges:
        time_range = "1h"
    
    if log_level not in valid_log_levels:
        log_level = "ERROR"
    
    # Initialize log analysis
    analysis_data = {
        "analysis_id": f"logs-{log_source.replace('/', '-')}-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
        "log_source": log_source,
        "time_range": time_range,
        "log_level": log_level,
        "pattern": pattern,
        "start_time": datetime.now().isoformat(),
        "status": "initializing",
        "phases": [],
        "log_statistics": {},
        "analysis_results": {},
        "anomalies": [],
        "recommendations": []
    }
    
    try:
        # Phase 1: Collect and parse logs
        collection_phase = await _collect_and_parse_logs(analysis_data)
        analysis_data["phases"].append(collection_phase)
        analysis_data["log_statistics"] = collection_phase.get("log_statistics", {})
        
        if not collection_phase["success"]:
            analysis_data["status"] = "failed"
            analysis_data["error"] = "Log collection failed"
            return analysis_data
        
        # Phase 2: Analyze log patterns
        pattern_phase = await _analyze_log_patterns(analysis_data)
        analysis_data["phases"].append(pattern_phase)
        
        # Phase 3: Detect anomalies
        anomaly_phase = await _detect_log_anomalies(analysis_data)
        analysis_data["phases"].append(anomaly_phase)
        analysis_data["anomalies"] = anomaly_phase.get("anomalies_detected", [])
        
        # Phase 4: Generate insights and trends
        insights_phase = await _generate_log_insights(analysis_data)
        analysis_data["phases"].append(insights_phase)
        analysis_data["analysis_results"] = insights_phase.get("insights", {})
        
        # Generate recommendations
        analysis_data["recommendations"] = await _generate_log_recommendations(analysis_data)
        
        analysis_data["status"] = "completed"
        analysis_data["end_time"] = datetime.now().isoformat()
        analysis_data["duration_minutes"] = round(
            (datetime.fromisoformat(analysis_data["end_time"]) - 
             datetime.fromisoformat(analysis_data["start_time"])).total_seconds() / 60, 2
        )
        
    except Exception as e:
        analysis_data["status"] = "failed"
        analysis_data["error"] = str(e)
        analysis_data["end_time"] = datetime.now().isoformat()
    
    return analysis_data


async def _collect_and_parse_logs(analysis_data: Dict) -> Dict:
    """Collect and parse logs from the specified source."""
    
    log_source = analysis_data["log_source"]
    time_range = analysis_data["time_range"]
    log_level = analysis_data["log_level"]
    pattern = analysis_data["pattern"]
    
    collection_phase = {
        "phase": "log_collection",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "collection_steps": [],
        "log_statistics": {},
        "success": True
    }
    
    # Step 1: Identify log sources
    sources_step = await _identify_log_sources(log_source)
    collection_phase["collection_steps"].append(sources_step)
    
    if not sources_step["success"]:
        collection_phase["success"] = False
        return collection_phase
    
    # Step 2: Collect logs from identified sources
    collection_step = await _collect_logs_from_sources(
        sources_step["sources"], time_range, log_level
    )
    collection_phase["collection_steps"].append(collection_step)
    
    if not collection_step["success"]:
        collection_phase["success"] = False
        return collection_phase
    
    # Step 3: Parse and filter logs
    parsing_step = await _parse_and_filter_logs(
        collection_step["raw_logs"], log_level, pattern
    )
    collection_phase["collection_steps"].append(parsing_step)
    
    # Generate log statistics
    collection_phase["log_statistics"] = await _generate_log_statistics(
        parsing_step.get("parsed_logs", []), time_range
    )
    
    collection_phase["status"] = "completed"
    collection_phase["end_time"] = datetime.now().isoformat()
    
    return collection_phase


async def _identify_log_sources(log_source: str) -> Dict:
    """Identify specific log sources based on the source specification."""
    
    step = {
        "step": "identify_sources",
        "description": f"Identify log sources for {log_source}",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True,
        "sources": []
    }
    
    await asyncio.sleep(0.05)  # Simulate source discovery
    
    # Generate realistic log sources based on the input
    if log_source.lower() == "application":
        sources = [
            {"name": "web-frontend", "type": "application", "path": "/var/log/web-frontend.log"},
            {"name": "api-gateway", "type": "application", "path": "/var/log/api-gateway.log"},
            {"name": "user-service", "type": "application", "path": "/var/log/user-service.log"},
            {"name": "payment-service", "type": "application", "path": "/var/log/payment-service.log"}
        ]
    elif log_source.lower() == "system":
        sources = [
            {"name": "syslog", "type": "system", "path": "/var/log/syslog"},
            {"name": "auth", "type": "system", "path": "/var/log/auth.log"},
            {"name": "kernel", "type": "system", "path": "/var/log/kern.log"},
            {"name": "dmesg", "type": "system", "path": "/var/log/dmesg"}
        ]
    elif log_source.lower() == "security":
        sources = [
            {"name": "security-events", "type": "security", "path": "/var/log/security.log"},
            {"name": "auth-failures", "type": "security", "path": "/var/log/auth-failures.log"},
            {"name": "firewall", "type": "security", "path": "/var/log/firewall.log"},
            {"name": "intrusion-detection", "type": "security", "path": "/var/log/ids.log"}
        ]
    else:
        # Treat as specific service name
        sources = [
            {"name": log_source, "type": "service", "path": f"/var/log/{log_source}.log"},
            {"name": f"{log_source}-error", "type": "service", "path": f"/var/log/{log_source}-error.log"}
        ]
    
    # Simulate source accessibility check
    accessible_sources = []
    for source in sources:
        accessible = random.random() > 0.1  # 90% accessibility rate
        if accessible:
            source["accessible"] = True
            source["size_mb"] = round(random.uniform(10, 500), 2)
            accessible_sources.append(source)
        else:
            source["accessible"] = False
            source["error"] = "Permission denied or file not found"
    
    step["sources"] = accessible_sources
    
    if not accessible_sources:
        step["success"] = False
        step["error"] = "No accessible log sources found"
    
    step["status"] = "completed"
    step["end_time"] = datetime.now().isoformat()
    
    return step


async def _collect_logs_from_sources(sources: List[Dict], time_range: str, log_level: str) -> Dict:
    """Collect logs from identified sources."""
    
    step = {
        "step": "collect_logs",
        "description": f"Collect logs from {len(sources)} sources",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True,
        "raw_logs": [],
        "collection_stats": {}
    }
    
    # Calculate time range in hours for simulation
    time_hours = {
        "15m": 0.25,
        "1h": 1,
        "6h": 6,
        "24h": 24,
        "7d": 168
    }.get(time_range, 1)
    
    total_logs_collected = 0
    
    # Collect logs from each source
    for source in sources:
        await asyncio.sleep(0.02)  # Simulate collection time per source
        
        # Generate realistic log volume based on source type and time range
        log_count = _estimate_log_volume(source["type"], time_hours, log_level)
        
        # Simulate log collection success/failure
        collection_success = random.random() > 0.05  # 95% success rate
        
        if collection_success:
            source_logs = _generate_sample_logs(source, log_count, time_hours, log_level)
            step["raw_logs"].extend(source_logs)
            total_logs_collected += log_count
        else:
            source["collection_error"] = "Log collection timeout"
    
    step["collection_stats"] = {
        "total_logs_collected": total_logs_collected,
        "sources_processed": len(sources),
        "time_range_hours": time_hours,
        "average_logs_per_hour": round(total_logs_collected / time_hours, 0) if time_hours > 0 else 0
    }
    
    if total_logs_collected == 0:
        step["success"] = False
        step["error"] = "No logs collected from any source"
    
    step["status"] = "completed"
    step["end_time"] = datetime.now().isoformat()
    
    return step


def _estimate_log_volume(source_type: str, time_hours: float, log_level: str) -> int:
    """Estimate log volume based on source type and parameters."""
    
    # Base logs per hour by source type
    base_volumes = {
        "application": 1000,
        "system": 500,
        "security": 200,
        "service": 300
    }
    
    base_volume = base_volumes.get(source_type, 300)
    
    # Adjust for log level (higher levels = fewer logs)
    level_multipliers = {
        "DEBUG": 1.0,
        "INFO": 0.7,
        "WARN": 0.3,
        "ERROR": 0.1,
        "FATAL": 0.02
    }
    
    level_multiplier = level_multipliers.get(log_level, 0.3)
    
    # Calculate total volume with some randomness
    estimated_volume = int(base_volume * time_hours * level_multiplier * random.uniform(0.7, 1.3))
    
    return max(1, estimated_volume)  # Ensure at least 1 log


def _generate_sample_logs(source: Dict, log_count: int, time_hours: float, log_level: str) -> List[Dict]:
    """Generate realistic sample logs for analysis."""
    
    logs = []
    source_name = source["name"]
    source_type = source["type"]
    
    # Define log patterns based on source type
    log_patterns = _get_log_patterns_by_type(source_type)
    
    # Generate logs distributed over the time range
    start_time = datetime.now() - timedelta(hours=time_hours)
    
    for i in range(log_count):
        # Distribute logs over time range
        log_time = start_time + timedelta(seconds=random.uniform(0, time_hours * 3600))
        
        # Select log pattern and level
        pattern = random.choice(log_patterns)
        actual_level = _select_log_level(log_level)
        
        # Generate log entry
        log_entry = {
            "timestamp": log_time.isoformat(),
            "source": source_name,
            "level": actual_level,
            "message": pattern["message_template"].format(
                user_id=random.randint(1000, 9999),
                ip=f"{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}",
                status_code=random.choice([200, 201, 400, 401, 403, 404, 500, 502, 503]),
                duration=random.randint(10, 5000),
                error_code=f"ERR_{random.randint(1000, 9999)}",
                service=random.choice(["auth", "payment", "user", "notification"])
            ),
            "category": pattern["category"],
            "thread_id": f"thread-{random.randint(1, 20)}",
            "request_id": f"req-{random.randint(10**10, 10**11-1):011d}"
        }
        
        logs.append(log_entry)
    
    return logs


def _get_log_patterns_by_type(source_type: str) -> List[Dict]:
    """Get realistic log patterns based on source type."""
    
    if source_type == "application":
        return [
            {"category": "request", "message_template": "HTTP {status_code} GET /api/users/{user_id} {duration}ms"},
            {"category": "error", "message_template": "Database connection failed: {error_code}"},
            {"category": "auth", "message_template": "Authentication failed for user {user_id} from {ip}"},
            {"category": "performance", "message_template": "Slow query detected: {duration}ms"},
            {"category": "business", "message_template": "Payment processed for user {user_id}: ${duration}"}
        ]
    elif source_type == "system":
        return [
            {"category": "system", "message_template": "Process {service} started with PID {user_id}"},
            {"category": "error", "message_template": "Disk space warning: {duration}% used"},
            {"category": "network", "message_template": "Network interface eth0: {status_code} packets dropped"},
            {"category": "memory", "message_template": "Memory usage: {duration}MB allocated"},
            {"category": "kernel", "message_template": "Kernel: CPU {user_id} temperature {duration}°C"}
        ]
    elif source_type == "security":
        return [
            {"category": "auth", "message_template": "Failed login attempt from {ip} for user {user_id}"},
            {"category": "firewall", "message_template": "Blocked connection from {ip}:{status_code}"},
            {"category": "intrusion", "message_template": "Suspicious activity detected: {error_code}"},
            {"category": "audit", "message_template": "User {user_id} accessed sensitive resource"},
            {"category": "malware", "message_template": "Malware signature {error_code} detected"}
        ]
    else:  # service
        return [
            {"category": "service", "message_template": "Service {service} processed request {request_id}"},
            {"category": "error", "message_template": "Service error {error_code}: operation failed"},
            {"category": "performance", "message_template": "Service response time: {duration}ms"},
            {"category": "health", "message_template": "Health check passed for {service}"},
            {"category": "config", "message_template": "Configuration reloaded for {service}"}
        ]


def _select_log_level(minimum_level: str) -> str:
    """Select a log level at or above the minimum level."""
    
    levels = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"]
    min_index = levels.index(minimum_level)
    
    # Weight distribution - more logs at higher severity
    weights = [0.5, 0.3, 0.15, 0.04, 0.01][min_index:]
    
    return random.choices(levels[min_index:], weights=weights)[0]


async def _parse_and_filter_logs(raw_logs: List[Dict], log_level: str, pattern: str) -> Dict:
    """Parse and filter logs based on criteria."""
    
    step = {
        "step": "parse_filter_logs",
        "description": f"Parse and filter {len(raw_logs)} logs",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "success": True,
        "parsed_logs": [],
        "filtering_stats": {}
    }
    
    await asyncio.sleep(0.1)  # Simulate parsing time
    
    parsed_logs = []
    pattern_matches = 0
    level_filtered = 0
    
    # Compile regex pattern if provided
    compiled_pattern = None
    if pattern:
        try:
            compiled_pattern = re.compile(pattern, re.IGNORECASE)
        except re.error:
            step["warning"] = f"Invalid regex pattern: {pattern}"
    
    # Process each log entry
    for log in raw_logs:
        # Filter by log level
        if _log_level_meets_minimum(log.get("level", "INFO"), log_level):
            level_filtered += 1
            
            # Filter by pattern if specified
            if compiled_pattern:
                if compiled_pattern.search(log.get("message", "")):
                    pattern_matches += 1
                    parsed_logs.append(log)
            else:
                parsed_logs.append(log)
    
    step["parsed_logs"] = parsed_logs
    step["filtering_stats"] = {
        "total_raw_logs": len(raw_logs),
        "level_filtered_logs": level_filtered,
        "pattern_matched_logs": pattern_matches if pattern else level_filtered,
        "final_log_count": len(parsed_logs),
        "filter_efficiency": round((len(parsed_logs) / len(raw_logs) * 100), 2) if raw_logs else 0
    }
    
    step["status"] = "completed"
    step["end_time"] = datetime.now().isoformat()
    
    return step


def _log_level_meets_minimum(log_level: str, minimum_level: str) -> bool:
    """Check if log level meets minimum threshold."""
    
    levels = ["DEBUG", "INFO", "WARN", "ERROR", "FATAL"]
    
    try:
        log_index = levels.index(log_level)
        min_index = levels.index(minimum_level)
        return log_index >= min_index
    except ValueError:
        return False


async def _analyze_log_patterns(analysis_data: Dict) -> Dict:
    """Analyze patterns in the collected logs."""
    
    logs = analysis_data["phases"][0].get("collection_steps", [])[-1].get("parsed_logs", [])
    
    pattern_phase = {
        "phase": "pattern_analysis",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "patterns_discovered": [],
        "success": True
    }
    
    await asyncio.sleep(0.1)  # Simulate pattern analysis
    
    # Analyze various patterns
    patterns = {
        "error_patterns": _analyze_error_patterns(logs),
        "frequency_patterns": _analyze_frequency_patterns(logs),
        "source_patterns": _analyze_source_patterns(logs),
        "temporal_patterns": _analyze_temporal_patterns(logs),
        "category_patterns": _analyze_category_patterns(logs)
    }
    
    pattern_phase["patterns_discovered"] = patterns
    pattern_phase["status"] = "completed"
    pattern_phase["end_time"] = datetime.now().isoformat()
    
    return pattern_phase


def _analyze_error_patterns(logs: List[Dict]) -> Dict:
    """Analyze error patterns in logs."""
    
    error_logs = [log for log in logs if log.get("level") in ["ERROR", "FATAL"]]
    
    # Count error types
    error_categories = {}
    error_messages = {}
    
    for log in error_logs:
        category = log.get("category", "unknown")
        message = log.get("message", "")
        
        error_categories[category] = error_categories.get(category, 0) + 1
        
        # Extract error patterns (simplified)
        if "connection" in message.lower():
            error_messages["connection_errors"] = error_messages.get("connection_errors", 0) + 1
        elif "timeout" in message.lower():
            error_messages["timeout_errors"] = error_messages.get("timeout_errors", 0) + 1
        elif "authentication" in message.lower() or "auth" in message.lower():
            error_messages["auth_errors"] = error_messages.get("auth_errors", 0) + 1
        else:
            error_messages["other_errors"] = error_messages.get("other_errors", 0) + 1
    
    return {
        "total_errors": len(error_logs),
        "error_categories": error_categories,
        "error_types": error_messages,
        "error_rate": round((len(error_logs) / len(logs) * 100), 2) if logs else 0
    }


def _analyze_frequency_patterns(logs: List[Dict]) -> Dict:
    """Analyze log frequency patterns."""
    
    if not logs:
        return {"message": "No logs to analyze"}
    
    # Group logs by hour
    hourly_counts = {}
    
    for log in logs:
        try:
            timestamp = datetime.fromisoformat(log.get("timestamp", ""))
            hour_key = timestamp.strftime("%Y-%m-%d %H:00")
            hourly_counts[hour_key] = hourly_counts.get(hour_key, 0) + 1
        except:
            continue
    
    # Calculate statistics
    if hourly_counts:
        counts = list(hourly_counts.values())
        avg_per_hour = sum(counts) / len(counts)
        max_hour = max(hourly_counts, key=hourly_counts.get)
        min_hour = min(hourly_counts, key=hourly_counts.get)
    else:
        avg_per_hour = 0
        max_hour = min_hour = "unknown"
    
    return {
        "total_hours": len(hourly_counts),
        "average_logs_per_hour": round(avg_per_hour, 2),
        "peak_hour": max_hour,
        "peak_count": hourly_counts.get(max_hour, 0),
        "quiet_hour": min_hour,
        "quiet_count": hourly_counts.get(min_hour, 0),
        "hourly_distribution": hourly_counts
    }


def _analyze_source_patterns(logs: List[Dict]) -> Dict:
    """Analyze patterns by log source."""
    
    source_stats = {}
    
    for log in logs:
        source = log.get("source", "unknown")
        level = log.get("level", "INFO")
        
        if source not in source_stats:
            source_stats[source] = {
                "total_logs": 0,
                "levels": {},
                "categories": {}
            }
        
        source_stats[source]["total_logs"] += 1
        source_stats[source]["levels"][level] = source_stats[source]["levels"].get(level, 0) + 1
        
        category = log.get("category", "unknown")
        source_stats[source]["categories"][category] = source_stats[source]["categories"].get(category, 0) + 1
    
    return {
        "total_sources": len(source_stats),
        "source_statistics": source_stats,
        "most_active_source": max(source_stats, key=lambda x: source_stats[x]["total_logs"]) if source_stats else "none"
    }


def _analyze_temporal_patterns(logs: List[Dict]) -> Dict:
    """Analyze temporal patterns in logs."""
    
    if not logs:
        return {"message": "No logs to analyze"}
    
    timestamps = []
    for log in logs:
        try:
            timestamp = datetime.fromisoformat(log.get("timestamp", ""))
            timestamps.append(timestamp)
        except:
            continue
    
    if not timestamps:
        return {"message": "No valid timestamps found"}
    
    timestamps.sort()
    
    # Calculate time gaps between logs
    gaps = []
    for i in range(1, len(timestamps)):
        gap = (timestamps[i] - timestamps[i-1]).total_seconds()
        gaps.append(gap)
    
    if gaps:
        avg_gap = sum(gaps) / len(gaps)
        max_gap = max(gaps)
        min_gap = min(gaps)
    else:
        avg_gap = max_gap = min_gap = 0
    
    return {
        "time_span_hours": round((timestamps[-1] - timestamps[0]).total_seconds() / 3600, 2),
        "first_log": timestamps[0].isoformat(),
        "last_log": timestamps[-1].isoformat(),
        "average_gap_seconds": round(avg_gap, 2),
        "max_gap_seconds": round(max_gap, 2),
        "min_gap_seconds": round(min_gap, 2)
    }


def _analyze_category_patterns(logs: List[Dict]) -> Dict:
    """Analyze patterns by log category."""
    
    category_stats = {}
    
    for log in logs:
        category = log.get("category", "unknown")
        level = log.get("level", "INFO")
        
        if category not in category_stats:
            category_stats[category] = {
                "count": 0,
                "levels": {}
            }
        
        category_stats[category]["count"] += 1
        category_stats[category]["levels"][level] = category_stats[category]["levels"].get(level, 0) + 1
    
    # Sort categories by count
    sorted_categories = sorted(category_stats.items(), key=lambda x: x[1]["count"], reverse=True)
    
    return {
        "total_categories": len(category_stats),
        "category_distribution": dict(sorted_categories),
        "top_category": sorted_categories[0][0] if sorted_categories else "none"
    }


async def _detect_log_anomalies(analysis_data: Dict) -> Dict:
    """Detect anomalies in the log data."""
    
    logs = analysis_data["phases"][0].get("collection_steps", [])[-1].get("parsed_logs", [])
    
    anomaly_phase = {
        "phase": "anomaly_detection",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "anomalies_detected": [],
        "success": True
    }
    
    await asyncio.sleep(0.1)  # Simulate anomaly detection
    
    anomalies = []
    
    # Detect various types of anomalies
    anomalies.extend(_detect_frequency_anomalies(logs))
    anomalies.extend(_detect_error_burst_anomalies(logs))
    anomalies.extend(_detect_silence_anomalies(logs))
    anomalies.extend(_detect_unusual_patterns(logs))
    
    # Sort anomalies by severity
    anomalies.sort(key=lambda x: {"critical": 3, "high": 2, "medium": 1, "low": 0}.get(x.get("severity", "low"), 0), reverse=True)
    
    anomaly_phase["anomalies_detected"] = anomalies
    anomaly_phase["status"] = "completed"
    anomaly_phase["end_time"] = datetime.now().isoformat()
    
    return anomaly_phase


def _detect_frequency_anomalies(logs: List[Dict]) -> List[Dict]:
    """Detect unusual frequency patterns."""
    
    anomalies = []
    
    # Group logs by 5-minute intervals
    interval_counts = {}
    
    for log in logs:
        try:
            timestamp = datetime.fromisoformat(log.get("timestamp", ""))
            # Round to 5-minute intervals
            interval = timestamp.replace(minute=(timestamp.minute // 5) * 5, second=0, microsecond=0)
            interval_key = interval.strftime("%Y-%m-%d %H:%M")
            interval_counts[interval_key] = interval_counts.get(interval_key, 0) + 1
        except:
            continue
    
    if len(interval_counts) < 3:
        return anomalies
    
    counts = list(interval_counts.values())
    avg_count = sum(counts) / len(counts)
    
    # Detect spikes (>3x average)
    for interval, count in interval_counts.items():
        if count > avg_count * 3:
            anomalies.append({
                "type": "frequency_spike",
                "severity": "high" if count > avg_count * 5 else "medium",
                "timestamp": interval,
                "description": f"Log frequency spike: {count} logs in 5 minutes (avg: {avg_count:.1f})",
                "details": {
                    "log_count": count,
                    "average_count": round(avg_count, 1),
                    "spike_ratio": round(count / avg_count, 1)
                }
            })
    
    return anomalies


def _detect_error_burst_anomalies(logs: List[Dict]) -> List[Dict]:
    """Detect error bursts."""
    
    anomalies = []
    error_logs = [log for log in logs if log.get("level") in ["ERROR", "FATAL"]]
    
    if len(error_logs) < 5:
        return anomalies
    
    # Group errors by 10-minute windows
    error_windows = {}
    
    for log in error_logs:
        try:
            timestamp = datetime.fromisoformat(log.get("timestamp", ""))
            window = timestamp.replace(minute=(timestamp.minute // 10) * 10, second=0, microsecond=0)
            window_key = window.strftime("%Y-%m-%d %H:%M")
            
            if window_key not in error_windows:
                error_windows[window_key] = []
            error_windows[window_key].append(log)
        except:
            continue
    
    # Detect error bursts (>10 errors in 10 minutes)
    for window, window_errors in error_windows.items():
        if len(window_errors) > 10:
            # Group by error category
            categories = {}
            for error in window_errors:
                category = error.get("category", "unknown")
                categories[category] = categories.get(category, 0) + 1
            
            anomalies.append({
                "type": "error_burst",
                "severity": "critical" if len(window_errors) > 50 else "high",
                "timestamp": window,
                "description": f"Error burst detected: {len(window_errors)} errors in 10 minutes",
                "details": {
                    "error_count": len(window_errors),
                    "error_categories": categories,
                    "dominant_category": max(categories, key=categories.get) if categories else "unknown"
                }
            })
    
    return anomalies


def _detect_silence_anomalies(logs: List[Dict]) -> List[Dict]:
    """Detect unusual silence periods."""
    
    anomalies = []
    
    if len(logs) < 10:
        return anomalies
    
    # Sort logs by timestamp
    timestamps = []
    for log in logs:
        try:
            timestamp = datetime.fromisoformat(log.get("timestamp", ""))
            timestamps.append(timestamp)
        except:
            continue
    
    timestamps.sort()
    
    # Calculate gaps between logs
    gaps = []
    for i in range(1, len(timestamps)):
        gap = (timestamps[i] - timestamps[i-1]).total_seconds()
        gaps.append((gap, timestamps[i-1], timestamps[i]))
    
    # Find average gap
    avg_gap = sum(gap[0] for gap in gaps) / len(gaps)
    
    # Detect unusually long silences (>10x average gap and >30 minutes)
    for gap_seconds, start_time, end_time in gaps:
        if gap_seconds > max(avg_gap * 10, 1800):  # 30 minutes minimum
            anomalies.append({
                "type": "log_silence",
                "severity": "medium" if gap_seconds < 7200 else "high",  # 2 hours threshold
                "timestamp": start_time.strftime("%Y-%m-%d %H:%M:%S"),
                "description": f"Unusual silence period: {gap_seconds/60:.1f} minutes without logs",
                "details": {
                    "silence_duration_minutes": round(gap_seconds / 60, 1),
                    "silence_start": start_time.isoformat(),
                    "silence_end": end_time.isoformat(),
                    "average_gap_seconds": round(avg_gap, 1)
                }
            })
    
    return anomalies


def _detect_unusual_patterns(logs: List[Dict]) -> List[Dict]:
    """Detect other unusual patterns."""
    
    anomalies = []
    
    # Detect repeated identical messages
    message_counts = {}
    for log in logs:
        message = log.get("message", "")
        message_counts[message] = message_counts.get(message, 0) + 1
    
    # Find messages that repeat excessively
    for message, count in message_counts.items():
        if count > len(logs) * 0.1 and count > 20:  # >10% of logs and >20 occurrences
            anomalies.append({
                "type": "repeated_message",
                "severity": "medium",
                "timestamp": datetime.now().isoformat(),
                "description": f"Message repeated {count} times",
                "details": {
                    "message": message[:100] + "..." if len(message) > 100 else message,
                    "repetition_count": count,
                    "percentage_of_logs": round(count / len(logs) * 100, 1)
                }
            })
    
    return anomalies


async def _generate_log_insights(analysis_data: Dict) -> Dict:
    """Generate insights and trends from log analysis."""
    
    insights_phase = {
        "phase": "insight_generation",
        "status": "running",
        "start_time": datetime.now().isoformat(),
        "insights": {},
        "success": True
    }
    
    await asyncio.sleep(0.05)  # Simulate insight generation
    
    # Extract data from previous phases
    log_stats = analysis_data.get("log_statistics", {})
    patterns = analysis_data["phases"][1].get("patterns_discovered", {}) if len(analysis_data["phases"]) > 1 else {}
    anomalies = analysis_data.get("anomalies", [])
    
    insights = {
        "summary": _generate_summary_insights(log_stats, patterns, anomalies),
        "health_assessment": _assess_system_health(patterns, anomalies),
        "trends": _identify_trends(patterns),
        "actionable_items": _generate_actionable_items(patterns, anomalies)
    }
    
    insights_phase["insights"] = insights
    insights_phase["status"] = "completed"
    insights_phase["end_time"] = datetime.now().isoformat()
    
    return insights_phase


def _generate_summary_insights(log_stats: Dict, patterns: Dict, anomalies: List[Dict]) -> Dict:
    """Generate high-level summary insights."""
    
    return {
        "total_logs_analyzed": log_stats.get("total_logs_collected", 0),
        "time_range_analyzed": log_stats.get("time_range_hours", 0),
        "primary_log_sources": patterns.get("source_patterns", {}).get("most_active_source", "unknown"),
        "error_rate": patterns.get("error_patterns", {}).get("error_rate", 0),
        "anomalies_detected": len(anomalies),
        "critical_anomalies": len([a for a in anomalies if a.get("severity") == "critical"]),
        "system_status": "healthy" if len([a for a in anomalies if a.get("severity") in ["critical", "high"]]) == 0 else "attention_needed"
    }


def _assess_system_health(patterns: Dict, anomalies: List[Dict]) -> Dict:
    """Assess overall system health based on log analysis."""
    
    health_score = 100
    health_factors = []
    
    # Error rate impact
    error_rate = patterns.get("error_patterns", {}).get("error_rate", 0)
    if error_rate > 10:
        health_score -= 30
        health_factors.append(f"High error rate: {error_rate}%")
    elif error_rate > 5:
        health_score -= 15
        health_factors.append(f"Elevated error rate: {error_rate}%")
    
    # Anomaly impact
    critical_anomalies = len([a for a in anomalies if a.get("severity") == "critical"])
    high_anomalies = len([a for a in anomalies if a.get("severity") == "high"])
    
    health_score -= critical_anomalies * 20
    health_score -= high_anomalies * 10
    
    if critical_anomalies > 0:
        health_factors.append(f"{critical_anomalies} critical anomalies detected")
    if high_anomalies > 0:
        health_factors.append(f"{high_anomalies} high-severity anomalies detected")
    
    health_score = max(0, health_score)
    
    # Determine health status
    if health_score >= 90:
        status = "excellent"
    elif health_score >= 80:
        status = "good"
    elif health_score >= 60:
        status = "fair"
    elif health_score >= 40:
        status = "poor"
    else:
        status = "critical"
    
    return {
        "health_score": health_score,
        "health_status": status,
        "health_factors": health_factors,
        "recommendations": _get_health_recommendations(status, health_factors)
    }


def _get_health_recommendations(status: str, factors: List[str]) -> List[str]:
    """Get health-based recommendations."""
    
    recommendations = []
    
    if status in ["critical", "poor"]:
        recommendations.extend([
            "🚨 Immediate investigation required",
            "🔍 Check for underlying system issues",
            "📞 Consider alerting operations team"
        ])
    elif status == "fair":
        recommendations.extend([
            "⚠️ Monitor system closely",
            "🔍 Investigate error patterns",
            "📈 Set up additional alerting"
        ])
    else:
        recommendations.extend([
            "✅ System appears healthy",
            "📊 Continue regular monitoring",
            "🔍 Review trends for optimization"
        ])
    
    return recommendations


def _identify_trends(patterns: Dict) -> Dict:
    """Identify trends from patterns."""
    
    trends = {}
    
    # Frequency trends
    freq_patterns = patterns.get("frequency_patterns", {})
    if freq_patterns.get("hourly_distribution"):
        peak_hour = freq_patterns.get("peak_hour", "")
        quiet_hour = freq_patterns.get("quiet_hour", "")
        
        trends["activity_patterns"] = {
            "peak_activity_time": peak_hour,
            "quiet_period": quiet_hour,
            "activity_variation": "high" if freq_patterns.get("peak_count", 0) > freq_patterns.get("quiet_count", 0) * 3 else "moderate"
        }
    
    # Error trends
    error_patterns = patterns.get("error_patterns", {})
    if error_patterns.get("error_types"):
        dominant_error = max(error_patterns["error_types"], key=error_patterns["error_types"].get)
        trends["error_trends"] = {
            "dominant_error_type": dominant_error,
            "error_diversity": len(error_patterns["error_types"]),
            "total_errors": error_patterns.get("total_errors", 0)
        }
    
    return trends


def _generate_actionable_items(patterns: Dict, anomalies: List[Dict]) -> List[Dict]:
    """Generate actionable items based on analysis."""
    
    actions = []
    
    # Actions based on anomalies
    for anomaly in anomalies[:5]:  # Top 5 anomalies
        if anomaly["type"] == "error_burst":
            actions.append({
                "priority": "high",
                "action": "Investigate error burst",
                "description": f"Address {anomaly['details']['error_count']} errors in {anomaly['details']['dominant_category']} category",
                "timestamp": anomaly["timestamp"]
            })
        elif anomaly["type"] == "frequency_spike":
            actions.append({
                "priority": "medium",
                "action": "Review traffic spike",
                "description": f"Investigate {anomaly['details']['log_count']} logs spike",
                "timestamp": anomaly["timestamp"]
            })
    
    # Actions based on patterns
    error_patterns = patterns.get("error_patterns", {})
    if error_patterns.get("error_rate", 0) > 5:
        actions.append({
            "priority": "high",
            "action": "Reduce error rate",
            "description": f"Address {error_patterns['error_rate']}% error rate",
            "timestamp": datetime.now().isoformat()
        })
    
    return actions


async def _generate_log_statistics(logs: List[Dict], time_range: str) -> Dict:
    """Generate comprehensive log statistics."""
    
    if not logs:
        return {"total_logs": 0, "message": "No logs to analyze"}
    
    # Basic statistics
    total_logs = len(logs)
    
    # Level distribution
    level_counts = {}
    for log in logs:
        level = log.get("level", "INFO")
        level_counts[level] = level_counts.get(level, 0) + 1
    
    # Source distribution
    source_counts = {}
    for log in logs:
        source = log.get("source", "unknown")
        source_counts[source] = source_counts.get(source, 0) + 1
    
    # Time range analysis
    timestamps = []
    for log in logs:
        try:
            timestamp = datetime.fromisoformat(log.get("timestamp", ""))
            timestamps.append(timestamp)
        except:
            continue
    
    if timestamps:
        timestamps.sort()
        time_span = (timestamps[-1] - timestamps[0]).total_seconds() / 3600
        logs_per_hour = total_logs / time_span if time_span > 0 else total_logs
    else:
        time_span = 0
        logs_per_hour = 0
    
    return {
        "total_logs": total_logs,
        "time_range": time_range,
        "actual_time_span_hours": round(time_span, 2),
        "logs_per_hour": round(logs_per_hour, 2),
        "level_distribution": level_counts,
        "source_distribution": source_counts,
        "unique_sources": len(source_counts),
        "first_log": timestamps[0].isoformat() if timestamps else None,
        "last_log": timestamps[-1].isoformat() if timestamps else None
    }


async def _generate_log_recommendations(analysis_data: Dict) -> List[str]:
    """Generate actionable log analysis recommendations."""
    
    recommendations = []
    status = analysis_data["status"]
    log_stats = analysis_data.get("log_statistics", {})
    anomalies = analysis_data.get("anomalies", [])
    
    if status == "completed":
        recommendations.append("✅ Log analysis completed successfully")
        
        # Analysis-specific recommendations
        total_logs = log_stats.get("total_logs", 0)
        if total_logs > 0:
            error_rate = 0
            patterns = analysis_data.get("phases", [{}])
            if len(patterns) > 1:
                error_patterns = patterns[1].get("patterns_discovered", {}).get("error_patterns", {})
                error_rate = error_patterns.get("error_rate", 0)
            
            if error_rate > 10:
                recommendations.append(f"🚨 High error rate detected ({error_rate}%) - immediate investigation needed")
            elif error_rate > 5:
                recommendations.append(f"⚠️ Elevated error rate ({error_rate}%) - monitor closely")
            
            # Anomaly-based recommendations
            critical_anomalies = len([a for a in anomalies if a.get("severity") == "critical"])
            if critical_anomalies > 0:
                recommendations.append(f"🔥 {critical_anomalies} critical anomalies require immediate attention")
            
            high_anomalies = len([a for a in anomalies if a.get("severity") == "high"])
            if high_anomalies > 0:
                recommendations.append(f"⚠️ {high_anomalies} high-severity anomalies detected")
            
            # Volume-based recommendations
            logs_per_hour = log_stats.get("logs_per_hour", 0)
            if logs_per_hour > 10000:
                recommendations.append("📊 High log volume - consider log sampling or filtering")
            elif logs_per_hour < 10:
                recommendations.append("📉 Low log volume - verify logging configuration")
        else:
            recommendations.append("❌ No logs found - check log sources and permissions")
    
    elif status == "failed":
        recommendations.extend([
            "❌ Log analysis failed",
            "🔍 Check log source accessibility and permissions",
            "🔄 Retry analysis with different parameters"
        ])
    
    # General recommendations
    recommendations.extend([
        "📈 Set up automated log monitoring and alerting",
        "🔍 Implement log aggregation for better analysis",
        "📋 Create log analysis dashboards for operational visibility",
        "🗄️ Establish log retention and archival policies"
    ])
    
    return recommendations[:8]  # Limit to 8 recommendations
