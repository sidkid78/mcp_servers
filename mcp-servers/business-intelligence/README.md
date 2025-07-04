# Business Intelligence MCP Server - Development Setup

## Overview
This is a sophisticated business intelligence MCP (Model Context Protocol) server that provides data analysis, visualization, and reporting capabilities with guided business insights discovery.

## Project Structure
```
business-intelligence/
├── server_fastmcp.py          # Main MCP server entry point
├── data/                      # Data handling modules
├── src/
│   ├── prompts/              # Agentic workflow prompts
│   │   ├── bi_discovery.py
│   │   ├── insight_investigation.py
│   │   ├── correlation_deep_dive.py
│   │   ├── trend_analysis.py
│   │   ├── executive_summary.py
│   │   └── action_recommendations.py
│   └── tools/                # Model-controlled functions
│       ├── load_datasource.py
│       ├── profile_dataset.py
│       ├── create_visualization.py
│       ├── run_correlation.py
│       ├── export_report.py
│       └── schedule_analysis.py
├── docs/                     # Documentation
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

## Code Quality Metrics
- **Total Lines**: 9,038 across 15 files
- **Complexity Score**: 10/10 (High)
- **Quality Score**: 60/100 (Moderate)
- **Technical Debt**: 54.6 hours estimated to resolve
- **Main Issues**: Long lines (129), debug code (37), deep nesting (19)

## Prerequisites
- Python 3.9 or higher
- Git
- Virtual environment tool (venv, conda, or virtualenv)

## Quick Start

### 1. Clone and Navigate
```bash
cd C:\Users\sidki\source\repos\finale\mcp-servers\business-intelligence
```

### 2. Create Virtual Environment
```bash
# Using venv
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Linux/Mac

# Using conda
conda create -n bi-mcp python=3.11
conda activate bi-mcp
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Server
```bash
python server_fastmcp.py
```

## Development Workflow

### Code Quality Tools
```bash
# Format code
black .

# Lint code
flake8 .

# Type checking
mypy .
```

### Testing
```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=src --cov-report=html
```

### Key Features
- **Data Loading**: Support for CSV, Excel, JSON, Parquet formats
- **SQL Queries**: Execute SQL on loaded datasets
- **Data Profiling**: Comprehensive dataset analysis
- **Correlations**: Statistical relationship discovery
- **Visualizations**: Charts and dashboards
- **Business Segmentation**: Customer/product analysis
- **KPI Dashboards**: Key performance indicators
- **Export Capabilities**: PDF, Excel, PowerPoint reports
- **Scheduled Analysis**: Automated insights

### Available Tools (Model-controlled)
- `load_business_dataset`: Load data from various formats
- `execute_sql_query`: Run SQL queries on datasets
- `profile_dataset`: Generate dataset profiling
- `find_business_correlations`: Correlation analysis
- `segment_business_data`: Business segmentation
- `create_kpi_dashboard`: KPI dashboard generation
- `export_analysis`: Export results to various formats
- `create_visualization`: Generate charts and visualizations

### Available Prompts (User-controlled workflows)
- `bi-discovery`: Data source discovery and profiling
- `insight-investigation`: Guided business metrics exploration
- `correlation-deep-dive`: Multi-dimensional correlation analysis
- `trend-analysis`: Time-series pattern detection
- `executive-summary`: C-suite ready business reports
- `action-recommendations`: Data-driven business recommendations

## Configuration

### Environment Variables
Create a `.env` file for configuration:
```env
# Database Configuration
DB_PATH=./data/business_intelligence.db

# Logging Level
LOG_LEVEL=INFO

# Export Directory
EXPORT_DIR=./exports

# Temp Directory
TEMP_DIR=./temp
```

### Logging
The server uses structured logging with output to `business-intelligence.log`. Adjust logging levels in the server configuration.

## Troubleshooting

### Common Issues
1. **Import Errors**: Ensure all dependencies are installed
2. **File Not Found**: Check file paths and permissions
3. **Memory Issues**: Use data sampling for large datasets
4. **SQL Errors**: Verify table names and column references

### Performance Optimization
- Use data sampling for initial exploration
- Implement caching for repeated queries
- Consider database indexing for large datasets
- Monitor memory usage with large files

## Contributing

### Code Style
- Follow PEP 8 standards
- Use Black for formatting
- Add type hints
- Write comprehensive docstrings

### Pull Request Process
1. Create feature branch
2. Run tests and linting
3. Update documentation
4. Submit pull request

## License
[Add your license information here]

## Support
[Add support contact information here]
