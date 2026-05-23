'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delta?: string;
  deltaPositive?: boolean;
  accent?: boolean;
}

export function StatCard({ label, value, icon: Icon, delta, deltaPositive = true, accent = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden rounded-lg border border-white/7 p-4 transition-all duration-300"
      style={{ background: '#221e18' }}
    >
      {accent && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-5"
          style={{ background: 'radial-gradient(ellipse at top left, #d97757, transparent 60%)' }}
        />
      )}

      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-mono text-stone-500 tracking-wider">{label}</p>
        <div
          className={`w-7 h-7 rounded flex items-center justify-center ${
            accent ? 'bg-accent/15 text-accent' : 'bg-white/5 text-stone-500'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      <p
        className="font-mono font-bold text-2xl tracking-tight"
        style={{ color: accent ? '#e8916f' : '#f5f0e8' }}
      >
        {value}
      </p>

      {delta && (
        <p
          className={`text-xs font-mono mt-1 ${
            deltaPositive ? 'text-[#9bc285]' : 'text-[#e08373]'
          }`}
        >
          {deltaPositive ? '↑' : '↓'} {delta}
        </p>
      )}
    </motion.div>
  );
}
