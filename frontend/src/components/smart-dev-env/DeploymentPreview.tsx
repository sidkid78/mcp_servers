'use client';

import React, { useState } from 'react';
import { 
  Rocket, 
  GitBranch, 
  Globe, 
  CheckCircle2, 
  Settings,
  Activity,
  Zap,
  Monitor,
  Cloud,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface DeploymentPreviewProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function DeploymentPreview({ onExecutePrompt }: DeploymentPreviewProps) {
  const [environment, setEnvironment] = useState('staging');
  const [branch, setBranch] = useState('main');
  const [notify, setNotify] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const environments = [
    { value: 'staging', label: 'Staging', icon: Monitor, description: 'Pre-production environment' },
    { value: 'preview', label: 'Preview', icon: Globe, description: 'Feature preview environment' },
    { value: 'test', label: 'Test', icon: Zap, description: 'Testing environment' }
  ];

  const branchSuggestions = [
    'main',
    'master',
    'develop',
    'staging',
    'feature/new-feature',
    'hotfix/urgent-fix'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        environment: environment,
        branch: branch.trim(),
        notify: notify
      };

      const result = await onExecutePrompt('dev-setup', params);
      setResults(result);
    } catch (error) {
      console.error('Deployment preview failed:', error);
      setResults('Error: Failed to create deployment preview. Please check the configuration and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Deployment Preview Overview */}
      <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Rocket className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">Deployment Preview</h3>
              <p className="text-sm text-indigo-800 dark:text-indigo-200 mb-2">
                Create secure preview deployments with automated testing and health monitoring.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-700">
                  Auto-Deploy
                </Badge>
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-700">
                  Health Checks
                </Badge>
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-700">
                  Multi-Environment
                </Badge>
                <Badge variant="outline" className="text-indigo-700 border-indigo-300 dark:text-indigo-300 dark:border-indigo-700">
                  Notifications
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Deployment Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure deployment preview parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Environment */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Globe className="h-4 w-4" />
                  Target Environment
                </Label>
                <Select value={environment} onValueChange={setEnvironment}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    {environments.map((env) => {
                      const IconComponent = env.icon;
                      return (
                        <SelectItem 
                          key={env.value} 
                          value={env.value}
                          className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{env.label}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{env.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Branch */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <GitBranch className="h-4 w-4" />
                  Git Branch
                </Label>
                <Input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="e.g., main or feature/branch"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
                <div className="flex flex-wrap gap-2">
                  {branchSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBranch(suggestion)}
                      className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notification Option */}
            <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <Checkbox
                id="notifications"
                checked={notify}
                onCheckedChange={(checked) => setNotify(checked === true)}
                className="border-slate-400 dark:border-slate-500 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
              />
              <div className="flex-1">
                <Label htmlFor="notifications" className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                  Send Deployment Notifications
                </Label>
                <p className="text-xs text-slate-600 dark:text-slate-400">Notify team members about deployment status</p>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/50 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Configuration:</span>
              <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                Env: {environments.find(e => e.value === environment)?.label}
              </Badge>
              <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                Branch: {branch || 'main'}
              </Badge>
              {notify && (
                <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800">
                  Notifications
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Deploy Preview */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 border-0"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Deploying Preview...
                </>
              ) : (
                <>
                  <Rocket className="h-4 w-4 mr-2" />
                  Deploy Preview
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-indigo-200 bg-indigo-50 dark:border-indigo-800 dark:bg-indigo-950/50">
          <CardHeader className="border-b border-indigo-200 dark:border-indigo-800 bg-indigo-100 dark:bg-indigo-900/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />
              <div>
                <CardTitle className="text-indigo-900 dark:text-indigo-100">Deployment Preview Created</CardTitle>
                <CardDescription className="text-indigo-700 dark:text-indigo-300">
                  Preview environment ready for testing
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-indigo-600 text-white dark:bg-indigo-700 dark:text-indigo-100 border-0">DEPLOYED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deployment Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Monitor className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Health Monitoring</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Continuous health checks</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Cloud className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Auto-Scaling</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Dynamic resource allocation</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Error Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Real-time error monitoring</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Fast Deployment</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Quick preview creation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
