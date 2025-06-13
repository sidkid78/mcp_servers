# Business Intelligence MCP Server Documentation

## Core Architecture

- **Server Type**: Full MCP server implementation
- **Components**:
  - 6 agentic workflows (prompts)
  - 6 individual analysis tools
- **Key Design Principles**:
  - Modular separation between prompts (workflows) and tools
  - Business context integration at all levels
  - Multi-tool orchestration for comprehensive analysis

## Workflow Prompts

### /bi-discovery

**Data Source Discovery**  
Initial data profiling with business context analysis

### /bi/insight-investigation

**Business Metric Exploration**  
Guided investigation of key performance indicators

### /bi/correlation-deep-dive

**Multi-Dimensional Analysis**  
Statistical relationship mapping across datasets

### /bi/trend-analysis

**Temporal Patterns**  
Time-series analysis with forecasting capabilities

### /bi/executive-summary

**Leadership Reporting**  
Auto-generated C-suite ready presentations

### /bi/action-recommendations

**Operational Planning**  
Data-driven business action suggestions

## Analysis Tools

| Tool Name               | Capabilities                              |
|-------------------------|-------------------------------------------|
| `load-datasource`       | ETL for CSV, Excel, JSON, DBs, APIs       |
| `profile-dataset`       | Statistical profiling & quality assessment|
| `create-visualization`  | Interactive charts & dashboards           |
| `run-correlation`       | Statistical relationship analysis         |
| `export-report`         | Multi-format output (PDF, PPT, HTML, MD)  |
| `schedule-analysis`     | Automated recurring insights generation   |

## Workflow Orchestration

1. **Initiation**  
   `/bi-discovery` → Data discovery & workflow suggestions
2. **Analysis Phase**  
   - → `/bi/insight-investigation` (Business metrics)  
   - → `/bi/correlation-deep-dive` (Statistical relationships)  
   - → `/bi/trend-analysis` (Forecasting)
3. **Output Generation**  
   - → `/bi/executive-summary` (Leadership reports)  
   - → `/bi/action-recommendations` (Operational plans)

## Key Features

### Analysis Capabilities

- Smart data type detection
- Automated pattern recognition
- Professional-grade statistical analysis
- Time-series forecasting with confidence intervals

### Business Communication

- Executive-level summarization
- Audience-specific adaptations:
  - CEO: Strategic overviews
  - CFO: Financial impacts
  - COO: Operational efficiencies
  - Board: Risk/opportunity analysis

### Technical Capabilities

- Multi-format report generation:
  - PDF, PowerPoint, HTML, Markdown
- Automated scheduling system
- API-based data integration

## Sample Datasets

```plaintext
sample_customers.csv
sample_sales.csv
sample_sales.xlsx
```

## Quick Start Guide

```bash
# Start server
cd business-intelligence
python server.py

# Initiate analysis
/bi-discovery
```

## Architectural Compliance

Implements core patterns:

- Context Priming Pattern
- Composition Pattern 
- Guidance Pattern

**Production Status**: Ready for deployment 🚀