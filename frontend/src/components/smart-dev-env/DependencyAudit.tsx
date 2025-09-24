'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  Settings,
  Activity,
  Package,
  Zap,
  Bug
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface DependencyAuditProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function DependencyAudit({ onExecutePrompt }: DependencyAuditProps) {
  const [manifestPath, setManifestPath] = useState('');
  const [checkVulnerabilities, setCheckVulnerabilities] = useState(true);
  const [checkUpdates, setCheckUpdates] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const manifestSuggestions = [
    'package.json',
    'requirements.txt',
    'Cargo.toml',
    'go.mod',
    'pom.xml',
    'build.gradle',
    'composer.json',
    'Gemfile'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manifestPath.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);
    
    try {
      const params: Record<string, unknown> = {
        manifest_path: manifestPath.trim(),
        check_vulnerabilities: checkVulnerabilities,
        check_updates: checkUpdates
      };

      const result = await onExecutePrompt('architecture-analysis', params);
      setResults(result);
    } catch (error) {
      console.error('Dependency audit failed:', error);
      setError('Failed to audit dependencies. Please check the manifest path and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dependency Audit Overview */}
      <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-1">Dependency Security Audit</h3>
              <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
                Comprehensive security scanning and update analysis for project dependencies.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-700 dark:bg-orange-950/30">
                  Vulnerability Scan
                </Badge>
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-700 dark:bg-orange-950/30">
                  Update Analysis
                </Badge>
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-700 dark:bg-orange-950/30">
                  License Check
                </Badge>
                <Badge variant="outline" className="text-orange-700 border-orange-300 dark:text-orange-300 dark:border-orange-700 dark:bg-orange-950/30">
                  Risk Assessment
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Audit Failed</h3>
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Audit Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure dependency audit parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Manifest Path */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FileText className="h-4 w-4" />
                Manifest File *
              </Label>
              <Input
                value={manifestPath}
                onChange={(e) => setManifestPath(e.target.value)}
                placeholder="e.g., package.json or requirements.txt"
                className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {manifestSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setManifestPath(suggestion)}
                    className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Audit Options */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Audit Options
              </Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Checkbox
                    id="vulnerabilities"
                    checked={checkVulnerabilities}
                    onCheckedChange={(checked) => setCheckVulnerabilities(checked === true)}
                    className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
                  />
                  <div className="flex-1">
                    <Label htmlFor="vulnerabilities" className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                      Check for Vulnerabilities
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Scan for known security vulnerabilities</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Checkbox
                    id="updates"
                    checked={checkUpdates}
                    onCheckedChange={(checked) => setCheckUpdates(checked === true)}
                    className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
                  />
                  <div className="flex-1">
                    <Label htmlFor="updates" className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                      Check for Updates
                    </Label>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Find available package updates</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Validation Warning */}
            {!manifestPath.trim() && (
              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/50 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    Please specify a manifest file to proceed with the audit.
                  </p>
                </div>
              </div>
            )}

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-orange-50 dark:bg-orange-950/50 rounded-lg border border-orange-200 dark:border-orange-800">
              <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Configuration:</span>
              {manifestPath && (
                <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/50 border-orange-200 dark:border-orange-700">
                  File: {manifestPath}
                </Badge>
              )}
              {checkVulnerabilities && (
                <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/50 border-orange-200 dark:border-orange-700">
                  Security Scan
                </Badge>
              )}
              {checkUpdates && (
                <Badge variant="secondary" className="text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/50 border-orange-200 dark:border-orange-700">
                  Update Check
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Execute Audit */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 border-0"
              disabled={isLoading || !manifestPath.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Auditing Dependencies...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Start Security Audit
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
          <CardHeader className="border-b border-orange-200 dark:border-orange-800 bg-orange-100 dark:bg-orange-900/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-orange-700 dark:text-orange-400" />
              <div>
                <CardTitle className="text-orange-900 dark:text-orange-100">Dependency Audit Complete</CardTitle>
                <CardDescription className="text-orange-700 dark:text-orange-300">
                  Security analysis and update recommendations
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-orange-600 text-white dark:bg-orange-700 dark:text-orange-100 border-0">AUDITED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Bug className="h-6 w-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Vulnerability Scan</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">CVE database lookup</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Update Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Latest version checking</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Package className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">License Check</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">License compatibility</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Risk Assessment</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Security risk scoring</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
