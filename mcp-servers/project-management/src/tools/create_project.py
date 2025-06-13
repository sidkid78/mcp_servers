"""
Create Project Tool
Initialize project structure and workspace.
"""

import uuid
import json
from datetime import datetime
from typing import Dict, List


async def create_project_tool(
    name: str,
    description: str = "",
    team_size: int = 5,
    duration_weeks: int = 12
) -> Dict:
    """
    Create and initialize a new project structure.
    """

    try:
        # Generate project metadata
        project_id = f"proj_{uuid.uuid4().hex[:8]}"
        
        # Create project structure
        project_structure = await _create_project_structure(
            project_id, name, description, team_size, duration_weeks
        )
        
        # Initialize project workspace
        workspace = await _initialize_workspace(project_structure)
        
        # Set up project templates
        templates = await _setup_project_templates(project_structure)
        
        # Create initial tracking setup
        tracking_setup = await _setup_project_tracking(project_structure)
        
        return {
            "success": True,
            "project_id": project_id,
            "project_structure": project_structure,
            "workspace": workspace,
            "templates": templates,
            "tracking": tracking_setup,
            "message": f"Project '{name}' created successfully with ID: {project_id}",
            "next_steps": [
                f"Run /project-management/milestone-planning {project_id} to break down project phases",
                f"Use assign-tasks tool to allocate work to team members",
                f"Set up progress tracking with track-progress tool"
            ]
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Failed to create project: {str(e)}",
            "message": "Project creation failed. Please check parameters and try again."
        }


async def _create_project_structure(
    project_id: str, 
    name: str, 
    description: str, 
    team_size: int, 
    duration_weeks: int
) -> Dict:
    """Create the core project structure."""
    
    # Determine project type based on name/description
    project_type = _infer_project_type(name, description)
    
    # Calculate project phases
    phases = _generate_default_phases(project_type, duration_weeks)
    
    # Estimate complexity
    complexity = _estimate_complexity(description, team_size, duration_weeks)
    
    return {
        "project_id": project_id,
        "name": name,
        "description": description,
        "type": project_type,
        "complexity": complexity,
        "team_size": team_size,
        "duration_weeks": duration_weeks,
        "phases": phases,
        "status": "planning",
        "created_at": datetime.now().isoformat(),
        "created_by": "project-management-mcp"
    }


def _infer_project_type(name: str, description: str) -> str:
    """Infer project type from name and description."""
    
    combined_text = f"{name} {description}".lower()
    
    type_keywords = {
        "software_development": ["app", "software", "website", "platform", "system", "api", "development"],
        "infrastructure": ["infrastructure", "deployment", "devops", "cloud", "server", "network"],
        "data_analytics": ["analytics", "data", "reporting", "dashboard", "insights", "ml", "ai"],
        "marketing": ["marketing", "campaign", "brand", "promotion", "launch", "advertising"],
        "research": ["research", "analysis", "study", "investigation", "prototype", "poc"],
        "process_improvement": ["process", "optimization", "automation", "workflow", "efficiency"]
    }
    
    max_matches = 0
    detected_type = "general"
    
    for project_type, keywords in type_keywords.items():
        matches = sum(1 for keyword in keywords if keyword in combined_text)
        if matches > max_matches:
            max_matches = matches
            detected_type = project_type
    
    return detected_type.replace("_", " ").title()


def _generate_default_phases(project_type: str, duration_weeks: int) -> List[Dict]:
    """Generate default project phases based on type."""
    
    phase_templates = {
        "Software Development": [
            {"name": "Planning & Requirements", "percentage": 15},
            {"name": "Design & Architecture", "percentage": 15},
            {"name": "Development", "percentage": 50},
            {"name": "Testing & QA", "percentage": 15},
            {"name": "Deployment & Launch", "percentage": 5}
        ],
        "Infrastructure": [
            {"name": "Assessment & Planning", "percentage": 20},
            {"name": "Design & Procurement", "percentage": 15},
            {"name": "Implementation", "percentage": 45},
            {"name": "Testing & Validation", "percentage": 15},
            {"name": "Go-Live & Handover", "percentage": 5}
        ],
        "Data Analytics": [
            {"name": "Data Discovery", "percentage": 25},
            {"name": "Analysis & Modeling", "percentage": 40},
            {"name": "Visualization & Reporting", "percentage": 25},
            {"name": "Deployment & Training", "percentage": 10}
        ],
        "General": [
            {"name": "Initiation & Planning", "percentage": 20},
            {"name": "Execution Phase 1", "percentage": 35},
            {"name": "Execution Phase 2", "percentage": 35},
            {"name": "Closure & Handover", "percentage": 10}
        ]
    }
    
    template = phase_templates.get(project_type, phase_templates["General"])
    
    phases = []
    for phase_template in template:
        phase_duration = max(1, int(duration_weeks * (phase_template["percentage"] / 100)))
        
        phases.append({
            "name": phase_template["name"],
            "duration_weeks": phase_duration,
            "percentage": phase_template["percentage"],
            "status": "planned",
            "deliverables": [],
            "milestones": []
        })
    
    return phases


def _estimate_complexity(description: str, team_size: int, duration_weeks: int) -> str:
    """Estimate project complexity."""
    
    complexity_score = 0
    
    # Description-based factors
    if description:
        complexity_keywords = [
            "integration", "api", "database", "scalable", "enterprise", 
            "microservices", "distributed", "real-time", "machine learning",
            "blockchain", "security", "compliance", "migration"
        ]
        
        description_lower = description.lower()
        complexity_score += sum(2 for keyword in complexity_keywords if keyword in description_lower)
    
    # Team size factor
    if team_size > 10:
        complexity_score += 3
    elif team_size > 6:
        complexity_score += 2
    elif team_size < 3:
        complexity_score += 1
    
    # Duration factor
    if duration_weeks > 24:
        complexity_score += 3
    elif duration_weeks > 12:
        complexity_score += 2
    elif duration_weeks < 4:
        complexity_score += 1
    
    # Determine complexity level
    if complexity_score >= 8:
        return "very_high"
    elif complexity_score >= 6:
        return "high"
    elif complexity_score >= 3:
        return "medium"
    else:
        return "low"


async def _initialize_workspace(project_structure: Dict) -> Dict:
    """Initialize project workspace and folder structure."""
    
    workspace = {
        "project_id": project_structure["project_id"],
        "folder_structure": [],
        "document_templates": [],
        "collaboration_setup": {},
        "storage_location": f"/projects/{project_structure['project_id']}"
    }
    
    # Create folder structure based on project type
    if project_structure["type"] == "Software Development":
        workspace["folder_structure"] = [
            "01-Planning/Requirements",
            "01-Planning/Architecture", 
            "02-Development/Source-Code",
            "02-Development/Documentation",
            "03-Testing/Test-Plans",
            "03-Testing/Test-Results",
            "04-Deployment/Scripts",
            "04-Deployment/Documentation",
            "05-Project-Management/Status-Reports",
            "05-Project-Management/Meeting-Notes"
        ]
    else:
        workspace["folder_structure"] = [
            "01-Project-Initiation",
            "02-Planning-Documents", 
            "03-Work-Products",
            "04-Quality-Assurance",
            "05-Project-Management",
            "06-Communications",
            "07-Deliverables"
        ]
    
    # Set up collaboration tools
    workspace["collaboration_setup"] = {
        "project_chat": f"#{project_structure['name'].lower().replace(' ', '-')}",
        "document_sharing": "enabled",
        "calendar_integration": "enabled",
        "notification_channels": ["email", "chat"],
        "access_permissions": _generate_access_permissions(project_structure["team_size"])
    }
    
    return workspace


def _generate_access_permissions(team_size: int) -> Dict:
    """Generate access permissions based on team size."""
    
    if team_size <= 5:
        return {
            "project_manager": ["read", "write", "admin"],
            "team_members": ["read", "write"],
            "stakeholders": ["read"],
            "guests": ["read_limited"]
        }
    else:
        return {
            "project_manager": ["read", "write", "admin"],
            "team_leads": ["read", "write", "manage_team"],
            "team_members": ["read", "write"],
            "stakeholders": ["read"],
            "guests": ["read_limited"]
        }


async def _setup_project_templates(project_structure: Dict) -> Dict:
    """Set up project document templates."""
    
    templates = {
        "documents": [],
        "reports": [],
        "communication": []
    }
    
    # Common templates for all projects
    templates["documents"] = [
        "Project Charter Template",
        "Requirements Document Template", 
        "Risk Register Template",
        "Meeting Minutes Template",
        "Status Report Template"
    ]
    
    templates["reports"] = [
        "Weekly Status Report",
        "Milestone Report",
        "Risk Assessment Report",
        "Resource Utilization Report"
    ]
    
    templates["communication"] = [
        "Kickoff Meeting Agenda",
        "Stakeholder Update Email",
        "Project Closure Report",
        "Lessons Learned Template"
    ]
    
    # Add type-specific templates
    if project_structure["type"] == "Software Development":
        templates["documents"].extend([
            "Technical Specification Template",
            "User Story Template",
            "Test Plan Template",
            "Deployment Guide Template"
        ])
    
    return templates


async def _setup_project_tracking(project_structure: Dict) -> Dict:
    """Set up project tracking and monitoring."""
    
    tracking = {
        "metrics": [],
        "dashboards": [],
        "alerts": [],
        "reporting_schedule": {}
    }
    
    # Define key metrics to track
    tracking["metrics"] = [
        {
            "name": "Schedule Variance",
            "description": "Difference between planned and actual timeline",
            "frequency": "weekly",
            "threshold": "±5 days"
        },
        {
            "name": "Budget Variance", 
            "description": "Difference between planned and actual costs",
            "frequency": "weekly",
            "threshold": "±10%"
        },
        {
            "name": "Quality Metrics",
            "description": "Defect rates and quality indicators",
            "frequency": "daily",
            "threshold": "95% pass rate"
        },
        {
            "name": "Team Velocity",
            "description": "Rate of work completion",
            "frequency": "weekly",
            "threshold": "80% of planned"
        }
    ]
    
    # Set up dashboards
    tracking["dashboards"] = [
        "Executive Summary Dashboard",
        "Team Performance Dashboard", 
        "Risk and Issue Dashboard",
        "Resource Utilization Dashboard"
    ]
    
    # Configure alerts
    tracking["alerts"] = [
        {
            "type": "schedule_delay",
            "threshold": "3 days behind",
            "recipients": ["project_manager", "stakeholders"]
        },
        {
            "type": "budget_overrun",
            "threshold": "15% over budget",
            "recipients": ["project_manager", "finance"]
        },
        {
            "type": "quality_issue",
            "threshold": "Below 90% pass rate",
            "recipients": ["project_manager", "qa_lead"]
        }
    ]
    
    # Set reporting schedule
    tracking["reporting_schedule"] = {
        "daily_standup": "9:00 AM (team)",
        "weekly_status": "Friday 5:00 PM (stakeholders)",
        "monthly_review": "Last Friday of month (executives)",
        "milestone_reports": "Upon milestone completion"
    }
    
    return tracking
