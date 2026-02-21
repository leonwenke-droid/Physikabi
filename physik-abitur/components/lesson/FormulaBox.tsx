'use client';

import { useMemo } from 'react';
import katex from 'katex';
import { TextWithMath } from './TextWithMath';

interface FormulaBoxProps {
  formula: string;
  variables?: Record<string, string>;
  displayMode?: boolean;
  accentColor?: string;
}

export function FormulaBox({
  formula,
  variables,
  displayMode = true,
  accentColor = '#4f9cf9',
}: FormulaBoxProps) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(formula, {
        throwOnError: false,
        displayMode,
        output: 'html',
      });
    } catch {
      return `<span class="text-text-muted">${formula}</span>`;
    }
  }, [formula, displayMode]);

  return (
    <div
      className="rounded-xl border overflow-hidden my-6"
      style={{ borderColor: `${accentColor}40`, backgroundColor: `${accentColor}08` }}
    >
      <div
        className="p-4 font-mono text-lg katex-display"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {variables && Object.keys(variables).length > 0 && (
        <dl className="px-4 pb-4 pt-2 border-t border-border/50 space-y-1 text-sm text-text-dim">
          {Object.entries(variables).map(([symbol, desc]) => (
            <div key={symbol} className="flex gap-2 [&>dd]:m-0">
              <dt className="font-mono shrink-0">{symbol}:</dt>
              <dd><TextWithMath content={desc} as="span" className="[&>span]:align-baseline" /></dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
