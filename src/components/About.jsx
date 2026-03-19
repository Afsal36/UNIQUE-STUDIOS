import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import useScrollAnimation from '../hooks/useScrollAnimation';

const features = [
  {
    icon: 'CD',
    title: 'Creative Design',
    description: 'Premium-first visual systems, art direction, and polished brand presentation crafted to stand out.',
  },
  {
    icon: 'SB',
    title: 'Strategic Branding',
    description: 'Clear positioning, elevated identity design, and brand language that builds lasting recognition.',
  },
  {
    icon: 'WD',
    title: 'Modern Web Development',
    description: 'High-performance digital experiences with refined motion, premium UX, and scalable structure.',
  },
  {
    icon: 'GM',
    title: 'Growth-Focused Marketing',
    description: 'Campaign thinking, content direction, and digital strategies designed to help brands grow beautifully.',
  },
];

const stats = [
  { value: 250, suffix: '+', label: 'Projects Completed' },
  { value: 120, suffix: '+', label: 'Happy Clients' },
  { value: 8, suffix: '+', label: 'Years Experience' },
  { value: 15, suffix: '+', label: 'Team Members' },
];

export default function About({ sectionId = 'about' }) {
  const { ref, isInView, variants } = useScrollAnimation();
  const statRefs = useRef([]);

  useEffect(() => {
    if (!isInView) return;

    statRefs.current.forEach((node, index) => {
      if (!node || node.dataset.animated === 'true') return;
      node.dataset.animated = 'true';

      gsap.fromTo(
        node,
        { innerText: 0 },
        {
          innerText: stats[index].value,
          duration: 1.6,
          snap: { innerText: 1 },
          ease: 'power3.out',
          delay: index * 0.08,
        },
      );
    });
  }, [isInView]);

  return (
    <section id={sectionId} ref={ref} className="section-shell scroll-mt-28">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={variants}
          className="premium-frame p-7 sm:p-9 lg:p-10"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/55 to-transparent" />
          <span className="section-eyebrow">About</span>
          <h2 className="max-w-3xl font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:text-[4.1rem]">
            Crafting Digital Experiences That Inspire
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
            Unique Studios is a creative digital agency specializing in branding, web development, and digital marketing for modern brands that want to feel elevated, memorable, and professionally crafted.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-8 text-white/62 sm:text-base">
            We bring together creativity, innovation, and strategic thinking to shape digital experiences that not only look premium, but also help ambitious brands grow with clarity and confidence.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.55, delay: 0.12 + index * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="group rounded-[28px] border border-white/10 bg-white/[0.04] p-5 transition hover:border-[#7C3AED]/22 hover:bg-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/8 text-xs font-semibold uppercase tracking-[0.24em] text-[#C084FC]/78 transition group-hover:bg-white group-hover:text-slate-950">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-2xl text-white">{feature.title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/64">{feature.description}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.55, delay: 0.32 + index * 0.08 }}
                className="rounded-[26px] border border-white/10 bg-white/[0.03] px-5 py-5"
              >
                <div className="font-display text-4xl leading-none text-white">
                  <span ref={(element) => { statRefs.current[index] = element; }}>0</span>
                  {stat.suffix}
                </div>
                <p className="mt-3 text-xs uppercase tracking-[0.28em] text-[#C084FC]/58">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
          transition={{ duration: 0.7, delay: 0.16 }}
          className="premium-frame overflow-hidden p-7 sm:p-9 lg:p-10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(123,44,191,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(90,24,154,0.22),_transparent_34%),linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(255,255,255,0.01))]" />
          <div className="relative min-h-[520px] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,_rgba(123,44,191,0.16),_rgba(90,24,154,0.08),_rgba(60,9,108,0.18))] p-6 sm:p-8">
            <div className="about-orb about-orb-one" />
            <div className="about-orb about-orb-two" />
            <div className="about-orb about-orb-three" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.38em] text-[#C084FC]/58">Unique Studios</p>
                <h3 className="mt-4 max-w-sm font-display text-4xl leading-[0.98] text-white sm:text-5xl">
                  Creative digital thinking with premium-level execution.
                </h3>
              </div>

              <div className="grid gap-4">
                {[
                  'Branding, websites, and digital marketing under one premium direction.',
                  'Refined visual experiences built to inspire trust and desirability.',
                  'Smooth modern presentation with lightweight, elegant motion.',
                ].map((line) => (
                  <div key={line} className="rounded-[22px] border border-white/10 bg-white/[0.06] px-5 py-4 text-sm leading-7 text-white/70 backdrop-blur-sm">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}




