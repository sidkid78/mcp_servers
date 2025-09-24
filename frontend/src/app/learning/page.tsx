'use client';

import { LearningDocumentationUI } from '@/components/learning-documentation/LearningDocumentationUI';

async function mockExecutePrompt(promptName: string, params: Record<string, unknown>): Promise<string> {
  // Mock implementation for development
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const mockResponses: Record<string, string> = {
    'learning-path-design': `# Custom Learning Path: ${params.skill_area}\n\n## Learning Objectives\n1. Master core concepts\n2. Build practical projects\n3. Apply best practices\n\n## Timeline: ${params.timeline} weeks\n\n### Module 1: Foundations\n- Core principles and concepts\n- Interactive tutorials\n- Knowledge assessments\n\n### Module 2: Practical Application  \n- Hands-on projects\n- Code reviews\n- Portfolio development\n\n### Module 3: Advanced Topics\n- Complex implementations\n- Performance optimization\n- Industry best practices`,
    
    'knowledge-assessment': `# Knowledge Assessment Report\n\n## Overall Score: 85/100\n\n### Performance Summary\n- **Strengths:** Problem-solving, theoretical understanding\n- **Areas for Improvement:** Practical application\n\n### Detailed Results\n| Category | Score | Proficiency |\n|----------|-------|-------------|\n| Concepts | 92/100 | Advanced |\n| Practice | 78/100 | Intermediate |\n| Problem Solving | 88/100 | Advanced |\n\n## Recommendations\n1. Focus on hands-on practice\n2. Build more complex projects\n3. Participate in code reviews`,
    
    'content-generation': `# Generated Learning Content: ${params.topic}\n\n## Learning Objectives\nBy the end of this content, learners will:\n1. Understand core concepts\n2. Apply knowledge practically\n3. Identify best practices\n\n## Content Structure\n### Introduction (10 min)\n- Overview and context\n- Prerequisites\n- Learning goals\n\n### Core Concepts (25 min)\n- Fundamental principles\n- Implementation examples\n- Common patterns\n\n### Practical Exercises (15 min)\n- Guided implementation\n- Challenge problems\n- Reflection questions`,
    
    'progress-tracking': `# Learning Progress Report\n\n## Progress Overview\n- **Completion Rate:** 78%\n- **Study Hours:** 40 hours this month\n- **Goals Achieved:** 4/5\n\n## Weekly Activity\n| Week | Hours | Concepts | Projects |\n|------|-------|----------|----------|\n| 1 | 8.5 | 12 | 2 |\n| 2 | 10.2 | 15 | 3 |\n| 3 | 9.8 | 11 | 2 |\n| 4 | 11.5 | 18 | 4 |\n\n## Achievements\n- ✅ Consistent Learner (30 days)\n- ✅ Project Builder (5+ projects)\n- ✅ Quiz Master (85%+ scores)`,
    
    'documentation-audit': `# Documentation Audit Report\n\n## Audit Summary\n- **Pages Analyzed:** 47\n- **Issues Found:** 23\n- **Quality Score:** 7.2/10\n\n## Critical Issues\n1. **Missing API Documentation** (12 endpoints)\n2. **Broken Links** (8 broken references)\n3. **Outdated Screenshots** (15 images)\n4. **Accessibility Issues** (No alt text)\n\n## Recommendations\n### Immediate (This Week)\n- Fix broken links\n- Add alt text to images\n- Update screenshots\n\n### Short-term (Next Month)\n- Standardize formatting\n- Add code examples\n- Improve navigation`,
    
    'interactive-tutorial': `# Interactive Tutorial: ${params.skill_topic}\n\n## Tutorial Overview\n**Level:** ${params.proficiency_level}\n**Duration:** ~45 minutes\n\n## Learning Modules\n\n### Module 1: Setup (10 min)\nEnvironment setup and basics\n\n### Module 2: Core Concepts (15 min)\nInteractive examples and exercises\n\n### Module 3: Practice (15 min)\nBuild a real-world example\n\n### Module 4: Testing (5 min)\nDebug and validate your work\n\n## Interactive Elements\n- Live code editor\n- Instant feedback\n- Progress tracking\n- Peer comparison`
  };

  return mockResponses[promptName] || 'Mock response for learning documentation prompt.';
}

export default function LearningDocumentationPage() {
  return <LearningDocumentationUI onExecutePrompt={mockExecutePrompt} />;
}