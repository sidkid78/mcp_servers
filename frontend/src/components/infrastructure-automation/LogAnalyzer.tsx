"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Search, 
  AlertTriangle, 
  Info, 
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Eye,
  TrendingUp,
  Activity
} from 'lucide-react';

interface LogAnalyzerProps {
  onExecutePrompt?: (prompt: string, params?: unknown) => Promise<unknown>;
}

export function LogAnalyzer({ onExecutePrompt }: LogAnalyzerProps) {
  const [logSource, setLogSource] = useState("application");
  const [timeRange, setTimeRange] = useState("1h");
  const [logLevel, setLogLevel] = useState("ERROR");
  const [pattern, setPattern] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const logSources = [
    { name: "Application Logs", count: "2.3K", status: "active", errors: 12 },
    { name: "System Logs", count: "1.8K", status: "active", errors: 3 },
    { name: "Security Logs", count: "856", status: "active", errors: 0 },
    { name: "Database Logs", count: "1.2K", status: "active", errors: 8 },
    { name: "Web Server Logs", count: "4.1K", status: "active", errors: 15 },
    { name: "Load Balancer", count: "967", status: "active", errors: 2 }
  ];

  const recentLogs = [
    {
      timestamp: "2024-01-15 14:32:15",
      level: "ERROR",
      source: "application",
      message: "Database connection timeout after 30 seconds",
      service: "api-gateway",
      count: 1
    },
    {
      timestamp: "2024-01-15 14:31:42",
      level: "WARN",
      source: "system",
      message: "High memory usage detected: 87% of available RAM",
      service: "web-server-01",
      count: 3
    },
    {
      timestamp: "2024-01-15 14:30:18",
      level: "ERROR",
      source: "application",
      message: "Failed to process payment: Invalid card number",
      service: "payment-service",
      count: 7
    },
    {
      timestamp: "2024-01-15 14:29:33",
      level: "INFO",
      source: "security",
      message: "Successful login from IP 192.168.1.100",
      service: "auth-service",
      count: 1
    },
    {
      timestamp: "2024-01-15 14:28:45",
      level: "ERROR",
      source: "database",
      message: "Slow query detected: SELECT took 5.2 seconds",
      service: "postgres-01",
      count: 2
    }
  ];

  const logPatterns = [
    {
      pattern: "Database.*timeout",
      count: 47,
      trend: "up",
      severity: "high",
      description: "Database connection timeouts"
    },
    {
      pattern: "HTTP 5\\d\\d",
      count: 23,
      trend: "down",
      severity: "medium",
      description: "Server errors (5xx)"
    },
    {
      pattern: "Failed.*authentication",
      count: 12,
      trend: "stable",
      severity: "medium",
      description: "Authentication failures"
    },
    {
      pattern: "Memory.*exceeded",
      count: 8,
      trend: "up",
      severity: "high",
      description: "Memory limit exceeded"
    }
  ];

  const handleAnalyzeLogs = async () => {
    if (!onExecutePrompt) return;
    
    setIsLoading(true);
    try {
      const result = await onExecutePrompt('analyze_logs', {
        log_source: logSource,
        time_range: timeRange,
        log_level: logLevel,
        pattern: pattern
      });
      console.log('Log analysis result:', result);
    } finally {
      setIsLoading(false);
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'warn':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'error':
        return 'bg-red-100 text-red-800';
      case 'warn':
        return 'bg-yellow-100 text-yellow-800';
      case 'info':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-red-600" />;
      case 'down':
        return <TrendingUp className="h-4 w-4 text-green-600 rotate-180" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Log Analysis Controls */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            Log Analysis Configuration
          </CardTitle>
          <CardDescription>Configure log analysis parameters and search patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="log-source">Log Source</Label>
              <Select value={logSource} onValueChange={setLogSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Select log source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="application">Application</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="nginx">Web Server</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time-range">Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">Last 15 minutes</SelectItem>
                  <SelectItem value="1h">Last 1 hour</SelectItem>
                  <SelectItem value="6h">Last 6 hours</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="log-level">Minimum Log Level</Label>
              <Select value={logLevel} onValueChange={setLogLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select log level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEBUG">DEBUG</SelectItem>
                  <SelectItem value="INFO">INFO</SelectItem>
                  <SelectItem value="WARN">WARN</SelectItem>
                  <SelectItem value="ERROR">ERROR</SelectItem>
                  <SelectItem value="FATAL">FATAL</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pattern">Search Pattern (Regex)</Label>
            <Input
              id="pattern"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g., Database.*timeout, HTTP [45]\\d\\d"
            />
          </div>

          <Button 
            onClick={handleAnalyzeLogs}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isLoading}
          >
            <Search className="h-4 w-4 mr-2" />
            Analyze Logs
          </Button>
        </CardContent>
      </Card>

      {/* Log Sources Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {logSources.map((source, index) => (
          <Card key={index} className="bg-white/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">{source.name}</h3>
                <Badge className="bg-green-100 text-green-800">
                  {source.status}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Log Entries</span>
                  <span className="font-medium">{source.count}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Errors</span>
                  <Badge className={source.errors > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {source.errors}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Log Entries */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-green-600" />
            Recent Log Entries
          </CardTitle>
          <CardDescription>Latest log entries matching your criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0">
                  {getLevelIcon(log.level)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getLevelColor(log.level)}>
                      {log.level}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {log.service}
                    </Badge>
                    {log.count > 1 && (
                      <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700">
                        {log.count}x
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {log.message}
                  </p>
                  
                  <p className="text-xs text-gray-500">
                    {log.timestamp} • {log.source}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Log Pattern Analysis */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-600" />
            Pattern Analysis
          </CardTitle>
          <CardDescription>Detected patterns and anomalies in log data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logPatterns.map((patternData, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(patternData.trend)}
                    <Badge className={getSeverityColor(patternData.severity)}>
                      {patternData.severity}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">
                      {patternData.description}
                    </h4>
                    <p className="text-sm text-gray-500 font-mono">
                      {patternData.pattern}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {patternData.count}
                    </p>
                    <p className="text-xs text-gray-500">occurrences</p>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Log Analytics Summary */}
      <Card className="bg-white/60 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Analytics Summary
          </CardTitle>
          <CardDescription>Log analysis metrics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center space-y-2">
              <div className="p-4 bg-blue-50 rounded-lg">
                <FileText className="h-8 w-8 text-blue-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">10.2K</p>
                <p className="text-sm text-gray-600">Total Entries</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-red-50 rounded-lg">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">42</p>
                <p className="text-sm text-gray-600">Error Events</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-600">128</p>
                <p className="text-sm text-gray-600">Warnings</p>
              </div>
            </div>

            <div className="text-center space-y-2">
              <div className="p-4 bg-green-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">94.2%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
          <span className="text-gray-600">Analyzing log data...</span>
        </div>
      )}
    </div>
  );
}
