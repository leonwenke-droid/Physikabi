'use client';

import { MultipleChoice } from './MultipleChoice';
import type { QuizQuestion } from '@/lib/types';

interface FormulaSelectProps {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function FormulaSelect({ question, onAnswer, disabled }: FormulaSelectProps) {
  return (
    <MultipleChoice
      question={question}
      onAnswer={onAnswer}
      disabled={disabled}
    />
  );
}
