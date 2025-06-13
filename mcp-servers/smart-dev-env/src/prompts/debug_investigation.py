"""
Debug Investigation Prompt
Systematic debugging methodology with guided workflows.
"""

from typing import Dict, List


async def debug_investigation_prompt(
    issue_description: str, error_logs: str = ""
) -> str:
    """
    Execute systematic debugging investigation.
    """

    try:
        issue_analysis = await _analyze_issue(issue_description, error_logs)
        investigation_plan = await _create_investigation_plan(issue_analysis)
        debugging_strategy = await _generate_debugging_strategy(issue_analysis)

        return f"""
🐛 **Debug Investigation: {issue_analysis["title"]}**

**Issue Analysis:**
{issue_analysis["summary"]}

**Error Classification:**
{_format_error_classification(issue_analysis)}

**Investigation Plan:**
{_format_investigation_plan(investigation_plan)}

**Debugging Strategy:**
{debugging_strategy["approach"]}

**Recommended Actions:**
{_format_actions(debugging_strategy["actions"])}

**Next Steps:**
{_suggest_debug_next_steps(issue_analysis)}

**Available Tools:**
• `analyze-codebase` - Deep code analysis for bug patterns
• `run-tests` - Execute tests to verify fixes
• `check-dependencies` - Verify dependency issues
• `rollback-changes` - Revert problematic changes

**Related Workflows:**
• `/smart-dev/code-review` - Review fix implementation
• `/smart-dev/refactor-planning` - Plan structural improvements
• `/smart-dev/performance-audit` - Check performance impact
"""

    except Exception as e:
        return f"❌ Debug investigation failed: {str(e)}"


async def _analyze_issue(issue_description: str, error_logs: str) -> Dict:
    """Analyze the reported issue and error logs."""

    analysis = {
        "title": issue_description.split(".")[0][:50]
        if issue_description
        else "Unknown Issue",
        "summary": "",
        "category": "unknown",
        "severity": "medium",
        "error_patterns": [],
    }

    if not issue_description:
        analysis["summary"] = "No issue description provided"
        return analysis

    # Categorize the issue
    text = (issue_description + " " + error_logs).lower()

    if any(word in text for word in ["slow", "timeout", "performance"]):
        analysis["category"] = "performance"
    elif any(word in text for word in ["crash", "exception", "error"]):
        analysis["category"] = "runtime"
    elif any(word in text for word in ["wrong", "incorrect", "unexpected"]):
        analysis["category"] = "logic"
    elif any(word in text for word in ["ui", "display", "visual"]):
        analysis["category"] = "ui"

    # Determine severity
    if any(word in text for word in ["critical", "urgent", "production"]):
        analysis["severity"] = "critical"
    elif any(word in text for word in ["important", "high"]):
        analysis["severity"] = "high"

    analysis["summary"] = (
        f"{analysis['category'].title()} issue with {analysis['severity']} severity"
    )

    return analysis


async def _create_investigation_plan(issue_analysis: Dict) -> Dict:
    """Create a structured investigation plan."""

    plan = {
        "phases": [
            {
                "name": "Information Gathering",
                "steps": [
                    "Reproduce the issue consistently",
                    "Gather system information",
                    "Collect relevant logs",
                    "Identify recent changes",
                ],
            },
            {
                "name": "Root Cause Analysis",
                "steps": [
                    "Analyze error patterns",
                    "Check code changes",
                    "Review dependencies",
                    "Test in isolation",
                ],
            },
            {
                "name": "Solution Implementation",
                "steps": [
                    "Develop potential fixes",
                    "Test solutions",
                    "Verify no regressions",
                    "Document resolution",
                ],
            },
        ]
    }

    return plan


async def _generate_debugging_strategy(issue_analysis: Dict) -> Dict:
    """Generate debugging strategy based on issue type."""

    category = issue_analysis["category"]

    strategies = {
        "performance": {
            "approach": "Performance-focused debugging using profiling",
            "actions": [
                "Profile the application to identify bottlenecks",
                "Monitor resource usage",
                "Optimize critical paths",
            ],
        },
        "runtime": {
            "approach": "Error pattern analysis and systematic debugging",
            "actions": [
                "Analyze stack traces",
                "Check error handling",
                "Test edge cases",
            ],
        },
        "logic": {
            "approach": "Logic tracing and test-driven debugging",
            "actions": [
                "Trace execution flow",
                "Write unit tests",
                "Review business logic",
            ],
        },
        "ui": {
            "approach": "UI-focused debugging and user testing",
            "actions": [
                "Check browser compatibility",
                "Test responsive design",
                "Verify user interactions",
            ],
        },
    }

    return strategies.get(
        category,
        {
            "approach": "Systematic investigation and elimination",
            "actions": [
                "Reproduce in controlled environment",
                "Isolate components",
                "Review recent changes",
            ],
        },
    )


def _format_error_classification(analysis: Dict) -> str:
    """Format error classification for display."""

    return f"""
🏷️ Category: {analysis["category"].title()}
⚠️ Severity: {analysis["severity"].title()}
"""


def _format_investigation_plan(plan: Dict) -> str:
    """Format investigation plan for display."""

    formatted = []

    for i, phase in enumerate(plan["phases"], 1):
        formatted.append(f"**Phase {i}: {phase['name']}**")
        for step in phase["steps"]:
            formatted.append(f"• {step}")
        formatted.append("")  # Empty line

    return "\n".join(formatted)


def _format_actions(actions: List[str]) -> str:
    """Format actions for display."""

    return "\n".join(f"• {action}" for action in actions)


def _suggest_debug_next_steps(issue_analysis: Dict) -> str:
    """Suggest next steps for debugging."""

    category = issue_analysis["category"]
    severity = issue_analysis["severity"]

    steps = []

    if severity == "critical":
        steps.append("⚡ Implement immediate workaround if possible")

    if category == "performance":
        steps.append("📈 Run `/smart-dev/performance-audit` for detailed analysis")

    steps.extend(
        [
            "🔍 Use `analyze-codebase` for detailed code analysis",
            "🧪 Execute `run-tests` to verify current behavior",
            "📝 Implement the debugging strategy outlined above",
        ]
    )

    return "\n".join(f"• {step}" for step in steps)
