import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import path from 'path';

// This would use the actual MCP client service in a real implementation
// For now, we'll create mock responses that match the expected format

interface McpResponse {
  success: boolean;
  data?: any;
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
    cwd: path.join(process.cwd(), '..', 'mcp-servers', 'business-intelligence')
  }
};

// Cache for MCP clients
const clientCache = new Map<string, Client>();

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

  const config = serverConfigs[serverId];
  if (!config) {
    return NextResponse.json({
      success: false,
      error: `Server ${serverId} not found`
    }, { status: 404 });
  }

  try {
    const client = await getOrCreateClient(serverId);

    switch (action) {
      case 'status':
        // Try to ping the server to check if it's alive
        try {
          await client.ping();
          return NextResponse.json({
            success: true,
            data: {
              serverId: config.id,
              name: config.name,
              status: 'active',
              connected: true,
              lastPing: new Date().toISOString()
            }
          });
        } catch (error) {
          return NextResponse.json({
            success: true,
            data: {
              serverId: config.id,
              name: config.name,
              status: 'error',
              connected: false,
              error: error instanceof Error ? error.message : 'Unknown error'
            }
          });
        }

      case 'tools':
        const toolsResult = await client.listTools();
        return NextResponse.json({
          success: true,
          data: {
            tools: toolsResult.tools || []
          }
        });

      case 'prompts':
        const promptsResult = await client.listPrompts();
        return NextResponse.json({
          success: true,
          data: {
            prompts: promptsResult.prompts || []
          }
        });

      default:
        return NextResponse.json({
          success: true,
          data: config
        });
    }
  } catch (error) {
    console.error(`Error with MCP server ${serverId}:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ serverId: string }> }
) {
  const { serverId } = await params;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  
  const config = serverConfigs[serverId];
  if (!config) {
    return NextResponse.json({
      success: false,
      error: `Server ${serverId} not found`
    }, { status: 404 });
  }

  try {
    const client = await getOrCreateClient(serverId);
    const body = await request.json();
    const startTime = Date.now();

    switch (action) {
      case 'call-tool':
        const { toolName, arguments: toolArgs } = body;
        
        const toolResult = await client.callTool({
          name: toolName,
          arguments: toolArgs || {}
        });

        return NextResponse.json({
          success: true,
          data: toolResult,
          execution_time: Date.now() - startTime
        });

      case 'get-prompt':
        const { promptName, arguments: promptArgs } = body;
        
        const promptResult = await client.getPrompt({
          name: promptName,
          arguments: promptArgs || {}
        });

        return NextResponse.json({
          success: true,
          data: promptResult,
          execution_time: Date.now() - startTime
        });

      default:
        return NextResponse.json({
          success: false,
          error: `Unknown action: ${action}`
        }, { status: 400 });
    }
  } catch (error) {
    console.error(`Error executing ${action} on ${serverId}:`, error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Cleanup function to close all connections
export async function cleanup() {
  for (const [serverId, client] of clientCache.entries()) {
    try {
      await client.close();
      clientCache.delete(serverId);
    } catch (error) {
      console.error(`Error closing client for ${serverId}:`, error);
    }
  }
} 