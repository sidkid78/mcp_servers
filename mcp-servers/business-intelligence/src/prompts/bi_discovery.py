"""
Business Intelligence Discovery Prompt
Data source discovery and initial profiling with business context.
"""

import os
import json
import pandas as pd
from pathlib import Path
from typing import Dict, List, Any


async def bi_discovery_prompt(data_path: str = ".", business_context: str = "") -> str:
    """
    Discover and profile available data sources for business intelligence analysis.
    This is the entry point that primes the agent with data context and business understanding.
    """

    # Convert path and validate
    target_path = Path(data_path).resolve()

    if not target_path.exists():
        return f"❌ Data path does not exist: {target_path}"

    # Discover data sources
    data_sources = await _discover_data_sources(target_path)

    if not data_sources["files"]:
        return f"""
❌ **No Data Sources Found**

Searched in: {target_path}

**Supported formats:** CSV, Excel (.xlsx, .xls), JSON, Parquet
**Suggestions:**
• Place data files in the specified directory
• Check file permissions and formats
• Try running with a different path

**Next Steps:**
• Use `load-datasource` tool to manually specify a data source
• Check the `/business-intelligence/` directory for sample datasets
"""

    # Perform initial profiling on discovered sources
    initial_profiles = await _initial_data_profiling(
        data_sources["files"][:5]
    )  # Limit to first 5 files

    # Generate business context suggestions
    context_suggestions = _generate_context_suggestions(data_sources, business_context)

    # Create discovery summary
    discovery_summary = f"""
🔍 **Business Intelligence Discovery Complete**

**Data Environment Analysis:**
📁 Search Path: {target_path}
📊 Data Sources Found: {len(data_sources["files"])} files
💾 Total Size: {_format_file_size(data_sources["total_size"])}
📈 Formats Detected: {", ".join(data_sources["formats"])}

**Data Source Summary:**
{_format_data_sources(data_sources["files"][:10])}

**Initial Data Profiling:**
{_format_initial_profiles(initial_profiles)}

**Business Context Analysis:**
{context_suggestions}

**Available BI Workflows:**
🔍 `/bi/insight-investigation` - Guided exploration of business metrics
📊 `/bi/correlation-deep-dive` - Multi-dimensional correlation analysis  
📈 `/bi/trend-analysis` - Time-series pattern detection with forecasting
📋 `/bi/executive-summary` - Auto-generate C-suite ready reports
🎯 `/bi/action-recommendations` - Data-driven business recommendations

**Individual Tools Available:**
• `load-datasource` - ETL from various sources (CSV, Excel, JSON, databases)
• `profile-dataset` - Statistical profiling and data quality assessment
• `create-visualization` - Generate charts, dashboards, and interactive visualizations
• `run-correlation` - Statistical correlation analysis with business interpretation
• `export-report` - Generate formatted business reports (PDF, PowerPoint, HTML)
• `schedule-analysis` - Set up automated recurring insights and monitoring

**Quick Start Recommendations:**
{_generate_quick_start_recommendations(data_sources, initial_profiles, business_context)}

**Data Discovery Complete ✅**
Ready for business intelligence analysis. What insights would you like to explore?
"""

    return discovery_summary


async def _discover_data_sources(target_path: Path) -> Dict[str, Any]:
    """Discover all available data sources in the target path."""

    data_sources = {"files": [], "total_size": 0, "formats": set(), "directories": []}

    # Supported data file extensions
    data_extensions = {
        ".csv": "CSV",
        ".xlsx": "Excel",
        ".xls": "Excel",
        ".json": "JSON",
        ".jsonl": "JSON Lines",
        ".parquet": "Parquet",
        ".tsv": "TSV",
        ".txt": "Text",
    }

    try:
        if target_path.is_file():
            # Single file
            if target_path.suffix.lower() in data_extensions:
                file_info = await _analyze_file_metadata(target_path, data_extensions)
                if file_info:
                    data_sources["files"].append(file_info)
                    data_sources["total_size"] += file_info["size"]
                    data_sources["formats"].add(file_info["format"])
        else:
            # Directory search
            for root, dirs, files in os.walk(target_path):
                # Skip hidden directories and common ignore patterns
                dirs[:] = [
                    d
                    for d in dirs
                    if not d.startswith(".")
                    and d not in ["__pycache__", ".git", "node_modules"]
                ]

                rel_root = Path(root).relative_to(target_path)
                if rel_root != Path("."):
                    data_sources["directories"].append(str(rel_root))

                for file in files:
                    file_path = Path(root) / file
                    if file_path.suffix.lower() in data_extensions:
                        file_info = await _analyze_file_metadata(
                            file_path, data_extensions
                        )
                        if file_info:
                            data_sources["files"].append(file_info)
                            data_sources["total_size"] += file_info["size"]
                            data_sources["formats"].add(file_info["format"])

        # Convert set to list for JSON serialization
        data_sources["formats"] = list(data_sources["formats"])

        # Sort files by size (largest first)
        data_sources["files"].sort(key=lambda x: x["size"], reverse=True)

    except Exception as e:
        # Add error info but continue
        data_sources["error"] = f"Error during discovery: {str(e)}"

    return data_sources


async def _analyze_file_metadata(
    file_path: Path, extensions_map: Dict[str, str]
) -> Dict[str, Any]:
    """Analyze metadata for a single data file."""

    try:
        stat = file_path.stat()

        file_info = {
            "name": file_path.name,
            "path": str(file_path),
            "relative_path": str(file_path.name),  # Will be updated by caller if needed
            "format": extensions_map.get(file_path.suffix.lower(), "Unknown"),
            "size": stat.st_size,
            "modified": stat.st_mtime,
            "estimated_rows": 0,
            "estimated_columns": 0,
        }

        # Quick peek at file structure for CSV/TSV files
        if file_path.suffix.lower() in [".csv", ".tsv"]:
            try:
                separator = "," if file_path.suffix.lower() == ".csv" else "\t"
                # Read just first few lines to estimate structure
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    first_line = f.readline().strip()
                    if first_line:
                        file_info["estimated_columns"] = len(
                            first_line.split(separator)
                        )

                    # Estimate rows by counting lines (sample approach for large files)
                    if (
                        stat.st_size < 10 * 1024 * 1024
                    ):  # Less than 10MB, count all lines
                        line_count = sum(1 for _ in f)
                        file_info["estimated_rows"] = line_count
                    else:  # Large file, estimate based on sample
                        f.seek(0)
                        sample_lines = [f.readline() for _ in range(100)]
                        avg_line_length = sum(
                            len(line) for line in sample_lines if line
                        ) / max(len(sample_lines), 1)
                        if avg_line_length > 0:
                            file_info["estimated_rows"] = int(
                                stat.st_size / avg_line_length
                            )

            except Exception:
                pass  # Keep basic metadata even if detailed analysis fails

        # Quick structure check for JSON files
        elif file_path.suffix.lower() == ".json":
            try:
                if stat.st_size < 50 * 1024 * 1024:  # Less than 50MB
                    with open(file_path, "r", encoding="utf-8") as f:
                        data = json.load(f)
                        if isinstance(data, list):
                            file_info["estimated_rows"] = len(data)
                            if data and isinstance(data[0], dict):
                                file_info["estimated_columns"] = len(data[0].keys())
                        elif isinstance(data, dict):
                            file_info["estimated_rows"] = 1
                            file_info["estimated_columns"] = len(data.keys())
            except Exception:
                pass

        # Excel files - use pandas for quick peek
        elif file_path.suffix.lower() in [".xlsx", ".xls"]:
            try:
                # Read just the first sheet header
                df_sample = pd.read_excel(file_path, nrows=0)  # Just headers
                file_info["estimated_columns"] = len(df_sample.columns)

                # Try to get row count efficiently
                df_sample = pd.read_excel(file_path, nrows=1000)  # Sample rows
                if len(df_sample) == 1000:
                    # File likely has more rows, estimate based on file size
                    file_info["estimated_rows"] = "1000+ (large file)"
                else:
                    file_info["estimated_rows"] = len(df_sample)
            except Exception:
                pass

        return file_info

    except Exception:
        return None


async def _initial_data_profiling(files: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Perform initial profiling on discovered data files."""

    profiles = []

    for file_info in files[:3]:  # Profile first 3 files to avoid long startup times
        try:
            file_path = Path(file_info["path"])

            profile = {
                "file": file_info["name"],
                "format": file_info["format"],
                "size": file_info["size"],
                "structure": {},
                "data_types": {},
                "sample_data": [],
                "business_potential": "",
            }

            # Load and profile based on format
            if file_info["format"] == "CSV":
                df = pd.read_csv(file_path, nrows=1000)  # Sample first 1000 rows
                profile.update(await _profile_dataframe(df, file_info["name"]))

            elif file_info["format"] == "Excel":
                df = pd.read_excel(file_path, nrows=1000)
                profile.update(await _profile_dataframe(df, file_info["name"]))

            elif file_info["format"] == "JSON":
                if file_path.stat().st_size < 50 * 1024 * 1024:  # 50MB limit
                    with open(file_path, "r") as f:
                        data = json.load(f)

                    if isinstance(data, list) and data and isinstance(data[0], dict):
                        df = pd.DataFrame(data[:1000])  # First 1000 records
                        profile.update(await _profile_dataframe(df, file_info["name"]))
                    else:
                        profile["structure"] = {
                            "type": "nested_json",
                            "keys": list(data.keys())
                            if isinstance(data, dict)
                            else "array",
                        }

            profiles.append(profile)

        except Exception as e:
            profiles.append(
                {
                    "file": file_info["name"],
                    "error": f"Could not profile: {str(e)}",
                    "size": file_info["size"],
                }
            )

    return profiles


async def _profile_dataframe(df: pd.DataFrame, filename: str) -> Dict[str, Any]:
    """Profile a pandas DataFrame for business intelligence insights."""

    profile = {
        "structure": {
            "rows": len(df),
            "columns": len(df.columns),
            "memory_usage": df.memory_usage(deep=True).sum(),
        },
        "data_types": {},
        "sample_data": [],
        "column_analysis": {},
        "business_potential": "",
    }

    # Analyze data types and columns
    numeric_cols = []
    date_cols = []
    categorical_cols = []
    text_cols = []

    for col in df.columns:
        dtype = str(df[col].dtype)
        non_null_count = df[col].count()
        null_percentage = ((len(df) - non_null_count) / len(df)) * 100

        profile["data_types"][col] = {
            "dtype": dtype,
            "non_null_count": non_null_count,
            "null_percentage": round(null_percentage, 1),
        }

        # Categorize columns for business analysis
        if df[col].dtype in ["int64", "float64"]:
            numeric_cols.append(col)
            profile["column_analysis"][col] = {
                "type": "numeric",
                "min": df[col].min() if non_null_count > 0 else None,
                "max": df[col].max() if non_null_count > 0 else None,
                "mean": round(df[col].mean(), 2) if non_null_count > 0 else None,
            }
        elif "datetime" in dtype or _is_date_column(df[col]):
            date_cols.append(col)
            profile["column_analysis"][col] = {"type": "temporal"}
        elif df[col].nunique() < len(df) * 0.1:  # Less than 10% unique values
            categorical_cols.append(col)
            profile["column_analysis"][col] = {
                "type": "categorical",
                "unique_values": df[col].nunique(),
                "top_values": df[col].value_counts().head(3).to_dict(),
            }
        else:
            text_cols.append(col)
            profile["column_analysis"][col] = {"type": "text"}

    # Generate sample data (first 3 rows)
    try:
        profile["sample_data"] = df.head(3).to_dict("records")
    except:
        profile["sample_data"] = ["Could not generate sample"]

    # Assess business potential
    profile["business_potential"] = _assess_business_potential(
        filename, numeric_cols, date_cols, categorical_cols, df.columns.tolist()
    )

    return profile


def _is_date_column(series: pd.Series) -> bool:
    """Heuristic to detect if a column contains dates."""

    # Try to parse a sample of values as dates
    sample = series.dropna().head(10)
    if len(sample) == 0:
        return False

    date_indicators = ["date", "time", "created", "updated", "timestamp"]
    if any(indicator in series.name.lower() for indicator in date_indicators):
        return True

    # Try parsing sample values
    try:
        pd.to_datetime(sample.head(5))
        return True
    except:
        return False


def _assess_business_potential(
    filename: str,
    numeric_cols: List[str],
    date_cols: List[str],
    categorical_cols: List[str],
    all_cols: List[str],
) -> str:
    """Assess the business intelligence potential of a dataset."""

    potentials = []

    # Revenue/Financial analysis potential
    financial_indicators = [
        "revenue",
        "sales",
        "price",
        "cost",
        "profit",
        "amount",
        "value",
        "payment",
    ]
    financial_cols = [
        col
        for col in all_cols
        if any(indicator in col.lower() for indicator in financial_indicators)
    ]
    if financial_cols:
        potentials.append("💰 Financial analysis (revenue, costs, profitability)")

    # Customer analysis potential
    customer_indicators = ["customer", "client", "user", "account", "buyer"]
    customer_cols = [
        col
        for col in all_cols
        if any(indicator in col.lower() for indicator in customer_indicators)
    ]
    if customer_cols:
        potentials.append("👥 Customer analysis (behavior, segmentation, retention)")

    # Time series analysis potential
    if date_cols and numeric_cols:
        potentials.append("📈 Time series analysis (trends, seasonality, forecasting)")

    # Geographic analysis potential
    geo_indicators = [
        "country",
        "state",
        "city",
        "region",
        "location",
        "address",
        "zip",
        "postal",
    ]
    geo_cols = [
        col
        for col in all_cols
        if any(indicator in col.lower() for indicator in geo_indicators)
    ]
    if geo_cols:
        potentials.append(
            "🗺️ Geographic analysis (regional performance, location insights)"
        )

    # Product analysis potential
    product_indicators = ["product", "item", "sku", "category", "brand"]
    product_cols = [
        col
        for col in all_cols
        if any(indicator in col.lower() for indicator in product_indicators)
    ]
    if product_cols:
        potentials.append("📦 Product analysis (performance, category trends)")

    # Operational analysis potential
    operational_indicators = ["order", "transaction", "status", "quantity", "inventory"]
    operational_cols = [
        col
        for col in all_cols
        if any(indicator in col.lower() for indicator in operational_indicators)
    ]
    if operational_cols:
        potentials.append("⚙️ Operational analysis (efficiency, process optimization)")

    # General analytics potential
    if len(numeric_cols) >= 3:
        potentials.append("📊 Statistical analysis (correlations, distributions)")

    if len(categorical_cols) >= 2:
        potentials.append("🔍 Segmentation analysis (group comparisons)")

    return (
        " • ".join(potentials)
        if potentials
        else "📋 General data exploration and reporting"
    )


def _generate_context_suggestions(
    data_sources: Dict[str, Any], business_context: str
) -> str:
    """Generate business context suggestions based on discovered data."""

    if business_context:
        context_analysis = f"""
**Provided Context:** {business_context}

**Context-Data Alignment:**
{_analyze_context_alignment(data_sources, business_context)}
"""
    else:
        context_analysis = """
**Business Context:** Not provided

**Suggested Context Areas:**
• What business questions are you looking to answer?
• What time period should the analysis focus on?
• Are there specific KPIs or metrics of interest?
• What decisions will this analysis support?

**Auto-Detected Business Areas:**
{_auto_detect_business_areas(data_sources)}
"""

    return context_analysis


def _analyze_context_alignment(data_sources: Dict[str, Any], context: str) -> str:
    """Analyze how well the discovered data aligns with provided business context."""

    context_lower = context.lower()
    alignments = []

    # Check for context keywords in filenames and estimated structure
    for file_info in data_sources["files"][:5]:
        filename_lower = file_info["name"].lower()

        # Common business domain alignments
        if any(
            word in context_lower for word in ["revenue", "sales", "financial"]
        ) and any(
            word in filename_lower
            for word in ["sales", "revenue", "financial", "order"]
        ):
            alignments.append(
                f"✅ {file_info['name']} appears relevant to financial/sales analysis"
            )

        elif any(
            word in context_lower for word in ["customer", "client", "user"]
        ) and any(
            word in filename_lower for word in ["customer", "client", "user", "account"]
        ):
            alignments.append(
                f"✅ {file_info['name']} appears relevant to customer analysis"
            )

        elif any(
            word in context_lower for word in ["product", "inventory", "catalog"]
        ) and any(
            word in filename_lower
            for word in ["product", "item", "inventory", "catalog"]
        ):
            alignments.append(
                f"✅ {file_info['name']} appears relevant to product analysis"
            )

        elif any(
            word in context_lower for word in ["marketing", "campaign", "ad"]
        ) and any(
            word in filename_lower for word in ["marketing", "campaign", "ad", "click"]
        ):
            alignments.append(
                f"✅ {file_info['name']} appears relevant to marketing analysis"
            )

    if not alignments:
        alignments.append(
            "⚠️ No obvious alignment detected - consider running detailed profiling"
        )

    return "\n".join(alignments)


def _auto_detect_business_areas(data_sources: Dict[str, Any]) -> str:
    """Auto-detect potential business areas from filenames and structure."""

    detected_areas = set()

    for file_info in data_sources["files"]:
        filename_lower = file_info["name"].lower()

        # Financial/Sales
        if any(
            term in filename_lower
            for term in [
                "sales",
                "revenue",
                "financial",
                "order",
                "transaction",
                "payment",
            ]
        ):
            detected_areas.add("💰 Financial & Sales Analysis")

        # Customer/User
        if any(
            term in filename_lower
            for term in ["customer", "client", "user", "account", "subscriber"]
        ):
            detected_areas.add("👥 Customer Analytics")

        # Product/Inventory
        if any(
            term in filename_lower
            for term in ["product", "item", "inventory", "catalog", "sku"]
        ):
            detected_areas.add("📦 Product & Inventory Analysis")

        # Marketing
        if any(
            term in filename_lower
            for term in ["marketing", "campaign", "ad", "click", "impression"]
        ):
            detected_areas.add("📈 Marketing Analytics")

        # Operations
        if any(
            term in filename_lower
            for term in ["operation", "process", "workflow", "log", "event"]
        ):
            detected_areas.add("⚙️ Operational Analytics")

        # HR/Employee
        if any(
            term in filename_lower
            for term in ["employee", "hr", "staff", "payroll", "attendance"]
        ):
            detected_areas.add("👤 HR & Employee Analytics")

    return (
        "\n".join(f"• {area}" for area in sorted(detected_areas))
        if detected_areas
        else "• General business data detected"
    )


def _format_data_sources(files: List[Dict[str, Any]]) -> str:
    """Format data sources list for display."""

    if not files:
        return "No data sources found"

    formatted = []
    for file_info in files:
        size_str = _format_file_size(file_info["size"])
        rows_str = (
            f" ({file_info.get('estimated_rows', '?')} rows)"
            if file_info.get("estimated_rows")
            else ""
        )
        cols_str = (
            f" × {file_info.get('estimated_columns', '?')} cols"
            if file_info.get("estimated_columns")
            else ""
        )

        formatted.append(
            f"• **{file_info['name']}** ({file_info['format']}) - {size_str}{rows_str}{cols_str}"
        )

    return "\n".join(formatted)


def _format_initial_profiles(profiles: List[Dict[str, Any]]) -> str:
    """Format initial data profiles for display."""

    if not profiles:
        return "No initial profiling performed"

    formatted = []
    for profile in profiles:
        if "error" in profile:
            formatted.append(f"• **{profile['file']}**: {profile['error']}")
        else:
            structure = profile.get("structure", {})
            potential = profile.get("business_potential", "General analysis")

            formatted.append(f"""• **{profile["file"]}**: {structure.get("rows", "?")} rows, {structure.get("columns", "?")} columns
  *Business Potential:* {potential}""")

    return "\n".join(formatted)


def _format_file_size(size_bytes: int) -> str:
    """Format file size in human-readable format."""

    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return f"{size_bytes / 1024:.1f} KB"
    elif size_bytes < 1024 * 1024 * 1024:
        return f"{size_bytes / (1024 * 1024):.1f} MB"
    else:
        return f"{size_bytes / (1024 * 1024 * 1024):.1f} GB"


def _generate_quick_start_recommendations(
    data_sources: Dict[str, Any], profiles: List[Dict[str, Any]], business_context: str
) -> str:
    """Generate contextual quick start recommendations."""

    recommendations = []

    # Based on number of data sources
    if len(data_sources["files"]) == 1:
        file_info = data_sources["files"][0]
        recommendations.append(
            f"📊 Single dataset detected → Start with `/bi/insight-investigation {file_info['name'].split('.')[0]}` for deep dive"
        )
    elif len(data_sources["files"]) > 1:
        recommendations.append(
            "🔍 Multiple datasets → Try `/bi/correlation-deep-dive` to find relationships across datasets"
        )

    # Based on data characteristics
    has_time_data = any(
        "temporal" in str(profile.get("column_analysis", {})) for profile in profiles
    )
    if has_time_data:
        recommendations.append(
            "📈 Time-based data detected → Use `/bi/trend-analysis` for temporal patterns and forecasting"
        )

    # Based on business context
    if business_context:
        if any(
            word in business_context.lower()
            for word in ["report", "executive", "summary", "board"]
        ):
            recommendations.append(
                "📋 Executive reporting needed → Try `/bi/executive-summary` for C-suite ready insights"
            )
        if any(
            word in business_context.lower()
            for word in ["decision", "action", "strategy"]
        ):
            recommendations.append(
                "🎯 Decision support needed → Use `/bi/action-recommendations` for data-driven guidance"
            )

    # Based on file sizes and complexity
    large_datasets = [
        f for f in data_sources["files"] if f["size"] > 10 * 1024 * 1024
    ]  # > 10MB
    if large_datasets:
        recommendations.append(
            "💾 Large datasets detected → Consider using `profile-dataset` tool for detailed statistical analysis"
        )

    # Default recommendations
    if not recommendations:
        recommendations.extend(
            [
                "🚀 Start with `/bi/insight-investigation` for guided business metrics exploration",
                "📊 Use `profile-dataset` tool for detailed statistical analysis of your data",
                "📈 Try `create-visualization` tool to generate initial charts and explore patterns",
            ]
        )

    return "\n".join(f"• {rec}" for rec in recommendations[:4])
