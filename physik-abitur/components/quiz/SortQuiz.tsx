'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronUp, ChevronDown } from 'lucide-react';
import { TextWithMath } from '@/components/lesson/TextWithMath';
import type { QuizQuestion } from '@/lib/types';

interface SortQuizProps {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function SortQuiz({ question, onAnswer, disabled }: SortQuizProps) {
  const items = question.items ?? [];
  const correctOrder = question.correctOrder ?? [];

  const [order, setOrder] = useState<number[]>(() => items.map((_, i) => i));
  const [showFeedback, setShowFeedback] = useState(false);

  const moveUp = (index: number) => {
    if (index <= 0 || showFeedback) return;
    const newOrder = [...order];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setOrder(newOrder);
  };

  const moveDown = (index: number) => {
    if (index >= order.length - 1 || showFeedback) return;
    const newOrder = [...order];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setOrder(newOrder);
  };

  const isCorrect = order.length === correctOrder.length && order.every((v, i) => v === correctOrder[i]);

  const handleSubmit = () => {
    setShowFeedback(true);
    onAnswer(isCorrect);
  };

  return (
    <div className="space-y-4">
      <TextWithMath content={question.question} className="font-medium text-lg" as="p" />

      <div className="space-y-2">
        {order.map((itemIdx, position) => (
          <div
            key={itemIdx}
            className="flex items-center gap-2 p-3 rounded-xl border border-border bg-surface2"
          >
            <span className="text-text-muted font-mono w-6">{position + 1}.</span>
            <span className="flex-1 font-mono">{items[itemIdx]}</span>
            {!showFeedback && (
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => moveUp(position)}
                  disabled={position === 0 || disabled}
                  className="p-1 rounded hover:bg-surface disabled:opacity-30"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => moveDown(position)}
                  disabled={position === order.length - 1 || disabled}
                  className="p-1 rounded hover:bg-surface disabled:opacity-30"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}
            {showFeedback && (
              correctOrder[position] === itemIdx ? (
                <CheckCircle2 className="w-5 h-5 text-atom shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-schwingungen shrink-0" />
              )
            )}
          </div>
        ))}
      </div>

      {!showFeedback && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled}
          className="px-5 py-3 rounded-xl bg-elektrizitaet text-white font-medium hover:bg-elektrizitaet/90 disabled:opacity-50 transition-colors"
        >
          Prüfen
        </button>
      )}

      <AnimatePresence>
        {showFeedback && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl bg-surface2 border border-border"
          >
            <TextWithMath content={question.explanation} className="text-sm text-text-dim" as="p" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
