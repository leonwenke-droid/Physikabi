'use client';

import { Flame } from 'lucide-react';
import { useProgressStore } from '@/lib/progress';

export function StreakCounter() {
  const streak = useProgressStore((s) => s.progress.streak);

  if (streak.current === 0) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface2 border border-border">
        <Flame className="w-5 h-5 text-text-muted" />
        <span className="text-sm text-text-dim">
          Starte deinen Lernstreak!
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/40">
      <Flame className="w-5 h-5 text-orange-400" />
      <span className="text-sm font-medium">
        <span className="text-orange-400">{streak.current}</span>
        <span className="text-text-dim ml-1">
          {streak.current === 1 ? 'Tag' : 'Tage'} in Folge
        </span>
      </span>
    </div>
  );
}
