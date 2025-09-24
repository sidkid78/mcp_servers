'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Network, 
  Target, 
  Building2, 
  DollarSign,
  Users,
  Calendar,
  FileText,
  Activity,
  Database,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface SimilarProgramsProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function SimilarPrograms({ onExecutePrompt }: SimilarProgramsProps) {
  const [baseProgramNumber, setBaseProgramNumber] = useState('');
  const [similarityFocus, setSimilarityFocus] = useState('');
  const [maxResults, setMaxResults] = useState('10');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isQuickAnalyzing, setIsQuickAnalyzing] = useState(false);

  const similarityFocusOptions = [
    { value: 'all', label: 'All Aspects', icon: Target },
    { value: 'eligibility', label: 'Eligibility Criteria', icon: Users },
    { value: 'funding', label: 'Funding Characteristics', icon: DollarSign },
    { value: 'activities', label: 'Allowable Activities', icon: FileText },
    { value: 'population', label: 'Target Population', icon: Users },
    { value: 'objectives', label: 'Program Objectives', icon: Building2 }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseProgramNumber.trim()) {
      setError('Please enter a program number');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const params: Record<string, unknown> = {
        base_program_number: baseProgramNumber.trim(),
        max_results: parseInt(maxResults)
      };

      if (similarityFocus) {
        params.similarity_focus = similarityFocus;
      }

      const result = await onExecutePrompt('similar-programs', params);
      setResults(result);
      
      // Add to search history
      if (!searchHistory.includes(baseProgramNumber.trim())) {
        setSearchHistory(prev => [baseProgramNumber.trim(), ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Similar programs search failed:', error);
      setError('Failed to find similar programs. Please check your inputs and try again.');
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAnalysis = async () => {
    if (!baseProgramNumber.trim()) {
      setError('Please enter a program number for quick analysis');
      return;
    }

    setIsQuickAnalyzing(true);
    setError(null);
    
    try {
      const params = {
        base_program_number: baseProgramNumber.trim(),
        max_results: 5,
        similarity_focus: 'all',
        quick_mode: true
      };

      const result = await onExecutePrompt('similar-programs', params);
      setResults(result);
      
      // Add to search history
      if (!searchHistory.includes(baseProgramNumber.trim())) {
        setSearchHistory(prev => [baseProgramNumber.trim(), ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Quick analysis failed:', error);
      setError('Quick analysis failed. Please try again.');
      setResults(null);
    } finally {
      setIsQuickAnalyzing(false);
    }
  };

  const handleHistorySelect = (programNumber: string) => {
    setBaseProgramNumber(programNumber);
    setError(null);
  };

  return (
    <div className="space-y-6">
      {/* Search Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Network className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Similarity Analysis Configuration</CardTitle>
                <CardDescription className="dark:text-slate-400">Find programs similar to your target opportunity</CardDescription>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleQuickAnalysis}
                disabled={isQuickAnalyzing || !baseProgramNumber.trim()}
                className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {isQuickAnalyzing ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Quick
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                <Search className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm text-red-700 dark:text-red-300">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Target className="h-4 w-4" />
                Base Program Number
              </Label>
              <Input
                value={baseProgramNumber}
                onChange={(e) => {
                  setBaseProgramNumber(e.target.value);
                  setError(null);
                }}
                placeholder="e.g., 93.243"
                className="font-mono dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Similarity Focus</Label>
              <Select value={similarityFocus} onValueChange={setSimilarityFocus}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue placeholder="Select focus area" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                  {similarityFocusOptions.map((option) => {
                    const IconComponent = option.icon;
                    return (
                      <SelectItem key={option.value} value={option.value} className="dark:text-slate-100 dark:hover:bg-slate-600">
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {option.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Max Results</Label>
              <Select value={maxResults} onValueChange={setMaxResults}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                  <SelectItem value="5" className="dark:text-slate-100 dark:hover:bg-slate-600">5 Programs</SelectItem>
                  <SelectItem value="10" className="dark:text-slate-100 dark:hover:bg-slate-600">10 Programs</SelectItem>
                  <SelectItem value="15" className="dark:text-slate-100 dark:hover:bg-slate-600">15 Programs</SelectItem>
                  <SelectItem value="20" className="dark:text-slate-100 dark:hover:bg-slate-600">20 Programs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Search Options */}
          {showAdvancedSearch && (
            <div className="border-t dark:border-slate-600 pt-4 mt-4">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Advanced Search Options
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      <span className="text-sm font-medium dark:text-slate-200">Agency Filter</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Filter by specific federal agencies</p>
                  </CardContent>
                </Card>
                <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                      <span className="text-sm font-medium dark:text-slate-200">Date Range</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Filter by application deadlines</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div className="border-t dark:border-slate-600 pt-4 mt-4">
              <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Recent Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((programNumber, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleHistorySelect(programNumber)}
                    className="text-xs dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    {programNumber}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Execute Search */}
      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <CardContent className="p-6">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white"
            disabled={isLoading || !baseProgramNumber.trim()}
            size="lg"
          >
            {isLoading ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Similarities...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Find Similar Programs
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader className="border-b border-blue-200 dark:border-blue-700 bg-blue-100 dark:bg-blue-900/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              <div>
                <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Similar Programs Found
                </CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300">
                  Programs matching your similarity criteria
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-blue-600 dark:bg-blue-700 text-white">MATCHED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-blue-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Database className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">ML Matching</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Advanced similarity algorithms</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Multi-Dimensional</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Eligibility, funding, activities</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Funding Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Award amounts and patterns</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Quick Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Instant similarity insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
