"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  Rocket, 
  GitBranch, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Shield,
  RefreshCw,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';

interface DeploymentCenterProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function DeploymentCenter({ onExecutePrompt }: DeploymentCenterProps) {
  const [appName, setAppName] = useState("");
  const [environment, setEnvironment] = useState("staging");
  const [deploymentType, setDeploymentType] = useState("rolling");
  const [healthCheck, setHealthCheck] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const recentDeployments = [
    {
      app: "web-frontend",
      version: "v2.1.4",
      environment: "production",
      status: "success",
      timestamp: "2 hours ago",
      duration: "4m 32s"
    },
    {
      app: "api-service",
      version: "v1.8.2",
      environment: "staging",
      status: "in-progress",
      timestamp: "15 minutes ago",
      duration: "2m 18s"
    },
    {
      app: "worker-service",
      version: "v3.0.1",
      environment: "production",
      status: "failed",
      timestamp: "3 hours ago",
      duration: "1m 45s"
    },
    {
      app: "auth-service",
      version: "v1.2.7",
      environment: "staging",
      status: "success",
      timestamp: "1 day ago",
      duration: "3m 12s"
    }
  ];

  const handleDeploy = async () => {
    if (!onExecutePrompt || !appName) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('deploy_application', {
        app_name: appName,
        environment: environment,
        deployment_type: deploymentType,
        health_check: healthCheck
      });
      console.log('Deployment result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeploymentStrategy = async () => {
    if (!onExecutePrompt || !appName) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('deployment-strategy', {
        application: appName,
        target_env: environment
      });
      console.log('Deployment strategy result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'in-progress':
        return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-400" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'failed':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Deployment Form */}
        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-700/50">
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Rocket className="h-5 w-5 text-blue-400" />
              Deploy Application
            </CardTitle>
            <CardDescription className="text-slate-400">Configure and execute application deployments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="app-name" className="text-slate-200 font-medium">Application Name</Label>
                <Input
                  id="app-name"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="e.g., web-frontend, api-service"
                  className="bg-slate-800/80 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="environment" className="text-slate-200 font-medium">Target Environment</Label>
                <Select value={environment} onValueChange={setEnvironment}>
                  <SelectTrigger className="bg-slate-800/80 border-slate-600 text-slate-100 focus:border-blue-400 focus:ring-blue-400/20">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="dev" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Development</SelectItem>
                    <SelectItem value="staging" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Staging</SelectItem>
                    <SelectItem value="production" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deployment-type" className="text-slate-200 font-medium">Deployment Strategy</Label>
                <Select value={deploymentType} onValueChange={setDeploymentType}>
                  <SelectTrigger className="bg-slate-800/80 border-slate-600 text-slate-100 focus:border-blue-400 focus:ring-blue-400/20">
                    <SelectValue placeholder="Select strategy" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="rolling" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Rolling Update</SelectItem>
                    <SelectItem value="blue_green" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Blue-Green</SelectItem>
                    <SelectItem value="canary" className="text-slate-100 hover:bg-slate-700 focus:bg-slate-700">Canary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="health-check" 
                  checked={healthCheck} 
                  onCheckedChange={(checked) => setHealthCheck(checked === true)}
                  className="border-slate-600 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <Label htmlFor="health-check" className="text-sm font-medium text-slate-200">
                  Enable health checks during deployment
                </Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleDeploy}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
                disabled={isLoading || !appName}
              >
                <Rocket className="h-4 w-4 mr-2" />
                Deploy Now
              </Button>
              <Button 
                onClick={handleDeploymentStrategy}
                variant="outline"
                disabled={isLoading || !appName}
                className="border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-slate-100 bg-slate-800/50"
              >
                <Shield className="h-4 w-4 mr-2" />
                Analyze Strategy
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Pipeline Status */}
        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-700/50">
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <GitBranch className="h-5 w-5 text-green-400" />
              Deployment Pipeline
            </CardTitle>
            <CardDescription className="text-slate-400">Current deployment pipeline status</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              
              {/* Pipeline Steps */}
              <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-full border border-green-500/30">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">Build & Test</p>
                    <p className="text-sm text-slate-400">All tests passed</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Complete</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-lg border border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/20 rounded-full border border-blue-500/30">
                    <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">Deploy to Staging</p>
                    <p className="text-sm text-slate-400">Rolling update in progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="w-20 h-2 bg-slate-700" />
                  <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">65%</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-700/50 rounded-full border border-slate-600/50">
                    <Pause className="h-4 w-4 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-300">Production Deploy</p>
                    <p className="text-sm text-slate-500">Waiting for approval</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-slate-600 text-slate-400 bg-slate-800/50">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Deployments */}
        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50 shadow-2xl">
          <CardHeader className="border-b border-slate-700/50">
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <Clock className="h-5 w-5 text-purple-400" />
              Recent Deployments
            </CardTitle>
            <CardDescription className="text-slate-400">Latest deployment history and status</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {recentDeployments.map((deployment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-700/50 rounded-lg hover:bg-slate-800/50 transition-colors bg-slate-800/20">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(deployment.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-slate-100">{deployment.app}</p>
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-300 bg-slate-800/50">
                          {deployment.version}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">
                        {deployment.environment} • {deployment.timestamp}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={getStatusColor(deployment.status)}>
                        {deployment.status}
                      </Badge>
                      <p className="text-xs text-slate-500 mt-1">
                        {deployment.duration}
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-slate-100 bg-slate-800/50">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Deployment Environments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-3 border-b border-slate-700/50">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <Play className="h-4 w-4 text-blue-400" />
                </div>
                Development
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Active Services</span>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">8</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Last Deploy</span>
                <span className="text-sm text-slate-400">2 hours ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Status</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Healthy</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-3 border-b border-slate-700/50">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                <div className="p-2 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <RefreshCw className="h-4 w-4 text-yellow-400" />
                </div>
                Staging
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Active Services</span>
                <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Last Deploy</span>
                <span className="text-sm text-slate-400">15 minutes ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Status</span>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Deploying</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-3 border-b border-slate-700/50">
              <CardTitle className="text-lg flex items-center gap-2 text-slate-100">
                <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                  <Shield className="h-4 w-4 text-green-400" />
                </div>
                Production
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Active Services</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">15</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Last Deploy</span>
                <span className="text-sm text-slate-400">1 day ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-300">Status</span>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Stable</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center p-8 bg-slate-900/50 rounded-lg border border-slate-700/50">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mr-3"></div>
            <span className="text-slate-200">Processing deployment...</span>
          </div>
        )}
      </div>
    </div>
  );
}
