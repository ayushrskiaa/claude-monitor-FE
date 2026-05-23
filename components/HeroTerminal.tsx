'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoEvent {
  id: string;
  tool: string;
  status: 'success' | 'error' | 'flagged' | 'running';
  detail: string;
  time: string;
  duration?: string;
}

const DEMO_POOL: Omit<DemoEvent, 'id' | 'time'>[] = [
  { tool: 'READ_FILE', status: 'success', detail: 'src/auth/middleware.ts', duration: '12ms' },
  { tool: 'BASH', status: 'success', detail: 'npm run build', duration: '3.2s' },
  { tool: 'WRITE_FILE', status: 'flagged', detail: '.env.local → SENSITIVE', duration: '4ms' },
  { tool: 'WEB_SEARCH', status: 'success', detail: '"Next.js 14 routing"', duration: '891ms' },
  { tool: 'BASH', status: 'error', detail: 'git push --force origin main', duration: '0ms' },
  { tool: 'READ_FILE', status: 'success', detail: 'lib/utils.ts', duration: '8ms' },
  { tool: 'EDIT_FILE', status: 'success', detail: 'app/dashboard/page.tsx', duration: '15ms' },
  { tool: 'BASH', status: 'running', detail: 'npx playwright test', duration: '…' },
  { tool: 'READ_FILE', status: 'flagged', detail: '/etc/passwd → SENSITIVE', duration: '6ms' },
  { tool: 'WEB_FETCH', status: 'success', detail: 'api.github.com/repos/…', duration: '234ms' },
];

const statusColors = {
  success: '#22c55e',
  error: '#ef4444',
  flagged: '#f59e0b',
  running: '#9945de',
};

const statusLabels = {
  success: '✓ OK',
  error: '✗ ERR',
  flagged: '⚠ FLAG',
  running: '◌ RUN',
};

function formatTime(): string {
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  const ss = now.getSeconds().toString().padStart(2, '0');
  const ms = now.getMilliseconds().toString().padStart(3, '0');
  return `${hh}:${mm}:${ss}.${ms}`;
}

export function HeroTerminal() {
  const [events, setEvents] = useState<DemoEvent[]>([]);
  const poolIndexRef = useRef(5);

  // Populate on mount to avoid SSR/client hydration mismatch with timestamps
  useEffect(() => {
    setEvents(DEMO_POOL.slice(0, 5).map((e, i) => ({ ...e, id: `init-${i}`, time: formatTime() })));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = DEMO_POOL[poolIndexRef.current % DEMO_POOL.length];
      poolIndexRef.current += 1;
      const newEvent: DemoEvent = {
        ...next,
        id: `live-${Date.now()}`,
        time: formatTime(),
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 8));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-lg mx-auto lg:mx-0"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -m-4 rounded-2xl opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(153,69,222,0.15) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Terminal window */}
      <div
        className="relative rounded-xl overflow-hidden border border-white/8"
        style={{ background: '#060606' }}
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5" style={{ background: '#0c0c0c' }}>
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="ml-2 text-xs font-mono text-zinc-500 flex-1 text-center">
            claude-monitor — live events
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-label="Live" />
            <span className="text-xs font-mono text-green-500">LIVE</span>
          </div>
        </div>

        {/* Events */}
        <div className="p-3 space-y-1 min-h-[320px] font-code text-[11px]">
          <AnimatePresence mode="popLayout">
            {events.map(event => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-start gap-2 p-2 rounded-md"
                style={{ background: 'rgba(255,255,255,0.025)' }}
              >
                {/* Status badge */}
                <span
                  className="shrink-0 font-mono font-bold"
                  style={{ color: statusColors[event.status], minWidth: 44 }}
                >
                  {statusLabels[event.status]}
                </span>

                {/* Tool name */}
                <span
                  className="shrink-0 font-mono font-bold"
                  style={{ color: '#9945de', minWidth: 80 }}
                >
                  {event.tool}
                </span>

                {/* Detail */}
                <span className="text-zinc-400 truncate flex-1">{event.detail}</span>

                {/* Time */}
                <span className="shrink-0 text-zinc-600 ml-auto pl-2">{event.time}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-2 border-t border-white/5"
          style={{ background: '#0c0c0c' }}
        >
          <span className="font-mono text-xs text-zinc-600">
            session: <span className="text-zinc-500">4a9f2b1e</span>
          </span>
          <span className="font-mono text-xs text-zinc-600">
            {events.length} events
          </span>
          <span className="font-mono text-xs text-zinc-600 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-accent animate-pulse inline-block" />
            connected
          </span>
        </div>
      </div>
    </motion.div>
  );
}
