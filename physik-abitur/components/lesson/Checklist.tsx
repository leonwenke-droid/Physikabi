'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SECTION_STAGGER } from '@/lib/transitions';
import { Check, Circle } from 'lucide-react';
import { TextWithMath } from './TextWithMath';
import { useProgressStore } from '@/lib/progress';

interface ChecklistProps {
  items: string[];
  moduleId?: string;
  topicId?: string;
  checkedItems?: Record<number, boolean>;
  onItemCheck?: (index: number, checked: boolean) => void;
}

export function Checklist({ items, moduleId, topicId, checkedItems = {}, onItemCheck }: ChecklistProps) {
  const updateChecklistItem = useProgressStore((s) => s.updateChecklistItem);
  const progressChecked = useProgressStore((s) => {
    if (!moduleId || !topicId) return {};
    const key = `${moduleId}/${topicId}`;
    return s.progress.lessons[key]?.checklistItems ?? {};
  });
  const [localChecked, setLocalChecked] = useState<Record<number, boolean>>({});

  const useProgress = moduleId != null && topicId != null;
  const checkedMap: Record<number, boolean> = useProgress
    ? Object.fromEntries(items.map((_, i) => [i, progressChecked[String(i)] ?? false]))
    : onItemCheck !== undefined
      ? checkedItems
      : localChecked;

  const handleClick = (index: number) => {
    const current = checkedMap[index];
    const newValue = !current;
    if (moduleId && topicId) {
      updateChecklistItem(moduleId, topicId, String(index), newValue, items.length);
    } else if (onItemCheck) {
      onItemCheck(index, newValue);
    } else {
      setLocalChecked((prev) => ({ ...prev, [index]: newValue }));
    }
  };

  const isChecked = (i: number) => checkedMap[i] ?? false;

  return (
    <div className="rounded-xl border border-border bg-surface2/30 p-6 my-8">
      <h4 className="text-sm font-medium text-text-dim uppercase tracking-wider mb-4">
        Zusammenfassung — Kernpunkte
      </h4>
      <ul className="space-y-2">
        {items.map((item, i) => {
          const checked = isChecked(i);
          return (
            <motion.li
              key={i}
              initial={SECTION_STAGGER.initial}
              animate={SECTION_STAGGER.animate}
              transition={{ ...SECTION_STAGGER.transition, delay: i * SECTION_STAGGER.staggerDelay }}
            >
              <button
                type="button"
                onClick={() => handleClick(i)}
                className={`w-full flex items-start gap-3 text-left p-3 rounded-lg transition-colors hover:bg-surface/50 ${
                  checked ? 'text-text-dim' : ''
                }`}
              >
                {checked ? (
                  <Check className="w-5 h-5 text-atom shrink-0 mt-0.5" />
                ) : (
                  <Circle className="w-5 h-5 text-text-muted shrink-0 mt-0.5" />
                )}
                <span className={`flex-1 ${checked ? 'line-through' : ''} [&>span]:align-baseline`}><TextWithMath content={item} as="span" /></span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
