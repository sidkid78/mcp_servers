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
  TrendingUp, 
  Database,
  Activity,
  CheckCircle2,
  Calendar,
  BarChart3,
  LineChart,
  Zap,
  Clock
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface TrendAnalysisProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function TrendAnalysis({ onExecutePrompt }: TrendAnalysisProps) {
  const [datasetName, setDatasetName] = useState('');
  const [timeColumn, setTimeColumn] = useState('');
  const [valueColumns, setValueColumns] = useState('');
  const [timeRange, setTimeRange] = useState('');
  const [analysisTypes, setAnalysisTypes] = useState<string[]>(['trend', 'seasonality']);
  const [forecastPeriods, setForecastPeriods] = useState('12');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const timeRanges = [
    { value: 'ALL', label: 'All Available Data' },
    { value: '1Y', label: 'Last 1 Year' },
    { value: '2Y', label: 'Last 2 Years' },
    { value: '3Y', label: 'Last 3 Years' },
    { value: '6M', label: 'Last 6 Months' },
    { value: '3M', label: 'Last 3 Months' }
  ];

  const analysisOptions = [
    { value: 'trend', label: 'Trend Analysis', description: 'Long-term directional patterns' },
    { value: 'seasonality', label: 'Seasonality Detection', description: 'Recurring seasonal patterns' },
    { value: 'cyclical', label: 'Cyclical Patterns', description: 'Business cycle identification' },
    { value: 'anomaly', label: 'Anomaly Detection', description: 'Unusual pattern identification' },
    { value: 'forecast', label: 'Forecasting', description: 'Future value prediction' },
    { value: 'correlation', label: 'Time Correlation', description: 'Cross-variable time relationships' }
  ];

  const forecastOptions = [
    { value: '6', label: '6 Periods' },
    { value: '12', label: '12 Periods' },
    { value: '24', label: '24 Periods' },
    { value: '36', label: '36 Periods' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!datasetName.trim()) return;
    
    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        dataset_name: datasetName.trim(),
        analysis_types: analysisTypes,
        forecast_periods: parseInt(forecastPeriods)
      };
      
      if (timeColumn.trim()) {
        params.time_column = timeColumn.trim();
      }
      
      if (valueColumns.trim()) {
        params.value_columns = valueColumns.trim().split(',').map(col => col.trim());
      }
      
      if (timeRange && timeRange !== 'ALL') {
        params.time_range = timeRange;
      }

      const result = await onExecutePrompt('trend-analysis', params);
      setResults(result);
    } catch (error) {
      console.error('Trend analysis failed:', error);
      setResults('Error: Failed to perform trend analysis. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalysisTypeToggle = (type: string) => {
    setAnalysisTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="space-y-6">
      {/* Trend Analysis Overview */}
      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Time-Series Trend Analysis & Forecasting</h3>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                Advanced time-series analysis including trend detection, seasonality analysis, anomaly detection, and predictive forecasting.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  Trend Detection
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  Seasonality
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  Forecasting
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  Anomaly Detection
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
              <Clock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Time-Series Analysis Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure trend analysis and forecasting parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Dataset and Time Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Database className="h-4 w-4" />
                  Dataset Name *
                </Label>
                <Input
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  placeholder="e.g., sales_timeseries, metrics_data"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Calendar className="h-4 w-4" />
                  Time Column
                </Label>
                <Input
                  value={timeColumn}
                  onChange={(e) => setTimeColumn(e.target.value)}
                  placeholder="e.g., date, timestamp, month"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Value Columns and Time Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <BarChart3 className="h-4 w-4" />
                  Value Columns
                </Label>
                <Input
                  value={valueColumns}
                  onChange={(e) => setValueColumns(e.target.value)}
                  placeholder="e.g., revenue, sales, units (comma-separated)"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Calendar className="h-4 w-4" />
                  Time Range
                </Label>
                <Select value={timeRange || 'ALL'} onValueChange={(value) => setTimeRange(value === 'ALL' ? '' : value)}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700">
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Analysis Types */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <LineChart className="h-4 w-4" />
                Analysis Types
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {analysisOptions.map((option) => (
                  <div key={option.value} className="flex items-start space-x-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                    <Checkbox
                      id={option.value}
                      checked={analysisTypes.includes(option.value)}
                      onCheckedChange={() => handleAnalysisTypeToggle(option.value)}
                      className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
                    />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                        {option.label}
                      </Label>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forecast Periods */}
            {analysisTypes.includes('forecast') && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <TrendingUp className="h-4 w-4" />
                  Forecast Periods
                </Label>
                <Select value={forecastPeriods} onValueChange={setForecastPeriods}>
                  <SelectTrigger className="w-48 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    {forecastOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Configuration:</span>
              {datasetName && (
                <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border-purple-300 dark:border-purple-700">
                  Dataset: {datasetName}
                </Badge>
              )}
              <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border-purple-300 dark:border-purple-700">
                Analysis: {analysisTypes.length} types
              </Badge>
              {analysisTypes.includes('forecast') && (
                <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border-purple-300 dark:border-purple-700">
                  Forecast: {forecastPeriods} periods
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
                  Analyzing Trends...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Start Trend Analysis
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader className="border-b border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
              <div>
                <CardTitle className="text-green-900 dark:text-green-100">Trend Analysis Complete</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Time-series patterns and forecasting results
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-green-600 text-white dark:bg-green-700 dark:text-green-100">FORECASTED</Badge>
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
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Trend Detection</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Long-term pattern identification</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Seasonality</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Recurring pattern analysis</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <LineChart className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Forecasting</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Predictive modeling & projection</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Anomaly Detection</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Unusual pattern identification</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
