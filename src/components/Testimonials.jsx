import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Amina Rahman',
    company: 'Nova Commerce',
    role: 'Founder',
    quote:
      'Unique Studios delivered an outstanding website for our brand. Their team was professional, creative, and very easy to work with.',
    avatar:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%2300E5FF'/><stop offset='1' stop-color='%233A86FF'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(%23g)'/><circle cx='60' cy='46' r='20' fill='rgba(255,255,255,0.88)'/><path d='M26 100c6-19 21-30 34-30s28 11 34 30' fill='rgba(255,255,255,0.88)'/></svg>",
  },
  {
    name: 'Jason Park',
    company: 'Altitude Labs',
    role: 'Marketing Lead',
    quote:
      'Their creative direction, attention to detail, and smooth communication made the entire process feel premium from start to finish.',
    avatar:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%233A86FF'/><stop offset='1' stop-color='%232E6EDC'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(%23g)'/><circle cx='60' cy='44' r='19' fill='rgba(255,255,255,0.9)'/><path d='M24 100c8-18 21-28 36-28 14 0 28 10 36 28' fill='rgba(255,255,255,0.9)'/></svg>",
  },
  {
    name: 'Leena Das',
    company: 'Aether Cosmetics',
    role: 'Director',
    quote:
      'Unique Studios helped us elevate our digital presence beautifully. The final result felt modern, elegant, and highly aligned with our brand.',
    avatar:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%2300E5FF'/><stop offset='1' stop-color='%232E6EDC'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(%23g)'/><circle cx='60' cy='45' r='20' fill='rgba(255,255,255,0.9)'/><path d='M22 100c7-19 22-30 38-30 15 0 29 11 38 30' fill='rgba(255,255,255,0.9)'/></svg>",
  },
  {
    name: 'Daniel Moreau',
    company: 'Horizon Club',
    role: 'Creative Director',
    quote:
      'The work felt elevated, intentional, and beautifully executed. Unique Studios understood the kind of impression we wanted to leave.',
    avatar:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%2300E5FF'/><stop offset='1' stop-color='%233A86FF'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(%23g)'/><circle cx='60' cy='45' r='20' fill='rgba(255,255,255,0.9)'/><path d='M22 100c7-19 22-30 38-30 15 0 29 11 38 30' fill='rgba(255,255,255,0.9)'/></svg>",
  },
  {
    name: 'Sara Iqbal',
    company: 'Orchid Ventures',
    role: 'Brand Lead',
    quote:
      'From identity to launch assets, everything felt cohesive and expensive in the best way. Their team brought real clarity to our brand.',
    avatar:
      "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop stop-color='%233A86FF'/><stop offset='1' stop-color='%232E6EDC'/></linearGradient></defs><rect width='120' height='120' rx='60' fill='url(%23g)'/><circle cx='60' cy='45' r='20' fill='rgba(255,255,255,0.9)'/><path d='M22 100c7-19 22-30 38-30 15 0 29 11 38 30' fill='rgba(255,255,255,0.9)'/></svg>",
  },
];

const trustMarks = ['Nova', 'Atelier', 'Aether', 'Horizon', 'Orchid'];
const AUTOPLAY_DELAY = 5000;
const TRANSITION_MS = 600;

function Stars() {
  return (
    <div className="flex gap-1 text-[#7C3AED]" aria-label="5 star rating">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M10 1.7l2.5 5.08 5.6.81-4.05 3.95.96 5.58L10 14.5l-5.01 2.62.96-5.58L1.9 7.6l5.6-.81L10 1.7z" />
        </svg>
      ))}
    </div>
  );
}

function getVisibleCount(width) {
  if (width < 768) return 1;
  if (width < 1280) return 2;
  return 3;
}

function TestimonialCard({ item, highlighted = false }) {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className={`group relative h-full overflow-hidden rounded-[26px] border bg-white/[0.045] p-5 backdrop-blur-xl transition duration-300 ${highlighted ? 'border-[#7C3AED]/30 shadow-[0_24px_80px_rgba(0,0,0,0.34),0_0_20px_rgba(124,58,237,0.24)]' : 'border-white/10 shadow-[0_18px_50px_rgba(0,0,0,0.24)] opacity-90'} hover:border-[#7C3AED]/35 hover:shadow-[0_0_20px_rgba(124,58,237,0.35),0_18px_60px_rgba(0,0,0,0.28)]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.14),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_30%)]" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={item.avatar} alt={item.name} className="h-14 w-14 rounded-full border border-white/15 object-cover shadow-[0_8px_24px_rgba(0,0,0,0.24)]" />
            <div>
              <h3 className="text-base font-semibold tracking-[0.02em] text-white">{item.name}</h3>
              <p className="mt-1 text-sm text-white/60">{item.role}</p>
              <p className="text-xs uppercase tracking-[0.26em] text-[#A855F7]/56">{item.company}</p>
            </div>
          </div>
          <Stars />
        </div>
        <p className="mt-5 text-[0.95rem] leading-7 text-white/74">
          “{item.quote}”
        </p>
      </div>
    </motion.article>
  );
}

export default function Testimonials() {
  const { ref, isInView, variants } = useScrollAnimation();
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(() => (typeof window === 'undefined' ? 3 : getVisibleCount(window.innerWidth)));
  const [trackIndex, setTrackIndex] = useState(() => (typeof window === 'undefined' ? 3 : getVisibleCount(window.innerWidth)));
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const nextVisibleCount = getVisibleCount(window.innerWidth);
      setVisibleCount((current) => {
        if (current === nextVisibleCount) return current;
        setIsTransitionEnabled(false);
        setTrackIndex(nextVisibleCount);
        return nextVisibleCount;
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clones = useMemo(() => {
    const head = testimonials.slice(0, visibleCount);
    const tail = testimonials.slice(-visibleCount);
    return [...tail, ...testimonials, ...head];
  }, [visibleCount]);

  useEffect(() => {
    setIsTransitionEnabled(false);
    setTrackIndex(visibleCount);
  }, [visibleCount]);

  useEffect(() => {
    if (paused) return undefined;

    const timer = window.setInterval(() => {
      setIsTransitionEnabled(true);
      setTrackIndex((current) => current + 1);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(timer);
  }, [paused]);

  const activeIndex = useMemo(
    () => (trackIndex - visibleCount + testimonials.length) % testimonials.length,
    [trackIndex, visibleCount],
  );

  const highlightedIndex = Math.floor(visibleCount / 2);

  const handleTransitionEnd = () => {
    if (trackIndex >= testimonials.length + visibleCount) {
      setIsTransitionEnabled(false);
      setTrackIndex(visibleCount);
      return;
    }

    if (trackIndex < visibleCount) {
      setIsTransitionEnabled(false);
      setTrackIndex(testimonials.length + trackIndex);
    }
  };

  useEffect(() => {
    if (isTransitionEnabled) return undefined;

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => setIsTransitionEnabled(true));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isTransitionEnabled]);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-shell"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-[42px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] px-6 py-12 shadow-[0_32px_120px_rgba(0,0,0,0.32)] backdrop-blur-2xl sm:px-8 lg:px-10 lg:py-14">
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-10 top-8 h-56 w-56 rounded-full bg-[#7C3AED]/10 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#A855F7]/08 blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#7C3AED]/06 blur-3xl"
        />

        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="relative mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex rounded-full border border-[#7C3AED]/20 bg-white/5 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#A855F7]/78">
            Client Voices
          </span>
          <div className="pointer-events-none absolute inset-x-1/4 top-8 h-28 rounded-full bg-[#7C3AED]/10 blur-3xl" />
          <h2 className="relative mt-6 font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-[4.25rem]">
            What Our Clients Say About Us
          </h2>
          <p className="relative mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68 sm:text-lg">
            We partner with brands to create digital experiences that inspire and drive growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.75, delay: 0.12 }}
          className="relative mt-14"
        >
          <div className="relative">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => {
                setIsTransitionEnabled(true);
                setTrackIndex((current) => current - 1);
              }}
              className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base text-white transition hover:bg-white/20 hover:shadow-[0_0_12px_rgba(124,58,237,0.5)] md:flex xl:h-14 xl:w-14"
            >
              &lt;
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => {
                setIsTransitionEnabled(true);
                setTrackIndex((current) => current + 1);
              }}
              className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base text-white transition hover:bg-white/20 hover:shadow-[0_0_12px_rgba(124,58,237,0.5)] md:flex xl:h-14 xl:w-14"
            >
              &gt;
            </button>
            <div className="overflow-hidden">
              <div
                className="flex"
                style={{
                  transform: `translate3d(-${(trackIndex * 100) / visibleCount}%, 0, 0)`,
                  transition: isTransitionEnabled ? `transform ${TRANSITION_MS}ms ease` : 'none',
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {clones.map((item, index) => {
                  const isHighlighted = index === trackIndex + highlightedIndex;

                  return (
                    <div
                      key={`${item.name}-${index}`}
                      className="shrink-0 px-2.5"
                      style={{ width: `${100 / visibleCount}%` }}
                    >
                      <TestimonialCard item={item} highlighted={isHighlighted} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="flex w-full items-center justify-center gap-4 md:hidden">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() => {
                  setIsTransitionEnabled(true);
                  setTrackIndex((current) => current - 1);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base text-white transition hover:bg-white/20 hover:shadow-[0_0_12px_rgba(124,58,237,0.5)]"
              >
                &lt;
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => {
                  setIsTransitionEnabled(true);
                  setTrackIndex((current) => current + 1);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-base text-white transition hover:bg-white/20 hover:shadow-[0_0_12px_rgba(124,58,237,0.5)]"
              >
                &gt;
              </button>
            </div>
            {testimonials.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setIsTransitionEnabled(true);
                  setTrackIndex(visibleCount + index);
                }}
                className={`relative h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-12 bg-[#7C3AED] shadow-[0_0_24px_rgba(124,58,237,0.36)]' : 'w-2.5 bg-white/25 hover:bg-white/40'}`}
                aria-label={`Show testimonial ${index + 1}`}
              >
                {index === activeIndex && <span className="absolute inset-0 rounded-full bg-[#A855F7]/60 blur-sm" />}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="relative mt-12 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] px-5 py-5 backdrop-blur-xl sm:px-6"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(124,58,237,0.12),_transparent_26%),radial-gradient(circle_at_right,_rgba(168,85,247,0.08),_transparent_22%)]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm uppercase tracking-[0.28em] text-white/58">
              Trusted by startups, creators, and growing brands worldwide.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.34em] text-white/42">
              {trustMarks.map((mark) => (
                <span key={mark} className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  {mark}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


