import React from 'react';
import { LatexTemplate } from '../types';
import katex from 'katex';

interface ToolbarProps {
  templates: LatexTemplate[];
  selectedId: string | null;
  onSelect: (template: LatexTemplate) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ templates, selectedId, onSelect }) => {
  const renderMiniPreview = (code: string) => {
    try {
      return katex.renderToString(code, {
        throwOnError: false,
        displayMode: false,
        output: 'html',
      });
    } catch {
      return code;
    }
  };

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
      {templates.map((template) => {
        const isSelected = selectedId === template.id;
        return (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={`
              shrink-0 p-3 rounded-lg border transition-all duration-200
              ${isSelected
                ? 'bg-blue-500/10 border-blue-500 shadow-lg'
                : 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-600 hover:-translate-y-0.5'
              }
            `}
          >
            <div className="text-xs font-semibold text-neutral-100 mb-1">{template.name}</div>
            <div
              className="text-xs text-neutral-400 scale-75"
              dangerouslySetInnerHTML={{ __html: renderMiniPreview(template.code) }}
            />
          </button>
        );
      })}
    </div>
  );
};
