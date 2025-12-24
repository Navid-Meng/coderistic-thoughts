
import React from 'react';
import { BlogPost, UIStrings, Language } from '../types';

interface EssaysListProps {
  posts: BlogPost[];
  onPostSelect: (id: string) => void;
  t: UIStrings;
  lang: Language;
}

const EssaysList: React.FC<EssaysListProps> = ({ posts, onPostSelect, t, lang }) => {
  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Modern Minimalist Hero */}
      <header className="relative py-12 sm:py-20 flex flex-col items-start overflow-hidden">
        {/* Subtle Background Decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-800/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-top-4 duration-1000 ease-out">
          <div className="flex items-center space-x-3 opacity-30">
            <span className="h-px w-8 bg-current" />
            <span className="text-[9px] sm:text-[10px] font-mono font-kantumruy uppercase tracking-[0.4em]">
              {lang === 'en' ? 'Established in the Void' : 'បង្កើតឡើងក្នុងភាពទទេ'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold italic tracking-tight leading-[1.1] max-w-xl">
            {t.fragmentsTitle}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <p className="opacity-50 text-base sm:text-lg leading-relaxed max-w-md font-serif italic">
              {t.introText}
            </p>
            <div className="hidden sm:block h-12 w-px bg-red-900/10" />
            <div className="flex flex-col space-y-1">
              <span className="text-[8px] font-mono uppercase tracking-widest opacity-30">Status</span>
              <span className="text-[10px] font-mono font-kantumruy uppercase tracking-widest opacity-60 flex items-center">
                <span className="w-1 h-1 rounded-full bg-red-600 animate-pulse mr-2" />
                {lang === 'en' ? 'Reflecting' : 'កំពុងឆ្លុះបញ្ចាំង'}
              </span>
            </div>
          </div>
        </div>

        {/* The Wisdom Line */}
        <div className="mt-12 sm:mt-16 w-full h-px bg-gradient-to-r from-red-900/20 via-red-900/5 to-transparent animate-in slide-in-from-left duration-1000 delay-300" />
      </header>

      {/* Blog Feed */}
      <div className="space-y-12 sm:space-y-16">
        {posts.map((post, idx) => (
          <article 
            key={post.id} 
            className={`group cursor-pointer border-l-2 border-transparent hover:border-red-900/30 pl-4 sm:pl-8 transition-all duration-700 animate-in fade-in slide-in-from-bottom-4`}
            style={{ animationDelay: `${(idx + 1) * 150}ms` }}
            onClick={() => onPostSelect(post.id)}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3 sm:space-x-4 text-[9px] sm:text-[10px] font-mono opacity-30 uppercase tracking-widest group-hover:opacity-50 transition-opacity">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-red-900/40" />
                <span>{post.readingTime}</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-serif opacity-70 group-hover:opacity-100 group-hover:text-red-800/90 transition-all duration-500 leading-snug">
                {lang === 'kh' ? post.title_kh : post.title}
              </h2>
              
              <p className="opacity-40 leading-relaxed text-sm sm:text-base max-w-xl group-hover:opacity-60 transition-opacity font-serif italic">
                {lang === 'kh' ? post.excerpt_kh : post.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map(tag => (
                  <span key={tag} className="text-[8px] sm:text-[9px] font-mono px-3 py-1 rounded-full border border-zinc-500/5 bg-zinc-500/5 opacity-30 group-hover:opacity-50 group-hover:border-red-900/10 transition-all lowercase tracking-wider">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* End of Feed Signal */}
      <div className="pt-12 text-center opacity-10">
        <span className="text-[9px] font-mono uppercase tracking-[1em]">{lang === 'en' ? 'FINIS' : 'ចប់'}</span>
      </div>
    </div>
  );
};

export default EssaysList;
