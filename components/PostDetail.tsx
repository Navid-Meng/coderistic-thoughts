
import React, { useState, useEffect } from 'react';
import { BlogPost, UIStrings, ThemeMode, Language } from '../types';
import { GoogleGenAI } from "@google/genai";

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
  t: UIStrings;
  theme: ThemeMode;
  lang: Language;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack, t, theme, lang }) => {
  const [wisdom, setWisdom] = useState<string | null>(null);
  const [loadingWisdom, setLoadingWisdom] = useState(false);
  const [content, setContent] = useState<string>('');
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const fetchContent = async () => {
      setLoadingContent(true);
      try {
        const url = lang === 'kh' ? post.contentUrlKh : post.contentUrl;
        const res = await fetch(url, { signal: controller.signal });
        const text = await res.text();
        setContent(text);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error("Failed to load markdown:", err);
          setContent("Failed to load the fragment from the void.");
        }
      } finally {
        setLoadingContent(false);
      }
    };

    fetchContent();
    return () => controller.abort();
  }, [post, lang]);

  const fetchWisdom = async () => {
    setLoadingWisdom(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on the following blog post content, provide a single, powerful "Pearl of Wisdom" in one sentence that a 100-year-old philosopher might say to a young coder. 
        Post Title: ${lang === 'kh' ? post.title_kh : post.title}
        Content: ${content}`,
        config: {
          temperature: 0.8,
          systemInstruction: `You are an ancient, tech-savvy sage. Respond in ${lang === 'en' ? 'English' : 'Khmer'} with a poetic, short, and profound sentence.`
        }
      });
      setWisdom(response.text?.trim() || (lang === 'kh' ? "ភាពស្ងប់ស្ងាត់គឺជាប្រាជ្ញាពិត។" : "Silence is the truest wisdom."));
    } catch (err) {
      console.error(err);
      setWisdom(lang === 'kh' ? "ប្រាជ្ញាត្រូវបានរកឃើញនៅខាងក្នុង មិនមែននៅក្នុងម៉ាស៊ីនទេ។" : "Wisdom is found within, not in the machine.");
    } finally {
      setLoadingWisdom(false);
    }
  };

  const renderMarkdown = (raw: string) => {
    return raw.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl sm:text-4xl font-serif font-bold opacity-90 mt-8 mb-6 leading-tight">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl sm:text-2xl font-serif font-bold opacity-80 mt-8 mb-4 leading-snug">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg sm:text-xl font-serif font-bold opacity-70 mt-6 mb-3">{line.replace('### ', '')}</h3>;
      if (line.startsWith('> ')) return <blockquote key={i} className="border-l-2 border-red-900/40 pl-4 sm:pl-6 italic opacity-60 my-6 py-2 text-base sm:text-lg">{line.replace('> ', '')}</blockquote>;
      if (line.trim() === '') return <div key={i} className="h-4" />;
      return <p key={i} className="opacity-70 leading-relaxed mb-4 text-base sm:text-lg">{line}</p>;
    });
  };

  const cardBg = theme === 'dark' ? 'bg-zinc-900/20' : theme === 'light' ? 'bg-zinc-100' : 'bg-[#f5ebd1]';

  return (
    <div className="max-w-2xl mx-auto px-1">
      <button 
        onClick={onBack}
        className="group flex items-center space-x-2 opacity-50 hover:opacity-100 hover:text-red-700 transition-all mb-8 sm:mb-12 text-[10px] font-mono uppercase tracking-widest"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
        <span>{t.return}</span>
      </button>

      <header className="mb-12 sm:mb-16">
        <div className="flex items-center space-x-3 sm:space-x-4 text-[9px] sm:text-[10px] font-mono opacity-40 mb-4 sm:mb-6 uppercase tracking-widest">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-red-900" />
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold opacity-90 leading-tight mb-6 sm:mb-8">
          {lang === 'kh' ? post.title_kh : post.title}
        </h1>
        <div className="h-px w-20 bg-red-900/20" />
      </header>

      <article className="font-serif animate-in fade-in duration-1000">
        {loadingContent ? (
          <div className="space-y-4 opacity-20">
            <div className="h-4 w-full bg-current rounded" />
            <div className="h-4 w-5/6 bg-current rounded" />
            <div className="h-4 w-4/6 bg-current rounded" />
          </div>
        ) : renderMarkdown(content)}
      </article>

      {!loadingContent && (
        <div className="mt-16 sm:mt-24 pt-12 border-t border-zinc-900/10">
          <div className={`${cardBg} rounded-2xl p-6 sm:p-8 border border-red-900/10 shadow-[0_0_50px_-12px_rgba(185,28,28,0.05)] text-center`}>
            {!wisdom ? (
              <div className="space-y-4">
                <p className="opacity-40 italic text-sm font-serif">A fragment of contemplation...</p>
                <button 
                  onClick={fetchWisdom}
                  disabled={loadingWisdom}
                  className="group inline-flex flex-col items-center space-y-3 focus:outline-none"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-red-900/30 flex items-center justify-center transition-all ${loadingWisdom ? 'animate-spin border-red-600' : 'group-hover:scale-110 group-hover:border-red-600'}`}>
                    <span className="text-xl">✧</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase opacity-60 group-hover:opacity-100 group-hover:text-red-700 transition-all">
                    {loadingWisdom ? 'Consulting...' : t.wisdomButton}
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                 <p className="text-xl sm:text-2xl font-serif italic opacity-90 leading-relaxed">
                  "{wisdom}"
                 </p>
                 <p className="text-[9px] sm:text-[10px] font-mono opacity-40 uppercase tracking-widest">— The Sage's Reflection</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
