"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Server, 
  Cpu, 
  HardDrive, 
  Network,
  BarChart3,
  Target,
  Zap,
  Settings,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';

interface ResourceScalingProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function ResourceScaling({ onExecutePrompt }: ResourceScalingProps) {
  const [resourceType, setResourceType] = useState("compute");
  const [targetCapacity, setTargetCapacity] = useState([100]);
  const [autoScaling, setAutoScaling] = useState(true);
  const [metricsBasedScaling, setMetricsBasedScaling] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const resources = [
    {
      name: "Web Servers",
      type: "compute",
      current: 5,
      target: 8,
      max: 20,
      utilization: 85,
      status: "scaling-up",
      cost: "$1,200/month"
    },
    {
      name: "Database Cluster",
      type: "storage",
      current: 3,
      target: 3,
      max: 10,
      utilization: 62,
      status: "stable",
      cost: "$2,400/month"
    },
    {
      name: "Load Balancers",
      type: "network",
      current: 2,
      target: 3,
      max: 5,
      utilization: 78,
      status: "scaling-up",
      cost: "$600/month"
    },
    {
      name: "Cache Nodes",
      type: "storage",
      current: 4,
      target: 2,
      max: 8,
      utilization: 34,
      status: "scaling-down",
      cost: "$800/month"
    }
  ];

  const scalingRules = [
    {
      name: "High CPU Auto-Scale",
      condition: "CPU > 80% for 5 minutes",
      action: "Scale up by 2 instances",
      status: "active"
    },
    {
      name: "Low Traffic Scale-Down",
      condition: "CPU < 30% for 15 minutes",
      action: "Scale down by 1 instance",
      status: "active"
    },
    {
      name: "Memory Pressure Scale",
      condition: "Memory > 85% for 3 minutes",
      action: "Scale up by 1 instance",
      status: "active"
    },
    {
      name: "Weekend Scale-Down",
      condition: "Scheduled: Sat-Sun 2AM",
      action: "Scale to minimum capacity",
      status: "inactive"
    }
  ];

  const handleScaleResources = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('scale_resources', {
        resource_type: resourceType,
        target_capacity: targetCapacity[0],
        auto_scaling: autoScaling,
        metrics_based: metricsBasedScaling
      });
      console.log('Scaling result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScalingAnalysis = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('scaling-analysis', {
        resource_focus: resourceType,
        capacity_target: targetCapacity[0].toString()
      });
      console.log('Scaling analysis result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scaling-up':
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'scaling-down':
        return <ArrowDown className="h-4 w-4 text-blue-600" />;
      case 'stable':
        return <Activity className="h-4 w-4 text-gray-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scaling-up':
        return 'bg-green-100 text-green-800';
      case 'scaling-down':
        return 'bg-blue-100 text-blue-800';
      case 'stable':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'compute':
        return <Cpu className="h-5 w-5 text-blue-600" />;
      case 'storage':
        return <HardDrive className="h-5 w-5 text-green-600" />;
      case 'network':
        return <Network className="h-5 w-5 text-purple-600" />;
      default:
        return <Server className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Scaling Controls */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Resource Scaling Controls
          </CardTitle>
          <CardDescription>Configure auto-scaling parameters and manual scaling operations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="resource-type">Resource Type</Label>
              <Select value={resourceType} onValueChange={setResourceType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compute">Compute (CPU/Memory)</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-capacity">Target Capacity: {targetCapacity[0]}%</Label>
              <Slider
                value={targetCapacity}
                onValueChange={setTargetCapacity}
                max={200}
                min={25}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="auto-scaling" 
                checked={autoScaling} 
                onCheckedChange={(checked) => setAutoScaling(checked === true)}
              />
              <Label htmlFor="auto-scaling" className="text-sm font-medium">
                Enable automatic scaling policies
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="metrics-based" 
                checked={metricsBasedScaling} 
                onCheckedChange={(checked) => setMetricsBasedScaling(checked === true)}
              />
              <Label htmlFor="metrics-based" className="text-sm font-medium">
                Use metrics-based scaling decisions
              </Label>
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleScaleResources}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              disabled={isLoading}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Scale Resources
            </Button>
            <Button 
              onClick={handleScalingAnalysis}
              variant="outline"
              disabled={isLoading}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analyze Scaling
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resource Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource, index) => (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getResourceIcon(resource.type)}
                  <CardTitle className="text-lg">{resource.name}</CardTitle>
                </div>
                <Badge className={getStatusColor(resource.status)}>
                  {getStatusIcon(resource.status)}
                  {resource.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Instance Count */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Instances</span>
                  <span className="font-medium">
                    {resource.current} → {resource.target} (max: {resource.max})
                  </span>
                </div>
                <Progress value={(resource.current / resource.max) * 100} className="h-2" />
              </div>

              {/* Utilization */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Utilization</span>
                  <span className="font-medium">{resource.utilization}%</span>
                </div>
                <Progress value={resource.utilization} className="h-2" />
              </div>

              {/* Cost */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-sm text-gray-600">Monthly Cost</span>
                <span className="font-medium text-green-600">{resource.cost}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Scaling Rules */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-purple-600" />
            Auto-Scaling Rules
          </CardTitle>
          <CardDescription>Configured scaling policies and triggers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scalingRules.map((rule, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{rule.name}</h4>
                    <Badge className={rule.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                      {rule.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <strong>When:</strong> {rule.condition}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Then:</strong> {rule.action}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scaling Metrics Overview */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-green-600" />
            Scaling Metrics Overview
          </CardTitle>
          <CardDescription>Resource utilization and scaling activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center space-y-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">78%</p>
                <p className="text-sm text-gray-600">Avg Utilization</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">24</p>
                <p className="text-sm text-gray-600">Scale Events</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-purple-50 rounded-lg">
                <Zap className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">2.3m</p>
                <p className="text-sm text-gray-600">Avg Response</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-orange-50 rounded-lg">
                <TrendingDown className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">$2.1K</p>
                <p className="text-sm text-gray-600">Cost Savings</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Processing scaling operation...</span>
        </div>
      )}
    </div>
  );
}
