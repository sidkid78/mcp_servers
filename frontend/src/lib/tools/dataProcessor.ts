// Data Loading and Processing Tools - TypeScript equivalent of Python tools
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Dataset, DatasetMetadata, ColumnInfo } from '../types';

interface CsvLoadInfo {
  encoding: string;
  method: string;
  errors: Papa.ParseError[];
  meta: Papa.ParseMeta;
}

interface ExcelLoadInfo {
  method: string;
  sheetName: string;
  totalSheets: number;
  sheetNames: string[];
}

interface JsonLoadInfo {
  method: string;
  structureInfo: string;
  originalType: string;
}

type LoadInfo = CsvLoadInfo | ExcelLoadInfo | JsonLoadInfo;

export class DataProcessor {
  
  /**
   * Load and process data from uploaded files
   * TypeScript equivalent of load_datasource_tool
   */
  static async loadDataSource(
    file: File, 
    datasetName?: string
  ): Promise<{ success: boolean; dataset?: Dataset; error?: string }> {
    try {
      const name = datasetName || file.name.split('.')[0];
      
      // Determine file type and load accordingly
      const fileType = this.getFileType(file.name);
      let data: unknown[] = [];
      let loadInfo: Partial<LoadInfo> = {};
      
      switch (fileType) {
        case 'csv':
          const csvResult = await this.loadCSV(file);
          data = csvResult.data;
          loadInfo = csvResult.info;
          break;
          
        case 'excel':
          const excelResult = await this.loadExcel(file);
          data = excelResult.data;
          loadInfo = excelResult.info;
          break;
          
        case 'json':
          const jsonResult = await this.loadJSON(file);
          data = jsonResult.data;
          loadInfo = jsonResult.info;
          break;
          
        default:
          return { success: false, error: `Unsupported file format: ${fileType}` };
      }
      
      // Ensure loadInfo is a valid LoadInfo type before passing to generateMetadata
      if (!('method' in loadInfo)) {
        return { success: false, error: 'Failed to generate load information' };
      }

      // Generate metadata
      const metadata = this.generateMetadata(data, loadInfo as LoadInfo);
      
      // Store in browser memory (equivalent to SQLite storage in Python)
      this.storeInMemory(name, data);
      
      const dataset: Dataset = {
        name,
        data: data as Record<string, unknown>[],
        metadata,
        loadedAt: new Date().toISOString()
      };
      
      return { success: true, dataset };
      
    } catch (error) {
      console.error('Failed to load data source:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to load data source' 
      };
    }
  }
  
  /**
   * Load CSV files with robust parsing
   */
  private static async loadCSV(file: File): Promise<{ data: unknown[], info: CsvLoadInfo }> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: (header: string) => header.trim(),
        complete: (results) => {
          if (results.errors.length > 0) {
            console.warn('CSV parsing warnings:', results.errors);
          }
          
          resolve({
            data: results.data,
            info: {
              encoding: 'utf-8',
              method: 'papaparse',
              errors: results.errors,
              meta: results.meta
            }
          });
        },
        error: (error) => {
          reject(new Error(`CSV parsing failed: ${error.message}`));
        }
      });
    });
  }
  
  /**
   * Load Excel files
   */
  private static async loadExcel(file: File): Promise<{ data: unknown[], info: ExcelLoadInfo }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const arrayBuffer = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          
          // Get first worksheet
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
            header: 1,
            defval: null
          });
          
          // Convert array format to object format with headers
          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1) as unknown[][];
          
          const data = rows.map(row => {
            const obj: Record<string, unknown> = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] !== undefined ? row[index] : null;
            });
            return obj;
          });
          
          resolve({
            data,
            info: {
              method: 'xlsx',
              sheetName,
              totalSheets: workbook.SheetNames.length,
              sheetNames: workbook.SheetNames
            }
          });
        } catch (error) {
          reject(new Error(`Excel parsing failed: ${error}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read Excel file'));
      };
      
      reader.readAsArrayBuffer(file);
    });
  }
  
  /**
   * Load JSON files
   */
  private static async loadJSON(file: File): Promise<{ data: unknown[], info: JsonLoadInfo }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const parsed = JSON.parse(text);
          
          let data: unknown[] = [];
          let structureInfo = '';
          
          if (Array.isArray(parsed)) {
            if (parsed.length > 0 && typeof parsed[0] === 'object') {
              data = parsed;
              structureInfo = `Array of ${parsed.length} objects`;
            } else {
              data = parsed.map((item, index) => ({ index, value: item }));
              structureInfo = `Array of ${parsed.length} values`;
            }
          } else if (typeof parsed === 'object' && parsed !== null) {
            // Try to find main data array
            const arrayKeys = Object.keys(parsed).filter(key => Array.isArray(parsed[key]));
            
            if (arrayKeys.length > 0) {
              const mainKey = arrayKeys[0];
              data = parsed[mainKey];
              structureInfo = `Object with main data in '${mainKey}' key`;
            } else {
              data = [parsed];
              structureInfo = 'Single object converted to array';
            }
          } else {
            data = [{ value: parsed }];
            structureInfo = 'Single value converted to object';
          }
          
          resolve({
            data,
            info: {
              method: 'JSON.parse',
              structureInfo,
              originalType: Array.isArray(parsed) ? 'array' : typeof parsed
            }
          });
        } catch (error) {
          reject(new Error(`JSON parsing failed: ${error}`));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read JSON file'));
      };
      
      reader.readAsText(file);
    });
  }
  
  /**
   * Generate comprehensive metadata for the dataset
   */
  private static generateMetadata(data: unknown[], loadInfo: LoadInfo): DatasetMetadata {
    if (!data || data.length === 0) {
      return {
        shape: [0, 0],
        columns: [],
        dtypes: {},
        missingValues: {},
        memoryUsage: '0 MB',
        sampleData: [],
        sqlDatabaseStored: false
      };
    }
    
    const columns = Object.keys(data[0] || {});
    const columnInfo: ColumnInfo[] = [];
    const dtypes: Record<string, string> = {};
    const missingValues: Record<string, number> = {};
    
    // Analyze each column
    columns.forEach((colName: string) => {  
      const values = data.map((row) => (row as Record<string, unknown>)[colName]).filter((v) => v !== null && v !== undefined && v !== '') as unknown[];
      const nonNullCount = values.length;
      const nullCount = data.length - nonNullCount;
      const uniqueValues = [...new Set(values)];
      
      // Determine data type
      const dtype = this.inferDataType(values as unknown[]);
      dtypes[colName] = dtype;
      missingValues[colName] = nullCount;

      // Generate statistics based on type
      let min, max, mean;
      if (dtype === 'number' && values.length > 0) {
        const numericValues = values.filter((v: unknown) => typeof v === 'number' && !isNaN(v as number));
        if (numericValues.length > 0) {
          min = Math.min(...numericValues as number[]);
          max = Math.max(...numericValues as number[]);
          mean = (numericValues as number[]).reduce((sum: number, val: number) => sum + val, 0) / numericValues.length;
        }
      }
      
      columnInfo.push({
        name: colName,
        dtype,
        nonNullCount,
        nullCount,
        nullPercentage: Math.round((nullCount / data.length) * 100 * 10) / 10,
        uniqueCount: uniqueValues.length,
        sampleValues: uniqueValues.slice(0, 3).map((v: unknown) => String(v)),
        min: min as number,
        max: max as number,
        mean: mean as number
      } as ColumnInfo);
    });
    
    // Calculate memory usage estimate
    const dataStr = JSON.stringify(data);
    const memoryBytes = new Blob([dataStr]).size;
    const memoryMB = (memoryBytes / (1024 * 1024)).toFixed(2);
    
    return {
      shape: [data.length, columns.length],
      columns: columnInfo,
      dtypes,
      missingValues,
      memoryUsage: `${memoryMB} MB`,
      sampleData: data.slice(0, 3) as Record<string, unknown>[],
      encodingUsed: 'encoding' in loadInfo ? loadInfo.encoding : undefined,
      sqlDatabaseStored: false // We're using memory storage instead
    };
  }
  
  /**
   * Infer data type from sample values
   */
  private static inferDataType(values: unknown[]): string {
    if (values.length === 0) return 'unknown';
    
    let numberCount = 0;
    let dateCount = 0;
    let booleanCount = 0;
    
    const sampleSize = Math.min(values.length, 100);
    const sample = values.slice(0, sampleSize);
    
    sample.forEach((value: unknown) => {
      if (typeof value === 'number' && !isNaN(value)) {
        numberCount++;
      } else if (typeof value === 'boolean') {
        booleanCount++;
      } else if (typeof value === 'string') {
        // Check if it looks like a date
        if (this.isDateString(value as string)) {
          dateCount++;
        } else if (!isNaN(Number(value as string)) && (value as string).trim() !== '') {
          numberCount++;
        }
      }
    });
    
    const total = sampleSize;
    const numberPercent = numberCount / total;
    const datePercent = dateCount / total;
    const booleanPercent = booleanCount / total;
    
    if (numberPercent > 0.8) return 'number';
    if (datePercent > 0.8) return 'datetime';
    if (booleanPercent > 0.8) return 'boolean';
    if (numberPercent > 0.5) return 'number';
    
    return 'string';
  }
  
  /**
   * Check if a string looks like a date
   */
  private static isDateString(value: string): boolean {
    const datePatterns = [
      /^\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}/, // MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}/, // MM-DD-YYYY
      /^\d{4}\/\d{2}\/\d{2}/, // YYYY/MM/DD
    ];
    
    return datePatterns.some(pattern => pattern.test(value)) && !isNaN(Date.parse(value));
  }
  
  /**
   * Determine file type from filename
   */
  private static getFileType(filename: string): string {
    const ext = filename.toLowerCase().split('.').pop();
    
    const typeMap: Record<string, string> = {
      'csv': 'csv',
      'tsv': 'csv',
      'xlsx': 'excel',
      'xls': 'excel',
      'json': 'json',
      'jsonl': 'json'
    };
    
    return typeMap[ext || ''] || 'unknown';
  }
  
  /**
   * Store dataset in browser memory (equivalent to SQLite in Python version)
   */
  private static storeInMemory(name: string, data: unknown[]): void {
    // Store in sessionStorage for persistence across page refreshes
    try {
      const storageKey = `bi_dataset_${name}`;
      const dataStr = JSON.stringify(data);
      
      // Check if data fits in storage
      if (dataStr.length < 5 * 1024 * 1024) { // 5MB limit
        sessionStorage.setItem(storageKey, dataStr);
      }
    } catch (error) {
      console.warn('Failed to store dataset in browser storage:', error);
    }
  }
  
  /**
   * Retrieve dataset from browser memory
   */
  static getStoredDataset(name: string): unknown[] | null {
    try {
      const storageKey = `bi_dataset_${name}`;
      const dataStr = sessionStorage.getItem(storageKey);
      return dataStr ? JSON.parse(dataStr) : null;
    } catch (error) {
      console.warn('Failed to retrieve dataset from browser storage:', error);
      return null;
    }
  }
  
  /**
   * Execute SQL-like queries on dataset (simplified version)
   */
  static queryDataset(
    data: unknown[], 
    query: { 
      select?: string[]; 
      where?: (row: Record<string, unknown>) => boolean; 
      groupBy?: string;
      orderBy?: string;
      limit?: number;
    }
  ): unknown[] {
    let result = [...data];
    
    // Apply WHERE filter
    if (query.where) {
      result = result.filter((row: unknown) => query.where!(row as Record<string, unknown>));
    }
    
    // Apply ORDER BY
    if (query.orderBy) {
      result.sort((a: unknown, b: unknown) => {
        const aVal = (a as Record<string, unknown>)[query.orderBy!];
        const bVal = (b as Record<string, unknown>)[query.orderBy!];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return (aVal as number) - (bVal as number);
        }
        
        return String(aVal).localeCompare(String(bVal));
      });
    }
    
    // Apply SELECT
    if (query.select && query.select.length > 0) {
      result = result.map((row: unknown) => {
        const newRow: Record<string, unknown> = {};
        query.select!.forEach((col: string) => {
          newRow[col as string] = (row as Record<string, unknown>)[col as string];
        });
        return newRow;
      });
    }
    
    // Apply LIMIT
    if (query.limit) {
      result = result.slice(0, query.limit);
    }
    
    return result;
  }
}
