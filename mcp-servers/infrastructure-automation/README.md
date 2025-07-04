# Infrastructure Automation MCP Server

A comprehensive Model Context Protocol (MCP) server for infrastructure automation, monitoring, and management. This server provides intelligent workflows for DevOps operations, system administration, and infrastructure lifecycle management.

## Features

### 🚀 Agentic Workflows (Core Prompts)
- **`/infra-health-check`** - Comprehensive system assessment and health monitoring
- **`/deployment-strategy`** - Guided deployment planning with best practices
- **`/scaling-analysis`** - Intelligent capacity planning and auto-scaling recommendations
- **`/incident-response`** - Automated incident detection and response workflows
- **`/security-audit`** - Infrastructure security assessment and compliance checking
- **`/disaster-recovery`** - Backup verification and recovery workflow orchestration

### 🔧 Individual Tools
- **`monitor_services`** - Real-time service monitoring and health checks
- **`deploy_application`** - Application deployment with multiple strategies
- **`scale_resources`** - Resource scaling and capacity management
- **`backup_data`** - Data backup with configurable policies
- **`rotate_secrets`** - Security credential rotation and management
- **`analyze_logs`** - Log analysis for patterns, errors, and anomalies

## Installation

### Prerequisites
- Python 3.8+
- Access to infrastructure systems (cloud providers, monitoring tools, etc.)
- Appropriate permissions for infrastructure operations

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mcp-servers/infrastructure-automation
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your infrastructure credentials
   ```

4. **Run the server:**
   ```bash
   python server.py
   ```

## Configuration

Create a `.env` file with the following variables:

```env
# Cloud Provider Credentials
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AZURE_SUBSCRIPTION_ID=your_azure_subscription

# Monitoring Configuration
MONITORING_ENDPOINTS=http://prometheus:9090,http://grafana:3000
LOG_AGGREGATION_URL=your_log_system_url

# Security Settings
SECRET_ROTATION_SCHEDULE=weekly
BACKUP_RETENTION_DAYS=30

# Notification Settings
SLACK_WEBHOOK_URL=your_slack_webhook
EMAIL_SMTP_SERVER=your_smtp_server
```

## Usage Examples

### Quick Start
```bash
# Get an overview of all capabilities
/list-capabilities

# Start with a comprehensive health check
/infra-health-check

# Based on results, choose your next action:
/deployment-strategy production
# OR
/scaling-analysis web-tier
# OR
/incident-response critical
```

### Health Monitoring Workflow
```bash
# 1. Run comprehensive health check
/infra-health-check

# Example output and next steps:
# "✅ Most services healthy
#  ⚠️  High CPU on web servers (85% avg)
#  🔴 Database connection pool exhausted
#  
#  Suggested actions:
#  - Run /scaling-analysis web-tier for CPU issues
#  - Run /incident-response database for immediate fix"

# 2. Follow recommended action
/scaling-analysis web-tier

# 3. Implement scaling based on recommendations
# (The prompt will guide you through the process)
```

### Deployment Strategy Workflow
```bash
# 1. Plan deployment strategy
/deployment-strategy production

# Example guided experience:
# "Analyzing production environment...
#  Current: 3 web servers, 2 API servers, 1 database
#  Recommended: Blue-green deployment
#  
#  Steps:
#  1. Create green environment
#  2. Deploy to green
#  3. Run health checks
#  4. Switch traffic
#  
#  Ready to proceed? Run /deploy-application with blue-green strategy"

# 2. Execute deployment
deploy_application --app_name="my-api" --environment="production" --deployment_type="blue_green"
```

### Incident Response Workflow
```bash
# 1. Trigger incident response
/incident-response

# "🚨 Incident detected: API response time > 5s
#  Affected services: user-api, payment-api
#  Severity: High
#  
#  Immediate actions taken:
#  - Scaled API servers from 2 to 6 instances
#  - Enabled circuit breakers
#  
#  Run /analyze-logs to investigate root cause
#  Run /security-audit if security incident suspected"

# 2. Investigate logs
analyze_logs --log_source="api" --time_range="30m" --pattern="error|timeout"

# 3. Follow up actions based on findings
```

## Available Tools

### monitor_services
Real-time monitoring of infrastructure services and health checks.

```python
monitor_services(
    service_filter="all",  # Filter: service name, tag, or "all"
    metrics="standard",    # standard, detailed, or performance
    alert_threshold=80     # Alert threshold percentage (0-100)
)
```

### deploy_application
Deploy applications with various deployment strategies.

```python
deploy_application(
    app_name="my-app",           # Required: Name of application
    environment="staging",       # staging, production, dev
    deployment_type="rolling",   # rolling, blue_green, canary
    health_check=True           # Perform health checks during deployment
)
```

### scale_resources
Scale infrastructure resources up or down based on demand.

```python
scale_resources(
    resource_type="compute",    # compute, storage, network
    target_capacity=150,        # Desired capacity (% or absolute)
    auto_scaling=True,         # Enable automatic scaling policies
    metrics_based=True         # Use metrics-based scaling decisions
)
```

### backup_data
Backup critical data with configurable policies.

```python
backup_data(
    data_source="production-db",  # Source system, database, or path
    backup_type="incremental",    # full, incremental, differential
    retention_days=30,           # Number of days to retain backups
    verify=True                  # Verify backup integrity after creation
)
```

### rotate_secrets
Rotate security credentials and secrets safely.

```python
rotate_secrets(
    secret_type="api_keys",     # api_keys, certificates, passwords, database
    environment="all",          # Target environment or "all"
    force_rotation=False,       # Force rotation even if not due
    notify=True                 # Send notifications about rotation status
)
```

### analyze_logs
Analyze logs for patterns, errors, and anomalies.

```python
analyze_logs(
    log_source="application",   # application, system, security, or specific service
    time_range="1h",           # 15m, 1h, 6h, 24h, 7d
    log_level="ERROR",         # DEBUG, INFO, WARN, ERROR, FATAL
    pattern=""                 # Optional regex pattern to search for
)
```

## Guided Workflows

### 1. New Environment Setup
```bash
/infra-health-check          # Assess current state
→ /security-audit            # Ensure security compliance
→ /deployment-strategy       # Plan deployment approach
→ /disaster-recovery         # Set up backup/recovery
```

### 2. Performance Optimization
```bash
/infra-health-check          # Identify bottlenecks
→ /scaling-analysis          # Analyze scaling needs
→ scale_resources            # Implement scaling
→ monitor_services           # Verify improvements
```

### 3. Security Maintenance
```bash
/security-audit              # Comprehensive security check
→ rotate_secrets             # Update credentials
→ backup_data               # Ensure data protection
→ analyze_logs              # Check for security events
```

### 4. Incident Management
```bash
/incident-response           # Immediate response
→ analyze_logs              # Investigate cause
→ /scaling-analysis         # Prevent recurrence
→ /disaster-recovery        # Verify recovery procedures
```

## Best Practices

### Workflow Orchestration
- Always start with `/infra-health-check` for situational awareness
- Use guided workflows for complex operations
- Follow the suggested next steps from prompt outputs
- Combine tools for comprehensive solutions

### Monitoring and Alerting
- Set appropriate alert thresholds based on your SLA requirements
- Use detailed metrics for troubleshooting, standard for regular monitoring
- Analyze logs regularly to catch issues early

### Security
- Rotate secrets on a regular schedule (weekly/monthly recommended)
- Always verify backups after creation
- Run security audits before major deployments

### Performance
- Use metrics-based auto-scaling for dynamic workloads
- Monitor resource utilization trends to optimize costs
- Plan capacity increases before reaching 80% utilization

## Integration

This MCP server integrates with:
- **Cloud Providers:** AWS, Azure, GCP
- **Monitoring Tools:** Prometheus, Grafana, DataDog, New Relic
- **CI/CD Platforms:** Jenkins, GitLab CI, GitHub Actions
- **Container Orchestration:** Kubernetes, Docker Swarm
- **Infrastructure as Code:** Terraform, CloudFormation, Ansible

## Troubleshooting

### Common Issues

**Connection timeouts:**
```bash
# Check network connectivity
monitor_services --service_filter="network"

# Analyze network logs
analyze_logs --log_source="system" --pattern="timeout|connection"
```

**Permission errors:**
```bash
# Verify credentials are properly configured
/security-audit

# Check service account permissions
monitor_services --service_filter="auth"
```

**High resource usage:**
```bash
# Immediate scaling
/incident-response

# Long-term optimization
/scaling-analysis
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the repository
- Check the [documentation](docs/)
- Review the [troubleshooting guide](docs/troubleshooting.md)

---

**Next Steps:** After installation, run `/list-capabilities` to see all available functions, then start with `/infra-health-check` to assess your current infrastructure state.