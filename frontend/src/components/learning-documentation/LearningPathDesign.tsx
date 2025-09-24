'use client';

import React, { useState } from 'react';
import { 
  Target, 
  User, 
  Clock, 
  BookOpen, 
  Brain,
  TrendingUp,
  CheckCircle2,
  Settings,
  Zap,
  Users,
  Calendar,
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface LearningPathDesignProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function LearningPathDesign({ onExecutePrompt }: LearningPathDesignProps) {
  const [subject, setSubject] = useState('');
  const [learnerBackground, setLearnerBackground] = useState('');
  const [learningGoals, setLearningGoals] = useState('');
  const [timeAvailable, setTimeAvailable] = useState('flexible');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [isQuickMode, setIsQuickMode] = useState(false);

  const timeOptions = [
    { value: 'flexible', label: 'Flexible Schedule' },
    { value: '1 hour per day', label: '1 Hour Daily' },
    { value: '2 hours per day', label: '2 Hours Daily' },
    { value: '5 hours per week', label: '5 Hours Weekly' },
    { value: '10 hours per week', label: '10 Hours Weekly' },
    { value: 'intensive', label: 'Intensive (Full-time)' }
  ];

  const subjectSuggestions = [
    'Python Programming',
    'Data Science',
    'Web Development',
    'Machine Learning',
    'UI/UX Design',
    'Digital Marketing',
    'Project Management',
    'Business Analytics'
  ];

  const handleQuickGenerate = async (quickSubject: string) => {
    setIsLoading(true);
    setIsQuickMode(true);
    try {
      const params: Record<string, unknown> = {
        subject: quickSubject,
        learner_background: 'Beginner level',
        learning_goals: 'Build foundational knowledge and practical skills',
        time_available: 'flexible',
        quick_mode: true
      };

      const result = await onExecutePrompt('learning-path-design', params);
      setResults(result);
      setSubject(quickSubject);
    } catch (error) {
      console.error('Quick learning path generation failed:', error);
      setResults('Error: Failed to create quick learning path. Please try again.');
    } finally {
      setIsLoading(false);
      setIsQuickMode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        subject: subject.trim(),
        learner_background: learnerBackground.trim(),
        learning_goals: learningGoals.trim(),
        time_available: timeAvailable
      };

      const result = await onExecutePrompt('learning-path-design', params);
      setResults(result);
    } catch (error) {
      console.error('Learning path design failed:', error);
      setResults('Error: Failed to create learning path. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Start Section */}
      <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950">
        <CardHeader className="bg-amber-100 dark:bg-amber-900 border-b border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <div>
              <CardTitle className="text-amber-900 dark:text-amber-100">Quick Start</CardTitle>
              <CardDescription className="text-amber-700 dark:text-amber-300">
                Generate instant learning paths for popular subjects
              </CardDescription>
            </div>
            <Badge className="ml-auto bg-amber-600 dark:bg-amber-700 text-white">INSTANT</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {subjectSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickGenerate(suggestion)}
                disabled={isLoading}
                className="text-xs border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900 bg-white dark:bg-amber-950 flex items-center gap-2"
              >
                <Zap className="h-3 w-3" />
                {suggestion}
              </Button>
            ))}
          </div>
          {isQuickMode && isLoading && (
            <div className="mt-4 text-center text-amber-700 dark:text-amber-300 text-sm">
              <Zap className="h-4 w-4 inline mr-2 animate-pulse" />
              Generating quick learning path...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Path Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            <div>
              <CardTitle className="text-slate-900 dark:text-slate-100">Learning Path Configuration</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Design adaptive curricula tailored to individual learner needs</CardDescription>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-600">ADAPTIVE</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <BookOpen className="h-4 w-4" />
                Subject or Skill Area
              </Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Python Programming, Data Science, Web Development"
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {subjectSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSubject(suggestion)}
                    className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 bg-white dark:bg-slate-900"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Learner Background */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <User className="h-4 w-4" />
                Learner Background & Experience
              </Label>
              <Textarea
                value={learnerBackground}
                onChange={(e) => setLearnerBackground(e.target.value)}
                placeholder="Describe current knowledge level, relevant experience, learning preferences, and any specific needs..."
                rows={4}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
            </div>

            {/* Learning Goals */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <TrendingUp className="h-4 w-4" />
                Learning Goals & Objectives
              </Label>
              <Textarea
                value={learningGoals}
                onChange={(e) => setLearningGoals(e.target.value)}
                placeholder="What do you want to achieve? Specific skills, projects, career goals, or certifications..."
                rows={3}
                className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              />
            </div>

            {/* Time Availability */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Clock className="h-4 w-4" />
                Time Availability
              </Label>
              <Select value={timeAvailable} onValueChange={setTimeAvailable}>
                <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                  <SelectValue placeholder="Select time commitment" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600">
                  {timeOptions.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white"
              disabled={isLoading || !subject.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Designing Learning Path...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Create Adaptive Learning Path
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
          <CardHeader className="border-b border-blue-200 dark:border-blue-700 bg-blue-100 dark:bg-blue-900/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-blue-700 dark:text-blue-400" />
              <div>
                <CardTitle className="text-blue-900 dark:text-blue-100">Learning Path Created</CardTitle>
                <CardDescription className="text-blue-700 dark:text-blue-300">
                  Adaptive curriculum designed for your specific needs and goals
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-blue-600 dark:bg-blue-700 text-white">PERSONALIZED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-blue-200 dark:border-blue-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Path Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Brain className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">AI-Powered Design</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Intelligent curriculum adaptation</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Personalized</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Tailored to individual needs</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Flexible Schedule</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Adapts to your time constraints</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700">
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Goal-Oriented</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Aligned with your objectives</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
