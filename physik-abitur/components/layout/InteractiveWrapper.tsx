'use client';

/**
 * Wrapper für interaktive Visualisierungen (p5, SVG, Canvas).
 * Ermöglicht horizontales Scrollen auf schmalen Screens.
 */
export function InteractiveWrapper({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface/50 overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] max-w-full ${className}`}
    >
      {children}
    </div>
  );
}
