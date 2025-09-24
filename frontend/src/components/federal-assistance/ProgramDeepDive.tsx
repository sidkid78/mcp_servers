'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileSearch, 
  Search, 
  Target, 
  Building2, 
  DollarSign,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileText,
  Sparkles,
  Lightbulb,
  Award,
  Clock,
  BookOpen
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ProgramDeepDiveProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function ProgramDeepDive({ onExecutePrompt }: ProgramDeepDiveProps) {
  const [programId, setProgramId] = useState('');
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const [applicantProfile, setApplicantProfile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [organizationType, setOrganizationType] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [documentationLevel, setDocumentationLevel] = useState('standard');
  const [timeframe, setTimeframe] = useState('6-months');

  const analysisTypes = [
    { 
      value: 'comprehensive', 
      label: 'Comprehensive Analysis', 
      description: 'Complete program overview with all insights' 
    },
    { 
      value: 'eligibility', 
      label: 'Eligibility Assessment', 
      description: 'Focus on eligibility requirements and fit' 
    },
    { 
      value: 'application', 
      label: 'Application Process', 
      description: 'Application requirements and process details' 
    },
    { 
      value: 'competition', 
      label: 'Competition Analysis', 
      description: 'Competitive landscape and success factors' 
    }
  ];

  const organizationTypes = [
    { value: 'nonprofit', label: 'Nonprofit Organization' },
    { value: 'state-local-gov', label: 'State/Local Government' },
    { value: 'tribal', label: 'Tribal Government' },
    { value: 'university', label: 'University/Research Institution' },
    { value: 'hospital', label: 'Hospital/Healthcare' },
    { value: 'small-business', label: 'Small Business' },
    { value: 'other', label: 'Other' }
  ];

  const riskToleranceOptions = [
    { value: 'low', label: 'Low Risk', description: 'Prefer established programs with high success rates' },
    { value: 'medium', label: 'Medium Risk', description: 'Balanced approach to risk and opportunity' },
    { value: 'high', label: 'High Risk', description: 'Willing to pursue competitive, high-reward programs' }
  ];

  const documentationLevels = [
    { value: 'minimal', label: 'Minimal Documentation', description: 'Simple applications preferred' },
    { value: 'standard', label: 'Standard Documentation', description: 'Typical federal requirements' },
    { value: 'extensive', label: 'Extensive Documentation', description: 'Can handle complex applications' }
  ];

  const timeframeOptions = [
    { value: '3-months', label: '3 Months', description: 'Immediate funding needs' },
    { value: '6-months', label: '6 Months', description: 'Standard planning horizon' },
    { value: '12-months', label: '12 Months', description: 'Long-term strategic planning' },
    { value: 'flexible', label: 'Flexible', description: 'No specific timeline constraints' }
  ];

  const commonPrograms = [
    { id: '93.243', name: 'Substance Abuse and Mental Health Services Block Grant', agency: 'HHS' },
    { id: '10.025', name: 'Plant and Animal Disease, Pest Control, and Animal Care', agency: 'USDA' },
    { id: '84.027', name: 'Special Education Grants to States', agency: 'ED' },
    { id: '93.558', name: 'Temporary Assistance for Needy Families', agency: 'HHS' },
    { id: '16.738', name: 'Edward Byrne Memorial Justice Assistance Grant', agency: 'DOJ' },
    { id: '14.218', name: 'Community Development Block Grants/Entitlement Grants', agency: 'HUD' },
    { id: '66.458', name: 'Capitalization Grants for Clean Water State Revolving Funds', agency: 'EPA' },
    { id: '20.205', name: 'Highway Planning and Construction', agency: 'DOT' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!programId.trim()) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        program_number: programId.trim(),
        analysis_focus: analysisType
      };

      // Add applicant profile if provided
      if (applicantProfile.trim()) {
        params.applicant_profile = applicantProfile.trim();
      }

      // Add advanced options
      if (organizationType) {
        params.organization_type = organizationType;
      }
      
      params.risk_tolerance = riskTolerance;
      params.documentation_level = documentationLevel;
      params.timeframe = timeframe;

      const result = await onExecutePrompt('program-deep-dive', params);
      setResults(result);
    } catch (error) {
      console.error('Program analysis failed:', error);
      setResults('Error: Failed to analyze program. Please check the program number and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProgramSelect = (programNumber: string) => {
    setProgramId(programNumber);
  };

  return (
    <div className="space-y-6">
      {/* Quick Program Selection */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg dark:text-gray-100">
            <Award className="h-5 w-5 dark:text-green-400" />
            Popular Programs
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Click on a program to analyze it, or search for any program by number below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonPrograms.map((program) => (
              <Card 
                key={program.id}
                className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-blue-500"
                onClick={() => handleProgramSelect(program.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs dark:text-gray-100 dark:border-gray-500">
                      {program.id}
                    </Badge>
                    <Badge variant="secondary" className="text-xs dark:text-gray-100 dark:bg-gray-600 dark:border-gray-500">
                      {program.agency}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-sm leading-tight dark:text-gray-100">{program.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">
              <FileSearch className="h-5 w-5 dark:text-green-400" />
              Program Deep Dive Analysis
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Enter a program number to get comprehensive analysis and strategic insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Program ID and Analysis Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="program-id" className="flex items-center gap-2 dark:text-gray-100">
                  <Search className="h-4 w-4" />
                  Program Number *
                </Label>
                <Input
                  id="program-id"
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  placeholder="e.g., 93.243, 10.025, 84.027"
                  required
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter the assistance listing number (CFDA number)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="analysis-type" className="flex items-center gap-2 dark:text-gray-100">
                  <Target className="h-4 w-4" />
                  Analysis Focus
                </Label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    {analysisTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="dark:text-gray-100 dark:hover:bg-gray-600">
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {analysisTypes.find(t => t.value === analysisType)?.description}
                </p>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                className="flex items-center gap-2 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <Lightbulb className="h-4 w-4" />
                {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Options
              </Button>
            </div>

            {/* Advanced Options */}
            {showAdvancedOptions && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="space-y-2">
                  <Label htmlFor="applicant-profile" className="flex items-center gap-2 dark:text-gray-100">
                    <Users className="h-4 w-4" />
                    Applicant Profile (Optional)
                  </Label>
                  <Textarea
                    id="applicant-profile"
                    value={applicantProfile}
                    onChange={(e) => setApplicantProfile(e.target.value)}
                    placeholder="Describe your organization type, focus areas, target population, geographic scope, etc. This helps provide more targeted analysis and recommendations."
                    rows={3}
                    className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Provide details about your organization to get personalized eligibility assessment and strategic recommendations
                  </p>
                </div>

                {/* Organization Type */}
                <div className="space-y-2">
                  <Label htmlFor="organization-type" className="flex items-center gap-2 dark:text-gray-100">
                    <Building2 className="h-4 w-4" />
                    Organization Type
                  </Label>
                  <Select value={organizationType} onValueChange={setOrganizationType}>
                    <SelectTrigger className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-600 dark:border-gray-500">
                      {organizationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="dark:text-gray-100 dark:hover:bg-gray-500">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Your organization type affects eligibility for many programs
                  </p>
                </div>

                {/* Risk Tolerance */}
                <div className="space-y-2">
                  <Label htmlFor="risk-tolerance" className="flex items-center gap-2 dark:text-gray-100">
                    <AlertTriangle className="h-4 w-4" />
                    Risk Tolerance
                  </Label>
                  <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                    <SelectTrigger className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-600 dark:border-gray-500">
                      {riskToleranceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="dark:text-gray-100 dark:hover:bg-gray-500">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {riskToleranceOptions.find(r => r.value === riskTolerance)?.description}
                  </p>
                </div>

                {/* Documentation Level */}
                <div className="space-y-2">
                  <Label htmlFor="documentation-level" className="flex items-center gap-2 dark:text-gray-100">
                    <FileText className="h-4 w-4" />
                    Documentation Capacity
                  </Label>
                  <Select value={documentationLevel} onValueChange={setDocumentationLevel}>
                    <SelectTrigger className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-600 dark:border-gray-500">
                      {documentationLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value} className="dark:text-gray-100 dark:hover:bg-gray-500">
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {documentationLevels.find(d => d.value === documentationLevel)?.description}
                  </p>
                </div>

                {/* Timeframe */}
                <div className="space-y-2">
                  <Label htmlFor="timeframe" className="flex items-center gap-2 dark:text-gray-100">
                    <Clock className="h-4 w-4" />
                    Funding Timeframe
                  </Label>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-600 dark:border-gray-500">
                      {timeframeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="dark:text-gray-100 dark:hover:bg-gray-500">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {timeframeOptions.find(t => t.value === timeframe)?.description}
                  </p>
                </div>
              </div>
            )}

            {/* Current Selection Display */}
            {programId && (
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20 dark:border-blue-700 dark:border">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Selected Program:</span>
                <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50 dark:border-blue-600">
                  {programId}
                </Badge>
                <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50 dark:border-blue-600">
                  {analysisTypes.find(t => t.value === analysisType)?.label}
                </Badge>
                {applicantProfile && (
                  <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50 dark:border-blue-600">
                    With Profile
                  </Badge>
                )}
                {organizationType && (
                  <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50 dark:border-blue-600">
                    {organizationTypes.find(o => o.value === organizationType)?.label}
                  </Badge>
                )}
                <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50 dark:border-blue-600">
                  {riskToleranceOptions.find(r => r.value === riskTolerance)?.label}
                </Badge>
                <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50 dark:border-blue-600">
                  {timeframeOptions.find(t => t.value === timeframe)?.label}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white" 
          disabled={isLoading || !programId.trim()}
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin mr-2">
                <Sparkles className="h-4 w-4" />
              </div>
              Analyzing Program...
            </>
          ) : (
            <>
              <FileSearch className="h-4 w-4 mr-2" />
              Analyze Program
            </>
          )}
        </Button>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-green-200 bg-green-50 dark:border-green-700 dark:bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5" />
              Program Analysis Results
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-400">
              Comprehensive analysis of the federal assistance program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-cyan-200 dark:border-cyan-700">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2 dark:text-blue-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Eligibility Analysis</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Detailed eligibility requirements and fit assessment</p>
          </CardContent>
        </Card>
        
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2 dark:text-green-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Competition Insights</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Competitive landscape and success strategies</p>
          </CardContent>
        </Card>
        
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2 dark:text-purple-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Timeline Analysis</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Application deadlines and process timeline</p>
          </CardContent>
        </Card>
        
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <DollarSign className="h-8 w-8 text-orange-600 mx-auto mb-2 dark:text-orange-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Funding Intelligence</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Award amounts and funding patterns</p>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-blue-600 mt-0.5 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1 dark:text-blue-100">Program Deep Dive Analysis</h3>
              <p className="text-sm text-blue-800 mb-2 dark:text-blue-300">
                Get comprehensive intelligence on any federal assistance program including eligibility requirements, 
                competition analysis, application strategies, and success factors. Add your organization profile 
                for personalized recommendations.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  Eligibility Assessment
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  Competition Analysis
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  Strategic Insights
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  Success Factors
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  Personalized Fit
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}