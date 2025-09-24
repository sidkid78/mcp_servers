'use client';

import React, { useState } from 'react';
import { 
  TestTube, 
  FolderOpen, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  Settings,
  Activity,
  Target,
  Zap,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface TestExecutionProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function TestExecution({ onExecutePrompt }: TestExecutionProps) {
  const [testPath, setTestPath] = useState('');
  const [testType, setTestType] = useState('all');
  const [includeCoverage, setIncludeCoverage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  const testTypes = [
    { value: 'all', label: 'All Tests', icon: TestTube, description: 'Run complete test suite' },
    { value: 'unit', label: 'Unit Tests', icon: Target, description: 'Individual component tests' },
    { value: 'integration', label: 'Integration', icon: Activity, description: 'Component integration tests' },
    { value: 'e2e', label: 'End-to-End', icon: TrendingUp, description: 'Full application flow tests' }
  ];

  const testPathSuggestions = [
    './tests',
    './test',
    './__tests__',
    './src/tests',
    './spec',
    './cypress',
    './e2e',
    './integration'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPath.trim()) return;

    setIsLoading(true);
    setHasError(false);
    try {
      const params: Record<string, unknown> = {
        test_path: testPath.trim(),
        test_type: testType,
        coverage: includeCoverage
      };

      const result = await onExecutePrompt('debug-investigation', params);
      setResults(result);
    } catch (error) {
      console.error('Test execution failed:', error);
      setResults('Error: Failed to execute tests. Please check the test path and configuration.');
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Test Execution Overview */}
      <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TestTube className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Automated Test Execution</h3>
              <p className="text-sm text-green-800 dark:text-green-200 mb-2">
                Run comprehensive test suites with coverage analysis and detailed reporting.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700 dark:bg-green-950/30">
                  Multi-Framework
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700 dark:bg-green-950/30">
                  Coverage Reports
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700 dark:bg-green-950/30">
                  Parallel Execution
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300 dark:text-green-300 dark:border-green-700 dark:bg-green-950/30">
                  CI/CD Ready
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Test Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure test execution parameters and options</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Test Path */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FolderOpen className="h-4 w-4" />
                Test Path *
              </Label>
              <Input
                value={testPath}
                onChange={(e) => setTestPath(e.target.value)}
                placeholder="e.g., ./tests or ./src/__tests__"
                className="font-mono bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {testPathSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTestPath(suggestion)}
                    className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Test Type */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Activity className="h-4 w-4" />
                Test Type
              </Label>
              <Select value={testType} onValueChange={setTestType}>
                <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                  <SelectValue placeholder="Select test type" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                  {testTypes.map((type) => {
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

            {/* Coverage Option */}
            <div className="flex items-center space-x-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <Checkbox
                id="coverage"
                checked={includeCoverage}
                onCheckedChange={(checked) => setIncludeCoverage(checked === true)}
                className="border-slate-400 dark:border-slate-500 data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100 data-[state=checked]:border-slate-900 dark:data-[state=checked]:border-slate-100"
              />
              <div className="flex-1">
                <Label htmlFor="coverage" className="text-sm font-medium cursor-pointer text-slate-900 dark:text-slate-200">
                  Include Coverage Report
                </Label>
                <p className="text-xs text-slate-600 dark:text-slate-400">Generate detailed code coverage analysis</p>
              </div>
            </div>

            {/* Current Configuration Display */}
            <div className="flex flex-wrap gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
              <span className="text-sm font-medium text-green-900 dark:text-green-100">Configuration:</span>
              {testPath && (
                <Badge variant="secondary" className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700">
                  Path: {testPath}
                </Badge>
              )}
              <Badge variant="secondary" className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700">
                Type: {testTypes.find(t => t.value === testType)?.label}
              </Badge>
              {includeCoverage && (
                <Badge variant="secondary" className="text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700">
                  Coverage Enabled
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Execute Tests */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 border-0"
              disabled={isLoading || !testPath.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Execute Test Suite
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Results */}
      {results && (
        <Card className={hasError 
          ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50"
          : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50"
        }>
          <CardHeader className={`border-b ${hasError 
            ? "border-red-200 dark:border-red-800 bg-red-100 dark:bg-red-900/50"
            : "border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900/50"
          }`}>
            <div className="flex items-center gap-3">
              {hasError ? (
                <XCircle className="h-5 w-5 text-red-700 dark:text-red-400" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
              )}
              <div>
                <CardTitle className={hasError 
                  ? "text-red-900 dark:text-red-100"
                  : "text-green-900 dark:text-green-100"
                }>
                  {hasError ? "Test Execution Failed" : "Test Execution Complete"}
                </CardTitle>
                <CardDescription className={hasError 
                  ? "text-red-700 dark:text-red-300"
                  : "text-green-700 dark:text-green-300"
                }>
                  {hasError ? "Error occurred during test execution" : "Test results and coverage analysis"}
                </CardDescription>
              </div>
              <Badge className={`ml-auto ${hasError 
                ? "bg-red-600 text-white dark:bg-red-700 dark:text-red-100 border-red-600 dark:border-red-700"
                : "bg-green-600 text-white dark:bg-green-700 dark:text-green-100 border-green-600 dark:border-green-700"
              }`}>
                {hasError ? "FAILED" : "EXECUTED"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className={`rounded-lg p-4 border ${hasError 
              ? "bg-white dark:bg-slate-900 border-red-200 dark:border-red-800"
              : "bg-white dark:bg-slate-900 border-green-200 dark:border-green-800"
            }`}>
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Pass/Fail Detection</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Detailed test result analysis</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Coverage Reports</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Line and branch coverage</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Parallel Execution</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Fast test suite execution</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Framework Support</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Jest, Pytest, Mocha, and more</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
