"""
Debug Investigation Prompt
Systematic debugging methodology with guided workflows.
"""

async def debug_investigation_prompt(issue_description: str, error_logs: str = "") -> str:
    """
    Return INSTRUCTIONS for Claude to execute systematic debugging investigation.
    """
    
    return f"""
You are a debugging expert. Systematically investigate this issue: "{issue_description}"
{f"With error logs: {error_logs}" if error_logs else ""}

WORKFLOW TO EXECUTE:

1. **Issue Analysis and Classification**
   - Analyze the issue description: "{issue_description}"
   - If error logs provided, parse and analyze: "{error_logs}"
   - Classify the issue type (performance, runtime error, logic bug, UI issue, etc.)
   - Determine severity level (critical, high, medium, low)
   - Identify error patterns and potential root causes

2. **Information Gathering**
   - Use `analyze_codebase` to understand the relevant code areas
   - Identify recent changes that might have introduced the bug
   - Look for similar issues or patterns in the codebase
   - Check if this issue affects specific environments or configurations

3. **Root Cause Investigation**
   - Form specific hypotheses about what's causing the issue
   - Use `run_tests` to see if existing tests reveal the problem
   - Analyze the call stack and execution flow if error logs are available
   - Check dependencies with `check_dependencies` if it might be a dependency issue
   - Look for race conditions, edge cases, or invalid assumptions

4. **Systematic Testing of Hypotheses**
   - Test each hypothesis methodically
   - Create minimal reproduction cases
   - Isolate the problem to specific components or functions
   - Use debugging techniques appropriate for the technology stack

5. **Solution Development**
   - Once root cause is identified, develop specific fix strategies
   - Consider multiple solution approaches with pros/cons
   - Plan how to test the fix thoroughly
   - Consider if this reveals systemic issues that need broader fixes

6. **Prevention Strategy**
   - Recommend tests to prevent regression
   - Suggest code patterns to avoid similar issues
   - Identify if monitoring or alerting could have caught this earlier

DEBUGGING METHODOLOGY:
- Follow the scientific method: hypothesis → test → refine
- Use binary search to narrow down the problem space
- Add logging/debugging output strategically
- Don't guess - gather data to support conclusions
- Consider the "last known good" state

IMPORTANT:
- Start by using `analyze_codebase` to understand the relevant code
- Be systematic - don't jump to conclusions
- Focus on the actual issue described: "{issue_description}"
- Use available tools to gather concrete evidence
- Provide specific, actionable debugging steps

AVAILABLE TOOLS:
- `analyze_codebase` - understand code structure and find patterns
- `run_tests` - execute tests to verify current behavior
- `check_dependencies` - verify if dependencies are causing issues
- `rollback_changes` - revert to previous state if needed

FOLLOW-UP WORKFLOWS:
- Once fix is identified → use `/smart-dev/code-review` to review the solution
- If systemic issues found → consider `/smart-dev/refactor-planning`
- If performance related → follow up with `/smart-dev/performance-audit`

Begin the systematic debugging investigation now.
"""
