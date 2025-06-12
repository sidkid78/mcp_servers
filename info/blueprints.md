# MCP Server Architecture Blueprints

## 1. Smart Development Environment MCP Server

**Core Prompts (Agentic Workflows)**  

- `/dev-setup` - Prime agent with project context and development standards  
- `/code-review` - Multi-step code review workflow with quality gates  
- `/architecture-analysis` - Guided architecture decision trees  
- `/debug-investigation` - Systematic debugging methodology  
- `/refactor-planning` - Safe refactoring workflows with rollback strategies  
- `/performance-audit` - End-to-end performance analysis pipeline  

**Individual Tools**  

- `analyze_codebase` - Static analysis and metrics  
- `run_tests` - Execute test suites with reporting  
- `check_dependencies` - Security and version auditing  
- `generate_docs` - Auto-documentation from code  
- `deploy_preview` - Staging environment deployment  
- `rollback_changes` - Safe rollback mechanisms  

**Guided Experience Example**  

```plaintext
/dev-setup
→ Discovers project type, sets up context
→ Suggests: "Run /code-review on recent changes or /architecture-analysis for new features"

/code-review
→ Analyzes recent commits
→ Runs automated checks
→ Suggests: "Critical issues found. Run /debug-investigation or proceed with /deploy-preview"
```

## 2. Business Intelligence MCP Server

**Core Prompts (Agentic Workflows)**  

- `/bi-discovery` - Data source discovery and initial profiling  
- `/insight-investigation` - Guided exploration of business metrics  
- `/correlation-deep-dive` - Multi-dimensional correlation analysis  
- `/trend-analysis` - Time-series pattern detection  
- `/executive-summary` - Auto-generate C-suite reports  
- `/action-recommendations` - Data-driven business recommendations  

**Individual Tools**  

- `load_datasource` - ETL from various sources  
- `profile_dataset` - Statistical profiling  
- `create_visualization` - Chart/dashboard generation  
- `run_correlation` - Statistical analysis  
- `export_report` - Formatted business reports  
- `schedule_analysis` - Automated recurring insights  

**Guided Experience Example**  

```plaintext
/bi-discovery
→ Scans available data sources
→ Profiles key datasets
→ Suggests: "Strong sales data found. Run /trend-analysis or /correlation-deep-dive"

/insight-investigation revenue_data
→ Discovers revenue patterns
→ Identifies anomalies
→ Suggests: "Revenue dip detected in Q3. Run /correlation-deep-dive to find causes"
```

## 3. Project Management Agentic Workflows

**Core Prompts (Agentic Workflows)**  

- `/project-kickoff` - Complete project initiation workflow  
- `/milestone-planning` - Break down complex projects into phases  
- `/resource-optimization` - Team allocation and capacity planning  
- `/risk-assessment` - Proactive risk identification and mitigation  
- `/progress-review` - Automated status reporting and bottleneck detection  
- `/delivery-planning` - End-to-end delivery orchestration  

**Individual Tools**  

- `create_project` - Project structure setup  
- `assign_tasks` - Resource allocation  
- `track_progress` - Real-time progress monitoring  
- `identify_blockers` - Bottleneck detection  
- `generate_timeline` - Critical path analysis  
- `send_notifications` - Stakeholder communication  

**Guided Experience Example**  

```plaintext
/project-kickoff "Mobile App Redesign"
→ Creates project structure
→ Identifies stakeholders
→ Suggests: "Project created. Run /milestone-planning to break down phases"

/milestone-planning
→ Analyzes project scope
→ Creates milestone breakdown
→ Suggests: "5 milestones identified. Run /resource-optimization to assign teams"
```

## 4. Learning & Documentation MCP Server

**Core Prompts (Agentic Workflows)**  

- `/learning-path-design` - Create adaptive learning curricula  
- `/knowledge-assessment` - Evaluate current understanding  
- `/content-generation` - Auto-create educational materials  
- `/progress-tracking` - Monitor learning effectiveness  
- `/documentation-audit` - Analyze and improve existing docs  
- `/interactive-tutorial` - Generate hands-on learning experiences  

**Individual Tools**  

- `analyze_knowledge_gaps` - Identify learning needs  
- `generate_quiz` - Create assessments  
- `create_tutorial` - Step-by-step guides  
- `track_completion` - Progress monitoring  
- `update_content` - Keep materials current  
- `export_curriculum` - Package learning materials  

**Guided Experience Example**  

```plaintext
/learning-path-design "React Development"
→ Assesses current knowledge
→ Creates personalized curriculum
→ Suggests: "Beginner path created. Start with /interactive-tutorial or take /knowledge-assessment"

/knowledge-assessment react_fundamentals
→ Generates adaptive quiz
→ Identifies weak areas
→ Suggests: "Hooks knowledge gap detected. Run /content-generation for targeted practice"
```

## 5. Infrastructure Automation MCP Server

**Core Prompts (Agentic Workflows)**  

- `/infra-health-check` - Comprehensive system assessment  
- `/deployment-strategy` - Guided deployment planning  
- `/scaling-analysis` - Capacity planning and auto-scaling setup  
- `/incident-response` - Automated incident management  
- `/security-audit` - Infrastructure security assessment  
- `/disaster-recovery` - Backup and recovery workflows  

**Individual Tools**  

- `monitor_services` - Real-time monitoring  
- `deploy_application` - Application deployment  
- `scale_resources` - Auto-scaling management  
- `backup_data` - Data protection  
- `rotate_secrets` - Security maintenance  
- `analyze_logs` - Log analysis and alerting  

**Guided Experience Example**  

```plaintext
/infra-health-check
→ Scans all systems
→ Identifies issues and optimizations
→ Suggests: "High CPU detected on web servers. Run /scaling-analysis or /incident-response"

/deployment-strategy production
→ Analyzes current state
→ Plans safe deployment
→ Suggests: "Blue-green deployment recommended. Ready to /deploy-application or need /security-audit first?"
```

# Key Architecture Patterns

1. **Discovery Pattern**  
   Every MCP server should have a `/list-capabilities` prompt that:
   - Shows all available prompts, tools, and their purposes
   - Provides a quick-start workflow
   - Suggests common entry points

2. **Composition Pattern**  
   Prompts should chain tools together:

   ```python
   def correlation_investigation_prompt(dataset_name):
       # Run multiple tools in sequence
       profile_result = run_tool("profile_dataset", dataset_name)
       correlations = run_tool("find_correlations", dataset_name)
       suggestions = generate_next_steps(correlations)
       
       return f"Analysis complete. {suggestions}"
   ```

3. **Guidance Pattern**  
   Every prompt should end with suggested next steps:
   - Related prompts to run
   - Tools to use with specific parameters
   - Alternative workflows based on results

4. **Context Priming Pattern**  
   Use prompts to load domain knowledge into the agent's context:

   ```python
   def setup_prompt():
       return """
       Loaded development environment with:
       - Standards: PEP8, ESLint, TypeScript strict
       - Testing: Jest, PyTest, Cypress
       - Deployment: Docker, K8s, AWS
       
       Ready for /code-review, /architecture-analysis, or /debug-investigation
       """
   ```

5. **Modular File Structure**  

   ```plaintext
   mcp-server/
   ├── prompts/
   │   ├── discovery_prompt.py
   │   ├── workflow_prompt.py
   │   └── analysis_prompt.py
   ├── tools/
   │   ├── data_tool.py
   │   ├── analysis_tool.py
   │   └── export_tool.py
   ├── resources/
   │   └── templates/
   └── server.py
   ```

# Implementation Tips

- **Start with the workflow** - Design prompts first, then build supporting tools  
- **One file per function** - Keep tools and prompts isolated for easy testing  
- **Rich return values** - Prompts should return actionable insights, not just data  
- **Progressive disclosure** - Start simple, offer advanced workflows as options  
- **Context awareness** - Use previous prompt results to inform next steps  