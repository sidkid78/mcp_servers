import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket, 
  Users, 
  Target, 
  Calendar, 
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface ProjectKickoffProps {
  onExecutePrompt?: (prompt: string, params: unknown) => Promise<unknown>;
}

export function ProjectKickoff({ onExecutePrompt }: ProjectKickoffProps) {
  const [formData, setFormData] = useState({
    projectName: '',
    projectScope: '',
    stakeholders: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleKickoff = async () => {
    if (!formData.projectName.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onExecutePrompt?.('project-kickoff', {
        project_name: formData.projectName,
        project_scope: formData.projectScope,
        stakeholders: formData.stakeholders
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exampleProjects = [
    {
      name: "Customer Portal Redesign",
      scope: "Modernize customer portal with React frontend and enhanced user experience",
      stakeholders: "Product Manager, UX Designer, Backend Engineer, Frontend Engineer"
    },
    {
      name: "Mobile App Development",
      scope: "Build cross-platform mobile application with real-time features",
      stakeholders: "Mobile Team Lead, iOS Developer, Android Developer, QA Engineer"
    },
    {
      name: "Data Migration Project",
      scope: "Migrate legacy database to cloud infrastructure with zero downtime",
      stakeholders: "Database Administrator, Cloud Engineer, System Architect, Operations Team"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
            <Rocket className="h-6 w-6" />
            Project Kickoff Workflow
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Complete project initiation with AI-powered stakeholder analysis, scope planning, and initial estimates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Project Input Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName" className="text-sm font-medium dark:text-gray-200">
                  Project Name *
                </Label>
                <Input
                  id="projectName"
                  placeholder="Enter project name..."
                  value={formData.projectName}
                  onChange={(e) => handleInputChange('projectName', e.target.value)}
                  className="mt-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="projectScope" className="text-sm font-medium dark:text-gray-200">
                  Project Scope & Description
                </Label>
                <Textarea
                  id="projectScope"
                  placeholder="Describe the project scope, objectives, and key deliverables..."
                  value={formData.projectScope}
                  onChange={(e) => handleInputChange('projectScope', e.target.value)}
                  className="mt-1 min-h-24 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>

              <div>
                <Label htmlFor="stakeholders" className="text-sm font-medium dark:text-gray-200">
                  Stakeholders & Team Members
                </Label>
                <Textarea
                  id="stakeholders"
                  placeholder="List key stakeholders and team members (comma-separated)..."
                  value={formData.stakeholders}
                  onChange={(e) => handleInputChange('stakeholders', e.target.value)}
                  className="mt-1 min-h-20 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Example: Product Manager, UX Designer, Backend Engineer, QA Lead
                </p>
              </div>

              <Button
                onClick={handleKickoff}
                disabled={!formData.projectName.trim() || isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
              >
                <Rocket className="h-4 w-4 mr-2" />
                {isLoading ? 'Analyzing Project...' : 'Start Project Kickoff'}
              </Button>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                AI-Powered Analysis Includes:
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg border dark:border-blue-900/30">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Scope Analysis</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Analyzes complexity, deliverables, and technology components
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/50 rounded-lg border dark:border-green-900/30">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Stakeholder Matrix</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Categorizes roles and identifies coverage gaps
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/50 rounded-lg border dark:border-orange-900/30">
                  <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Project Phases</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Suggests optimal project phases and timelines
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-950/50 rounded-lg border dark:border-red-900/30">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 dark:text-red-100">Risk Assessment</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      Identifies initial risks and mitigation strategies
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/50 rounded-lg border dark:border-purple-900/30">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium text-purple-900 dark:text-purple-100">Output Includes</span>
                </div>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• Project classification and complexity assessment</li>
                  <li>• Initial timeline and budget estimates</li>
                  <li>• Recommended next steps and workflows</li>
                  <li>• Success criteria and metrics definition</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Projects */}
      <Card className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border-0 shadow-lg dark:shadow-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Example Projects
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Click on any example to auto-fill the form and see how the AI analysis works
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exampleProjects.map((project, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => setFormData({
                  projectName: project.name,
                  projectScope: project.scope,
                  stakeholders: project.stakeholders
                })}
              >
                <h4 className="font-medium mb-2 dark:text-gray-100">{project.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {project.scope.substring(0, 80)}...
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.stakeholders.split(', ').slice(0, 2).map((stakeholder, i) => (
                    <Badge key={i} variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                      {stakeholder}
                    </Badge>
                  ))}
                  {project.stakeholders.split(', ').length > 2 && (
                    <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                      +{project.stakeholders.split(', ').length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
