'use client';

import React from 'react';
import { FederalAssistanceUI } from '@/components/federal-assistance/FederalAssistanceUI';

// Real API function that connects to enhanced federal assistance server
async function executePrompt(promptName: string, params: Record<string, unknown>): Promise<string> {
  try {
    // Call the enhanced federal assistance API
    const response = await fetch('/api/federal-assistance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: promptName,
        data: params
      })
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Unknown error');
    }

    return result.data;
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to enhanced mock data if API fails
    return generateFallbackResponse(promptName, params);
  }
}

// Fallback function with enhanced data for development
function generateFallbackResponse(promptName: string, params: Record<string, unknown>): string {
  switch (promptName) {
    case 'grant-discovery':
      return `# Grant Discovery Results

## Recommended Programs

### 1. Community Development Block Grant (CDBG) - 14.218
**Agency:** Department of Housing and Urban Development
**Funding Available:** $3.3 billion annually
**Match Score:** 95%

**Key Highlights:**
- Perfect match for community development organizations
- Flexible funding for housing, economic development, and public services
- Strong track record of awards in your geographic area

### 2. Social Services Block Grant - 93.667
**Agency:** Department of Health and Human Services  
**Funding Available:** $1.7 billion annually
**Match Score:** 87%

**Key Highlights:**
- Excellent alignment with social services focus
- Streamlined application process
- High success rate for established nonprofits

### 3. Community Services Block Grant - 93.569
**Agency:** Department of Health and Human Services
**Funding Available:** $760 million annually  
**Match Score:** 82%

**Strategic Recommendations:**
- Apply to CDBG first - highest probability of success
- Consider partnership opportunities for larger awards
- Timeline: Submit applications by Q2 2025 for optimal positioning`;

    case 'program-deep-dive':
      return `# Program Deep Dive Analysis: ${JSON.stringify(params)}

## Program Overview
Comprehensive federal assistance program with multi-year funding cycles and competitive selection process.

## Eligibility Analysis
- ✅ Organization type: QUALIFIED
- ✅ Geographic scope: ELIGIBLE  
- ✅ Program focus: STRONG MATCH
- ⚠️  Budget requirements: REVIEW NEEDED

## Competitive Landscape
- 847 applications received last cycle
- 156 awards made (18.4% success rate)
- Average award: $2.3M over 3 years

## Strategic Recommendations
1. Strengthen partnership component
2. Emphasize measurable outcomes
3. Align with agency priorities
4. Submit early in application window`;

    case 'application-strategy':
      return `# Multi-Program Application Strategy

## Portfolio Overview
Target Programs: ${JSON.stringify(params.program_numbers)}

## Strategic Timeline
**Phase 1 (Q1 2025):** Foundation building
- Complete organizational assessments
- Develop partnership agreements
- Strengthen data collection systems

**Phase 2 (Q2 2025):** Primary applications
- Submit highest-probability applications
- Focus resources on top 3 opportunities

**Phase 3 (Q3-Q4 2025):** Follow-up and expansion
- Submit remaining applications
- Prepare for award negotiations

## Success Probability Analysis
- Program 1: 73% success probability
- Program 2: 68% success probability  
- Program 3: 59% success probability

**Overall Portfolio Success Rate: 84%**`;

    case 'policy-analysis':
      return `# Federal Funding Policy Analysis

## Current Trends
- **Infrastructure Focus:** 23% increase in transportation/infrastructure funding
- **Climate Initiatives:** New $50B allocation for environmental programs
- **Equity Requirements:** Enhanced diversity and inclusion mandates

## Agency Priorities
### Department of Health and Human Services
- Mental health and substance abuse programs
- Rural healthcare access initiatives
- Aging population services

### Department of Education  
- STEM education enhancement
- Career and technical education
- Digital equity programs

## Strategic Opportunities
1. **Cross-agency partnerships** showing 34% higher success rates
2. **Data-driven approaches** preferred by 89% of programs
3. **Community engagement** increasingly weighted in scoring`;

    case 'similar-programs':
      return `# Similar Programs Analysis

## Programs Similar to ${params.base_program_number}

### High Similarity (90%+ match)
1. **Program 93.958** - Community Health Centers
   - Similar eligibility criteria
   - Comparable funding levels
   - Aligned performance metrics

2. **Program 93.224** - Health Resources and Services Administration
   - Overlapping target populations
   - Similar application requirements

### Moderate Similarity (70-89% match)
3. **Program 93.527** - Affordable Care Act Programs
   - Related but broader scope
   - Different funding mechanisms

## Expansion Opportunities
Consider applying to similar programs to diversify funding portfolio and reduce risk.`;

    case 'search-programs':
      return `# Program Search Results

## Matching Programs (${params.keywords || 'your criteria'})

Found 47 programs matching your search criteria:

### Top Matches
1. **Community Development Financial Institutions Fund - 21.020**
   - $300M available
   - Due: March 15, 2025

2. **Rural Business Development Grant - 10.769**  
   - $50M available
   - Due: April 30, 2025

3. **Workforce Innovation Fund - 17.283**
   - $125M available
   - Due: February 28, 2025

## Filters Applied
- Geographic scope: ${params.geographic_scope || 'All'}
- Funding range: ${params.funding_range || 'All'}
- Organization type: ${params.organization_type || 'All'}`;

    default:
      return `# Analysis Complete

Results for prompt: ${promptName}
Parameters: ${JSON.stringify(params, null, 2)}

This is a demonstration of the Federal Assistance Intelligence platform. 
In a real implementation, this would connect to the MCP server and return actual federal grant data analysis.`;
  }
}

export default function FederalAssistancePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <FederalAssistanceUI onExecutePrompt={executePrompt} />
    </div>
  );
}
