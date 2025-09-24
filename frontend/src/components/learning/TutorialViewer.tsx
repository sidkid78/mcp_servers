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
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sectionRatings, setSectionRatings] = useState<Record<string, number>>({});

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

  const handleSectionComplete = () => {
    const newCompleted = new Set(completedSections);
    newCompleted.add(currentSection.id);
    setCompletedSections(newCompleted);
    onSectionComplete?.(currentSection.id);
    
    if (newCompleted.size === totalSections) {
      onComplete?.();
    }
  };

  const handleResetProgress = () => {
    setCompletedSections(new Set());
    setCurrentSectionIndex(0);
    setTimeSpent(0);
    setSectionRatings({});
  };

  const handleRateSection = (rating: number) => {
    setSectionRatings(prev => ({
      ...prev,
      [currentSection.id]: rating
    }));
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'introduction': return 'default';
      case 'content': return 'secondary';
      case 'conclusion': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl font-bold text-foreground">{tutorial.topic}</h1>
            <Badge variant={getBadgeVariant(currentSection.type)}>
              {currentSection.type}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{tutorial.learning_style.replace('_', ' ')} • {tutorial.duration_minutes} minutes</span>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Code className="w-3 h-3" />
              {tutorial.learning_style}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Time Spent
            </p>
            <p className="font-mono text-foreground">{formatTime(timeSpent)}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetProgress}
            title="Reset Progress"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
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
                    ? 'bg-green-500 text-white dark:bg-green-600'
                    : index === currentSectionIndex
                    ? 'bg-blue-500 text-white dark:bg-blue-600'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {completedSections.has(section.id) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : index === currentSectionIndex ? (
                  index + 1
                ) : (
                  <Circle className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card className="min-h-[600px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {currentSection.type === 'introduction' && <BookOpen className="w-5 h-5" />}
              {currentSection.type === 'content' && <Brain className="w-5 h-5" />}
              {currentSection.type === 'conclusion' && <Trophy className="w-5 h-5" />}
              {currentSection.title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {currentSection.duration_minutes} min
              </Badge>
              {sectionRatings[currentSection.id] && (
                <div className="flex items-center gap-1">
                  {Array.from({ length: sectionRatings[currentSection.id] }, (_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>
          </div>
          <CardDescription>
            {currentSection.duration_minutes} minutes • {currentSection.type}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-foreground">{tutorial.topic}</h2>
              <p className="text-muted-foreground">{currentSection.content.welcome_message || 'Welcome to this tutorial section!'}</p>
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
                        <CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{objective}</span>
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
                      <div key={concept.concept_id} className="border border-border rounded-lg p-4 bg-card">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">{concept.title}</h4>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Code className="w-3 h-3" />
                            Concept {index + 1}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{concept.content.quick_overview}</p>
                        
                        {concept.content.step_by_step_guide && (
                          <div className="mb-3">
                            <h5 className="font-medium mb-2 text-foreground">Steps:</h5>
                            <ol className="space-y-2">
                              {concept.content.step_by_step_guide.map((step, stepIndex) => (
                                <li key={stepIndex} className="flex items-start gap-2">
                                  <span className="flex-shrink-0 w-5 h-5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-medium">
                                    {stepIndex + 1}
                                  </span>
                                  <span className="text-sm text-foreground">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}

                        {concept.content.practice_activity && (
                          <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-green-800 dark:text-green-200">Practice Activity</h5>
                              <Badge variant="outline" className="text-green-700 dark:text-green-300 border-green-300 dark:border-green-700">
                                {concept.content.practice_activity.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-green-700 dark:text-green-300">{concept.content.practice_activity.description}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Section Rating */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Rate this section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      title={`Rate this section ${i + 1} out of 5`}
                      key={i}
                      onClick={() => handleRateSection(i + 1)}
                      className="transition-colors"
                    >
                      <Star 
                        className={`w-5 h-5 ${
                          (sectionRatings[currentSection.id] || 0) > i 
                            ? 'fill-yellow-400 text-yellow-400' 
                            : 'text-muted-foreground hover:text-yellow-400'
                        }`} 
                      />
                    </button>
                  ))}
                  {sectionRatings[currentSection.id] && (
                    <span className="text-sm text-muted-foreground ml-2">
                      {sectionRatings[currentSection.id]} / 5
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
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
        
        <div className="flex gap-2">
          {!completedSections.has(currentSection.id) && (
            <Button 
              variant="outline"
              onClick={handleSectionComplete}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          )}
          
          <Button 
            onClick={() => setCurrentSectionIndex(Math.min(totalSections - 1, currentSectionIndex + 1))}
            disabled={currentSectionIndex === totalSections - 1}
          >
            Next Section
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
} 