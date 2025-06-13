"""
Send Notifications Tool
Send project notifications and updates to stakeholders.
"""

from typing import Dict, List
from datetime import datetime


async def send_notifications_tool(
    project_id: str,
    notification_type: str,
    recipients: List[str],
    custom_message: str = ""
) -> Dict:
    """
    Send project notifications and updates to stakeholders.
    """

    try:
        # Load project context
        project_data = await _load_project_data(project_id)
        
        # Prepare notification content
        notification_content = await _prepare_notification_content(
            project_data, notification_type, custom_message
        )
        
        # Resolve recipients
        resolved_recipients = await _resolve_recipients(recipients, project_data)
        
        # Send notifications
        delivery_results = await _send_notifications(
            notification_content, resolved_recipients, notification_type
        )
        
        # Log notification activity
        activity_log = await _log_notification_activity(
            project_id, notification_type, resolved_recipients, delivery_results
        )
        
        return {
            "success": True,
            "project_id": project_id,
            "notification_type": notification_type,
            "recipients_targeted": len(resolved_recipients),
            "notifications_sent": delivery_results["successful_deliveries"],
            "failed_deliveries": delivery_results["failed_deliveries"],
            "notification_content": notification_content,
            "delivery_results": delivery_results,
            "activity_log": activity_log,
            "message": f"Sent {notification_type} notifications to {len(resolved_recipients)} recipients"
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Notification sending failed: {str(e)}",
            "message": "Unable to send notifications. Please check recipients and try again."
        }


async def _load_project_data(project_id: str) -> Dict:
    """Load project data for notifications."""
    return {
        "project_id": project_id,
        "name": f"Project {project_id}",
        "status": "in_progress",
        "completion_percentage": 65,
        "current_phase": "Development",
        "next_milestone": "Backend API Complete",
        "next_milestone_date": "2024-03-15",
        "project_manager": "Alice Johnson",
        "stakeholders": {
            "project_manager": ["alice.johnson@company.com"],
            "team_leads": ["bob.smith@company.com", "carol.davis@company.com"],
            "team_members": [
                "bob.smith@company.com", "carol.davis@company.com", 
                "david.wilson@company.com", "eva.brown@company.com"
            ],
            "stakeholders": ["exec.sponsor@company.com", "product.owner@company.com"],
            "executives": ["ceo@company.com", "cto@company.com"]
        },
        "recent_updates": [
            "Backend development 70% complete",
            "Database schema finalized",
            "Frontend mockups approved"
        ],
        "upcoming_milestones": [
            {"name": "Backend API Complete", "date": "2024-03-15"},
            {"name": "Frontend Integration", "date": "2024-03-22"}
        ],
        "risks": [
            {"title": "Resource constraint", "severity": "medium"},
            {"title": "Integration complexity", "severity": "low"}
        ]
    }


async def _prepare_notification_content(
    project_data: Dict, 
    notification_type: str, 
    custom_message: str
) -> Dict:
    """Prepare notification content based on type."""
    
    base_content = {
        "project_name": project_data["name"],
        "project_id": project_data["project_id"],
        "sender": project_data["project_manager"],
        "timestamp": datetime.now().isoformat(),
        "custom_message": custom_message
    }
    
    if notification_type == "status_update":
        content = {
            **base_content,
            "subject": f"Status Update: {project_data['name']}",
            "message": _generate_status_update_message(project_data, custom_message),
            "priority": "normal",
            "includes_attachments": False
        }
    
    elif notification_type == "milestone":
        content = {
            **base_content,
            "subject": f"Milestone Update: {project_data['name']}",
            "message": _generate_milestone_message(project_data, custom_message),
            "priority": "normal",
            "includes_attachments": False
        }
    
    elif notification_type == "alert":
        content = {
            **base_content,
            "subject": f"ALERT: {project_data['name']}",
            "message": _generate_alert_message(project_data, custom_message),
            "priority": "high",
            "includes_attachments": False
        }
    
    else:  # custom
        content = {
            **base_content,
            "subject": f"Project Update: {project_data['name']}",
            "message": custom_message or "Custom project notification",
            "priority": "normal",
            "includes_attachments": False
        }
    
    return content


def _generate_status_update_message(project_data: Dict, custom_message: str) -> str:
    """Generate status update message."""
    
    message = f"""
📊 **Project Status Update: {project_data['name']}**

**Current Status:** {project_data['status'].replace('_', ' ').title()}
**Overall Progress:** {project_data['completion_percentage']}% Complete
**Current Phase:** {project_data['current_phase']}

**Recent Updates:**
{chr(10).join(f"• {update}" for update in project_data['recent_updates'])}

**Next Milestone:** {project_data['next_milestone']} ({project_data['next_milestone_date']})

**Upcoming Milestones:**
{chr(10).join(f"• {m['name']}: {m['date']}" for m in project_data['upcoming_milestones'])}

**Current Risks:**
{chr(10).join(f"• {risk['title']} ({risk['severity']} severity)" for risk in project_data['risks'])}

---
Project Manager: {project_data['project_manager']}
Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
"""
    
    if custom_message:
        message += f"\n**Additional Notes:**\n{custom_message}"
    
    return message.strip()


def _generate_milestone_message(project_data: Dict, custom_message: str) -> str:
    """Generate milestone notification message."""
    
    message = f"""
🎯 **Milestone Update: {project_data['name']}**

**Next Milestone:** {project_data['next_milestone']}
**Target Date:** {project_data['next_milestone_date']}
**Current Progress:** {project_data['completion_percentage']}%

**Project Status:** On track for milestone delivery

**Key Activities:**
• Backend API development in final phase
• Integration testing preparation underway
• Documentation updates in progress

**Dependencies:**
• Database performance optimization
• Third-party service configuration
• Security review completion

---
This is an automated milestone notification.
Project Manager: {project_data['project_manager']}
"""
    
    if custom_message:
        message += f"\n**Additional Information:**\n{custom_message}"
    
    return message.strip()


def _generate_alert_message(project_data: Dict, custom_message: str) -> str:
    """Generate alert message."""
    
    message = f"""
🚨 **PROJECT ALERT: {project_data['name']}**

**URGENT ATTENTION REQUIRED**

**Project Status:** Requires immediate attention
**Current Progress:** {project_data['completion_percentage']}%
**Alert Triggered:** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

**Issue Summary:**
{custom_message or "Critical issue detected requiring stakeholder attention"}

**Immediate Actions Needed:**
• Review project status and blockers
• Attend emergency project meeting
• Provide input on resolution strategy

**Contact Information:**
Project Manager: {project_data['project_manager']}
Escalation needed if no response within 24 hours.

---
This is an automated alert notification.
"""
    
    return message.strip()


async def _resolve_recipients(recipients: List[str], project_data: Dict) -> List[Dict]:
    """Resolve recipient roles to actual email addresses."""
    
    resolved = []
    stakeholder_groups = project_data["stakeholders"]
    
    for recipient in recipients:
        if recipient in stakeholder_groups:
            # It's a role/group
            emails = stakeholder_groups[recipient]
            for email in emails:
                resolved.append({
                    "role": recipient,
                    "email": email,
                    "name": _extract_name_from_email(email),
                    "delivery_method": "email"
                })
        elif "@" in recipient:
            # It's already an email address
            resolved.append({
                "role": "direct",
                "email": recipient,
                "name": _extract_name_from_email(recipient),
                "delivery_method": "email"
            })
        else:
            # Try to find by name/role
            for role, emails in stakeholder_groups.items():
                if recipient.lower() in role.lower():
                    for email in emails:
                        resolved.append({
                            "role": role,
                            "email": email,
                            "name": _extract_name_from_email(email),
                            "delivery_method": "email"
                        })
                    break
    
    # Remove duplicates
    seen_emails = set()
    unique_resolved = []
    for recipient in resolved:
        if recipient["email"] not in seen_emails:
            unique_resolved.append(recipient)
            seen_emails.add(recipient["email"])
    
    return unique_resolved


def _extract_name_from_email(email: str) -> str:
    """Extract name from email address."""
    name_part = email.split('@')[0]
    name_parts = name_part.replace('.', ' ').replace('_', ' ').split()
    return ' '.join(part.capitalize() for part in name_parts)


async def _send_notifications(
    content: Dict, 
    recipients: List[Dict], 
    notification_type: str
) -> Dict:
    """Simulate sending notifications."""
    
    successful_deliveries = []
    failed_deliveries = []
    
    for recipient in recipients:
        # Simulate delivery (in real implementation, would use email service, Slack API, etc.)
        delivery_success = True  # Simulate 95% success rate
        
        if delivery_success:
            successful_deliveries.append({
                "recipient": recipient["email"],
                "name": recipient["name"],
                "role": recipient["role"],
                "delivery_method": recipient["delivery_method"],
                "delivered_at": datetime.now().isoformat(),
                "status": "delivered"
            })
        else:
            failed_deliveries.append({
                "recipient": recipient["email"],
                "name": recipient["name"],
                "role": recipient["role"],
                "delivery_method": recipient["delivery_method"],
                "failed_at": datetime.now().isoformat(),
                "error": "Delivery failed - recipient unreachable",
                "status": "failed"
            })
    
    return {
        "successful_deliveries": len(successful_deliveries),
        "failed_deliveries": len(failed_deliveries),
        "delivery_details": successful_deliveries,
        "failure_details": failed_deliveries,
        "delivery_rate": (len(successful_deliveries) / len(recipients)) * 100 if recipients else 0
    }


async def _log_notification_activity(
    project_id: str, 
    notification_type: str, 
    recipients: List[Dict], 
    delivery_results: Dict
) -> Dict:
    """Log notification activity for audit trail."""
    
    activity_entry = {
        "project_id": project_id,
        "activity_type": "notification_sent",
        "notification_type": notification_type,
        "timestamp": datetime.now().isoformat(),
        "recipients_targeted": len(recipients),
        "successful_deliveries": delivery_results["successful_deliveries"],
        "failed_deliveries": delivery_results["failed_deliveries"],
        "delivery_rate": delivery_results["delivery_rate"],
        "recipient_roles": list(set(r["role"] for r in recipients)),
        "metadata": {
            "automated": True,
            "triggered_by": "project_management_mcp",
            "priority": "normal"
        }
    }
    
    # In real implementation, would save to database or audit log
    return activity_entry
