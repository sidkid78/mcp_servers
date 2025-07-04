'use client';

import { FileText, Database, Calendar, BarChart3 } from 'lucide-react';

interface DataSource {
  name: string;
  format: string;
  size: number;
  estimatedRows: number;
  estimatedColumns: number;
  businessPotential: string;
  lastModified: Date;
}

interface DataSourceCardProps {
  source: DataSource;
}

export default function DataSourceCard({ source }: DataSourceCardProps) {
  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'csv':
      case 'tsv':
                                                                                                                      return FileText;
      case 'excel':
        return FileText;
      case 'json':
      case 'json lines':
        return Database;
      case 'parquet':
        return Database;
      default:
        return FileText;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format.toLowerCase()) {
      case 'csv':
      case 'tsv':
        return 'text-green-600 bg-green-50 dark:bg-green-900/20';
      case 'excel':
        return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
      case 'json':
      case 'json lines':
        return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20';
      case 'parquet':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const FormatIcon = getFormatIcon(source.format);
  const colorClasses = getFormatColor(source.format);

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${colorClasses}`}>
            <FormatIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white text-sm">
              {source.name}
            </h3>
            <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span className="font-medium">{source.format}</span>
              <span>•</span>
              <span>{formatFileSize(source.size)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Structure Info */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="flex items-center space-x-2 text-xs">
          <BarChart3 className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {source.estimatedRows.toLocaleString()} rows
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Database className="h-4 w-4 text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">
            {source.estimatedColumns} columns
          </span>
        </div>
      </div>

      {/* Business Potential */}
      <div className="mb-3">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Business Potential:</div>
        <div className="text-sm text-gray-700 dark:text-gray-200">
          {source.businessPotential}
        </div>
      </div>

      {/* Last Modified */}
      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-700 pt-3">
        <Calendar className="h-4 w-4" />
        <span>Modified {formatRelativeTime(source.lastModified)}</span>
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

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  
  return date.toLocaleDateString();
}
