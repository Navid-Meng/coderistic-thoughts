import React, { useState, useEffect } from 'react';
import { BlogPost, UIStrings, ThemeMode, Language } from '../types';
import { OpenRouter } from "@openrouter/sdk";

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
    setWisdom(""); // Reset wisdom for streaming
    try {
      // @ts-ignore - process.env is injected via vite.config.ts
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
      
      if (!apiKey || apiKey === "undefined") {
        throw new Error("OpenRouter API Key is missing. Please add OPENROUTER_API_KEY to your .env file.");
      }

      const openrouter = new OpenRouter({ apiKey });

      const stream = await openrouter.chat.send({
        model: "nex-agi/deepseek-v3.1-nex-n1:free",
        messages: [
          {
            role: "user",
            content: `Provide a powerful wisdom from the most popular quote in the world (unique and not cliche). Respond in ${lang === 'en' ? 'English' : 'Khmer'} with a poetic, short, and profound sentence. Don't include any additional text or explanation.`
          }
        ],
        stream: true
      });

      let fullText = "";
      for await (const chunk of (stream as any)) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          fullText += content;
          setWisdom(fullText);
        }
      }
      
      if (!fullText) {
        setWisdom(lang === 'kh' ? "ភាពស្ងប់ស្ងាត់គឺជាប្រាជ្ញាពិត" : "Silence is the truest wisdom.");
      }
    } catch (err: any) {
      console.error("OpenRouter API Error:", err);
      if (err.message) console.error("Error Message:", err.message);
      setWisdom(lang === 'kh' ? "ពេលកំហឹងកើតមាន សូមគិតពីផលលំបាក" : "When you are in a hole, stop digging.");
    } finally {
      setLoadingWisdom(false);
    }
  };

  const renderMarkdown = (raw: string) => {
    return raw.split('\n').map((line, i) => {
      if (line.startsWith('# ')) return <h1 key={i} className="text-3xl sm:text-4xl font-serif font-bold opacity-100 mt-8 mb-6 leading-tight">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={i} className="text-xl sm:text-2xl font-serif font-bold opacity-90 mt-8 mb-4 leading-snug">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-lg sm:text-xl font-serif font-bold opacity-80 mt-6 mb-3">{line.replace('### ', '')}</h3>;
      if (line.startsWith('> ')) return <blockquote key={i} className="border-l-2 border-red-900/60 pl-4 sm:pl-6 italic opacity-80 my-6 py-2 text-base sm:text-lg">{line.replace('> ', '')}</blockquote>;
      if (line.trim() === '') return <div key={i} className="h-4" />;
      return <p key={i} className="opacity-90 leading-relaxed mb-4 text-base font-normal">{line}</p>;
    });
  };

  const cardBg = theme === 'dark' ? 'bg-zinc-900/40' : theme === 'light' ? 'bg-zinc-100' : 'bg-[#f5ebd1]';

  return (
    <div className="max-w-2xl mx-auto px-1">
      <button 
        onClick={onBack}
        className="group flex items-center space-x-2 opacity-60 hover:opacity-100 hover:text-red-700 transition-all mb-8 sm:mb-12 text-[10px] font-mono uppercase tracking-widest"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
        <span>{t.return}</span>
      </button>

      <header className="mb-12 sm:mb-16">
        <div className="flex items-center space-x-3 sm:space-x-4 text-[9px] sm:text-[10px] font-mono opacity-60 mb-4 sm:mb-6 uppercase tracking-widest">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-red-900" />
          <span>{post.readingTime}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold opacity-100 leading-tight mb-6 sm:mb-8">
          {lang === 'kh' ? post.title_kh : post.title}
        </h1>
        <div className="h-px w-20 bg-red-900/40" />
      </header>

      <article className="font-serif animate-in fade-in duration-1000">
        {loadingContent ? (
          <div className="space-y-4 opacity-30">
            <div className="h-4 w-full bg-current rounded" />
            <div className="h-4 w-5/6 bg-current rounded" />
            <div className="h-4 w-4/6 bg-current rounded" />
          </div>
        ) : renderMarkdown(content)}
      </article>

      {!loadingContent && (
        <div className="mt-16 sm:mt-24 pt-12 border-t border-zinc-900/10">
          <div className={`${cardBg} rounded-2xl p-6 sm:p-8 border border-red-900/20 shadow-[0_0_50px_-12px_rgba(185,28,28,0.1)] text-center`}>
            {!wisdom ? (
              <div className="space-y-4">
                <p className="opacity-60 italic text-sm font-serif">A fragment of contemplation...</p>
                <button 
                  onClick={fetchWisdom}
                  disabled={loadingWisdom}
                  className="group inline-flex flex-col items-center space-y-3 focus:outline-none"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-red-900/40 flex items-center justify-center transition-all ${loadingWisdom ? 'animate-spin border-red-600' : 'group-hover:scale-110 group-hover:border-red-600'}`}>
                    <span className="text-xl">✧</span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase opacity-70 group-hover:opacity-100 group-hover:text-red-700 transition-all">
                    {loadingWisdom ? 'Consulting...' : t.wisdomButton}
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-1000">
                 <p className="text-xl sm:text-2xl font-serif italic opacity-100 leading-relaxed">
                  "{wisdom}"
                 </p>
                 <p className="text-[9px] sm:text-[10px] font-mono opacity-50 uppercase tracking-widest">— The Sage's Reflection</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
