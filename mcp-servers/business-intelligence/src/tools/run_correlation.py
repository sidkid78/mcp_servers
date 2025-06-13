"""
Run Correlation Tool
Statistical correlation analysis with business interpretation.
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional, Tuple
from pathlib import Path
from scipy.stats import pearsonr, spearmanr, kendalltau
from scipy.stats import chi2_contingency
import warnings


async def run_correlation_tool(
    dataset_name: str,
    method: str = "pearson",
    target_column: str = "",
    columns: List[str] = [],
    threshold: float = 0.3
) -> Dict[str, Any]:
    """
    Statistical correlation analysis with business interpretation.
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
        
        # Validate parameters
        validation_result = await _validate_correlation_params(df, method, target_column, columns, threshold)
        if "error" in validation_result:
            return validation_result
        
        # Prepare data for correlation analysis
        analysis_data = await _prepare_correlation_data(df, target_column, columns)
        
        # Run correlation analysis
        correlation_results = await _run_correlation_analysis(analysis_data, method, threshold)
        
        # Generate business insights
        business_insights = await _generate_business_insights(correlation_results, analysis_data, df)
        
        # Generate recommendations
        recommendations = await _generate_correlation_recommendations(correlation_results, analysis_data)
        
        return {
            "dataset_name": dataset_name,
            "method": method,
            "target_column": target_column,
            "analysis_status": "success",
            "correlation_results": correlation_results,
            "business_insights": business_insights,
            "recommendations": recommendations,
            "data_summary": {
                "variables_analyzed": len(analysis_data["correlation_columns"]),
                "total_records": len(df),
                "significant_correlations": len([r for r in correlation_results.get("correlations", []) if abs(r["correlation"]) >= threshold])
            }
        }
        
    except Exception as e:
        return {
            "dataset_name": dataset_name,
            "method": method,
            "analysis_status": "failed",
            "error": f"Failed to run correlation analysis: {str(e)}",
            "troubleshooting": [
                "Verify dataset name is correct",
                "Ensure sufficient numeric columns for analysis",
                "Check that target column exists if specified",
                "Verify correlation method is supported (pearson, spearman, kendall)"
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


async def _validate_correlation_params(
    df: pd.DataFrame,
    method: str,
    target_column: str,
    columns: List[str],
    threshold: float
) -> Dict[str, Any]:
    """Validate correlation analysis parameters."""
    
    # Validate method
    supported_methods = ["pearson", "spearman", "kendall"]
    if method not in supported_methods:
        return {
            "error": f"Unsupported correlation method: {method}",
            "supported_methods": supported_methods,
            "suggestion": "Choose from supported correlation methods"
        }
    
    # Validate threshold
    if not 0 <= threshold <= 1:
        return {
            "error": f"Threshold must be between 0 and 1, got {threshold}",
            "suggestion": "Use threshold between 0.0 and 1.0"
        }
    
    # Validate target column if specified
    if target_column and target_column not in df.columns:
        return {
            "error": f"Target column '{target_column}' not found in dataset",
            "available_columns": df.columns.tolist(),
            "suggestion": "Choose valid column for target"
        }
    
    # Validate specified columns
    if columns:
        missing_columns = [col for col in columns if col not in df.columns]
        if missing_columns:
            return {
                "error": f"Columns not found in dataset: {missing_columns}",
                "available_columns": df.columns.tolist(),
                "suggestion": "Ensure all specified columns exist in dataset"
            }
    
    # Check if we have enough numeric data
    numeric_columns = df.select_dtypes(include=[np.number]).columns.tolist()
    if len(numeric_columns) < 2:
        return {
            "error": "Need at least 2 numeric columns for correlation analysis",
            "numeric_columns_found": len(numeric_columns),
            "suggestion": "Ensure dataset has sufficient numeric columns"
        }
    
    return {"status": "valid"}


async def _prepare_correlation_data(
    df: pd.DataFrame,
    target_column: str,
    columns: List[str]
) -> Dict[str, Any]:
    """Prepare data for correlation analysis."""
    
    # Determine which columns to analyze
    if columns:
        # Use specified columns
        correlation_columns = [col for col in columns if col in df.columns]
    else:
        # Use all numeric columns
        correlation_columns = df.select_dtypes(include=[np.number]).columns.tolist()
    
    # If target column specified, ensure it's included
    if target_column and target_column not in correlation_columns:
        if target_column in df.columns:
            correlation_columns.append(target_column)
    
    # Create clean dataset for analysis
    analysis_df = df[correlation_columns].copy()
    
    # Remove rows with any missing values
    original_rows = len(analysis_df)
    analysis_df = analysis_df.dropna()
    rows_removed = original_rows - len(analysis_df)
    
    return {
        "analysis_df": analysis_df,
        "correlation_columns": correlation_columns,
        "target_column": target_column,
        "original_rows": original_rows,
        "analysis_rows": len(analysis_df),
        "rows_removed": rows_removed,
        "missing_data_percentage": round((rows_removed / original_rows) * 100, 2) if original_rows > 0 else 0
    }


async def _run_correlation_analysis(
    analysis_data: Dict[str, Any],
    method: str,
    threshold: float
) -> Dict[str, Any]:
    """Run the correlation analysis."""
    
    df = analysis_data["analysis_df"]
    columns = analysis_data["correlation_columns"]
    target_column = analysis_data["target_column"]
    
    results = {
        "method": method,
        "threshold": threshold,
        "correlations": [],
        "correlation_matrix": {},
        "summary_statistics": {},
        "significant_correlations": []
    }
    
    # Calculate correlation matrix
    if method == "pearson":
        corr_matrix = df.corr(method='pearson')
    elif method == "spearman":
        corr_matrix = df.corr(method='spearman')
    elif method == "kendall":
        corr_matrix = df.corr(method='kendall')
    
    results["correlation_matrix"] = corr_matrix.round(4).to_dict()
    
    # Calculate pairwise correlations with significance tests
    correlations = []
    
    if target_column:
        # Focus on correlations with target column
        for col in columns:
            if col != target_column:
                corr_result = await _calculate_correlation_with_significance(
                    df[target_column], df[col], method
                )
                corr_result.update({
                    "variable1": target_column,
                    "variable2": col,
                    "is_target_correlation": True
                })
                correlations.append(corr_result)
    else:
        # Calculate all pairwise correlations
        for i, col1 in enumerate(columns):
            for j, col2 in enumerate(columns[i+1:], i+1):
                corr_result = await _calculate_correlation_with_significance(
                    df[col1], df[col2], method
                )
                corr_result.update({
                    "variable1": col1,
                    "variable2": col2,
                    "is_target_correlation": False
                })
                correlations.append(corr_result)
    
    # Sort correlations by absolute value
    correlations.sort(key=lambda x: abs(x["correlation"]), reverse=True)
    results["correlations"] = correlations
    
    # Filter significant correlations
    significant_correlations = [
        corr for corr in correlations 
        if abs(corr["correlation"]) >= threshold
    ]
    results["significant_correlations"] = significant_correlations
    
    # Generate summary statistics
    if correlations:
        corr_values = [abs(corr["correlation"]) for corr in correlations]
        results["summary_statistics"] = {
            "total_pairs": len(correlations),
            "significant_pairs": len(significant_correlations),
            "strongest_correlation": max(corr_values),
            "weakest_correlation": min(corr_values),
            "average_correlation": round(np.mean(corr_values), 4),
            "median_correlation": round(np.median(corr_values), 4)
        }
    
    return results


async def _calculate_correlation_with_significance(
    series1: pd.Series,
    series2: pd.Series,
    method: str
) -> Dict[str, Any]:
    """Calculate correlation with significance test."""
    
    # Remove missing values pairwise
    combined = pd.DataFrame({"x": series1, "y": series2}).dropna()
    
    if len(combined) < 3:
        return {
            "correlation": 0.0,
            "p_value": 1.0,
            "sample_size": len(combined),
            "significance": "insufficient_data"
        }
    
    x, y = combined["x"], combined["y"]
    
    try:
        if method == "pearson":
            correlation, p_value = pearsonr(x, y)
        elif method == "spearman":
            correlation, p_value = spearmanr(x, y)
        elif method == "kendall":
            correlation, p_value = kendalltau(x, y)
        else:
            correlation, p_value = pearsonr(x, y)  # Default fallback
        
        # Determine significance level
        if p_value < 0.001:
            significance = "highly_significant"
        elif p_value < 0.01:
            significance = "very_significant"
        elif p_value < 0.05:
            significance = "significant"
        else:
            significance = "not_significant"
        
        return {
            "correlation": round(float(correlation), 4),
            "p_value": round(float(p_value), 6),
            "sample_size": len(combined),
            "significance": significance
        }
    
    except Exception as e:
        return {
            "correlation": 0.0,
            "p_value": 1.0,
            "sample_size": len(combined),
            "significance": "calculation_error",
            "error": str(e)
        }


async def _generate_business_insights(
    correlation_results: Dict[str, Any],
    analysis_data: Dict[str, Any],
    original_df: pd.DataFrame
) -> Dict[str, Any]:
    """Generate business-focused insights from correlation analysis."""
    
    insights = {
        "key_findings": [],
        "business_implications": [],
        "data_quality_notes": [],
        "actionable_insights": []
    }
    
    correlations = correlation_results["correlations"]
    significant_correlations = correlation_results["significant_correlations"]
    target_column = analysis_data["target_column"]
    
    # Key findings
    if significant_correlations:
        strongest = significant_correlations[0]
        correlation_strength = await _interpret_correlation_strength(abs(strongest["correlation"]))
        
        insights["key_findings"].append(
            f"Strongest relationship: {strongest['variable1']} and {strongest['variable2']} "
            f"({correlation_strength}, r={strongest['correlation']:.3f})"
        )
        
        if target_column:
            target_correlations = [c for c in significant_correlations if target_column in [c["variable1"], c["variable2"]]]
            if target_correlations:
                insights["key_findings"].append(
                    f"Found {len(target_correlations)} significant relationships with {target_column}"
                )
    else:
        insights["key_findings"].append("No significant correlations found above the specified threshold")
    
    # Business implications
    if target_column and significant_correlations:
        target_correlations = [c for c in significant_correlations if target_column in [c["variable1"], c["variable2"]]]
        
        for corr in target_correlations[:3]:  # Top 3
            other_var = corr["variable2"] if corr["variable1"] == target_column else corr["variable1"]
            direction = "positively" if corr["correlation"] > 0 else "negatively"
            strength = await _interpret_correlation_strength(abs(corr["correlation"]))
            
            insights["business_implications"].append(
                f"{other_var} is {strength.lower()} {direction} related to {target_column} "
                f"- consider this in business strategy"
            )
    
    # Detect potential business patterns
    business_patterns = await _detect_business_patterns(correlations, original_df.columns)
    if business_patterns:
        insights["business_implications"].extend(business_patterns)
    
    # Data quality notes
    if analysis_data["rows_removed"] > 0:
        missing_pct = analysis_data["missing_data_percentage"]
        if missing_pct > 20:
            insights["data_quality_notes"].append(
                f"High missing data: {missing_pct:.1f}% of rows removed - may affect correlation reliability"
            )
        else:
            insights["data_quality_notes"].append(
                f"{missing_pct:.1f}% of rows removed due to missing values"
            )
    
    # Sample size assessment
    sample_size = analysis_data["analysis_rows"]
    if sample_size < 30:
        insights["data_quality_notes"].append(
            f"Small sample size ({sample_size}) - correlations may not be reliable"
        )
    elif sample_size < 100:
        insights["data_quality_notes"].append(
            f"Moderate sample size ({sample_size}) - interpret correlations with caution"
        )
    
    # Actionable insights
    if significant_correlations:
        # Predictive opportunities
        strong_correlations = [c for c in significant_correlations if abs(c["correlation"]) > 0.7]
        if strong_correlations:
            insights["actionable_insights"].append(
                "Strong correlations detected - consider predictive modeling opportunities"
            )
        
        # Monitoring recommendations
        if target_column:
            top_predictors = [
                c["variable2"] if c["variable1"] == target_column else c["variable1"]
                for c in significant_correlations[:3]
                if target_column in [c["variable1"], c["variable2"]]
            ]
            if top_predictors:
                insights["actionable_insights"].append(
                    f"Monitor these key indicators of {target_column}: {', '.join(top_predictors)}"
                )
        
        # Investigation recommendations
        unexpected_correlations = [
            c for c in significant_correlations[:5]
            if not await _is_expected_correlation(c["variable1"], c["variable2"])
        ]
        if unexpected_correlations:
            insights["actionable_insights"].append(
                "Unexpected correlations found - investigate underlying business relationships"
            )
    
    return insights


async def _interpret_correlation_strength(correlation: float) -> str:
    """Interpret correlation strength in business terms."""
    
    abs_corr = abs(correlation)
    
    if abs_corr >= 0.9:
        return "Very Strong"
    elif abs_corr >= 0.7:
        return "Strong"
    elif abs_corr >= 0.5:
        return "Moderate"
    elif abs_corr >= 0.3:
        return "Weak"
    else:
        return "Very Weak"


async def _detect_business_patterns(correlations: List[Dict[str, Any]], all_columns: pd.Index) -> List[str]:
    """Detect business-relevant correlation patterns."""
    
    patterns = []
    
    # Common business relationships to look for
    business_relationships = {
        "financial": ["revenue", "sales", "profit", "cost", "price", "income"],
        "customer": ["customer", "client", "user", "subscriber", "retention"],
        "marketing": ["marketing", "advertising", "campaign", "channel", "conversion"],
        "product": ["product", "item", "category", "inventory", "stock"],
        "operational": ["efficiency", "productivity", "quality", "satisfaction", "time"]
    }
    
    # Check for correlations within business domains
    for domain, keywords in business_relationships.items():
        domain_columns = [col for col in all_columns if any(keyword in col.lower() for keyword in keywords)]
        
        if len(domain_columns) >= 2:
            domain_correlations = [
                c for c in correlations 
                if c["variable1"] in domain_columns and c["variable2"] in domain_columns
                and abs(c["correlation"]) > 0.5
            ]
            
            if domain_correlations:
                patterns.append(f"Strong {domain} domain relationships detected - indicates integrated {domain} strategy")
    
    # Look for cross-domain relationships
    revenue_cols = [col for col in all_columns if any(word in col.lower() for word in ["revenue", "sales", "profit"])]
    customer_cols = [col for col in all_columns if any(word in col.lower() for word in ["customer", "client", "user"])]
    
    if revenue_cols and customer_cols:
        cross_correlations = [
            c for c in correlations
            if ((c["variable1"] in revenue_cols and c["variable2"] in customer_cols) or
                (c["variable1"] in customer_cols and c["variable2"] in revenue_cols))
            and abs(c["correlation"]) > 0.4
        ]
        
        if cross_correlations:
            patterns.append("Customer-revenue relationships identified - valuable for customer lifetime value analysis")
    
    return patterns


async def _is_expected_correlation(var1: str, var2: str) -> bool:
    """Check if correlation between two variables is expected/obvious."""
    
    # Common expected relationships
    expected_pairs = [
        ("revenue", "sales"),
        ("price", "cost"),
        ("quantity", "total"),
        ("width", "length"),
        ("height", "weight"),
        ("age", "experience"),
        ("income", "spending")
    ]
    
    var1_lower = var1.lower()
    var2_lower = var2.lower()
    
    for pair in expected_pairs:
        if (pair[0] in var1_lower and pair[1] in var2_lower) or \
           (pair[1] in var1_lower and pair[0] in var2_lower):
            return True
    
    # Check for same root words
    if len(var1_lower) > 4 and len(var2_lower) > 4:
        if var1_lower[:4] == var2_lower[:4]:  # Same first 4 characters
            return True
    
    return False


async def _generate_correlation_recommendations(
    correlation_results: Dict[str, Any],
    analysis_data: Dict[str, Any]
) -> List[str]:
    """Generate actionable recommendations based on correlation analysis."""
    
    recommendations = []
    
    correlations = correlation_results["correlations"]
    significant_correlations = correlation_results["significant_correlations"]
    target_column = analysis_data["target_column"]
    method = correlation_results["method"]
    
    # Analysis quality recommendations
    if analysis_data["missing_data_percentage"] > 20:
        recommendations.append(
            "🔧 High missing data detected - consider imputation strategies before re-running analysis"
        )
    
    if analysis_data["analysis_rows"] < 100:
        recommendations.append(
            "📊 Small sample size - collect more data for more reliable correlation estimates"
        )
    
    # Method recommendations
    if method == "pearson":
        non_normal_detected = False  # In a real implementation, test for normality
        if non_normal_detected:
            recommendations.append(
                "📈 Consider Spearman correlation for non-normally distributed data"
            )
    
    # Business action recommendations
    if significant_correlations:
        strong_correlations = [c for c in significant_correlations if abs(c["correlation"]) > 0.7]
        
        if strong_correlations:
            recommendations.append(
                "🤖 Strong correlations found - explore predictive modeling opportunities"
            )
            recommendations.append(
                "📋 Create monitoring dashboard for highly correlated variables"
            )
        
        if target_column:
            target_correlations = [
                c for c in significant_correlations 
                if target_column in [c["variable1"], c["variable2"]]
            ]
            
            if len(target_correlations) >= 3:
                recommendations.append(
                    f"🎯 Multiple factors influence {target_column} - consider multivariate analysis"
                )
        
        # Investigate unexpected relationships
        potential_insights = len([c for c in significant_correlations if abs(c["correlation"]) > 0.6])
        if potential_insights >= 2:
            recommendations.append(
                "🔍 Investigate unexpected correlations for hidden business insights"
            )
    
    else:
        recommendations.append(
            "⚠️ No significant correlations found - consider lowering threshold or exploring categorical relationships"
        )
        recommendations.append(
            "📊 Try different correlation methods (Spearman, Kendall) for non-linear relationships"
        )
    
    # Further analysis recommendations
    if len(analysis_data["correlation_columns"]) > 5:
        recommendations.append(
            "📈 Multiple variables analyzed - consider principal component analysis for dimensionality reduction"
        )
    
    recommendations.append(
        "📊 Create correlation heatmap visualization for better pattern recognition"
    )
    
    if target_column and significant_correlations:
        recommendations.append(
            f"🎯 Build predictive model using variables correlated with {target_column}"
        )
    
    # Business intelligence recommendations
    business_vars = [
        col for col in analysis_data["correlation_columns"] 
        if any(keyword in col.lower() for keyword in ["revenue", "sales", "customer", "profit", "cost"])
    ]
    
    if business_vars:
        recommendations.append(
            "💼 Business-critical variables detected - create executive summary with key correlations"
        )
    
    return recommendations[:8]  # Limit to most important recommendations
