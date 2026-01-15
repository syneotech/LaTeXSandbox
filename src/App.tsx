import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { EditorPane } from '../components/EditorPane';
import { PreviewPane } from '../components/PreviewPane';
import { Theme, LatexTemplate } from '../types';
import { TEMPLATES } from '../templates';
import { useDebounce } from '../utils/useDebounce';

function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [rawCode, setRawCode] = useState<string>('E = mc^2');
  const [renderError, setRenderError] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Debounce code for rendering (300ms delay)
  const debouncedCode = useDebounce(rawCode, 300);

  // Initialize theme from system preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  // Update HTML class on theme change
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleTemplateSelect = (template: LatexTemplate) => {
    setRawCode(template.code);
    setSelectedTemplate(template.id);
    setRenderError(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex flex-col transition-colors duration-200">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* Left: Editor */}
          <EditorPane
            code={rawCode}
            onChange={setRawCode}
            templates={TEMPLATES}
            selectedTemplate={selectedTemplate}
            onTemplateSelect={handleTemplateSelect}
          />

          {/* Right: Preview */}
          <PreviewPane
            code={debouncedCode}
            onError={setRenderError}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
