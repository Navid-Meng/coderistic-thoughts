
export interface BlogPost {
  id: string;
  title: string;
  title_kh: string;
  date: string;
  readingTime: string;
  excerpt: string;
  excerpt_kh: string;
  contentUrl: string;    // Path to English markdown file
  contentUrlKh: string;  // Path to Khmer markdown file
  tags: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  type: 'public' | 'private';
}

export type ThemeMode = 'dark' | 'light' | 'heavenly';
export type Language = 'en' | 'kh';

export type ViewState = 'essays' | 'persona' | { type: 'post', postId: string };

export interface UIStrings {
  essays: string;
  persona: string;
  searchPlaceholder: string;
  searchShortcut: string;
  noResults: string;
  wisdomButton: string;
  return: string;
  fragmentsTitle: string;
  introText: string;
  branding: string;
  privateSignal: string;
  backToTop: string;
}
