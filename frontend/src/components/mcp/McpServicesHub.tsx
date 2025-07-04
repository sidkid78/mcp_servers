'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import McpServiceClient from '@/lib/services/mcpService';
import { 
  Brain, 
  Code, 
  Server, 
  Users, 
  BookOpen, 
  BarChart3,
  Settings,
  Zap,
  CheckCircle,
  Activity
} from 'lucide-react';

interface McpService {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'maintenance';
  capabilities: string[];
  tools: string[];
  prompts: string[];
  category: 'development' | 'infrastructure' | 'business' | 'learning';
}

interface McpServicesHubProps {
  onServiceSelect?: (service: McpService) => void;
}

export default function McpServicesHub({ onServiceSelect }: McpServicesHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<McpService | null>(null);
  const [serviceStatuses, setServiceStatuses] = useState<Record<string, { status: string; connected: boolean }>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Check service statuses on component mount
  useEffect(() => {
    checkAllServiceStatuses();
  }, []);

  const checkAllServiceStatuses = async () => {
    setIsLoading(true);
    const statuses: Record<string, { status: string; connected: boolean }> = {};
    
    for (const service of mcpServices) {
      try {
        const client = new McpServiceClient(service.id);
        const response = await client.getStatus();
        
        if (response.success) {
          statuses[service.id] = {
            status: response.data?.status || 'unknown',
            connected: response.data?.connected || false
          };
        } else {
          statuses[service.id] = {
            status: 'error',
            connected: false
          };
        }
      } catch (error) {
        statuses[service.id] = {
          status: 'error',
          connected: false
        };
      }
    }
    
    setServiceStatuses(statuses);
    setIsLoading(false);
  };

  const mcpServices: McpService[] = [
    {
      id: 'learning-documentation',
      name: 'Learning Documentation',
      description: 'AI-powered tutorial creation, quiz generation, and learning progress tracking',
      icon: <BookOpen className="w-6 h-6" />,
      status: 'active',
      capabilities: [
        'Tutorial Generation',
        'Quiz Creation',
        'Progress Tracking',
        'Knowledge Assessment',
        'Content Adaptation'
      ],
      tools: [
        'create_tutorial',
        'generate_quiz',
        'analyze_knowledge_gaps',
        'track_completion',
        'update_content',
        'export_curriculum'
      ],
      prompts: [
        'content-generation',
        'documentation-audit',
        'interactive-tutorial',
        'knowledge-assessment',
        'learning-path-design',
        'progress-tracking'
      ],
      category: 'learning'
    },
    {
      id: 'smart-dev-env',
      name: 'Smart Development Environment',
      description: 'Senior developer pair programmer for code reviews, architecture, and debugging',
      icon: <Code className="w-6 h-6" />,
      status: 'active',
      capabilities: [
        'Code Analysis',
        'Test Execution',
        'Dependency Auditing',
        'Documentation Generation',
        'Deployment Preview',
        'Rollback Management'
      ],
      tools: [
        'analyze_codebase',
        'run_tests',
        'check_dependencies',
        'generate_docs',
        'deploy_preview',
        'rollback_changes'
      ],
      prompts: [
        'dev-setup',
        'code-review',
        'architecture-analysis',
        'debug-investigation',
        'refactor-planning',
        'performance-audit'
      ],
      category: 'development'
    },
    {
      id: 'project-management',
      name: 'Project Management',
      description: 'Agentic workflows for project planning, resource optimization, and delivery',
      icon: <Users className="w-6 h-6" />,
      status: 'active',
      capabilities: [
        'Project Creation',
        'Task Assignment',
        'Progress Monitoring',
        'Blocker Identification',
        'Timeline Generation',
        'Team Notifications'
      ],
      tools: [
        'create_project',
        'assign_tasks',
        'track_progress',
        'identify_blockers',
        'generate_timeline',
        'send_notifications'
      ],
      prompts: [
        'project-kickoff',
        'milestone-planning',
        'resource-optimization',
        'risk-assessment',
        'progress-review',
        'delivery-planning'
      ],
      category: 'business'
    },
    {
      id: 'infrastructure-automation',
      name: 'Infrastructure Automation',
      description: 'Comprehensive infrastructure management, monitoring, and automation',
      icon: <Server className="w-6 h-6" />,
      status: 'active',
      capabilities: [
        'Service Monitoring',
        'Application Deployment',
        'Resource Scaling',
        'Data Backup',
        'Secret Rotation',
        'Log Analysis'
      ],
      tools: [
        'monitor_services',
        'deploy_application',
        'scale_resources',
        'backup_data',
        'rotate_secrets',
        'analyze_logs'
      ],
      prompts: [
        'infra-health-check',
        'deployment-strategy',
        'scaling-analysis',
        'incident-response',
        'security-audit',
        'disaster-recovery'
      ],
      category: 'infrastructure'
    },
    {
      id: 'business-intelligence',
      name: 'Business Intelligence',
      description: 'Data analysis, visualization, and business insights generation',
      icon: <BarChart3 className="w-6 h-6" />,
      status: 'maintenance',
      capabilities: [
        'Data Profiling',
        'Visualization Creation',
        'Correlation Analysis',
        'Report Generation',
        'Trend Analysis',
        'Executive Summaries'
      ],
      tools: [
        'load_datasource',
        'profile_dataset',
        'create_visualization',
        'run_correlation',
        'export_report',
        'schedule_analysis'
      ],
      prompts: [
        'bi-discovery',
        'correlation-deep-dive',
        'trend-analysis',
        'executive-summary',
        'insight-investigation',
        'action-recommendations'
      ],
      category: 'business'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services', icon: <Zap className="w-4 h-4" /> },
    { id: 'development', name: 'Development', icon: <Code className="w-4 h-4" /> },
    { id: 'infrastructure', name: 'Infrastructure', icon: <Server className="w-4 h-4" /> },
    { id: 'business', name: 'Business', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'learning', name: 'Learning', icon: <BookOpen className="w-4 h-4" /> }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? mcpServices 
    : mcpServices.filter(service => service.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'maintenance': return 'Maintenance';
      default: return 'Unknown';
    }
  };

  const handleServiceSelect = (service: McpService) => {
    setSelectedService(service);
    if (onServiceSelect) {
      onServiceSelect(service);
    }
  };

  if (selectedService) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <Button variant="outline" onClick={() => setSelectedService(null)}>
            ← Back to Services
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedService.icon}
                <div>
                  <CardTitle className="text-2xl">{selectedService.name}</CardTitle>
                  <CardDescription>{selectedService.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedService.status)}`} />
                <span className="text-sm font-medium">{getStatusText(selectedService.status)}</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedService.capabilities.map((capability, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-sm">{capability}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Available Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedService.tools.map((tool, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Agentic Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedService.prompts.map((prompt, index) => (
                  <Badge key={index} variant="outline" className="mr-2 mb-2">
                    {prompt}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Service Interface</CardTitle>
            <CardDescription>
              Interact with {selectedService.name} through its tools and prompts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Service interface will be implemented here</p>
              <p className="text-sm mt-2">
                Connect to MCP server endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/{selectedService.id}</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">MCP Services Hub</h1>
        <p className="text-gray-600">
          Unified interface to all Model Context Protocol servers and their capabilities
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2"
          >
            {category.icon}
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {service.icon}
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                      <span className="text-xs text-gray-500">{getStatusText(service.status)}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {service.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {service.description}
              </CardDescription>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Capabilities</h4>
                  <div className="flex flex-wrap gap-1">
                    {service.capabilities.slice(0, 3).map((capability, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                    {service.capabilities.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{service.capabilities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>{service.tools.length} tools</span>
                  <span>{service.prompts.length} prompts</span>
                </div>
              </div>

              <Button 
                className="w-full mt-4" 
                onClick={() => handleServiceSelect(service)}
                disabled={service.status === 'inactive'}
              >
                {service.status === 'inactive' ? 'Unavailable' : 'Open Service'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{mcpServices.length}</div>
            <div className="text-sm text-gray-600">Total Services</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {mcpServices.filter(s => s.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {mcpServices.reduce((sum, s) => sum + s.tools.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Tools</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {mcpServices.reduce((sum, s) => sum + s.prompts.length, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Prompts</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 