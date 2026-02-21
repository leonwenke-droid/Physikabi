'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useProgressStore } from '@/lib/progress';
import { BADGES } from '@/lib/progress';

export function BadgesPanel() {
  const unlockedIds = useProgressStore(useShallow((s) => s.getUnlockedBadges()));

  if (unlockedIds.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <h3 className="flex items-center gap-2 text-sm font-medium text-text-dim uppercase tracking-wider mb-3">
        <Award className="w-4 h-4" />
        Erfolge
      </h3>
      <div className="flex flex-wrap gap-2">
        {BADGES.filter((b) => unlockedIds.includes(b.id)).map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface2/80 border border-border"
            title={b.name}
          >
            <span className="text-lg">{b.emoji}</span>
            <span className="text-sm font-medium">{b.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
