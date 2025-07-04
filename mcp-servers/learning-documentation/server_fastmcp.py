#!/usr/bin/env python3
"""
Learning & Documentation MCP Server (FastMCP Version)
Adaptive learning curricula, intelligent assessments, and auto-improving documentation systems.
"""

import sys
from pathlib import Path
from typing import Dict, Optional, List

from mcp.server.fastmcp import FastMCP

# Add src directory to path for imports
sys.path.append(str(Path(__file__).parent / "src"))

from src.prompts.learning_path_design import learning_path_design_prompt
from src.prompts.knowledge_assessment import knowledge_assessment_prompt
from src.prompts.content_generation import content_generation_prompt
from src.prompts.progress_tracking import progress_tracking_prompt
from src.prompts.documentation_audit import documentation_audit_prompt
from src.prompts.interactive_tutorial import interactive_tutorial_prompt

from src.tools.analyze_knowledge_gaps import analyze_knowledge_gaps_tool
from src.tools.generate_quiz import generate_quiz_tool
from src.tools.create_tutorial import create_tutorial_tool
from src.tools.track_completion import track_completion_tool
from src.tools.update_content import update_content_tool
from src.tools.export_curriculum import export_curriculum_tool

# Create FastMCP server instance
mcp = FastMCP("learning-documentation")

# =============================================================================
# TOOLS (Model-controlled functions)
# =============================================================================

@mcp.tool()
async def analyze_knowledge_gaps(
    learner_profile: str,
    target_skills: List[str],
    assessment_data: Dict = None
) -> Dict:
    """
    Analyze knowledge gaps and identify learning needs.
    
    Args:
        learner_profile: Learner background and current skill level
        target_skills: List of skills to achieve
        assessment_data: Optional previous assessment results
    """
    return await analyze_knowledge_gaps_tool(learner_profile, target_skills, assessment_data)


@mcp.tool()
async def generate_quiz(
    topic: str,
    difficulty_level: str = "intermediate",
    question_count: int = 10,
    question_types: List[str] = ["multiple_choice", "true_false"]
) -> Dict:
    """
    Generate adaptive quizzes and assessments.
    
    Args:
        topic: Subject matter for the quiz
        difficulty_level: beginner, intermediate, or advanced
        question_count: Number of questions to generate
        question_types: Types of questions to include
    """
    return await generate_quiz_tool(topic, difficulty_level, question_count, question_types)


@mcp.tool()
async def create_tutorial(
    topic: str,
    learning_style: str = "hands_on",
    duration_minutes: int = 30,
    include_exercises: bool = True
) -> Dict:
    """
    Create step-by-step interactive tutorials.
    
    Args:
        topic: Tutorial subject matter
        learning_style: hands_on, visual, reading, or mixed
        duration_minutes: Target tutorial length
        include_exercises: Whether to include practice exercises
    """
    return await create_tutorial_tool(topic, learning_style, duration_minutes, include_exercises)


@mcp.tool()
async def track_completion(
    learner_id: str,
    content_id: str,
    completion_data: Dict
) -> Dict:
    """
    Track learning progress and completion metrics.
    
    Args:
        learner_id: Unique learner identifier
        content_id: Content/course identifier
        completion_data: Progress and performance data
    """
    return await track_completion_tool(learner_id, content_id, completion_data)


@mcp.tool()
async def update_content(
    content_id: str,
    feedback_data: Dict,
    performance_metrics: Dict,
    auto_improve: bool = True
) -> Dict:
    """
    Update and improve content based on learner feedback and performance.
    
    Args:
        content_id: Content identifier to update
        feedback_data: Learner feedback and suggestions
        performance_metrics: Learning outcome metrics
        auto_improve: Whether to automatically apply improvements
    """
    return await update_content_tool(content_id, feedback_data, performance_metrics, auto_improve)


@mcp.tool()
async def export_curriculum(
    curriculum_id: str,
    export_format: str = "scorm",
    include_assessments: bool = True,
    include_resources: bool = True
) -> Dict:
    """
    Export learning materials and curricula in various formats.
    
    Args:
        curriculum_id: Curriculum to export
        export_format: scorm, pdf, html, or json
        include_assessments: Include quizzes and tests
        include_resources: Include supplementary materials
    """
    return await export_curriculum_tool(curriculum_id, export_format, include_assessments, include_resources)


# =============================================================================
# PROMPTS (User-controlled agentic workflows)
# =============================================================================

@mcp.prompt("learning-path-design")
async def learning_path_design_prompt_handler(
    subject: str,
    learner_background: str = "",
    learning_goals: str = "",
    time_available: str = "flexible"
) -> str:
    """Create adaptive learning curricula tailored to individual needs."""
    return await learning_path_design_prompt(subject, learner_background, learning_goals, time_available)


@mcp.prompt("knowledge-assessment")
async def knowledge_assessment_prompt_handler(
    topic: str,
    assessment_type: str = "comprehensive",
    learner_level: str = "unknown"
) -> str:
    """Evaluate current understanding and identify knowledge gaps."""
    return await knowledge_assessment_prompt(topic, assessment_type, learner_level)


@mcp.prompt("content-generation")
async def content_generation_prompt_handler(
    content_type: str,
    topic: str,
    target_audience: str = "general",
    format_preference: str = "interactive"
) -> str:
    """Auto-create educational materials and learning content."""
    return await content_generation_prompt(content_type, topic, target_audience, format_preference)


@mcp.prompt("progress-tracking")
async def progress_tracking_prompt_handler(
    learner_id: str,
    timeframe: str = "last_month",
    include_recommendations: bool = True
) -> str:
    """Monitor learning effectiveness and progress patterns."""
    return await progress_tracking_prompt(learner_id, timeframe, include_recommendations)


@mcp.prompt("documentation-audit")
async def documentation_audit_prompt_handler(
    documentation_source: str,
    audit_scope: str = "comprehensive",
    improvement_focus: str = "usability"
) -> str:
    """Analyze and improve existing documentation with AI insights."""
    return await documentation_audit_prompt(documentation_source, audit_scope, improvement_focus)


@mcp.prompt("interactive-tutorial")
async def interactive_tutorial_prompt_handler(
    skill_topic: str,
    proficiency_level: str = "beginner",
    hands_on_focus: str = "practical"
) -> str:
    """Generate hands-on learning experiences with interactive elements."""
    return await interactive_tutorial_prompt(skill_topic, proficiency_level, hands_on_focus)


# =============================================================================
# MAIN ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    mcp.run()
