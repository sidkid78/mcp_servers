"""
Learning Path Design Prompt
Create adaptive learning curricula tailored to individual needs and goals.
"""

import uuid
from datetime import datetime, timedelta
from typing import Dict, List


async def learning_path_design_prompt(
    subject: str,
    learner_background: str = "",
    learning_goals: str = "",
    time_available: str = "flexible"
) -> str:
    """
    Design comprehensive, adaptive learning curricula that adapt to individual learners.
    This is the discovery prompt that creates personalized educational pathways.
    """

    # Generate unique curriculum ID
    curriculum_id = f"curriculum_{uuid.uuid4().hex[:8]}"
    
    # Analyze subject and determine learning domain
    subject_analysis = await _analyze_subject_domain(subject)
    
    # Assess learner background and current level
    learner_assessment = await _assess_learner_background(learner_background, subject_analysis)
    
    # Parse and analyze learning goals
    goals_analysis = await _analyze_learning_goals(learning_goals, subject_analysis)
    
    # Calculate time requirements and create schedule
    time_analysis = await _analyze_time_constraints(time_available, goals_analysis)
    
    # Design optimal learning path
    learning_path = await _design_learning_path(
        subject_analysis, learner_assessment, goals_analysis, time_analysis
    )
    
    # Generate adaptive curriculum structure
    curriculum_structure = await _create_curriculum_structure(learning_path)
    
    # Create assessment and tracking plan
    assessment_plan = await _design_assessment_plan(curriculum_structure)
    
    # Generate resource recommendations
    resource_recommendations = await _recommend_learning_resources(curriculum_structure, learner_assessment)
    
    # Create learning path summary
    learning_summary = f"""
🎓 **Adaptive Learning Path Created: {subject}**

**Curriculum ID:** `{curriculum_id}`
**Subject Domain:** {subject_analysis['domain']}
**Difficulty Progression:** {learner_assessment['starting_level']} → {goals_analysis['target_level']}
**Estimated Duration:** {time_analysis['total_duration']}

**Learner Profile:**
{_format_learner_profile(learner_assessment)}

**Learning Objectives:**
{_format_learning_objectives(goals_analysis)}

**Curriculum Structure:**
{_format_curriculum_structure(curriculum_structure)}

**Learning Path Progression:**
{_format_learning_progression(learning_path)}

**Assessment Strategy:**
{_format_assessment_plan(assessment_plan)}

**Recommended Resources:**
{_format_resource_recommendations(resource_recommendations)}

**Adaptive Features:**
{_format_adaptive_features(curriculum_structure)}

**Personalization Settings:**
{_format_personalization_settings(learner_assessment, time_analysis)}

**Success Metrics:**
{_format_success_metrics(goals_analysis)}

**Available Actions:**
• Use `/learning-documentation/knowledge-assessment {subject}` to baseline current knowledge
• Run `/learning-documentation/content-generation tutorial {subject}` for first lesson
• Use `create-tutorial` tool to build interactive learning modules
• Use `generate-quiz` tool to create knowledge checkpoints

**Next Steps:**
{_generate_next_steps(curriculum_structure, learner_assessment)}

**Learning Path Ready ✅**
Curriculum `{curriculum_id}` is designed and ready for personalized learning!
"""

    # Store curriculum data for later use
    await _store_curriculum_data(curriculum_id, {
        "subject": subject,
        "learner_background": learner_background,
        "learning_goals": learning_goals,
        "time_available": time_available,
        "subject_analysis": subject_analysis,
        "learner_assessment": learner_assessment,
        "goals_analysis": goals_analysis,
        "learning_path": learning_path,
        "curriculum_structure": curriculum_structure,
        "assessment_plan": assessment_plan,
        "resource_recommendations": resource_recommendations,
        "created_at": datetime.now().isoformat()
    })

    return learning_summary


async def _analyze_subject_domain(subject: str) -> Dict:
    """Analyze the subject and determine learning domain characteristics."""
    
    subject_lower = subject.lower()
    
    # Define domain categories and their characteristics
    domain_mapping = {
        "programming": {
            "keywords": ["python", "javascript", "java", "coding", "programming", "software", "development", "react", "api"],
            "learning_style": "hands_on",
            "theory_to_practice_ratio": 0.3,
            "requires_tools": True,
            "difficulty_curve": "gradual",
            "practice_emphasis": "high"
        },
        "data_science": {
            "keywords": ["data", "analytics", "machine learning", "statistics", "ai", "ml", "pandas", "numpy"],
            "learning_style": "mixed",
            "theory_to_practice_ratio": 0.5,
            "requires_tools": True,
            "difficulty_curve": "steep",
            "practice_emphasis": "high"
        },
        "design": {
            "keywords": ["design", "ui", "ux", "graphics", "photoshop", "figma", "visual", "creative"],
            "learning_style": "visual",
            "theory_to_practice_ratio": 0.2,
            "requires_tools": True,
            "difficulty_curve": "gradual",
            "practice_emphasis": "very_high"
        },
        "business": {
            "keywords": ["business", "management", "marketing", "strategy", "finance", "entrepreneurship"],
            "learning_style": "case_study",
            "theory_to_practice_ratio": 0.6,
            "requires_tools": False,
            "difficulty_curve": "moderate",
            "practice_emphasis": "medium"
        },
        "mathematics": {
            "keywords": ["math", "calculus", "algebra", "geometry", "statistics", "probability"],
            "learning_style": "problem_solving",
            "theory_to_practice_ratio": 0.7,
            "requires_tools": False,
            "difficulty_curve": "steep",
            "practice_emphasis": "very_high"
        },
        "language": {
            "keywords": ["language", "english", "spanish", "french", "writing", "grammar", "communication"],
            "learning_style": "immersive",
            "theory_to_practice_ratio": 0.3,
            "requires_tools": False,
            "difficulty_curve": "gradual",
            "practice_emphasis": "very_high"
        },
        "science": {
            "keywords": ["physics", "chemistry", "biology", "science", "research", "laboratory"],
            "learning_style": "experimental",
            "theory_to_practice_ratio": 0.6,
            "requires_tools": True,
            "difficulty_curve": "moderate",
            "practice_emphasis": "high"
        }
    }
    
    # Find best matching domain
    best_domain = "general"
    max_matches = 0
    
    for domain, characteristics in domain_mapping.items():
        matches = sum(1 for keyword in characteristics["keywords"] if keyword in subject_lower)
        if matches > max_matches:
            max_matches = matches
            best_domain = domain
            domain_characteristics = characteristics
    
    if best_domain == "general":
        domain_characteristics = {
            "learning_style": "mixed",
            "theory_to_practice_ratio": 0.5,
            "requires_tools": False,
            "difficulty_curve": "moderate",
            "practice_emphasis": "medium"
        }
    
    # Analyze complexity indicators
    complexity_indicators = []
    complexity_keywords = {
        "advanced": ["advanced", "expert", "professional", "master", "deep dive"],
        "intermediate": ["intermediate", "beyond basics", "next level"],
        "foundational": ["basics", "fundamentals", "introduction", "beginner", "getting started"]
    }
    
    for level, keywords in complexity_keywords.items():
        if any(keyword in subject_lower for keyword in keywords):
            complexity_indicators.append(level)
    
    # Determine subject complexity
    if "advanced" in complexity_indicators:
        subject_complexity = "advanced"
    elif "intermediate" in complexity_indicators:
        subject_complexity = "intermediate"
    elif "foundational" in complexity_indicators:
        subject_complexity = "foundational"
    else:
        subject_complexity = "intermediate"  # Default
    
    return {
        "domain": best_domain,
        "characteristics": domain_characteristics,
        "complexity": subject_complexity,
        "complexity_indicators": complexity_indicators,
        "subject_keywords": [kw for kw in domain_characteristics["keywords"] if kw in subject_lower]
    }


async def _assess_learner_background(background: str, subject_analysis: Dict) -> Dict:
    """Assess learner's current knowledge level and learning preferences."""
    
    if not background:
        return {
            "starting_level": "beginner",
            "prior_experience": "none",
            "learning_preferences": "unknown",
            "confidence_score": 50,
            "estimated_foundation": "basic"
        }
    
    background_lower = background.lower()
    
    # Assess experience level
    experience_indicators = {
        "expert": ["expert", "professional", "years of experience", "senior", "lead", "architect"],
        "advanced": ["advanced", "experienced", "proficient", "working knowledge", "some experience"],
        "intermediate": ["intermediate", "basic knowledge", "familiar with", "studied", "learning"],
        "beginner": ["beginner", "new to", "starting", "no experience", "never used"]
    }
    
    starting_level = "beginner"
    for level, indicators in experience_indicators.items():
        if any(indicator in background_lower for indicator in indicators):
            starting_level = level
            break
    
    # Assess learning preferences from background
    preference_indicators = {
        "hands_on": ["hands-on", "practical", "doing", "building", "projects"],
        "visual": ["visual", "diagrams", "examples", "seeing"],
        "theoretical": ["theory", "concepts", "understanding", "reading", "books"],
        "collaborative": ["team", "group", "discussion", "mentoring"]
    }
    
    detected_preferences = []
    for preference, indicators in preference_indicators.items():
        if any(indicator in background_lower for indicator in indicators):
            detected_preferences.append(preference)
    
    if not detected_preferences:
        # Use domain default
        detected_preferences = [subject_analysis["characteristics"]["learning_style"]]
    
    # Calculate confidence score based on background detail and experience
    confidence_score = 50  # Base
    if len(background.split()) > 10:
        confidence_score += 20  # Detailed background
    if starting_level in ["advanced", "expert"]:
        confidence_score += 25
    elif starting_level == "intermediate":
        confidence_score += 15
    
    # Assess foundation knowledge
    foundation_keywords = ["foundation", "basics", "fundamentals", "principles", "core concepts"]
    has_foundation = any(keyword in background_lower for keyword in foundation_keywords)
    
    if starting_level in ["advanced", "expert"]:
        foundation = "strong"
    elif starting_level == "intermediate" or has_foundation:
        foundation = "moderate"
    else:
        foundation = "basic"
    
    return {
        "starting_level": starting_level,
        "prior_experience": background,
        "learning_preferences": detected_preferences,
        "confidence_score": min(confidence_score, 95),
        "estimated_foundation": foundation,
        "background_detail_level": "high" if len(background.split()) > 15 else "medium" if len(background.split()) > 5 else "low"
    }


async def _analyze_learning_goals(goals: str, subject_analysis: Dict) -> Dict:
    """Analyze learning goals and determine target outcomes."""
    
    if not goals:
        # Generate default goals based on subject
        default_goals = {
            "programming": "Build practical programming skills and create real projects",
            "data_science": "Analyze data and build predictive models",
            "design": "Create professional designs and understand design principles",
            "business": "Develop strategic thinking and business acumen",
            "mathematics": "Master mathematical concepts and problem-solving",
            "language": "Achieve conversational fluency and communication skills",
            "science": "Understand scientific principles and apply them practically"
        }
        
        goals = default_goals.get(subject_analysis["domain"], "Master the fundamentals and apply them practically")
    
    goals_lower = goals.lower()
    
    # Analyze goal type
    goal_types = {
        "career": ["job", "career", "professional", "work", "employment", "promotion"],
        "academic": ["exam", "course", "degree", "certification", "study", "test"],
        "personal": ["hobby", "interest", "personal", "fun", "curiosity"],
        "project": ["project", "build", "create", "develop", "make"]
    }
    
    detected_goal_types = []
    for goal_type, indicators in goal_types.items():
        if any(indicator in goals_lower for indicator in indicators):
            detected_goal_types.append(goal_type)
    
    if not detected_goal_types:
        detected_goal_types = ["personal"]  # Default
    
    # Determine target level
    target_indicators = {
        "mastery": ["master", "expert", "advanced", "professional level"],
        "proficiency": ["proficient", "good at", "skilled", "competent"],
        "competency": ["understand", "know", "familiar", "basics", "fundamentals"],
        "exposure": ["introduction", "overview", "awareness", "basics"]
    }
    
    target_level = "competency"  # Default
    for level, indicators in target_indicators.items():
        if any(indicator in goals_lower for indicator in indicators):
            target_level = level
            break
    
    # Extract specific outcomes
    outcome_keywords = ["build", "create", "analyze", "design", "solve", "implement", "understand"]
    specific_outcomes = [word for word in goals.split() if any(kw in word.lower() for kw in outcome_keywords)]
    
    # Determine urgency
    urgency_indicators = {
        "urgent": ["asap", "urgent", "quickly", "fast", "soon", "deadline"],
        "moderate": ["few months", "semester", "this year"],
        "relaxed": ["eventually", "no rush", "when possible", "long term"]
    }
    
    urgency = "moderate"  # Default
    for urgency_level, indicators in urgency_indicators.items():
        if any(indicator in goals_lower for indicator in indicators):
            urgency = urgency_level
            break
    
    return {
        "goal_types": detected_goal_types,
        "target_level": target_level,
        "specific_outcomes": specific_outcomes,
        "urgency": urgency,
        "raw_goals": goals,
        "measurable_outcomes": _extract_measurable_outcomes(goals)
    }


def _extract_measurable_outcomes(goals: str) -> List[str]:
    """Extract measurable learning outcomes from goals."""
    
    outcomes = []
    
    # Common patterns for measurable outcomes
    measurable_patterns = [
        "build a", "create a", "complete a", "pass the", "achieve",
        "demonstrate", "apply", "solve", "implement", "design"
    ]
    
    sentences = goals.split('.')
    for sentence in sentences:
        sentence = sentence.strip().lower()
        if any(pattern in sentence for pattern in measurable_patterns):
            outcomes.append(sentence.capitalize())
    
    if not outcomes:
        # Generate default measurable outcomes
        outcomes = [
            "Demonstrate understanding of core concepts",
            "Complete practical exercises successfully",
            "Apply knowledge to real-world scenarios"
        ]
    
    return outcomes[:5]  # Limit to top 5


async def _analyze_time_constraints(time_available: str, goals_analysis: Dict) -> Dict:
    """Analyze time constraints and create realistic scheduling."""
    
    time_lower = time_available.lower()
    
    # Parse time indicators
    if "hour" in time_lower:
        if "per day" in time_lower or "daily" in time_lower:
            hours_per_day = 1
            if any(num in time_lower for num in ["2", "two"]):
                hours_per_day = 2
            elif any(num in time_lower for num in ["3", "three"]):
                hours_per_day = 3
        else:
            hours_per_day = 0.5  # Assume less frequent
    elif "week" in time_lower:
        if "per week" in time_lower or "weekly" in time_lower:
            hours_per_week = 5
            if any(num in time_lower for num in ["10", "ten"]):
                hours_per_week = 10
        else:
            hours_per_week = 3
        hours_per_day = hours_per_week / 7
    elif "flexible" in time_lower or not time_available:
        hours_per_day = 1  # Default assumption
    else:
        hours_per_day = 1  # Default
    
    # Calculate based on goals urgency
    urgency = goals_analysis["urgency"]
    if urgency == "urgent":
        recommended_hours_per_day = max(hours_per_day, 2)
        total_duration_weeks = 4
    elif urgency == "moderate":
        recommended_hours_per_day = max(hours_per_day, 1)
        total_duration_weeks = 8
    else:  # relaxed
        recommended_hours_per_day = hours_per_day
        total_duration_weeks = 12
    
    total_hours = recommended_hours_per_day * 7 * total_duration_weeks
    
    return {
        "hours_per_day": hours_per_day,
        "recommended_hours_per_day": recommended_hours_per_day,
        "total_duration_weeks": total_duration_weeks,
        "total_hours": total_hours,
        "schedule_flexibility": "high" if "flexible" in time_lower else "medium",
        "intensity": "high" if recommended_hours_per_day >= 2 else "moderate"
    }


async def _design_learning_path(
    subject_analysis: Dict,
    learner_assessment: Dict, 
    goals_analysis: Dict,
    time_analysis: Dict
) -> Dict:
    """Design the optimal learning path progression."""
    
    domain = subject_analysis["domain"]
    starting_level = learner_assessment["starting_level"]
    target_level = goals_analysis["target_level"]
    
    # Define learning progression stages
    progression_stages = {
        "programming": [
            {"stage": "Foundation", "focus": "Syntax and basic concepts", "percentage": 25},
            {"stage": "Practice", "focus": "Small projects and exercises", "percentage": 30},
            {"stage": "Integration", "focus": "Larger projects and patterns", "percentage": 30},
            {"stage": "Mastery", "focus": "Complex applications and best practices", "percentage": 15}
        ],
        "data_science": [
            {"stage": "Mathematics", "focus": "Statistics and probability", "percentage": 20},
            {"stage": "Tools", "focus": "Python/R and libraries", "percentage": 25},
            {"stage": "Analysis", "focus": "Data manipulation and visualization", "percentage": 30},
            {"stage": "Modeling", "focus": "Machine learning and advanced techniques", "percentage": 25}
        ],
        "design": [
            {"stage": "Principles", "focus": "Design theory and fundamentals", "percentage": 20},
            {"stage": "Tools", "focus": "Software and techniques", "percentage": 30},
            {"stage": "Practice", "focus": "Projects and portfolio building", "percentage": 35},
            {"stage": "Refinement", "focus": "Advanced techniques and style", "percentage": 15}
        ]
    }
    
    # Get progression for domain or use general progression
    stages = progression_stages.get(domain, [
        {"stage": "Foundation", "focus": "Core concepts and terminology", "percentage": 30},
        {"stage": "Application", "focus": "Practical exercises and examples", "percentage": 40},
        {"stage": "Integration", "focus": "Complex scenarios and projects", "percentage": 30}
    ])
    
    # Adjust stages based on starting level
    if starting_level in ["advanced", "expert"]:
        # Skip or reduce foundation
        for stage in stages:
            if stage["stage"] == "Foundation":
                stage["percentage"] = max(10, stage["percentage"] - 15)
    elif starting_level == "beginner":
        # Strengthen foundation
        for stage in stages:
            if stage["stage"] == "Foundation":
                stage["percentage"] = min(40, stage["percentage"] + 10)
    
    # Calculate time allocation
    total_hours = time_analysis["total_hours"]
    for stage in stages:
        stage["hours"] = (stage["percentage"] / 100) * total_hours
        stage["weeks"] = stage["hours"] / (time_analysis["recommended_hours_per_day"] * 7)
    
    return {
        "stages": stages,
        "progression_type": "adaptive",
        "total_stages": len(stages),
        "learning_velocity": "fast" if time_analysis["intensity"] == "high" else "moderate"
    }


async def _create_curriculum_structure(learning_path: Dict) -> Dict:
    """Create detailed curriculum structure with modules and lessons."""
    
    modules = []
    
    for i, stage in enumerate(learning_path["stages"]):
        # Create modules for each stage
        module_count = max(2, int(stage["weeks"] / 1.5))  # ~1.5 weeks per module
        
        for j in range(module_count):
            module = {
                "module_id": f"module_{i+1}_{j+1}",
                "stage": stage["stage"],
                "name": f"{stage['stage']} Module {j+1}",
                "focus": stage["focus"],
                "estimated_hours": stage["hours"] / module_count,
                "estimated_weeks": stage["weeks"] / module_count,
                "difficulty_level": _calculate_module_difficulty(i, j, module_count),
                "learning_objectives": _generate_module_objectives(stage["stage"], stage["focus"]),
                "assessment_type": _determine_assessment_type(stage["stage"]),
                "prerequisites": _determine_prerequisites(i, j),
                "adaptive_elements": _define_adaptive_elements(stage["stage"])
            }
            modules.append(module)
    
    return {
        "modules": modules,
        "total_modules": len(modules),
        "adaptive_branching": True,
        "personalization_level": "high",
        "assessment_frequency": "per_module"
    }


def _calculate_module_difficulty(stage_index: int, module_index: int, total_modules: int) -> str:
    """Calculate difficulty level for a module."""
    
    # Base difficulty increases with stage
    base_difficulty = stage_index * 0.3
    
    # Difficulty increases within stage
    module_difficulty = base_difficulty + (module_index / total_modules) * 0.4
    
    if module_difficulty < 0.3:
        return "beginner"
    elif module_difficulty < 0.6:
        return "intermediate"
    else:
        return "advanced"


def _generate_module_objectives(stage: str, focus: str) -> List[str]:
    """Generate learning objectives for a module."""
    
    objective_templates = {
        "Foundation": [
            f"Understand core {focus.lower()} concepts",
            f"Apply basic {focus.lower()} principles",
            f"Identify key components of {focus.lower()}"
        ],
        "Practice": [
            f"Implement {focus.lower()} in practical scenarios",
            f"Create projects using {focus.lower()}",
            f"Debug and troubleshoot {focus.lower()}"
        ],
        "Integration": [
            f"Combine {focus.lower()} with other concepts",
            f"Design complex solutions using {focus.lower()}",
            f"Optimize {focus.lower()} for real-world use"
        ],
        "Mastery": [
            f"Master advanced {focus.lower()} techniques",
            f"Teach {focus.lower()} to others",
            f"Innovate new approaches to {focus.lower()}"
        ]
    }
    
    return objective_templates.get(stage, [
        f"Learn about {focus.lower()}",
        f"Practice {focus.lower()}",
        f"Apply {focus.lower()}"
    ])


def _determine_assessment_type(stage: str) -> str:
    """Determine appropriate assessment type for stage."""
    
    assessment_mapping = {
        "Foundation": "quiz",
        "Practice": "project", 
        "Integration": "portfolio",
        "Mastery": "capstone",
        "Mathematics": "problem_solving",
        "Tools": "hands_on",
        "Analysis": "case_study",
        "Modeling": "project"
    }
    
    return assessment_mapping.get(stage, "mixed")


def _determine_prerequisites(stage_index: int, module_index: int) -> List[str]:
    """Determine prerequisites for a module."""
    
    if stage_index == 0 and module_index == 0:
        return []  # First module has no prerequisites
    elif module_index == 0:
        return [f"Complete Stage {stage_index}"]  # First module of new stage
    else:
        return [f"module_{stage_index+1}_{module_index}"]  # Previous module


def _define_adaptive_elements(stage: str) -> List[str]:
    """Define adaptive learning elements for the stage."""
    
    adaptive_elements = {
        "Foundation": ["difficulty_adjustment", "concept_reinforcement", "prerequisite_review"],
        "Practice": ["project_complexity", "hint_system", "alternative_approaches"],
        "Integration": ["scaffolding_removal", "advanced_challenges", "peer_collaboration"],
        "Mastery": ["self_directed_learning", "mentoring_opportunities", "innovation_projects"]
    }
    
    return adaptive_elements.get(stage, ["difficulty_adjustment", "personalized_feedback"])


async def _design_assessment_plan(curriculum_structure: Dict) -> Dict:
    """Design comprehensive assessment and tracking plan."""
    
    modules = curriculum_structure["modules"]
    
    assessments = []
    
    for module in modules:
        assessment = {
            "module_id": module["module_id"],
            "assessment_type": module["assessment_type"],
            "timing": "end_of_module",
            "weight": 100 / len(modules),  # Equal weighting
            "adaptive": True,
            "feedback_type": "immediate",
            "retake_policy": "unlimited",
            "mastery_threshold": 80  # 80% to proceed
        }
        assessments.append(assessment)
    
    return {
        "assessments": assessments,
        "overall_strategy": "mastery_based",
        "progress_tracking": "continuous",
        "feedback_frequency": "immediate",
        "adaptive_difficulty": True,
        "competency_based": True
    }


async def _recommend_learning_resources(curriculum_structure: Dict, learner_assessment: Dict) -> Dict:
    """Recommend learning resources based on curriculum and learner profile."""
    
    learning_preferences = learner_assessment["learning_preferences"]
    
    resource_types = {
        "hands_on": ["interactive_tutorials", "coding_exercises", "project_templates"],
        "visual": ["video_lectures", "infographics", "mind_maps", "diagrams"],
        "theoretical": ["textbooks", "research_papers", "comprehensive_guides"],
        "collaborative": ["discussion_forums", "study_groups", "peer_programming"]
    }
    
    recommended_resources = []
    
    for preference in learning_preferences:
        if preference in resource_types:
            recommended_resources.extend(resource_types[preference])
    
    # Add default resources if none specified
    if not recommended_resources:
        recommended_resources = ["interactive_tutorials", "video_lectures", "practice_exercises"]
    
    # Remove duplicates while preserving order
    unique_resources = list(dict.fromkeys(recommended_resources))
    
    return {
        "primary_resources": unique_resources[:3],
        "supplementary_resources": unique_resources[3:],
        "resource_categories": {
            "interactive": ["interactive_tutorials", "coding_exercises"],
            "content": ["video_lectures", "textbooks", "guides"], 
            "practice": ["practice_exercises", "project_templates"],
            "social": ["discussion_forums", "study_groups"]
        },
        "personalization_level": "high"
    }


def _format_learner_profile(assessment: Dict) -> str:
    """Format learner profile for display."""
    
    lines = [
        f"📊 Starting Level: {assessment['starting_level'].title()}",
        f"🎯 Foundation: {assessment['estimated_foundation'].title()}",
        f"📈 Confidence: {assessment['confidence_score']}%",
        f"🎨 Learning Style: {', '.join(assessment['learning_preferences']).title()}"
    ]
    
    if assessment['prior_experience'] != "none":
        lines.append(f"💼 Experience: {assessment['prior_experience'][:100]}...")
    
    return "\n".join(lines)


def _format_learning_objectives(goals: Dict) -> str:
    """Format learning objectives for display."""
    
    lines = [
        f"🎯 Target Level: {goals['target_level'].title()}",
        f"📋 Goal Type: {', '.join(goals['goal_types']).title()}",
        f"⏰ Timeline: {goals['urgency'].title()}"
    ]
    
    lines.append("\n**Measurable Outcomes:**")
    for outcome in goals['measurable_outcomes']:
        lines.append(f"• {outcome}")
    
    return "\n".join(lines)


def _format_curriculum_structure(structure: Dict) -> str:
    """Format curriculum structure for display."""
    
    lines = [
        f"📚 Total Modules: {structure['total_modules']}",
        f"🎯 Personalization: {structure['personalization_level'].title()}",
        f"🔄 Adaptive Branching: {'Enabled' if structure['adaptive_branching'] else 'Disabled'}",
        f"📊 Assessments: {structure['assessment_frequency'].replace('_', ' ').title()}"
    ]
    
    return "\n".join(lines)


def _format_learning_progression(path: Dict) -> str:
    """Format learning progression for display."""
    
    lines = []
    
    for i, stage in enumerate(path["stages"], 1):
        lines.append(f"{i}. **{stage['stage']}** ({stage['weeks']:.1f} weeks, {stage['hours']:.0f} hours)")
        lines.append(f"   Focus: {stage['focus']}")
        lines.append(f"   Weight: {stage['percentage']}% of curriculum")
        lines.append("")
    
    return "\n".join(lines)


def _format_assessment_plan(plan: Dict) -> str:
    """Format assessment plan for display."""
    
    lines = [
        f"📋 Strategy: {plan['overall_strategy'].replace('_', ' ').title()}",
        f"📊 Progress Tracking: {plan['progress_tracking'].title()}",
        f"💬 Feedback: {plan['feedback_frequency'].title()}",
        f"🎯 Mastery Threshold: 80%",
        f"🔄 Adaptive Difficulty: {'Enabled' if plan['adaptive_difficulty'] else 'Disabled'}"
    ]
    
    return "\n".join(lines)


def _format_resource_recommendations(resources: Dict) -> str:
    """Format resource recommendations for display."""
    
    lines = [
        f"🎯 Primary Resources: {', '.join(resources['primary_resources']).replace('_', ' ').title()}",
        f"📚 Supplementary: {', '.join(resources['supplementary_resources'][:3]).replace('_', ' ').title()}",
        f"🎨 Personalization: {resources['personalization_level'].title()}"
    ]
    
    return "\n".join(lines)


def _format_adaptive_features(structure: Dict) -> str:
    """Format adaptive features for display."""
    
    lines = [
        "🤖 **Intelligent Adaptation:**",
        "• Difficulty adjusts based on performance",
        "• Content personalizes to learning style", 
        "• Pacing adapts to individual progress",
        "• Resources recommended based on needs",
        "• Assessment complexity scales appropriately"
    ]
    
    return "\n".join(lines)


def _format_personalization_settings(assessment: Dict, time_analysis: Dict) -> str:
    """Format personalization settings for display."""
    
    lines = [
        f"⏰ Study Schedule: {time_analysis['recommended_hours_per_day']:.1f} hours/day",
        f"🎨 Learning Style: {', '.join(assessment['learning_preferences']).title()}",
        f"📊 Difficulty Scaling: Based on {assessment['starting_level']} level",
        f"🔄 Flexibility: {time_analysis['schedule_flexibility'].title()}"
    ]
    
    return "\n".join(lines)


def _format_success_metrics(goals: Dict) -> str:
    """Format success metrics for display."""
    
    lines = [
        "📈 **Success Indicators:**",
        "• Module completion rates > 90%",
        "• Assessment scores > 80%",
        "• Time-to-competency tracking",
        "• Skill application in projects",
        "• Learner satisfaction scores"
    ]
    
    if goals['target_level'] == "mastery":
        lines.append("• Portfolio project completion")
        lines.append("• Peer teaching capability")
    
    return "\n".join(lines)


def _generate_next_steps(curriculum: Dict, assessment: Dict) -> str:
    """Generate recommended next steps."""
    
    steps = []
    
    # Based on learner level
    if assessment["starting_level"] == "beginner":
        steps.append("🎯 Start with knowledge assessment to confirm baseline")
        steps.append("📚 Begin with foundation modules for solid grounding")
    else:
        steps.append("🧪 Take diagnostic assessment to identify knowledge gaps")
        steps.append("⚡ Consider accelerated track through familiar concepts")
    
    # Based on learning preferences
    if "hands_on" in assessment["learning_preferences"]:
        steps.append("🛠️ Focus on interactive tutorials and practical exercises")
    
    if "visual" in assessment["learning_preferences"]:
        steps.append("🎥 Prioritize video content and visual learning materials")
    
    # Always include these
    steps.append("📊 Set up progress tracking and milestone celebrations")
    
    return "\n".join(f"• {step}" for step in steps[:4])


async def _store_curriculum_data(curriculum_id: str, data: Dict) -> None:
    """Store curriculum data for later retrieval."""
    # In real implementation, would save to database or file system
    pass
