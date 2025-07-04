'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import McpServiceClient from '@/lib/services/mcpService';

export default function McpTestPage() {
  const [selectedServer, setSelectedServer] = useState('learning-documentation');
  const [toolName, setToolName] = useState('create_tutorial');
  const [promptName, setPromptName] = useState('content-generation');
  const [toolArgs, setToolArgs] = useState('{"topic": "JavaScript Basics", "difficulty": "beginner"}');
  const [promptArgs, setPromptArgs] = useState('{"topic": "React Components", "audience": "developers"}');
  const [response, setResponse] = useState<unknown>(null);
  const [isLoading, setIsLoading] = useState(false);

  const servers = [
    { id: 'learning-documentation', name: 'Learning Documentation' },
    { id: 'smart-dev-env', name: 'Smart Development Environment' },
    { id: 'project-management', name: 'Project Management' },
    { id: 'infrastructure-automation', name: 'Infrastructure Automation' },
    { id: 'business-intelligence', name: 'Business Intelligence' }
  ];

  const handleTestTool = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      const client = new McpServiceClient(selectedServer);
      const args = toolArgs ? JSON.parse(toolArgs) : {};
      const result = await client.callTool(toolName, args);
      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestPrompt = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      const client = new McpServiceClient(selectedServer);
      const args = promptArgs ? JSON.parse(promptArgs) : {};
      const result = await client.callPrompt(promptName, args);
      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStatus = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      const client = new McpServiceClient(selectedServer);
      const result = await client.getStatus();
      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleListTools = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      const client = new McpServiceClient(selectedServer);
      const result = await client.listTools();
      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleListPrompts = async () => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      const client = new McpServiceClient(selectedServer);
      const result = await client.listPrompts();
      setResponse(result);
    } catch (error) {
      setResponse({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          MCP Client Test
        </h1>
        <p className="text-gray-600">
          Test the Model Context Protocol client connections
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Server Selection</CardTitle>
          <CardDescription>Choose an MCP server to test</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="server-select">MCP Server</Label>
              <select
                id="server-select"
                value={selectedServer}
                onChange={(e) => setSelectedServer(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                title="Select MCP Server"
              >
                {servers.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tool-name">Tool Name</Label>
                <Input
                  id="tool-name"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="e.g., create_tutorial"
                />
              </div>
              <div>
                <Label htmlFor="prompt-name">Prompt Name</Label>
                <Input
                  id="prompt-name"
                  value={promptName}
                  onChange={(e) => setPromptName(e.target.value)}
                  placeholder="e.g., content-generation"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tool-args">Tool Arguments (JSON)</Label>
                <textarea
                  id="tool-args"
                  value={toolArgs}
                  onChange={(e) => setToolArgs(e.target.value)}
                  placeholder='{"topic": "Example", "difficulty": "medium"}'
                  className="w-full p-2 border border-gray-300 rounded-md h-20 text-sm font-mono"
                />
              </div>
              <div>
                <Label htmlFor="prompt-args">Prompt Arguments (JSON)</Label>
                <textarea
                  id="prompt-args"
                  value={promptArgs}
                  onChange={(e) => setPromptArgs(e.target.value)}
                  placeholder='{"topic": "Example", "audience": "developers"}'
                  className="w-full p-2 border border-gray-300 rounded-md h-20 text-sm font-mono"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Actions</CardTitle>
          <CardDescription>Test different MCP operations</CardDescription>
        </CardHeader>
                 <CardContent>
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             <Button
               onClick={handleGetStatus}
               disabled={isLoading}
               variant="outline"
             >
               Get Status
             </Button>
             <Button
               onClick={handleListTools}
               disabled={isLoading}
               variant="outline"
             >
               List Tools
             </Button>
             <Button
               onClick={handleListPrompts}
               disabled={isLoading}
               variant="outline"
             >
               List Prompts
             </Button>
             <Button
               onClick={handleTestTool}
               disabled={isLoading}
               variant="outline"
             >
               Call Tool
             </Button>
             <Button
               onClick={handleTestPrompt}
               disabled={isLoading}
               variant="outline"
             >
               Execute Prompt
             </Button>
           </div>
         </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Response</CardTitle>
            <CardDescription>
              {response.success ? 'Success' : 'Error'} - 
              {response.execution_time && ` ${response.execution_time}ms`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-md overflow-auto text-sm">
              {JSON.stringify(response, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 