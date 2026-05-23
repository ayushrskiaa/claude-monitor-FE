'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Save } from 'lucide-react';
import { modalBackdrop, modalContent } from '@/lib/animation-utils';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  serverUrl: string;
  apiKey: string;
  onSave: (serverUrl: string, apiKey: string) => void;
}

export function SettingsModal({ open, onClose, serverUrl, apiKey, onSave }: SettingsModalProps) {
  const [url, setUrl] = useState(serverUrl);
  const [key, setKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) { setError('Server URL is required.'); return; }
    if (!key.trim()) { setError('API Key is required.'); return; }

    try { new URL(url); } catch { setError('Enter a valid URL.'); return; }

    onSave(url.trim(), key.trim());
    onClose();
  };

  // Sync latest props into local state whenever the modal opens
  useEffect(() => {
    if (open) {
      setUrl(serverUrl);
      setKey(apiKey);
      setError('');
    }
  }, [open, serverUrl, apiKey]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={modalBackdrop}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              variants={modalContent}
              initial="initial"
              animate="animate"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="settings-title"
              className="pointer-events-auto w-full max-w-md rounded-xl border border-white/8 overflow-hidden"
              style={{ background: '#221e18' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                <h2 id="settings-title" className="font-mono font-bold text-sm tracking-wider">
                  SETTINGS
                </h2>
                <button
                  onClick={onClose}
                  className="text-stone-600 hover:text-stone-300 transition-colors"
                  aria-label="Close settings"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSave} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-mono text-stone-500 tracking-wider mb-2">
                    SERVER URL
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="input-field"
                    spellCheck={false}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 tracking-wider mb-2">
                    API KEY
                  </label>
                  <div className="relative">
                    <input
                      type={showKey ? 'text' : 'password'}
                      value={key}
                      onChange={e => setKey(e.target.value)}
                      className="input-field pr-10"
                      spellCheck={false}
                    />
                    <button
                      type="button"
                      onClick={() => setShowKey(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400 transition-colors"
                      aria-label={showKey ? 'Hide key' : 'Show key'}
                    >
                      {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-[#e08373] font-mono" role="alert">{error}</p>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn-secondary flex-1 justify-center text-xs"
                  >
                    CANCEL
                  </button>
                  <button type="submit" className="btn-primary flex-1 justify-center text-xs">
                    <Save className="w-3.5 h-3.5" />
                    SAVE
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
