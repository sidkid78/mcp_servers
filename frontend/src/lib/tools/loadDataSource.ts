/**
 * Load DataSource Tool
 * TypeScript equivalent of Python load_datasource.py
 * Handles CSV, Excel, JSON, and other data formats
 */

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Dataset, DatasetMetadata, ColumnInfo, ApiResponse } from '../types';

interface LoadDataSourceOptions {
  encoding?: string;
  delimiter?: string;
  header?: boolean;
  sheetName?: string | number;
  allSheets?: boolean;
  skipEmptyLines?: boolean;
  strictMode?: boolean;
}

export class DataSourceLoader {
  private static instance: DataSourceLoader;

  static getInstance(): DataSourceLoader {
    if (!DataSourceLoader.instance) {
      DataSourceLoader.instance = new DataSourceLoader();
    }
    return DataSourceLoader.instance;
  }

  async loadDataSource(
    file: File,
    datasetName?: string,
    sourceType: string = 'auto',
    options: LoadDataSourceOptions = {}
  ): Promise<ApiResponse<Dataset>> {
    try {
      // Validate inputs
      if (!file) {
        return { success: false, error: 'File is required' };
      }

      if (!datasetName) {
        datasetName = file.name.split('.')[0];
      }

      // Auto-detect source type if needed
      if (sourceType === 'auto') {
        sourceType = this.detectSourceType(file.name);
      }

      // Load data based on source type
      const loadResult = await this.loadDataByType(file, sourceType, options);

      if (!loadResult.success) {
        return loadResult;
      }

      // Process and validate data
      const processedData = await this.processLoadedData(
        loadResult.data!.data,
        datasetName,
        loadResult.data!.metadata
      );

      return {
        success: true,
        data: processedData,
        message: `Successfully loaded dataset '${datasetName}'`
      };

    } catch (error) {
      return {
        success: false,
        error: `Failed to load data source: ${error instanceof Error ? error.message : String(error)}`,
      };
    }
  }

  private detectSourceType(filename: string): string {
    const pathLower = filename.toLowerCase();

    if (pathLower.endsWith('.csv')) return 'csv';
    if (pathLower.endsWith('.xlsx') || pathLower.endsWith('.xls')) return 'excel';
    if (pathLower.endsWith('.json')) return 'json';
    if (pathLower.endsWith('.jsonl')) return 'jsonl';
    if (pathLower.endsWith('.tsv')) return 'tsv';
    if (pathLower.endsWith('.txt')) return 'text';

    return 'csv'; // Default assumption
  }

  private async loadDataByType(
    file: File,
    sourceType: string,
    options: LoadDataSourceOptions
  ): Promise<ApiResponse<{ data: Record<string, any>[]; metadata: any }>> {
    try {
      switch (sourceType) {
        case 'csv':
          return await this.loadCSV(file, options);
        case 'excel':
          return await this.loadExcel(file, options);
        case 'json':
          return await this.loadJSON(file, options);
        case 'jsonl':
          return await this.loadJSONL(file, options);
        case 'tsv':
          return await this.loadTSV(file, options);
        default:
          return { success: false, error: `Unsupported source type: ${sourceType}` };
      }
    } catch (error) {
      return {
        success: false,
        error: `Error loading ${sourceType}: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  private async loadCSV(
    file: File,
    options: LoadDataSourceOptions
  ): Promise<ApiResponse<{ data: Record<string, any>[]; metadata: any }>> {
    return new Promise((resolve) => {
      Papa.parse(file, {
        header: options.header !== false,
        delimiter: options.delimiter || ',',
        skipEmptyLines: options.skipEmptyLines !== false,
        dynamicTyping: true,
        transformHeader: (header) => header.trim(),
        complete: (results) => {
          if (results.errors.length > 0 && options.strictMode) {
            resolve({
              success: false,
              error: `CSV parsing errors: ${results.errors.map(e => e.message).join(', ')}`
            });
            return;
          }

          resolve({
            success: true,
            data: {
              data: results.data as Record<string, any>[],
              metadata: {
                encoding: 'utf-8',
                loadMethod: 'papaparse',
                errors: results.errors,
                meta: results.meta
              }
            }
          });
        },
        error: (error) => {
          resolve({
            success: false,
            error: `Failed to read CSV: ${error.message}`
          });
        }
      });
    });
  }

  private async loadExcel(
    file: File,
    options: LoadDataSourceOptions
  ): Promise<ApiResponse<{ data: Record<string, any>[]; metadata: any }>> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });

          let targetSheet: string;
          let sheetInfo: string;

          if (options.allSheets) {
            // Find the largest sheet
            const sheetSizes = workbook.SheetNames.map(name => {
              const sheet = workbook.Sheets[name];
              const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
              return { name, size: range.e.r * range.e.c };
            });
            const largestSheet = sheetSizes.reduce((max, current) => 
              current.size > max.size ? current : max
            );
            targetSheet = largestSheet.name;
            sheetInfo = `Largest sheet selected: ${targetSheet} (from ${workbook.SheetNames.length} sheets)`;
          } else {
            targetSheet = typeof options.sheetName === 'string' 
              ? options.sheetName 
              : workbook.SheetNames[options.sheetName as number || 0];
            sheetInfo = `Sheet: ${targetSheet}`;
          }

          const worksheet = workbook.Sheets[targetSheet];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: null 
          });

          // Convert to records format
          if (jsonData.length === 0) {
            resolve({
              success: false,
              error: 'Excel sheet is empty'
            });
            return;
          }

          const headers = jsonData[0] as string[];
          const dataRows = jsonData.slice(1) as any[][];
          
          const records = dataRows.map(row => {
            const record: Record<string, any> = {};
            headers.forEach((header, index) => {
              record[String(header)] = row[index] || null;
            });
            return record;
          });

          resolve({
            success: true,
            data: {
              data: records,
              metadata: {
                sheetInfo,
                loadMethod: 'xlsx',
                availableSheets: workbook.SheetNames
              }
            }
          });

        } catch (error) {
          resolve({
            success: false,
            error: `Failed to read Excel file: ${error instanceof Error ? error.message : String(error)}`
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to read file'
        });
      };

      reader.readAsArrayBuffer(file);
    });
  }

  private async loadJSON(
    file: File,
    options: LoadDataSourceOptions
  ): Promise<ApiResponse<{ data: Record<string, any>[]; metadata: any }>> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);

          let records: Record<string, any>[];
          let structureInfo: string;

          if (Array.isArray(data)) {
            if (data.length > 0 && typeof data[0] === 'object') {
              records = data;
              structureInfo = `Array of ${data.length} objects`;
            } else {
              records = data.map((value, index) => ({ index, value }));
              structureInfo = `Array of ${data.length} values`;
            }
          } else if (typeof data === 'object' && data !== null) {
            // Try to find the main data array
            const mainKey = Object.keys(data).find(key => 
              Array.isArray(data[key]) && 
              data[key].length > 0 && 
              typeof data[key][0] === 'object'
            );

            if (mainKey) {
              records = data[mainKey];
              structureInfo = `Object with main data in '${mainKey}' key`;
            } else {
              records = [data];
              structureInfo = 'Single object flattened to row';
            }
          } else {
            records = [{ value: data }];
            structureInfo = 'Single value';
          }

          resolve({
            success: true,
            data: {
              data: records,
              metadata: {
                structureInfo,
                loadMethod: 'JSON.parse',
                originalType: Array.isArray(data) ? 'array' : typeof data
              }
            }
          });

        } catch (error) {
          resolve({
            success: false,
            error: `Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to read file'
        });
      };

      reader.readAsText(file);
    });
  }

  private async loadJSONL(
    file: File,
    options: LoadDataSourceOptions
  ): Promise<ApiResponse<{ data: Record<string, any>[]; metadata: any }>> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const lines = content.split('\\n').filter(line => line.trim());
          const records: Record<string, any>[] = [];
          const errors: string[] = [];

          lines.forEach((line, index) => {
            try {
              const record = JSON.parse(line);
              records.push(record);
            } catch (error) {
              const errorMsg = `Invalid JSON on line ${index + 1}: ${error instanceof Error ? error.message : String(error)}`;
              errors.push(errorMsg);
              
              if (options.strictMode) {
                resolve({
                  success: false,
                  error: errorMsg
                });
                return;
              }
            }
          });

          if (records.length === 0) {
            resolve({
              success: false,
              error: 'No valid JSON records found'
            });
            return;
          }

          resolve({
            success: true,
            data: {
              data: records,
              metadata: {
                recordsLoaded: records.length,
                loadMethod: 'JSON Lines parsing',
                errors,
                totalLines: lines.length
              }
            }
          });

        } catch (error) {
          resolve({
            success: false,
            error: `Failed to process JSONL: ${error instanceof Error ? error.message : String(error)}`
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to read file'
        });
      };

      reader.readAsText(file);
    });
  }

  private async loadTSV(
    file: File,
    options: LoadDataSourceOptions
  ): Promise<ApiResponse<{ data: Record<string, any>[]; metadata: any }>> {
    // TSV is just CSV with tab delimiter
    const tsvOptions = { ...options, delimiter: '\\t' };
    return this.loadCSV(file, tsvOptions);
  }

  private async processLoadedData(
    data: Record<string, any>[],
    datasetName: string,
    loadMetadata: any
  ): Promise<Dataset> {
    // Remove completely empty rows
    const cleanedData = data.filter(row => 
      Object.values(row).some(value => value !== null && value !== undefined && value !== '')
    );

    // Generate column information
    const columns = this.generateColumnInfo(cleanedData);
    
    // Calculate metadata
    const metadata: DatasetMetadata = {
      shape: [cleanedData.length, columns.length],
      columns,
      dtypes: this.generateDTypes(cleanedData),
      missingValues: this.calculateMissingValues(cleanedData),
      memoryUsage: this.estimateMemoryUsage(cleanedData),
      sampleData: cleanedData.slice(0, 3),
      encodingUsed: loadMetadata.encoding,
      sqlDatabaseStored: false // Will be implemented later
    };

    return {
      name: datasetName,
      data: cleanedData,
      metadata,
      loadedAt: new Date().toISOString()
    };
  }

  private generateColumnInfo(data: Record<string, any>[]): ColumnInfo[] {
    if (data.length === 0) return [];

    const columns = Object.keys(data[0]);
    
    return columns.map(col => {
      const values = data.map(row => row[col]);
      const nonNullValues = values.filter(v => v !== null && v !== undefined);
      const nullCount = values.length - nonNullValues.length;
      
      // Type detection
      let type: 'numeric' | 'categorical' | 'datetime' | 'text' | 'boolean' = 'text';
      let min: number | undefined;
      let max: number | undefined;
      let mean: number | undefined;

      if (nonNullValues.length > 0) {
        // Check if numeric
        const numericValues = nonNullValues.filter(v => typeof v === 'number' || !isNaN(Number(v)));
        if (numericValues.length > nonNullValues.length * 0.8) {
          type = 'numeric';
          const nums = numericValues.map(v => typeof v === 'number' ? v : Number(v));
          min = Math.min(...nums);
          max = Math.max(...nums);
          mean = nums.reduce((a, b) => a + b, 0) / nums.length;
        } 
        // Check if boolean
        else if (nonNullValues.every(v => typeof v === 'boolean' || v === 'true' || v === 'false' || v === 0 || v === 1)) {
          type = 'boolean';
        }
        // Check if datetime
        else if (this.isDateColumn(nonNullValues)) {
          type = 'datetime';
        }
        // Check if categorical (low unique count)
        else if (new Set(nonNullValues).size < nonNullValues.length * 0.1) {
          type = 'categorical';
        }
      }

      return {
        name: col,
        dtype: this.inferDType(nonNullValues),
        nonNullCount: nonNullValues.length,
        nullCount,
        nullPercentage: Math.round((nullCount / values.length) * 100 * 10) / 10,
        uniqueCount: new Set(nonNullValues).size,
        sampleValues: [...new Set(nonNullValues)].slice(0, 3).map(v => String(v)),
        min,
        max,
        mean,
        type
      };
    });
  }

  private generateDTypes(data: Record<string, any>[]): Record<string, string> {
    if (data.length === 0) return {};
    
    const dtypes: Record<string, string> = {};
    const columns = Object.keys(data[0]);
    
    columns.forEach(col => {
      const values = data.map(row => row[col]).filter(v => v !== null && v !== undefined);
      dtypes[col] = this.inferDType(values);
    });
    
    return dtypes;
  }

  private inferDType(values: any[]): string {
    if (values.length === 0) return 'unknown';
    
    const types = values.map(v => typeof v);
    const uniqueTypes = new Set(types);
    
    if (uniqueTypes.has('number') && uniqueTypes.size === 1) return 'number';
    if (uniqueTypes.has('boolean') && uniqueTypes.size === 1) return 'boolean';
    if (values.every(v => !isNaN(Date.parse(v)))) return 'datetime';
    
    return 'string';
  }

  private calculateMissingValues(data: Record<string, any>[]): Record<string, number> {
    if (data.length === 0) return {};
    
    const columns = Object.keys(data[0]);
    const missingValues: Record<string, number> = {};
    
    columns.forEach(col => {
      const nullCount = data.filter(row => 
        row[col] === null || row[col] === undefined || row[col] === ''
      ).length;
      missingValues[col] = nullCount;
    });
    
    return missingValues;
  }

  private estimateMemoryUsage(data: Record<string, any>[]): string {
    // Rough estimation
    const jsonString = JSON.stringify(data);
    const bytes = new Blob([jsonString]).size;
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private isDateColumn(values: any[]): boolean {
    if (values.length === 0) return false;
    
    // Sample a few values to check
    const sample = values.slice(0, Math.min(10, values.length));
    const validDates = sample.filter(v => {
      try {
        const date = new Date(v);
        return !isNaN(date.getTime());
      } catch {
        return false;
      }
    });
    
    return validDates.length > sample.length * 0.8;
  }
}

// Export singleton instance
export const dataSourceLoader = DataSourceLoader.getInstance();
