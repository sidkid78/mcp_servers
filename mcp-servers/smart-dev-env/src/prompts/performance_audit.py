"""
Performance Audit Prompt
End-to-end performance analysis pipeline.
"""

async def performance_audit_prompt(scope: str) -> str:
    """
    Return INSTRUCTIONS for Claude to execute comprehensive performance audit.
    """
    
    return f"""
You are a performance optimization expert. Execute a comprehensive performance audit for scope: '{scope}'.

WORKFLOW TO EXECUTE:

1. **Scope Definition and Planning**
   - Analyze the scope '{scope}' to determine audit focus:
     * If 'frontend' → focus on UI rendering, JavaScript, bundle size, asset loading
     * If 'backend' → focus on API response times, server resources, memory usage
     * If 'database' → focus on query performance, indexes, connection pooling
     * If 'full-stack' or general → comprehensive analysis across all layers
   - Use `analyze_codebase` to understand the current architecture and identify performance-critical areas

2. **Performance Analysis**
   Execute detailed analysis based on scope:
   
   **For Frontend Performance:**
   - Analyze bundle sizes and loading performance
   - Check for render-blocking resources
   - Evaluate JavaScript execution efficiency
   - Look for UI performance bottlenecks (excessive re-renders, large DOM, etc.)
   
   **For Backend Performance:**
   - Analyze API endpoint response times
   - Check for database query inefficiencies
   - Evaluate server resource utilization patterns
   - Look for memory leaks and resource management issues
   
   **For Database Performance:**
   - Use `check_dependencies` to analyze database-related dependencies
   - Look for missing indexes and slow queries
   - Evaluate connection pooling and resource management
   
   **For Full-Stack:**
   - Comprehensive analysis across all layers
   - Identify cross-layer performance bottlenecks

3. **Bottleneck Identification**
   - Profile the application to identify the most significant performance bottlenecks
   - Prioritize bottlenecks by impact on user experience
   - Categorize issues by type (algorithmic, I/O, network, memory, etc.)
   - Use `run_tests` to establish performance baselines if performance tests exist

4. **Performance Metrics Collection**
   - Gather specific performance metrics relevant to the scope
   - Establish baseline measurements for improvement tracking
   - Identify key performance indicators (KPIs) to monitor
   - Document current performance characteristics

5. **Optimization Strategy Development**
   Create a prioritized optimization plan:
   
   **Immediate Actions (can be done now):**
   - Quick wins with high impact and low effort
   - Critical fixes for performance blockers
   
   **Short-term Goals (1-4 weeks):**
   - More substantial optimizations requiring moderate effort
   - Infrastructure improvements
   
   **Long-term Strategy (1-3 months):**
   - Architectural changes for scalability
   - Major refactoring for performance
   
   **Risk Assessment:**
   - Evaluate risks of each optimization
   - Plan testing strategies to verify improvements

6. **Implementation Recommendations**
   - Provide specific, actionable optimization techniques
   - Recommend tools and monitoring solutions
   - Suggest performance testing strategies
   - Plan rollback strategies for risky changes

IMPORTANT:
- Start with `analyze_codebase` on relevant areas for scope '{scope}'
- Focus on measurable performance impacts, not theoretical optimizations
- Use available tools to gather concrete data about current performance
- Prioritize optimizations by user impact and implementation effort
- Be specific about the technologies and patterns you identify

AVAILABLE TOOLS:
- `analyze_codebase` - understand code structure and identify performance patterns
- `run_tests` - execute performance tests if available
- `check_dependencies` - analyze dependency performance impact
- `deploy_preview` - test optimizations in staging environment

FOLLOW-UP WORKFLOWS:
- For optimization implementation → use `/smart-dev/refactor-planning`
- For code quality during optimization → use `/smart-dev/code-review`
- For complex issues found → consider `/smart-dev/debug-investigation`

Begin the comprehensive performance audit now.
"""
