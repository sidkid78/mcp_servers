"""
Generate Quiz Tool
Create adaptive quizzes and assessments with intelligent question generation.
"""

from typing import Dict, List
from datetime import datetime
import json
import random


async def generate_quiz_tool(
    topic: str,
    difficulty_level: str = "intermediate",
    question_count: int = 10,
    question_types: List[str] = ["multiple_choice", "true_false"]
) -> Dict:
    """
    Generate adaptive quizzes and assessments with intelligent question variation.
    """

    try:
        # Validate inputs
        validation_result = await _validate_quiz_inputs(topic, difficulty_level, question_count, question_types)
        if not validation_result["valid"]:
            return {
                "success": False,
                "error": validation_result["error"],
                "message": "Invalid quiz parameters provided."
            }

        # Analyze topic and learning objectives
        topic_analysis = await _analyze_quiz_topic(topic, difficulty_level)
        
        # Generate question bank
        question_bank = await _generate_question_bank(topic, topic_analysis, difficulty_level)
        
        # Select optimal questions
        selected_questions = await _select_optimal_questions(
            question_bank, question_count, question_types, difficulty_level
        )
        
        # Apply adaptive difficulty
        adaptive_questions = await _apply_adaptive_difficulty(selected_questions, topic_analysis)
        
        # Generate answer key and scoring
        answer_key = await _generate_answer_key(adaptive_questions)
        
        # Create assessment metadata
        quiz_metadata = await _create_quiz_metadata(topic, difficulty_level, adaptive_questions)
        
        # Generate feedback mechanisms
        feedback_system = await _create_feedback_system(adaptive_questions, topic_analysis)

        return {
            "success": True,
            "quiz_id": f"quiz_{topic.lower().replace(' ', '_')}_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
            "topic": topic,
            "difficulty_level": difficulty_level,
            "question_count": len(adaptive_questions),
            "question_types": list(set(q["type"] for q in adaptive_questions)),
            "questions": adaptive_questions,
            "answer_key": answer_key,
            "quiz_metadata": quiz_metadata,
            "feedback_system": feedback_system,
            "scoring_rubric": _create_scoring_rubric(adaptive_questions, difficulty_level),
            "time_estimate": _estimate_completion_time(adaptive_questions),
            "learning_objectives": topic_analysis["learning_objectives"],
            "next_steps_guidance": _generate_next_steps_guidance(topic, difficulty_level),
            "created_date": datetime.now().isoformat()
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Quiz generation failed: {str(e)}",
            "message": "Unable to generate quiz. Please check topic and parameters."
        }


async def _validate_quiz_inputs(topic: str, difficulty_level: str, question_count: int, question_types: List[str]) -> Dict:
    """Validate quiz generation inputs."""
    
    if not topic or len(topic.strip()) < 3:
        return {"valid": False, "error": "Topic must be at least 3 characters long"}
    
    valid_difficulties = ["beginner", "intermediate", "advanced"]
    if difficulty_level not in valid_difficulties:
        return {"valid": False, "error": f"Difficulty must be one of: {valid_difficulties}"}
    
    if question_count < 1 or question_count > 50:
        return {"valid": False, "error": "Question count must be between 1 and 50"}
    
    valid_types = ["multiple_choice", "true_false", "short_answer", "fill_blank", "matching", "ordering"]
    for q_type in question_types:
        if q_type not in valid_types:
            return {"valid": False, "error": f"Invalid question type: {q_type}. Valid types: {valid_types}"}
    
    return {"valid": True}


async def _analyze_quiz_topic(topic: str, difficulty_level: str) -> Dict:
    """Analyze the quiz topic to understand learning objectives and scope."""
    
    topic_lower = topic.lower()
    
    # Identify subject domain
    domain_indicators = {
        "programming": ["programming", "coding", "software", "development", "python", "javascript", "java"],
        "mathematics": ["math", "algebra", "calculus", "geometry", "statistics", "probability"],
        "science": ["physics", "chemistry", "biology", "scientific", "research", "experiment"],
        "business": ["business", "management", "marketing", "finance", "economics", "strategy"],
        "language": ["english", "writing", "grammar", "literature", "language", "communication"],
        "history": ["history", "historical", "ancient", "modern", "civilization", "war"],
        "technology": ["technology", "computer", "digital", "internet", "tech", "innovation"],
        "health": ["health", "medical", "medicine", "wellness", "fitness", "nutrition"],
        "art": ["art", "design", "creative", "visual", "artistic", "drawing", "painting"]
    }
    
    domain = "general"
    for subject_domain, keywords in domain_indicators.items():
        if any(keyword in topic_lower for keyword in keywords):
            domain = subject_domain
            break
    
    # Generate learning objectives based on domain and difficulty
    learning_objectives = _generate_learning_objectives(topic, domain, difficulty_level)
    
    # Identify key concepts
    key_concepts = _extract_key_concepts(topic, domain)
    
    # Determine cognitive levels (Bloom's taxonomy)
    cognitive_levels = _determine_cognitive_levels(difficulty_level)
    
    return {
        "domain": domain,
        "learning_objectives": learning_objectives,
        "key_concepts": key_concepts,
        "cognitive_levels": cognitive_levels,
        "complexity_factors": _analyze_complexity_factors(topic, domain, difficulty_level),
        "prerequisite_knowledge": _identify_prerequisites(topic, domain, difficulty_level)
    }


def _generate_learning_objectives(topic: str, domain: str, difficulty_level: str) -> List[str]:
    """Generate learning objectives for the quiz."""
    
    objective_templates = {
        "beginner": [
            f"Identify basic concepts related to {topic}",
            f"Recognize fundamental principles of {topic}",
            f"Define key terms in {topic}",
            f"Demonstrate understanding of {topic} basics"
        ],
        "intermediate": [
            f"Analyze relationships between concepts in {topic}",
            f"Apply {topic} principles to solve problems",
            f"Compare and contrast different aspects of {topic}",
            f"Explain the significance of {topic} concepts"
        ],
        "advanced": [
            f"Evaluate complex scenarios involving {topic}",
            f"Synthesize {topic} knowledge to create solutions",
            f"Critique different approaches to {topic}",
            f"Design innovative applications of {topic} principles"
        ]
    }
    
    base_objectives = objective_templates.get(difficulty_level, objective_templates["intermediate"])
    
    # Add domain-specific objectives
    domain_objectives = {
        "programming": [f"Write correct code for {topic}", f"Debug {topic}-related problems"],
        "mathematics": [f"Solve {topic} equations", f"Apply {topic} formulas correctly"],
        "science": [f"Explain {topic} phenomena", f"Conduct {topic} experiments"],
        "business": [f"Make {topic} decisions", f"Analyze {topic} scenarios"]
    }
    
    if domain in domain_objectives:
        base_objectives.extend(domain_objectives[domain])
    
    return base_objectives[:5]  # Limit to top 5 objectives


def _extract_key_concepts(topic: str, domain: str) -> List[str]:
    """Extract key concepts that should be covered in the quiz."""
    
    topic_words = topic.lower().split()
    
    # Domain-specific concept patterns
    concept_patterns = {
        "programming": ["syntax", "logic", "algorithms", "data structures", "functions", "variables"],
        "mathematics": ["equations", "formulas", "proofs", "theorems", "calculations", "graphs"],
        "science": ["theories", "experiments", "observations", "laws", "principles", "methods"],
        "business": ["strategies", "processes", "decisions", "analysis", "planning", "execution"],
        "language": ["grammar", "vocabulary", "structure", "meaning", "style", "context"]
    }
    
    domain_concepts = concept_patterns.get(domain, ["concepts", "principles", "methods", "applications"])
    
    # Combine topic words with domain concepts
    key_concepts = []
    for word in topic_words:
        if len(word) > 3:  # Filter out short words
            key_concepts.append(word.capitalize())
    
    key_concepts.extend([f"{topic} {concept}" for concept in domain_concepts[:3]])
    
    return key_concepts[:8]  # Limit to 8 key concepts


def _determine_cognitive_levels(difficulty_level: str) -> List[str]:
    """Determine appropriate cognitive levels based on Bloom's taxonomy."""
    
    bloom_levels = {
        "beginner": ["remember", "understand"],
        "intermediate": ["understand", "apply", "analyze"],
        "advanced": ["analyze", "evaluate", "create"]
    }
    
    return bloom_levels.get(difficulty_level, ["understand", "apply"])


def _analyze_complexity_factors(topic: str, domain: str, difficulty_level: str) -> Dict:
    """Analyze factors that influence quiz complexity."""
    
    topic_lower = topic.lower()
    
    # Complexity indicators
    complexity_indicators = {
        "high": ["advanced", "complex", "sophisticated", "intricate", "comprehensive"],
        "medium": ["intermediate", "moderate", "standard", "typical", "regular"],
        "low": ["basic", "simple", "fundamental", "elementary", "introductory"]
    }
    
    topic_complexity = "medium"
    for level, indicators in complexity_indicators.items():
        if any(indicator in topic_lower for indicator in indicators):
            topic_complexity = level
            break
    
    # Domain complexity
    domain_complexity = {
        "programming": "high",
        "mathematics": "high", 
        "science": "medium",
        "business": "medium",
        "language": "low",
        "general": "medium"
    }.get(domain, "medium")
    
    return {
        "topic_complexity": topic_complexity,
        "domain_complexity": domain_complexity,
        "difficulty_multiplier": {
            "beginner": 1.0,
            "intermediate": 1.5,
            "advanced": 2.0
        }.get(difficulty_level, 1.5),
        "cognitive_load": _calculate_cognitive_load(topic, domain, difficulty_level)
    }


def _calculate_cognitive_load(topic: str, domain: str, difficulty_level: str) -> str:
    """Calculate expected cognitive load for the quiz."""
    
    base_load = {"beginner": 1, "intermediate": 2, "advanced": 3}.get(difficulty_level, 2)
    
    domain_load = {
        "programming": 1,
        "mathematics": 1,
        "science": 0.5,
        "business": 0,
        "language": -0.5
    }.get(domain, 0)
    
    total_load = base_load + domain_load
    
    if total_load <= 1:
        return "low"
    elif total_load <= 2.5:
        return "medium"
    else:
        return "high"


def _identify_prerequisites(topic: str, domain: str, difficulty_level: str) -> List[str]:
    """Identify prerequisite knowledge for the quiz topic."""
    
    topic_lower = topic.lower()
    
    general_prerequisites = {
        "beginner": ["Basic reading comprehension", "Elementary vocabulary"],
        "intermediate": ["Foundational knowledge", "Basic analytical skills"],
        "advanced": ["Comprehensive understanding", "Advanced reasoning skills"]
    }
    
    domain_prerequisites = {
        "programming": ["Computer literacy", "Logical thinking", "Problem-solving skills"],
        "mathematics": ["Arithmetic skills", "Algebraic thinking", "Mathematical reasoning"],
        "science": ["Scientific method", "Basic research skills", "Analytical thinking"],
        "business": ["Business fundamentals", "Strategic thinking", "Decision-making skills"]
    }
    
    prerequisites = general_prerequisites.get(difficulty_level, [])
    if domain in domain_prerequisites:
        prerequisites.extend(domain_prerequisites[domain])
    
    # Add topic-specific prerequisites
    if "advanced" in topic_lower:
        prerequisites.append(f"Intermediate {topic.replace('advanced', '').strip()}")
    
    return list(set(prerequisites))  # Remove duplicates


async def _generate_question_bank(topic: str, topic_analysis: Dict, difficulty_level: str) -> List[Dict]:
    """Generate a comprehensive question bank for the topic."""
    
    question_bank = []
    key_concepts = topic_analysis["key_concepts"]
    cognitive_levels = topic_analysis["cognitive_levels"]
    
    # Generate questions for each concept and cognitive level combination
    for concept in key_concepts:
        for cognitive_level in cognitive_levels:
            # Multiple choice questions
            mc_questions = _generate_multiple_choice_questions(concept, cognitive_level, difficulty_level)
            question_bank.extend(mc_questions)
            
            # True/false questions
            tf_questions = _generate_true_false_questions(concept, cognitive_level, difficulty_level)
            question_bank.extend(tf_questions)
            
            # Short answer questions
            sa_questions = _generate_short_answer_questions(concept, cognitive_level, difficulty_level)
            question_bank.extend(sa_questions)
            
            # Fill in the blank questions
            fb_questions = _generate_fill_blank_questions(concept, cognitive_level, difficulty_level)
            question_bank.extend(fb_questions)
    
    # Add some domain-specific question types
    domain = topic_analysis["domain"]
    domain_questions = _generate_domain_specific_questions(topic, domain, difficulty_level)
    question_bank.extend(domain_questions)
    
    return question_bank


def _generate_multiple_choice_questions(concept: str, cognitive_level: str, difficulty_level: str) -> List[Dict]:
    """Generate multiple choice questions for a concept."""
    
    questions = []
    
    # Question templates by cognitive level
    templates = {
        "remember": [
            f"What is {concept}?",
            f"Which of the following best defines {concept}?",
            f"What are the key characteristics of {concept}?"
        ],
        "understand": [
            f"How does {concept} work?",
            f"What is the relationship between {concept} and related concepts?",
            f"Why is {concept} important?"
        ],
        "apply": [
            f"How would you use {concept} in this scenario?",
            f"What would happen if you applied {concept} to this situation?",
            f"Which {concept} technique is most appropriate here?"
        ],
        "analyze": [
            f"What are the components of {concept}?",
            f"How do the parts of {concept} relate to each other?",
            f"What factors influence {concept}?"
        ],
        "evaluate": [
            f"Which approach to {concept} is most effective?",
            f"What are the strengths and weaknesses of {concept}?",
            f"How would you assess the quality of this {concept}?"
        ],
        "create": [
            f"How would you design a new {concept}?",
            f"What would an improved version of {concept} look like?",
            f"How could you combine {concept} with other approaches?"
        ]
    }
    
    question_templates = templates.get(cognitive_level, templates["understand"])
    
    for template in question_templates[:2]:  # Limit to 2 questions per concept/level
        question = {
            "id": f"mc_{concept.lower().replace(' ', '_')}_{cognitive_level}_{len(questions)}",
            "type": "multiple_choice",
            "concept": concept,
            "cognitive_level": cognitive_level,
            "difficulty": difficulty_level,
            "question": template,
            "options": _generate_answer_options(concept, cognitive_level, difficulty_level),
            "correct_answer": "A",  # First option is correct by default
            "explanation": f"This question tests {cognitive_level} of {concept}.",
            "points": _calculate_question_points(cognitive_level, difficulty_level),
            "time_estimate": _estimate_question_time("multiple_choice", difficulty_level)
        }
        questions.append(question)
    
    return questions


def _generate_answer_options(concept: str, cognitive_level: str, difficulty_level: str) -> List[Dict]:
    """Generate answer options for multiple choice questions."""
    
    # Generate correct answer
    correct_answer = _generate_correct_answer(concept, cognitive_level)
    
    # Generate distractors
    distractors = _generate_distractors(concept, cognitive_level, difficulty_level)
    
    options = [
        {"label": "A", "text": correct_answer, "correct": True},
        {"label": "B", "text": distractors[0], "correct": False},
        {"label": "C", "text": distractors[1], "correct": False},
        {"label": "D", "text": distractors[2], "correct": False}
    ]
    
    return options


def _generate_correct_answer(concept: str, cognitive_level: str) -> str:
    """Generate the correct answer for a concept."""
    
    answer_patterns = {
        "remember": f"The definition and basic properties of {concept}",
        "understand": f"The explanation of how {concept} functions and its purpose",
        "apply": f"The appropriate application of {concept} in practical situations",
        "analyze": f"The breakdown of {concept} into its component parts",
        "evaluate": f"The assessment of {concept}'s effectiveness and value",
        "create": f"The synthesis of {concept} with innovative approaches"
    }
    
    return answer_patterns.get(cognitive_level, f"The understanding of {concept}")


def _generate_distractors(concept: str, cognitive_level: str, difficulty_level: str) -> List[str]:
    """Generate plausible but incorrect answer options."""
    
    distractor_strategies = [
        f"Common misconception about {concept}",
        f"Related but different concept from {concept}",
        f"Partially correct but incomplete understanding of {concept}"
    ]
    
    return distractor_strategies


def _generate_true_false_questions(concept: str, cognitive_level: str, difficulty_level: str) -> List[Dict]:
    """Generate true/false questions for a concept."""
    
    questions = []
    
    # True statements
    true_statements = [
        f"{concept} is an important concept in this subject area",
        f"{concept} has practical applications",
        f"Understanding {concept} requires foundational knowledge"
    ]
    
    # False statements
    false_statements = [
        f"{concept} is never used in real-world situations",
        f"{concept} is only theoretical with no practical value",
        f"{concept} is completely unrelated to other concepts"
    ]
    
    # Create questions from both true and false statements
    for i, statement in enumerate(true_statements[:1] + false_statements[:1]):
        is_true = i < len(true_statements[:1])
        
        question = {
            "id": f"tf_{concept.lower().replace(' ', '_')}_{cognitive_level}_{i}",
            "type": "true_false",
            "concept": concept,
            "cognitive_level": cognitive_level,
            "difficulty": difficulty_level,
            "question": statement,
            "correct_answer": is_true,
            "explanation": f"This statement is {'true' if is_true else 'false'} because...",
            "points": _calculate_question_points(cognitive_level, difficulty_level) * 0.7,  # TF worth less
            "time_estimate": _estimate_question_time("true_false", difficulty_level)
        }
        questions.append(question)
    
    return questions


def _generate_short_answer_questions(concept: str, cognitive_level: str, difficulty_level: str) -> List[Dict]:
    """Generate short answer questions for a concept."""
    
    questions = []
    
    question_templates = {
        "remember": f"Define {concept} in your own words.",
        "understand": f"Explain how {concept} works.",
        "apply": f"Describe how you would use {concept} to solve a problem.",
        "analyze": f"Break down the components of {concept}.",
        "evaluate": f"Assess the effectiveness of {concept}.",
        "create": f"Design a new approach using {concept}."
    }
    
    template = question_templates.get(cognitive_level, f"Explain {concept}.")
    
    question = {
        "id": f"sa_{concept.lower().replace(' ', '_')}_{cognitive_level}",
        "type": "short_answer",
        "concept": concept,
        "cognitive_level": cognitive_level,
        "difficulty": difficulty_level,
        "question": template,
        "sample_answer": _generate_sample_answer(concept, cognitive_level),
        "scoring_criteria": _generate_scoring_criteria(cognitive_level),
        "points": _calculate_question_points(cognitive_level, difficulty_level) * 1.5,  # SA worth more
        "time_estimate": _estimate_question_time("short_answer", difficulty_level)
    }
    questions.append(question)
    
    return questions


def _generate_fill_blank_questions(concept: str, cognitive_level: str, difficulty_level: str) -> List[Dict]:
    """Generate fill-in-the-blank questions for a concept."""
    
    questions = []
    
    templates = [
        f"The primary purpose of {concept} is to ______.",
        f"{concept} can be characterized by its ______ properties.",
        f"When applying {concept}, it is important to consider ______."
    ]
    
    for i, template in enumerate(templates[:1]):  # Limit to 1 per concept
        question = {
            "id": f"fb_{concept.lower().replace(' ', '_')}_{cognitive_level}_{i}",
            "type": "fill_blank",
            "concept": concept,
            "cognitive_level": cognitive_level,
            "difficulty": difficulty_level,
            "question": template,
            "correct_answers": _generate_fill_blank_answers(concept, template),
            "points": _calculate_question_points(cognitive_level, difficulty_level),
            "time_estimate": _estimate_question_time("fill_blank", difficulty_level)
        }
        questions.append(question)
    
    return questions


def _generate_fill_blank_answers(concept: str, template: str) -> List[str]:
    """Generate acceptable answers for fill-in-the-blank questions."""
    
    if "purpose" in template:
        return ["solve problems", "provide solutions", "enable understanding"]
    elif "properties" in template:
        return ["key", "essential", "fundamental", "important"]
    elif "consider" in template:
        return ["context", "requirements", "constraints", "objectives"]
    else:
        return ["relevant factors", "important aspects", "key elements"]


def _generate_domain_specific_questions(topic: str, domain: str, difficulty_level: str) -> List[Dict]:
    """Generate domain-specific question types."""
    
    questions = []
    
    if domain == "programming":
        # Code-based questions
        questions.extend(_generate_code_questions(topic, difficulty_level))
    elif domain == "mathematics":
        # Problem-solving questions
        questions.extend(_generate_math_questions(topic, difficulty_level))
    elif domain == "science":
        # Experiment/observation questions
        questions.extend(_generate_science_questions(topic, difficulty_level))
    
    return questions


def _generate_code_questions(topic: str, difficulty_level: str) -> List[Dict]:
    """Generate programming-specific questions."""
    
    question = {
        "id": f"code_{topic.lower().replace(' ', '_')}_{difficulty_level}",
        "type": "code_completion",
        "concept": f"{topic} programming",
        "cognitive_level": "apply",
        "difficulty": difficulty_level,
        "question": f"Complete the following code snippet related to {topic}:",
        "code_template": "# Write your code here\n# TODO: Implement the solution",
        "expected_output": "Correct implementation",
        "points": _calculate_question_points("apply", difficulty_level) * 2,
        "time_estimate": _estimate_question_time("code_completion", difficulty_level)
    }
    
    return [question]


def _generate_math_questions(topic: str, difficulty_level: str) -> List[Dict]:
    """Generate mathematics-specific questions."""
    
    question = {
        "id": f"math_{topic.lower().replace(' ', '_')}_{difficulty_level}",
        "type": "calculation",
        "concept": f"{topic} mathematics",
        "cognitive_level": "apply",
        "difficulty": difficulty_level,
        "question": f"Solve the following problem using {topic} concepts:",
        "problem_statement": f"A {topic}-related calculation problem",
        "solution_steps": ["Step 1", "Step 2", "Step 3"],
        "final_answer": "Numerical result",
        "points": _calculate_question_points("apply", difficulty_level) * 1.5,
        "time_estimate": _estimate_question_time("calculation", difficulty_level)
    }
    
    return [question]


def _generate_science_questions(topic: str, difficulty_level: str) -> List[Dict]:
    """Generate science-specific questions."""
    
    question = {
        "id": f"science_{topic.lower().replace(' ', '_')}_{difficulty_level}",
        "type": "experiment_design",
        "concept": f"{topic} science",
        "cognitive_level": "create",
        "difficulty": difficulty_level,
        "question": f"Design an experiment to test concepts related to {topic}:",
        "experiment_components": ["Hypothesis", "Variables", "Procedure", "Expected Results"],
        "evaluation_criteria": ["Scientific method", "Feasibility", "Validity"],
        "points": _calculate_question_points("create", difficulty_level) * 2,
        "time_estimate": _estimate_question_time("experiment_design", difficulty_level)
    }
    
    return [question]


def _calculate_question_points(cognitive_level: str, difficulty_level: str) -> int:
    """Calculate point value for a question."""
    
    cognitive_multipliers = {
        "remember": 1,
        "understand": 1.5,
        "apply": 2,
        "analyze": 2.5,
        "evaluate": 3,
        "create": 3.5
    }
    
    difficulty_multipliers = {
        "beginner": 1,
        "intermediate": 1.5,
        "advanced": 2
    }
    
    base_points = 10
    cognitive_mult = cognitive_multipliers.get(cognitive_level, 1.5)
    difficulty_mult = difficulty_multipliers.get(difficulty_level, 1.5)
    
    return int(base_points * cognitive_mult * difficulty_mult)


def _estimate_question_time(question_type: str, difficulty_level: str) -> int:
    """Estimate time needed to answer a question (in seconds)."""
    
    base_times = {
        "multiple_choice": 60,
        "true_false": 30,
        "short_answer": 180,
        "fill_blank": 45,
        "code_completion": 300,
        "calculation": 240,
        "experiment_design": 360
    }
    
    difficulty_multipliers = {
        "beginner": 0.8,
        "intermediate": 1.0,
        "advanced": 1.5
    }
    
    base_time = base_times.get(question_type, 60)
    multiplier = difficulty_multipliers.get(difficulty_level, 1.0)
    
    return int(base_time * multiplier)


def _generate_sample_answer(concept: str, cognitive_level: str) -> str:
    """Generate a sample answer for short answer questions."""
    
    answer_templates = {
        "remember": f"{concept} refers to...",
        "understand": f"{concept} works by...",
        "apply": f"To use {concept}, one would...",
        "analyze": f"The components of {concept} include...",
        "evaluate": f"The effectiveness of {concept} can be measured by...",
        "create": f"A new approach to {concept} might involve..."
    }
    
    return answer_templates.get(cognitive_level, f"A comprehensive explanation of {concept}.")


def _generate_scoring_criteria(cognitive_level: str) -> List[str]:
    """Generate scoring criteria for open-ended questions."""
    
    criteria_by_level = {
        "remember": ["Accuracy of definition", "Use of correct terminology"],
        "understand": ["Clarity of explanation", "Demonstration of comprehension"],
        "apply": ["Correct application", "Practical relevance"],
        "analyze": ["Identification of components", "Understanding of relationships"],
        "evaluate": ["Quality of assessment", "Use of appropriate criteria"],
        "create": ["Innovation", "Feasibility", "Integration of concepts"]
    }
    
    return criteria_by_level.get(cognitive_level, ["Accuracy", "Completeness", "Clarity"])


async def _select_optimal_questions(question_bank: List[Dict], question_count: int, question_types: List[str], difficulty_level: str) -> List[Dict]:
    """Select optimal questions from the question bank."""
    
    # Filter by requested question types
    filtered_questions = [q for q in question_bank if q["type"] in question_types]
    
    if not filtered_questions:
        return question_bank[:question_count]  # Fallback to any questions
    
    # Balance question types
    type_distribution = _calculate_type_distribution(question_types, question_count)
    
    selected_questions = []
    for q_type, count in type_distribution.items():
        type_questions = [q for q in filtered_questions if q["type"] == q_type]
        
        # Sort by various criteria and select top questions
        sorted_questions = _sort_questions_by_quality(type_questions, difficulty_level)
        selected_questions.extend(sorted_questions[:count])
    
    # Fill remaining slots if needed
    while len(selected_questions) < question_count and len(selected_questions) < len(filtered_questions):
        remaining_questions = [q for q in filtered_questions if q not in selected_questions]
        if remaining_questions:
            selected_questions.append(remaining_questions[0])
        else:
            break
    
    return selected_questions[:question_count]


def _calculate_type_distribution(question_types: List[str], total_count: int) -> Dict[str, int]:
    """Calculate how many questions of each type to include."""
    
    distribution = {}
    base_count = total_count // len(question_types)
    remainder = total_count % len(question_types)
    
    for i, q_type in enumerate(question_types):
        distribution[q_type] = base_count + (1 if i < remainder else 0)
    
    return distribution


def _sort_questions_by_quality(questions: List[Dict], difficulty_level: str) -> List[Dict]:
    """Sort questions by quality criteria."""
    
    def quality_score(question):
        score = 0
        
        # Prefer questions matching difficulty level
        if question["difficulty"] == difficulty_level:
            score += 10
        
        # Prefer higher cognitive levels for advanced difficulty
        cognitive_scores = {"remember": 1, "understand": 2, "apply": 3, "analyze": 4, "evaluate": 5, "create": 6}
        score += cognitive_scores.get(question["cognitive_level"], 3)
        
        # Prefer questions with more points (indicating complexity)
        score += question.get("points", 0) / 10
        
        return score
    
    return sorted(questions, key=quality_score, reverse=True)


async def _apply_adaptive_difficulty(questions: List[Dict], topic_analysis: Dict) -> List[Dict]:
    """Apply adaptive difficulty adjustments to questions."""
    
    complexity_factors = topic_analysis["complexity_factors"]
    cognitive_load = complexity_factors["cognitive_load"]
    
    adaptive_questions = []
    
    for question in questions:
        adapted_question = question.copy()
        
        # Adjust based on cognitive load
        if cognitive_load == "high":
            # Simplify high cognitive load topics
            adapted_question["time_estimate"] = int(question["time_estimate"] * 1.2)
            adapted_question["points"] = int(question["points"] * 0.9)
        elif cognitive_load == "low":
            # Make low cognitive load topics more challenging
            adapted_question["time_estimate"] = int(question["time_estimate"] * 0.8)
            adapted_question["points"] = int(question["points"] * 1.1)
        
        # Add adaptive hints for complex questions
        if question["points"] > 25:
            adapted_question["adaptive_hints"] = _generate_adaptive_hints(question)
        
        adaptive_questions.append(adapted_question)
    
    return adaptive_questions


def _generate_adaptive_hints(question: Dict) -> List[str]:
    """Generate adaptive hints for complex questions."""
    
    concept = question["concept"]
    cognitive_level = question["cognitive_level"]
    
    hints = [
        f"Consider the key aspects of {concept}",
        f"Think about how {concept} relates to other concepts",
        f"Focus on the {cognitive_level} level of understanding needed"
    ]
    
    return hints


async def _generate_answer_key(questions: List[Dict]) -> Dict:
    """Generate comprehensive answer key."""
    
    answer_key = {
        "answers": {},
        "explanations": {},
        "scoring_guide": {},
        "total_points": 0
    }
    
    total_points = 0
    
    for question in questions:
        q_id = question["id"]
        
        if question["type"] == "multiple_choice":
            correct_option = next(opt for opt in question["options"] if opt["correct"])
            answer_key["answers"][q_id] = correct_option["label"]
        elif question["type"] == "true_false":
            answer_key["answers"][q_id] = question["correct_answer"]
        elif question["type"] == "short_answer":
            answer_key["answers"][q_id] = question["sample_answer"]
        elif question["type"] == "fill_blank":
            answer_key["answers"][q_id] = question["correct_answers"]
        
        answer_key["explanations"][q_id] = question.get("explanation", "")
        answer_key["scoring_guide"][q_id] = {
            "points": question["points"],
            "criteria": question.get("scoring_criteria", [])
        }
        
        total_points += question["points"]
    
    answer_key["total_points"] = total_points
    
    return answer_key


async def _create_quiz_metadata(topic: str, difficulty_level: str, questions: List[Dict]) -> Dict:
    """Create comprehensive quiz metadata."""
    
    question_types = list(set(q["type"] for q in questions))
    cognitive_levels = list(set(q["cognitive_level"] for q in questions))
    concepts_covered = list(set(q["concept"] for q in questions))
    
    total_points = sum(q["points"] for q in questions)
    total_time = sum(q["time_estimate"] for q in questions)
    
    return {
        "quiz_format": "adaptive_assessment",
        "question_types": question_types,
        "cognitive_levels": cognitive_levels,
        "concepts_covered": concepts_covered,
        "total_points": total_points,
        "total_time_minutes": total_time // 60,
        "difficulty_distribution": _calculate_difficulty_distribution(questions),
        "cognitive_distribution": _calculate_cognitive_distribution(questions),
        "recommended_passing_score": int(total_points * 0.7),  # 70% passing
        "time_limit_minutes": int((total_time // 60) * 1.5),  # 50% buffer
        "adaptive_features": ["hints", "difficulty_adjustment", "personalized_feedback"],
        "assessment_standards": _identify_assessment_standards(topic, difficulty_level)
    }


def _calculate_difficulty_distribution(questions: List[Dict]) -> Dict[str, int]:
    """Calculate distribution of questions by difficulty."""
    
    distribution = {"beginner": 0, "intermediate": 0, "advanced": 0}
    
    for question in questions:
        difficulty = question.get("difficulty", "intermediate")
        distribution[difficulty] += 1
    
    return distribution


def _calculate_cognitive_distribution(questions: List[Dict]) -> Dict[str, int]:
    """Calculate distribution of questions by cognitive level."""
    
    distribution = {}
    
    for question in questions:
        cognitive_level = question.get("cognitive_level", "understand")
        distribution[cognitive_level] = distribution.get(cognitive_level, 0) + 1
    
    return distribution


def _identify_assessment_standards(topic: str, difficulty_level: str) -> List[str]:
    """Identify relevant assessment standards."""
    
    standards = [
        "Bloom's Taxonomy alignment",
        "Authentic assessment principles",
        "Constructive alignment"
    ]
    
    if difficulty_level == "advanced":
        standards.append("Higher-order thinking skills")
    
    return standards


async def _create_feedback_system(questions: List[Dict], topic_analysis: Dict) -> Dict:
    """Create personalized feedback system."""
    
    feedback_system = {
        "immediate_feedback": {},
        "performance_analytics": {},
        "learning_recommendations": {},
        "remediation_suggestions": {}
    }
    
    for question in questions:
        q_id = question["id"]
        concept = question["concept"]
        
        feedback_system["immediate_feedback"][q_id] = {
            "correct_feedback": f"Excellent! You understand {concept} well.",
            "incorrect_feedback": f"Review the concept of {concept} and try again.",
            "hint": question.get("adaptive_hints", [])
        }
        
        feedback_system["remediation_suggestions"][q_id] = _generate_remediation_suggestions(question, topic_analysis)
    
    feedback_system["performance_analytics"] = {
        "concept_mastery_tracking": True,
        "learning_curve_analysis": True,
        "strength_weakness_identification": True,
        "progress_visualization": True
    }
    
    feedback_system["learning_recommendations"] = {
        "adaptive_path_adjustment": True,
        "personalized_practice": True,
        "targeted_review": True,
        "next_level_preparation": True
    }
    
    return feedback_system


def _generate_remediation_suggestions(question: Dict, topic_analysis: Dict) -> List[str]:
    """Generate remediation suggestions for incorrect answers."""
    
    concept = question["concept"]
    cognitive_level = question["cognitive_level"]
    
    suggestions = [
        f"Review the fundamental concepts of {concept}",
        f"Practice {cognitive_level}-level exercises with {concept}",
        f"Seek additional resources about {concept}"
    ]
    
    # Add domain-specific suggestions
    domain = topic_analysis["domain"]
    if domain == "programming":
        suggestions.append("Try coding exercises related to this concept")
    elif domain == "mathematics":
        suggestions.append("Work through practice problems step by step")
    elif domain == "science":
        suggestions.append("Conduct hands-on experiments or simulations")
    
    return suggestions


def _create_scoring_rubric(questions: List[Dict], difficulty_level: str) -> Dict:
    """Create comprehensive scoring rubric."""
    
    total_points = sum(q["points"] for q in questions)
    
    rubric = {
        "total_points": total_points,
        "grading_scale": {
            "A": {"min_percentage": 90, "min_points": int(total_points * 0.9)},
            "B": {"min_percentage": 80, "min_points": int(total_points * 0.8)},
            "C": {"min_percentage": 70, "min_points": int(total_points * 0.7)},
            "D": {"min_percentage": 60, "min_points": int(total_points * 0.6)},
            "F": {"min_percentage": 0, "min_points": 0}
        },
        "competency_levels": {
            "mastery": {"min_percentage": 85, "description": "Demonstrates complete understanding"},
            "proficient": {"min_percentage": 70, "description": "Meets learning objectives"},
            "developing": {"min_percentage": 50, "description": "Partial understanding, needs improvement"},
            "beginning": {"min_percentage": 0, "description": "Requires significant support"}
        },
        "question_weights": _calculate_question_weights(questions),
        "partial_credit_guidelines": _generate_partial_credit_guidelines(),
        "bonus_opportunities": _identify_bonus_opportunities(questions, difficulty_level)
    }
    
    return rubric


def _calculate_question_weights(questions: List[Dict]) -> Dict[str, float]:
    """Calculate relative weights for questions."""
    
    total_points = sum(q["points"] for q in questions)
    weights = {}
    
    for question in questions:
        weight = question["points"] / total_points
        weights[question["id"]] = round(weight, 3)
    
    return weights


def _generate_partial_credit_guidelines() -> Dict:
    """Generate guidelines for partial credit."""
    
    return {
        "multiple_choice": "All or nothing - no partial credit",
        "true_false": "All or nothing - no partial credit", 
        "short_answer": "Partial credit based on key concepts mentioned",
        "fill_blank": "Partial credit for partially correct answers",
        "code_completion": "Partial credit for correct approach even if syntax errors",
        "calculation": "Partial credit for correct method even if calculation errors"
    }


def _identify_bonus_opportunities(questions: List[Dict], difficulty_level: str) -> List[Dict]:
    """Identify bonus question opportunities."""
    
    bonus_opportunities = []
    
    # Advanced questions can be bonus for intermediate difficulty
    if difficulty_level == "intermediate":
        advanced_questions = [q for q in questions if q.get("difficulty") == "advanced"]
        for question in advanced_questions[:2]:  # Limit to 2 bonus questions
            bonus_opportunities.append({
                "question_id": question["id"],
                "bonus_points": int(question["points"] * 0.5),
                "description": "Advanced application of concepts"
            })
    
    return bonus_opportunities


def _estimate_completion_time(questions: List[Dict]) -> Dict:
    """Estimate total completion time for the quiz."""
    
    total_time_seconds = sum(q["time_estimate"] for q in questions)
    
    # Add buffer time for instructions, review, etc.
    buffer_time = int(total_time_seconds * 0.2)  # 20% buffer
    total_with_buffer = total_time_seconds + buffer_time
    
    return {
        "total_time_seconds": total_time_seconds,
        "total_time_minutes": total_time_seconds // 60,
        "buffer_time_minutes": buffer_time // 60,
        "recommended_time_limit_minutes": total_with_buffer // 60,
        "time_per_question_average": total_time_seconds // len(questions) if questions else 0,
        "suggested_breaks": "Every 30 minutes" if total_with_buffer > 1800 else "None needed"
    }


def _generate_next_steps_guidance(topic: str, difficulty_level: str) -> List[str]:
    """Generate guidance for next steps after completing the quiz."""
    
    guidance = [
        "Review your quiz results and identify areas for improvement",
        f"Focus additional study on concepts where you scored below 70%",
        "Apply the concepts from this quiz to practical exercises",
        "Seek feedback from instructors or peers on your performance"
    ]
    
    # Add difficulty-specific guidance
    if difficulty_level == "beginner":
        guidance.append(f"Consider taking an intermediate-level quiz on {topic}")
    elif difficulty_level == "intermediate":
        guidance.append(f"Challenge yourself with advanced {topic} applications")
    elif difficulty_level == "advanced":
        guidance.append(f"Explore cutting-edge developments in {topic}")
    
    guidance.extend([
        "Join study groups or discussion forums related to this topic",
        "Schedule regular review sessions to reinforce learning",
        "Set learning goals for your next assessment"
    ])
    
    return guidance
