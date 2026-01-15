import { LatexTemplate } from './types';

export const TEMPLATES: LatexTemplate[] = [
  {
    id: 'quadratic',
    name: 'Quadratic Formula',
    description: 'Standard form solution',
    code: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
    category: 'algebra',
  },
  {
    id: 'integral',
    name: 'Definite Integral',
    description: 'Integration notation',
    code: '\\int_{a}^{b} f(x) \\, dx',
    category: 'calculus',
  },
  {
    id: 'matrix',
    name: '2x2 Matrix',
    description: 'Matrix notation',
    code: '\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}',
    category: 'linear-algebra',
  },
  {
    id: 'summation',
    name: 'Summation',
    description: 'Sum notation',
    code: '\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}',
    category: 'algebra',
  },
  {
    id: 'gaussian',
    name: 'Gaussian Distribution',
    description: 'Normal distribution PDF',
    code: 'f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}',
    category: 'statistics',
  },
];
