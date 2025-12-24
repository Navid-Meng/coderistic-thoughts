
import React, { useState, useEffect, useMemo } from 'react';
import { ViewState, ThemeMode, Language } from './types';
import { BLOG_POSTS, TRANSLATIONS } from './constants';
import Navbar from './components/Navbar';
import EssaysList from './components/EssaysList';
import PostDetail from './components/PostDetail';
import Persona from './components/Persona';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('essays');
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'persona') setCurrentView('persona');
      else if (hash.startsWith('post/')) setCurrentView({ type: 'post', postId: hash.split('/')[1] });
      else setCurrentView('essays');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);
    handleHashChange();
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateTo = (view: ViewState) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    if (view === 'essays') window.location.hash = '';
    else if (view === 'persona') window.location.hash = 'persona';
    else if (typeof view === 'object') window.location.hash = `post/${view.postId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return BLOG_POSTS; // Return all posts when query is empty
    return BLOG_POSTS.filter(post => {
      const q = searchQuery.toLowerCase();
      const title = lang === 'kh' ? post.title_kh : post.title;
      const excerpt = lang === 'kh' ? post.excerpt_kh : post.excerpt;
      return (
        title.toLowerCase().includes(q) ||
        excerpt.toLowerCase().includes(q) ||
        post.tags.some(tag => tag.toLowerCase().includes(q))
      );
    });
  }, [searchQuery, lang]);

  const themeColors = {
    dark: 'bg-[#121212] text-zinc-300',
    light: 'bg-[#fafaf9] text-zinc-700',
    heavenly: 'bg-[#fdf6e3] text-[#433422]'
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${themeColors[theme]} ${lang === 'kh' ? 'lang-kh' : ''}`}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full transition-opacity duration-1000 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-20'
        } bg-[radial-gradient(circle_at_top,_rgba(185,28,28,0.05)_0%,_transparent_60%)]`} />
      </div>
      
      <div className="relative z-10 flex flex-col flex-grow">
        <Navbar 
          currentView={currentView} 
          onNavigate={navigateTo} 
          theme={theme} 
          setTheme={setTheme}
          lang={lang}
          setLang={setLang}
          onOpenSearch={() => setIsSearchOpen(true)}
          t={t}
        />
        
        <main className="flex-grow w-full max-w-2xl mx-auto px-6 pt-32 sm:pt-40 pb-20">
          <div key={typeof currentView === 'string' ? currentView : 'post'} className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            {currentView === 'essays' && (
              <EssaysList posts={BLOG_POSTS} onPostSelect={(id) => navigateTo({ type: 'post', postId: id })} t={t} lang={lang} />
            )}
            {currentView === 'persona' && <Persona t={t} theme={theme} lang={lang} />}
            {typeof currentView === 'object' && (() => {
              const post = BLOG_POSTS.find(p => p.id === currentView.postId);
              return post ? <PostDetail post={post} onBack={() => navigateTo('essays')} t={t} theme={theme} lang={lang} /> : null;
            })()}
          </div>
        </main>

        <Footer theme={theme} />
      </div>

      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={filteredPosts}
        onSelect={(id) => navigateTo({ type: 'post', postId: id })}
        t={t}
        theme={theme}
        lang={lang}
      />
    </div>
  );
};

export default App;
