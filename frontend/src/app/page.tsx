import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Trophy, Users, Zap, Target } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          AI-Powered Learning Platform
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Experience personalized, adaptive learning with our comprehensive platform. 
          Create tutorials, take quizzes, and track your progress with AI-driven insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/learning">
            <Button size="lg">
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
          </Link>
          <Link href="/mcp">
            <Button variant="outline" size="lg">
              <Brain className="w-5 h-5 mr-2" />
              MCP Services
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-600" />
              AI-Generated Content
            </CardTitle>
            <CardDescription>
              Create personalized tutorials and quizzes tailored to your learning style and pace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Adaptive difficulty levels</li>
              <li>• Multiple learning styles supported</li>
              <li>• Real-time content optimization</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-green-600" />
              Progress Tracking
            </CardTitle>
            <CardDescription>
              Monitor your learning journey with detailed analytics and insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Completion tracking</li>
              <li>• Performance analytics</li>
              <li>• Learning streak monitoring</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Interactive Learning
            </CardTitle>
            <CardDescription>
              Engage with hands-on exercises, quizzes, and practical applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Interactive tutorials</li>
              <li>• Timed assessments</li>
              <li>• Immediate feedback</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview */}
      <div className="bg-white rounded-lg p-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Powered by Advanced MCP Servers
            </h2>
            <p className="text-gray-600 mb-6">
              Our learning platform is built on top of sophisticated Model Context Protocol (MCP) servers 
              that provide intelligent content generation, progress tracking, and personalized learning experiences.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Learning Documentation Server</h4>
                  <p className="text-sm text-gray-600">Creates tutorials, quizzes, and tracks learning progress</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Business Intelligence Integration</h4>
                  <p className="text-sm text-gray-600">Analyzes learning patterns and provides insights</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold">Smart Development Environment</h4>
                  <p className="text-sm text-gray-600">Supports coding tutorials and technical learning paths</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Learning Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Tutorial Topics</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1000+</div>
                <div className="text-sm text-gray-600">Practice Questions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">24/7</div>
                <div className="text-sm text-gray-600">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Start Your Learning Journey?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of learners who are already advancing their skills with our AI-powered platform.
        </p>
        <Link href="/learning">
          <Button size="lg">
            <Trophy className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
