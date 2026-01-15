import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded">
      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
      <div>
        <p className="font-medium">LaTeX Rendering Error</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    </div>
  );
};
