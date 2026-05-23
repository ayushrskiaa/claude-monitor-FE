'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animation-utils';

const GITHUB_URL = 'https://github.com/ayushrskiaa/claude-monitor';
const DEFAULT_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000';

interface ConnectScreenProps {
  onConnect: (serverUrl: string, apiKey: string) => void;
}

export function ConnectScreen({ onConnect }: ConnectScreenProps) {
  const [serverUrl, setServerUrl] = useState(DEFAULT_URL);
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!serverUrl.trim()) {
      setError('Server URL is required.');
      return;
    }
    if (!apiKey.trim()) {
      setError('API Key is required.');
      return;
    }

    try {
      new URL(serverUrl);
    } catch {
      setError('Enter a valid URL (e.g. http://localhost:3000).');
      return;
    }

    setLoading(true);
    // Small delay for UX feedback before handing off to parent
    await new Promise(r => setTimeout(r, 400));
    setLoading(false);
    onConnect(serverUrl.trim(), apiKey.trim());
  };

  return (
    <div className="min-h-screen bg-bg dot-grid flex items-center justify-center px-4 py-20">
      {/* Ambient */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(217,119,87,0.08) 0%, transparent 70%)',
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <motion.div variants={staggerItem} className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded border border-accent/40 flex items-center justify-center">
            <Activity className="w-4 h-4 text-accent" />
          </div>
          <span className="font-mono font-bold tracking-wider">
            CLAUDE<span className="text-accent">.</span>MONITOR
          </span>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={staggerItem}
          className="rounded-xl border border-white/8 overflow-hidden"
          style={{ background: '#221e18' }}
        >
          <div className="px-6 pt-6 pb-4 border-b border-white/5">
            <h1 className="font-mono font-bold text-lg tracking-wide text-cream">
              Connect to Server
            </h1>
            <p className="text-xs text-stone-500 mt-1 font-sans">
              Enter your Claude Monitor server details to start monitoring.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Server URL */}
            <div>
              <label className="block text-xs font-mono text-stone-500 tracking-wider mb-2">
                SERVER URL
              </label>
              <input
                type="url"
                value={serverUrl}
                onChange={e => setServerUrl(e.target.value)}
                placeholder="http://localhost:3000"
                className="input-field"
                autoComplete="url"
                spellCheck={false}
              />
            </div>

            {/* API Key */}
            <div>
              <label className="block text-xs font-mono text-stone-500 tracking-wider mb-2">
                API KEY
              </label>
              <div className="relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  placeholder="your-secret-key"
                  className="input-field pr-10"
                  autoComplete="current-password"
                  spellCheck={false}
                />
                <button
                  type="button"
                  onClick={() => setShowKey(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400 transition-colors"
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.p
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                className="text-xs text-[#e08373] font-mono"
                role="alert"
              >
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin" />
                  CONNECTING…
                </>
              ) : (
                <>
                  CONNECT
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            {/* Doc link */}
            <p className="text-center text-xs text-stone-600">
              Need help?{' '}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-bright transition-colors inline-flex items-center gap-1"
              >
                View documentation <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
