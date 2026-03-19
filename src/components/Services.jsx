import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { services } from '../utils/constants';

const serviceNotes = [
  'Premium brand systems',
  'Positioning and identity',
  'High-performance builds',
  'Editorial web aesthetics',
  'Growth-led campaigns',
  'Cinematic post-production',
];

export default function Services({ compact = false, sectionId = 'services' }) {

  const { ref, isInView, variants } = useScrollAnimation();

  // RESTORE SCROLL POSITION
  useEffect(() => {
    const restore = sessionStorage.getItem("services-scroll");

    if (restore) {
      window.scrollTo(0, parseInt(restore, 10));
      sessionStorage.removeItem("services-scroll");
    }
  }, []);

  // SAVE SCROLL POSITION BEFORE OPENING SERVICE PAGE
  const saveReturnSection = () => {
    sessionStorage.setItem("services-scroll", window.scrollY.toString());
  };

  return (
    <section id={sectionId} ref={ref} className="section-shell scroll-mt-28 min-h-[400px]">

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className="premium-frame overflow-hidden"
      >

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/55 to-transparent" />

        <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">

          <div className="relative px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.14),_transparent_32%),linear-gradient(180deg,_rgba(255,255,255,0.02),_transparent)]" />

            <div className="relative">

              <span className="section-eyebrow">
                Services
              </span>

              <div className="mt-6 max-w-3xl">

                <p className="text-xs uppercase tracking-[0.42em] text-[#C084FC]/58">
                  Curated capabilities
                </p>

                <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.96] text-white sm:text-5xl lg:text-[4.2rem]">
                  Distinct creative services with a more refined, modern point of view.
                </h2>

              </div>

            </div>

          </div>

          <div className="relative border-t border-white/8 px-6 py-8 sm:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-12">

            <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(255,255,255,0.02),_rgba(255,255,255,0.01)),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.08),_transparent_30%)]" />

            <div className="relative flex h-full flex-col justify-between gap-8">

              <p className="max-w-xl text-base leading-8 text-white/68 sm:text-lg">
                From first impression to final delivery, each service is built with editorial restraint,
                polished execution, and a premium-grade brand sensibility.
              </p>

              <div className="grid gap-3 sm:grid-cols-2">

                {[
                  'Editorial-led design',
                  'Premium digital polish',
                  'Strategic brand clarity',
                  'High-touch execution',
                ].map((item) => (

                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm uppercase tracking-[0.18em] text-[#C084FC]/72"
                  >
                    {item}
                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </motion.div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {services.map((service, index) => (

          <Link
            key={service.title}
            to={`/${service.slug}`}
            onClick={saveReturnSection}
            className="group block focus:outline-none"
          >

            <motion.article
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="premium-frame min-h-[340px] p-7 transition hover:border-[#7C3AED]/35 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]"
            >

              <div className="relative flex h-full flex-col">

                <div className="mt-10">

                  <h3 className="font-display text-[2rem] leading-tight text-white">
                    {service.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/66">
                    {service.description}
                  </p>

                </div>

                <div className="mt-auto pt-10">

                  <div className="text-xs uppercase tracking-[0.28em] text-[#C084FC]/55">
                    {serviceNotes[index]}
                  </div>

                  <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/70">
                    View Service
                  </span>

                </div>

              </div>

            </motion.article>

          </Link>

        ))}

      </div>

    </section>
  );
}