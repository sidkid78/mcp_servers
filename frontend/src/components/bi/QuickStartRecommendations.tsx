'use client';

import { Zap, TrendingUp, Users, DollarSign, Settings, ArrowRight, Clock } from 'lucide-react';

interface DataSource {
  name: string;
  format: string;
  size: number;
  estimatedRows: number;
  estimatedColumns: number;
  businessPotential: string;
  lastModified: Date;
}

interface QuickStartRecommendationsProps {
  discoveredSources: DataSource[];
  businessContext: string;
}

interface Recommendation {
  type: 'immediate' | 'strategic' | 'analytical';
  title: string;
  description: string;
  action: string;
  estimatedTime: string;
  icon: typeof TrendingUp;
  color: string;
  priority: 'high' | 'medium' | 'low';
}

export default function QuickStartRecommendations({ 
  discoveredSources, 
  businessContext 
}: QuickStartRecommendationsProps) {
  
  const recommendations = generateRecommendations(discoveredSources, businessContext);
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Zap className="h-5 w-5 text-yellow-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Quick Start Recommendations
        </h2>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <RecommendationCard key={index} recommendation={rec} />
        ))}
      </div>

      {/* Next Steps */}
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>Suggested Workflow Sequence</span>
        </h3>
        <div className="space-y-2 text-sm">
          {getWorkflowSequence(discoveredSources, businessContext).map((step, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {index + 1}
              </div>
              <span className="text-gray-700 dark:text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tips for Success */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          💡 Tips for Successful Analysis
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• Start with data profiling to understand quality and completeness</li>
          <li>• Define clear business questions before diving into analysis</li>
          <li>• Focus on actionable insights that can drive business decisions</li>
          <li>• Document findings and share with relevant stakeholders</li>
        </ul>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${recommendation.color} text-white`}>
            <recommendation.icon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {recommendation.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBadge(recommendation.priority)}`}>
                {recommendation.priority.toUpperCase()}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {recommendation.estimatedTime}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
        {recommendation.description}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {recommendation.action}
        </span>
        <ArrowRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
}

function generateRecommendations(
  sources: DataSource[], 
  businessContext: string
): Recommendation[] {
  const recommendations: Recommendation[] = [];
  
  // Based on number of data sources
  if (sources.length === 1) {
    const source = sources[0];
    recommendations.push({
      type: 'immediate',
      title: 'Single Dataset Deep Dive',
      description: `Start with comprehensive profiling of ${source.name} to understand data quality and business potential.`,
      action: 'Launch Insight Investigation workflow',
      estimatedTime: '15-30 min',
      icon: TrendingUp,
      color: 'bg-blue-500',
      priority: 'high'
    });
  } else {
    recommendations.push({
      type: 'analytical',
      title: 'Multi-Dataset Correlation Analysis',
      description: 'Explore relationships between your datasets to find hidden business insights.',
      action: 'Start Correlation Deep Dive analysis',
      estimatedTime: '20-40 min',
      icon: TrendingUp,
      color: 'bg-purple-500',
      priority: 'high'
    });
  }

  // Based on business context
  if (businessContext) {
    const contextLower = businessContext.toLowerCase();
    
    if (contextLower.includes('revenue') || contextLower.includes('sales') || contextLower.includes('financial')) {
      recommendations.push({
        type: 'strategic',
        title: 'Revenue Performance Analysis',
        description: 'Focus on financial metrics and revenue drivers aligned with your stated goals.',
        action: 'Configure revenue-focused insight investigation',
        estimatedTime: '20-35 min',
        icon: DollarSign,
        color: 'bg-green-500',
        priority: 'high'
      });
    }
    
    if (contextLower.includes('customer') || contextLower.includes('retention') || contextLower.includes('churn')) {
      recommendations.push({
        type: 'strategic',
        title: 'Customer Analytics Focus',
        description: 'Analyze customer behavior, retention patterns, and lifetime value optimization.',
        action: 'Launch customer-focused analysis workflow',
        estimatedTime: '25-40 min',
        icon: Users,
        color: 'bg-orange-500',
        priority: 'high'
      });
    }

    if (contextLower.includes('forecast') || contextLower.includes('trend') || contextLower.includes('predict')) {
      recommendations.push({
        type: 'analytical',
        title: 'Predictive Trend Analysis',
        description: 'Build forecasting models and identify future business opportunities.',
        action: 'Start trend analysis with forecasting',
        estimatedTime: '30-45 min',
        icon: TrendingUp,
        color: 'bg-blue-500',
        priority: 'medium'
      });
    }
  }

  // Based on data characteristics
  const hasTimeData = sources.some(s => 
    s.name.toLowerCase().includes('date') || 
    s.name.toLowerCase().includes('time') ||
    s.name.toLowerCase().includes('monthly') ||
    s.name.toLowerCase().includes('daily')
  );
  
  if (hasTimeData) {
    recommendations.push({
      type: 'analytical',
      title: 'Time-Series Pattern Detection',
      description: 'Your data appears to have temporal elements. Analyze trends and seasonal patterns.',
      action: 'Explore trend analysis workflow',
      estimatedTime: '25-45 min',
      icon: TrendingUp,
      color: 'bg-green-500',
      priority: 'medium'
    });
  }

  // Data quality recommendations
  const largeDatasets = sources.filter(s => s.size > 10 * 1024 * 1024); // > 10MB
  if (largeDatasets.length > 0) {
    recommendations.push({
      type: 'immediate',
      title: 'Data Quality Assessment',
      description: 'Large datasets detected. Run comprehensive data profiling to ensure quality.',
      action: 'Profile large datasets first',
      estimatedTime: '10-15 min',
      icon: Settings,
      color: 'bg-gray-500',
      priority: 'medium'
    });
  }

  // Executive summary recommendation
  if (businessContext && businessContext.length > 50) {
    recommendations.push({
      type: 'strategic',
      title: 'Executive Summary Preparation',
      description: 'Generate stakeholder-ready insights and recommendations based on your analysis.',
      action: 'Create executive summary after analysis',
      estimatedTime: '10-20 min',
      icon: Users,
      color: 'bg-purple-500',
      priority: 'low'
    });
  }

  // Sort by priority and return top 4
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  return recommendations
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 4);
}

function getWorkflowSequence(sources: DataSource[], businessContext: string): string[] {
  const sequence = [];
  
  if (sources.length === 1) {
    sequence.push('Start with Insight Investigation for comprehensive dataset analysis');
  } else {
    sequence.push('Begin with Correlation Deep Dive to understand dataset relationships');
  }
  
  const hasTimeData = sources.some(s => 
    s.name.toLowerCase().includes('date') || 
    s.name.toLowerCase().includes('time')
  );
  
  if (hasTimeData) {
    sequence.push('Follow with Trend Analysis for temporal pattern detection');
  }
  
  if (businessContext) {
    sequence.push('Generate Executive Summary tailored to your business context');
    sequence.push('Create Action Recommendations for strategic implementation');
  } else {
    sequence.push('Define business context and generate targeted recommendations');
  }
  
  sequence.push('Set up automated monitoring for ongoing insights');
  
  return sequence;
}
