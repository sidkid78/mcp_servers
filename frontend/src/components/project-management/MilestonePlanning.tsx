import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Target, 
  GitBranch, 
  Clock, 
  TrendingUp,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface MilestonePlanningProps {
  onExecutePrompt?: (prompt: string, params: unknown) => Promise<unknown>;
}

export function MilestonePlanning({ onExecutePrompt }: MilestonePlanningProps) {
  const [formData, setFormData] = useState({
    projectId: '',
    planningHorizon: 'full_project'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePlanning = async () => {
    if (!formData.projectId.trim()) {
      return;
    }

    setIsLoading(true);
    try {
      await onExecutePrompt?.('milestone-planning', {
        project_id: formData.projectId,
        planning_horizon: formData.planningHorizon
      });
    } finally {
      setIsLoading(false);
    }
  };

  const planningHorizons = [
    { value: 'full_project', label: 'Full Project', description: 'Complete project breakdown' },
    { value: 'next_quarter', label: 'Next Quarter', description: 'Focus on upcoming 3 months' },
    { value: 'current_phase', label: 'Current Phase', description: 'Current phase only' }
  ];

  const exampleProjects = [
    { id: 'proj_web_portal', name: 'Customer Web Portal', type: 'Software Development' },
    { id: 'proj_mobile_app', name: 'Mobile Application', type: 'Mobile Development' },
    { id: 'proj_data_migration', name: 'Data Migration', type: 'Infrastructure' },
    { id: 'proj_demo123', name: 'Demo Project', type: 'General' }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <Calendar className="h-6 w-6" />
            Milestone Planning Workflow
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Break down complex projects into manageable phases and milestones with AI-powered dependency mapping.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Planning Input Form */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectId" className="text-sm font-medium dark:text-gray-200">
                  Project ID *
                </Label>
                <Input
                  id="projectId"
                  placeholder="Enter project ID (e.g., proj_abc123)..."
                  value={formData.projectId}
                  onChange={(e) => handleInputChange('projectId', e.target.value)}
                  className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Use the project ID from a completed kickoff workflow
                </p>
              </div>

              <div>
                <Label htmlFor="planningHorizon" className="text-sm font-medium dark:text-gray-200">
                  Planning Horizon
                </Label>
                <Select
                  value={formData.planningHorizon}
                  onValueChange={(value) => handleInputChange('planningHorizon', value)}
                >
                  <SelectTrigger className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    {planningHorizons.map((horizon) => (
                      <SelectItem key={horizon.value} value={horizon.value} className="dark:text-gray-100 dark:hover:bg-gray-600">
                        <div>
                          <div className="font-medium">{horizon.label}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{horizon.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handlePlanning}
                disabled={!formData.projectId.trim() || isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {isLoading ? 'Generating Milestones...' : 'Generate Milestone Plan'}
              </Button>
            </div>

            {/* AI Capabilities */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                AI Analysis Includes:
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">Milestone Breakdown</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Detailed milestones with deliverables and success criteria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                  <GitBranch className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 dark:text-green-100">Dependency Mapping</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Maps dependencies and identifies critical path
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Timeline Analysis</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Critical path analysis with buffer calculations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-900 dark:text-purple-100">Resource Planning</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Skill requirements and capacity analysis by phase
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Planning Output</span>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Detailed milestone breakdown with dates</li>
                  <li>• Critical path and parallel opportunities</li>
                  <li>• Resource requirements by skill area</li>
                  <li>• Risk factors and buffer recommendations</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example Projects */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            Example Project IDs
          </CardTitle>
          <CardDescription className="dark:text-gray-300">
            Click on any project to auto-fill the project ID field
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleProjects.map((project, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                onClick={() => handleInputChange('projectId', project.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium dark:text-gray-100">{project.name}</h4>
                  <Badge variant="outline" className="text-xs dark:border-gray-600 dark:text-gray-300">
                    {project.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {project.id}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Planning Features */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 dark:text-gray-100">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
            Advanced Planning Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium dark:text-gray-100">Dependency Analysis</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Automatically identifies task dependencies and creates optimal sequencing
              </p>
            </div>

            <div className="p-4 border border-green-200 dark:border-green-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span className="font-medium dark:text-gray-100">Buffer Calculation</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Adds intelligent buffers based on risk level and milestone complexity
              </p>
            </div>

            <div className="p-4 border border-purple-200 dark:border-purple-700 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <span className="font-medium dark:text-gray-100">Parallel Opportunities</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Identifies tasks that can run concurrently to accelerate delivery
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
