import { lazy, Suspense } from 'react';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import BlogPreview from '../components/BlogPreview';

const Hero3D = lazy(() => import('../components/Hero3D'));

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-sm text-white/70">Loading hero...</div>}>
        <Hero3D />
      </Suspense>
      <Services sectionId="services" />
      <Portfolio limit={6} sectionId="portfolio" />
      <About sectionId="about" />
      <Testimonials />
      <BlogPreview sectionId="journal" />
      <Contact sectionId="contact" />
    </>
  );
}

