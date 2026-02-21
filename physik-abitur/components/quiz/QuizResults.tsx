'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SECTION_STAGGER } from '@/lib/transitions';
import { Trophy, Clock, RotateCcw } from 'lucide-react';
import { TextWithMath } from '@/components/lesson/TextWithMath';
import type { QuizQuestion } from '@/lib/types';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  timeSeconds: number;
  wrongIndices: number[];
  questions: QuizQuestion[];
  moduleSlug: string;
  chapterSlug: string;
  topicSlug: string;
  topicTitle: string;
  passed: boolean;
  onRetry: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m} min ${s} s` : `${s} s`;
}

function getCorrectAnswerDisplay(q: QuizQuestion): string {
  switch (q.type) {
    case 'multiple-choice':
    case 'formula-select':
      const idx = q.correct ?? -1;
      return q.options?.[idx] ?? '-';
    case 'numeric':
      const ans = q.answer ?? 0;
      const unit = q.unit ?? '';
      return `${ans} ${unit}`.trim();
    case 'drag-drop':
      const pairs = (q.correctPairs ?? []) as [number, number][];
      const items = q.items ?? [];
      const targets = q.targets ?? [];
      return pairs.map(([i, t]) => `${items[i]} → ${targets[t]}`).join(', ');
    case 'sort':
      const order = q.correctOrder ?? [];
      const sortedItems = q.items ?? [];
      return order.map((i) => sortedItems[i]).join(' → ');
    default:
      return '-';
  }
}

export function QuizResults({
  score,
  totalQuestions,
  timeSeconds,
  wrongIndices,
  questions,
  moduleSlug,
  chapterSlug,
  topicSlug,
  topicTitle,
  passed,
  onRetry,
}: QuizResultsProps) {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  return (
    <motion.div
      initial={SECTION_STAGGER.initial}
      animate={SECTION_STAGGER.animate}
      transition={SECTION_STAGGER.transition}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center">
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
          passed ? 'bg-atom/20' : 'bg-schwingungen/20'
        }`}>
          <Trophy className={`w-12 h-12 ${passed ? 'text-atom' : 'text-schwingungen'}`} />
        </div>
        <h2 className="text-2xl font-heading font-bold mb-2">
          {passed ? 'Bestanden!' : 'Noch nicht bestanden'}
        </h2>
        <p className="text-text-dim mb-4">
          {passed
            ? 'Du hast das Quiz mit mindestens 80 % bestanden. Das Kapitel gilt als abgeschlossen.'
            : 'Du brauchst mindestens 80 %, um das Quiz zu bestehen.'}
        </p>
        <div className="flex items-center justify-center gap-8 text-lg">
          <span className="flex items-center gap-2">
            <span className="font-mono font-bold text-elektrizitaet">{percentage} %</span>
            <span className="text-text-dim">({score}/{totalQuestions} richtig)</span>
          </span>
          <span className="flex items-center gap-2 text-text-dim">
            <Clock className="w-5 h-5" />
            {formatTime(timeSeconds)}
          </span>
        </div>
      </div>

      {wrongIndices.length > 0 && (
        <div className="rounded-xl border border-border bg-surface2/50 p-6">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Falsche Antworten & Korrekturen
          </h3>
          <ul className="space-y-4">
            {wrongIndices.map((idx) => {
              const q = questions[idx];
              if (!q) return null;
              return (
                <li key={q.id} className="p-4 rounded-lg bg-surface border border-border">
                  <TextWithMath content={q.question} className="font-medium text-sm mb-2" as="p" />
                  <p className="text-atom text-sm">
                    <span className="text-text-dim">Richtig: </span>
                    <TextWithMath content={getCorrectAnswerDisplay(q)} as="span" />
                  </p>
                  {q.explanation && (
                    <TextWithMath content={q.explanation} className="text-text-dim text-sm mt-2" as="p" />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="px-6 py-3 rounded-xl border border-border bg-surface2 hover:bg-surface2/80 font-medium transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Wiederholen
        </button>
        <Link
          href={`/${moduleSlug}/${chapterSlug}/${topicSlug}`}
          className="px-6 py-3 rounded-xl bg-elektrizitaet text-white font-medium hover:bg-elektrizitaet/90 transition-colors"
        >
          Zurück zur Lektion
        </Link>
        {passed && (
          <Link
            href={`/${moduleSlug}`}
            className="px-6 py-3 rounded-xl border border-atom text-atom hover:bg-atom/10 font-medium transition-colors"
          >
            Zum Modul
          </Link>
        )}
      </div>
    </motion.div>
  );
}
