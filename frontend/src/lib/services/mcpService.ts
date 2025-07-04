interface McpResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  execution_time?: number;
}

class McpService {
  private baseUrl: string;
  private serverId: string;

  constructor(serverId: string, baseUrl: string = '/api/mcp') {
    this.serverId = serverId;
    this.baseUrl = baseUrl;
  }

  async callTool(toolName: string, args: Record<string, unknown> = {}): Promise<McpResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.serverId}?action=call-tool`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toolName, arguments: args }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error calling tool ${toolName}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async callPrompt(promptName: string, args: Record<string, unknown> = {}): Promise<McpResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.serverId}?action=get-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ promptName, arguments: args }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error calling prompt ${promptName}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getStatus(): Promise<McpResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.serverId}?action=status`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error getting status for ${this.serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async listTools(): Promise<McpResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.serverId}?action=tools`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error getting tools for ${this.serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async listPrompts(): Promise<McpResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/${this.serverId}?action=prompts`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error getting prompts for ${this.serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Legacy method for backwards compatibility
  async getCapabilities(): Promise<McpResponse> {
    try {
      const [toolsResponse, promptsResponse] = await Promise.all([
        this.listTools(),
        this.listPrompts()
      ]);

      if (toolsResponse.success && promptsResponse.success) {
        return {
          success: true,
          data: {
            tools: (toolsResponse.data as { tools?: unknown[] })?.tools || [],
            prompts: (promptsResponse.data as { prompts?: unknown[] })?.prompts || []
          }
        };
      } else {
        throw new Error('Failed to get capabilities');
      }
    } catch (error) {
      console.error(`Error getting capabilities for ${this.serverId}:`, error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

// Create service instances for each MCP server
export const learningDocumentationService = new McpService('learning-documentation');
export const smartDevEnvService = new McpService('smart-dev-env');
export const projectManagementService = new McpService('project-management');
export const infrastructureAutomationService = new McpService('infrastructure-automation');
export const businessIntelligenceService = new McpService('business-intelligence');

export default McpService; 