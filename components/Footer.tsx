
import React from 'react';
import { ThemeMode } from '../types';

interface FooterProps {
  theme: ThemeMode;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full max-w-2xl mx-auto px-6 py-12 sm:py-16 flex flex-col items-center justify-center space-y-6 sm:space-y-8 border-t border-zinc-500/10">
      <button 
        onClick={scrollToTop}
        className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] opacity-40 hover:opacity-100 hover:text-red-800 transition-all focus:outline-none"
      >
        ↑ Back to Top
      </button>

      <div className="flex items-center space-x-4">
        <span className="h-px w-6 sm:w-8 bg-red-900/20" />
        <span className="text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.4em] opacity-40 text-center">
          Coderistic — A Digital Sanctuary
        </span>
        <span className="h-px w-6 sm:w-8 bg-red-900/20" />
      </div>

      <div className="text-center space-y-2">
        <p className="text-[9px] sm:text-[10px] font-mono opacity-30 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Meng Navid.
        </p>
        <p className="text-[8px] sm:text-[9px] font-serif italic opacity-20">
          Built for the soul, optimized for the spirit.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
