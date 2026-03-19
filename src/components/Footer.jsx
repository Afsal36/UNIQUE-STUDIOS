import { Link } from 'react-router-dom';
import logo from '../assets/logo3.png';
import { navLinks } from '../utils/constants';

export default function Footer() {
  return (
    <footer className="section-shell pt-10">
      <div className="relative premium-frame px-6 py-8 sm:px-8 sm:py-10">

        {/* top gradient line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/50 to-transparent" />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          {/* left side */}
          <div>
            <div className="flex items-center gap-4">

              <div className="rounded-[20px] border border-white/10 bg-white/5 px-3 py-2">
              <Link to="/" className="flex items-center gap-3">
  <img src={logo} alt="Unique Studios" className="h-10 w-auto" />
</Link>
              </div>

              <div>
                <p className="font-display text-4xl leading-none text-white">
                  Unique Studios
                </p>

                <p className="mt-1 text-xs uppercase tracking-[0.38em] text-[#C084FC]/60">
                  Modern Digital Agency
                </p>
              </div>

            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
              Premium digital experiences for ambitious brands across branding,
              websites, campaigns, and cinematic content.
            </p>
          </div>

          {/* navigation links */}
          <div className="flex flex-wrap gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.path}
                data-cursor-hover
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm tracking-[0.08em] text-white/70 transition hover:border-[#7C3AED]/30 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </footer>
  );
}