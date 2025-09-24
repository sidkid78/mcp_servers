'use client';

import React, { useState, useEffect } from 'react';
import { 
  Code, 
  TestTube, 
  Shield, 
  FileText, 
  Rocket, 
  RotateCcw, 
  Activity,
  Settings,
  Terminal,
  Wrench
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Import individual components
import { CodeAnalysis } from './CodeAnalysis';
import { TestExecution } from './TestExecution';
import { DependencyAudit } from './DependencyAudit';
import { DocumentationGenerator } from './DocumentationGenerator';
import { DeploymentPreview } from './DeploymentPreview';
import { RollbackManagement } from './RollbackManagement';

interface SmartDevEnvironmentUIProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function SmartDevEnvironmentUI({ onExecutePrompt }: SmartDevEnvironmentUIProps) {
  const [activeTab, setActiveTab] = useState('code-analysis');
  const [lastUpdated, setLastUpdated] = useState('');
  const [lastSync, setLastSync] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    setLastSync(new Date().toLocaleString());
  }, []);

  // System metrics for the development environment
  const systemMetrics = [
    {
      label: 'Code Quality',
      value: '92.4%',
      detail: 'Across 847 files',
      icon: Code,
      status: 'excellent',
      change: '+2.1%'
    },
    {
      label: 'Test Coverage',
      value: '87.6%',
      detail: '1,234 tests passing',
      icon: TestTube,
      status: 'good',
      change: '+5.3%'
    },
    {
      label: 'Security Score',
      value: '95.8%',
      detail: '2 minor issues',
      icon: Shield,
      status: 'excellent',
      change: '+1.2%'
    },
    {
      label: 'Tech Debt',
      value: '12.3h',
      detail: 'Estimated effort',
      icon: Wrench,
      status: 'good',
      change: '-3.2h'
    }
  ];

  // Development modules with their capabilities
  const devModules = [
    {
      id: 'code-analysis',
      title: 'Code Analysis',
      icon: Code,
      description: 'Deep code inspection & quality metrics',
      stats: '847 files',
      color: 'blue'
    },
    {
      id: 'test-execution',
      title: 'Test Suite',
      icon: TestTube,
      description: 'Automated testing & coverage',
      stats: '1.2k tests',
      color: 'green'
    },
    {
      id: 'dependency-audit',
      title: 'Dependencies',
      icon: Shield,
      description: 'Security & update analysis',
      stats: '156 deps',
      color: 'orange'
    },
    {
      id: 'documentation',
      title: 'Docs Gen',
      icon: FileText,
      description: 'Auto-generate documentation',
      stats: '23 pages',
      color: 'purple'
    },
    {
      id: 'deployment',
      title: 'Deploy',
      icon: Rocket,
      description: 'Preview & staging deployment',
      stats: '12 envs',
      color: 'indigo'
    },
    {
      id: 'rollback',
      title: 'Rollback',
      icon: RotateCcw,
      description: 'Safe change management',
      stats: '8 backups',
      color: 'red'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Development Command Center Header */}
      <div className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-800 dark:from-gray-800 dark:via-blue-800 dark:to-gray-700 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600 dark:bg-blue-700 rounded-lg">
                <Terminal className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Smart Development Environment</h1>
                <p className="text-blue-200 dark:text-blue-100">AI-Powered Development Workflow & Code Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 text-green-400 dark:text-green-300">
                <Activity className="h-4 w-4" />
                <span className="text-sm font-medium">DEV ENVIRONMENT ACTIVE</span>
              </div>
              <div className="text-xs text-blue-300 dark:text-blue-200">
                Last Updated: <span suppressHydrationWarning>{lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Development Intelligence Dashboard */}
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
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      metric.status === 'excellent'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : metric.status === 'good'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {metric.status.toUpperCase()}
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
                      {metric.change}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                Development Environment Settings
              </CardTitle>
              <CardDescription>
                Configure development workflow preferences and automation settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">Code Analysis</h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <label htmlFor="auto-analyze" className="cursor-pointer">Auto-analyze on save</label>
                      <input id="auto-analyze" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="deep-scan" className="cursor-pointer">Deep security scan</label>
                      <input id="deep-scan" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="complexity-check" className="cursor-pointer">Complexity warnings</label>
                      <input id="complexity-check" type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">Testing</h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <label htmlFor="auto-test" className="cursor-pointer">Auto-run tests</label>
                      <input id="auto-test" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="coverage-report" className="cursor-pointer">Coverage reporting</label>
                      <input id="coverage-report" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="parallel-tests" className="cursor-pointer">Parallel execution</label>
                      <input id="parallel-tests" type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">Deployment</h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <label htmlFor="auto-deploy" className="cursor-pointer">Auto-deploy previews</label>
                      <input id="auto-deploy" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="health-checks" className="cursor-pointer">Health monitoring</label>
                      <input id="health-checks" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="rollback-ready" className="cursor-pointer">Auto-rollback ready</label>
                      <input id="rollback-ready" type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Development Control Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Development Navigation */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-transparent">
              {devModules.map((module) => (
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

          {/* Code Analysis */}
          <TabsContent value="code-analysis" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Code Analysis Engine</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Deep code inspection, quality metrics, and security analysis</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">INTELLIGENT</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <CodeAnalysis onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Test Execution */}
          <TabsContent value="test-execution" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <TestTube className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Test Execution Suite</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Automated testing, coverage analysis, and quality assurance</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600">AUTOMATED</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <TestExecution onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Dependency Audit */}
          <TabsContent value="dependency-audit" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Dependency Security Audit</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Vulnerability scanning and dependency management</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-600">SECURITY</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <DependencyAudit onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Documentation Generator */}
          <TabsContent value="documentation" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Documentation Generator</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Auto-generate comprehensive project documentation</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600">GENERATOR</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <DocumentationGenerator onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Deployment Preview */}
          <TabsContent value="deployment" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Rocket className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Deployment Preview</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Stage and preview deployments with automated testing</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600">PREVIEW</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <DeploymentPreview onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Rollback Management */}
          <TabsContent value="rollback" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Rollback Management</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Safe change management and recovery operations</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-red-700 dark:text-red-300 border-red-300 dark:border-red-600">RECOVERY</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <RollbackManagement onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Development Status Footer */}
      <footer className="container mx-auto px-6 py-4 text-center text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Development Environment: Operational</span>
            </div>
            <div className="text-xs">
              Data refresh: Every 30 seconds | Last sync: <span suppressHydrationWarning>{lastSync}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>847 Files Analyzed</span>
            <span>1,234 Tests Passing</span>
            <span>95.8% Security Score</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
