/**
 * Profile Dataset Tool
 * TypeScript equivalent of Python profile_dataset.py
 * Comprehensive statistical profiling and data quality assessment
 */

import { 
  Dataset, 
  DataProfile, 
  DataOverview, 
  ColumnProfile, 
  DataQuality, 
  StatisticalSummary, 
  DataPatterns,
  BusinessInsights,
  QualityIssue,
  NumericStats,
  CategoricalStats,
  DateTimeStats,
  BooleanStats,
  ApiResponse 
} from '../types';
import { mean, median, standardDeviation, min, max, quantile } from 'simple-statistics';

export class DatasetProfiler {
  private static instance: DatasetProfiler;

  static getInstance(): DatasetProfiler {
    if (!DatasetProfiler.instance) {
      DatasetProfiler.instance = new DatasetProfiler();
    }
    return DatasetProfiler.instance;
  }

  async profileDataset(
    dataset: Dataset,
    detailed: boolean = true,
    sampleSize: number = 10000
  ): Promise<ApiResponse<DataProfile>> {
    try {
      if (!dataset || !dataset.data || dataset.data.length === 0) {
        return {
          success: false,
          error: 'Dataset is empty or invalid'
        };
      }

      // Sample data if too large
      let dataToProfile = dataset.data;
      let isSampled = false;
      
      if (dataset.data.length > sampleSize) {
        dataToProfile = this.sampleData(dataset.data, sampleSize);
        isSampled = true;
      }

      // Generate comprehensive profile
      const profile = await this.generateComprehensiveProfile(dataToProfile, detailed);

      // Add metadata
      const data = {
        overview: profile.overview as DataOverview,
        columns: profile.columns as ColumnProfile[],
        dataQuality: profile.dataQuality as DataQuality,
        statisticalSummary: profile.statisticalSummary as StatisticalSummary,
        patterns: profile.patterns as DataPatterns,
        businessInsights: profile.businessInsights as BusinessInsights,
        recommendations: profile.recommendations as string[]
      };

      return {
        success: true,
        data: data as DataProfile,
        datasetName: dataset.name,
        profilingTimestamp: new Date().toISOString(),
        originalShape: dataset.metadata.shape,
        profiledShape: [dataToProfile.length, Object.keys(dataToProfile[0] || {}).length],
        isSampled,
        sampleSize: isSampled ? sampleSize : dataset.data.length,
        ...profile
      };



    } catch (error) {
      return {
        success: false,
        error: `Failed to profile dataset: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  private sampleData(data: Record<string, unknown>[], sampleSize: number): Record<string, unknown>[] {
    const indices = new Set<number>();
    while (indices.size < sampleSize && indices.size < data.length) {
      indices.add(Math.floor(Math.random() * data.length));
    }
    return Array.from(indices).map(i => data[i]);
  }

  private async generateComprehensiveProfile(
    data: Record<string, unknown>[],
    detailed: boolean
  ): Promise<Partial<DataProfile>> {
    const overview = this.generateOverview(data);
    const columns = await this.profileColumns(data, detailed);
    const dataQuality = this.assessDataQuality(data);
    const statisticalSummary = this.generateStatisticalSummary(data);
    const patterns = this.detectPatterns(data);
    const businessInsights = this.generateBusinessInsights(data);
    const recommendations = this.generateProfilingRecommendations(data, dataQuality);

    return {
      overview,
      columns,
      dataQuality,
      statisticalSummary,
      patterns,
      businessInsights,
      recommendations
    };
  }

  private generateOverview(data: Record<string, unknown>[]): DataOverview {
    const columns = Object.keys(data[0] || {});
    const totalCells = data.length * columns.length;
    const missingCells = this.countMissingCells(data);
    
    // Estimate memory usage
    const jsonString = JSON.stringify(data);
    const memoryBytes = new Blob([jsonString]).size;

    // Categorize data types
    const numericCols = columns.filter(col => this.isNumericColumn(data, col)).length;
    const categoricalCols = columns.filter(col => this.isCategoricalColumn(data, col)).length;
    const datetimeCols = columns.filter(col => this.isDateTimeColumn(data, col)).length;
    const booleanCols = columns.filter(col => this.isBooleanColumn(data, col)).length;

    return {
      shape: {
        rows: data.length,
        columns: columns.length
      },
      memoryUsage: {
        bytes: memoryBytes,
        humanReadable: this.formatBytes(memoryBytes)
      },
      dataTypes: {
        numeric: numericCols,
        categorical: categoricalCols,
        datetime: datetimeCols,
        boolean: booleanCols
      },
      completeness: {
        totalCells,
        missingCells,
        completenessPercentage: Math.round(((totalCells - missingCells) / totalCells) * 100 * 100) / 100
      }
    };
  }

  private async profileColumns(data: Record<string, unknown>[], detailed: boolean): Promise<ColumnProfile[]> {
    const columns = Object.keys(data[0] || {});
    
    return Promise.all(columns.map(async (col) => {
      const values = data.map(row => row[col]);
      const nonNullValues = values.filter(v => v !== null && v !== undefined && v !== '');
      const nullCount = values.length - nonNullValues.length;

      const basicStats = {
        count: nonNullValues.length,
        missing: nullCount,
        missingPercentage: Math.round((nullCount / values.length) * 100 * 100) / 100,
        uniqueCount: new Set(nonNullValues).size,
        uniquenessPercentage: nonNullValues.length > 0 ? 
          Math.round((new Set(nonNullValues).size / nonNullValues.length) * 100 * 100) / 100 : 0
      };

      const profile: ColumnProfile = {
        name: col,
        dtype: this.inferColumnType(nonNullValues),
        basicStats,
        type: this.categorizeColumn(data, col) as 'numeric' | 'categorical' | 'datetime' | 'boolean'
      };

      // Type-specific analysis
      if (profile.type === 'numeric') {
        profile.statistics = await this.profileNumericColumn(nonNullValues, detailed);
      } else if (profile.type === 'categorical') {
        profile.categories = await this.profileCategoricalColumn(nonNullValues, detailed);
      } else if (profile.type === 'datetime') {
        profile.timeRange = await this.profileDateTimeColumn(nonNullValues, detailed);
      } else if (profile.type === 'boolean') {
        profile.distribution = await this.profileBooleanColumn(nonNullValues);
      }

      return profile;
    }));
  }

  private async profileNumericColumn(values: unknown[], detailed: boolean): Promise<NumericStats> { 
    const numericValues = values
      .map(v => typeof v === 'number' ? v : Number(v))
      .filter(v => !isNaN(v));

    if (numericValues.length === 0) {
      return {
        mean: 0,
        median: 0,
        std: 0,
        min: 0,
        max: 0,
        range: 0
      };
    }

    const stats: NumericStats = {
      mean: mean(numericValues),
      median: median(numericValues),
      std: standardDeviation(numericValues),
      min: min(numericValues),
      max: max(numericValues),
      range: max(numericValues) - min(numericValues)
    };

    if (detailed) {
      stats.q1 = quantile(numericValues, 0.25);
      stats.q3 = quantile(numericValues, 0.75);
      stats.iqr = stats.q3 - stats.q1;
      stats.skewness = this.calculateSkewness(numericValues);
      stats.kurtosis = this.calculateKurtosis(numericValues);
      stats.variance = this.calculateVariance(numericValues);

      // Distribution insights
      stats.distribution = {
        zerosCount: numericValues.filter(v => v === 0).length,
        zerosPercentage: Math.round((numericValues.filter(v => v === 0).length / numericValues.length) * 100 * 100) / 100,
        negativeCount: numericValues.filter(v => v < 0).length,
        negativePercentage: Math.round((numericValues.filter(v => v < 0).length / numericValues.length) * 100 * 100) / 100
      };

      // Outlier detection using IQR method
      const lowerBound = stats.q1 - 1.5 * stats.iqr;
      const upperBound = stats.q3 + 1.5 * stats.iqr;
      const outliers = numericValues.filter(v => v < lowerBound || v > upperBound);
      
      stats.outliers = {
        count: outliers.length,
        percentage: Math.round((outliers.length / numericValues.length) * 100 * 100) / 100,
        method: 'IQR (1.5 * IQR rule)'
      };
    }

    return stats;
  }

  private async profileCategoricalColumn(values: unknown[], detailed: boolean): Promise<CategoricalStats> {
    const stringValues = values.map(v => String(v));
    const valueCounts = this.getValueCounts(stringValues);
    const sorted = Object.entries(valueCounts).sort((a, b) => b[1] - a[1]);

    const stats: CategoricalStats = {
      uniqueCount: new Set(stringValues).size,
      mostFrequent: sorted[0]?.[0] || '',
      mostFrequentCount: sorted[0]?.[1] || 0,
      leastFrequent: sorted[sorted.length - 1]?.[0] || '',
      leastFrequentCount: sorted[sorted.length - 1]?.[1] || 0
    };

    if (detailed) {
      stats.topCategories = Object.fromEntries(sorted.slice(0, 10));
      
      const singleOccurrenceCount = sorted.filter(([ , count]) => count === 1).length;
      stats.distribution = {
        singleOccurrenceCount,
        singleOccurrencePercentage: Math.round((singleOccurrenceCount / sorted.length) * 100 * 100) / 100,
        entropy: this.calculateEntropy(Object.values(valueCounts), stringValues.length)
      };

      // Text analysis for string categories
      stats.textAnalysis = {
        avgLength: Math.round(stringValues.reduce((sum, str) => sum + str.length, 0) / stringValues.length * 100) / 100,
        minLength: Math.min(...stringValues.map(s => s.length)),
        maxLength: Math.max(...stringValues.map(s => s.length)),
        containsNumbers: stringValues.filter(s => /\\d/.test(s)).length,
        containsSpecialChars: stringValues.filter(s => /[^a-zA-Z0-9\\s]/.test(s)).length
      };
    }

    return stats;
  }

  private async profileDateTimeColumn(values: unknown[], detailed: boolean): Promise<DateTimeStats> {
    const dates = values
      .map(v => new Date(v as string))
      .filter(d => !isNaN(d.getTime()));

    if (dates.length === 0) {
      return {
        earliest: '',
        latest: '',
        spanDays: 0
      };
    }

    const earliest = new Date(Math.min(...dates.map(d => d.getTime())));
    const latest = new Date(Math.max(...dates.map(d => d.getTime())));
    const spanDays = Math.floor((latest.getTime() - earliest.getTime()) / (1000 * 60 * 60 * 24));

    const stats: DateTimeStats = {
      earliest: earliest.toISOString(),
      latest: latest.toISOString(),
      spanDays
    };

    if (detailed) {
      const years = [...new Set(dates.map(d => d.getFullYear()))];
      const months = [...new Set(dates.map(d => d.getMonth() + 1))];
      const weekdays = this.getValueCounts(dates.map(d => d.toLocaleDateString('en', { weekday: 'long' })));
      const hours = this.getValueCounts(dates.map(d => d.getHours().toString()));

      stats.patterns = {
        yearRange: `${Math.min(...years)} - ${Math.max(...years)}`,
        monthsPresent: months.sort((a, b) => a - b),
        weekdaysDistribution: weekdays,
        hoursDistribution: hours
      };

      // Frequency analysis
      if (dates.length > 1) {
        const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());
        const intervals: number[] = [];
        for (let i = 1; i < sortedDates.length; i++) {
          intervals.push(sortedDates[i].getTime() - sortedDates[i-1].getTime());
        }
        const medianInterval = median(intervals);
        
        stats.frequency = {
          medianIntervalHours: Math.round(medianInterval / (1000 * 60 * 60) * 100) / 100,
          mostCommonInterval: this.formatDuration(medianInterval)
        };
      }
    }

    return stats;
  }

  private async profileBooleanColumn(values: unknown[]): Promise<BooleanStats> {
    const booleanValues = values.map(v => {
      if (typeof v === 'boolean') return v;
      if (v === 'true' || v === 1 || v === '1') return true;
      if (v === 'false' || v === 0 || v === '0') return false;
      return null;
    }).filter(v => v !== null) as boolean[];

    const trueCount = booleanValues.filter(v => v === true).length;
    const falseCount = booleanValues.filter(v => v === false).length;
    const total = trueCount + falseCount;

    return {
      trueCount,
      falseCount,
      truePercentage: total > 0 ? Math.round((trueCount / total) * 100 * 100) / 100 : 0,
      falsePercentage: total > 0 ? Math.round((falseCount / total) * 100 * 100) / 100 : 0
    };
  }

  private assessDataQuality(data: Record<string, unknown>[]): DataQuality {
    const issues: QualityIssue[] = [];
    const strengths: string[] = [];
    const columns = Object.keys(data[0] || {});

    // Completeness assessment
    const totalCells = data.length * columns.length;
    const missingCells = this.countMissingCells(data);
    const completeness = ((totalCells - missingCells) / totalCells) * 100;

    // High missing data check
    const highMissingCols = columns.filter(col => {
      const missingCount = data.filter(row => this.isMissing(row[col])).length;
      const missingPct = (missingCount / data.length) * 100;
      return missingPct > 20;
    });

    if (highMissingCols.length > 0) {
      issues.push({
        type: 'high_missing_data',
        severity: 'medium',
        description: `Columns with >20% missing data: ${highMissingCols.join(', ')}`,
        affectedColumns: highMissingCols
      });
    }

    // Duplicate rows check
    const duplicateCount = this.countDuplicateRows(data);
    if (duplicateCount > 0) {
      issues.push({
        type: 'duplicate_rows',
        severity: 'medium',
        description: `${duplicateCount} duplicate rows (${Math.round((duplicateCount / data.length) * 100 * 10) / 10}%)`,
        count: duplicateCount
      });
    }

    // Constant columns check
    const constantCols = columns.filter(col => {
      const uniqueValues = new Set(data.map(row => row[col]));
      return uniqueValues.size <= 1;
    });

    if (constantCols.length > 0) {
      issues.push({
        type: 'constant_columns',
        severity: 'low',
        description: `Columns with single unique value: ${constantCols.join(', ')}`,
        affectedColumns: constantCols
      });
    }

    // Identify strengths
    if (completeness > 95) {
      strengths.push('Excellent data completeness (>95%)');
    } else if (completeness > 90) {
      strengths.push('Good data completeness (>90%)');
    }

    if (duplicateCount === 0) {
      strengths.push('No duplicate rows detected');
    }

    if (data.length > 1000) {
      strengths.push(`Substantial dataset size (${data.length.toLocaleString()} rows)`);
    }

    // Overall quality score
    let baseScore = completeness;
    baseScore -= issues.filter(i => i.severity === 'high').length * 15;
    baseScore -= issues.filter(i => i.severity === 'medium').length * 10;
    baseScore -= issues.filter(i => i.severity === 'low').length * 5;

    const overallScore = Math.max(0, Math.min(100, baseScore));

    return {
      overallScore: Math.round(overallScore * 10) / 10,
      completenessPercentage: Math.round(completeness * 100) / 100,
      issues,
      strengths,
      recommendations: this.generateQualityRecommendations(issues)
    };
  }

  private generateStatisticalSummary(data: Record<string, unknown>[]): StatisticalSummary {
    const columns = Object.keys(data[0] || {});
    
    const numericCols = columns.filter(col => this.isNumericColumn(data, col));
    const categoricalCols = columns.filter(col => this.isCategoricalColumn(data, col));
    const datetimeCols = columns.filter(col => this.isDateTimeColumn(data, col));
    const booleanCols = columns.filter(col => this.isBooleanColumn(data, col));

    const summary: StatisticalSummary = {
      numericColumns: numericCols.length,
      categoricalColumns: categoricalCols.length,
      datetimeColumns: datetimeCols.length,
      booleanColumns: booleanCols.length
    };

    if (numericCols.length > 0) {
      const numericData = numericCols.map(col => {
        const values = data.map(row => Number(row[col])).filter(v => !isNaN(v));
        return { col, values };
      });

      const means = numericData.map(({ values }) => mean(values));
      const variances = numericData.map(({ values }) => this.calculateVariance(values));

      summary.numericSummary = {
        meanOfMeans: mean(means),
        overallCorrelationStrength: 0, // Will be calculated separately
        highestVarianceColumn: numericData[variances.indexOf(Math.max(...variances))]?.col || '',
        lowestVarianceColumn: numericData[variances.indexOf(Math.min(...variances))]?.col || ''
      };
    }

    return summary;
  }

  private detectPatterns(data: Record<string, unknown>[]): DataPatterns {
    return {
      columnNamePatterns: this.analyzeColumnNames(data),
      valuePatterns: this.analyzeValuePatterns(data),
      structuralPatterns: this.analyzeStructuralPatterns(data)
    };
  }

  private generateBusinessInsights(data: Record<string, unknown>[]): BusinessInsights {
    const completeness = this.calculateCompleteness(data);
    const columns = Object.keys(data[0] || {});
    
    let dataReadiness: string;
    if (completeness > 95 && data.length > 100) {
      dataReadiness = 'excellent - ready for advanced analytics';
    } else if (completeness > 85 && data.length > 50) {
      dataReadiness = 'good - suitable for most analyses with minor cleaning';
    } else if (completeness > 70) {
      dataReadiness = 'fair - requires data cleaning before analysis';
    } else {
      dataReadiness = 'poor - significant data quality issues need addressing';
    }

    const analysisOpportunities: string[] = [];
    const businessValueIndicators: string[] = [];
    const recommendedNextSteps: string[] = [];

    // Detect analysis opportunities
    const numericCols = columns.filter(col => this.isNumericColumn(data, col));
    const categoricalCols = columns.filter(col => this.isCategoricalColumn(data, col));
    const datetimeCols = columns.filter(col => this.isDateTimeColumn(data, col));

    if (numericCols.length > 1) {
      analysisOpportunities.push('Correlation analysis between numeric variables');
      analysisOpportunities.push('Statistical modeling and regression analysis');
    }

    if (datetimeCols.length > 0 && numericCols.length > 0) {
      analysisOpportunities.push('Time series analysis and trend forecasting');
      analysisOpportunities.push('Seasonal pattern detection');
    }

    if (categoricalCols.length > 0 && numericCols.length > 0) {
      analysisOpportunities.push('Segmentation analysis by categories');
      analysisOpportunities.push('Group comparison and statistical testing');
    }

    // Business value indicators
    const businessKeywords = {
      financial: ['revenue', 'sales', 'income', 'profit', 'cost', 'price'],
      customer: ['customer', 'client', 'user', 'subscriber'],
      product: ['product', 'item', 'service', 'offering'],
      marketing: ['campaign', 'channel', 'source', 'medium'],
      operations: ['order', 'transaction', 'process', 'workflow']
    };

    Object.entries(businessKeywords).forEach(([domain, keywords]) => {
      const matchingCols = columns.filter(col => 
        keywords.some(keyword => col.toLowerCase().includes(keyword))
      );
      if (matchingCols.length > 0) {
          businessValueIndicators.push(`${domain.charAt(0).toUpperCase() + domain.slice(1)} data available: ${matchingCols.slice(0, 3).join(', ')}`);
      }
    });

    // Recommended next steps
    if (numericCols.length > 1) {
      recommendedNextSteps.push('Run correlation analysis to identify key relationships');
    }
    if (datetimeCols.length > 0) {
      recommendedNextSteps.push('Perform trend analysis on time-based metrics');
    }
    if (completeness < 90) {
      recommendedNextSteps.push('Address data quality issues before proceeding with analysis');
    }
    recommendedNextSteps.push('Create visualizations to explore patterns');
    recommendedNextSteps.push('Generate executive summary for stakeholders');

    return {
      dataReadiness,
      analysisOpportunities,
      businessValueIndicators,
      recommendedNextSteps
    };
  }

  private generateProfilingRecommendations(data: Record<string, unknown>[], dataQuality: DataQuality): string[] {
    const recommendations: string[] = [];

    // Data quality recommendations
    if (dataQuality.completenessPercentage < 95) {
      recommendations.push(`🔧 Data completeness is ${dataQuality.completenessPercentage}% - consider imputation strategies for missing values`);
    }

    // Column-specific recommendations
    const columns = Object.keys(data[0] || {});
    columns.forEach(col => {
      const missingPct = (data.filter(row => this.isMissing(row[col])).length / data.length) * 100;
      
      if (missingPct > 50) {
        recommendations.push(`❌ Column '${col}' has ${missingPct.toFixed(1)}% missing data - consider removal`);
      } else if (missingPct > 20) {
        recommendations.push(`⚠️ Column '${col}' has ${missingPct.toFixed(1)}% missing data - investigate patterns`);
      }

      if (new Set(data.map(row => row[col])).size === 1) {
        recommendations.push(`🗑️ Column '${col}' has constant values - consider removal`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('✅ Data profile looks good - ready for analysis');
    }

    return recommendations.slice(0, 8); // Limit to top 8 recommendations
  }

  // Helper methods
  private countMissingCells(data: Record<string, unknown>[]): number {
    return data.reduce((total, row) => {
      return total + Object.values(row).filter(value => this.isMissing(value)).length;
    }, 0);
  }

  private isMissing(value: unknown): boolean {
    return value === null || value === undefined || value === '' || 
           (typeof value === 'string' && value.trim() === '');
  }

  private countDuplicateRows(data: Record<string, unknown>[]): number {
    const seen = new Set();
    let duplicates = 0;
    
    data.forEach(row => {
      const key = JSON.stringify(row);
      if (seen.has(key)) {
        duplicates++;
      } else {
        seen.add(key);
      }
    });
    
    return duplicates;
  }

  private calculateCompleteness(data: Record<string, unknown>[]): number {
    const totalCells = data.length * Object.keys(data[0] || {}).length;
    const missingCells = this.countMissingCells(data);
    return ((totalCells - missingCells) / totalCells) * 100;
  }

  private isNumericColumn(data: Record<string, unknown>[], col: string): boolean {
    const values = data.map(row => row[col]).filter(v => !this.isMissing(v));
    const numericValues = values.filter(v => typeof v === 'number' || !isNaN(Number(v)));
    return numericValues.length > values.length * 0.8;
  }

  private isCategoricalColumn(data: Record<string, unknown>[], col: string): boolean {
    const values = data.map(row => row[col]).filter(v => !this.isMissing(v));
    const uniqueCount = new Set(values).size;
    return uniqueCount < values.length * 0.1 && uniqueCount > 1;
  }

  private isDateTimeColumn(data: Record<string, unknown>[], col: string): boolean {
    const values = data.map(row => row[col]).filter(v => !this.isMissing(v));
    const sample = values.slice(0, Math.min(10, values.length));
    const validDates = sample.filter(v => v instanceof Date || !isNaN(Date.parse(v as string))).length;
    return validDates > sample.length * 0.8;
  }

  private isBooleanColumn(data: Record<string, unknown>[], col: string): boolean {
    const values = data.map(row => row[col]).filter(v => !this.isMissing(v));
    return values.every(v => 
      typeof v === 'boolean' || 
      v === 'true' || v === 'false' || 
      v === 0 || v === 1 ||
      v === '0' || v === '1'
    );
  }

  private categorizeColumn(data: Record<string, unknown>[], col: string): 'numeric' | 'categorical' | 'datetime' | 'text' | 'boolean' {
    if (this.isBooleanColumn(data, col)) return 'boolean';
    if (this.isNumericColumn(data, col)) return 'numeric';
    if (this.isDateTimeColumn(data, col)) return 'datetime';
    if (this.isCategoricalColumn(data, col)) return 'categorical';
    return 'text';
  }

  private inferColumnType(values: unknown[]): string {
    if (values.length === 0) return 'unknown';
    
    // Check if all values are numbers (already converted or convertible)
    if (values.every(v => typeof v === 'number' || !isNaN(Number(v)))) {
      return 'number';
    }
    
    // Check if all values are booleans (already converted or convertible)
    if (values.every(v => typeof v === 'boolean' || v === 'true' || v === 'false')) {
      return 'boolean';
    }
    
    // Check if all values are dates (already converted or convertible)
    if (values.every(v => v instanceof Date || !isNaN(Date.parse(v as string)))) {
      return 'datetime';
    }
    
    return 'string';
  }

  private getValueCounts(values: unknown[]): Record<string, number> {
    const counts: Record<string, number> = {};
    values.forEach(value => {
      const key = String(value);
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }

  private calculateSkewness(values: number[]): number {
    const n = values.length;
    const meanVal = mean(values);
    const stdVal = standardDeviation(values);
    
    if (stdVal === 0) return 0;
    
    const skewness = values.reduce((sum, value) => {
      return sum + Math.pow((value - meanVal) / stdVal, 3);
    }, 0) / n;
    
    return skewness;
  }

  private calculateKurtosis(values: number[]): number {
    const n = values.length;
    const meanVal = mean(values);
    const stdVal = standardDeviation(values);
    
    if (stdVal === 0) return 0;
    
    const kurtosis = values.reduce((sum, value) => {
      return sum + Math.pow((value - meanVal) / stdVal, 4);
    }, 0) / n - 3; // Subtract 3 for excess kurtosis
    
    return kurtosis;
  }

  private calculateVariance(values: number[]): number {
    const meanVal = mean(values);
    return values.reduce((sum, value) => sum + Math.pow(value - meanVal, 2), 0) / values.length;
  }

  private calculateEntropy(counts: number[], total: number): number {
    return -counts.reduce((entropy, count) => {
      const probability = count / total;
      return entropy + (probability > 0 ? probability * Math.log2(probability) : 0);
    }, 0);
  }

  private formatBytes(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    return `${seconds} second${seconds > 1 ? 's' : ''}`;
  }

  private analyzeColumnNames(_data: Record<string, unknown>[]): { businessDomains: Record<string, string[]>; namingConventions: Record<string, number>; totalColumns: number } {
    // Implementation for column name pattern analysis
    return {
      businessDomains: {},
      namingConventions: {},
        totalColumns: Object.keys(_data[0] || {}).length
    };
  }

  private analyzeValuePatterns(_data: Record<string, unknown>[]): { potentialIdColumns: string[]; contactInfoColumns: { column: string; type: string }[] } { 
    void _data;
    // Implementation for value pattern analysis
    return {
      potentialIdColumns: [],
      contactInfoColumns: []
    };
  }

  private analyzeStructuralPatterns(data: Record<string, unknown>[]): { columnCount: number; rowCount: number; density: number; shapeCategory: 'wide' | 'tall' | 'balanced' } {
    const columns = Object.keys(data[0] || {});
    return {
      columnCount: columns.length,
      rowCount: data.length,
      density: this.calculateCompleteness(data),
      shapeCategory: columns.length > data.length ? 'wide' : 
                   data.length > columns.length * 10 ? 'tall' : 'balanced'
    };
  }

  private generateQualityRecommendations(issues: QualityIssue[]): string[] {
    const recommendations: string[] = [];

    issues.forEach(issue => {
      switch (issue.type) {
        case 'high_missing_data':
          recommendations.push('🔧 Implement imputation strategies or filter high-missing columns');
          break;
        case 'duplicate_rows':
          recommendations.push('🔄 Remove duplicate rows using appropriate deduplication logic');
          break;
        case 'constant_columns':
          recommendations.push('🗑️ Remove constant-value columns as they add no analytical value');
          break;
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('✅ No major quality issues detected');
    }

    return recommendations;
  }
}

// Export singleton instance
export const datasetProfiler = DatasetProfiler.getInstance();
