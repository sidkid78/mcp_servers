'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Target, 
  Building2, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface GrantDiscoveryFormProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function GrantDiscoveryForm({ onExecutePrompt }: GrantDiscoveryFormProps) {
  const [formData, setFormData] = useState({
    organization_type: '',
    sector: '',
    location: '',
    funding_range: '',
    objectives: [] as string[],
    experience_level: '',
    timeline: '',
    special_populations: [] as string[],
    organization_name: '',
    project_description: '',
    additional_requirements: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const organizationTypes = [
    { value: 'nonprofit', label: 'Nonprofit Organization', description: 'Tax-exempt organizations, foundations, charities' },
    { value: 'state', label: 'State/Local Government', description: 'Government agencies, municipalities, counties' },
    { value: 'university', label: 'University/Academic', description: 'Higher education institutions, research centers' },
    { value: 'individual', label: 'Individual', description: 'Entrepreneurs, researchers, artists' },
    { value: 'business', label: 'Business/Commercial', description: 'For-profit enterprises, corporations' }
  ];

  const sectors = [
    { value: 'healthcare', label: 'Healthcare & Medical', icon: '🏥' },
    { value: 'education', label: 'Education & Training', icon: '🎓' },
    { value: 'environment', label: 'Environment & Conservation', icon: '🌱' },
    { value: 'agriculture', label: 'Agriculture & Food', icon: '🌾' },
    { value: 'technology', label: 'Technology & Innovation', icon: '💻' },
    { value: 'housing', label: 'Housing & Community Development', icon: '🏠' },
    { value: 'economic', label: 'Economic Development', icon: '📈' },
    { value: 'arts', label: 'Arts & Culture', icon: '🎨' },
    { value: 'research', label: 'Research & Development', icon: '🔬' },
    { value: 'infrastructure', label: 'Infrastructure & Transportation', icon: '🚧' }
  ];

  const fundingRanges = [
    { value: '0-50000', label: 'Up to $50,000', description: 'Small grants, pilot projects' },
    { value: '50000-250000', label: '$50,000 - $250,000', description: 'Medium-scale projects' },
    { value: '250000+', label: '$250,000+', description: 'Large-scale initiatives' }
  ];

  const objectives = [
    'research', 'infrastructure', 'capacity_building', 'outreach', 
    'innovation', 'sustainability', 'workforce_development', 'community_engagement',
    'technology_transfer', 'education', 'prevention', 'treatment'
  ];

  const specialPopulations = [
    'rural', 'urban', 'minority', 'veterans', 'women', 'youth', 
    'elderly', 'disabled', 'tribal', 'immigrant', 'low_income'
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await onExecutePrompt('grant-discovery', formData);
      setResults(result);
    } catch (error) {
      console.error('Grant discovery failed:', error);
      setResults('Error: Failed to analyze grant opportunities. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleObjectiveToggle = (objective: string) => {
    setFormData(prev => ({
      ...prev,
      objectives: prev.objectives.includes(objective)
        ? prev.objectives.filter(obj => obj !== objective)
        : [...prev.objectives, objective]
    }));
  };

  const handleSpecialPopulationToggle = (population: string) => {
    setFormData(prev => ({
      ...prev,
      special_populations: prev.special_populations.includes(population)
        ? prev.special_populations.filter(pop => pop !== population)
        : [...prev.special_populations, population]
    }));
  };

  const isFormValid = formData.organization_type && formData.sector && formData.location && formData.funding_range;

  return (
    <div className="space-y-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Organization Name */}
        <div className="space-y-2">
          <Label htmlFor="organization_name" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Organization Name
          </Label>
          <Input
            id="organization_name"
            type="text"
            placeholder="Enter your organization name"
            value={formData.organization_name}
            onChange={(e) => handleInputChange('organization_name', e.target.value)}
            className="w-1/2 dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Organization Type */}
          <div className="space-y-2">
            <Label htmlFor="organization_type" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Organization Type *
            </Label>
            <Select value={formData.organization_type} onValueChange={(value) => setFormData(prev => ({ ...prev, organization_type: value }))}>
              <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                {organizationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div>
                      <div className="font-medium">{type.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{type.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location *
            </Label>
            <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
              <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select state or national" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="national">National (All States)</SelectItem>
                {usStates.map((state) => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sector and Funding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sector */}
          <div className="space-y-2">
            <Label htmlFor="sector" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Primary Sector *
            </Label>
            <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
              <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select primary sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector.value} value={sector.value}>
                    <div className="flex items-center gap-2">
                      <span>{sector.icon}</span>
                      <span>{sector.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Funding Range */}
          <div className="space-y-2">
            <Label htmlFor="funding_range" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Funding Range *
            </Label>
            <Select value={formData.funding_range} onValueChange={(value) => setFormData(prev => ({ ...prev, funding_range: value }))}>
              <SelectTrigger className="dark:bg-gray-800 dark:text-gray-100">
                <SelectValue placeholder="Select funding range" />
              </SelectTrigger>
              <SelectContent>
                {fundingRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    <div>
                      <div className="font-medium">{range.label}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{range.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-2">
          <Label htmlFor="project_description" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Project Description
          </Label>
          <Textarea
            id="project_description"
            placeholder="Describe your project, goals, and intended impact (optional but recommended for better matching)"
            value={formData.project_description}
            onChange={(e) => handleInputChange('project_description', e.target.value)}
            className="min-h-[100px] resize-y dark:bg-gray-800 dark:text-gray-100"
          />
        </div>

        {/* Project Objectives */}
        <div className="space-y-3 ">
          <Label className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Project Objectives
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 dark:bg-gray-800">
            {objectives.map((objective) => (
              <div key={objective} className="flex items-center space-x-2">
                <Checkbox
                  id={objective}
                  checked={formData.objectives.includes(objective)}
                  onCheckedChange={() => handleObjectiveToggle(objective)}
                />
                <Label htmlFor={objective} className="text-sm capitalize cursor-pointer">
                  {objective.replace('_', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4 flex-1" />
            {showAdvanced ? 'Hide' : 'Show'} Advanced Options
          </Button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 border rounded-lg bg-gray-50 border-gray-200 dark:border-gray-700 dark:bg-gray-800">
              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experience_level" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Experience Level
                </Label>
                <Select value={formData.experience_level} onValueChange={(value) => setFormData(prev => ({ ...prev, experience_level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner - First time applying</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Some grant experience</SelectItem>
                    <SelectItem value="advanced">Advanced - Extensive grant experience</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Timeline */}
              <div className="space-y-2">
                <Label htmlFor="timeline" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Application Timeline
                </Label>
                <Select value={formData.timeline} onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate - Apply ASAP</SelectItem>
                    <SelectItem value="6months">6 Months - Planning phase</SelectItem>
                    <SelectItem value="1year">1 Year - Strategic planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Special Populations */}
              <div className="space-y-3 md:col-span-2">
                <Label className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Target Populations (Optional)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {specialPopulations.map((population) => (
                    <div key={population} className="flex items-center space-x-2">
                      <Checkbox
                        id={population}
                        checked={formData.special_populations.includes(population)}
                        onCheckedChange={() => handleSpecialPopulationToggle(population)}
                      />
                      <Label htmlFor={population} className="text-sm capitalize cursor-pointer">
                        {population.replace('_', ' ')}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Requirements */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="additional_requirements" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Additional Requirements or Preferences
                </Label>
                <Textarea
                  id="additional_requirements"
                  placeholder="Any specific requirements, preferences, or constraints for grant opportunities (e.g., matching funds available, partnership requirements, etc.)"
                  value={formData.additional_requirements}
                  onChange={(e) => handleInputChange('additional_requirements', e.target.value)}
                  className="min-h-[80px] resize-y"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={!isFormValid || isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin mr-2">
                <Sparkles className="h-4 w-4 dark:text-green-400" />
              </div>
              Analyzing 2,559+ Programs + 250K Contracts...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2 dark:text-green-400" />
              Discover Federal Grants
            </>
          )}
        </Button>
      </form>

      {/* Results */}
      {results && (
        <Card className="border-green-200 dark:border-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-300">
              <CheckCircle2 className="h-5 w-5 dark:text-green-400" />
              Grant Discovery Results
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-400">
              Analysis complete - Found matching federal assistance programs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-200 dark:border-green-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-blue-600 mt-0.5 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1 dark:text-blue-100">How Grant Discovery Works</h3>
              <p className="text-sm text-blue-800 mb-2 dark:text-blue-400">
                Our AI analyzes your organization profile against 2,559+ federal assistance programs plus 250K contract records using advanced matching algorithms with USASpending data insights.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-400 dark:border-blue-400">
                  Eligibility Matching (40%)
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-400 dark:border-blue-400">
                  Funding Alignment (25%)
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-400 dark:border-blue-400">
                  Objective Scoring (20%)
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-400 dark:border-blue-400">
                  Geographic Relevance (15%)
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}