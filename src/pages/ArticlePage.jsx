import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/articles';

function ShareButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/72 transition hover:border-purple-300/30 hover:bg-white/10 hover:text-white"
    >
      {label}
    </button>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const articleIndex = articles.findIndex((entry) => entry.slug === slug);
  const article = articleIndex >= 0 ? articles[articleIndex] : null;

  const adjacentArticles = useMemo(() => {
    if (!article) return { previous: null, next: null };

    return {
      previous: articleIndex > 0 ? articles[articleIndex - 1] : null,
      next: articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null,
    };
  }, [article, articleIndex]);

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = async () => {
    if (!pageUrl || !navigator?.clipboard) return;
    await navigator.clipboard.writeText(pageUrl);
  };

  const handleNativeShare = async () => {
    if (!article || !navigator?.share) return;
    await navigator.share({ title: article.title, text: article.excerpt, url: pageUrl });
  };

  const handleShareNetwork = (network) => {
    if (!article || !pageUrl) return;

    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedText = encodeURIComponent(article.title);
    const shareUrls = {
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    window.open(shareUrls[network], '_blank', 'noopener,noreferrer,width=680,height=520');
  };

  if (!article) {
    return (
      <div className="pt-28">
        <section className="section-shell">
          <div className="premium-frame p-8 text-center sm:p-12">
            <span className="section-eyebrow">Journal</span>
            <h1 className="mt-5 font-display text-5xl text-white">Article Not Found</h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/64">
              The article you are looking for is not available. Return to the journal to explore the latest insights from Unique Studios.
            </p>
            <Link
              to="/journal"
              className="mt-8 inline-flex rounded-full border border-purple-300/30 bg-gradient-to-r from-[#7B2CBF] via-[#5A189A] to-[#3C096C] px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_28px_rgba(123,44,191,0.32)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_0_38px_rgba(123,44,191,0.46)]"
            >
              Back to Journal
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-28">
      <section className="section-shell">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-[42px] border border-white/10 bg-white/[0.04] shadow-[0_32px_120px_rgba(0,0,0,0.28)] backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(123,44,191,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(90,24,154,0.14),_transparent_32%)]" />
          <div className="relative overflow-hidden rounded-t-[42px] border-b border-white/10">
            <img src={article.image} alt={article.title} className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,6,17,0.14),rgba(9,6,17,0.82))]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-12">
              <Link
                to="/journal"
                className="inline-flex rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78 backdrop-blur-md transition hover:border-purple-300/30 hover:bg-white/14"
              >
                Back to Journal
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/55">
                <span className="rounded-full border border-purple-300/20 bg-white/10 px-3 py-1 text-purple-100/80">{article.category}</span>
                <span>{article.date}</span>
                <span>{article.readingTime}</span>
              </div>
              <h1 className="mt-6 max-w-4xl font-display text-[2.8rem] leading-[0.92] text-white sm:text-[4rem] lg:text-[5rem]">
                {article.title}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-white/72 sm:text-lg">
                {article.excerpt}
              </p>
            </div>
          </div>

          <div className="relative grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-12 lg:py-12">
            <div>
              <div className="prose prose-invert max-w-none prose-p:my-0 prose-p:text-base prose-p:leading-8 prose-p:text-white/72 sm:prose-p:text-[1.05rem]">
                {article.content.map((paragraph) => (
                  <p key={paragraph} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.32em] text-white/45">Share Article</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ShareButton label="Copy Link" onClick={handleCopyLink} />
                  <ShareButton label="Share X" onClick={() => handleShareNetwork('x')} />
                  <ShareButton label="LinkedIn" onClick={() => handleShareNetwork('linkedin')} />
                  {typeof navigator !== 'undefined' && typeof navigator.share === 'function' ? (
                    <ShareButton label="More" onClick={handleNativeShare} />
                  ) : null}
                </div>
              </div>

              <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.32em] text-white/45">Article Details</p>
                <dl className="mt-5 space-y-4 text-sm text-white/68">
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <dt>Published</dt>
                    <dd>{article.date}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <dt>Reading Time</dt>
                    <dd>{article.readingTime}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt>Category</dt>
                    <dd>{article.category}</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </motion.article>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {adjacentArticles.previous ? (
            <Link to={`/journal/${adjacentArticles.previous.slug}`} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-purple-300/25 hover:bg-white/[0.06]">
              <p className="text-xs uppercase tracking-[0.32em] text-white/42">Previous Article</p>
              <h2 className="mt-4 font-display text-[2rem] leading-[0.95] text-white transition-colors duration-300 group-hover:text-purple-200">
                {adjacentArticles.previous.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/60">{adjacentArticles.previous.excerpt}</p>
            </Link>
          ) : <div />}

          {adjacentArticles.next ? (
            <Link to={`/journal/${adjacentArticles.next.slug}`} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-purple-300/25 hover:bg-white/[0.06] md:text-right">
              <p className="text-xs uppercase tracking-[0.32em] text-white/42">Next Article</p>
              <h2 className="mt-4 font-display text-[2rem] leading-[0.95] text-white transition-colors duration-300 group-hover:text-purple-200">
                {adjacentArticles.next.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/60">{adjacentArticles.next.excerpt}</p>
            </Link>
          ) : <div />}
        </div>
      </section>
    </div>
  );
}




