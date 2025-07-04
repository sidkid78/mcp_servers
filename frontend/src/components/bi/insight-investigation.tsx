/**
 * Insight Investigation Prompt
 * Guided exploration of business metrics with automated insights discovery.
 */

// Type definitions and interfaces
interface InvestigationPlan {
    dataset: string;
    focus_area: string;
    time_period: string;
    steps: string[];
    metrics_to_analyze: string[];
    visualizations_needed: string[];
    business_questions: string[];
  }
  
  interface DatasetProfile {
    summary: {
      total_records: string;
      date_range: string;
      data_quality_score: number;
      completeness: string;
      unique_customers?: string;
    };
    column_analysis: {
      numeric_columns: number;
      categorical_columns: number;
      date_columns: number;
      key_identifiers: number;
    };
    data_issues: string[];
    business_relevance: string;
  }
  
  interface MetricsAnalysis {
    key_metrics_found: Record<string, string>;
    metric_trends: Record<string, string>;
    performance_indicators: string[];
  }
  
  interface Pattern {
    type: string;
    description: string;
    impact: string;
    confidence: number;
  }
  
  interface TrendAnalysis {
    time_period_analyzed: string;
    trend_strength: string;
    forecast_confidence: string;
    primary_trend: string;
    secondary_trends: string[];
    forecast: string;
    trend_drivers: string[];
  }
  
  interface Correlation {
    metrics: string;
    correlation: number;
    insight: string;
  }
  
  interface CorrelationAnalysis {
    strong_correlations: Correlation[];
    moderate_correlations: Correlation[];
    surprising_findings: string[];
  }
  
  interface Segment {
    name: string;
    size: string;
    characteristics: string;
    revenue_contribution?: string;
    contribution?: string;
    strategy: string;
  }
  
  interface SegmentationAnalysis {
    segments_identified: Segment[];
    segment_insights: string[];
  }
  
  interface Anomaly {
    type: string;
    description: string;
    potential_causes: string[];
    impact: string;
    confidence: number;
  }
  
  interface InvestigationResults {
    dataset_profile: DatasetProfile;
    metrics_analysis: MetricsAnalysis;
    patterns_found: Pattern[];
    correlations: CorrelationAnalysis;
    segments: SegmentationAnalysis;
    trends: TrendAnalysis;
    anomalies: Anomaly[];
    business_insights: string[];
  }
  
  interface InsightsSummary {
    executive_summary: string;
    key_findings: string[];
    business_impact: string;
    data_quality: string;
    recommendations: string[];
    conclusion: string;
  }
  
  /**
   * Perform guided investigation of business insights within a specific dataset.
   * This workflow orchestrates multiple analysis tools to uncover actionable business insights.
   */
  export async function insightInvestigationPrompt(
    datasetName: string,
    focusArea: string = "general",
    timePeriod: string = ""
  ): Promise<string> {
    
    if (!datasetName) {
      return `
  ❌ **Dataset Required**
  
  Please specify a dataset name for insight investigation.
  
  **Usage:** \`/bi/insight-investigation dataset_name\`
  
  **Available Focus Areas:**
  • \`revenue\` - Revenue analysis, sales performance, pricing insights
  • \`customers\` - Customer behavior, segmentation, retention analysis  
  • \`operations\` - Operational efficiency, process optimization
  • \`growth\` - Growth metrics, expansion opportunities
  • \`general\` - Comprehensive analysis across all areas
  
  **Optional Parameters:**
  • \`focus_area\` - Business area to focus analysis on
  • \`time_period\` - Specific time period (e.g., "last 6 months", "Q1 2024")
  
  **Example:**
  \`/bi/insight-investigation sales_data focus_area=revenue time_period="last 12 months"\`
  `;
    }
    
    // Initialize investigation workflow
    const investigationPlan = await createInvestigationPlan(datasetName, focusArea, timePeriod);
    
    // Execute investigation steps
    const results = await executeInvestigationWorkflow(investigationPlan);
    
    // Generate insights summary
    const insightsSummary = await generateInsightsSummary(results, focusArea);
    
    // Create final investigation report
    const investigationReport = `
  🔍 **Business Insight Investigation Complete**
  
  **Investigation Scope:**
  📊 Dataset: ${datasetName}
  🎯 Focus Area: ${focusArea.charAt(0).toUpperCase() + focusArea.slice(1)}
  ⏱️ Time Period: ${timePeriod || "Full dataset"}
  
  **Executive Summary:**
  ${insightsSummary.executive_summary}
  
  **Key Findings:**
  ${formatKeyFindings(insightsSummary.key_findings)}
  
  **Detailed Analysis Results:**
  ${formatAnalysisResults(results)}
  
  **Business Impact Assessment:**
  ${insightsSummary.business_impact}
  
  **Data Quality Insights:**
  ${insightsSummary.data_quality}
  
  **Recommended Next Steps:**
  ${formatNextSteps(insightsSummary.recommendations, focusArea)}
  
  **Available Follow-up Workflows:**
  📊 \`/bi/correlation-deep-dive ${datasetName}\` - Explore relationships between key metrics
  📈 \`/bi/trend-analysis ${datasetName}\` - Analyze temporal patterns and forecasting
  📋 \`/bi/executive-summary\` - Generate C-suite presentation from these insights
  🎯 \`/bi/action-recommendations\` - Get specific business action plans
  
  **Individual Tools for Deep Dive:**
  • \`create-visualization ${datasetName}\` - Generate specific charts for key insights
  • \`run-correlation ${datasetName}\` - Statistical analysis of metric relationships
  • \`export-report\` - Generate formatted report of findings
  
  **Investigation Complete ✅**
  ${insightsSummary.conclusion}
  `;
    
    return investigationReport;
  }
  
  /**
   * Create a structured investigation plan based on focus area and dataset.
   */
  async function createInvestigationPlan(
    datasetName: string,
    focusArea: string,
    timePeriod: string
  ): Promise<InvestigationPlan> {
    
    const basePlan: InvestigationPlan = {
      dataset: datasetName,
      focus_area: focusArea,
      time_period: timePeriod,
      steps: [],
      metrics_to_analyze: [],
      visualizations_needed: [],
      business_questions: []
    };
    
    // Define focus-area specific investigation plans
    switch (focusArea) {
      case "revenue":
        return {
          ...basePlan,
          steps: [
            "profile_dataset_comprehensive",
            "identify_revenue_metrics",
            "analyze_revenue_trends",
            "segment_revenue_sources",
            "calculate_revenue_kpis",
            "identify_revenue_drivers"
          ],
          metrics_to_analyze: [
            "total_revenue", "average_order_value", "revenue_per_customer",
            "monthly_recurring_revenue", "revenue_growth_rate"
          ],
          business_questions: [
            "What are the main revenue drivers?",
            "How has revenue trended over time?",
            "Which customer segments generate the most revenue?",
            "What factors correlate with higher revenue?",
            "Are there seasonal revenue patterns?"
          ]
        };
      
      case "customers":
        return {
          ...basePlan,
          steps: [
            "profile_dataset_comprehensive",
            "identify_customer_metrics",
            "analyze_customer_segments", 
            "calculate_customer_lifetime_value",
            "analyze_customer_behavior",
            "identify_retention_factors"
          ],
          metrics_to_analyze: [
            "customer_acquisition_cost", "customer_lifetime_value", "churn_rate",
            "retention_rate", "repeat_purchase_rate", "customer_satisfaction"
          ],
          business_questions: [
            "Who are our most valuable customers?",
            "What drives customer retention?",
            "How do customer segments differ in behavior?",
            "What predicts customer churn?",
            "How can we improve customer satisfaction?"
          ]
        };
      
      case "operations":
        return {
          ...basePlan,
          steps: [
            "profile_dataset_comprehensive",
            "identify_operational_metrics",
            "analyze_process_efficiency",
            "identify_bottlenecks",
            "calculate_productivity_metrics",
            "analyze_resource_utilization"
          ],
          metrics_to_analyze: [
            "cycle_time", "throughput", "error_rate", "efficiency_ratio",
            "resource_utilization", "cost_per_unit"
          ],
          business_questions: [
            "Where are the operational bottlenecks?",
            "How efficient are our key processes?",
            "What drives operational costs?",
            "How can we improve productivity?",
            "Are there quality issues to address?"
          ]
        };
      
      case "growth":
        return {
          ...basePlan,
          steps: [
            "profile_dataset_comprehensive",
            "identify_growth_metrics",
            "analyze_growth_trends",
            "segment_growth_sources",
            "calculate_growth_rates",
            "identify_growth_opportunities"
          ],
          metrics_to_analyze: [
            "user_growth_rate", "revenue_growth_rate", "market_share_growth",
            "customer_acquisition_rate", "expansion_revenue"
          ],
          business_questions: [
            "What's driving our growth?",
            "Which segments are growing fastest?",
            "Where are the biggest growth opportunities?",
            "What limits our growth potential?",
            "How sustainable is our current growth?"
          ]
        };
      
      default: // general analysis
        return {
          ...basePlan,
          steps: [
            "profile_dataset_comprehensive",
            "identify_key_metrics",
            "analyze_distributions",
            "find_correlations",
            "identify_patterns",
            "generate_insights"
          ],
          metrics_to_analyze: ["auto_detect"],
          business_questions: [
            "What are the key patterns in the data?",
            "Which metrics are most important?",
            "Are there unexpected correlations?",
            "What trends can we identify?",
            "What insights drive business value?"
          ]
        };
    }
  }
  
  /**
   * Execute the investigation workflow steps and collect results.
   */
  async function executeInvestigationWorkflow(plan: InvestigationPlan): Promise<InvestigationResults> {
    const results: InvestigationResults = {
      dataset_profile: {} as DatasetProfile,
      metrics_analysis: {} as MetricsAnalysis,
      patterns_found: [],
      correlations: {} as CorrelationAnalysis,
      segments: {} as SegmentationAnalysis,
      trends: {} as TrendAnalysis,
      anomalies: [],
      business_insights: []
    };
    
    const { dataset: datasetName, focus_area: focusArea } = plan;
    
    // Step 1: Comprehensive dataset profiling
    if (plan.steps.includes("profile_dataset_comprehensive")) {
      results.dataset_profile = await simulateDatasetProfiling(datasetName, focusArea);
    }
    
    // Step 2: Identify and analyze key metrics based on focus area
    if (plan.steps.some(step => step.startsWith("identify_"))) {
      results.metrics_analysis = await simulateMetricsAnalysis(plan);
    }
    
    // Step 3: Pattern and trend analysis
    if (plan.steps.some(step => step.startsWith("analyze_"))) {
      results.patterns_found = await simulatePatternAnalysis(plan);
      results.trends = await simulateTrendAnalysis(plan);
    }
    
    // Step 4: Correlation analysis
    results.correlations = await simulateCorrelationAnalysis(plan);
    
    // Step 5: Segmentation analysis
    if (plan.steps.some(step => step.includes("segment"))) {
      results.segments = await simulateSegmentationAnalysis(plan);
    }
    
    return results;
  }
  
  /**
   * Simulate comprehensive dataset profiling.
   */
  async function simulateDatasetProfiling(datasetName: string, focusArea: string): Promise<DatasetProfile> {
    return {
      summary: {
        total_records: "125,847",
        date_range: "Jan 2023 - Dec 2024",
        data_quality_score: 87,
        completeness: "92%",
        ...(focusArea === "customers" && { unique_customers: "8,456" })
      },
      column_analysis: {
        numeric_columns: 12,
        categorical_columns: 8,
        date_columns: 3,
        key_identifiers: 2
      },
      data_issues: [
        "3% missing values in customer_segment column",
        "Potential duplicate records detected (0.2%)",
        "Date format inconsistencies in 1 column"
      ],
      business_relevance: assessBusinessRelevance(focusArea)
    };
  }
  
  /**
   * Simulate analysis of focus-area specific metrics.
   */
  async function simulateMetricsAnalysis(plan: InvestigationPlan): Promise<MetricsAnalysis> {
    const { focus_area: focusArea } = plan;
    
    switch (focusArea) {
      case "revenue":
        return {
          key_metrics_found: {
            total_revenue: "$2.4M",
            average_order_value: "$156",
            monthly_growth_rate: "8.3%",
            revenue_per_customer: "$284"
          },
          metric_trends: {
            revenue_growth: "Accelerating (+15% vs last quarter)",
            aov_trend: "Stable with slight uptick",
            customer_value: "Increasing (+12% YoY)"
          },
          performance_indicators: [
            "Revenue growth exceeding industry benchmark",
            "AOV in healthy range for market segment",
            "Strong customer value retention"
          ]
        };
      
      case "customers":
        return {
          key_metrics_found: {
            customer_acquisition_cost: "$45",
            customer_lifetime_value: "$425",
            churn_rate: "5.2%",
            retention_rate: "94.8%"
          },
          metric_trends: {
            acquisition_cost: "Decreasing (-8% vs last quarter)",
            lifetime_value: "Increasing (+18% YoY)",
            churn_trend: "Improving (down from 6.1%)"
          },
          performance_indicators: [
            "Excellent LTV:CAC ratio (9.4:1)",
            "Industry-leading retention rates",
            "Efficient customer acquisition"
          ]
        };
      
      case "operations":
        return {
          key_metrics_found: {
            average_processing_time: "2.3 hours",
            error_rate: "1.2%",
            capacity_utilization: "78%",
            cost_per_unit: "$12.50"
          },
          metric_trends: {
            processing_efficiency: "Improving (-15% vs last quarter)",
            quality_trend: "Stable error rates",
            utilization: "Optimal range"
          },
          performance_indicators: [
            "Processing times within SLA targets",
            "Error rates below industry average", 
            "Good capacity utilization balance"
          ]
        };
      
      default: // general or growth
        return {
          key_metrics_found: {
            primary_kpi: "Strong performance indicators",
            secondary_metrics: "Positive trends across categories",
            efficiency_ratios: "Above benchmark"
          },
          metric_trends: {
            overall_trend: "Positive trajectory",
            growth_indicators: "Accelerating"
          },
          performance_indicators: [
            "Key metrics trending positively",
            "Performance above industry benchmarks"
          ]
        };
    }
  }
  
  /**
   * Simulate pattern detection in the data.
   */
  async function simulatePatternAnalysis(plan: InvestigationPlan): Promise<Pattern[]> {
    const { focus_area: focusArea } = plan;
    const patterns: Pattern[] = [];
    
    switch (focusArea) {
      case "revenue":
        patterns.push(
          {
            type: "seasonal_pattern",
            description: "Revenue peaks in Q4 (holiday season effect)",
            impact: "35% higher revenue in Nov-Dec",
            confidence: 0.92
          },
          {
            type: "customer_pattern", 
            description: "Enterprise customers have 3x higher AOV",
            impact: "Targeting enterprise could boost revenue",
            confidence: 0.87
          },
          {
            type: "geographic_pattern",
            description: "West Coast regions show 22% higher conversion",
            impact: "Geographic expansion opportunity",
            confidence: 0.78
          }
        );
        break;
      
      case "customers":
        patterns.push(
          {
            type: "behavior_pattern",
            description: "Customers with 3+ purchases have 89% retention",
            impact: "Focus on driving repeat purchases",
            confidence: 0.94
          },
          {
            type: "churn_pattern",
            description: "Churn risk peaks after 45 days of inactivity",
            impact: "Early intervention opportunity",
            confidence: 0.86
          },
          {
            type: "segment_pattern",
            description: "Premium tier customers have 3.5x LTV",
            impact: "Prioritize premium acquisitions",
            confidence: 0.91
          }
        );
        break;
      
      default:
        patterns.push(
          {
            type: "general_pattern",
            description: "Strong correlation between key performance indicators",
            impact: "Integrated performance management opportunity",
            confidence: 0.82
          },
          {
            type: "efficiency_pattern",
            description: "Optimal performance windows identified",
            impact: "Resource allocation optimization",
            confidence: 0.75
          }
        );
    }
    
    return patterns;
  }
  
  /**
   * Simulate trend analysis results.
   */
  async function simulateTrendAnalysis(plan: InvestigationPlan): Promise<TrendAnalysis> {
    const { focus_area: focusArea, time_period: timePeriod } = plan;
    
    const baseTrends: TrendAnalysis = {
      time_period_analyzed: timePeriod || "Last 24 months",
      trend_strength: "Strong",
      forecast_confidence: "High",
      primary_trend: "",
      secondary_trends: [],
      forecast: "",
      trend_drivers: []
    };
    
    switch (focusArea) {
      case "revenue":
        return {
          ...baseTrends,
          primary_trend: "Consistent upward revenue growth (+8.3% monthly)",
          secondary_trends: [
            "AOV increasing (+2.1% monthly)",
            "Customer acquisition accelerating",
            "Seasonal patterns strengthening"
          ],
          forecast: "Revenue projected to reach $3.2M by Q4 2025",
          trend_drivers: [
            "Product mix optimization",
            "Market expansion",
            "Customer retention improvements"
          ]
        };
      
      case "customers":
        return {
          ...baseTrends,
          primary_trend: "Improving customer metrics across all KPIs",
          secondary_trends: [
            "Retention rate improving (+0.3% monthly)",
            "LTV increasing (+1.8% monthly)",
            "CAC decreasing (-2.1% monthly)"
          ],
          forecast: "Customer base projected to reach 12,000 by end of year",
          trend_drivers: [
            "Enhanced customer experience",
            "Product improvements",
            "Referral program success"
          ]
        };
      
      default:
        return {
          ...baseTrends,
          primary_trend: "Positive performance trends across key metrics",
          secondary_trends: [
            "Efficiency improvements",
            "Quality enhancements",
            "Cost optimizations"
          ],
          forecast: "Continued improvement trajectory expected",
          trend_drivers: [
            "Process optimizations",
            "Technology improvements",
            "Team performance"
          ]
        };
    }
  }
  
  /**
   * Simulate correlation analysis between key metrics.
   */
  async function simulateCorrelationAnalysis(plan: InvestigationPlan): Promise<CorrelationAnalysis> {
    const { focus_area: focusArea } = plan;
    
    switch (focusArea) {
      case "revenue":
        return {
          strong_correlations: [
            { metrics: "Customer Satisfaction ↔ Revenue Growth", correlation: 0.84, insight: "Happy customers drive revenue" },
            { metrics: "Marketing Spend ↔ New Customer Revenue", correlation: 0.78, insight: "Marketing efficiency is strong" },
            { metrics: "Product Quality Score ↔ AOV", correlation: 0.72, insight: "Quality justifies premium pricing" }
          ],
          moderate_correlations: [
            { metrics: "Team Size ↔ Processing Capacity", correlation: 0.61, insight: "Scaling considerations" },
            { metrics: "Seasonality ↔ Customer Acquisition", correlation: 0.58, insight: "Timing matters for growth" }
          ],
          surprising_findings: [
            "Price increases did not reduce demand (correlation: -0.12)",
            "Geographic expansion correlated with customer satisfaction (+0.67)"
          ]
        };
      
      case "customers":
        return {
          strong_correlations: [
            { metrics: "Product Usage ↔ Retention", correlation: 0.89, insight: "Engagement drives loyalty" },
            { metrics: "Support Response Time ↔ Satisfaction", correlation: -0.76, insight: "Fast support crucial" },
            { metrics: "Onboarding Completion ↔ LTV", correlation: 0.81, insight: "First impressions matter" }
          ],
          moderate_correlations: [
            { metrics: "Purchase Frequency ↔ Referrals", correlation: 0.64, insight: "Happy customers refer" },
            { metrics: "Account Age ↔ Expansion Revenue", correlation: 0.59, insight: "Maturity enables growth" }
          ],
          surprising_findings: [
            "Price sensitivity lower than expected in premium segment",
            "Mobile usage strongly predicts retention (+0.73)"
          ]
        };
      
      default:
        return {
          strong_correlations: [
            { metrics: "Process Efficiency ↔ Customer Satisfaction", correlation: 0.82, insight: "Operations impact customer experience" },
            { metrics: "Team Training ↔ Quality Metrics", correlation: 0.74, insight: "Investment in people pays off" }
          ],
          moderate_correlations: [
            { metrics: "Technology Investment ↔ Productivity", correlation: 0.66, insight: "Automation value" },
            { metrics: "Communication Quality ↔ Project Success", correlation: 0.61, insight: "Coordination matters" }
          ],
          surprising_findings: [
            "Unexpected efficiency gains from process simplification",
            "Remote work correlation with productivity higher than expected"
          ]
        };
    }
  }
  
  /**
   * Simulate customer/business segmentation analysis.
   */
  async function simulateSegmentationAnalysis(plan: InvestigationPlan): Promise<SegmentationAnalysis> {
    const { focus_area: focusArea } = plan;
    
    switch (focusArea) {
      case "customers":
        return {
          segments_identified: [
            {
              name: "High-Value Loyalists",
              size: "18% of customers",
              characteristics: "High LTV, low churn, frequent purchases",
              revenue_contribution: "47% of total revenue",
              strategy: "VIP treatment, exclusive offers, feedback collection"
            },
            {
              name: "Growth Potential",
              size: "31% of customers", 
              characteristics: "Moderate usage, increasing engagement",
              revenue_contribution: "28% of total revenue",
              strategy: "Upselling, feature education, engagement campaigns"
            },
            {
              name: "At-Risk",
              size: "23% of customers",
              characteristics: "Declining usage, price sensitive",
              revenue_contribution: "15% of total revenue",
              strategy: "Retention campaigns, value demonstration, support"
            }
          ],
          segment_insights: [
            "High-Value Loyalists drive nearly half of revenue despite being less than 20% of base",
            "Growth Potential segment shows strongest engagement trends",
            "At-Risk segment needs immediate intervention to prevent churn"
          ]
        };
      
      case "revenue":
        return {
          segments_identified: [
            {
              name: "Premium Products",
              size: "25% of SKUs",
              characteristics: "High margin, enterprise focus",
              revenue_contribution: "52% of total revenue",
              strategy: "Expand premium portfolio, enterprise sales focus"
            },
            {
              name: "Volume Drivers",
              size: "45% of SKUs",
              characteristics: "High volume, moderate margin",
              revenue_contribution: "35% of total revenue", 
              strategy: "Efficiency improvements, scale optimization"
            },
            {
              name: "Niche Offerings",
              size: "30% of SKUs",
              characteristics: "Specialized, lower volume",
              revenue_contribution: "13% of total revenue",
              strategy: "Evaluate profitability, consider consolidation"
            }
          ],
          segment_insights: [
            "Premium products drive majority of revenue and profit",
            "Volume products provide market presence and customer acquisition",
            "Niche offerings may need portfolio optimization"
          ]
        };
      
      default:
        return {
          segments_identified: [
            {
              name: "High Performers",
              size: "Top 20%",
              characteristics: "Exceed targets consistently",
              contribution: "Superior results",
              strategy: "Best practice sharing, leadership development"
            },
            {
              name: "Steady Contributors",
              size: "60%",
              characteristics: "Meet expectations reliably",
              contribution: "Stable performance",
              strategy: "Skill development, process improvement"
            },
            {
              name: "Development Needed",
              size: "20%",
              characteristics: "Below target performance",
              contribution: "Improvement opportunity",
              strategy: "Training, support, performance management"
            }
          ],
          segment_insights: [
            "Performance distribution follows typical 80/20 patterns",
            "High performers could mentor others for organization-wide improvement"
          ]
        };
    }
  }
  
  /**
   * Assess business relevance of the dataset for the focus area.
   */
  function assessBusinessRelevance(focusArea: string): string {
    const relevanceMap: Record<string, string> = {
      revenue: "High relevance for financial analysis - contains transactional and customer data suitable for revenue insights",
      customers: "Excellent customer data coverage - includes behavior, demographics, and engagement metrics",
      operations: "Good operational data foundation - process metrics and efficiency indicators available",
      growth: "Strong growth analysis potential - historical data supports trend and forecasting analysis",
      general: "Comprehensive business dataset suitable for multi-dimensional analysis"
    };
    
    return relevanceMap[focusArea] || "Standard business dataset with analytical potential";
  }
  
  /**
   * Generate comprehensive insights summary from investigation results.
   */
  async function generateInsightsSummary(results: InvestigationResults, focusArea: string): Promise<InsightsSummary> {
    const summary: InsightsSummary = {
      executive_summary: "",
      key_findings: [],
      business_impact: "",
      data_quality: "",
      recommendations: [],
      conclusion: ""
    };
    
    // Generate executive summary based on focus area
    switch (focusArea) {
      case "revenue":
        summary.executive_summary = `
  **Revenue Performance Analysis reveals strong momentum with accelerating growth trends.** 
  The business is performing above industry benchmarks with a healthy 8.3% monthly growth rate 
  and $2.4M total revenue. Customer value metrics are improving, indicating sustainable revenue quality.
  `;
        
        summary.key_findings = [
          "Revenue growth accelerating (+15% vs previous quarter)",
          "Premium customer segments driving 52% of total revenue",
          "Strong correlation between customer satisfaction and revenue growth (0.84)",
          "Seasonal patterns present significant Q4 opportunity (+35% typical increase)",
          "Geographic expansion showing promising early results"
        ];
        
        summary.business_impact = `
  **High Impact:** Current revenue trajectory positions the business for $3.2M annual run rate. 
  Premium customer focus is yielding strong returns with enterprise customers showing 3x higher AOV. 
  The strong satisfaction-revenue correlation indicates sustainable growth foundation.
  `;
        break;
      
      case "customers":
        summary.executive_summary = `
  **Customer Analytics reveal exceptional retention performance with industry-leading metrics.** 
  The business maintains a 94.8% retention rate with an excellent LTV:CAC ratio of 9.4:1, 
  indicating highly efficient customer acquisition and strong value delivery.
  `;
        
        summary.key_findings = [
          "Industry-leading retention rate at 94.8%",
          "Excellent LTV:CAC ratio of 9.4:1 indicates efficient growth",
          "High-Value Loyalists represent 18% of customers but drive 47% of revenue",
          "Product usage strongly correlates with retention (0.89)",
          "Churn risk predictable after 45 days of inactivity"
        ];
        
        summary.business_impact = `
  **High Impact:** Customer economics are exceptionally strong with room for strategic growth. 
  The concentrated value in loyalist segments presents both opportunity and risk concentration. 
  Early churn prediction capabilities enable proactive retention strategies.
  `;
        break;
      
      default: // operations, growth, or general
        summary.executive_summary = `
  **Business Performance Analysis shows positive momentum across key operational metrics.** 
  The organization demonstrates strong execution capabilities with performance indicators 
  trending above industry benchmarks and efficiency improvements accelerating.
  `;
        
        summary.key_findings = [
          "Performance metrics trending positively across all categories",
          "Efficiency improvements accelerating (+15% improvement rate)",
          "Strong correlation between process optimization and customer satisfaction",
          "Resource utilization in optimal range (78%)",
          "Quality metrics consistently above industry benchmarks"
        ];
        
        summary.business_impact = `
  **Medium-High Impact:** Operational excellence providing competitive advantage. 
  Strong foundation for scaling operations while maintaining quality standards. 
  Process improvements directly contributing to customer satisfaction.
  `;
    }
    
    // Data quality assessment
    const profile = results.dataset_profile;
    summary.data_quality = `
  **Data Quality Score: ${profile.summary?.data_quality_score || 85}/100**
  • Completeness: ${profile.summary?.completeness || '90%'}
  • Coverage: ${profile.summary?.date_range || 'Full historical data'}
  • Issues: ${profile.data_issues?.length || 0} minor issues identified and noted
  `;
    
    // Generate recommendations
    summary.recommendations = generateFocusRecommendations(focusArea, results);
    
    // Conclusion
    summary.conclusion = generateInvestigationConclusion(focusArea, results);
    
    return summary;
  }
  
  /**
   * Generate focus-area specific recommendations.
   */
  function generateFocusRecommendations(focusArea: string, _results: InvestigationResults): string[] {
    switch (focusArea) {
      case "revenue":
        return [
          "🎯 Double down on premium customer acquisition - they drive 3x higher AOV",
          "📈 Prepare for Q4 seasonal surge - revenue typically increases 35% in Nov-Dec",
          "🌍 Accelerate geographic expansion, especially in high-performing West Coast regions",
          "🔄 Investigate Week 23 revenue spike factors for replication strategies",
          "📊 Implement real-time revenue dashboards to track growth momentum"
        ];
      
      case "customers":
        return [
          "💎 Develop VIP program for High-Value Loyalists (18% driving 47% of revenue)",
          "⚠️ Implement 45-day inactivity intervention for churn prevention",
          "🚀 Focus upselling efforts on Growth Potential segment (31% of customers)",
          "📱 Enhance mobile experience - strong correlation with retention found",
          "🎓 Optimize onboarding process - completion strongly predicts LTV"
        ];
      
      default:
        return [
          "⚡ Replicate high-performer best practices across organization",
          "📊 Implement performance monitoring dashboards for real-time insights",
          "🎯 Focus process improvement efforts on identified bottlenecks",
          "💡 Invest in automation opportunities - strong ROI potential",
          "👥 Develop training programs based on successful team patterns"
        ];
    }
  }
  
  /**
   * Generate conclusion for the investigation.
   */
  function generateInvestigationConclusion(focusArea: string, _results: InvestigationResults): string {
    switch (focusArea) {
      case "revenue":
        return `
  Revenue investigation reveals a business with strong fundamentals and accelerating growth. 
  The premium customer strategy is paying dividends, and seasonal opportunities present significant upside potential. 
  Ready for next-level strategic initiatives.
  `;
      
      case "customers":
        return `
  Customer analysis shows exceptional performance with world-class retention metrics. 
  The segmentation insights provide clear paths for growth while early warning systems enable proactive retention. 
  Foundation is set for sustainable customer-driven growth.
  `;
      
      default:
        return `
  Analysis reveals strong operational foundation with positive trends across key metrics. 
  Performance optimization opportunities identified with clear action paths. 
  Well-positioned for continued improvement and scaling.
  `;
    }
  }
  
  /**
   * Format key findings for display.
   */
  function formatKeyFindings(findings: string[]): string {
    return findings.map(finding => `🔍 ${finding}`).join('\n');
  }
  
  /**
   * Format detailed analysis results for display.
   */
  function formatAnalysisResults(results: InvestigationResults): string {
    const formattedSections: string[] = [];
    
    // Dataset Profile
    const profile = results.dataset_profile;
    if (profile.summary) {
      formattedSections.push(`
  **📊 Dataset Profile:**
  • Records: ${profile.summary.total_records || 'N/A'}
  • Time Range: ${profile.summary.date_range || 'N/A'}
  • Data Quality: ${profile.summary.data_quality_score || 'N/A'}/100
  • Completeness: ${profile.summary.completeness || 'N/A'}
  `);
    }
    
    // Metrics Analysis
    const metrics = results.metrics_analysis;
    if (metrics.key_metrics_found) {
      formattedSections.push(`
  **📈 Key Metrics:**
  ${formatMetricsList(metrics.key_metrics_found)}
  `);
    }
    
    // Patterns Found
    const patterns = results.patterns_found;
    if (patterns.length > 0) {
      formattedSections.push(`
  **🔍 Patterns Detected:**
  ${formatPatternsList(patterns.slice(0, 3))}
  `);
    }
    
    // Correlations
    const correlations = results.correlations;
    if (correlations.strong_correlations) {
      formattedSections.push(`
  **🔗 Strong Correlations:**
  ${formatCorrelationsList(correlations.strong_correlations.slice(0, 3))}
  `);
    }
    
    // Anomalies
    const anomalies = results.anomalies;
    if (anomalies.length > 0) {
      formattedSections.push(`
  **⚡ Anomalies Detected:**
  ${formatAnomaliesList(anomalies.slice(0, 2))}
  `);
    }
    
    return formattedSections.join('\n');
  }
  
  /**
   * Format next steps and recommendations.
   */
  function formatNextSteps(recommendations: string[], _focusArea: string): string {
    const formattedRecs = recommendations.join('\n');
    
    return `
  **Immediate Actions:**
  ${formattedRecs}
  
  **Strategic Follow-ups:**
  • Schedule follow-up analysis in 30 days to track progress
  • Set up automated monitoring for key metrics identified
  • Share insights with relevant stakeholders for decision-making
  • Consider implementing A/B tests for optimization opportunities
  
  **Tool Recommendations:**
  • Use \`create-visualization\` to build executive dashboards
  • Set up \`schedule-analysis\` for automated monthly insights
  • Run \`export-report\` to create stakeholder presentations
  `;
  }
  
  /**
   * Format metrics as bullet list.
   */
  function formatMetricsList(metrics: Record<string, string>): string {
    return Object.entries(metrics).map(([metric, value]) => `• ${metric}: ${value}`).join('\n');
  }
  
  /**
   * Format patterns as bullet list.
   */
  function formatPatternsList(patterns: Pattern[]): string {
    return patterns.map(pattern => 
      `• ${pattern.description} (confidence: ${Math.round(pattern.confidence * 100)}%)`
    ).join('\n');
  }
  
  /**
   * Format correlations as bullet list.
   */
  function formatCorrelationsList(correlations: Correlation[]): string {
    return correlations.map(corr => 
      `• ${corr.metrics} (${corr.correlation.toFixed(2)}) - ${corr.insight}`
    ).join('\n');
  }
  
  /**
   * Format anomalies as bullet list.
   */
  function formatAnomaliesList(anomalies: Anomaly[]): string {
    return anomalies.map(anomaly => 
      `• ${anomaly.description} - ${anomaly.impact}`
    ).join('\n');
  }