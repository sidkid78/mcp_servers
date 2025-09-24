import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  Shield, 
  TrendingDown, 
  Target, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign
} from 'lucide-react';

interface RiskAssessmentProps {
  onExecutePrompt?: (prompt: string, params: unknown) => Promise<unknown>;
}

export function RiskAssessment({ onExecutePrompt }: RiskAssessmentProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    assessmentScope: 'comprehensive'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAssessment = async () => {
    if (!formData.projectId.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onExecutePrompt?.('risk-assessment', {
        project_id: formData.projectId,
        assessment_scope: formData.assessmentScope
      });
    } finally {
      setIsLoading(false);
    }
  };

  const assessmentScopes = [
    { 
      value: 'comprehensive', 
      label: 'Comprehensive Assessment', 
      description: 'Full risk analysis across all categories',
      icon: <Shield className="h-4 w-4" />
    },
    { 
      value: 'technical', 
      label: 'Technical Risks Only', 
      description: 'Focus on technical and implementation risks',
      icon: <Target className="h-4 w-4" />
    },
    { 
      value: 'schedule', 
      label: 'Schedule & Timeline', 
      description: 'Timeline and delivery-focused assessment',
      icon: <Clock className="h-4 w-4" />
    },
    { 
      value: 'budget', 
      label: 'Budget & Resources', 
      description: 'Financial and resource constraint analysis',
      icon: <DollarSign className="h-4 w-4" />
    }
  ];

  const riskCategories = [
    {
      category: "Technical",
      risks: 3,
      severity: "high",
      color: "red",
      icon: <Target className="h-5 w-5" />,
      description: "Technology integration and complexity risks",
      progress: 65,
      trend: "down"
    },
    {
      category: "Schedule",
      risks: 2,
      severity: "medium",
      color: "orange",
      icon: <Clock className="h-5 w-5" />,
      description: "Timeline and delivery schedule risks",
      progress: 40,
      trend: "up"
    },
    {
      category: "Resource",
      risks: 4,
      severity: "medium",
      color: "yellow",
      icon: <Shield className="h-5 w-5" />,
      description: "Team capacity and skill availability risks",
      progress: 75,
      trend: "stable"
    },
    {
      category: "External",
      risks: 1,
      severity: "low",
      color: "green",
      icon: <Eye className="h-5 w-5" />,
      description: "Third-party dependencies and external factors",
      progress: 20,
      trend: "down"
    }
  ];

  const riskMatrix = [
    { probability: "High", impact: "High", count: 2, severity: "critical" },
    { probability: "High", impact: "Medium", count: 1, severity: "high" },
    { probability: "High", impact: "Low", count: 0, severity: "medium" },
    { probability: "Medium", impact: "High", count: 3, severity: "high" },
    { probability: "Medium", impact: "Medium", count: 2, severity: "medium" },
    { probability: "Medium", impact: "Low", count: 1, severity: "low" },
    { probability: "Low", impact: "High", count: 1, severity: "medium" },
    { probability: "Low", impact: "Medium", count: 1, severity: "low" },
    { probability: "Low", impact: "Low", count: 0, severity: "low" }
  ];

  const mitigationStatus = [
    {
      risk: "Database Migration Complexity",
      status: "in-progress",
      progress: 60,
      owner: "Tech Team",
      dueDate: "2024-02-15"
    },
    {
      risk: "Third-party API Dependencies",
      status: "completed",
      progress: 100,
      owner: "Integration Team",
      dueDate: "2024-01-30"
    },
    {
      risk: "Resource Availability",
      status: "not-started",
      progress: 0,
      owner: "PM Team",
      dueDate: "2024-02-20"
    },
    {
      risk: "Security Compliance",
      status: "blocked",
      progress: 25,
      owner: "Security Team",
      dueDate: "2024-02-10"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white dark:bg-red-700';
      case 'high': return 'bg-red-500 text-white dark:bg-red-600';
      case 'medium': return 'bg-yellow-500 text-white dark:bg-yellow-600';
      case 'low': return 'bg-green-500 text-white dark:bg-green-600';
      default: return 'bg-gray-400 text-white dark:bg-gray-600';
    }
  };

  const getCategoryColor = (color: string) => {
    switch (color) {
      case 'red': return 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950';
      case 'orange': return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950';
      case 'yellow': return 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950';
      case 'green': return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950';
      default: return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-950';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingDown className="h-4 w-4 text-red-500 rotate-180" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'stable': return <div className="h-4 w-4 border-t-2 border-gray-500 dark:border-gray-400"></div>;
      default: return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'blocked': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'not-started': return <div className="h-4 w-4 border-2 border-gray-400 dark:border-gray-500 rounded-full"></div>;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700';
      case 'blocked': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
      case 'not-started': return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
            Risk Assessment & Mitigation
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            AI-powered risk identification with comprehensive mitigation strategies and monitoring plans.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assessment Input Form */}
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
                  className="mt-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                />
              </div>

              <div>
                <Label htmlFor="assessmentScope" className="text-sm font-medium dark:text-gray-200">
                  Assessment Scope
                </Label>
                <Select
                  value={formData.assessmentScope}
                  onValueChange={(value) => handleInputChange('assessmentScope', value)}
                >
                  <SelectTrigger className="mt-1 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-800 dark:border-gray-600">
                    {assessmentScopes.map((scope) => (
                      <SelectItem key={scope.value} value={scope.value} className="dark:text-gray-100 dark:hover:bg-gray-700">
                        <div className="flex items-center gap-2">
                          {scope.icon}
                          <div>
                            <div className="font-medium">{scope.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{scope.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleAssessment}
                disabled={!formData.projectId.trim() || isLoading}
                className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                {isLoading ? 'Analyzing Risks...' : 'Assess Project Risks'}
              </Button>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Risk Analysis Includes:
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-100">Risk Identification</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Comprehensive scanning across technical, schedule, and resource risks
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <Target className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Impact Assessment</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Probability and impact analysis with risk matrix visualization
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Mitigation Strategies</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Actionable mitigation plans with prevention and contingency options
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">Monitoring Plan</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Continuous monitoring setup with early warning indicators
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Categories Overview */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Risk Categories Overview
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Current risk distribution across different project areas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskCategories.map((category, index) => (
              <div key={index} className={`p-4 border rounded-lg ${getCategoryColor(category.color)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <h4 className="font-medium dark:text-gray-100">{category.category}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(category.trend)}
                    <Badge variant="outline" className={`${category.severity === 'high' ? 'border-red-500 text-red-700 dark:border-red-400 dark:text-red-300' : category.severity === 'medium' ? 'border-orange-500 text-orange-700 dark:border-orange-400 dark:text-orange-300' : 'border-green-500 text-green-700 dark:border-green-400 dark:text-green-300'}`}>
                      {category.severity}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {category.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold dark:text-gray-100">{category.risks}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">risks identified</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="dark:text-gray-300">Risk Level</span>
                      <span className="dark:text-gray-300">{category.progress}%</span>
                    </div>
                    <Progress value={category.progress} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Matrix */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Target className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Risk Probability vs Impact Matrix
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Visual representation of risk severity based on probability and impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2">
            <div></div>
            <div className="text-center font-medium text-sm dark:text-gray-200">Low Impact</div>
            <div className="text-center font-medium text-sm dark:text-gray-200">Medium Impact</div>
            <div className="text-center font-medium text-sm dark:text-gray-200">High Impact</div>
            
            <div className="font-medium text-sm dark:text-gray-200">High Prob</div>
            {riskMatrix.slice(0, 3).map((cell, i) => (
              <div key={i} className={`p-3 rounded text-center ${getSeverityColor(cell.severity)}`}>
                <div className="font-bold">{cell.count}</div>
                <div className="text-xs">risks</div>
              </div>
            ))}
            
            <div className="font-medium text-sm dark:text-gray-200">Med Prob</div>
            {riskMatrix.slice(3, 6).map((cell, i) => (
              <div key={i} className={`p-3 rounded text-center ${getSeverityColor(cell.severity)}`}>
                <div className="font-bold">{cell.count}</div>
                <div className="text-xs">risks</div>
              </div>
            ))}
            
            <div className="font-medium text-sm dark:text-gray-200">Low Prob</div>
            {riskMatrix.slice(6, 9).map((cell, i) => (
              <div key={i} className={`p-3 rounded text-center ${getSeverityColor(cell.severity)}`}>
                <div className="font-bold">{cell.count}</div>
                <div className="text-xs">risks</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 dark:bg-red-700 rounded"></div>
              <span className="dark:text-gray-200">Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 dark:bg-red-600 rounded"></div>
              <span className="dark:text-gray-200">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 dark:bg-yellow-600 rounded"></div>
              <span className="dark:text-gray-200">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 dark:bg-green-600 rounded"></div>
              <span className="dark:text-gray-200">Low</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mitigation Progress Tracking */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            Risk Mitigation Progress
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Track the progress of risk mitigation strategies and action items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mitigationStatus.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(item.status)}
                    <h4 className="font-medium dark:text-gray-100">{item.risk}</h4>
                  </div>
                  <Badge className={`${getStatusColor(item.status)} border`}>
                    {item.status.replace('-', ' ')}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Owner:</span>
                    <p className="font-medium dark:text-gray-200">{item.owner}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Due Date:</span>
                    <p className="font-medium dark:text-gray-200">{item.dueDate}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Progress:</span>
                    <p className="font-medium dark:text-gray-200">{item.progress}%</p>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Progress value={item.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Scope Options */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="dark:text-gray-100">Assessment Scope Selection</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Choose the focus area for your risk assessment analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {assessmentScopes.map((scope) => (
              <div
                key={scope.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.assessmentScope === scope.value
                    ? 'border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600'
                }`}
                onClick={() => handleInputChange('assessmentScope', scope.value)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {scope.icon}
                  <h4 className="font-medium dark:text-gray-100">{scope.label}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {scope.description}
                </p>
                {formData.assessmentScope === scope.value && (
                  <Badge className="mt-2 bg-red-600 dark:bg-red-700">Selected</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Management Process */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            Risk Management Process
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Systematic approach to risk identification and mitigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h4 className="font-medium mb-2 dark:text-gray-100">1. Identify</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive risk scanning across all project dimensions
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-medium mb-2 dark:text-gray-100">2. Assess</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Probability and impact analysis with risk prioritization
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium mb-2 dark:text-gray-100">3. Mitigate</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Strategic mitigation plans with monitoring and contingencies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
