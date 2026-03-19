import { motion } from 'framer-motion';
import Services from '../components/Services';
import Contact from '../components/Contact';

export default function ServicesPage() {
  return (
    <div className="pt-28">
      <section className="section-shell pb-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="premium-frame p-8 sm:p-12 lg:p-14">
          <span className="section-eyebrow">Agency Capabilities</span>
          <h1 className="section-title max-w-4xl">Luxury-minded creative services shaped for brands that need elegance and distinction.</h1>
          <p className="section-copy mt-6">
            We collaborate with ambitious founders and premium businesses to craft brand systems, websites, campaigns, and content with elevated execution.
          </p>
        </motion.div>
      </section>
      <Services />
      <Contact />
    </div>
  );
}
