'use client';

import React, { useState } from 'react';
import { ProjectManagementUI } from '@/components/project-management/ProjectManagementUI';
import ReactMarkdown from 'react-markdown';

interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  details?: string;
}

export default function ProjectManagementPage() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const executePrompt = async (action: string, params?: unknown): Promise<unknown> => {
    try {
      setError(null);
      setResponse(null);

      const response = await fetch('/api/project-management', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          typeof params === 'object' && params !== null
            ? { action, ...(params as Record<string, unknown>) }
            : { action }
        ),
      });

      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'API call failed');
      }

      // Format the response for display
      let formattedResponse = '';
      
      if (data.data) {
        if (typeof data.data === 'string') {
          formattedResponse = data.data;
        } else if (typeof data.data === 'object' && data.data !== null && 'content' in (data.data as Record<string, unknown>) && Array.isArray((data.data as { content?: unknown[] }).content)) {
          // Handle MCP response format
          formattedResponse = (data.data as { content: unknown[] }).content
            .map((item: unknown) => (item as { text?: string }).text || JSON.stringify(item, null, 2))
            .join('\n\n');
        } else {
          formattedResponse = JSON.stringify(data.data, null, 2);
        }
      }

      setResponse(formattedResponse);
      return data.data;

    } catch (error) {
      console.error('Error executing prompt:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 dark:from-gray-900 dark:to-purple-950">
      <ProjectManagementUI onExecutePrompt={executePrompt} />
      
      {/* Response Display */}
      {response && (
        <div className="max-w-7xl mx-auto p-6 mt-6">
          <div className="bg-white/70 backdrop-blur-sm border-0 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-800 dark:text-purple-300">
              Project Management Analysis Results
            </h3>
            <div className="prose max-w-none dark:prose-invert text-sm">
              <ReactMarkdown 
                components={{
                  // Custom styling for code blocks
                  code: ({ children, ...props }) => (
                    <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs" {...props}>
                      {children}
                    </code>
                  ),
                  pre: ({ children, ...props }) => (
                    <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg overflow-auto text-xs" {...props}>
                      {children}
                    </pre>
                  ),
                }}
              >
                {response}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="max-w-7xl mx-auto p-6 mt-6">
          <div className="bg-red-100/70 backdrop-blur-sm border border-red-300 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-red-800 dark:text-red-300">
              Error
            </h3>
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
