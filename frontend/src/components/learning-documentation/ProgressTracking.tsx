'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  User, 
  Calendar, 
  CheckCircle2,
  Settings,
  Activity,
  Target,
  Clock,
  Award,
  Zap,
  Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ProgressTrackingProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function ProgressTracking({ onExecutePrompt }: ProgressTrackingProps) {
  const [learnerId, setLearnerId] = useState('');
  const [timeframe, setTimeframe] = useState('last_month');
  const [includeRecommendations, setIncludeRecommendations] = useState(true);
  const [includeTimeAnalysis, setIncludeTimeAnalysis] = useState(false);
  const [includeEngagementMetrics, setIncludeEngagementMetrics] = useState(false);
  const [includeCollaborationData, setIncludeCollaborationData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  
  // Mock dashboard stats
  const dashboardStats = {
    totalTutorials: 12,
    completedTutorials: 8,
    totalQuizzes: 24,
    averageScore: 87,
    timeSpent: 145, // hours
    currentStreak: 7,
    skillsLearned: 15,
    certificatesEarned: 3
  };

  const timeframes = [
    { value: 'last_week', label: 'Last Week' },
    { value: 'last_month', label: 'Last Month' },
    { value: 'last_quarter', label: 'Last Quarter' },
    { value: 'last_6_months', label: 'Last 6 Months' },
    { value: 'last_year', label: 'Last Year' },
    { value: 'all_time', label: 'All Time' }
  ];

  const sampleLearners = [
    'student_001',
    'student_002', 
    'student_003',
    'learner_jane_doe',
    'learner_john_smith'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerId.trim()) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        learner_id: learnerId.trim(),
        timeframe: timeframe,
        include_recommendations: includeRecommendations,
        include_time_analysis: includeTimeAnalysis,
        include_engagement_metrics: includeEngagementMetrics,
        include_collaboration_data: includeCollaborationData
      };

      const result = await onExecutePrompt('progress-tracking', params);
      setResults(result);
    } catch (error) {
      console.error('Progress tracking failed:', error);
      setResults('Error: Failed to track progress. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const completionRate = Math.round((dashboardStats.completedTutorials / dashboardStats.totalTutorials) * 100);

  return (
    <div className="space-y-6">
      {/* Learning Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-100">Completion Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.completedTutorials} of {dashboardStats.totalTutorials} tutorials
            </p>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-100">Average Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{dashboardStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              Across {dashboardStats.totalQuizzes} assessments
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-100">Time Spent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{dashboardStats.timeSpent}h</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.currentStreak} day learning streak
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-900 dark:text-slate-100">Skills Learned</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">{dashboardStats.skillsLearned}</div>
            <p className="text-xs text-muted-foreground">
              {dashboardStats.certificatesEarned} certificates earned
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Progress Tracking Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            <div>
              <CardTitle className="text-slate-900 dark:text-slate-100">Progress Analytics Configuration</CardTitle>
              <CardDescription className="dark:text-slate-400">Monitor learning effectiveness and progress patterns</CardDescription>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-600">ANALYTICS</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Learner ID */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <User className="h-4 w-4" />
                Learner ID
              </Label>
              <Input
                value={learnerId}
                onChange={(e) => setLearnerId(e.target.value)}
                placeholder="e.g., student_001, learner_jane_doe"
                className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {sampleLearners.map((sample) => (
                  <Button
                    key={sample}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setLearnerId(sample)}
                    className="text-xs bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                  >
                    {sample}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timeframe */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Calendar className="h-4 w-4" />
                  Analysis Timeframe
                </Label>
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    {timeframes.map((tf) => (
                      <SelectItem 
                        key={tf.value} 
                        value={tf.value}
                        className="dark:text-slate-100 dark:hover:bg-slate-600"
                      >
                        {tf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Analysis Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="recommendations"
                      checked={includeRecommendations}
                      onCheckedChange={(checked) => setIncludeRecommendations(checked as boolean)}
                      className="dark:border-slate-600"
                    />
                    <Label 
                      htmlFor="recommendations" 
                      className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      Include learning recommendations
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="time-analysis"
                      checked={includeTimeAnalysis}
                      onCheckedChange={(checked) => setIncludeTimeAnalysis(checked as boolean)}
                      className="dark:border-slate-600"
                    />
                    <Label 
                      htmlFor="time-analysis" 
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <Clock className="h-3 w-3" />
                      Include time-based analysis
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="engagement-metrics"
                      checked={includeEngagementMetrics}
                      onCheckedChange={(checked) => setIncludeEngagementMetrics(checked as boolean)}
                      className="dark:border-slate-600"
                    />
                    <Label 
                      htmlFor="engagement-metrics" 
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <Zap className="h-3 w-3" />
                      Include engagement metrics
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="collaboration-data"
                      checked={includeCollaborationData}
                      onCheckedChange={(checked) => setIncludeCollaborationData(checked as boolean)}
                      className="dark:border-slate-600"
                    />
                    <Label 
                      htmlFor="collaboration-data" 
                      className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <Users className="h-3 w-3" />
                      Include collaboration data
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600 text-white"
              disabled={isLoading || !learnerId.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing Progress...
                </>
              ) : (
                <>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Progress Report
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-orange-200 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20">
          <CardHeader className="border-b border-orange-200 dark:border-orange-700 bg-orange-100 dark:bg-orange-900/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-orange-700 dark:text-orange-400" />
              <div>
                <CardTitle className="text-orange-900 dark:text-orange-100">Progress Report Generated</CardTitle>
                <CardDescription className="text-orange-700 dark:text-orange-300">
                  Comprehensive learning analytics and insights
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-orange-600 dark:bg-orange-700 text-white">ANALYZED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-orange-200 dark:border-orange-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analytics Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Real-time Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Live progress monitoring</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Trend Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Learning pattern insights</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Goal Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Milestone achievement</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Performance Metrics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Detailed analytics</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Time Analytics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Study time patterns and optimization</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Engagement Insights</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Activity levels and participation</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Collaboration Metrics</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Team learning and peer interactions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
