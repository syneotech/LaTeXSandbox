import React from 'react';
import { CodeEditor } from './CodeEditor';
import { Toolbar } from './Toolbar';
import { LatexTemplate } from '../types';

interface EditorPaneProps {
  code: string;
  onChange: (code: string) => void;
  templates: LatexTemplate[];
  selectedTemplate: string | null;
  onTemplateSelect: (template: LatexTemplate) => void;
}

export const EditorPane: React.FC<EditorPaneProps> = ({
  code,
  onChange,
  templates,
  selectedTemplate,
  onTemplateSelect,
}) => {
  return (
    <div className="flex flex-col h-full gap-4">
      <div className="shrink-0">
        <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wide mb-3">
          LaTeX Code
        </h2>
        <Toolbar
          templates={templates}
          selectedId={selectedTemplate}
          onSelect={onTemplateSelect}
        />
      </div>
      <div className="flex-1 min-h-0">
        <CodeEditor value={code} onChange={onChange} />
      </div>
    </div>
  );
};
