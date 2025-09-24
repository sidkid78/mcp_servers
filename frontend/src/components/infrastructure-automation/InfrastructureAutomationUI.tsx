"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Server, 
  Activity, 
  Rocket,
  TrendingUp, 
  Shield, 
  Database, 
  RotateCcw, 
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Globe,
  Lock,
  HardDrive,
  Network,
  Eye,
  Moon,
  Sun
} from 'lucide-react';

// Import individual components
import { MonitoringDashboard } from './MonitoringDashboard';
import { DeploymentCenter } from './DeploymentCenter';
import { ResourceScaling } from './ResourceScaling';
import { SecurityCenter } from './SecurityCenter';
import { BackupRecovery } from './BackupRecovery';
import { LogAnalyzer } from './LogAnalyzer';

interface InfrastructureMetrics {
  totalServices: number;
  healthyServices: number;
  criticalAlerts: number;
  deployments: number;
  uptime: number;
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkLatency: number;
  activeConnections: number;
  lastUpdated: Date;
}

interface InfrastructureAutomationUIProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function InfrastructureAutomationUI({ onExecutePrompt }: InfrastructureAutomationUIProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [infrastructureMetrics, setInfrastructureMetrics] = useState<InfrastructureMetrics>({
    totalServices: 47,
    healthyServices: 44,
    criticalAlerts: 2,
    deployments: 12,
    uptime: 99.8,
    responseTime: 145,
    throughput: 2847,
    errorRate: 0.02,
    cpuUsage: 67,
    memoryUsage: 54,
    diskUsage: 32,
    networkLatency: 12,
    activeConnections: 1247,
    lastUpdated: new Date()
  });

  // Initialize dark mode from localStorage and system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('infrastructure-theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to system preference
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(systemDark);
      if (systemDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('infrastructure-theme', newMode ? 'dark' : 'light');
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Simulate real-time metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      setInfrastructureMetrics(prev => ({
        ...prev,
        // Simulate small fluctuations in metrics
        cpuUsage: Math.max(30, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(20, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        diskUsage: Math.max(15, Math.min(95, prev.diskUsage + (Math.random() - 0.5) * 3)),
        responseTime: Math.max(50, Math.min(500, prev.responseTime + (Math.random() - 0.5) * 50)),
        throughput: Math.max(1000, Math.min(5000, prev.throughput + (Math.random() - 0.5) * 200)),
        errorRate: Math.max(0, Math.min(0.1, prev.errorRate + (Math.random() - 0.5) * 0.01)),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 5)),
        activeConnections: Math.max(500, Math.min(2000, prev.activeConnections + Math.floor((Math.random() - 0.5) * 100))),
        lastUpdated: new Date()
      }));
    };

    // Update metrics every 5 seconds
    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch initial metrics from API or monitoring system
  useEffect(() => {
    const fetchInfrastructureMetrics = async () => {
      try {
        // In a real implementation, this would be an API call
        // const response = await fetch('/api/infrastructure/metrics');
        // const data = await response.json();
        // setInfrastructureMetrics(data);
        
        // For now, we'll simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update with "fresh" data
        setInfrastructureMetrics(prev => ({
          ...prev,
          totalServices: 47 + Math.floor(Math.random() * 5),
          healthyServices: 44 + Math.floor(Math.random() * 3),
          criticalAlerts: Math.floor(Math.random() * 5),
          deployments: 12 + Math.floor(Math.random() * 8),
          uptime: 99.5 + Math.random() * 0.5,
          lastUpdated: new Date()
        }));
      } catch (error) {
        console.error('Failed to fetch infrastructure metrics:', error);
      }
    };

    fetchInfrastructureMetrics();
  }, []);

  // Calculate derived metrics
  const getSystemHealthStatus = () => {
    const healthScore = (infrastructureMetrics.healthyServices / infrastructureMetrics.totalServices) * 100;
    if (healthScore >= 95) return { 
      status: 'Excellent', 
      color: 'text-green-600 dark:text-green-400', 
      bgColor: 'bg-green-100 dark:bg-green-900/30' 
    };
    if (healthScore >= 85) return { 
      status: 'Good', 
      color: 'text-blue-600 dark:text-blue-400', 
      bgColor: 'bg-blue-100 dark:bg-blue-900/30' 
    };
    if (healthScore >= 70) return { 
      status: 'Fair', 
      color: 'text-yellow-600 dark:text-yellow-400', 
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' 
    };
    return { 
      status: 'Poor', 
      color: 'text-red-600 dark:text-red-400', 
      bgColor: 'bg-red-100 dark:bg-red-900/30' 
    };
  };

  const getResourceUsageColor = (usage: number) => {
    if (usage >= 80) return 'hsl(0 84% 60%)'; // red-500
    if (usage >= 60) return 'hsl(45 93% 47%)'; // yellow-500
    return 'hsl(142 76% 36%)'; // green-500
  };

  const systemStats = [
    {
      title: "Services Monitored",
      value: infrastructureMetrics.totalServices.toString(),
      subtitle: `${infrastructureMetrics.healthyServices} healthy, ${infrastructureMetrics.totalServices - infrastructureMetrics.healthyServices} issues`,
      icon: Server,
      color: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "System Uptime",
      value: `${infrastructureMetrics.uptime.toFixed(1)}%`,
      subtitle: "Last 30 days",
      icon: Activity,
      color: "text-green-600 dark:text-green-400"
    },
    {
      title: "Active Deployments",
      value: infrastructureMetrics.deployments.toString(),
      subtitle: "This week",
      icon: Rocket,
      color: "text-purple-600 dark:text-purple-400"
    },
    {
      title: "Critical Alerts",
      value: infrastructureMetrics.criticalAlerts.toString(),
      subtitle: infrastructureMetrics.criticalAlerts === 0 ? "All clear" : "Needs attention",
      icon: infrastructureMetrics.criticalAlerts > 0 ? AlertTriangle : Shield,
      color: infrastructureMetrics.criticalAlerts > 0 
        ? "text-red-600 dark:text-red-400" 
        : "text-emerald-600 dark:text-emerald-400"
    }
  ];

  const recentActivities = [
    {
      type: "deployment",
      message: "Production deployment completed successfully",
      timestamp: "2 minutes ago",
      status: "success"
    },
    {
      type: "scaling",
      message: "Auto-scaled web servers from 3 to 5 instances",
      timestamp: "15 minutes ago",
      status: "info"
    },
    {
      type: "alert",
      message: `High CPU usage detected: ${infrastructureMetrics.cpuUsage.toFixed(0)}%`,
      timestamp: "32 minutes ago",
      status: infrastructureMetrics.cpuUsage > 80 ? "warning" : "info"
    },
    {
      type: "backup",
      message: "Nightly backup completed for all critical systems",
      timestamp: "1 hour ago",
      status: "success"
    }
  ];

  const handleExecutePrompt = async (prompt: string, params?: unknown) => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt(prompt, params);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSystemRestart = async () => {
    await handleExecutePrompt('system-restart', { 
      scope: 'non-critical-services',
      maintenance_window: true 
    });
  };

  const handleSecurityLockdown = async () => {
    await handleExecutePrompt('security-lockdown', { 
      level: 'high',
      notify_admins: true 
    });
  };

  const handleStorageOptimization = async () => {
    await handleExecutePrompt('storage-optimization', { 
      cleanup_temp_files: true,
      compress_logs: true,
      archive_old_data: true 
    });
  };

  const handleNetworkDiagnostics = async () => {
    await handleExecutePrompt('network-diagnostics', { 
      test_connectivity: true,
      check_latency: true,
      analyze_bandwidth: true 
    });
  };

  const systemHealth = getSystemHealthStatus();

  return (
    <div className="min-h-screen p-4 transition-colors duration-300 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-blue-900">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Server className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Infrastructure Automation
              </h1>
              <p className="text-lg mt-1 text-gray-600 dark:text-gray-300">
                Enterprise-grade infrastructure monitoring, deployment & automation
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleDarkMode}
              className="ml-4 border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm">
            <Badge variant="outline" className={`${systemHealth.bgColor} ${systemHealth.color} border-current`}>
              <CheckCircle className="h-3 w-3 mr-1" />
              {systemHealth.status}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-500/30">
              <Zap className="h-3 w-3 mr-1" />
              Real-time Monitoring
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-500/30">
              <Globe className="h-3 w-3 mr-1" />
              Multi-cloud Ready
            </Badge>
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
              <Clock className="h-3 w-3 mr-1" />
              Updated {infrastructureMetrics.lastUpdated.toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                      <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                        {stat.subtitle}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color} bg-gray-50 dark:bg-gray-700/50`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="rounded-xl p-2 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-transparent">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Eye className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Activity className="h-4 w-4 mr-2" />
                Monitoring
              </TabsTrigger>
                <TabsTrigger 
                value="deployment" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Deploy
              </TabsTrigger>
              <TabsTrigger 
                value="scaling" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Scaling
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="backup" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <Database className="h-4 w-4 mr-2" />
                Backup
              </TabsTrigger>
              <TabsTrigger 
                value="logs" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Logs
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* System Health */}
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                    System Health
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Real-time infrastructure status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Overall Health
                    </span>
                    <Badge className={`${systemHealth.bgColor} ${systemHealth.color}`}>
                      {systemHealth.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>CPU Usage</span>
                      <span>{infrastructureMetrics.cpuUsage.toFixed(0)}%</span>
                    </div>
                    <div 
                      className="h-2 [&>div]:transition-colors"
                      style={(() => {
                        const s: React.CSSProperties & Record<string, string> = {
                          background: 'var(--progress-background)'
                        };
                        s['--progress-background'] = getResourceUsageColor(infrastructureMetrics.cpuUsage);
                        s['--progress-value'] = getResourceUsageColor(infrastructureMetrics.cpuUsage);
                        return s;
                      })()}
                    >
                      <Progress value={infrastructureMetrics.cpuUsage} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>Memory Usage</span>
                      <span>{infrastructureMetrics.memoryUsage.toFixed(0)}%</span>
                    </div>
                    <div 
                      className="h-2 [&>div]:transition-colors"
                      style={(() => {
                        const s: React.CSSProperties & Record<string, string> = {
                          background: 'var(--progress-background)'
                        };
                        s['--progress-background'] = getResourceUsageColor(infrastructureMetrics.memoryUsage);
                        s['--progress-value'] = getResourceUsageColor(infrastructureMetrics.memoryUsage);
                        return s;
                      })()}
                    >
                      <Progress value={infrastructureMetrics.memoryUsage} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300">
                      <span>Disk Usage</span>
                      <span>{infrastructureMetrics.diskUsage.toFixed(0)}%</span>
                    </div>
                    <div 
                      className="h-2 [&>div]:transition-colors"
                      style={(() => {
                        const s: React.CSSProperties & Record<string, string> = {
                          background: 'var(--progress-background)'
                        };
                        s['--progress-background'] = getResourceUsageColor(infrastructureMetrics.diskUsage);
                        s['--progress-value'] = getResourceUsageColor(infrastructureMetrics.diskUsage);
                        return s;
                      })()}
                    >
                      <Progress value={infrastructureMetrics.diskUsage} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Response Time
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {infrastructureMetrics.responseTime.toFixed(0)}ms
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Throughput
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {infrastructureMetrics.throughput.toLocaleString()}/s
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleExecutePrompt('infra-health-check', { scope: 'all' })}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    disabled={isLoading}
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Run Full Health Check
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Latest infrastructure events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-700/30">
                        <div className={`p-1 rounded-full ${
                          activity.status === 'success' 
                            ? 'bg-green-100 dark:bg-green-900/50' :
                          activity.status === 'warning' 
                            ? 'bg-yellow-100 dark:bg-yellow-900/50' 
                            : 'bg-blue-100 dark:bg-blue-900/50'
                        }`}>
                          {activity.status === 'success' ? (
                            <CheckCircle className="h-3 w-3 text-green-600 dark:text-green-400" />
                          ) : activity.status === 'warning' ? (
                            <AlertTriangle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                          ) : (
                            <Activity className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Common infrastructure management tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:hover:border-blue-500"
                    onClick={() => handleExecutePrompt('deployment-strategy', { application: 'web-app', target_env: 'production' })}
                    disabled={isLoading}
                  >
                    <Rocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Deploy App
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/20 dark:hover:border-green-500"
                    onClick={() => handleExecutePrompt('scaling-analysis', { resource_focus: 'compute' })}
                    disabled={isLoading}
                  >
                    <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Scale Resources
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 dark:hover:border-purple-500"
                    onClick={() => handleExecutePrompt('security-audit', { audit_scope: 'full' })}
                    disabled={isLoading}
                  >
                    <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Security Audit
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 dark:hover:border-orange-500"
                    onClick={() => handleExecutePrompt('disaster-recovery', { scenario: 'full-outage' })}
                    disabled={isLoading}
                  >
                    <Database className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      DR Planning
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* System Operations */}
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm dark:bg-gray-800/60">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">
                  System Operations
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Advanced infrastructure management operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 dark:hover:border-yellow-500"
                    onClick={handleSystemRestart}
                    disabled={isLoading}
                  >
                    <RotateCcw className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      System Restart
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:border-red-500"
                    onClick={handleSecurityLockdown}
                    disabled={isLoading}
                  >
                    <Lock className="h-6 w-6 text-red-600 dark:text-red-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Security Lock
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:hover:border-indigo-500"
                    onClick={handleStorageOptimization}
                    disabled={isLoading}
                  >
                    <HardDrive className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Storage Optimize
                    </span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col gap-2 border-gray-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 dark:hover:border-teal-500"
                    onClick={handleNetworkDiagnostics}
                    disabled={isLoading}
                  >
                    <Network className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Network Check
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Individual Component Tabs */}
          <TabsContent value="monitoring">
            <MonitoringDashboard onExecutePrompt={handleExecutePrompt as (prompt: string, params?: unknown) => Promise<unknown>} />
          </TabsContent>

          <TabsContent value="deployment">
            <DeploymentCenter onExecutePrompt={handleExecutePrompt as (prompt: string, params?: unknown) => Promise<unknown>} />
          </TabsContent>

          <TabsContent value="scaling">
            <ResourceScaling onExecutePrompt={handleExecutePrompt as (prompt: string, params?: unknown) => Promise<unknown>} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityCenter onExecutePrompt={handleExecutePrompt as (prompt: string, params?: unknown) => Promise<unknown>} />
          </TabsContent>

          <TabsContent value="backup">
            <BackupRecovery onExecutePrompt={handleExecutePrompt as (prompt: string, params?: unknown) => Promise<unknown>} />
          </TabsContent>

          <TabsContent value="logs">
            <LogAnalyzer onExecutePrompt={handleExecutePrompt as (prompt: string, params?: unknown) => Promise<unknown>} />
          </TabsContent>
        </Tabs>

        {/* Loading State */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <Card className="shadow-xl bg-white dark:bg-gray-800">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Processing Infrastructure Operation...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Executing automated workflow
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-4 border-t rounded-lg transition-colors duration-300 border-gray-200 bg-white/30 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/30">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            🚀 Infrastructure Automation Platform • 
            <span className="font-medium text-green-600 dark:text-green-400">
              {' '}{infrastructureMetrics.totalServices} Services Active
            </span> • 
            <span className="font-medium text-blue-600 dark:text-blue-400">
              {' '}{infrastructureMetrics.deployments} Deployments This Week
            </span> • 
            <span className="font-medium text-purple-600 dark:text-purple-400">
              {' '}{infrastructureMetrics.uptime.toFixed(1)}% Uptime
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
