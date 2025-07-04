'use client';

import { useState, useCallback } from 'react';
import { FileText, Database, TrendingUp, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { useBiStore } from '@/lib/store';
import { GeminiWorkflowOrchestrator } from '@/lib/services/geminiOrchestrator';
import { WorkflowResult } from '@/lib/types';
import FileUploadZone from './FileUploadZone';
import DataSourceCard from './DataSourceCard';
import BusinessContextCard from './BusinessContextCard';
import WorkflowNavigation from './WorkflowNavigation';
import QuickStartRecommendations from './QuickStartRecommendations';

// React component DataSource interface (for UI)
interface UIDataSource {
  name: string;
  format: string;
  size: number;
  estimatedRows: number;
  estimatedColumns: number;
  businessPotential: string;
  lastModified: Date;
}

// Main React Component
export default function BiDiscovery() {
  const [discoveredSources, setDiscoveredSources] = useState<UIDataSource[]>([]);
  const [businessContext, setBusinessContext] = useState<string>('');
  const [discoveryComplete, setDiscoveryComplete] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [aiDiscoveryResults, setAiDiscoveryResults] = useState<WorkflowResult | null>(null);
  const [discoveryProgress, setDiscoveryProgress] = useState<string>('');
  const [discoveryProgressPercent, setDiscoveryProgressPercent] = useState<number>(0);
  
  const { setLoading, setError, clearError } = useBiStore();
  const geminiOrchestrator = new GeminiWorkflowOrchestrator();

  const handleFilesUploaded = useCallback(async (files: File[]) => {
    setLoading({ isLoading: true, operation: 'AI-powered data discovery in progress...' });
    clearError();
    
    try {
      // Set up progress tracking
      geminiOrchestrator.setProgressCallback((step: string, progress: number) => {
        setDiscoveryProgress(step);
        setDiscoveryProgressPercent(progress);
      });

      // Quick analysis of uploaded files for UI
      const sources: UIDataSource[] = [];
      
      for (const file of files) {
        const source: UIDataSource = {
          name: file.name,
          format: getUIFileFormat(file.name),
          size: file.size,
          estimatedRows: 0,
          estimatedColumns: 0,
          businessPotential: await assessUIBusinessPotential(file),
          lastModified: new Date(file.lastModified)
        };
        
        if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          const estimates = await estimateUICSVStructure(file);
          source.estimatedRows = estimates.rows;
          source.estimatedColumns = estimates.columns;
        }
        
        sources.push(source);
      }
      
      setDiscoveredSources(sources);
      setUploadedFiles(files);

      // 🚀 AI-POWERED DISCOVERY: Let Gemini analyze the data comprehensively
      setDiscoveryProgress('🧠 AI analyzing your data for business insights...');
      
      const workflowParams = {
        businessContext: businessContext || 'General business intelligence analysis',
        analysisDepth: 'comprehensive',
        focusAreas: ['revenue_optimization', 'customer_insights', 'operational_efficiency']
      };

      const aiResults = await geminiOrchestrator.executeWorkflow(
        'bi-discovery',
        files,
        workflowParams
      );

      setAiDiscoveryResults(aiResults);
      setDiscoveryComplete(true);
      setDiscoveryProgress('✅ AI discovery complete!');
      setDiscoveryProgressPercent(100);
      
      setLoading({ isLoading: false });
    } catch (error) {
      console.error('AI Discovery failed:', error);
      setError({ 
        hasError: true, 
        message: `AI-powered discovery failed: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`
      });
      setLoading({ isLoading: false });
      setDiscoveryProgress('❌ Discovery failed');
    }
  }, [setLoading, setError, clearError, businessContext, geminiOrchestrator]);

  const handleBusinessContextChange = useCallback((context: string) => {
    setBusinessContext(context);
  }, []);

  if (!discoveryComplete) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-600 p-3 rounded-full">
                <Database className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              🔍 Business Intelligence Discovery
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Data source discovery and initial profiling with business context. 
              This is the entry point that primes the agent with data context and business understanding.
            </p>
          </div>

          {/* Supported Formats Info */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              📊 CSV Data Format Requirements
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <FileText className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <div className="font-medium text-sm text-gray-900 dark:text-white">CSV Files Only</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">Comma-separated values with proper headers and structured data</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-mono">
                    💡 sales_data.csv, customers.csv, financial_report.csv
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>📋 Data Requirements:</strong> CSV files must have structured rows and columns with headers. 
                Each row should represent a record (customer, sale, transaction, etc.) and columns should contain consistent data types.
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <strong>📊 Excel Users:</strong> Save your Excel file as CSV format (File → Save As → CSV) before uploading.
                This ensures optimal compatibility with our business intelligence analysis tools.
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          {discoveryProgress && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {discoveryProgress}
                </span>
                <span className="text-sm text-blue-600 dark:text-blue-300">
                  {discoveryProgressPercent}%
                </span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${discoveryProgressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* File Upload */}
          <FileUploadZone onFilesUploaded={handleFilesUploaded} />
          
          {/* BI Capabilities Preview */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              🧠 Available BI Workflows
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Insight Investigation',
                  desc: 'Guided exploration of business metrics',
                  icon: TrendingUp,
                  path: '/bi/insight-investigation'
                },
                {
                  title: 'Correlation Deep Dive',
                  desc: 'Multi-dimensional correlation analysis',
                  icon: TrendingUp,
                  path: '/bi/correlation-deep-dive'
                },
                {
                  title: 'Trend Analysis',
                  desc: 'Time-series pattern detection with forecasting',
                  icon: TrendingUp,
                  path: '/bi/trend-analysis'
                },
                {
                  title: 'Executive Summary',
                  desc: 'Auto-generate C-suite ready reports',
                  icon: Users,
                  path: '/bi/executive-summary'
                },
                {
                  title: 'Action Recommendations',
                  desc: 'Data-driven business recommendations',
                  icon: ArrowRight,
                  path: '/bi/action-recommendations'
                }
              ].map((workflow) => (
                <div key={workflow.title} className="flex items-start space-x-3 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                  <workflow.icon className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{workflow.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{workflow.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            🔍 Business Intelligence Discovery Complete
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Found {discoveredSources.length} data sources. Ready for business intelligence analysis.
          </p>
        </div>

        {/* AI Discovery Results */}
        {aiDiscoveryResults && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-sm p-6 mb-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                🧠 AI-Powered Discovery Insights
              </h2>
            </div>

            {/* Key Insights */}
            {aiDiscoveryResults.insights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  💡 Key Business Insights
                </h3>
                <div className="space-y-2">
                  {aiDiscoveryResults.insights.slice(0, 5).map((insight, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {aiDiscoveryResults.recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  🎯 AI Recommendations
                </h3>
                <div className="space-y-2">
                  {aiDiscoveryResults.recommendations.slice(0, 4).map((recommendation, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <ArrowRight className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats from AI Analysis */}
            {aiDiscoveryResults.results?.profileResults && (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-blue-600">
                    {aiDiscoveryResults.results.profileResults.originalShape?.[1] || 0}
                  </div>
                  <div className="text-xs text-gray-500">AI-Analyzed Columns</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-600">
                    {aiDiscoveryResults.results.correlationResults?.strongCorrelations?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Strong Correlations</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">
                    {aiDiscoveryResults.results.visualizations?.length || 0}
                  </div>
                  <div className="text-xs text-gray-500">Auto-Generated Charts</div>
                </div>
                <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-orange-600">
                    {aiDiscoveryResults.insights.length + aiDiscoveryResults.recommendations.length}
                  </div>
                  <div className="text-xs text-gray-500">AI Insights</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Data Environment Analysis */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            📊 Data Environment Analysis
          </h2>
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{discoveredSources.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Data Sources</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {formatUIFileSize(discoveredSources.reduce((sum: number, s: UIDataSource) => sum + s.size, 0))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Total Size</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {[...new Set(discoveredSources.map((s: UIDataSource) => s.format))].length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Formats</div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {discoveredSources.reduce((sum: number, s: UIDataSource) => sum + s.estimatedRows, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Est. Rows</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Formats Detected:</strong> {[...new Set(discoveredSources.map((s: UIDataSource) => s.format))].join(', ')}
          </div>
        </div>

        {/* Data Sources */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              📁 Data Source Summary
            </h2>
            <div className="space-y-3">
              {discoveredSources.map((source: UIDataSource, index: number) => (
                <DataSourceCard key={index} source={source} />
              ))}
            </div>
          </div>

          <BusinessContextCard 
            businessContext={businessContext}
            onBusinessContextChange={handleBusinessContextChange}
            discoveredSources={discoveredSources}
          />
        </div>

        {/* Quick Start & Workflows */}
        <div className="grid lg:grid-cols-2 gap-6">
          <QuickStartRecommendations 
            discoveredSources={discoveredSources}
            businessContext={businessContext}
          />
          
          <WorkflowNavigation 
            discoveredSources={discoveredSources}
            uploadedFiles={uploadedFiles}
          />
        </div>
      </div>
    </div>
  );
}

// UI Utility functions (for React component)
function getUIFileFormat(filename: string): string {
  const ext = filename.toLowerCase().split('.').pop();
  const formatMap: Record<string, string> = {
    'csv': 'CSV',
    'xlsx': 'Excel',
    'xls': 'Excel'
  };
  return formatMap[ext || ''] || 'Unknown';
}

async function assessUIBusinessPotential(file: File): Promise<string> {
  const filename = file.name.toLowerCase();
  
  // Simple keyword analysis for business domain detection
  if (filename.includes('sales') || filename.includes('revenue') || filename.includes('financial')) {
    return '💰 Financial analysis (revenue, costs, profitability)';
  }
  if (filename.includes('customer') || filename.includes('client') || filename.includes('user')) {
    return '👥 Customer analysis (behavior, segmentation, retention)';
  }
  if (filename.includes('product') || filename.includes('inventory') || filename.includes('catalog')) {
    return '📦 Product analysis (performance, category trends)';
  }
  if (filename.includes('marketing') || filename.includes('campaign') || filename.includes('ad')) {
    return '📈 Marketing analytics (campaign performance, ROI)';
  }
  if (filename.includes('operation') || filename.includes('process') || filename.includes('workflow')) {
    return '⚙️ Operational analysis (efficiency, process optimization)';
  }

  return '📋 General data exploration and reporting';
}

async function estimateUICSVStructure(file: File): Promise<{ rows: number; columns: number }> {
  try {
    const text = await file.text();
    const lines = text.split('\n').filter((line: string) => line.trim());
    const firstLine = lines[0];
    const columns = firstLine ? firstLine.split(',').length : 0;
    const rows = lines.length - 1; // Subtract header
    
    return { rows: Math.max(0, rows), columns };
  } catch (error) {
    console.error('Error estimating CSV structure:', error);
    return { rows: 0, columns: 0 };
  }
}

function formatUIFileSize(bytes: number): string {
  try {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  } catch (error) {
    console.error('Error formatting file size:', error);
    return '0 B';
  }
}
