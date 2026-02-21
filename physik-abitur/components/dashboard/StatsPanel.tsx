'use client';

import { motion } from 'framer-motion';
import { SECTION_STAGGER } from '@/lib/transitions';
import { BookOpen, CheckCircle, Award } from 'lucide-react';
import { useProgressStore } from '@/lib/progress';
import { MILESTONES, MILESTONE_MESSAGES } from '@/lib/progress';
import { modules } from '@/lib/content';

export function StatsPanel() {
  const progress = useProgressStore((s) => s.progress) ?? { lessons: {}, quizzes: {} };

  const totalLessons = modules.reduce(
    (acc, m) => acc + m.chapters.reduce((a, c) => a + c.topics.length, 0),
    0
  );
  const completedLessons = Object.values(progress?.lessons ?? {}).filter(
    (l) => l?.completed
  ).length;
  const quizzesPassed = Object.values(progress?.quizzes ?? {}).filter(
    (q) => q?.passed
  ).length;
  const percentComplete =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  const nextMilestone = MILESTONES.find((m) => m > percentComplete) ?? 100;
  const highestReached = [...MILESTONES].reverse().find((m) => percentComplete >= m);
  const milestoneMessage = highestReached != null ? MILESTONE_MESSAGES[highestReached] : null;

  return (
    <div className="space-y-4">
      {milestoneMessage && percentComplete > 0 && (
        <motion.div
          initial={SECTION_STAGGER.initial}
          animate={SECTION_STAGGER.animate}
          transition={SECTION_STAGGER.transition}
          className="p-4 rounded-xl bg-elektrizitaet/15 border border-elektrizitaet/40"
        >
          <p className="text-elektrizitaet font-medium">{milestoneMessage}</p>
        </motion.div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-elektrizitaet/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-elektrizitaet" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono">{percentComplete}%</p>
            <p className="text-sm text-text-dim">Abgeschlossen</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-atom/20 flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-atom" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono">{completedLessons}/{totalLessons}</p>
            <p className="text-sm text-text-dim">Lektionen</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-surface border border-border flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-quantenobjekte/20 flex items-center justify-center">
            <Award className="w-6 h-6 text-quantenobjekte" />
          </div>
          <div>
            <p className="text-2xl font-bold font-mono">{quizzesPassed}</p>
            <p className="text-sm text-text-dim">Quizze bestanden</p>
          </div>
        </div>
        {percentComplete > 0 && percentComplete < 100 && (
          <div className="sm:col-span-3 p-3 rounded-lg bg-surface2/50 border border-border">
            <p className="text-sm text-text-dim">
              Nächster Meilenstein: <span className="text-elektrizitaet font-medium">{nextMilestone}%</span>
              {' '}— noch {Math.max(0, Math.ceil((totalLessons * nextMilestone) / 100) - completedLessons)} Lektionen
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
