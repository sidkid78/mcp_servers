# Smart Development Environment MCP Server

A senior developer pair programmer that guides code reviews, architecture decisions, and debugging workflows.

## Features

### High-Leverage Prompts (Agentic Workflows)

- `dev-setup` - Prime agent with project context and development standards
- `code-review` - Multi-step code review workflow with quality gates
- `architecture-analysis` - Guided architecture decision trees
- `debug-investigation` - Systematic debugging methodology
- `refactor-planning` - Safe refactoring workflows with rollback strategies
- `performance-audit` - End-to-end performance analysis pipeline

### Individual Tools

- `analyze-codebase` - Static analysis and code metrics
- `run-tests` - Execute test suites with reporting
- `check-dependencies` - Security and version auditing
- `generate-docs` - Auto-documentation from code
- `deploy-preview` - Staging environment deployment
- `rollback-changes` - Safe rollback mechanisms

## Installation

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Configure MCP client to use this server by adding to your MCP configuration:

```json
{
  "mcpServers": {
    "smart-dev-env": {
      "command": "python",
      "args": ["path/to/server.py"]
    }
  }
}
```

## Usage

### Discovery Workflow

Start with the discovery prompt to prime the agent:

```
/smart-dev/dev-setup .
```

### Code Review Workflow

Review recent changes:

```
/smart-dev/code-review HEAD
```

### Architecture Analysis

Analyze system design:
```
/smart-dev/architecture-analysis src
```

### Debug Investigation

Investigate issues:

```
/smart-dev/debug-investigation "Application crashes on startup"
```

## Architecture

Following MCP best practices with prompts as the highest leverage primitive:

- **Prompts** compose multiple tools into guided workflows
- **Tools** are individual actions  
- **Context priming** loads domain knowledge into agent memory
- **Next-step suggestions** maintain momentum in workflows

## Example Workflows

1. **Project Setup**: `dev-setup` → `architecture-analysis` → `code-review`
2. **Bug Investigation**: `debug-investigation` → `analyze-codebase` → `run-tests`
3. **Deployment**: `code-review` → `run-tests` → `deploy-preview`
4. **Emergency Response**: `debug-investigation` → `rollback-changes`

---
Built following the principle that **prompts are higher leverage than tools** because they create repeatable, guided workflows.
