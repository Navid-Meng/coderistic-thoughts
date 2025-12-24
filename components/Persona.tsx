
import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { UIStrings, ThemeMode, Language } from '../types';

interface PersonaProps {
  t: UIStrings;
  theme: ThemeMode;
  lang: Language;
}

const Persona: React.FC<PersonaProps> = ({ t, theme, lang }) => {
  const publicLinks = SOCIAL_LINKS.filter(l => l.type === 'public');
  const privateLinks = SOCIAL_LINKS.filter(l => l.type === 'private');

  const cardHover = theme === 'dark' ? 'hover:bg-zinc-900/60 hover:border-zinc-800' : 'hover:bg-zinc-100 hover:border-zinc-200';
  const textMuted = theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500';

  return (
    <div className="space-y-16 sm:space-y-20">
      <section className="flex flex-col md:flex-row gap-8 sm:gap-12 items-center text-center md:text-left">
        <div className="flex-shrink-0 relative group">
          <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-3xl overflow-hidden grayscale contrast-125 border border-red-900/30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out">
            <img 
              src="https://picsum.photos/seed/meng/300/300" 
              alt="Meng Navid" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-red-800 rounded-full border-4 transition-colors" style={{ borderColor: theme === 'dark' ? '#121212' : theme === 'light' ? '#fafaf9' : '#fdf6e3' }} />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight opacity-100 italic">
            Meng Navid.
          </h1>
          <p className="opacity-90 text-base sm:text-lg leading-relaxed max-w-xl">
            {t.introText} <span className="text-red-700 font-bold">Coderistic</span> is a sanctuary built to bridge silicon logic with human philosophy.
          </p>
          <div className={`flex flex-col space-y-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] ${textMuted}`}>
            <p className="opacity-80">{lang === 'kh' ? '"វិស្វកម្មគឺជាអាល់ឃីមីនៃយុគសម័យរបស់យើង។"' : '"Engineering is the alchemy of our age."'}</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 pt-12 border-t border-zinc-500/20">
        <div>
          <h3 className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] opacity-60 mb-6 sm:mb-8 flex items-center">
            {t.branding}
            <span className="ml-4 h-px flex-grow bg-zinc-500/20" />
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {publicLinks.map(link => (
              <li key={link.name}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all border border-transparent ${cardHover}`}
                >
                  <span className="opacity-80 group-hover:opacity-100 group-hover:text-red-700 transition-colors font-medium text-sm sm:text-base">{link.name}</span>
                  <span className="opacity-0 group-hover:opacity-60 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10M7 17 17 7"/></svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] opacity-60 mb-6 sm:mb-8 flex items-center">
            {t.privateSignal}
            <span className="ml-4 h-px flex-grow bg-zinc-500/20" />
          </h3>
          <ul className="space-y-2 sm:space-y-3">
            {privateLinks.map(link => (
              <li key={link.name}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between p-3 sm:p-4 rounded-xl transition-all border border-transparent ${cardHover}`}
                >
                  <span className="opacity-80 group-hover:opacity-100 group-hover:text-red-700 transition-colors font-medium text-sm sm:text-base">{link.name}</span>
                  <span className="opacity-0 group-hover:opacity-60 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10M7 17 17 7"/></svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pt-16 sm:pt-20 text-center opacity-40">
        <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.4em]">
          {lang === 'kh' ? 'បញ្ចប់ការផ្សាយ' : 'End of transmission'}
        </p>
      </section>
    </div>
  );
};

export default Persona;
