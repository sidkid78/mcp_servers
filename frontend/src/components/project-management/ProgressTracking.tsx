import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  Target,
  CheckCircle,
  AlertTriangle,
  Zap,
  Eye
} from 'lucide-react';

interface ProgressTrackingProps {
  onExecutePrompt?: (prompt: string, params: unknown) => Promise<unknown>;
}

export function ProgressTracking({ onExecutePrompt }: ProgressTrackingProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    reviewPeriod: 'current_sprint',
    includePredictions: true,
    detailedMetrics: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTracking = async () => {
    if (!formData.projectId.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onExecutePrompt?.('progress-review', {
        project_id: formData.projectId,
        review_period: formData.reviewPeriod
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reviewPeriods = [
    { value: 'current_sprint', label: 'Current Sprint', description: '2-week sprint review' },
    { value: 'weekly', label: 'Weekly Review', description: 'Last 7 days progress' },
    { value: 'monthly', label: 'Monthly Review', description: 'Full month analysis' },
    { value: 'project_to_date', label: 'Project to Date', description: 'Complete project review' }
  ];

  const progressMetrics = [
    {
      label: "Overall Progress",
      value: 68,
      status: "on_track",
      trend: "up",
      icon: <Target className="h-4 w-4" />
    },
    {
      label: "Schedule Performance",
      value: 92,
      status: "good",
      trend: "stable",
      icon: <Clock className="h-4 w-4" />
    },
    {
      label: "Quality Score",
      value: 95,
      status: "excellent",
      trend: "up",
      icon: <CheckCircle className="h-4 w-4" />
    },
    {
      label: "Team Velocity",
      value: 85,
      status: "good",
      trend: "down",
      icon: <TrendingUp className="h-4 w-4" />
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950';
      case 'good': return 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-950';
      case 'on_track': return 'text-orange-600 bg-orange-50 dark:text-orange-400 dark:bg-orange-950';
      default: return 'text-gray-600 bg-gray-50 dark:text-gray-400 dark:bg-gray-900';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-green-500 dark:text-green-400" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-red-500 dark:text-red-400 rotate-180" />;
      default: return <TrendingUp className="h-3 w-3 text-gray-500 dark:text-gray-400 rotate-90" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
            <Activity className="h-6 w-6" />
            Progress Tracking & Review
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Real-time progress monitoring with AI-powered bottleneck detection and predictive analytics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tracking Input Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectId" className="text-sm font-medium dark:text-gray-200">
                  Project ID *
                </Label>
                <Input
                  id="projectId"
                  placeholder="Enter project ID (e.g., proj_abc123)..."
                  value={formData.projectId}
                  onChange={(e) => handleInputChange('projectId', e.target.value)}
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="reviewPeriod" className="text-sm font-medium dark:text-gray-200">
                  Review Period
                </Label>
                <Select
                  value={formData.reviewPeriod}
                  onValueChange={(value) => handleInputChange('reviewPeriod', value)}
                >
                  <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    {reviewPeriods.map((period) => (
                      <SelectItem key={period.value} value={period.value} className="dark:text-gray-100 dark:hover:bg-gray-700">
                        <div>
                          <div className="font-medium">{period.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{period.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includePredictions"
                    checked={formData.includePredictions}
                    onCheckedChange={(checked) => handleInputChange('includePredictions', checked as boolean)}
                    className="dark:border-gray-600 dark:data-[state=checked]:bg-orange-600"
                  />
                  <Label htmlFor="includePredictions" className="text-sm dark:text-gray-200">
                    Include completion predictions
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="detailedMetrics"
                    checked={formData.detailedMetrics}
                    onCheckedChange={(checked) => handleInputChange('detailedMetrics', checked as boolean)}
                    className="dark:border-gray-600 dark:data-[state=checked]:bg-orange-600"
                  />
                  <Label htmlFor="detailedMetrics" className="text-sm dark:text-gray-200">
                    Include detailed performance metrics
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleTracking}
                disabled={!formData.projectId.trim() || isLoading}
                className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                <Activity className="h-4 w-4 mr-2" />
                {isLoading ? 'Analyzing Progress...' : 'Generate Progress Report'}
              </Button>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Progress Analysis Features:
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Real-time Status</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Current milestone progress and completion rates
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-100">Bottleneck Detection</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Identifies blockers and performance bottlenecks
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Performance Metrics</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Team velocity, quality scores, and efficiency
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">Predictive Analytics</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Completion forecasts with confidence levels
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Progress Metrics */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Current Progress Snapshot
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Real-time project performance indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {progressMetrics.map((metric, index) => (
              <div key={index} className={`p-4 rounded-lg ${getStatusColor(metric.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {metric.icon}
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  {getTrendIcon(metric.trend)}
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{metric.value}%</div>
                  <Progress value={metric.value} className="h-2" />
                </div>
                <Badge variant="outline" className="mt-2 text-xs dark:border-gray-600 dark:text-gray-300">
                  {metric.status.replace('_', ' ')}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking Features */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Zap className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Advanced Tracking Features
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Comprehensive progress monitoring capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-medium dark:text-gray-100">Milestone Tracking</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Real-time milestone progress with completion forecasting
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Completion percentage tracking</li>
                <li>• Schedule variance analysis</li>
                <li>• Dependency impact assessment</li>
              </ul>
            </div>

            <div className="p-4 border border-green-200 dark:border-green-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-medium dark:text-gray-100">Performance Analytics</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Team velocity and quality metrics with trend analysis
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Velocity trend monitoring</li>
                <li>• Quality score tracking</li>
                <li>• Resource utilization rates</li>
              </ul>
            </div>

            <div className="p-4 border border-red-200 dark:border-red-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                <h4 className="font-medium dark:text-gray-100">Risk Indicators</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Early warning system for project risks and blockers
              </p>
              <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <li>• Schedule delay alerts</li>
                <li>• Quality threshold warnings</li>
                <li>• Resource constraint detection</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Period Options */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">Review Period Selection</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Choose the appropriate review timeframe for your analysis needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reviewPeriods.map((period) => (
              <div
                key={period.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.reviewPeriod === period.value
                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-950 dark:border-orange-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-500'
                }`}
                onClick={() => handleInputChange('reviewPeriod', period.value)}
              >
                <h4 className="font-medium mb-1 dark:text-gray-100">{period.label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {period.description}
                </p>
                {formData.reviewPeriod === period.value && (
                  <Badge className="mt-2 bg-orange-600 dark:bg-orange-600">Selected</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
