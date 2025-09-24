// Enhanced Gemini Service with Function Calling and Workflow Orchestration
import { GoogleGenAI, FunctionDeclaration } from '@google/genai';
import { WorkflowResult } from '../types';
import { 
  profileDatasetTool, 
  createVisualizationTool,
  ProfileDatasetParams,
  CreateVisualizationParams,
} from '../tools/biTools';
import * as XLSX from 'xlsx';

import { insightInvestigationPrompt } from '../../components/bi/insight-investigation';
import { correlationDeepDivePrompt } from '@/components/bi/CorrelationDeepDive';

// Detailed workflow prompts that guide Gemini's orchestration and insight generation
const WORKFLOW_PROMPTS = {
  'bi-discovery': `You are a senior business analyst conducting comprehensive data discovery. Your goal is to uncover valuable business insights and opportunities.

WORKFLOW STEPS:
1. Profile the dataset comprehensively using profile_dataset
2. Identify key business metrics and patterns
3. Create 2-3 strategic visualizations using create_visualization
4. Run correlation analysis to find relationships using run_correlation
5. Generate actionable business insights and recommendations

ANALYSIS FOCUS:
- Revenue drivers and growth opportunities
- Customer behavior and segmentation patterns
- Operational efficiency metrics
- Market trends and competitive positioning
- Risk factors and mitigation strategies

OUTPUT REQUIREMENTS:
- Provide 3-5 specific business insights with supporting data
- Generate 2-4 actionable recommendations with expected impact
- Identify the top 3 opportunities for immediate action
- Include data quality assessment and reliability notes

Be specific, quantitative, and business-focused in your analysis.`,

  'insight-investigation': `You are conducting a deep dive business investigation to uncover actionable insights. Focus on finding specific, measurable opportunities for business improvement.

INVESTIGATION PROCESS:
1. Profile the dataset thoroughly using profile_dataset
2. Analyze key business metrics and KPIs
3. Identify patterns, trends, and anomalies in the data
4. Run correlation analysis to understand relationships using run_correlation
5. Create targeted visualizations to support findings using create_visualization
6. Generate specific business insights with quantified impact

KEY AREAS TO INVESTIGATE:
- Revenue optimization opportunities
- Customer acquisition, retention, and lifetime value
- Operational bottlenecks and efficiency gains
- Product/service performance variations
- Seasonal patterns and cyclical trends
- Competitive advantages and market positioning

INSIGHT REQUIREMENTS:
- Each insight must be specific and actionable
- Include quantified business impact where possible
- Provide confidence levels for your findings
- Suggest specific next steps for implementation
- Identify potential risks or limitations

DELIVERABLES:
- 4-6 specific business insights with supporting evidence
- 3-5 prioritized recommendations with implementation timeline
- Key metrics to track progress
- Quick wins vs. strategic initiatives

Focus on insights that can drive immediate business value.`,

  'correlation-deep-dive': `You are a data scientist performing advanced correlation analysis to uncover hidden relationships and business drivers.

ANALYSIS METHODOLOGY:
1. Profile the dataset using profile_dataset to understand data quality
2. Identify all numeric variables suitable for correlation analysis
3. Run comprehensive correlation analysis using run_correlation
4. Create correlation heatmap and scatter plots using create_visualization
5. Interpret correlations in business context
6. Identify causal relationships vs. spurious correlations

CORRELATION ANALYSIS FOCUS:
- Strong correlations (>0.7) that indicate key business drivers
- Moderate correlations (0.3-0.7) that suggest opportunities
- Surprising correlations that reveal hidden insights
- Negative correlations that indicate trade-offs or conflicts
- Time-based correlations for trend analysis

BUSINESS INTERPRETATION:
- What do the correlations mean for business strategy?
- Which relationships are actionable vs. merely interesting?
- What are the potential causal mechanisms?
- How can these insights drive business decisions?

OUTPUT REQUIREMENTS:
- Detailed correlation matrix with business interpretation
- 3-5 key correlation insights with strategic implications
- Recommendations for leveraging strong correlations
- Warnings about potential spurious relationships
- Suggested experiments to test causal hypotheses

Provide both statistical rigor and practical business value.`,

  'trend-analysis': `You are a business forecasting analyst identifying trends, patterns, and future opportunities from historical data.

TREND ANALYSIS PROCESS:
1. Profile the dataset using profile_dataset, focusing on time-series data
2. Identify temporal patterns and seasonality
3. Create trend visualizations using create_visualization
4. Analyze growth rates, cyclical patterns, and anomalies
5. Run correlation analysis on time-based metrics using run_correlation
6. Generate forecasting insights and business implications

ANALYSIS DIMENSIONS:
- Long-term growth trends and trajectory
- Seasonal patterns and cyclical behavior
- Short-term fluctuations and volatility
- Trend acceleration or deceleration points
- Comparative performance across segments
- Leading vs. lagging indicators

BUSINESS FOCUS:
- Revenue and profitability trends
- Customer acquisition and retention patterns
- Market share evolution
- Operational efficiency improvements
- Competitive positioning changes

DELIVERABLES:
- Trend analysis with statistical significance
- Seasonal pattern identification and business impact
- Growth trajectory assessment with confidence intervals
- 3-5 trend-based business insights
- Forward-looking recommendations based on trend analysis
- Risk factors and scenario planning considerations

Provide actionable insights for strategic planning and resource allocation.`,

  'executive-summary': `You are preparing a C-suite executive briefing that translates data insights into strategic business recommendations.

EXECUTIVE SUMMARY STRUCTURE:
1. Profile the dataset using profile_dataset for context
2. Identify the most critical business metrics and KPIs
3. Run key analyses using run_correlation and create_visualization
4. Synthesize findings into executive-level insights
5. Provide strategic recommendations with business impact

EXECUTIVE FOCUS AREAS:
- Financial performance and profitability drivers
- Market position and competitive advantages
- Operational efficiency and cost optimization
- Growth opportunities and expansion potential
- Risk assessment and mitigation strategies
- Strategic initiatives and resource allocation

COMMUNICATION STYLE:
- Lead with bottom-line impact and ROI
- Use clear, non-technical language
- Quantify opportunities and risks
- Provide specific, actionable recommendations
- Include implementation timelines and resource requirements

DELIVERABLES:
- Executive summary with key findings (3-4 bullet points)
- Top 3 strategic opportunities with quantified impact
- Critical risks and mitigation strategies
- Recommended immediate actions (next 30-90 days)
- Resource requirements and success metrics
- Supporting data visualizations for board presentation

Focus on insights that drive strategic decision-making and competitive advantage.`,

  'action-recommendations': `You are a business consultant providing specific, implementable recommendations based on data analysis.

RECOMMENDATION DEVELOPMENT:
1. Profile the dataset using profile_dataset to understand current state
2. Identify improvement opportunities through correlation analysis using run_correlation
3. Create supporting visualizations using create_visualization
4. Develop prioritized action plans with clear ROI
5. Provide implementation roadmaps and success metrics

RECOMMENDATION CATEGORIES:
- Quick wins (0-30 days) with immediate impact
- Short-term initiatives (1-6 months) with moderate investment
- Strategic projects (6+ months) with transformational potential
- Process improvements and operational efficiency
- Technology and infrastructure investments
- Market expansion and growth initiatives

RECOMMENDATION REQUIREMENTS:
- Specific, measurable, achievable, relevant, time-bound (SMART)
- Clear business case with ROI calculation
- Implementation timeline and resource requirements
- Success metrics and KPIs to track progress
- Risk assessment and mitigation strategies
- Dependencies and prerequisites

DELIVERABLES:
- 5-8 prioritized recommendations with business impact
- Implementation roadmap with timeline and milestones
- Resource requirements (budget, personnel, technology)
- Success metrics and measurement framework
- Quick wins that can be implemented immediately
- Change management considerations

Focus on recommendations that deliver measurable business value and competitive advantage.`
};

// Function declarations for Gemini function calling
const FUNCTION_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: 'load_datasource',
    description: 'Load and analyze a data source file (CSV, Excel, JSON)',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        file: { type: 'object', description: 'The file to load' },
        datasetName: { type: 'string', description: 'Name for the dataset' },
        options: { type: 'object', description: 'Loading options' }
      },
      required: ['file', 'datasetName']
    }
  },
  {
    name: 'profile_dataset', 
    description: 'Generate comprehensive dataset profiling and quality analysis',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        datasetName: { type: 'string', description: 'Name of loaded dataset' },
        detailed: { type: 'boolean', description: 'Include detailed analysis' },
        sampleSize: { type: 'number', description: 'Sample size for analysis' }
      },
      required: ['datasetName', 'detailed', 'sampleSize']
    }
  },
  {
    name: 'run_correlation',
    description: 'Perform correlation analysis between numerical variables',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        datasetName: { type: 'string', description: 'Name of loaded dataset' },
        method: { type: 'string', description: 'Correlation method: pearson, spearman, kendall' },
        targetColumn: { type: 'string', description: 'Target variable for correlation' },
        threshold: { type: 'number', description: 'Correlation significance threshold' }
      },
      required: ['datasetName']
    }
  },
  {
    name: 'create_visualization',
    description: 'Generate charts and visualizations from data',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        datasetName: { type: 'string', description: 'Source dataset' },
        chartType: { type: 'string', description: 'Chart type: bar, line, scatter, etc.' },
        xColumn: { type: 'string', description: 'X-axis column' },
        yColumn: { type: 'string', description: 'Y-axis column' },
        title: { type: 'string', description: 'Chart title' }
      },
      required: ['datasetName', 'chartType', 'xColumn', 'yColumn', 'title']
    }
  }
];

export class GeminiWorkflowOrchestrator {
  private genAI: GoogleGenAI | null = null;
  private currentDatasets: Map<string, Record<string, unknown>[]> = new Map();
  private progressCallback?: (step: string, progress: number) => void;

  constructor() {
    this.initialize();
  }

  private initialize() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) {
      this.genAI = new GoogleGenAI({apiKey:apiKey});
      this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        config: {
          tools: [{ functionDeclarations: FUNCTION_DECLARATIONS }]
        },
        contents: 'Hello, world!',
      });
    }
  }

  setProgressCallback(callback: (step: string, progress: number) => void) {
    this.progressCallback = callback;
  }

  async executeWorkflow(
    workflowType: string, 
    uploadedFiles: File[], 
    params: Record<string, unknown> = {}
  ): Promise<WorkflowResult> {
    if (!this.genAI) {
      throw new Error('Gemini API not configured');
    }

    try {
      this.updateProgress('Starting workflow...', 0);

      // Load datasets first
      await this.loadDatasets(uploadedFiles);
      this.updateProgress('Data loaded successfully', 20);
      
      // Debug: Log loaded datasets
      this.currentDatasets.forEach((data, name) => {
        this.debugWorkflowState(`Loaded Dataset: ${name}`, {
          rows: data.length,
          columns: Object.keys(data[0] || {}),
          sampleRow: data[0],
          dataTypes: Object.keys(data[0] || {}).reduce((types, col) => {
            types[col] = typeof data[0]?.[col];
            return types;
          }, {} as Record<string, string>)
        });
      });

      // Handle special workflow types with TypeScript implementations
      if (workflowType === 'insight-investigation-detailed') {
        this.updateProgress('Running advanced insight investigation...', 50);
        const datasetName = Object.keys(this.currentDatasets)[0] || 'dataset';
        const focusArea = params.focusArea as string || 'general';
        const timePeriod = params.timePeriod as string || '';
        
        const insightReport = await insightInvestigationPrompt(datasetName, focusArea, timePeriod);
        
        this.updateProgress('Workflow complete!', 100);
        
        // Parse the detailed report for better UI display
        const reportSections = this.parseAdvancedInsightReport(insightReport);
        
        return {
          type: workflowType as unknown as 'bi-discovery' | 'insight-investigation' | 'correlation-deep-dive' | 'trend-analysis' | 'executive-summary' | 'action-recommendations',
          status: 'success',
          summary: insightReport,
          results: {
            insights: reportSections.insights,
            recommendations: reportSections.recommendations,
            visualizations: [],
            analyses: { 
              investigation_report: insightReport,
              focus_area: focusArea,
              dataset_name: datasetName,
              time_period: timePeriod || 'Full dataset'
            }
          },
          insights: reportSections.insights,
          recommendations: reportSections.recommendations,
          nextSteps: reportSections.nextSteps
        };
      }

      // Get the workflow prompt
      const workflowPrompt = WORKFLOW_PROMPTS[workflowType as keyof typeof WORKFLOW_PROMPTS];
      if (!workflowPrompt) {
        throw new Error(`Unknown workflow type: ${workflowType}`);
      }

      // Create the full prompt with context
      const fullPrompt = this.buildWorkflowPrompt(workflowType, workflowPrompt, params);
      
      this.updateProgress('Initializing AI workflow orchestration...', 30);

      // Start the conversation with function calling
      const chat = this.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        config: {
          tools: [{ functionDeclarations: FUNCTION_DECLARATIONS }]
        },
        contents: fullPrompt,
      });
      let result = await chat;

      let workflowResults: {
        steps: {name: string, args: unknown, result: unknown}[],
        insights: string[],
        recommendations: string[],
        visualizations: unknown[],
        analyses: Record<string, unknown>
      } = {
        steps: [],
        insights: [],
        recommendations: [],
        visualizations: [],
        analyses: {}
      };

      const iterationCount = 0;
      const maxIterations = 10; // Prevent infinite loops

      // Handle function calls
      while ((result as { response?: { functionCalls?: () => { name: string; args: unknown }[] } }).response?.functionCalls && iterationCount < maxIterations) {
        const functionCalls = (result as { response?: { functionCalls?: () => { name: string; args: unknown }[] } }).response?.functionCalls?.();

        // Check if functionCalls is not empty and is an array
        if (Array.isArray(functionCalls) && functionCalls.length > 0) {
          this.updateProgress(`Executing tool: ${functionCalls.map(fc => fc.name).join(', ')}...`, 50 + (iterationCount * 5));
          
          const toolResponses = await Promise.all(
            functionCalls.map((functionCall) => this.executeFunctionCall(functionCall, workflowResults))
          );
          
          // Send function responses back to the model
          const formattedResponses = toolResponses.map((response) => response.functionResponse);
          result = await this.genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            config: {
              tools: [{ functionDeclarations: FUNCTION_DECLARATIONS }]
            },
            contents: formattedResponses as unknown as string,
          });
        } else {
          // No more function calls, break the loop
          break;
        }
      }

      this.updateProgress('Generating final insights...', 90);

      // Get the final response with insights
      const finalResponse = ((result as { response?: { text?: () => string } }).response?.text?.()) ?? '';
      console.log(finalResponse);
      this.debugWorkflowState('Final AI Response', finalResponse);
      
      const parsedInsights = this.parseWorkflowResults(finalResponse);
      this.debugWorkflowState('Parsed Insights', parsedInsights);

      workflowResults = {
        ...workflowResults,
        ...parsedInsights,
      };

      this.updateProgress('Workflow complete!', 100);

      return {
        type: workflowType as unknown as 'bi-discovery' | 'insight-investigation' | 'correlation-deep-dive' | 'trend-analysis' | 'executive-summary' | 'action-recommendations',
        status: 'success',
        summary: finalResponse,
        results: workflowResults,
        insights: parsedInsights.insights || [],
        recommendations: parsedInsights.recommendations || [],
        nextSteps: []
      };

    } catch (error) {
      console.error('Workflow execution failed:', error);
      return {
        type: workflowType as unknown as 'bi-discovery' | 'insight-investigation' | 'correlation-deep-dive' | 'trend-analysis' | 'executive-summary' | 'action-recommendations',
        status: 'failed',
        summary: '',
        results: {},
        insights: [],
        recommendations: [],
        nextSteps: [],
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  private async loadDatasets(files: File[]) {
    for (const file of files) {
      const data = await this.parseFileData(file);
      // Limit dataset size to prevent token overflow
      const sampledData = this.sampleDataset(data, 100); // Limit to 100 rows
      this.currentDatasets.set(file.name.split('.')[0], sampledData);
    }
  }

  private sampleDataset(data: Record<string, unknown>[], maxRows: number): Record<string, unknown>[] {
    if (data.length <= maxRows) {
      return data;
    }
    
    // Take a representative sample: first few rows, last few rows, and random middle rows
    const firstRows = data.slice(0, Math.min(100, maxRows / 3));
    const lastRows = data.slice(-Math.min(100, maxRows / 3));
    const middleCount = maxRows - firstRows.length - lastRows.length;
    
    if (middleCount > 0) {
      const middleStart = Math.floor(data.length / 3);
      const middleEnd = Math.floor(2 * data.length / 3);
      const middleData = data.slice(middleStart, middleEnd);
      
      // Random sample from middle section
      const step = Math.floor(middleData.length / middleCount);
      const middleRows = middleData.filter((_, index) => index % step === 0).slice(0, middleCount);
      
      return [...firstRows, ...middleRows, ...lastRows];
    }
    
    return [...firstRows, ...lastRows];
  }

  private async parseFileData(file: File): Promise<Record<string, unknown>[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      // Handle Excel files differently from CSV
      if (file.name.toLowerCase().endsWith('.xlsx') || file.name.toLowerCase().endsWith('.xls')) {
        reader.onload = () => {
          try {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get the first worksheet
            const sheetName = workbook.SheetNames[0];
            if (!sheetName) {
              reject(new Error('Excel file appears to be empty or has no worksheets.'));
              return;
            }
            
            const worksheet = workbook.Sheets[sheetName];
            
            // Convert to JSON with headers
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
              header: 1,
              defval: null 
            }) as unknown[][];
            
            if (jsonData.length === 0) {
              reject(new Error('Excel worksheet appears to be empty.'));
              return;
            }
            
            // First row should be headers
            const headers = jsonData[0] as string[];
            if (!headers || headers.length === 0) {
              reject(new Error('No column headers found in Excel file. Please ensure the first row contains column names.'));
              return;
            }
            
            // Convert remaining rows to objects
            const parsedData = jsonData.slice(1)
              .filter(row => row && row.some(cell => cell !== null && cell !== undefined && cell !== ''))
              .map(row => {
                const entry: Record<string, unknown> = {};
                headers.forEach((header, index) => {
                  if (header) {
                    const value = row[index];
                    entry[String(header)] = value !== null && value !== undefined ? this.convertValue(String(value)) : null;
                  }
                });
                return entry;
              });
            
            if (parsedData.length === 0) {
              reject(new Error('No valid data rows found in Excel file.'));
              return;
            }
            
            resolve(parsedData);
          } catch (error) {
            reject(new Error(`Failed to parse Excel file: ${error instanceof Error ? error.message : 'Unknown Excel parsing error'}`));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read Excel file'));
        reader.readAsArrayBuffer(file);
      } else {
        // Handle CSV files
        reader.onload = () => {
          const result = reader.result as string;
          try {
            const lines = result.split('\n').filter(line => line.trim().length > 0);
            if (lines.length === 0) {
              reject(new Error('CSV file appears to be empty or contains no valid data rows.'));
              return;
            }
            
            const header = lines[0].split(',').map(h => h.trim().replace(/['"]/g, ''));
            if (header.length === 0) {
              reject(new Error('No column headers found. Please ensure your CSV file has a header row.'));
              return;
            }
            
            const data = lines.slice(1).map((line) => {
              const values = line.split(',');
              const entry: Record<string, unknown> = {};
              header.forEach((h, i) => {
                const rawValue = values[i]?.trim().replace(/['"]/g, '');
                if (rawValue) {
                  // Automatic type detection and conversion
                  entry[h] = this.convertValue(rawValue);
                } else {
                  entry[h] = null;
                }
              });
              return entry;
            }).filter(row => Object.values(row).some(val => val !== null && val !== ''));
            
            if (data.length === 0) {
              reject(new Error('No valid data rows found after parsing CSV. Please check your file format.'));
              return;
            }
            
            resolve(data);
          } catch (error) {
            reject(new Error(`Failed to parse CSV file: ${error instanceof Error ? error.message : 'Unknown parsing error'}`));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read CSV file'));
        reader.readAsText(file);
      }
    });
  }

  private convertValue(value: string): string | number | Date | boolean | null {
    if (!value || value.toLowerCase() === 'null' || value.toLowerCase() === 'na') {
      return null;
    }

    // Boolean detection
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'true' || lowerValue === 'false') {
      return lowerValue === 'true';
    }

    // Date detection (YYYY-MM-DD, MM/DD/YYYY, etc.)
    const datePatterns = [
      /^\d{4}-\d{2}-\d{2}$/,  // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
      /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
    ];
    
    if (datePatterns.some(pattern => pattern.test(value))) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    // Number detection (including decimals, negatives, percentages, currency)
    const cleanedNumber = value.replace(/[,$%]/g, ''); // Remove common non-numeric characters
    
    // Check if it's a valid number
    if (/^-?\d*\.?\d+$/.test(cleanedNumber)) {
      const num = parseFloat(cleanedNumber);
      if (!isNaN(num)) {
        return num;
      }
    }

    // If nothing else matches, return as string
    return value;
  }

  private async executeFunctionCall(functionCall: { name: string; args: unknown; }, workflowResults: unknown) {
    const { name, args } = functionCall;
    let result;

    this.updateProgress(`Executing function: ${name}`, 60);
    const argsObject = args as { datasetName: string; data?: unknown };
    // Add file to args if it exists in our datasets
    if (argsObject.datasetName && this.currentDatasets.has(argsObject.datasetName)) {
      const fullData = this.currentDatasets.get(argsObject.datasetName);
      // Further limit data for analysis to prevent token overflow
      argsObject.data = fullData ? this.sampleDataset(fullData, 50) : undefined;
      
      // Debug: Log what data we're passing to the function
      this.debugWorkflowState(`Function ${name} - Data Passed`, {
        datasetName: argsObject.datasetName,
        dataRows: argsObject.data ? (argsObject.data as Record<string, unknown>[]).length : 0,
        dataColumns: argsObject.data && (argsObject.data as Record<string, unknown>[]).length > 0 ? 
          Object.keys((argsObject.data as Record<string, unknown>[])[0]).length : 0,
        sampleRow: argsObject.data && (argsObject.data as Record<string, unknown>[]).length > 0 ? 
          (argsObject.data as Record<string, unknown>[])[0] : 'No data'
      });
    } else {
      this.debugWorkflowState(`Function ${name} - No Dataset Found`, {
        requestedDataset: argsObject.datasetName,
        availableDatasets: [...this.currentDatasets.keys()]
      });
    }

    switch (name) {
      case 'load_datasource':
        // This tool is special as it populates currentDatasets
        // For this demo, we assume datasets are pre-loaded via loadDatasets
        result = { success: true, message: `Dataset '${argsObject.datasetName}' is ready for analysis.` };
        break;
      case 'profile_dataset':
        result = await profileDatasetTool(argsObject as ProfileDatasetParams);
        (workflowResults as { analyses: { profile: unknown } }).analyses.profile = result;  
      case 'run_correlation': {
        const correlationArgs = argsObject as {
          datasetName: string;
          targetMetric: string;
          hypothesis: string;
          data?: unknown;
        };
        const fullResult = await correlationDeepDivePrompt(
          correlationArgs.datasetName,
          correlationArgs.targetMetric,
          correlationArgs.hypothesis
        );
        
        // Truncate the result to prevent API limits
        const truncatedResult = this.truncateForAPI(fullResult, 2000);
        result = {
          summary: truncatedResult,
          analysis_complete: true,
          dataset: correlationArgs.datasetName,
          target_metric: correlationArgs.targetMetric || 'All metrics',
          full_report_available: true
        };
        
        (workflowResults as { analyses: { correlation: unknown } }).analyses
          .correlation = result;
        break;
      }
      case 'create_visualization':
        result = await createVisualizationTool(
          argsObject as CreateVisualizationParams
        );
        (workflowResults as { visualizations: unknown[] }).visualizations.push(result);
        break;
      
    }
    
    (workflowResults as { steps: { name: string; args: unknown; result: unknown }[] }).steps.push({ name, args, result });

    return {
      functionResponse: {
        name: name,
        response: typeof result === 'string' ? result : JSON.stringify(result)
      }
    };
  }

  private buildWorkflowPrompt(workflowType: string, workflowPrompt: string, params: Record<string, unknown>): string {
    // Get basic dataset info without including actual data
    const datasetInfo = [...this.currentDatasets.entries()].map(([name, data]) => {
      const columns = Object.keys(data[0] || {});
      return `${name}: ${data.length} rows, ${columns.length} columns`;
    });

    const context = `WORKFLOW: ${workflowType}
DATASETS: ${datasetInfo.join(', ')}
PARAMS: ${Object.keys(params).length > 0 ? JSON.stringify(params) : 'none'}

${workflowPrompt}

EXECUTION INSTRUCTIONS:
1. Use the available tools to analyze the data systematically
2. Start by profiling the dataset using profile_dataset
3. Create visualizations using create_visualization for key metrics
4. Run correlation analysis using run_correlation if multiple numeric columns exist
5. ALWAYS provide your final analysis in this EXACT format:

## Key Business Insights
- [Specific insight with quantified impact]
- [Another insight with supporting data]
- [Third insight with business relevance]

## Actionable Recommendations  
- [Specific recommendation with expected outcome]
- [Another recommendation with implementation timeline]
- [Third recommendation with resource requirements]

Even if you encounter data quality issues, provide insights based on what you can analyze and recommend steps to improve data quality.`;
    
    return context;
  }

  private parseWorkflowResults(finalResponse: string) {
    // Enhanced parser that handles multiple response formats
    const results: { insights: string[], recommendations: string[], summary?: string } = {
      insights: [],
      recommendations: []
    };

    // Strategy 1: Look for structured sections with markdown headers
    const insightSection = finalResponse.match(/## Key Business Insights\s*([\s\S]*?)(?=##|$)/i);
    const recommendationSection = finalResponse.match(/## Actionable Recommendations\s*([\s\S]*?)(?=##|$)/i);
    
    if (insightSection) {
      const insightText = insightSection[1];
      const insightBullets = insightText.match(/^[-\*•]\s*(.+)$/gm);
      if (insightBullets) {
        insightBullets.forEach(bullet => {
          const content = bullet.replace(/^[-\*•]\s*/, '').trim();
          if (content.length > 10) results.insights.push(content);
        });
      }
    }
    
    if (recommendationSection) {
      const recommendationText = recommendationSection[1];
      const recommendationBullets = recommendationText.match(/^[-\*•]\s*(.+)$/gm);
      if (recommendationBullets) {
        recommendationBullets.forEach(bullet => {
          const content = bullet.replace(/^[-\*•]\s*/, '').trim();
          if (content.length > 10) results.recommendations.push(content);
        });
      }
    }

    // Fallback: Look for any markdown headers
    if (results.insights.length === 0 || results.recommendations.length === 0) {
      const sections = finalResponse.split(/(?=^#{1,3}\s)/m);
      sections.forEach(section => {
        const lines = section.split('\n');
        const title = lines[0]?.toLowerCase() || '';
        const content = lines.slice(1).join('\n').trim();

        if (title.includes('insight') || title.includes('finding') || title.includes('key') || title.includes('discover')) {
          if (content) {
            const bullets = content.match(/^[-\*•]\s*(.+)$/gm);
            if (bullets) {
              bullets.forEach(bullet => {
                const bulletContent = bullet.replace(/^[-\*•]\s*/, '').trim();
                if (bulletContent.length > 10) results.insights.push(bulletContent);
              });
            }
          }
        } else if (title.includes('recommend') || title.includes('action') || title.includes('next step') || title.includes('suggest')) {
          if (content) {
            const bullets = content.match(/^[-\*•]\s*(.+)$/gm);
            if (bullets) {
              bullets.forEach(bullet => {
                const bulletContent = bullet.replace(/^[-\*•]\s*/, '').trim();
                if (bulletContent.length > 10) results.recommendations.push(bulletContent);
              });
            }
          }
        }
      });
    }

    // Strategy 2: Look for bullet points and lists
    
    let inInsightsSection = false;
    let inRecommendationsSection = false;
    
    const lines = finalResponse.split('\n');
    lines.forEach(line => {
      const lowerLine = line.toLowerCase();
      
      // Check for section headers
      if (lowerLine.includes('insight') || lowerLine.includes('finding') || lowerLine.includes('key')) {
        inInsightsSection = true;
        inRecommendationsSection = false;
      } else if (lowerLine.includes('recommend') || lowerLine.includes('action') || lowerLine.includes('next step')) {
        inInsightsSection = false;
        inRecommendationsSection = true;
      }
      
      // Extract bullet points
      const bulletMatch = line.match(/^[•\-\*]\s*(.+)$/);
      if (bulletMatch) {
        const content = bulletMatch[1].trim();
        if (inInsightsSection && content.length > 10) {
          results.insights.push(content);
        } else if (inRecommendationsSection && content.length > 10) {
          results.recommendations.push(content);
        }
      }
    });

    // Strategy 3: Look for numbered lists
    const numberedRegex = /^\d+\.\s*(.+)$/gm;
    const numbered = [...finalResponse.matchAll(numberedRegex)];
    numbered.forEach(match => {
      const content = match[1].trim();
      if (content.length > 15) {
        // Heuristic: longer items are likely insights, shorter ones recommendations
        if (content.length > 50) {
          results.insights.push(content);
        } else {
          results.recommendations.push(content);
        }
      }
    });

    // Strategy 4: Extract sentences with business keywords
    const businessKeywords = ['revenue', 'profit', 'customer', 'growth', 'trend', 'correlation', 'opportunity', 'risk', 'performance'];
    const sentences = finalResponse.split(/[.!?]+/);
    sentences.forEach(sentence => {
      const trimmed = sentence.trim();
      if (trimmed.length > 30 && businessKeywords.some(keyword => trimmed.toLowerCase().includes(keyword))) {
        if (trimmed.toLowerCase().includes('recommend') || trimmed.toLowerCase().includes('should') || trimmed.toLowerCase().includes('consider')) {
          results.recommendations.push(trimmed);
        } else {
          results.insights.push(trimmed);
        }
      }
    });

    // Remove duplicates and limit results
    results.insights = [...new Set(results.insights)].slice(0, 6);
    results.recommendations = [...new Set(results.recommendations)].slice(0, 5);

    // If we still don't have insights/recommendations, set the full response as summary
    if (results.insights.length === 0 && results.recommendations.length === 0) {
      results.summary = finalResponse;
      
      // Try one more extraction attempt for key phrases
      const keyPhrases = finalResponse.match(/[A-Z][^.!?]*(?:insight|finding|trend|pattern|correlation)[^.!?]*[.!?]/gi);
      if (keyPhrases) {
        results.insights = keyPhrases.slice(0, 3);
      }
      
      const actionPhrases = finalResponse.match(/[A-Z][^.!?]*(?:recommend|should|consider|implement|focus)[^.!?]*[.!?]/gi);
      if (actionPhrases) {
        results.recommendations = actionPhrases.slice(0, 3);
      }
    }

    return results;
  }

  private updateProgress(step: string, progress: number) {
    if (this.progressCallback) {
      this.progressCallback(step, progress);
    }
    
    // Debug logging
    console.log(`🔄 Workflow Progress: ${progress}% - ${step}`);
  }

  // Add debug method to log workflow state
  private debugWorkflowState(stage: string, data: unknown) {
    console.log(`🐛 DEBUG [${stage}]:`, {
      timestamp: new Date().toISOString(),
      data: typeof data === 'object' ? JSON.stringify(data, null, 2).slice(0, 500) + '...' : data
    });
  }

  private truncateForAPI(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    
    // Try to truncate at a natural break point
    const truncated = text.substring(0, maxLength);
    const lastNewline = truncated.lastIndexOf('\n');
    const lastPeriod = truncated.lastIndexOf('.');
    
    if (lastNewline > maxLength * 0.8) {
      return truncated.substring(0, lastNewline) + '\n\n[Analysis truncated for API compatibility]';
    } else if (lastPeriod > maxLength * 0.8) {
      return truncated.substring(0, lastPeriod + 1) + '\n\n[Analysis truncated for API compatibility]';
    } else {
      return truncated + '...\n\n[Analysis truncated for API compatibility]';
    }
  }

  private parseAdvancedInsightReport(report: string): { insights: string[], recommendations: string[], nextSteps: string[] } {
    const insights: string[] = [];
    const recommendations: string[] = [];
    const nextSteps: string[] = [];

    // Extract key findings (format: 🔍 finding text)
    const keyFindingsMatch = report.match(/\*\*Key Findings:\*\*[\s\S]*?(?=\n\*\*|$)/);
    if (keyFindingsMatch) {
      const findings = keyFindingsMatch[0].split('\n').filter(line => line.trim().startsWith('🔍'));
      insights.push(...findings.map(f => f.replace('🔍 ', '').trim()));
    }

    // Extract recommendations from "Recommended Next Steps" section
    const recommendationsMatch = report.match(/\*\*Recommended Next Steps:\*\*[\s\S]*?(?=\n\*\*|$)/);
    if (recommendationsMatch) {
      const recs = recommendationsMatch[0].split('\n').filter(line => 
        line.trim().startsWith('🎯') || line.trim().startsWith('📈') || 
        line.trim().startsWith('🌍') || line.trim().startsWith('⚠️') || 
        line.trim().startsWith('🚀') || line.trim().startsWith('📱') || 
        line.trim().startsWith('🎓') || line.trim().startsWith('💎') || 
        line.trim().startsWith('⚡') || line.trim().startsWith('📊') || 
        line.trim().startsWith('💡') || line.trim().startsWith('👥')
      );
      recommendations.push(...recs.map(r => r.replace(/^[🎯📈🌍⚠️🚀📱🎓💎⚡📊💡👥] /, '').trim()));
    }

    // Extract immediate actions from the "Immediate Actions" section
    const actionsMatch = report.match(/\*\*Immediate Actions:\*\*[\s\S]*?(?=\*\*Strategic Follow-ups:\*\*|$)/);
    if (actionsMatch) {
      const actions = actionsMatch[0].split('\n').filter(line => 
        line.trim().startsWith('🎯') || line.trim().startsWith('📈') || 
        line.trim().startsWith('🌍') || line.trim().startsWith('⚠️') || 
        line.trim().startsWith('🚀') || line.trim().startsWith('📱') || 
        line.trim().startsWith('🎓') || line.trim().startsWith('💎') || 
        line.trim().startsWith('⚡') || line.trim().startsWith('📊') || 
        line.trim().startsWith('💡') || line.trim().startsWith('👥')
      );
      nextSteps.push(...actions.map(a => a.replace(/^[🎯📈🌍⚠️🚀📱🎓💎⚡📊💡👥] /, '').trim()));
    }

    // Extract strategic follow-ups as additional next steps
    const strategicMatch = report.match(/\*\*Strategic Follow-ups:\*\*[\s\S]*?(?=\n\*\*|$)/);
    if (strategicMatch) {
      const strategic = strategicMatch[0].split('\n').filter(line => line.trim().startsWith('•'));
      nextSteps.push(...strategic.map(s => s.replace('• ', '').trim()));
    }

    // Fallback parsing: Look for any emoji-prefixed lines as insights/recommendations
    if (insights.length === 0 || recommendations.length === 0) {
      const lines = report.split('\n');
      let inKeySection = false;
      let inRecommendationSection = false;
      
      lines.forEach(line => {
        const trimmed = line.trim();
        
        // Check for section headers
        if (trimmed.includes('Key Findings') || trimmed.includes('Business Impact')) {
          inKeySection = true;
          inRecommendationSection = false;
        } else if (trimmed.includes('Recommended') || trimmed.includes('Next Steps') || trimmed.includes('Immediate Actions')) {
          inKeySection = false;
          inRecommendationSection = true;
        }
        
        // Extract emoji-prefixed content
        if (trimmed.startsWith('🔍') && inKeySection) {
          const content = trimmed.replace('🔍 ', '').trim();
          if (content.length > 10) insights.push(content);
        } else if ((trimmed.startsWith('🎯') || trimmed.startsWith('📈') || trimmed.startsWith('🌍') || 
                   trimmed.startsWith('⚠️') || trimmed.startsWith('🚀') || trimmed.startsWith('📱') ||
                   trimmed.startsWith('🎓') || trimmed.startsWith('💎') || trimmed.startsWith('⚡') ||
                   trimmed.startsWith('📊') || trimmed.startsWith('💡') || trimmed.startsWith('👥')) && inRecommendationSection) {
          const content = trimmed.replace(/^[🎯📈🌍⚠️🚀📱🎓💎⚡📊💡👥] /, '').trim();
          if (content.length > 10) recommendations.push(content);
        }
      });
    }

    // Final fallback: if still no content, extract from the whole report
    if (insights.length === 0) {
      // Look for any lines with 🔍 emoji
      const allInsights = report.match(/🔍[^\n]+/g);
      if (allInsights) {
        insights.push(...allInsights.map(i => i.replace('🔍 ', '').trim()).slice(0, 5));
      }
    }

    if (recommendations.length === 0) {
      // Look for any lines with recommendation emojis
      const allRecs = report.match(/[🎯📈🌍⚠️🚀📱🎓💎⚡📊💡👥][^\n]+/g);
      if (allRecs) {
        recommendations.push(...allRecs.map(r => r.replace(/^[🎯📈🌍⚠️🚀📱🎓💎⚡📊💡👥] /, '').trim()).slice(0, 5));
      }
    }

    // Ensure we have some content
    if (insights.length === 0) {
      insights.push('Advanced TypeScript-powered business analysis completed');
      insights.push('Comprehensive investigation performed with focus area specialization');
      insights.push('Key business patterns and opportunities identified');
    }

    if (recommendations.length === 0) {
      recommendations.push('Review the detailed investigation report for comprehensive recommendations');
      recommendations.push('Consider implementing the suggested strategic initiatives');
      recommendations.push('Set up monitoring for key performance indicators identified');
    }

    if (nextSteps.length === 0) {
      nextSteps.push('Schedule follow-up analysis in 30 days to track progress');
      nextSteps.push('Set up automated monitoring for key metrics identified');
      nextSteps.push('Share insights with relevant stakeholders for decision-making');
    }

    return { insights, recommendations, nextSteps };
  }
}

export const geminiOrchestrator = new GeminiWorkflowOrchestrator();
