'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-sm dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // Custom table styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50 dark:bg-gray-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {children}
            </tbody>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border-r border-gray-200 dark:border-gray-700 last:border-r-0">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-700 last:border-r-0">
              {children}
            </td>
          ),
          // Custom heading styles
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4 mt-6 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-3 mt-5 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2 mt-4 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-2 mt-3 first:mt-0">
              {children}
            </h4>
          ),
          // Custom list styles
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 my-3 text-sm text-slate-700 dark:text-slate-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 my-3 text-sm text-slate-700 dark:text-slate-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">
              {children}
            </li>
          ),
          // Custom paragraph styles
          p: ({ children }) => (
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed my-2">
              {children}
            </p>
          ),
          // Custom code styles
            code: ({ children, className }) => {
            const isInline = !className?.includes('language-');
            if (isInline) {
              return (
                <code className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs font-mono overflow-x-auto">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 p-3 rounded text-xs font-mono overflow-x-auto my-3">
              {children}
            </pre>
          ),
          // Custom blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-3 bg-blue-50 dark:bg-blue-900/20 text-slate-700 dark:text-slate-300">
              {children}
            </blockquote>
          ),
          // Custom strong/bold styles
          strong: ({ children }) => (
            <strong className="font-semibold text-slate-900 dark:text-slate-100">
              {children}
            </strong>
          ),
          // Custom emphasis styles
          em: ({ children }) => (
            <em className="italic text-slate-800 dark:text-slate-200">
              {children}
            </em>
          ),
          // Custom link styles
          a: ({ children, href }) => (
            <a 
              href={href} 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          // Custom horizontal rule
          hr: () => (
            <hr className="border-gray-300 dark:border-gray-600 my-4" />
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
