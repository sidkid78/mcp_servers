'use client';

import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  CheckCircle2, 
  Clock, 
  BarChart3,
  Users,
  Zap,
  FileText,
  TrendingUp,
  Settings,
  Activity,
  Award
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import QuizViewer from '../learning/QuizViewer';

interface Quiz {
  quiz_id: string;
  topic: string;
  difficulty_level: string;
  questions: Array<{
    question_id: string;
    question: string;
    type: 'multiple_choice' | 'true_false';
    options?: string[];
    correct_answer: string;
    explanation: string;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  total_points: number;
  time_limit_minutes: number;
  passing_score: number;
}

interface KnowledgeAssessmentProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function KnowledgeAssessment({ onExecutePrompt }: KnowledgeAssessmentProps) {
  const [topic, setTopic] = useState('');
  const [assessmentType, setAssessmentType] = useState('comprehensive');
  const [learnerLevel, setLearnerLevel] = useState('unknown');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [generatedQuiz, setGeneratedQuiz] = useState<Quiz | null>(null);
  const [viewMode, setViewMode] = useState<'assess' | 'quiz'>('assess');
  const [showExportOptions, setShowExportOptions] = useState(false);

  const assessmentTypes = [
    { value: 'quick', label: 'Quick Assessment (5-10 min)', icon: Zap },
    { value: 'standard', label: 'Standard Assessment (15-20 min)', icon: Target },
    { value: 'comprehensive', label: 'Comprehensive Assessment (30+ min)', icon: Brain },
    { value: 'diagnostic', label: 'Diagnostic Assessment (Variable)', icon: BarChart3 }
  ];

  const learnerLevels = [
    { value: 'unknown', label: 'Unknown (Adaptive Start)' },
    { value: 'beginner', label: 'Beginner Level' },
    { value: 'intermediate', label: 'Intermediate Level' },
    { value: 'advanced', label: 'Advanced Level' }
  ];

  const topicSuggestions = [
    'JavaScript Fundamentals',
    'Python Data Analysis',
    'React Development',
    'Machine Learning Basics',
    'SQL Database Design',
    'Project Management',
    'Digital Marketing',
    'UX/UI Principles'
  ];

  const generateQuizQuestions = (topic: string, assessmentType: string, learnerLevel: string) => {
    const questionCount = assessmentType === 'quick' ? 5 : assessmentType === 'comprehensive' ? 10 : 8;
    const questions = [];
    
    for (let i = 1; i <= questionCount; i++) {
      questions.push({
        question_id: `q_${i}`,
        question: `What is the most important aspect of ${topic} for ${learnerLevel} level learners?`,
        type: 'multiple_choice' as const,
        options: [
          `Understanding fundamental concepts of ${topic}`,
          'Memorizing syntax and commands',
          'Reading documentation extensively',
          'Watching tutorial videos only'
        ],
        correct_answer: `Understanding fundamental concepts of ${topic}`,
        explanation: `For ${learnerLevel} level learners, understanding the fundamental concepts of ${topic} is crucial for building a solid foundation and practical application skills.`,
        points: assessmentType === 'quick' ? 10 : 10,
        difficulty: learnerLevel === 'beginner' ? 'easy' as const : learnerLevel === 'advanced' ? 'hard' as const : 'medium' as const
      });
    }
    
    return questions;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        topic: topic.trim(),
        assessment_type: assessmentType,
        learner_level: learnerLevel
      };

      const result = await onExecutePrompt('knowledge-assessment', params);
      setResults(result);
      
      // Generate quiz object for QuizViewer
      const quiz = {
        quiz_id: `quiz_${Date.now()}`,
        topic: topic.trim(),
        difficulty_level: learnerLevel === 'unknown' ? 'medium' : learnerLevel,
        questions: generateQuizQuestions(topic, assessmentType, learnerLevel),
        total_points: assessmentType === 'quick' ? 50 : assessmentType === 'comprehensive' ? 100 : 75,
        time_limit_minutes: assessmentType === 'quick' ? 10 : assessmentType === 'comprehensive' ? 30 : 20,
        passing_score: 70
      };
      
      setGeneratedQuiz(quiz);
    } catch (error) {
      console.error('Knowledge assessment failed:', error);
      setResults('Error: Failed to create assessment. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportAssessment = (format: 'pdf' | 'docx' | 'txt' | 'json') => {
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `knowledge-assessment-${topic.replace(/\s+/g, '-').toLowerCase()}-${timestamp}`;
    
    let content: string;
    let mimeType: string;
    let fileExtension: string;

    switch (format) {
      case 'txt':
        content = results.replace(/[#*`]/g, '').replace(/\n\n+/g, '\n\n');
        mimeType = 'text/plain';
        fileExtension = 'txt';
        break;
      case 'json':
        const assessmentData = {
          topic,
          assessmentType,
          learnerLevel,
          generatedAt: new Date().toISOString(),
          content: results
        };
        content = JSON.stringify(assessmentData, null, 2);
        mimeType = 'application/json';
        fileExtension = 'json';
        break;
      case 'docx':
        // For DOCX, we'll create a simple HTML structure that can be opened in Word
        content = `
          <html>
            <head>
              <title>Knowledge Assessment: ${topic}</title>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
                h1, h2, h3 { color: #333; }
                .header { border-bottom: 2px solid #333; padding-bottom: 10px; margin-bottom: 20px; }
                .metadata { background: #f5f5f5; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Knowledge Assessment</h1>
                <p><strong>Topic:</strong> ${topic}</p>
                <p><strong>Assessment Type:</strong> ${assessmentType}</p>
                <p><strong>Learner Level:</strong> ${learnerLevel}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="content">
                ${results.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
              </div>
            </body>
          </html>
        `;
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        fileExtension = 'docx';
        break;
      case 'pdf':
      default:
        // For PDF, we'll create HTML that can be printed to PDF
        content = `
          <html>
            <head>
              <title>Knowledge Assessment: ${topic}</title>
              <style>
                @media print {
                  body { margin: 0; }
                  .no-print { display: none; }
                }
                body { 
                  font-family: Arial, sans-serif; 
                  line-height: 1.6; 
                  margin: 20px; 
                  color: #333;
                }
                h1, h2, h3 { color: #2563eb; page-break-after: avoid; }
                .header { 
                  border-bottom: 2px solid #2563eb; 
                  padding-bottom: 15px; 
                  margin-bottom: 25px; 
                }
                .metadata { 
                  background: #f8fafc; 
                  padding: 15px; 
                  margin-bottom: 25px; 
                  border-radius: 8px; 
                  border-left: 4px solid #2563eb;
                }
                .content { line-height: 1.8; }
                .question { margin: 20px 0; page-break-inside: avoid; }
                strong { color: #1e40af; }
              </style>
            </head>
            <body>
              <div class="header">
                <h1>Knowledge Assessment</h1>
              </div>
              <div class="metadata">
                <p><strong>Topic:</strong> ${topic}</p>
                <p><strong>Assessment Type:</strong> ${assessmentType.charAt(0).toUpperCase() + assessmentType.slice(1)}</p>
                <p><strong>Learner Level:</strong> ${learnerLevel.charAt(0).toUpperCase() + learnerLevel.slice(1)}</p>
                <p><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              <div class="content">
                ${results.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>')}
              </div>
            </body>
          </html>
        `;
        mimeType = 'text/html';
        fileExtension = 'html';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setShowExportOptions(false);
  };

  if (viewMode === 'quiz' && generatedQuiz) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setViewMode('assess')}>
            ← Back to Assessment
          </Button>
          <Badge className="bg-green-600 text-white">INTERACTIVE QUIZ</Badge>
        </div>
        <QuizViewer 
          quiz={generatedQuiz}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Assessment Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            <div>
              <CardTitle className="text-slate-900 dark:text-slate-100">Assessment Configuration</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Create intelligent assessments to evaluate knowledge and identify gaps</CardDescription>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20">ADAPTIVE</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white dark:bg-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Selection */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Target className="h-4 w-4" />
                Assessment Topic
              </Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., JavaScript Fundamentals, Python Data Analysis, React Development"
                className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-blue-500 dark:focus:border-blue-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {topicSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTopic(suggestion)}
                    className="text-xs bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assessment Type */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Clock className="h-4 w-4" />
                  Assessment Type
                </Label>
                <Select value={assessmentType} onValueChange={setAssessmentType}>
                  <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select assessment type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                    {assessmentTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Learner Level */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Users className="h-4 w-4" />
                  Learner Level
                </Label>
                <Select value={learnerLevel} onValueChange={setLearnerLevel}>
                  <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select learner level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600">
                    {learnerLevels.map((level) => (
                      <SelectItem 
                        key={level.value} 
                        value={level.value}
                        className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Generate Button */}
            <Button 
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white"
              disabled={isLoading || !topic.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Creating Assessment...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Knowledge Assessment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20">
          <CardHeader className="border-b border-green-200 dark:border-green-700 bg-green-100 dark:bg-green-900/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
              <div>
                <CardTitle className="text-green-900 dark:text-green-100">Assessment Created</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Intelligent assessment ready for knowledge evaluation
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowExportOptions(!showExportOptions)}
                    className="border-green-300 dark:border-green-600 text-green-700 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-800 bg-white dark:bg-green-900/20"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  
                  {showExportOptions && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg z-10">
                      <div className="p-2 space-y-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportAssessment('pdf')}
                          className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export as PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportAssessment('docx')}
                          className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export as Word
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportAssessment('txt')}
                          className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export as Text
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleExportAssessment('json')}
                          className="w-full justify-start text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600"
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Export as JSON
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <Badge className="bg-green-600 dark:bg-green-700 text-white">READY</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-green-200 dark:border-green-600">
              <MarkdownRenderer content={results} />
            </div>
            {generatedQuiz && (
              <div className="mt-4 flex justify-center gap-3">
                <Button 
                  onClick={() => setViewMode('quiz')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Take Interactive Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Assessment Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Adaptive Testing</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Difficulty adjusts to responses</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Gap Analysis</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Identifies knowledge gaps</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Progress Tracking</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Monitors learning progress</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Instant Feedback</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Real-time performance insights</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
