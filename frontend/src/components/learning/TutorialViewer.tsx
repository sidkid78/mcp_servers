'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Clock, 
  BookOpen,
  Brain,
  Target,
  Lightbulb,
  Code,
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Star
} from 'lucide-react';

interface TutorialSection {
  id: string;
  title: string;
  type: 'introduction' | 'content' | 'conclusion';
  duration_minutes: number;
  completed?: boolean;
  content: {
    main_concepts?: Array<{
      concept_id: string;
      title: string;
      content: {
        quick_overview: string;
        step_by_step_guide: string[];
        practice_activity?: {
          type: string;
          description: string;
          instructions?: string;
          deliverable?: string;
        };
        common_mistakes?: string[];
        success_indicators?: string;
      };
    }>;
    welcome_message?: string;
    learning_objectives?: string[];
    prerequisites?: string[];
  };
}

interface Tutorial {
  tutorial_id: string;
  topic: string;
  learning_style: string;
  duration_minutes: number;
  estimated_completion_time: number;
  tutorial_sections: TutorialSection[];
  tutorial_structure: {
    total_sections: number;
    progression_type: string;
    practice_ratio: number;
  };
}

interface TutorialViewerProps {
  tutorial: Tutorial;
  onComplete?: () => void;
  onSectionComplete?: (sectionId: string) => void;
}

export default function TutorialViewer({ tutorial, onComplete, onSectionComplete }: TutorialViewerProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [currentConceptIndex, setCurrentConceptIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const currentSection = tutorial.tutorial_sections[currentSectionIndex];
  const totalSections = tutorial.tutorial_sections.length;
  const progressPercentage = ((currentSectionIndex + 1) / totalSections) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{tutorial.topic}</h1>
          <p className="text-gray-600">
            {tutorial.learning_style.replace('_', ' ')} • {tutorial.duration_minutes} minutes
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Time Spent</p>
            <p className="font-mono">{formatTime(timeSpent)}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">
              Section {currentSectionIndex + 1} of {totalSections}
            </span>
          </div>
          <Progress value={progressPercentage} className="mb-4" />
          
          <div className="flex justify-center space-x-2">
            {tutorial.tutorial_sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSectionIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  completedSections.has(section.id)
                    ? 'bg-green-500 text-white'
                    : index === currentSectionIndex
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="min-h-[600px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {currentSection.type === 'introduction' && <BookOpen className="w-5 h-5" />}
            {currentSection.type === 'content' && <Brain className="w-5 h-5" />}
            {currentSection.type === 'conclusion' && <Trophy className="w-5 h-5" />}
            {currentSection.title}
          </CardTitle>
          <CardDescription>
            {currentSection.duration_minutes} minutes • {currentSection.type}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{tutorial.topic}</h2>
              <p className="text-gray-600">{currentSection.content.welcome_message || 'Welcome to this tutorial section!'}</p>
            </div>

            {currentSection.content.learning_objectives && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Learning Objectives
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentSection.content.learning_objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {currentSection.content.main_concepts && currentSection.content.main_concepts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentSection.content.main_concepts.map((concept, index) => (
                      <div key={concept.concept_id} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{concept.title}</h4>
                        <p className="text-gray-700 mb-3">{concept.content.quick_overview}</p>
                        
                        {concept.content.step_by_step_guide && (
                          <div className="mb-3">
                            <h5 className="font-medium mb-2">Steps:</h5>
                            <ol className="space-y-2">
                              {concept.content.step_by_step_guide.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2">
                                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                                    {stepIndex + 1}
                                  </span>
                                  <span className="text-sm">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {concept.content.practice_activity && (
                          <div className="bg-green-50 border border-green-200 rounded p-3">
                            <h5 className="font-medium text-green-800 mb-1">Practice Activity</h5>
                            <p className="text-sm text-green-700">{concept.content.practice_activity.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
          disabled={currentSectionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous Section
        </Button>
        
        <Button 
          onClick={() => setCurrentSectionIndex(Math.min(totalSections - 1, currentSectionIndex + 1))}
          disabled={currentSectionIndex === totalSections - 1}
        >
          Next Section
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
} 