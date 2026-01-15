import React from 'react';

interface RenderAreaProps {
  html: string;
}

export const RenderArea: React.FC<RenderAreaProps> = ({ html }) => {
  return (
    <div
      id="latex-render-area"
      className="p-8 bg-white dark:bg-neutral-900 rounded-lg min-h-[200px] flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
