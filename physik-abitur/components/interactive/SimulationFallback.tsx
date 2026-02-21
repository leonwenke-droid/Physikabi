'use client';

export function SimulationFallback() {
  return (
    <div
      role="status"
      aria-label="Simulation wird geladen"
      className="rounded-xl border border-border bg-surface2/50 p-8 flex flex-col items-center justify-center min-h-[280px] gap-4"
    >
      <div className="w-10 h-10 rounded-full border-2 border-elektrizitaet/40 border-t-elektrizitaet animate-spin" />
      <p className="text-sm text-text-dim">Lade interaktive Simulation …</p>
    </div>
  );
}
