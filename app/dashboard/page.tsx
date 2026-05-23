'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Settings, Download, Github, LogOut,
  AlertTriangle, CheckCircle2, Layers, Wifi, WifiOff,
  RefreshCw, Inbox, Star,
} from 'lucide-react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ConnectScreen } from '@/components/ConnectScreen';
import { EventCard } from '@/components/EventCard';
import { StatCard } from '@/components/StatCard';
import { SettingsModal } from '@/components/SettingsModal';
import { staggerContainer, staggerItem, fadeIn } from '@/lib/animation-utils';
import type { WebSocketEvent } from '@/hooks/useWebSocket';

const GITHUB_URL = 'https://github.com/ayushrskiaa/claude-monitor';
const GITHUB_STARS_URL = 'https://github.com/ayushrskiaa/claude-monitor/stargazers';

// ─── Connection dot ───────────────────────────────────────────────────────────

function StatusDot({ status }: { status: string }) {
  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';
  const isError = status === 'error';

  const color = isConnected
    ? '#9bc285'
    : isConnecting
    ? '#e8b878'
    : isError
    ? '#e08373'
    : '#6b5f52';

  const label = isConnected
    ? 'CONNECTED'
    : isConnecting
    ? 'CONNECTING…'
    : status === 'disconnected'
    ? 'RECONNECTING…'
    : isError
    ? 'ERROR'
    : 'DISCONNECTED';

  return (
    <div className="flex items-center gap-2" role="status" aria-label={`Connection status: ${label}`}>
      <div className="relative">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: color }}
        />
        {isConnected && (
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: color, opacity: 0.4 }}
          />
        )}
        {isConnecting && (
          <div
            className="absolute inset-0 rounded-full animate-pulse"
            style={{ background: color, opacity: 0.5 }}
          />
        )}
      </div>
      <span className="text-[10px] font-mono tracking-wider" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ status }: { status: string }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-16 h-16 rounded-2xl border border-white/7 flex items-center justify-center mb-4">
        <Inbox className="w-7 h-7 text-stone-700" />
      </div>
      <p className="font-mono font-bold text-sm text-stone-500 mb-1">No events yet</p>
      {status === 'connected' ? (
        <p className="text-xs text-stone-700 max-w-xs font-sans">
          Events will appear here as your Claude agent runs. Make sure the hook is active.
        </p>
      ) : (
        <p className="text-xs text-stone-700 max-w-xs font-sans">
          Waiting for connection… Check your server URL and API key.
        </p>
      )}
    </motion.div>
  );
}

// ─── Dashboard Nav ────────────────────────────────────────────────────────────

interface DashboardNavProps {
  status: string;
  onSettingsOpen: () => void;
  onExport: () => void;
  onDisconnect: () => void;
}

function DashboardNav({ status, onSettingsOpen, onExport, onDisconnect }: DashboardNavProps) {
  return (
    <header
      className="sticky top-0 z-40 border-b border-white/5 glass"
      style={{ background: 'rgba(26,22,18,0.85)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" aria-label="Back to home">
          <div className="w-6 h-6 rounded border border-accent/40 flex items-center justify-center group-hover:border-accent transition-colors">
            <Activity className="w-3 h-3 text-accent" />
          </div>
          <span className="font-mono font-bold text-xs tracking-wider hidden sm:block">
            CLAUDE<span className="text-accent">.</span>MONITOR
          </span>
        </Link>

        {/* Status */}
        <div className="border-l border-white/8 pl-4">
          <StatusDot status={status} />
        </div>

        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-stone-500 hover:text-cream hover:bg-white/5 rounded transition-colors"
            aria-label="Export events as JSON"
            title="Export events"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPORT</span>
          </button>

          <a
            href={GITHUB_STARS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-stone-500 hover:text-cream hover:bg-white/5 rounded transition-colors"
            aria-label="Star on GitHub"
            title="Star on GitHub"
          >
            <Star className="w-3.5 h-3.5 text-yellow-500" />
            <span className="hidden sm:inline">STAR</span>
          </a>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-stone-500 hover:text-cream hover:bg-white/5 rounded transition-colors"
            aria-label="View on GitHub"
          >
            <Github className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GITHUB</span>
          </a>

          <button
            onClick={onSettingsOpen}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-stone-500 hover:text-cream hover:bg-white/5 rounded transition-colors"
            aria-label="Open settings"
            title="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SETTINGS</span>
          </button>

          <button
            onClick={onDisconnect}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono text-stone-500 hover:text-[#e08373] hover:bg-[#d45d4a]/10 rounded transition-colors"
            aria-label="Disconnect and logout"
            title="Disconnect"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LOGOUT</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const [serverUrl, setServerUrl] = useLocalStorage('cm_server_url', '');
  const [apiKey, setApiKey] = useLocalStorage('cm_api_key', '');
  const [connected, setConnected] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [newEventIds, setNewEventIds] = useState<Set<string>>(new Set());

  const { status, events, connect, disconnect, clearEvents, reconnectCount } = useWebSocket({
    serverUrl,
    apiKey,
    onEvent: (event: WebSocketEvent) => {
      setNewEventIds(prev => {
        const next = new Set(prev);
        next.add(event.id);
        // Remove the "new" highlight after 2 seconds
        setTimeout(() => {
          setNewEventIds(s => {
            const ns = new Set(s);
            ns.delete(event.id);
            return ns;
          });
        }, 2000);
        return next;
      });
    },
  });

  // Re-connect when settings change after connecting
  useEffect(() => {
    if (connected && serverUrl && apiKey) {
      connect();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverUrl, apiKey]);

  const handleConnect = (url: string, key: string) => {
    setServerUrl(url);
    setApiKey(key);
    setConnected(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setConnected(false);
    clearEvents();
  };

  const handleSettingsSave = (url: string, key: string) => {
    setServerUrl(url);
    setApiKey(key);
  };

  const handleExport = () => {
    const data = JSON.stringify(events, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `claude-monitor-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Connect on mount if credentials exist
  useEffect(() => {
    if (serverUrl && apiKey && !connected) {
      setConnected(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (connected && serverUrl && apiKey) {
      connect();
    }
    return () => { disconnect(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  // ─── Stats ───────────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const total = events.length;
    const flagged = events.filter(e => e.status === 'flagged').length;
    const errors = events.filter(e => e.status === 'error').length;
    const success = events.filter(e => e.status === 'success').length;
    const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
    const sessions = new Set(events.map(e => e.sessionId)).size;
    return { total, flagged, errors, successRate, sessions };
  }, [events]);

  // ─── Not connected ────────────────────────────────────────────────────────

  if (!connected) {
    return <ConnectScreen onConnect={handleConnect} />;
  }

  // ─── Dashboard ────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-bg" aria-label="Claude Monitor Dashboard">
      <DashboardNav
        status={status}
        onSettingsOpen={() => setSettingsOpen(true)}
        onExport={handleExport}
        onDisconnect={handleDisconnect}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* Reconnect notice */}
        <AnimatePresence>
          {(status === 'disconnected' || status === 'error') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="flex items-center gap-3 rounded-lg border border-[#e0a14f]/25 bg-[#e0a14f]/8 px-4 py-3 text-xs font-mono text-[#e8b878]">
                {status === 'error' ? (
                  <WifiOff className="w-3.5 h-3.5 shrink-0" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5 shrink-0 animate-spin" />
                )}
                <span>
                  {status === 'error'
                    ? `Connection failed after ${reconnectCount} attempts. Check your server URL and API key.`
                    : `Connection lost. Reconnecting… (attempt ${reconnectCount})`}
                </span>
                {status === 'error' && (
                  <button
                    onClick={connect}
                    className="ml-auto px-3 py-1 rounded border border-[#e0a14f]/30 hover:bg-[#e0a14f]/12 transition-colors"
                  >
                    RETRY
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
        >
          <motion.div variants={staggerItem}>
            <StatCard
              label="TOTAL EVENTS"
              value={stats.total.toLocaleString()}
              icon={Activity}
              accent
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <StatCard
              label="FLAGGED"
              value={stats.flagged.toLocaleString()}
              icon={AlertTriangle}
              delta={stats.flagged > 0 ? `${stats.errors} errors` : undefined}
              deltaPositive={false}
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <StatCard
              label="SUCCESS RATE"
              value={`${stats.successRate}%`}
              icon={CheckCircle2}
              deltaPositive={stats.successRate >= 90}
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <StatCard
              label="SESSIONS"
              value={stats.sessions.toLocaleString()}
              icon={Layers}
            />
          </motion.div>
        </motion.div>

        {/* Event feed */}
        <div
          className="rounded-xl border border-white/7 overflow-hidden"
          style={{ background: '#1f1b16' }}
        >
          {/* Feed header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono text-stone-500 tracking-wider">EVENT FEED</p>
              {events.length > 0 && (
                <span className="text-[10px] font-mono text-stone-700">
                  ({events.length.toLocaleString()})
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {events.length > 0 && (
                <button
                  onClick={clearEvents}
                  className="text-[10px] font-mono text-stone-700 hover:text-stone-400 transition-colors px-2 py-1 rounded hover:bg-white/5"
                >
                  CLEAR
                </button>
              )}
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    status === 'connected' ? 'bg-[#9bc285] animate-pulse' : 'bg-stone-700'
                  }`}
                />
                <span className="text-[10px] font-mono text-stone-600">
                  {status === 'connected' ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>
            </div>
          </div>

          {/* Events list */}
          <div
            className="divide-y divide-white/3 overflow-y-auto"
            style={{ maxHeight: 'calc(100vh - 300px)', minHeight: 200 }}
            aria-label="Event feed"
            aria-live="polite"
            aria-relevant="additions"
          >
            <AnimatePresence mode="popLayout">
              {events.length === 0 ? (
                <EmptyState key="empty" status={status} />
              ) : (
                <div className="p-2 space-y-1">
                  {events.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isNew={newEventIds.has(event.id)}
                    />
                  ))}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        serverUrl={serverUrl}
        apiKey={apiKey}
        onSave={handleSettingsSave}
      />
    </div>
  );
}
