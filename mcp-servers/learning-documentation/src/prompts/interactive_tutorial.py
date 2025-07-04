"""
Interactive Tutorial Prompt
Generate hands-on learning experiences with step-by-step guidance and practice.
"""

from datetime import datetime
from typing import Dict, List
import json


async def interactive_tutorial_prompt(
    skill_topic: str,
    proficiency_level: str = "beginner",
    hands_on_focus: str = "practical"
) -> str:
    """
    Create comprehensive interactive tutorials with hands-on exercises and adaptive guidance.
    """

    # Generate tutorial ID
    tutorial_id = f"tutorial_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    # Analyze skill requirements
    skill_analysis = await _analyze_skill_requirements(skill_topic, proficiency_level)
    
    # Design tutorial structure
    tutorial_structure = await _design_tutorial_structure(skill_analysis, hands_on_focus)
    
    # Generate interactive elements
    interactive_elements = await _design_interactive_components(tutorial_structure, skill_analysis)
    
    # Create step-by-step progression
    step_progression = await _create_step_by_step_progression(tutorial_structure)
    
    # Design practice exercises
    practice_exercises = await _design_practice_exercises(skill_analysis, tutorial_structure)
    
    # Create assessment checkpoints
    assessment_checkpoints = await _create_assessment_checkpoints(tutorial_structure, practice_exercises)
    
    # Generate tutorial summary
    tutorial_summary = f"""
🎯 **Interactive Tutorial Ready: {skill_topic}**

**Tutorial ID:** `{tutorial_id}`
**Skill Focus:** {skill_topic}
**Proficiency Level:** {proficiency_level.title()}
**Learning Approach:** {hands_on_focus.replace('_', ' ').title()}
**Created:** {datetime.now().strftime('%Y-%m-%d %H:%M')}

**Skill Analysis:**
{_format_skill_analysis(skill_analysis)}

**Tutorial Structure:**
{_format_tutorial_structure(tutorial_structure)}

**Interactive Elements:**
{_format_interactive_elements(interactive_elements)}

**Learning Progression:**
{_format_step_progression(step_progression)}

**Practice Exercises:**
{_format_practice_exercises(practice_exercises)}

**Assessment Strategy:**
{_format_assessment_checkpoints(assessment_checkpoints)}

**Adaptive Features:**
{_format_adaptive_features(tutorial_structure)}

**Implementation Guide:**
{_format_implementation_guide(tutorial_structure, interactive_elements)}

**Tutorial Metrics:**
{_format_tutorial_metrics(tutorial_structure)}

**Tools for Creation:**
• Use `create-tutorial` tool to build the complete interactive experience
• Use `generate-quiz` tool for knowledge checkpoints
• Use `track-completion` tool to monitor learner progress

**Tutorial Blueprint Ready ✅**
Tutorial `{tutorial_id}` is designed for hands-on learning with {len(step_progression['steps'])} interactive steps!

**Quick Implementation:**
```
create-tutorial "{skill_topic}" "{hands_on_focus}" {tutorial_structure['estimated_duration']} true
```
"""

    # Store tutorial data
    await _store_tutorial_data(tutorial_id, {
        "skill_topic": skill_topic,
        "proficiency_level": proficiency_level,
        "hands_on_focus": hands_on_focus,
        "skill_analysis": skill_analysis,
        "tutorial_structure": tutorial_structure,
        "interactive_elements": interactive_elements,
        "step_progression": step_progression,
        "practice_exercises": practice_exercises,
        "assessment_checkpoints": assessment_checkpoints,
        "created_at": datetime.now().isoformat()
    })

    return tutorial_summary


async def _analyze_skill_requirements(skill_topic: str, proficiency_level: str) -> Dict:
    """Analyze the skill requirements and learning objectives."""
    
    topic_lower = skill_topic.lower()
    
    # Categorize skill domain
    skill_domains = {
        "programming": ["python", "javascript", "java", "coding", "programming", "development", "software"],
        "data_analysis": ["data", "analytics", "pandas", "numpy", "sql", "excel", "statistics"],
        "design": ["design", "ui", "ux", "photoshop", "figma", "graphics", "visual"],
        "digital_marketing": ["marketing", "seo", "social media", "advertising", "analytics"],
        "project_management": ["project", "management", "agile", "scrum", "planning"],
        "business_skills": ["business", "finance", "strategy", "leadership", "communication"],
        "creative": ["writing", "video", "audio", "creative", "content", "storytelling"]
    }
    
    # Determine domain
    skill_domain = "general"
    for domain, keywords in skill_domains.items():
        if any(keyword in topic_lower for keyword in keywords):
            skill_domain = domain
            break
    
    # Define skill characteristics by domain
    domain_characteristics = {
        "programming": {
            "practical_focus": 90,
            "theoretical_component": 10,
            "tool_requirements": ["code_editor", "runtime_environment"],
            "output_types": ["working_code", "projects", "applications"],
            "key_skills": ["syntax", "problem_solving", "debugging", "best_practices"]
        },
        "data_analysis": {
            "practical_focus": 80,
            "theoretical_component": 20,
            "tool_requirements": ["spreadsheet", "analysis_software", "datasets"],
            "output_types": ["reports", "visualizations", "insights"],
            "key_skills": ["data_cleaning", "analysis", "visualization", "interpretation"]
        },
        "design": {
            "practical_focus": 85,
            "theoretical_component": 15,
            "tool_requirements": ["design_software", "templates", "assets"],
            "output_types": ["designs", "prototypes", "portfolios"],
            "key_skills": ["principles", "tools", "creativity", "critique"]
        },
        "general": {
            "practical_focus": 70,
            "theoretical_component": 30,
            "tool_requirements": ["basic_tools"],
            "output_types": ["projects", "presentations"],
            "key_skills": ["understanding", "application", "practice"]
        }
    }
    
    characteristics = domain_characteristics.get(skill_domain, domain_characteristics["general"])
    
    # Analyze proficiency requirements
    proficiency_requirements = {
        "beginner": {
            "prerequisite_skills": [],
            "learning_objectives": ["basic_understanding", "simple_application"],
            "complexity_level": "low",
            "practice_intensity": "high"
        },
        "intermediate": {
            "prerequisite_skills": ["basic_concepts"],
            "learning_objectives": ["practical_application", "problem_solving"],
            "complexity_level": "medium", 
            "practice_intensity": "very_high"
        },
        "advanced": {
            "prerequisite_skills": ["intermediate_skills", "practical_experience"],
            "learning_objectives": ["mastery", "optimization", "innovation"],
            "complexity_level": "high",
            "practice_intensity": "high"
        }
    }
    
    proficiency_info = proficiency_requirements.get(proficiency_level, proficiency_requirements["beginner"])
    
    # Identify specific learning objectives
    specific_objectives = _generate_specific_objectives(skill_topic, skill_domain, proficiency_level)
    
    return {
        "skill_domain": skill_domain,
        "domain_characteristics": characteristics,
        "proficiency_info": proficiency_info,
        "specific_objectives": specific_objectives,
        "estimated_difficulty": _estimate_skill_difficulty(skill_topic, proficiency_level),
        "prerequisite_check": _identify_prerequisites(skill_domain, proficiency_level)
    }


def _generate_specific_objectives(topic: str, domain: str, level: str) -> List[str]:
    """Generate specific learning objectives for the skill."""
    
    # Domain-specific objective templates
    objective_templates = {
        "programming": {
            "beginner": [
                f"Understand basic {topic} syntax and concepts",
                f"Write simple {topic} programs",
                f"Debug basic {topic} errors",
                f"Follow {topic} best practices"
            ],
            "intermediate": [
                f"Build functional {topic} applications",
                f"Implement common {topic} patterns",
                f"Optimize {topic} code performance",
                f"Handle {topic} errors gracefully"
            ],
            "advanced": [
                f"Design complex {topic} architectures",
                f"Master advanced {topic} features",
                f"Contribute to {topic} projects",
                f"Mentor others in {topic}"
            ]
        },
        "data_analysis": {
            "beginner": [
                f"Understand {topic} fundamentals",
                f"Perform basic data operations",
                f"Create simple visualizations",
                f"Interpret basic results"
            ],
            "intermediate": [
                f"Conduct thorough {topic}",
                f"Build automated analysis workflows",
                f"Present insights effectively",
                f"Make data-driven recommendations"
            ],
            "advanced": [
                f"Design complex {topic} frameworks",
                f"Lead analytical projects",
                f"Innovate analytical approaches",
                f"Mentor analytical teams"
            ]
        }
    }
    
    # Get objectives for domain and level
    domain_objectives = objective_templates.get(domain, {
        level: [
            f"Master {topic} fundamentals",
            f"Apply {topic} in practice",
            f"Solve {topic} challenges",
            f"Create {topic} projects"
        ]
    })
    
    return domain_objectives.get(level, domain_objectives.get("beginner", []))


def _estimate_skill_difficulty(topic: str, level: str) -> str:
    """Estimate the difficulty of learning this skill."""
    
    # Difficulty indicators in topic
    high_difficulty_indicators = ["advanced", "complex", "expert", "machine learning", "ai", "algorithm"]
    medium_difficulty_indicators = ["intermediate", "practical", "applied"]
    
    topic_lower = topic.lower()
    
    base_difficulty = {
        "beginner": "low",
        "intermediate": "medium", 
        "advanced": "high"
    }.get(level, "medium")
    
    # Adjust based on topic complexity
    if any(indicator in topic_lower for indicator in high_difficulty_indicators):
        if base_difficulty == "low":
            base_difficulty = "medium"
        elif base_difficulty == "medium":
            base_difficulty = "high"
    elif any(indicator in topic_lower for indicator in medium_difficulty_indicators):
        if base_difficulty == "low":
            base_difficulty = "medium"
    
    return base_difficulty


def _identify_prerequisites(domain: str, level: str) -> List[str]:
    """Identify prerequisite knowledge and skills."""
    
    domain_prerequisites = {
        "programming": {
            "beginner": ["basic computer skills", "logical thinking"],
            "intermediate": ["programming fundamentals", "basic syntax knowledge"],
            "advanced": ["solid programming experience", "problem-solving skills", "code review experience"]
        },
        "data_analysis": {
            "beginner": ["basic math", "spreadsheet familiarity"],
            "intermediate": ["statistics basics", "data visualization concepts"],
            "advanced": ["statistical analysis", "advanced data tools", "business context understanding"]
        },
        "design": {
            "beginner": ["visual awareness", "basic computer skills"],
            "intermediate": ["design principles", "tool familiarity"],
            "advanced": ["portfolio experience", "user research", "design process mastery"]
        }
    }
    
    return domain_prerequisites.get(domain, {}).get(level, ["basic subject interest"])


async def _design_tutorial_structure(skill_analysis: Dict, hands_on_focus: str) -> Dict:
    """Design the overall tutorial structure and flow."""
    
    domain = skill_analysis["skill_domain"]
    proficiency = skill_analysis["proficiency_info"]
    difficulty = skill_analysis["estimated_difficulty"]
    
    # Calculate tutorial parameters
    if difficulty == "high":
        estimated_duration = 90  # minutes
        step_count = 12
    elif difficulty == "medium":
        estimated_duration = 60  # minutes
        step_count = 8
    else:  # low difficulty
        estimated_duration = 45  # minutes
        step_count = 6
    
    # Adjust for hands-on focus
    focus_adjustments = {
        "practical": {"duration_multiplier": 1.2, "practice_ratio": 0.7},
        "theoretical": {"duration_multiplier": 0.8, "practice_ratio": 0.3},
        "balanced": {"duration_multiplier": 1.0, "practice_ratio": 0.5},
        "project_based": {"duration_multiplier": 1.5, "practice_ratio": 0.8}
    }
    
    adjustment = focus_adjustments.get(hands_on_focus, focus_adjustments["practical"])
    estimated_duration = int(estimated_duration * adjustment["duration_multiplier"])
    
    # Design tutorial sections
    tutorial_sections = _design_tutorial_sections(domain, step_count, adjustment["practice_ratio"])
    
    # Determine pacing strategy
    pacing_strategy = {
        "section_duration": estimated_duration // len(tutorial_sections),
        "break_frequency": 3,  # Break every 3 sections
        "difficulty_progression": "gradual",
        "practice_integration": "continuous"
    }
    
    return {
        "estimated_duration": estimated_duration,
        "step_count": step_count,
        "tutorial_sections": tutorial_sections,
        "pacing_strategy": pacing_strategy,
        "hands_on_ratio": adjustment["practice_ratio"],
        "difficulty_curve": _design_difficulty_curve(step_count),
        "completion_criteria": _define_completion_criteria(domain, proficiency)
    }


def _design_tutorial_sections(domain: str, step_count: int, practice_ratio: float) -> List[Dict]:
    """Design tutorial sections based on domain and parameters."""
    
    # Section templates by domain
    section_templates = {
        "programming": [
            {"type": "introduction", "name": "Getting Started", "practice_level": 0.1},
            {"type": "fundamentals", "name": "Core Concepts", "practice_level": 0.3},
            {"type": "guided_practice", "name": "Guided Coding", "practice_level": 0.8},
            {"type": "independent_practice", "name": "Build Your Own", "practice_level": 0.9},
            {"type": "debugging", "name": "Troubleshooting", "practice_level": 0.7},
            {"type": "best_practices", "name": "Professional Techniques", "practice_level": 0.5},
            {"type": "project", "name": "Final Project", "practice_level": 1.0}
        ],
        "data_analysis": [
            {"type": "introduction", "name": "Data Overview", "practice_level": 0.2},
            {"type": "data_exploration", "name": "Exploring Data", "practice_level": 0.6},
            {"type": "analysis_techniques", "name": "Analysis Methods", "practice_level": 0.7},
            {"type": "visualization", "name": "Creating Visuals", "practice_level": 0.8},
            {"type": "interpretation", "name": "Drawing Insights", "practice_level": 0.5},
            {"type": "reporting", "name": "Presenting Results", "practice_level": 0.6}
        ],
        "design": [
            {"type": "principles", "name": "Design Fundamentals", "practice_level": 0.3},
            {"type": "tools_introduction", "name": "Tool Mastery", "practice_level": 0.7},
            {"type": "guided_creation", "name": "Guided Design", "practice_level": 0.9},
            {"type": "creative_practice", "name": "Creative Exercise", "practice_level": 1.0},
            {"type": "critique", "name": "Design Review", "practice_level": 0.4},
            {"type": "portfolio", "name": "Portfolio Piece", "practice_level": 0.8}
        ]
    }
    
    # Get template for domain
    template = section_templates.get(domain, section_templates["programming"])
    
    # Select sections based on step count
    sections_needed = min(step_count, len(template))
    selected_sections = template[:sections_needed]
    
    # Adjust practice levels based on overall practice ratio
    for section in selected_sections:
        section["adjusted_practice"] = section["practice_level"] * practice_ratio
        section["duration_minutes"] = 10 + (section["adjusted_practice"] * 15)  # 10-25 min sections
    
    return selected_sections


def _design_difficulty_curve(step_count: int) -> List[float]:
    """Design difficulty progression curve."""
    
    # Create gradual difficulty progression
    difficulty_curve = []
    
    for step in range(step_count):
        # Gradual increase with some plateaus
        base_difficulty = (step / (step_count - 1)) * 0.8 + 0.2  # 0.2 to 1.0
        
        # Add some plateaus for consolidation
        if step < step_count * 0.3:
            # Early plateau
            difficulty = min(base_difficulty, 0.4)
        elif step > step_count * 0.7:
            # Late acceleration
            difficulty = base_difficulty * 1.2
        else:
            difficulty = base_difficulty
        
        difficulty_curve.append(min(difficulty, 1.0))
    
    return difficulty_curve


def _define_completion_criteria(domain: str, proficiency_info: Dict) -> Dict:
    """Define criteria for tutorial completion."""
    
    base_criteria = {
        "minimum_completion": 80,  # 80% of steps
        "practice_success_rate": 70,  # 70% success on practice
        "assessment_threshold": 75,  # 75% on assessments
        "time_limits": False  # No time pressure
    }
    
    # Adjust for proficiency level
    complexity = proficiency_info["complexity_level"]
    if complexity == "high":
        base_criteria["assessment_threshold"] = 80
        base_criteria["practice_success_rate"] = 75
    elif complexity == "low":
        base_criteria["assessment_threshold"] = 70
        base_criteria["practice_success_rate"] = 65
    
    return base_criteria


async def _design_interactive_components(tutorial_structure: Dict, skill_analysis: Dict) -> Dict:
    """Design interactive components for engagement."""
    
    domain = skill_analysis["skill_domain"]
    sections = tutorial_structure["tutorial_sections"]
    
    # Domain-specific interactive elements
    domain_elements = {
        "programming": ["code_editor", "output_console", "debugger", "syntax_highlighter", "auto_completion"],
        "data_analysis": ["data_viewer", "chart_builder", "formula_editor", "result_display", "export_tools"],
        "design": ["design_canvas", "color_picker", "shape_tools", "layer_manager", "preview_modes"],
        "general": ["text_editor", "image_gallery", "video_player", "quiz_interface", "progress_tracker"]
    }
    
    interactive_elements = domain_elements.get(domain, domain_elements["general"])
    
    # Add common elements
    common_elements = ["progress_tracker", "hint_system", "feedback_display", "navigation_controls"]
    interactive_elements.extend(common_elements)
    
    # Design engagement features
    engagement_features = {
        "gamification": {
            "points_system": True,
            "achievement_badges": True,
            "progress_visualization": True,
            "leaderboards": False  # Not appropriate for all learners
        },
        "social_features": {
            "peer_collaboration": False,  # Individual tutorial
            "sharing_capabilities": True,
            "community_showcase": True
        },
        "adaptive_features": {
            "difficulty_adjustment": True,
            "personalized_hints": True,
            "alternative_explanations": True,
            "skip_ahead_options": True
        }
    }
    
    # Section-specific interactivity
    section_interactivity = []
    for section in sections:
        section_elements = {
            "section_name": section["name"],
            "primary_interactions": _determine_section_interactions(section["type"], domain),
            "practice_components": _design_practice_components(section["type"], domain),
            "feedback_mechanisms": ["immediate", "contextual", "encouraging"]
        }
        section_interactivity.append(section_elements)
    
    return {
        "interactive_elements": interactive_elements,
        "engagement_features": engagement_features,
        "section_interactivity": section_interactivity,
        "accessibility_features": ["keyboard_navigation", "screen_reader", "high_contrast", "font_scaling"]
    }


def _determine_section_interactions(section_type: str, domain: str) -> List[str]:
    """Determine primary interactions for each section type."""
    
    interaction_mapping = {
        "introduction": ["click_through", "video_interaction", "simple_quiz"],
        "fundamentals": ["concept_exploration", "example_interaction", "knowledge_check"],
        "guided_practice": ["step_by_step", "live_coding", "guided_exercises"],
        "independent_practice": ["free_form_practice", "project_work", "creative_exercises"],
        "debugging": ["error_identification", "fix_attempts", "solution_verification"],
        "project": ["full_project_creation", "milestone_tracking", "final_submission"]
    }
    
    return interaction_mapping.get(section_type, ["standard_interaction", "practice", "assessment"])


def _design_practice_components(section_type: str, domain: str) -> List[str]:
    """Design practice components for each section."""
    
    if domain == "programming":
        practice_components = {
            "guided_practice": ["live_coding_exercise", "code_completion", "error_fixing"],
            "independent_practice": ["project_building", "algorithm_implementation", "code_optimization"],
            "debugging": ["bug_hunt", "error_analysis", "solution_testing"]
        }
    elif domain == "data_analysis":
        practice_components = {
            "data_exploration": ["dataset_investigation", "pattern_finding", "outlier_detection"],
            "analysis_techniques": ["calculation_practice", "method_application", "result_validation"],
            "visualization": ["chart_creation", "design_improvement", "story_telling"]
        }
    else:
        practice_components = {
            section_type: ["hands_on_exercise", "practical_application", "skill_demonstration"]
        }
    
    return practice_components.get(section_type, ["general_practice"])


async def _create_step_by_step_progression(tutorial_structure: Dict) -> Dict:
    """Create detailed step-by-step progression."""
    
    sections = tutorial_structure["tutorial_sections"]
    difficulty_curve = tutorial_structure["difficulty_curve"]
    
    steps = []
    step_number = 1
    
    for section_index, section in enumerate(sections):
        # Calculate steps per section
        section_steps = max(1, int(section["duration_minutes"] / 8))  # ~8 minutes per step
        
        for step_in_section in range(section_steps):
            difficulty_index = min(len(difficulty_curve) - 1, step_number - 1)
            
            step = {
                "step_number": step_number,
                "section": section["name"],
                "step_title": f"{section['name']} - Part {step_in_section + 1}",
                "difficulty_level": difficulty_curve[difficulty_index],
                "estimated_duration": 8,  # minutes
                "learning_objective": _generate_step_objective(section["type"], step_in_section),
                "interaction_type": _determine_step_interaction(section["type"], step_in_section),
                "practice_component": step_in_section > 0,  # First step is usually intro
                "assessment_checkpoint": step_in_section == section_steps - 1  # Last step has assessment
            }
            
            steps.append(step)
            step_number += 1
    
    return {
        "steps": steps,
        "total_steps": len(steps),
        "progression_type": "linear_with_branching",
        "mastery_requirements": _define_step_mastery_requirements()
    }


def _generate_step_objective(section_type: str, step_index: int) -> str:
    """Generate learning objective for individual step."""
    
    objective_templates = {
        "introduction": [
            "Understand the topic overview",
            "Identify key concepts",
            "Set learning expectations"
        ],
        "fundamentals": [
            "Learn core concept",
            "Practice basic application",
            "Reinforce understanding"
        ],
        "guided_practice": [
            "Follow guided example",
            "Apply with assistance",
            "Demonstrate understanding"
        ],
        "independent_practice": [
            "Work independently",
            "Apply creatively",
            "Solve novel problems"
        ]
    }
    
    templates = objective_templates.get(section_type, objective_templates["fundamentals"])
    objective_index = min(step_index, len(templates) - 1)
    
    return templates[objective_index]


def _determine_step_interaction(section_type: str, step_index: int) -> str:
    """Determine interaction type for individual step."""
    
    if step_index == 0:
        return "introduction"
    elif section_type in ["guided_practice", "independent_practice"]:
        return "hands_on_practice"
    elif section_type == "fundamentals":
        return "concept_learning"
    else:
        return "standard_interaction"


def _define_step_mastery_requirements() -> Dict:
    """Define requirements for step mastery."""
    
    return {
        "understanding_check": True,
        "practice_completion": True,
        "accuracy_threshold": 70,
        "retry_attempts": 3,
        "hint_availability": True
    }


async def _design_practice_exercises(skill_analysis: Dict, tutorial_structure: Dict) -> Dict:
    """Design comprehensive practice exercises."""
    
    domain = skill_analysis["skill_domain"]
    sections = tutorial_structure["tutorial_sections"]
    
    exercises = []
    
    for section in sections:
        if section["adjusted_practice"] > 0.5:  # Sections with significant practice
            section_exercises = _create_section_exercises(section, domain)
            exercises.extend(section_exercises)
    
    # Add capstone exercise
    capstone_exercise = _create_capstone_exercise(skill_analysis, domain)
    exercises.append(capstone_exercise)
    
    return {
        "practice_exercises": exercises,
        "total_exercises": len(exercises),
        "exercise_types": list(set(ex["type"] for ex in exercises)),
        "difficulty_distribution": _calculate_exercise_difficulty_distribution(exercises)
    }


def _create_section_exercises(section: Dict, domain: str) -> List[Dict]:
    """Create exercises for a specific section."""
    
    section_type = section["type"]
    
    exercise_templates = {
        "programming": {
            "guided_practice": [
                {"type": "code_completion", "difficulty": 0.3, "duration": 10},
                {"type": "function_writing", "difficulty": 0.5, "duration": 15},
                {"type": "debugging_task", "difficulty": 0.4, "duration": 12}
            ],
            "independent_practice": [
                {"type": "mini_project", "difficulty": 0.7, "duration": 25},
                {"type": "algorithm_implementation", "difficulty": 0.8, "duration": 30}
            ]
        },
        "data_analysis": {
            "data_exploration": [
                {"type": "dataset_analysis", "difficulty": 0.4, "duration": 15},
                {"type": "pattern_identification", "difficulty": 0.5, "duration": 20}
            ],
            "visualization": [
                {"type": "chart_creation", "difficulty": 0.6, "duration": 18},
                {"type": "dashboard_building", "difficulty": 0.7, "duration": 25}
            ]
        }
    }
    
    domain_exercises = exercise_templates.get(domain, {})
    section_exercises = domain_exercises.get(section_type, [
        {"type": "practical_exercise", "difficulty": 0.5, "duration": 15}
    ])
    
    # Add section context to exercises
    for exercise in section_exercises:
        exercise["section"] = section["name"]
        exercise["practice_level"] = section["adjusted_practice"]
    
    return section_exercises


def _create_capstone_exercise(skill_analysis: Dict, domain: str) -> Dict:
    """Create a capstone exercise that demonstrates mastery."""
    
    capstone_templates = {
        "programming": {
            "type": "complete_application",
            "difficulty": 0.9,
            "duration": 45,
            "description": "Build a complete application using all learned concepts",
            "success_criteria": ["Functional code", "Best practices", "Documentation"]
        },
        "data_analysis": {
            "type": "end_to_end_analysis",
            "difficulty": 0.9,
            "duration": 40,
            "description": "Complete analysis from raw data to insights presentation",
            "success_criteria": ["Data cleaning", "Analysis", "Visualization", "Insights"]
        },
        "design": {
            "type": "portfolio_project",
            "difficulty": 0.9,
            "duration": 50,
            "description": "Create a complete design project for portfolio",
            "success_criteria": ["Design quality", "Process documentation", "Presentation"]
        }
    }
    
    capstone = capstone_templates.get(domain, {
        "type": "final_project",
        "difficulty": 0.8,
        "duration": 35,
        "description": "Demonstrate mastery through comprehensive project",
        "success_criteria": ["Skill application", "Quality output", "Reflection"]
    })
    
    capstone["section"] = "Capstone"
    capstone["practice_level"] = 1.0
    
    return capstone


def _calculate_exercise_difficulty_distribution(exercises: List[Dict]) -> Dict:
    """Calculate distribution of exercise difficulties."""
    
    difficulties = [ex["difficulty"] for ex in exercises]
    
    easy_count = len([d for d in difficulties if d <= 0.4])
    medium_count = len([d for d in difficulties if 0.4 < d <= 0.7])
    hard_count = len([d for d in difficulties if d > 0.7])
    
    total = len(difficulties)
    
    return {
        "easy": {"count": easy_count, "percentage": (easy_count / total) * 100},
        "medium": {"count": medium_count, "percentage": (medium_count / total) * 100},
        "hard": {"count": hard_count, "percentage": (hard_count / total) * 100}
    }


async def _create_assessment_checkpoints(tutorial_structure: Dict, practice_exercises: Dict) -> Dict:
    """Create assessment checkpoints throughout the tutorial."""
    
    sections = tutorial_structure["tutorial_sections"]
    exercises = practice_exercises["practice_exercises"]
    
    checkpoints = []
    
    # Create checkpoints for each major section
    for section in sections:
        if section["type"] not in ["introduction"]:  # Skip intro sections
            checkpoint = {
                "checkpoint_id": f"checkpoint_{len(checkpoints) + 1}",
                "section": section["name"],
                "type": "knowledge_check",
                "questions": 3,
                "passing_score": 70,
                "retake_allowed": True,
                "immediate_feedback": True
            }
            checkpoints.append(checkpoint)
    
    # Add skill demonstration checkpoint
    skill_checkpoint = {
        "checkpoint_id": f"checkpoint_{len(checkpoints) + 1}",
        "section": "Skill Demonstration",
        "type": "practical_assessment",
        "questions": 1,  # One comprehensive task
        "passing_score": 75,
        "retake_allowed": True,
        "immediate_feedback": False  # Requires review
    }
    checkpoints.append(skill_checkpoint)
    
    # Add final mastery assessment
    final_assessment = {
        "checkpoint_id": f"checkpoint_{len(checkpoints) + 1}",
        "section": "Final Mastery",
        "type": "comprehensive_assessment",
        "questions": 5,
        "passing_score": 80,
        "retake_allowed": True,
        "immediate_feedback": True
    }
    checkpoints.append(final_assessment)
    
    return {
        "checkpoints": checkpoints,
        "total_checkpoints": len(checkpoints),
        "assessment_strategy": "continuous_with_mastery",
        "remediation_available": True
    }


# Formatting functions for display

def _format_skill_analysis(analysis: Dict) -> str:
    """Format skill analysis for display."""
    
    lines = [
        f"🎯 Skill Domain: {analysis['skill_domain'].replace('_', ' ').title()}",
        f"📊 Difficulty Level: {analysis['estimated_difficulty'].title()}",
        f"🎚️ Proficiency Target: {analysis['proficiency_info']['complexity_level'].title()}",
        f"🎯 Practice Intensity: {analysis['proficiency_info']['practice_intensity'].replace('_', ' ').title()}"
    ]
    
    if analysis["prerequisite_check"]:
        lines.append(f"📋 Prerequisites: {', '.join(analysis['prerequisite_check'][:3])}")
    
    return "\n".join(lines)


def _format_tutorial_structure(structure: Dict) -> str:
    """Format tutorial structure for display."""
    
    lines = [
        f"⏱️ Duration: {structure['estimated_duration']} minutes",
        f"📊 Steps: {structure['step_count']}",
        f"🎯 Sections: {len(structure['tutorial_sections'])}",
        f"🔥 Hands-on Ratio: {structure['hands_on_ratio']:.1%}",
        f"📈 Difficulty: {structure['pacing_strategy']['difficulty_progression'].title()}"
    ]
    
    return "\n".join(lines)


def _format_interactive_elements(elements: Dict) -> str:
    """Format interactive elements for display."""
    
    lines = [
        f"🎮 Interactive Components: {len(elements['interactive_elements'])}",
        f"🏆 Gamification: {'Enabled' if elements['engagement_features']['gamification']['points_system'] else 'Disabled'}",
        f"🎯 Adaptive Features: {'Enabled' if elements['engagement_features']['adaptive_features']['difficulty_adjustment'] else 'Disabled'}",
        f"♿ Accessibility: {len(elements['accessibility_features'])} features"
    ]
    
    return "\n".join(lines)


def _format_step_progression(progression: Dict) -> str:
    """Format step progression for display."""
    
    steps = progression["steps"]
    
    lines = [f"📚 Total Steps: {progression['total_steps']}"]
    lines.append("**Step Overview:**")
    
    for step in steps[:5]:  # Show first 5 steps
        difficulty_bar = "●" * int(step["difficulty_level"] * 5)
        lines.append(f"{step['step_number']}. {step['step_title']} {difficulty_bar}")
    
    if len(steps) > 5:
        lines.append(f"... and {len(steps) - 5} more steps")
    
    return "\n".join(lines)


def _format_practice_exercises(exercises: Dict) -> str:
    """Format practice exercises for display."""
    
    lines = [
        f"🎯 Total Exercises: {exercises['total_exercises']}",
        f"📊 Exercise Types: {len(exercises['exercise_types'])}",
    ]
    
    dist = exercises["difficulty_distribution"]
    lines.append(f"📈 Difficulty: {dist['easy']['count']} Easy, {dist['medium']['count']} Medium, {dist['hard']['count']} Hard")
    
    return "\n".join(lines)


def _format_assessment_checkpoints(checkpoints: Dict) -> str:
    """Format assessment checkpoints for display."""
    
    lines = [
        f"📋 Checkpoints: {checkpoints['total_checkpoints']}",
        f"🎯 Strategy: {checkpoints['assessment_strategy'].replace('_', ' ').title()}",
        f"🔄 Remediation: {'Available' if checkpoints['remediation_available'] else 'Not Available'}"
    ]
    
    return "\n".join(lines)


def _format_adaptive_features(structure: Dict) -> str:
    """Format adaptive features for display."""
    
    lines = [
        "🤖 **Intelligent Adaptation:**",
        "• Difficulty adjusts based on learner performance",
        "• Personalized hints and guidance provided",
        "• Alternative explanations for different learning styles",
        "• Skip ahead options for advanced learners",
        "• Remediation paths for struggling concepts"
    ]
    
    return "\n".join(lines)


def _format_implementation_guide(structure: Dict, elements: Dict) -> str:
    """Format implementation guide for display."""
    
    lines = [
        "🛠️ **Implementation Steps:**",
        "1. Set up interactive development environment",
        "2. Configure adaptive difficulty system",
        "3. Implement practice exercise framework",
        "4. Add assessment and feedback mechanisms",
        "5. Test tutorial flow and user experience",
        "6. Deploy and monitor learner progress"
    ]
    
    return "\n".join(lines)


def _format_tutorial_metrics(structure: Dict) -> str:
    """Format tutorial metrics for display."""
    
    completion_time = structure["estimated_duration"]
    step_count = structure["step_count"]
    
    lines = [
        f"📊 **Tutorial Analytics:**",
        f"• Estimated completion time: {completion_time} minutes",
        f"• Average time per step: {completion_time // step_count} minutes",
        f"• Practice-to-theory ratio: {structure['hands_on_ratio']:.1%}",
        f"• Difficulty progression: Gradual increase",
        f"• Assessment frequency: Every {step_count // 3} steps"
    ]
    
    return "\n".join(lines)


async def _store_tutorial_data(tutorial_id: str, data: Dict) -> None:
    """Store tutorial data for later retrieval."""
    # In real implementation, would save to database or file system
    pass
