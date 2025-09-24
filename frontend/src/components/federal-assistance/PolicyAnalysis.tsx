'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  TrendingUp, 
  BarChart3, 
  Building2, 
  DollarSign,
  Calendar,
  Globe,
  FileText,
  Sparkles,
  CheckCircle2,
  PieChart,
  LineChart,
  Activity,
  Filter,
  Target,
  Lightbulb
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface PolicyAnalysisProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function PolicyAnalysis({ onExecutePrompt }: PolicyAnalysisProps) {
  const [focusArea, setFocusArea] = useState('comprehensive');
  const [timeRange, setTimeRange] = useState('3_years');
  const [departments, setDepartments] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [assistanceTypes, setAssistanceTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [reportFormat, setReportFormat] = useState('summary');
  const [chartType, setChartType] = useState('trend');

  const focusAreas = [
    { 
      value: 'comprehensive', 
      label: 'Comprehensive Analysis', 
      description: 'Full policy landscape overview across all sectors',
      icon: Globe
    },
    { 
      value: 'department', 
      label: 'Department Analysis', 
      description: 'Focus on specific federal departments',
      icon: Building2
    },
    { 
      value: 'sector', 
      label: 'Sector Analysis', 
      description: 'Analyze specific policy sectors',
      icon: Target
    },
    { 
      value: 'assistance_type', 
      label: 'Assistance Type Analysis', 
      description: 'Focus on funding mechanism trends',
      icon: DollarSign
    },
    { 
      value: 'geographic', 
      label: 'Geographic Analysis', 
      description: 'Regional and state-level policy patterns',
      icon: Globe
    }
  ];

  const timeRanges = [
    { value: '1_year', label: 'Past Year', description: 'Recent policy developments' },
    { value: '2_years', label: 'Past 2 Years', description: 'Short-term trends' },
    { value: '3_years', label: 'Past 3 Years', description: 'Medium-term patterns' },
    { value: '5_years', label: 'Past 5 Years', description: 'Long-term trends' },
    { value: 'current_admin', label: 'Current Administration', description: 'Policy under current leadership' }
  ];

  const reportFormats = [
    { value: 'summary', label: 'Executive Summary', description: 'High-level overview with key insights' },
    { value: 'detailed', label: 'Detailed Report', description: 'Comprehensive analysis with data tables' },
    { value: 'briefing', label: 'Policy Briefing', description: 'Structured briefing format for stakeholders' },
    { value: 'strategic', label: 'Strategic Assessment', description: 'Strategic recommendations and opportunities' }
  ];

  const chartTypes = [
    { value: 'trend', label: 'Trend Analysis', description: 'Time-series visualization of funding patterns' },
    { value: 'comparison', label: 'Comparative Analysis', description: 'Side-by-side comparison charts' },
    { value: 'distribution', label: 'Distribution Analysis', description: 'Funding distribution across categories' },
    { value: 'correlation', label: 'Correlation Analysis', description: 'Relationship between variables' }
  ];

  const departmentOptions = [
    { value: 'HHS', label: 'Health & Human Services' },
    { value: 'ED', label: 'Education' },
    { value: 'USDA', label: 'Agriculture' },
    { value: 'DOJ', label: 'Justice' },
    { value: 'HUD', label: 'Housing & Urban Development' },
    { value: 'DOT', label: 'Transportation' },
    { value: 'EPA', label: 'Environmental Protection' },
    { value: 'DOL', label: 'Labor' },
    { value: 'DOC', label: 'Commerce' },
    { value: 'DOE', label: 'Energy' },
    { value: 'DHS', label: 'Homeland Security' },
    { value: 'VA', label: 'Veterans Affairs' },
    { value: 'DOI', label: 'Interior' },
    { value: 'DOS', label: 'State' },
    { value: 'DOD', label: 'Defense' },
    { value: 'TREAS', label: 'Treasury' }
  ];

  const sectorOptions = [
    { value: 'healthcare', label: 'Healthcare & Medical Research' },
    { value: 'education', label: 'Education & Training' },
    { value: 'social_services', label: 'Social Services & Welfare' },
    { value: 'environment', label: 'Environment & Climate' },
    { value: 'infrastructure', label: 'Infrastructure & Transportation' },
    { value: 'economic_development', label: 'Economic Development' },
    { value: 'public_safety', label: 'Public Safety & Justice' },
    { value: 'agriculture', label: 'Agriculture & Food' },
    { value: 'technology', label: 'Technology & Innovation' },
    { value: 'housing', label: 'Housing & Community Development' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'veterans', label: 'Veterans Affairs' },
    { value: 'arts_culture', label: 'Arts & Culture' },
    { value: 'international', label: 'International Affairs' }
  ];

  const assistanceTypeOptions = [
    { value: 'project_grants', label: 'Project Grants' },
    { value: 'formula_grants', label: 'Formula Grants' },
    { value: 'cooperative_agreements', label: 'Cooperative Agreements' },
    { value: 'block_grants', label: 'Block Grants' },
    { value: 'direct_payments', label: 'Direct Payments' },
    { value: 'loans', label: 'Loans & Loan Guarantees' },
    { value: 'insurance', label: 'Insurance Programs' },
    { value: 'technical_assistance', label: 'Technical Assistance' }
  ];

  const quickAnalyses = [
    { 
      focus: 'comprehensive', 
      timeRange: '3_years',
      title: 'Federal Policy Landscape',
      description: 'Complete overview of federal funding trends and policy directions'
    },
    { 
      focus: 'department', 
      timeRange: '2_years',
      title: 'Department Comparison',
      description: 'Compare funding priorities across federal departments'
    },
    { 
      focus: 'sector', 
      timeRange: '5_years',
      title: 'Long-term Sector Trends',
      description: 'Analyze 5-year trends in key policy sectors'
    },
    { 
      focus: 'assistance_type', 
      timeRange: '3_years',
      title: 'Funding Mechanism Trends',
      description: 'How federal funding mechanisms are evolving'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const params: Record<string, unknown> = {
        focus_area: focusArea,
        time_range: timeRange,
        report_format: reportFormat,
        chart_type: chartType
      };

      // Add filters if specified
      if (departments.length > 0) params.departments = departments;
      if (sectors.length > 0) params.sectors = sectors;
      if (assistanceTypes.length > 0) params.assistance_types = assistanceTypes;

      const result = await onExecutePrompt('policy-analysis', params);
      setResults(result);
    } catch (error) {
      console.error('Policy analysis failed:', error);
      setResults('Error: Failed to generate policy analysis. Please try again with different parameters.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAnalysis = (analysis: { focus: string; timeRange: string }) => {
    setFocusArea(analysis.focus);
    setTimeRange(analysis.timeRange);
    setDepartments([]);
    setSectors([]);
    setAssistanceTypes([]);
  };

  const handleDepartmentToggle = (dept: string) => {
    setDepartments(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const handleSectorToggle = (sector: string) => {
    setSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
  };

  const handleAssistanceTypeToggle = (type: string) => {
    setAssistanceTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setDepartments([]);
    setSectors([]);
    setAssistanceTypes([]);
  };

  const hasActiveFilters = departments.length > 0 || sectors.length > 0 || assistanceTypes.length > 0;

  return (
    <div className="space-y-6">
      {/* Quick Analysis Options */}
      <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-gray-900 dark:text-gray-100">
            <BarChart3 className="h-5 w-5" />
            Quick Policy Analyses
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Choose a pre-configured analysis or customize your own below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickAnalyses.map((analysis, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-slate-800"
                onClick={() => handleQuickAnalysis(analysis)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                      {timeRanges.find(t => t.value === analysis.timeRange)?.label}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {focusAreas.find(f => f.value === analysis.focus)?.label}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">{analysis.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{analysis.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Custom Analysis Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <TrendingUp className="h-5 w-5" />
              Custom Policy Analysis
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Configure your analysis focus area, time range, and filters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Focus Area and Time Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="focus-area" className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Target className="h-4 w-4" />
                  Analysis Focus
                </Label>
                <Select value={focusArea} onValueChange={setFocusArea}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600">
                    {focusAreas.map((focus) => (
                      <SelectItem key={focus.value} value={focus.value} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700">
                        <div className="flex items-center gap-2">
                          <focus.icon className="h-4 w-4" />
                          {focus.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {focusAreas.find(f => f.value === focusArea)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time-range" className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Calendar className="h-4 w-4" />
                  Time Range
                </Label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600">
                    {timeRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700">
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {timeRanges.find(r => r.value === timeRange)?.description}
                </p>
              </div>
            </div>

            {/* Report Format and Chart Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-format" className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <FileText className="h-4 w-4" />
                  Report Format
                </Label>
                <Select value={reportFormat} onValueChange={setReportFormat}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600">
                    {reportFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700">
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {reportFormats.find(f => f.value === reportFormat)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="chart-type" className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <LineChart className="h-4 w-4" />
                  Chart Type
                </Label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-600">
                    {chartTypes.map((chart) => (
                      <SelectItem key={chart.value} value={chart.value} className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700">
                        {chart.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {chartTypes.find(c => c.value === chartType)?.description}
                </p>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-slate-700"
              >
                <Filter className="h-4 w-4" />
                {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
              </Button>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
                {/* Departments Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <Building2 className="h-4 w-4" />
                    Filter by Departments
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {departmentOptions.map((dept) => (
                      <div key={dept.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`dept-${dept.value}`}
                          checked={departments.includes(dept.value)}
                          onCheckedChange={() => handleDepartmentToggle(dept.value)}
                          className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                        />
                        <Label htmlFor={`dept-${dept.value}`} className="text-sm cursor-pointer text-gray-900 dark:text-gray-100">
                          {dept.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sectors Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <PieChart className="h-4 w-4" />
                    Filter by Sectors
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {sectorOptions.map((sector) => (
                      <div key={sector.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sector-${sector.value}`}
                          checked={sectors.includes(sector.value)}
                          onCheckedChange={() => handleSectorToggle(sector.value)}
                          className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                        />
                        <Label htmlFor={`sector-${sector.value}`} className="text-sm cursor-pointer text-gray-900 dark:text-gray-100">
                          {sector.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assistance Types Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <DollarSign className="h-4 w-4" />
                    Filter by Assistance Types
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {assistanceTypeOptions.map((type) => (
                      <div key={type.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type.value}`}
                          checked={assistanceTypes.includes(type.value)}
                          onCheckedChange={() => handleAssistanceTypeToggle(type.value)}
                          className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500"
                        />
                        <Label htmlFor={`type-${type.value}`} className="text-sm cursor-pointer text-gray-900 dark:text-gray-100">
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Active Filters:</span>
                {departments.map((dept) => (
                  <Badge key={dept} variant="secondary" className="text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/50">
                    {departmentOptions.find(d => d.value === dept)?.label}
                  </Badge>
                ))}
                {sectors.map((sector) => (
                  <Badge key={sector} variant="secondary" className="text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/50">
                    {sectorOptions.find(s => s.value === sector)?.label}
                  </Badge>
                ))}
                {assistanceTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-800/50">
                    {assistanceTypeOptions.find(t => t.value === type)?.label}
                  </Badge>
                ))}
              </div>
            )}

            {/* Current Selection Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Analysis Configuration:</span>
              <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50">
                {focusAreas.find(f => f.value === focusArea)?.label}
              </Badge>
              <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50">
                {timeRanges.find(r => r.value === timeRange)?.label}
              </Badge>
              <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50">
                {reportFormats.find(f => f.value === reportFormat)?.label}
              </Badge>
              <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50">
                {chartTypes.find(c => c.value === chartType)?.label}
              </Badge>
              {hasActiveFilters && (
                <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-800/50">
                  {departments.length + sectors.length + assistanceTypes.length} Filters
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white" 
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin mr-2">
                <Sparkles className="h-4 w-4" />
              </div>
              Generating Analysis...
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Policy Analysis
            </>
          )}
        </Button>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle2 className="h-5 w-5" />
              Policy Analysis Results
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-300">
              Federal funding patterns, trends, and policy insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-200 dark:border-green-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">Trend Analysis</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Identify funding patterns and policy shifts</p>
          </CardContent>
        </Card>
        
        <Card className="text-center bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <PieChart className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">Sector Insights</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Compare funding across policy sectors</p>
          </CardContent>
        </Card>
        
        <Card className="text-center bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <Building2 className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">Department Analysis</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Agency priorities and funding patterns</p>
          </CardContent>
        </Card>
        
        <Card className="text-center bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700">
          <CardContent className="p-4">
            <Lightbulb className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-gray-100">Strategic Insights</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Actionable intelligence for grant seekers</p>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Federal Policy Analysis</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                Analyze federal funding trends, policy directions, and strategic opportunities across 
                departments, sectors, and assistance types. Use filters to focus on specific areas 
                of interest for your organization.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">
                  Trend Analysis
                </Badge>
                <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">
                  Department Comparison
                </Badge>
                <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">
                  Sector Insights
                </Badge>
                <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">
                  Strategic Intelligence
                </Badge>
                <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">
                  Policy Forecasting
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}