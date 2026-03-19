import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { projects } from '../data/projects';

const categoryLabels = {
  'graphic-design': 'Graphic Designing',
  'branding': 'Branding',
  'web-development': 'Web Development',
  'web-design': 'Web Designing',
  'digital-marketing': 'Digital Marketing',
  'video-editing': 'Video Editing',
};

export default function CategoryPortfolio() {
  const { category } = useParams();
  const label = categoryLabels[category] || 'Portfolio';

  const categoryProjects = projects.filter(
    (project) => project.category === category
  );

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: 'instant' });
  // }, [category]);

  return (
    <div className="pt-28">
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="premium-frame px-6 py-10 sm:px-10 lg:px-12"
        >
          <span className="section-eyebrow">Portfolio</span>

          <h1 className="section-title max-w-3xl">
            {label} Projects
          </h1>

          <p className="section-copy mt-5">
            Explore curated {label.toLowerCase()} work crafted to feel premium,
            modern, and conversion-ready.
          </p>

        <button
  onClick={() => {
    window.location.href = "/portfolio";
  }}
  className="mt-6 inline-flex text-sm uppercase tracking-[0.24em] text-[#C084FC]/70"
>
  Back to portfolio
</button>
        </motion.div>
      </section>

      <section className="section-shell pt-0">
        {categoryProjects.length === 0 ? (
          <div className="premium-frame p-8 text-white/70">
            No projects found yet in this category. Check back soon or view another category.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoryProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/project/${project.slug}`}
                className="group block focus:outline-none"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="premium-frame overflow-hidden transition hover:border-[#7C3AED]/35 hover:shadow-[0_0_30px_rgba(124,58,237,0.25)]"
                >
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-56 w-full object-cover"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/80">
                      {label}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm text-white/70">
                      {project.description}
                    </p>

                    <span className="mt-6 inline-flex w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/80 transition group-hover:border-[#7C3AED]/40 group-hover:text-white">
                      View Details
                    </span>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}