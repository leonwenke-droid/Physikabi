'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TextWithMath } from '@/components/lesson/TextWithMath';
import type { QuizQuestion } from '@/lib/types';

interface DragDropProps {
  question: QuizQuestion;
  onAnswer: (correct: boolean) => void;
  disabled?: boolean;
}

export function DragDrop({ question, onAnswer, disabled }: DragDropProps) {
  const items = question.items ?? [];
  const targets = question.targets ?? [];
  const correctPairs = (question.correctPairs ?? []) as [number, number][];

  const [assignments, setAssignments] = useState<Record<number, number>>({});
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const targetToItem: Record<number, number> = {};
  Object.entries(assignments).forEach(([t, i]) => { targetToItem[Number(t)] = i; });

  const handleItemClick = (itemIndex: number) => {
    if (disabled || showFeedback) return;
    if (selectedItem === itemIndex) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(itemIndex);
  };

  const handleTargetClick = (targetIndex: number) => {
    if (disabled || showFeedback || selectedItem === null) return;
    const newAssignments = { ...assignments };
    Object.keys(newAssignments).forEach((t) => {
      if (newAssignments[Number(t)] === selectedItem) delete newAssignments[Number(t)];
    });
    newAssignments[targetIndex] = selectedItem;
    setAssignments(newAssignments);
    setSelectedItem(null);
  };

  const allAssigned = targets.every((_, ti) => ti in assignments);
  const isCorrect = allAssigned && correctPairs.every(([itemIdx, targetIdx]) => assignments[targetIdx] === itemIdx);

  const handleSubmit = () => {
    if (!allAssigned) return;
    setShowFeedback(true);
    onAnswer(isCorrect);
  };

  return (
    <div className="space-y-4">
      <TextWithMath content={question.question} className="font-medium text-lg" as="p" />

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-text-dim mb-2">Ordnen Sie zu</p>
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => handleItemClick(i)}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                selectedItem === i ? 'border-elektrizitaet bg-elektrizitaet/10' : 'border-border hover:bg-surface2'
              } ${disabled || showFeedback ? 'cursor-default' : ''}`}
            >
              <span className="font-mono text-sm">{item}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-text-dim mb-2">Ziel</p>
          {targets.map((target, ti) => {
            const assignedItemIdx = assignments[ti];
            const assignedItem = assignedItemIdx !== undefined ? items[assignedItemIdx] : null;
            const correctItemIdx = correctPairs.find(([, t]) => t === ti)?.[0];
            const isCorrectPair = showFeedback && assignedItemIdx === correctItemIdx;
            const isWrongPair = showFeedback && assignedItemIdx !== undefined && assignedItemIdx !== correctItemIdx;

            return (
              <div
                key={ti}
                onClick={() => handleTargetClick(ti)}
                className={`p-3 rounded-lg border min-h-[44px] transition-all ${
                  showFeedback
                    ? isCorrectPair
                      ? 'border-atom bg-atom/10'
                      : isWrongPair
                        ? 'border-schwingungen bg-schwingungen/10'
                        : 'border-border bg-surface2/50'
                    : selectedItem !== null
                      ? 'border-elektrizitaet/50 cursor-pointer hover:bg-surface2'
                      : 'border-border'
                }`}
              >
                <span className="font-mono text-sm">
                  {assignedItem ? (
                    <span className="flex items-center gap-2">
                      {showFeedback && (isCorrectPair ? <CheckCircle2 className="w-4 h-4 text-atom shrink-0" /> : isWrongPair ? <XCircle className="w-4 h-4 text-schwingungen shrink-0" /> : null)}
                      <TextWithMath content={assignedItem} as="span" /> → <TextWithMath content={target} as="span" />
                    </span>
                  ) : (
                    <span className="text-text-dim">Klicken: {target}</span>
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {allAssigned && !showFeedback && (
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
