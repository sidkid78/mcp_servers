"""
Profile Dataset Tool
Statistical profiling and data quality assessment.
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
from pathlib import Path
import json


async def profile_dataset_tool(dataset_name: str, detailed: bool = True, sample_size: int = 10000) -> Dict[str, Any]:
    """
    Perform comprehensive statistical profiling and data quality assessment.
    """
    
    try:
        # Load dataset (in real implementation, retrieve from data store)
        df = await _load_dataset(dataset_name)
        
        if df is None:
            return {
                "error": f"Dataset '{dataset_name}' not found",
                "suggestion": "Use 'load-datasource' tool first to load data",
                "available_datasets": await _list_available_datasets()
            }
        
        # Sample data if too large
        if len(df) > sample_size:
            df_sample = df.sample(n=sample_size, random_state=42)
            is_sampled = True
        else:
            df_sample = df.copy()
            is_sampled = False
        
        # Generate comprehensive profile
        profile = await _generate_comprehensive_profile(df_sample, detailed)
        
        # Add metadata
        profile.update({
            "dataset_name": dataset_name,
            "profiling_timestamp": pd.Timestamp.now().isoformat(),
            "original_shape": df.shape,
            "profiled_shape": df_sample.shape,
            "is_sampled": is_sampled,
            "sample_size": sample_size if is_sampled else len(df)
        })
        
        return profile
        
    except Exception as e:
        return {
            "dataset_name": dataset_name,
            "error": f"Failed to profile dataset: {str(e)}",
            "troubleshooting": [
                "Ensure dataset was loaded successfully with 'load-datasource'",
                "Check dataset name spelling",
                "Verify dataset is not empty or corrupted",
                "Try with smaller sample_size if memory issues occur"
            ]
        }


async def _load_dataset(dataset_name: str) -> Optional[pd.DataFrame]:
    """Load dataset from storage (mock implementation)."""
    
    # In real implementation, this would retrieve from a proper data store
    # For now, try to load common sample files or recently loaded data
    
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


async def _generate_comprehensive_profile(df: pd.DataFrame, detailed: bool) -> Dict[str, Any]:
    """Generate comprehensive dataset profile."""
    
    profile = {
        "overview": await _generate_overview(df),
        "columns": await _profile_columns(df, detailed),
        "data_quality": await _assess_data_quality(df),
        "statistical_summary": await _generate_statistical_summary(df),
        "patterns": await _detect_patterns(df),
        "business_insights": await _generate_business_insights(df),
        "recommendations": await _generate_profiling_recommendations(df)
    }
    
    if detailed:
        profile.update({
            "correlations": await _analyze_correlations(df),
            "distributions": await _analyze_distributions(df),
            "outliers": await _detect_outliers(df),
            "temporal_analysis": await _analyze_temporal_patterns(df)
        })
    
    return profile


async def _generate_overview(df: pd.DataFrame) -> Dict[str, Any]:
    """Generate high-level dataset overview."""
    
    memory_usage = df.memory_usage(deep=True).sum()
    
    return {
        "shape": {
            "rows": len(df),
            "columns": len(df.columns)
        },
        "memory_usage": {
            "bytes": int(memory_usage),
            "human_readable": f"{memory_usage / 1024 / 1024:.2f} MB"
        },
        "data_types": {
            "numeric": len(df.select_dtypes(include=[np.number]).columns),
            "categorical": len(df.select_dtypes(include=['object']).columns),
            "datetime": len(df.select_dtypes(include=['datetime']).columns),
            "boolean": len(df.select_dtypes(include=['bool']).columns)
        },
        "completeness": {
            "total_cells": len(df) * len(df.columns),
            "missing_cells": int(df.isnull().sum().sum()),
            "completeness_percentage": round(((len(df) * len(df.columns) - df.isnull().sum().sum()) / (len(df) * len(df.columns))) * 100, 2)
        }
    }


async def _profile_columns(df: pd.DataFrame, detailed: bool) -> List[Dict[str, Any]]:
    """Generate detailed column profiles."""
    
    column_profiles = []
    
    for col in df.columns:
        col_profile = {
            "name": col,
            "dtype": str(df[col].dtype),
            "basic_stats": {
                "count": int(df[col].count()),
                "missing": int(df[col].isnull().sum()),
                "missing_percentage": round((df[col].isnull().sum() / len(df)) * 100, 2),
                "unique_count": int(df[col].nunique()),
                "uniqueness_percentage": round((df[col].nunique() / df[col].count()) * 100, 2) if df[col].count() > 0 else 0
            }
        }
        
        # Type-specific analysis
        if df[col].dtype in [np.int64, np.float64]:
            col_profile.update(await _profile_numeric_column(df[col], detailed))
        elif df[col].dtype == 'object':
            col_profile.update(await _profile_categorical_column(df[col], detailed))
        elif pd.api.types.is_datetime64_any_dtype(df[col]):
            col_profile.update(await _profile_datetime_column(df[col], detailed))
        elif df[col].dtype == 'bool':
            col_profile.update(await _profile_boolean_column(df[col], detailed))
        
        column_profiles.append(col_profile)
    
    return column_profiles


async def _profile_numeric_column(series: pd.Series, detailed: bool) -> Dict[str, Any]:
    """Profile numeric column."""
    
    profile = {
        "type": "numeric",
        "statistics": {
            "mean": float(series.mean()) if not series.empty else None,
            "median": float(series.median()) if not series.empty else None,
            "std": float(series.std()) if not series.empty else None,
            "min": float(series.min()) if not series.empty else None,
            "max": float(series.max()) if not series.empty else None,
            "range": float(series.max() - series.min()) if not series.empty else None
        }
    }
    
    if detailed and not series.empty:
        profile["statistics"].update({
            "q1": float(series.quantile(0.25)),
            "q3": float(series.quantile(0.75)),
            "iqr": float(series.quantile(0.75) - series.quantile(0.25)),
            "skewness": float(series.skew()),
            "kurtosis": float(series.kurtosis()),
            "variance": float(series.var())
        })
        
        # Distribution insights
        profile["distribution"] = {
            "zeros_count": int((series == 0).sum()),
            "zeros_percentage": round(((series == 0).sum() / len(series)) * 100, 2),
            "negative_count": int((series < 0).sum()),
            "negative_percentage": round(((series < 0).sum() / len(series)) * 100, 2)
        }
        
        # Potential outliers (IQR method)
        q1, q3 = series.quantile([0.25, 0.75])
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        outliers = series[(series < lower_bound) | (series > upper_bound)]
        
        profile["outliers"] = {
            "count": len(outliers),
            "percentage": round((len(outliers) / len(series)) * 100, 2),
            "method": "IQR (1.5 * IQR rule)"
        }
    
    return profile


async def _profile_categorical_column(series: pd.Series, detailed: bool) -> Dict[str, Any]:
    """Profile categorical column."""
    
    value_counts = series.value_counts()
    
    profile = {
        "type": "categorical",
        "categories": {
            "unique_count": int(series.nunique()),
            "most_frequent": str(value_counts.index[0]) if not value_counts.empty else None,
            "most_frequent_count": int(value_counts.iloc[0]) if not value_counts.empty else 0,
            "least_frequent": str(value_counts.index[-1]) if not value_counts.empty else None,
            "least_frequent_count": int(value_counts.iloc[-1]) if not value_counts.empty else 0
        }
    }
    
    if detailed:
        # Top categories
        top_categories = value_counts.head(10).to_dict()
        profile["top_categories"] = {str(k): int(v) for k, v in top_categories.items()}
        
        # Category distribution
        profile["distribution"] = {
            "single_occurrence_count": int((value_counts == 1).sum()),
            "single_occurrence_percentage": round(((value_counts == 1).sum() / len(value_counts)) * 100, 2),
            "entropy": float(-sum((value_counts / len(series)) * np.log2(value_counts / len(series))))
        }
        
        # Text analysis for string categories
        if series.dtype == 'object':
            text_lengths = series.astype(str).str.len()
            profile["text_analysis"] = {
                "avg_length": round(float(text_lengths.mean()), 2),
                "min_length": int(text_lengths.min()),
                "max_length": int(text_lengths.max()),
                "contains_numbers": int(series.astype(str).str.contains(r'\d').sum()),
                "contains_special_chars": int(series.astype(str).str.contains(r'[^a-zA-Z0-9\s]').sum())
            }
    
    return profile


async def _profile_datetime_column(series: pd.Series, detailed: bool) -> Dict[str, Any]:
    """Profile datetime column."""
    
    profile = {
        "type": "datetime",
        "time_range": {
            "earliest": str(series.min()) if not series.empty else None,
            "latest": str(series.max()) if not series.empty else None,
            "span_days": int((series.max() - series.min()).days) if not series.empty else 0
        }
    }
    
    if detailed and not series.empty:
        # Temporal patterns
        profile["patterns"] = {
            "year_range": f"{series.dt.year.min()} - {series.dt.year.max()}",
            "months_present": sorted(series.dt.month.unique().tolist()),
            "weekdays_distribution": series.dt.day_name().value_counts().to_dict(),
            "hours_distribution": series.dt.hour.value_counts().to_dict() if hasattr(series.dt, 'hour') else {}
        }
        
        # Frequency analysis
        time_diffs = series.sort_values().diff()
        profile["frequency"] = {
            "median_interval_hours": float(time_diffs.median().total_seconds() / 3600) if not time_diffs.empty else None,
            "most_common_interval": str(time_diffs.mode().iloc[0]) if not time_diffs.empty and not time_diffs.mode().empty else None
        }
    
    return profile


async def _profile_boolean_column(series: pd.Series, detailed: bool) -> Dict[str, Any]:
    """Profile boolean column."""
    
    value_counts = series.value_counts()
    
    profile = {
        "type": "boolean",
        "distribution": {
            "true_count": int(value_counts.get(True, 0)),
            "false_count": int(value_counts.get(False, 0)),
            "true_percentage": round((value_counts.get(True, 0) / len(series)) * 100, 2),
            "false_percentage": round((value_counts.get(False, 0) / len(series)) * 100, 2)
        }
    }
    
    return profile


async def _assess_data_quality(df: pd.DataFrame) -> Dict[str, Any]:
    """Comprehensive data quality assessment."""
    
    quality_issues = []
    quality_strengths = []
    
    # Completeness issues
    missing_data = df.isnull().sum()
    high_missing_cols = missing_data[missing_data > len(df) * 0.2].index.tolist()
    if high_missing_cols:
        quality_issues.append({
            "type": "high_missing_data",
            "severity": "medium",
            "description": f"Columns with >20% missing data: {', '.join(high_missing_cols)}",
            "affected_columns": high_missing_cols
        })
    
    # Duplicate rows
    duplicate_count = df.duplicated().sum()
    if duplicate_count > 0:
        quality_issues.append({
            "type": "duplicate_rows",
            "severity": "medium",
            "description": f"{duplicate_count} duplicate rows ({duplicate_count/len(df)*100:.1f}%)",
            "count": int(duplicate_count)
        })
    
    # Constant columns
    constant_cols = []
    for col in df.columns:
        if df[col].nunique() <= 1:
            constant_cols.append(col)
    
    if constant_cols:
        quality_issues.append({
            "type": "constant_columns",
            "severity": "low",
            "description": f"Columns with single unique value: {', '.join(constant_cols)}",
            "affected_columns": constant_cols
        })
    
    # Data type inconsistencies
    type_issues = []
    for col in df.columns:
        if df[col].dtype == 'object':
            # Check if should be numeric
            try:
                numeric_converted = pd.to_numeric(df[col], errors='coerce')
                if numeric_converted.notna().sum() > len(df) * 0.8:
                    type_issues.append(col)
            except:
                pass
    
    if type_issues:
        quality_issues.append({
            "type": "data_type_inconsistency",
            "severity": "medium",
            "description": f"Columns that appear numeric but stored as text: {', '.join(type_issues)}",
            "affected_columns": type_issues
        })
    
    # Identify strengths
    completeness = ((len(df) * len(df.columns) - df.isnull().sum().sum()) / (len(df) * len(df.columns))) * 100
    
    if completeness > 95:
        quality_strengths.append("Excellent data completeness (>95%)")
    elif completeness > 90:
        quality_strengths.append("Good data completeness (>90%)")
    
    if duplicate_count == 0:
        quality_strengths.append("No duplicate rows")
    
    if len(df) > 1000:
        quality_strengths.append(f"Substantial dataset size ({len(df):,} rows)")
    
    # Overall quality score
    base_score = completeness
    base_score -= len([issue for issue in quality_issues if issue["severity"] == "high"]) * 15
    base_score -= len([issue for issue in quality_issues if issue["severity"] == "medium"]) * 10
    base_score -= len([issue for issue in quality_issues if issue["severity"] == "low"]) * 5
    
    quality_score = max(0, min(100, base_score))
    
    return {
        "overall_score": round(quality_score, 1),
        "completeness_percentage": round(completeness, 2),
        "issues": quality_issues,
        "strengths": quality_strengths,
        "recommendations": await _generate_quality_recommendations(quality_issues)
    }


async def _generate_statistical_summary(df: pd.DataFrame) -> Dict[str, Any]:
    """Generate statistical summary."""
    
    numeric_df = df.select_dtypes(include=[np.number])
    
    summary = {
        "numeric_columns": len(numeric_df.columns),
        "categorical_columns": len(df.select_dtypes(include=['object']).columns),
        "datetime_columns": len(df.select_dtypes(include=['datetime']).columns),
        "boolean_columns": len(df.select_dtypes(include=['bool']).columns)
    }
    
    if not numeric_df.empty:
        summary["numeric_summary"] = {
            "mean_of_means": float(numeric_df.mean().mean()),
            "overall_correlation_strength": float(abs(numeric_df.corr()).mean().mean()) if len(numeric_df.columns) > 1 else 0,
            "highest_variance_column": numeric_df.var().idxmax() if len(numeric_df.columns) > 0 else None,
            "lowest_variance_column": numeric_df.var().idxmin() if len(numeric_df.columns) > 0 else None
        }
    
    return summary


async def _detect_patterns(df: pd.DataFrame) -> Dict[str, Any]:
    """Detect interesting patterns in the data."""
    
    patterns = {
        "column_name_patterns": await _analyze_column_names(df),
        "value_patterns": await _analyze_value_patterns(df),
        "structural_patterns": await _analyze_structural_patterns(df)
    }
    
    return patterns


async def _analyze_column_names(df: pd.DataFrame) -> Dict[str, Any]:
    """Analyze column naming patterns."""
    
    columns = df.columns.tolist()
    
    # Common business domains
    business_patterns = {
        "financial": ["revenue", "sales", "price", "cost", "profit", "amount"],
        "customer": ["customer", "client", "user", "account"],
        "product": ["product", "item", "sku", "category"],
        "temporal": ["date", "time", "created", "updated"],
        "geographic": ["country", "state", "city", "region", "location"]
    }
    
    detected_domains = {}
    for domain, keywords in business_patterns.items():
        matching_cols = [col for col in columns if any(keyword in col.lower() for keyword in keywords)]
        if matching_cols:
            detected_domains[domain] = matching_cols
    
    # Naming conventions
    naming_conventions = {
        "snake_case": sum(1 for col in columns if '_' in col and col.islower()),
        "camelCase": sum(1 for col in columns if any(c.isupper() for c in col[1:]) and '_' not in col),
        "PascalCase": sum(1 for col in columns if col[0].isupper() and any(c.isupper() for c in col[1:]) and '_' not in col),
        "contains_spaces": sum(1 for col in columns if ' ' in col)
    }
    
    return {
        "business_domains": detected_domains,
        "naming_conventions": naming_conventions,
        "total_columns": len(columns)
    }


async def _analyze_value_patterns(df: pd.DataFrame) -> Dict[str, Any]:
    """Analyze patterns in data values."""
    
    patterns = {}
    
    # ID-like patterns
    id_columns = []
    for col in df.columns:
        if df[col].dtype in ['int64', 'object']:
            # Check if values look like IDs (unique, sequential, or formatted)
            if df[col].nunique() == len(df) and len(df) > 1:  # Unique values
                id_columns.append(col)
    
    patterns["potential_id_columns"] = id_columns
    
    # Email/phone patterns
    contact_columns = []
    for col in df.columns:
        if df[col].dtype == 'object':
            sample = df[col].dropna().head(100)
            if len(sample) > 0:
                if sample.str.contains('@').sum() > len(sample) * 0.5:
                    contact_columns.append({"column": col, "type": "email"})
                elif sample.str.contains(r'\d{3}[-.]?\d{3}[-.]?\d{4}').sum() > len(sample) * 0.3:
                    contact_columns.append({"column": col, "type": "phone"})
    
    patterns["contact_info_columns"] = contact_columns
    
    return patterns


async def _analyze_structural_patterns(df: pd.DataFrame) -> Dict[str, Any]:
    """Analyze structural patterns."""
    
    return {
        "column_count": len(df.columns),
        "row_count": len(df),
        "density": round((df.count().sum() / (len(df) * len(df.columns))) * 100, 2),
        "shape_category": "wide" if len(df.columns) > len(df) else "tall" if len(df) > len(df.columns) * 10 else "balanced"
    }


async def _analyze_correlations(df: pd.DataFrame) -> Dict[str, Any]:
    """Analyze correlations between numeric columns."""
    
    numeric_df = df.select_dtypes(include=[np.number])
    
    if len(numeric_df.columns) < 2:
        return {"message": "Need at least 2 numeric columns for correlation analysis"}
    
    corr_matrix = numeric_df.corr()
    
    # Find strong correlations
    strong_correlations = []
    for i in range(len(corr_matrix.columns)):
        for j in range(i+1, len(corr_matrix.columns)):
            col1, col2 = corr_matrix.columns[i], corr_matrix.columns[j]
            corr_value = corr_matrix.iloc[i, j]
            
            if abs(corr_value) > 0.7:  # Strong correlation
                strong_correlations.append({
                    "column1": col1,
                    "column2": col2,
                    "correlation": round(float(corr_value), 3),
                    "strength": "strong" if abs(corr_value) > 0.8 else "moderate"
                })
    
    return {
        "correlation_matrix": corr_matrix.round(3).to_dict(),
        "strong_correlations": strong_correlations,
        "average_correlation": round(float(abs(corr_matrix).mean().mean()), 3),
        "most_correlated_pair": strong_correlations[0] if strong_correlations else None
    }


async def _analyze_distributions(df: pd.DataFrame) -> Dict[str, Any]:
    """Analyze distributions of numeric columns."""
    
    numeric_df = df.select_dtypes(include=[np.number])
    distributions = {}
    
    for col in numeric_df.columns:
        series = numeric_df[col].dropna()
        
        if len(series) == 0:
            continue
        
        # Basic distribution characteristics
        dist_info = {
            "skewness": round(float(series.skew()), 3),
            "kurtosis": round(float(series.kurtosis()), 3),
            "distribution_type": "normal" if abs(series.skew()) < 0.5 else "skewed",
            "outlier_percentage": 0
        }
        
        # Outlier detection using IQR
        q1, q3 = series.quantile([0.25, 0.75])
        iqr = q3 - q1
        outliers = series[(series < q1 - 1.5 * iqr) | (series > q3 + 1.5 * iqr)]
        dist_info["outlier_percentage"] = round((len(outliers) / len(series)) * 100, 2)
        
        distributions[col] = dist_info
    
    return distributions


async def _detect_outliers(df: pd.DataFrame) -> Dict[str, Any]:
    """Detect outliers across the dataset."""
    
    numeric_df = df.select_dtypes(include=[np.number])
    outlier_summary = {
        "columns_with_outliers": [],
        "total_outlier_rows": 0,
        "outlier_detection_method": "IQR (1.5 * IQR rule)"
    }
    
    outlier_rows = set()
    
    for col in numeric_df.columns:
        series = numeric_df[col].dropna()
        
        if len(series) == 0:
            continue
        
        # IQR method
        q1, q3 = series.quantile([0.25, 0.75])
        iqr = q3 - q1
        lower_bound = q1 - 1.5 * iqr
        upper_bound = q3 + 1.5 * iqr
        
        outlier_mask = (series < lower_bound) | (series > upper_bound)
        outlier_indices = series[outlier_mask].index
        
        if len(outlier_indices) > 0:
            outlier_summary["columns_with_outliers"].append({
                "column": col,
                "outlier_count": len(outlier_indices),
                "outlier_percentage": round((len(outlier_indices) / len(series)) * 100, 2),
                "bounds": {"lower": round(float(lower_bound), 3), "upper": round(float(upper_bound), 3)}
            })
            
            outlier_rows.update(outlier_indices)
    
    outlier_summary["total_outlier_rows"] = len(outlier_rows)
    outlier_summary["outlier_row_percentage"] = round((len(outlier_rows) / len(df)) * 100, 2)
    
    return outlier_summary


async def _analyze_temporal_patterns(df: pd.DataFrame) -> Dict[str, Any]:
    """Analyze temporal patterns in datetime columns."""
    
    datetime_columns = df.select_dtypes(include=['datetime']).columns
    
    if len(datetime_columns) == 0:
        # Try to detect date-like string columns
        potential_date_cols = []
        for col in df.select_dtypes(include=['object']).columns:
            sample = df[col].dropna().head(100)
            if len(sample) > 0:
                try:
                    pd.to_datetime(sample.head(10))
                    potential_date_cols.append(col)
                except:
                    pass
        
        if potential_date_cols:
            return {
                "message": "No datetime columns found, but potential date columns detected",
                "potential_date_columns": potential_date_cols,
                "suggestion": "Consider converting these columns to datetime format"
            }
        else:
            return {"message": "No temporal columns detected"}
    
    temporal_analysis = {}
    
    for col in datetime_columns:
        series = df[col].dropna()
        
        if len(series) == 0:
            continue
        
        analysis = {
            "date_range": {
                "start": str(series.min()),
                "end": str(series.max()),
                "span_days": int((series.max() - series.min()).days)
            },
            "frequency_analysis": {
                "most_common_year": int(series.dt.year.mode().iloc[0]) if not series.dt.year.mode().empty else None,
                "most_common_month": int(series.dt.month.mode().iloc[0]) if not series.dt.month.mode().empty else None,
                "most_common_weekday": series.dt.day_name().mode().iloc[0] if not series.dt.day_name().mode().empty else None
            }
        }
        
        temporal_analysis[col] = analysis
    
    return temporal_analysis


async def _generate_business_insights(df: pd.DataFrame) -> Dict[str, Any]:
    """Generate business-focused insights from the data profile."""
    
    insights = {
        "data_readiness": "unknown",
        "analysis_opportunities": [],
        "business_value_indicators": [],
        "recommended_next_steps": []
    }
    
    # Assess data readiness for analysis
    completeness = ((len(df) * len(df.columns) - df.isnull().sum().sum()) / (len(df) * len(df.columns))) * 100
    
    if completeness > 95 and len(df) > 100:
        insights["data_readiness"] = "excellent - ready for advanced analytics"
    elif completeness > 85 and len(df) > 50:
        insights["data_readiness"] = "good - suitable for most analyses with minor cleaning"
    elif completeness > 70:
        insights["data_readiness"] = "fair - requires data cleaning before analysis"
    else:
        insights["data_readiness"] = "poor - significant data quality issues need addressing"
    
    # Identify analysis opportunities
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    categorical_cols = df.select_dtypes(include=['object']).columns
    datetime_cols = df.select_dtypes(include=['datetime']).columns
    
    if len(numeric_cols) > 1:
        insights["analysis_opportunities"].append("Correlation analysis between numeric variables")
        insights["analysis_opportunities"].append("Statistical modeling and regression analysis")
    
    if len(datetime_cols) > 0 and len(numeric_cols) > 0:
        insights["analysis_opportunities"].append("Time series analysis and trend forecasting")
        insights["analysis_opportunities"].append("Seasonal pattern detection")
    
    if len(categorical_cols) > 0 and len(numeric_cols) > 0:
        insights["analysis_opportunities"].append("Segmentation analysis by categories")
        insights["analysis_opportunities"].append("Group comparison and statistical testing")
    
    if len(df) > 1000:
        insights["analysis_opportunities"].append("Machine learning model development")
        insights["analysis_opportunities"].append("Advanced statistical analysis")
    
    # Business value indicators
    business_keywords = {
        "revenue": ["revenue", "sales", "income", "profit"],
        "customer": ["customer", "client", "user", "subscriber"],
        "product": ["product", "item", "service", "offering"],
        "marketing": ["campaign", "channel", "source", "medium"],
        "operations": ["order", "transaction", "process", "workflow"]
    }
    
    for domain, keywords in business_keywords.items():
        matching_cols = [col for col in df.columns if any(keyword in col.lower() for keyword in keywords)]
        if matching_cols:
            insights["business_value_indicators"].append(f"{domain.title()} data available: {', '.join(matching_cols[:3])}")
    
    # Recommended next steps
    if len(numeric_cols) > 1:
        insights["recommended_next_steps"].append("Run correlation analysis to identify key relationships")
    
    if datetime_cols:
        insights["recommended_next_steps"].append("Perform trend analysis on time-based metrics")
    
    if completeness < 90:
        insights["recommended_next_steps"].append("Address data quality issues before proceeding with analysis")
    
    insights["recommended_next_steps"].append("Create visualizations to explore patterns")
    insights["recommended_next_steps"].append("Generate executive summary for stakeholders")
    
    return insights


async def _generate_profiling_recommendations(df: pd.DataFrame) -> List[str]:
    """Generate actionable recommendations based on profiling results."""
    
    recommendations = []
    
    # Data quality recommendations
    completeness = ((len(df) * len(df.columns) - df.isnull().sum().sum()) / (len(df) * len(df.columns))) * 100
    
    if completeness < 95:
        recommendations.append(f"🔧 Data completeness is {completeness:.1f}% - consider imputation strategies for missing values")
    
    # Duplicate detection
    duplicate_count = df.duplicated().sum()
    if duplicate_count > 0:
        recommendations.append(f"🔄 {duplicate_count} duplicate rows detected - consider deduplication")
    
    # Column-specific recommendations
    for col in df.columns:
        missing_pct = (df[col].isnull().sum() / len(df)) * 100
        
        if missing_pct > 50:
            recommendations.append(f"❌ Column '{col}' has {missing_pct:.1f}% missing data - consider removal")
        elif missing_pct > 20:
            recommendations.append(f"⚠️ Column '{col}' has {missing_pct:.1f}% missing data - investigate patterns")
        
        if df[col].nunique() == 1:
            recommendations.append(f"🗑️ Column '{col}' has constant values - consider removal")
        
        # Type conversion suggestions
        if df[col].dtype == 'object':
            try:
                numeric_converted = pd.to_numeric(df[col], errors='coerce')
                if numeric_converted.notna().sum() > len(df) * 0.8:
                    recommendations.append(f"🔢 Column '{col}' appears numeric - consider type conversion")
            except:
                pass
    
    # Analysis recommendations
    numeric_cols = len(df.select_dtypes(include=[np.number]).columns)
    if numeric_cols > 1:
        recommendations.append("📊 Multiple numeric columns - run correlation analysis")
    
    datetime_cols = df.select_dtypes(include=['datetime']).columns
    if len(datetime_cols) > 0:
        recommendations.append("📅 Temporal data available - consider trend analysis")
    
    if len(df) > 10000:
        recommendations.append("📈 Large dataset - consider sampling for exploratory analysis")
    
    # Business intelligence recommendations
    business_indicators = ['revenue', 'sales', 'customer', 'user', 'order', 'product']
    detected_context = []
    for indicator in business_indicators:
        if any(indicator in col.lower() for col in df.columns):
            detected_context.append(indicator)
    
    if detected_context:
        context_str = ', '.join(detected_context)
        recommendations.append(f"💼 Business context detected ({context_str}) - ready for business intelligence workflows")
    
    if not recommendations:
        recommendations.append("✅ Data profile looks good - ready for analysis")
    
    # Limit to most important recommendations
    return recommendations[:8]


async def _generate_quality_recommendations(quality_issues: List[Dict[str, Any]]) -> List[str]:
    """Generate quality-specific recommendations."""
    
    recommendations = []
    
    for issue in quality_issues:
        if issue["type"] == "high_missing_data":
            recommendations.append("🔧 Implement imputation strategies or filter high-missing columns")
        elif issue["type"] == "duplicate_rows":
            recommendations.append("🔄 Remove duplicate rows using appropriate deduplication logic")
        elif issue["type"] == "constant_columns":
            recommendations.append("🗑️ Remove constant-value columns as they add no analytical value")
        elif issue["type"] == "data_type_inconsistency":
            recommendations.append("🔢 Convert text columns to appropriate numeric types")
    
    if not recommendations:
        recommendations.append("✅ No major quality issues detected")
    
    return recommendations
