'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CARD_ENTER } from '@/lib/transitions';
import type { Module } from '@/lib/types';

interface ModuleCardProps {
  module: Module;
  progress: number;
  index?: number;
}

function ProgressRing({ progress, color }: { progress: number; color: string }) {
  const size = 64;
  const stroke = 4;
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg className="shrink-0 -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-surface2"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
    </svg>
  );
}

export function ModuleCard({ module, progress, index = 0 }: ModuleCardProps) {
  const lessonCount = module.chapters.reduce(
    (a, c) => a + c.topics.length,
    0
  );

  return (
    <motion.div
      initial={CARD_ENTER.initial}
      animate={CARD_ENTER.animate}
      transition={{ ...CARD_ENTER.transition, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={`/${module.slug}`}
        className="block group"
        prefetch
        aria-label={`Modul ${module.title} öffnen, Fortschritt ${progress} Prozent`}
      >
        <div
          className="p-6 rounded-xl border border-border bg-surface hover:bg-surface2/50 hover:border-[var(--module-color)]/50 transition-all duration-300"
          style={{ ['--module-color' as string]: module.color }}
        >
          <div className="flex gap-4">
            <div className="relative flex items-center justify-center">
              <ProgressRing progress={progress} color={module.color} />
              <span
                className="absolute font-mono text-sm font-bold"
                style={{ color: module.color }}
              >
                {progress}%
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-lg mb-1 group-hover:translate-x-1 transition-transform">
                {module.title}
              </h3>
              <p className="text-sm text-text-dim line-clamp-2 mb-3">
                {module.description}
              </p>
              <p className="text-xs text-text-muted">
                {lessonCount} Lektionen
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
