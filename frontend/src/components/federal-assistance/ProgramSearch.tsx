'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Building2, 
  Target, 
  DollarSign,
  Users,
  FileText,
  Sparkles,
  CheckCircle2,
  X
} from 'lucide-react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ProgramSearchProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function ProgramSearch({ onExecutePrompt }: ProgramSearchProps) {
  const [searchParams, setSearchParams] = useState({
    keywords: '',
    department: '',
    assistance_types: [] as string[],
    min_funding: '',
    max_funding: '',
    limit: 20
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const departments = [
    { value: 'ALL', label: 'All Departments' },
    { value: 'HHS', label: 'Health & Human Services' },
    { value: 'USDA', label: 'Agriculture' },
    { value: 'EPA', label: 'Environmental Protection' },
    { value: 'ED', label: 'Education' },
    { value: 'DOJ', label: 'Justice' },
    { value: 'DOT', label: 'Transportation' },
    { value: 'HUD', label: 'Housing & Urban Development' },
    { value: 'DOS', label: 'State' },
    { value: 'DOC', label: 'Commerce' },
    { value: 'DOL', label: 'Labor' },
    { value: 'DOI', label: 'Interior' },
    { value: 'DOD', label: 'Defense' },
    { value: 'DHS', label: 'Homeland Security' },
    { value: 'VA', label: 'Veterans Affairs' },
    { value: 'DOE', label: 'Energy' }
  ];

  const assistanceTypes = [
    { value: 'project_grants', label: 'Project Grants', description: 'Competitive funding for specific projects' },
    { value: 'formula_grants', label: 'Formula Grants', description: 'Non-competitive funding based on formulas' },
    { value: 'cooperative_agreements', label: 'Cooperative Agreements', description: 'Collaborative funding partnerships' },
    { value: 'block_grants', label: 'Block Grants', description: 'Flexible funding for broad purposes' },
    { value: 'direct_payments', label: 'Direct Payments', description: 'Direct financial assistance' },
    { value: 'loans', label: 'Loans', description: 'Loan programs and guarantees' },
    { value: 'insurance', label: 'Insurance', description: 'Insurance and risk mitigation programs' },
    { value: 'technical_assistance', label: 'Technical Assistance', description: 'Training and advisory services' }
  ];

  const limitOptions = [
    { value: 10, label: '10 Results' },
    { value: 20, label: '20 Results' },
    { value: 50, label: '50 Results' },
    { value: 100, label: '100 Results' }
  ];

  const fundingRanges = [
    { min: '', max: '', label: 'Any Amount' },
    { min: '0', max: '50000', label: 'Up to $50K' },
    { min: '50000', max: '250000', label: '$50K - $250K' },
    { min: '250000', max: '1000000', label: '$250K - $1M' },
    { min: '1000000', max: '5000000', label: '$1M - $5M' },
    { min: '5000000', max: '', label: '$5M+' }
  ];

  const quickSearches = [
    { keywords: 'mental health', description: 'Mental health and substance abuse programs' },
    { keywords: 'climate change', description: 'Climate action and environmental programs' },
    { keywords: 'workforce development', description: 'Job training and workforce programs' },
    { keywords: 'rural development', description: 'Rural community development programs' },
    { keywords: 'research innovation', description: 'Research and innovation funding' },
    { keywords: 'community health', description: 'Community health initiatives' },
    { keywords: 'education equity', description: 'Educational equity and access programs' },
    { keywords: 'infrastructure', description: 'Infrastructure development programs' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await onExecutePrompt('search-programs', {
        keywords: searchParams.keywords || undefined,
        department: searchParams.department || undefined,
        assistance_types: searchParams.assistance_types.length > 0 ? searchParams.assistance_types : undefined,
        min_funding: searchParams.min_funding ? parseInt(searchParams.min_funding) : undefined,
        max_funding: searchParams.max_funding ? parseInt(searchParams.max_funding) : undefined,
        limit: searchParams.limit
      });
      setResults(result);
    } catch (error) {
      console.error('Program search failed:', error);
      setResults('Error: Failed to search programs. Please try again with different search criteria.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssistanceTypeToggle = (assistanceType: string) => {
    setSearchParams(prev => ({
      ...prev,
      assistance_types: prev.assistance_types.includes(assistanceType)
        ? prev.assistance_types.filter(type => type !== assistanceType)
        : [...prev.assistance_types, assistanceType]
    }));
  };

  const handleQuickSearch = (keywords: string) => {
    setSearchParams(prev => ({ ...prev, keywords }));
  };

  const handleFundingRangeSelect = (min: string, max: string) => {
    setSearchParams(prev => ({
      ...prev,
      min_funding: min,
      max_funding: max
    }));
  };

  const formatCurrency = (value: string) => {
    if (!value) return '';
    const num = parseInt(value);
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num.toLocaleString()}`;
  };

  const clearFilters = () => {
    setSearchParams({
      keywords: '',
      department: '',
      assistance_types: [],
      min_funding: '',
      max_funding: '',
      limit: 20
    });
  };

  const hasActiveFilters = searchParams.keywords || searchParams.department || searchParams.assistance_types.length > 0 || searchParams.min_funding || searchParams.max_funding;

  return (
    <div className="space-y-6">
      {/* Quick Search Options */}
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg dark:text-gray-100">W
            <Target className="h-5 w-5" />
            Quick Searches
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Try these popular search terms or create your own custom search below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {quickSearches.map((search, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-blue-500"
                onClick={() => handleQuickSearch(search.keywords)}
              >
                <CardContent className="p-3">
                  <h3 className="font-semibold text-sm mb-1 capitalize dark:text-gray-100">{search.keywords}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{search.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-gray-100">W
              <Search className="h-5 w-5" />
              Advanced Program Search
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Search federal assistance programs with advanced filtering options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Keywords and Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="keywords" className="flex items-center gap-2 dark:text-gray-100">W
                  <Search className="h-4 w-4" />
                  Keywords
                </Label>
                <Input
                  id="keywords"
                  value={searchParams.keywords}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, keywords: e.target.value }))}
                  placeholder="e.g., mental health, climate change, workforce"
                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department" className="flex items-center gap-2 dark:text-gray-100">W  
                  <Building2 className="h-4 w-4" />
                  Department
                </Label>
                <Select 
                  value={searchParams.department || 'ALL'} 
                  onValueChange={(value) => setSearchParams(prev => ({ ...prev, department: value === 'ALL' ? '' : value }))}
                >
                  <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100">
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value} className="dark:text-gray-100 dark:hover:bg-gray-600">
                        {dept.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2 dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                <Filter className="h-4 w-4" />
                {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
              </Button>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                {/* Funding Range */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 dark:text-gray-100">W
                    <DollarSign className="h-4 w-4" />
                    Funding Range
                  </Label>
                  
                  {/* Quick Funding Range Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    {fundingRanges.map((range, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant={searchParams.min_funding === range.min && searchParams.max_funding === range.max ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFundingRangeSelect(range.min, range.max)}
                        className="text-xs dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-600"
                      >
                        {range.label}
                      </Button>
                    ))}
                  </div>

                  {/* Custom Funding Range Inputs */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="min_funding" className="text-sm dark:text-gray-100">Minimum Amount</Label>
                      <Input
                        id="min_funding"
                        type="number"
                        value={searchParams.min_funding}
                        onChange={(e) => setSearchParams(prev => ({ ...prev, min_funding: e.target.value }))}
                        placeholder="0"
                        min="0"
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="max_funding" className="text-sm dark:text-gray-100">Maximum Amount</Label>
                      <Input
                        id="max_funding"
                        type="number"
                        value={searchParams.max_funding}
                        onChange={(e) => setSearchParams(prev => ({ ...prev, max_funding: e.target.value }))}
                        placeholder="No limit"
                        min="0"
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100 dark:placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Assistance Types */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 dark:text-gray-100">
                    <FileText className="h-4 w-4" />
                    Assistance Types
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {assistanceTypes.map((type) => (
                      <div key={type.value} className="flex items-start space-x-2">
                        <Checkbox
                          id={type.value}
                          checked={searchParams.assistance_types.includes(type.value)}
                          onCheckedChange={() => handleAssistanceTypeToggle(type.value)}
                          className="dark:border-gray-500 dark:data-[state=checked]:bg-blue-600 dark:data-[state=checked]:border-blue-600"
                        />
                        <div className="flex-1">
                          <Label htmlFor={type.value} className="text-sm font-medium cursor-pointer dark:text-gray-100">
                            {type.label}
                          </Label>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{type.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Result Limit */}
                <div className="space-y-2">
                  <Label htmlFor="limit" className="flex items-center gap-2 dark:text-gray-100">
                    <Users className="h-4 w-4" />
                    Maximum Results
                  </Label>
                  <Select 
                    value={searchParams.limit.toString()} 
                    onValueChange={(value) => setSearchParams(prev => ({ ...prev, limit: parseInt(value) }))}
                  >
                    <SelectTrigger className="w-48 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      {limitOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value.toString()} className="dark:text-gray-100 dark:hover:bg-gray-600">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20 dark:border dark:border-blue-800">
                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">Active Filters:</span>
                {searchParams.keywords && (
                  <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50">
                    Keywords: {searchParams.keywords}
                  </Badge>
                )}
                {searchParams.department && (
                  <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50">
                    Department: {departments.find(d => d.value === searchParams.department)?.label}
                  </Badge>
                )}
                {(searchParams.min_funding || searchParams.max_funding) && (  
                  <Badge variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50">
                    Funding: {searchParams.min_funding ? formatCurrency(searchParams.min_funding) : '$0'} - {searchParams.max_funding ? formatCurrency(searchParams.max_funding) : 'No limit'}
                  </Badge>
                )}
                {searchParams.assistance_types.map((type) => (
                  <Badge key={type} variant="secondary" className="text-blue-700 dark:text-blue-300 dark:bg-blue-800/50">
                    {assistanceTypes.find(t => t.value === type)?.label}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Button 
          type="submit" 
          className="w-full dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white" 
          disabled={isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <div className="animate-spin mr-2">
                <Sparkles className="h-4 w-4" />
              </div>
              Searching Programs...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Search Programs
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
              Search Results
            </CardTitle>
            <CardDescription className="text-green-700 dark:text-green-400">
              Federal assistance programs matching your search criteria
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-cyan-200 dark:border-cyan-700">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <Search className="h-8 w-8 text-blue-600 mx-auto mb-2 dark:text-blue-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Keyword Search</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Search across program titles and objectives</p>
          </CardContent>
        </Card>
        
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <Building2 className="h-8 w-8 text-green-600 mx-auto mb-2 dark:text-green-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Department Filter</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Filter by specific federal departments</p>
          </CardContent>
        </Card>
        
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <DollarSign className="h-8 w-8 text-emerald-600 mx-auto mb-2 dark:text-emerald-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Funding Range</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Filter by minimum and maximum funding amounts</p>
          </CardContent>
        </Card>
        
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardContent className="p-4">
            <Target className="h-8 w-8 text-orange-600 mx-auto mb-2 dark:text-orange-400" />
            <h3 className="font-semibold text-sm mb-1 dark:text-gray-100">Real-time Results</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">Live search across 2,482+ active programs</p>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-700 dark:bg-blue-900/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Search className="h-5 w-5 text-blue-600 mt-0.5 dark:text-blue-400" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1 dark:text-blue-100">Advanced Program Search</h3>
              <p className="text-sm text-blue-800 mb-2 dark:text-blue-300">
                Search and filter federal assistance programs using keywords, department filters, funding ranges, and assistance type categories to find the most relevant opportunities.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  2,482+ Programs
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  26 Departments
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  8 Assistance Types
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  Funding Filters
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 dark:text-blue-300 dark:border-blue-600 dark:bg-blue-800/30">
                  Real-time Search
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
