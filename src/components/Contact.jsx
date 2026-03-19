import { useState } from 'react';
import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { services } from '../utils/constants';
import emailjs from "@emailjs/browser";

const initialForm = {
  name: '',
  email: '',
  phone: '',
  service: services[0]?.title ?? '',
  budget: '',
  message: '',
};

function FieldLabel({ children }) {
  return <span className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[#A855F7]/72">{children}</span>;
}

function baseFieldClasses() {
  return 'w-full rounded-lg border border-white/10 bg-[#1A1A2E]/70 px-4 py-3.5 text-sm text-white outline-none transition duration-300 placeholder:text-white/40 focus:border-[#7C3AED] focus:shadow-[0_0_10px_rgba(124,58,237,0.4)]';
}

export default function Contact({ sectionId = 'contact' }) {
  const { ref, isInView, variants } = useScrollAnimation();
  const [formData, setFormData] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setIsSuccess(false);

  try {
    // 1️⃣ Send to admin
    await emailjs.send(
      "service_hl5morn",
      "template_8tz28nd",
      formData,
      "AMObDIJrB0HMubKLV"
    );

    // 2️⃣ Auto reply to user
    await emailjs.send(
      "service_hl5morn",
      "template_u2324bg",
      formData,
      "AMObDIJrB0HMubKLV"
    );

    // Success
    setIsSuccess(true);
    setFormData(initialForm);

  } catch (err) {
    console.error("EmailJS Error:", err);
    alert("Failed to send message");
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <section id={sectionId} ref={ref} className="section-shell scroll-mt-28">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        className="mx-auto max-w-3xl"
      >
        <div className="mb-8 text-center">
          <span className="inline-flex rounded-full border border-[#7C3AED]/20 bg-white/5 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.38em] text-[#A855F7]/80">
            Contact
          </span>
          <h2 className="mt-6 font-display text-4xl leading-[0.95] text-white sm:text-5xl">
            Start Your Project With Us
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
            Tell us about your idea and our team will get back to you.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <FieldLabel>Name</FieldLabel>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={baseFieldClasses()}
                required
              />
            </label>

            <label className="block">
              <FieldLabel>Email</FieldLabel>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={baseFieldClasses()}
                required
              />
            </label>

            <label className="block">
              <FieldLabel>Phone</FieldLabel>
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={baseFieldClasses()}
              />
            </label>

            <label className="block">
              <FieldLabel>Service Needed</FieldLabel>
              <select name="service" value={formData.service} onChange={handleChange} className={baseFieldClasses()}>
                {services.map((service) => (
                  <option key={service.title} value={service.title} className="bg-[#1A1A2E] text-white">
                    {service.title}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-4">
            <label className="block">
              <FieldLabel>Budget</FieldLabel>
              <input
                name="budget"
                type="text"
                value={formData.budget}
                onChange={handleChange}
                placeholder="Enter your estimated budget"
                className={baseFieldClasses()}
              />
            </label>

            <label className="block">
              <FieldLabel>Message</FieldLabel>
              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project, goals, and timeline."
                className={baseFieldClasses()}
                required
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#A855F7] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_25px_rgba(124,58,237,0.4)] transition duration-300 hover:shadow-[0_0_34px_rgba(124,58,237,0.52)] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? 'Sending Request...' : 'Send Project Request'}
            </motion.button>

            {isSuccess ? (
              <p className="text-sm leading-6 text-[#7C3AED]">
                Thank you! We will contact you shortly.
              </p>
            ) : (
              <p className="text-sm leading-6 text-white/50">
                Clear details help us respond faster.
              </p>
            )}
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}


