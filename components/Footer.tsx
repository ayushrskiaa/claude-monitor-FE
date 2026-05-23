'use client';

import Link from 'next/link';
import { Github, Activity, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animation-utils';

const GITHUB_URL = 'https://github.com/ayushrskiaa/claude-monitor';
const GITHUB_STARS_URL = 'https://github.com/ayushrskiaa/claude-monitor/stargazers';

export function Footer() {
  return (
    <footer className="border-t border-cream/5 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded border border-accent/40 flex items-center justify-center">
                <Activity className="w-3 h-3 text-accent" />
              </div>
              <span className="font-mono font-bold text-sm tracking-wider">
                CLAUDE<span className="text-accent">.</span>MONITOR
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed max-w-[200px]">
              Real-time visibility into every Claude Code tool call.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-mono text-stone-600 tracking-wider mb-3">NAVIGATE</p>
            <div className="flex flex-col gap-2">
              {[
                { href: '/#features', label: 'Features' },
                { href: '/#how-it-works', label: 'How It Works' },
                { href: '/dashboard', label: 'Dashboard' },
                { href: GITHUB_URL, label: 'Documentation', external: true },
              ].map(({ href, label, external }) => (
                <Link
                  key={href}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="text-xs text-stone-500 hover:text-cream transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* GitHub CTA */}
          <div>
            <p className="text-xs font-mono text-stone-600 tracking-wider mb-3">OPEN SOURCE</p>
            <p className="text-xs text-stone-500 mb-4 leading-relaxed">
              Claude Monitor is free and open source. Star it if it helps you.
            </p>
            <a
              href={GITHUB_STARS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 text-stone-300 hover:text-cream px-4 py-2 rounded transition-all duration-200"
            >
              <Star className="w-3.5 h-3.5 text-yellow-400" />
              STAR ON GITHUB
            </a>
          </div>
        </motion.div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-600 font-mono">
            © {new Date().getFullYear()} Claude Monitor. MIT License.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-stone-600 hover:text-stone-400 transition-colors"
            aria-label="GitHub repository"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="font-mono">ayushrskiaa/claude-monitor</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
