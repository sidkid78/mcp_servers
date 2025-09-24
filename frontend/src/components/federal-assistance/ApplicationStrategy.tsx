'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  CheckCircle2, 
  Target, 
  Building2, 
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  FileText,
  Sparkles,
  Settings,
  Award,
  Clock,
  Database,
  Zap,
  Shield,
  MapPin,
  Plus,
  X,
  Activity,
  Moon,
  Sun
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ApplicationStrategyProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function ApplicationStrategy({ onExecutePrompt }: ApplicationStrategyProps) {
  const [programNumbers, setProgramNumbers] = useState<string[]>(['']);
  const [organizationType, setOrganizationType] = useState('');
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [targetPopulation, setTargetPopulation] = useState('');
  const [geographicScope, setGeographicScope] = useState('');
  const [annualBudget, setAnnualBudget] = useState('');
  const [staffCapacity, setStaffCapacity] = useState('');
  const [pastExperience, setPastExperience] = useState('');
  const [strategicGoals, setStrategicGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [fundingGoal, setFundingGoal] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');
  const [applicationComplexity, setApplicationComplexity] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const organizationTypes = [
    { value: 'nonprofit', label: 'Nonprofit Organization' },
    { value: 'government', label: 'Government Agency' },
    { value: 'university', label: 'University/Academic Institution' },
    { value: 'hospital', label: 'Hospital/Healthcare System' },
    { value: 'school_district', label: 'School District' },
    { value: 'community_college', label: 'Community College' },
    { value: 'faith_based', label: 'Faith-Based Organization' },
    { value: 'tribal', label: 'Tribal Organization' },
    { value: 'for_profit', label: 'For-Profit Organization' },
    { value: 'coalition', label: 'Coalition/Partnership' }
  ];

  const focusAreaOptions = [
    { value: 'healthcare', label: 'Healthcare & Medical Services' },
    { value: 'education', label: 'Education & Training' },
    { value: 'social_services', label: 'Social Services' },
    { value: 'mental_health', label: 'Mental Health & Substance Abuse' },
    { value: 'housing', label: 'Housing & Homelessness' },
    { value: 'workforce', label: 'Workforce Development' },
    { value: 'youth', label: 'Youth Development' },
    { value: 'seniors', label: 'Senior Services' },
    { value: 'disability', label: 'Disability Services' },
    { value: 'veterans', label: 'Veterans Services' },
    { value: 'environment', label: 'Environmental Protection' },
    { value: 'agriculture', label: 'Agriculture & Rural Development' },
    { value: 'technology', label: 'Technology & Innovation' },
    { value: 'arts', label: 'Arts & Culture' },
    { value: 'public_safety', label: 'Public Safety & Justice' },
    { value: 'transportation', label: 'Transportation & Infrastructure' }
  ];

  const budgetRanges = [
    { value: 'under_100k', label: 'Under $100K' },
    { value: '100k_500k', label: '$100K - $500K' },
    { value: '500k_1m', label: '$500K - $1M' },
    { value: '1m_5m', label: '$1M - $5M' },
    { value: '5m_10m', label: '$5M - $10M' },
    { value: 'over_10m', label: '$10M+' }
  ];

  const staffCapacityOptions = [
    { value: 'small', label: '1-10 Staff' },
    { value: 'medium', label: '11-50 Staff' },
    { value: 'large', label: '51-200 Staff' },
    { value: 'very_large', label: '200+ Staff' }
  ];

  const geographicScopes = [
    { value: 'local', label: 'Local' },
    { value: 'regional', label: 'Regional' },
    { value: 'state', label: 'State' },
    { value: 'multi_state', label: 'Multi-State' },
    { value: 'national', label: 'National' }
  ];

  const fundingGoalOptions = [
    { value: 'under_50k', label: 'Under $50K' },
    { value: '50k_250k', label: '$50K - $250K' },
    { value: '250k_1m', label: '$250K - $1M' },
    { value: '1m_5m', label: '$1M - $5M' },
    { value: 'over_5m', label: '$5M+' }
  ];

  const teamSizeOptions = [
    { value: '1-2', label: '1-2 People' },
    { value: '3-5', label: '3-5 People' },
    { value: '6-10', label: '6-10 People' },
    { value: '11-20', label: '11-20 People' },
    { value: '20+', label: '20+ People' }
  ];

  const priorityLevelOptions = [
    { value: 'critical', label: 'Critical Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const complexityOptions = [
    { value: 'simple', label: 'Simple (Basic forms)' },
    { value: 'moderate', label: 'Moderate (Standard requirements)' },
    { value: 'complex', label: 'Complex (Extensive documentation)' },
    { value: 'very_complex', label: 'Very Complex (Multi-phase, partnerships)' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validPrograms = programNumbers.filter(p => p.trim());
    if (validPrograms.length === 0) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        program_numbers: validPrograms.map(p => p.trim())
      };

      // Add organization profile if provided
      const profile: Record<string, unknown> = {};
      if (organizationType) profile.organization_type = organizationType;
      if (focusAreas.length > 0) profile.focus_areas = focusAreas;
      if (targetPopulation) profile.target_population = targetPopulation;
      if (geographicScope) profile.geographic_scope = geographicScope;
      if (annualBudget) profile.annual_budget = annualBudget;
      if (staffCapacity) profile.staff_capacity = staffCapacity;
      if (pastExperience) profile.past_experience = pastExperience;
      if (strategicGoals) profile.strategic_goals = strategicGoals;
      if (fundingGoal) profile.funding_goal = fundingGoal;
      if (teamSize) profile.team_size = teamSize;
      if (applicationDeadline) profile.application_deadline = applicationDeadline;
      if (priorityLevel) profile.priority_level = priorityLevel;
      if (applicationComplexity) profile.application_complexity = applicationComplexity;

      if (Object.keys(profile).length > 0) {
        params.applicant_profile = profile;
      }

      const result = await onExecutePrompt('application-strategy', params);
      setResults(result);
    } catch (error) {
      console.error('Application strategy failed:', error);
      setResults('Error: Failed to generate application strategy. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const addProgramField = () => {
    setProgramNumbers([...programNumbers, '']);
  };

  const removeProgramField = (index: number) => {
    const newPrograms = programNumbers.filter((_, i) => i !== index);
    setProgramNumbers(newPrograms.length > 0 ? newPrograms : ['']);
  };

  const updateProgramNumber = (index: number, value: string) => {
    const newPrograms = [...programNumbers];
    newPrograms[index] = value;
    setProgramNumbers(newPrograms);
  };

  const handleFocusAreaToggle = (area: string) => {
    setFocusAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const validProgramCount = programNumbers.filter(p => p.trim()).length;

  return (
    <div className="space-y-6">
      {/* Dark mode toggle */}
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2"
        >
          {darkMode ? (
            <>
              <Sun className="h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Dark Mode
            </>
          )}
        </Button>
      </div>

      {/* Portfolio Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-900">
        <CardHeader className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <div>
                <CardTitle className="text-slate-900 dark:text-slate-100">Portfolio Configuration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">Define target programs and organization parameters</CardDescription>
              </div>
            </div>
            <Badge variant="outline" className="text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-600">
              {validProgramCount} Programs Selected
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {/* Program Numbers */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Database className="h-4 w-4" />
              Target Programs
            </Label>
            {programNumbers.map((program, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={program}
                  onChange={(e) => updateProgramNumber(index, e.target.value)}
                  placeholder={`Program ${index + 1} (e.g., 93.243)`}
                  className="flex-1 font-mono dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                />
                {programNumbers.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeProgramField(index)}
                    className="px-3 text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 dark:border-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addProgramField}
              className="flex items-center gap-2 text-sm dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Add Program
            </Button>
          </div>

          {/* Organization Profile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Building2 className="h-4 w-4" />
                Organization Type
              </Label>
              <Select value={organizationType} onValueChange={setOrganizationType}>
                <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                  {organizationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="dark:text-slate-100 dark:focus:bg-slate-700">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <MapPin className="h-4 w-4" />
                Geographic Scope
              </Label>
              <Select value={geographicScope} onValueChange={setGeographicScope}>
                <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                  {geographicScopes.map((scope) => (
                    <SelectItem key={scope.value} value={scope.value} className="dark:text-slate-100 dark:focus:bg-slate-700">
                      {scope.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Application Strategy Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <DollarSign className="h-4 w-4" />
                Funding Goal
              </Label>
              <Select value={fundingGoal} onValueChange={setFundingGoal}>
                <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue placeholder="Select funding target" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                  {fundingGoalOptions.map((goal) => (
                    <SelectItem key={goal.value} value={goal.value} className="dark:text-slate-100 dark:focus:bg-slate-700">
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Users className="h-4 w-4" />
                Application Team Size
              </Label>
              <Select value={teamSize} onValueChange={setTeamSize}>
                <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue placeholder="Select team size" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                  {teamSizeOptions.map((size) => (
                    <SelectItem key={size.value} value={size.value} className="dark:text-slate-100 dark:focus:bg-slate-700">
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Clock className="h-4 w-4" />
                Application Deadline
              </Label>
              <Input
                type="date"
                value={applicationDeadline}
                onChange={(e) => setApplicationDeadline(e.target.value)}
                className="w-full dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Sparkles className="h-4 w-4" />
                Priority Level
              </Label>
              <Select value={priorityLevel} onValueChange={setPriorityLevel}>
                <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                  {priorityLevelOptions.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value} className="dark:text-slate-100 dark:focus:bg-slate-700">
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <FileText className="h-4 w-4" />
              Application Complexity
            </Label>
            <Select value={applicationComplexity} onValueChange={setApplicationComplexity}>
              <SelectTrigger className="dark:bg-slate-800 dark:border-slate-600 dark:text-slate-100">
                <SelectValue placeholder="Select complexity level" />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-800 dark:border-slate-600">
                {complexityOptions.map((complexity) => (
                  <SelectItem key={complexity.value} value={complexity.value} className="dark:text-slate-100 dark:focus:bg-slate-700">
                    {complexity.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Focus Areas */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
              <Zap className="h-4 w-4" />
              Focus Areas
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {focusAreaOptions.map((area) => (
                <div key={area.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={area.value}
                    checked={focusAreas.includes(area.value)}
                    onCheckedChange={() => handleFocusAreaToggle(area.value)}
                    className="dark:border-slate-600 dark:data-[state=checked]:bg-slate-100 dark:data-[state=checked]:text-slate-900"
                  />
                  <Label htmlFor={area.value} className="text-sm cursor-pointer text-slate-700 dark:text-slate-300">
                    {area.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Advanced Configuration */}
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
            >
              <Settings className="h-4 w-4" />
              {showAdvancedOptions ? 'Hide' : 'Show'} Advanced Configuration
            </Button>

            {showAdvancedOptions && (
              <div className="mt-4 space-y-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Annual Budget</Label>
                    <Select value={annualBudget} onValueChange={setAnnualBudget}>
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        {budgetRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value} className="dark:text-slate-100 dark:focus:bg-slate-600">
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Staff Capacity</Label>
                    <Select value={staffCapacity} onValueChange={setStaffCapacity}>
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                        <SelectValue placeholder="Select capacity" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        {staffCapacityOptions.map((capacity) => (
                          <SelectItem key={capacity.value} value={capacity.value} className="dark:text-slate-100 dark:focus:bg-slate-600">
                            {capacity.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Target Population</Label>
                  <Input
                    value={targetPopulation}
                    onChange={(e) => setTargetPopulation(e.target.value)}
                    placeholder="e.g., Low-income families, Veterans, Rural communities"
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Past Grant Experience</Label>
                  <Textarea
                    value={pastExperience}
                    onChange={(e) => setPastExperience(e.target.value)}
                    placeholder="Brief description of federal grant experience"
                    rows={3}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700 dark:text-slate-300">Strategic Goals</Label>
                  <Textarea
                    value={strategicGoals}
                    onChange={(e) => setStrategicGoals(e.target.value)}
                    placeholder="Key organizational objectives and funding goals"
                    rows={3}
                    className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Execute Strategy Analysis */}
      <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <CardContent className="p-6">
          <Button 
            onClick={handleSubmit}
            className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900"
            disabled={isLoading || validProgramCount === 0}
            size="lg"
          >
            {isLoading ? (
              <>
                <Activity className="h-4 w-4 mr-2 animate-spin" />  
                Generating Strategy...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Portfolio Strategy
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-950">
          <CardHeader className="border-b border-green-200 dark:border-green-700 bg-green-100 dark:bg-green-900">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-700 dark:text-green-400" />
              <div>
                <CardTitle className="text-green-900 dark:text-green-100">Strategy Analysis Complete</CardTitle>
                <CardDescription className="text-green-700 dark:text-green-300">
                  Portfolio optimization and application roadmap
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-green-600 dark:bg-green-700 text-white">SUCCESS</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-200 dark:border-green-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Strategy Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Portfolio Optimization</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Multi-program success modeling</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Timeline Coordination</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Application scheduling & workflow</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Shield className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Risk Assessment</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Application risk mitigation</p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <CardContent className="p-4 text-center">
            <Award className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
            <h3 className="font-medium text-sm mb-1 text-slate-900 dark:text-slate-100">Success Probability</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">Award likelihood scoring</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
