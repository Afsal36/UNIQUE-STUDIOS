import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data/projects';

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'instant' });
  // }, [slug]);

  if (!project) {
    return (
      <div className="section-shell pt-32 text-white/70">
        Project not found.{' '}
        <Link to="/portfolio" className="text-[#C084FC]">
          Back to portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="premium-frame overflow-hidden"
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-[360px] w-full object-cover sm:h-[420px]"
          />

          <div className="p-6 sm:p-10">
            <span className="text-xs uppercase tracking-[0.32em] text-[#C084FC]/70">
              Project detail
            </span>

            <h1 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              {project.title}
            </h1>

            <p className="mt-5 text-base leading-8 text-white/70 sm:text-lg">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
             <button
  onClick={() => {
    window.location.href = "/portfolio";
  }}
  className="luxury-button-secondary"
>
  Back to Portfolio
</button>

              <Link
                to="/contact"
                className="luxury-button"
                data-cursor-hover
              >
                Start a Project
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}