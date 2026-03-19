import { motion } from 'framer-motion';
import Portfolio from '../components/Portfolio';
// import Testimonials from '../components/Testimonials';

export default function PortfolioPage() {
  return (
    <div className="pt-28">
      <section className="section-shell pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="premium-frame p-8 sm:p-12 lg:p-14">
          <span className="section-eyebrow">Featured Projects</span>
          <h1 className="section-title max-w-4xl">A portfolio of crafted launches, luxury identities, and cinematic digital storytelling.</h1>
          <p className="section-copy mt-6">
            Every project is designed to feel refined, distinct, and commercially sharp from first impression to final conversion.
          </p>
        </motion.div>
      </section>
      <Portfolio />
      {/* <Testimonials /> */}
    </div>
  );
}
