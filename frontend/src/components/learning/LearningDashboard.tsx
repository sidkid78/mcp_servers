'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import TutorialLoader from './TutorialLoader';
import TutorialCreator from './TutorialCreator';
import { 
  BookOpen, 
  Brain, 
  Trophy, 
  Clock, 
  Target, 
  Play,
  Plus,
  Settings,
  BarChart3,
  Users,
  Lightbulb
} from 'lucide-react';

interface LearningStats {
  totalTutorials: number;
  completedTutorials: number;
  totalQuizzes: number;
  averageScore: number;
  timeSpent: number;
  currentStreak: number;
  skillsLearned: number;
  certificatesEarned: number;
}

interface RecentActivity {
  id: string;
  type: 'tutorial' | 'quiz' | 'assessment';
  title: string;
  progress: number;
  lastAccessed: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface Recommendation {
  id: string;
  type: 'tutorial' | 'skill_gap' | 'review';
  title: string;
  description: string;
  estimatedTime: number;
  priority: 'high' | 'medium' | 'low';
}

export default function LearningDashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'tutorial' | 'create'>('dashboard');
  const [stats] = useState<LearningStats>({
    totalTutorials: 12,
    completedTutorials: 8,
    totalQuizzes: 24,
    averageScore: 87,
    timeSpent: 145, // hours
    currentStreak: 7,
    skillsLearned: 15,
    certificatesEarned: 3
  });

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      type: 'tutorial',
      title: 'JavaScript DOM Manipulation - Building an Interactive To-Do List',
      progress: 75,
      lastAccessed: '2024-01-15',
      difficulty: 'intermediate'
    },
    {
      id: '2',
      type: 'quiz',
      title: 'React Hooks Assessment',
      progress: 100,
      lastAccessed: '2024-01-14',
      difficulty: 'advanced'
    },
    {
      id: '3',
      type: 'tutorial',
      title: 'Introduction to Neural Networks',
      progress: 30,
      lastAccessed: '2024-01-13',
      difficulty: 'beginner'
    }
  ]);

  const [recommendations] = useState<Recommendation[]>([
    {
      id: '1',
      type: 'skill_gap',
      title: 'Complete TypeScript Fundamentals',
      description: 'Based on your recent work, strengthening TypeScript skills would be beneficial',
      estimatedTime: 45,
      priority: 'high'
    },
    {
      id: '2',
      type: 'tutorial',
      title: 'Advanced React Patterns',
      description: 'Next logical step after completing React Hooks',
      estimatedTime: 60,
      priority: 'medium'
    },
    {
      id: '3',
      type: 'review',
      title: 'Review: Data Structures and Algorithms',
      description: 'Knowledge retention check recommended',
      estimatedTime: 30,
      priority: 'low'
    }
  ]);

  const completionRate = Math.round((stats.completedTutorials / stats.totalTutorials) * 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500';
      case 'intermediate': return 'bg-yellow-500';
      case 'advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  // Render different views based on current state
  if (currentView === 'tutorial') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
              ← Back to Dashboard
            </Button>
          </div>
          <TutorialLoader />
        </div>
      </div>
    );
  }

  if (currentView === 'create') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
              ← Back to Dashboard
            </Button>
          </div>
          <TutorialCreator />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Learning Dashboard</h1>
            <p className="text-gray-600 mt-1">Track your progress and discover new learning opportunities</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button size="sm" onClick={() => setCurrentView('create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Tutorial
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                {stats.completedTutorials} of {stats.totalTutorials} tutorials
              </p>
              <Progress value={completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Across {stats.totalQuizzes} assessments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Spent</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.timeSpent}h</div>
              <p className="text-xs text-muted-foreground">
                {stats.currentStreak} day learning streak
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills Learned</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.skillsLearned}</div>
              <p className="text-xs text-muted-foreground">
                {stats.certificatesEarned} certificates earned
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Continue where you left off
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={activity.progress} className="flex-1 h-2" />
                      <span className="text-xs text-gray-500">{activity.progress}%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getDifficultyColor(activity.difficulty)}`} />
                      <span className="text-xs text-gray-500 capitalize">{activity.difficulty}</span>
                      <span className="text-xs text-gray-400">• {activity.lastAccessed}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setCurrentView('tutorial')}>
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                AI Recommendations
              </CardTitle>
              <CardDescription>
                Personalized learning suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{rec.title}</h4>
                    <Badge variant={getPriorityColor(rec.priority)} className="text-xs">
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {rec.estimatedTime} min
                    </span>
                    <Button size="sm" variant="outline">
                      Start Learning
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump into learning activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BookOpen className="w-6 h-6" />
                Browse Tutorials
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Brain className="w-6 h-6" />
                Take Assessment
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <BarChart3 className="w-6 h-6" />
                View Analytics
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="w-6 h-6" />
                Study Groups
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 