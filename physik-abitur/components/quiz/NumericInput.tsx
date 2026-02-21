'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TextWithMath } from '@/components/lesson/TextWithMath';
import type { QuizQuestion } from '@/lib/types';

interface NumericInputProps {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

function parseNumericInput(value: string): number | null {
  const cleaned = value.replace(',', '.').replace(/\s/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function isWithinTolerance(given: number, expected: number, tolerance: number): boolean {
  if (expected === 0) return given === 0;
  const relDiff = Math.abs(given - expected) / Math.abs(expected);
  return relDiff <= tolerance;
}

export function NumericInput({ question, onAnswer, disabled }: NumericInputProps) {
  const [input, setInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrectState] = useState(false);

  const expected = question.answer ?? 0;
  const tolerance = question.tolerance ?? 0.05;
  const unit = question.unit ?? '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || showFeedback) return;
    const value = parseNumericInput(input);
    if (value === null) return;
    const ok = isWithinTolerance(value, expected, tolerance);
    setCorrectState(ok);
    setShowFeedback(true);
    onAnswer(ok);
  };

  return (
    <div className="space-y-4">
      <TextWithMath content={question.question} className="font-medium text-lg" as="p" />
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[120px]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={disabled || showFeedback}
            placeholder="Zahl eingeben"
            className="w-full px-4 py-3 rounded-xl bg-surface2 border border-border text-text font-mono focus:outline-none focus:ring-2 focus:ring-elektrizitaet"
          />
        </div>
        {unit && (
          <span className="text-text-dim font-mono pb-3">{unit}</span>
        )}
        <button
          type="submit"
          disabled={disabled || showFeedback || !input.trim()}
          className="px-5 py-3 rounded-xl bg-elektrizitaet text-white font-medium hover:bg-elektrizitaet/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Prüfen
        </button>
      </form>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl border border-border"
            style={{ backgroundColor: correct ? 'rgba(62, 207, 142, 0.1)' : 'rgba(255, 122, 92, 0.1)' }}
          >
            <div className="flex items-start gap-2 mb-2">
              {correct ? <CheckCircle2 className="w-5 h-5 text-atom shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-schwingungen shrink-0 mt-0.5" />}
              <p className="text-sm text-text-dim">{question.explanation}</p>
            </div>
            {!correct && question.solution && (
              <p className="text-sm text-text-muted font-mono mt-2">Lösung: <TextWithMath content={question.solution} as="span" /></p>
            )}
            {question.hint && !correct && (
              <p className="text-xs text-text-muted mt-2">💡 <TextWithMath content={question.hint} as="span" /></p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
