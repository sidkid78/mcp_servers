'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Target, 
  Search, 
  BarChart3,
  TrendingUp,
  Activity,
  CheckCircle2,
  Database,
  Eye,
  Lightbulb,
  Filter
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface InsightInvestigationProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function InsightInvestigation({ onExecutePrompt }: InsightInvestigationProps) {
  const [datasetName, setDatasetName] = useState('');
  const [focusArea, setFocusArea] = useState('');
  const [businessQuestions, setBusinessQuestions] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const focusAreas = [
    { value: 'ALL', label: 'All Areas (Comprehensive)' },
    { value: 'revenue', label: 'Revenue & Sales Performance' },
    { value: 'customer', label: 'Customer Behavior & Segmentation' },
    { value: 'operations', label: 'Operational Efficiency' },
    { value: 'marketing', label: 'Marketing & Campaign Effectiveness' },
    { value: 'financial', label: 'Financial Performance & KPIs' },
    { value: 'product', label: 'Product Performance & Analysis' },
    { value: 'risk', label: 'Risk Assessment & Management' },
    { value: 'growth', label: 'Growth Opportunities & Trends' }
  ];

  const quickQuestions = [
    'What are the key drivers of revenue growth?',
    'Which customer segments are most profitable?',
    'What factors influence customer retention?',
    'How do marketing campaigns impact sales?',
    'What are the main cost centers and optimization opportunities?',
    'Which products or services perform best?'
  ];

  // Filter quick questions based on search query
  const filteredQuestions = quickQuestions.filter(question =>
    question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!datasetName.trim()) return;
    
    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        dataset_name: datasetName.trim()
      };
      
      if (focusArea && focusArea !== 'ALL') {
        params.focus_area = focusArea;
      }
      
      if (businessQuestions.trim()) {
        params.business_questions = businessQuestions.trim();
      }

      const result = await onExecutePrompt('insight-investigation', params);
      setResults(result);
    } catch (error) {
      console.error('Insight investigation failed:', error);
      setResults('Error: Failed to investigate insights. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Investigation Overview */}
      <Card className="border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-cyan-900 dark:text-cyan-100 mb-1">Guided Insight Investigation</h3>
              <p className="text-sm text-cyan-800 dark:text-cyan-200 mb-2">
                AI-powered exploration of business metrics with guided analysis to uncover actionable insights and answer key business questions.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-cyan-700 border-cyan-300 dark:text-cyan-300 dark:border-cyan-700 bg-white dark:bg-cyan-950/30">
                  Guided Analysis
                </Badge>
                <Badge variant="outline" className="text-cyan-700 border-cyan-300 dark:text-cyan-300 dark:border-cyan-700 bg-white dark:bg-cyan-950/30">
                  Business Metrics
                </Badge>
                <Badge variant="outline" className="text-cyan-700 border-cyan-300 dark:text-cyan-300 dark:border-cyan-700 bg-white dark:bg-cyan-950/30">
                  Key Insights
                </Badge>
                <Badge variant="outline" className="text-cyan-700 border-cyan-300 dark:text-cyan-300 dark:border-cyan-700 bg-white dark:bg-cyan-950/30">
                  Interactive
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investigation Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Investigation Parameters</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure your business intelligence investigation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Dataset Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Database className="h-4 w-4" />
                Dataset Name *
              </Label>
              <Input
                value={datasetName}
                onChange={(e) => setDatasetName(e.target.value)}
                placeholder="e.g., sales_data, customer_data, financial_metrics"
                className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-cyan-500 dark:focus:border-cyan-400"
              />
            </div>

            {/* Focus Area */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Filter className="h-4 w-4" />
                Investigation Focus
              </Label>
              <Select value={focusArea || 'ALL'} onValueChange={(value) => setFocusArea(value === 'ALL' ? '' : value)}>
                <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:border-cyan-500 dark:focus:border-cyan-400">
                  <SelectValue placeholder="Select investigation focus" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                  {focusAreas.map((area) => (
                    <SelectItem key={area.value} value={area.value} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700">
                      {area.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Business Questions */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Lightbulb className="h-4 w-4" />
                Business Questions (Optional)
              </Label>
              <Textarea
                value={businessQuestions}
                onChange={(e) => setBusinessQuestions(e.target.value)}
                placeholder="What specific business questions would you like to investigate?"
                rows={3}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-cyan-500 dark:focus:border-cyan-400"
              />
              
              {/* Search for Quick Questions */}
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search quick questions..."
                    className="pl-10 pr-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-cyan-500 dark:focus:border-cyan-400"
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleSearchClear}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100"
                    >
                      ×
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map((question, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setBusinessQuestions(question)}
                        className="text-xs text-left justify-start h-auto py-2 px-3 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
                      >
                        {question}
                      </Button>
                    ))
                  ) : searchQuery ? (
                    <div className="col-span-2 text-center py-4 text-sm text-slate-500 dark:text-slate-400">
                      No questions found matching &quot;{searchQuery}&quot;
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Execute Investigation */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 transition-colors"
              disabled={isLoading || !datasetName.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Investigating Insights...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Start Investigation
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
                <CardTitle className="text-green-900 dark:text-green-100">Investigation Complete</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Business insights and metrics analysis results
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-green-600 text-white dark:bg-green-700 dark:text-green-100">INSIGHTS</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Investigation Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Eye className="h-6 w-6 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Guided Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">AI-driven investigation workflow</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Business Metrics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">KPI analysis & performance tracking</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Key Insights</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Actionable business intelligence</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Trend Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Pattern recognition & forecasting</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
