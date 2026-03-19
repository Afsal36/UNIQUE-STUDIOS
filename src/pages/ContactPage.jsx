import { motion } from 'framer-motion';
import Contact from '../components/Contact';

export default function ContactPage() {
  return (
    <div className="pt-28">
      <section className="section-shell pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="premium-frame p-8 sm:p-12 lg:p-14">
          <span className="section-eyebrow">Start a Project</span>
          <h1 className="section-title max-w-4xl">Bring your next campaign, brand refresh, or digital launch to life with a refined studio partner.</h1>
          <p className="section-copy mt-6">
            We shape strategy, visual language, and high-end execution around the kind of impression your brand should leave.
          </p>
        </motion.div>
      </section>
      <Contact />
    </div>
  );
}
