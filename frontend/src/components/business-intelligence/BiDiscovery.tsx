'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Database, 
  FolderOpen,
  FileText,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Zap,
  BarChart3,
  Target,
  Upload
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface BiDiscoveryProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function BiDiscovery({ onExecutePrompt }: BiDiscoveryProps) {
  const [dataPath, setDataPath] = useState('./data');
  const [businessContext, setBusinessContext] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [discoveredFiles, setDiscoveredFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const validExtensions = ['.csv', '.xlsx', '.xls', '.json', '.parquet'];
      const extension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
      return validExtensions.includes(extension);
    });

    if (validFiles.length !== files.length) {
      setWarnings(prev => [...prev, 'Some files were skipped due to unsupported format. Supported formats: CSV, Excel, JSON, Parquet']);
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
    
    // Clear the input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeUploadedFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearWarnings = () => {
    setWarnings([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setWarnings([]);
    setDiscoveredFiles([]);
    
    try {
      const params: Record<string, unknown> = {
        data_path: dataPath.trim() || './data'
      };
      
      if (businessContext.trim()) {
        params.business_context = businessContext.trim();
      }

      const result = await onExecutePrompt('bi-discovery', params);
      setResults(result);

      // List actual files from server-side API (BI MCP data directory)
      try {
        const listRes = await fetch('/api/bi-list-files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data_path: dataPath.trim() || './data' })
        });
        const listJson = await listRes.json();
        if (listRes.ok && listJson?.success && Array.isArray(listJson.data?.files)) {
          setDiscoveredFiles(listJson.data.files);
        } else {
          setWarnings(prev => [...prev, listJson?.error || 'Failed to read data directory.']);
        }
      } catch (err) {
        console.error('Error listing files:', err);
        setWarnings(prev => [...prev, 'Unable to list files from the server.']);
      }

      // Optional tip if no context provided
      if (!businessContext.trim()) {
        setWarnings(prev => [...prev, 'Tip: Add business context for more targeted analysis']);
      }
      
    } catch (error) {
      console.error('BI Discovery failed:', error);
      setResults('Error: Failed to discover data sources. Please check your inputs and try again.');
      setWarnings(prev => [...prev, 'Discovery failed. Please verify your data path and try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPaths = [
    { path: './data', description: 'Default data directory' },
    { path: './exports', description: 'Exported datasets' },
    { path: './temp', description: 'Temporary files' },
    { path: '.', description: 'Current directory' }
  ];

  const contextSuggestions = [
    'Sales performance analysis for Q4 2024',
    'Customer segmentation and behavior patterns',
    'Financial metrics and KPI dashboard creation',
    'Marketing campaign effectiveness analysis',
    'Supply chain optimization insights',
    'Employee performance and HR analytics'
  ];

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 min-h-screen p-6">
      {/* Discovery Overview */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Search className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Data Discovery & Profiling</h3>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
                Automatically discover available data sources and generate comprehensive profiles with business context analysis.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800">
                  Multi-format Support
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800">
                  Auto Profiling
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800">
                  Business Context
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800">
                  Quality Assessment
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warnings */}
      {warnings.length > 0 && (
        <Card className="border-orange-200 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <CardTitle className="text-orange-900 dark:text-orange-100 text-sm">Warnings</CardTitle>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearWarnings}
                className="text-orange-700 hover:text-orange-900 dark:text-orange-300 dark:hover:text-orange-100 border-orange-300 dark:border-orange-600 bg-white dark:bg-slate-800 hover:bg-orange-50 dark:hover:bg-orange-900/50"
              >
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {warnings.map((warning, index) => (
                <div key={index} className="flex items-start gap-2 text-sm text-orange-800 dark:text-orange-200">
                  <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" />
                  <span>{warning}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discovery Configuration */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Discovery Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Configure data source discovery parameters</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 bg-white dark:bg-slate-800">
            {/* Data Path */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FolderOpen className="h-4 w-4" />
                Data Path
              </Label>
              <Input
                value={dataPath}
                onChange={(e) => setDataPath(e.target.value)}
                placeholder="./data"
                className="font-mono bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-blue-400"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {quickPaths.map((path, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant={dataPath === path.path ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDataPath(path.path)}
                    className={`text-xs justify-start ${
                      dataPath === path.path 
                        ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900" 
                        : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    <FolderOpen className="h-3 w-3 mr-1" />
                    {path.path}
                  </Button>
                ))}
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Upload className="h-4 w-4" />
                Upload Data Files (Optional)
              </Label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50">
                <input
                  title="Upload Data Files"
                  placeholder="Upload Data Files"
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.xls,.json,.parquet"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="text-center">
                  <Upload className="h-8 w-8 text-slate-400 dark:text-slate-500 mx-auto mb-2" />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-2 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    Choose Files
                  </Button>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Supported formats: CSV, Excel, JSON, Parquet
                  </p>
                </div>
              </div>
              
              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Uploaded Files:</Label>
                  <div className="space-y-1">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 p-2 rounded border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2"> 
                          <FileText className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{file.name}</span>
                          <Badge variant="outline" className="text-xs bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400">
                            {(file.size / 1024).toFixed(1)} KB
                          </Badge>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeUploadedFile(index)}
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 border-red-300 dark:border-red-600 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30"
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Business Context */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Target className="h-4 w-4" />
                Business Context (Optional)
              </Label>
              <Textarea
                value={businessContext}
                onChange={(e) => setBusinessContext(e.target.value)}
                placeholder="Describe your business objectives, analysis goals, or specific context..."
                rows={3}
                className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 focus:border-blue-500 dark:focus:border-blue-400"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {contextSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setBusinessContext(suggestion)}
                    className="text-xs text-left justify-start h-auto py-2 px-3 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Execute Discovery */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-6">
            <Button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900"
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Discovering Data Sources...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Start Data Discovery
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {/* Discovered Files */}
      {discoveredFiles.length > 0 && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/30">
          <CardHeader className="border-b border-blue-200 dark:border-blue-700">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-700 dark:text-blue-300" />
              <div>
                <CardTitle className="text-blue-900 dark:text-blue-100">Discovered Files</CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300">
                  Found {discoveredFiles.length} data files in the specified path
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {discoveredFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded border border-blue-200 dark:border-blue-700">
                  <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-blue-900 dark:text-blue-100 font-mono">{file}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {results && (
        <Card className="border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/30">
          <CardHeader className="border-b border-green-200 dark:border-green-700 bg-green-100 dark:bg-green-900/50">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-300" />
              <div>
                <CardTitle className="text-green-900 dark:text-green-100">Discovery Complete</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Data sources analyzed and profiled successfully
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-green-600 dark:bg-green-700 text-white">DISCOVERED</Badge>
            </div>
          </CardHeader>
           <CardContent className="p-6">
             <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-200 dark:border-green-700">
               <MarkdownRenderer content={results} />
             </div>
           </CardContent>
        </Card>
      )}

      {/* Discovery Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Database className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Multi-Format</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">CSV, Excel, JSON, Parquet support</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Auto Profiling</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Statistical analysis & quality metrics</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Business Context</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Contextual analysis & insights</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Instant Results</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Real-time discovery & profiling</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
