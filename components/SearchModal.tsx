
import React, { useEffect, useRef } from 'react';
import { BlogPost, UIStrings, ThemeMode, Language } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  results: BlogPost[];
  onSelect: (id: string) => void;
  t: UIStrings;
  theme: ThemeMode;
  lang: Language;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, searchQuery, setSearchQuery, results, onSelect, t, theme, lang }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const bgOverlay = theme === 'dark' ? 'bg-black/60' : 'bg-white/40';
  const containerBg = theme === 'dark' ? 'bg-[#1a1a1a] border-zinc-800' : theme === 'heavenly' ? 'bg-[#f5ebd1] border-[#e2d6b5]' : 'bg-white border-zinc-200';
  const textPrimary = theme === 'dark' ? 'text-zinc-100' : 'text-zinc-900';

  return (
    <div className={`fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-300`}>
      <div className={`absolute inset-0 backdrop-blur-sm ${bgOverlay}`} onClick={onClose} />
      
      <div className={`relative w-full max-w-xl ${containerBg} border rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-top-4 duration-500`}>
        <div className="p-4 border-b border-inherit flex items-center space-x-4">
          <div className="text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input 
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className={`flex-grow bg-transparent border-none focus:outline-none text-lg font-mono ${textPrimary} placeholder:text-zinc-500/50`}
          />
          <button 
            onClick={onClose}
            className="text-[10px] font-mono border border-zinc-500/20 px-1.5 py-0.5 rounded opacity-40 hover:opacity-100 transition-opacity"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {results.length > 0 ? (
            <div className="p-2 space-y-1">
              {!searchQuery && (
                <div className="px-4 py-2 text-[10px] font-mono uppercase tracking-[0.3em] opacity-30">
                  Showing All Fragments
                </div>
              )}
              {results.map((post) => (
                <button
                  key={post.id}
                  onClick={() => onSelect(post.id)}
                  className="w-full text-left p-4 rounded-xl hover:bg-red-900/5 group transition-all flex flex-col space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <span className={`font-serif font-bold ${textPrimary} group-hover:text-red-700 transition-colors`}>
                      {lang === 'kh' ? post.title_kh : post.title}
                    </span>
                    <span className="text-[10px] font-mono opacity-30 shrink-0 ml-4">{post.readingTime}</span>
                  </div>
                  <p className="text-xs opacity-50 line-clamp-1">
                    {lang === 'kh' ? post.excerpt_kh : post.excerpt}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center opacity-40 font-serif italic">
              {t.noResults}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-inherit bg-black/5 flex justify-between items-center text-[9px] font-mono uppercase tracking-widest opacity-40">
          <div className="flex space-x-4">
            <span>Enter to select</span>
            <span>Esc to close</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="h-1 w-1 rounded-full bg-red-800" />
            <span>Coderistic Wisdom</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
