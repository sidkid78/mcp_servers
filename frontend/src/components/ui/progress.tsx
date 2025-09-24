"use client"

import React from 'react';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  max = 100, 
  className = '',
  style
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`relative h-2 w-full overflow-hidden rounded-full bg-gray-200 ${className}`}>
      <div 
        className="h-full bg-blue-600 transition-all duration-300 ease-in-out"
        style={{ width: `${percentage}%`, ...style }}
      />
    </div>
  );
};
