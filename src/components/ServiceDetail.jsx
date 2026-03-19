import { motion } from 'framer-motion'
import { scrollSectionIntoView } from '../utils/scroll'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Contact from './Contact'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function ServiceDetail({ service }) {
  if (!service) return null

  /* RESTORE SERVICES SCROLL POSITION */
useEffect(() => {
  const section = sessionStorage.getItem("return-section")

  if (section) {
    const el = document.getElementById(section)

    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }

    sessionStorage.removeItem("return-section")
  }
}, [])

  return (
    <div className="pt-28">

      {/* HERO */}
      <section className="section-shell">
        <motion.div {...fadeUp} className="premium-frame px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">

          <span className="section-eyebrow">
            Service
          </span>

          <h1 className="section-title max-w-3xl">
            {service.title}
          </h1>

          <p className="section-copy mt-6 max-w-3xl">
            {service.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <button
              type="button"
              onClick={() => scrollSectionIntoView('contact')}
              className="luxury-button"
              data-cursor-hover
            >
              Start Project
            </button>

            <Link
              to={`/portfolio/${service.slug}`}
              className="luxury-button-secondary"
              data-cursor-hover
            >
              View Projects
            </Link>

          </div>

        </motion.div>
      </section>

      {/* OFFERINGS */}
      <section className="section-shell pt-0">
        <div className="grid gap-6 lg:grid-cols-2">

          <motion.div {...fadeUp} className="premium-frame p-7 sm:p-8">

            <h2 className="text-xl font-semibold text-white">
              What we offer
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {service.offerings.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </motion.div>

          <motion.div {...fadeUp} className="premium-frame p-7 sm:p-8">

            <h2 className="text-xl font-semibold text-white">
              Key benefits
            </h2>

            <ul className="mt-5 space-y-3 text-sm text-white/70">
              {service.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#A855F7]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

          </motion.div>

        </div>
      </section>

      {/* PORTFOLIO PREVIEW */}
      <section className="section-shell pt-0">

        <motion.div {...fadeUp} className="premium-frame p-7 sm:p-8">

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#C084FC]/60">
                Selected work
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Portfolio examples
              </h2>
            </div>

            <Link
              to="/#portfolio"
              className="luxury-button-secondary text-xs"
              data-cursor-hover
            >
              Explore Portfolio
            </Link>

          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {service.examples.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-white/75"
              >
                {item}
              </div>
            ))}
          </div>

        </motion.div>

      </section>

      {/* CTA */}
      <section className="section-shell pt-0">

        <motion.div {...fadeUp} className="premium-frame px-6 py-8 sm:px-10">

          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">

            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#C084FC]/70">
                Ready to begin
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-white">
                Let us build your next signature project.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => scrollSectionIntoView('contact')}
              className="luxury-button"
              data-cursor-hover
            >
              Start Project
            </button>

          </div>

        </motion.div>

      </section>

      {/* CONTACT */}
      <Contact sectionId="contact" />

    </div>
  )
}