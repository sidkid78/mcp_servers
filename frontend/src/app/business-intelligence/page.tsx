'use client';

import React from 'react';
import { BusinessIntelligenceUI } from '@/components/business-intelligence/BusinessIntelligenceUI';
import { TextContent } from '@modelcontextprotocol/sdk/types.js';

// Real execute function -> dynamic MCP route
async function executePrompt(promptName: string, params: Record<string, unknown>): Promise<string> {
  // Coerce all arguments to strings (MCP prompts require Record<string, string>)
  const stringArgs = Object.fromEntries(
    Object.entries(params || {}).map(([k, v]) => [k, typeof v === 'string' ? v : JSON.stringify(v)])
  ) as Record<string, string>;

  // Route through our BI API that converts MCP prompt output to a Gemini narrative
  const res = await fetch('/api/business-intelligence', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ promptName, arguments: stringArgs })
  });

  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.error || `Failed to run ${promptName}`);
  }

  const payload = data.data;
  if (typeof payload === 'string') return payload;
  if (payload?.content && Array.isArray(payload.content)) {
    return payload.content.map((c: unknown) => (c as TextContent).text || JSON.stringify(c, null, 2)).join('\n\n');
  }
  return JSON.stringify(payload, null, 2);
}

// Fallback mock (unused now, kept for reference)
// async function mockExecutePrompt(promptName: string, params: Record<string, unknown>): Promise<string> {
//   await new Promise(resolve => setTimeout(resolve, 2000));
//   switch (promptName) {
//     case 'bi-discovery':
//       return `# Business Intelligence Discovery Results

// ## Data Sources Discovered

// ### 📊 Primary Dataset: ${params.data_path || './data'}
// **Status:** ✅ Successfully analyzed
// **Format:** Multiple formats detected (CSV, Excel, JSON)
// **Quality Score:** 8.7/10

// ### 📈 Key Findings
// - **Total Records:** 47,832 entries across 8 data sources
// - **Data Quality:** High consistency, minimal missing values (2.3%)
// - **Time Range:** January 2022 - Present
// - **Update Frequency:** Daily automated refresh

// ### 🎯 Business Context Analysis
// ${params.business_context || 'General business intelligence analysis'}

// **Recommended Next Steps:**
// 1. Load primary sales dataset for correlation analysis
// 2. Investigate seasonal patterns in Q4 data
// 3. Set up automated KPI dashboard
// 4. Schedule monthly trend analysis reports

// ### 📋 Available Datasets
// | Dataset | Records | Quality | Last Updated |
// |---------|---------|---------|--------------|
// | sales_data.csv | 15,420 | 9.2/10 | Today |
// | customer_metrics.xlsx | 8,934 | 8.8/10 | Yesterday |
// | financial_summary.json | 2,156 | 9.5/10 | Today |
// | marketing_campaigns.csv | 12,847 | 7.9/10 | 2 days ago |

// **Data Quality Assessment:**
// - ✅ No duplicate records detected
// - ✅ Consistent date formats
// - ⚠️ Minor data gaps in Q1 2023
// - ✅ All key business metrics present`;

//     case 'insight-investigation':
//       return `# Business Insight Investigation Results

// ## Dataset: ${params.dataset_name}
// ${params.focus_area ? `**Focus Area:** ${params.focus_area}` : '**Scope:** Comprehensive Analysis'}

// ### 🔍 Key Business Insights

// #### Revenue Performance
// - **Total Revenue:** $2.4M (YTD)
// - **Growth Rate:** +18.5% vs. previous period
// - **Top Revenue Driver:** Product Category A (42% of total)

// #### Customer Analytics
// - **Active Customers:** 8,934
// - **Customer Retention:** 87.3%
// - **Average Customer Value:** $268
// - **Churn Risk:** 156 customers (1.7%)

// #### Operational Metrics
// - **Conversion Rate:** 3.2% (industry avg: 2.8%)
// - **Cost per Acquisition:** $45
// - **Customer Satisfaction:** 4.6/5.0

// ### 📊 Critical Business Questions Analysis
// ${params.business_questions || 'Standard business metrics analysis performed'}

// **Key Recommendations:**
// 1. Focus on Customer Category A - highest LTV
// 2. Implement retention program for at-risk customers
// 3. Optimize marketing spend in Q4
// 4. Investigate seasonal demand patterns

// ### 🎯 Action Items
// - [ ] Deep dive into customer segmentation
// - [ ] Analyze seasonal revenue patterns
// - [ ] Review pricing strategy effectiveness
// - [ ] Set up real-time monitoring dashboard`;

//     case 'correlation-deep-dive':
//       return `# Multi-Dimensional Correlation Analysis

// ## Dataset: ${params.dataset_name}
// **Analysis Methods:** ${JSON.stringify(params.analysis_methods)}
// **Correlation Threshold:** ${params.correlation_threshold}

// ### 🔗 Strong Correlations Discovered

// #### Revenue Correlations (Pearson)
// - **Marketing Spend ↔ Revenue:** r = 0.847 (Very Strong)
// - **Customer Satisfaction ↔ Retention:** r = 0.762 (Strong)
// - **Product Price ↔ Conversion Rate:** r = -0.634 (Negative, Moderate)

// #### Customer Behavior Correlations
// - **Session Duration ↔ Purchase Probability:** r = 0.691
// - **Email Engagement ↔ Customer LTV:** r = 0.589
// - **Support Tickets ↔ Churn Risk:** r = 0.543

// ### 📈 Statistical Significance
// All correlations shown are statistically significant (p < 0.05)

// ### 🎯 Business Implications
// 1. **Marketing ROI:** Every $1 spent on marketing correlates with $4.20 in revenue
// 2. **Customer Experience:** Satisfaction improvements directly impact retention
// 3. **Pricing Strategy:** Price sensitivity varies by customer segment

// ### 📊 Correlation Matrix
// ${params.include_visualization ? `
// **Correlation Heatmap:**
// \`\`\`
//                   Revenue  Marketing  Satisfaction  Price   Retention
// Revenue            1.00     0.85        0.72      -0.34     0.68
// Marketing          0.85     1.00        0.45      -0.12     0.52
// Satisfaction       0.72     0.45        1.00      -0.28     0.76
// Price             -0.34    -0.12       -0.28       1.00    -0.63
// Retention          0.68     0.52        0.76      -0.63     1.00
// \`\`\`

// **Correlation Strength Legend:**
// - 🔴 **Strong Positive** (0.7+): Revenue-Marketing, Satisfaction-Retention
// - 🟡 **Moderate** (0.5-0.7): Revenue-Satisfaction, Revenue-Retention  
// - 🔵 **Weak** (0.3-0.5): Marketing-Satisfaction, Marketing-Retention
// - ⚫ **Negative** (-0.3 to -0.7): Price relationships

// **Visual Heatmap:**
// \`\`\`
//      Rev  Mkt  Sat  Pri  Ret
// Rev  ███  ███  ██▓  ░▓░  ██░
// Mkt  ███  ███  ██░  ░░░  ██░  
// Sat  ██▓  ██░  ███  ░▓░  ███
// Pri  ░▓░  ░░░  ░▓░  ███  ░██
// Ret  ██░  ██░  ███  ░██  ███

// Legend: ███ Strong  ██░ Moderate  ░░░ Weak  ░▓░ Negative
// \`\`\`
// ` : ''}

// **Recommended Actions:**
// - Increase marketing budget allocation
// - Focus on customer satisfaction initiatives  
// - Implement dynamic pricing strategy
// - Monitor correlation stability monthly`;

//     case 'trend-analysis':
//       return `# Time-Series Trend Analysis & Forecasting

// ## Dataset: ${params.dataset_name}
// **Analysis Period:** ${params.time_range || 'All available data'}
// **Forecast Horizon:** ${params.forecast_periods} periods

// ### 📈 Trend Analysis Results

// #### Primary Trends Identified
// - **Revenue Trend:** Strong upward trajectory (+15% annual growth)
// - **Seasonality:** Clear Q4 peak (35% above baseline)
// - **Cyclical Patterns:** 18-month business cycle detected

// #### Seasonal Decomposition
// - **Trend Component:** Consistent growth pattern
// - **Seasonal Component:** Q4 spike, Q1 dip
// - **Residual Variance:** 8.3% (low noise)

// ### 🔮 Forecasting Results
// **Next 12 Months Projection:**
// - Q1 2025: $580K (±$45K confidence interval)
// - Q2 2025: $625K (±$52K confidence interval)  
// - Q3 2025: $610K (±$48K confidence interval)
// - Q4 2025: $890K (±$67K confidence interval)

// ### 🚨 Anomaly Detection
// - **Alert:** Unusual dip detected in March 2024 (-23% from trend)
// - **Pattern:** Recovery took 6 weeks
// - **Root Cause:** Supply chain disruption (external factor)

// ### 📊 Statistical Metrics
// - **Model Accuracy:** 94.2%
// - **Mean Absolute Error:** 3.8%
// - **Trend Strength:** 0.87 (very strong)
// - **Seasonality Strength:** 0.64 (moderate)

// **Strategic Recommendations:**
// 1. Prepare for Q4 demand surge
// 2. Investigate March anomaly prevention
// 3. Smooth seasonal workforce planning
// 4. Set realistic growth targets: 12-18% annually`;

//     case 'executive-summary':
//       const reportType = typeof params['report_type'] === 'string'
//         ? (params['report_type'] as string).toUpperCase()
//         : 'COMPREHENSIVE';
//       return `# Executive Business Intelligence Summary

// ## ${reportType} PERFORMANCE REPORT
// **Reporting Period:** ${params.timeframe || 'YTD 2024'}
// **Generated:** ${new Date().toLocaleDateString()}

// ### 🎯 Executive Summary
// Our business intelligence analysis reveals strong performance across key metrics with strategic opportunities for accelerated growth.

// ### 📊 Key Performance Indicators
// | Metric | Current | Target | Variance |
// |--------|---------|--------|----------|
// | Revenue | $2.4M | $2.2M | +9.1% ✅ |
// | Customer Growth | 18.5% | 15% | +3.5% ✅ |
// | Profit Margin | 23.4% | 25% | -1.6% ⚠️ |
// | Customer Satisfaction | 4.6/5 | 4.5/5 | +0.1 ✅ |

// ### 💡 Strategic Insights
// **Strengths:**
// - Revenue exceeding targets by 9.1%
// - Strong customer acquisition momentum
// - High customer satisfaction scores
// - Effective marketing ROI (4.2:1)

// **Areas for Improvement:**
// - Profit margins below target
// - Seasonal demand volatility
// - Customer support response times

// ### 🚀 Growth Opportunities
// 1. **Market Expansion:** Untapped segments worth $1.2M potential
// 2. **Product Innovation:** 3 high-demand features identified
// 3. **Operational Efficiency:** 15% cost reduction opportunity
// 4. **Customer Retention:** $340K annual value at risk

// ${params.include_recommendations ? `### 📋 Strategic Recommendations
// **Immediate Actions (30 days):**
// - Implement dynamic pricing strategy
// - Launch customer retention program
// - Optimize marketing spend allocation

// **Medium-term Initiatives (90 days):**
// - Expand into identified market segments
// - Develop high-demand product features
// - Streamline operational processes

// **Long-term Strategy (12 months):**
// - Build predictive analytics capabilities
// - Establish competitive moats
// - Scale customer success operations` : ''}

// ### 📈 Financial Outlook
// **Projected Performance:**
// - Revenue: $3.2M (+33% growth)
// - Profit Margin: 26.8% (target achieved)
// - Customer Base: 12,500 (+40% growth)

// **Board Recommendation:** APPROVE expansion strategy with $500K investment allocation.`;

//     case 'action-recommendations':
//       return `# Strategic Action Recommendations

// ## Business Intelligence-Driven Action Plan
// **Analysis Date:** ${new Date().toLocaleDateString()}
// **Time Horizon:** ${params.time_horizon}
// **Dataset:** ${params.dataset_name}

// ### 🎯 Priority Actions Based on Data Analysis

// #### 🚀 HIGH PRIORITY (Immediate - 30 days)

// **1. Customer Retention Program**
// - **Rationale:** 156 customers at churn risk ($340K revenue impact)
// - **Action:** Implement personalized retention campaigns
// - **Investment:** $25K
// - **Expected ROI:** 680%
// - **Success Metrics:** Reduce churn by 40%, increase NPS by 15 points

// **2. Marketing Spend Optimization**
// - **Rationale:** Strong correlation (r=0.847) between marketing and revenue
// - **Action:** Reallocate budget to highest-performing channels
// - **Investment:** Budget reallocation (neutral cost)
// - **Expected ROI:** 25% efficiency gain
// - **Success Metrics:** Improve CAC by $12, increase conversion by 0.8%

// #### 📈 MEDIUM PRIORITY (30-90 days)

// **3. Dynamic Pricing Implementation**
// - **Rationale:** Price elasticity analysis shows 12% revenue opportunity
// - **Action:** Deploy AI-powered pricing engine
// - **Investment:** $75K
// - **Expected ROI:** 340%
// - **Success Metrics:** 12% revenue increase, maintain conversion rates

// **4. Customer Segmentation Enhancement**
// - **Rationale:** Top 20% of customers generate 60% of revenue
// - **Action:** Develop premium service tier
// - **Investment:** $40K
// - **Expected ROI:** 280%
// - **Success Metrics:** 25% increase in customer LTV

// #### 🔄 STRATEGIC INITIATIVES (3-12 months)

// **5. Predictive Analytics Platform**
// - **Rationale:** Trend analysis shows 18-month business cycles
// - **Action:** Build forecasting and early warning systems
// - **Investment:** $150K
// - **Expected ROI:** 220%
// - **Success Metrics:** 30% improvement in demand planning accuracy

// ### 💰 Investment Summary
// | Initiative | Investment | ROI | Payback Period |
// |------------|------------|-----|----------------|
// | Retention Program | $25K | 680% | 2 months |
// | Pricing Engine | $75K | 340% | 4 months |
// | Segmentation | $40K | 280% | 5 months |
// | Analytics Platform | $150K | 220% | 8 months |
// | **TOTAL** | **$290K** | **380%** | **4.5 months** |

// ${params.include_implementation ? `### 🛠️ Implementation Roadmap

// **Week 1-2:** Launch retention program pilot
// **Week 3-4:** Begin pricing engine development
// **Week 5-8:** Implement customer segmentation
// **Week 9-12:** Deploy dynamic pricing
// **Month 4-6:** Build analytics platform
// **Month 7-12:** Scale and optimize all initiatives

// **Resource Requirements:**
// - Data Science Team: 2 FTEs
// - Marketing Team: 1 FTE
// - Engineering Team: 3 FTEs
// - Project Management: 1 FTE` : ''}

// ${params.include_metrics ? `### 📊 Success Metrics & KPIs

// **Financial Metrics:**
// - Revenue Growth: Target +33% YoY
// - Profit Margin: Target 26.8%
// - Customer LTV: Target +25%
// - CAC Payback: Target <3 months

// **Operational Metrics:**
// - Customer Churn: Target <5%
// - NPS Score: Target >70
// - Conversion Rate: Target >4%
// - Support Response Time: Target <2 hours

// **Monitoring Frequency:**
// - Daily: Revenue, conversions, churn alerts
// - Weekly: Customer metrics, marketing performance
// - Monthly: Financial performance, strategic KPIs
// - Quarterly: ROI analysis, strategy review` : ''}

// ### ✅ Next Steps
// 1. **Immediate:** Approve $290K investment budget
// 2. **Week 1:** Assemble cross-functional implementation team
// 3. **Week 2:** Begin retention program pilot
// 4. **Month 1:** Review initial results and adjust strategy
// 5. **Month 3:** Full implementation review and optimization

// **Expected Business Impact:** $1.2M additional revenue in 12 months with 380% ROI on investments.`;

//     default:
//       return `# Business Intelligence Analysis Complete

// Results for prompt: ${promptName}
// Parameters: ${JSON.stringify(params, null, 2)}

// This is a demonstration of the Business Intelligence platform. 
// In a real implementation, this would connect to the MCP server and return actual business intelligence analysis results.

// **Available Analysis Types:**
// - Data Discovery & Profiling
// - Insight Investigation & Metrics
// - Correlation Analysis & Relationships
// - Trend Analysis & Forecasting  
// - Executive Summary Reports
// - Strategic Action Recommendations`;
//   }
// }

export default function BusinessIntelligencePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <BusinessIntelligenceUI onExecutePrompt={executePrompt} />
    </div>
  );
}
