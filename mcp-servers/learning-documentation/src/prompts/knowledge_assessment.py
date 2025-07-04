"""
Knowledge Assessment Prompt
Evaluate current understanding and identify knowledge gaps through intelligent testing.
"""

from datetime import datetime
from typing import Dict, List
import json


async def knowledge_assessment_prompt(
    topic: str,
    assessment_type: str = "comprehensive",
    learner_level: str = "unknown"
) -> str:
    """
    Create intelligent assessments that adapt to learner responses and identify knowledge gaps.
    """

    # Generate assessment ID
    assessment_id = f"assessment_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    
    # Analyze topic and create assessment framework
    topic_analysis = await _analyze_assessment_topic(topic)
    
    # Design assessment strategy
    assessment_strategy = await _design_assessment_strategy(topic_analysis, assessment_type, learner_level)
    
    # Generate assessment questions
    assessment_questions = await _generate_assessment_questions(topic_analysis, assessment_strategy)
    
    # Create knowledge mapping
    knowledge_map = await _create_knowledge_mapping(topic_analysis, assessment_questions)
    
    # Design adaptive assessment flow
    adaptive_flow = await _design_adaptive_flow(assessment_questions, assessment_strategy)
    
    # Generate assessment summary
    assessment_summary = f"""
🧪 **Knowledge Assessment Ready: {topic}**

**Assessment ID:** `{assessment_id}`
**Assessment Type:** {assessment_type.replace('_', ' ').title()}
**Target Level:** {learner_level.title() if learner_level != 'unknown' else 'Adaptive'}
**Question Pool:** {len(assessment_questions['questions'])} questions

**Topic Analysis:**
{_format_topic_analysis(topic_analysis)}

**Assessment Strategy:**
{_format_assessment_strategy(assessment_strategy)}

**Knowledge Areas Covered:**
{_format_knowledge_areas(knowledge_map)}

**Assessment Structure:**
{_format_assessment_structure(assessment_questions)}

**Adaptive Features:**
{_format_adaptive_features(adaptive_flow)}

**Question Preview:**
{_format_question_preview(assessment_questions['questions'][:3])}

**Assessment Metrics:**
{_format_assessment_metrics(assessment_strategy)}

**Immediate Actions:**
• Use `generate-quiz` tool to create the full assessment
• Use `track-completion` tool to monitor assessment progress
• Run `/learning-documentation/content-generation` for targeted learning based on gaps

**Post-Assessment Workflow:**
{_format_post_assessment_workflow(topic_analysis)}

**Ready to Begin ✅**
Assessment `{assessment_id}` is designed and ready to evaluate knowledge in {topic}!

**Quick Start:**
```
generate-quiz "{topic}" "{assessment_strategy['difficulty_level']}" {assessment_strategy['question_count']} {json.dumps(assessment_strategy['question_types'])}
```
"""

    # Store assessment data
    await _store_assessment_data(assessment_id, {
        "topic": topic,
        "assessment_type": assessment_type,
        "learner_level": learner_level,
        "topic_analysis": topic_analysis,
        "assessment_strategy": assessment_strategy,
        "questions": assessment_questions,
        "knowledge_map": knowledge_map,
        "adaptive_flow": adaptive_flow,
        "created_at": datetime.now().isoformat()
    })

    return assessment_summary


async def _analyze_assessment_topic(topic: str) -> Dict:
    """Analyze the topic to understand assessment requirements."""
    
    topic_lower = topic.lower()
    
    # Categorize knowledge type
    knowledge_types = {
        "factual": ["facts", "definitions", "terminology", "vocabulary", "concepts"],
        "procedural": ["how to", "steps", "process", "method", "procedure"],
        "conceptual": ["principles", "theories", "models", "frameworks", "relationships"],
        "metacognitive": ["strategies", "thinking", "problem solving", "critical thinking"]
    }
    
    # Determine primary knowledge type
    detected_types = []
    for knowledge_type, indicators in knowledge_types.items():
        if any(indicator in topic_lower for indicator in indicators):
            detected_types.append(knowledge_type)
    
    if not detected_types:
        detected_types = ["conceptual"]  # Default
    
    # Analyze subject domain
    domain_indicators = {
        "technical": ["programming", "coding", "software", "technology", "computer", "api", "database"],
        "mathematical": ["math", "calculus", "algebra", "statistics", "geometry", "probability"],
        "scientific": ["science", "physics", "chemistry", "biology", "research", "experiment"],
        "business": ["business", "management", "marketing", "finance", "strategy", "economics"],
        "creative": ["design", "art", "writing", "music", "creative", "graphics"],
        "language": ["language", "grammar", "writing", "communication", "linguistics"]
    }
    
    subject_domain = "general"
    for domain, indicators in domain_indicators.items():
        if any(indicator in topic_lower for indicator in indicators):
            subject_domain = domain
            break
    
    # Determine assessment complexity
    complexity_indicators = {
        "basic": ["introduction", "basics", "fundamentals", "getting started"],
        "intermediate": ["intermediate", "beyond basics", "practical application"],
        "advanced": ["advanced", "expert", "mastery", "professional"]
    }
    
    complexity_level = "intermediate"  # Default
    for level, indicators in complexity_indicators.items():
        if any(indicator in topic_lower for indicator in indicators):
            complexity_level = level
            break
    
    # Identify key concepts
    concepts = _extract_key_concepts(topic, subject_domain)
    
    return {
        "knowledge_types": detected_types,
        "subject_domain": subject_domain,
        "complexity_level": complexity_level,
        "key_concepts": concepts,
        "topic_scope": _determine_topic_scope(topic),
        "assessment_challenges": _identify_assessment_challenges(subject_domain, complexity_level)
    }


def _extract_key_concepts(topic: str, domain: str) -> List[str]:
    """Extract key concepts that should be assessed."""
    
    # Domain-specific concept patterns
    concept_patterns = {
        "technical": ["variables", "functions", "algorithms", "data structures", "debugging", "testing"],
        "mathematical": ["equations", "theorems", "proofs", "problem solving", "calculations"],
        "business": ["strategy", "analysis", "planning", "decision making", "metrics"],
        "scientific": ["hypotheses", "experiments", "data analysis", "conclusions", "methods"],
        "creative": ["principles", "techniques", "composition", "critique", "style"],
        "language": ["grammar", "vocabulary", "structure", "comprehension", "expression"]
    }
    
    domain_concepts = concept_patterns.get(domain, ["understanding", "application", "analysis"])
    
    # Extract concepts mentioned in topic
    topic_words = topic.lower().split()
    relevant_concepts = []
    
    for concept in domain_concepts:
        if any(word in concept for word in topic_words) or any(word in topic.lower() for word in concept.split()):
            relevant_concepts.append(concept)
    
    # Add general concepts if none found
    if not relevant_concepts:
        relevant_concepts = domain_concepts[:4]
    
    return relevant_concepts


def _determine_topic_scope(topic: str) -> str:
    """Determine the scope of the topic for assessment planning."""
    
    scope_indicators = {
        "narrow": ["specific", "particular", "single", "one"],
        "broad": ["overview", "introduction", "survey", "general"],
        "deep": ["advanced", "detailed", "comprehensive", "in-depth"]
    }
    
    topic_lower = topic.lower()
    
    for scope, indicators in scope_indicators.items():
        if any(indicator in topic_lower for indicator in indicators):
            return scope
    
    # Determine by length and complexity
    if len(topic.split()) <= 3:
        return "narrow"
    elif len(topic.split()) >= 8:
        return "broad"
    else:
        return "focused"


def _identify_assessment_challenges(domain: str, complexity: str) -> List[str]:
    """Identify potential challenges in assessing this topic."""
    
    challenges = []
    
    # Domain-specific challenges
    domain_challenges = {
        "technical": ["hands-on vs theoretical", "rapidly changing field", "tool dependencies"],
        "mathematical": ["calculation errors vs concept errors", "multiple solution paths"],
        "business": ["subjective judgment", "context dependency", "case study complexity"],
        "scientific": ["experimental vs theoretical knowledge", "lab skills assessment"],
        "creative": ["subjective evaluation", "style vs technique", "portfolio assessment"],
        "language": ["cultural context", "nuanced understanding", "communication skills"]
    }
    
    challenges.extend(domain_challenges.get(domain, []))
    
    # Complexity-specific challenges
    if complexity == "advanced":
        challenges.extend(["expert-level nuances", "integration of concepts", "real-world application"])
    elif complexity == "basic":
        challenges.extend(["misconception identification", "foundation building"])
    
    return challenges


async def _design_assessment_strategy(topic_analysis: Dict, assessment_type: str, learner_level: str) -> Dict:
    """Design the optimal assessment strategy."""
    
    domain = topic_analysis["subject_domain"]
    complexity = topic_analysis["complexity_level"]
    knowledge_types = topic_analysis["knowledge_types"]
    
    # Determine question count based on assessment type
    question_counts = {
        "quick": 5,
        "standard": 10,
        "comprehensive": 20,
        "diagnostic": 15
    }
    
    question_count = question_counts.get(assessment_type, 10)
    
    # Determine question types based on knowledge types and domain
    question_types = []
    
    if "factual" in knowledge_types:
        question_types.extend(["multiple_choice", "true_false", "fill_blank"])
    
    if "procedural" in knowledge_types:
        question_types.extend(["ordering", "matching", "short_answer"])
    
    if "conceptual" in knowledge_types:
        question_types.extend(["multiple_choice", "essay", "scenario"])
    
    if "metacognitive" in knowledge_types:
        question_types.extend(["essay", "reflection", "case_study"])
    
    # Domain-specific adjustments
    if domain == "technical":
        question_types.extend(["code_completion", "debugging", "output_prediction"])
    elif domain == "mathematical":
        question_types.extend(["calculation", "proof", "problem_solving"])
    elif domain == "business":
        question_types.extend(["case_study", "analysis", "decision_making"])
    
    # Remove duplicates while preserving order
    question_types = list(dict.fromkeys(question_types))
    
    # Determine difficulty progression
    if learner_level == "beginner":
        difficulty_distribution = {"easy": 60, "medium": 30, "hard": 10}
        starting_difficulty = "easy"
    elif learner_level == "advanced":
        difficulty_distribution = {"easy": 20, "medium": 40, "hard": 40}
        starting_difficulty = "medium"
    else:  # unknown or intermediate
        difficulty_distribution = {"easy": 30, "medium": 50, "hard": 20}
        starting_difficulty = "medium"
    
    # Adaptive parameters
    adaptive_parameters = {
        "difficulty_adjustment": True,
        "branching_logic": assessment_type == "comprehensive",
        "time_adaptive": True,
        "confidence_weighting": True
    }
    
    return {
        "question_count": question_count,
        "question_types": question_types[:4],  # Limit to top 4 types
        "difficulty_distribution": difficulty_distribution,
        "starting_difficulty": starting_difficulty,
        "adaptive_parameters": adaptive_parameters,
        "time_limit": _calculate_time_limit(question_count, question_types),
        "mastery_threshold": 75,  # 75% for mastery
        "difficulty_level": starting_difficulty
    }


def _calculate_time_limit(question_count: int, question_types: List[str]) -> int:
    """Calculate appropriate time limit for assessment."""
    
    # Base time per question type (in minutes)
    time_per_type = {
        "multiple_choice": 1.5,
        "true_false": 1.0,
        "fill_blank": 2.0,
        "short_answer": 3.0,
        "essay": 8.0,
        "code_completion": 5.0,
        "calculation": 4.0,
        "case_study": 10.0
    }
    
    # Calculate average time per question
    avg_time = sum(time_per_type.get(qtype, 2.0) for qtype in question_types) / len(question_types)
    
    # Total time with buffer
    total_time = int(avg_time * question_count * 1.2)  # 20% buffer
    
    return max(total_time, 10)  # Minimum 10 minutes


async def _generate_assessment_questions(topic_analysis: Dict, strategy: Dict) -> Dict:
    """Generate assessment questions based on topic and strategy."""
    
    key_concepts = topic_analysis["key_concepts"]
    question_types = strategy["question_types"]
    question_count = strategy["question_count"]
    
    questions = []
    
    # Distribute questions across concepts and types
    questions_per_concept = max(1, question_count // len(key_concepts))
    
    question_id = 1
    
    for concept in key_concepts:
        for i in range(questions_per_concept):
            if len(questions) >= question_count:
                break
                
            # Cycle through question types
            qtype = question_types[i % len(question_types)]
            
            # Generate question based on type and concept
            question = _generate_question_by_type(question_id, concept, qtype, topic_analysis)
            questions.append(question)
            question_id += 1
    
    # Fill remaining slots if needed
    while len(questions) < question_count:
        concept = key_concepts[len(questions) % len(key_concepts)]
        qtype = question_types[len(questions) % len(question_types)]
        question = _generate_question_by_type(question_id, concept, qtype, topic_analysis)
        questions.append(question)
        question_id += 1
    
    return {
        "questions": questions,
        "total_questions": len(questions),
        "concepts_covered": key_concepts,
        "question_types_used": list(set(q["type"] for q in questions))
    }


def _generate_question_by_type(question_id: int, concept: str, qtype: str, topic_analysis: Dict) -> Dict:
    """Generate a specific question based on type and concept."""
    
    domain = topic_analysis["subject_domain"]
    
    # Question templates by type
    templates = {
        "multiple_choice": {
            "question": f"Which of the following best describes {concept}?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correct_answer": "Option A",
            "explanation": f"This tests understanding of {concept} fundamentals."
        },
        "true_false": {
            "question": f"{concept.title()} is essential for understanding this topic.",
            "correct_answer": True,
            "explanation": f"This assesses basic knowledge about {concept}."
        },
        "short_answer": {
            "question": f"Explain the importance of {concept} in this context.",
            "expected_answer": f"Key points about {concept} should include...",
            "explanation": f"This evaluates comprehension of {concept}."
        },
        "scenario": {
            "question": f"In a scenario where you need to apply {concept}, what would you do?",
            "expected_answer": f"Application of {concept} would involve...",
            "explanation": f"This tests practical application of {concept}."
        }
    }
    
    # Get template for question type
    template = templates.get(qtype, templates["multiple_choice"])
    
    # Create question object
    question = {
        "id": f"q_{question_id:03d}",
        "type": qtype,
        "concept": concept,
        "difficulty": "medium",  # Default, can be adjusted
        "question_text": template["question"],
        "points": 1,
        "time_estimate": 2,  # minutes
        "adaptive_weight": 1.0
    }
    
    # Add type-specific fields
    if qtype == "multiple_choice":
        question.update({
            "options": template["options"],
            "correct_answer": template["correct_answer"]
        })
    elif qtype == "true_false":
        question.update({
            "correct_answer": template["correct_answer"]
        })
    else:
        question.update({
            "expected_answer": template["expected_answer"]
        })
    
    question["explanation"] = template["explanation"]
    
    return question


async def _create_knowledge_mapping(topic_analysis: Dict, questions: Dict) -> Dict:
    """Create knowledge mapping for assessment coverage."""
    
    concepts = topic_analysis["key_concepts"]
    knowledge_types = topic_analysis["knowledge_types"]
    
    # Map concepts to questions
    concept_coverage = {}
    for concept in concepts:
        concept_questions = [q for q in questions["questions"] if q["concept"] == concept]
        concept_coverage[concept] = {
            "question_count": len(concept_questions),
            "question_types": list(set(q["type"] for q in concept_questions)),
            "coverage_percentage": (len(concept_questions) / len(questions["questions"])) * 100
        }
    
    # Map knowledge types to assessment
    knowledge_type_mapping = {
        "factual": ["multiple_choice", "true_false", "fill_blank"],
        "procedural": ["ordering", "short_answer", "scenario"],
        "conceptual": ["essay", "multiple_choice", "analysis"],
        "metacognitive": ["reflection", "case_study", "essay"]
    }
    
    return {
        "concept_coverage": concept_coverage,
        "knowledge_type_mapping": knowledge_type_mapping,
        "coverage_gaps": _identify_coverage_gaps(concept_coverage),
        "assessment_completeness": _calculate_assessment_completeness(concept_coverage)
    }


def _identify_coverage_gaps(concept_coverage: Dict) -> List[str]:
    """Identify concepts with insufficient coverage."""
    
    gaps = []
    
    for concept, coverage in concept_coverage.items():
        if coverage["question_count"] < 2:
            gaps.append(f"Insufficient questions for {concept}")
        
        if len(coverage["question_types"]) < 2:
            gaps.append(f"Limited question variety for {concept}")
    
    return gaps


def _calculate_assessment_completeness(concept_coverage: Dict) -> float:
    """Calculate overall assessment completeness score."""
    
    if not concept_coverage:
        return 0.0
    
    # Score based on balanced coverage
    coverage_scores = []
    
    for concept, coverage in concept_coverage.items():
        # Score based on question count (max 3 questions per concept)
        count_score = min(coverage["question_count"] / 3.0, 1.0)
        
        # Score based on question type variety (max 3 types)
        variety_score = min(len(coverage["question_types"]) / 3.0, 1.0)
        
        # Combined score for this concept
        concept_score = (count_score + variety_score) / 2.0
        coverage_scores.append(concept_score)
    
    # Overall completeness is average of concept scores
    return sum(coverage_scores) / len(coverage_scores)


async def _design_adaptive_flow(questions: Dict, strategy: Dict) -> Dict:
    """Design adaptive assessment flow."""
    
    adaptive_params = strategy["adaptive_parameters"]
    
    flow = {
        "initial_questions": 3,  # Start with 3 questions to gauge level
        "branching_rules": [],
        "difficulty_adjustment": adaptive_params["difficulty_adjustment"],
        "early_termination": False,  # Don't terminate early for knowledge assessment
        "confidence_intervals": True
    }
    
    # Create branching rules
    if adaptive_params["branching_logic"]:
        flow["branching_rules"] = [
            {
                "condition": "score >= 80% in first 3 questions",
                "action": "increase_difficulty",
                "parameter": "skip_easy_questions"
            },
            {
                "condition": "score <= 40% in first 3 questions", 
                "action": "decrease_difficulty",
                "parameter": "add_foundational_questions"
            },
            {
                "condition": "consistent_errors_in_concept",
                "action": "focus_on_concept",
                "parameter": "add_remedial_questions"
            }
        ]
    
    return flow


def _format_topic_analysis(analysis: Dict) -> str:
    """Format topic analysis for display."""
    
    lines = [
        f"📚 Subject Domain: {analysis['subject_domain'].title()}",
        f"🎯 Complexity Level: {analysis['complexity_level'].title()}",
        f"🧠 Knowledge Types: {', '.join(analysis['knowledge_types']).title()}",
        f"📊 Topic Scope: {analysis['topic_scope'].title()}",
        f"🔑 Key Concepts: {', '.join(analysis['key_concepts'][:4])}"
    ]
    
    if analysis["assessment_challenges"]:
        lines.append(f"⚠️ Assessment Challenges: {', '.join(analysis['assessment_challenges'][:2])}")
    
    return "\n".join(lines)


def _format_assessment_strategy(strategy: Dict) -> str:
    """Format assessment strategy for display."""
    
    lines = [
        f"❓ Question Count: {strategy['question_count']}",
        f"📝 Question Types: {', '.join(strategy['question_types']).replace('_', ' ').title()}",
        f"⏱️ Time Limit: {strategy['time_limit']} minutes",
        f"🎯 Mastery Threshold: {strategy['mastery_threshold']}%",
        f"📈 Difficulty: {strategy['starting_difficulty'].title()} start"
    ]
    
    return "\n".join(lines)


def _format_knowledge_areas(knowledge_map: Dict) -> str:
    """Format knowledge areas coverage."""
    
    lines = []
    
    for concept, coverage in knowledge_map["concept_coverage"].items():
        lines.append(f"• {concept.title()}: {coverage['question_count']} questions ({coverage['coverage_percentage']:.1f}%)")
    
    lines.append(f"\n📊 Assessment Completeness: {knowledge_map['assessment_completeness']:.1%}")
    
    return "\n".join(lines)


def _format_assessment_structure(questions: Dict) -> str:
    """Format assessment structure."""
    
    lines = [
        f"📋 Total Questions: {questions['total_questions']}",
        f"🎯 Concepts Covered: {len(questions['concepts_covered'])}",
        f"📝 Question Types: {len(questions['question_types_used'])}"
    ]
    
    # Question type distribution
    type_counts = {}
    for question in questions["questions"]:
        qtype = question["type"]
        type_counts[qtype] = type_counts.get(qtype, 0) + 1
    
    lines.append("\n**Question Distribution:**")
    for qtype, count in type_counts.items():
        lines.append(f"• {qtype.replace('_', ' ').title()}: {count}")
    
    return "\n".join(lines)


def _format_adaptive_features(flow: Dict) -> str:
    """Format adaptive features."""
    
    lines = [
        f"🎯 Initial Assessment: {flow['initial_questions']} questions",
        f"📈 Difficulty Adjustment: {'Enabled' if flow['difficulty_adjustment'] else 'Disabled'}",
        f"🔀 Branching Logic: {len(flow['branching_rules'])} rules",
        f"📊 Confidence Tracking: {'Enabled' if flow['confidence_intervals'] else 'Disabled'}"
    ]
    
    if flow["branching_rules"]:
        lines.append("\n**Adaptive Rules:**")
        for rule in flow["branching_rules"][:2]:
            lines.append(f"• {rule['action'].replace('_', ' ').title()} based on performance")
    
    return "\n".join(lines)


def _format_question_preview(questions: List[Dict]) -> str:
    """Format preview of sample questions."""
    
    lines = ["**Sample Questions:**"]
    
    for i, question in enumerate(questions, 1):
        lines.append(f"{i}. **{question['type'].replace('_', ' ').title()}** (Concept: {question['concept']})")
        lines.append(f"   {question['question_text']}")
        lines.append("")
    
    return "\n".join(lines)


def _format_assessment_metrics(strategy: Dict) -> str:
    """Format assessment metrics."""
    
    lines = [
        "📊 **Assessment Analytics:**",
        "• Real-time difficulty adjustment",
        "• Concept mastery tracking", 
        "• Time-per-question analysis",
        "• Confidence level measurement",
        "• Knowledge gap identification"
    ]
    
    return "\n".join(lines)


def _format_post_assessment_workflow(topic_analysis: Dict) -> str:
    """Format post-assessment workflow recommendations."""
    
    lines = [
        "🔄 **After Assessment:**",
        "• Analyze results with `track-completion` tool",
        "• Generate personalized learning plan based on gaps",
        "• Create targeted content with `/learning-documentation/content-generation`",
        "• Set up progress tracking for improvement areas"
    ]
    
    if topic_analysis["subject_domain"] == "technical":
        lines.append("• Create hands-on practice exercises for weak areas")
    
    return "\n".join(lines)


async def _store_assessment_data(assessment_id: str, data: Dict) -> None:
    """Store assessment data for later retrieval."""
    # In real implementation, would save to database or file system
    pass
