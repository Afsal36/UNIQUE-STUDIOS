import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { articles } from '../data/articles';
import { saveScroll } from '../utils/scroll';

const articleVisuals = [
  {
    accent: 'from-[#7C3AED]/70 via-[#A855F7]/28 to-transparent',
    glow: 'bg-[#7C3AED]/18',
    align: 'items-end',
  },
  {
    accent: 'from-[#7C3AED]/62 via-[#A855F7]/18 to-transparent',
    glow: 'bg-[#A855F7]/16',
    align: 'items-start',
  },
  {
    accent: 'from-[#A855F7]/62 via-[#7C3AED]/18 to-transparent',
    glow: 'bg-[#7C3AED]/12',
    align: 'items-center',
  },
];

function ArticleVisual({ article, accent, glow, align = 'items-end', featured = false }) {
  return (
    <div className={`relative flex min-h-[220px] overflow-hidden rounded-[28px] border border-white/10 bg-[#1A1A2E] ${align} justify-start p-6 sm:min-h-[260px] ${featured ? 'lg:min-h-[420px] lg:p-8' : ''}`}>
      <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className={`absolute inset-0 bg-gradient-to-br ${accent} mix-blend-screen`} />
      <div className={`absolute -right-10 top-6 h-28 w-28 rounded-full ${glow} blur-3xl ${featured ? 'sm:h-40 sm:w-40' : ''}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.14),_transparent_24%),linear-gradient(180deg,transparent_0%,rgba(8,5,16,0.18)_52%,rgba(8,5,16,0.88)_100%)]" />
      <div className="absolute left-6 top-6 h-12 w-12 rounded-full border border-white/12 bg-white/6 backdrop-blur-md" />
      <div className="absolute right-8 bottom-8 h-20 w-20 rounded-full border border-white/8 bg-white/5 backdrop-blur-xl" />
      <div className="relative max-w-[16rem]">
        <span className="text-[0.62rem] uppercase tracking-[0.4em] text-white/50">Unique Studios</span>
        <p className={`mt-3 font-display ${featured ? 'text-3xl sm:text-4xl' : 'text-2xl'} leading-[0.9] text-white`}>
          {article.category}
        </p>
      </div>
    </div>
  );
}

function ArticleCard({ article, index }) {
  const visual = articleVisuals[(index + 1) % articleVisuals.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Link to={`/journal/${article.slug}`} onClick={saveScroll} className="relative block overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_30%)] opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="overflow-hidden p-3 pb-0">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
            <ArticleVisual article={article} accent={visual.accent} glow={visual.glow} align={visual.align} />
          </motion.div>
        </div>
        <div className="relative p-6 pt-5">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full border border-[#7C3AED]/20 bg-white/5 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.34em] text-[#A855F7]/78">
              {article.category}
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">{article.date}</span>
          </div>
          <h3 className="mt-5 font-display text-[2rem] leading-[0.94] text-white transition-colors duration-300 group-hover:text-[#A855F7]">
            {article.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-white/62">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPreview({ sectionId = 'journal' }) {
  const { ref, isInView, variants } = useScrollAnimation();
  const [featuredArticle, ...otherArticles] = articles;
  const featuredVisual = articleVisuals[0];

  // RESTORE SCROLL POSITION
useEffect(() => {
  const restore = sessionStorage.getItem("journal-scroll");

  if (restore) {
    window.scrollTo(0, parseInt(restore, 10));
    sessionStorage.removeItem("journal-scroll");
  }
}, []);

// SAVE SCROLL POSITION
const saveScroll = () => {
  sessionStorage.setItem("journal-scroll", window.scrollY.toString());
};

  return (
    <section id={sectionId} ref={ref} className="section-shell scroll-mt-28">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className="relative overflow-hidden rounded-[42px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-10 shadow-[0_32px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:px-8 lg:px-10 lg:py-12"
      >
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -14, 0], x: [0, 14, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-10 top-14 h-52 w-52 rounded-full bg-[#7C3AED]/12 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 12, 0], x: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute right-6 top-8 h-64 w-64 rounded-full bg-[#A855F7]/10 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-8 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-3xl"
        />

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex rounded-full border border-[#7C3AED]/20 bg-white/5 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#A855F7]/80">
              Journal
            </span>
            <h2 className="mt-6 font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-[4rem]">
              Insights, Ideas & Creative Perspectives
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/66 sm:text-lg">
              Explore our thoughts on design, branding, technology, and digital growth.
            </p>
            <div className="mx-auto mt-8 h-px w-40 bg-gradient-to-r from-transparent via-[#7C3AED]/80 to-transparent shadow-[0_0_24px_rgba(124,58,237,0.42)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            whileHover={{ y: -6 }}
            className="group mt-12"
          >
           <Link to={`/journal/${featuredArticle.slug}`} onClick={saveScroll} className="relative block overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.05] shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.14),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_30%)]" />
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="overflow-hidden p-4 sm:p-5">
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.5, ease: 'easeOut' }}>
                    <ArticleVisual
                      article={featuredArticle}
                      accent={featuredVisual.accent}
                      glow={featuredVisual.glow}
                      align={featuredVisual.align}
                      featured
                    />
                  </motion.div>
                </div>
                <div className="relative flex flex-col justify-between p-7 sm:p-8 lg:p-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-[#7C3AED]/20 bg-white/5 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.34em] text-[#A855F7]/78">
                        {featuredArticle.category}
                      </span>
                      <span className="text-[0.68rem] uppercase tracking-[0.28em] text-white/42">{featuredArticle.date}</span>
                    </div>
                    <h3 className="mt-6 font-display text-[2.35rem] leading-[0.92] text-white sm:text-[2.8rem]">
                      {featuredArticle.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-base leading-8 text-white/66">
                      {featuredArticle.excerpt} This featured perspective explores how thoughtful design systems and creative direction help brands feel more refined, memorable, and commercially effective.
                    </p>
                  </div>
                  <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <p className="max-w-sm text-sm leading-7 text-white/50">
                      Editorial notes from the Unique Studios team on shaping premium digital experiences.
                    </p>
                    <span className="inline-flex items-center rounded-full border border-[#7C3AED]/28 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#7C3AED] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_28px_rgba(124,58,237,0.28)] transition duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_0_36px_rgba(124,58,237,0.38)]">
                      Read More
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {otherArticles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="relative mt-10 overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] px-6 py-7 text-center backdrop-blur-xl sm:px-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.14),_transparent_32%)]" />
            <p className="relative text-base text-white/68 sm:text-lg">
              Discover more insights from our creative team.
            </p>
        <Link
  to="/journal"
  onClick={saveScroll}
              className="relative mt-5 inline-flex items-center rounded-full border border-[#7C3AED]/28 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#7C3AED] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_28px_rgba(124,58,237,0.28)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_38px_rgba(124,58,237,0.38)]"
            >
              View All Articles
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}






