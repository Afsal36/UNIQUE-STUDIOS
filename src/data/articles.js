const createArticleImage = (title, accentStart, accentMiddle, accentEnd) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 960" fill="none">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="${accentStart}"/>
          <stop offset="0.5" stop-color="${accentMiddle}"/>
          <stop offset="1" stop-color="${accentEnd}"/>
        </linearGradient>
        <radialGradient id="r" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(1180 180) rotate(133) scale(540 420)">
          <stop stop-color="rgba(255,255,255,0.3)"/>
          <stop offset="1" stop-color="rgba(255,255,255,0)"/>
        </radialGradient>
      </defs>
      <rect width="1600" height="960" rx="40" fill="#090611"/>
      <rect width="1600" height="960" rx="40" fill="url(#g)" opacity="0.92"/>
      <circle cx="1260" cy="170" r="190" fill="url(#r)"/>
      <circle cx="260" cy="740" r="220" fill="rgba(255,255,255,0.08)"/>
      <rect x="112" y="110" width="136" height="136" rx="34" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.14)"/>
      <rect x="1228" y="676" width="180" height="180" rx="50" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
      <text x="112" y="660" fill="rgba(255,255,255,0.58)" font-size="28" font-family="Arial, sans-serif" letter-spacing="8">UNIQUE STUDIOS</text>
      <text x="112" y="748" fill="#FFFFFF" font-size="88" font-weight="700" font-family="Arial, sans-serif">${title}</text>
    </svg>
  `)}`;

export const articles = [
  {
    title: 'Design Trends 2026',
    slug: 'design-trends-2026',
    image: createArticleImage('Design Trends 2026', '#7B2CBF', '#5A189A', '#3C096C'),
    date: 'March 2026',
    readingTime: '6 min read',
    category: 'Design',
    excerpt: 'Discover the visual and interaction trends shaping premium digital design in 2026.',
    content: [
      'The most effective agency websites in 2026 are moving away from noisy interfaces and toward more intentional digital environments. Instead of overwhelming visitors with constant movement, the best teams are using rhythm, spacing, and restraint to make every interaction feel considered.',
      'Premium design on the web is increasingly defined by contrast. Bold editorial typography is being paired with quieter supporting copy, immersive gradients are being balanced with dark negative space, and motion is being used to direct attention rather than decorate every corner of the screen.',
      'For brands that want to feel premium, the real opportunity is not simply following trends. It is translating those visual shifts into a consistent system that reflects the brand point of view, improves clarity, and makes the overall experience feel more memorable from the first impression onward.',
    ],
  },
  {
    title: 'Building Modern Brands',
    slug: 'building-modern-brands',
    image: createArticleImage('Building Modern Brands', '#5A189A', '#3C096C', '#14061f'),
    date: 'February 2026',
    readingTime: '5 min read',
    category: 'Branding',
    excerpt: 'How strategic branding creates stronger positioning, trust, and long-term business value.',
    content: [
      'Modern branding is no longer limited to logos, color palettes, and type choices. It is now deeply connected to digital behavior, storytelling, product experience, and how a business presents itself at every stage of the customer journey.',
      'The strongest brands today are built from clarity. They know exactly how they want to be perceived, which emotional territory they want to own, and how to express that consistently across websites, campaigns, and content systems.',
      'When a brand identity is developed strategically, it makes every creative decision easier. Messaging becomes sharper, design becomes more cohesive, and marketing begins to work with greater confidence because the business is no longer guessing how it should look or sound.',
    ],
  },
  {
    title: 'Creative Marketing Strategies',
    slug: 'creative-marketing-strategies',
    image: createArticleImage('Creative Marketing Strategies', '#7B2CBF', '#3C096C', '#090611'),
    date: 'January 2026',
    readingTime: '7 min read',
    category: 'Marketing',
    excerpt: 'A smarter way to combine storytelling, design, and performance for stronger campaigns.',
    content: [
      'Creative marketing performs best when strategy and execution are inseparable. A campaign should not feel like a set of disconnected assets. It should feel like one coherent idea translated across channels with enough flexibility to adapt without losing impact.',
      'For growth-focused brands, visual quality still matters. Audiences make assumptions quickly, and campaign aesthetics can influence trust, perceived value, and how seriously a message is taken before a single line of copy is fully read.',
      'The most successful teams build campaigns with structure. They create adaptable creative systems, define a clear narrative, and pair strong visuals with measurable goals so that every launch feels premium while still being accountable to performance.',
    ],
  },
  {
    title: 'Launching High-Impact Agency Websites',
    slug: 'launching-high-impact-agency-websites',
    image: createArticleImage('Launching High-Impact Agency Websites', '#3C096C', '#5A189A', '#7B2CBF'),
    date: 'December 2025',
    readingTime: '8 min read',
    category: 'Web',
    excerpt: 'What it takes to turn a creative website into a credible business tool that converts.',
    content: [
      'A high-impact website should feel immersive, but it also needs to perform as a business asset. The strongest launches balance visual ambition with clear navigation, thoughtful content hierarchy, and interactions that help visitors move confidently toward action.',
      'For agencies and premium brands, the website often becomes the first proof of taste. If the presentation feels generic, prospects assume the process may be generic too. A more intentional digital experience can signal capability before the first call even happens.',
      'Launch quality comes from alignment. Creative direction, development, motion, and messaging need to support one another so the final experience feels smooth, fast, and unmistakably on-brand across desktop, tablet, and mobile.',
    ],
  },
];



