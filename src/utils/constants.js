import axios from 'axios';

export const navLinks = [
  { label: 'Home', id: 'home', href: '/#home' },
  { label: 'Services', id: 'services', href: '/#services' },
  { label: 'Portfolio', id: 'portfolio', href: '/#portfolio' },
  { label: 'About', id: 'about', href: '/#about' },
  { label: 'Testimonials', id: 'testimonials', href: '/#testimonials' },
  { label: 'Journal', id: 'journal', href: '/#journal' },
  { label: 'Contact', id: 'contact', href: '/#contact' },
];

export const services = [
  {
    title: 'Graphic Designing',
    slug: 'graphic-design',
    description:
      'Identity systems, campaign visuals, pitch decks, and content assets designed to convert attention into action.',
  },
  {
    title: 'Branding',
    slug: 'branding',
    description:
      'Positioning, naming, visual systems, and launch narratives that help ambitious brands feel unmistakable.',
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    description:
      'High-performance web builds with immersive motion, strong UX, and flexible CMS-ready architecture.',
  },
  {
    title: 'Web Designing',
    slug: 'web-design',
    description:
      'Modern interface design, prototype systems, and responsive digital experiences with premium polish.',
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description:
      'Full-funnel campaign strategy, paid media concepts, social content, and growth-focused analytics.',
  },
  {
    title: 'Video Editing',
    slug: 'video-editing',
    description:
      'Short-form edits, launch films, motion graphics, and cinematic storytelling tailored for modern platforms.',
  },
];

export const portfolioItems = [
  { title: 'Aether Cosmetics', category: 'Branding', accent: 'from-violet-400/70 via-fuchsia-500/40 to-transparent' },
  { title: 'Nova Commerce', category: 'Web', accent: 'from-purple-400/70 via-violet-500/40 to-transparent' },
  { title: 'Pulse Motion', category: 'Video', accent: 'from-fuchsia-400/70 via-purple-500/40 to-transparent' },
  { title: 'Altitude Labs', category: 'Marketing', accent: 'from-violet-400/70 via-purple-500/40 to-transparent' },
  { title: 'Orchid Ventures', category: 'Branding', accent: 'from-purple-400/70 via-fuchsia-500/40 to-transparent' },
  { title: 'Horizon Club', category: 'Web', accent: 'from-indigo-400/70 via-purple-500/40 to-transparent' },
  { title: 'Lumen Atelier', category: 'Graphic Design', accent: 'from-fuchsia-400/70 via-purple-500/40 to-transparent' },
];

export const testimonials = [
  {
    name: 'Amina Rahman',
    role: 'Founder, Nova Commerce',
    quote:
      'Unique Studios gave our brand a world-class digital presence. The launch site felt cinematic, clear, and conversion-ready.',
  },
  {
    name: 'Jason Park',
    role: 'Marketing Lead, Altitude Labs',
    quote:
      'Their team merged strategy, motion, and storytelling in a way that made our campaign feel far beyond a standard agency rollout.',
  },
  {
    name: 'Leena Das',
    role: 'Director, Aether Cosmetics',
    quote:
      'From identity to social content, everything looked cohesive and premium. The attention to detail was exceptional.',
  },
];

export const milestones = [
  { year: '2018', title: 'Founded', description: 'Unique Studios launched with a mission to merge visual storytelling with measurable growth.' },
  { year: '2020', title: 'Expansion', description: 'The studio grew into a multidisciplinary team handling brand, web, and campaign execution.' },
  { year: '2023', title: 'Global Reach', description: 'Projects expanded across international clients in lifestyle, tech, and premium sectors.' },
  { year: '2026', title: 'Immersive Future', description: 'The agency continues building interactive web experiences with motion-first creative systems.' },
];

export const blogPosts = [
  {
    title: 'How premium brands use motion to increase recall',
    tag: 'Strategy',
    excerpt:
      'Why cinematic movement, pacing, and digital texture matter more than ever in crowded categories.',
  },
  {
    title: 'The new standard for campaign landing pages',
    tag: 'Web Design',
    excerpt:
      'A look at structure, messaging, and interactions that make launch pages feel premium and perform well.',
  },
  {
    title: 'Designing creative systems instead of one-off assets',
    tag: 'Branding',
    excerpt:
      'How to move from isolated visuals to scalable brand ecosystems that remain consistent across channels.',
  },
];

export const homeSectionIds = navLinks.map((link) => link.id);

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
});
