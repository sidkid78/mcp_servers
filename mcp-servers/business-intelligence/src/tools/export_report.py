"""
Export Report Tool
Generate formatted business reports (PDF, PowerPoint, HTML).
"""

import pandas as pd
import numpy as np
from typing import Dict, Any, List, Optional
from pathlib import Path
import json
from datetime import datetime
import base64
from io import BytesIO


async def export_report_tool(
    content: Dict[str, Any],
    format: str = "pdf",
    template: str = "standard",
    output_path: str = ""
) -> Dict[str, Any]:
    """
    Generate formatted business reports (PDF, PowerPoint, HTML).
    """
    
    try:
        # Validate parameters
        validation_result = await _validate_export_params(content, format, template, output_path)
        if "error" in validation_result:
            return validation_result
        
        # Prepare report data
        report_data = await _prepare_report_data(content, template)
        
        # Generate report based on format
        export_result = await _generate_report(report_data, format, template, output_path)
        
        return {
            "export_status": "success",
            "format": format,
            "template": template,
            "output_path": export_result.get("output_path", ""),
            "report_summary": {
                "sections": len(report_data.get("sections", [])),
                "total_content_length": sum(len(str(section.get("content", ""))) for section in report_data.get("sections", [])),
                "generation_timestamp": datetime.now().isoformat(),
                "file_size": export_result.get("file_size", 0)
            },
            "export_details": export_result,
            "next_steps": await _generate_export_recommendations(report_data, format)
        }
        
    except Exception as e:
        return {
            "export_status": "failed",
            "format": format,
            "template": template,
            "error": f"Failed to export report: {str(e)}",
            "troubleshooting": [
                "Verify content structure is valid",
                "Check output path permissions",
                "Ensure format is supported",
                "Verify template exists"
            ]
        }


async def _validate_export_params(
    content: Dict[str, Any],
    format: str,
    template: str,
    output_path: str
) -> Dict[str, Any]:
    """Validate export parameters."""
    
    # Supported formats
    supported_formats = ["pdf", "html", "markdown", "json", "pptx"]
    if format not in supported_formats:
        return {
            "error": f"Unsupported format: {format}",
            "supported_formats": supported_formats,
            "suggestion": "Choose from supported export formats"
        }
    
    # Supported templates
    supported_templates = ["standard", "executive", "detailed", "dashboard", "minimal"]
    if template not in supported_templates:
        return {
            "error": f"Unsupported template: {template}",
            "supported_templates": supported_templates,
            "suggestion": "Choose from supported templates"
        }
    
    # Validate content structure
    if not content:
        return {
            "error": "Content is required for report generation",
            "suggestion": "Provide analysis results or structured content"
        }
    
    # Validate output path if provided
    if output_path:
        try:
            output_file = Path(output_path)
            if not output_file.parent.exists():
                return {
                    "error": f"Output directory does not exist: {output_file.parent}",
                    "suggestion": "Create directory or use existing path"
                }
        except Exception as e:
            return {
                "error": f"Invalid output path: {str(e)}",
                "suggestion": "Provide valid file path"
            }
    
    return {"status": "valid"}


async def _prepare_report_data(content: Dict[str, Any], template: str) -> Dict[str, Any]:
    """Prepare and structure report data."""
    
    report_data = {
        "title": content.get("title", "Business Intelligence Report"),
        "subtitle": content.get("subtitle", "Data Analysis Results"),
        "generated_at": datetime.now().isoformat(),
        "template": template,
        "sections": [],
        "metadata": {
            "generator": "BI MCP Server",
            "version": "1.0.0"
        }
    }
    
    # Extract and structure content based on type
    if "dataset_name" in content:
        # Analysis result format
        report_data["sections"] = await _structure_analysis_content(content, template)
    elif "sections" in content:
        # Pre-structured content
        report_data["sections"] = content["sections"]
    else:
        # Generic content
        report_data["sections"] = await _structure_generic_content(content, template)
    
    # Add executive summary if template requires it
    if template in ["executive", "detailed"]:
        exec_summary = await _generate_executive_summary(report_data["sections"])
        report_data["sections"].insert(0, exec_summary)
    
    return report_data


async def _structure_analysis_content(content: Dict[str, Any], template: str) -> List[Dict[str, Any]]:
    """Structure analysis results into report sections."""
    
    sections = []
    
    # Overview section
    overview_section = {
        "title": "Analysis Overview",
        "type": "overview",
        "content": {
            "dataset": content.get("dataset_name", "Unknown"),
            "analysis_type": content.get("analysis_type", "General Analysis"),
            "timestamp": content.get("timestamp", datetime.now().isoformat()),
            "status": content.get("status", "completed")
        }
    }
    sections.append(overview_section)
    
    # Data summary section
    if "data_summary" in content:
        data_section = {
            "title": "Data Summary",
            "type": "data_summary",
            "content": content["data_summary"]
        }
        sections.append(data_section)
    
    # Key findings section
    if "key_findings" in content or "insights" in content:
        findings = content.get("key_findings", content.get("insights", []))
        findings_section = {
            "title": "Key Findings",
            "type": "findings",
            "content": findings if isinstance(findings, list) else [findings]
        }
        sections.append(findings_section)
    
    # Results section (analysis-specific)
    if "correlation_results" in content:
        # Correlation analysis
        corr_section = {
            "title": "Correlation Analysis Results",
            "type": "correlation_results",
            "content": content["correlation_results"]
        }
        sections.append(corr_section)
    
    if "visualization" in content:
        # Visualization results
        viz_section = {
            "title": "Data Visualizations",
            "type": "visualization",
            "content": content["visualization"]
        }
        sections.append(viz_section)
    
    if "profile" in content:
        # Data profiling results
        profile_section = {
            "title": "Data Profile",
            "type": "data_profile",
            "content": content["profile"]
        }
        sections.append(profile_section)
    
    # Business insights section
    if "business_insights" in content:
        insights_section = {
            "title": "Business Insights",
            "type": "business_insights",
            "content": content["business_insights"]
        }
        sections.append(insights_section)
    
    # Recommendations section
    if "recommendations" in content:
        rec_section = {
            "title": "Recommendations",
            "type": "recommendations",
            "content": content["recommendations"] if isinstance(content["recommendations"], list) else [content["recommendations"]]
        }
        sections.append(rec_section)
    
    return sections


async def _structure_generic_content(content: Dict[str, Any], template: str) -> List[Dict[str, Any]]:
    """Structure generic content into report sections."""
    
    sections = []
    
    # Create sections from content keys
    for key, value in content.items():
        if key not in ["title", "subtitle", "metadata"]:
            section = {
                "title": key.replace("_", " ").title(),
                "type": "generic",
                "content": value
            }
            sections.append(section)
    
    return sections


async def _generate_executive_summary(sections: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Generate executive summary from report sections."""
    
    summary_points = []
    
    # Extract key points from each section
    for section in sections:
        section_type = section.get("type", "")
        content = section.get("content", {})
        
        if section_type == "findings":
            if isinstance(content, list):
                summary_points.extend(content[:2])  # Top 2 findings
        elif section_type == "business_insights":
            if isinstance(content, dict) and "key_findings" in content:
                key_findings = content["key_findings"]
                if isinstance(key_findings, list):
                    summary_points.extend(key_findings[:2])
        elif section_type == "correlation_results":
            if isinstance(content, dict) and "significant_correlations" in content:
                sig_corr = content["significant_correlations"]
                if sig_corr:
                    summary_points.append(f"Found {len(sig_corr)} significant correlations in the data")
    
    # Limit summary points
    summary_points = summary_points[:5]
    
    if not summary_points:
        summary_points = ["Analysis completed successfully", "Results available in detailed sections"]
    
    return {
        "title": "Executive Summary",
        "type": "executive_summary",
        "content": {
            "summary_points": summary_points,
            "recommendation": "Review detailed sections for complete analysis results"
        }
    }


async def _generate_report(
    report_data: Dict[str, Any],
    format: str,
    template: str,
    output_path: str
) -> Dict[str, Any]:
    """Generate report in specified format."""
    
    if format == "html":
        return await _generate_html_report(report_data, template, output_path)
    elif format == "markdown":
        return await _generate_markdown_report(report_data, template, output_path)
    elif format == "json":
        return await _generate_json_report(report_data, template, output_path)
    elif format == "pdf":
        return await _generate_pdf_report(report_data, template, output_path)
    elif format == "pptx":
        return await _generate_pptx_report(report_data, template, output_path)
    else:
        return {"error": f"Format {format} not implemented"}


async def _generate_html_report(
    report_data: Dict[str, Any],
    template: str,
    output_path: str
) -> Dict[str, Any]:
    """Generate HTML report."""
    
    # HTML template based on style
    if template == "executive":
        css_style = """
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; margin: 40px; background: #f8f9fa; }
            .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
            h2 { color: #34495e; margin-top: 30px; }
            .exec-summary { background: #ecf0f1; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0; }
            .metric { display: inline-block; margin: 10px 20px 10px 0; padding: 10px; background: #3498db; color: white; border-radius: 4px; }
            ul { margin: 10px 0; }
            li { margin: 5px 0; }
        </style>
        """
    else:
        css_style = """
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
            .container { max-width: 800px; }
            h1 { color: #333; border-bottom: 2px solid #007acc; }
            h2 { color: #444; margin-top: 25px; }
            .section { margin: 20px 0; }
            ul { margin: 10px 0; }
            li { margin: 3px 0; }
        </style>
        """
    
    # Build HTML content
    html_content = f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{report_data['title']}</title>
    {css_style}
</head>
<body>
    <div class="container">
        <h1>{report_data['title']}</h1>
        <p><em>{report_data['subtitle']}</em></p>
        <p><strong>Generated:</strong> {datetime.fromisoformat(report_data['generated_at']).strftime('%B %d, %Y at %I:%M %p')}</p>
"""
    
    # Add sections
    for section in report_data['sections']:
        html_content += f'\n        <div class="section">\n'
        html_content += f'            <h2>{section["title"]}</h2>\n'
        
        content = section['content']
        if section['type'] == 'executive_summary':
            html_content += '            <div class="exec-summary">\n'
            if isinstance(content, dict) and 'summary_points' in content:
                html_content += '                <ul>\n'
                for point in content['summary_points']:
                    html_content += f'                    <li>{point}</li>\n'
                html_content += '                </ul>\n'
            html_content += '            </div>\n'
        
        elif section['type'] == 'findings' or section['type'] == 'recommendations':
            if isinstance(content, list):
                html_content += '            <ul>\n'
                for item in content:
                    html_content += f'                <li>{item}</li>\n'
                html_content += '            </ul>\n'
        
        elif section['type'] == 'data_summary':
            if isinstance(content, dict):
                for key, value in content.items():
                    html_content += f'            <div class="metric"><strong>{key.replace("_", " ").title()}:</strong> {value}</div>\n'
        
        else:
            # Generic content rendering
            if isinstance(content, dict):
                html_content += '            <ul>\n'
                for key, value in content.items():
                    if isinstance(value, (list, dict)):
                        continue  # Skip complex nested structures
                    html_content += f'                <li><strong>{key.replace("_", " ").title()}:</strong> {value}</li>\n'
                html_content += '            </ul>\n'
            elif isinstance(content, list):
                html_content += '            <ul>\n'
                for item in content:
                    html_content += f'                <li>{item}</li>\n'
                html_content += '            </ul>\n'
            else:
                html_content += f'            <p>{content}</p>\n'
        
        html_content += '        </div>\n'
    
    html_content += """
    </div>
</body>
</html>"""
    
    # Save file
    if output_path:
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        return {
            "format": "html",
            "output_path": str(output_file),
            "file_size": len(html_content.encode('utf-8')),
            "preview_url": f"file://{output_file.absolute()}"
        }
    else:
        # Return content for preview
        return {
            "format": "html",
            "content": html_content,
            "file_size": len(html_content.encode('utf-8'))
        }


async def _generate_markdown_report(
    report_data: Dict[str, Any],
    template: str,
    output_path: str
) -> Dict[str, Any]:
    """Generate Markdown report."""
    
    # Build markdown content
    md_content = f"""# {report_data['title']}

*{report_data['subtitle']}*

**Generated:** {datetime.fromisoformat(report_data['generated_at']).strftime('%B %d, %Y at %I:%M %p')}

---

"""
    
    # Add sections
    for section in report_data['sections']:
        md_content += f"\n## {section['title']}\n\n"
        
        content = section['content']
        if section['type'] == 'executive_summary':
            if isinstance(content, dict) and 'summary_points' in content:
                for point in content['summary_points']:
                    md_content += f"- {point}\n"
                md_content += "\n"
        
        elif section['type'] == 'findings' or section['type'] == 'recommendations':
            if isinstance(content, list):
                for item in content:
                    md_content += f"- {item}\n"
                md_content += "\n"
        
        elif section['type'] == 'data_summary':
            if isinstance(content, dict):
                for key, value in content.items():
                    md_content += f"**{key.replace('_', ' ').title()}:** {value}  \n"
                md_content += "\n"
        
        else:
            # Generic content rendering
            if isinstance(content, dict):
                for key, value in content.items():
                    if isinstance(value, (list, dict)):
                        continue  # Skip complex nested structures
                    md_content += f"**{key.replace('_', ' ').title()}:** {value}  \n"
                md_content += "\n"
            elif isinstance(content, list):
                for item in content:
                    md_content += f"- {item}\n"
                md_content += "\n"
            else:
                md_content += f"{content}\n\n"
    
    # Add footer
    md_content += f"\n---\n*Report generated by BI MCP Server*"
    
    # Save file
    if output_path:
        output_file = Path(output_path)
        if not output_file.suffix:
            output_file = output_file.with_suffix('.md')
        
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(md_content)
        
        return {
            "format": "markdown",
            "output_path": str(output_file),
            "file_size": len(md_content.encode('utf-8'))
        }
    else:
        return {
            "format": "markdown",
            "content": md_content,
            "file_size": len(md_content.encode('utf-8'))
        }


async def _generate_json_report(
    report_data: Dict[str, Any],
    template: str,
    output_path: str
) -> Dict[str, Any]:
    """Generate JSON report."""
    
    # Clean and structure data for JSON
    json_data = {
        "report_metadata": {
            "title": report_data['title'],
            "subtitle": report_data['subtitle'],
            "generated_at": report_data['generated_at'],
            "template": template,
            "generator": "BI MCP Server"
        },
        "sections": report_data['sections']
    }
    
    # Serialize to JSON
    json_content = json.dumps(json_data, indent=2, ensure_ascii=False, default=str)
    
    # Save file
    if output_path:
        output_file = Path(output_path)
        if not output_file.suffix:
            output_file = output_file.with_suffix('.json')
        
        output_file.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(json_content)
        
        return {
            "format": "json",
            "output_path": str(output_file),
            "file_size": len(json_content.encode('utf-8'))
        }
    else:
        return {
            "format": "json",
            "content": json_content,
            "file_size": len(json_content.encode('utf-8'))
        }


async def _generate_pdf_report(
    report_data: Dict[str, Any],
    template: str,
    output_path: str
) -> Dict[str, Any]:
    """Generate PDF report (simplified implementation)."""
    
    # For a full implementation, you would use libraries like reportlab, weasyprint, or pdfkit
    # Here we'll generate HTML first and suggest PDF conversion
    
    html_result = await _generate_html_report(report_data, template, "")
    html_content = html_result.get("content", "")
    
    if output_path:
        # In a real implementation, convert HTML to PDF
        output_file = Path(output_path)
        if not output_file.suffix:
            output_file = output_file.with_suffix('.pdf')
        
        # Simulate PDF generation (in reality, you'd use a PDF library)
        pdf_placeholder = f"""PDF Report Placeholder
        
Title: {report_data['title']}
Generated: {report_data['generated_at']}

To generate actual PDF, install a PDF library like:
- reportlab: pip install reportlab
- weasyprint: pip install weasyprint  
- pdfkit: pip install pdfkit

HTML content is ready for conversion."""
        
        output_file.parent.mkdir(parents=True, exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(pdf_placeholder)
        
        return {
            "format": "pdf",
            "output_path": str(output_file),
            "file_size": len(pdf_placeholder.encode('utf-8')),
            "note": "PDF generation requires additional libraries - HTML version generated",
            "html_content": html_content
        }
    else:
        return {
            "format": "pdf",
            "note": "PDF generation requires additional libraries",
            "suggestion": "Use HTML format or install PDF conversion library",
            "html_alternative": html_content
        }


async def _generate_pptx_report(
    report_data: Dict[str, Any],
    template: str,
    output_path: str
) -> Dict[str, Any]:
    """Generate PowerPoint report (simplified implementation)."""
    
    # For full implementation, use python-pptx library
    
    if output_path:
        output_file = Path(output_path)
        if not output_file.suffix:
            output_file = output_file.with_suffix('.pptx')
        
        # Generate slide outline as text file
        slide_content = f"""PowerPoint Slide Outline
        
Slide 1: Title Slide
- {report_data['title']}
- {report_data['subtitle']}
- Generated: {datetime.fromisoformat(report_data['generated_at']).strftime('%B %d, %Y')}

"""
        
        slide_num = 2
        for section in report_data['sections']:
            slide_content += f"""Slide {slide_num}: {section['title']}
"""
            content = section['content']
            if isinstance(content, list):
                for item in content[:5]:  # Limit bullets per slide
                    slide_content += f"- {item}\n"
            elif isinstance(content, dict):
                for key, value in list(content.items())[:5]:
                    if not isinstance(value, (list, dict)):
                        slide_content += f"- {key.replace('_', ' ').title()}: {value}\n"
            else:
                slide_content += f"- {content}\n"
            
            slide_content += "\n"
            slide_num += 1
        
        slide_content += """
To generate actual PowerPoint file, install python-pptx:
pip install python-pptx
"""
        
        output_file.parent.mkdir(parents=True, exist_ok=True)
        output_file = output_file.with_suffix('.txt')  # Save as text outline
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(slide_content)
        
        return {
            "format": "pptx",
            "output_path": str(output_file),
            "file_size": len(slide_content.encode('utf-8')),
            "note": "PowerPoint generation requires python-pptx library - slide outline generated",
            "slides_count": slide_num - 1
        }
    else:
        return {
            "format": "pptx",
            "note": "PowerPoint generation requires python-pptx library",
            "suggestion": "Install python-pptx library for full PPTX support"
        }


async def _generate_export_recommendations(
    report_data: Dict[str, Any],
    format: str
) -> List[str]:
    """Generate recommendations for report export and usage."""
    
    recommendations = []
    
    # Format-specific recommendations
    if format == "html":
        recommendations.append("📧 HTML format is ideal for email sharing and web viewing")
        recommendations.append("🌐 Host on internal server for team access")
    
    elif format == "pdf":
        recommendations.append("📄 PDF format is best for formal document sharing")
        recommendations.append("🖨️ Suitable for printing and archival purposes")
    
    elif format == "markdown":
        recommendations.append("📝 Markdown is perfect for documentation systems")
        recommendations.append("🔄 Easy to version control and collaborate on")
    
    elif format == "pptx":
        recommendations.append("📊 PowerPoint format ideal for presentations")
        recommendations.append("👥 Suitable for stakeholder and board meetings")
    
    elif format == "json":
        recommendations.append("🔄 JSON format enables programmatic processing")
        recommendations.append("🔗 Can be integrated into other systems and dashboards")
    
    # Content-based recommendations
    sections_count = len(report_data.get("sections", []))
    
    if sections_count > 10:
        recommendations.append("📋 Large report detected - consider creating executive summary version")
    
    # Check for specific content types
    has_visualizations = any(
        section.get("type") == "visualization" 
        for section in report_data.get("sections", [])
    )
    
    if has_visualizations:
        recommendations.append("📊 Visualizations included - ensure proper display in chosen format")
    
    has_data_tables = any(
        "correlation_results" in str(section.get("content", ""))
        for section in report_data.get("sections", [])
    )
    
    if has_data_tables:
        recommendations.append("📈 Data tables present - HTML format recommended for best display")
    
    # Distribution recommendations
    recommendations.append("🔄 Schedule regular report generation for ongoing insights")
    recommendations.append("📤 Share with relevant stakeholders based on content")
    
    return recommendations[:6]  # Limit to most relevant recommendations
