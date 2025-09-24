'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  Search, 
  GitBranch, 
  LineChart, 
  Users, 
  Target, 
  ArrowRight,
  // Play,
  Loader2,
  CheckCircle,
  Clock,
  Brain
} from 'lucide-react';
import { 
  LineChart as RechartsLineChart, 
  BarChart as RechartsBarChart,
  ScatterChart as RechartsScatterChart,
  Line, 
  Bar,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useBiStore } from '@/lib/store';
import { geminiOrchestrator } from '@/lib/services/geminiOrchestrator';
import { VisualizationResult, WorkflowResult } from '@/lib/types';

interface DataSource {
  name: string;
  format: string;
  size: number;
  estimatedRows: number;
  estimatedColumns: number;
  businessPotential: string;
  lastModified: Date;
}

interface WorkflowNavigationProps {
  discoveredSources: DataSource[];
  uploadedFiles: File[];
}

// Removed unused interface

interface Workflow {
  id: string;
  title: string;
  description: string;
  icon: typeof TrendingUp;
  color: string;
  estimatedTime: string;
  capabilities: string[];
  path: string;
}

interface WorkflowStep {
  step: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  result?: unknown;
  timestamp?: Date;
}

export default function WorkflowNavigation({ discoveredSources, uploadedFiles }: WorkflowNavigationProps) {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState<string>('');
  const [progress, setProgress] = useState<number>(0);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const [workflowResults, setWorkflowResults] = useState<WorkflowResult | null>(null);
  const [showDetailedResults, setShowDetailedResults] = useState<boolean>(false);
  
  const { setWorkflow } = useBiStore();

  const workflows: Workflow[] = [
    {
      id: 'insight-investigation',
      title: 'Insight Investigation (AI-Powered)',
      description: 'AI-guided exploration using Gemini orchestration for comprehensive analysis',
      icon: Search,
      color: 'bg-blue-500',
      estimatedTime: '15-30 min',
      capabilities: [
        'Revenue analysis & sales performance',
        'Customer behavior & segmentation', 
        'Operational efficiency metrics',
        'Growth metrics & expansion opportunities'
      ],
      path: '/bi/insight-investigation'
    },
    {
      id: 'insight-investigation-detailed',
      title: 'Insight Investigation (Advanced)',
      description: '🧠 Sophisticated TypeScript-powered business analysis with deep insights',
      icon: Brain,
      color: 'bg-indigo-600',
      estimatedTime: '10-15 min',
      capabilities: [
        '🎯 Focus area specialization (revenue, customers, operations, growth)',
        '📊 Comprehensive metrics analysis with KPIs',
        '🔍 Pattern detection & anomaly identification',
        '🔗 Advanced correlation analysis',
        '📈 Trend analysis with forecasting',
        '👥 Customer/business segmentation'
      ],
      path: '/bi/insight-investigation-detailed'
    },
    {
      id: 'correlation-deep-dive',
      title: 'Correlation Deep Dive',
      description: 'Multi-dimensional correlation analysis with business interpretation',
      icon: GitBranch,
      color: 'bg-purple-500',
      estimatedTime: '20-40 min',
      capabilities: [
        'Statistical correlation analysis',
        'Hypothesis testing with confidence intervals',
        'Business interpretation of relationships',
        'Causal inference guidance'
      ],
      path: '/bi/correlation-deep-dive'
    },
    {
      id: 'trend-analysis',
      title: 'Trend Analysis',
      description: 'Time-series pattern detection with forecasting insights',
      icon: LineChart,
      color: 'bg-green-500',
      estimatedTime: '25-45 min',
      capabilities: [
        'Time-series trend detection',
        'Seasonal pattern identification',
        'Multi-horizon forecasting',
        'Change point detection'
      ],
      path: '/bi/trend-analysis'
    },
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      description: 'Auto-generate C-suite ready business reports',
      icon: Users,
      color: 'bg-orange-500',
      estimatedTime: '10-20 min',
      capabilities: [
        'CEO/CFO/COO tailored summaries',
        'Strategic overview with metrics',
        'Board-ready presentations',
        'Investment recommendations'
      ],
      path: '/bi/executive-summary'
    },
    {
      id: 'action-recommendations',
      title: 'Action Recommendations',
      description: 'Data-driven business recommendations with impact analysis',
      icon: Target,
      color: 'bg-red-500',
      estimatedTime: '15-25 min',
      capabilities: [
        'Quick wins (0-30 days)',
        'Strategic initiatives (3-6 months)',
        'Implementation roadmaps',
        'Resource requirements & ROI'
      ],
      path: '/bi/action-recommendations'
    }
  ];

  const handleWorkflowLaunch = async (workflow: Workflow) => {
    setIsExecuting(true);
    setProgress(0);
    setCurrentStep('Initializing workflow...');
    setWorkflowSteps([]);
    setWorkflowResults(null);
    
    // Set up progress callback
    geminiOrchestrator.setProgressCallback((step: string, progressValue: number) => {
      setCurrentStep(step);
      setProgress(progressValue);
      
      // Add step to workflow steps if it's a new significant step
      if (progressValue > 0 && step !== currentStep) {
        setWorkflowSteps(prev => {
          const newStep: WorkflowStep = {
            step: step,
            status: progressValue === 100 ? 'completed' : 'running',
            timestamp: new Date()
          };
          
          // Update existing step or add new one
          const existingIndex = prev.findIndex(s => s.step === step);
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = { ...updated[existingIndex], status: newStep.status };
            return updated;
          } else {
            return [...prev, newStep];
          }
        });
      }
    });

    try {
      // Determine workflow parameters based on type and data
      const workflowParams = generateWorkflowParams(workflow.id, discoveredSources);
      
      // Execute the workflow with Gemini orchestration
      const result = await geminiOrchestrator.executeWorkflow(
        workflow.id,
        uploadedFiles,
        workflowParams
      );

      if (result.status === 'success') {
        setWorkflowResults(result);
        setWorkflow(workflow.id, result);
        
        // Extract workflow steps from results
        const stepsArray = (result.results as Record<string, unknown>)?.steps as { name?: string; args?: unknown; result?: unknown }[] | undefined;
        const steps: WorkflowStep[] = Array.isArray(stepsArray) ? stepsArray.map((stepData) => ({
          step: stepData.name || 'Unknown Step',
          status: 'completed' as const,
          result: stepData.result,
          timestamp: new Date()
        })) : [];
        
        setWorkflowSteps(steps);
        setCurrentStep('Workflow completed successfully!');
        setProgress(100);
        
      } else {
        throw new Error(result.error || 'Workflow execution failed');
      }

    } catch (error) {
      console.error('Workflow execution failed:', error);
      setCurrentStep(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setWorkflowSteps(prev => [...prev, {
        step: 'error',
        status: 'error',
        result: { error: error instanceof Error ? error.message : 'Unknown error' },
        timestamp: new Date()
      }]);
    } finally {
      setIsExecuting(false);
    }
  };

  const getRecommendedWorkflow = (): string => {
    // Recommend workflow based on data characteristics
    if (discoveredSources.length === 1) {
      return 'insight-investigation';
    }
    
    const hasTimeData = discoveredSources.some(s => 
      s.name.toLowerCase().includes('date') || 
      s.name.toLowerCase().includes('time') ||
      s.name.toLowerCase().includes('monthly') ||
      s.name.toLowerCase().includes('daily')
    );
    
    if (hasTimeData) {
      return 'trend-analysis';
    }
    
    if (discoveredSources.length > 1) {
      return 'correlation-deep-dive';
    }
    
    return 'insight-investigation';
  };

  const recommendedWorkflowId = getRecommendedWorkflow();

  // Show execution progress if workflow is running
  if (isExecuting || workflowResults) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Brain className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            AI Workflow Execution
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {currentStep}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Workflow Steps */}
        {workflowSteps.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Execution Steps
            </h3>
            <div className="space-y-3">
              {workflowSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-shrink-0 mt-1">
                    {step.status === 'completed' && <CheckCircle className="h-5 w-5 text-green-600" />}
                    {step.status === 'running' && <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />}
                    {step.status === 'error' && <div className="h-5 w-5 bg-red-600 rounded-full" />}
                    {step.status === 'pending' && <Clock className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {step.step ? step.step.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown Step'}
                    </div>
                    {step.timestamp && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {step.timestamp.toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Summary */}
        {workflowResults && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <h4 className="font-medium text-green-800 dark:text-green-200">
                Workflow Completed Successfully
              </h4>
            </div>
            
            {/* Visualizations */}
            {(() => {
              const vizArr = (workflowResults.results as { visualizations?: VisualizationResult[] } | undefined)?.visualizations;
              if (!Array.isArray(vizArr) || vizArr.length === 0) return null;
              return (
                <div className="mb-4">
                  <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Generated Charts:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {vizArr.map((viz: VisualizationResult, index: number) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                      <h6 className="font-medium text-gray-900 dark:text-white mb-2">
                        {viz.visualizationType?.charAt(0).toUpperCase() + viz.visualizationType?.slice(1)} Chart
                      </h6>
                      
                      {/* Simple data preview */}
                      {Array.isArray(viz.chartData) && viz.chartData.length > 0 ? (
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <p>📊 Data points: {viz.chartData.length}</p>
                          {(() => {
                            const cfg = viz.chartConfig as { xKey?: string; yKey?: string } | undefined;
                            return cfg?.xKey && cfg?.yKey ? (
                              <p>📈 X-axis: {cfg.xKey}, Y-axis: {cfg.yKey}</p>
                            ) : null;
                          })()}
                          <p>🔧 Chart type: {viz.visualizationType}</p>
                          
                          {/* Actual Chart Rendering */}
                          {(() => {
                            const cfg = viz.chartConfig as { xKey?: string; yKey?: string } | undefined;
                            if (viz.visualizationType === 'line' && cfg?.xKey && cfg?.yKey && Array.isArray(viz.chartData)) {
                              return (
                            <div className="mt-3 h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsLineChart data={viz.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis 
                                    dataKey={cfg.xKey} 
                                    tick={{ fontSize: 10 }}
                                    interval="preserveStartEnd"
                                  />
                                  <YAxis 
                                    tick={{ fontSize: 10 }}
                                    tickFormatter={(value) => typeof value === 'number' ? value.toLocaleString() : value}
                                  />
                                      <Tooltip 
                                        formatter={(value: unknown) => [
                                          (typeof value === 'number' ? value.toLocaleString() : String(value)) as unknown as React.ReactNode, 
                                          cfg.yKey as string
                                        ]}
                                        labelFormatter={(label) => `${cfg.xKey}: ${label}`}
                                      />
                                  <Line 
                                    type="monotone" 
                                    dataKey={cfg.yKey as string} 
                                    stroke="#2563eb" 
                                    strokeWidth={2}
                                    dot={false}
                                  />
                                </RechartsLineChart>
                              </ResponsiveContainer>
                            </div>
                              );
                            }
                            return null;
                          })()}

                          {(() => {
                            const cfg = viz.chartConfig as { xKey?: string; yKey?: string } | undefined;
                            if (viz.visualizationType === 'bar' && cfg?.xKey && cfg?.yKey && Array.isArray(viz.chartData)) {
                              return (
                            <div className="mt-3 h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsBarChart data={viz.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis 
                                    dataKey={cfg.xKey} 
                                    tick={{ fontSize: 10 }}
                                    interval="preserveStartEnd"
                                  />
                                  <YAxis 
                                    tick={{ fontSize: 10 }}
                                    tickFormatter={(value) => typeof value === 'number' ? value.toLocaleString() : value}
                                  />
                                      <Tooltip 
                                        formatter={(value: unknown) => [
                                          (typeof value === 'number' ? value.toLocaleString() : String(value)) as unknown as React.ReactNode, 
                                          cfg.yKey as string
                                        ]}
                                        labelFormatter={(label) => `${cfg.xKey}: ${label}`}
                                      />
                                  <Bar 
                                    dataKey={cfg.yKey as string} 
                                    fill="#2563eb" 
                                  />
                                </RechartsBarChart>
                              </ResponsiveContainer>
                            </div>
                              );
                            }
                            return null;
                          })()}
                          
                          {(() => {
                            const cfg = viz.chartConfig as { xKey?: string; yKey?: string } | undefined;
                            if (viz.visualizationType === 'scatter' && cfg?.xKey && cfg?.yKey && Array.isArray(viz.chartData)) {
                              return (
                            <div className="mt-3 h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <RechartsScatterChart data={viz.chartData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis 
                                    type="number"
                                    dataKey={cfg.xKey as string} 
                                    name={cfg.xKey as string}
                                    tick={{ fontSize: 10 }}
                                    domain={['dataMin', 'dataMax']}
                                  />
                                  <YAxis 
                                    type="number"
                                    dataKey={cfg.yKey as string}
                                    name={cfg.yKey as string}
                                    tick={{ fontSize: 10 }}
                                    domain={['dataMin', 'dataMax']}
                                    tickFormatter={(value) => typeof value === 'number' ? value.toLocaleString() : value}
                                  />
                                  <Tooltip 
                                    cursor={{ strokeDasharray: '3 3' }}
                                    formatter={(value: unknown, name: unknown) => {
                                      const formattedValue = typeof value === 'number' ? value.toLocaleString() : String(value);
                                      return [formattedValue, name as string];
                                    }}
                                  />
                                  <Scatter 
                                    name="Data points" 
                                    data={viz.chartData} 
                                    fill="#2563eb" 
                                  />
                                </RechartsScatterChart>
                              </ResponsiveContainer>
                            </div>
                              );
                            }
                            return null;
                          })()}
                          
                          {/* Show first few data points */}
                          <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                            <strong>Sample data:</strong>
                            <div className="mt-1 space-y-1">
                              {Array.isArray(viz.chartData) && viz.chartData.slice(0, 3).map((point: Record<string, unknown>, i: number) => (
                                <div key={i} className="font-mono">
                                  {viz.chartConfig && typeof viz.chartConfig === 'object' && 'xKey' in viz.chartConfig && 'yKey' in viz.chartConfig ? (
                                    <span>
                                      {(viz.chartConfig as { xKey: string }).xKey}: {formatDataValue(point[(viz.chartConfig as { xKey: string }).xKey])} | {(viz.chartConfig as { yKey: string }).yKey}: {formatDataValue(point[(viz.chartConfig as { yKey: string }).yKey])}
                                    </span>
                                  ) : (
                                    <span>{JSON.stringify(point).slice(0, 80)}...</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Chart insights */}
                          {viz.insights && viz.insights.length > 0 && (
                            <div className="mt-2">
                              <strong>Insights:</strong>
                              <ul className="list-disc list-inside">
                                {viz.insights.slice(0, 2).map((insight: string, i: number) => (
                                  <li key={i} className="text-xs">{insight}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          No chart data available
                        </div>
                      )}
                    </div>
                    ))}
                  </div>
                </div>
              );
            })()}
            
            {workflowResults.insights.length > 0 && (
              <div className="mb-3">
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Key Insights:</h5>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  {workflowResults.insights.slice(0, 3).map((insight: string, index: number) => (
                    <li key={index}>• {insight}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {workflowResults.recommendations.length > 0 && (
              <div>
                <h5 className="font-medium text-green-800 dark:text-green-200 mb-2">Recommendations:</h5>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  {workflowResults.recommendations.slice(0, 2).map((rec: string, index: number) => (
                    <li key={index}>• {rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          {!isExecuting && (
            <button
              onClick={() => {
                setIsExecuting(false);
                setWorkflowResults(null);
                setWorkflowSteps([]);
                setProgress(0);
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Start New Workflow
            </button>
          )}
          
          {workflowResults && (
            <button
              onClick={() => {
                setShowDetailedResults(true);
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              View Detailed Results
            </button>
          )}
        </div>

        {/* Detailed Results Modal */}
        {showDetailedResults && workflowResults && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  📊 Detailed Analysis Results
                </h3>
                <button
                  onClick={() => setShowDetailedResults(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  title="Close detailed results"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {/* Workflow Type and Status */}
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800 dark:text-green-200">
                      {workflowResults.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Complete
                    </h4>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    Status: {workflowResults.status} | Type: {workflowResults.type}
                  </p>
                </div>

                {/* Executive Summary */}
                {workflowResults.summary && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      📋 Executive Summary
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-gray-300 font-sans">
                        {workflowResults.summary}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Key Insights */}
                {workflowResults.insights && workflowResults.insights.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      💡 Key Insights
                    </h4>
                    <div className="space-y-2">
                      {workflowResults.insights.map((insight: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {workflowResults.recommendations && workflowResults.recommendations.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      🎯 Recommendations
                    </h4>
                    <div className="space-y-2">
                      {workflowResults.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <ArrowRight className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                          <p className="text-sm text-gray-700 dark:text-gray-300">{rec}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Analysis Details */}
                {workflowResults.results && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      🔍 Analysis Details
                    </h4>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <pre className="whitespace-pre-wrap text-xs text-gray-600 dark:text-gray-400 font-mono overflow-x-auto">
                        {JSON.stringify(workflowResults.results, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                {workflowResults.nextSteps && workflowResults.nextSteps.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                      🚀 Next Steps
                    </h4>
                    <div className="space-y-2">
                      {workflowResults.nextSteps.map((step: string, index: number) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-800 text-yellow-600 dark:text-yellow-300 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowDetailedResults(false)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const dataStr = JSON.stringify(workflowResults, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `workflow-results-${workflowResults.type}-${new Date().toISOString().split('T')[0]}.json`;
                    link.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Export Results
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Available BI Workflows
        </h2>
      </div>

      <div className="space-y-4">
        {workflows.map((workflow) => {
          const isRecommended = workflow.id === recommendedWorkflowId;
          const isSelected = selectedWorkflow === workflow.id;
          
          return (
            <div key={workflow.id} className="relative">
              {isRecommended && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full z-10">
                  Recommended
                </div>
              )}
              
              <div 
                className={`
                  p-4 border rounded-lg cursor-pointer transition-all
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                  ${isRecommended ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
                `}
                onClick={() => setSelectedWorkflow(isSelected ? null : workflow.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${workflow.color} text-white`}>
                    <workflow.icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {workflow.title}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {workflow.estimatedTime}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {workflow.description}
                    </p>
                    
                    {isSelected && (
                      <div className="mt-4 space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                            🧠 AI will orchestrate these capabilities:
                          </h4>
                          <ul className="space-y-1">
                            {workflow.capabilities.map((capability, index) => (
                              <li key={index} className="text-xs text-gray-600 dark:text-gray-300 flex items-center space-x-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                <span>{capability}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWorkflowLaunch(workflow);
                          }}
                          disabled={isExecuting}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          <Brain className="h-4 w-4" />
                          <span>Launch AI Workflow</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Launch Recommendation */}
      {recommendedWorkflowId && (
        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <Target className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                🚀 AI-Powered Workflow Recommendation
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                Based on your data characteristics, our AI recommends starting with{' '}
                <strong>{workflows.find(w => w.id === recommendedWorkflowId)?.title}</strong>.
                The AI will automatically orchestrate the analysis tools and generate business insights.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDataValue(value: unknown): string {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  if (value === null || value === undefined) {
    return 'N/A';
  }
  return String(value);
}

function generateWorkflowParams(workflowId: string, discoveredSources: DataSource[]): Record<string, unknown> {
  const params: Record<string, unknown> = {
    datasetNames: discoveredSources.map(s => s.name.split('.')[0]),
    businessContext: discoveredSources.map(s => s.businessPotential).join('; ')
  };

  switch (workflowId) {
    case 'insight-investigation':
      // Determine focus area based on file names
      const hasFinancial = discoveredSources.some(s => 
        s.name.toLowerCase().includes('sales') || 
        s.name.toLowerCase().includes('revenue')
      );
      const hasCustomer = discoveredSources.some(s => 
        s.name.toLowerCase().includes('customer') || 
        s.name.toLowerCase().includes('user')
      );
      
      if (hasFinancial) params.focusArea = 'revenue';
      else if (hasCustomer) params.focusArea = 'customers';
      else params.focusArea = 'general';
      break;

    case 'correlation-deep-dive':
      params.minCorrelation = 0.5;
      break;

    case 'trend-analysis':
      // Try to detect time columns
      const timeColumns = discoveredSources.filter(s => 
        s.name.toLowerCase().includes('date') || 
        s.name.toLowerCase().includes('time')
      );
      if (timeColumns.length > 0) {
        params.timeColumn = 'date'; // Default assumption
      }
      break;
  }

  return params;
}
