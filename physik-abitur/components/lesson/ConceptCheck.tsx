'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTION_STAGGER } from '@/lib/transitions';
import { CheckCircle2, XCircle } from 'lucide-react';
import { TextWithMath } from './TextWithMath';
import type { ConceptCheck as ConceptCheckType } from '@/lib/types';

interface ConceptCheckProps {
  check: ConceptCheckType;
  index?: number;
}

export function ConceptCheck({ check, index = 0 }: ConceptCheckProps) {
  const [answered, setAnswered] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (optionIndex: number) => {
    if (answered !== null) return;
    setAnswered(optionIndex);
    setShowExplanation(true);
  };

  const isCorrect = answered === check.correct;

  return (
    <motion.div
      initial={SECTION_STAGGER.initial}
      animate={SECTION_STAGGER.animate}
      transition={{ ...SECTION_STAGGER.transition, delay: index * SECTION_STAGGER.staggerDelay * 2 }}
      className="rounded-xl border border-border bg-surface2/50 p-6 my-8"
    >
      <h4 className="text-sm font-medium text-text-dim uppercase tracking-wider mb-3">
        Kurzüberprüfung
      </h4>
      <div className="font-medium mb-4 [&>span]:align-baseline"><TextWithMath content={check.question} as="span" /></div>
      {check.options && (
        <ul className="space-y-2">
          {check.options.map((option, i) => {
            const selected = answered === i;
            const correct = i === check.correct;
            let stateClass = 'hover:bg-surface2';
            if (selected) {
              stateClass = correct ? 'bg-atom/20 border-atom/60' : 'bg-schwingungen/20 border-schwingungen/60';
            }
            return (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => handleSelect(i)}
                  disabled={answered !== null}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${stateClass} ${
                    answered !== null ? 'cursor-default' : 'cursor-pointer'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {answered !== null && selected && (correct ? <CheckCircle2 className="w-4 h-4 text-atom shrink-0" /> : <XCircle className="w-4 h-4 text-schwingungen shrink-0" />)}
                    <TextWithMath content={option} as="span" className="[&>span]:align-baseline" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 p-3 rounded-lg bg-surface/80"
          >
            <div className="text-sm text-text-dim [&>span]:align-baseline"><TextWithMath content={check.explanation} as="span" /></div>
            {check.hint && (
              <div className="text-xs text-text-muted mt-2 [&>span]:align-baseline">💡 <TextWithMath content={check.hint} as="span" /></div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
