import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const filters = [
  'All',
  'Graphic Designing',
  'Branding',
  'Web Development',
  'Web Designing',
  'Digital Marketing',
  'Video Editing'
];

const portfolioCategories = [
  {
    title: 'Graphic Designing',
    slug: 'graphic-design',
    description: 'Identity systems, campaign visuals, and premium graphic layouts.',
    accent: 'from-fuchsia-400/70 via-purple-500/40 to-transparent',
  },
  {
    title: 'Branding',
    slug: 'branding',
    description: 'Positioning, identity, and launch-ready brand systems.',
    accent: 'from-violet-400/70 via-fuchsia-500/40 to-transparent',
  },
  {
    title: 'Web Development',
    slug: 'web-development',
    description: 'High-performance web builds with immersive UX and speed.',
    accent: 'from-purple-400/70 via-violet-500/40 to-transparent',
  },
  {
    title: 'Web Designing',
    slug: 'web-design',
    description: 'Modern UI/UX, responsive systems, and digital polish.',
    accent: 'from-indigo-400/70 via-purple-500/40 to-transparent',
  },
  {
    title: 'Digital Marketing',
    slug: 'digital-marketing',
    description: 'Campaign strategy, social content, and growth performance.',
    accent: 'from-violet-400/70 via-purple-500/40 to-transparent',
  },
  {
    title: 'Video Editing',
    slug: 'video-editing',
    description: 'Launch films, short-form edits, and cinematic storytelling.',
    accent: 'from-fuchsia-400/70 via-purple-500/40 to-transparent',
  },
];

export default function Portfolio({ sectionId = 'portfolio' }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, isInView, variants } = useScrollAnimation();

  const items = useMemo(() => {
    if (activeFilter === 'All') return portfolioCategories;
    return portfolioCategories.filter((item) => item.title === activeFilter);
  }, [activeFilter]);

  // SAVE SCROLL POSITION BEFORE LEAVING PAGE
  useEffect(() => {
    const restore = sessionStorage.getItem('portfolio-scroll');

    if (restore) {
      window.scrollTo(0, parseInt(restore, 10));
      sessionStorage.removeItem('portfolio-scroll');
    }
  }, []);

  const saveScroll = () => {
    sessionStorage.setItem('portfolio-scroll', window.scrollY.toString());
  };

  return (
    <section id={sectionId} ref={ref} className="section-shell scroll-mt-28">

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className="premium-frame overflow-hidden"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/55 to-transparent" />

        <div className="grid gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10 lg:py-12">

          <div>
            <span className="section-eyebrow">PORTFOLIO</span>

            <h2 className="mt-5 font-display text-4xl leading-[0.98] text-white sm:text-5xl lg:text-[4.2rem]">
              Our Creative Work
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              A selection of projects crafted for brands, startups, and businesses.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6">
            <p className="text-xs uppercase tracking-[0.36em] text-[#C084FC]/60">
              Curated categories
            </p>

            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
                    activeFilter === filter
                      ? 'bg-white text-slate-950'
                      : 'border border-white/10 bg-white/5 text-white/70 hover:border-[#7C3AED]/25 hover:bg-white/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      <motion.div layout className="mt-10 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <Link
              key={item.title}
              to={`/portfolio/${item.slug}`}
              onClick={saveScroll}
              className="group block focus:outline-none"
            >
              <motion.article
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-xl transition hover:border-[#7C3AED]/35 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]"
              >

                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} transition duration-700 group-hover:scale-[1.05]`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-[10px] uppercase tracking-[0.32em] text-white/85">
                    {item.title}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{item.description}</p>

                  <span className="mt-5 inline-flex w-fit rounded-full border border-[#7C3AED] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-[#C084FC] transition group-hover:bg-gradient-to-r group-hover:from-[#7C3AED] group-hover:to-[#C084FC] group-hover:text-white">
                    View Project
                  </span>
                </div>

              </motion.article>
            </Link>
          ))}
        </AnimatePresence>
      </motion.div>

    </section>
  );
}