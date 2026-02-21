'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  color?: string;
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ progress, color = '#4f9cf9', showLabel = false, className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));
  return (
    <div className={`w-full ${className}`}>
      <div className="h-2 bg-surface2 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full transition-colors"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-text-dim mt-1 block">{clamped}%</span>
      )}
    </div>
  );
}
