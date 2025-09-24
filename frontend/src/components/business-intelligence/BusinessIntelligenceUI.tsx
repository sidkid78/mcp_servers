'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Target, 
  TrendingUp, 
  Network, 
  Building2,
  Database,
  BarChart3,
  Activity,
  Zap,
  Brain,
  FileText,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

import { BiDiscovery } from './BiDiscovery';
import { InsightInvestigation } from './InsightInvestigation';
import { CorrelationDeepDive } from './CorrelationDeepDive';
import { TrendAnalysis } from './TrendAnalysis';
import { ExecutiveSummary } from './ExecutiveSummary';
import { ActionRecommendations } from './ActionRecommendations';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface BusinessIntelligenceUIProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function BusinessIntelligenceUI({ onExecutePrompt }: BusinessIntelligenceUIProps) {
  const [activeTab, setActiveTab] = useState('discovery');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [lastSync, setLastSync] = useState<string>('');
  const [systemHealth, setSystemHealth] = useState<'optimal' | 'warning' | 'critical'>('optimal');
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [processingSpeed, setProcessingSpeed] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [aiInsights, setAiInsights] = useState(0);

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString());
    setLastSync(now.toLocaleString());

    // Simulate real-time data updates
    const interval = setInterval(() => {
      setActiveUsers(Math.floor(Math.random() * 50) + 150);
      setTotalRevenue(Math.floor(Math.random() * 100000) + 2500000);
      setProcessingSpeed(Math.floor(Math.random() * 500) + 1200);
      setCompletedTasks(Math.floor(Math.random() * 100) + 850);
      setPendingTasks(Math.floor(Math.random() * 20) + 5);
      setAiInsights(Math.floor(Math.random() * 50) + 200);
      
      // Simulate system health changes
      const healthStates: ('optimal' | 'warning' | 'critical')[] = ['optimal', 'optimal', 'optimal', 'warning', 'optimal'];
      setSystemHealth(healthStates[Math.floor(Math.random() * healthStates.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const analyticsModules = [
    {
      id: 'discovery',
      title: 'Data Discovery',
      description: 'Data source discovery and comprehensive profiling',
      icon: Search,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      stats: 'ACTIVE'
    },
    {
      id: 'investigation',
      title: 'Insight Investigation',
      description: 'Guided business metrics exploration and analysis',
      icon: Target,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      stats: 'GUIDED'
    },
    {
      id: 'correlation',
      title: 'Correlation Analysis',
      description: 'Multi-dimensional statistical relationship discovery',
      icon: Network,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      stats: 'DEEP'
    },
    {
      id: 'trends',
      title: 'Trend Analysis',
      description: 'Time-series pattern detection and forecasting',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      stats: 'FORECAST'
    },
    {
      id: 'executive',
      title: 'Executive Summary',
      description: 'C-suite ready business intelligence reports',
      icon: Building2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      stats: 'EXECUTIVE'
    },
    {
      id: 'actions',
      title: 'Action Intelligence',
      description: 'Data-driven business recommendations and strategies',
      icon: Brain,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      stats: 'STRATEGIC'
    }
  ];

  const systemMetrics = [
    { 
      label: 'Datasets Analyzed', 
      value: '1,247', 
      icon: Database, 
      status: 'operational',
      detail: 'Multi-format support'
    },
    { 
      label: 'Insights Generated', 
      value: '8,934', 
      icon: Brain, 
      status: 'operational',
      detail: 'AI-powered analysis'
    },
    { 
      label: 'Correlations Found', 
      value: '15,672', 
      icon: Network, 
      status: 'operational',
      detail: 'Statistical relationships'
    },
    { 
      label: 'Reports Created', 
      value: '2,156', 
      icon: FileText, 
      status: 'optimal',
      detail: 'Executive ready'
    }
  ];

  const realTimeMetrics = [
    {
      label: 'Processing Speed',
      value: `${processingSpeed.toLocaleString()}/sec`,
      icon: Zap,
      status: processingSpeed > 1000 ? 'optimal' : 'warning',
      detail: 'Query execution rate',
      color: processingSpeed > 1000 ? 'text-yellow-600' : 'text-orange-600'
    },
    {
      label: 'Active Users',
      value: activeUsers.toString(),
      icon: Users,
      status: 'operational',
      detail: 'Currently analyzing',
      color: 'text-blue-600'
    },
    {
      label: 'Revenue Impact',
      value: `$${(totalRevenue / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      status: 'optimal',
      detail: 'Data-driven decisions',
      color: 'text-green-600'
    },
    {
      label: 'System Health',
      value: systemHealth.toUpperCase(),
      icon: systemHealth === 'critical' ? AlertTriangle : systemHealth === 'warning' ? Clock : CheckCircle2,
      status: systemHealth,
      detail: 'Overall status',
      color: systemHealth === 'critical' ? 'text-red-600' : systemHealth === 'warning' ? 'text-yellow-600' : 'text-green-600'
    }
  ];

  const aiMetrics = [
    {
      label: 'AI Insights',
      value: aiInsights.toString(),
      icon: Sparkles,
      status: 'optimal',
      detail: 'Generated this hour',
      color: 'text-purple-600'
    },
    {
      label: 'Completed Tasks',
      value: completedTasks.toString(),
      icon: CheckCircle2,
      status: 'operational',
      detail: 'Successfully processed',
      color: 'text-green-600'
    },
    {
      label: 'Pending Tasks',
      value: pendingTasks.toString(),
      icon: Clock,
      status: pendingTasks > 15 ? 'warning' : 'operational',
      detail: 'In processing queue',
      color: pendingTasks > 15 ? 'text-yellow-600' : 'text-blue-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'warning':
        return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'critical':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Command Center Header */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 dark:from-slate-800 dark:via-blue-800 dark:to-slate-700 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Business Intelligence Command Center</h1>
                <p className="text-slate-300 dark:text-slate-200">Advanced Data Analytics & Strategic Insights Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className={`flex items-center gap-2 ${
                systemHealth === 'optimal' ? 'text-green-400 dark:text-green-300' :
                systemHealth === 'warning' ? 'text-yellow-400 dark:text-yellow-300' :
                'text-red-400 dark:text-red-300'
              }`}>
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">
                  ANALYTICS {systemHealth === 'optimal' ? 'OPERATIONAL' : systemHealth.toUpperCase()}
                </span>
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-300">
                Last Updated: <span suppressHydrationWarning>{lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* System Intelligence Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemMetrics.map((metric) => (
            <Card key={metric.label} className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <metric.icon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">{metric.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{metric.detail}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.toUpperCase()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real-time Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {realTimeMetrics.map((metric) => (
            <Card key={metric.label} className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <metric.icon className={`h-4 w-4 ${metric.color} dark:opacity-80`} />
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">{metric.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{metric.detail}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.toUpperCase()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiMetrics.map((metric) => (
            <Card key={metric.label} className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <metric.icon className={`h-4 w-4 ${metric.color} dark:opacity-80`} />
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">{metric.label}</p>
                    </div>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{metric.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{metric.detail}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status.toUpperCase()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Control Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Mission Control Navigation */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-transparent">
              {analyticsModules.map((module) => (
                <TabsTrigger 
                  key={module.id} 
                  value={module.id} 
                  className="flex items-center gap-2 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700 text-slate-600 dark:text-slate-400 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
                >
                  <module.icon className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{module.title}</span>
                  <Badge variant="outline" className="text-xs ml-1 hidden lg:inline border-slate-300 dark:border-slate-600">
                    {module.stats}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Analytics Modules */}
          <TabsContent value="discovery" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Data Discovery Engine</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Automated data source discovery and comprehensive profiling</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600">SCANNING</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <BiDiscovery onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investigation" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Insight Investigation Center</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Guided business metrics exploration and deep analysis</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-600">INVESTIGATING</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <InsightInvestigation onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="correlation" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Network className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Correlation Analysis Matrix</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Multi-dimensional statistical relationship discovery</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600">ANALYZING</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <CorrelationDeepDive onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Trend Analysis & Forecasting</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Time-series pattern detection and predictive modeling</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600">FORECASTING</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <TrendAnalysis onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="executive" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Executive Intelligence Suite</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">C-suite ready business intelligence and strategic reports</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-600">EXECUTIVE</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ExecutiveSummary onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Strategic Action Intelligence</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Data-driven business recommendations and strategic guidance</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600">STRATEGIC</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ActionRecommendations onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Intelligence Footer */}
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    systemHealth === 'optimal' ? 'bg-green-400 dark:bg-green-300' :
                    systemHealth === 'warning' ? 'bg-yellow-400 dark:bg-yellow-300' :
                    'bg-red-400 dark:bg-red-300'
                  }`}></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Analytics Engine: {systemHealth === 'optimal' ? 'Operational' : systemHealth.charAt(0).toUpperCase() + systemHealth.slice(1)}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Data refresh: Real-time | Last sync: <span suppressHydrationWarning>{lastSync}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{activeUsers} Users</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>{processingSpeed}/sec</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>${(totalRevenue / 1000000).toFixed(1)}M Impact</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  <span>{aiInsights} AI Insights</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
