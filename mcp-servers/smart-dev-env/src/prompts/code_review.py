"""
Code Review Prompt
Multi-step code review workflow with quality gates.
"""

async def code_review_prompt(target: str, severity: str = "thorough") -> str:
    """
    Return INSTRUCTIONS for Claude to execute a comprehensive code review workflow.
    """
    
    return f"""
You are a senior software engineer conducting a code review. Execute a comprehensive {severity}-level review of '{target}'.

WORKFLOW TO EXECUTE:

1. **Scope Discovery**
   First, determine what you're reviewing:
   - If '{target}' is a git reference (HEAD, main, etc.), you'll need to identify recent changes
   - If it's a file path, focus on that specific file or directory  
   - If it's a pattern, find matching files
   - Use `analyze_codebase` tool with path '{target}' to understand the codebase structure

2. **Multi-Layer Analysis**
   Execute these analyses based on severity level '{severity}':
   
   **Basic Level (all reviews):**
   - Code quality and style issues
   - Basic complexity analysis using `analyze_codebase`
   - Obvious bugs or anti-patterns
   
   **Thorough Level (if severity is thorough or critical):**
   - Use `check_dependencies` for security vulnerabilities on relevant manifest files
   - Use `run_tests` to verify test coverage and quality
   - Performance implications
   - Architecture concerns
   
   **Critical Level (if severity is critical):**
   - Deep security analysis
   - Data flow and side effects review
   - Error handling robustness
   - Production readiness assessment

3. **Quality Gates Assessment**
   Evaluate against these gates and provide clear PASS/FAIL status:
   - ✅/❌ Code Quality: Style, complexity, maintainability
   - ✅/❌ Security: Vulnerabilities, safe practices  
   - ✅/❌ Testing: Coverage, test quality
   - ✅/❌ Performance: Efficiency, resource usage
   - ✅/❌ Documentation: Code comments, README updates

4. **Issue Prioritization**
   Categorize all findings by:
   - 🔴 Critical: Must fix before merge
   - 🟡 Important: Should fix soon  
   - 🟢 Minor: Nice to have improvements

5. **Actionable Recommendations**
   Provide specific, actionable next steps:
   - Exact code changes needed
   - Specific tools to run (`run_tests`, `check_dependencies`, etc.)
   - Follow-up workflows (`/smart-dev/debug-investigation`, `/smart-dev/refactor-planning`)

6. **Final Approval Decision**
   Make a clear recommendation:
   - ✅ APPROVED: Ready to merge
   - ⚠️ CONDITIONAL: Fix minor issues then merge
   - ❌ NEEDS WORK: Major issues must be addressed

IMPORTANT: 
- Actually execute this workflow using the available tools
- Start with `analyze_codebase` on '{target}' to understand what you're reviewing
- Provide specific, concrete feedback about the actual code, not generic advice
- Use severity level '{severity}' to determine depth of analysis
- Be decisive in your final recommendation

Begin the code review analysis now.
"""
