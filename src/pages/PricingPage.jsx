import { motion } from 'framer-motion';
import Contact from '../components/Contact';

export default function PricingPage() {
  return (
    <div className="pt-28">
      <section className="section-shell pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="premium-frame p-8 sm:p-12">
          <span className="section-eyebrow">Let’s Talk</span>
          <h1 className="section-title max-w-4xl">We tailor every engagement to the brand, scope, and ambition of the project.</h1>
          <p className="section-copy mt-6">
            Reach out for a custom proposal and we will shape the right creative direction around your goals.
          </p>
        </motion.div>
      </section>
      <Contact />
    </div>
  );
}
