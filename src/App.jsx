import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackgroundFX from './components/BackgroundFX';
import ScrollManager from './components/ScrollManager';

const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

const GraphicDesigning = lazy(() => import('./pages/services/GraphicDesigning'));
const Branding = lazy(() => import('./pages/services/Branding'));
const WebDevelopment = lazy(() => import('./pages/services/WebDevelopment'));
const WebDesigning = lazy(() => import('./pages/services/WebDesigning'));
const DigitalMarketing = lazy(() => import('./pages/services/DigitalMarketing'));
const VideoEditing = lazy(() => import('./pages/services/VideoEditing'));

const CategoryPortfolio = lazy(() => import('./pages/CategoryPortfolio'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));

function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.main>
  );
}

function AppContent() {
  const location = useLocation();


useEffect(() => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}, []);
  return (
    <>
      <ScrollManager />
      <CustomCursor />
      <BackgroundFX />

      <div className="site-background relative overflow-x-hidden text-white">
        <div className="site-gradient pointer-events-none fixed inset-0 -z-20" />
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_22%),radial-gradient(circle_at_78%_18%,_rgba(124,58,237,0.14),_transparent_20%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.10),_transparent_24%)]" />

        <Navbar />

        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center text-sm text-white/70">
              Loading experience...
            </div>
          }
        >
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

              <Route path="/" element={<PageShell><Home /></PageShell>} />
              <Route path="/services" element={<PageShell><ServicesPage /></PageShell>} />
              <Route path="/portfolio" element={<PageShell><PortfolioPage /></PageShell>} />
              <Route path="/portfolio/:category" element={<PageShell><CategoryPortfolio /></PageShell>} />
              <Route path="/project/:slug" element={<PageShell><ProjectDetails /></PageShell>} />

              <Route path="/about" element={<PageShell><AboutPage /></PageShell>} />

              <Route path="/blog" element={<PageShell><BlogPage /></PageShell>} />
              <Route path="/journal" element={<PageShell><BlogPage /></PageShell>} />
              <Route path="/journal/:slug" element={<PageShell><ArticlePage /></PageShell>} />

              <Route path="/graphic-design" element={<PageShell><GraphicDesigning /></PageShell>} />
              <Route path="/branding" element={<PageShell><Branding /></PageShell>} />
              <Route path="/web-development" element={<PageShell><WebDevelopment /></PageShell>} />
              <Route path="/web-design" element={<PageShell><WebDesigning /></PageShell>} />
              <Route path="/digital-marketing" element={<PageShell><DigitalMarketing /></PageShell>} />
              <Route path="/video-editing" element={<PageShell><VideoEditing /></PageShell>} />

              <Route path="/contact" element={<PageShell><ContactPage /></PageShell>} />

            </Routes>
          </AnimatePresence>
        </Suspense>

        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return <AppContent />;
}