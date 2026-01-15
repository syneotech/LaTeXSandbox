import React, { useMemo, useRef, useEffect } from 'react';
import katex from 'katex';
import { RenderArea } from './RenderArea';
import { ErrorDisplay } from './ErrorDisplay';
import { ExportToolbar } from './ExportToolbar';

interface PreviewPaneProps {
  code: string;
  onError: (error: string | null) => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ code, onError }) => {
  const renderRef = useRef<HTMLDivElement>(null);

  const renderResult = useMemo(() => {
    if (!code.trim()) {
      onError(null);
      return { html: '', error: null, isEmpty: true };
    }

    try {
      const html = katex.renderToString(code, {
        throwOnError: true,
        displayMode: true,
        output: 'html',
        strict: false,
      });
      onError(null);
      return { html, error: null, isEmpty: false };
    } catch (e: any) {
      const errorMsg = e.message || 'Invalid LaTeX syntax';
      onError(errorMsg);
      return { html: '', error: errorMsg, isEmpty: false };
    }
  }, [code, onError]);

  useEffect(() => {
    // Update ref when render changes
  }, [renderResult]);

  return (
    <div className="flex flex-col h-full p-4 gap-4">
      <div className="flex items-center justify-between shrink-0">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          Preview
        </h2>
        <ExportToolbar
          latexCode={code}
          renderElement={renderRef.current}
        />
      </div>

      <div className="flex-1 min-h-0 overflow-auto" ref={renderRef}>
        {renderResult.isEmpty ? (
          <div className="flex items-center justify-center h-full text-neutral-500 text-sm">
            Enter LaTeX code to preview
          </div>
        ) : renderResult.error ? (
          <ErrorDisplay error={renderResult.error} />
        ) : (
          <RenderArea html={renderResult.html} />
        )}
      </div>
    </div>
  );
};
