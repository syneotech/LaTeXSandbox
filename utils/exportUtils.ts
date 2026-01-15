import html2canvas from 'html2canvas';
import katex from 'katex';

export async function exportToPng(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    backgroundColor: '#171717', // Charcoal background
    scale: 2, // Retina resolution
    logging: false,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to create PNG blob'));
      }
    }, 'image/png');
  });
}

export function exportToSvg(latexCode: string): Blob {
  const mathml = katex.renderToString(latexCode, {
    output: 'mathml',
    displayMode: true,
    throwOnError: false,
  });

  const svgWrapper = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="padding: 40px; background: #171717; color: #EDEDED;">
          ${mathml}
        </div>
      </foreignObject>
    </svg>
  `;

  return new Blob([svgWrapper], { type: 'image/svg+xml' });
}

export async function copyToClipboard(
  element: HTMLElement,
  latexCode: string,
  mode: 'image' | 'text'
): Promise<void> {
  if (mode === 'text') {
    await navigator.clipboard.writeText(latexCode);
  } else {
    const blob = await exportToPng(element);
    await navigator.clipboard.write([
      new ClipboardItem({ 'image/png': blob })
    ]);
  }
}
