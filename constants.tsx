
import { BlogPost, SocialLink, UIStrings } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'the-art-of-quiet-code',
    title: 'The Art of Quiet Code',
    title_kh: 'សិល្បៈនៃកូដដ៏ស្ងប់ស្ងាត់',
    date: 'Autumn Equinox, 2024',
    readingTime: '6 min read',
    excerpt: 'In an era of noise, the most profound engineering often lies in what we choose not to build.',
    excerpt_kh: 'នៅក្នុងសម័យកាលនៃសំឡេងរំខាន វិស្វកម្មដែលស៊ីជម្រៅបំផុតជារឿយៗស្ថិតនៅក្នុងអ្វីដែលយើងជ្រើសរើសមិនបង្កើត។',
    tags: ['engineering', 'minimalism', 'philosophy'],
    contentUrl: 'contents/quiet-code-en.md',
    contentUrlKh: 'contents/quiet-code-kh.md'
  },
  {
    id: 'digital-stoicism',
    title: 'Digital Stoicism: Finding Peace in the Machine',
    title_kh: 'Digital Stoicism: ការស្វែងរកសន្តិភាពក្នុងម៉ាស៊ីន',
    date: 'Midsummer, 2024',
    readingTime: '4 min read',
    excerpt: 'How to maintain a soul in a world governed by algorithms and infinite scrolls.',
    excerpt_kh: 'របៀបរក្សាព្រលឹងនៅក្នុងពិភពលោកដែលគ្រប់គ្រងដោយ algorithms និងការអូសមើលមិនចេះចប់។',
    tags: ['stoicism', 'wellness', 'life'],
    contentUrl: 'contents/digital-stoicism-en.md',
    contentUrlKh: 'contents/digital-stoicism-kh.md'
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'YouTube', url: 'https://youtube.com/@coderistic', icon: 'youtube', type: 'public' },
  { name: 'Facebook', url: 'https://facebook.com/coderistic', icon: 'facebook', type: 'public' },
  { name: 'Telegram', url: 'https://t.me/coderistic', icon: 'send', type: 'public' },
  { name: 'Facebook (Personal)', url: 'https://facebook.com/mengnavid', icon: 'user', type: 'private' },
  { name: 'Telegram (Direct)', url: 'https://t.me/mengnavid', icon: 'message-circle', type: 'private' },
  { name: 'GitHub', url: 'https://github.com/mengnavid', icon: 'github', type: 'private' }
];

export const TRANSLATIONS: Record<'en' | 'kh', UIStrings> = {
  en: {
    essays: 'Essays',
    persona: 'Persona',
    searchPlaceholder: 'Search fragments...',
    searchShortcut: 'Press ⌘K to search',
    noResults: 'No fragments found in the void.',
    wisdomButton: 'Seek Wisdom',
    return: 'Return',
    fragmentsTitle: 'Fragments of silence in a world of code.',
    introText: 'A digital sanctuary for engineering philosophy and timeless reflections.',
    branding: 'Branding',
    privateSignal: 'Private Signal',
    backToTop: 'Back to Top'
  },
  kh: {
    essays: 'អត្ថបទ',
    persona: 'អំពីខ្ញុំ',
    searchPlaceholder: 'ស្វែងរក...',
    searchShortcut: 'ចុច ⌘K ដើម្បីស្វែងរក',
    noResults: 'មិនមានលទ្ធផលនៅក្នុងភាពទទេឡើយ។',
    wisdomButton: 'ស្វែងរកប្រាជ្ញា',
    return: 'ត្រឡប់ក្រោយ',
    fragmentsTitle: 'បំណែកនៃភាពស្ងប់ស្ងាត់ក្នុងលោកនៃកូដ។',
    introText: 'ទីសក្ការៈឌីជីថលសម្រាប់ទស្សនវិជ្ជាវិស្វកម្ម និងការឆ្លុះបញ្ចាំងមិនចេះរីងស្ងួត។',
    branding: 'ម៉ាកយីហោ',
    privateSignal: 'ទំនាក់ទំនងឯកជន',
    backToTop: 'ទៅកាន់ផ្នែកខាងលើ'
  }
};
