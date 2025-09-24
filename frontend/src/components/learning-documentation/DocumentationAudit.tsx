'use client';

import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  Settings, 
  AlertTriangle,
  Shield,
  TrendingUp,
  Eye,
  Zap,
  Target,
  BarChart3,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface DocumentationAuditProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function DocumentationAudit({ onExecutePrompt }: DocumentationAuditProps) {
  const [documentationSource, setDocumentationSource] = useState('');
  const [auditScope, setAuditScope] = useState('comprehensive');
  const [improvementFocus, setImprovementFocus] = useState('usability');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const auditScopes = [
    { value: 'quick', label: 'Quick Audit', icon: Zap },
    { value: 'standard', label: 'Standard Audit', icon: Search },
    { value: 'comprehensive', label: 'Comprehensive Audit', icon: BarChart3 },
    { value: 'focused', label: 'Focused Review', icon: Target }
  ];

  const improvementFoci = [
    { value: 'usability', label: 'Usability & UX', icon: Users },
    { value: 'accessibility', label: 'Accessibility', icon: Shield },
    { value: 'content_quality', label: 'Content Quality', icon: FileText },
    { value: 'developer_experience', label: 'Developer Experience', icon: Eye },
    { value: 'seo', label: 'SEO & Discoverability', icon: TrendingUp }
  ];

  const sourceSuggestions = [
    'https://docs.example.com',
    'https://github.com/user/repo/wiki',
    'https://confluence.company.com/docs',
    'https://notion.so/workspace/docs',
    'API Documentation Portal'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentationSource.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);
    
    try {
      const params: Record<string, unknown> = {
        documentation_source: documentationSource.trim(),
        audit_scope: auditScope,
        improvement_focus: improvementFocus
      };

      const result = await onExecutePrompt('documentation-audit', params);
      setResults(result);
    } catch (error) {
      console.error('Documentation audit failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(`Failed to perform documentation audit: ${errorMessage}. Please check your inputs and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Documentation Audit Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Search className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            <div>
              <CardTitle className="text-slate-900 dark:text-slate-100">Documentation Audit Configuration</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Analyze and improve existing documentation with AI insights</CardDescription>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-red-700 dark:text-red-300 border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20">AI-POWERED</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white dark:bg-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Documentation Source */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FileText className="h-4 w-4" />
                Documentation Source
              </Label>
              <Input
                value={documentationSource}
                onChange={(e) => setDocumentationSource(e.target.value)}
                placeholder="e.g., https://docs.example.com, GitHub Wiki URL, or documentation description"
                className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {sourceSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setDocumentationSource(suggestion)}
                    className="text-xs bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Audit Scope */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <BarChart3 className="h-4 w-4" />
                  Audit Scope
                </Label>
                <Select value={auditScope} onValueChange={setAuditScope}>
                  <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select audit scope" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                    {auditScopes.map((scope) => {
                      const IconComponent = scope.icon;
                      return (
                        <SelectItem 
                          key={scope.value} 
                          value={scope.value}
                          className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {scope.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Improvement Focus */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Target className="h-4 w-4" />
                  Improvement Focus
                </Label>
                <Select value={improvementFocus} onValueChange={setImprovementFocus}>
                  <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select focus area" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                    {improvementFoci.map((focus) => {
                      const IconComponent = focus.icon;
                      return (
                        <SelectItem 
                          key={focus.value} 
                          value={focus.value}
                          className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {focus.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button 
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white border-0"
              disabled={isLoading || !documentationSource.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Auditing Documentation...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Start Documentation Audit
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20">
          <CardHeader className="border-b border-red-300 dark:border-red-600 bg-red-100 dark:bg-red-900/30">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <CardTitle className="text-red-900 dark:text-red-100">Audit Failed</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-300">
                  An error occurred during the documentation audit
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-red-600 dark:bg-red-700 text-white border-0">ERROR</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-red-50 dark:bg-red-900/20">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-300 dark:border-red-600">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && (
        <Card className="border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
          <CardHeader className="border-b border-red-200 dark:border-red-700 bg-red-100 dark:bg-red-900/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-red-700 dark:text-red-400" />
              <div>
                <CardTitle className="text-red-900 dark:text-red-100">Audit Complete</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-300">
                  Documentation analysis complete with improvement recommendations
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-red-600 dark:bg-red-700 text-white border-0">ANALYZED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 bg-red-50 dark:bg-red-900/20">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-200 dark:border-red-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center bg-slate-50 dark:bg-slate-800">
            <Search className="h-6 w-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Content Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Deep content quality review</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center bg-slate-50 dark:bg-slate-800">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Accessibility Check</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">WCAG compliance analysis</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center bg-slate-50 dark:bg-slate-800">
            <Users className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">UX Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">User experience evaluation</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center bg-slate-50 dark:bg-slate-800">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">SEO Optimization</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Discoverability improvements</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
