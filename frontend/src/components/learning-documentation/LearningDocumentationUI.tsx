'use client';

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Brain, 
  Target, 
  FileText, 
  TrendingUp, 
  Users, 
  Activity,
  GraduationCap,
  Lightbulb,
  BarChart3,
  CheckCircle2,
  Clock,
  Zap,
  Search,
  Play,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';

// Import individual components
import { LearningPathDesign } from './LearningPathDesign';
import { KnowledgeAssessment } from './KnowledgeAssessment';
import { ContentGeneration } from './ContentGeneration';
import { ProgressTracking } from './ProgressTracking';
import { DocumentationAudit } from './DocumentationAudit';
import { InteractiveTutorial } from './InteractiveTutorial';

interface LearningDocumentationUIProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function LearningDocumentationUI({ onExecutePrompt }: LearningDocumentationUIProps) {
  const [activeTab, setActiveTab] = useState('learning-path');
  const [lastUpdated, setLastUpdated] = useState('');
  const [lastSync, setLastSync] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [quickInsights, setQuickInsights] = useState<string[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<string[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<string[]>([]);

  useEffect(() => {
    setLastUpdated(new Date().toLocaleTimeString());
    setLastSync(new Date().toLocaleString());
    
    // Initialize quick insights
    setQuickInsights([
      'Learning engagement up 15% this week',
      'New adaptive path algorithm deployed',
      'Content quality scores improved by 8%'
    ]);
    
    // Initialize recent achievements
    setRecentAchievements([
      'JavaScript Fundamentals completed by 23 learners',
      'React Advanced course milestone reached',
      'Documentation audit identified 12 improvements'
    ]);
    
    // Initialize upcoming tasks
    setUpcomingTasks([
      'Review pending assessments (5)',
      'Update learning path algorithms',
      'Generate weekly progress reports'
    ]);
  }, []);

  // System metrics for the learning platform
  const systemMetrics = [
    {
      label: 'Active Learners',
      value: '2,847',
      detail: 'Across 47 courses',
      icon: Users,
      status: 'growing',
      change: '+12%'
    },
    {
      label: 'Content Items',
      value: '1,234',
      detail: 'Tutorials & assessments',
      icon: FileText,
      status: 'operational',
      change: '+8 today'
    },
    {
      label: 'Completion Rate',
      value: '87.3%',
      detail: 'Above industry avg',
      icon: TrendingUp,
      status: 'excellent',
      change: '+2.1%'
    },
    {
      label: 'AI Insights',
      value: '156',
      detail: 'Learning optimizations',
      icon: Brain,
      status: 'active',
      change: '+23 today'
    }
  ];

  // Learning modules with their capabilities
  const learningModules = [
    {
      id: 'learning-path',
      title: 'Learning Paths',
      icon: Target,
      description: 'Adaptive curricula design',
      stats: '47 active',
      color: 'blue'
    },
    {
      id: 'assessment',
      title: 'Assessment',
      icon: Brain,
      description: 'Knowledge evaluation',
      stats: '234 tests',
      color: 'green'
    },
    {
      id: 'content',
      title: 'Content Gen',
      icon: FileText,
      description: 'Auto-create materials',
      stats: '89 templates',
      color: 'purple'
    },
    {
      id: 'progress',
      title: 'Progress',
      icon: BarChart3,
      description: 'Learning analytics',
      stats: '2.8k tracked',
      color: 'orange'
    },
    {
      id: 'audit',
      title: 'Doc Audit',
      icon: Search,
      description: 'Content optimization',
      stats: '156 audits',
      color: 'red'
    },
    {
      id: 'tutorial',
      title: 'Tutorials',
      icon: Play,
      description: 'Interactive learning',
      stats: '67 active',
      color: 'indigo'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Learning Command Center Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-800 dark:from-blue-800 dark:via-indigo-800 dark:to-blue-700 text-white">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-600 dark:bg-blue-700 rounded-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Learning & Documentation Intelligence</h1>
                <p className="text-blue-200 dark:text-blue-100">Adaptive Learning Platform & Documentation Optimization</p>
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
                <span className="text-sm font-medium">LEARNING ACTIVE</span>
              </div>
              <div className="text-xs text-blue-300 dark:text-blue-200">
                Last Updated: <span suppressHydrationWarning>{lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Quick Insights Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Learning Resources */}
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Learning Resources
              </CardTitle>
              <CardDescription>
                Quick access to educational materials and documentation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded cursor-pointer">
                <span className="text-sm">Getting Started Guide</span>
                <Badge variant="outline" className="text-xs">NEW</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded cursor-pointer">
                <span className="text-sm">API Documentation</span>
                <Badge variant="outline" className="text-xs">UPDATED</Badge>
              </div>
              <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded cursor-pointer">
                <span className="text-sm">Best Practices</span>
                <Badge variant="outline" className="text-xs">POPULAR</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Insights */}
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                AI Insights
              </CardTitle>
              <CardDescription>
                Smart recommendations and learning optimizations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickInsights.map((insight, index) => (
                <div key={index} className="flex items-start gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                  <Zap className="h-3 w-3 text-yellow-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{insight}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                Recent Achievements
              </CardTitle>
              <CardDescription>
                Latest milestones and completed learning objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-2 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded">
                  <CheckCircle2 className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{achievement}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              Upcoming Tasks & Reminders
            </CardTitle>
            <CardDescription>
              Scheduled activities and pending actions requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                  <Clock className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Learning Intelligence Dashboard */}
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
                      metric.status === 'growing'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : metric.status === 'excellent'
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                        : metric.status === 'active'
                        ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
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
                Platform Settings
              </CardTitle>
              <CardDescription>
                Configure learning platform preferences and system options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">Learning Preferences</h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <label htmlFor="auto-generate" className="cursor-pointer">Auto-generate paths</label>
                      <input id="auto-generate" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="smart-rec" className="cursor-pointer">Smart recommendations</label>
                      <input id="smart-rec" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="progress-notif" className="cursor-pointer">Progress notifications</label>
                      <input id="progress-notif" type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">Content Settings</h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <label htmlFor="auto-audit" className="cursor-pointer">Auto-audit docs</label>
                      <input id="auto-audit" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="quality-score" className="cursor-pointer">Quality scoring</label>
                      <input id="quality-score" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="version-track" className="cursor-pointer">Version tracking</label>
                      <input id="version-track" type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-slate-900 dark:text-white">Analytics</h4>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between">
                      <label htmlFor="detailed-track" className="cursor-pointer">Detailed tracking</label>
                      <input id="detailed-track" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="perf-insights" className="cursor-pointer">Performance insights</label>
                      <input id="perf-insights" type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="export-reports" className="cursor-pointer">Export reports</label>
                      <input id="export-reports" type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Learning Control Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Learning Navigation */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-transparent">
              {learningModules.map((module) => (
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

          {/* Learning Path Design */}
          <TabsContent value="learning-path" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Learning Path Designer</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Create adaptive learning curricula tailored to individual needs</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">ADAPTIVE</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <LearningPathDesign onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Knowledge Assessment */}
          <TabsContent value="assessment" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Brain className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Knowledge Assessment Engine</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Evaluate understanding and identify knowledge gaps</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600">INTELLIGENT</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <KnowledgeAssessment onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Content Generation */}
          <TabsContent value="content" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Content Generation Studio</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Auto-create educational materials and learning content</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600">CREATIVE</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ContentGeneration onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Progress Tracking */}
          <TabsContent value="progress" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Progress Analytics Center</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Monitor learning effectiveness and progress patterns</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-600">ANALYTICS</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ProgressTracking onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Documentation Audit */}
          <TabsContent value="audit" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Documentation Audit Suite</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Analyze and improve existing documentation with AI insights</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-red-700 dark:text-red-300 border-red-300 dark:border-red-600">OPTIMIZER</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <DocumentationAudit onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>

          {/* Interactive Tutorial */}
          <TabsContent value="tutorial" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 px-6 py-4">
                <div className="flex items-center gap-3">
                  <Play className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Interactive Tutorial Builder</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Generate hands-on learning experiences with interactive elements</p>
                  </div>
                  <div className="ml-auto">
                    <Badge variant="outline" className="text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600">INTERACTIVE</Badge>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <InteractiveTutorial onExecutePrompt={onExecutePrompt} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Learning Intelligence Footer */}
      <footer className="container mx-auto px-6 py-4 text-center text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium">Learning Platform: Operational</span>
            </div>
            <div className="text-xs">
              Data refresh: Every 5 minutes | Last sync: <span suppressHydrationWarning>{lastSync}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>2,847 Active Learners</span>
            <span>1,234 Content Items</span>
            <span>87.3% Success Rate</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
