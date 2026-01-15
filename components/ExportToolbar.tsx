import React, { useState } from 'react';
import { Download, Copy, FileImage } from 'lucide-react';
import { Button } from './Button';
import { exportToPng, exportToSvg, copyToClipboard } from '../utils/exportUtils';

interface ExportToolbarProps {
  latexCode: string;
  renderElement: HTMLElement | null;
}

export const ExportToolbar: React.FC<ExportToolbarProps> = ({ latexCode, renderElement }) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPng = async () => {
    if (!renderElement) return;
    setIsExporting(true);
    try {
      const blob = await exportToPng(renderElement);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `latex-export-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PNG export failed:', error);
      alert('Failed to export as PNG');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSvg = () => {
    setIsExporting(true);
    try {
      const blob = exportToSvg(latexCode);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `latex-export-${Date.now()}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('SVG export failed:', error);
      alert('Failed to export as SVG');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyImage = async () => {
    if (!renderElement) return;
    setIsExporting(true);
    try {
      await copyToClipboard(renderElement, latexCode, 'image');
      alert('Image copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy to clipboard');
    } finally {
      setIsExporting(false);
    }
  };

  const handleCopyText = async () => {
    setIsExporting(true);
    try {
      await copyToClipboard(null as any, latexCode, 'text');
      alert('LaTeX code copied to clipboard!');
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Failed to copy to clipboard');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="primary"
        size="sm"
        onClick={handleExportPng}
        isLoading={isExporting}
        disabled={!renderElement}
      >
        <Download className="w-4 h-4 mr-2" />
        PNG
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleExportSvg}
        isLoading={isExporting}
      >
        <FileImage className="w-4 h-4 mr-2" />
        SVG
      </Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={handleCopyImage}
        isLoading={isExporting}
        disabled={!renderElement}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy Image
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCopyText}
        isLoading={isExporting}
      >
        Copy Code
      </Button>
    </div>
  );
};
