'use client';

import { useState } from 'react';
import { Brain, Lightbulb, Target, AlertTriangle, CheckCircle } from 'lucide-react';

interface DataSource {
  name: string;
  format: string;
  size: number;
  estimatedRows: number;
  estimatedColumns: number;
  businessPotential: string;
  lastModified: Date;
}

interface BusinessContextCardProps {
  businessContext: string;
  onBusinessContextChange: (context: string) => void;
  discoveredSources: DataSource[];
}

export default function BusinessContextCard({ 
  businessContext, 
  onBusinessContextChange, 
  discoveredSources 
}: BusinessContextCardProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Generate context suggestions based on discovered data
  const contextSuggestions = generateContextSuggestions(discoveredSources);
  const contextAlignment = analyzeContextAlignment(discoveredSources, businessContext);
  const autoDetectedAreas = autoDetectBusinessAreas(discoveredSources);

  const handleSuggestionClick = (suggestion: string) => {
    onBusinessContextChange(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Business Context Analysis
        </h2>
      </div>

      {/* Business Context Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          What business questions are you looking to answer?
        </label>
        <div className="relative">
          <textarea
            value={businessContext}
            onChange={(e) => onBusinessContextChange(e.target.value)}
            placeholder="e.g., We want to understand what drives customer retention and identify opportunities to increase revenue from our premium segments..."
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            rows={4}
          />
          <button
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="absolute bottom-2 right-2 text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {showSuggestions ? 'Hide suggestions' : 'Show suggestions'}
          </button>
        </div>
      </div>

      {/* Context Suggestions */}
      {showSuggestions && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="h-4 w-4 text-blue-600" />
            <h4 className="font-medium text-blue-800 dark:text-blue-200">Suggested Context Areas</h4>
          </div>
          <div className="space-y-2">
            {contextSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="block w-full text-left p-2 text-sm text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 rounded transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Context Analysis */}
      {businessContext ? (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="h-4 w-4 text-green-600" />
            <h4 className="font-medium text-gray-900 dark:text-white">Context-Data Alignment</h4>
          </div>
          <div className="space-y-2">
            {contextAlignment.map((alignment, index) => (
              <div key={index} className="flex items-start space-x-2 text-sm">
                {alignment.type === 'match' ? (
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                )}
                <span className={alignment.type === 'match' ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}>
                  {alignment.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-white mb-2">Business Context Not Provided</h4>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>Consider these questions to help frame your analysis:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>What business decisions will this analysis support?</li>
              <li>What time period should the analysis focus on?</li>
              <li>Are there specific KPIs or metrics of interest?</li>
              <li>What are the main challenges your business is facing?</li>
            </ul>
          </div>
        </div>
      )}

      {/* Auto-Detected Business Areas */}
      <div>
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Auto-Detected Business Areas</h4>
        <div className="space-y-2">
          {autoDetectedAreas.map((area, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-gray-700 dark:text-gray-300">{area}</span>
            </div>
          ))}
          {autoDetectedAreas.length === 0 && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              No specific business areas detected from file names
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function generateContextSuggestions(sources: DataSource[]): string[] {
  const suggestions = [];
  
  // Based on file names and detected business areas
  const hasFinancialData = sources.some(s => 
    s.name.toLowerCase().includes('sales') || 
    s.name.toLowerCase().includes('revenue') || 
    s.name.toLowerCase().includes('financial')
  );
  
  const hasCustomerData = sources.some(s => 
    s.name.toLowerCase().includes('customer') || 
    s.name.toLowerCase().includes('client') || 
    s.name.toLowerCase().includes('user')
  );
  
  const hasProductData = sources.some(s => 
    s.name.toLowerCase().includes('product') || 
    s.name.toLowerCase().includes('inventory') || 
    s.name.toLowerCase().includes('catalog')
  );
  
  if (hasFinancialData) {
    suggestions.push("We want to understand revenue trends and identify our most profitable customer segments to optimize pricing strategies.");
    suggestions.push("Our goal is to analyze sales performance across different regions and time periods to improve forecasting accuracy.");
  }
  
  if (hasCustomerData) {
    suggestions.push("We need to identify factors that drive customer retention and reduce churn to improve lifetime value.");
    suggestions.push("Our objective is to segment customers based on behavior and value to create targeted marketing campaigns.");
  }
  
  if (hasProductData) {
    suggestions.push("We want to analyze product performance and inventory optimization to improve margins and reduce waste.");
  }
  
  // General suggestions
  suggestions.push("We're looking to identify operational inefficiencies and opportunities for process optimization.");
  suggestions.push("Our focus is on understanding market trends and competitive positioning to inform strategic decisions.");
  
  return suggestions.slice(0, 4); // Limit to top 4 suggestions
}

function analyzeContextAlignment(sources: DataSource[], context: string): Array<{type: 'match' | 'warning', message: string}> {
  if (!context) return [];
  
  const contextLower = context.toLowerCase();
  const alignments = [];
  
  // Check for alignment with data sources
  const sourceNames = sources.map(s => s.name.toLowerCase()).join(' ');
  
  if (contextLower.includes('revenue') || contextLower.includes('sales') || contextLower.includes('financial')) {
    if (sourceNames.includes('sales') || sourceNames.includes('revenue') || sourceNames.includes('financial')) {
      alignments.push({
        type: 'match' as const,
        message: 'Financial/sales data detected that aligns with revenue analysis goals'
      });
    } else {
      alignments.push({
        type: 'warning' as const,
        message: 'Revenue analysis requested but no obvious financial data files detected'
      });
    }
  }
  
  if (contextLower.includes('customer') || contextLower.includes('retention') || contextLower.includes('churn')) {
    if (sourceNames.includes('customer') || sourceNames.includes('client') || sourceNames.includes('user')) {
      alignments.push({
        type: 'match' as const,
        message: 'Customer data detected that supports retention and behavior analysis'
      });
    } else {
      alignments.push({
        type: 'warning' as const,
        message: 'Customer analysis requested but no obvious customer data files detected'
      });
    }
  }
  
  if (contextLower.includes('product') || contextLower.includes('inventory')) {
    if (sourceNames.includes('product') || sourceNames.includes('inventory') || sourceNames.includes('catalog')) {
      alignments.push({
        type: 'match' as const,
        message: 'Product/inventory data detected that supports product analysis goals'
      });
    }
  }
  
  if (alignments.length === 0) {
    alignments.push({
      type: 'warning' as const,
      message: 'Consider running detailed profiling to identify data alignment with stated goals'
    });
  }
  
  return alignments;
}

function autoDetectBusinessAreas(sources: DataSource[]): string[] {
  const detectedAreas = new Set<string>();
  
  sources.forEach(source => {
    const nameLower = source.name.toLowerCase();
    
    if (nameLower.includes('sales') || nameLower.includes('revenue') || nameLower.includes('financial')) {
      detectedAreas.add('💰 Financial & Sales Analysis');
    }
    
    if (nameLower.includes('customer') || nameLower.includes('client') || nameLower.includes('user')) {
      detectedAreas.add('👥 Customer Analytics');
    }
    
    if (nameLower.includes('product') || nameLower.includes('inventory') || nameLower.includes('catalog')) {
      detectedAreas.add('📦 Product & Inventory Analysis');
    }
    
    if (nameLower.includes('marketing') || nameLower.includes('campaign') || nameLower.includes('ad')) {
      detectedAreas.add('📈 Marketing Analytics');
    }
    
    if (nameLower.includes('operation') || nameLower.includes('process') || nameLower.includes('workflow')) {
      detectedAreas.add('⚙️ Operational Analytics');
    }
    
    if (nameLower.includes('employee') || nameLower.includes('hr') || nameLower.includes('staff')) {
      detectedAreas.add('👤 HR & Employee Analytics');
    }
  });
  
  if (detectedAreas.size === 0) {
    detectedAreas.add('📊 General business data detected');
  }
  
  return Array.from(detectedAreas).sort();
}
