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
  Brain, 
  Database,
  Activity,
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  Zap,
  Users,
  DollarSign,
  Settings
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ActionRecommendationsProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function ActionRecommendations({ onExecutePrompt }: ActionRecommendationsProps) {
  const [datasetName, setDatasetName] = useState('');
  const [businessGoals, setBusinessGoals] = useState('');
  const [priorityAreas, setPriorityAreas] = useState<string[]>([]);
  const [timeHorizon, setTimeHorizon] = useState('6M');
  const [resourceConstraints, setResourceConstraints] = useState('');
  const [includeImplementation, setIncludeImplementation] = useState(true);
  const [includeMetrics, setIncludeMetrics] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const priorityOptions = [
    { value: 'revenue', label: 'Revenue Growth', description: 'Focus on increasing sales and revenue' },
    { value: 'efficiency', label: 'Operational Efficiency', description: 'Improve processes and reduce costs' },
    { value: 'customer', label: 'Customer Experience', description: 'Enhance customer satisfaction and retention' },
    { value: 'innovation', label: 'Innovation & Growth', description: 'New products, services, and markets' },
    { value: 'risk', label: 'Risk Mitigation', description: 'Reduce business risks and vulnerabilities' },
    { value: 'talent', label: 'Talent & Culture', description: 'Improve workforce and organizational culture' },
    { value: 'digital', label: 'Digital Transformation', description: 'Technology adoption and modernization' },
    { value: 'sustainability', label: 'Sustainability', description: 'Environmental and social responsibility' }
  ];

  const timeHorizons = [
    { value: '1M', label: 'Immediate (1 Month)' },
    { value: '3M', label: 'Short-term (3 Months)' },
    { value: '6M', label: 'Medium-term (6 Months)' },
    { value: '1Y', label: 'Long-term (1 Year)' },
    { value: '2Y', label: 'Strategic (2+ Years)' }
  ];

  const goalSuggestions = [
    'Increase revenue by 25% while maintaining profit margins',
    'Improve customer satisfaction scores and reduce churn rate',
    'Optimize operational costs and increase efficiency by 15%',
    'Expand into new markets and increase market share',
    'Enhance digital capabilities and customer experience',
    'Develop new products and innovation pipeline'
  ];

  const constraintSuggestions = [
    'Limited budget - focus on high-ROI initiatives',
    'Small team - need efficient, scalable solutions',
    'Regulatory compliance requirements must be maintained',
    'Legacy systems integration challenges',
    'Competitive market pressure - need fast implementation'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!datasetName.trim()) return;
    
    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        dataset_name: datasetName.trim(),
        time_horizon: timeHorizon,
        include_implementation: includeImplementation,
        include_metrics: includeMetrics
      };
      
      if (businessGoals.trim()) {
        params.business_goals = businessGoals.trim();
      }
      
      if (priorityAreas.length > 0) {
        params.priority_areas = priorityAreas;
      }
      
      if (resourceConstraints.trim()) {
        params.resource_constraints = resourceConstraints.trim();
      }

      const result = await onExecutePrompt('action-recommendations', params);
      setResults(result);
    } catch (error) {
      console.error('Action recommendations failed:', error);
      setResults('Error: Failed to generate action recommendations. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePriorityToggle = (area: string) => {
    setPriorityAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  return (
    <div className="space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen p-6">
      {/* Action Recommendations Overview */}
      <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">Strategic Action Intelligence</h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-2">
                AI-powered analysis to generate data-driven business recommendations with implementation strategies and success metrics.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-600 dark:bg-indigo-900/20">
                  Strategic Planning
                </Badge>
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-600 dark:bg-indigo-900/20">
                  Implementation Plans
                </Badge>
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-600 dark:bg-indigo-900/20">
                  Success Metrics
                </Badge>
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-600 dark:bg-indigo-900/20">
                  ROI Analysis
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Strategic Analysis Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure your business intelligence and action planning parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 bg-white dark:bg-slate-900">
            {/* Dataset and Time Horizon */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Database className="h-4 w-4" />
                  Dataset Name *
                </Label>
                <Input
                  value={datasetName}
                  onChange={(e) => setDatasetName(e.target.value)}
                  placeholder="e.g., business_data, performance_metrics"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Target className="h-4 w-4" />
                  Time Horizon
                </Label>
                <Select value={timeHorizon} onValueChange={setTimeHorizon}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    {timeHorizons.map((horizon) => (
                      <SelectItem key={horizon.value} value={horizon.value} className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700">
                        {horizon.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Business Goals */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <TrendingUp className="h-4 w-4" />
                Business Goals & Objectives
              </Label>
              <Textarea
                value={businessGoals}
                onChange={(e) => setBusinessGoals(e.target.value)}
                placeholder="Describe your key business goals and objectives..."
                rows={3}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {goalSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBusinessGoals(suggestion)}
                    className="text-xs text-left justify-start h-auto py-2 px-3 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Priority Areas */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Lightbulb className="h-4 w-4" />
                Priority Areas
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {priorityOptions.map((option) => (
                  <div key={option.value} className="flex items-start space-x-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                    <Checkbox
                      id={option.value}
                      checked={priorityAreas.includes(option.value)}
                      onCheckedChange={() => handlePriorityToggle(option.value)}
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

            {/* Resource Constraints */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Users className="h-4 w-4" />
                Resource Constraints (Optional)
              </Label>
              <Textarea
                value={resourceConstraints}
                onChange={(e) => setResourceConstraints(e.target.value)}
                placeholder="Describe any budget, time, or resource constraints..."
                rows={2}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
              <div className="grid grid-cols-1 gap-2">
                {constraintSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setResourceConstraints(suggestion)}
                    className="text-xs text-left justify-start h-auto py-2 px-3 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Report Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Recommendation Options</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                  <Checkbox
                    id="implementation"
                    checked={includeImplementation}
                    onCheckedChange={(checked) => setIncludeImplementation(checked === true)}
                    className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
                  />
                  <div className="flex-1">
                    <Label htmlFor="implementation" className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                      Implementation Plans
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Include step-by-step implementation strategies</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                  <Checkbox
                    id="metrics"
                    checked={includeMetrics}
                    onCheckedChange={(checked) => setIncludeMetrics(checked === true)}
                    className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
                  />
                  <div className="flex-1">
                    <Label htmlFor="metrics" className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                      Success Metrics
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Include KPIs and measurement frameworks</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Configuration:</span>
              {datasetName && (
                <Badge variant="secondary" className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700">
                  Dataset: {datasetName}
                </Badge>
              )}
              <Badge variant="secondary" className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700">
                Horizon: {timeHorizons.find(h => h.value === timeHorizon)?.label}
              </Badge>
              <Badge variant="secondary" className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700">
                Priorities: {priorityAreas.length}
              </Badge>
              {includeImplementation && (
                <Badge variant="secondary" className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700">
                  Implementation
                </Badge>
              )}
              {includeMetrics && (
                <Badge variant="secondary" className="text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 border-indigo-300 dark:border-indigo-700">
                  Metrics
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generate Recommendations */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 border-0"
              disabled={isLoading || !datasetName.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Generating Recommendations...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Action Recommendations
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
          <CardHeader className="border-b border-green-200 bg-green-100 dark:border-green-800 dark:bg-green-900/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
              <div>
                <CardTitle className="text-green-900 dark:text-green-100">Strategic Recommendations Generated</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Data-driven action plan with implementation strategies
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-green-600 text-white dark:bg-green-700 dark:text-green-100">STRATEGIC</Badge>
            </div>
          </CardHeader>
           <CardContent className="p-6 bg-green-50 dark:bg-green-950/50">
             <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-green-200 dark:border-green-800">
               <MarkdownRenderer content={results} />
             </div>
           </CardContent>
        </Card>
      )}

      {/* Recommendation Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Brain className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">AI-Powered</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Intelligent recommendation engine</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Strategic Focus</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Goal-aligned action planning</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Implementation</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Step-by-step execution plans</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">ROI Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Investment return projections</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
