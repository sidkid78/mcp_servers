// This file will be used in a Node.js backend environment to connect to MCP servers
// Since we're in a browser environment, we'll need to create API endpoints that use this

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import path from "path";

interface McpServerConfig {
  id: string;
  name: string;
  transport: 'stdio' | 'streamable-http';
  command?: string;
  args?: string[];
  url?: string;
  cwd?: string;
}

interface McpResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  execution_time?: number;
}

class McpClientService {
  private clients: Map<string, Client> = new Map();
  private configs: Map<string, McpServerConfig> = new Map();

  constructor() {
    // Initialize with your MCP server configurations
    this.initializeConfigs();
  }

  private initializeConfigs() {
    const serverConfigs: McpServerConfig[] = [
      {
        id: 'learning-documentation',
        name: 'Learning Documentation',
        transport: 'stdio',
        command: 'python',
        args: ['server_fastmcp.py'],
        cwd: path.join(process.cwd(), '..', 'mcp-servers', 'learning-documentation')
      },
      {
        id: 'smart-dev-env',
        name: 'Smart Development Environment',
        transport: 'stdio',
        command: 'python',
        args: ['server_fastmcp.py'],
        cwd: path.join(process.cwd(), '..', 'mcp-servers', 'smart-dev-env')
      },
      {
        id: 'project-management',
        name: 'Project Management',
        transport: 'stdio',
        command: 'python',
        args: ['server_fastmcp.py'],
        cwd: path.join(process.cwd(), '..', 'mcp-servers', 'project-management')
      },
      {
        id: 'infrastructure-automation',
        name: 'Infrastructure Automation',
        transport: 'stdio',
        command: 'python',
        args: ['server_fastmcp.py'],
        cwd: path.join(process.cwd(), '..', 'mcp-servers', 'infrastructure-automation')
      },
      {
        id: 'business-intelligence',
        name: 'Business Intelligence',
        transport: 'stdio',
        command: 'python',
        args: ['server_fastmcp.py'],
        cwd: path.join(process.cwd(), '..', 'mcp-servers', 'business-intelligence-mcp')
      },
      {
        id: 'federal-assistance',
        name: 'Federal Assistance Intelligence',
        transport: 'stdio',
        command: 'python',
        args: ['server_fastmcp.py'],
        cwd: path.join(process.cwd(), '..', 'mcp-servers', 'federal-assistance')
      }
    ];

    serverConfigs.forEach(config => {
      this.configs.set(config.id, config);
    });
  }

  async connectToServer(serverId: string): Promise<boolean> {
    const config = this.configs.get(serverId);
    if (!config) {
      throw new Error(`Server configuration not found for ${serverId}`);
    }

    try {
      let transport;
      
      if (config.transport === 'stdio') {
        transport = new StdioClientTransport({
          command: config.command!,
          args: config.args || [],
          cwd: config.cwd
        });
      } else if (config.transport === 'streamable-http') {
        transport = new StreamableHTTPClientTransport(new URL(config.url!));
      } else {
        throw new Error(`Unsupported transport type: ${config.transport}`);
      }

      const client = new Client({
        name: "finale-frontend-client",
        version: "1.0.0"
      });

      await client.connect(transport);
      this.clients.set(serverId, client);
      
      console.log(`Successfully connected to ${config.name}`);
      return true;
    } catch (error) {
      console.error(`Failed to connect to ${config.name}:`, error);
      return false;
    }
  }

  async disconnectFromServer(serverId: string): Promise<void> {
    const client = this.clients.get(serverId);
    if (client) {
      await client.close();
      this.clients.delete(serverId);
    }
  }

  async callTool(serverId: string, toolName: string, args: Record<string, unknown> = {}): Promise<McpResponse> {
    const client = this.clients.get(serverId);
    if (!client) {
      // Try to connect first
      const connected = await this.connectToServer(serverId);
      if (!connected) {
        return {
          success: false,
          error: `Not connected to server ${serverId}`
        };
      }
    }

    try {
      const startTime = Date.now();
      const result = await this.clients.get(serverId)!.callTool({
        name: toolName,
        arguments: args as Record<string, string>
      });

      return {
        success: true,
        data: result,
        execution_time: Date.now() - startTime
      };
    } catch (error) {
      console.error(`Error calling tool ${toolName} on ${serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getPrompt(serverId: string, promptName: string, args: Record<string, unknown> = {}): Promise<McpResponse> {
    const client = this.clients.get(serverId);
    if (!client) {
      const connected = await this.connectToServer(serverId);
      if (!connected) {
        return {
          success: false,
          error: `Not connected to server ${serverId}`
        };
      }
    }

    try {
      const startTime = Date.now();
      const result = await this.clients.get(serverId)!.getPrompt({
        name: promptName,
        arguments: args as Record<string, string>
      });

      return {
        success: true,
        data: result,
        execution_time: Date.now() - startTime
      };
    } catch (error) {
      console.error(`Error getting prompt ${promptName} from ${serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async callPrompt(serverId: string, promptName: string, args: Record<string, unknown> = {}): Promise<McpResponse> {
    // callPrompt is an alias for getPrompt for consistency with API usage
    return this.getPrompt(serverId, promptName, args);
  }

  async listTools(serverId: string): Promise<McpResponse> {
    const client = this.clients.get(serverId);
    if (!client) {
      const connected = await this.connectToServer(serverId);
      if (!connected) {
        return {
          success: false,
          error: `Not connected to server ${serverId}`
        };
      }
    }

    try {
      const result = await this.clients.get(serverId)!.listTools();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error(`Error listing tools for ${serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async listPrompts(serverId: string): Promise<McpResponse> {
    const client = this.clients.get(serverId);
    if (!client) {
      const connected = await this.connectToServer(serverId);
      if (!connected) {
        return {
          success: false,
          error: `Not connected to server ${serverId}`
        };
      }
    }

    try {
      const result = await this.clients.get(serverId)!.listPrompts();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error(`Error listing prompts for ${serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async listResources(serverId: string): Promise<McpResponse> {
    const client = this.clients.get(serverId);
    if (!client) {
      const connected = await this.connectToServer(serverId);
      if (!connected) {
        return {
          success: false,
          error: `Not connected to server ${serverId}`
        };
      }
    }

    try {
      const result = await this.clients.get(serverId)!.listResources();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error(`Error listing resources for ${serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getServerStatus(serverId: string): Promise<McpResponse> {
    const client = this.clients.get(serverId);
    const config = this.configs.get(serverId);
    
    return {
      success: true,
      data: {
        connected: !!client,
        config: config,
        status: client ? 'connected' : 'disconnected'
      }
    };
  }

  getAvailableServers(): McpServerConfig[] {
    return Array.from(this.configs.values());
  }

  async disconnectAll(): Promise<void> {
    const disconnectPromises = Array.from(this.clients.keys()).map(serverId => 
      this.disconnectFromServer(serverId)
    );
    await Promise.all(disconnectPromises);
  }
}

// Singleton instance
export const mcpClientService = new McpClientService();
export default McpClientService; 