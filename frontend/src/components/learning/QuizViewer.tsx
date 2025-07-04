'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Brain,
  Target,
  Trophy,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface QuizQuestion {
  question_id: string;
  question: string;
  type: 'multiple_choice' | 'true_false';
  options?: string[];
  correct_answer: string;
  explanation: string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface Quiz {
  quiz_id: string;
  topic: string;
  difficulty_level: string;
  questions: QuizQuestion[];
  total_points: number;
  time_limit_minutes: number;
  passing_score: number;
}

interface QuizResult {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  pointsEarned: number;
}

interface QuizViewerProps {
  quiz: Quiz;
  onComplete?: (results: QuizResult[]) => void;
}

export default function QuizViewer({ quiz, onComplete }: QuizViewerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.time_limit_minutes * 60);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const totalQuestions = quiz.questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer: string) => {
    setCurrentAnswer(answer);
    const newAnswers = { ...answers, [currentQuestion.question_id]: answer };
    setAnswers(newAnswers);
  };

  const handleQuestionSubmit = () => {
    const isCorrect = currentAnswer === currentQuestion.correct_answer;
    const pointsEarned = isCorrect ? currentQuestion.points : 0;

    const result: QuizResult = {
      questionId: currentQuestion.question_id,
      userAnswer: currentAnswer,
      isCorrect,
      pointsEarned
    };

    const newResults = [...results, result];
    setResults(newResults);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
      setCurrentAnswer(answers[quiz.questions[currentQuestionIndex + 1]?.question_id] || '');
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setIsCompleted(true);
    if (onComplete) {
      onComplete(results);
    }
  };

  const calculateScore = () => {
    const totalEarned = results.reduce((sum, result) => sum + result.pointsEarned, 0);
    return Math.round((totalEarned / quiz.total_points) * 100);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isCompleted) {
    const score = calculateScore();
    const passed = score >= quiz.passing_score;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {passed ? (
                <Trophy className="w-16 h-16 text-yellow-500" />
              ) : (
                <Target className="w-16 h-16 text-gray-400" />
              )}
            </div>
            <CardTitle className="text-2xl">
              Quiz {passed ? 'Completed!' : 'Finished'}
            </CardTitle>
            <CardDescription>
              {quiz.topic} • {quiz.difficulty_level}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                {score}%
              </div>
              <p className="text-gray-600 mt-2">
                {results.filter(r => r.isCorrect).length} of {totalQuestions} correct
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">Correct</p>
                  <p className="text-2xl font-bold text-green-600">
                    {results.filter(r => r.isCorrect).length}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <p className="font-semibold">Time Used</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatTime((quiz.time_limit_minutes * 60) - timeRemaining)}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <p className="font-semibold">Points</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {results.reduce((sum, r) => sum + r.pointsEarned, 0)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center">
              <Button onClick={() => onComplete?.(results)}>
                Continue Learning
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{quiz.topic}</h1>
          <p className="text-gray-600">{quiz.difficulty_level} • {totalQuestions} questions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Time Remaining</p>
            <p className={`font-mono text-lg ${timeRemaining < 300 ? 'text-red-600' : 'text-gray-900'}`}>
              {formatTime(timeRemaining)}
            </p>
          </div>
          {timeRemaining < 300 && (
            <AlertCircle className="w-6 h-6 text-red-500" />
          )}
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <Progress value={progressPercentage} />
        </CardContent>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Question {currentQuestionIndex + 1}
            </CardTitle>
            <div className="flex gap-2">
              <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="outline">
                {currentQuestion.points} pts
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
            
            {currentQuestion.type === 'multiple_choice' && currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                      currentAnswer === option 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === 'true_false' && (
              <div className="space-y-3">
                <button
                  onClick={() => handleAnswerSelect('True')}
                  className={`w-full text-left p-3 border rounded-lg transition-colors ${
                    currentAnswer === 'True' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  True
                </button>
                <button
                  onClick={() => handleAnswerSelect('False')}
                  className={`w-full text-left p-3 border rounded-lg transition-colors ${
                    currentAnswer === 'False' 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  False
                </button>
              </div>
            )}
          </div>

          {showExplanation && (
            <Card className={`${currentAnswer === currentQuestion.correct_answer ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              <CardContent className="pt-4">
                <div className="flex items-start gap-2">
                  {currentAnswer === currentQuestion.correct_answer ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium mb-2">
                      {currentAnswer === currentQuestion.correct_answer ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
                    {currentAnswer !== currentQuestion.correct_answer && (
                      <p className="text-sm mt-2">
                        <strong>Correct answer:</strong> {currentQuestion.correct_answer}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
          disabled={currentQuestionIndex === 0}
        >
          Previous Question
        </Button>
        
        {!showExplanation ? (
          <Button 
            onClick={handleQuestionSubmit}
            disabled={!currentAnswer}
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
} 