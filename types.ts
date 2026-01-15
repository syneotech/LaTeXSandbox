export interface LatexTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  category: 'algebra' | 'calculus' | 'linear-algebra' | 'statistics';
}

export type Theme = 'light' | 'dark';

export type ExportFormat = 'png' | 'svg' | 'clipboard';
