'use client';

import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  Users, 
  Settings, 
  CheckCircle2,
  Zap,
  Clock,
  Target,
  Lightbulb,
  Code,
  Palette,
  Brain,
  PenTool
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import TutorialViewer from '../learning/TutorialViewer';

interface Tutorial {
  tutorial_id: string;
  topic: string;
  learning_style: string;
  duration_minutes: number;
  estimated_completion_time: number;
  tutorial_structure: {
    total_sections: number;
    progression_type: string;
    practice_ratio: number;
  };
  tutorial_sections: Array<{
    id: string;
    title: string;
    type: 'introduction' | 'content' | 'conclusion';
    duration_minutes: number;
    content: {
      welcome_message?: string;
      learning_objectives?: string[];
      prerequisites?: string[];
      main_concepts?: Array<{
        concept_id: string;
        title: string;
        content: {
          quick_overview: string;
          step_by_step_guide: string[];
          practice_activity?: {
            type: string;
            description: string;
          };
        };
      }>;
    };
  }>;
}

interface InteractiveTutorialProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function InteractiveTutorial({ onExecutePrompt }: InteractiveTutorialProps) {
  const [skillTopic, setSkillTopic] = useState('');
  const [proficiencyLevel, setProficiencyLevel] = useState('beginner');
  const [handsOnFocus, setHandsOnFocus] = useState('practical');
  const [visualStyle, setVisualStyle] = useState('modern');
  const [duration, setDuration] = useState([30]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [generatedTutorial, setGeneratedTutorial] = useState<Tutorial | null>(null);
  const [viewMode, setViewMode] = useState<'create' | 'view'>('create');

  const proficiencyLevels = [
    { value: 'beginner', label: 'Beginner', icon: Target },
    { value: 'intermediate', label: 'Intermediate', icon: BookOpen },
    { value: 'advanced', label: 'Advanced', icon: Brain }
  ];

  const focusTypes = [
    { value: 'practical', label: 'Practical/Hands-on', icon: PenTool },
    { value: 'theoretical', label: 'Theoretical', icon: BookOpen },
    { value: 'balanced', label: 'Balanced Approach', icon: Target },
    { value: 'project_based', label: 'Project-based', icon: Code }
  ];

  const visualStyles = [
    { value: 'modern', label: 'Modern & Clean', description: 'Minimalist design with clear typography' },
    { value: 'colorful', label: 'Colorful & Vibrant', description: 'Bright colors and engaging visuals' },
    { value: 'professional', label: 'Professional', description: 'Corporate-friendly styling' },
    { value: 'playful', label: 'Playful & Fun', description: 'Gamified elements and animations' },
    { value: 'dark', label: 'Dark Theme', description: 'Dark mode optimized design' },
    { value: 'accessible', label: 'High Contrast', description: 'Accessibility-focused design' }
  ];

  const skillSuggestions = [
    'JavaScript ES6 Features',
    'React Hooks Tutorial',
    'Python Data Visualization',
    'CSS Grid Layout',
    'Node.js API Development',
    'Machine Learning Basics',
    'Git Version Control',
    'SQL Query Optimization'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillTopic.trim()) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        skill_topic: skillTopic.trim(),
        proficiency_level: proficiencyLevel,
        hands_on_focus: handsOnFocus,
        visual_style: visualStyle
      };

      const result = await onExecutePrompt('interactive-tutorial', params);
      setResults(result);
      
      // Generate tutorial object for TutorialViewer
      const tutorial = {
        tutorial_id: `tutorial_${Date.now()}`,
        topic: skillTopic.trim(),
        learning_style: handsOnFocus,
        duration_minutes: duration[0],
        estimated_completion_time: duration[0] + Math.round(duration[0] * 0.2),
        tutorial_structure: {
          total_sections: Math.ceil(duration[0] / 15),
          progression_type: 'adaptive',
          practice_ratio: handsOnFocus === 'practical' ? 0.6 : 0.3
        },
        tutorial_sections: [
          {
            id: 'introduction',
            title: 'Introduction',
            type: 'introduction' as const,
            duration_minutes: 5,
            content: {
              welcome_message: `Welcome to this interactive tutorial on ${skillTopic}!`,
              learning_objectives: [
                `Understand the fundamentals of ${skillTopic}`,
                `Apply ${skillTopic} concepts in practical scenarios`,
                `Master ${skillTopic} through hands-on practice`
              ],
              prerequisites: ['Basic understanding of the subject area']
            }
          },
          {
            id: 'main_content',
            title: 'Core Concepts',
            type: 'content' as const,
            duration_minutes: duration[0] - 10,
            content: {
              main_concepts: [
                {
                  concept_id: 'concept_1',
                  title: `${skillTopic} Fundamentals`,
                  content: {
                    quick_overview: `Learn the essential concepts and principles of ${skillTopic}`,
                    step_by_step_guide: [
                      'Introduction to key terminology and concepts',
                      'Understanding core principles',
                      'Practical examples and use cases',
                      'Best practices and common patterns',
                      'Hands-on exercises and activities'
                    ],
                    practice_activity: {
                      type: 'interactive_exercise',
                      description: `Apply ${skillTopic} concepts in a practical, hands-on exercise`
                    }
                  }
                }
              ]
            }
          },
          {
            id: 'conclusion',
            title: 'Summary and Next Steps',
            type: 'conclusion' as const,
            duration_minutes: 5,
            content: {
              welcome_message: `Congratulations! You've completed the ${skillTopic} tutorial.`
            }
          }
        ]
      };
      
      setGeneratedTutorial(tutorial);
    } catch (error) {
      console.error('Interactive tutorial creation failed:', error);
      setResults('Error: Failed to create interactive tutorial. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (viewMode === 'view' && generatedTutorial) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setViewMode('create')} className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
            ← Back to Tutorial Creator
          </Button>
          <Badge className="bg-indigo-600 text-white dark:bg-indigo-500">INTERACTIVE TUTORIAL</Badge>
        </div>
        <TutorialViewer 
          tutorial={generatedTutorial}
          onComplete={() => setViewMode('create')}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900 min-h-screen">
      {/* Interactive Tutorial Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm dark:shadow-slate-900/20">
        <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <Play className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            <div>
              <CardTitle className="text-slate-900 dark:text-slate-100">Interactive Tutorial Builder</CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400">Generate hands-on learning experiences with interactive elements</CardDescription>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20">INTERACTIVE</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6 bg-white dark:bg-slate-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Skill Topic */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Lightbulb className="h-4 w-4" />
                Skill Topic
              </Label>
              <Input
                value={skillTopic}
                onChange={(e) => setSkillTopic(e.target.value)}
                placeholder="e.g., JavaScript ES6 Features, React Hooks, Python Data Analysis"
                className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-indigo-500 dark:focus:border-indigo-400"
                required
              />
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.map((suggestion) => (
                  <Button
                    key={suggestion}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSkillTopic(suggestion)}
                    className="text-xs border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 bg-white dark:bg-slate-800"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Proficiency Level */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Users className="h-4 w-4" />
                  Proficiency Level
                </Label>
                <Select value={proficiencyLevel} onValueChange={setProficiencyLevel}>
                  <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select proficiency level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    {proficiencyLevels.map((level) => {
                      const IconComponent = level.icon;
                      return (
                        <SelectItem 
                          key={level.value} 
                          value={level.value}
                          className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 focus:bg-slate-100 dark:focus:bg-slate-600"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {level.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Hands-on Focus */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <PenTool className="h-4 w-4" />
                  Learning Approach
                </Label>
                <Select value={handsOnFocus} onValueChange={setHandsOnFocus}>
                  <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                    <SelectValue placeholder="Select approach" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                    {focusTypes.map((focus) => {
                      const IconComponent = focus.icon;
                      return (
                        <SelectItem 
                          key={focus.value} 
                          value={focus.value}
                          className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 focus:bg-slate-100 dark:focus:bg-slate-600"
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

            {/* Visual Style */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Palette className="h-4 w-4" />
                Visual Style & Theme
              </Label>
              <Select value={visualStyle} onValueChange={setVisualStyle}>
                <SelectTrigger className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100">
                  <SelectValue placeholder="Select visual style" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
                  {visualStyles.map((style) => (
                    <SelectItem 
                      key={style.value} 
                      value={style.value}
                      className="text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-600 focus:bg-slate-100 dark:focus:bg-slate-600"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Palette className="h-4 w-4" />
                          {style.label}
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {style.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Choose a visual theme that matches your learning environment and preferences
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Clock className="h-4 w-4" />
                Estimated Duration: {duration[0]} minutes
              </Label>
              <div className="px-3">
                <Slider
                  value={duration}
                  onValueChange={setDuration}
                  max={120}
                  min={15}
                  step={15}
                  className="w-full [&_[role=slider]]:bg-indigo-600 dark:[&_[role=slider]]:bg-indigo-500 [&_[role=slider]]:border-indigo-600 dark:[&_[role=slider]]:border-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>15 min</span>
                  <span>60 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <Button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white border-0 shadow-sm"
              disabled={isLoading || !skillTopic.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Building Tutorial...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Create Interactive Tutorial
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950/50 shadow-sm dark:shadow-slate-900/20">
          <CardHeader className="border-b border-indigo-200 dark:border-indigo-700 bg-indigo-100 dark:bg-indigo-950/70">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />
              <div>
                <CardTitle className="text-indigo-900 dark:text-indigo-100">Interactive Tutorial Created</CardTitle>
                <CardDescription className="text-indigo-700 dark:text-indigo-300">
                  Hands-on learning experience ready for implementation
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-indigo-600 dark:bg-indigo-500 text-white">INTERACTIVE</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-200 dark:border-indigo-600 shadow-sm">
              <MarkdownRenderer content={results} />
            </div>
            {generatedTutorial && (
              <div className="mt-4 flex justify-center">
                <Button 
                  onClick={() => setViewMode('view')}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white shadow-sm"
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Interactive Tutorial
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tutorial Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm dark:shadow-slate-900/20">
          <CardContent className="p-4 text-center">
            <Play className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Interactive Elements</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Engaging hands-on activities</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm dark:shadow-slate-900/20">
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Adaptive Difficulty</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Adjusts to learner progress</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm dark:shadow-slate-900/20">
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Instant Feedback</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Real-time guidance</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm dark:shadow-slate-900/20">
          <CardContent className="p-4 text-center">
            <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Custom Styling</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Personalized visual themes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
