"""
Create Visualization Tool
Generate charts, dashboards, and interactive visualizations.
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from typing import Dict, Any, List, Optional
from pathlib import Path
import json
import base64
from io import BytesIO


async def create_visualization_tool(
    dataset_name: str,
    chart_type: str = "bar",
    x_column: str = "",
    y_column: str = "",
    group_by: str = "",
    title: str = "",
    output_path: str = ""
) -> Dict[str, Any]:
    """
    Generate charts, dashboards, and interactive visualizations.
    """
    
    try:
        # Load dataset
        df = await _load_dataset(dataset_name)
        
        if df is None:
            return {
                "error": f"Dataset '{dataset_name}' not found",
                "suggestion": "Use 'load-datasource' tool first to load data",
                "available_datasets": await _list_available_datasets()
            }
        
        # Validate and prepare visualization parameters
        viz_params = await _prepare_visualization_params(
            df, chart_type, x_column, y_column, group_by, title
        )
        
        if "error" in viz_params:
            return viz_params
        
        # Generate visualization
        visualization_result = await _generate_visualization(df, viz_params)
        
        # Save visualization if output path specified
        if output_path:
            save_result = await _save_visualization(visualization_result, output_path)
            visualization_result.update(save_result)
        
        return {
            "dataset_name": dataset_name,
            "visualization_type": chart_type,
            "status": "success",
            "visualization": visualization_result,
            "insights": await _generate_visualization_insights(df, viz_params),
            "recommendations": await _generate_visualization_recommendations(df, viz_params)
        }
        
    except Exception as e:
        return {
            "dataset_name": dataset_name,
            "chart_type": chart_type,
            "status": "failed",
            "error": f"Failed to create visualization: {str(e)}",
            "troubleshooting": [
                "Verify dataset name is correct",
                "Check column names exist in dataset",
                "Ensure chart type is supported",
                "Verify data types are appropriate for visualization"
            ]
        }


async def _load_dataset(dataset_name: str) -> Optional[pd.DataFrame]:
    """Load dataset from storage (mock implementation)."""
    
    base_path = Path(__file__).parent.parent.parent / "data"
    
    # Try common file patterns
    possible_files = [
        base_path / f"{dataset_name}.csv",
        base_path / f"{dataset_name}.xlsx", 
        base_path / f"sample_{dataset_name}.csv",
        base_path / f"sample_{dataset_name}.xlsx"
    ]
    
    for file_path in possible_files:
        if file_path.exists():
            try:
                if file_path.suffix.lower() == '.csv':
                    return pd.read_csv(file_path)
                elif file_path.suffix.lower() in ['.xlsx', '.xls']:
                    return pd.read_excel(file_path)
            except Exception:
                continue
    
    return None


async def _list_available_datasets() -> List[str]:
    """List available datasets."""
    
    base_path = Path(__file__).parent.parent.parent / "data"
    datasets = []
    
    if base_path.exists():
        for file_path in base_path.glob("*"):
            if file_path.suffix.lower() in ['.csv', '.xlsx', '.xls']:
                datasets.append(file_path.stem)
    
    return datasets


async def _prepare_visualization_params(
    df: pd.DataFrame,
    chart_type: str,
    x_column: str,
    y_column: str,
    group_by: str,
    title: str
) -> Dict[str, Any]:
    """Prepare and validate visualization parameters."""
    
    # Supported chart types
    supported_charts = {
        "bar": "Bar Chart",
        "line": "Line Chart", 
        "scatter": "Scatter Plot",
        "histogram": "Histogram",
        "box": "Box Plot",
        "heatmap": "Heatmap",
        "pie": "Pie Chart",
        "violin": "Violin Plot",
        "pair": "Pair Plot",
        "dashboard": "Dashboard"
    }
    
    if chart_type not in supported_charts:
        return {
            "error": f"Unsupported chart type: {chart_type}",
            "supported_types": list(supported_charts.keys()),
            "suggestion": "Choose from supported chart types"
        }
    
    params = {
        "chart_type": chart_type,
        "chart_name": supported_charts[chart_type],
        "title": title or f"{supported_charts[chart_type]} - {chart_type.title()}",
        "columns": {
            "x": x_column,
            "y": y_column,
            "group_by": group_by
        }
    }
    
    # Auto-select columns if not specified
    if not x_column and chart_type != "dashboard":
        params["columns"]["x"] = await _auto_select_x_column(df, chart_type)
    
    if not y_column and chart_type in ["bar", "line", "scatter"]:
        params["columns"]["y"] = await _auto_select_y_column(df, chart_type)
    
    # Validate columns exist
    for col_type, col_name in params["columns"].items():
        if col_name and col_name not in df.columns:
            return {
                "error": f"Column '{col_name}' not found in dataset",
                "available_columns": df.columns.tolist(),
                "suggestion": f"Choose valid column for {col_type}"
            }
    
    # Chart-specific validations
    validation_result = await _validate_chart_requirements(df, params)
    if "error" in validation_result:
        return validation_result
    
    return params


async def _auto_select_x_column(df: pd.DataFrame, chart_type: str) -> str:
    """Auto-select appropriate X column based on chart type."""
    
    # For different chart types, prefer different column types
    if chart_type in ["bar", "pie"]:
        # Prefer categorical columns
        categorical_cols = df.select_dtypes(include=['object']).columns
        if len(categorical_cols) > 0:
            return categorical_cols[0]
    
    elif chart_type in ["line", "scatter"]:
        # Prefer datetime or numeric columns
        datetime_cols = df.select_dtypes(include=['datetime']).columns
        if len(datetime_cols) > 0:
            return datetime_cols[0]
        
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            return numeric_cols[0]
    
    elif chart_type == "histogram":
        # Prefer numeric columns
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) > 0:
            return numeric_cols[0]
    
    # Default: first column
    return df.columns[0] if len(df.columns) > 0 else ""


async def _auto_select_y_column(df: pd.DataFrame, chart_type: str) -> str:
    """Auto-select appropriate Y column based on chart type."""
    
    # Prefer numeric columns for Y axis
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    
    if len(numeric_cols) > 0:
        return numeric_cols[0]
    
    # Fallback to second column if exists
    return df.columns[1] if len(df.columns) > 1 else ""


async def _validate_chart_requirements(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Validate chart-specific requirements."""
    
    chart_type = params["chart_type"]
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    
    # Chart-specific validations
    if chart_type == "scatter":
        if not x_col or not y_col:
            return {"error": "Scatter plot requires both X and Y columns"}
        
        # Both should be numeric for meaningful scatter plot
        if df[x_col].dtype not in [np.number] or df[y_col].dtype not in [np.number]:
            return {
                "error": "Scatter plot works best with numeric columns",
                "suggestion": "Consider using different chart type for non-numeric data"
            }
    
    elif chart_type == "line":
        if not x_col or not y_col:
            return {"error": "Line chart requires both X and Y columns"}
    
    elif chart_type == "heatmap":
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        if len(numeric_cols) < 2:
            return {"error": "Heatmap requires at least 2 numeric columns"}
    
    elif chart_type == "pie":
        if not x_col:
            return {"error": "Pie chart requires a categorical column"}
        
        # Check if column has reasonable number of categories
        if df[x_col].nunique() > 10:
            return {
                "error": f"Column '{x_col}' has {df[x_col].nunique()} unique values",
                "suggestion": "Pie charts work best with 10 or fewer categories"
            }
    
    return {"status": "valid"}


async def _generate_visualization(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Generate the actual visualization."""
    
    chart_type = params["chart_type"]
    
    # Set up matplotlib style
    plt.style.use('seaborn-v0_8')
    sns.set_palette("husl")
    
    try:
        if chart_type == "bar":
            return await _create_bar_chart(df, params)
        elif chart_type == "line":
            return await _create_line_chart(df, params)
        elif chart_type == "scatter":
            return await _create_scatter_plot(df, params)
        elif chart_type == "histogram":
            return await _create_histogram(df, params)
        elif chart_type == "box":
            return await _create_box_plot(df, params)
        elif chart_type == "heatmap":
            return await _create_heatmap(df, params)
        elif chart_type == "pie":
            return await _create_pie_chart(df, params)
        elif chart_type == "violin":
            return await _create_violin_plot(df, params)
        elif chart_type == "pair":
            return await _create_pair_plot(df, params)
        elif chart_type == "dashboard":
            return await _create_dashboard(df, params)
        else:
            return {"error": f"Chart type {chart_type} not implemented"}
    
    except Exception as e:
        return {"error": f"Failed to generate {chart_type}: {str(e)}"}


async def _create_bar_chart(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create bar chart."""
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    group_by = params["columns"]["group_by"]
    
    if y_col:
        # Grouped bar chart
        if group_by:
            data_pivot = df.pivot_table(values=y_col, index=x_col, columns=group_by, aggfunc='sum', fill_value=0)
            data_pivot.plot(kind='bar', ax=ax, rot=45)
        else:
            df.groupby(x_col)[y_col].sum().plot(kind='bar', ax=ax, rot=45)
    else:
        # Simple count bar chart
        df[x_col].value_counts().head(20).plot(kind='bar', ax=ax, rot=45)
    
    ax.set_title(params["title"])
    ax.set_xlabel(x_col)
    ax.set_ylabel(y_col if y_col else "Count")
    plt.tight_layout()
    
    # Convert to base64
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "bar",
        "data_summary": {
            "x_column": x_col,
            "y_column": y_col,
            "categories": int(df[x_col].nunique()),
            "total_records": len(df)
        }
    }


async def _create_line_chart(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create line chart."""
    
    fig, ax = plt.subplots(figsize=(12, 6))
    
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    group_by = params["columns"]["group_by"]
    
    if group_by:
        for group in df[group_by].unique():
            group_data = df[df[group_by] == group]
            ax.plot(group_data[x_col], group_data[y_col], label=str(group), marker='o')
        ax.legend()
    else:
        # Sort by x column for better line visualization
        df_sorted = df.sort_values(x_col)
        ax.plot(df_sorted[x_col], df_sorted[y_col], marker='o')
    
    ax.set_title(params["title"])
    ax.set_xlabel(x_col)
    ax.set_ylabel(y_col)
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "line",
        "data_summary": {
            "x_column": x_col,
            "y_column": y_col,
            "data_points": len(df),
            "trend": await _calculate_trend(df[x_col], df[y_col]) if df[y_col].dtype in [np.number] else "N/A"
        }
    }


async def _create_scatter_plot(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create scatter plot."""
    
    fig, ax = plt.subplots(figsize=(10, 8))
    
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    group_by = params["columns"]["group_by"]
    
    if group_by:
        for group in df[group_by].unique():
            group_data = df[df[group_by] == group]
            ax.scatter(group_data[x_col], group_data[y_col], label=str(group), alpha=0.6)
        ax.legend()
    else:
        ax.scatter(df[x_col], df[y_col], alpha=0.6)
    
    # Add trend line if both columns are numeric
    if df[x_col].dtype in [np.number] and df[y_col].dtype in [np.number]:
        z = np.polyfit(df[x_col].dropna(), df[y_col].dropna(), 1)
        p = np.poly1d(z)
        ax.plot(df[x_col], p(df[x_col]), "r--", alpha=0.8, label="Trend")
    
    ax.set_title(params["title"])
    ax.set_xlabel(x_col)
    ax.set_ylabel(y_col)
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    # Calculate correlation if both numeric
    correlation = None
    if df[x_col].dtype in [np.number] and df[y_col].dtype in [np.number]:
        correlation = round(float(df[x_col].corr(df[y_col])), 3)
    
    return {
        "chart_image": img_base64,
        "chart_type": "scatter",
        "data_summary": {
            "x_column": x_col,
            "y_column": y_col,
            "data_points": len(df),
            "correlation": correlation
        }
    }


async def _create_histogram(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create histogram."""
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    x_col = params["columns"]["x"]
    
    ax.hist(df[x_col].dropna(), bins=30, alpha=0.7, edgecolor='black')
    ax.set_title(params["title"])
    ax.set_xlabel(x_col)
    ax.set_ylabel("Frequency")
    
    # Add statistics
    mean_val = df[x_col].mean()
    median_val = df[x_col].median()
    ax.axvline(mean_val, color='red', linestyle='--', label=f'Mean: {mean_val:.2f}')
    ax.axvline(median_val, color='green', linestyle='--', label=f'Median: {median_val:.2f}')
    ax.legend()
    
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "histogram",
        "data_summary": {
            "column": x_col,
            "mean": round(float(mean_val), 3),
            "median": round(float(median_val), 3),
            "std": round(float(df[x_col].std()), 3),
            "data_points": int(df[x_col].count())
        }
    }


async def _create_box_plot(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create box plot."""
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    
    if y_col and x_col:
        # Grouped box plot
        df.boxplot(column=y_col, by=x_col, ax=ax)
        ax.set_title(params["title"])
    else:
        # Simple box plot
        column = y_col or x_col
        ax.boxplot(df[column].dropna())
        ax.set_title(params["title"])
        ax.set_ylabel(column)
    
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "box",
        "data_summary": {
            "columns_analyzed": [col for col in [x_col, y_col] if col],
            "outliers_detected": "Check visualization for outliers"
        }
    }


async def _create_heatmap(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create correlation heatmap."""
    
    fig, ax = plt.subplots(figsize=(12, 8))
    
    # Select numeric columns
    numeric_df = df.select_dtypes(include=[np.number])
    
    if len(numeric_df.columns) < 2:
        return {"error": "Need at least 2 numeric columns for heatmap"}
    
    # Calculate correlation matrix
    corr_matrix = numeric_df.corr()
    
    # Create heatmap
    sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0, 
                square=True, ax=ax, fmt='.2f')
    ax.set_title(params["title"])
    
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    # Find strongest correlations
    strong_corr = []
    for i in range(len(corr_matrix.columns)):
        for j in range(i+1, len(corr_matrix.columns)):
            corr_val = corr_matrix.iloc[i, j]
            if abs(corr_val) > 0.5:
                strong_corr.append({
                    "var1": corr_matrix.columns[i],
                    "var2": corr_matrix.columns[j],
                    "correlation": round(float(corr_val), 3)
                })
    
    return {
        "chart_image": img_base64,
        "chart_type": "heatmap",
        "data_summary": {
            "variables_analyzed": len(numeric_df.columns),
            "strong_correlations": strong_corr[:5],  # Top 5
            "average_correlation": round(float(abs(corr_matrix).mean().mean()), 3)
        }
    }


async def _create_pie_chart(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create pie chart."""
    
    fig, ax = plt.subplots(figsize=(10, 8))
    
    x_col = params["columns"]["x"]
    
    # Get value counts and limit to top categories
    value_counts = df[x_col].value_counts().head(10)
    
    # Create pie chart
    wedges, texts, autotexts = ax.pie(value_counts.values, labels=value_counts.index, 
                                      autopct='%1.1f%%', startangle=90)
    
    ax.set_title(params["title"])
    
    # Make percentage text more readable
    for autotext in autotexts:
        autotext.set_color('white')
        autotext.set_fontweight('bold')
    
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "pie",
        "data_summary": {
            "column": x_col,
            "categories_shown": len(value_counts),
            "largest_category": {
                "name": str(value_counts.index[0]),
                "percentage": round(float(value_counts.iloc[0] / value_counts.sum() * 100), 1)
            },
            "total_records": int(value_counts.sum())
        }
    }


async def _create_violin_plot(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create violin plot."""
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    
    if x_col and y_col:
        sns.violinplot(data=df, x=x_col, y=y_col, ax=ax)
    else:
        column = y_col or x_col
        sns.violinplot(y=df[column], ax=ax)
    
    ax.set_title(params["title"])
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "violin",
        "data_summary": {
            "columns_analyzed": [col for col in [x_col, y_col] if col],
            "distribution_info": "Check visualization for distribution shapes"
        }
    }


async def _create_pair_plot(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create pair plot for numeric columns."""
    
    # Select numeric columns (limit to first 5 for readability)
    numeric_df = df.select_dtypes(include=[np.number]).head(1000)  # Sample for performance
    
    if len(numeric_df.columns) < 2:
        return {"error": "Need at least 2 numeric columns for pair plot"}
    
    # Limit columns to avoid overcrowding
    columns_to_plot = numeric_df.columns[:5]
    plot_df = numeric_df[columns_to_plot]
    
    # Create pair plot
    g = sns.pairplot(plot_df, diag_kind='hist')
    g.fig.suptitle(params["title"], y=1.02)
    
    img_base64 = await _fig_to_base64(g.fig)
    plt.close(g.fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "pair",
        "data_summary": {
            "variables_analyzed": len(columns_to_plot),
            "columns": columns_to_plot.tolist(),
            "sample_size": len(plot_df)
        }
    }


async def _create_dashboard(df: pd.DataFrame, params: Dict[str, Any]) -> Dict[str, Any]:
    """Create a comprehensive dashboard."""
    
    fig, axes = plt.subplots(2, 2, figsize=(16, 12))
    fig.suptitle(f"Data Dashboard - {params['title']}", fontsize=16)
    
    # Top-left: Data overview
    ax1 = axes[0, 0]
    overview_text = f"""
    Dataset Overview:
    • Rows: {len(df):,}
    • Columns: {len(df.columns)}
    • Missing Values: {df.isnull().sum().sum():,}
    • Numeric Columns: {len(df.select_dtypes(include=[np.number]).columns)}
    • Categorical Columns: {len(df.select_dtypes(include=['object']).columns)}
    """
    ax1.text(0.1, 0.5, overview_text, fontsize=12, verticalalignment='center',
             transform=ax1.transAxes)
    ax1.set_title("Dataset Overview")
    ax1.axis('off')
    
    # Top-right: Missing data pattern
    ax2 = axes[0, 1]
    missing_data = df.isnull().sum().head(10)
    if missing_data.sum() > 0:
        missing_data.plot(kind='bar', ax=ax2)
        ax2.set_title("Missing Data by Column")
        ax2.set_ylabel("Missing Count")
    else:
        ax2.text(0.5, 0.5, "No Missing Data", ha='center', va='center',
                transform=ax2.transAxes, fontsize=14)
        ax2.set_title("Missing Data Analysis")
        ax2.axis('off')
    
    # Bottom-left: Numeric columns correlation (if available)
    ax3 = axes[1, 0]
    numeric_df = df.select_dtypes(include=[np.number])
    if len(numeric_df.columns) > 1:
        corr_matrix = numeric_df.corr()
        sns.heatmap(corr_matrix, annot=True, cmap='coolwarm', center=0,
                   square=True, ax=ax3, fmt='.2f', cbar_kws={'shrink': 0.8})
        ax3.set_title("Correlation Matrix")
    else:
        ax3.text(0.5, 0.5, "Need 2+ numeric columns\nfor correlation", 
                ha='center', va='center', transform=ax3.transAxes, fontsize=12)
        ax3.set_title("Correlation Analysis")
        ax3.axis('off')
    
    # Bottom-right: Data distribution (first numeric column)
    ax4 = axes[1, 1]
    if len(numeric_df.columns) > 0:
        first_numeric = numeric_df.columns[0]
        ax4.hist(numeric_df[first_numeric].dropna(), bins=20, alpha=0.7, edgecolor='black')
        ax4.set_title(f"Distribution: {first_numeric}")
        ax4.set_xlabel(first_numeric)
        ax4.set_ylabel("Frequency")
    else:
        # Show categorical distribution instead
        categorical_cols = df.select_dtypes(include=['object']).columns
        if len(categorical_cols) > 0:
            first_cat = categorical_cols[0]
            df[first_cat].value_counts().head(10).plot(kind='bar', ax=ax4)
            ax4.set_title(f"Top Categories: {first_cat}")
            ax4.tick_params(axis='x', rotation=45)
        else:
            ax4.text(0.5, 0.5, "No suitable columns\nfor distribution plot", 
                    ha='center', va='center', transform=ax4.transAxes, fontsize=12)
            ax4.set_title("Data Distribution")
            ax4.axis('off')
    
    plt.tight_layout()
    
    img_base64 = await _fig_to_base64(fig)
    plt.close(fig)
    
    return {
        "chart_image": img_base64,
        "chart_type": "dashboard",
        "data_summary": {
            "total_rows": len(df),
            "total_columns": len(df.columns),
            "missing_values": int(df.isnull().sum().sum()),
            "data_quality_score": round(((len(df) * len(df.columns) - df.isnull().sum().sum()) / (len(df) * len(df.columns))) * 100, 1)
        }
    }


async def _fig_to_base64(fig) -> str:
    """Convert matplotlib figure to base64 string."""
    
    buffer = BytesIO()
    fig.savefig(buffer, format='png', dpi=300, bbox_inches='tight')
    buffer.seek(0)
    
    img_base64 = base64.b64encode(buffer.getvalue()).decode()
    buffer.close()
    
    return img_base64


async def _calculate_trend(x_series: pd.Series, y_series: pd.Series) -> str:
    """Calculate trend direction."""
    
    try:
        # Simple linear regression slope
        if len(x_series) < 2 or len(y_series) < 2:
            return "insufficient_data"
        
        # Convert to numeric if needed
        x_numeric = pd.to_numeric(x_series, errors='coerce')
        y_numeric = pd.to_numeric(y_series, errors='coerce')
        
        # Remove NaN values
        valid_mask = ~(x_numeric.isna() | y_numeric.isna())
        x_clean = x_numeric[valid_mask]
        y_clean = y_numeric[valid_mask]
        
        if len(x_clean) < 2:
            return "insufficient_data"
        
        # Calculate slope
        slope = np.polyfit(x_clean, y_clean, 1)[0]
        
        if slope > 0.1:
            return "increasing"
        elif slope < -0.1:
            return "decreasing"
        else:
            return "stable"
    
    except Exception:
        return "unknown"


async def _save_visualization(viz_result: Dict[str, Any], output_path: str) -> Dict[str, Any]:
    """Save visualization to file."""
    
    try:
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        # Decode base64 and save as PNG
        if "chart_image" in viz_result:
            img_data = base64.b64decode(viz_result["chart_image"])
            
            with open(output_file, 'wb') as f:
                f.write(img_data)
            
            return {
                "saved": True,
                "output_path": str(output_file),
                "file_size": len(img_data)
            }
        else:
            return {"saved": False, "error": "No chart image to save"}
    
    except Exception as e:
        return {"saved": False, "error": f"Failed to save: {str(e)}"}


async def _generate_visualization_insights(df: pd.DataFrame, params: Dict[str, Any]) -> List[str]:
    """Generate insights from the visualization."""
    
    insights = []
    chart_type = params["chart_type"]
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    
    # General insights
    if chart_type in ["bar", "pie"]:
        if x_col:
            top_category = df[x_col].value_counts().index[0]
            top_percentage = (df[x_col].value_counts().iloc[0] / len(df)) * 100
            insights.append(f"'{top_category}' is the most common category, representing {top_percentage:.1f}% of the data")
    
    elif chart_type == "scatter" and x_col and y_col:
        if df[x_col].dtype in [np.number] and df[y_col].dtype in [np.number]:
            correlation = df[x_col].corr(df[y_col])
            if abs(correlation) > 0.7:
                relationship = "strong positive" if correlation > 0 else "strong negative"
                insights.append(f"There's a {relationship} correlation ({correlation:.3f}) between {x_col} and {y_col}")
            elif abs(correlation) > 0.3:
                relationship = "moderate positive" if correlation > 0 else "moderate negative"
                insights.append(f"There's a {relationship} correlation ({correlation:.3f}) between {x_col} and {y_col}")
            else:
                insights.append(f"There's a weak correlation ({correlation:.3f}) between {x_col} and {y_col}")
    
    elif chart_type == "histogram" and x_col:
        if df[x_col].dtype in [np.number]:
            skewness = df[x_col].skew()
            if abs(skewness) > 1:
                direction = "right" if skewness > 0 else "left"
                insights.append(f"The distribution of {x_col} is highly skewed to the {direction}")
            elif abs(skewness) > 0.5:
                direction = "right" if skewness > 0 else "left"
                insights.append(f"The distribution of {x_col} is moderately skewed to the {direction}")
            else:
                insights.append(f"The distribution of {x_col} is approximately normal")
    
    elif chart_type == "line" and x_col and y_col:
        if df[y_col].dtype in [np.number]:
            trend = await _calculate_trend(df[x_col], df[y_col])
            if trend == "increasing":
                insights.append(f"{y_col} shows an increasing trend over {x_col}")
            elif trend == "decreasing":
                insights.append(f"{y_col} shows a decreasing trend over {x_col}")
            elif trend == "stable":
                insights.append(f"{y_col} remains relatively stable over {x_col}")
    
    # Data quality insights
    if x_col and df[x_col].isnull().sum() > 0:
        missing_pct = (df[x_col].isnull().sum() / len(df)) * 100
        insights.append(f"{x_col} has {missing_pct:.1f}% missing values")
    
    if y_col and df[y_col].isnull().sum() > 0:
        missing_pct = (df[y_col].isnull().sum() / len(df)) * 100
        insights.append(f"{y_col} has {missing_pct:.1f}% missing values")
    
    return insights


async def _generate_visualization_recommendations(df: pd.DataFrame, params: Dict[str, Any]) -> List[str]:
    """Generate recommendations for further analysis."""
    
    recommendations = []
    chart_type = params["chart_type"]
    x_col = params["columns"]["x"]
    y_col = params["columns"]["y"]
    
    # Chart-specific recommendations
    if chart_type == "scatter" and x_col and y_col:
        if df[x_col].dtype in [np.number] and df[y_col].dtype in [np.number]:
            correlation = abs(df[x_col].corr(df[y_col]))
            if correlation > 0.7:
                recommendations.append("Strong correlation detected - consider predictive modeling")
            recommendations.append("Use 'run-correlation' tool for detailed statistical analysis")
    
    elif chart_type in ["bar", "pie"]:
        if x_col:
            unique_count = df[x_col].nunique()
            if unique_count > 20:
                recommendations.append("Many categories present - consider grouping similar categories")
            recommendations.append("Use 'profile-dataset' tool to analyze categorical distributions")
    
    elif chart_type == "line":
        recommendations.append("Consider trend analysis for time series forecasting")
        recommendations.append("Use 'trend-analysis' prompt for detailed temporal patterns")
    
    elif chart_type == "histogram":
        if x_col and df[x_col].dtype in [np.number]:
            # Check for outliers
            q1, q3 = df[x_col].quantile([0.25, 0.75])
            iqr = q3 - q1
            outliers = df[(df[x_col] < q1 - 1.5 * iqr) | (df[x_col] > q3 + 1.5 * iqr)]
            if len(outliers) > 0:
                recommendations.append(f"Outliers detected ({len(outliers)} points) - consider investigation")
    
    # General recommendations
    if chart_type != "dashboard":
        recommendations.append("Create dashboard view for comprehensive data overview")
    
    if len(df.select_dtypes(include=[np.number]).columns) > 1:
        recommendations.append("Explore correlations with heatmap visualization")
    
    if len(df.select_dtypes(include=['datetime']).columns) > 0:
        recommendations.append("Create time-based visualizations for temporal analysis")
    
    return recommendations[:5]  # Limit to top 5 recommendations
