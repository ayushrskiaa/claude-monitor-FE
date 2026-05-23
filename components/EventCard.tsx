'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import type { WebSocketEvent } from '@/hooks/useWebSocket';

interface EventCardProps {
  event: WebSocketEvent;
  isNew?: boolean;
}

const STATUS_CONFIG = {
  success: {
    label: 'SUCCESS',
    icon: CheckCircle2,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.18)',
  },
  error: {
    label: 'ERROR',
    icon: XCircle,
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.18)',
  },
  flagged: {
    label: 'FLAGGED',
    icon: AlertTriangle,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.18)',
  },
  running: {
    label: 'RUNNING',
    icon: Loader2,
    color: '#9945de',
    bg: 'rgba(153,69,222,0.08)',
    border: 'rgba(153,69,222,0.18)',
  },
} as const;

function formatTimestamp(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('en', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return iso;
  }
}

function truncateSessionId(id: string): string {
  return id.length > 12 ? `${id.slice(0, 8)}…` : id;
}

export function EventCard({ event, isNew = false }: EventCardProps) {
  const cfg = STATUS_CONFIG[event.status] ?? STATUS_CONFIG.success;
  const Icon = cfg.icon;

  return (
    <motion.div
      layout
      initial={isNew ? { opacity: 0, y: -12 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-start gap-3 rounded-lg border px-4 py-3 transition-all duration-200 hover:border-white/12"
      style={{
        background: '#0a0a0a',
        borderColor: isNew ? cfg.border : 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Left accent line for flagged/error */}
      {(event.status === 'flagged' || event.status === 'error') && (
        <div
          className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r"
          style={{ background: cfg.color }}
          aria-hidden="true"
        />
      )}

      {/* Status icon */}
      <div className="shrink-0 mt-0.5">
        <Icon
          className={`w-3.5 h-3.5 ${event.status === 'running' ? 'animate-spin' : ''}`}
          style={{ color: cfg.color }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono font-bold text-xs tracking-wider text-white">
            {event.tool}
          </span>
          <span
            className="badge text-[9px]"
            style={{ color: cfg.color, background: cfg.bg, borderColor: cfg.border }}
          >
            {cfg.label}
          </span>
          {event.duration !== undefined && (
            <span className="text-[10px] font-code text-zinc-600">{event.duration}ms</span>
          )}
        </div>

        {event.filePath && (
          <p className="mt-0.5 text-[11px] font-code text-zinc-500 truncate">{event.filePath}</p>
        )}
        {event.error && (
          <p className="mt-0.5 text-[11px] font-code text-red-400/80 truncate">{event.error}</p>
        )}
      </div>

      {/* Right meta */}
      <div className="shrink-0 text-right">
        <p className="text-[10px] font-code text-zinc-600">{formatTimestamp(event.timestamp)}</p>
        <p className="text-[10px] font-code text-zinc-700 mt-0.5">
          {truncateSessionId(event.sessionId)}
        </p>
      </div>
    </motion.div>
  );
}
