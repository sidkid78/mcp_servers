'use client';

import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle } from 'lucide-react';

interface FileUploadZoneProps {
  onFilesUploaded: (files: File[]) => void;
}

export default function FileUploadZone({ onFilesUploaded }: FileUploadZoneProps) {
  const [uploadError, setUploadError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    setUploadError('');
    
    if (rejectedFiles.length > 0) {
      setUploadError('Some files were rejected. Please ensure files are CSV or Excel format (.csv, .xlsx, .xls) and under 100MB.');
      return;
    }

    if (acceptedFiles.length === 0) {
      setUploadError('No valid files were selected.');
      return;
    }

    onFilesUploaded(Array.from(acceptedFiles) as File[]);
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    maxSize: 100 * 1024 * 1024, // 100MB
    multiple: true
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${isDragActive 
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${acceptedFiles.length > 0 ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            {acceptedFiles.length > 0 ? (
              <div className="bg-green-100 dark:bg-green-800 p-3 rounded-full">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-full">
                <Upload className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
          
          {acceptedFiles.length > 0 ? (
            <div>
              <h3 className="text-lg font-medium text-green-800 dark:text-green-200">
                {acceptedFiles.length} file{acceptedFiles.length !== 1 ? 's' : ''} ready for analysis
              </h3>
              <div className="mt-2 space-y-1">
                {acceptedFiles.map((file, index) => (
                  <div key={index} className="text-sm text-green-600 dark:text-green-300">
                    📄 {file.name} ({formatFileSize(file.size)})
                  </div>
                ))}
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onFilesUploaded(Array.from(acceptedFiles) as File[]);
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Start Discovery Analysis
              </button>
            </div>
          ) : isDragActive ? (
            <div>
              <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200">
                Drop your data files here
              </h3>
              <p className="text-blue-600 dark:text-blue-300">
                Release to begin business intelligence discovery
              </p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Drop your data files here, or click to browse
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Upload <strong>CSV or Excel files</strong> with tabular data to begin business intelligence analysis
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg font-medium text-sm">
                  📄 .csv
                </span>
                <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg font-medium text-sm">
                  📊 .xlsx
                </span>
                <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg font-medium text-sm">
                  📊 .xls
                </span>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                💡 <strong>Perfect for:</strong> Sales data, customer records, financial reports, operational metrics<br/>
                ✅ <strong>Both formats fully supported</strong> - upload your files directly!
              </div>
            </div>
          )}
        </div>
      </div>
      
      {uploadError && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Upload Error</h4>
              <p className="text-sm text-red-600 dark:text-red-300 mt-1">{uploadError}</p>
            </div>
          </div>
        </div>
      )}
      
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="text-xs text-blue-800 dark:text-blue-200 text-center">
            <strong>📊 Tabular Data Required:</strong> Maximum file size: 100MB per file<br/>
            <strong>✅ Supported:</strong> CSV (.csv) and Excel (.xlsx, .xls) with headers and structured data<br/>
            <strong>❌ Not supported:</strong> JSON, XML, plain text, or unstructured data
          </div>
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}
