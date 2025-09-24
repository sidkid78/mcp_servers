import { NextRequest, NextResponse } from 'next/server';
import { mcpClientService } from '@/lib/services/mcpClientService';

export async function POST(req: NextRequest) {
  try {
    const { action, ...params } = await req.json();
    
    if (!action) {
      return NextResponse.json(
        { error: 'Action parameter is required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      // Tools
      case 'create-project':
        result = await mcpClientService.callTool('project-management', 'create_project', params);
        break;
      
      case 'assign-tasks':
        result = await mcpClientService.callTool('project-management', 'assign_tasks', params);
        break;
      
      case 'track-progress':
        result = await mcpClientService.callTool('project-management', 'track_progress', params);
        break;
      
      case 'identify-blockers':
        result = await mcpClientService.callTool('project-management', 'identify_blockers', params);
        break;
      
      case 'generate-timeline':
        result = await mcpClientService.callTool('project-management', 'generate_timeline', params);
        break;
      
      case 'send-notifications':
        result = await mcpClientService.callTool('project-management', 'send_notifications', params);
        break;

      // Prompts
      case 'project-kickoff':
        result = await mcpClientService.callPrompt('project-management', 'project_kickoff_prompt_handler', params);
        break;
      
      case 'milestone-planning':
        result = await mcpClientService.callPrompt('project-management', 'milestone_planning_prompt_handler', params);
        break;
      
      case 'resource-optimization':
        result = await mcpClientService.callPrompt('project-management', 'resource_optimization_prompt_handler', params);
        break;
      
      case 'risk-assessment':
        result = await mcpClientService.callPrompt('project-management', 'risk_assessment_prompt_handler', params);
        break;
      
      case 'progress-review':
        result = await mcpClientService.callPrompt('project-management', 'progress_review_prompt_handler', params);
        break;
      
      case 'delivery-planning':
        result = await mcpClientService.callPrompt('project-management', 'delivery_planning_prompt_handler', params);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}` },
          { status: 400 }
        );
    }

    if (!result?.success) {
      return NextResponse.json(
        { error: result?.error || 'Project Management MCP call failed' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      execution_time: result.execution_time,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Project Management API Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
