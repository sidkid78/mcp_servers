// Gemini AI Integration for Business Intelligence
import { GoogleGenAI } from '@google/genai';
import { GeminiRequest, GeminiResponse } from '../types/index';

class GeminiService {
  private client: GoogleGenAI | null = null;
 
  constructor() {
    this.initialize();
  }

  private initialize() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) {
      this.client = new GoogleGenAI({ apiKey });
    }
  }

  async generateInsights(request: GeminiRequest): Promise<GeminiResponse> {
    if (!this.client) {
      throw new Error('Gemini API not configured. Please set NEXT_PUBLIC_GEMINI_API_KEY environment variable.');
    }

    try {
      const prompt = this.buildPrompt(request);
      const response = await this.client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      return this.parseResponse(response.text || '');
    } catch (error) {
      console.log('Gemini API error:', error);
      throw new Error('Failed to generate insights. Please try again.');
    }

     
  }

  private buildPrompt(request: GeminiRequest): string {
    const basePrompt = `You are a senior business intelligence analyst and data scientist. 
Your role is to provide actionable business insights and strategic recommendations based on data analysis.

Context: ${request.context}
Task: ${request.task}
Focus Area: ${request.focusArea || 'general business analysis'}

Data Summary:
${JSON.stringify(request.data, null, 2)}

Please provide:
1. Key business insights (3-5 main findings)
2. Strategic recommendations (3-4 actionable steps)
3. Executive summary (2-3 sentences)
4. Key findings (specific data points that matter)
5. Business impact assessment
6. Next steps for implementation

Format your response as JSON with the following structure:
{
  "insights": ["insight 1", "insight 2", ...],
  "recommendations": ["recommendation 1", "recommendation 2", ...],
  "summary": "executive summary text",
  "keyFindings": ["finding 1", "finding 2", ...],
  "businessImpact": "impact assessment text",
  "nextSteps": ["step 1", "step 2", ...]
}`;

    // Add task-specific guidance
    switch (request.task) {
      case 'insight_generation':
        return basePrompt + `

Focus on discovering hidden patterns, unusual correlations, and opportunities for business optimization. 
Look for trends that could impact revenue, customer satisfaction, or operational efficiency.`;

      case 'pattern_analysis':
        return basePrompt + `

Analyze the data for statistical patterns, seasonal trends, and anomalies. 
Identify what drives the key business metrics and suggest predictive indicators.`;

      case 'correlation_interpretation':
        return basePrompt + `

Interpret correlation findings in business terms. Explain causality vs correlation, 
and suggest which relationships are actionable for business strategy.`;

      case 'business_summary':
        return basePrompt + `

Create an executive-level summary suitable for C-suite presentation. 
Focus on strategic implications and high-impact recommendations.`;

      default:
        return basePrompt;
    }
  }

  private parseResponse(text: string): GeminiResponse {
    try {
      // Try to parse as JSON first
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          insights: parsed.insights || [],
          recommendations: parsed.recommendations || [],
          summary: parsed.summary || '',
          keyFindings: parsed.keyFindings || [],
          businessImpact: parsed.businessImpact || '',
          nextSteps: parsed.nextSteps || []
        };
      }
    } catch (error) {
      console.warn('Failed to parse JSON response, falling back to text parsing', error);
    }

    // Fallback to text parsing
    return this.parseTextResponse(text);
  }

  private parseTextResponse(text: string): GeminiResponse {
    const insights: string[] = [];
    const recommendations: string[] = [];
    const keyFindings: string[] = [];
    const nextSteps: string[] = [];

    const lines = text.split('\n');
    let currentSection = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Detect sections
      if (trimmed.toLowerCase().includes('insight') || trimmed.toLowerCase().includes('finding')) {
        currentSection = 'insights';
        continue;
      }
      if (trimmed.toLowerCase().includes('recommendation') || trimmed.toLowerCase().includes('suggest')) {
        currentSection = 'recommendations';
        continue;
      }
      if (trimmed.toLowerCase().includes('next step') || trimmed.toLowerCase().includes('action')) {
        currentSection = 'nextSteps';
        continue;
      }

      // Extract bullet points or numbered lists
      if (trimmed.match(/^[\-\*\•]\s+/) || trimmed.match(/^\d+\.\s+/)) {
        const content = trimmed.replace(/^[\-\*\•\d\.]\s+/, '');
        
        switch (currentSection) {
          case 'insights':
            insights.push(content);
            break;
          case 'recommendations':
            recommendations.push(content);
            break;
          case 'nextSteps':
            nextSteps.push(content);
            break;
          default:
            if (content.length > 20) {
              insights.push(content);
            }
        }
      }
    }

    // Extract summary (usually first or last paragraph)
    const paragraphs = text.split('\n\n').filter(p => p.trim().length > 50);
    const summary = paragraphs[0] || 'Analysis complete. Review findings for actionable insights.';

    return {
      insights: insights.slice(0, 5),
      recommendations: recommendations.slice(0, 4),
      summary: summary.substring(0, 300),
      keyFindings: keyFindings.slice(0, 4),
      businessImpact: 'Analysis indicates potential for significant business improvements.',
      nextSteps: nextSteps.slice(0, 4)
    };
  }

  // Specialized methods for different BI workflows
  async generateBIDiscoveryInsights(dataSources: { size: number, format: string, businessPotential: string }[], businessContext?: string): Promise<GeminiResponse> {
    return this.generateInsights({
      context: `Business Intelligence Discovery: ${dataSources.length} data sources analyzed. Business context: ${businessContext || 'Not specified'}`,
      data: {
        sourceCount: dataSources.length,
        totalSize: dataSources.reduce((sum, s) => sum + s.size, 0),
        formats: [...new Set(dataSources.map(s => s.format))],
        businessAreas: dataSources.map(s => s.businessPotential),
        businessContext
      } as Record<string, unknown>,
      task: 'insight_generation',
      focusArea: 'data discovery and business potential'
    });
  }

  async generateCorrelationInsights(correlationData: Record<string, unknown>): Promise<GeminiResponse> {
    return this.generateInsights({
      context: 'Correlation analysis results for business intelligence',
      data: correlationData,
      task: 'correlation_interpretation',
      focusArea: 'statistical relationships and business causality'
    });
  }

  async generateTrendAnalysisInsights(trendData: Record<string, unknown>): Promise<GeminiResponse> {
    return this.generateInsights({
      context: 'Time-series trend analysis for forecasting and pattern detection',
      data: trendData,
      task: 'pattern_analysis',
      focusArea: 'temporal patterns and forecasting'
    });
  }

  async generateExecutiveSummary(analysisResults: Record<string, unknown>, audience: string = 'CEO'): Promise<GeminiResponse> {
    return this.generateInsights({
      context: `Executive summary for ${audience} based on comprehensive business intelligence analysis`,
      data: analysisResults,
      task: 'business_summary',
      focusArea: `${audience.toLowerCase()} strategic perspective`
    });
  }
}

export const geminiService = new GeminiService();

// Helper functions for enhancing BI workflows with Gemini insights
export async function enhanceDataDiscovery(dataSources: { size: number, format: string, businessPotential: string }[], businessContext?: string) {
  try {
    const insights = await geminiService.generateBIDiscoveryInsights(dataSources, businessContext);
    return insights;
  } catch (error) {
    console.error('Failed to enhance data discovery:', error);
    return null;
  }
}

export async function enhanceCorrelationAnalysis(correlationResults: Record<string, unknown>) {
  try {
    const insights = await geminiService.generateCorrelationInsights(correlationResults);
    return insights;
  } catch (error) {
    console.error('Failed to enhance correlation analysis:', error);
    return null;
  }
}

export async function enhanceTrendAnalysis(trendResults: Record<string, unknown>) {
  try {
    const insights = await geminiService.generateTrendAnalysisInsights(trendResults);
    return insights;
  } catch (error) {
    console.error('Failed to enhance trend analysis:', error);
    return null;
  }
}

export async function generateExecutiveSummary(analysisResults: Record<string, unknown>, audience: string = 'CEO') {
  try {
    const insights = await geminiService.generateExecutiveSummary(analysisResults, audience);
    return insights;
  } catch (error) {
    console.error('Failed to generate executive summary:', error);
    return null;
  }
}
