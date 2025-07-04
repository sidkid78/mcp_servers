"""
Load Data Source Tool
ETL from various sources (CSV, Excel, JSON, databases).
"""

import os
import json
import pandas as pd
from pathlib import Path
from typing import Dict, Any, Optional, List
import sqlite3
import requests
import logging
from datetime import datetime
import re
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import plotly.express as px
import plotly.graph_objects as go
import plotly.io as pio
import plotly.subplots as sp
import plotly.figure_factory as ff
import plotly.colors as pc
import plotly.offline as pyo
import plotly.graph_objs as go

async def load_datasource_tool(source_path: str, source_type: str = "auto", dataset_name: str = "", options: Dict[str, Any] = {}) -> Dict[str, Any]:
    """
    Load data from various sources and prepare for analysis.
    Supports CSV, Excel, JSON, databases, and APIs.
    """
    
    try:
        # Validate inputs
        if not source_path:
            return {"error": "Source path is required"}
        
        if not dataset_name:
            # Generate dataset name from file path
            dataset_name = Path(source_path).stem
        
        # Auto-detect source type if needed
        if source_type == "auto":
            source_type = _detect_source_type(source_path)
        
        # Load data based on source type
        load_result = await _load_data_by_type(source_path, source_type, options)
        
        if "error" in load_result:
            return load_result
        
        # Validate and clean data
        processed_data = await _process_loaded_data(load_result["data"], dataset_name)
        
        # Generate load summary
        summary = _generate_load_summary(processed_data, source_path, source_type)
        
        return {
            "dataset_name": dataset_name,
            "source_path": source_path,
            "source_type": source_type,
            "load_status": "success",
            "summary": summary,
            "data_preview": processed_data["preview"],
            "schema": processed_data["schema"],
            "data_quality": processed_data["quality_report"],
            "recommendations": processed_data["recommendations"],
            "troubleshooting": _generate_troubleshooting_tips(source_path, source_type)
        }
        
    except Exception as e:
        return {
            "dataset_name": dataset_name,
            "source_path": source_path,
            "load_status": "failed",
            "error": f"Failed to load data source: {str(e)}",
            "troubleshooting": _generate_troubleshooting_tips(source_path, source_type)
        }


def _detect_source_type(source_path: str) -> str:
    """Auto-detect data source type from path/extension."""
    
    path_lower = source_path.lower()
    
    if path_lower.endswith('.csv'):
        return "csv"
    elif path_lower.endswith(('.xlsx', '.xls')):
        return "excel"
    elif path_lower.endswith('.json'):
        return "json"
    elif path_lower.endswith('.jsonl'):
        return "jsonl"
    elif path_lower.endswith('.parquet'):
        return "parquet"
    elif path_lower.endswith('.tsv'):
        return "tsv"
    elif path_lower.endswith('.db') or path_lower.endswith('.sqlite'):
        return "sqlite"
    elif path_lower.startswith('http'):
        return "api"
    else:
        return "csv"  # Default assumption


async def _load_data_by_type(source_path: str, source_type: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load data based on source type."""
    
    try:
        if source_type == "csv":
            return await _load_csv(source_path, options)
        elif source_type == "excel":
            return await _load_excel(source_path, options)
        elif source_type == "json":
            return await _load_json(source_path, options)
        elif source_type == "jsonl":
            return await _load_jsonl(source_path, options)
        elif source_type == "parquet":
            return await _load_parquet(source_path, options)
        elif source_type == "tsv":
            return await _load_tsv(source_path, options)
        elif source_type == "sqlite":
            return await _load_sqlite(source_path, options)
        elif source_type == "api":
            return await _load_api(source_path, options)
        else:
            return {"error": f"Unsupported source type: {source_type}"}
            
    except Exception as e:
        return {"error": f"Error loading {source_type}: {str(e)}"}


async def _load_csv(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load CSV file with robust parsing."""
    
    # Default CSV options
    csv_options = {
        'encoding': options.get('encoding', 'utf-8'),
        'delimiter': options.get('delimiter', ','),
        'header': options.get('header', 0),
        'skip_blank_lines': True,
        'na_values': ['', 'NULL', 'null', 'N/A', 'n/a', '#N/A'],
        'keep_default_na': True,
        'low_memory': False
    }
    
    # Try different encodings if specified encoding fails
    encodings_to_try = [csv_options['encoding'], 'utf-8', 'latin-1', 'cp1252']
    
    for encoding in encodings_to_try:
        try:
            csv_options['encoding'] = encoding
            df = pd.read_csv(source_path, **csv_options)
            
            return {
                "data": df,
                "encoding_used": encoding,
                "load_method": "pandas.read_csv"
            }
            
        except UnicodeDecodeError:
            continue
        except Exception as e:
            if encoding == encodings_to_try[-1]:  # Last encoding attempt
                return {"error": f"Failed to read CSV: {str(e)}"}
    
    return {"error": "Could not decode CSV file with any supported encoding"}


async def _load_excel(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load Excel file."""
    
    excel_options = {
        'sheet_name': options.get('sheet_name', 0),  # First sheet by default
        'header': options.get('header', 0),
        'na_values': ['', 'NULL', 'null', 'N/A', 'n/a', '#N/A'],
        'keep_default_na': True
    }
    
    # Handle multiple sheets if requested
    if options.get('all_sheets', False):
        df_dict = pd.read_excel(source_path, sheet_name=None, **{k: v for k, v in excel_options.items() if k != 'sheet_name'})
        
        # Combine sheets or return first non-empty sheet
        if len(df_dict) == 1:
            df = list(df_dict.values())[0]
            sheet_info = f"Single sheet: {list(df_dict.keys())[0]}"
        else:
            # Find largest sheet
            largest_sheet = max(df_dict.keys(), key=lambda k: len(df_dict[k]))
            df = df_dict[largest_sheet]
            sheet_info = f"Largest sheet selected: {largest_sheet} (from {len(df_dict)} sheets)"
    else:
        df = pd.read_excel(source_path, **excel_options)
        sheet_info = f"Sheet: {excel_options['sheet_name']}"
    
    return {
        "data": df,
        "sheet_info": sheet_info,
        "load_method": "pandas.read_excel"
    }


async def _load_json(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load JSON file."""
    
    with open(source_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # Convert to DataFrame based on structure
    if isinstance(data, list):
        if data and isinstance(data[0], dict):
            df = pd.DataFrame(data)
            structure_info = f"Array of {len(data)} objects"
        else:
            df = pd.DataFrame({"values": data})
            structure_info = f"Array of {len(data)} values"
    elif isinstance(data, dict):
        # Try to find the main data array
        main_key = None
        for key, value in data.items():
            if isinstance(value, list) and value and isinstance(value[0], dict):
                main_key = key
                break
        
        if main_key:
            df = pd.DataFrame(data[main_key])
            structure_info = f"Object with main data in '{main_key}' key"
        else:
            # Flatten single object
            df = pd.DataFrame([data])
            structure_info = "Single object flattened to row"
    else:
        df = pd.DataFrame({"value": [data]})
        structure_info = "Single value"
    
    return {
        "data": df,
        "structure_info": structure_info,
        "load_method": "json.load + pandas.DataFrame"
    }


async def _load_jsonl(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load JSON Lines file."""
    
    records = []
    with open(source_path, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if line:
                try:
                    record = json.loads(line)
                    records.append(record)
                except json.JSONDecodeError as e:
                    if options.get('strict', True):
                        return {"error": f"Invalid JSON on line {line_num}: {str(e)}"}
                    # Skip invalid lines in non-strict mode
                    continue
    
    if not records:
        return {"error": "No valid JSON records found"}
    
    df = pd.DataFrame(records)
    
    return {
        "data": df,
        "records_loaded": len(records),
        "load_method": "json.loads per line + pandas.DataFrame"
    }


async def _load_parquet(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load Parquet file."""
    
    try:
        df = pd.read_parquet(source_path)
        
        return {
            "data": df,
            "load_method": "pandas.read_parquet"
        }
    except ImportError:
        return {"error": "Parquet support not available. Install pyarrow or fastparquet."}


async def _load_tsv(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load TSV file."""
    
    # TSV is just CSV with tab delimiter
    options['delimiter'] = '\t'
    return await _load_csv(source_path, options)


async def _load_sqlite(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load data from SQLite database."""
    
    try:
        conn = sqlite3.connect(source_path)
        
        # Get table name
        table_name = options.get('table_name')
        if not table_name:
            # List available tables
            cursor = conn.cursor()
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [row[0] for row in cursor.fetchall()]
            
            if not tables:
                conn.close()
                return {"error": "No tables found in database"}
            
            table_name = tables[0]  # Use first table
            table_info = f"Using first table: {table_name} (from {len(tables)} available)"
        else:
            table_info = f"Table: {table_name}"
        
        # Load data
        query = options.get('query', f"SELECT * FROM {table_name}")
        df = pd.read_sql_query(query, conn)
        
        conn.close()
        
        return {
            "data": df,
            "table_info": table_info,
            "query_used": query,
            "load_method": "pandas.read_sql_query"
        }
        
    except sqlite3.Error as e:
        return {"error": f"SQLite error: {str(e)}"}


async def _load_api(source_path: str, options: Dict[str, Any]) -> Dict[str, Any]:
    """Load data from API endpoint."""
    
    try:
        import requests
        
        # API request options
        headers = options.get('headers', {})
        params = options.get('params', {})
        auth = options.get('auth', None)
        timeout = options.get('timeout', 30)
        
        response = requests.get(source_path, headers=headers, params=params, auth=auth, timeout=timeout)
        response.raise_for_status()
        
        # Parse response based on content type
        content_type = response.headers.get('content-type', '').lower()
        
        if 'json' in content_type:
            data = response.json()
            # Convert to DataFrame similar to JSON loading
            if isinstance(data, list):
                df = pd.DataFrame(data)
            elif isinstance(data, dict):
                # Look for main data array
                main_key = None
                for key, value in data.items():
                    if isinstance(value, list):
                        main_key = key
                        break
                
                if main_key:
                    df = pd.DataFrame(data[main_key])
                else:
                    df = pd.DataFrame([data])
            else:
                df = pd.DataFrame({"value": [data]})
        else:
            # Try to parse as CSV
            from io import StringIO
            df = pd.read_csv(StringIO(response.text))
        
        return {
            "data": df,
            "api_info": f"Status: {response.status_code}, Content-Type: {content_type}",
            "load_method": "requests.get + parsing"
        }
        
    except ImportError:
        return {"error": "API loading requires 'requests' library"}
    except requests.RequestException as e:
        return {"error": f"API request failed: {str(e)}"}


async def _process_loaded_data(df: pd.DataFrame, dataset_name: str) -> Dict[str, Any]:
    """Process and validate loaded data."""
    
    # Basic data cleaning
    original_shape = df.shape
    
    # Remove completely empty rows and columns
    df = df.dropna(how='all').dropna(axis=1, how='all')
    
    # Clean column names
    df.columns = df.columns.astype(str)
    df.columns = df.columns.str.strip()
    
    # Generate schema information
    schema = _generate_schema(df)
    
    # Data quality assessment
    quality_report = _assess_data_quality(df)
    
    # Generate preview
    preview = _generate_data_preview(df)
    
    # Generate recommendations
    recommendations = _generate_data_recommendations(df, quality_report)
    
    # Store data reference (in a real implementation, this would be stored in a data store)
    _store_dataset_reference(dataset_name, df)
    
    processed_shape = df.shape
    cleaning_summary = f"Shape: {original_shape} → {processed_shape}"
    if original_shape != processed_shape:
        cleaning_summary += " (cleaned empty rows/columns)"
    
    return {
        "preview": preview,
        "schema": schema,
        "quality_report": quality_report,
        "recommendations": recommendations,
        "cleaning_summary": cleaning_summary
    }


def _generate_schema(df: pd.DataFrame) -> Dict[str, Any]:
    """Generate schema information for the dataset."""
    
    schema = {
        "columns": [],
        "total_columns": len(df.columns),
        "total_rows": len(df),
        "memory_usage": f"{df.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB"
    }
    
    for col in df.columns:
        col_info = {
            "name": col,
            "dtype": str(df[col].dtype),
            "non_null_count": int(df[col].count()),
            "null_count": int(df[col].isnull().sum()),
            "null_percentage": round((df[col].isnull().sum() / len(df)) * 100, 1),
            "unique_count": int(df[col].nunique()),
            "sample_values": []
        }
        
        # Add sample values (non-null)
        sample_values = df[col].dropna().head(3).tolist()
        col_info["sample_values"] = [str(val) for val in sample_values]
        
        # Add type-specific information
        if df[col].dtype in ['int64', 'float64']:
            col_info["min"] = float(df[col].min()) if pd.notna(df[col].min()) else None
            col_info["max"] = float(df[col].max()) if pd.notna(df[col].max()) else None
            col_info["mean"] = float(df[col].mean()) if pd.notna(df[col].mean()) else None
        
        schema["columns"].append(col_info)
    
    return schema


def _assess_data_quality(df: pd.DataFrame) -> Dict[str, Any]:
    """Assess data quality and identify issues."""
    
    quality_report = {
        "overall_score": 0,
        "completeness": 0,
        "consistency": 0,
        "issues": [],
        "strengths": []
    }
    
    # Completeness assessment
    total_cells = len(df) * len(df.columns)
    missing_cells = df.isnull().sum().sum()
    completeness = ((total_cells - missing_cells) / total_cells) * 100
    quality_report["completeness"] = round(completeness, 1)
    
    # Identify issues
    issues = []
    
    # High missing data
    for col in df.columns:
        missing_pct = (df[col].isnull().sum() / len(df)) * 100
        if missing_pct > 20:
            issues.append(f"Column '{col}' has {missing_pct:.1f}% missing data")
        elif missing_pct > 50:
            issues.append(f"Column '{col}' has high missing data ({missing_pct:.1f}%) - consider removal")
    
    # Duplicate rows
    duplicate_count = df.duplicated().sum()
    if duplicate_count > 0:
        duplicate_pct = (duplicate_count / len(df)) * 100
        issues.append(f"{duplicate_count} duplicate rows ({duplicate_pct:.1f}%)")
    
    # Single-value columns
    for col in df.columns:
        if df[col].nunique() == 1:
            issues.append(f"Column '{col}' has only one unique value")
    
    # Potential data type issues
    for col in df.columns:
        if df[col].dtype in ['object', 'string']:
            # Check if it could be numeric
            numeric_values = pd.to_numeric(df[col], errors='coerce').notna().sum()
            if numeric_values > len(df) * 0.8:  # 80% numeric
                issues.append(f"Column '{col}' appears to be numeric but stored as text")
    
    quality_report["issues"] = issues
    
    # Identify strengths
    strengths = []
    
    if completeness > 95:
        strengths.append("Excellent data completeness (>95%)")
    elif completeness > 90:
        strengths.append("Good data completeness (>90%)")
    
    if duplicate_count == 0:
        strengths.append("No duplicate rows detected")
    
    if len(df) > 1000:
        strengths.append(f"Large dataset with {len(df):,} rows")
    
    # Check for good column variety
    numeric_cols = len(df.select_dtypes(include=['number']).columns)
    categorical_cols = len(df.select_dtypes(include=['object', 'string']).columns)
    if numeric_cols > 0 and categorical_cols > 0:
        strengths.append("Good mix of numeric and categorical data")
    
    quality_report["strengths"] = strengths
    
    # Calculate overall score
    base_score = completeness
    if duplicate_count == 0:
        base_score += 5
    if len(issues) == 0:
        base_score += 10
    
    quality_report["overall_score"] = min(100, round(base_score, 1))
    
    return quality_report


def _generate_data_preview(df: pd.DataFrame) -> Dict[str, Any]:
    """Generate data preview with summary statistics."""
    
    preview = {
        "head": df.head(5).to_dict('records'),
        "shape": df.shape,
        "column_summary": {},
        "data_types": df.dtypes.astype(str).to_dict()
    }
    
    # Generate column summary
    for col in df.columns:
        col_summary = {
            "type": str(df[col].dtype),
            "unique_values": int(df[col].nunique()),
            "missing_count": int(df[col].isnull().sum())
        }
        
        if df[col].dtype in ['int64', 'float64']:
            col_summary["min"] = float(df[col].min()) if pd.notna(df[col].min()) else None
            col_summary["max"] = float(df[col].max()) if pd.notna(df[col].max()) else None
            col_summary["mean"] = float(df[col].mean()) if pd.notna(df[col].mean()) else None
        elif df[col].dtype in ['object', 'string']:
            # Most common values
            value_counts = df[col].value_counts().head(3)
            col_summary["top_values"] = value_counts.to_dict()
        
        preview["column_summary"][col] = col_summary
    
    return preview


def _generate_data_recommendations(df: pd.DataFrame, quality_report: Dict[str, Any]) -> List[str]:
    """Generate recommendations for data improvement."""
    
    recommendations = []
    
    # Based on quality issues
    issues = quality_report.get("issues", [])
    
    for issue in issues:
        if "missing data" in issue and "consider removal" in issue:
            recommendations.append(f"🗑️ {issue} - use `profile-dataset` tool for detailed analysis")
        elif "missing data" in issue:
            recommendations.append(f"🔧 {issue} - consider imputation or filtering strategies")
        elif "duplicate rows" in issue:
            recommendations.append("🔄 Remove duplicate rows before analysis")
        elif "only one unique value" in issue:
            recommendations.append(f"📊 {issue} - consider removing constant columns")
        elif "appears to be numeric" in issue:
            recommendations.append(f"🔢 {issue} - convert to numeric type for analysis")
    
    # General recommendations based on data characteristics
    if len(df) > 10000:
        recommendations.append("📈 Large dataset detected - consider sampling for initial exploration")
    
    if len(df.columns) > 20:
        recommendations.append("📊 Many columns detected - use `profile-dataset` for comprehensive analysis")
    
    if len(df.columns) > 50:
        recommendations.append("📊 Many columns detected - use `profile-dataset` for comprehensive analysis and consider sampling")
    
    # Analysis suggestions
    numeric_cols = len(df.select_dtypes(include=['number']).columns)
    if numeric_cols > 1:
        recommendations.append("🔗 Multiple numeric columns - consider correlation analysis")
    
    # Check for time-based columns
    time_cols = []
    for col in df.columns:
        if any(time_word in col.lower() for time_word in ['date', 'time', 'created', 'updated']):
            time_cols.append(col)
    
    if time_cols:
        recommendations.append(f"📅 Time-based columns detected ({', '.join(time_cols)}) - consider trend analysis")
    
    # Business context suggestions
    business_indicators = ['revenue', 'sales', 'customer', 'user', 'order', 'product']
    detected_context = []
    for indicator in business_indicators:
        if any(indicator in col.lower() for col in df.columns):
            detected_context.append(indicator)
    
    if detected_context:
        context_str = ', '.join(detected_context)
        recommendations.append(f"💼 Business context detected ({context_str}) - ready for business intelligence analysis")
    
    if not recommendations:
        recommendations.append("✅ Data looks good - ready for analysis")
    
    return recommendations


def _generate_load_summary(processed_data: Dict[str, Any], source_path: str, source_type: str) -> Dict[str, Any]:
    """Generate comprehensive load summary."""
    
    preview = processed_data["preview"]
    quality_report = processed_data["quality_report"]
    
    summary = {
        "load_success": True,
        "source_info": {
            "path": source_path,
            "type": source_type,
            "size": _get_file_size(source_path)
        },
        "data_summary": {
            "rows": preview["shape"][0],
            "columns": preview["shape"][1],
            "data_quality_score": quality_report["overall_score"],
            "completeness": quality_report["completeness"]
        },
        "next_steps": [
            "Use `profile-dataset` tool for detailed statistical analysis",
            "Use `create-visualization` tool to explore data patterns",
            "Consider `run-correlation` tool if multiple numeric columns present"
        ]
    }
    
    return summary


def _get_file_size(file_path: str) -> str:
    """Get human-readable file size."""
    
    try:
        if file_path.startswith('http'):
            return "API endpoint"
        
        size_bytes = os.path.getsize(file_path)
        
        if size_bytes < 1024:
            return f"{size_bytes} B"
        elif size_bytes < 1024 * 1024:
            return f"{size_bytes / 1024:.1f} KB"
        elif size_bytes < 1024 * 1024 * 1024:
            return f"{size_bytes / (1024 * 1024):.1f} MB"
        else:
            return f"{size_bytes / (1024 * 1024 * 1024):.1f} GB"
    except:
        return "Unknown"


def _store_dataset_reference(dataset_name: str, df: pd.DataFrame) -> None:
    """Store dataset reference for later use by other tools."""
    
    # In a real implementation, this would store the dataset in a proper data store
    # For simulation, we just validate that we could store it
    
    if len(df) == 0:
        raise ValueError("Cannot store empty dataset")
    
    if len(df.columns) == 0:
        raise ValueError("Cannot store dataset with no columns")
    
    # Simulate storage success
    pass


def _generate_troubleshooting_tips(source_path: str, source_type: str) -> List[str]:
    """Generate troubleshooting tips for failed loads."""
    
    tips = [
        "Verify file path exists and is accessible",
        "Check file permissions and access rights",
        "Ensure file is not corrupted or in use by another application"
    ]
    
    if source_type == "csv":
        tips.extend([
            "Try specifying encoding explicitly (utf-8, latin-1, cp1252)",
            "Check delimiter - use 'delimiter' option for non-comma separators",
            "Verify CSV structure - ensure consistent column count per row"
        ])
    elif source_type == "excel":
        tips.extend([
            "Specify sheet name if file has multiple sheets",
            "Check for merged cells or complex formatting",
            "Ensure Excel file is not password protected"
        ])
    elif source_type == "json":
        tips.extend([
            "Validate JSON syntax using online JSON validator",
            "Check for trailing commas or other syntax errors",
            "Ensure proper UTF-8 encoding"
        ])
    elif source_type == "api":
        tips.extend([
            "Verify API endpoint URL is correct and accessible",
            "Check if authentication is required",
            "Ensure API rate limits are not exceeded"
        ])
    
    return tips
