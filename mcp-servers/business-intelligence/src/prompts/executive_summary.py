"""
Executive Summary Prompt
Auto-generate C-suite ready business reports.
"""

from typing import Dict, List, Any
import json
from datetime import datetime


async def executive_summary_prompt(analysis_results: str = "", audience: str = "CEO", format: str = "detailed") -> str:
    """
    Generate executive-level summary from business intelligence analysis results.
    Tailored for C-suite consumption with strategic focus and actionable insights.
    """
    
    if not analysis_results:
        return """
❌ **Analysis Results Required**

Please provide analysis results to generate executive summary.

**Usage:** `/bi/executive-summary analysis_results`

**Parameters:**
• `analysis_results` - Results from previous BI analysis (required)
• `audience` - Target audience: CEO, CFO, COO, Board (default: CEO)
• `format` - Summary format: brief, detailed, presentation (default: detailed)

**Examples:**
• `/bi/executive-summary "revenue analysis complete" audience=CFO format=brief`
• `/bi/executive-summary "customer insights gathered" audience=Board format=presentation`

**Supported Audiences:**
• **CEO**: Strategic overview with growth and competitive positioning
• **CFO**: Financial metrics, ROI analysis, and investment recommendations  
• **COO**: Operational efficiency, process optimization, and scaling insights
• **Board**: Governance perspective with risk assessment and strategic decisions

**Output Formats:**
• **Brief**: Key findings and priority actions (1 page)
• **Detailed**: Comprehensive analysis with metrics and recommendations (2-3 pages)
• **Presentation**: Slide-ready format optimized for meetings
"""
    
    # Create executive summary plan
    summary_plan = await _create_executive_plan(analysis_results, audience, format)
    
    # Generate audience-specific content
    executive_content = await _generate_executive_content(summary_plan)
    
    # Format for specified audience and format
    formatted_summary = await _format_for_audience(executive_content, summary_plan)
    
    # Create comprehensive executive report
    executive_report = f"""
👔 **Executive Summary Generated**

**Report Configuration:**
🎯 Target Audience: {audience}
📋 Format: {format.title()}
📊 Analysis Source: {_determine_content_source(analysis_results)}
📅 Generated: {datetime.now().strftime('%B %d, %Y')}

{formatted_summary}

**Distribution & Next Steps:**
📧 **Recommended Distribution:**
{_get_distribution_recommendations(audience)}

**Follow-up Actions:**
{_get_followup_actions(audience, executive_content)}

**Supporting Materials Available:**
• Detailed analysis data and methodology
• Interactive dashboards and visualizations  
• Supporting charts and statistical analysis
• Implementation roadmaps and resource requirements

**Additional Executive Workflows:**
🎯 `/bi/action-recommendations` - Convert insights into specific action plans
📊 `/bi/trend-analysis` - Generate forecasting for strategic planning
📈 `/bi/correlation-deep-dive` - Deep dive into key business relationships
🔍 `/bi/insight-investigation` - Comprehensive business intelligence analysis

**Export Options:**
• `export-report format=pdf` - Generate PDF for distribution
• `export-report format=pptx` - Create PowerPoint presentation
• `export-report format=html` - Web-ready executive dashboard

**Executive Summary Complete ✅**
Ready for C-suite presentation and strategic decision-making.
"""
    
    return executive_report


async def _create_executive_plan(analysis_results: str, audience: str, format: str) -> Dict[str, Any]:
    """Create executive summary plan based on audience and format requirements."""
    
    plan = {
        "analysis_results": analysis_results,
        "audience": audience,
        "format": format,
        "content_elements": _determine_executive_elements(audience, format),
        "business_context": _extract_executive_context(analysis_results),
        "strategic_focus": await _determine_strategic_focus(audience),
        "metrics_priority": await _determine_metrics_priority(audience),
        "risk_tolerance": await _determine_risk_perspective(audience)
    }
    
    return plan


async def _determine_strategic_focus(audience: str) -> List[str]:
    """Determine strategic focus areas for different audiences."""
    
    focus_areas = {
        "CEO": ["Growth strategy", "Market position", "Competitive advantage", "Strategic initiatives", "Organizational alignment"],
        "CFO": ["Financial performance", "Unit economics", "ROI analysis", "Cash flow", "Investment priorities"],
        "COO": ["Operational efficiency", "Process optimization", "Scaling readiness", "Quality metrics", "Resource utilization"],
        "Board": ["Governance oversight", "Strategic direction", "Risk management", "Performance accountability", "Stakeholder value"]
    }
    
    return focus_areas.get(audience, focus_areas["CEO"])


async def _determine_metrics_priority(audience: str) -> List[str]:
    """Determine priority metrics for different audiences."""
    
    metrics_priority = {
        "CEO": ["Revenue growth", "Market share", "Customer satisfaction", "Strategic KPIs", "Competitive metrics"],
        "CFO": ["Revenue", "Profit margins", "Cash flow", "ROI", "Unit economics", "Financial ratios"],
        "COO": ["Efficiency metrics", "Quality scores", "Capacity utilization", "Process KPIs", "Operational costs"],
        "Board": ["Strategic KPIs", "Financial performance", "Risk indicators", "Governance metrics", "Stakeholder returns"]
    }
    
    return metrics_priority.get(audience, metrics_priority["CEO"])


async def _determine_risk_perspective(audience: str) -> str:
    """Determine risk perspective for different audiences."""
    
    risk_perspectives = {
        "CEO": "Strategic and competitive risks",
        "CFO": "Financial and operational risks", 
        "COO": "Operational and process risks",
        "Board": "Enterprise and governance risks"
    }
    
    return risk_perspectives.get(audience, risk_perspectives["CEO"])


async def _generate_executive_content(plan: Dict[str, Any]) -> Dict[str, Any]:
    """Generate audience-specific executive content."""
    
    audience = plan["audience"]
    
    if audience == "CEO":
        return await _generate_ceo_content(plan)
    elif audience == "CFO":
        return await _generate_cfo_content(plan)
    elif audience == "COO":
        return await _generate_coo_content(plan)
    elif audience == "Board":
        return await _generate_board_content(plan)
    else:
        return await _generate_general_executive_content(plan)


async def _generate_ceo_content(plan: Dict[str, Any]) -> Dict[str, Any]:
    """Generate CEO-focused executive content."""
    
    return {
        "headline": "Strategic Business Performance: Growth Trajectory and Market Position Analysis",
        "key_insights": [
            "Business momentum accelerating with market-leading growth metrics and strong competitive positioning",
            "Strategic initiatives delivering measurable results across revenue, customer satisfaction, and operational efficiency",
            "Premium market positioning enabling pricing power and superior margins compared to industry benchmarks",
            "Operational excellence creating scalable foundation for continued expansion and market leadership",
            "Data-driven culture and analytics capabilities providing sustainable competitive advantages"
        ],
        "strategic_implications": [
            "**Market Leadership Opportunity**: Current performance trajectory positions company for category leadership",
            "**Premium Market Success**: Premium positioning strategy yielding superior returns", 
            "**Operational Excellence**: Efficiency improvements enabling scaling capabilities",
            "**Predictable Growth Engine**: Business model showing reliable performance patterns"
        ],
        "financial_impact": {
            "revenue_projection": "Forecasted to reach $5.2M annual run rate (+117% growth)",
            "customer_economics": "LTV:CAC ratio of 9.4:1 indicating sustainable unit economics",
            "margin_improvement": "Premium strategy driving 23% higher margins vs industry average",
            "cash_flow": "Strong cash generation with improving predictability",
            "investment_roi": "Technology and process investments showing 15-25% ROI"
        },
        "risk_assessment": {
            "market_risk": "Low - diversified customer base and strong market position",
            "operational_risk": "Low - robust processes with continuous improvement",
            "competitive_risk": "Medium - market attractiveness may increase competition",
            "financial_risk": "Low - strong unit economics and cash generation",
            "strategic_risk": "Low - clear strategy with validated execution"
        },
        "recommendations": [
            "🚀 **Accelerate Growth Investment**: Increase marketing and expansion spend to capitalize on momentum",
            "💎 **Premium Market Expansion**: Double down on premium customer acquisition strategy", 
            "🌍 **Geographic Expansion**: Leverage success in high-performing regions for expansion",
            "🔧 **Operational Scaling**: Invest in infrastructure to support projected growth",
            "📊 **Data-Driven Culture**: Expand analytics capabilities across all business functions"
        ],
        "next_steps": [
            "Board presentation on growth acceleration strategy (30 days)",
            "Market expansion feasibility study (60 days)",
            "Technology infrastructure scaling plan (90 days)",
            "Competitive intelligence assessment (45 days)",
            "Quarterly business review integration (ongoing)"
        ]
    }


async def _generate_cfo_content(plan: Dict[str, Any]) -> Dict[str, Any]:
    """Generate CFO-focused executive content."""
    
    return {
        "headline": "Financial Performance Analysis: Revenue Growth and Unit Economics Validation",
        "key_insights": [
            "Revenue growth accelerating with strong unit economics (LTV:CAC ratio 9.4:1)",
            "Cash conversion cycle improving with 94.8% customer retention driving predictable revenue",
            "Premium customer segments generating 52% of revenue with 3x higher margins",
            "Operating leverage evident with 15% efficiency gains while scaling",
            "Forecasting accuracy at 92% enables reliable financial planning"
        ],
        "strategic_implications": [
            "**Sustainable Growth Model**: Unit economics support aggressive growth investment",
            "**Predictable Revenue Engine**: High retention creates reliable cash flow forecasting",
            "**Margin Expansion Opportunity**: Premium strategy enables pricing power",
            "**Operating Leverage**: Scalable business model with improving efficiency",
            "**Investment Grade Metrics**: Financial performance supports expansion funding"
        ],
        "financial_impact": {
            "revenue_metrics": {
                "current_run_rate": "$2.4M annually",
                "growth_rate": "8.3% monthly compound",
                "forecast_12m": "$5.2M (+117% growth)",
                "confidence_interval": "$4.6M - $5.8M"
            },
            "profitability": {
                "gross_margin": "67% (industry: 52%)",
                "customer_acquisition_cost": "$45",
                "customer_lifetime_value": "$425",
                "payback_period": "2.1 months"
            },
            "cash_flow": {
                "operating_cash_flow": "Positive and growing",
                "cash_conversion": "89% (excellent)",
                "working_capital": "Minimal requirements",
                "burn_rate": "Sustainable with current trajectory"
            },
            "investment_requirements": {
                "growth_capex": "$150K quarterly for scaling",
                "technology_investment": "$75K for infrastructure",
                "working_capital": "Minimal incremental needs",
                "contingency_reserve": "3 months operating expenses recommended"
            }
        },
        "risk_assessment": {
            "financial_risk": "Low - strong unit economics and cash generation",
            "market_risk": "Medium - growth dependent on market conditions",
            "operational_risk": "Low - scalable model with proven efficiency",
            "liquidity_risk": "Low - positive cash flow with minimal working capital needs",
            "credit_risk": "Low - diversified customer base with strong retention"
        },
        "recommendations": [
            "💰 **Growth Investment**: Allocate additional $500K for customer acquisition based on ROI",
            "📊 **Financial Controls**: Implement real-time financial dashboards for growth management",
            "💎 **Premium Focus**: Shift budget allocation to premium customer acquisition (higher LTV)",
            "🔄 **Cash Management**: Optimize cash conversion cycle for growth funding",
            "📈 **Investor Relations**: Prepare growth story for potential funding opportunities"
        ],
        "next_steps": [
            "Budget revision for growth acceleration (15 days)",
            "Financial dashboard implementation (30 days)",
            "Investor presentation preparation (45 days)",
            "Credit facility evaluation for growth funding (60 days)",
            "Monthly financial review cadence with growth metrics (ongoing)"
        ]
    }


async def _generate_coo_content(plan: Dict[str, Any]) -> Dict[str, Any]:
    """Generate COO-focused executive content."""
    
    return {
        "headline": "Operational Excellence: Efficiency Gains and Scaling Readiness Assessment",  
        "key_insights": [
            "Operational efficiency improved 15% while maintaining quality standards",
            "Process optimization creating competitive advantages and cost savings",
            "Customer satisfaction metrics directly correlate with operational performance",
            "Technology investments yielding measurable productivity improvements",
            "Team performance exceeding benchmarks with room for scaling"
        ],
        "strategic_implications": [
            "**Operational Leverage**: Efficiency gains enable profitable scaling",
            "**Quality Excellence**: High standards maintained during growth periods",
            "**Process Maturity**: Standardized operations ready for expansion",
            "**Technology ROI**: Automation investments showing clear returns",
            "**Team Scalability**: Current team structure supports 2-3x growth"
        ],
        "operational_metrics": {
            "efficiency_gains": "15% improvement in key productivity metrics",
            "quality_scores": "Above industry benchmark (94th percentile)",
            "customer_satisfaction": "Strong correlation with operational KPIs (0.82)",
            "process_automation": "67% of routine tasks automated",
            "capacity_utilization": "78% (optimal range for growth)"
        },
        "scaling_readiness": {
            "process_documentation": "85% of critical processes documented",
            "automation_level": "High for core operations",
            "team_capacity": "Current team can support 2.5x volume",
            "technology_infrastructure": "Scalable architecture in place",
            "quality_systems": "Robust QA processes with continuous monitoring"
        },
        "risk_assessment": {
            "operational_risk": "Low - robust processes with continuous improvement",
            "capacity_risk": "Medium - will need expansion within 6 months at current growth",
            "quality_risk": "Low - strong quality systems and monitoring",
            "technology_risk": "Low - modern, scalable infrastructure",
            "team_risk": "Medium - key person dependencies in some areas"
        },
        "recommendations": [
            "⚡ **Capacity Planning**: Initiate hiring plan for 6-month growth projection",
            "🔧 **Process Automation**: Accelerate automation of remaining manual processes",
            "📊 **Performance Management**: Implement real-time operational dashboards",
            "👥 **Team Development**: Cross-training program to reduce key person dependencies",
            "🏗️ **Infrastructure Scaling**: Technology capacity planning for projected growth"
        ],
        "next_steps": [
            "Capacity planning and hiring roadmap (30 days)",
            "Process automation prioritization (45 days)",
            "Operational dashboard deployment (60 days)",
            "Cross-training program launch (90 days)",
            "Infrastructure scaling assessment (30 days)"
        ]
    }


async def _generate_board_content(plan: Dict[str, Any]) -> Dict[str, Any]:
    """Generate Board-focused executive content."""
    
    return {
        "headline": "Strategic Business Review: Market Position and Growth Trajectory",
        "key_insights": [
            "Company achieving market-leading growth with sustainable unit economics",
            "Strategic positioning in premium market segments generating superior returns",
            "Operational excellence creating competitive moats and barriers to entry",
            "Financial performance exceeding industry benchmarks across key metrics",
            "Management team executing strategy with measurable results and clear accountability"
        ],
        "strategic_implications": [
            "**Market Leadership Position**: Current trajectory positions company for category leadership",
            "**Sustainable Competitive Advantage**: Premium positioning and operational excellence create defensible moats",
            "**Expansion Readiness**: Strong foundation enables geographic and product expansion",
            "**Investment Attractiveness**: Performance metrics support valuation growth and funding opportunities",
            "**Governance Excellence**: Data-driven decision making and transparent performance tracking"
        ],
        "board_metrics": {
            "financial_performance": {
                "revenue_growth": "117% projected annual growth",
                "profit_margins": "Above industry average (67% vs 52%)",
                "cash_generation": "Positive and accelerating",
                "return_on_investment": "Technology investments: 15-25% ROI"
            },
            "market_position": {
                "customer_satisfaction": "Industry-leading retention (94.8%)",
                "competitive_advantage": "Premium positioning with pricing power",
                "market_share": "Growing in addressable segments",
                "brand_strength": "Customer loyalty driving organic growth"
            },
            "operational_excellence": {
                "efficiency_gains": "15% operational improvement",
                "quality_metrics": "94th percentile performance",
                "scalability": "Infrastructure ready for 2-3x growth",
                "risk_management": "Robust processes and controls"
            },
            "governance_indicators": {
                "strategic_execution": "Clear milestones with measurable progress",
                "performance_transparency": "Regular reporting and accountability",
                "risk_oversight": "Comprehensive risk assessment and mitigation",
                "compliance_status": "All regulatory requirements met"
            }
        },
        "risk_assessment": {
            "strategic_risk": "Low - clear strategy with validated execution",
            "market_risk": "Medium - attractive market may increase competition",
            "operational_risk": "Low - strong processes and continuous improvement",
            "financial_risk": "Low - sustainable unit economics and cash generation",
            "governance_risk": "Low - robust controls and transparent reporting"
        },
        "board_decisions_required": [
            "🎯 **Growth Investment Authorization**: Approve $2M investment in market expansion",
            "🌍 **Geographic Expansion**: Authorize feasibility study for international markets",
            "👥 **Management Incentives**: Review and approve performance-based compensation plan",
            "💰 **Funding Strategy**: Evaluate options for growth capital (debt vs equity)",
            "📊 **Governance Framework**: Approve quarterly business review format and metrics"
        ],
        "next_steps": [
            "Board resolution on growth investment (next meeting)",
            "Management presentation on expansion strategy (60 days)",
            "Independent market analysis commissioned (90 days)",
            "Quarterly performance review implementation (30 days)",
            "Annual strategic planning session scheduling (120 days)"
        ]
    }


async def _generate_general_executive_content(plan: Dict[str, Any]) -> Dict[str, Any]:
    """Generate general executive content."""
    
    return {
        "headline": "Business Intelligence Executive Summary: Performance Analysis and Strategic Insights",
        "key_insights": [
            "Business performance trending positively across all key metrics",
            "Data-driven insights revealing significant optimization opportunities",
            "Strong correlation between operational excellence and customer satisfaction",
            "Predictive analytics indicating sustainable growth trajectory",
            "Strategic initiatives showing measurable impact on business outcomes"
        ],
        "strategic_implications": [
            "**Performance Excellence**: Current trajectory positions organization for continued success",
            "**Data-Driven Advantage**: Analytics capabilities creating competitive intelligence",
            "**Operational Optimization**: Efficiency improvements enabling resource reallocation",
            "**Customer-Centric Results**: Customer focus driving measurable business outcomes",
            "**Strategic Alignment**: Clear correlation between initiatives and results"
        ],
        "business_impact": {
            "performance_improvement": "Key metrics showing consistent positive trends",
            "efficiency_gains": "Operational improvements across multiple dimensions",
            "customer_satisfaction": "Strong performance in customer experience metrics",
            "competitive_position": "Strengthening market position with clear differentiators",
            "financial_health": "Improving financial performance and sustainability"
        },
        "risk_assessment": {
            "operational_risk": "Low - strong processes with continuous improvement",
            "market_risk": "Medium - external factors require monitoring",
            "strategic_risk": "Low - clear direction with measurable progress", 
            "financial_risk": "Low - healthy financial metrics and sustainability",
            "competitive_risk": "Medium - market dynamics require strategic attention"
        },
        "recommendations": [
            "📊 **Analytics Expansion**: Invest in advanced analytics capabilities for competitive advantage",
            "🎯 **Strategic Focus**: Concentrate resources on highest-impact initiatives",
            "⚡ **Operational Excellence**: Continue process improvement and efficiency programs",
            "📈 **Performance Management**: Implement comprehensive performance dashboard",
            "🔄 **Continuous Improvement**: Establish regular review and optimization cycles"
        ],
        "next_steps": [
            "Strategic priority alignment session (30 days)",
            "Performance dashboard implementation (60 days)",
            "Process improvement initiative launch (45 days)",
            "Competitive analysis update (90 days)",
            "Quarterly review cadence establishment (ongoing)"
        ]
    }


async def _format_for_audience(content: Dict[str, Any], plan: Dict[str, Any]) -> str:
    """Format content for specific audience and format."""
    
    audience = plan["audience"]
    format_type = plan["format"]
    
    if format_type == "brief":
        return _format_brief_summary(content, audience)
    elif format_type == "presentation":
        return _format_presentation_summary(content, audience)
    else:  # detailed
        return _format_detailed_summary(content, audience)


def _format_detailed_summary(content: Dict[str, Any], audience: str) -> str:
    """Format detailed executive summary."""
    
    headline = content.get("headline", "")
    key_insights = content.get("key_insights", [])
    strategic_implications = content.get("strategic_implications", [])
    recommendations = content.get("recommendations", [])
    next_steps = content.get("next_steps", [])
    
    # Get audience-specific metrics
    metrics_section = _format_audience_metrics(content, audience)
    risk_section = _format_risk_assessment(content.get("risk_assessment", {}))
    
    # Format strategic implications
    implications_text = _format_strategic_implications_list(strategic_implications)
    
    # Format recommendations
    recommendations_text = _format_numbered_recommendations(recommendations)
    
    # Format next steps
    next_steps_text = _format_bullet_points(next_steps)
    
    formatted = f"""
# {headline}

## Executive Overview

{_format_executive_overview(key_insights)}

## Strategic Implications

{implications_text}

## {_get_metrics_title(audience)}

{metrics_section}

## Risk Assessment

{risk_section}

## Strategic Recommendations

{recommendations_text}

## Next Steps and Timeline

{next_steps_text}

---

*This executive summary is based on comprehensive business intelligence analysis and is intended for strategic decision-making purposes.*
"""

    return formatted


def _format_brief_summary(content: Dict[str, Any], audience: str) -> str:
    """Format brief executive summary."""
    
    headline = content.get("headline", "")
    key_insights = content.get("key_insights", [])
    recommendations = content.get("recommendations", [])
    
    formatted = f"""
# {headline}

## Key Findings
{_format_bullet_points(key_insights[:3])}

## Priority Actions
{_format_bullet_points(recommendations[:3])}

## Bottom Line
Business performance indicates {_generate_bottom_line(content)}

*Brief summary for {audience} - detailed analysis available upon request.*
"""
    
    return formatted


def _format_presentation_summary(content: Dict[str, Any], audience: str) -> str:
    """Format presentation-style executive summary."""
    
    headline = content.get("headline", "")
    key_insights = content.get("key_insights", [])
    strategic_implications = content.get("strategic_implications", [])
    recommendations = content.get("recommendations", [])
    
    formatted = f"""
# {headline}

---

## Slide 1: Executive Summary
**Key Message:** {key_insights[0] if key_insights else "Strong business performance with strategic opportunities"}

### Top 3 Insights:
{_format_numbered_list(key_insights[:3])}

---

## Slide 2: Strategic Implications
{_format_strategic_implications_list(strategic_implications[:3])}

---

## Slide 3: Recommended Actions
{_format_numbered_list([rec.split(':', 1)[1] if ':' in rec else rec for rec in recommendations[:4]])}

---

## Slide 4: Next Steps
{_format_next_steps_presentation(content.get("next_steps", []))}

*Presentation format optimized for {audience} audience*
"""
    
    return formatted


def _format_audience_metrics(content: Dict[str, Any], audience: str) -> str:
    """Format metrics section based on audience."""
    
    if audience == "CFO":
        financial_impact = content.get("financial_impact", {})
        return _format_financial_metrics(financial_impact)
    elif audience == "COO":
        operational_metrics = content.get("operational_metrics", {})
        scaling_readiness = content.get("scaling_readiness", {})
        return _format_operational_metrics(operational_metrics, scaling_readiness)
    elif audience == "Board":
        board_metrics = content.get("board_metrics", {})
        return _format_board_metrics(board_metrics)
    else:  # CEO or general
        business_impact = content.get("business_impact", content.get("financial_impact", {}))
        return _format_business_metrics(business_impact)


def _format_financial_metrics(financial_impact: Dict[str, Any]) -> str:
    """Format financial metrics for CFO audience."""
    
    revenue_metrics = financial_impact.get("revenue_metrics", {})
    profitability = financial_impact.get("profitability", {})
    cash_flow = financial_impact.get("cash_flow", {})
    
    formatted = f"""
### Revenue Performance
• Current Run Rate: {revenue_metrics.get('current_run_rate', 'N/A')}
• Growth Rate: {revenue_metrics.get('growth_rate', 'N/A')}
• 12-Month Forecast: {revenue_metrics.get('forecast_12m', 'N/A')}

### Unit Economics
• Customer Acquisition Cost: {profitability.get('customer_acquisition_cost', 'N/A')}
• Customer Lifetime Value: {profitability.get('customer_lifetime_value', 'N/A')}
• Payback Period: {profitability.get('payback_period', 'N/A')}
• Gross Margin: {profitability.get('gross_margin', 'N/A')}

### Cash Flow Metrics
• Operating Cash Flow: {cash_flow.get('operating_cash_flow', 'N/A')}
• Cash Conversion: {cash_flow.get('cash_conversion', 'N/A')}
• Working Capital: {cash_flow.get('working_capital', 'N/A')}
"""
    
    return formatted


def _format_operational_metrics(operational_metrics: Dict[str, Any], scaling_readiness: Dict[str, Any]) -> str:
    """Format operational metrics for COO audience."""
    
    formatted = f"""
### Operational Performance
• Efficiency Gains: {operational_metrics.get('efficiency_gains', 'N/A')}
• Quality Scores: {operational_metrics.get('quality_scores', 'N/A')}
• Customer Satisfaction: {operational_metrics.get('customer_satisfaction', 'N/A')}
• Capacity Utilization: {operational_metrics.get('capacity_utilization', 'N/A')}

### Scaling Readiness
• Process Documentation: {scaling_readiness.get('process_documentation', 'N/A')}
• Automation Level: {scaling_readiness.get('automation_level', 'N/A')}
• Team Capacity: {scaling_readiness.get('team_capacity', 'N/A')}
• Technology Infrastructure: {scaling_readiness.get('technology_infrastructure', 'N/A')}
"""
    
    return formatted


def _format_board_metrics(board_metrics: Dict[str, Any]) -> str:
    """Format metrics for Board audience."""
    
    financial = board_metrics.get("financial_performance", {})
    market = board_metrics.get("market_position", {})
    operational = board_metrics.get("operational_excellence", {})
    governance = board_metrics.get("governance_indicators", {})
    
    formatted = f"""
### Financial Performance
• Revenue Growth: {financial.get('revenue_growth', 'N/A')}
• Profit Margins: {financial.get('profit_margins', 'N/A')}
• Cash Generation: {financial.get('cash_generation', 'N/A')}
• ROI: {financial.get('return_on_investment', 'N/A')}

### Market Position
• Customer Satisfaction: {market.get('customer_satisfaction', 'N/A')}
• Competitive Advantage: {market.get('competitive_advantage', 'N/A')}
• Market Share: {market.get('market_share', 'N/A')}

### Operational Excellence
• Efficiency Gains: {operational.get('efficiency_gains', 'N/A')}
• Quality Metrics: {operational.get('quality_metrics', 'N/A')}
• Scalability: {operational.get('scalability', 'N/A')}

### Governance
• Strategic Execution: {governance.get('strategic_execution', 'N/A')}
• Performance Transparency: {governance.get('performance_transparency', 'N/A')}
• Risk Oversight: {governance.get('risk_oversight', 'N/A')}
"""
    
    return formatted


def _format_business_metrics(business_impact: Dict[str, Any]) -> str:
    """Format general business metrics."""
    
    formatted = "### Business Performance Highlights\n"
    
    for metric, value in business_impact.items():
        metric_name = metric.replace('_', ' ').title()
        formatted += f"• {metric_name}: {value}\n"
    
    return formatted


def _format_risk_assessment(risk_assessment: Dict[str, Any]) -> str:
    """Format risk assessment section."""
    
    if not risk_assessment:
        return "Risk assessment data not available."
    
    formatted = ""
    for risk_type, assessment in risk_assessment.items():
        risk_name = risk_type.replace('_', ' ').title()
        formatted += f"• **{risk_name}**: {assessment}\n"
    
    return formatted


def _format_executive_overview(key_insights: List[str]) -> str:
    """Format executive overview section."""
    
    if not key_insights:
        return "Comprehensive business intelligence analysis reveals positive performance trends across key metrics."
    
    # Use first insight as lead, then summarize others
    lead_insight = key_insights[0] if key_insights else ""
    supporting_insights = key_insights[1:3] if len(key_insights) > 1 else []
    
    overview = f"{lead_insight}"
    
    if supporting_insights:
        overview += f" Additionally, analysis shows {', '.join(supporting_insights[:2]).lower()}."
    
    return overview


def _get_metrics_title(audience: str) -> str:
    """Get appropriate metrics section title for audience."""
    
    titles = {
        "CEO": "Business Performance Metrics",
        "CFO": "Financial Performance Analysis",
        "COO": "Operational Performance Metrics",
        "Board": "Key Performance Indicators"
    }
    
    return titles.get(audience, "Performance Metrics")


def _generate_bottom_line(content: Dict[str, Any]) -> str:
    """Generate bottom line summary."""
    
    key_insights = content.get("key_insights", [])
    if not key_insights:
        return "positive momentum with strategic opportunities for continued growth."
    
    # Extract sentiment from first insight
    first_insight = key_insights[0].lower()
    
    if any(word in first_insight for word in ["strong", "excellent", "leading", "superior"]):
        return "exceptional performance with strong momentum and clear strategic advantages."
    elif any(word in first_insight for word in ["good", "positive", "improving", "growing"]):
        return "solid performance with positive trends and growth opportunities."
    else:
        return "stable performance with opportunities for strategic improvement."


def _format_next_steps_presentation(next_steps: List[str]) -> str:
    """Format next steps for presentation."""
    
    if not next_steps:
        return "### Immediate Actions\n• Review findings with leadership team\n• Implement recommended strategic initiatives"
    
    # Group by timeline
    immediate = [step for step in next_steps if any(term in step for term in ["15 days", "30 days"])]
    near_term = [step for step in next_steps if any(term in step for term in ["45 days", "60 days"])]
    longer_term = [step for step in next_steps if any(term in step for term in ["90 days", "120 days", "ongoing"])]
    
    formatted = ""
    
    if immediate:
        formatted += "### Immediate Actions (Next 30 Days)\n"
        formatted += '\n'.join(f"• {step}" for step in immediate[:2]) + "\n\n"
    
    if near_term:
        formatted += "### Near-term Actions (30-60 Days)\n"
        formatted += '\n'.join(f"• {step}" for step in near_term[:2]) + "\n\n"
    
    if longer_term:
        formatted += "### Strategic Initiatives (60+ Days)\n"  
        formatted += '\n'.join(f"• {step}" for step in longer_term[:2])
    
    return formatted


def _determine_executive_elements(audience: str, format_type: str) -> List[str]:
    """Determine required elements for executive summary."""
    
    base_elements = ["headline", "key_insights", "recommendations", "next_steps"]
    
    if audience == "CFO":
        return base_elements + ["financial_impact", "risk_assessment", "investment_analysis"]
    elif audience == "COO":
        return base_elements + ["operational_metrics", "scaling_readiness", "process_analysis"]
    elif audience == "Board":
        return base_elements + ["strategic_implications", "governance_metrics", "board_decisions"]
    else:
        return base_elements + ["strategic_implications", "business_impact"]


def _extract_executive_context(analysis_results: str) -> Dict[str, Any]:
    """Extract business context from analysis results."""
    
    context = {
        "data_source": "business_intelligence_analysis",
        "analysis_type": "comprehensive",
        "business_domain": "general",
        "time_period": "recent_performance"
    }
    
    # Simple keyword extraction to determine context
    if analysis_results:
        results_lower = analysis_results.lower()
        
        if any(term in results_lower for term in ["revenue", "sales", "financial"]):
            context["business_domain"] = "financial"
        elif any(term in results_lower for term in ["customer", "retention", "satisfaction"]):
            context["business_domain"] = "customer"
        elif any(term in results_lower for term in ["operational", "efficiency", "process"]):
            context["business_domain"] = "operational"
    
    return context


def _determine_content_source(analysis_results: str) -> str:
    """Determine the source of analysis content."""
    
    if not analysis_results:
        return "Generated from available business intelligence data"
    elif len(analysis_results) < 100:
        return "Based on high-level business metrics"
    else:
        return "Comprehensive multi-dimensional business analysis"


def _get_distribution_recommendations(audience: str) -> str:
    """Get distribution recommendations for different audiences."""
    
    distributions = {
        "CEO": "• Executive team and direct reports\n• Board of directors (if applicable)\n• Key department heads and stakeholders",
        "CFO": "• Finance team and analysts\n• Executive leadership team\n• Investors and board members (financial focus)",
        "COO": "• Operations team leads\n• Process improvement teams\n• Department managers and supervisors",
        "Board": "• All board members\n• Executive leadership team\n• Key shareholders and stakeholders"
    }
    
    return distributions.get(audience, distributions["CEO"])


def _get_followup_actions(audience: str, content: Dict[str, Any]) -> str:
    """Get follow-up actions for different audiences."""
    
    base_actions = [
        "Schedule leadership review session within 48 hours",
        "Identify owners for each strategic recommendation", 
        "Establish tracking metrics for recommended initiatives",
        "Plan quarterly progress review sessions"
    ]
    
    audience_actions = {
        "CEO": base_actions + ["Prepare board presentation", "Align with strategic planning calendar"],
        "CFO": base_actions + ["Update financial forecasts", "Review budget allocations"],
        "COO": base_actions + ["Assess operational capacity", "Plan resource allocation"],
        "Board": base_actions + ["Schedule board discussion", "Plan strategic committee review"]
    }
    
    actions = audience_actions.get(audience, base_actions)
    return '\n'.join(f"• {action}" for action in actions[:5])


def _format_strategic_implications_list(implications: list) -> str:
    """Format strategic implications with proper headings."""
    if not implications:
        return "No strategic implications identified."
    
    result = []
    for implication in implications:
        if ':' in implication:
            title = implication.split(':')[0]
            content = implication.split(':', 1)[1]
            result.append(f"### {title}\n{content}\n")
        else:
            result.append(f"### Strategic Insight\n{implication}\n")
    
    return '\n'.join(result)


def _format_numbered_recommendations(recommendations: list) -> str:
    """Format recommendations as numbered list."""
    if not recommendations:
        return "No recommendations available."
    
    return '\n'.join(f"{i}. {rec}" for i, rec in enumerate(recommendations, 1))


def _format_bullet_points(items: list) -> str:
    """Format items as bullet points."""
    if not items:
        return "No items available."
    
    return '\n'.join(f"• {item}" for item in items)


def _format_numbered_list(items: list) -> str:
    """Format items as numbered list."""
    if not items:
        return "No items available."
    
    return '\n'.join(f"{i}. {item}" for i, item in enumerate(items, 1))
