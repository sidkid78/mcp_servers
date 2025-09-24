"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { 
  BookOpen, 
  Brain, 
  Building2, 
  BarChart3, 
  Server, 
  Shield, 
  Code, 
  Target,
  Zap,
  Globe,
  Database,
  Rocket,
  Activity,
  Moon,
  Sun
} from "lucide-react";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HOMEase AI Platform
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
            Comprehensive AI-powered platform for federal assistance intelligence, infrastructure automation, 
            business intelligence, and smart development. Six specialized MCP servers working together to 
            transform how you analyze, automate, and optimize.
          </p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              <Activity className="h-3 w-3 mr-1" />
              6 AI Servers Active
            </Badge>
            <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
              <Globe className="h-3 w-3 mr-1" />
              36K+ Programs Tracked
            </Badge>
            <Badge variant="outline" className="bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800">
              <Database className="h-3 w-3 mr-1" />
              250K+ Contracts Analyzed
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link href="/federal-assistance">
              <Button size="lg" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Building2 className="w-5 h-5 mr-2" />
                Federal Assistance
              </Button>
            </Link>
            <Link href="/infrastructure-automation">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Server className="w-5 h-5 mr-2" />
                Infrastructure
              </Button>
            </Link>
            <Link href="/business-intelligence">
              <Button size="lg" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                <BarChart3 className="w-5 h-5 mr-2" />
                Business Intelligence
              </Button>
            </Link>
          </div>
        </div>

        {/* AI Platform Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Building2 className="w-6 h-6 text-blue-600" />
                Federal Assistance Intelligence
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                AI-powered federal grants, contracts, and opportunities discovery with USASpending integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 36,650+ Programs Tracked</li>
                <li>• 250K Contract Records</li>
                <li>• 86K+ Live Opportunities</li>
                <li>• Strategic Application Planning</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Server className="w-6 h-6 text-purple-600" />
                Infrastructure Automation
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Enterprise-grade infrastructure monitoring, deployment, scaling, and security automation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Real-time Service Monitoring</li>
                <li>• Automated Deployments</li>
                <li>• Resource Scaling & Optimization</li>
                <li>• Security & Compliance Audits</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <BarChart3 className="w-6 h-6 text-green-600" />
                Business Intelligence
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Advanced data analytics, trend forecasting, and strategic insights for business intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Multi-dimensional Analysis</li>
                <li>• Predictive Trend Forecasting</li>
                <li>• Executive-ready Reports</li>
                <li>• Real-time Data Insights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Code className="w-6 h-6 text-orange-600" />
                Smart Development Environment
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                AI-powered development tools for code analysis, testing, documentation, and deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Automated Code Analysis</li>
                <li>• Testing & Quality Metrics</li>
                <li>• Documentation Generation</li>
                <li>• Deployment Automation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Target className="w-6 h-6 text-red-600" />
                Project Management
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Intelligent project orchestration with task assignment, progress tracking, and resource optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Smart Task Assignment</li>
                <li>• Progress Tracking & Analytics</li>
                <li>• Resource Optimization</li>
                <li>• Timeline Generation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <BookOpen className="w-6 h-6 text-indigo-600" />
                Learning Platform
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                AI-powered adaptive learning with personalized tutorials, quizzes, and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• AI-Generated Content</li>
                <li>• Adaptive Difficulty</li>
                <li>• Progress Analytics</li>
                <li>• Interactive Assessments</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Security, Performance & Deployment Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Shield className="w-6 h-6 text-blue-600" />
                Security & Compliance
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Enterprise-grade security monitoring, threat detection, and compliance management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Real-time Threat Detection</li>
                <li>• Compliance Monitoring</li>
                <li>• Security Audit Reports</li>
                <li>• Access Control Management</li>
              </ul>
              <div className="mt-4">
                <Link href="/security">
                  <Button size="sm" variant="outline" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Dashboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Zap className="w-6 h-6 text-yellow-600" />
                Performance Optimization
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                AI-driven performance monitoring, bottleneck detection, and optimization recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Performance Metrics</li>
                <li>• Bottleneck Analysis</li>
                <li>• Resource Optimization</li>
                <li>• Speed Enhancement</li>
              </ul>
              <div className="mt-4">
                <Link href="/performance">
                  <Button size="sm" variant="outline" className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Performance Center
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Rocket className="w-6 h-6 text-purple-600" />
                Deployment & Scaling
              </CardTitle>
              <CardDescription className="dark:text-gray-400">
                Automated deployment pipelines, scaling strategies, and infrastructure provisioning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• CI/CD Pipelines</li>
                <li>• Auto-scaling</li>
                <li>• Blue-green Deployments</li>
                <li>• Infrastructure as Code</li>
              </ul>
              <div className="mt-4">
                <Link href="/deployment">
                  <Button size="sm" variant="outline" className="w-full">
                    <Rocket className="w-4 h-4 mr-2" />
                    Deployment Hub
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Architecture */}
        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0 shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Powered by 6 Specialized MCP Servers
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                HOMEase AI Platform leverages advanced Model Context Protocol (MCP) servers that work together 
                to provide comprehensive AI-powered analysis, automation, and intelligence across multiple domains.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Federal Assistance Intelligence</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">36K+ programs, 250K contracts, strategic funding analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Infrastructure Automation</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Real-time monitoring, deployment, scaling, security</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Business Intelligence Engine</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Advanced analytics, forecasting, executive insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Smart Development & Project Management</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Code analysis, testing, project orchestration</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Platform Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">36.6K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Federal Programs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">250K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Contract Records</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">86K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Live Opportunities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Analysis</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">6</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">MCP Servers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">∞</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Possibilities</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Experience the power of AI-driven federal assistance intelligence, infrastructure automation, 
            and business intelligence working together in one comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/federal-assistance">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Building2 className="w-5 h-5 mr-2" />
                Explore Federal Assistance
              </Button>
            </Link>
            <Link href="/infrastructure-automation">
              <Button size="lg" variant="outline">
                <Server className="w-5 h-5 mr-2" />
                Try Infrastructure Tools
              </Button>
            </Link>
            <Link href="/business-intelligence">
              <Button size="lg" variant="outline">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Analytics
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>🚀 All platforms powered by advanced MCP servers • 🔒 Secure & compliant • ⚡ Real-time analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
}
