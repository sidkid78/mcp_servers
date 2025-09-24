'use client';

import React, { useState, useEffect } from 'react';
import type { ComponentProps } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import TutorialViewer from './TutorialViewer';
import QuizViewer from './QuizViewer';
import { BookOpen, Clock, Target, Play, Users, Zap } from 'lucide-react';

export interface ComprehensiveTutorial {
  Response: {
    success: boolean;
    tutorial_id: string;
    topic: string;
    learning_style: string;
    duration_minutes: number;
    estimated_completion_time: number;
    tutorial_structure: {
      total_sections: number;
      content_sections: number;
      estimated_time: number;
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
    learning_objectives: string[];
    next_tutorial_recommendations: Array<{
      type: string;
      title: string;
      description: string;
      difficulty: string;
    }>;
  };
}
// Local quiz question type to avoid importing component values as types
export type QuizQuestion = {
  question_id: string;
  question: string;
  type: 'multiple_choice' | 'true_false';
  options?: string[];
  correct_answer: string;
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
};
export interface Tutorial {
  tutorial_id: string;
  TutorialSection: string;
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
export interface TutorialSection {
  id: string;
  title: string;
  type: 'introduction' | 'content' | 'conclusion';
  duration_minutes: number;
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
        };
      };
    }>;
  };
}
export interface TutorialLoaderProps {
  tutorialData?: ComprehensiveTutorial;
  onTutorialSelect?: (tutorial: Tutorial) => void;
}

export default function TutorialLoader({ tutorialData, onTutorialSelect }: TutorialLoaderProps) {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  type QuizViewerPropsInLoader = ComponentProps<typeof QuizViewer>;
  type QuizType = QuizViewerPropsInLoader['quiz'];
  const [selectedQuiz, setSelectedQuiz] = useState<QuizType | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'tutorial' | 'quiz'>('overview');
  const [currentTutorial, setCurrentTutorial] = useState<ComprehensiveTutorial | null>(null);

  useEffect(() => {
    if (tutorialData) {
      setCurrentTutorial(tutorialData);
    } else {
      setCurrentTutorial(createMockTutorial());
    }
  }, [tutorialData]);

  const createMockTutorial = (): ComprehensiveTutorial => ({
    Response: {
      success: true,
      tutorial_id: 'mock_tutorial_1',
      topic: 'JavaScript DOM Manipulation - Building an Interactive To-Do List',
      learning_style: 'hands_on',
      duration_minutes: 72,
      estimated_completion_time: 71,
      tutorial_structure: {
        total_sections: 5,
        content_sections: 3,
        estimated_time: 71,
        progression_type: 'adaptive',
        practice_ratio: 0.4
      },
      tutorial_sections: [
        {
          id: 'introduction',
          title: 'Introduction',
          type: 'introduction',
          duration_minutes: 7,
          content: {
            welcome_message: 'Welcome to this comprehensive tutorial! You\'ll learn essential skills and concepts that will help you succeed.',
            learning_objectives: [
              'Analyze complex aspects of JavaScript DOM Manipulation',
              'Implement DOM solutions to real problems',
              'Compare different approaches to DOM manipulation',
              'Troubleshoot common DOM issues',
              'Write functional DOM manipulation code'
            ],
            prerequisites: [
              'Basic JavaScript knowledge',
              'HTML/CSS familiarity',
              'Understanding of web browsers'
            ]
          }
        },
        {
          id: 'section_1',
          title: 'Core DOM Concepts',
          type: 'content',
          duration_minutes: 19,
          content: {
            main_concepts: [
              {
                concept_id: 'concept_1_1',
                title: 'DOM Tree Structure',
                content: {
                  quick_overview: 'Understanding how the DOM represents HTML as a tree structure',
                  step_by_step_guide: [
                    'Learn about nodes and elements',
                    'Understand parent-child relationships',
                    'Navigate the DOM tree',
                    'Select elements efficiently'
                  ],
                  practice_activity: {
                    type: 'coding_exercise',
                    description: 'Navigate and select elements in a sample DOM tree'
                  }
                }
              },
              {
                concept_id: 'concept_1_2',
                title: 'Element Selection Methods',
                content: {
                  quick_overview: 'Master different ways to select DOM elements',
                  step_by_step_guide: [
                    'Use getElementById for unique elements',
                    'Apply getElementsByClassName for multiple elements',
                    'Leverage querySelector for complex selections',
                    'Choose the right method for each scenario'
                  ],
                  practice_activity: {
                    type: 'hands_on_exercise',
                    description: 'Practice selecting elements using different methods'
                  }
                }
              }
            ]
          }
        },
        {
          id: 'section_2',
          title: 'Building the To-Do List',
          type: 'content',
          duration_minutes: 19,
          content: {
            main_concepts: [
              {
                concept_id: 'concept_2_1',
                title: 'Creating Dynamic Elements',
                content: {
                  quick_overview: 'Learn to create and add new elements to the DOM',
                  step_by_step_guide: [
                    'Create elements with createElement',
                    'Set element properties and content',
                    'Append elements to the DOM',
                    'Handle user input for new tasks'
                  ],
                  practice_activity: {
                    type: 'project_building',
                    description: 'Build the add functionality for the to-do list'
                  }
                }
              },
              {
                concept_id: 'concept_2_2',
                title: 'Event Handling',
                content: {
                  quick_overview: 'Implement interactive features with event listeners',
                  step_by_step_guide: [
                    'Add click events for buttons',
                    'Handle form submissions',
                    'Implement keyboard shortcuts',
                    'Manage event delegation'
                  ],
                  practice_activity: {
                    type: 'interactive_coding',
                    description: 'Add interactive features to your to-do list'
                  }
                }
              }
            ]
          }
        },
        {
          id: 'section_3',
          title: 'Advanced Features',
          type: 'content',
          duration_minutes: 19,
          content: {
            main_concepts: [
              {
                concept_id: 'concept_3_1',
                title: 'Edit and Delete Functionality',
                content: {
                  quick_overview: 'Implement edit and delete features for to-do items',
                  step_by_step_guide: [
                    'Create edit mode for tasks',
                    'Update task content dynamically',
                    'Implement delete functionality',
                    'Add confirmation dialogs'
                  ],
                  practice_activity: {
                    type: 'feature_implementation',
                    description: 'Complete the CRUD operations for your to-do list'
                  }
                }
              },
              {
                concept_id: 'concept_3_2',
                title: 'Data Persistence',
                content: {
                  quick_overview: 'Save and load to-do data using localStorage',
                  step_by_step_guide: [
                    'Store data in localStorage',
                    'Load data on page refresh',
                    'Handle data serialization',
                    'Implement data validation'
                  ],
                  practice_activity: {
                    type: 'persistence_exercise',
                    description: 'Add data persistence to your to-do application'
                  }
                }
              }
            ]
          }
        },
        {
          id: 'conclusion',
          title: 'Summary and Next Steps',
          type: 'conclusion',
          duration_minutes: 7,
          content: {
            welcome_message: 'Congratulations on completing the JavaScript DOM Manipulation tutorial!'
          }
        }
      ],
      learning_objectives: [
        'Analyze complex aspects of JavaScript DOM Manipulation',
        'Implement DOM solutions to real problems',
        'Compare different approaches to DOM manipulation',
        'Troubleshoot common DOM issues',
        'Write functional DOM manipulation code'
      ],
      next_tutorial_recommendations: [
        {
          type: 'progression',
          title: 'Advanced JavaScript Patterns',
          description: 'Learn advanced JavaScript patterns and best practices',
          difficulty: 'advanced'
        },
        {
          type: 'related',
          title: 'React Component Development',
          description: 'Build modern web applications with React',
          difficulty: 'intermediate'
        },
        {
          type: 'application',
          title: 'Real-World Projects',
          description: 'Apply your skills to authentic projects',
          difficulty: 'intermediate'
        }
      ]
    }
  });

  const convertToTutorialFormat = (comprehensiveTutorial: ComprehensiveTutorial) => {
    const { Response } = comprehensiveTutorial;
    
    return {
      tutorial_id: Response.tutorial_id,
      topic: Response.topic,
      learning_style: Response.learning_style,
      duration_minutes: Response.duration_minutes,
      estimated_completion_time: Response.estimated_completion_time,
      tutorial_sections: Response.tutorial_sections,
      tutorial_structure: Response.tutorial_structure
    };
  };

  const generateQuizFromTutorial = (tutorial: ComprehensiveTutorial): QuizType => {
    const { Response } = tutorial;
    const questions: QuizQuestion[] = [];
    
    Response.learning_objectives.forEach((objective, index) => {
      questions.push({
        question_id: `q_${index + 1}`,
        question: `Which approach best demonstrates: ${objective}?`,
        type: 'multiple_choice',
        options: [
          'Through hands-on practice and real examples',
          'By reading documentation only',
          'By watching tutorials passively',
          'By memorizing syntax patterns'
        ],
        correct_answer: 'Through hands-on practice and real examples',
        explanation: `The most effective way to master "${objective}" is through practical application and hands-on experience with real code examples.`,
        points: 10,
        difficulty: 'medium'
      });
    });

    return {
      quiz_id: `quiz_${Response.tutorial_id}`,
      topic: Response.topic,
      difficulty_level: 'medium',
      questions: questions,
      total_points: questions.length * 10,
      time_limit_minutes: 20,
      passing_score: 70
    } as QuizType;
  };

  const handleStartTutorial = () => {
    if (currentTutorial) {
      const tutorial = convertToTutorialFormat(currentTutorial);
      setSelectedTutorial(tutorial as unknown as Tutorial);
      setViewMode('tutorial');
      if (onTutorialSelect) {
        onTutorialSelect(tutorial as unknown as Tutorial);
      }
    }
  };

  const handleStartQuiz = () => {
    if (currentTutorial) {
      const quiz = generateQuizFromTutorial(currentTutorial);
      setSelectedQuiz(quiz);
      setViewMode('quiz');
    }
  };

  const handleBackToOverview = () => {
    setViewMode('overview');
    setSelectedTutorial(null);
  };

  if (!currentTutorial) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tutorial...</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'tutorial' && selectedTutorial) {
    return (
      <div>
        <div className="mb-4">
          <Button variant="outline" onClick={handleBackToOverview}>
            ← Back to Overview
          </Button>
        </div>
        <TutorialViewer tutorial={selectedTutorial} />
      </div>
    );
  }

  if (viewMode === 'quiz' && selectedQuiz) {
    return (
      <div>
        <div className="mb-4">
          <Button variant="outline" onClick={handleBackToOverview}>
            ← Back to Overview
          </Button>
        </div>
        <QuizViewer quiz={selectedQuiz} />
      </div>
    );
  }

  const { Response } = currentTutorial;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">{Response.topic}</CardTitle>
              <CardDescription>
                {Response.learning_style.replace('_', ' ')} learning • {Response.duration_minutes} minutes
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">
                {Response.tutorial_structure.total_sections} sections
              </Badge>
              <Badge variant="outline">
                {Math.round(Response.tutorial_structure.practice_ratio * 100)}% practice
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-gray-600">{Response.estimated_completion_time} minutes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium">Objectives</p>
                <p className="text-sm text-gray-600">{Response.learning_objectives.length} goals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium">Type</p>
                <p className="text-sm text-gray-600">{Response.tutorial_structure.progression_type}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleStartTutorial}>
              <Play className="w-4 h-4 mr-2" />
              Start Tutorial
            </Button>
            <Button variant="outline" onClick={handleStartQuiz}>
              <BookOpen className="w-4 h-4 mr-2" />
              Take Quiz
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Learning Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {Response.learning_objectives.map((objective, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-sm">{objective}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Tutorial Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Response.tutorial_sections.map((section, index) => (
              <div key={section.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{section.title}</h4>
                    <p className="text-sm text-gray-600 capitalize">{section.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{section.duration_minutes} min</p>
                  {section.content.main_concepts && (
                    <p className="text-xs text-gray-500">
                      {section.content.main_concepts.length} concepts
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            What&apos;s Next?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Response.next_tutorial_recommendations.map((recommendation, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {recommendation.difficulty}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {recommendation.type}
                  </Badge>
                </div>
                <h4 className="font-medium mb-1">{recommendation.title}</h4>
                <p className="text-sm text-gray-600">{recommendation.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 