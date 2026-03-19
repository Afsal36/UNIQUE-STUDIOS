import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export default function BlogPage() {
  const [featuredArticle, ...otherArticles] = articles;

  return (
    <div className="pt-28">
      <section className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_32px_120px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:p-12 lg:p-14"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(123,44,191,0.16),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(90,24,154,0.14),_transparent_32%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="section-eyebrow">Journal</span>
              <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[0.94] text-white sm:text-6xl">
                Ideas shaping premium brands, digital experiences, and growth.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
                Explore the full Unique Studios journal, featuring perspectives on branding, design systems, web experiences, and modern marketing strategy.
              </p>
            </div>
            <Link
              to={`/journal/${featuredArticle.slug}`}
              className="inline-flex items-center rounded-full border border-purple-300/30 bg-gradient-to-r from-[#7B2CBF] via-[#5A189A] to-[#3C096C] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_28px_rgba(123,44,191,0.32)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_38px_rgba(123,44,191,0.46)]"
            >
              Read Featured Story
            </Link>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="group"
          >
            <Link to={`/journal/${featuredArticle.slug}`} className="relative block overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.05] shadow-[0_28px_90px_rgba(0,0,0,0.26)] backdrop-blur-2xl">
              <img src={featuredArticle.image} alt={featuredArticle.title} className="h-[320px] w-full object-cover transition duration-500 group-hover:scale-[1.04] sm:h-[420px]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,6,17,0.10),rgba(9,6,17,0.82))]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(123,44,191,0.18),_transparent_28%)]" />
              <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/58">
                  <span className="rounded-full border border-purple-300/20 bg-white/5 px-3 py-1 text-purple-100/78">{featuredArticle.category}</span>
                  <span>{featuredArticle.date}</span>
                  <span>{featuredArticle.readingTime}</span>
                </div>
                <h2 className="mt-5 max-w-2xl font-display text-[2.3rem] leading-[0.94] text-white sm:text-[3rem]">
                  {featuredArticle.title}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/68 sm:text-base sm:leading-8">
                  {featuredArticle.excerpt}
                </p>
              </div>
            </Link>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1">
            {otherArticles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group"
              >
                <Link to={`/journal/${article.slug}`} className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] p-3 shadow-[0_22px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                  <div className="overflow-hidden rounded-[22px]">
                    <img src={article.image} alt={article.title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.05]" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/42">
                      <span className="rounded-full border border-purple-300/20 bg-white/5 px-3 py-1 text-purple-100/78">{article.category}</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="mt-5 font-display text-[2rem] leading-[0.95] text-white transition-colors duration-300 group-hover:text-purple-200">
                      {article.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-white/62">{article.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}




