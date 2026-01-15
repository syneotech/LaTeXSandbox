import React from 'react';
import { ShieldCheck, Moon, Sun } from 'lucide-react';
import { Theme } from '../types';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: SyneoTech Brand */}
        <a
          href="https://syneo.tech"
          className="text-lg font-bold tracking-tighter text-white hover:text-neutral-300 transition-colors"
        >
          SyneoTech
        </a>

        {/* Center: Tool Name */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center hidden sm:block">
          <h1 className="text-lg font-bold tracking-tight text-white">
            LaTeX Sandbox
          </h1>
        </div>

        {/* Right: Privacy Badge + Theme Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-green-900/20 text-green-400 rounded-full border border-green-800 text-xs font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Private</span>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};
