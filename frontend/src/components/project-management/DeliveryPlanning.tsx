import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Rocket, 
  Package, 
  Clock, 
  CheckCircle,
  GitBranch,
  Zap,
  Shield,
  Target
} from 'lucide-react';

interface DeliveryPlanningProps {
  onExecutePrompt?: (prompt: string, params: unknown) => Promise<unknown>;
}

export function DeliveryPlanning({ onExecutePrompt }: DeliveryPlanningProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    deliveryStrategy: 'incremental'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlanning = async () => {
    if (!formData.projectId.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onExecutePrompt?.('delivery-planning', {
        project_id: formData.projectId,
        delivery_strategy: formData.deliveryStrategy
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deliveryStrategies = [
    { 
      value: 'incremental', 
      label: 'Incremental Delivery', 
      description: 'MVP first, then iterative improvements',
      icon: <TrendingUp className="h-4 w-4" />,
      phases: 3,
      riskLevel: 'low'
    },
    { 
      value: 'big_bang', 
      label: 'Big Bang Delivery', 
      description: 'Complete solution delivered at once',
      icon: <Rocket className="h-4 w-4" />,
      phases: 1,
      riskLevel: 'high'
    },
    { 
      value: 'phased', 
      label: 'Phased Delivery', 
      description: 'Sequential delivery by functional areas',
      icon: <Package className="h-4 w-4" />,
      phases: 3,
      riskLevel: 'medium'
    }
  ];

  const deliveryPhases = [
    {
      name: "MVP Release",
      duration: "3 weeks",
      deliverables: ["Core API", "Basic UI", "Authentication"],
      progress: 85,
      status: "in_progress"
    },
    {
      name: "Enhanced Features",
      duration: "4 weeks",
      deliverables: ["Advanced UI", "Integrations", "Analytics"],
      progress: 45,
      status: "in_progress"
    },
    {
      name: "Full Platform",
      duration: "2 weeks",
      deliverables: ["Admin Panel", "Documentation", "Monitoring"],
      progress: 0,
      status: "planned"
    }
  ];

  const qualityGates = [
    { name: "Code Review", status: "passed", criteria: "All code reviewed and approved" },
    { name: "Security Scan", status: "in_progress", criteria: "No critical vulnerabilities" },
    { name: "Performance Test", status: "pending", criteria: "Response time < 200ms" },
    { name: "User Acceptance", status: "pending", criteria: "UAT scenarios completed" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600 bg-green-50';
      case 'in_progress': return 'text-blue-600 bg-blue-50';
      case 'pending': return 'text-gray-600 bg-gray-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-700">
            <Rocket className="h-6 w-6" />
            Delivery Planning & Orchestration
          </CardTitle>
          <CardDescription>
            End-to-end delivery orchestration with AI-powered strategy optimization and quality gate management.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Planning Input Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectId" className="text-sm font-medium">
                  Project ID *
                </Label>
                <Input
                  id="projectId"
                  placeholder="Enter project ID (e.g., proj_abc123)..."
                  value={formData.projectId}
                  onChange={(e) => handleInputChange('projectId', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="deliveryStrategy" className="text-sm font-medium">
                  Delivery Strategy
                </Label>
                <Select
                  value={formData.deliveryStrategy}
                  onValueChange={(value) => handleInputChange('deliveryStrategy', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryStrategies.map((strategy) => (
                      <SelectItem key={strategy.value} value={strategy.value}>
                        <div className="flex items-center gap-2">
                          {strategy.icon}
                          <div>
                            <div className="font-medium">{strategy.label}</div>
                            <div className="text-xs text-gray-500">{strategy.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handlePlanning}
                disabled={!formData.projectId.trim() || isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                <Rocket className="h-4 w-4 mr-2" />
                {isLoading ? 'Planning Delivery...' : 'Create Delivery Plan'}
              </Button>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Delivery Planning Features:
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-indigo-50 dark:bg-indigo-950 rounded-lg">
                  <Rocket className="h-5 w-5 text-indigo-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-indigo-900 dark:text-indigo-100">Strategy Optimization</h4>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300">
                      AI-powered delivery strategy selection and optimization
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Release Planning</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Automated release scheduling with rollback strategies
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Quality Gates</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Automated quality assurance checkpoints and criteria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <GitBranch className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Pipeline Design</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      CI/CD pipeline configuration with deployment automation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Strategy Comparison */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            Delivery Strategy Comparison
          </CardTitle>
          <CardDescription>
            Compare different delivery approaches and select the optimal strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {deliveryStrategies.map((strategy) => (
              <div
                key={strategy.value}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  formData.deliveryStrategy === strategy.value
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950'
                    : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                }`}
                onClick={() => handleInputChange('deliveryStrategy', strategy.value)}
              >
                <div className="flex items-center gap-2 mb-3">
                  {strategy.icon}
                  <h4 className="font-medium">{strategy.label}</h4>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {strategy.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Phases:</span>
                    <Badge variant="outline">{strategy.phases}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Risk Level:</span>
                    <Badge variant="outline" className={getRiskColor(strategy.riskLevel)}>
                      {strategy.riskLevel}
                    </Badge>
                  </div>
                </div>
                {formData.deliveryStrategy === strategy.value && (
                  <Badge className="mt-2 bg-indigo-600">Selected</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Phases Timeline */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Delivery Timeline & Phases
          </CardTitle>
          <CardDescription>
            Planned delivery phases with progress tracking and deliverables
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deliveryPhases.map((phase, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      phase.status === 'in_progress' ? 'bg-blue-100 text-blue-600' :
                      phase.status === 'completed' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{phase.name}</h4>
                      <p className="text-sm text-gray-500">Duration: {phase.duration}</p>
                    </div>
                  </div>
                  <Badge variant={phase.status === 'in_progress' ? 'default' : 'outline'}>
                    {phase.status.replace('_', ' ')}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{phase.progress}%</span>
                  </div>
                  <Progress value={phase.progress} className="h-2" />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {phase.deliverables.map((deliverable, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {deliverable}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Gates */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Quality Gates & Checkpoints
          </CardTitle>
          <CardDescription>
            Automated quality assurance checkpoints throughout the delivery pipeline
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityGates.map((gate, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(gate.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{gate.name}</h4>
                  <div className="flex items-center gap-1">
                    {gate.status === 'passed' && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {gate.status === 'in_progress' && <Clock className="h-4 w-4 text-blue-600" />}
                    {gate.status === 'pending' && <Clock className="h-4 w-4 text-gray-600" />}
                    <Badge variant="outline" className="text-xs">
                      {gate.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm">{gate.criteria}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Pipeline */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-orange-600" />
            Deployment Pipeline
          </CardTitle>
          <CardDescription>
            Automated CI/CD pipeline stages with quality gates and rollback capabilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Build</span>
              </div>
              <div className="w-8 border-t border-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Test</span>
              </div>
              <div className="w-8 border-t border-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium">Security</span>
              </div>
              <div className="w-8 border-t border-gray-300"></div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium">Deploy</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">~70min total</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded">
              <div className="text-lg font-bold text-green-600">15min</div>
              <div className="text-sm text-green-700">Build</div>
            </div>
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950 rounded">
              <div className="text-lg font-bold text-blue-600">30min</div>
              <div className="text-sm text-blue-700">Test</div>
            </div>
            <div className="text-center p-3 bg-orange-50 dark:bg-orange-950 rounded">
              <div className="text-lg font-bold text-orange-600">15min</div>
              <div className="text-sm text-orange-700">Security</div>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950 rounded">
              <div className="text-lg font-bold text-purple-600">10min</div>
              <div className="text-sm text-purple-700">Deploy</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
