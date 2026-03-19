import { memo, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useActiveSection from '../hooks/useActiveSection';
import { homeSectionIds, navLinks } from '../utils/constants';
import logo from '../assets/logo3.png';

const Logo = memo(function Logo({ onHome }) {
  return (
    <Link to="/#home" onClick={onHome} className="flex items-center gap-3" data-cursor-hover>
      <div className="flex items-center justify-center rounded-[16px] border border-[#7C3AED]/18 bg-white/[0.04] px-3 py-2 shadow-[0_18px_40px_rgba(0,0,0,0.32)] transition duration-300 hover:border-[#7C3AED]/34 hover:shadow-[0_0_28px_rgba(124,58,237,0.18)]">
        <img src={logo} alt="Unique Studios" className="h-9 w-auto object-contain" />
      </div>
      <div className="hidden sm:block">
        <p className="font-display text-[1.5rem] leading-none tracking-[0.05em] text-white">Unique Studios</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.32em] text-[#A855F7]/70">Modern Creative Systems</p>
      </div>
    </Link>
  );
});

function NavItems({ activeId, onSelect, mobile = false }) {
  return navLinks.map((link) => {
    const active = activeId === link.id;

    return (
      <button
        key={link.id}
        type="button"
        onClick={() => onSelect(link.href)}
        data-cursor-hover
        data-magnetic={!mobile ? 'true' : undefined}
        className={
          mobile
            ? `w-full rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            : `magnetic-target relative px-3 py-2 text-sm font-medium tracking-[0.08em] transition ${
                active
                  ? 'text-[#A855F7]'
                  : 'text-white/70 hover:text-white hover:text-[#A855F7]'
              }`
        }
      >
        {link.label}
        {!mobile && (
          <span
            className={`absolute inset-x-2 -bottom-1 h-px bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent transition ${
              active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
            }`}
          />
        )}
      </button>
    );
  });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(homeSectionIds);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const activeId = useMemo(() => {
    if (location.pathname === '/') {
      return location.hash ? location.hash.replace('#', '') : activeSection;
    }

    return location.pathname === '/journal' ||
      location.pathname.startsWith('/journal/') ||
      location.pathname === '/blog'
      ? 'journal'
      : '';
  }, [location.pathname, location.hash, activeSection]);

  const handleSelect = (href) => {
    setOpen(false);
    navigate(href);
  };

  const handleLogoClick = () => {
    setOpen(false);
  };

  return (
    <header className={`fixed inset-x-0 top-[50px] z-50 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <div className="flex w-full items-center justify-between rounded-full border border-white/10 bg-black/40 px-4 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <Logo onHome={handleLogoClick} />

          <nav className="hidden items-center gap-2 lg:flex">
            <NavItems activeId={activeId} onSelect={handleSelect} />
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            data-cursor-hover
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-5 bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed right-0 top-0 z-50 h-full w-[70vw] max-w-xs bg-[#0B0B0F] shadow-[0_0_40px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            >
              <div className="flex h-full flex-col gap-6 px-6 py-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.32em] text-[#A855F7]/70">Menu</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
                    aria-label="Close menu"
                  >
                    X
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  <NavItems activeId={activeId} onSelect={handleSelect} mobile />
                </nav>

                <div className="mt-auto">
                  <button
                    type="button"
                    onClick={() => handleSelect('/#contact')}
                    className="w-full rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#C084FC] px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] transition hover:scale-[1.02]"
                  >
                    Start Project
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
