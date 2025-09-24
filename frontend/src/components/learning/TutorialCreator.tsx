'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BookOpen, 
  Brain, 
  Clock, 
  Target,
  Sparkles,
  Settings,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface TutorialConfig {
  topic: string;
  learning_style: 'hands_on' | 'visual' | 'reading' | 'mixed';
  duration_minutes: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  include_exercises: boolean;
}

interface SectionsPreviewItem {
  title: string;
  type: 'introduction' | 'content' | 'conclusion';
  duration: number;
}

interface PreviewData {
  tutorial_id: string;
  topic: string;
  estimated_completion_time: number;
  tutorial_structure: {
    total_sections: number;
    content_sections: number;
    practice_ratio: number;
  };
  learning_objectives: string[];
  sections_preview: SectionsPreviewItem[];
}

interface AiInsights {
  complexity_analysis: {
    estimated_difficulty: TutorialConfig['difficulty_level'];
    recommended_duration: number;
    key_concepts: string[];
  };
  learning_recommendations: {
    optimal_learning_style: TutorialConfig['learning_style'];
    suggested_exercises: string[];
    prerequisite_knowledge: string[];
  };
  content_suggestions: {
    introduction_focus: string;
    key_sections: string[];
    conclusion_emphasis: string;
  };
}

interface CreatedTutorial extends PreviewData {
  config: TutorialConfig;
  ai_insights: AiInsights | null;
  created_at: string;
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

interface TutorialCreatorProps {
  onTutorialCreate?: (tutorial: CreatedTutorial) => void;
  onCancel?: () => void;
}

export default function TutorialCreator({ onTutorialCreate, onCancel }: TutorialCreatorProps) {
  const [config, setConfig] = useState<TutorialConfig>({
    topic: '',
    learning_style: 'hands_on',
    duration_minutes: 30,
    difficulty_level: 'beginner',
    include_exercises: true
  });

  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [aiInsights, setAiInsights] = useState<AiInsights | null>(null);

  const handleConfigChange = <K extends keyof TutorialConfig>(key: K, value: TutorialConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const generateAiInsights = async () => {
    if (!config.topic.trim()) return;

    try {
      // Simulate AI analysis of the topic
      const insights: AiInsights = {
        complexity_analysis: {
          estimated_difficulty: config.difficulty_level,
          recommended_duration: config.duration_minutes,
          key_concepts: [
            `Core principles of ${config.topic}`,
            `Practical applications`,
            `Common challenges and solutions`
          ]
        },
        learning_recommendations: {
          optimal_learning_style: config.learning_style,
          suggested_exercises: config.include_exercises ? [
            'Interactive coding examples',
            'Real-world scenarios',
            'Knowledge check quizzes'
          ] : [],
          prerequisite_knowledge: [
            'Basic understanding of the subject area',
            'Familiarity with related concepts'
          ]
        },
        content_suggestions: {
          introduction_focus: `Start with why ${config.topic} matters`,
          key_sections: [
            'Fundamentals and core concepts',
            'Step-by-step implementation',
            'Best practices and common pitfalls',
            'Advanced techniques and optimization'
          ],
          conclusion_emphasis: 'Next steps and further learning resources'
        }
      };

      setAiInsights(insights);
    } catch (error) {
      console.error('Error generating AI insights:', error);
    }
  };

  const generatePreview = async () => {
    setIsCreating(true);
    try {
      // Generate AI insights first
      await generateAiInsights();

      const mockPreview: PreviewData = {
        tutorial_id: 'preview_' + Date.now(),
        topic: config.topic,
        estimated_completion_time: config.duration_minutes + Math.round(config.duration_minutes * 0.2),
        tutorial_structure: {
          total_sections: Math.ceil(config.duration_minutes / 15),
          content_sections: Math.ceil(config.duration_minutes / 20),
          practice_ratio: config.include_exercises ? 0.4 : 0.1
        },
        learning_objectives: [
          `Understand the fundamentals of ${config.topic}`,
          `Apply ${config.topic} concepts in practical scenarios`,
          `Demonstrate mastery through hands-on exercises`
        ],
        sections_preview: [
          { title: 'Introduction', type: 'introduction', duration: 5 },
          { title: 'Core Concepts', type: 'content', duration: Math.ceil(config.duration_minutes * 0.4) },
          { title: 'Practical Application', type: 'content', duration: Math.ceil(config.duration_minutes * 0.4) },
          { title: 'Summary and Next Steps', type: 'conclusion', duration: 5 }
        ]
      };

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPreviewData(mockPreview);
      setStep(2);
    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const createTutorial = async () => {
    setIsCreating(true);
    try {
      if (!previewData) {
        console.error('No preview data to create tutorial');
        return;
      }
      const tutorial: CreatedTutorial = {
        ...previewData,
        config,
        ai_insights: aiInsights,
        created_at: new Date().toISOString(),
        tutorial_sections: [
          {
            id: 'introduction',
            title: 'Introduction',
            type: 'introduction',
            duration_minutes: 5,
            content: {
              welcome_message: `Welcome to this comprehensive tutorial on ${config.topic}!`,
              learning_objectives: previewData.learning_objectives,
              prerequisites: aiInsights?.learning_recommendations.prerequisite_knowledge || ['Basic understanding of the subject area']
            }
          },
          {
            id: 'section_1',
            title: 'Core Concepts',
            type: 'content',
            duration_minutes: Math.ceil(config.duration_minutes * 0.4),
            content: {
              main_concepts: [
                {
                  concept_id: 'concept_1_1',
                  title: 'Fundamental Principles',
                  content: {
                    quick_overview: `Understanding the basic principles of ${config.topic}`,
                    step_by_step_guide: [
                      'Introduction to key terminology',
                      'Core concepts explanation',
                      'Real-world examples',
                      'Common applications'
                    ],
                    practice_activity: config.include_exercises ? {
                      type: 'hands_on_exercise',
                      description: 'Apply the concepts in a practical scenario'
                    } : undefined
                  }
                }
              ]
            }
          }
        ]
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      onTutorialCreate?.(tutorial);
    } catch (error) {
      console.error('Error creating tutorial:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const renderAdvancedSettings = () => (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Advanced Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="content-depth">Content Depth</Label>
          <select 
            title="Content Depth"
            id="content-depth"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            defaultValue="balanced"
          >
            <option value="overview">High-level Overview</option>
            <option value="balanced">Balanced Detail</option>
            <option value="comprehensive">Comprehensive Deep-dive</option>
          </select>
        </div>

        <div>
          <Label htmlFor="interaction-level">Interaction Level</Label>
          <select 
            title="Interaction Level"
            id="interaction-level"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            defaultValue="moderate"
          >
            <option value="minimal">Minimal Interaction</option>
            <option value="moderate">Moderate Interaction</option>
            <option value="high">High Interaction</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            title="Include Knowledge Check Quizzes"
            type="checkbox"
            id="include-quizzes"
            defaultChecked={true}
            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800"
          />
          <Label htmlFor="include-quizzes">Include Knowledge Check Quizzes</Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            title="Include Additional Resources"
            id="include-resources"
            defaultChecked={true}
            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800"
          />
          <Label htmlFor="include-resources">Include Additional Resources</Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            title="Enable Adaptive Pacing"
            type="checkbox"
            id="adaptive-pacing"
            defaultChecked={false}
            className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800"
          />
          <Label htmlFor="adaptive-pacing">Enable Adaptive Pacing</Label>
        </div>
      </CardContent>
    </Card>
  );

  const renderAiInsights = () => {
    if (!aiInsights) return null;

    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Complexity Analysis</h4>
            <div className="text-sm space-y-1">
              <p><strong>Estimated Difficulty:</strong> {aiInsights.complexity_analysis.estimated_difficulty}</p>
              <p><strong>Recommended Duration:</strong> {aiInsights.complexity_analysis.recommended_duration} minutes</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Learning Recommendations</h4>
            <div className="text-sm">
              <p><strong>Optimal Style:</strong> {aiInsights.learning_recommendations.optimal_learning_style.replace('_', ' ')}</p>
              {aiInsights.learning_recommendations.suggested_exercises.length > 0 && (
                <div className="mt-2">
                  <p><strong>Suggested Exercises:</strong></p>
                  <ul className="list-disc list-inside ml-2">
                    {aiInsights.learning_recommendations.suggested_exercises.map((exercise: string, index: number) => (
                      <li key={index}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Content Structure Suggestions</h4>
            <div className="text-sm">
              <p><strong>Introduction Focus:</strong> {aiInsights.content_suggestions.introduction_focus}</p>
              <div className="mt-2">
                <p><strong>Key Sections:</strong></p>
                <ul className="list-disc list-inside ml-2">
                  {aiInsights.content_suggestions.key_sections.map((section: string, index: number) => (
                    <li key={index}>{section}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderStepOne = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Create New Tutorial</h2>
        <p className="text-gray-600 dark:text-gray-400">Configure your tutorial settings and content preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topic">Tutorial Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., Introduction to React Hooks"
                value={config.topic}
                onChange={(e) => handleConfigChange('topic', e.target.value)}
                onBlur={generateAiInsights}
              />
            </div>

            <div>
              <Label htmlFor="learning-style">Learning Style</Label>
              <select 
                title="Learning Style"
                id="learning-style"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={config.learning_style} 
                onChange={(e) => handleConfigChange('learning_style', e.target.value as unknown as 'hands_on' | 'visual' | 'reading' | 'mixed')}
              >
                <option value="hands_on">Hands-On</option>
                <option value="visual">Visual</option>
                <option value="reading">Reading</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <select
                title="Difficulty Level"
                id="difficulty"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                value={config.difficulty_level} 
                onChange={(e) => handleConfigChange('difficulty_level', e.target.value as unknown as 'beginner' | 'intermediate' | 'advanced')}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                title="Duration (minutes)"
                id="duration"
                type="number"
                min="10"
                max="180"
                value={config.duration_minutes}
                onChange={(e) => handleConfigChange('duration_minutes', parseInt(e.target.value))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                title="Include Practice Exercises"
                id="exercises"
                type="checkbox"
                checked={config.include_exercises}
                onChange={(e) => handleConfigChange('include_exercises', e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-gray-800"
              />
              <Label htmlFor="exercises">Include Practice Exercises</Label>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="w-full"
            >
              <Settings className="w-4 h-4 mr-2" />
              {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
            </Button>
          </CardContent>
        </Card>

        {aiInsights && (
          <div>
            {renderAiInsights()}
          </div>
        )}
      </div>

      {showAdvancedSettings && renderAdvancedSettings()}

      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={generatePreview}
          disabled={!config.topic.trim() || isCreating}
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating Preview...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Preview
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">Tutorial Preview</h2>
        <p className="text-gray-600 dark:text-gray-400">Review the generated tutorial structure before creating</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {previewData && (
        <Card>
          <CardHeader>
            <CardTitle>{previewData.topic}</CardTitle>
            <CardDescription>
              {config.learning_style.replace('_', ' ')} • {config.difficulty_level} • {previewData.estimated_completion_time} minutes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Learning Objectives</h4>
              <ul className="space-y-1">
                {previewData.learning_objectives.map((objective: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Target className="w-3 h-3 mt-1 text-blue-500 dark:text-blue-400 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
        )}

        {previewData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Tutorial Structure
            </CardTitle>
            <CardDescription>
              {previewData.tutorial_structure.total_sections} sections • {Math.round(previewData.tutorial_structure.practice_ratio * 100)}% practice
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {previewData.sections_preview.map((section: { title: string; type: string; duration: number; }, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-gray-100">{section.title}</h5>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{section.type}</p>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{section.duration}min</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        )}
      </div>

      {aiInsights && (
        <div className="grid grid-cols-1 gap-6">
          {renderAiInsights()}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back to Configuration
        </Button>
        <Button 
          onClick={createTutorial}
          disabled={isCreating}
        >
          {isCreating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating Tutorial...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Create Tutorial
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 min-h-screen">
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
    </div>
  );
} 