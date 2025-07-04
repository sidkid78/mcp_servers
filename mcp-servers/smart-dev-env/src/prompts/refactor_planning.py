"""
Refactor Planning Prompt
Safe refactoring workflows with rollback strategies.
"""

async def refactor_planning_prompt(target_code: str, goals: str = "") -> str:
    """
    Return INSTRUCTIONS for Claude to plan safe refactoring with rollback strategies.
    """
    
    return f"""
You are a refactoring expert. Plan a safe refactoring strategy for '{target_code}' with goals: "{goals or 'general improvement'}".

WORKFLOW TO EXECUTE:

1. **Target Analysis**
   - Use `analyze_codebase` on '{target_code}' to understand the current state
   - Identify the scope (single file, module, or entire system)
   - Assess current code quality, complexity, and maintainability
   - Check for existing test coverage with `run_tests`
   - Identify dependencies and potential impact areas

2. **Goal Definition and Strategy**
   - Based on goals "{goals or 'general improvement'}", define specific objectives:
     * If performance focused → identify bottlenecks and optimization targets
     * If maintainability focused → look for code smells, duplication, complexity
     * If security focused → identify vulnerable patterns and hardening opportunities
     * If architecture focused → assess structure and design patterns
   - Prioritize refactoring targets by impact and risk

3. **Risk Assessment**
   - Evaluate refactoring risks:
     * Code complexity and interconnectedness
     * Test coverage gaps
     * Business critical functionality
     * Team knowledge and experience
   - Identify potential breaking changes
   - Plan mitigation strategies for each risk

4. **Phased Refactoring Plan**
   Create a detailed, step-by-step plan:
   
   **Phase 1: Preparation and Safety**
   - Establish comprehensive test coverage where missing
   - Create backup/branch for rollback capability
   - Document current behavior and edge cases
   - Set up monitoring for regression detection
   
   **Phase 2: Incremental Changes**
   - Break down refactoring into small, isolated changes
   - Plan order of operations (dependencies first, then dependents)
   - Define success criteria for each step
   - Plan testing strategy for each increment
   
   **Phase 3: Validation and Cleanup**
   - Comprehensive testing strategy
   - Performance verification if applicable
   - Code quality metrics comparison
   - Documentation updates

5. **Rollback Strategy**
   - Plan specific rollback points and procedures
   - Identify what triggers a rollback decision
   - Document how to safely revert changes
   - Plan communication strategy if rollback needed

6. **Implementation Recommendations**
   - Suggest specific refactoring techniques for the identified issues
   - Recommend tools and approaches for the technology stack
   - Provide code quality metrics to track improvement
   - Suggest timeline and resource requirements

IMPORTANT:
- Start with `analyze_codebase` on '{target_code}' to understand what you're working with
- Focus on the specific goals: "{goals or 'general improvement'}"
- Prioritize safety and incremental progress over speed
- Make the plan concrete and actionable, not theoretical
- Consider the actual codebase structure and constraints

AVAILABLE TOOLS:
- `analyze_codebase` - understand current code quality and structure
- `run_tests` - verify test coverage and establish baselines
- `check_dependencies` - ensure dependencies won't complicate refactoring
- `rollback_changes` - for emergency rollbacks if needed

FOLLOW-UP WORKFLOWS:
- Before starting → use `/smart-dev/code-review` to baseline current quality
- During refactoring → use tools to verify each step
- After completion → run `/smart-dev/performance-audit` if applicable

Begin the refactoring analysis and planning now.
"""
