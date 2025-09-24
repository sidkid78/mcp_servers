import { NextRequest, NextResponse } from 'next/server';
import { mcpClientService } from '@/lib/services/mcpClientService';

// This endpoint connects to the infrastructure-automation MCP server
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    // Connect to the infrastructure-automation MCP server
    const serverId = 'infrastructure-automation';
    
    switch (action) {
      case 'monitor_services': {
        const result = await mcpClientService.callTool(serverId, 'monitor_services', {
          service_filter: data?.service_filter || 'all',
          metrics: data?.metrics || 'standard',
          alert_threshold: data?.alert_threshold || 80.0
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'deploy_application': {
        const result = await mcpClientService.callTool(serverId, 'deploy_application', {
          app_name: data?.app_name || '',
          environment: data?.environment || 'staging',
          deployment_type: data?.deployment_type || 'rolling',
          health_check: data?.health_check !== false
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'scale_resources': {
        const result = await mcpClientService.callTool(serverId, 'scale_resources', {
          resource_type: data?.resource_type || 'compute',
          target_capacity: data?.target_capacity || 100,
          auto_scaling: data?.auto_scaling !== false,
          metrics_based: data?.metrics_based !== false
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'backup_data': {
        const result = await mcpClientService.callTool(serverId, 'backup_data', {
          data_source: data?.data_source || '',
          backup_type: data?.backup_type || 'incremental',
          retention_days: data?.retention_days || 30,
          verify: data?.verify !== false
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'rotate_secrets': {
        const result = await mcpClientService.callTool(serverId, 'rotate_secrets', {
          secret_type: data?.secret_type || 'api_keys',
          environment: data?.environment || 'all',
          force_rotation: data?.force_rotation || false,
          notify: data?.notify !== false
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'analyze_logs': {
        const result = await mcpClientService.callTool(serverId, 'analyze_logs', {
          log_source: data?.log_source || 'application',
          time_range: data?.time_range || '1h',
          log_level: data?.log_level || 'ERROR',
          pattern: data?.pattern || ''
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      // Prompt-based actions
      case 'infra-health-check': {
        const result = await mcpClientService.getPrompt(serverId, 'infra-health-check', {
          scope: data?.scope || 'all'
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'deployment-strategy': {
        const result = await mcpClientService.getPrompt(serverId, 'deployment-strategy', {
          application: data?.application || '',
          target_env: data?.target_env || 'production'
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'scaling-analysis': {
        const result = await mcpClientService.getPrompt(serverId, 'scaling-analysis', {
          resource_focus: data?.resource_focus || 'compute',
          capacity_target: data?.capacity_target || 'auto'
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'incident-response': {
        const result = await mcpClientService.getPrompt(serverId, 'incident-response', {
          incident_type: data?.incident_type || 'service-outage',
          severity: data?.severity || 'medium'
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'security-audit': {
        const result = await mcpClientService.getPrompt(serverId, 'security-audit', {
          audit_scope: data?.audit_scope || 'full',
          compliance_framework: data?.compliance_framework || ''
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      case 'disaster-recovery': {
        const result = await mcpClientService.getPrompt(serverId, 'disaster-recovery', {
          scenario: data?.scenario || 'full-outage',
          rto_target: data?.rto_target || '4h'
        });
        
        if (result.success) {
          return NextResponse.json({ success: true, data: result.data });
        } else {
          return NextResponse.json({ success: false, error: result.error });
        }
      }

      default:
        return NextResponse.json({ 
          success: false, 
          error: `Unknown action: ${action}` 
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Infrastructure automation API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
