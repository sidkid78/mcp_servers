'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Lightbulb, 
  Users, 
  Settings, 
  CheckCircle2,
  Sparkles,
  BookOpen,
  Video,
  Image,
  PenTool,
  Layers,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';

interface ContentGenerationProps {
  onExecutePrompt: (promptName: string, params: Record<string, unknown>) => Promise<string>;
}

export function ContentGeneration({ onExecutePrompt }: ContentGenerationProps) {
  const [contentType, setContentType] = useState('tutorial');
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('general');
  const [formatPreference, setFormatPreference] = useState('interactive');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<string | null>(null);

  const contentTypes = [
    { value: 'tutorial', label: 'Tutorial', icon: BookOpen },
    { value: 'course', label: 'Course', icon: Layers },
    { value: 'guide', label: 'Guide', icon: FileText },
    { value: 'lesson', label: 'Lesson', icon: PenTool },
    { value: 'workshop', label: 'Workshop', icon: Users }
  ];

  const audiences = [
    { value: 'general', label: 'General Audience' },
    { value: 'beginner', label: 'Beginners' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'professional', label: 'Professionals' }
  ];

  const formats = [
    { value: 'interactive', label: 'Interactive', icon: Zap },
    { value: 'multimedia', label: 'Multimedia', icon: Video },
    { value: 'visual', label: 'Visual', icon: Image },
    { value: 'text', label: 'Text-based', icon: FileText }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    try {
      const params: Record<string, unknown> = {
        content_type: contentType,
        topic: topic.trim(),
        target_audience: targetAudience,
        format_preference: formatPreference
      };

      const result = await onExecutePrompt('content-generation', params);
      setResults(result);
    } catch (error) {
      console.error('Content generation failed:', error);
      setResults('Error: Failed to generate content. Please check your inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Generation Configuration */}
      <Card className="border-slate-200 dark:border-slate-700 dark:bg-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-700 border-b dark:border-slate-600">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            <div>
              <CardTitle className="text-slate-900 dark:text-slate-100">Content Generation Studio</CardTitle>
              <CardDescription className="dark:text-slate-400">Auto-create educational materials and learning content</CardDescription>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="text-purple-700 dark:text-purple-300 border-purple-300 dark:border-purple-600">AI-POWERED</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Content Type */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Layers className="h-4 w-4" />
                  Content Type
                </Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    {contentTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          className="dark:text-slate-100 dark:hover:bg-slate-600"
                        >
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Target Audience */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Users className="h-4 w-4" />
                  Target Audience
                </Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    {audiences.map((audience) => (
                      <SelectItem 
                        key={audience.value} 
                        value={audience.value}
                        className="dark:text-slate-100 dark:hover:bg-slate-600"
                      >
                        {audience.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Topic */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Lightbulb className="h-4 w-4" />
                Topic or Subject
              </Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Introduction to Machine Learning, Advanced React Patterns"
                className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100"
                required
              />
            </div>

            {/* Format Preference */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <Settings className="h-4 w-4" />
                Format Preference
              </Label>
              <Select value={formatPreference} onValueChange={setFormatPreference}>
                <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                  {formats.map((format) => {
                    const IconComponent = format.icon;
                    return (
                      <SelectItem 
                        key={format.value} 
                        value={format.value}
                        className="dark:text-slate-100 dark:hover:bg-slate-600"
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          {format.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Generate Button */}
            <Button 
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-white"
              disabled={isLoading || !topic.trim()}
              size="lg"
            >
              {isLoading ? (
                <>
                  <Settings className="h-4 w-4 mr-2 animate-spin" />
                  Generating Content...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Educational Content
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card className="border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20">
          <CardHeader className="border-b border-purple-200 dark:border-purple-700 bg-purple-100 dark:bg-purple-900/30">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-purple-700 dark:text-purple-400" />
              <div>
                <CardTitle className="text-purple-900 dark:text-purple-100">Content Generated</CardTitle>
                <CardDescription className="text-purple-700 dark:text-purple-300">
                  Educational content created and ready for use
                </CardDescription>
              </div>
              <Badge className="ml-auto bg-purple-600 dark:bg-purple-700 text-white">GENERATED</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-purple-200 dark:border-purple-600">
              <MarkdownRenderer content={results} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
