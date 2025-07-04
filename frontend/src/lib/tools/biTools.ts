// Core Business Intelligence Tools – Refactored TypeScript Implementation
// These are the tools that Gemini will orchestrate based on prompt workflows

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import {
  DataProfile,
  CorrelationResult,
  VisualizationResult,
  BusinessInsights,
  DataOverview,
  ColumnProfile,
  DataQuality,
  StatisticalSummary,
  DataPatterns,
  CorrelationPair,
  NumericStats,
  CategoricalStats,
  DateTimeStats,
  BooleanStats,
  QualityIssue
} from '../types';

// =============================================================================
// INTERFACES
// =============================================================================

export interface DataRow {
  [key: string]: unknown;
}

export interface ChartDataPoint {
  [key: string]: string | number | Date;
}

export interface PieChartDataPoint {
  name: string;
  value: number;
  percentage: number;
}

export interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'scatter' | 'pie' | 'heatmap';
  xKey?: string;
  yKey?: string;
  dataKey?: string;
  nameKey?: string;
}

export interface DataSummary {
  totalRecords: number;
  xColumn: string;
  yColumn: string;
  groupBy: string | null;
}

// Note: Some interfaces (DataProfile, DataOverview, etc.) are imported


// =============================================================================
// LOAD DATASOURCE TOOL
// =============================================================================

export interface LoadDatasourceParams {
  file: File;
  datasetName?: string;
}

export interface LoadDatasourceResult {
  datasetName: string;
  filePath: string;
  shape: [number, number];
  columns: string[];
  dtypes: Record<string, string>;
  missingValues: Record<string, number>;
  memoryUsage: string;
  sampleData: DataRow[];
  loadedAt: string;
  encodingUsed?: string;
}

export async function loadDatasourceTool({ file, datasetName }: LoadDatasourceParams): Promise<LoadDatasourceResult> {
  try {
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase() || '';
    const finalDatasetName = datasetName || fileName.split('.')[0];

    let data: DataRow[] = [];
    let encodingUsed: string | undefined;

    switch (fileExtension) {
      case 'csv': {
        const csvResult = await loadCSV(file);
        data = csvResult.data;
        encodingUsed = csvResult.encoding;
        break;
      }
      case 'xlsx':
      case 'xls':
        data = await loadExcel(file);
        break;
      case 'json':
        data = await loadJSON(file);
        break;
      default:
        throw new Error(`Unsupported file format: ${fileExtension}`);
    }

    if (data.length === 0) throw new Error('No data found in file');

    const columns = Object.keys(data[0] || {});
    const shape: [number, number] = [data.length, columns.length];

    const dtypes: Record<string, string> = {};
    const missingValues: Record<string, number> = {};

    columns.forEach((col: string) => {
      const values = data.map((row: DataRow) => row[col]).filter(isNonEmpty);
      missingValues[col] = data.length - values.length;
      if (values.length > 0) {
        const sampleValue = values[0];
        if (typeof sampleValue === 'number') {
          dtypes[col] = Number.isInteger(sampleValue) ? 'int64' : 'float64';
        } else if (typeof sampleValue === 'boolean') {
          dtypes[col] = 'bool';
        } else if (sampleValue instanceof Date) {
          dtypes[col] = 'datetime64';
        } else {
          const numericCount = values.filter((v: unknown) => !Number.isNaN(Number(v))).length;
          dtypes[col] = numericCount > values.length * 0.8 ? 'float64' : 'object';
        }
      } else {
        dtypes[col] = 'object';
      }
    });

    const memoryBytes = JSON.stringify(data).length;
    const memoryUsage = `${(memoryBytes / 1024 / 1024).toFixed(2)} MB`;
    const sampleData = data.slice(0, 3) as DataRow[];

    return {
      datasetName: finalDatasetName as string,
      filePath: fileName as string,
      shape: shape as [number, number],
      columns: columns as string[],
      dtypes: dtypes as Record<string, string>,
      missingValues: missingValues as Record<string, number>,
      memoryUsage: memoryUsage as string,
      sampleData: sampleData as DataRow[],
      loadedAt: new Date().toISOString(),
      encodingUsed: encodingUsed as string,
    } as LoadDatasourceResult;    
  } catch (error) {
    throw new Error(`Failed to load dataset: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// =============================================================================
// PROFILE DATASET TOOL  
// =============================================================================

export interface ProfileDatasetParams {
  datasetName: string;
  data: DataRow[];
  sampleSize?: number;
}

export async function profileDatasetTool({ datasetName, data, sampleSize = 10000 }: ProfileDatasetParams): Promise<DataProfile> {
  try {
    const sampledData = data.length > sampleSize ? data.slice(0, sampleSize) : data;
    const columns = Object.keys(data[0] || {});
    const originalShape: [number, number] = [data.length, columns.length];
    const profiledShape: [number, number] = [sampledData.length, columns.length];

    const overview = generateDataOverview(sampledData) as DataOverview;
    const columnProfiles = columns.map((col: string) => profileColumn(col, data) as ColumnProfile);
    const qualitySample = assessDataQuality(sampledData) as DataQuality;
    const summarySample = generateStatisticalSummary(sampledData) as StatisticalSummary;
    const patternsSample = detectDataPatterns(sampledData) as DataPatterns;
    const insightsSample = generateBusinessInsights(sampledData) as BusinessInsights;
    const recommendationsSample = generateProfileRecommendations(sampledData) as string[];

    return {
      datasetName: datasetName as string,
      overview,
      columns: columnProfiles,
      dataQuality: qualitySample,
      statisticalSummary: summarySample,
      patterns: patternsSample,
      businessInsights: insightsSample,
      recommendations: recommendationsSample,
      profilingTimestamp: new Date().toISOString() as string,
      originalShape: originalShape as [number, number],
      profiledShape: profiledShape as [number, number],
      isSampled: sampledData.length < data.length,
    } as DataProfile;
  } catch (error) {
    throw new Error(`Failed to profile dataset: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// =============================================================================
// RUN CORRELATION TOOL
// =============================================================================

export interface RunCorrelationParams {
  datasetName: string;
  data: DataRow[];
  columns?: string[];
}

export async function runCorrelationTool({ datasetName, data, columns }: RunCorrelationParams): Promise<CorrelationResult> {
  try {
    if (!data.length) throw new Error('No data available for correlation analysis');
    const numericColumns = getNumericColumns(data, columns) as string[];

    if (numericColumns.length < 2) {
      const allColumns = Object.keys(data[0] || {}) as string[];
      const sampleValues = allColumns.map((col: string) => ({
        column: col as string,
        sampleValue: data[0]?.[col] as string | number | boolean | Date | null,
        type: typeof data[0]?.[col] as string,
      }));
      throw new Error(
        `Need at least 2 numeric columns for correlation analysis. Found ${numericColumns.length} numeric columns: [${numericColumns.join(
          ', '
        )}]. Available columns: ${JSON.stringify(sampleValues, null, 2)}` as string
      );
    }

    const correlationMatrix = calculateCorrelationMatrix(data, numericColumns) as Record<string, Record<string, number>>;
    const strongCorrelations = findStrongCorrelations(correlationMatrix, numericColumns) as CorrelationPair[];
    const moderateCorrelations = findStrongCorrelations(correlationMatrix, numericColumns) as CorrelationPair[];
    const avgCorrelation = calculateAverageCorrelation(correlationMatrix, numericColumns) as number;
    const businessInsights = generateCorrelationInsights(correlationMatrix, numericColumns) as string[];

    return {
      datasetName: datasetName as string,
      method: 'pearson',
      correlationMatrix: correlationMatrix as Record<string, Record<string, number>>,
      strongCorrelations: strongCorrelations as CorrelationPair[],
      moderateCorrelations: moderateCorrelations as CorrelationPair[],
      averageCorrelation: avgCorrelation as number,
      mostCorrelatedPair: strongCorrelations[0] as CorrelationPair,
      businessInsights: businessInsights as string[], 
    } as CorrelationResult;
  } catch (error) {
    throw new Error(`Failed to run correlation analysis: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// =============================================================================
// ENHANCED VISUALIZATION TOOL
// =============================================================================

// Enhanced visualization types
type ChartType = 
  | "bar" 
  | "line" 
  | "scatter" 
  | "histogram" 
  | "box" 
  | "heatmap" 
  | "pie" 
  | "violin" 
  | "pair" 
  | "dashboard";

interface VisualizationParams {
  chart_type: ChartType;
  chart_name: string;
  title: string;
  columns: {
    x: string;
    y: string;
    group_by: string;
  };
}

interface EnhancedVisualizationResult {
  chart_image?: string;
  chart_type: ChartType;
  data_summary: Record<string, any>;
  error?: string;
}

interface CreateVisualizationResponse {
  dataset_name: string;
  visualization_type: ChartType;
  status: "success" | "failed";
  visualization?: EnhancedVisualizationResult;
  insights?: string[];
  recommendations?: string[];
  error?: string;
  suggestion?: string;
  available_datasets?: string[];
  troubleshooting?: string[];
}

interface StatisticalSummaryEx {
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  count: number;
  skewness?: number;
}

interface CategoryDataEx {
  name: string;
  percentage: number;
  count: number;
}

interface CorrelationDataEx {
  var1: string;
  var2: string;
  correlation: number;
}

export interface CreateVisualizationParams {
  datasetName: string;
  data: DataRow[];
  chartType: ChartType;
  xColumn: string;
  yColumn: string;
  groupBy?: string;
  title?: string;
  outputPath?: string;
}

// Enhanced visualization tool with comprehensive chart types and insights
export async function createVisualizationToolEnhanced({
  datasetName,
  data,
  chartType,
  xColumn,
  yColumn,
  groupBy = "",
  title = "",
  outputPath = ""
}: CreateVisualizationParams): Promise<CreateVisualizationResponse> {
  try {
    // Validate and prepare visualization parameters
    const vizParams = await prepareVisualizationParamsEx(
      data, chartType, xColumn, yColumn, groupBy, title
    );
    
    if ("error" in vizParams) {
      return {
        dataset_name: datasetName,
        visualization_type: chartType,
        status: "failed",
        ...vizParams
      };
    }
    
    // Generate visualization
    const visualizationResult = await generateVisualizationEx(data, vizParams);
    
    // Save visualization if output path specified
    let saveResult: Record<string, any> = {};
    if (outputPath && visualizationResult.chart_image) {
      saveResult = await saveVisualizationEx(visualizationResult, outputPath);
    }
    
    return {
      dataset_name: datasetName,
      visualization_type: chartType,
      status: "success",
      visualization: { ...visualizationResult, ...saveResult },
      insights: await generateVisualizationInsightsEx(data, vizParams),
      recommendations: await generateVisualizationRecommendationsEx(data, vizParams)
    };
    
  } catch (error) {
    return {
      dataset_name: datasetName,
      visualization_type: chartType,
      status: "failed",
      error: `Failed to create visualization: ${error instanceof Error ? error.message : String(error)}`,
      troubleshooting: [
        "Verify dataset name is correct",
        "Check column names exist in dataset",
        "Ensure chart type is supported",
        "Verify data types are appropriate for visualization"
      ]
    };
  }
}

// Original visualization tool (preserved for backward compatibility)
export async function createVisualizationTool({ datasetName, data, chartType, xColumn, yColumn }: Omit<CreateVisualizationParams, 'groupBy' | 'title' | 'outputPath'>): Promise<VisualizationResult> {
  try {
    const columns = Object.keys(data[0] || {});
    const numericColumns = getNumericColumns(data, columns);
    const categoricalColumns = columns.filter(col => !numericColumns.includes(col));

    const finalXColumn = xColumn || (categoricalColumns[0] || columns[0]);
    const finalYColumn = yColumn || numericColumns[0];

    let chartData: ChartDataPoint[] | PieChartDataPoint[] | HeatmapDataPoint[];
    let chartConfig: ChartConfig;

    switch (chartType) {
      case 'bar':
        chartData = generateBarChartData(data, finalXColumn, finalYColumn) as ChartDataPoint[];
        chartConfig = { type: 'bar', xKey: finalXColumn, yKey: finalYColumn };
        break;
      case 'line':
        chartData = generateLineChartData(data, finalXColumn, finalYColumn) as ChartDataPoint[];
        chartConfig = { type: 'line', xKey: finalXColumn, yKey: finalYColumn };
        break;
      case 'scatter':
        chartData = generateScatterChartData(data, finalXColumn, finalYColumn) as ChartDataPoint[];
        chartConfig = { type: 'scatter', xKey: finalXColumn, yKey: finalYColumn };
        break;
      case 'pie':
        chartData = generatePieChartData(data, finalXColumn) as PieChartDataPoint[];
        chartConfig = { type: 'pie', dataKey: 'value', nameKey: 'name' };
        break;
      case 'heatmap':
        chartData = generateHeatmapData(data, numericColumns) as HeatmapDataPoint[];
        chartConfig = { type: 'heatmap' };
        break;
      default:
        chartData = generateBarChartData(data, finalXColumn, finalYColumn) as ChartDataPoint[];
        chartConfig = { type: 'bar', xKey: finalXColumn, yKey: finalYColumn };
    }

    const dataSummary: DataSummary = {
      totalRecords: data.length,
      xColumn: finalXColumn,
      yColumn: finalYColumn,
      groupBy: null,
    };

    const insights = generateVisualizationInsights(chartType, chartData as ChartDataPoint[], finalXColumn, finalYColumn);
    const recommendations = generateVisualizationRecommendations(chartType, data, numericColumns.length) as string[];

    return {
      datasetName: datasetName as string,
      visualizationType: chartType,
      status: 'success',
      chartData,  
      chartConfig,
      dataSummary,
      insights,
      recommendations,
    } as VisualizationResult;
  } catch (error) {
    throw new Error(`Failed to create visualization: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

export async function loadCSV(file: File): Promise<{ data: DataRow[]; encoding: string }> {
  return new Promise((resolve: (value: { data: DataRow[]; encoding: string } | PromiseLike<{ data: DataRow[]; encoding: string }>) => void, reject: (reason?: unknown) => void) => {
    Papa.parse<DataRow>(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: results => {
        if (results.errors.length > 0) {
          reject(new Error(`CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`));
        } else {
          resolve({ data: results.data, encoding: 'utf-8' });
        }
      },
      error: err => reject(new Error(`Failed to parse CSV: ${err instanceof Error ? err.message : 'Unknown error'}`)),
    });
  });
}

export async function loadExcel(file: File): Promise<DataRow[]> {
  const arrayBuffer = await file.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet) as DataRow[];
}

export async function loadJSON(file: File): Promise<DataRow[]> {
  const text = await file.text();
  const jsonData = JSON.parse(text);
  if (Array.isArray(jsonData)) {
    return jsonData as DataRow[];
  } else if (typeof jsonData === 'object') {
    const arrayProp = Object.values(jsonData).find((val: unknown) => Array.isArray(val));
    if (arrayProp) {
      return arrayProp as DataRow[];
    } else {
      return [jsonData as DataRow];
    }
  }
  throw new Error('JSON data must be an array or object containing an array');
}

export function getNumericColumns(data: DataRow[], columnsFilter?: string[]): string[] {
  if (!data.length) return [];
  const columns = columnsFilter || Object.keys(data[0] || {});
  return columns.filter((col: string) => {
    const values = data.slice(0, 100).map((row: DataRow) => row[col]).filter(isNonEmpty);
    if (!values.length) return false;
    const numericValues = values
      .map((v: unknown) => {
        if (typeof v === 'number') return v;
        if (typeof v === 'string') {
          const num = parseFloat(v.replace(/[,$%]/g, ''));
          return Number.isNaN(num) ? null : num;
        }
        return null;
      })
      .filter((v): v is number => v !== null);
    return numericValues.length >= values.length * 0.8;
  });
}

export function calculateCorrelationMatrix(data: DataRow[], columns: string[]): Record<string, Record<string, number>> {
  const matrix: Record<string, Record<string, number>> = {};
  columns.forEach((col1: string) => {
    matrix[col1] = {};
    columns.forEach((col2: string) => {
      matrix[col1][col2] = col1 === col2 ? 1 : 0;
    });
  });
  for (let i = 0; i < columns.length; i++) {
    for (let j = i + 1; j < columns.length; j++) {
      const [col1, col2] = [columns[i], columns[j]];
      const correlation = calculatePearsonCorrelation(data, col1, col2);
      matrix[col1][col2] = correlation;
      matrix[col2][col1] = correlation; // symmetric
    }
  }
  return matrix;
}

export function calculatePearsonCorrelation(data: DataRow[], col1: string, col2: string): number {
  const pairs = data
    .map((row: DataRow) => {
      const x = convertToNumber(row[col1]);
      const y = convertToNumber(row[col2]);
      return [x, y] as [number | null, number | null];
    })
    .filter(
      ([x, y]) => x !== null && y !== null && !Number.isNaN(x as number) && !Number.isNaN(y as number)
    ) as [number, number][];
  if (pairs.length < 2) return 0;
  const n = pairs.length;
  const xValues = pairs.map((p: [number, number]) => p[0]);
  const yValues = pairs.map((p: [number, number]) => p[1]);
  const sumX = xValues.reduce((a: number, b: number) => a + b, 0);
  const sumY = yValues.reduce((a: number, b: number) => a + b, 0);
  const sumXY = pairs.reduce((sum: number, [xi, yi]: [number, number]) => sum + xi * yi, 0);
  const sumX2 = xValues.reduce((sum: number, xi: number) => sum + xi * xi, 0);
  const sumY2 = yValues.reduce((sum: number, yi: number) => sum + yi * yi, 0);
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2));
  return denominator === 0 ? 0 : numerator / denominator;
}

export function convertToNumber(value: unknown): number | null {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    if (value.trim() === '') return null;
    const cleaned = value.replace(/[,$%]/g, '');
    const num = parseFloat(cleaned);
    return Number.isNaN(num) ? null : num;
  }
  return null;
}

export function profileColumn(col: string, data: DataRow[]): ColumnProfile {
  if (!data || data.length === 0) {
    return {
      name: col as string,
      dtype: 'unknown',
      type: 'categorical',
      basicStats: {
        count: 0,
        missing: 0,
        missingPercentage: 100,
        uniqueCount: 0,
        uniquenessPercentage: 0
      }
    } as ColumnProfile;
  }
  const values = data.map((row: DataRow) => row[col]);
  const nonNullValues = values.filter(isNonEmpty);
  const nullCount = values.length - nonNullValues.length;
  const basicStats = {
    count: nonNullValues.length,
    missing: nullCount,
    missingPercentage: Math.round((nullCount / values.length) * 10000) / 100,
    uniqueCount: new Set(nonNullValues).size,
    uniquenessPercentage: nonNullValues.length
      ? Math.round((new Set(nonNullValues).size / nonNullValues.length) * 10000) / 100
      : 0,
  };
  const columnType = categorizeColumnType(data, col);
  const inferredDtype = inferDataType(nonNullValues);
  const profile: ColumnProfile = {
    name: col as string,
    dtype: inferredDtype,
    basicStats,
    type: columnType,
  };
  if (columnType === 'numeric') {
    profile.statistics = generateNumericStats(nonNullValues) as NumericStats;
  } else if (columnType === 'categorical') {
    profile.categories = generateCategoricalStats(nonNullValues) as CategoricalStats;
  } else if (columnType === 'datetime') {
    profile.timeRange = generateDateTimeStats(nonNullValues) as DateTimeStats;
  } else if (columnType === 'boolean') {
    profile.distribution = generateBooleanStats(nonNullValues) as BooleanStats;
  }
  return profile as ColumnProfile;
}

export function assessDataQuality(data: DataRow[]): DataQuality {
  if (!data || data.length === 0) {
    return {
      overallScore: 0,
      completenessPercentage: 0,
      issues: [],
      strengths: [],
      recommendations: [],
    } as DataQuality;
  }
  const columns = Object.keys(data[0] || {});
  const totalCells = data.length * columns.length;
  let missingCells = 0;
  let duplicateRows = 0;
  const issues: QualityIssue[] = [];
  const strengths: string[] = [];

  columns.forEach((col: string) => {
    const columnMissing = data.filter((row: DataRow) => row[col] === null || row[col] === undefined || row[col] === '').length;
    missingCells += columnMissing;
    const missingPercentage = (columnMissing / data.length) * 100;
    if (missingPercentage > 50) {
      issues.push({
        type: 'high_missing_data',
        severity: 'high',
        description: `Column '${col}' has ${missingPercentage.toFixed(1)}% missing data`,
        affectedColumns: [col],
        count: columnMissing,
      });
    } else if (missingPercentage > 20) {
      issues.push({
        type: 'moderate_missing_data',
        severity: 'medium',
        description: `Column '${col}' has ${missingPercentage.toFixed(1)}% missing data`,
        affectedColumns: [col],
        count: columnMissing,
      });
    }
  });

  const seen = new Set<string>();
  data.forEach((row: DataRow) => {
    const key = JSON.stringify(row);
    if (seen.has(key)) {
      duplicateRows++;
    } else {
      seen.add(key);
    }
  });

  if (duplicateRows > 0) {
    const duplicatePercentage = (duplicateRows / data.length) * 100;
    issues.push({
      type: 'duplicate_rows',
      severity: duplicatePercentage > 10 ? 'high' : 'medium',
      description: `${duplicateRows} duplicate rows found (${duplicatePercentage.toFixed(1)}%)`,
      count: duplicateRows,
    });
  }

  columns.forEach((col: string) => {
    if (new Set(data.map((row: DataRow) => row[col])).size === 1) {
      issues.push({
        type: 'constant_columns',
        severity: 'low',
        description: `Column '${col}' has constant value`,
        affectedColumns: [col],
      });
    }
  });

  const completenessPercentage = ((totalCells - missingCells) / totalCells) * 100;
  if (completenessPercentage > 95) {
    strengths.push('High data completeness (>95%)');
  }
  if (duplicateRows === 0) {
    strengths.push('No duplicate rows detected');
  }
  if (data.length > 1000) {
    strengths.push('Substantial dataset size for analysis');
  }

  let score = 100;
  score -= Math.min(30, (missingCells / totalCells) * 100);
  score -= Math.min(20, (duplicateRows / data.length) * 100);
  score -= issues.filter(i => i.severity === 'high').length * 10;
  score -= issues.filter(i => i.severity === 'medium').length * 5;

  const recommendations = generateQualityRecommendations(issues);

  return {
    overallScore: Math.max(0, Math.round(score)),
    completenessPercentage: Math.round(completenessPercentage * 100) / 100,
    issues,
    strengths,
    recommendations,
  } as DataQuality;
}

export function generateStatisticalSummary(data: DataRow[]): StatisticalSummary {
  if (!data || data.length === 0) {
    return {
      numericColumns: 0,
      categoricalColumns: 0,
      datetimeColumns: 0,
      booleanColumns: 0,
    } as StatisticalSummary;
  }
  const columns = Object.keys(data[0] || {});
  let numericColumns = 0,
    categoricalColumns = 0,
    datetimeColumns = 0,
    booleanColumns = 0;
  const numericStats: number[] = [];
  let highestVarianceColumn = '';
  let lowestVarianceColumn = '';
  let maxVariance = -1;
  let minVariance = Infinity;
  columns.forEach((col: string) => {
    const colType = categorizeColumnType(data, col);
    switch (colType) {
      case 'numeric': {
        numericColumns++;
        const values = data
          .map((row: DataRow) => row[col])
          .filter((v: unknown) => v !== null && v !== undefined && v !== '')
          .map((v: unknown) => (typeof v === 'number' ? v : Number(v)))
          .filter((v: unknown) => !Number.isNaN(v));
        if (values.length > 0) {
          const mean = values.reduce((sum: number, val: number) => sum + val, 0) / values.length;
          const variance = values.reduce((sum: number, val: number) => sum + (val - mean) ** 2, 0) / values.length;
          numericStats.push(mean);
          if (variance > maxVariance) {
            maxVariance = variance;
            highestVarianceColumn = col;
          }
          if (variance < minVariance) {
            minVariance = variance;
            lowestVarianceColumn = col;
          }
        }
        break;
      }
      case 'categorical':
        categoricalColumns++;
        break;
      case 'datetime':
        datetimeColumns++;
        break;
      case 'boolean':
        booleanColumns++;
        break;
    }
  });
  const summary: StatisticalSummary & {
    numericSummary?: {
      meanOfMeans: number;
      overallCorrelationStrength: number;
      highestVarianceColumn: string;
      lowestVarianceColumn: string;
    };
  } = {
    numericColumns,
    categoricalColumns,
    datetimeColumns,
    booleanColumns,
  };
  if (numericStats.length > 0) {
    const meanOfMeans = numericStats.reduce((sum: number, val: number) => sum + val, 0) / numericStats.length;
    summary.numericSummary = {
      meanOfMeans: Math.round(meanOfMeans * 100) / 100,
      overallCorrelationStrength: 0, // TODO: Calculate when correlation matrix is available
      highestVarianceColumn: highestVarianceColumn || 'None',
      lowestVarianceColumn: lowestVarianceColumn || 'None',
    };
  }
  return summary;
}

function generateQualityRecommendations(issues: QualityIssue[]): string[] {
  const recommendations = issues
    .map((issue: QualityIssue) => {
      switch (issue.type) {
        case 'high_missing_data':
          return '🔧 Implement imputation strategies or filter high-missing columns';
        case 'moderate_missing_data':
          return '📊 Consider imputation or investigate missing data patterns';
        case 'duplicate_rows':
          return '🔄 Remove duplicate rows using appropriate deduplication logic';
        case 'constant_columns':
          return '🗑️ Remove constant-value columns as they add no analytical value';
        default:
          return '';
      }
    })
    .filter(Boolean);
  return recommendations.length ? Array.from(new Set(recommendations)) : ['✅ No major quality issues detected'];
}

function generateDataOverview(data: DataRow[]): DataOverview {
  if (!data || data.length === 0) {
    return {
      shape: { rows: 0, columns: 0 },
      originalShape: { rows: 0, columns: 0 },
      profiledShape: { rows: 0, columns: 0 },
      isSampled: false,
      memoryUsage: { bytes: 0, humanReadable: '0 MB' },
      dataTypes: { numeric: 0, categorical: 0, datetime: 0, boolean: 0 },
      completeness: { totalCells: 0, missingCells: 0, completenessPercentage: 100 },
    } as DataOverview;
  }
  const columns = Object.keys(data[0] || {});
  const shape = { rows: data.length, columns: columns.length };
  const memoryBytes = JSON.stringify(data).length;
  const memoryUsage = { bytes: memoryBytes, humanReadable: `${(memoryBytes / 1024 / 1024).toFixed(2)} MB` };
  const dataTypes = { numeric: 0, categorical: 0, datetime: 0, boolean: 0 };
  columns.forEach((col: string) => {
    const colType = categorizeColumnType(data, col);
    dataTypes[colType as keyof typeof dataTypes]++;
  });
  const totalCells = data.length * columns.length;
  let missingCells = 0;
  columns.forEach((col: string) => {
    const missing = data.filter((row: DataRow) => isMissing(row[col])).length;
    missingCells += missing;
  });
  const completenessPercentage = totalCells > 0 ? Math.round(((totalCells - missingCells) / totalCells) * 10000) / 100 : 100;
  return {
    shape,
    originalShape: shape,
    profiledShape: shape,
    isSampled: false,
    memoryUsage,
    dataTypes,
    completeness: { totalCells, missingCells, completenessPercentage },
  } as DataOverview;
}

// =============================================================================
// HELPER FUNCTIONS FOR DATA PROFILING
// =============================================================================

function isMissing(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    value === 'undefined' ||
    value === 'NaN' ||
    value === 'Infinity' ||
    value === '-Infinity'
  );
}

function isNonEmpty(value: unknown): boolean {
  return !isMissing(value);
}

function categorizeColumnType(data: DataRow[], col: string): 'numeric' | 'categorical' | 'datetime' | 'boolean' {
  const values = data.map((row: DataRow) => row[col]).filter(isNonEmpty);
  if (values.length === 0) return 'categorical';
  if (values.every((v: unknown) => typeof v === 'boolean' || v === 'true' || v === 'false' || v === 0 || v === 1 || v === '0' || v === '1')) {
    return 'boolean';
  }
  const numericCount = values.filter((v: unknown) => typeof v === 'number' || !Number.isNaN(Number(v))).length;
  if (numericCount > values.length * 0.8) return 'numeric';
  const dateCount = values.filter((v: unknown) => v instanceof Date || !Number.isNaN(Date.parse(String(v)))).length;
  if (dateCount > values.length * 0.8) return 'datetime';
  const uniqueCount = new Set(values).size;
  if (uniqueCount < values.length * 0.1 && uniqueCount > 1) return 'categorical';
  return 'categorical';
}

function inferDataType(values: unknown[]): string {
  if (values.length === 0) return 'unknown';
  if (values.every((v: unknown) => typeof v === 'number' || !Number.isNaN(Number(String(v))))) return 'number';
  if (values.every((v: unknown) => typeof v === 'boolean' || v === 'true' || v === 'false')) return 'boolean';
  if (values.every((v: unknown) => v instanceof Date || !Number.isNaN(Date.parse(String(v))))) return 'datetime';
  return 'string';
}

function generateNumericStats(values: unknown[]): NumericStats {
  const numericValues = values.map((v: unknown) => (typeof v === 'number' ? v : Number(v))).filter((v: unknown) => !Number.isNaN(v));
  if (!numericValues.length) {
    return {
      min: 0,
      max: 0,
      mean: 0,
      median: 0,
      std: 0,
      range: 0,
      variance: 0,
    };
  }
  const sorted = [...numericValues].sort((a, b) => a - b);
  const n = sorted.length;
  const mean = numericValues.reduce((sum: number, val: number) => sum + val, 0) / n;
  const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
  const min = sorted[0];
  const max = sorted[n - 1];
  const range = max - min;
  const variance = numericValues.reduce((sum: number, val: number) => sum + (val - mean) ** 2, 0) / n;
  const std = Math.sqrt(variance);
  const q1 = sorted[Math.floor(n * 0.25)];
  const q3 = sorted[Math.floor(n * 0.75)];
  const iqr = q3 - q1;
  const skewness = n > 2 ? numericValues.reduce((sum: number, val: number) => sum + ((val - mean) / std) ** 3, 0) / n : 0;
  const kurtosis = n > 3 ? numericValues.reduce((sum: number, val: number) => sum + ((val - mean) / std) ** 4, 0) / n - 3 : 0;
  return {
    min: Math.round(min * 100) / 100,
    max: Math.round(max * 100) / 100,
    mean: Math.round(mean * 100) / 100,
    median: Math.round(median * 100) / 100,
    std: Math.round(std * 100) / 100,
    variance: Math.round(variance * 100) / 100,
    range: Math.round(range * 100) / 100,
    q1,
    q3,
    iqr,
    skewness: Math.round(skewness * 100) / 100,
    kurtosis: Math.round(kurtosis * 100) / 100,
  };
}

function generateCategoricalStats(values: unknown[]): CategoricalStats {
  const stringValues = values.map((v: unknown) => String(v));
  if (stringValues.length === 0) {
    return {
      uniqueCount: 0,
      mostFrequent: '',
      mostFrequentCount: 0,
      leastFrequent: '',
      leastFrequentCount: 0,
    };
  }
  const valueCounts: Record<string, number> = {};
  stringValues.forEach((value: string) => {
    valueCounts[value] = (valueCounts[value] || 0) + 1;
  });
  const sorted = Object.entries(valueCounts).sort((a, b) => b[1] - a[1]);
  const uniqueCount = sorted.length;
  const [mostFrequent, mostFrequentCount] = sorted[0];
  const [leastFrequent, leastFrequentCount] = sorted[sorted.length - 1];
  return {
    uniqueCount,
    mostFrequent,
    mostFrequentCount,
    leastFrequent,
    leastFrequentCount,
    topCategories: Object.fromEntries(sorted.slice(0, 10)),
  };
}

function generateDateTimeStats(values: unknown[]): DateTimeStats {
  const dates = values
    .map((v: unknown) => (v instanceof Date ? v : new Date(String(v))))
    .filter((d: Date) => !Number.isNaN(d.getTime()));
  if (!dates.length) {
    return {
      earliest: '',
      latest: '',
      spanDays: 0,
    };
  }
  const sortedDates = dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
  const earliest = sortedDates[0];
  const latest = sortedDates[sortedDates.length - 1];
  const spanDays = Math.floor((latest.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));
  const weekdays: Record<string, number> = {};
  const hours: Record<string, number> = {};
  dates.forEach((date: Date) => {
    const weekday = date.toLocaleDateString('en', { weekday: 'long' });
    const hour = date.getHours().toString();
    weekdays[weekday] = (weekdays[weekday] || 0) + 1;
    hours[hour] = (hours[hour] || 0) + 1;
  });
  return {
    earliest: earliest.toISOString(),
    latest: latest.toISOString(),
    spanDays,
    patterns: {
      yearRange: `${earliest.getFullYear()}-${latest.getFullYear()}`,
      monthsPresent: Array.from(new Set(dates.map((d: Date) => d.getMonth() + 1))),
      weekdaysDistribution: weekdays,
      hoursDistribution: hours,
    },
  };
}

function generateBooleanStats(values: unknown[]): BooleanStats {
  const booleanValues = values
    .map((v: unknown) => {
      if (typeof v === 'boolean') return v;
      if (v === 'true' || v === 1 || v === '1') return true;
      if (v === 'false' || v === 0 || v === '0') return false;
      return null;
    })
    .filter((v): v is boolean => v !== null);
  const trueCount = booleanValues.filter((v: boolean) => v).length;
  const falseCount = booleanValues.filter((v: boolean) => !v).length;
  const total = trueCount + falseCount;
  return {
    trueCount,
    falseCount,
    truePercentage: total ? Math.round((trueCount / total) * 10000) / 100 : 0,
    falsePercentage: total ? Math.round((falseCount / total) * 10000) / 100 : 0,
  } as BooleanStats;
}



// =============================================================================
// BUSINESS INSIGHTS AND RECOMMENDATIONS
// =============================================================================

function generateBusinessInsights(data: DataRow[]): BusinessInsights {
  if (!data || data.length === 0) {
    return {
      dataReadiness: 'No data available to generate insights.',
      analysisOpportunities: [],
      businessValueIndicators: [],
      recommendedNextSteps: ['Load a dataset to begin analysis.'],
    };
  }

  const columns = Object.keys(data[0] || {});
  let totalMissing = 0;
  columns.forEach((col: string) => {
    const missing = data.filter((row: DataRow) => isMissing(row[col])).length;
    totalMissing += missing;
  });
  const completenessPercentage =
    data.length * columns.length > 0
      ? ((data.length * columns.length - totalMissing) / (data.length * columns.length)) * 100
      : 0;
  const healthScore = completenessPercentage; // simplified

  const dataReadiness = `Data is ${healthScore.toFixed(
    1
  )}% complete, with ${data.length} rows and ${columns.length} columns. Quality appears ${
    healthScore > 90 ? 'high' : 'moderate'
  }. Ready for deeper analysis.`;

  const typeDistribution = { numeric: 0, categorical: 0, datetime: 0, boolean: 0 };
  columns.forEach((col: string) => {
    const colType = categorizeColumnType(data, col);
    typeDistribution[colType]++;
  });

  const analysisOpportunities: string[] = [];
  if (typeDistribution.numeric > 1) analysisOpportunities.push('Perform correlation analysis on numeric columns.');
  if (typeDistribution.categorical > 0) analysisOpportunities.push('Conduct segmentation based on categorical data.');
  if (typeDistribution.datetime > 0) analysisOpportunities.push('Analyze trends and seasonality with time-series analysis.');

  const businessValueIndicators = identifyBusinessMetrics(columns);

  const recommendedNextSteps = [
    'Run correlation analysis to uncover relationships.',
    'Create visualizations for key metrics.',
    'Build a predictive model if a target variable is identified.',
  ];

  if (healthScore < 80) {
    recommendedNextSteps.unshift('Address data quality issues, particularly missing values.');
  }

  return {
    dataReadiness,
    analysisOpportunities,
    businessValueIndicators,
    recommendedNextSteps,
  };
}

function generateProfileRecommendations(data: DataRow[]): string[] {
  if (!data || data.length === 0) return ['📥 Load data to begin analysis'];
  const recommendations: string[] = [];
  const columns = Object.keys(data[0]);

  if (data.length < 100) {
    recommendations.push(`📈 Consider collecting more data for robust statistical analysis (current: ${data.length.toLocaleString()} records)`);
  } else if (data.length > 100000) {
    recommendations.push(`🔧 Consider data sampling for faster exploratory analysis (current: ${data.length.toLocaleString()} records)`);
  }
  if (columns.length > 50) {
    recommendations.push('🎯 Focus analysis on key variables to avoid curse of dimensionality');
  }
  const numericColumnsCount = columns.filter((col: string) => categorizeColumnType(data, col) === 'numeric').length;
  if (numericColumnsCount >= 2) {
    recommendations.push('📊 Run correlation analysis to identify strong relationships between metrics');
  }
  const businessMetrics = identifyBusinessMetrics(columns);
  if (businessMetrics.length > 0) {
    recommendations.push(`💼 Create executive dashboards focusing on: ${businessMetrics.slice(0, 3).join(', ')}`);
  }
  return recommendations;
}

function identifyBusinessMetrics(columns: string[]): string[] {
  const businessKeywords: Record<string, string[]> = {
    revenue: ['revenue', 'sales', 'income', 'profit', 'earnings'],
    customer: ['customer', 'client', 'user', 'account'],
    marketing: ['marketing', 'campaign', 'conversion', 'ctr', 'cpc', 'cpm'],
    operations: ['cost', 'expense', 'efficiency', 'utilization'],
    growth: ['growth', 'increase', 'expansion', 'acquisition'],
    performance: ['performance', 'kpi', 'metric', 'score', 'rating'],
  };
  const identified = new Set<string>();
  columns.forEach((col: string) => {
    const lowerCol = col.toLowerCase();
    Object.values(businessKeywords).forEach((keywords: string[]) => {
      if (keywords.some((keyword: string) => lowerCol.includes(keyword))) {
        identified.add(col);
      }
    });
  });
  return Array.from(identified);
}

// =============================================================================
// ENHANCED VISUALIZATION INSIGHTS
// =============================================================================

function generateVisualizationInsights(chartType: string, chartData: ChartDataPoint[], xColumn: string, yColumn: string): string[] {
  const insights: string[] = [];
  if (!chartData.length) return ['No data available for analysis'];
  insights.push(`📊 Analyzing ${chartData.length} data points`);
  if (chartType === 'line' || chartType === 'bar') {
    const yValues = chartData.map((d: ChartDataPoint) => Number(d[yColumn])).filter((v: number) => !Number.isNaN(v));
    if (yValues.length > 1) {
      const trend = calculateTrend(yValues);
      if (trend > 0.1) insights.push(`📈 Strong upward trend detected in ${yColumn} (+${(trend * 100).toFixed(1)}% average growth)`);
      else if (trend < -0.1) insights.push(`📉 Declining trend in ${yColumn} (${(trend * 100).toFixed(1)}% average decline)`);
      else insights.push(`➡️ ${yColumn} shows relatively stable pattern`);

      const volatility = calculateVolatility(yValues);
      if (volatility > 0.3) insights.push(`⚡ High volatility detected - consider investigating underlying factors`);

      const maxValue = Math.max(...yValues);
      const minValue = Math.min(...yValues);
      const range = maxValue - minValue;
      insights.push(`📏 Value range: ${minValue.toLocaleString()} to ${maxValue.toLocaleString()} (${(range / minValue * 100).toFixed(1)}% variation)`);
    }
  }
  if (chartType === 'scatter') {
    const xValues = chartData.map(d => Number(d[xColumn])).filter(v => !Number.isNaN(v));
    const yValues = chartData.map(d => Number(d[yColumn])).filter(v => !Number.isNaN(v));
    if (xValues.length === yValues.length && xValues.length > 2) {
      const correlation = calculateSimpleCorrelation(xValues, yValues);
      if (Math.abs(correlation) > 0.7)
        insights.push(`🔗 Strong ${correlation > 0 ? 'positive' : 'negative'} correlation (${correlation.toFixed(2)}) between ${xColumn} and ${yColumn}`);
      else if (Math.abs(correlation) > 0.3)
        insights.push(`📊 Moderate ${correlation > 0 ? 'positive' : 'negative'} correlation (${correlation.toFixed(2)}) detected`);
      else insights.push(`🔄 Weak correlation (${correlation.toFixed(2)}) - variables appear largely independent`);
    }
  }
  return insights;
}

function generateVisualizationRecommendations(chartType: string, data: DataRow[], numericColumnCount: number): string[] {
  const recommendations: string[] = [];
  switch (chartType) {
    case 'line':
      recommendations.push('📈 Consider adding trend lines or moving averages for clearer patterns');
      if (data.length > 100) recommendations.push('🔍 Apply data smoothing for large datasets to reduce noise');
      break;
    case 'bar':
      recommendations.push('📊 Sort categories by value for better visual impact');
      if (data.length > 20) recommendations.push('🎯 Focus on top/bottom performers to highlight key insights');
      break;
    case 'scatter':
      recommendations.push('🎨 Use color coding to add a third dimension (e.g., categories, time periods)');
      if (numericColumnCount > 2) recommendations.push('📊 Consider bubble charts to visualize additional numeric dimensions');
      break;
    case 'pie':
      recommendations.push('🍰 Limit to 5-7 categories for optimal readability');
      recommendations.push('📱 Consider donut charts for modern, mobile-friendly design');
      break;
    case 'heatmap':
      recommendations.push('🌡️ Use diverging color scales for data with positive/negative values');
      recommendations.push('🔍 Add clustering to group similar patterns together');
      break;
  }
  if (numericColumnCount >= 3) recommendations.push('🎛️ Create interactive dashboards with filters and drill-down capabilities');
  recommendations.push('📋 Add contextual annotations to highlight key business insights');
  recommendations.push('📊 Consider creating multiple views (daily, weekly, monthly) for time-based data');
  return recommendations;
}

// =============================================================================
// HELPER CALCULATION FUNCTIONS
// =============================================================================

function calculateTrend(values: number[]): number {
  if (values.length < 2) return 0;
  const n = values.length;
  const xSum = (n * (n - 1)) / 2;
  const ySum = values.reduce((sum, v) => sum + v, 0);
  const xySum = values.reduce((sum, v, i) => sum + v * i, 0);
  const x2Sum = (n * (n - 1) * (2 * n - 1)) / 6;
  const slope = (n * xySum - xSum * ySum) / (n * x2Sum - xSum * xSum);
  const mean = ySum / n;
  return slope / mean;
}

function calculateVolatility(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const variance = values.reduce((sum, v) => sum + (v - mean) ** 2, 0) / values.length;
  const stdDev = Math.sqrt(variance);
  return stdDev / mean;
}

function calculateSimpleCorrelation(xValues: number[], yValues: number[]): number {
  if (xValues.length !== yValues.length || xValues.length < 2) return 0;
  const n = xValues.length;
  const xMean = xValues.reduce((sum, v) => sum + v, 0) / n;
  const yMean = yValues.reduce((sum, v) => sum + v, 0) / n;
  let numerator = 0;
  let xSumSq = 0;
  let ySumSq = 0;
  for (let i = 0; i < n; i++) {
    const xDiff = xValues[i] - xMean;
    const yDiff = yValues[i] - yMean;
    numerator += xDiff * yDiff;
    xSumSq += xDiff ** 2;
    ySumSq += yDiff ** 2;
  }
  const denominator = Math.sqrt(xSumSq * ySumSq);
  return denominator === 0 ? 0 : numerator / denominator;
}

function detectDataPatterns(data: DataRow[]): DataPatterns {
  if (!data || data.length === 0) {
    return {
      columnNamePatterns: { businessDomains: {}, namingConventions: {}, totalColumns: 0 },
      valuePatterns: { potentialIdColumns: [], contactInfoColumns: [] },
      structuralPatterns: { columnCount: 0, rowCount: 0, density: 0, shapeCategory: 'balanced' },
    };
  }

  const columns = Object.keys(data[0] || {});
  const rowCount = data.length;
  const columnCount = columns.length;

  // Simplified structural patterns
  const density = 1; // Assuming no major missing blocks
  const shapeCategory = columnCount > rowCount ? 'wide' : columnCount < rowCount / 2 ? 'tall' : 'balanced';

  // Simplified column name patterns
  const businessDomains: Record<string, string[]> = {};
  columns.forEach(col => {
    const keywords: Record<string, string[]> = {
      finance: ['sale', 'revenue', 'cost', 'price', 'profit', 'income', 'earnings'],
      customer: ['customer', 'user', 'client', 'account'],
      marketing: ['marketing', 'campaign', 'conversion', 'ctr', 'cpc', 'cpm'],
      operations: ['cost', 'expense', 'efficiency', 'utilization'],
      growth: ['growth', 'increase', 'expansion', 'acquisition'],
      performance: ['performance', 'kpi', 'metric', 'score', 'rating'],
    };
    for (const domain in keywords) {
      if (keywords[domain].some(k => col.toLowerCase().includes(k))) {
        if (!businessDomains[domain]) businessDomains[domain] = [];
        businessDomains[domain].push(col);
      }
    }
  });

  return {
    columnNamePatterns: { businessDomains, namingConventions: {}, totalColumns: columnCount },
    valuePatterns: { potentialIdColumns: [], contactInfoColumns: [] }, // Placeholder
    structuralPatterns: { rowCount, columnCount, density, shapeCategory },
  };
}

function findStrongCorrelations(
  matrix: Record<string, Record<string, number>>,
  columns: string[]
): CorrelationPair[] {
  const pairs: CorrelationPair[] = [];
  for (let i = 0; i < columns.length; i++) {
    for (let j = i + 1; j < columns.length; j++) {
      const correlation = matrix[columns[i]][columns[j]];
      if (Math.abs(correlation) >= 0.7) {
        pairs.push({ column1: columns[i], column2: columns[j], correlation, strength: 'strong' });
      } else if (Math.abs(correlation) >= 0.4) {
        pairs.push({ column1: columns[i], column2: columns[j], correlation, strength: 'moderate' });
      }
    }
  }
  return pairs.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
}



function calculateAverageCorrelation(matrix: Record<string, Record<string, number>>, columns: string[]): number {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < columns.length; i++) {
    for (let j = i + 1; j < columns.length; j++) {
      sum += Math.abs(matrix[columns[i]][columns[j]]);
      count++;
    }
  }
  return count > 0 ? sum / count : 0;
}

function generateCorrelationInsights(matrix: Record<string, Record<string, number>>, columns: string[]): string[] {
  const insights: string[] = [];
  const avgCorr = calculateAverageCorrelation(matrix, columns);
  insights.push(`Average correlation strength: ${avgCorr.toFixed(2)}`);
  return insights;
}



function generateBarChartData(data: DataRow[], xColumn: string, yColumn: string): ChartDataPoint[] {
  return data.map(row => ({ [xColumn]: row[xColumn], [yColumn]: row[yColumn] })) as ChartDataPoint[];
}

function generateLineChartData(data: DataRow[], xColumn: string, yColumn: string): ChartDataPoint[] {
  return data.map(row => ({ [xColumn]: row[xColumn], [yColumn]: row[yColumn] })) as ChartDataPoint[];
}

function generateScatterChartData(data: DataRow[], xColumn: string, yColumn: string): ChartDataPoint[] {
  return data.map(row => ({ [xColumn]: row[xColumn], [yColumn]: row[yColumn] })) as ChartDataPoint[];
}

function generatePieChartData(data: DataRow[], nameColumn: string): PieChartDataPoint[] {
  const counts: Record<string, number> = {};
  data.forEach(row => {
    const name = String(row[nameColumn]);
    counts[name] = (counts[name] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({
    name,
    value,
    percentage: Math.round((value / data.length) * 100 * 100) / 100
  }));
}

function generateHeatmapData(data: DataRow[], columns: string[]): HeatmapDataPoint[] {
  const result: HeatmapDataPoint[] = [];
  for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      const correlation = calculatePearsonCorrelation(data, columns[i], columns[j]);
      result.push({ x: columns[i], y: columns[j], value: correlation });
    }
  }
  return result;
}

// =============================================================================
// ENHANCED VISUALIZATION FUNCTIONS
// =============================================================================

/**
 * Prepare and validate visualization parameters.
 */
async function prepareVisualizationParamsEx(
  data: DataRow[],
  chartType: ChartType,
  xColumn: string,
  yColumn: string,
  groupBy: string,
  title: string
): Promise<VisualizationParams | { error: string; supported_types?: ChartType[]; suggestion?: string; available_columns?: string[] }> {
  
  // Supported chart types
  const supportedCharts: Record<ChartType, string> = {
    "bar": "Bar Chart",
    "line": "Line Chart", 
    "scatter": "Scatter Plot",
    "histogram": "Histogram",
    "box": "Box Plot",
    "heatmap": "Heatmap",
    "pie": "Pie Chart",
    "violin": "Violin Plot",
    "pair": "Pair Plot",
    "dashboard": "Dashboard"
  };
  
  if (!(chartType in supportedCharts)) {
    return {
      error: `Unsupported chart type: ${chartType}`,
      supported_types: Object.keys(supportedCharts) as ChartType[],
      suggestion: "Choose from supported chart types"
    };
  }
  
  const columns = Object.keys(data[0] || {});
  
  const params: VisualizationParams = {
    chart_type: chartType,
    chart_name: supportedCharts[chartType],
    title: title || `${supportedCharts[chartType]} - ${chartType.charAt(0).toUpperCase() + chartType.slice(1)}`,
    columns: {
      x: xColumn,
      y: yColumn,
      group_by: groupBy
    }
  };
  
  // Auto-select columns if not specified
  if (!xColumn && chartType !== "dashboard") {
    params.columns.x = await autoSelectXColumnEx(data, chartType);
  }
  
  if (!yColumn && ["bar", "line", "scatter"].includes(chartType)) {
    params.columns.y = await autoSelectYColumnEx(data, chartType);
  }
  
  // Validate columns exist
  for (const [colType, colName] of Object.entries(params.columns)) {
    if (colName && !columns.includes(colName)) {
      return {
        error: `Column '${colName}' not found in dataset`,
        available_columns: columns,
        suggestion: `Choose valid column for ${colType}`
      };
    }
  }
  
  // Chart-specific validations
  const validationResult = await validateChartRequirementsEx(data, params);
  if ("error" in validationResult) {
    return validationResult;
  }
  
  return params;
}

/**
 * Auto-select appropriate X column based on chart type.
 */
async function autoSelectXColumnEx(data: DataRow[], chartType: ChartType): Promise<string> {
  const columns = Object.keys(data[0] || {});
  const numericColumns = getNumericColumns(data, columns);
  const categoricalColumns = columns.filter(col => !numericColumns.includes(col));
  
  switch (chartType) {
    case "bar":
    case "pie":
      // Prefer categorical columns
      if (categoricalColumns.length > 0) {
        return categoricalColumns[0];
      }
      break;
    
    case "line":
    case "scatter":
      // Prefer numeric columns
      if (numericColumns.length > 0) {
        return numericColumns[0];
      }
      break;
    
    case "histogram":
      // Prefer numeric columns
      if (numericColumns.length > 0) {
        return numericColumns[0];
      }
      break;
  }
  
  // Default: first column
  return columns[0] || "";
}

/**
 * Auto-select appropriate Y column based on chart type.
 */
async function autoSelectYColumnEx(data: DataRow[], chartType: ChartType): Promise<string> {
  // Prefer numeric columns for Y axis
  const columns = Object.keys(data[0] || {});
  const numericColumns = getNumericColumns(data, columns);
  
  if (numericColumns.length > 0) {
    return numericColumns[0];
  }
  
  // Fallback to second column if exists
  return columns[1] || "";
}

/**
 * Validate chart-specific requirements.
 */
async function validateChartRequirementsEx(
  data: DataRow[],
  params: VisualizationParams
): Promise<{ status: string } | { error: string; suggestion?: string }> {
  
  const { chart_type: chartType, columns } = params;
  const { x: xCol, y: yCol } = columns;
  
  const allColumns = Object.keys(data[0] || {});
  const numericColumns = getNumericColumns(data, allColumns);
  
  switch (chartType) {
    case "scatter":
      if (!xCol || !yCol) {
        return { error: "Scatter plot requires both X and Y columns" };
      }
      
      // Both should be numeric for meaningful scatter plot
      if (!numericColumns.includes(xCol) || !numericColumns.includes(yCol)) {
        return {
          error: "Scatter plot works best with numeric columns",
          suggestion: "Consider using different chart type for non-numeric data"
        };
      }
      break;
    
    case "line":
      if (!xCol || !yCol) {
        return { error: "Line chart requires both X and Y columns" };
      }
      break;
    
    case "heatmap":
      if (numericColumns.length < 2) {
        return { error: "Heatmap requires at least 2 numeric columns" };
      }
      break;
    
    case "pie":
      if (!xCol) {
        return { error: "Pie chart requires a categorical column" };
      }
      
      // Check if column has reasonable number of categories
      const uniqueValues = new Set(data.map(row => row[xCol])).size;
      if (uniqueValues > 10) {
        return {
          error: `Column '${xCol}' has ${uniqueValues} unique values`,
          suggestion: "Pie charts work best with 10 or fewer categories"
        };
      }
      break;
  }
  
  return { status: "valid" };
}

/**
 * Generate the actual visualization.
 */
async function generateVisualizationEx(
  data: DataRow[],
  params: VisualizationParams
): Promise<EnhancedVisualizationResult> {
  
  const { chart_type: chartType } = params;
  
  try {
    switch (chartType) {
      case "bar":
        return await createBarChartEx(data, params);
      case "line":
        return await createLineChartEx(data, params);
      case "scatter":
        return await createScatterPlotEx(data, params);
      case "histogram":
        return await createHistogramEx(data, params);
      case "box":
        return await createBoxPlotEx(data, params);
      case "heatmap":
        return await createHeatmapEx(data, params);
      case "pie":
        return await createPieChartEx(data, params);
      case "violin":
        return await createViolinPlotEx(data, params);
      case "pair":
        return await createPairPlotEx(data, params);
      case "dashboard":
        return await createDashboardEx(data, params);
      default:
        return { 
          chart_type: chartType, 
          data_summary: {}, 
          error: `Chart type ${chartType} not implemented` 
        };
    }
  } catch (error) {
    return { 
      chart_type: chartType, 
      data_summary: {}, 
      error: `Failed to generate ${chartType}: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}

/**
 * Create bar chart.
 */
async function createBarChartEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { columns, title } = params;
  const { x: xCol, y: yCol, group_by: groupBy } = columns;
  
  // Process data for bar chart
  const chartData = await processDataForBarChartEx(data, xCol, yCol, groupBy);
  
  return {
    chart_image: await generateMockChartImageEx("bar", title),
    chart_type: "bar",
    data_summary: {
      x_column: xCol,
      y_column: yCol,
      categories: chartData.categories,
      total_records: data.length,
      chart_data: chartData.summary
    }
  };
}

/**
 * Create line chart.
 */
async function createLineChartEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { columns, title } = params;
  const { x: xCol, y: yCol } = columns;
  
  const trendData = await calculateTrendEx(data, xCol, yCol);
  
  return {
    chart_image: await generateMockChartImageEx("line", title),
    chart_type: "line",
    data_summary: {
      x_column: xCol,
      y_column: yCol,
      data_points: data.length,
      trend: trendData.direction,
      slope: trendData.slope
    }
  };
}

/**
 * Create scatter plot.
 */
async function createScatterPlotEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { columns, title } = params;
  const { x: xCol, y: yCol } = columns;
  
  // Calculate correlation if both numeric
  let correlation: number | null = null;
  const numericColumns = getNumericColumns(data);
  if (numericColumns.includes(xCol) && numericColumns.includes(yCol)) {
    correlation = calculatePearsonCorrelation(data, xCol, yCol);
  }
  
  return {
    chart_image: await generateMockChartImageEx("scatter", title),
    chart_type: "scatter",
    data_summary: {
      x_column: xCol,
      y_column: yCol,
      data_points: data.length,
      correlation: correlation ? Math.round(correlation * 1000) / 1000 : null
    }
  };
}

/**
 * Create histogram.
 */
async function createHistogramEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { columns, title } = params;
  const { x: xCol } = columns;
  
  const stats = await calculateStatisticsEx(data, xCol);
  
  return {
    chart_image: await generateMockChartImageEx("histogram", title),
    chart_type: "histogram",
    data_summary: {
      column: xCol,
      mean: stats.mean,
      median: stats.median,
      std: stats.std,
      data_points: stats.count,
      skewness: stats.skewness
    }
  };
}

/**
 * Create box plot.
 */
async function createBoxPlotEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { columns, title } = params;
  const { x: xCol, y: yCol } = columns;
  
  return {
    chart_image: await generateMockChartImageEx("box", title),
    chart_type: "box",
    data_summary: {
      columns_analyzed: [xCol, yCol].filter(Boolean),
      outliers_detected: "Check visualization for outliers"
    }
  };
}

/**
 * Create correlation heatmap.
 */
async function createHeatmapEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { title } = params;
  
  // Select numeric columns
  const allColumns = Object.keys(data[0] || {});
  const numericColumns = getNumericColumns(data, allColumns);
  
  if (numericColumns.length < 2) {
    return { 
      chart_type: "heatmap", 
      data_summary: {}, 
      error: "Need at least 2 numeric columns for heatmap" 
    };
  }
  
  // Calculate correlation matrix
  const correlationMatrix = calculateCorrelationMatrix(data, numericColumns);
  const strongCorrelations = findStrongCorrelationsEx(correlationMatrix);
  
  return {
    chart_image: await generateMockChartImageEx("heatmap", title),
    chart_type: "heatmap",
    data_summary: {
      variables_analyzed: numericColumns.length,
      strong_correlations: strongCorrelations.slice(0, 5), // Top 5
      average_correlation: calculateAverageCorrelation(correlationMatrix, numericColumns)
    }
  };
}

/**
 * Create pie chart.
 */
async function createPieChartEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { columns, title } = params;
  const { x: xCol } = columns;
  
  const categoryData = await calculateCategoryDistributionEx(data, xCol);
  
  return {
    chart_image: await generateMockChartImageEx("pie", title),
    chart_type: "pie",
    data_summary: {
      column: xCol,
      categories_shown: categoryData.length,
      largest_category: categoryData[0],
      total_records: data.length
    }
  };
}

/**
 * Create violin plot.
 */
async function createViolinPlotEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { columns, title } = params;
  const { x: xCol, y: yCol } = columns;
  
  return {
    chart_image: await generateMockChartImageEx("violin", title),
    chart_type: "violin",
    data_summary: {
      columns_analyzed: [xCol, yCol].filter(Boolean),
      distribution_info: "Check visualization for distribution shapes"
    }
  };
}

/**
 * Create pair plot for numeric columns.
 */
async function createPairPlotEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { title } = params;
  
  // Select numeric columns (limit to first 5 for readability)
  const allColumns = Object.keys(data[0] || {});
  const numericColumns = getNumericColumns(data, allColumns).slice(0, 5);
  
  if (numericColumns.length < 2) {
    return { 
      chart_type: "pair", 
      data_summary: {}, 
      error: "Need at least 2 numeric columns for pair plot" 
    };
  }
  
  return {
    chart_image: await generateMockChartImageEx("pair", title),
    chart_type: "pair",
    data_summary: {
      variables_analyzed: numericColumns.length,
      columns: numericColumns,
      sample_size: Math.min(data.length, 1000) // Sample for performance
    }
  };
}

/**
 * Create a comprehensive dashboard.
 */
async function createDashboardEx(data: DataRow[], params: VisualizationParams): Promise<EnhancedVisualizationResult> {
  const { title } = params;
  
  const allColumns = Object.keys(data[0] || {});
  const numericColumns = getNumericColumns(data, allColumns);
  const categoricalColumns = allColumns.filter(col => !numericColumns.includes(col));
  
  // Calculate missing data
  const missingData = await calculateMissingDataEx(data);
  
  // Calculate data quality score
  const totalCells = data.length * allColumns.length;
  const missingCells = Object.values(missingData).reduce((sum, count) => sum + count, 0);
  const dataQualityScore = Math.round(((totalCells - missingCells) / totalCells) * 100 * 10) / 10;
  
  return {
    chart_image: await generateMockChartImageEx("dashboard", title),
    chart_type: "dashboard",
    data_summary: {
      total_rows: data.length,
      total_columns: allColumns.length,
      missing_values: missingCells,
      data_quality_score: dataQualityScore,
      numeric_columns: numericColumns.length,
      categorical_columns: categoricalColumns.length
    }
  };
}

/**
 * Generate mock chart image (base64).
 */
async function generateMockChartImageEx(chartType: ChartType, title: string): Promise<string> {
  // In real implementation, this would generate actual chart using a library like Chart.js, D3, or similar
  // For now, return a placeholder base64 image
  const mockImage = `data:image/svg+xml;base64,${btoa(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f8f9fa"/>
      <text x="200" y="50" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">${title}</text>
      <text x="200" y="150" text-anchor="middle" font-family="Arial" font-size="14" fill="#666">${chartType.toUpperCase()} CHART</text>
      <text x="200" y="170" text-anchor="middle" font-family="Arial" font-size="12" fill="#999">Chart visualization would appear here</text>
    </svg>
  `)}`;
  
  return mockImage;
}

/**
 * Process data for bar chart.
 */
async function processDataForBarChartEx(
  data: DataRow[],
  xCol: string,
  yCol: string,
  groupBy: string
): Promise<{ categories: number; summary: Record<string, any> }> {
  
  const categories = new Set(data.map(row => row[xCol])).size;
  
  let summary: Record<string, any> = {};
  
  if (yCol) {
    // Grouped analysis
    const groupedData: Record<string, number> = {};
    data.forEach(row => {
      const key = String(row[xCol]);
      const value = convertToNumber(row[yCol]) || 0;
      groupedData[key] = (groupedData[key] || 0) + value;
    });
    
    summary = {
      aggregation_type: "sum",
      top_category: Object.keys(groupedData).reduce((a, b) => 
        groupedData[a] > groupedData[b] ? a : b
      ),
      category_count: Object.keys(groupedData).length
    };
  } else {
    // Simple count
    const counts: Record<string, number> = {};
    data.forEach(row => {
      const key = String(row[xCol]);
      counts[key] = (counts[key] || 0) + 1;
    });
    
    summary = {
      aggregation_type: "count",
      most_frequent: Object.keys(counts).reduce((a, b) => 
        counts[a] > counts[b] ? a : b
      ),
      frequency: Math.max(...Object.values(counts))
    };
  }
  
  return { categories, summary };
}

/**
 * Calculate trend direction.
 */
async function calculateTrendEx(data: DataRow[], xCol: string, yCol: string): Promise<{ direction: string; slope?: number }> {
  try {
    const numericColumns = getNumericColumns(data);
    if (!numericColumns.includes(yCol) || data.length < 2) {
      return { direction: "insufficient_data" };
    }
    
    // Extract numeric values
    const xValues = data.map(row => convertToNumber(row[xCol])).filter(v => v !== null) as number[];
    const yValues = data.map(row => convertToNumber(row[yCol])).filter(v => v !== null) as number[];
    
    if (xValues.length < 2 || yValues.length < 2) {
      return { direction: "insufficient_data" };
    }
    
    // Simple linear regression slope calculation
    const n = Math.min(xValues.length, yValues.length);
    const xMean = xValues.slice(0, n).reduce((a, b) => a + b, 0) / n;
    const yMean = yValues.slice(0, n).reduce((a, b) => a + b, 0) / n;
    
    let numerator = 0;
    let denominator = 0;
    
    for (let i = 0; i < n; i++) {
      const xVal = xValues[i];
      const yVal = yValues[i];
      numerator += (xVal - xMean) * (yVal - yMean);
      denominator += (xVal - xMean) ** 2;
    }
    
    if (denominator === 0) {
      return { direction: "stable" };
    }
    
    const slope = numerator / denominator;
    
    let direction: string;
    if (slope > 0.1) {
      direction = "increasing";
    } else if (slope < -0.1) {
      direction = "decreasing";
    } else {
      direction = "stable";
    }
    
    return { direction, slope };
    
  } catch {
    return { direction: "unknown" };
  }
}

/**
 * Calculate statistical summary for a numeric column.
 */
async function calculateStatisticsEx(data: DataRow[], column: string): Promise<StatisticalSummaryEx> {
  const values = data.map(row => convertToNumber(row[column])).filter(v => v !== null) as number[];
  
  if (values.length === 0) {
    return { mean: 0, median: 0, std: 0, min: 0, max: 0, count: 0 };
  }
  
  const sortedValues = [...values].sort((a, b) => a - b);
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const median = sortedValues.length % 2 === 0
    ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
    : sortedValues[Math.floor(sortedValues.length / 2)];
  
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  const std = Math.sqrt(variance);
  
  // Calculate skewness
  const skewness = values.reduce((a, b) => a + ((b - mean) / std) ** 3, 0) / values.length;
  
  return {
    mean: Math.round(mean * 1000) / 1000,
    median: Math.round(median * 1000) / 1000,
    std: Math.round(std * 1000) / 1000,
    min: Math.min(...values),
    max: Math.max(...values),
    count: values.length,
    skewness: Math.round(skewness * 1000) / 1000
  };
}

/**
 * Find strong correlations from correlation matrix.
 */
function findStrongCorrelationsEx(matrix: Record<string, Record<string, number>>): CorrelationDataEx[] {
  const correlations: CorrelationDataEx[] = [];
  const columns = Object.keys(matrix);
  
  for (let i = 0; i < columns.length; i++) {
    for (let j = i + 1; j < columns.length; j++) {
      const col1 = columns[i];
      const col2 = columns[j];
      const correlation = matrix[col1][col2];
      
      if (Math.abs(correlation) > 0.5) {
        correlations.push({
          var1: col1,
          var2: col2,
          correlation: Math.round(correlation * 1000) / 1000
        });
      }
    }
  }
  
  return correlations.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation));
}

/**
 * Calculate category distribution for categorical column.
 */
async function calculateCategoryDistributionEx(data: DataRow[], column: string): Promise<CategoryDataEx[]> {
  const counts: Record<string, number> = {};
  let total = 0;
  
  data.forEach(row => {
    const value = String(row[column] || 'Unknown');
    counts[value] = (counts[value] || 0) + 1;
    total++;
  });
  
  return Object.entries(counts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100 * 10) / 10
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 categories
}

/**
 * Calculate missing data for each column.
 */
async function calculateMissingDataEx(data: DataRow[]): Promise<Record<string, number>> {
  const missingData: Record<string, number> = {};
  const columns = Object.keys(data[0] || {});
  
  for (const column of columns) {
    missingData[column] = data.filter(row => 
      row[column] == null || row[column] === '' || row[column] === undefined
    ).length;
  }
  
  return missingData;
}

/**
 * Save visualization to file.
 */
async function saveVisualizationEx(
  vizResult: EnhancedVisualizationResult,
  outputPath: string
): Promise<{ saved: boolean; output_path?: string; file_size?: number; error?: string }> {
  
  try {
    // In real implementation, this would save the actual image file
    // For now, just simulate the save operation
    
    if (!vizResult.chart_image) {
      return { saved: false, error: "No chart image to save" };
    }
    
    const mockFileSize = 1024 * 50; // 50KB mock file size
    
    return {
      saved: true,
      output_path: outputPath,
      file_size: mockFileSize
    };
    
  } catch (error) {
    return { 
      saved: false, 
      error: `Failed to save: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}

/**
 * Generate insights from the visualization.
 */
async function generateVisualizationInsightsEx(data: DataRow[], params: VisualizationParams): Promise<string[]> {
  const insights: string[] = [];
  const { chart_type: chartType, columns } = params;
  const { x: xCol, y: yCol } = columns;
  
  // General insights
  if (["bar", "pie"].includes(chartType) && xCol) {
    const categoryData = await calculateCategoryDistributionEx(data, xCol);
    if (categoryData.length > 0) {
      const topCategory = categoryData[0];
      insights.push(`'${topCategory.name}' is the most common category, representing ${topCategory.percentage}% of the data`);
    }
  }
  
  if (chartType === "scatter" && xCol && yCol) {
    const numericColumns = getNumericColumns(data);
    if (numericColumns.includes(xCol) && numericColumns.includes(yCol)) {
      const correlation = calculatePearsonCorrelation(data, xCol, yCol);
      if (Math.abs(correlation) > 0.7) {
        const relationship = correlation > 0 ? "strong positive" : "strong negative";
        insights.push(`There's a ${relationship} correlation (${correlation.toFixed(3)}) between ${xCol} and ${yCol}`);
      } else if (Math.abs(correlation) > 0.3) {
        const relationship = correlation > 0 ? "moderate positive" : "moderate negative";
        insights.push(`There's a ${relationship} correlation (${correlation.toFixed(3)}) between ${xCol} and ${yCol}`);
      } else {
        insights.push(`There's a weak correlation (${correlation.toFixed(3)}) between ${xCol} and ${yCol}`);
      }
    }
  }
  
  if (chartType === "histogram" && xCol) {
    const numericColumns = getNumericColumns(data);
    if (numericColumns.includes(xCol)) {
      const stats = await calculateStatisticsEx(data, xCol);
      if (stats.skewness && Math.abs(stats.skewness) > 1) {
        const direction = stats.skewness > 0 ? "right" : "left";
        insights.push(`The distribution of ${xCol} is highly skewed to the ${direction}`);
      } else if (stats.skewness && Math.abs(stats.skewness) > 0.5) {
        const direction = stats.skewness > 0 ? "right" : "left";
        insights.push(`The distribution of ${xCol} is moderately skewed to the ${direction}`);
      } else {
        insights.push(`The distribution of ${xCol} is approximately normal`);
      }
    }
  }
  
  if (chartType === "line" && xCol && yCol) {
    const numericColumns = getNumericColumns(data);
    if (numericColumns.includes(yCol)) {
      const trendData = await calculateTrendEx(data, xCol, yCol);
      switch (trendData.direction) {
        case "increasing":
          insights.push(`${yCol} shows an increasing trend over ${xCol}`);
          break;
        case "decreasing":
          insights.push(`${yCol} shows a decreasing trend over ${xCol}`);
          break;
        case "stable":
          insights.push(`${yCol} remains relatively stable over ${xCol}`);
          break;
      }
    }
  }
  
  // Data quality insights
  const missingData = await calculateMissingDataEx(data);
  
  if (xCol && missingData[xCol] > 0) {
    const missingPct = Math.round((missingData[xCol] / data.length) * 100 * 10) / 10;
    insights.push(`${xCol} has ${missingPct}% missing values`);
  }
  
  if (yCol && missingData[yCol] > 0) {
    const missingPct = Math.round((missingData[yCol] / data.length) * 100 * 10) / 10;
    insights.push(`${yCol} has ${missingPct}% missing values`);
  }
  
  return insights;
}

/**
 * Generate recommendations for further analysis.
 */
async function generateVisualizationRecommendationsEx(data: DataRow[], params: VisualizationParams): Promise<string[]> {
  const recommendations: string[] = [];
  const { chart_type: chartType, columns } = params;
  const { x: xCol, y: yCol } = columns;
  
  // Chart-specific recommendations
  if (chartType === "scatter" && xCol && yCol) {
    const numericColumns = getNumericColumns(data);
    if (numericColumns.includes(xCol) && numericColumns.includes(yCol)) {
      const correlation = Math.abs(calculatePearsonCorrelation(data, xCol, yCol));
      if (correlation > 0.7) {
        recommendations.push("Strong correlation detected - consider predictive modeling");
      }
      recommendations.push("Use 'run-correlation' tool for detailed statistical analysis");
    }
  }
  
  if (["bar", "pie"].includes(chartType) && xCol) {
    const uniqueCount = new Set(data.map(row => row[xCol])).size;
    if (uniqueCount > 20) {
      recommendations.push("Many categories present - consider grouping similar categories");
    }
    recommendations.push("Use 'profile-dataset' tool to analyze categorical distributions");
  }
  
  if (chartType === "line") {
    recommendations.push("Consider trend analysis for time series forecasting");
    recommendations.push("Use 'trend-analysis' prompt for detailed temporal patterns");
  }
  
  if (chartType === "histogram" && xCol) {
    const numericColumns = getNumericColumns(data);
    if (numericColumns.includes(xCol)) {
      // Check for potential outliers using IQR method
      const values = data.map(row => convertToNumber(row[xCol])).filter(v => v !== null) as number[];
      if (values.length > 0) {
        const sortedValues = [...values].sort((a, b) => a - b);
        const q1 = sortedValues[Math.floor(sortedValues.length * 0.25)];
        const q3 = sortedValues[Math.floor(sortedValues.length * 0.75)];
        const iqr = q3 - q1;
        const outliers = values.filter(v => v < q1 - 1.5 * iqr || v > q3 + 1.5 * iqr);
        
        if (outliers.length > 0) {
          recommendations.push(`Outliers detected (${outliers.length} points) - consider investigation`);
        }
      }
    }
  }
  
  // General recommendations
  if (chartType !== "dashboard") {
    recommendations.push("Create dashboard view for comprehensive data overview");
  }
  
  const allColumns = Object.keys(data[0] || {});
  const numericColumns = getNumericColumns(data, allColumns);
  if (numericColumns.length > 1) {
    recommendations.push("Explore correlations with heatmap visualization");
  }
  
  // Check for datetime-like columns
  const potentialDateColumns = allColumns.filter(col => {
    const sampleValues = data.slice(0, 10).map(row => row[col]);
    return sampleValues.some(val => 
      val instanceof Date || 
      (typeof val === 'string' && !isNaN(Date.parse(val)))
    );
  });
  
  if (potentialDateColumns.length > 0) {
    recommendations.push("Create time-based visualizations for temporal analysis");
  }
  
  return recommendations.slice(0, 5); // Limit to top 5 recommendations
}

