import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target,
  CheckCircle,
  BarChart3,
  Zap
} from 'lucide-react';

interface ResourceOptimizationProps {
  onExecutePrompt?: (prompt: string, params: unknown) => Promise<unknown>;
}

export function ResourceOptimization({ onExecutePrompt }: ResourceOptimizationProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    constraintType: 'time_and_budget'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptimization = async () => {
    if (!formData.projectId.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onExecutePrompt?.('resource-optimization', {
        project_id: formData.projectId,
        constraint_type: formData.constraintType
      });
    } finally {
      setIsLoading(false);
    }
  };

  const constraintTypes = [
    { 
      value: 'time_and_budget', 
      label: 'Balanced (Time + Budget)', 
      description: 'Optimal balance between speed and cost',
      icon: <Target className="h-4 w-4" />
    },
    { 
      value: 'time', 
      label: 'Time-Optimized', 
      description: 'Fastest delivery, higher resource cost',
      icon: <Clock className="h-4 w-4" />
    },
    { 
      value: 'budget', 
      label: 'Budget-Optimized', 
      description: 'Cost-efficient, may take longer',
      icon: <DollarSign className="h-4 w-4" />
    }
  ];

  const optimizationStrategies = [
    {
      title: "Skill-Based Assignment",
      description: "Matches team members to tasks based on expertise",
      icon: <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      benefits: ["Higher quality output", "Reduced rework", "Faster completion"]
    },
    {
      title: "Capacity Leveling",
      description: "Balances workload across team members",
      icon: <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />,
      benefits: ["Prevents burnout", "Improves morale", "Consistent velocity"]
    },
    {
      title: "Critical Path Focus",
      description: "Prioritizes resources on critical path tasks",
      icon: <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />,
      benefits: ["Faster delivery", "Risk mitigation", "Clear priorities"]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-900/70 dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <Users className="h-6 w-6" />
            Resource Optimization Workflow
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            AI-powered team allocation and capacity planning with intelligent resource optimization strategies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Optimization Input Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectId" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Project ID *
                </Label>
                <Input
                  id="projectId"
                  placeholder="Enter project ID (e.g., proj_abc123)..."
                  value={formData.projectId}
                  onChange={(e) => handleInputChange('projectId', e.target.value)}
                  className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Project must have completed milestone planning
                </p>
              </div>

              <div>
                <Label htmlFor="constraintType" className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Optimization Strategy
                </Label>
                <Select
                  value={formData.constraintType}
                  onValueChange={(value) => handleInputChange('constraintType', value)}
                >
                  <SelectTrigger className="mt-1 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                    {constraintTypes.map((constraint) => (
                      <SelectItem key={constraint.value} value={constraint.value} className="text-gray-900 dark:text-gray-100">
                        <div className="flex items-center gap-2">
                          {constraint.icon}
                          <div>
                            <div className="font-medium">{constraint.label}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{constraint.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleOptimization}
                disabled={!formData.projectId.trim() || isLoading}
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 text-white"
              >
                <Users className="h-4 w-4 mr-2" />
                {isLoading ? 'Optimizing Resources...' : 'Optimize Team Allocation'}
              </Button>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Optimization Analysis:
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-100 dark:border-blue-900">
                  <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Team Structure Design</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Optimal team composition based on project requirements
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-100 dark:border-green-900">
                  <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Capacity Analysis</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Utilization rates and workload distribution
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/50 rounded-lg border border-orange-100 dark:border-orange-900">
                  <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Cost Analysis</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Resource costs and budget optimization
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-100 dark:border-purple-900">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">Optimization Opportunities</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Identifies efficiency improvements and bottlenecks
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-100 dark:border-green-900">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <span className="font-medium text-green-900 dark:text-green-100">Optimization Results</span>
                </div>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Optimal team structure and roles</li>
                  <li>• Resource allocation timeline</li>
                  <li>• Capacity utilization metrics</li>
                  <li>• Cost breakdown and savings</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Strategies */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-900/70 dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <TrendingUp className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            Optimization Strategies
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            AI-powered strategies for optimal resource allocation and team performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {optimizationStrategies.map((strategy, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white/50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2 mb-3">
                  {strategy.icon}
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{strategy.title}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {strategy.description}
                </p>
                <div className="space-y-1">
                  {strategy.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <CheckCircle className="h-3 w-3 text-green-500 dark:text-green-400" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Constraint Types Details */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-900/70 dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            Optimization Approaches
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Choose the optimization approach that best fits your project constraints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {constraintTypes.map((constraint) => (
              <div
                key={constraint.value}
                className={`p-4 border-2 rounded-lg transition-colors cursor-pointer ${
                  formData.constraintType === constraint.value
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/50 dark:border-green-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 bg-white/50 dark:bg-gray-800/50'
                }`}
                onClick={() => handleInputChange('constraintType', constraint.value)}
              >
                <div className="flex items-center gap-2 mb-2">
                  {constraint.icon}
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{constraint.label}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {constraint.description}
                </p>
                {formData.constraintType === constraint.value && (
                  <Badge className="mt-2 bg-green-600 dark:bg-green-600 text-white">Selected</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resource Metrics */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-900/70 dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Resource Optimization Metrics</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Key metrics tracked during resource optimization analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/50 rounded-lg border border-blue-100 dark:border-blue-900">
              <Users className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">87%</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">Avg Utilization</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-950/50 rounded-lg border border-green-100 dark:border-green-900">
              <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">94%</div>
              <div className="text-sm text-green-600 dark:text-green-400">Efficiency Score</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg border border-orange-100 dark:border-orange-900">
              <DollarSign className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">-12%</div>
              <div className="text-sm text-orange-600 dark:text-orange-400">Cost Reduction</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/50 rounded-lg border border-purple-100 dark:border-purple-900">
              <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">-8d</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">Time Saved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
