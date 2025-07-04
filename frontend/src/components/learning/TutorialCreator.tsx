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

interface TutorialCreatorProps {
  onTutorialCreate?: (tutorial: any) => void;
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
  const [previewData, setPreviewData] = useState<any>(null);

  const handleConfigChange = (key: keyof TutorialConfig, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const generatePreview = async () => {
    setIsCreating(true);
    try {
      const mockPreview = {
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
      const tutorial = {
        ...previewData,
        config,
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
              prerequisites: ['Basic understanding of the subject area']
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
      
      if (onTutorialCreate) {
        onTutorialCreate(tutorial);
      }
    } catch (error) {
      console.error('Error creating tutorial:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const renderStepOne = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Create New Tutorial</h2>
        <p className="text-gray-600">Configure your tutorial settings and content preferences</p>
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
              />
            </div>

            <div>
              <Label htmlFor="learning-style">Learning Style</Label>
              <select 
                id="learning-style"
                className="w-full p-2 border rounded-md"
                value={config.learning_style} 
                onChange={(e) => handleConfigChange('learning_style', e.target.value as any)}
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
                id="difficulty"
                className="w-full p-2 border rounded-md"
                value={config.difficulty_level} 
                onChange={(e) => handleConfigChange('difficulty_level', e.target.value as any)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
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
                type="checkbox"
                id="exercises"
                checked={config.include_exercises}
                onChange={(e) => handleConfigChange('include_exercises', e.target.checked)}
              />
              <Label htmlFor="exercises">Include Practice Exercises</Label>
            </div>
          </CardContent>
        </Card>
      </div>

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
        <h2 className="text-2xl font-bold mb-2">Tutorial Preview</h2>
        <p className="text-gray-600">Review the generated tutorial structure before creating</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                    <Target className="w-3 h-3 mt-1 text-blue-500 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

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
              {previewData.sections_preview.map((section: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h5 className="font-medium">{section.title}</h5>
                    <p className="text-sm text-gray-500 capitalize">{section.type}</p>
                  </div>
                  <span className="text-sm text-gray-600">{section.duration}min</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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
    <div className="max-w-6xl mx-auto p-6">
      {step === 1 && renderStepOne()}
      {step === 2 && renderStepTwo()}
    </div>
  );
} 