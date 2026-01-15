import React from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-latex';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const highlight = (code: string) => {
    return Prism.highlight(code, Prism.languages.latex, 'latex');
  };

  return (
    <div className="h-full bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800">
      <Editor
        value={value}
        onValueChange={onChange}
        highlight={highlight}
        padding={16}
        className="font-mono text-sm min-h-full"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          backgroundColor: '#171717',
          color: '#EDEDED',
        }}
        textareaClassName="focus:outline-none"
      />
    </div>
  );
};
