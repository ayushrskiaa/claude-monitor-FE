'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, slideInFromTop } from '@/lib/animation-utils';

const GITHUB_URL = 'https://github.com/ayushrskiaa/claude-monitor';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Claude Monitor home">
            <div className="w-7 h-7 rounded border border-accent/40 flex items-center justify-center group-hover:border-accent transition-colors duration-200">
              <Activity className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="font-mono font-bold text-sm tracking-wider text-white">
              CLAUDE<span className="text-accent">.</span>MONITOR
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            <Link
              href="#features"
              className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors duration-200"
            >
              FEATURES
            </Link>
            <Link
              href="#how-it-works"
              className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors duration-200"
            >
              HOW IT WORKS
            </Link>
            <Link
              href="/dashboard"
              className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors duration-200"
            >
              DASHBOARD
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono tracking-wider text-zinc-400 hover:text-white transition-colors duration-200"
              aria-label="View on GitHub"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
            <Link href="/dashboard" className="btn-primary text-xs py-2 px-4">
              OPEN DASHBOARD
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded text-zinc-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              variants={slideInFromTop}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed top-14 left-0 right-0 z-50 glass border-b border-white/5 md:hidden"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col p-4 gap-1">
                {[
                  { href: '#features', label: 'FEATURES' },
                  { href: '#how-it-works', label: 'HOW IT WORKS' },
                  { href: '/dashboard', label: 'DASHBOARD' },
                ].map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-mono tracking-wider text-zinc-400 hover:text-white py-3 px-4 rounded hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
                <div className="mt-2 pt-4 border-t border-white/5 flex flex-col gap-2">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-xs justify-center"
                  >
                    <Github className="w-4 h-4" />
                    VIEW ON GITHUB
                  </a>
                  <Link
                    href="/dashboard"
                    className="btn-primary text-xs justify-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    OPEN DASHBOARD
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
