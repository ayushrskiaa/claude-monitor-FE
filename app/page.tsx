'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Activity, Eye, Shield, Zap, Users, BarChart3, Terminal,
  ArrowRight, Star, Github, ChevronRight, CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CursorGradient } from '@/components/CursorGradient';
import { HeroTerminal } from '@/components/HeroTerminal';
import {
  staggerContainer, staggerItem, fadeInUp, scaleIn,
  hoverLift, hoverGlow,
} from '@/lib/animation-utils';

const GITHUB_URL = 'https://github.com/ayushrskiaa/claude-monitor';
const GITHUB_STARS_URL = 'https://github.com/ayushrskiaa/claude-monitor/stargazers';

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Activity,
    label: '// REAL-TIME',
    title: 'Live Event Stream',
    description:
      'Every tool call surfaces instantly via WebSocket. Zero polling, zero delay — just a direct feed from your Claude agents.',
  },
  {
    icon: Eye,
    label: '// VISIBILITY',
    title: 'Complete Observability',
    description:
      'See tool names, inputs, outputs, session IDs, and timing for every single operation your agent performs.',
  },
  {
    icon: Shield,
    label: '// SECURITY',
    title: 'Sensitive File Detection',
    description:
      'Automatically flags access to .env, /etc/passwd, SSH keys, and other sensitive paths before damage is done.',
  },
  {
    icon: Zap,
    label: '// PERFORMANCE',
    title: 'Duration Tracking',
    description:
      'Measure exactly how long each tool call takes. Identify slow operations and optimize your agent pipelines.',
  },
  {
    icon: Users,
    label: '// SESSIONS',
    title: 'Multi-Session Support',
    description:
      'Track multiple agent sessions simultaneously. Filter by session ID to drill into any single run.',
  },
  {
    icon: BarChart3,
    label: '// ANALYTICS',
    title: 'Success Rate Metrics',
    description:
      'Monitor success/error/flagged ratios over time. Catch regressions before they reach production.',
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Add the Hook',
    description:
      'Drop a single agent hook into your Claude Code configuration. It captures every tool call automatically.',
    code: '~/.claude/settings.json',
  },
  {
    step: '02',
    title: 'Run the Backend',
    description:
      'Start the lightweight Go server locally or deploy it anywhere. It receives and stores every event in real-time.',
    code: './claude-monitor serve',
  },
  {
    step: '03',
    title: 'Watch the Dashboard',
    description:
      'Open the dashboard, connect with your API key, and see every tool call stream in live.',
    code: 'localhost:3001/dashboard',
  },
] as const;

const USE_CASES = [
  {
    icon: Shield,
    title: 'Security Audits',
    description:
      'Know exactly what files your agents touch. Catch unauthorized access to secrets or system files instantly.',
    tag: 'SECURITY',
  },
  {
    icon: CheckCircle2,
    title: 'Compliance Logging',
    description:
      'Maintain an auditable log of all agent actions. Export as JSON for compliance reporting.',
    tag: 'COMPLIANCE',
  },
  {
    icon: Zap,
    title: 'Performance Tuning',
    description:
      'Find bottlenecks in your agent workflows by measuring tool call durations and identifying slow paths.',
    tag: 'PERFORMANCE',
  },
  {
    icon: Users,
    title: 'Team Transparency',
    description:
      'Give your whole team visibility into what AI agents are doing in your codebase — no black boxes.',
    tag: 'TEAMS',
  },
] as const;

// ─── Section Components ────────────────────────────────────────────────────────

function SectionReveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono tracking-widest text-accent mb-3">{children}</p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="relative bg-black overflow-x-hidden">
      <CursorGradient />
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen dot-grid flex items-center pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(153,69,222,0.08) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItem} className="flex items-center gap-2 mb-6">
                <span className="text-xs font-mono text-accent tracking-widest">
                  // OPEN SOURCE DEVELOPER TOOL
                </span>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                className="font-mono font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white"
              >
                See Every
                <br />
                Tool Call.
                <br />
                <span className="text-accent">In Real-time.</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="mt-5 text-base text-zinc-400 leading-relaxed max-w-md font-sans"
              >
                Claude Monitor gives you complete visibility into every file read, shell command,
                and web search your Claude agents perform — streamed live to your dashboard.
              </motion.p>

              <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard" className="btn-primary text-sm">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={GITHUB_STARS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  <Star className="w-4 h-4 text-yellow-400" />
                  Star the Repo
                </a>
              </motion.div>

              <motion.div
                variants={staggerItem}
                className="mt-8 flex items-center gap-4 text-xs font-mono text-zinc-600"
              >
                {['MIT License', 'Zero telemetry', 'Self-hosted'].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-accent/60" />
                    {tag}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Terminal */}
            <HeroTerminal />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal className="mb-12">
            <SectionLabel>// FEATURES</SectionLabel>
            <h2 className="font-mono font-bold text-3xl sm:text-4xl text-white">
              Everything you need
              <br />
              <span className="text-zinc-500">to trust your agents.</span>
            </h2>
          </SectionReveal>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {FEATURES.map(({ icon: Icon, label, title, description }) => (
              <motion.div
                key={title}
                variants={staggerItem}
                whileHover="hover"
                initial="rest"
              >
                <motion.div
                  variants={hoverLift}
                  className="h-full rounded-xl border border-white/7 p-5 transition-colors duration-300 hover:border-accent/30 cursor-default"
                  style={{ background: '#0a0a0a' }}
                >
                  <motion.div variants={hoverGlow} className="rounded-xl">
                    <p className="text-xs font-mono text-accent tracking-widest mb-3">{label}</p>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded border border-white/8 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-mono font-bold text-sm text-white mb-1.5">{title}</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed font-sans">{description}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal className="mb-12">
            <SectionLabel>// HOW IT WORKS</SectionLabel>
            <h2 className="font-mono font-bold text-3xl sm:text-4xl text-white">
              Up in three steps.
              <br />
              <span className="text-zinc-500">No config hell.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
            {HOW_IT_WORKS.map(({ step, title, description, code }, idx) => (
              <SectionReveal key={step}>
                <div
                  className="relative h-full p-6 lg:p-8"
                  style={{ background: '#060606' }}
                >
                  {idx < HOW_IT_WORKS.length - 1 && (
                    <ChevronRight
                      className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-700 z-10"
                      aria-hidden="true"
                    />
                  )}
                  <span className="font-mono font-bold text-5xl text-white/5 block mb-4 leading-none select-none">
                    {step}
                  </span>
                  <h3 className="font-mono font-bold text-base text-white mb-2">{title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mb-4 font-sans">{description}</p>
                  <code className="text-[11px] font-code text-accent/80 bg-accent/8 px-2 py-1 rounded">
                    {code}
                  </code>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal className="mb-12">
            <SectionLabel>// USE CASES</SectionLabel>
            <h2 className="font-mono font-bold text-3xl sm:text-4xl text-white">
              Built for teams that
              <br />
              <span className="text-zinc-500">ship with confidence.</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {USE_CASES.map(({ icon: Icon, title, description, tag }) => (
              <SectionReveal key={title}>
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-xl border border-white/7 p-6 hover:border-accent/25 transition-colors duration-300 cursor-default"
                  style={{ background: '#0a0a0a' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded border border-white/8 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="badge badge-running text-[9px]">{tag}</span>
                  </div>
                  <h3 className="font-mono font-bold text-sm text-white mb-2">{title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed font-sans">{description}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionReveal>
            <div
              className="relative rounded-2xl border border-white/8 overflow-hidden p-12 lg:p-16 text-center"
              style={{ background: '#0a0a0a' }}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(153,69,222,0.1) 0%, transparent 60%)',
                }}
              />
              <div className="relative z-10">
                <p className="text-xs font-mono text-accent tracking-widest mb-4">
                  // GET STARTED TODAY
                </p>
                <h2 className="font-mono font-bold text-3xl sm:text-5xl text-white mb-4 leading-tight">
                  Trust your agents.
                  <br />
                  Verify their actions.
                </h2>
                <p className="text-sm text-zinc-500 mb-8 max-w-md mx-auto font-sans leading-relaxed">
                  Free, open-source, and self-hosted. Add it to your Claude Code workflow in minutes.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/dashboard" className="btn-primary">
                    Open Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={GITHUB_STARS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github className="w-4 h-4" />
                    Star on GitHub
                  </a>
                </div>

                {/* Social proof placeholder */}
                <div className="mt-10 flex items-center justify-center gap-2 text-xs font-mono text-zinc-700">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Claude Code hook integration · WebSocket streaming · MIT License</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
