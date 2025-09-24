'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  FolderOpen, 
  BookOpen, 
  Code, 
  Settings,
  Activity,
  CheckCircle2,
  Zap,
  Target,
  PenTool
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface DocumentationGeneratorProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function DocumentationGenerator({ onExecutePrompt }: DocumentationGeneratorProps) {
  const [sourcePath, setSourcePath] = useState('');
  const [docType, setDocType] = useState('full');
  const [outputPath, setOutputPath] = useState('docs');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const docTypes = [
    { value: 'full', label: 'Full Documentation', icon: BookOpen, description: 'Complete project documentation' },
    { value: 'api', label: 'API Documentation', icon: Code, description: 'API reference and endpoints' },
    { value: 'readme', label: 'README', icon: FileText, description: 'Project README file' }
  ];

  const sourcePathSuggestions = [
    './src',
    './lib',
    './app',
    './components',
    './api',
    './modules',
    './utils',
    './services'
  ];

  const outputPathSuggestions = [
    'docs',
    'documentation',
    'wiki',
    './docs',
    './documentation',
    './wiki'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourcePath.trim()) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        source_path: sourcePath.trim(),
        doc_type: docType,
        output_path: outputPath.trim()
      };

      const result = await onExecutePrompt('refactor-planning', params);
      setResults(result);
    } catch (error) {
      console.error('Documentation generation failed:', error);
      setResults('Error: Failed to generate documentation. Please check the source path and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Documentation Generator Overview */}
      <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">AI-Powered Documentation Generator</h3>
              <p className="text-sm text-purple-800 dark:text-purple-200 mb-2">
                Automatically generate comprehensive documentation from your codebase with intelligent analysis.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  Auto-Generation
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  API Reference
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  Code Examples
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 dark:text-purple-300 dark:border-purple-700 dark:bg-purple-950/30">
                  Multi-Format
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Documentation Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure documentation generation parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Source Path */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FolderOpen className="h-4 w-4" />
                Source Path *
              </Label>
              <Input
                value={sourcePath}
                onChange={(e) => setSourcePath(e.target.value)}
                placeholder="e.g., ./src or ./lib"
                className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {sourcePathSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSourcePath(suggestion)}
                    className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Documentation Type */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <BookOpen className="h-4 w-4" />
                  Documentation Type
                </Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select documentation type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                    {docTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 focus:bg-slate-100 dark:focus:bg-slate-700"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{type.label}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">{type.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Output Path */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Target className="h-4 w-4" />
                  Output Path
                </Label>
                <Input
                  value={outputPath}
                  onChange={(e) => setOutputPath(e.target.value)}
                  placeholder="e.g., docs or documentation"
                  className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
                <div className="flex flex-wrap gap-2">
                  {outputPathSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setOutputPath(suggestion)}
                      className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Configuration:</span>
              {sourcePath && (
                <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700">
                  Source: {sourcePath}
                </Badge>
              )}
              <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700">
                Type: {docTypes.find(t => t.value === docType)?.label}
              </Badge>
              <Badge variant="secondary" className="text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 border-purple-200 dark:border-purple-700">
                Output: {outputPath}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Generate Documentation */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 transition-colors"
              disabled={isLoading || !sourcePath.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Generating Documentation...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Documentation
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/50">
          <CardHeader className="border-b border-purple-200 dark:border-purple-800 bg-purple-100 dark:bg-purple-900/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-700 dark:text-purple-400" />
              <div>
                <CardTitle className="text-purple-900 dark:text-purple-100">Documentation Generated</CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-300">
                  Documentation files created successfully
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-purple-600 text-white dark:bg-purple-700 dark:text-purple-100">GENERATED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documentation Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 transition-colors">
          <CardContent className="p-4 text-center">
            <Code className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">API Reference</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Auto-generated API docs</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 transition-colors">
          <CardContent className="p-4 text-center">
            <PenTool className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Code Examples</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Usage examples and snippets</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 transition-colors">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Multi-Format</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Markdown, HTML, and PDF</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800 transition-colors">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Auto-Update</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Sync with code changes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
