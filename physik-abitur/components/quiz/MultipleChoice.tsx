'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TextWithMath } from '@/components/lesson/TextWithMath';
import type { QuizQuestion } from '@/lib/types';

interface MultipleChoiceProps {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function MultipleChoice({ question, onAnswer, disabled }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index: number) => {
    if (disabled || selected !== null) return;
    setSelected(index);
    setShowFeedback(true);
    const correct = index === (question.correct ?? -1);
    onAnswer(correct);
  };

  const correctIndex = question.correct ?? -1;

  return (
    <div className="space-y-4">
      <TextWithMath content={question.question} className="font-medium text-lg" as="p" />
      <ul className="space-y-2">
        {question.options?.map((option, i) => {
          const isSelected = selected === i;
          const isCorrectOption = i === correctIndex;
          let stateClass = 'hover:bg-surface2 border-border';
          if (showFeedback) {
            if (isSelected) {
              stateClass = isCorrectOption ? 'bg-atom/20 border-atom' : 'bg-schwingungen/20 border-schwingungen';
            } else if (isCorrectOption) {
              stateClass = 'bg-atom/10 border-atom/50';
            }
          }

          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => handleSelect(i)}
                disabled={disabled || showFeedback}
                className={`w-full text-left p-4 rounded-xl border transition-all ${stateClass} ${
                  showFeedback ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className="flex items-center gap-3">
                  {showFeedback && isSelected && (
                    isCorrectOption ? <CheckCircle2 className="w-5 h-5 text-atom shrink-0" /> : <XCircle className="w-5 h-5 text-schwingungen shrink-0" />
                  )}
                  {showFeedback && !isSelected && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-atom shrink-0 opacity-70" />}
                  <span className="font-mono"><TextWithMath content={option} as="span" /></span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <AnimatePresence>
        {showFeedback && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 rounded-xl bg-surface2 border border-border"
          >
            <TextWithMath content={question.explanation} className="text-text-dim text-sm" as="p" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
