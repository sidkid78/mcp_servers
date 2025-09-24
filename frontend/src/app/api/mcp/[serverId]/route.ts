import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'path';

// This would use the actual MCP client service in a real implementation
// For now, we'll create mock responses that match the expected format

interface McpResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  execution_time?: number;
}

interface ServerConfig {
  id: string;
  name: string;
  command: string;
  args: string[];
  cwd: string;
}

const serverConfigs: Record<string, ServerConfig> = {
  'learning-documentation': {
    id: 'learning-documentation',
    name: 'Learning Documentation',
    command: 'python',
    args: ['server_fastmcp.py'],
    cwd: path.join(process.cwd(), '..', 'mcp-servers', 'learning-documentation')
  },
  'smart-dev-env': {
    id: 'smart-dev-env',
    name: 'Smart Development Environment',
    command: 'python',
    args: ['server_fastmcp.py'],
    cwd: path.join(process.cwd(), '..', 'mcp-servers', 'smart-dev-env')
  },
  'project-management': {
    id: 'project-management',
    name: 'Project Management',
    command: 'python',
    args: ['server_fastmcp.py'],
    cwd: path.join(process.cwd(), '..', 'mcp-servers', 'project-management')
  },
  'infrastructure-automation': {
    id: 'infrastructure-automation',
    name: 'Infrastructure Automation',
    command: 'python',
    args: ['server_fastmcp.py'],
    cwd: path.join(process.cwd(), '..', 'mcp-servers', 'infrastructure-automation')
  },
  'business-intelligence': {
    id: 'business-intelligence',
    name: 'Business Intelligence',
    command: 'python',
    args: ['server_fastmcp.py'],
    cwd: path.join(process.cwd(), '..', 'mcp-servers', 'business-intelligence-mcp')
  }
};

// Cache for MCP clients
const clientCache = new Map<string, Client>();

// Helper function to create standardized MCP responses
function createMcpResponse(
  success: boolean,
  data?: unknown,
  error?: string,
  executionTime?: number
): McpResponse {
  const response: McpResponse = { success };
  
  if (data !== undefined) {
    response.data = data;
  }
  
  if (error !== undefined) {
    response.error = error;
  }
  
  if (executionTime !== undefined) {
    response.execution_time = executionTime;
  }
  
  return response;
}

// Helper function to handle errors and create error responses
function createErrorResponse(error: unknown, executionTime?: number): McpResponse {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  return createMcpResponse(false, undefined, errorMessage, executionTime);
}

async function getOrCreateClient(serverId: string): Promise<Client> {
  if (clientCache.has(serverId)) {
    return clientCache.get(serverId)!;
  }

  const config = serverConfigs[serverId];
  if (!config) {
    throw new Error(`Server configuration not found for ${serverId}`);
  }

  const transport = new StdioClientTransport({
    command: config.command,
    args: config.args,
    cwd: config.cwd
  });

  const client = new Client({
    name: "finale-mcp-client",
    version: "1.0.0"
  });

  await client.connect(transport);
  clientCache.set(serverId, client);
  
  return client;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  const { serverId } = await params;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const startTime = Date.now();

  const config = serverConfigs[serverId];
  if (!config) {
    const response = createErrorResponse(`Server ${serverId} not found`);
    return NextResponse.json(response, { status: 404 });
  }

  try {
    const client = await getOrCreateClient(serverId);

    switch (action) {
      case 'status':
        // Try to ping the server to check if it's alive
        try {
          await client.ping();
          const response = createMcpResponse(
            true,
            {
              serverId: config.id,
              name: config.name,
              status: 'active',
              connected: true,
              lastPing: new Date().toISOString()
            },
            undefined,
            Date.now() - startTime
          );
          return NextResponse.json(response);
        } catch (error) {
          const response = createMcpResponse(
            true,
            {
              serverId: config.id,
              name: config.name,
              status: 'error',
              connected: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            },
            undefined,
            Date.now() - startTime
          );
          return NextResponse.json(response);
        }

      case 'tools':
        const toolsResult = await client.listTools();
        const toolsResponse = createMcpResponse(
          true,
          {
            tools: toolsResult.tools || []
          },
          undefined,
          Date.now() - startTime
        );
        return NextResponse.json(toolsResponse);

      case 'prompts':
        const promptsResult = await client.listPrompts();
        const promptsResponse = createMcpResponse(
          true,
          {
            prompts: promptsResult.prompts || []
          },
          undefined,
          Date.now() - startTime
        );
        return NextResponse.json(promptsResponse);

      default:
        const defaultResponse = createMcpResponse(
          true,
          config,
          undefined,
          Date.now() - startTime
        );
        return NextResponse.json(defaultResponse);
    }
  } catch (error) {
    console.error(`Error with MCP server ${serverId}:`, error);
    const response = createErrorResponse(error, Date.now() - startTime);
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  const { serverId } = await params;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const startTime = Date.now();
  
  const config = serverConfigs[serverId];
  if (!config) {
    const response = createErrorResponse(`Server ${serverId} not found`);
    return NextResponse.json(response, { status: 404 });
  }

  try {
    const client = await getOrCreateClient(serverId);
    const body = await request.json();

    switch (action) {
      case 'call-tool':
        const { toolName, arguments: toolArgs } = body;

        const toolResult = await client.callTool({
          name: toolName,
          arguments: toolArgs || {}
        });

        const toolResponse = createMcpResponse(
          true,
          toolResult,
          undefined,
          Date.now() - startTime
        );
        return NextResponse.json(toolResponse);

      case 'get-prompt':
        const { promptName, arguments: promptArgs } = body;
        
        const promptResult = await client.getPrompt({
          name: promptName,
          arguments: promptArgs || {}
        });

        const promptResponse = createMcpResponse(
          true,
          promptResult,
          undefined,
          Date.now() - startTime
        );
        return NextResponse.json(promptResponse);

      default:
        const response = createErrorResponse(`Unknown action: ${action}`, Date.now() - startTime);
        return NextResponse.json(response, { status: 400 });
    }
  } catch (error) {
    console.error(`Error executing ${action} on ${serverId}:`, error);
    const response = createErrorResponse(error, Date.now() - startTime);
    return NextResponse.json(response, { status: 500 });
  }
}

// Internal cleanup helper (not exported to satisfy Next.js route constraints)
async function closeAllClients() {
  for (const [serverId, client] of clientCache.entries()) {
    try {
      await client.close();
      clientCache.delete(serverId);
    } catch (error) {
      console.error(`Error closing client for ${serverId}:`, error);
    }
  }
}
void closeAllClients;