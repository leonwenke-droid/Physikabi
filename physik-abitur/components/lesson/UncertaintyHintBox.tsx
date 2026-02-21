'use client';

import { Ruler } from 'lucide-react';
import { TextWithMath } from './TextWithMath';

interface UncertaintyHintBoxProps {
  content: string;
}

export function UncertaintyHintBox({ content }: UncertaintyHintBoxProps) {
  return (
    <div
      role="note"
      aria-label="Hinweis zu Messunsicherheiten"
      className="rounded-xl border border-messunsicherheiten/40 bg-messunsicherheiten/10 p-4 my-4"
    >
      <div className="flex items-start gap-3">
        <Ruler
          className="w-5 h-5 shrink-0 mt-0.5 text-messunsicherheiten"
          aria-hidden
        />
        <div>
          <span className="font-semibold text-sm uppercase tracking-wider text-messunsicherheiten block mb-1">
            Messunsicherheit
          </span>
          <div className="text-sm text-text-dim [&>span]:align-baseline">
            <TextWithMath content={content} as="span" />
          </div>
        </div>
      </div>
    </div>
  );
}
