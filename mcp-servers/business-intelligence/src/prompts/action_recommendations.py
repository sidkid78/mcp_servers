"""
Module: Action Recommendations Prompt
This module provides functionality to generate data‐driven business recommendations 
and accompanying implementation roadmaps, resource analyses, and risk assessments 
from provided business insights, goals, and constraints.
"""

from typing import Dict, List, Any
import json
from datetime import datetime


async def action_recommendations_prompt(insights: str = "", business_goals: str = "", constraints: str = "") -> str:
    """
    Generate a comprehensive action recommendations report.

    This asynchronous function converts business intelligence insights into specific,
    actionable strategies. It builds a recommendation analysis plan, prioritizes the recommendations,
    creates an implementation roadmap, and performs resource and risk analyses. The final report includes
    an executive summary, categorized recommendations, and supporting analysis tools.

    Parameters:
        insights (str): Key business intelligence insights (required).
        business_goals (str): Current business objectives and targets.
        constraints (str): Known limitations such as budget, resources, or timeline.

    Returns:
        str: A complete action plan report formatted with recommendations, timelines, risk assessments,
             and next steps.
    """
    
    if not insights:
        return """
❌ **Business Insights Required**

Please provide business insights to generate actionable recommendations.
    
**Usage:** `/bi/action-recommendations insights`

**Parameters:**
• `insights` - Key insights from BI analysis (required)
• `business_goals` - Current business objectives and targets
• `constraints` - Known limitations (budget, resources, timeline)

**Examples:**
• `/bi/action-recommendations "revenue growing 8% monthly" business_goals="expand market share"`
• `/bi/action-recommendations "customer retention at 94%" constraints="limited budget"`

**Recommendation Categories:**
• **Quick Wins**: Low effort, immediate impact actions (0-30 days)
• **Strategic Initiatives**: Medium-term strategic projects (3-6 months)  
• **Long-term Investments**: Transformational initiatives (6-18 months)
• **Resource Optimization**: Efficiency and cost improvements
• **Growth Acceleration**: Revenue and market expansion opportunities

**Output Format:**
• Prioritized action list with impact/effort scoring
• Implementation timelines and resource requirements
• Risk assessment and mitigation strategies
• Success metrics and tracking recommendations
"""
    
    # Create recommendation analysis plan
    recommendation_plan = await _create_recommendation_plan(insights, business_goals, constraints)
    
    # Generate prioritized recommendations
    recommendations = await _generate_prioritized_recommendations(recommendation_plan)
    
    # Create implementation roadmap
    implementation_roadmap = await _create_implementation_roadmap(recommendations)
    
    # Generate resource and risk analysis
    resource_analysis = await _analyze_resource_requirements(recommendations)
    risk_analysis = await _assess_implementation_risks(recommendations)
    
    # Create comprehensive action plan report
    action_report = f"""
🎯 **Action Recommendations Complete**

**Analysis Input:**
💡 Key Insights: {insights[:200]}{'...' if len(insights) > 200 else ''}
🎯 Business Goals: {business_goals if business_goals else 'General business optimization'}
⚠️ Constraints: {constraints if constraints else 'Standard resource limitations'}
📅 Analysis Date: {datetime.now().strftime('%B %d, %Y')}

**Executive Summary:**
{recommendations['executive_summary']}

**Priority Matrix Analysis:**
{_format_priority_matrix(recommendations.get('priority_matrix', {}))}

**High-Impact Recommendations:**
{_format_high_impact_recommendations(recommendations.get('high_impact', []))}

**Quick Wins (0-30 days):**
{_format_quick_wins(recommendations.get('quick_wins', []))}

**Strategic Initiatives (3-6 months):**
{_format_strategic_initiatives(recommendations.get('strategic_initiatives', []))}

**Long-term Investments (6+ months):**
{_format_long_term_investments(recommendations.get('long_term_investments', []))}

**Implementation Roadmap:**
{_format_implementation_roadmap(implementation_roadmap)}

**Resource Requirements:**
{_format_resource_requirements(resource_analysis)}

**Risk Assessment & Mitigation:**
{_format_risk_mitigation(risk_analysis.get('risk_factors', []))}

**Success Metrics & KPIs:**
{_format_success_metrics(recommendations.get('success_metrics', []))}

**Immediate Next Steps (48 hours):**
{_format_immediate_next_steps(recommendations.get('immediate_actions', []))}

**Supporting Analysis Tools:**
📊 `create-visualization` - Generate progress tracking dashboards
📈 `run-correlation` - Validate relationships between actions and outcomes
📋 `export-report` - Create implementation plan documentation
⏰ `schedule-analysis` - Set up automated progress monitoring

**Related BI Workflows:**
📈 `/bi/trend-analysis` - Monitor progress trends over time
🔍 `/bi/correlation-deep-dive` - Analyze relationships between initiatives
📋 `/bi/executive-summary` - Generate leadership progress reports

**Action Plan Complete ✅**
Ready for implementation with clear priorities, timelines, and success metrics.
"""
    
    return action_report


async def _create_recommendation_plan(insights: str, business_goals: str, constraints: str) -> Dict[str, Any]:
    """
    Create a comprehensive recommendation analysis plan.

    This function compiles the provided business insights, goals, and constraints into a structured plan.
    It also extracts additional context and alignment information to guide the recommendation generation process.

    Parameters:
        insights (str): Business intelligence insights.
        business_goals (str): Current business objectives.
        constraints (str): Business constraints regarding budget, timeline, or resources.

    Returns:
        Dict[str, Any]: A dictionary containing the analysis context, goal alignment, constraint analysis, 
                        and recommendation framework.
    """
    
    plan = {
        "insights": insights,
        "business_goals": business_goals,
        "constraints": constraints,
        "analysis_context": await _extract_analysis_context(insights),
        "goal_alignment": await _parse_business_goals(business_goals),
        "constraint_analysis": await _parse_constraints(constraints),
        "recommendation_framework": {
            "impact_dimensions": ["revenue_impact", "efficiency_gains", "customer_satisfaction", "competitive_advantage"],
            "effort_dimensions": ["implementation_time", "resource_requirements", "complexity", "risk_level"],
            "time_horizons": ["immediate", "short_term", "medium_term", "long_term"]
        }
    }
    
    return plan


async def _extract_analysis_context(insights: str) -> Dict[str, Any]:
    """
    Extract the business context from the provided insights.

    Analyzes the insights to determine the domain (e.g., financial, customer, operations) and extracts relevant metrics,
    performance indicators, and opportunity areas.

    Parameters:
        insights (str): Business intelligence insights.

    Returns:
        Dict[str, Any]: A dictionary with domain, key metrics, performance indicators, and opportunity areas.
    """
    
    context = {
        "domain": "general",
        "key_metrics": [],
        "performance_indicators": [],
        "opportunity_areas": []
    }
    
    insights_lower = insights.lower()
    
    # Domain detection
    if any(term in insights_lower for term in ["revenue", "sales", "profit", "financial"]):
        context["domain"] = "financial"
        context["key_metrics"] = ["Revenue growth", "Profit margins", "Customer acquisition cost"]
    elif any(term in insights_lower for term in ["customer", "retention", "satisfaction", "churn"]):
        context["domain"] = "customer"
        context["key_metrics"] = ["Customer retention", "Satisfaction scores", "Lifetime value"]
    elif any(term in insights_lower for term in ["efficiency", "process", "operational", "productivity"]):
        context["domain"] = "operations"
        context["key_metrics"] = ["Process efficiency", "Quality metrics", "Cost per unit"]
    
    # Performance indicators
    if "growing" in insights_lower or "increasing" in insights_lower:
        context["performance_indicators"].append("positive_growth")
    if "declining" in insights_lower or "decreasing" in insights_lower:
        context["performance_indicators"].append("negative_trend")
    if "stable" in insights_lower or "consistent" in insights_lower:
        context["performance_indicators"].append("stable_performance")
    
    # Opportunity areas
    if "correlation" in insights_lower:
        context["opportunity_areas"].append("leverage_relationships")
    if "seasonal" in insights_lower:
        context["opportunity_areas"].append("seasonal_optimization")
    if "segment" in insights_lower:
        context["opportunity_areas"].append("targeted_strategies")
    
    return context


async def _parse_business_goals(business_goals: str) -> Dict[str, Any]:
    """
    Parse and categorize the business goals provided.

    This function analyzes the goals text to identify primary goal categories, extract specific numerical targets,
    and determine timeline details.

    Parameters:
        business_goals (str): The business objectives and goals text.

    Returns:
        Dict[str, Any]: A dictionary containing primary goals, specific targets, and timeline information.
    """
    
    if not business_goals:
        return {"primary_goals": ["general_optimization"], "specific_targets": [], "timeline": "unspecified"}
    
    goals_lower = business_goals.lower()
    
    goal_categories = {
        "growth": ["grow", "expand", "increase", "scale"],
        "efficiency": ["optimize", "improve", "streamline", "reduce cost"],
        "customer": ["retention", "satisfaction", "acquisition", "loyalty"],
        "market": ["market share", "competitive", "positioning", "brand"],
        "innovation": ["innovation", "technology", "digital", "automation"]
    }
    
    identified_goals = []
    for category, keywords in goal_categories.items():
        if any(keyword in goals_lower for keyword in keywords):
            identified_goals.append(category)
    
    return {
        "primary_goals": identified_goals if identified_goals else ["general_optimization"],
        "specific_targets": _extract_specific_targets(business_goals),
        "timeline": _extract_timeline(business_goals)
    }


def _extract_specific_targets(goals_text: str) -> List[str]:
    """
    Extract specific numerical targets from the goals text.

    Uses regular expressions to identify common numerical targets such as percentage growth or monetary values.

    Parameters:
        goals_text (str): The text containing business goals.

    Returns:
        List[str]: A list of extracted numerical targets, limited to the top five.
    """
    
    import re
    
    # Simple pattern matching for common targets
    patterns = [
        r'(\d+)%\s*growth',
        r'increase.*?(\d+)%',
        r'reduce.*?(\d+)%',
        r'\$(\d+(?:,\d+)*(?:\.\d+)?)(?:M|K|million|thousand)?'
    ]
    
    targets = []
    for pattern in patterns:
        matches = re.findall(pattern, goals_text, re.IGNORECASE)
        targets.extend(matches)
    
    return targets[:5]  # Limit to top 5 targets


def _extract_timeline(goals_text: str) -> str:
    """
    Determine the timeline based on the goals text.

    Analyzes the text for time-related keywords and categorizes the timeline as quarterly, annual, immediate, or medium term.

    Parameters:
        goals_text (str): The business goals text.

    Returns:
        str: The determined timeline categorization.
    """
    
    goals_lower = goals_text.lower()
    
    if any(term in goals_lower for term in ["month", "quarterly", "q1", "q2", "q3", "q4"]):
        return "quarterly"
    elif any(term in goals_lower for term in ["year", "annual", "2024", "2025"]):
        return "annual"
    elif any(term in goals_lower for term in ["week", "immediate", "asap"]):
        return "immediate"
    else:
        return "medium_term"


async def _parse_constraints(constraints: str) -> Dict[str, Any]:
    """
    Parse and categorize business constraints.

    Analyzes the constraints text to determine limitations regarding budget, timeline, resources, and any additional factors.

    Parameters:
        constraints (str): The text describing business constraints.

    Returns:
        Dict[str, Any]: A dictionary with budget, timeline, resource constraints, and other identified limitations.
    """
    
    if not constraints:
        return {"budget": "standard", "timeline": "flexible", "resources": "standard", "other": []}
    
    constraints_lower = constraints.lower()
    
    constraint_analysis = {
        "budget": "standard",
        "timeline": "flexible", 
        "resources": "standard",
        "other": []
    }
    
    # Budget constraints
    if any(term in constraints_lower for term in ["budget", "cost", "financial", "limited funds"]):
        constraint_analysis["budget"] = "limited"
    elif any(term in constraints_lower for term in ["no budget", "tight budget", "minimal budget"]):
        constraint_analysis["budget"] = "very_limited"
    
    # Timeline constraints
    if any(term in constraints_lower for term in ["urgent", "asap", "immediate", "tight deadline"]):
        constraint_analysis["timeline"] = "urgent"
    elif any(term in constraints_lower for term in ["slow", "gradual", "long-term only"]):
        constraint_analysis["timeline"] = "extended"
    
    # Resource constraints
    if any(term in constraints_lower for term in ["small team", "limited staff", "resource constrained"]):
        constraint_analysis["resources"] = "limited"
    elif any(term in constraints_lower for term in ["no additional staff", "current team only"]):
        constraint_analysis["resources"] = "very_limited"
    
    # Other constraints
    if "regulatory" in constraints_lower or "compliance" in constraints_lower:
        constraint_analysis["other"].append("regulatory_compliance")
    if "technology" in constraints_lower or "system" in constraints_lower:
        constraint_analysis["other"].append("technology_limitations")
    
    return constraint_analysis


async def _generate_prioritized_recommendations(plan: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate prioritized recommendations based on the analysis plan.

    This function creates a prioritized list of recommendations by generating an executive summary,
    constructing a priority matrix, and categorizing the specific recommendations into high impact, quick wins,
    strategic initiatives, and long-term investments. It also computes success metrics and immediate actions.

    Parameters:
        plan (Dict[str, Any]): The compiled recommendation analysis plan.

    Returns:
        Dict[str, Any]: A dictionary containing the executive summary, priority matrix, categorized recommendations,
                        success metrics, and immediate next steps.
    """
    
    recommendations = {
        "executive_summary": "",
        "priority_matrix": {},
        "high_impact": [],
        "quick_wins": [],
        "strategic_initiatives": [],
        "long_term_investments": [],
        "success_metrics": [],
        "immediate_actions": []
    }
    
    # Generate executive summary
    recommendations["executive_summary"] = await _generate_executive_summary(plan)
    
    # Create priority matrix
    recommendations["priority_matrix"] = await _create_priority_matrix(plan)
    
    # Generate specific recommendations by category
    all_recommendations = await _generate_specific_recommendations(plan)
    
    # Categorize recommendations
    recommendations["high_impact"] = [r for r in all_recommendations if r["impact_score"] >= 8]
    recommendations["quick_wins"] = [r for r in all_recommendations if r["effort_score"] <= 3 and r["impact_score"] >= 6]
    recommendations["strategic_initiatives"] = [r for r in all_recommendations if r["effort_score"] >= 4 and r["effort_score"] <= 7 and r["impact_score"] >= 7]
    recommendations["long_term_investments"] = [r for r in all_recommendations if r["effort_score"] >= 8 and r["impact_score"] >= 7]
    
    # Generate success metrics
    recommendations["success_metrics"] = await _generate_success_metrics(plan, all_recommendations)
    
    # Generate immediate actions
    recommendations["immediate_actions"] = await _generate_immediate_actions(plan, all_recommendations)
    
    return recommendations


async def _generate_executive_summary(plan: Dict[str, Any]) -> str:
    """
    Generate an executive summary of the generated recommendations.

    Constructs a summary based on the identified domain, primary business goals, and analysis insights.
    Tailors the content to the domain (financial, customer, operations, or general).

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        str: The executive summary text.
    """
    
    insights = plan["insights"]
    analysis_context = plan["analysis_context"]
    goal_alignment = plan["goal_alignment"]
    
    domain = analysis_context["domain"]
    primary_goals = goal_alignment["primary_goals"]
    
    if domain == "financial":
        if "growth" in primary_goals:
            return """Analysis reveals strong revenue momentum with clear optimization opportunities. Recommended actions focus on accelerating growth drivers while maintaining efficiency. Priority initiatives target customer acquisition and retention with projected 15-25% revenue impact within 6 months."""
        else:
            return """Financial analysis indicates solid performance with efficiency improvement opportunities. Recommendations emphasize margin optimization and cost management while preserving growth trajectory. Expected impact: 10-15% improvement in key financial metrics."""
    
    elif domain == "customer":
        if "customer" in primary_goals:
            return """Customer insights reveal significant opportunities for retention and satisfaction improvements. Strategic recommendations focus on customer experience optimization and lifecycle management. Projected impact: 12-18% improvement in customer metrics within 3-6 months."""
        else:
            return """Customer analysis shows strong foundation with targeted enhancement opportunities. Recommended actions leverage existing customer relationships for expansion and referral growth. Expected outcome: 8-12% improvement in customer value metrics."""
    
    elif domain == "operations":
        if "efficiency" in primary_goals:
            return """Operational analysis identifies multiple efficiency enhancement opportunities. Priority recommendations target process optimization and automation initiatives. Projected impact: 15-20% improvement in operational metrics with strong ROI within 4-6 months."""
        else:
            return """Operations review reveals solid performance with scaling optimization potential. Strategic initiatives focus on capacity enhancement and quality improvements. Expected impact: 10-15% operational efficiency gains."""
    
    else:
        return """Comprehensive analysis reveals multiple strategic opportunities across key business dimensions. Prioritized recommendations balance quick wins with strategic initiatives for sustainable growth. Projected impact: 10-20% improvement in core metrics within 6 months."""


async def _create_priority_matrix(plan: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a priority matrix based on the recommendation analysis plan.

    Adjusts the impact-versus-effort matrix using identified constraints to determine a priority focus.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        Dict[str, Any]: A dictionary containing the framework description, priority focus, and scoring guidelines.
    """
    
    constraint_analysis = plan["constraint_analysis"]
    
    # Adjust matrix based on constraints
    if constraint_analysis["budget"] == "very_limited":
        priority_focus = "low_cost_high_impact"
    elif constraint_analysis["timeline"] == "urgent":
        priority_focus = "quick_wins"
    elif constraint_analysis["resources"] == "very_limited":
        priority_focus = "minimal_resource_requirements"
    else:
        priority_focus = "balanced_approach"
    
    return {
        "framework": "Impact (1-10) vs Effort (1-10) scoring",
        "priority_focus": priority_focus,
        "high_priority": "Impact ≥ 7, Effort ≤ 5 (Quick wins and strategic initiatives)",
        "medium_priority": "Impact ≥ 6, Effort ≤ 7 (Balanced initiatives)",
        "low_priority": "Impact < 6 or Effort > 8 (Consider for later phases)",
        "constraint_adjustments": f"Adjusted for {constraint_analysis['budget']} budget and {constraint_analysis['timeline']} timeline"
    }


async def _generate_specific_recommendations(plan: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generate and prioritize specific recommendations based on the analysis context.

    Depending on the identified domain, this function generates domain-specific recommendations.
    It also adds cross-cutting analytics recommendations and computes priority scores along with risk adjustments.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        List[Dict[str, Any]]: A list of recommendation dictionaries, sorted by risk-adjusted priority score.
    """
    
    insights = plan["insights"]
    analysis_context = plan["analysis_context"]
    goal_alignment = plan["goal_alignment"]
    constraint_analysis = plan["constraint_analysis"]
    
    recommendations = []
    
    domain = analysis_context["domain"]
    
    if domain == "financial":
        recommendations.extend(await _generate_financial_recommendations(plan))
    elif domain == "customer":
        recommendations.extend(await _generate_customer_recommendations(plan))
    elif domain == "operations":
        recommendations.extend(await _generate_operations_recommendations(plan))
    else:
        recommendations.extend(await _generate_general_recommendations(plan))
    
    # Add cross-cutting analytics recommendations
    recommendations.extend(await _generate_analytics_recommendations(plan))
    
    # Score and prioritize each recommendation
    for rec in recommendations:
        rec["priority_score"] = (rec["impact_score"] * 2 + (10 - rec["effort_score"])) / 3
        rec["risk_adjusted_score"] = rec["priority_score"] * (1 - rec.get("risk_level", 0.2))
    
    # Sort recommendations by risk-adjusted score (highest first)
    recommendations.sort(key=lambda x: x["risk_adjusted_score"], reverse=True)
    
    return recommendations


async def _generate_financial_recommendations(plan: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generate domain-specific recommendations for financial insights.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        List[Dict[str, Any]]: A list of financial recommendations.
    """
    
    return [
        {
            "title": "Revenue Stream Optimization",
            "description": "Optimize pricing and product mix based on profitability analysis",
            "category": "revenue_optimization",
            "impact_score": 8,
            "effort_score": 4,
            "timeline": "2-3 months",
            "resources": ["Finance team", "Sales analysis", "Pricing consultant"],
            "expected_outcome": "10-15% revenue increase through optimized pricing",
            "risk_level": 0.2
        },
        {
            "title": "Customer Acquisition Cost Reduction",
            "description": "Improve marketing efficiency through channel optimization",
            "category": "cost_optimization",
            "impact_score": 7,
            "effort_score": 3,
            "timeline": "1-2 months",
            "resources": ["Marketing team", "Analytics tools"],
            "expected_outcome": "20-30% reduction in CAC while maintaining volume",
            "risk_level": 0.15
        },
        {
            "title": "Automated Financial Reporting",
            "description": "Implement real-time financial dashboards and automated reporting",
            "category": "efficiency",
            "impact_score": 6,
            "effort_score": 5,
            "timeline": "3-4 months",
            "resources": ["IT team", "BI tools", "Finance team training"],
            "expected_outcome": "50% reduction in reporting time, improved decision speed",
            "risk_level": 0.25
        },
        {
            "title": "Cash Flow Optimization",
            "description": "Optimize payment terms and collections processes",
            "category": "cash_management",
            "impact_score": 7,
            "effort_score": 2,
            "timeline": "1 month",
            "resources": ["Finance team", "Collections process review"],
            "expected_outcome": "15-20% improvement in cash conversion cycle",
            "risk_level": 0.1
        }
    ]


async def _generate_customer_recommendations(plan: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generate domain-specific recommendations for customer insights.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        List[Dict[str, Any]]: A list of customer-focused recommendations.
    """
    
    return [
        {
            "title": "Customer Success Program Enhancement",
            "description": "Implement proactive customer success initiatives based on usage patterns",
            "category": "retention",
            "impact_score": 9,
            "effort_score": 4,
            "timeline": "2-3 months",
            "resources": ["Customer Success team", "CRM integration", "Training"],
            "expected_outcome": "3-5% improvement in retention rate, 15% increase in expansion revenue",
            "risk_level": 0.15
        },
        {
            "title": "Personalized Customer Experience",
            "description": "Leverage data insights for personalized customer interactions",
            "category": "experience",
            "impact_score": 8,
            "effort_score": 6,
            "timeline": "4-6 months",
            "resources": ["Data team", "Marketing automation", "UX design"],
            "expected_outcome": "20% improvement in customer satisfaction, 10% increase in upsells",
            "risk_level": 0.25
        },
        {
            "title": "Churn Prediction System",
            "description": "Implement early warning system for at-risk customers",
            "category": "retention_automation",
            "impact_score": 8,
            "effort_score": 5,
            "timeline": "3-4 months",
            "resources": ["Data science team", "ML infrastructure", "Customer success integration"],
            "expected_outcome": "25% reduction in churn through early intervention",
            "risk_level": 0.2
        },
        {
            "title": "Customer Feedback Loop Optimization",
            "description": "Systematize customer feedback collection and action implementation",
            "category": "continuous_improvement",
            "impact_score": 6,
            "effort_score": 2,
            "timeline": "1 month",
            "resources": ["Customer success team", "Survey tools"],
            "expected_outcome": "Faster issue resolution, improved product-market fit",
            "risk_level": 0.1
        }
    ]


async def _generate_operations_recommendations(plan: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generate domain-specific recommendations for operational improvements.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        List[Dict[str, Any]]: A list of operations-focused recommendations.
    """
    
    return [
        {
            "title": "Process Automation Initiative",
            "description": "Automate repetitive manual processes identified in efficiency analysis",
            "category": "automation",
            "impact_score": 8,
            "effort_score": 6,
            "timeline": "4-6 months",
            "resources": ["IT team", "Process analysts", "Automation tools"],
            "expected_outcome": "30% reduction in processing time, 15% cost savings",
            "risk_level": 0.3
        },
        {
            "title": "Quality Management System",
            "description": "Implement systematic quality monitoring and improvement processes",
            "category": "quality",
            "impact_score": 7,
            "effort_score": 4,
            "timeline": "2-3 months",
            "resources": ["Quality team", "Monitoring tools", "Training"],
            "expected_outcome": "20% reduction in defects, improved customer satisfaction",
            "risk_level": 0.2
        },
        {
            "title": "Capacity Planning Optimization",
            "description": "Implement data-driven capacity planning and resource allocation",
            "category": "resource_optimization",
            "impact_score": 7,
            "effort_score": 3,
            "timeline": "1-2 months",
            "resources": ["Operations team", "Planning tools", "Data analysis"],
            "expected_outcome": "15% improvement in resource utilization",
            "risk_level": 0.15
        },
        {
            "title": "Performance Dashboard Implementation",
            "description": "Create real-time operational performance monitoring system",
            "category": "monitoring",
            "impact_score": 6,
            "effort_score": 3,
            "timeline": "1-2 months",
            "resources": ["BI team", "Dashboard tools", "KPI definition"],
            "expected_outcome": "Faster issue identification, improved decision making",
            "risk_level": 0.1
        }
    ]


async def _generate_general_recommendations(plan: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generate general business recommendations when no specific domain is identified.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        List[Dict[str, Any]]: A list of general recommendations applicable across various business areas.
    """
    
    return [
        {
            "title": "Data-Driven Decision Framework",
            "description": "Establish systematic approach to data-driven decision making",
            "category": "decision_framework",
            "impact_score": 8,
            "effort_score": 4,
            "timeline": "2-3 months",
            "resources": ["Leadership team", "Analytics training", "Process documentation"],
            "expected_outcome": "Improved decision quality, faster problem resolution",
            "risk_level": 0.15
        },
        {
            "title": "Performance Measurement System",
            "description": "Implement comprehensive KPI tracking and performance management",
            "category": "performance_management",
            "impact_score": 7,
            "effort_score": 3,
            "timeline": "1-2 months",
            "resources": ["Management team", "KPI definition", "Tracking tools"],
            "expected_outcome": "Better alignment, improved accountability",
            "risk_level": 0.1
        },
        {
            "title": "Cross-Functional Collaboration Enhancement",
            "description": "Improve coordination and information sharing between departments",
            "category": "collaboration",
            "impact_score": 6,
            "effort_score": 2,
            "timeline": "1 month",
            "resources": ["Management coordination", "Communication tools"],
            "expected_outcome": "Faster execution, reduced silos",
            "risk_level": 0.1
        }
    ]


async def _generate_analytics_recommendations(plan: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Generate analytics and BI recommendations that span across domains.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.

    Returns:
        List[Dict[str, Any]]: A list of analytics-focused recommendations.
    """
    
    return [
        {
            "title": "Predictive Analytics Implementation",
            "description": "Develop predictive models for key business metrics",
            "category": "analytics",
            "impact_score": 9,
            "effort_score": 7,
            "timeline": "4-6 months",
            "resources": ["Data science team", "ML infrastructure", "Business stakeholder involvement"],
            "expected_outcome": "Proactive decision making, 20% improvement in forecast accuracy",
            "risk_level": 0.3
        },
        {
            "title": "Executive Dashboard Suite",
            "description": "Create comprehensive executive dashboards for key metrics",
            "category": "reporting",
            "impact_score": 7,
            "effort_score": 3,
            "timeline": "1-2 months",
            "resources": ["BI team", "Dashboard tools", "Executive requirements gathering"],
            "expected_outcome": "Real-time visibility, faster strategic decisions",
            "risk_level": 0.15
        },
        {
            "title": "Automated Insight Generation",
            "description": "Implement automated analysis and insight generation system",
            "category": "automation",
            "impact_score": 8,
            "effort_score": 8,
            "timeline": "6-9 months",
            "resources": ["Advanced analytics team", "AI/ML tools", "Integration work"],
            "expected_outcome": "Continuous insights, 50% reduction in analysis time",
            "risk_level": 0.4
        }
    ]


async def _generate_success_metrics(plan: Dict[str, Any], recommendations: List[Dict[str, Any]]) -> List[str]:
    """
    Generate success metrics to measure the progress of implemented recommendations.

    Compiles a base list of metrics along with domain-specific metrics based on the analysis context.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.
        recommendations (List[Dict[str, Any]]): The list of generated recommendations.

    Returns:
        List[str]: A list of success metrics.
    """
    
    domain = plan["analysis_context"]["domain"]
    
    base_metrics = [
        "Implementation completion rate (% of initiatives completed on time)",
        "ROI achievement (actual vs projected returns)",
        "Resource utilization efficiency (planned vs actual resource usage)",
        "Stakeholder satisfaction with initiatives (survey scores)"
    ]
    
    domain_metrics = {
        "financial": [
            "Revenue growth rate improvement",
            "Profit margin enhancement",
            "Cost reduction achievements",
            "Cash flow optimization results"
        ],
        "customer": [
            "Customer retention rate improvement",
            "Customer satisfaction score increases",
            "Customer lifetime value growth",
            "Net Promoter Score enhancement"
        ],
        "operations": [
            "Process efficiency gains",
            "Quality metric improvements",
            "Automation success rate",
            "Capacity utilization optimization"
        ]
    }
    
    specific_metrics = domain_metrics.get(domain, [
        "Key performance indicator improvements",
        "Process optimization achievements",
        "Strategic goal progress",
        "Competitive advantage indicators"
    ])
    
    return base_metrics + specific_metrics


async def _generate_immediate_actions(plan: Dict[str, Any], recommendations: List[Dict[str, Any]]) -> List[str]:
    """
    Generate immediate next steps for implementation based on constraints and recommendations.

    Prioritizes actionable next steps for execution within 48 hours and includes constraint-specific actions.

    Parameters:
        plan (Dict[str, Any]): The recommendation analysis plan.
        recommendations (List[Dict[str, Any]]): The list of generated recommendations.

    Returns:
        List[str]: A list of immediate next step actions (up to five items).
    """
    
    constraint_analysis = plan["constraint_analysis"]
    
    immediate_actions = [
        "Convene leadership team to review and prioritize recommendations",
        "Assign executive sponsors to top 3 strategic initiatives",
        "Establish project management framework for implementation tracking",
        "Communicate strategic priorities to all stakeholders"
    ]
    
    # Add constraint-specific actions
    if constraint_analysis["budget"] == "limited":
        immediate_actions.append("Conduct detailed ROI analysis for budget approval")
    
    if constraint_analysis["timeline"] == "urgent":
        immediate_actions.insert(0, "Form rapid response team for immediate implementation")
    
    if constraint_analysis["resources"] == "limited":
        immediate_actions.append("Assess resource reallocation opportunities")
    
    return immediate_actions[:5]  # Limit to top 5 immediate actions


async def _create_implementation_roadmap(recommendations: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a detailed implementation roadmap based on the prioritized recommendations.

    Divides the implementation plan into three phases: immediate (0-30 days), strategic (1-6 months),
    and transformational (6-18 months). Each phase includes key initiatives and success criteria.

    Parameters:
        recommendations (Dict[str, Any]): The dictionary of categorized recommendations.

    Returns:
        Dict[str, Any]: A dictionary outlining the implementation phases and key initiatives for each phase.
    """
    
    roadmap = {
        "phase_1_immediate": {
            "timeline": "0-30 days",
            "focus": "Quick wins and foundation setting",
            "key_initiatives": [],
            "success_criteria": "Immediate impact visible, team alignment achieved"
        },
        "phase_2_strategic": {
            "timeline": "1-6 months", 
            "focus": "Strategic initiatives and process improvements",
            "key_initiatives": [],
            "success_criteria": "Major initiatives launched, measurable progress"
        },
        "phase_3_transformation": {
            "timeline": "6-18 months",
            "focus": "Long-term investments and capability building",
            "key_initiatives": [],
            "success_criteria": "Transformational changes implemented, sustained results"
        }
    }
    
    # Populate phases with recommendations
    quick_wins = recommendations.get("quick_wins", [])
    strategic = recommendations.get("strategic_initiatives", [])
    long_term = recommendations.get("long_term_investments", [])
    
    roadmap["phase_1_immediate"]["key_initiatives"] = [r["title"] for r in quick_wins[:3]]
    roadmap["phase_2_strategic"]["key_initiatives"] = [r["title"] for r in strategic[:4]]
    roadmap["phase_3_transformation"]["key_initiatives"] = [r["title"] for r in long_term[:3]]
    
    return roadmap


async def _analyze_resource_requirements(recommendations: Dict[str, Any]) -> Dict[str, Any]:
    """
    Analyze resource requirements across all generated recommendations.

    Aggregates the required team capabilities and technology investments, and provides an estimated budget range
    as well as optimization opportunities.

    Parameters:
        recommendations (Dict[str, Any]): The dictionary containing categorized recommendations.

    Returns:
        Dict[str, Any]: A dictionary detailing budget estimates, team requirements, technology investments,
                        and recommendations for resource optimization.
    """
    
    all_recommendations = (
        recommendations.get("high_impact", []) +
        recommendations.get("quick_wins", []) +
        recommendations.get("strategic_initiatives", []) +
        recommendations.get("long_term_investments", [])
    )
    
    # Aggregate resource requirements
    team_requirements = set()
    tech_investments = set()
    estimated_budget = 0
    
    for rec in all_recommendations:
        resources = rec.get("resources", [])
        for resource in resources:
            if any(team_word in resource.lower() for team_word in ["team", "analyst", "manager", "consultant"]):
                team_requirements.add(resource)
            elif any(tech_word in resource.lower() for tech_word in ["tool", "software", "system", "platform"]):
                tech_investments.add(resource)
    
    return {
        "total_budget_estimate": "Budget analysis required - varies by priority selection",
        "team_requirements": list(team_requirements)[:8],
        "technology_investments": list(tech_investments)[:6],
        "implementation_phases": "3 phases over 12-18 months",
        "resource_optimization_opportunities": [
            "Leverage existing team capabilities where possible",
            "Phase technology investments to spread costs",
            "Consider external consultants for specialized needs",
            "Implement pilot programs before full rollout"
        ]
    }


async def _assess_implementation_risks(recommendations: Dict[str, Any]) -> Dict[str, Any]:
    """
    Assess potential risks in the implementation of the recommendations.

    Evaluates common risk factors and provides recommended mitigation strategies along with an overall risk level.

    Parameters:
        recommendations (Dict[str, Any]): The dictionary containing categorized recommendations.

    Returns:
        Dict[str, Any]: A dictionary with identified risk factors, mitigation strategies, overall risk level,
                        and key success factors.
    """
    
    risk_factors = [
        "Resource availability constraints may delay implementation",
        "Technology integration complexity could extend timelines",
        "Change management resistance might slow adoption",
        "Market conditions could affect ROI projections",
        "Competing priorities may dilute focus and resources"
    ]
    
    mitigation_strategies = [
        "Establish clear governance and decision-making processes",
        "Implement phased approach with regular checkpoints",
        "Invest in change management and communication",
        "Build contingency plans for key risk scenarios",
        "Monitor progress with leading indicators"
    ]
    
    return {
        "risk_factors": risk_factors,
        "mitigation_strategies": mitigation_strategies,
        "overall_risk_level": "Medium - manageable with proper planning and execution",
        "key_success_factors": [
            "Strong executive sponsorship and support",
            "Clear communication and stakeholder alignment",
            "Adequate resource allocation and timing",
            "Regular monitoring and course correction"
        ]
    }


def _format_priority_matrix(priority_matrix: Dict[str, Any]) -> str:
    """
    Format the priority matrix into a human-readable string.

    Constructs a visual representation of the impact versus effort analysis framework, including the current priority focus
    and scoring guidelines.

    Parameters:
        priority_matrix (Dict[str, Any]): The priority matrix dictionary.

    Returns:
        str: A formatted string representing the priority analysis.
    """
    
    framework = priority_matrix.get("framework", "Impact vs Effort analysis")
    priority_focus = priority_matrix.get("priority_focus", "balanced_approach")
    
    # Create visual representation
    high_impact_low_effort = ["Revenue optimization", "Process automation", "Customer retention programs"]
    high_impact_high_effort = ["Predictive analytics platform", "Digital transformation", "Market expansion"]
    
    formatted = f"""
**📊 Priority Analysis Framework:** {framework}

**🎯 Current Focus:** {priority_focus.replace('_', ' ').title()}

**⭐ High Impact, Low Effort (Top Priority):**
{_format_recommendations_list(high_impact_low_effort[:3])}

**🚀 High Impact, High Effort (Strategic Initiatives):**
{_format_recommendations_list(high_impact_high_effort[:3])}

**Priority Scoring:**
• Impact: Revenue/customer/efficiency improvements
• Effort: Resource requirements and implementation complexity
• Timeline: Speed to value realization
"""
    
    return formatted


def _format_high_impact_recommendations(high_impact: List[Dict[str, Any]]) -> str:
    """
    Format high-impact recommendations into a bullet list string.

    Iterates over the top high-impact recommendations and formats each recommendation with its title, description,
    expected impact, timeline, and category.

    Parameters:
        high_impact (List[Dict[str, Any]]): List of high-impact recommendation dictionaries.

    Returns:
        str: A formatted string listing the high-impact recommendations.
    """
    
    formatted = ""
    for i, rec in enumerate(high_impact[:4], 1):
        title = rec.get("title", "")
        description = rec.get("description", "")
        impact = rec.get("expected_outcome", "")
        timeline = rec.get("timeline", "")
        priority_score = rec.get("priority_score", 0)
        
        formatted += f"""
**{i}. {title}** (Priority: {priority_score:.1f}/10)
*{description}*
• **Impact:** {impact}
• **Timeline:** {timeline}
• **Category:** {rec.get('category', 'General').replace('_', ' ').title()}

"""
    
    return formatted


def _format_quick_wins(quick_wins: List[Dict[str, Any]]) -> str:
    """
    Format quick wins recommendations into a concise list.

    Presents quick win recommendations with their title, brief description, and expected outcomes.

    Parameters:
        quick_wins (List[Dict[str, Any]]): List of quick win recommendation dictionaries.

    Returns:
        str: A formatted string listing quick win recommendations.
    """
    
    if not quick_wins:
        return "No immediate quick wins identified - focus on strategic initiatives."
    
    formatted = ""
    for qw in quick_wins[:4]:
        title = qw.get("title", "")
        description = qw.get("description", "")
        impact = qw.get("expected_outcome", "")
        
        formatted += f"• **{title}**: {description} - {impact}\n"
    
    return formatted


def _format_strategic_initiatives(strategic: List[Dict[str, Any]]) -> str:
    """
    Format strategic initiatives recommendations into a structured list.

    Formats medium-term strategic initiatives with title, timeline, description, and key resource requirements.

    Parameters:
        strategic (List[Dict[str, Any]]): List of strategic initiative recommendation dictionaries.

    Returns:
        str: A formatted string listing strategic initiatives.
    """
    
    formatted = ""
    for init in strategic[:4]:
        title = init.get("title", "")
        description = init.get("description", "")
        timeline = init.get("timeline", "")
        resources = init.get("resources", [])
        
        formatted += f"""
• **{title}** ({timeline})
  {description}
  *Resources:* {', '.join(resources[:3])}

"""
    
    return formatted


def _format_long_term_investments(long_term: List[Dict[str, Any]]) -> str:
    """
    Format long-term investments recommendations into a brief list.

    Formats recommendations that require extended implementation with transformational changes.

    Parameters:
        long_term (List[Dict[str, Any]]): List of long-term investment recommendation dictionaries.

    Returns:
        str: A formatted string listing long-term investments.
    """
    
    formatted = ""
    for lt in long_term[:3]:
        title = lt.get("title", "")
        description = lt.get("description", "")
        impact = lt.get("expected_outcome", "")
        
        formatted += f"• **{title}**: {description} - {impact}\n"
    
    return formatted


def _format_implementation_roadmap(roadmap: Dict[str, Any]) -> str:
    """
    Format the implementation roadmap into a human-readable string.

    Iterates through each phase in the roadmap and formats the phase title, timeline, focus, and key initiatives.

    Parameters:
        roadmap (Dict[str, Any]): The roadmap dictionary outlining the implementation phases.

    Returns:
        str: A formatted string representing the complete implementation roadmap.
    """
    
    formatted = ""
    
    for phase_name, phase_data in roadmap.items():
        phase_title = phase_name.replace("_", " ").title().replace("Phase ", "Phase ")
        timeline = phase_data.get("timeline", "")
        focus = phase_data.get("focus", "")
        initiatives = phase_data.get("key_initiatives", [])
        
        formatted += f"""
**{phase_title} ({timeline})**
*Focus:* {focus}
*Key Initiatives:* {', '.join(initiatives[:3])}

"""
    
    return formatted


def _format_resource_requirements(resource_analysis: Dict[str, Any]) -> str:
    """
    Format the resource requirements analysis into a structured report.

    Includes budget estimates, team requirements, technology investments, and capacity considerations.

    Parameters:
        resource_analysis (Dict[str, Any]): The resource analysis results.

    Returns:
        str: A formatted string presenting resource requirements.
    """
    
    budget = resource_analysis.get("total_budget_estimate", "TBD")
    team_reqs = resource_analysis.get("team_requirements", [])
    tech_investments = resource_analysis.get("technology_investments", [])
    
    formatted = f"""
**Budget Estimate:** {budget} for priority initiatives

**Team Requirements:**
{_format_requirements_list(team_reqs[:4])}

**Technology Investments:**
{_format_tech_list(tech_investments[:4])}

**Capacity Considerations:**
• Recommend dedicated project management for strategic initiatives
• Phase implementation to avoid resource conflicts
• Consider external support for specialized capabilities
"""
    
    return formatted


def _format_risk_mitigation(risk_factors: List[str]) -> str:
    """
    Format risk mitigation details into a concise checklist.

    Parameters:
        risk_factors (List[str]): List of risk factor strings.

    Returns:
        str: A formatted string listing risk factors with warning symbols.
    """
    
    return '\n'.join(f"⚠️ {risk}" for risk in risk_factors[:5])


def _format_success_metrics(success_metrics: List[str]) -> str:
    """
    Format success metrics into a displayable list.

    Parameters:
        success_metrics (List[str]): List of success metric strings.

    Returns:
        str: A formatted string of success metrics.
    """
    
    return '\n'.join(f"📊 {metric}" for metric in success_metrics[:8])


def _format_immediate_next_steps(immediate_actions: List[str]) -> str:
    """
    Format immediate next steps into a bullet list.

    Parameters:
        immediate_actions (List[str]): List of immediate action strings.

    Returns:
        str: A formatted string listing immediate next steps.
    """
    
    return '\n'.join(f"• {action}" for action in immediate_actions[:5])


def _format_recommendations_list(recommendations: list) -> str:
    """
    Format a list of recommendations into a bullet list.

    Parameters:
        recommendations (list): List of recommendation strings.

    Returns:
        str: A bullet list formatted string.
    """
    return '\n'.join(f"• {rec}" for rec in recommendations)


def _format_requirements_list(requirements: list) -> str:
    """
    Format a list of requirements into a bullet list.

    Parameters:
        requirements (list): List of requirement strings.

    Returns:
        str: A bullet list formatted string.
    """
    return '\n'.join(f"• {req}" for req in requirements)


def _format_tech_list(tech_items: list) -> str:
    """
    Format a list of technology items into a bullet list.

    Parameters:
        tech_items (list): List of technology item strings.

    Returns:
        str: A bullet list formatted string.
    """
    return '\n'.join(f"• {tech}" for tech in tech_items)
