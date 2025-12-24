
import React, { useState } from 'react';
import { ViewState, ThemeMode, Language, UIStrings } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  lang: Language;
  setLang: (l: Language) => void;
  onOpenSearch: () => void;
  t: UIStrings;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, theme, setTheme, lang, setLang, onOpenSearch, t }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isEssays = currentView === 'essays' || (typeof currentView === 'object' && currentView.type === 'post');
  const isPersona = currentView === 'persona';

  const themeIcons = { dark: '❍', heavenly: '✧', light: '◌' };
  const themes: ThemeMode[] = ['dark', 'heavenly', 'light'];

  const borderColor = theme === 'dark' ? 'border-zinc-800' : 'border-zinc-200';
  const textAccent = theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900';
  const textMuted = theme === 'dark' ? 'text-zinc-500' : 'text-zinc-400';
  const overlayBg = theme === 'dark' ? 'bg-[#121212]/95' : theme === 'heavenly' ? 'bg-[#fdf6e3]/95' : 'bg-[#fafaf9]/95';

  const handleMobileNavigate = (view: ViewState) => {
    onNavigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 py-4 sm:py-6 px-4 sm:px-6 backdrop-blur-md border-b ${borderColor} transition-all duration-500 mobile-nav-blur font-kantumruy`}>
        <div className="max-w-2xl mx-auto flex justify-between items-center">
          <button onClick={() => onNavigate('essays')} className="group flex items-center space-x-2 shrink-0">
            <span className={`text-lg sm:text-xl font-serif font-bold tracking-tight ${textAccent} group-hover:text-red-700 transition-colors`}>
              Coderistic
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-pulse hidden sm:inline-block" />
          </button>

          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 text-[10px] font-mono tracking-widest uppercase">
              <div className="flex space-x-4">
                <button 
                  onClick={() => onNavigate('essays')}
                  className={`transition-colors hover:text-red-700 ${isEssays ? textAccent : textMuted}`}
                >
                  {t.essays}
                </button>
                <button 
                  onClick={() => onNavigate('persona')}
                  className={`transition-colors hover:text-red-700 ${isPersona ? textAccent : textMuted}`}
                >
                  {t.persona}
                </button>
              </div>
              
              <div className="flex items-center space-x-4 border-l pl-4 border-zinc-800/20">
                <div className="flex items-center space-x-2">
                  {themes.map(m => (
                    <button 
                      key={m} 
                      onClick={() => setTheme(m)}
                      title={m.charAt(0).toUpperCase() + m.slice(1)}
                      className={`text-lg transition-all p-1 leading-none ${theme === m ? 'text-red-600 scale-110 drop-shadow-[0_0_8px_rgba(220,38,38,0.3)]' : 'text-zinc-400 hover:text-zinc-600'}`}
                    >
                      {themeIcons[m]}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={() => setLang(lang === 'en' ? 'kh' : 'en')}
                  className="px-2 py-1 rounded border border-zinc-500/20 hover:border-red-600/50 transition-colors shrink-0 font-bold"
                >
                  {lang === 'en' ? 'EN' : 'KH'}
                </button>
              </div>
            </div>

            {/* Always Visible Search */}
            <button 
              onClick={onOpenSearch}
              className={`p-2 ${textMuted} hover:text-red-700 transition-colors`}
              title={t.searchShortcut}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className={`md:hidden p-2 ${textMuted} hover:text-red-700 transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute inset-0 backdrop-blur-xl ${overlayBg}`} />
        <div className="relative h-full flex flex-col items-center justify-center p-8 space-y-12 font-kantumruy">
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-4 text-zinc-500 hover:text-red-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
          </button>

          <div className="flex flex-col items-center space-y-8">
            <button 
              onClick={() => handleMobileNavigate('essays')}
              className={`text-3xl font-serif italic ${isEssays ? 'text-red-800 font-bold' : textMuted}`}
            >
              {t.essays}
            </button>
            <button 
              onClick={() => handleMobileNavigate('persona')}
              className={`text-3xl font-serif italic ${isPersona ? 'text-red-800 font-bold' : textMuted}`}
            >
              {t.persona}
            </button>
          </div>

          <div className="w-full max-w-xs h-px bg-zinc-500/10" />

          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center space-x-8">
              {themes.map(m => (
                <button 
                  key={m} 
                  onClick={() => setTheme(m)}
                  className={`text-4xl transition-all ${theme === m ? 'text-red-600 scale-125' : 'text-zinc-500'}`}
                >
                  {themeIcons[m]}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setLang(lang === 'en' ? 'kh' : 'en')}
              className={`text-xl font-mono tracking-[0.2em] px-6 py-2 rounded-full border border-red-900/20 ${textAccent}`}
            >
              {lang === 'en' ? 'ENGLISH' : 'KHMER'}
            </button>
          </div>

          <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-30 mt-auto">
            Coderistic — {lang === 'en' ? 'Digital Sanctuary' : 'ទីសក្ការៈឌីជីថល'}
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
