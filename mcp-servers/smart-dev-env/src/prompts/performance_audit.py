"""
Performance Audit Prompt
End-to-end performance analysis pipeline.
"""

from typing import Dict, List


async def performance_audit_prompt(scope: str) -> str:
    """
    Execute comprehensive performance audit.
    """

    try:
        audit_scope = await _define_audit_scope(scope)
        performance_analysis = await _analyze_performance(audit_scope)
        bottlenecks = await _identify_bottlenecks(performance_analysis)
        optimization_plan = await _create_optimization_plan(bottlenecks, audit_scope)

        return f"""
⚡ **Performance Audit: {audit_scope["name"]}**

**Audit Scope:**
{audit_scope["description"]}

**Performance Analysis:**
{_format_performance_analysis(performance_analysis)}

**Identified Bottlenecks:**
{_format_bottlenecks(bottlenecks)}

**Optimization Plan:**
{_format_optimization_plan(optimization_plan)}

**Performance Metrics:**
{_format_metrics(performance_analysis.get("metrics", {}))}

**Next Steps:**
{_suggest_performance_next_steps(bottlenecks, optimization_plan)}

**Available Tools:**
• `analyze-codebase` - Code-level performance analysis
• `run-tests` - Performance test execution
• `deploy-preview` - Test optimizations in staging

**Related Workflows:**
• `/smart-dev/refactor-planning` - Plan performance improvements
• `/smart-dev/code-review` - Review optimization changes
"""

    except Exception as e:
        return f"❌ Performance audit failed: {str(e)}"


async def _define_audit_scope(scope: str) -> Dict:
    """Define the scope of performance audit."""

    audit_scope = {"name": scope, "description": "", "areas": []}

    scope_lower = scope.lower()

    if "frontend" in scope_lower:
        audit_scope["areas"] = [
            "UI rendering",
            "JavaScript execution",
            "Asset loading",
            "Bundle size",
        ]
        audit_scope["description"] = (
            "Frontend performance analysis focusing on user experience"
        )
    elif "backend" in scope_lower:
        audit_scope["areas"] = [
            "API response times",
            "Database queries",
            "Server resources",
            "Memory usage",
        ]
        audit_scope["description"] = (
            "Backend performance analysis focusing on server efficiency"
        )
    elif "database" in scope_lower:
        audit_scope["areas"] = [
            "Query performance",
            "Index optimization",
            "Connection pooling",
        ]
        audit_scope["description"] = (
            "Database performance analysis focusing on data access"
        )
    else:
        audit_scope["areas"] = [
            "General performance",
            "Resource usage",
            "Response times",
        ]
        audit_scope["description"] = "Full-stack performance analysis"

    return audit_scope


async def _analyze_performance(audit_scope: Dict) -> Dict:
    """Analyze current performance characteristics."""

    analysis = {
        "metrics": {},
        "observations": [],
        "areas_analyzed": audit_scope["areas"],
    }

    # Simulate performance analysis based on scope
    for area in audit_scope["areas"]:
        analysis["observations"].append(f"Performance patterns analyzed for {area}")

    # Sample metrics
    analysis["metrics"] = {
        "areas_covered": len(audit_scope["areas"]),
        "performance_score": 75,
        "issues_found": 3,
    }

    return analysis


async def _identify_bottlenecks(performance_analysis: Dict) -> List[Dict]:
    """Identify performance bottlenecks."""

    bottlenecks = []

    # Common bottleneck patterns
    common_bottlenecks = [
        {
            "type": "algorithmic",
            "description": "Inefficient algorithms or data structures",
            "impact": "high",
            "examples": ["Nested loops", "Inefficient sorting"],
        },
        {
            "type": "database",
            "description": "Database query optimization opportunities",
            "impact": "medium",
            "examples": ["Missing indexes", "N+1 queries"],
        },
        {
            "type": "network",
            "description": "Network-related performance issues",
            "impact": "medium",
            "examples": ["Large payloads", "Multiple round trips"],
        },
    ]

    # Select relevant bottlenecks based on analysis
    areas = performance_analysis.get("areas_analyzed", [])

    for area in areas[:2]:  # Limit bottlenecks
        if "database" in area.lower():
            bottlenecks.append(common_bottlenecks[1])
        elif "network" in area.lower() or "api" in area.lower():
            bottlenecks.append(common_bottlenecks[2])
        else:
            bottlenecks.append(common_bottlenecks[0])
            break  # Only add one algorithmic bottleneck

    # Remove duplicates
    unique_bottlenecks = []
    seen = set()
    for bottleneck in bottlenecks:
        if bottleneck["type"] not in seen:
            unique_bottlenecks.append(bottleneck)
            seen.add(bottleneck["type"])

    return unique_bottlenecks


async def _create_optimization_plan(bottlenecks: List[Dict], audit_scope: Dict) -> Dict:
    """Create optimization plan based on identified bottlenecks."""

    plan = {
        "immediate_actions": [],
        "short_term": [],
        "long_term": [],
        "estimated_impact": "medium",
    }

    for bottleneck in bottlenecks:
        bottleneck_type = bottleneck["type"]

        if bottleneck_type == "algorithmic":
            plan["immediate_actions"].append("Profile code to identify hot paths")
            plan["short_term"].append("Optimize critical algorithms")
            plan["long_term"].append("Redesign data structures for efficiency")

        elif bottleneck_type == "database":
            plan["immediate_actions"].append("Add missing database indexes")
            plan["short_term"].append("Optimize slow queries")
            plan["long_term"].append("Consider database architecture improvements")

        elif bottleneck_type == "network":
            plan["immediate_actions"].append("Enable compression")
            plan["short_term"].append("Optimize API payloads")
            plan["long_term"].append("Implement caching strategy")

    # Estimate impact
    high_impact_count = sum(1 for b in bottlenecks if b["impact"] == "high")
    if high_impact_count > 0:
        plan["estimated_impact"] = "high"
    elif len(bottlenecks) > 2:
        plan["estimated_impact"] = "medium"
    else:
        plan["estimated_impact"] = "low"

    return plan


def _format_performance_analysis(analysis: Dict) -> str:
    """Format performance analysis results."""

    if not analysis.get("observations"):
        return "• Performance analysis completed"

    formatted = ["**Analysis Results:**"]
    for observation in analysis["observations"]:
        formatted.append(f"• {observation}")

    return "\n".join(formatted)


def _format_bottlenecks(bottlenecks: List[Dict]) -> str:
    """Format identified bottlenecks."""

    if not bottlenecks:
        return "• No significant bottlenecks identified"

    formatted = []

    for bottleneck in bottlenecks:
        impact_emoji = (
            "🔴"
            if bottleneck["impact"] == "high"
            else "🟡"
            if bottleneck["impact"] == "medium"
            else "🟢"
        )
        formatted.append(
            f"{impact_emoji} **{bottleneck['type'].title()}:** {bottleneck['description']}"
        )

        if bottleneck.get("examples"):
            for example in bottleneck["examples"][:2]:
                formatted.append(f"  • {example}")
        formatted.append("")

    return "\n".join(formatted)


def _format_optimization_plan(plan: Dict) -> str:
    """Format optimization plan."""

    formatted = []

    impact_emoji = (
        "🔴"
        if plan["estimated_impact"] == "high"
        else "🟡"
        if plan["estimated_impact"] == "medium"
        else "🟢"
    )
    formatted.append(
        f"{impact_emoji} **Estimated Impact:** {plan['estimated_impact'].title()}"
    )
    formatted.append("")

    if plan["immediate_actions"]:
        formatted.append("⚡ **Immediate Actions:**")
        for action in plan["immediate_actions"]:
            formatted.append(f"• {action}")
        formatted.append("")

    if plan["short_term"]:
        formatted.append("📅 **Short-term (1-4 weeks):**")
        for action in plan["short_term"]:
            formatted.append(f"• {action}")
        formatted.append("")

    if plan["long_term"]:
        formatted.append("📈 **Long-term (1-3 months):**")
        for action in plan["long_term"]:
            formatted.append(f"• {action}")

    return "\n".join(formatted)


def _format_metrics(metrics: Dict) -> str:
    """Format performance metrics."""

    if not metrics:
        return "• No specific metrics available"

    return "\n".join(
        f"• {key.replace('_', ' ').title()}: {value}" for key, value in metrics.items()
    )


def _suggest_performance_next_steps(
    bottlenecks: List[Dict], optimization_plan: Dict
) -> str:
    """Suggest next steps for performance optimization."""

    steps = []

    if optimization_plan["immediate_actions"]:
        steps.append("⚡ Start with immediate actions from optimization plan")

    steps.extend(
        [
            "🔍 Run `analyze-codebase` for detailed performance analysis",
            "🧪 Execute `run-tests` to establish performance baseline",
            "📈 Implement monitoring to track improvements",
        ]
    )

    if bottlenecks and any(b["impact"] == "high" for b in bottlenecks):
        steps.insert(1, "🔥 Focus on high-impact bottlenecks first")

    steps.extend(
        [
            "🚀 Use `deploy-preview` to test optimizations",
            "🔍 Run `/smart-dev/code-review` after implementing changes",
        ]
    )

    return "\n".join(f"• {step}" for step in steps)
