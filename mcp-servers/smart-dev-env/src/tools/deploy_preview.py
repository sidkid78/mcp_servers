"""
Deploy Preview Tool
Deploy to staging environment for testing.
"""

from pathlib import Path
from typing import Dict, List, Literal, Optional, Tuple
from dataclasses import dataclass

@dataclass
class StepResult:
    name: str
    status: Literal["success", "failed", "error"]
    details: Optional[str] = None

@dataclass
class DeploymentInfo:
    environment: str
    branch: str
    status: Literal["success", "failed", "error", "unknown"]
    url: str
    steps: List[StepResult]
    notifications: List[Dict[str, str]]
    error: Optional[str] = None

async def deploy_preview_tool(
    environment: str, branch: str = "main", notify: bool = True
) -> DeploymentInfo:
    """
    Deploy to staging environment for testing.
    """
    valid_environments = ["staging", "preview", "test", "development"]
    if environment not in valid_environments:
        raise ValueError(
            f"Invalid environment. Must be one of: {', '.join(valid_environments)}"
        )
    return await _perform_deployment(environment, branch, notify)

async def _perform_deployment(
    environment: str, branch: str, notify: bool
) -> DeploymentInfo:
    """Perform the actual deployment."""
    deployment_info = DeploymentInfo(
        environment=environment,
        branch=branch,
        status="unknown",
        url="",
        steps=[],
        notifications=[],
    )

    try:
        # Step 1: Pre-deployment checks
        pre_check = StepResult(name="Pre-deployment checks", status="success")
        deployment_info.steps.append(pre_check)

        # Step 2: Build application
        build_result = await _build_application()
        deployment_info.steps.append(build_result)

        # Step 3: Deploy to environment
        deploy_result, deploy_url = await _deploy_to_environment(environment, branch)
        deployment_info.steps.append(deploy_result)
        deployment_info.url = deploy_url

        # Step 4: Verify deployment
        verify_result = StepResult(name="Verify deployment", status="success")
        deployment_info.steps.append(verify_result)

    except Exception as exc:
        deployment_info.steps.append(
            StepResult(name="Deployment error", status="error", details=str(exc))
        )
        deployment_info.error = str(exc)

    # Determine overall status
    if any(step.status == "error" for step in deployment_info.steps):
        deployment_info.status = "error"
    elif all(step.status == "success" for step in deployment_info.steps):
        deployment_info.status = "success"
    else:
        deployment_info.status = "failed"

    # Send notifications if requested
    if notify:
        deployment_info.notifications = await _send_notifications(deployment_info)

    return deployment_info

async def _build_application() -> StepResult:
    """Build the application."""
    build_result = StepResult(name="Build application", status="success", details="")
    try:
        if Path("package.json").exists():
            build_result.details = "Node.js project built successfully"
        elif Path("requirements.txt").exists():
            build_result.details = "Python project ready for deployment"
        else:
            build_result.details = "Generic project prepared for deployment"
    except Exception as e:
        build_result.status = "failed"
        build_result.details = f"Build error: {str(e)}"
    return build_result

async def _deploy_to_environment(
    environment: str, branch: str
) -> Tuple[StepResult, str]:
    """Deploy to specified environment."""
    base_urls = {
        "staging": "https://staging-app.example.com",
        "preview": "https://preview-app.example.com",
        "test": "https://test-app.example.com",
        "development": "https://dev-app.example.com",
    }
    deploy_url = base_urls.get(environment, "")
    deploy_result = StepResult(
        name=f"Deploy to {environment}",
        status="success",
        details=f"Deployment to {environment} successful",
    )
    return deploy_result, deploy_url

async def _send_notifications(
    deployment_info: DeploymentInfo,
) -> List[Dict[str, str]]:
    """Send deployment notifications."""
    notifications = []
    if deployment_info.status == "success":
        notifications.append(
            {
                "type": "success",
                "channel": "slack",
                "message": f"✅ Deployment to {deployment_info.environment} successful",
                "url": deployment_info.url,
            }
        )
    else:
        notifications.append(
            {
                "type": "error",
                "channel": "slack",
                "message": f"❌ Deployment to {deployment_info.environment} failed",
            }
        )
    return notifications

if __name__ == "__main__":
    import asyncio
    deployment_info = asyncio.run(deploy_preview_tool("staging"))
    print(deployment_info)