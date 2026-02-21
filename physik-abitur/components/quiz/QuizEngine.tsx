'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUIZ_SLIDE } from '@/lib/transitions';
import { MultipleChoice } from './MultipleChoice';
import { FormulaSelect } from './FormulaSelect';
import { NumericInput } from './NumericInput';
import { DragDrop } from './DragDrop';
import { SortQuiz } from './SortQuiz';
import { QuizResults } from './QuizResults';
import type { QuizQuestion } from '@/lib/types';

interface QuizEngineProps {
  questions: QuizQuestion[];
  moduleSlug: string;
  chapterSlug: string;
  topicSlug: string;
  topicTitle: string;
  moduleColor?: string;
  onComplete: (percentage: number, passed: boolean) => void;
}

export function QuizEngine({
  questions,
  moduleSlug,
  chapterSlug,
  topicSlug,
  topicTitle,
  moduleColor = '#4f9cf9',
  onComplete,
}: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [startTime] = useState(() => Date.now());
  const [finished, setFinished] = useState(false);
  const [timeSeconds, setTimeSeconds] = useState(0);

  const currentQuestion = questions[currentIndex];
  const total = questions.length;
  const progress = total > 0 ? ((currentIndex + (answers[currentIndex] !== undefined ? 1 : 0)) / total) * 100 : 0;

  useEffect(() => {
    if (!finished) {
      const t = setInterval(() => {
        setTimeSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(t);
    }
  }, [finished, startTime]);

  const handleAnswer = useCallback((correct: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = correct;
    setAnswers(newAnswers);
  }, [currentIndex, answers]);

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= total) {
      setFinished(true);
      const correctCount = answers.filter(Boolean).length;
      const percentage = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      const passed = percentage >= 80;
      onComplete(percentage, passed);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, total, answers, onComplete]);

  const currentAnswered = answers[currentIndex] !== undefined;

  const handleRetry = useCallback(() => {
    setCurrentIndex(0);
    setAnswers([]);
    setFinished(false);
    setTimeSeconds(0);
  }, []);

  if (questions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-surface2/50 p-8 text-center">
        <p className="text-text-dim">Für dieses Kapitel sind noch keine Quizfragen hinterlegt.</p>
      </div>
    );
  }

  if (finished) {
    const score = answers.filter(Boolean).length;
    const wrongIndices = answers
      .map((a, i) => (a ? -1 : i))
      .filter((i) => i >= 0);
    const passed = score >= total * 0.8;

    return (
      <QuizResults
        score={score}
        totalQuestions={total}
        timeSeconds={timeSeconds}
        wrongIndices={wrongIndices}
        questions={questions}
        moduleSlug={moduleSlug}
        chapterSlug={chapterSlug}
        topicSlug={topicSlug}
        topicTitle={topicTitle}
        passed={passed}
        onRetry={handleRetry}
      />
    );
  }

  const renderQuestion = () => {
    if (!currentQuestion) return null;
    const common = { question: currentQuestion, onAnswer: handleAnswer };

    switch (currentQuestion.type) {
      case 'multiple-choice':
        return <MultipleChoice {...common} />;
      case 'formula-select':
        return <FormulaSelect {...common} />;
      case 'numeric':
        return <NumericInput {...common} />;
      case 'drag-drop':
        return <DragDrop {...common} />;
      case 'sort':
        return <SortQuiz {...common} />;
      default:
        return <MultipleChoice {...common} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-dim">
          Frage {currentIndex + 1} von {total}
        </span>
        <div className="w-32 h-2 rounded-full bg-surface2 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: moduleColor }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={QUIZ_SLIDE.initial}
          animate={QUIZ_SLIDE.animate}
          exit={QUIZ_SLIDE.exit}
          transition={QUIZ_SLIDE.transition}
          className="rounded-xl border border-border bg-surface2/50 p-6"
        >
          {renderQuestion()}
          {currentAnswered && (
            <div className="mt-6 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-medium transition-colors"
                style={{
                  backgroundColor: `${moduleColor}30`,
                  color: moduleColor,
                }}
              >
                {currentIndex + 1 >= total ? 'Ergebnis anzeigen' : 'Weiter zur nächsten Frage'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
