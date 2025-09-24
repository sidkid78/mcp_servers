import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Rocket,
  BarChart3,
  FileText,
  Settings,
  Activity,
  Brain
} from 'lucide-react';

// Import individual components
import { ProjectKickoff } from './ProjectKickoff';
import { MilestonePlanning } from './MilestonePlanning';
import { ResourceOptimization } from './ResourceOptimization';
import { ProgressTracking } from './ProgressTracking';
import { RiskAssessment } from './RiskAssessment';

interface ProjectManagementUIProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function ProjectManagementUI({ onExecutePrompt }: ProjectManagementUIProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExecutePrompt = async (promptName: string, params: unknown) => {
    setIsLoading(true);
    setResponse(null);
    setError(null);
    try {
      if (onExecutePrompt) {
        const result = await onExecutePrompt(promptName, params);
        setResponse(JSON.stringify(result, null, 2));
      } else {
        setError("onExecutePrompt function is not provided.");
      }
    } catch (err: unknown) {
      setError((err as Error).message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = async (actionType: string) => {
    switch (actionType) {
      case 'automation':
        await handleExecutePrompt('project-automation', {
          automation_type: 'workflow_optimization',
          project_id: 'proj_demo123',
          scope: 'full_project'
        });
        break;
      case 'analytics':
        await handleExecutePrompt('project-analytics', {
          project_id: 'proj_demo123',
          metrics: ['performance', 'efficiency', 'quality'],
          time_range: 'last_30_days'
        });
        break;
      case 'documentation':
        await handleExecutePrompt('project-documentation', {
          project_id: 'proj_demo123',
          doc_type: 'comprehensive_report',
          include_metrics: true
        });
        break;
      case 'settings':
        await handleExecutePrompt('project-settings', {
          project_id: 'proj_demo123',
          configuration_type: 'optimization_preferences',
          auto_apply: false
        });
        break;
      default:
        setError(`Unknown action type: ${actionType}`);
    }
  };

  const projectStats = {
    activeProjects: 8,
    completedProjects: 24,
    teamMembers: 45,
    avgProjectDuration: 12,
    successRate: 94,
    resourceUtilization: 87,
    onTimeDelivery: 91,
    budgetVariance: -3
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 dark:from-gray-900 dark:to-purple-950 p-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-white/70 backdrop-blur-md shadow-xl border-slate-200 dark:bg-gray-800/70 dark:border-gray-700">
          <CardHeader className="border-b border-slate-200 dark:border-gray-700 pb-4">
            <CardTitle className="text-3xl font-bold text-purple-800 dark:text-purple-300 flex items-center">
              <Target className="h-8 w-8 mr-3 text-purple-600 dark:text-purple-400" />
              Project Management Intelligence
            </CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-300 mt-2">
              AI-powered project orchestration with resource optimization, risk management, and delivery planning.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-lg p-1">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-transparent">
                  <TabsTrigger
                    value="overview"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500 dark:data-[state=active]:text-white dark:text-gray-300"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="kickoff"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500 dark:data-[state=active]:text-white dark:text-gray-300"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Kickoff
                  </TabsTrigger>
                  <TabsTrigger
                    value="planning"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500 dark:data-[state=active]:text-white dark:text-gray-300"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Planning
                  </TabsTrigger>
                  <TabsTrigger
                    value="resources"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500 dark:data-[state=active]:text-white dark:text-gray-300"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Resources
                  </TabsTrigger>
                  <TabsTrigger
                    value="progress"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500 dark:data-[state=active]:text-white dark:text-gray-300"
                  >
                    <Activity className="h-4 w-4 mr-2" />
                    Progress
                  </TabsTrigger>
                  <TabsTrigger
                    value="risks"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white dark:data-[state=active]:bg-purple-500 dark:data-[state=active]:text-white dark:text-gray-300"
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Risks
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
                    <CardHeader>
                      <CardTitle className="dark:text-gray-100">Project Portfolio</CardTitle>
                      <CardDescription className="dark:text-gray-300">Current project status and metrics</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
                          <Activity className="h-4 w-4" /> Active Projects
                        </span>
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">{projectStats.activeProjects}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
                          <CheckCircle className="h-4 w-4 text-green-500" /> Completed
                        </span>
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">{projectStats.completedProjects}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
                          <Users className="h-4 w-4" /> Team Members
                        </span>
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">{projectStats.teamMembers}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium flex items-center gap-2 dark:text-gray-200">
                          <Clock className="h-4 w-4" /> Avg Duration
                        </span>
                        <Badge variant="secondary" className="dark:bg-gray-700 dark:text-gray-200">{projectStats.avgProjectDuration}w</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
                    <CardHeader>
                      <CardTitle className="dark:text-gray-100">Performance Metrics</CardTitle>
                      <CardDescription className="dark:text-gray-300">Key performance indicators</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm dark:text-gray-200">
                          <span>Success Rate</span>
                          <span>{projectStats.successRate}%</span>
                        </div>
                        <Progress value={projectStats.successRate} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm dark:text-gray-200">
                          <span>Resource Utilization</span>
                          <span>{projectStats.resourceUtilization}%</span>
                        </div>
                        <Progress value={projectStats.resourceUtilization} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm dark:text-gray-200">
                          <span>On-Time Delivery</span>
                          <span>{projectStats.onTimeDelivery}%</span>
                        </div>
                        <Progress value={projectStats.onTimeDelivery} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium dark:text-gray-200">Budget Variance</span>
                        <Badge variant="secondary" className="text-green-600 dark:bg-gray-700 dark:text-green-400">
                          {projectStats.budgetVariance}%
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
                    <CardHeader>
                      <CardTitle className="dark:text-gray-100">Quick Actions</CardTitle>
                      <CardDescription className="dark:text-gray-300">Common project management tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="h-20 flex-col gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 dark:border-gray-600 dark:text-gray-200"
                          onClick={() => handleExecutePrompt('project-kickoff', { 
                            project_name: 'New Project',
                            project_scope: 'Sample project for demonstration',
                            stakeholders: 'Project Manager, Team Lead, Developer'
                          })}
                          disabled={isLoading}
                        >
                          <Rocket className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                          <span className="text-sm">New Project</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="h-20 flex-col gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:border-gray-600 dark:text-gray-200"
                          onClick={() => handleExecutePrompt('milestone-planning', { 
                            project_id: 'proj_demo123',
                            planning_horizon: 'full_project'
                          })}
                          disabled={isLoading}
                        >
                          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          <span className="text-sm">Plan Milestones</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="h-20 flex-col gap-2 hover:bg-green-50 dark:hover:bg-green-900/20 dark:border-gray-600 dark:text-gray-200"
                          onClick={() => handleExecutePrompt('resource-optimization', { 
                            project_id: 'proj_demo123',
                            constraint_type: 'time_and_budget'
                          })}
                          disabled={isLoading}
                        >
                          <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                          <span className="text-sm">Optimize Resources</span>
                        </Button>

                        <Button
                          variant="outline"
                          className="h-20 flex-col gap-2 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-gray-600 dark:text-gray-200"
                          onClick={() => handleExecutePrompt('risk-assessment', { 
                            project_id: 'proj_demo123',
                            assessment_scope: 'comprehensive'
                          })}
                          disabled={isLoading}
                        >
                          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                          <span className="text-sm">Assess Risks</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Enhanced Quick Actions Section */}
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-gray-100">
                      <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                      Advanced Project Tools
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Powerful AI-driven tools for project optimization and management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 dark:border-gray-600 dark:text-gray-200"
                        onClick={() => handleQuickAction('automation')}
                        disabled={isLoading}
                      >
                        <Zap className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-sm font-medium">Automation</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Workflow optimization</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 dark:border-gray-600 dark:text-gray-200"
                        onClick={() => handleQuickAction('analytics')}
                        disabled={isLoading}
                      >
                        <BarChart3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        <span className="text-sm font-medium">Analytics</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Performance insights</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 dark:border-gray-600 dark:text-gray-200"
                        onClick={() => handleQuickAction('documentation')}
                        disabled={isLoading}
                      >
                        <FileText className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm font-medium">Documentation</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Generate reports</span>
                      </Button>

                      <Button
                        variant="outline"
                        className="h-24 flex-col gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 dark:border-gray-600 dark:text-gray-200"
                        onClick={() => handleQuickAction('settings')}
                        disabled={isLoading}
                      >
                        <Settings className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium">Settings</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Configure preferences</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Workflows Section */}
                <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 dark:text-gray-100">
                      <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      AI-Powered Project Workflows
                    </CardTitle>
                    <CardDescription className="dark:text-gray-300">
                      Comprehensive project management workflows powered by advanced AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="p-4 border border-purple-200 dark:border-purple-700 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <Rocket className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          <h4 className="font-medium dark:text-gray-100">Project Kickoff</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Complete project initiation with stakeholder analysis and scope planning
                        </p>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">AI Workflow</Badge>
                      </div>

                      <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-medium dark:text-gray-100">Milestone Planning</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Break down projects into manageable phases with dependency mapping
                        </p>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">AI Workflow</Badge>
                      </div>

                      <div className="p-4 border border-green-200 dark:border-green-700 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <h4 className="font-medium dark:text-gray-100">Resource Optimization</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Optimize team allocation and capacity planning with AI insights
                        </p>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">AI Workflow</Badge>
                      </div>

                      <div className="p-4 border border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <Activity className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                          <h4 className="font-medium dark:text-gray-100">Progress Review</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Automated status reporting with bottleneck detection
                        </p>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">AI Workflow</Badge>
                      </div>

                      <div className="p-4 border border-red-200 dark:border-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                          <h4 className="font-medium dark:text-gray-100">Risk Assessment</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          Proactive risk identification with mitigation strategies
                        </p>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">AI Workflow</Badge>
                      </div>

                      <div className="p-4 border border-indigo-200 dark:border-indigo-700 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          <h4 className="font-medium dark:text-gray-100">Delivery Planning</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          End-to-end delivery orchestration and strategy planning
                        </p>
                        <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">AI Workflow</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Individual Workflow Tabs */}
              <TabsContent value="kickoff">
                <ProjectKickoff onExecutePrompt={handleExecutePrompt} />
              </TabsContent>

              <TabsContent value="planning">
                <MilestonePlanning onExecutePrompt={handleExecutePrompt} />
              </TabsContent>

              <TabsContent value="resources">
                <ResourceOptimization onExecutePrompt={handleExecutePrompt} />
              </TabsContent>

              <TabsContent value="progress">
                <ProgressTracking onExecutePrompt={handleExecutePrompt} />
              </TabsContent>

              <TabsContent value="risks">
                <RiskAssessment onExecutePrompt={handleExecutePrompt} />
              </TabsContent>
            </Tabs>

            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 flex items-center justify-center z-50">
                <div className="flex flex-col items-center space-y-4">
                  <Brain className="h-12 w-12 text-purple-600 dark:text-purple-400 animate-pulse" />
                  <p className="text-lg font-medium text-purple-800 dark:text-purple-300">
                    AI analyzing project... Please wait.
                  </p>
                </div>
              </div>
            )}

            {/* Response Display */}
            {response && (
              <Card className="mt-6 bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <CheckCircle className="h-5 w-5" /> Project Analysis Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm overflow-auto max-h-96 dark:text-gray-200">
                    <code>{response}</code>
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Error Display */}
            {error && (
              <Card className="mt-6 bg-red-100/70 backdrop-blur-sm border-0 shadow-lg border-red-300 dark:bg-red-900/20 dark:border-red-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-300">
                    <AlertTriangle className="h-5 w-5" /> Analysis Error
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-red-600 dark:text-red-200">{error}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
