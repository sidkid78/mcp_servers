// Core type definitions for the Business Intelligence system

export interface Dataset {
  name: string;
  data: Record<string, unknown>[];
  metadata: DatasetMetadata;
  loadedAt: string;
}

export interface DatasetMetadata {
  shape: [number, number]; // [rows, columns]
  columns: ColumnInfo[];
  dtypes: Record<string, string>;
  missingValues: Record<string, number>;
  memoryUsage: string;
  sampleData: Record<string, unknown>[];
  encodingUsed?: string;
  sqlDatabaseStored: boolean;
}

export interface ColumnInfo {
  name: string;
  dtype: string;
  nonNullCount: number;
  nullCount: number;
  nullPercentage: number;
  uniqueCount: number;
  sampleValues: string[];
  min?: number;
  max?: number;
  mean?: number;
  type?: 'numeric' | 'categorical' | 'datetime' | 'text' | 'boolean';
}

export interface DataProfile {
  datasetName: string;
  profilingTimestamp: string;
  originalShape: [number, number];
  profiledShape: [number, number];
  isSampled: boolean;
  sampleSize: number;
  overview: DataOverview;
  columns: ColumnProfile[];
  dataQuality: DataQuality;
  statisticalSummary: StatisticalSummary;
  patterns: DataPatterns;
  businessInsights: BusinessInsights;
  recommendations: string[];
}

export interface DataOverview {
  shape: {
    rows: number;
    columns: number;
  };
  memoryUsage: {
    bytes: number;
    humanReadable: string;
  };
  dataTypes: {
    numeric: number;
    categorical: number;
    datetime: number;
    boolean: number;
  };
  completeness: {
    totalCells: number;
    missingCells: number;
    completenessPercentage: number;
  };
}

export interface ColumnProfile {
  name: string;
  dtype: string;
  basicStats: {
    count: number;
    missing: number;
    missingPercentage: number;
    uniqueCount: number;
    uniquenessPercentage: number;
  };
  type: 'numeric' | 'categorical' | 'datetime' | 'boolean';
  statistics?: NumericStats;
  categories?: CategoricalStats;
  timeRange?: DateTimeStats;
  distribution?: BooleanStats;
}

export interface NumericStats {
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  range: number;
  q1?: number;
  q3?: number;
  iqr?: number;
  skewness?: number;
  kurtosis?: number;
  variance?: number;
  distribution?: {
    zerosCount: number;
    zerosPercentage: number;
    negativeCount: number;
    negativePercentage: number;
  };
  outliers?: {
    count: number;
    percentage: number;
    method: string;
  };
}

export interface CategoricalStats {
  uniqueCount: number;
  mostFrequent: string;
  mostFrequentCount: number;
  leastFrequent: string;
  leastFrequentCount: number;
  topCategories?: Record<string, number>;
  distribution?: {
    singleOccurrenceCount: number;
    singleOccurrencePercentage: number;
    entropy: number;
  };
  textAnalysis?: {
    avgLength: number;
    minLength: number;
    maxLength: number;
    containsNumbers: number;
    containsSpecialChars: number;
  };
}

export interface DateTimeStats {
  earliest: string;
  latest: string;
  spanDays: number;
  patterns?: {
    yearRange: string;
    monthsPresent: number[];
    weekdaysDistribution: Record<string, number>;
    hoursDistribution: Record<string, number>;
  };
  frequency?: {
    medianIntervalHours: number;
    mostCommonInterval: string;
  };
}

export interface BooleanStats {
  trueCount: number;
  falseCount: number;
  truePercentage: number;
  falsePercentage: number;
}

export interface DataQuality {
  overallScore: number;
  completenessPercentage: number;
  issues: QualityIssue[];
  strengths: string[];
  recommendations: string[];
}

export interface QualityIssue {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  affectedColumns?: string[];
  count?: number;
}

export interface StatisticalSummary {
  numericColumns: number;
  categoricalColumns: number;
  datetimeColumns: number;
  booleanColumns: number;
  numericSummary?: {
    meanOfMeans: number;
    overallCorrelationStrength: number;
    highestVarianceColumn: string;
    lowestVarianceColumn: string;
  };
}

export interface DataPatterns {
  columnNamePatterns: ColumnNamePatterns;
  valuePatterns: ValuePatterns;
  structuralPatterns: StructuralPatterns;
}

export interface ColumnNamePatterns {
  businessDomains: Record<string, string[]>;
  namingConventions: Record<string, number>;
  totalColumns: number;
}

export interface ValuePatterns {
  potentialIdColumns: string[];
  contactInfoColumns: Array<{ column: string; type: string }>;
}

export interface StructuralPatterns {
  columnCount: number;
  rowCount: number;
  density: number;
  shapeCategory: 'wide' | 'tall' | 'balanced';
}

export interface BusinessInsights {
  dataReadiness: string;
  analysisOpportunities: string[];
  businessValueIndicators: string[];
  recommendedNextSteps: string[];
}

// Visualization Types
export interface VisualizationConfig {
  datasetName: string;
  chartType: ChartType;
  xColumn: string;
  yColumn: string;
  groupBy: string;
  title: string;
  outputPath?: string;
}

export type ChartType = 
  | 'bar' 
  | 'line' 
  | 'scatter' 
  | 'histogram' 
  | 'box' 
  | 'heatmap' 
  | 'pie' 
  | 'violin' 
  | 'pair' 
  | 'dashboard';

export interface VisualizationResult {
  datasetName: string;
  visualizationType: ChartType;
  status: 'success' | 'failed';
  chartData?: unknown;
  chartConfig?: unknown;
  dataSummary?: unknown;
  insights: string[];
  recommendations: string[];
  error?: string;
}

// Correlation Analysis Types
export interface CorrelationConfig {
  datasetName: string;
  method: 'pearson' | 'spearman' | 'kendall';
  targetColumn?: string;
  columns?: string[];
  threshold: number;
}

export interface CorrelationResult {
  datasetName: string;
  method: string;
  correlationMatrix: Record<string, Record<string, number>>;
  strongCorrelations: CorrelationPair[];
  moderateCorrelations: CorrelationPair[];
  surprisingCorrelations: SurprisingCorrelation[];
  averageCorrelation: number;
  mostCorrelatedPair?: CorrelationPair;
  businessInsights: string[];
  recommendations: string[];
}

export interface CorrelationPair {
  column1: string;
  column2: string;
  correlation: number;
  strength: 'weak' | 'moderate' | 'strong' | 'very_strong';
  pValue?: number;
  confidenceInterval?: [number, number];
  sampleSize?: number;
  businessMeaning?: string;
  actionability?: 'low' | 'medium' | 'high';
  statisticalSignificance?: string;
}

export interface SurprisingCorrelation {
  relationship: string;
  correlation: number;
  explanation: string;
  investigationNeeded: boolean;
  businessImplication: string;
}

// Segmentation Analysis Types
export interface SegmentationConfig {
  datasetName: string;
  segmentColumn: string;
  metricColumns: string[];
}

export interface SegmentationResult {
  datasetName: string;
  segmentColumn: string;
  metricColumns: string[];
  totalSegments: number;
  segments: Record<string, Segment>;
  insights: string[];
}

export interface Segment {
  size: number;
  percentage: number;
  metrics: Record<string, SegmentMetric>;
}

export interface SegmentMetric {
  count: number;
  mean?: number;
  sum?: number;
  min?: number;
  max?: number;
  uniqueValues?: number;
  mostCommon?: string;
}

// KPI Dashboard Types
export interface KPIConfig {
  datasetName: string;
  kpiConfig?: Record<string, unknown>;
}

export interface KPIDashboard {
  datasetName: string;
  generatedAt: string;
  kpis: Record<string, KPIMetric>;
  summary: {
    totalRecords: number;
    dataCompleteness: string;
    keyMetrics: number;
    dateRange: string;
  };
}

export interface KPIMetric {
  total: number;
  average: number;
  max: number;
  min: number;
  count: string;
}

// Prompt Workflow Types
export interface PromptConfig {
  dataPath?: string;
  businessContext?: string;
  datasetName?: string;
  focusArea?: string;
  timePeriod?: string;
  targetMetric?: string;
  hypothesis?: string;
  timeColumn?: string;
  metrics?: string;
  analysisResults?: string;
  audience?: string;
  format?: string;
  insights?: string;
  businessGoals?: string;
  constraints?: string;
}

export interface WorkflowResult {
  type: 'bi-discovery' | 'insight-investigation' | 'correlation-deep-dive' | 'trend-analysis' | 'executive-summary' | 'action-recommendations';
  status: 'success' | 'failed';
  summary: string;
  results: Record<string, unknown>;
  insights: string[];
  recommendations: string[];
  nextSteps: string[];
  error?: string;
}

// Gemini Integration Types
export interface GeminiConfig {
  apiKey: string;
  model: string;
}

export interface GeminiRequest {
  context: string;
  data: Record<string, unknown>;
  task: 'insight_generation' | 'pattern_analysis' | 'recommendation' | 'correlation_interpretation' | 'business_summary';
  focusArea?: string;
}

export interface GeminiResponse {
  insights: string[];
  recommendations: string[];
  summary: string;
  keyFindings: string[];
  businessImpact: string;
  nextSteps: string[];
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Loading and Error States
export interface LoadingState {
  isLoading: boolean;
  operation?: string;
  progress?: number;
}

export interface ErrorState {
  hasError: boolean;
  error?: Error;
  message?: string;
}

// Store Types for Zustand
export interface BiStore {
  // Datasets
  datasets: Record<string, Dataset>;
  activeDataset: string | null;
  
  // Loading states
  loading: LoadingState;
  
  // Error states
  error: ErrorState;
  
  // Analysis results
  profiles: Record<string, DataProfile>;
  correlations: Record<string, CorrelationResult>;
  visualizations: Record<string, VisualizationResult>;
  workflows: Record<string, WorkflowResult>;
  
  // Actions
  setDataset: (name: string, dataset: Dataset) => void;
  setActiveDataset: (name: string) => void;
  setLoading: (loading: LoadingState) => void;
  setError: (error: ErrorState) => void;
  setProfile: (datasetName: string, profile: DataProfile) => void;
  setCorrelation: (key: string, correlation: CorrelationResult) => void;
  setVisualization: (key: string, visualization: VisualizationResult) => void;
  setWorkflow: (key: string, workflow: WorkflowResult) => void;
  clearError: () => void;
}
