'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Building2, 
  Database,
  Activity,
  CheckCircle2,
  FileText,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Crown
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ExecutiveSummaryProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function ExecutiveSummary({ onExecutePrompt }: ExecutiveSummaryProps) {
  const [datasetName, setDatasetName] = useState('');
  const [businessContext, setBusinessContext] = useState('');
  const [reportType, setReportType] = useState('comprehensive');
  const [keyMetrics, setKeyMetrics] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeVisualizations, setIncludeVisualizations] = useState(true);
  const [targetAudience, setTargetAudience] = useState('board');
  const [budgetFocus, setBudgetFocus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const reportTypes = [
    { value: 'comprehensive', label: 'Comprehensive Overview', description: 'Full business intelligence summary' },
    { value: 'financial', label: 'Financial Performance', description: 'Revenue, costs, and profitability focus' },
    { value: 'operational', label: 'Operational Efficiency', description: 'Process and performance metrics' },
    { value: 'strategic', label: 'Strategic Insights', description: 'Growth and competitive analysis' },
    { value: 'risk', label: 'Risk Assessment', description: 'Risk factors and mitigation strategies' }
  ];

  const timeframes = [
    { value: 'ALL', label: 'All Available Data' },
    { value: 'YTD', label: 'Year to Date' },
    { value: 'Q4', label: 'Last Quarter' },
    { value: 'Q2', label: 'Last 6 Months' },
    { value: '1Y', label: 'Last 12 Months' },
    { value: '2Y', label: 'Last 2 Years' }
  ];

  const targetAudiences = [
    { value: 'board', label: 'Board of Directors', description: 'High-level strategic overview' },
    { value: 'executives', label: 'C-Suite Executives', description: 'Detailed operational insights' },
    { value: 'investors', label: 'Investors & Stakeholders', description: 'Financial performance focus' },
    { value: 'management', label: 'Senior Management', description: 'Tactical and operational details' }
  ];

  const contextSuggestions = [
    'Quarterly business review for board of directors',
    'Annual performance summary for investors',
    'Strategic planning session insights',
    'Competitive analysis and market position',
    'Operational efficiency and cost optimization review',
    'Growth opportunities and expansion analysis'
  ];

  const metricSuggestions = [
    'Revenue, Profit Margin, Customer Acquisition Cost',
    'Market Share, Customer Retention, Growth Rate',
    'Operational Efficiency, Cost per Unit, Productivity',
    'Customer Satisfaction, Net Promoter Score, Churn Rate'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!datasetName.trim()) return;
    
    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        dataset_name: datasetName.trim(),
        report_type: reportType,
        include_recommendations: includeRecommendations,
        include_visualizations: includeVisualizations,
        target_audience: targetAudience,
        budget_focus: budgetFocus
      };
      
      if (businessContext.trim()) {
        params.business_context = businessContext.trim();
      }
      
      if (keyMetrics.trim()) {
        params.key_metrics = keyMetrics.trim().split(',').map(metric => metric.trim());
      }
      
      if (timeframe && timeframe !== 'ALL') {
        params.timeframe = timeframe;
      }

      const result = await onExecutePrompt('executive-summary', params);
      setResults(result);
    } catch (error) {
      console.error('Executive summary failed:', error);
      setResults('Error: Failed to generate executive summary. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 bg-slate-50 dark:bg-slate-900 min-h-screen p-6">
      {/* Executive Summary Overview */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-slate-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Executive Intelligence Suite</h3>
              <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                Generate C-suite ready business intelligence reports with key insights, strategic recommendations, and executive-level visualizations.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-600 dark:bg-slate-700">
                  C-Suite Ready
                </Badge>
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-600 dark:bg-slate-700">
                  Strategic Insights
                </Badge>
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-600 dark:bg-slate-700">
                  Executive Visuals
                </Badge>
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-600 dark:bg-slate-700">
                  Board Presentation
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
            <div className="flex items-center gap-3">
              <Crown className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Executive Report Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">Configure your executive business intelligence report</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Dataset and Report Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <Database className="h-4 w-4" />
                  Dataset Name *
                </Label>
                <Input
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  placeholder="e.g., business_metrics, quarterly_data"
                  className="font-mono bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <FileText className="h-4 w-4" />
                  Report Type
                </Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="text-slate-900 dark:text-slate-100 focus:bg-slate-100 dark:focus:bg-slate-600">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {reportTypes.find(t => t.value === reportType)?.description}
                </p>
              </div>
            </div>

            {/* Target Audience and Budget Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <Users className="h-4 w-4" />
                  Target Audience
                </Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    {targetAudiences.map((audience) => (
                      <SelectItem key={audience.value} value={audience.value} className="text-slate-900 dark:text-slate-100 focus:bg-slate-100 dark:focus:bg-slate-600">
                        {audience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {targetAudiences.find(a => a.value === targetAudience)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <DollarSign className="h-4 w-4" />
                  Financial Focus
                </Label>
                <div className="flex items-center space-x-2 p-3 border rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                  <Checkbox
                    id="budgetFocus"
                    checked={budgetFocus}
                    onCheckedChange={(checked) => setBudgetFocus(checked === true)}
                    className="border-slate-400 dark:border-slate-400 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900 dark:data-[state=checked]:bg-slate-100 dark:data-[state=checked]:border-slate-100 dark:data-[state=checked]:text-slate-900"
                  />
                  <div className="flex-1">
                    <Label htmlFor="budgetFocus" className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-200">
                      Emphasize Budget & Financial Metrics
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Include detailed financial analysis and cost breakdowns</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Context */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                <Building2 className="h-4 w-4" />
                Business Context
              </Label>
              <Textarea
                value={businessContext}
                onChange={(e) => setBusinessContext(e.target.value)}
                placeholder="Describe the business context, audience, and purpose of this executive report..."
                rows={3}
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {contextSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBusinessContext(suggestion)}
                    className="text-xs text-left justify-start h-auto py-2 px-3 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 bg-white dark:bg-slate-700"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Key Metrics and Timeframe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <BarChart3 className="h-4 w-4" />
                  Key Metrics (Optional)
                </Label>
                <Input
                  value={keyMetrics}
                  onChange={(e) => setKeyMetrics(e.target.value)}
                  placeholder="e.g., Revenue, Profit, Customer Count"
                  className="font-mono bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
                />
                <div className="space-y-1">
                  {metricSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setKeyMetrics(suggestion)}
                      className="text-xs text-left justify-start h-auto py-1 px-2 w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 bg-white dark:bg-slate-700"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                  <TrendingUp className="h-4 w-4" />
                  Analysis Timeframe
                </Label>
                <Select value={timeframe || 'ALL'} onValueChange={(value) => setTimeframe(value === 'ALL' ? '' : value)}>
                  <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    {timeframes.map((frame) => (
                      <SelectItem key={frame.value} value={frame.value} className="text-slate-900 dark:text-slate-100 focus:bg-slate-100 dark:focus:bg-slate-600">
                        {frame.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Report Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-200">Report Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-3 border rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                  <Checkbox
                    id="recommendations"
                    checked={includeRecommendations}
                    onCheckedChange={(checked) => setIncludeRecommendations(checked === true)}
                    className="border-slate-400 dark:border-slate-400 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900 dark:data-[state=checked]:bg-slate-100 dark:data-[state=checked]:border-slate-100 dark:data-[state=checked]:text-slate-900"
                  />
                  <div className="flex-1">
                    <Label htmlFor="recommendations" className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-200">
                      Strategic Recommendations
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Include actionable business recommendations</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 border rounded-lg border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                  <Checkbox
                    id="visualizations"
                    checked={includeVisualizations}
                    onCheckedChange={(checked) => setIncludeVisualizations(checked === true)}
                    className="border-slate-400 dark:border-slate-400 data-[state=checked]:bg-slate-900 data-[state=checked]:border-slate-900 dark:data-[state=checked]:bg-slate-100 dark:data-[state=checked]:border-slate-100 dark:data-[state=checked]:text-slate-900"
                  />
                  <div className="flex-1">
                    <Label htmlFor="visualizations" className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-200">
                      Executive Visualizations
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Include charts and executive dashboards</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-orange-50 dark:bg-slate-700 rounded-lg border border-orange-200 dark:border-slate-600">
              <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Report Configuration:</span>
              {datasetName && (
                <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-slate-600">
                  Dataset: {datasetName}
                </Badge>
              )}
              <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-slate-600">
                Type: {reportTypes.find(t => t.value === reportType)?.label}
              </Badge>
              <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-slate-600">
                Audience: {targetAudiences.find(a => a.value === targetAudience)?.label}
              </Badge>
              {budgetFocus && (
                <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-slate-600">
                  Financial Focus
                </Badge>
              )}
              {includeRecommendations && (
                <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-slate-600">
                  Recommendations
                </Badge>
              )}
              {includeVisualizations && (
                <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-slate-600">
                  Visualizations
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generate Report */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900"
              disabled={isLoading || !datasetName.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Generating Executive Report...
                </>
              ) : (
                <>
                  <Building2 className="h-4 w-4 mr-2" />
                  Generate Executive Summary
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-slate-800">
          <CardHeader className="border-b border-green-200 dark:border-green-800 bg-green-100 dark:bg-slate-700">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
              <div>
                <CardTitle className="text-green-900 dark:text-green-100">Executive Report Generated</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  C-suite ready business intelligence summary
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-green-600 dark:bg-green-700 text-white">EXECUTIVE</Badge>
            </div>
          </CardHeader>
           <CardContent className="p-6">
             <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-green-200 dark:border-green-800">
               <MarkdownRenderer content={results} />
             </div>
           </CardContent>
        </Card>
      )}

      {/* Report Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Crown className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">C-Suite Ready</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Executive-level presentation format</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Strategic Insights</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Key business intelligence & trends</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Executive Visuals</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Board-ready charts & dashboards</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-600 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Recommendations</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">Actionable strategic guidance</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
