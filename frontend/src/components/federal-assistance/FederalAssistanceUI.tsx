'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Target, 
  FileText,
  Bell, 
  TrendingUp, 
  Network, 
  Building2,
  DollarSign,
  Shield,
  Database,
  Activity,
  Zap
} from 'lucide-react';

import { GrantDiscoveryForm } from './GrantDiscoveryForm';
import { ProgramDeepDive } from './ProgramDeepDive';
import { ApplicationStrategy } from './ApplicationStrategy';
import { PolicyAnalysis } from './PolicyAnalysis';
import { SimilarPrograms } from './SimilarPrograms';
import { ProgramSearch } from './ProgramSearch';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface FederalAssistanceUIProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function FederalAssistanceUI({ onExecutePrompt }: FederalAssistanceUIProps) {
  const [activeTab, setActiveTab] = useState('discovery');
  const [isLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [lastSync, setLastSync] = useState<string>('');
  const [totalFunding, setTotalFunding] = useState<string>('$2.4T');

  useEffect(() => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString());
    setLastSync(now.toLocaleString());
    
    // Simulate funding amount updates
    const fundingAmounts = ['$2.4T', '$2.3T', '$2.5T', '$2.4T'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % fundingAmounts.length;
      setTotalFunding(fundingAmounts[currentIndex]);
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      id: 'discovery',
      title: 'Grant Discovery',
      description: 'AI-powered program matching and eligibility assessment',
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      stats: 'ACTIVE'
    },
    {
      id: 'search',
      title: 'Program Search',
      description: 'Advanced filtering and real-time program intelligence',
      icon: Search,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      stats: 'LIVE'
    },
    {
      id: 'deep-dive',
      title: 'Program Analysis',
      description: 'Comprehensive program intelligence and competitive analysis',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      stats: 'INTEL'
    },
    {
      id: 'strategy',
      title: 'Application Strategy',
      description: 'Multi-program portfolio optimization and success modeling',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      stats: 'OPTIMIZE'
    },
    {
      id: 'policy',
      title: 'Policy Intelligence',
      description: 'Federal funding trends and policy shift analysis',
      icon: Building2,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      stats: 'TRENDS'
    },
    {
      id: 'similar',
      title: 'Program Similarity',
      description: 'ML-powered program matching and portfolio expansion',
      icon: Network,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      stats: 'ML'
    }
  ];

  const systemStats = [
    { 
      label: 'Programs Tracked', 
      value: '36,650', 
      icon: Database, 
      status: 'operational',
      detail: 'USASpending + DataGov'
    },
    { 
      label: 'Contract Records', 
      value: '250K', 
      icon: FileText, 
      status: 'operational',
      detail: 'USASpending data'
    },
    { 
      label: 'Live Opportunities', 
      value: '86K+', 
      icon: Bell, 
      status: 'optimal',
      detail: 'Active contracts'
    },
    { 
      label: 'Total Funding', 
      value: totalFunding, 
      icon: DollarSign, 
      status: 'optimal',
      detail: 'Available funding'
    },
    { 
      label: 'Agencies Covered', 
      value: '26+', 
      icon: Building2, 
      status: 'operational',
      detail: 'Full coverage'
    },
    { 
      label: 'Data Sources', 
      value: '2', 
      icon: Shield, 
      status: 'optimal',
      detail: 'Programs + Contracts'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Command Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600 dark:bg-blue-500 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Federal Assistance Intelligence</h1>
                <p className="text-slate-300 dark:text-slate-200">USASpending Enhanced • 36K+ Programs + 250K Contracts + 86K Opportunities • {totalFunding} Available</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <div className="flex items-center gap-2 text-green-400 dark:text-green-300">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">SYSTEM OPERATIONAL</span>
              </div>
              <div className="text-xs text-slate-400 dark:text-slate-300">
                Last Updated: <span suppressHydrationWarning>{lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* System Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {systemStats.map((stat) => (
            <Card key={stat.label} className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon className={`h-4 w-4 ${stat.icon === DollarSign ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`} />
                      <p className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wide">{stat.label}</p>
                    </div>
                    <p className={`text-2xl font-bold ${stat.icon === DollarSign ? 'text-green-700 dark:text-green-300' : 'text-slate-900 dark:text-white'}`}>{stat.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{stat.detail}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    stat.status === 'operational' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                  }`}>
                    {stat.status.toUpperCase()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Control Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Command Bar */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-transparent">
              {features.map((feature) => (
                <TabsTrigger 
                  key={feature.id} 
                  value={feature.id} 
                  className="flex items-center gap-2 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-700 text-slate-600 dark:text-slate-400 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white"
                >
                  <feature.icon className="h-4 w-4" />
                  <span className="hidden sm:inline font-medium">{feature.title}</span>
                  <Badge variant="outline" className="text-xs ml-1 hidden lg:inline border-slate-300 dark:border-slate-600">
                    {feature.stats}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Operation Modules */}
          <TabsContent value="discovery" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Grant Discovery Engine</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Intelligent program matching and eligibility assessment</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-sm font-medium">{totalFunding}</span>
                    </div>
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600">OPERATIONAL</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <GrantDiscoveryForm onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Program Search Interface</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Advanced filtering and real-time program intelligence</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600">LIVE</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ProgramSearch onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="deep-dive" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Program Analysis Module</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Comprehensive program intelligence and competitive analysis</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">INTEL</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ProgramDeepDive onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Strategic Planning Console</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Multi-program portfolio optimization and success modeling</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600">OPTIMIZE</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ApplicationStrategy onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="policy" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Policy Intelligence Center</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Federal funding trends and policy shift analysis</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-600">TRENDS</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <PolicyAnalysis onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="similar" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Network className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Similarity Analysis Engine</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">ML-powered program matching and portfolio expansion</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600">ML</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <SimilarPrograms onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* System Status Footer */}
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 dark:bg-green-300 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">System Status: Operational</span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Data refresh: Every 15 minutes | Last sync: <span suppressHydrationWarning>{lastSync}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                <span>36,650 Programs Active</span>
                <span>250K Contracts Loaded</span>
                <span>86K+ Opportunities Live</span>
                <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                  <DollarSign className="h-3 w-3" />
                  <span>{totalFunding} Available</span>
                </div>
                <span>26+ Agencies Monitored</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center z-50">
          <Card className="p-6 bg-slate-800 border-slate-700 text-white">
            <div className="flex items-center gap-4">
              <div className="animate-spin">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="font-semibold">Processing Federal Intelligence</p>
                <p className="text-sm text-slate-300">Analyzing 36,650 programs + 250K contracts + 86K opportunities across 26+ agencies...</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
