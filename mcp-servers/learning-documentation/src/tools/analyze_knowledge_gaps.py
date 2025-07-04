"""
Analyze Knowledge Gaps Tool
Identify learning needs and knowledge gaps through intelligent analysis.
"""

from typing import Dict, List
from datetime import datetime
import json


async def analyze_knowledge_gaps_tool(
    learner_profile: str,
    target_skills: List[str],
    assessment_data: Dict = None
) -> Dict:
    """
    Analyze knowledge gaps and identify learning needs with intelligent recommendations.
    """

    try:
        # Parse learner profile
        profile_analysis = await _parse_learner_profile(learner_profile)
        
        # Analyze target skills requirements
        skills_analysis = await _analyze_target_skills(target_skills)
        
        # Assess current knowledge level
        current_knowledge = await _assess_current_knowledge(profile_analysis, assessment_data)
        
        # Identify knowledge gaps
        knowledge_gaps = await _identify_knowledge_gaps(current_knowledge, skills_analysis)
        
        # Prioritize learning needs
        learning_priorities = await _prioritize_learning_needs(knowledge_gaps, skills_analysis)
        
        # Generate learning path recommendations
        learning_recommendations = await _generate_learning_recommendations(knowledge_gaps, learning_priorities)
        
        return {
            "success": True,
            "learner_profile": profile_analysis,
            "target_skills": skills_analysis,
            "current_knowledge": current_knowledge,
            "knowledge_gaps": knowledge_gaps,
            "learning_priorities": learning_priorities,
            "recommendations": learning_recommendations,
            "gap_analysis_summary": _create_gap_analysis_summary(knowledge_gaps, learning_priorities),
            "next_steps": _generate_next_steps(learning_priorities),
            "estimated_learning_time": _estimate_learning_time(knowledge_gaps),
            "analysis_date": datetime.now().isoformat()
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Knowledge gap analysis failed: {str(e)}",
            "message": "Unable to analyze knowledge gaps. Please check input data."
        }


async def _parse_learner_profile(profile: str) -> Dict:
    """Parse and analyze learner profile information."""
    
    if not profile:
        return {
            "experience_level": "unknown",
            "background": "not_specified",
            "learning_style": "unknown",
            "time_availability": "unknown",
            "confidence_indicators": []
        }
    
    profile_lower = profile.lower()
    
    # Determine experience level
    experience_indicators = {
        "expert": ["expert", "professional", "years of experience", "senior", "lead", "advanced"],
        "intermediate": ["intermediate", "some experience", "familiar", "working knowledge", "proficient"],
        "beginner": ["beginner", "new to", "starting", "learning", "basic", "no experience"]
    }
    
    experience_level = "unknown"
    for level, indicators in experience_indicators.items():
        if any(indicator in profile_lower for indicator in indicators):
            experience_level = level
            break
    
    # Identify background domain
    domain_indicators = {
        "technical": ["programming", "software", "development", "engineering", "computer science"],
        "business": ["business", "management", "finance", "marketing", "sales"],
        "academic": ["student", "university", "research", "academic", "studying"],
        "creative": ["design", "art", "creative", "media", "graphics"],
        "healthcare": ["medical", "healthcare", "nursing", "doctor", "clinical"],
        "education": ["teacher", "educator", "training", "instruction"]
    }
    
    background = "general"
    for domain, indicators in domain_indicators.items():
        if any(indicator in profile_lower for indicator in indicators):
            background = domain
            break
    
    # Identify learning style preferences
    learning_style_indicators = {
        "hands_on": ["hands-on", "practical", "doing", "building", "experimenting"],
        "visual": ["visual", "seeing", "diagrams", "charts", "images"],
        "auditory": ["listening", "discussing", "explaining", "hearing"],
        "reading": ["reading", "books", "documentation", "written"]
    }
    
    learning_styles = []
    for style, indicators in learning_style_indicators.items():
        if any(indicator in profile_lower for indicator in indicators):
            learning_styles.append(style)
    
    # Assess time availability
    time_indicators = {
        "high": ["full-time", "lots of time", "flexible schedule", "available"],
        "medium": ["part-time", "evenings", "weekends", "moderate"],
        "low": ["busy", "limited time", "minimal", "tight schedule"]
    }
    
    time_availability = "unknown"
    for availability, indicators in time_indicators.items():
        if any(indicator in profile_lower for indicator in indicators):
            time_availability = availability
            break
    
    # Extract confidence indicators
    confidence_indicators = []
    confidence_words = ["confident", "comfortable", "familiar", "experienced", "skilled"]
    nervous_words = ["nervous", "anxious", "uncertain", "worried", "intimidated"]
    
    for word in confidence_words:
        if word in profile_lower:
            confidence_indicators.append(f"positive: {word}")
    
    for word in nervous_words:
        if word in profile_lower:
            confidence_indicators.append(f"concern: {word}")
    
    return {
        "experience_level": experience_level,
        "background": background,
        "learning_style": learning_styles[0] if learning_styles else "unknown",
        "learning_styles_all": learning_styles,
        "time_availability": time_availability,
        "confidence_indicators": confidence_indicators,
        "profile_detail_level": len(profile.split())
    }


async def _analyze_target_skills(target_skills: List[str]) -> Dict:
    """Analyze target skills and their requirements."""
    
    skills_analysis = {
        "total_skills": len(target_skills),
        "skill_categories": {},
        "complexity_levels": {},
        "skill_relationships": {},
        "learning_sequence": []
    }
    
    # Categorize skills
    skill_categories = {
        "technical": ["programming", "coding", "software", "database", "api", "framework"],
        "analytical": ["analysis", "data", "statistics", "research", "problem solving"],
        "creative": ["design", "writing", "creativity", "visual", "artistic"],
        "business": ["management", "leadership", "strategy", "finance", "marketing"],
        "communication": ["presentation", "writing", "speaking", "collaboration"],
        "digital": ["social media", "digital marketing", "online", "web", "digital tools"]
    }
    
    for skill in target_skills:
        skill_lower = skill.lower()
        skill_category = "general"
        
        for category, keywords in skill_categories.items():
            if any(keyword in skill_lower for keyword in keywords):
                skill_category = category
                break
        
        if skill_category not in skills_analysis["skill_categories"]:
            skills_analysis["skill_categories"][skill_category] = []
        skills_analysis["skill_categories"][skill_category].append(skill)
        
        # Assess complexity
        complexity = _assess_skill_complexity(skill)
        skills_analysis["complexity_levels"][skill] = complexity
    
    # Determine learning sequence
    skills_analysis["learning_sequence"] = _determine_learning_sequence(target_skills, skills_analysis["complexity_levels"])
    
    # Identify skill relationships
    skills_analysis["skill_relationships"] = _identify_skill_relationships(target_skills)
    
    return skills_analysis


def _assess_skill_complexity(skill: str) -> str:
    """Assess the complexity level of a skill."""
    
    skill_lower = skill.lower()
    
    high_complexity_indicators = [
        "advanced", "expert", "machine learning", "ai", "algorithm", "architecture",
        "strategy", "leadership", "management", "complex", "sophisticated"
    ]
    
    low_complexity_indicators = [
        "basic", "introduction", "fundamentals", "beginner", "simple", "overview"
    ]
    
    if any(indicator in skill_lower for indicator in high_complexity_indicators):
        return "high"
    elif any(indicator in skill_lower for indicator in low_complexity_indicators):
        return "low"
    else:
        return "medium"


def _determine_learning_sequence(skills: List[str], complexity_levels: Dict) -> List[str]:
    """Determine optimal learning sequence for skills."""
    
    # Sort by complexity (low to high)
    sorted_skills = sorted(skills, key=lambda s: {
        "low": 1,
        "medium": 2, 
        "high": 3
    }.get(complexity_levels.get(s, "medium"), 2))
    
    return sorted_skills


def _identify_skill_relationships(skills: List[str]) -> Dict:
    """Identify relationships between skills."""
    
    relationships = {}
    
    # Common skill dependencies
    skill_dependencies = {
        "programming": ["basic computer skills", "logical thinking"],
        "data analysis": ["statistics", "programming", "critical thinking"],
        "machine learning": ["programming", "statistics", "data analysis"],
        "leadership": ["communication", "management", "emotional intelligence"],
        "digital marketing": ["marketing fundamentals", "analytics", "content creation"]
    }
    
    for skill in skills:
        skill_lower = skill.lower()
        for key_skill, dependencies in skill_dependencies.items():
            if key_skill in skill_lower:
                relationships[skill] = {
                    "prerequisites": dependencies,
                    "enables": []  # Skills this enables
                }
    
    return relationships


async def _assess_current_knowledge(profile_analysis: Dict, assessment_data: Dict) -> Dict:
    """Assess current knowledge level from profile and assessment data."""
    
    current_knowledge = {
        "overall_level": "unknown",
        "specific_skills": {},
        "strengths": [],
        "knowledge_areas": {},
        "confidence_level": 50  # Default middle confidence
    }
    
    # Base assessment on profile
    experience_level = profile_analysis["experience_level"]
    background = profile_analysis["background"]
    
    # Map experience to knowledge level
    experience_mapping = {
        "expert": 85,
        "intermediate": 65,
        "beginner": 25,
        "unknown": 50
    }
    
    base_knowledge_score = experience_mapping.get(experience_level, 50)
    
    # Adjust based on assessment data if available
    if assessment_data:
        assessment_score = assessment_data.get("overall_score", base_knowledge_score)
        skill_scores = assessment_data.get("skill_scores", {})
        
        # Weighted combination
        current_knowledge["overall_level"] = (base_knowledge_score * 0.4) + (assessment_score * 0.6)
        current_knowledge["specific_skills"] = skill_scores
        
        # Extract strengths from assessment
        if skill_scores:
            strong_skills = [skill for skill, score in skill_scores.items() if score > 75]
            current_knowledge["strengths"] = strong_skills
        
        # Update confidence
        if assessment_score > 70:
            current_knowledge["confidence_level"] = 80
        elif assessment_score < 50:
            current_knowledge["confidence_level"] = 40
    else:
        current_knowledge["overall_level"] = base_knowledge_score
        
        # Infer strengths from profile
        if experience_level in ["intermediate", "expert"]:
            current_knowledge["strengths"] = [f"{background} experience"]
    
    # Assess knowledge areas based on background
    knowledge_area_mapping = {
        "technical": ["programming concepts", "technical problem solving"],
        "business": ["business processes", "strategic thinking"],
        "academic": ["research methods", "analytical thinking"],
        "creative": ["creative processes", "design thinking"]
    }
    
    current_knowledge["knowledge_areas"] = knowledge_area_mapping.get(background, ["general knowledge"])
    
    return current_knowledge


async def _identify_knowledge_gaps(current_knowledge: Dict, skills_analysis: Dict) -> Dict:
    """Identify specific knowledge gaps."""
    
    gaps = {
        "critical_gaps": [],
        "moderate_gaps": [],
        "minor_gaps": [],
        "gap_categories": {},
        "overall_gap_score": 0
    }
    
    target_skills = []
    for category_skills in skills_analysis["skill_categories"].values():
        target_skills.extend(category_skills)
    
    current_skills = set(current_knowledge.get("strengths", []))
    current_areas = set(current_knowledge.get("knowledge_areas", []))
    
    # Calculate gaps for each target skill
    for skill in target_skills:
        skill_lower = skill.lower()
        
        # Check if skill is covered by current knowledge
        is_covered = any(
            current_skill.lower() in skill_lower or skill_lower in current_skill.lower()
            for current_skill in current_skills
        )
        
        if not is_covered:
            # Determine gap severity based on skill complexity
            complexity = skills_analysis["complexity_levels"].get(skill, "medium")
            
            gap_info = {
                "skill": skill,
                "complexity": complexity,
                "estimated_effort": _estimate_skill_learning_effort(skill, complexity),
                "priority": _calculate_gap_priority(skill, skills_analysis)
            }
            
            if complexity == "high" or gap_info["priority"] == "high":
                gaps["critical_gaps"].append(gap_info)
            elif complexity == "medium" or gap_info["priority"] == "medium":
                gaps["moderate_gaps"].append(gap_info)
            else:
                gaps["minor_gaps"].append(gap_info)
    
    # Categorize gaps
    for category, category_skills in skills_analysis["skill_categories"].items():
        category_gaps = []
        for skill in category_skills:
            for gap_level in ["critical_gaps", "moderate_gaps", "minor_gaps"]:
                category_gaps.extend([g for g in gaps[gap_level] if g["skill"] == skill])
        
        if category_gaps:
            gaps["gap_categories"][category] = category_gaps
    
    # Calculate overall gap score
    total_gaps = len(gaps["critical_gaps"]) + len(gaps["moderate_gaps"]) + len(gaps["minor_gaps"])
    total_skills = len(target_skills)
    gaps["overall_gap_score"] = (total_gaps / max(total_skills, 1)) * 100
    
    return gaps


def _estimate_skill_learning_effort(skill: str, complexity: str) -> Dict:
    """Estimate learning effort for a skill."""
    
    # Base effort by complexity
    base_hours = {
        "low": 10,
        "medium": 25,
        "high": 50
    }.get(complexity, 25)
    
    # Adjust based on skill type
    skill_lower = skill.lower()
    
    if any(indicator in skill_lower for indicator in ["programming", "coding", "development"]):
        base_hours *= 1.5  # Programming requires more practice
    elif any(indicator in skill_lower for indicator in ["design", "creative"]):
        base_hours *= 1.3  # Creative skills need iteration
    elif any(indicator in skill_lower for indicator in ["analysis", "data"]):
        base_hours *= 1.2  # Analytical skills need practice
    
    return {
        "estimated_hours": int(base_hours),
        "estimated_weeks": int(base_hours / 5),  # Assuming 5 hours per week
        "difficulty_level": complexity
    }


def _calculate_gap_priority(skill: str, skills_analysis: Dict) -> str:
    """Calculate priority for addressing a knowledge gap."""
    
    # High priority if it's a prerequisite for other skills
    skill_relationships = skills_analysis.get("skill_relationships", {})
    
    is_prerequisite = False
    for other_skill, relationships in skill_relationships.items():
        if skill.lower() in [prereq.lower() for prereq in relationships.get("prerequisites", [])]:
            is_prerequisite = True
            break
    
    if is_prerequisite:
        return "high"
    
    # Medium priority for complex skills
    complexity = skills_analysis["complexity_levels"].get(skill, "medium")
    if complexity == "high":
        return "medium"
    
    return "low"


async def _prioritize_learning_needs(knowledge_gaps: Dict, skills_analysis: Dict) -> Dict:
    """Prioritize learning needs based on gaps and requirements."""
    
    # Collect all gaps
    all_gaps = (knowledge_gaps["critical_gaps"] + 
                knowledge_gaps["moderate_gaps"] + 
                knowledge_gaps["minor_gaps"])
    
    # Score each gap
    prioritized_gaps = []
    
    for gap in all_gaps:
        priority_score = _calculate_priority_score(gap, skills_analysis)
        gap["priority_score"] = priority_score
        prioritized_gaps.append(gap)
    
    # Sort by priority score
    prioritized_gaps.sort(key=lambda x: x["priority_score"], reverse=True)
    
    # Create priority tiers
    high_priority = prioritized_gaps[:3]  # Top 3
    medium_priority = prioritized_gaps[3:6]  # Next 3
    low_priority = prioritized_gaps[6:]  # Rest
    
    return {
        "high_priority": high_priority,
        "medium_priority": medium_priority,
        "low_priority": low_priority,
        "recommended_order": [gap["skill"] for gap in prioritized_gaps],
        "immediate_focus": high_priority[0]["skill"] if high_priority else None
    }


def _calculate_priority_score(gap: Dict, skills_analysis: Dict) -> float:
    """Calculate priority score for a knowledge gap."""
    
    score = 0
    
    # Complexity contribution
    complexity_scores = {"low": 1, "medium": 2, "high": 3}
    score += complexity_scores.get(gap["complexity"], 2)
    
    # Priority contribution
    priority_scores = {"low": 1, "medium": 3, "high": 5}
    score += priority_scores.get(gap["priority"], 1)
    
    # Position in learning sequence (earlier = higher priority)
    learning_sequence = skills_analysis.get("learning_sequence", [])
    if gap["skill"] in learning_sequence:
        position = learning_sequence.index(gap["skill"])
        # Invert position (earlier in sequence = higher score)
        sequence_score = max(0, len(learning_sequence) - position)
        score += sequence_score * 0.5
    
    return score


async def _generate_learning_recommendations(knowledge_gaps: Dict, learning_priorities: Dict) -> Dict:
    """Generate specific learning recommendations."""
    
    recommendations = {
        "immediate_actions": [],
        "learning_path": [],
        "resource_suggestions": {},
        "time_management": {},
        "success_strategies": []
    }
    
    # Immediate actions
    if learning_priorities["immediate_focus"]:
        immediate_skill = learning_priorities["immediate_focus"]
        recommendations["immediate_actions"] = [
            f"Start with {immediate_skill} as your immediate focus",
            f"Take a diagnostic assessment in {immediate_skill}",
            f"Find beginner-friendly resources for {immediate_skill}",
            "Set up a consistent daily practice schedule"
        ]
    
    # Learning path
    recommended_order = learning_priorities["recommended_order"]
    for i, skill in enumerate(recommended_order[:5]):  # Top 5 skills
        path_item = {
            "step": i + 1,
            "skill": skill,
            "approach": _suggest_learning_approach(skill),
            "estimated_duration": _get_gap_effort(skill, knowledge_gaps),
            "key_resources": _suggest_key_resources(skill)
        }
        recommendations["learning_path"].append(path_item)
    
    # Resource suggestions by category
    gap_categories = knowledge_gaps.get("gap_categories", {})
    for category, gaps in gap_categories.items():
        category_resources = _suggest_category_resources(category)
        recommendations["resource_suggestions"][category] = category_resources
    
    # Time management
    total_effort = sum(_get_gap_effort(gap["skill"], knowledge_gaps)["estimated_hours"] 
                      for gap in learning_priorities["high_priority"])
    
    recommendations["time_management"] = {
        "total_learning_time": f"{total_effort} hours",
        "suggested_schedule": "1-2 hours per day, 5 days per week",
        "milestone_frequency": "Weekly progress reviews",
        "completion_timeline": f"{total_effort // 10} weeks"
    }
    
    # Success strategies
    recommendations["success_strategies"] = [
        "Focus on one skill at a time for deeper learning",
        "Practice regularly rather than cramming",
        "Apply skills to real projects immediately",
        "Join communities or find study partners",
        "Set specific, measurable learning goals"
    ]
    
    return recommendations


def _suggest_learning_approach(skill: str) -> str:
    """Suggest optimal learning approach for a skill."""
    
    skill_lower = skill.lower()
    
    if any(term in skill_lower for term in ["programming", "coding", "development"]):
        return "hands_on_coding"
    elif any(term in skill_lower for term in ["design", "creative"]):
        return "project_based"
    elif any(term in skill_lower for term in ["analysis", "data"]):
        return "case_study"
    elif any(term in skill_lower for term in ["management", "leadership"]):
        return "experiential_learning"
    else:
        return "structured_learning"


def _get_gap_effort(skill: str, knowledge_gaps: Dict) -> Dict:
    """Get effort estimate for a specific skill gap."""
    
    # Search through all gap levels
    for gap_level in ["critical_gaps", "moderate_gaps", "minor_gaps"]:
        for gap in knowledge_gaps[gap_level]:
            if gap["skill"] == skill:
                return gap["estimated_effort"]
    
    # Default if not found
    return {"estimated_hours": 20, "estimated_weeks": 4}


def _suggest_key_resources(skill: str) -> List[str]:
    """Suggest key resources for learning a skill."""
    
    skill_lower = skill.lower()
    
    if "programming" in skill_lower or "coding" in skill_lower:
        return ["Interactive coding platforms", "Project-based tutorials", "Code review communities"]
    elif "data" in skill_lower or "analysis" in skill_lower:
        return ["Dataset practice sites", "Analytics courses", "Visualization tools"]
    elif "design" in skill_lower:
        return ["Design tool tutorials", "Portfolio platforms", "Design communities"]
    elif "business" in skill_lower or "management" in skill_lower:
        return ["Case study libraries", "Business simulations", "Professional networks"]
    else:
        return ["Online courses", "Practice exercises", "Expert communities"]


def _suggest_category_resources(category: str) -> List[str]:
    """Suggest resources for a skill category."""
    
    category_resources = {
        "technical": ["Coding bootcamps", "Technical documentation", "Open source projects"],
        "analytical": ["Data science courses", "Statistics resources", "Research methodologies"],
        "creative": ["Design portfolios", "Creative challenges", "Inspiration galleries"],
        "business": ["MBA coursework", "Business case studies", "Industry reports"],
        "communication": ["Public speaking groups", "Writing workshops", "Presentation tools"],
        "digital": ["Digital marketing courses", "Social media academies", "Analytics platforms"]
    }
    
    return category_resources.get(category, ["General learning platforms", "Expert communities", "Practice resources"])


def _create_gap_analysis_summary(knowledge_gaps: Dict, learning_priorities: Dict) -> Dict:
    """Create summary of gap analysis."""
    
    total_gaps = (len(knowledge_gaps["critical_gaps"]) + 
                  len(knowledge_gaps["moderate_gaps"]) + 
                  len(knowledge_gaps["minor_gaps"]))
    
    return {
        "total_gaps_identified": total_gaps,
        "critical_gaps": len(knowledge_gaps["critical_gaps"]),
        "gap_coverage": f"{knowledge_gaps['overall_gap_score']:.1f}%",
        "immediate_focus_area": learning_priorities.get("immediate_focus", "Not specified"),
        "estimated_total_effort": sum(
            gap.get("estimated_effort", {}).get("estimated_hours", 0)
            for gaps in [knowledge_gaps["critical_gaps"], knowledge_gaps["moderate_gaps"]]
            for gap in gaps
        ),
        "priority_distribution": {
            "high": len(learning_priorities["high_priority"]),
            "medium": len(learning_priorities["medium_priority"]),
            "low": len(learning_priorities["low_priority"])
        }
    }


def _generate_next_steps(learning_priorities: Dict) -> List[str]:
    """Generate specific next steps for the learner."""
    
    next_steps = []
    
    if learning_priorities["immediate_focus"]:
        skill = learning_priorities["immediate_focus"]
        next_steps.extend([
            f"Begin learning {skill} immediately",
            f"Find 2-3 high-quality resources for {skill}",
            f"Set up daily practice schedule for {skill}",
            f"Join a community or forum related to {skill}"
        ])
    
    if learning_priorities["high_priority"]:
        next_steps.append("Focus on high-priority gaps first")
        next_steps.append("Create a structured learning plan")
    
    next_steps.extend([
        "Set weekly learning goals and track progress",
        "Apply new skills to real projects immediately",
        "Schedule regular progress reviews"
    ])
    
    return next_steps[:6]  # Limit to top 6 steps


def _estimate_learning_time(knowledge_gaps: Dict) -> Dict:
    """Estimate total learning time needed."""
    
    total_hours = 0
    breakdown = {}
    
    for gap_level in ["critical_gaps", "moderate_gaps", "minor_gaps"]:
        level_hours = sum(
            gap.get("estimated_effort", {}).get("estimated_hours", 0)
            for gap in knowledge_gaps[gap_level]
        )
        total_hours += level_hours
        breakdown[gap_level] = {
            "hours": level_hours,
            "weeks": level_hours // 5  # Assuming 5 hours per week
        }
    
    return {
        "total_hours": total_hours,
        "total_weeks": total_hours // 5,
        "breakdown_by_priority": breakdown,
        "daily_commitment": "1-2 hours recommended",
        "completion_estimate": f"{total_hours // 10} weeks at moderate pace"
    }
