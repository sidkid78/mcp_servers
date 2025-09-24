'use client';

import React, { useState } from 'react';
import { 
  RotateCcw, 
  GitCommit, 
  Database, 
  Rocket, 
  AlertTriangle, 
  CheckCircle2,
  Settings,
  Activity,
  Shield,
  Clock,
  Archive,
  Target
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface RollbackManagementProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function RollbackManagement({ onExecutePrompt }: RollbackManagementProps) {
  const [target, setTarget] = useState('deployment');
  const [identifier, setIdentifier] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const rollbackTargets = [
    { value: 'deployment', label: 'Deployment', icon: Rocket, description: 'Rollback deployment to previous version' },
    { value: 'commit', label: 'Git Commit', icon: GitCommit, description: 'Revert to specific commit' },
    { value: 'migration', label: 'Database Migration', icon: Database, description: 'Rollback database changes' }
  ];

  const identifierSuggestions = {
    deployment: ['deploy-123', 'release-v2.1.0', 'staging-456'],
    commit: ['abc123def', 'HEAD~1', 'v2.0.1'],
    migration: ['20240101_001', '2024_01_user_table', 'latest']
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !confirm) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        target: target,
        identifier: identifier.trim(),
        confirm: confirm
      };

      const result = await onExecutePrompt('performance-audit', params);
      setResults(result);
    } catch (error) {
      console.error('Rollback failed:', error);
      setResults('Error: Failed to execute rollback. Please check the configuration and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentSuggestions = () => {
    return identifierSuggestions[target as keyof typeof identifierSuggestions] || [];
  };

  return (
    <div className="space-y-6">
      {/* Rollback Management Overview */}
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <RotateCcw className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Safe Rollback Management</h3>
              <p className="text-sm text-red-800 dark:text-red-200 mb-2">
                Safely revert deployments, commits, and database changes with comprehensive backup and recovery.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-red-700 border-red-300 dark:text-red-300 dark:border-red-700 dark:bg-red-950/30">
                  Safe Recovery
                </Badge>
                <Badge variant="outline" className="text-red-700 border-red-300 dark:text-red-300 dark:border-red-700 dark:bg-red-950/30">
                  Backup Verification
                </Badge>
                <Badge variant="outline" className="text-red-700 border-red-300 dark:text-red-300 dark:border-red-700 dark:bg-red-950/30">
                  Multi-Target
                </Badge>
                <Badge variant="outline" className="text-red-700 border-red-300 dark:text-red-300 dark:border-red-700 dark:bg-red-950/30">
                  Audit Trail
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rollback Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900/50">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Rollback Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure rollback target and parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Rollback Target */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Target className="h-4 w-4" />
                  Rollback Target
                </Label>
                <Select value={target} onValueChange={setTarget}>
                  <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700">
                    <SelectValue placeholder="Select rollback target" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                    {rollbackTargets.map((targetOption) => {
                      const IconComponent = targetOption.icon;
                      return (
                        <SelectItem 
                          key={targetOption.value} 
                          value={targetOption.value}
                          className="dark:text-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{targetOption.label}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{targetOption.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Identifier */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Archive className="h-4 w-4" />
                  Target Identifier *
                </Label>
                <Input
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={`e.g., ${getCurrentSuggestions()[0] || 'identifier'}`}
                  className="font-mono dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                  required
                />
                <div className="flex flex-wrap gap-2">
                  {getCurrentSuggestions().map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIdentifier(suggestion)}
                      className="text-xs dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100 dark:bg-slate-800/50"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Confirmation */}
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">Safety Confirmation Required</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
                    Rollback operations can have significant impact. Please confirm you understand the consequences.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="confirm-rollback"
                      checked={confirm}
                      onCheckedChange={(checked) => setConfirm(checked === true)}
                      className="dark:border-yellow-600 dark:data-[state=checked]:bg-yellow-600 dark:data-[state=checked]:border-yellow-600"
                    />
                    <Label htmlFor="confirm-rollback" className="text-sm font-medium cursor-pointer text-yellow-900 dark:text-yellow-100">
                      I confirm this rollback operation and understand the risks
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-red-50 dark:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-800/50">
              <span className="text-sm font-medium text-red-900 dark:text-red-100">Configuration:</span>
              <Badge variant="secondary" className="text-red-700 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700">
                Target: {rollbackTargets.find(t => t.value === target)?.label}
              </Badge>
              {identifier && (
                <Badge variant="secondary" className="text-red-700 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700">
                  ID: {identifier}
                </Badge>
              )}
              {confirm && (
                <Badge variant="secondary" className="text-red-700 dark:text-red-300 dark:bg-red-900/30 dark:border-red-700">
                  Confirmed
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Execute Rollback */}
        <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900/50">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white"
              disabled={isLoading || !identifier.trim() || !confirm}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Executing Rollback...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Execute Rollback
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardHeader className="border-b border-red-200 dark:border-red-800 bg-red-100 dark:bg-red-900/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-red-700 dark:text-red-400" />
              <div>
                <CardTitle className="text-red-900 dark:text-red-100">Rollback Executed</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-300">
                  Rollback operation completed successfully
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-red-600 text-white dark:bg-red-700 dark:text-red-100">ROLLED BACK</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-red-200 dark:border-red-800">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Rollback Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Safe Recovery</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Backup validation before rollback</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Point-in-Time</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Precise rollback targeting</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Archive className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Audit Trail</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Complete operation history</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Risk Assessment</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Impact analysis before rollback</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
