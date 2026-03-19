import { motion } from 'framer-motion';
import About from '../components/About';
import Services from '../components/Services';

export default function AboutPage() {
  return (
    <div className="pt-28">
      <section className="section-shell pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="premium-frame p-8 sm:p-12 lg:p-14">
          <span className="section-eyebrow">About Unique Studios</span>
          <h1 className="section-title max-w-4xl">We shape elegant brand experiences with a luxury editorial eye and modern digital precision.</h1>
          <p className="section-copy mt-6">
            Our work is built around elevated art direction, restrained motion, and strategy that helps premium brands feel unmistakable.
          </p>
        </motion.div>
      </section>
      <About />
      <Services compact />
    </div>
  );
}
