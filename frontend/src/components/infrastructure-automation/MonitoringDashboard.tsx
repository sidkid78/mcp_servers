"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Cpu,
  HardDrive,
  Network,
  Database,
  Globe
} from 'lucide-react';

interface MonitoringDashboardProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function MonitoringDashboard({ onExecutePrompt }: MonitoringDashboardProps) {
  const [serviceFilter, setServiceFilter] = useState("all");
  const [metrics, setMetrics] = useState("standard");
  const [alertThreshold, setAlertThreshold] = useState([80]);
  const [isLoading, setIsLoading] = useState(false);

  const services = [
    { name: "Web Frontend", status: "healthy", cpu: 45, memory: 62, uptime: 99.9, alerts: 0 },
    { name: "API Gateway", status: "healthy", cpu: 67, memory: 54, uptime: 99.8, alerts: 0 },
    { name: "Database Cluster", status: "warning", cpu: 89, memory: 78, uptime: 99.5, alerts: 2 },
    { name: "Redis Cache", status: "healthy", cpu: 23, memory: 34, uptime: 100, alerts: 0 },
    { name: "Message Queue", status: "healthy", cpu: 34, memory: 45, uptime: 99.9, alerts: 0 },
    { name: "File Storage", status: "healthy", cpu: 12, memory: 28, uptime: 100, alerts: 0 },
  ];

  const handleMonitorServices = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('monitor_services', {
        service_filter: serviceFilter,
        metrics: metrics,
        alert_threshold: alertThreshold[0]
      });
      console.log('Monitoring result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHealthCheck = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('infra-health-check', {
        scope: serviceFilter === "all" ? "all" : serviceFilter
      });
      console.log('Health check result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Monitoring Controls */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-600" />
            Service Monitoring Controls
          </CardTitle>
          <CardDescription>Configure monitoring parameters and run health checks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service-filter">Service Filter</Label>
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select services" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="web">Web Services</SelectItem>
                  <SelectItem value="database">Database Services</SelectItem>
                  <SelectItem value="cache">Cache Services</SelectItem>
                  <SelectItem value="api">API Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metrics">Metrics Level</Label>
              <Select value={metrics} onValueChange={setMetrics}>
                <SelectTrigger>
                  <SelectValue placeholder="Select metrics" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="detailed">Detailed</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alert-threshold">Alert Threshold: {alertThreshold[0]}%</Label>
              <Slider
                value={alertThreshold}
                onValueChange={setAlertThreshold}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleMonitorServices}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              disabled={isLoading}
            >
              <Activity className="h-4 w-4 mr-2" />
              Monitor Services
            </Button>
            <Button 
              onClick={handleHealthCheck}
              variant="outline"
              disabled={isLoading}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Run Health Check
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge className={
                  service.status === 'healthy' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }>
                  {service.status === 'healthy' ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : (
                    <AlertTriangle className="h-3 w-3 mr-1" />
                  )}
                  {service.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* CPU Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-blue-600" />
                    <span>CPU</span>
                  </div>
                  <span className="font-medium">{service.cpu}%</span>
                </div>
                <Progress value={service.cpu} className="h-2" />
              </div>

              {/* Memory Usage */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4 text-green-600" />
                    <span>Memory</span>
                  </div>
                  <span className="font-medium">{service.memory}%</span>
                </div>
                <Progress value={service.memory} className="h-2" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{service.uptime}%</p>
                  <p className="text-xs text-gray-500">Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{service.alerts}</p>
                  <p className="text-xs text-gray-500">Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Metrics Overview */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-600" />
            System Metrics Overview
          </CardTitle>
          <CardDescription>Real-time infrastructure performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center space-y-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <Network className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">2.8K</p>
                <p className="text-sm text-gray-600">Requests/min</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-green-50 rounded-lg">
                <Clock className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">145ms</p>
                <p className="text-sm text-gray-600">Avg Response</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-purple-50 rounded-lg">
                <Database className="h-8 w-8 text-purple-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">847</p>
                <p className="text-sm text-gray-600">DB Queries/sec</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-orange-50 rounded-lg">
                <Globe className="h-8 w-8 text-orange-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">0.02%</p>
                <p className="text-sm text-gray-600">Error Rate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Running monitoring analysis...</span>
        </div>
      )}
    </div>
  );
}
