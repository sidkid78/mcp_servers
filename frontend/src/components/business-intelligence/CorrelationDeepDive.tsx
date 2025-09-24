'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Network, 
  Database,
  Activity,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Target,
  Zap,
  Settings
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface CorrelationDeepDiveProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function CorrelationDeepDive({ onExecutePrompt }: CorrelationDeepDiveProps) {
  const [datasetName, setDatasetName] = useState('');
  const [targetVariable, setTargetVariable] = useState('');
  const [correlationThreshold, setCorrelationThreshold] = useState('0.3');
  const [analysisTypes, setAnalysisTypes] = useState<string[]>(['pearson']);
  const [includeVisualization, setIncludeVisualization] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const correlationMethods = [
    { value: 'pearson', label: 'Pearson (Linear)', description: 'Linear relationships' },
    { value: 'spearman', label: 'Spearman (Rank)', description: 'Monotonic relationships' },
    { value: 'kendall', label: 'Kendall (Tau)', description: 'Ordinal relationships' }
  ];

  const thresholdOptions = [
    { value: '0.1', label: 'Very Weak (0.1+)' },
    { value: '0.3', label: 'Weak (0.3+)' },
    { value: '0.5', label: 'Moderate (0.5+)' },
    { value: '0.7', label: 'Strong (0.7+)' },
    { value: '0.9', label: 'Very Strong (0.9+)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!datasetName.trim()) return;
    
    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        dataset_name: datasetName.trim(),
        correlation_threshold: parseFloat(correlationThreshold),
        analysis_methods: analysisTypes,
        include_visualization: includeVisualization
      };
      
      if (targetVariable.trim()) {
        params.target_variable = targetVariable.trim();
      }

      const result = await onExecutePrompt('correlation-deep-dive', params);
      setResults(result);
    } catch (error) {
      console.error('Correlation analysis failed:', error);
      setResults('Error: Failed to perform correlation analysis. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalysisTypeToggle = (method: string) => {
    setAnalysisTypes(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  return (
    <div className="space-y-6">
      {/* Correlation Overview */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Network className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Multi-Dimensional Correlation Analysis</h3>
              <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                Advanced statistical analysis to discover relationships between variables using multiple correlation methods and visualization.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700">
                  Statistical Analysis
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700">
                  Multiple Methods
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700">
                  Visualization
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700">
                  Deep Insights
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Correlation Analysis Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure statistical correlation analysis parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Dataset and Target */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Database className="h-4 w-4" />
                  Dataset Name *
                </Label>
                <Input
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  placeholder="e.g., sales_data, customer_metrics"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Target className="h-4 w-4" />
                  Target Variable (Optional)
                </Label>
                <Input
                  value={targetVariable}
                  onChange={(e) => setTargetVariable(e.target.value)}
                  placeholder="e.g., revenue, conversion_rate"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Correlation Threshold */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <BarChart3 className="h-4 w-4" />
                Correlation Threshold
              </Label>
              <Select value={correlationThreshold} onValueChange={setCorrelationThreshold}>
                <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                  {thresholdOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Analysis Methods */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <TrendingUp className="h-4 w-4" />
                Correlation Methods
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {correlationMethods.map((method) => (
                  <div key={method.value} className="flex items-start space-x-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                    <Checkbox
                      id={method.value}
                      checked={analysisTypes.includes(method.value)}
                      onCheckedChange={() => handleAnalysisTypeToggle(method.value)}
                      className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
                    />
                    <div className="flex-1">
                      <Label htmlFor={method.value} className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                        {method.label}
                      </Label>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualization Option */}
            <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <Checkbox
                id="visualization"
                checked={includeVisualization}
                onCheckedChange={(checked) => setIncludeVisualization(checked === true)}
                className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
              />
              <div className="flex-1">
                <Label htmlFor="visualization" className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                  Include Correlation Visualizations
                </Label>
                <p className="text-xs text-slate-600 dark:text-slate-400">Generate correlation matrices and heatmaps</p>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
              <span className="text-sm font-medium text-green-900 dark:text-green-100">Configuration:</span>
              {datasetName && (
                <Badge variant="secondary" className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
                  Dataset: {datasetName}
                </Badge>
              )}
              <Badge variant="secondary" className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
                Threshold: {correlationThreshold}
              </Badge>
              <Badge variant="secondary" className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
                Methods: {analysisTypes.length}
              </Badge>
              {includeVisualization && (
                <Badge variant="secondary" className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-700">
                  Visualizations
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Execute Analysis */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 border-0"
              disabled={isLoading || !datasetName.trim() || analysisTypes.length === 0}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Correlations...
                </>
              ) : (
                <>
                  <Network className="h-4 w-4 mr-2" />
                  Start Correlation Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CardHeader className="border-b border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
              <div>
                <CardTitle className="text-green-900 dark:text-green-100">Correlation Analysis Complete</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Statistical relationships and correlation insights
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-green-600 text-white dark:bg-green-700 dark:text-green-100 border-0">ANALYZED</Badge>
            </div>
          </CardHeader>
           <CardContent className="p-6">
             <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-green-200 dark:border-green-800">
               <MarkdownRenderer content={results} />
             </div>
           </CardContent>
        </Card>
      )}

      {/* Analysis Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Network className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Multi-Method</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Pearson, Spearman, Kendall analysis</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Visualization</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Interactive correlation matrices</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Target Focus</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Variable-specific analysis</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Deep Insights</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Statistical significance testing</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
