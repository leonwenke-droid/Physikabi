'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface TextWithMathProps {
  content: string;
  className?: string;
  as?: 'p' | 'span' | 'div' | 'li';
}

/**
 * Rendert Text mit optionalen Inline-Formeln im Format $...$ (LaTeX).
 * Beispiel: "Es gilt $E = \\frac{F}{q}$ und $E = \\frac{U}{d}$."
 */
export function TextWithMath({
  content,
  className = '',
  as: Tag = 'p',
}: TextWithMathProps) {
  const rendered = useMemo(() => {
    const parts: React.ReactNode[] = [];
    const regex = /\$([^$]+)\$/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      try {
        const html = katex.renderToString(match[1].trim(), {
          throwOnError: false,
          displayMode: false,
          output: 'html',
        });
        parts.push(
          <span
            key={match.index}
            className="inline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        parts.push(`$${match[1]}$`);
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.slice(lastIndex));
    }

    if (parts.length === 1 && typeof parts[0] === 'string') return parts[0];
    return (
      <>
        {parts.map((part, i) =>
          typeof part === 'string' ? (
            <React.Fragment key={i}>{part}</React.Fragment>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  }, [content]);

  return <Tag className={className}>{rendered}</Tag>;
}
