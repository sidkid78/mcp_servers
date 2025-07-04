# Project Management MCP Server

A comprehensive MCP server for intelligent project management with agentic workflows, resource optimization, and delivery planning.

## Overview

The Project Management MCP Server provides senior-level project management capabilities through Claude, featuring:

- **Agentic Workflows**: Multi-step project management processes with intelligent guidance
- **Resource Optimization**: AI-driven team allocation and capacity planning  
- **Risk Management**: Proactive risk identification and mitigation strategies
- **Progress Tracking**: Real-time monitoring with predictive analytics
- **Delivery Planning**: End-to-end delivery orchestration and optimization

## Core Features

### 🚀 Agentic Workflows (Prompts)

**Project Initiation & Planning:**
- `/project-kickoff` - Complete project initiation with stakeholder analysis
- `/milestone-planning` - Break down projects into manageable phases
- `/resource-optimization` - Optimize team allocation and capacity planning

**Monitoring & Control:**
- `/progress-review` - Automated status reporting and bottleneck detection
- `/risk-assessment` - Proactive risk identification and mitigation
- `/delivery-planning` - End-to-end delivery orchestration

### 🛠️ Individual Tools

**Project Setup:**
- `create-project` - Initialize project structure and workspace
- `assign-tasks` - Resource allocation with optimization strategies
- `generate-timeline` - Critical path analysis and Gantt chart generation

**Monitoring & Communication:**
- `track-progress` - Real-time progress monitoring with predictions
- `identify-blockers` - Bottleneck detection and resolution strategies
- `send-notifications` - Stakeholder communication and updates

## Quick Start

### 1. Project Initialization

Start with the project kickoff workflow:

```
/project-management/project-kickoff "Mobile App Redesign" "Complete redesign of mobile application with new UI/UX" "Product Team, Engineering Team, QA Team"
```

This will:
- Analyze project scope and complexity
- Identify stakeholders and roles
- Generate project phases and estimates
- Create initial risk assessment
- Suggest next steps

### 2. Detailed Planning

Break down the project into detailed milestones:

```
/project-management/milestone-planning proj_abc12345
```

This will:

- Create detailed milestone breakdown
- Map dependencies between milestones
- Analyze critical path
- Calculate resource requirements
- Generate timeline recommendations

### 3. Resource Optimization

Optimize team allocation:

```
/project-management/resource-optimization proj_abc12345 "time_and_budget"
```

This will:

- Design optimal team structure
- Create resource allocation plan
- Analyze capacity utilization
- Identify optimization opportunities
- Calculate cost analysis

## Workflow Examples

### Complete Project Setup Flow

```
# 1. Initialize the project
/project-management/project-kickoff "E-commerce Platform" "Build scalable e-commerce platform with mobile app" "CTO, Product Manager, Dev Team"

# 2. Create detailed milestones  
/project-management/milestone-planning proj_abc12345

# 3. Optimize resources
/project-management/resource-optimization proj_abc12345 "balanced"

# 4. Assess risks
/project-management/risk-assessment proj_abc12345 "comprehensive"

# 5. Plan delivery strategy
/project-management/delivery-planning proj_abc12345 "incremental"
```

### Ongoing Project Management

```
# Weekly progress review
/project-management/progress-review proj_abc12345 "weekly"

# Identify and resolve blockers
identify-blockers proj_abc12345 "all" "medium"

# Update stakeholders
send-notifications proj_abc12345 "status_update" ["stakeholders", "team_leads"]
```

## Tool Usage Examples

### Project Creation

```python
# Initialize a new project
create-project "Customer Portal Redesign" "Modernize customer portal with React frontend" 6 16
```

### Task Assignment

```python
# Assign tasks with balanced strategy
assign-tasks "proj_abc12345" [
    {"name": "Database Design", "effort_hours": 40, "required_skills": ["Database Design"], "priority": "high"},
    {"name": "API Development", "effort_hours": 60, "required_skills": ["Backend Development"], "priority": "high"},
    {"name": "UI Components", "effort_hours": 35, "required_skills": ["Frontend Development", "UI/UX"], "priority": "medium"}
] "balanced"
```

### Timeline Generation

```python
# Generate optimized timeline
generate-timeline "proj_abc12345" "time" true
```

### Progress Tracking

```python
# Track progress with predictions
track-progress "proj_abc12345" true true
```

## Architecture Patterns

### 1. Discovery Pattern

Every workflow starts with discovery to understand context:

```python
# Load project context
project_data = await _load_project_data(project_id)

# Analyze current state  
analysis = await _analyze_current_state(project_data)

# Generate recommendations
recommendations = await _generate_recommendations(analysis)
```

### 2. Guidance Pattern

Each workflow provides clear next steps:

```python
return f"""
**Workflow Complete ✅**
Next Steps:
• Use `/project-management/next-workflow {project_id}` 
• Consider running tool-name for specific actions
• Review recommendations and implement suggestions
"""
```

### 3. Optimization Pattern

Tools provide multiple optimization strategies:

```python
if strategy == "time":
    return optimize_for_speed(resources)
elif strategy == "budget":
    return optimize_for_cost(resources)  
else:
    return optimize_balanced(resources)
```

## Integration with Other MCP Servers

### Smart Development Environment

- Use for technical project planning
- Code quality and architecture decisions
- Development workflow optimization

### Business Intelligence  

- Project performance analytics
- Resource utilization insights
- ROI and budget analysis

## Configuration

### Environment Variables

```bash
# Optional: Customize default settings
PROJECT_BUFFER_PERCENTAGE=15
RESOURCE_UTILIZATION_THRESHOLD=85
NOTIFICATION_CHANNELS=email,slack
```

### Team Structure Templates

Configure default team structures in `src/resources/team_templates.json`:

```json
{
  "software_development": {
    "roles": ["Project Manager", "Tech Lead", "Senior Developer", "QA Engineer"],
    "min_team_size": 4,
    "max_team_size": 12
  }
}
```

## Advanced Features

### Predictive Analytics
- Completion date prediction with confidence intervals
- Resource demand forecasting  
- Risk probability modeling

### Resource Optimization
- Multi-constraint optimization (time, budget, quality)
- Skill-based task assignment
- Capacity planning and leveling

### Risk Management
- Automated risk identification
- Impact assessment and probability calculation
- Mitigation strategy generation

## Best Practices

### 1. Start with Discovery
Always begin with `/project-kickoff` to establish context and baselines.

### 2. Iterative Planning
Use milestone planning to break down complex projects into manageable phases.

### 3. Regular Monitoring
Set up weekly progress reviews and blocker identification cycles.

### 4. Stakeholder Communication
Use automated notifications to keep stakeholders informed of progress and issues.

### 5. Continuous Optimization
Regularly review resource allocation and timeline optimization opportunities.

## Development

### Running the Server

```bash
# Install dependencies
pip install -r requirements.txt

# Run the server
python server_fastmcp.py
```

### Testing

```bash
# Run basic connection test
python -m pytest tests/ -v

# Test specific workflows
python test_project_workflows.py
```

## Architecture

```
project-management/
├── server_fastmcp.py          # Main MCP server
├── src/
│   ├── prompts/               # Agentic workflows
│   │   ├── project_kickoff.py
│   │   ├── milestone_planning.py
│   │   ├── resource_optimization.py
│   │   ├── risk_assessment.py
│   │   ├── progress_review.py
│   │   └── delivery_planning.py
│   ├── tools/                 # Individual tools
│   │   ├── create_project.py
│   │   ├── assign_tasks.py
│   │   ├── track_progress.py
│   │   ├── identify_blockers.py
│   │   ├── generate_timeline.py
│   │   └── send_notifications.py
│   └── resources/             # Templates and config
├── requirements.txt
└── README.md
```

## Contributing

1. Follow the established patterns for prompts and tools
2. Each prompt should end with suggested next steps
3. Tools should return comprehensive results with recommendations
4. Maintain consistent error handling and logging
5. Add type hints and documentation

## License

MIT License - see LICENSE file for details.
