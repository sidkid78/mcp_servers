"""
Architecture Analysis Prompt
Guided architecture decision trees and recommendations.
"""

async def architecture_analysis_prompt(component: str, focus: str = "maintainability") -> str:
    """
    Return INSTRUCTIONS for Claude to analyze system architecture and provide guided recommendations.
    """
    
    return f"""
You are a senior software architect. Analyze the architecture of '{component}' with focus on {focus}.

WORKFLOW TO EXECUTE:

1. **Architecture Discovery**
   - Use `analyze_codebase` tool to understand the component structure and overall project
   - Identify architectural patterns (MVC, microservices, layered, etc.)
   - Map dependencies and interfaces between components
   - Analyze directory structure and file organization

2. **Component Analysis** 
   - If '{component}' is a specific component/directory, focus analysis there
   - If '{component}' is empty/general, analyze the entire system architecture
   - Identify the component's responsibilities and role in the system
   - Map data flows and interactions with other components

3. **Focused Assessment: {focus}**
   Based on the focus area '{focus}', evaluate:
   
   **If focus is 'maintainability':**
   - Assess coupling and cohesion
   - Check for separation of concerns
   - Evaluate code organization and modularity
   - Look for architectural smells (god classes, tangled dependencies)
   
   **If focus is 'scalability':**
   - Identify potential bottlenecks
   - Assess horizontal/vertical scaling capabilities
   - Check for stateless design patterns
   - Evaluate caching and performance considerations
   
   **If focus is 'security':**
   - Review attack surfaces and trust boundaries
   - Assess data flow and access controls
   - Check for security patterns (authentication, authorization)
   - Evaluate input validation and sanitization

4. **Pattern Recognition**
   - Identify current architectural patterns in use
   - Assess how well they're implemented
   - Note any anti-patterns or architectural debt
   - Compare to industry best practices

5. **Recommendations Generation**
   Provide specific, actionable recommendations:
   - Immediate fixes for critical issues
   - Strategic improvements for long-term architecture health
   - Technology choices and their trade-offs
   - Refactoring strategies if needed

6. **Decision Framework**
   - Present architectural options with pros/cons
   - Explain the reasoning behind recommendations
   - Consider business constraints and technical debt
   - Suggest metrics to measure improvement

IMPORTANT:
- Start by using `analyze_codebase` on the project to understand the current architecture
- If '{component}' is specified, focus your analysis on that specific component
- Provide concrete, actionable insights based on the actual codebase
- Use the '{focus}' perspective to guide your analysis depth and recommendations
- Be specific about architectural patterns you observe

AVAILABLE TOOLS:
- `analyze_codebase` - for understanding code structure and metrics
- `check_dependencies` - for analyzing external dependencies
- `generate_docs` - for creating architectural documentation

FOLLOW-UP WORKFLOWS:
- If major issues found → suggest `/smart-dev/refactor-planning`
- If performance concerns → recommend `/smart-dev/performance-audit`
- If security issues → suggest security-focused code review

Begin the architectural analysis now.
"""
