#!/usr/bin/env python3
"""
Business Intelligence MCP Server (FastMCP Version)
A sophisticated data analysis platform with guided business insights discovery.
"""

import sys
from pathlib import Path
from typing import Dict, Optional
import pandas as pd
import sqlite3
import tempfile
import os
import logging

# Setup logging to capture tool and prompt usage and save to file
logger = logging.getLogger("business-intelligence")
if not logger.handlers:
    logger.setLevel(logging.DEBUG)
    fh = logging.FileHandler("business-intelligence.log")
    fh.setLevel(logging.DEBUG)
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")
    fh.setFormatter(formatter)
    logger.addHandler(fh)

from mcp.server.fastmcp import FastMCP

# Global dataset storage for persistence across tool calls
_DATASET_STORAGE = {}
_SQL_DB_PATH = None
_SQL_CONNECTION = None

def get_sql_database():
    """Get or create SQLite database for SQL queries with proper connection management."""
    global _SQL_DB_PATH
    logger.info("get_sql_database called")
    if _SQL_DB_PATH is None:
        # Create a unique database file for this session
        import uuid
        temp_dir = tempfile.gettempdir()
        session_id = str(uuid.uuid4())[:8]
        _SQL_DB_PATH = os.path.join(temp_dir, f"mcp_bi_database_{session_id}.db")
        logger.info(f"Creating new SQL database at {_SQL_DB_PATH}")
    
    # Always create a new connection with WAL mode for better concurrency
    conn = sqlite3.connect(_SQL_DB_PATH, timeout=30.0, check_same_thread=False)
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    logger.info("SQLite connection created with WAL mode")
    return conn

def store_dataset(name: str, data: pd.DataFrame):
    """Store dataset in both memory and SQL database with proper error handling."""
    global _DATASET_STORAGE
    _DATASET_STORAGE[name] = data
    logger.info(f"Storing dataset '{name}' in memory")
    
    # Store in SQL database for queries with retry logic
    max_retries = 3
    for attempt in range(max_retries):
        try:
            conn = get_sql_database()
            # Sanitize table name for SQL
            table_name = name.replace('-', '_').replace(' ', '_')
            # Store without method='multi' for better compatibility
            data.to_sql(table_name, conn, if_exists='replace', index=False)
            conn.commit()
            conn.close()
            logger.info(f"Successfully stored dataset '{name}' as table '{table_name}' in SQL database")
            break
        except Exception as e:
            if attempt == max_retries - 1:
                logger.error(f"Failed to store dataset in SQL after {max_retries} attempts: {e}")
            else:
                logger.warning(f"Attempt {attempt+1} to store dataset '{name}' failed: {e}. Retrying.")
                import time
                time.sleep(0.1 * (attempt + 1))  # Progressive backoff

def get_dataset(name: str) -> Optional[pd.DataFrame]:
    """Retrieve dataset from storage."""
    logger.info(f"Retrieving dataset '{name}' from storage")
    return _DATASET_STORAGE.get(name)

def list_datasets() -> list:
    """List all available datasets."""
    logger.info("Listing all available datasets")
    return list(_DATASET_STORAGE.keys())

# Add src directory to path for imports
sys.path.append(str(Path(__file__).parent / "src"))
logger.info("Added 'src' directory to sys.path")

from src.prompts.bi_discovery import bi_discovery_prompt
from src.prompts.insight_investigation import insight_investigation_prompt
from src.prompts.correlation_deep_dive import correlation_deep_dive_prompt
from src.prompts.trend_analysis import trend_analysis_prompt
from src.prompts.executive_summary import executive_summary_prompt
from src.prompts.action_recommendations import action_recommendations_prompt

from src.tools.load_datasource import load_datasource_tool
from src.tools.profile_dataset import profile_dataset_tool
from src.tools.create_visualization import create_visualization_tool
from src.tools.run_correlation import run_correlation_tool
from src.tools.export_report import export_report_tool
from src.tools.schedule_analysis import schedule_analysis_tool

# Create FastMCP server instance
mcp = FastMCP("business-intelligence")
logger.info("FastMCP server instance created for 'business-intelligence'")

# =============================================================================
# TOOLS (Model-controlled functions)
# =============================================================================

@mcp.tool()
async def load_business_dataset(
    file_path: str, 
    dataset_name: Optional[str] = None
) -> Dict:
    """
    Load dataset from various formats (CSV, Excel, JSON, Parquet).
    
    Args:
        file_path: Path to data file
        dataset_name: Name for the dataset (optional)
    """
    logger.info(f"Tool load_business_dataset called with file_path='{file_path}' and dataset_name='{dataset_name}'")
    try:
        # Determine file type
        file_path = Path(file_path)
        if not file_path.exists():
            err = f"File not found: {file_path}. Tried: {file_path}, datasets/{file_path.name}, data_analysis_mcp/datasets/{file_path.name}"
            logger.error(err)
            return {"error": err}
        
        # Auto-generate dataset name if not provided
        if not dataset_name:
            dataset_name = file_path.stem
            logger.info(f"Auto-generated dataset name: '{dataset_name}'")
            
        # Load based on file extension
        if file_path.suffix.lower() == '.csv':
            # Try different encodings for CSV files
            encodings_to_try = ['utf-8', 'latin-1', 'cp1252', 'iso-8859-1']
            data = None
            encoding_used = None
            
            for encoding in encodings_to_try:
                try:
                    data = pd.read_csv(file_path, encoding=encoding)
                    encoding_used = encoding
                    logger.info(f"CSV file read successfully with encoding '{encoding}'")
                    break
                except UnicodeDecodeError:
                    logger.warning(f"UnicodeDecodeError with encoding '{encoding}' for file '{file_path}'")
                    continue
                except Exception as e:
                    if encoding == encodings_to_try[-1]:  # Last encoding attempt
                        logger.error(f"Failed to read CSV with encoding '{encoding}': {e}")
                        return {"error": f"Failed to read CSV: {str(e)}"}
            
            if data is None:
                logger.error("Could not decode CSV file with any supported encoding")
                return {"error": "Could not decode CSV file with any supported encoding"}
                
        elif file_path.suffix.lower() in ['.xlsx', '.xls']:
            data = pd.read_excel(file_path)
            logger.info("Excel file read successfully")
        elif file_path.suffix.lower() == '.json':
            data = pd.read_json(file_path)
            logger.info("JSON file read successfully")
        elif file_path.suffix.lower() == '.parquet':
            data = pd.read_parquet(file_path)
            logger.info("Parquet file read successfully")
        else:
            err = f"Unsupported file format: {file_path.suffix}"
            logger.error(err)
            return {"error": err}
        
        # Store dataset in both memory and SQL database
        store_dataset(dataset_name, data)
        
        # Verify SQL storage worked
        try:
            conn = get_sql_database()
            table_name = dataset_name.replace('-', '_').replace(' ', '_')
            test_query = f"SELECT COUNT(*) as count FROM {table_name}"
            test_result = pd.read_sql_query(test_query, conn)
            conn.close()
            sql_stored = True
            logger.info(f"SQL storage verification succeeded for table '{table_name}'")
        except Exception as e:
            logger.error(f"SQL verification failed: {e}")
            sql_stored = False
        
        # Return summary
        result = {
            "dataset_name": dataset_name,
            "file_path": str(file_path),
            "shape": list(data.shape),
            "columns": list(data.columns),
            "dtypes": {col: str(dtype) for col, dtype in data.dtypes.items()},
            "missing_values": {col: int(data[col].isnull().sum()) for col in data.columns},
            "memory_usage": f"{data.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB",
            "sample_data": data.head(3).to_dict('records'),
            "loaded_at": pd.Timestamp.now().isoformat()
        }
        
        # Add encoding info for CSV files
        if file_path.suffix.lower() == '.csv' and 'encoding_used' in locals():
            result["encoding_used"] = encoding_used
        
        # Add SQL storage status
        result["sql_database_stored"] = sql_stored
        logger.info(f"Dataset '{dataset_name}' loaded successfully with shape {data.shape}")
            
        return result
        
    except Exception as e:
        logger.exception(f"Failed to load dataset: {e}")
        return {"error": f"Failed to load dataset: {str(e)}"}

@mcp.tool()
async def execute_sql_query(
    dataset_name: str,
    sql_query: str
) -> Dict:
    """
    Execute SQL query on loaded dataset.
    
    Args:
        dataset_name: Name of loaded dataset
        sql_query: SQL query to execute
    """
    logger.info(f"Tool execute_sql_query called with dataset_name='{dataset_name}' and sql_query='{sql_query}'")
    try:
        # Check if dataset exists
        if dataset_name not in _DATASET_STORAGE:
            available = list_datasets()
            err = f"Dataset '{dataset_name}' not found"
            logger.error(err)
            return {
                "error": err,
                "available_datasets": available,
                "suggestion": "Load dataset first using load_business_dataset tool"
            }
        
        # Execute SQL query with table name substitution
        conn = get_sql_database()
        try:
            table_name = dataset_name.replace('-', '_').replace(' ', '_')
            modified_query = sql_query.replace(dataset_name, table_name)
            result = pd.read_sql_query(modified_query, conn)
            conn.close()
            logger.info(f"SQL query executed successfully on table '{table_name}'")
            return {
                "dataset_name": dataset_name,
                "sql_query": sql_query,
                "modified_query": modified_query,
                "table_name": table_name,
                "result_shape": list(result.shape),
                "result_columns": list(result.columns),
                "result_data": result.to_dict('records'),
                "executed_at": pd.Timestamp.now().isoformat()
            }
        except Exception as sql_error:
            conn.close()
            logger.error(f"SQL execution failed: {sql_error}")
            return {
                "error": f"SQL execution failed: {str(sql_error)}",
                "sql_query": sql_query,
                "table_name": dataset_name.replace('-', '_').replace(' ', '_'),
                "suggestion": "Check SQL syntax and ensure table/column names are correct. Use table name: " + dataset_name.replace('-', '_').replace(' ', '_')
            }
    except Exception as e:
        logger.exception(f"Query execution failed: {e}")
        return {"error": f"Query execution failed: {str(e)}"}

@mcp.tool()
async def profile_dataset(
    dataset_name: str
) -> Dict:
    """
    Generate comprehensive dataset profiling and quality analysis.
    
    Args:
        dataset_name: Name of loaded dataset
    """
    logger.info(f"Tool profile_dataset called for dataset '{dataset_name}'")
    result = await profile_dataset_tool(dataset_name)
    logger.info(f"Dataset profiling completed for '{dataset_name}'")
    return result

@mcp.tool()
async def find_business_correlations(
    dataset_name: str,
    min_correlation: float = 0.5
) -> Dict:
    """
    Find correlations between numerical variables.
    
    Args:
        dataset_name: Name of loaded dataset
        min_correlation: Minimum correlation threshold (0-1)
    """
    logger.info(f"Tool find_business_correlations called with dataset '{dataset_name}' and min_correlation={min_correlation}")
    result = await run_correlation_tool(dataset_name, "pearson", "", [], min_correlation)
    logger.info(f"Business correlations analysis completed for '{dataset_name}'")
    return result

@mcp.tool()
async def segment_business_data(
    dataset_name: str,
    segment_column: str,
    metric_columns: list
) -> Dict:
    """
    Perform business segmentation analysis.
    
    Args:
        dataset_name: Name of loaded dataset
        segment_column: Column to segment by
        metric_columns: Metrics to analyze per segment
    """
    logger.info(f"Tool segment_business_data called with dataset '{dataset_name}', segment_column='{segment_column}', metric_columns={metric_columns}")
    try:
        data = get_dataset(dataset_name)
        if data is None:
            msg = f"Dataset '{dataset_name}' not found"
            logger.error(msg)
            return {"error": msg}
        
        if segment_column not in data.columns:
            msg = f"Segment column '{segment_column}' not found in dataset"
            logger.error(msg)
            return {"error": msg}
        
        # Filter to only numeric metric columns that exist
        available_metrics = []
        for col in metric_columns:
            if col in data.columns:
                available_metrics.append(col)
        
        if not available_metrics:
            msg = f"No valid metric columns found. Available columns: {list(data.columns)}"
            logger.error(msg)
            return {"error": msg}
        
        # Perform segmentation
        segments = {}
        for segment_value in data[segment_column].unique():
            if pd.isna(segment_value):
                continue
            segment_data = data[data[segment_column] == segment_value]
            segment_metrics = {}
            for metric in available_metrics:
                if pd.api.types.is_numeric_dtype(data[metric]):
                    segment_metrics[metric] = {
                        "count": int(segment_data[metric].count()),
                        "mean": float(segment_data[metric].mean()) if segment_data[metric].count() > 0 else 0,
                        "sum": float(segment_data[metric].sum()) if segment_data[metric].count() > 0 else 0,
                        "min": float(segment_data[metric].min()) if segment_data[metric].count() > 0 else 0,
                        "max": float(segment_data[metric].max()) if segment_data[metric].count() > 0 else 0
                    }
                else:
                    segment_metrics[metric] = {
                        "count": int(segment_data[metric].count()),
                        "unique_values": int(segment_data[metric].nunique()),
                        "most_common": str(segment_data[metric].mode().iloc[0]) if len(segment_data[metric].mode()) > 0 else "N/A"
                    }
            segments[str(segment_value)] = {
                "size": len(segment_data),
                "percentage": round((len(segment_data) / len(data)) * 100, 2),
                "metrics": segment_metrics
            }
        
        # Generate insights
        insights = []
        if segments:
            largest_segment = max(segments.items(), key=lambda x: x[1]["size"])
            insights.append(f"Largest segment: {largest_segment[0]} ({largest_segment[1]['percentage']}% of data)")
            for metric in available_metrics:
                if pd.api.types.is_numeric_dtype(data[metric]):
                    highest_segment = max(segments.items(), key=lambda x: x[1]["metrics"].get(metric, {}).get("mean", 0))
                    insights.append(f"Highest {metric}: {highest_segment[0]} (avg: {highest_segment[1]['metrics'][metric]['mean']:.2f})")
        
        result = {
            "dataset_name": dataset_name,
            "segment_column": segment_column,
            "metric_columns": available_metrics,
            "total_segments": len(segments),
            "segments": segments,
            "insights": insights
        }
        logger.info(f"Business segmentation analysis completed for dataset '{dataset_name}'")
        return result
        
    except Exception as e:
        logger.exception(f"Segmentation failed for dataset '{dataset_name}': {e}")
        return {"error": f"Segmentation failed: {str(e)}"}

@mcp.tool()
async def create_kpi_dashboard(
    dataset_name: str,
    kpi_config: Dict = {}
) -> Dict:
    """
    Generate KPI dashboard with key business metrics.
    
    Args:
        dataset_name: Name of loaded dataset
        kpi_config: KPI configuration (optional)
    """
    logger.info(f"Tool create_kpi_dashboard called for dataset '{dataset_name}' with kpi_config: {kpi_config}")
    try:
        data = get_dataset(dataset_name)
        if data is None:
            msg = f"Dataset '{dataset_name}' not found"
            logger.error(msg)
            return {"error": msg}
        
        # Generate KPIs for all numeric columns
        kpis = {}
        for column in data.columns:
            if pd.api.types.is_numeric_dtype(data[column]):
                kpis[column.replace('_', ' ').title()] = {
                    "total": float(data[column].sum()) if not data[column].isnull().all() else 0,
                    "average": float(data[column].mean()) if not data[column].isnull().all() else 0,
                    "max": float(data[column].max()) if not data[column].isnull().all() else 0,
                    "min": float(data[column].min()) if not data[column].isnull().all() else 0,
                    "count": str(data[column].count())
                }
        
        result = {
            "dataset_name": dataset_name,
            "generated_at": pd.Timestamp.now().isoformat(),
            "kpis": kpis,
            "summary": {
                "total_records": len(data),
                "data_completeness": f"{(1 - data.isnull().sum().sum() / (len(data) * len(data.columns))) * 100:.1f}%",
                "key_metrics": len(kpis),
                "date_range": "N/A"
            }
        }
        logger.info(f"KPI dashboard generated for dataset '{dataset_name}'")
        return result
        
    except Exception as e:
        logger.exception(f"KPI dashboard creation failed for dataset '{dataset_name}': {e}")
        return {"error": f"KPI dashboard creation failed: {str(e)}"}

@mcp.tool()
async def export_analysis(
    dataset_name: str,
    export_format: str = "json",
    include_visualizations: bool = False
) -> Dict:
    """
    Export analysis results to various formats.
    
    Args:
        dataset_name: Name of loaded dataset
        export_format: Export format: json, csv, excel, pdf
        include_visualizations: Include visualizations
    """
    logger.info(f"Tool export_analysis called for dataset '{dataset_name}' with format='{export_format}' and include_visualizations={include_visualizations}")
    result = await export_report_tool({
        "dataset_name": dataset_name,
        "analysis_type": "export",
        "include_visualizations": include_visualizations
    }, export_format, "business", f"export_{dataset_name}_{pd.Timestamp.now().strftime('%Y%m%d_%H%M%S')}.{export_format}")
    logger.info(f"Analysis export completed for dataset '{dataset_name}'")
    return result

# Original tools for backward compatibility
@mcp.tool()
async def load_datasource(
    source_path: str, 
    dataset_name: str,
    source_type: str = "auto",
    options: Dict = None
) -> Dict:
    """ETL from various sources (CSV, Excel, JSON, databases)."""
    logger.info(f"Tool load_datasource called with source_path='{source_path}', dataset_name='{dataset_name}', source_type='{source_type}'")
    result = await load_datasource_tool(source_path, source_type, dataset_name, options or {})
    logger.info(f"Datasource loaded for dataset '{dataset_name}'")
    return result

@mcp.tool()
async def create_visualization(
    dataset_name: str,
    chart_type: str,
    x_column: str = "",
    y_column: str = "",
    group_by: str = "",
    title: str = "",
    output_path: str = ""
) -> Dict:
    """
    Generate charts, dashboards, and interactive visualizations.
    
    Args:
        dataset_name: Source dataset
        chart_type: Type - bar, line, scatter, heatmap, dashboard
        x_column: X-axis column
        y_column: Y-axis column
        group_by: Column to group/color by
        title: Chart title
        output_path: Where to save visualization
    """
    logger.info(f"Tool create_visualization called for dataset '{dataset_name}', chart_type='{chart_type}'")
    result = await create_visualization_tool(dataset_name, chart_type, x_column, y_column, group_by, title, output_path)
    logger.info(f"Visualization generated for dataset '{dataset_name}'")
    return result

@mcp.tool()
async def run_correlation(
    dataset_name: str,
    method: str = "pearson",
    target_column: str = "",
    columns: list = None,
    threshold: float = 0.3
) -> Dict:
    """
    Statistical correlation analysis with business interpretation.
    
    Args:
        dataset_name: Source dataset
        method: Method - pearson, spearman, kendall
        target_column: Target variable for correlation
        columns: Specific columns to analyze
        threshold: Correlation significance threshold
    """
    logger.info(f"Tool run_correlation called for dataset '{dataset_name}' with method='{method}', target_column='{target_column}', threshold={threshold}")
    result = await run_correlation_tool(dataset_name, method, target_column, columns or [], threshold)
    logger.info(f"Correlation analysis completed for dataset '{dataset_name}'")
    return result

@mcp.tool()
async def export_report(
    content: Dict,
    format: str,
    template: str = "standard",
    output_path: str = ""
) -> Dict:
    """
    Generate formatted business reports (PDF, PowerPoint, HTML).
    
    Args:
        content: Report content and insights
        format: Format - pdf, pptx, html, markdown
        template: Report template to use
        output_path: Where to save report
    """
    logger.info(f"Tool export_report called with format='{format}', template='{template}', output_path='{output_path}'")
    result = await export_report_tool(content, format, template, output_path)
    logger.info("Report exported successfully")
    return result

@mcp.tool()
async def schedule_analysis(
    analysis_config: Dict,
    schedule: str,
    notification_channels: list = None,
    alert_conditions: Dict = None
) -> Dict:
    """
    Set up automated recurring insights and monitoring.
    
    Args:
        analysis_config: Analysis configuration
        schedule: Cron-style schedule
        notification_channels: Where to send results
        alert_conditions: Conditions for alerts
    """
    logger.info(f"Tool schedule_analysis called with schedule='{schedule}'")
    result = await schedule_analysis_tool(analysis_config, schedule, notification_channels or [], alert_conditions or {})
    logger.info("Analysis schedule set successfully")
    return result

# =============================================================================
# PROMPTS (User-controlled agentic workflows)
# =============================================================================

@mcp.prompt("bi-discovery")
async def bi_discovery_prompt_handler(
    data_path: str = ".",
    business_context: str = ""
) -> str:
    """Data source discovery and initial profiling with business context."""
    logger.info(f"Prompt 'bi-discovery' called with data_path='{data_path}' and business_context='{business_context}'")
    result = await bi_discovery_prompt(data_path, business_context)
    logger.info("bi-discovery prompt executed")
    return result

@mcp.prompt("insight-investigation")
async def insight_investigation_prompt_handler(
    dataset_name: str,
    focus_area: str = "general",
    time_period: str = ""
) -> str:
    """Guided exploration of business metrics with automated insights."""
    logger.info(f"Prompt 'insight-investigation' called for dataset '{dataset_name}', focus_area='{focus_area}', time_period='{time_period}'")
    result = await insight_investigation_prompt(dataset_name, focus_area, time_period)
    logger.info("insight-investigation prompt executed")
    return result

@mcp.prompt("correlation-deep-dive")
async def correlation_deep_dive_prompt_handler(
    dataset_name: str,
    target_metric: str = "",
    hypothesis: str = ""
) -> str:
    """Multi-dimensional correlation analysis with business interpretation."""
    logger.info(f"Prompt 'correlation-deep-dive' called for dataset '{dataset_name}', target_metric='{target_metric}'")
    result = await correlation_deep_dive_prompt(dataset_name, target_metric, hypothesis)
    logger.info("correlation-deep-dive prompt executed")
    return result

@mcp.prompt("trend-analysis")
async def trend_analysis_prompt_handler(
    dataset_name: str,
    time_column: str = "",
    metrics: str = ""
) -> str:
    """Time-series pattern detection with forecasting insights."""
    logger.info(f"Prompt 'trend-analysis' called for dataset '{dataset_name}', time_column='{time_column}', metrics='{metrics}'")
    result = await trend_analysis_prompt(dataset_name, time_column, metrics)
    logger.info("trend-analysis prompt executed")
    return result

@mcp.prompt("executive-summary")
async def executive_summary_prompt_handler(
    analysis_results: str = "",
    audience: str = "CEO",
    format: str = "detailed"
) -> str:
    """Auto-generate C-suite ready business reports."""
    logger.info(f"Prompt 'executive-summary' called for audience='{audience}', format='{format}'")
    result = await executive_summary_prompt(analysis_results, audience, format)
    logger.info("executive-summary prompt executed")
    return result

@mcp.prompt("action-recommendations")
async def action_recommendations_prompt_handler(
    insights: str = "",
    business_goals: str = "",
    constraints: str = ""
) -> str:
    """Data-driven business recommendations with impact analysis."""
    logger.info("Prompt 'action-recommendations' called")
    result = await action_recommendations_prompt(insights, business_goals, constraints)
    logger.info("action-recommendations prompt executed")
    return result

# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    logger.info("Starting Business Intelligence MCP Server")
    mcp.run()
