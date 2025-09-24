"use client"

import React from 'react';
import { InfrastructureAutomationUI } from '@/components/infrastructure-automation/InfrastructureAutomationUI';

export default function InfrastructureAutomationPage() {
  const executePrompt = async (action: string, data?: unknown) => {
    try {
      const response = await fetch('/api/infrastructure-automation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          data
        }),
      });

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Request failed');
      }

      return result.data;
    } catch (error) {
      console.error('Error executing infrastructure automation action:', error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <InfrastructureAutomationUI onExecutePrompt={executePrompt as (prompt: string, params?: unknown) => Promise<unknown>} />
    </div>
  );
}
