'use client';

import { useState, useMemo, useCallback, useRef } from 'react';

const BG = '#0a0a0f';
const SURFACE = '#18181f';
const SURFACE2 = '#111118';
const BORDER = '#2a2a38';
const TEXT = '#f0f0f8';
const TEXT_DIM = '#8888aa';
const ACCENT = '#3ecf8e';

const RYDBERG_EV = 13.6;
const HC_EV_NM = 1240;

function E_n(n: number): number {
  return -RYDBERG_EV / (n * n);
}

function wavelengthToColor(lambdaNm: number): { color: string; dashed: boolean; label: string } {
  if (lambdaNm < 400) return { color: '#8b5cf6', dashed: false, label: 'UV' };
  if (lambdaNm <= 700) {
    const l = lambdaNm;
    let r = 0, g = 0, b = 0;
    if (l < 440) { r = (440 - l) / 60; g = 0; b = 1; }
    else if (l < 490) { r = 0; g = (l - 440) / 50; b = 1; }
    else if (l < 510) { r = 0; g = 1; b = (510 - l) / 20; }
    else if (l < 580) { r = (l - 510) / 70; g = 1; b = 0; }
    else if (l < 645) { r = 1; g = (645 - l) / 65; b = 0; }
    else { r = 1; g = 0; b = 0; }
    const toHex = (z: number) => Math.round(255 * Math.max(0, Math.min(1, z))).toString(16).padStart(2, '0');
    return { color: `#${toHex(r)}${toHex(g)}${toHex(b)}`, dashed: false, label: 'sichtbar' };
  }
  return { color: '#ef4444', dashed: true, label: 'IR' };
}

function getSeries(toN: number): string {
  if (toN === 1) return 'Lyman';
  if (toN === 2) return 'Balmer';
  if (toN === 3) return 'Paschen';
  return '';
}

const SERIES_COLORS: Record<string, string> = {
  Lyman: '#8b5cf6',
  Balmer: ACCENT,
  Paschen: '#ef4444',
};

function getSeriesColor(series: string): string {
  return SERIES_COLORS[series] ?? TEXT_DIM;
}

const DIAGRAM_HEIGHT = 420;
const diagramW = 380;
const leftPad = 58;
const rightPad = 180;
const E_GLOBAL_MIN = -13.6;
const E_GLOBAL_MAX = 0.2;
const ZOOM_SENSITIVITY = 0.002; // pro Pixel Drag: range *= (1 + k*deltaY)

export function EnergyLevels() {
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [lyman, setLyman] = useState(false);
  const [balmer, setBalmer] = useState(false);
  const [paschen, setPaschen] = useState(false);
  const [viewEmin, setViewEmin] = useState(-6);
  const [viewEmax, setViewEmax] = useState(0.2);
  const dragStartY = useRef<number | null>(null);
  const dragStartView = useRef<{ min: number; max: number } | null>(null);
  const didDragRef = useRef(false);

  const computeZoomedView = useCallback((deltaY: number, startView: { min: number; max: number }) => {
    const range = startView.max - startView.min;
    const factor = 1 - ZOOM_SENSITIVITY * deltaY;
    let newRange = Math.max(0.2, Math.min(E_GLOBAL_MAX - E_GLOBAL_MIN, range * factor));
    let newMax = startView.max;
    let newMin = newMax - newRange;
    if (newMin < E_GLOBAL_MIN) {
      newMin = E_GLOBAL_MIN;
      newMax = Math.min(E_GLOBAL_MAX, E_GLOBAL_MIN + newRange);
    }
    return { min: newMin, max: newMax };
  }, []);

  const handleAxisPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    didDragRef.current = false;
    dragStartY.current = e.clientY;
    dragStartView.current = { min: viewEmin, max: viewEmax };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [viewEmin, viewEmax]);

  const handleAxisPointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStartY.current == null || dragStartView.current == null) return;
    const deltaY = e.clientY - dragStartY.current;
    if (Math.abs(deltaY) > 3) didDragRef.current = true;
    const next = computeZoomedView(deltaY, dragStartView.current);
    setViewEmin(next.min);
    setViewEmax(next.max);
    dragStartY.current = e.clientY;
    dragStartView.current = next;
  }, [computeZoomedView]);

  const handleAxisPointerUp = useCallback((e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    dragStartY.current = null;
    dragStartView.current = null;
    didDragRef.current = false;
  }, []);

  const handleSeriesChange = (series: string, checked: boolean) => {
    if (checked) setSelectedLevels([]);
    if (series === 'lyman') setLyman(checked);
    if (series === 'balmer') setBalmer(checked);
    if (series === 'paschen') setPaschen(checked);
  };

  const handleLevelClick = (n: number) => {
    if (didDragRef.current) return;
    setLyman(false);
    setBalmer(false);
    setPaschen(false);
    setSelectedLevels((prev) => {
      const idx = prev.indexOf(n);
      if (idx >= 0) return prev.filter((_, i) => i !== idx);
      if (prev.length < 2) return [...prev, n];
      return [prev[1], n];
    });
  };

  const levels = useMemo(() => {
    const arr: { n: number; E: number }[] = [];
    for (let n = 1; n <= 7; n++) arr.push({ n, E: E_n(n) });
    return arr;
  }, []);

  const transitions = useMemo(() => {
    const arr: { from: number; to: number; dE: number; lambda: number; series: string }[] = [];
    for (let from = 2; from <= 7; from++) {
      for (let to = 1; to < from; to++) {
        const dE = E_n(to) - E_n(from);
        const lambda = HC_EV_NM / dE;
        arr.push({ from, to, dE, lambda, series: getSeries(to) });
      }
    }
    return arr;
  }, []);

  const yScale = useCallback((E: number) => {
    const range = viewEmax - viewEmin;
    return DIAGRAM_HEIGHT - ((E - viewEmin) / range) * DIAGRAM_HEIGHT;
  }, [viewEmin, viewEmax]);

  const fromTo = useMemo(() => {
    if (selectedLevels.length !== 2) return null;
    const [a, b] = selectedLevels;
    return { from: Math.max(a, b), to: Math.min(a, b) };
  }, [selectedLevels]);

  const shownTransitions = useMemo(() => {
    if (fromTo) return transitions.filter((t) => t.from === fromTo.from && t.to === fromTo.to);
    if (selectedLevels.length === 1) return transitions.filter((t) => t.from === selectedLevels[0]);
    const out: { from: number; to: number; dE: number; lambda: number; series: string }[] = [];
    if (lyman) out.push(...transitions.filter((t) => t.series === 'Lyman'));
    if (balmer) out.push(...transitions.filter((t) => t.series === 'Balmer'));
    if (paschen) out.push(...transitions.filter((t) => t.series === 'Paschen'));
    return out;
  }, [fromTo, selectedLevels, lyman, balmer, paschen, transitions]);

  const visibleTransitions = shownTransitions;

  const axisTicks = useMemo(() => {
    const ticks: number[] = [];
    const range = viewEmax - viewEmin;
    if (range < 0.01) return [viewEmin];
    const step = range <= 2 ? 0.2 : range <= 5 ? 0.5 : range <= 10 ? 1 : 2;
    const start = Math.ceil(viewEmax / step) * step;
    for (let e = start; e >= viewEmin - 0.01; e -= step) {
      if (e <= viewEmax + 0.01) ticks.push(Math.round(e * 100) / 100);
    }
    return ticks;
  }, [viewEmin, viewEmax]);

  return (
    <div
      className="rounded-xl border my-6 w-full overflow-x-auto"
      style={{ borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}08` }}
    >
      <div
        className="p-4 flex flex-wrap items-center gap-x-4 gap-y-2"
        style={{ backgroundColor: SURFACE, borderBottom: `1px solid ${BORDER}` }}
      >
        <span style={{ color: ACCENT }} className="text-sm font-semibold">
          Wasserstoff (H)
        </span>
        <span style={{ color: TEXT_DIM }} className="text-sm">Serien:</span>
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={lyman}
            onChange={(e) => handleSeriesChange('lyman', e.target.checked)}
            style={{ accentColor: '#8b5cf6' }}
          />
          <span style={{ color: lyman ? '#8b5cf6' : TEXT_DIM }}>Lyman (→ n=1)</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={balmer}
            onChange={(e) => handleSeriesChange('balmer', e.target.checked)}
            style={{ accentColor: ACCENT }}
          />
          <span style={{ color: balmer ? ACCENT : TEXT_DIM }}>Balmer (→ n=2)</span>
        </label>
        <label className="flex items-center gap-1.5 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={paschen}
            onChange={(e) => handleSeriesChange('paschen', e.target.checked)}
            style={{ accentColor: '#ef4444' }}
          />
          <span style={{ color: paschen ? '#ef4444' : TEXT_DIM }}>Paschen (→ n=3)</span>
        </label>
        <button
          type="button"
          onClick={() => { setViewEmin(E_GLOBAL_MIN); setViewEmax(E_GLOBAL_MAX); }}
          className="text-xs px-2 py-1 rounded"
          style={{ color: ACCENT, border: `1px solid ${BORDER}`, backgroundColor: SURFACE2 }}
        >
          Skala zurücksetzen
        </button>
        <span style={{ color: TEXT_DIM }} className="text-sm ml-2">
          Nur an der Y-Achse (links) ziehen: Skala zoomen. Niveaus antippen zur Auswahl.
        </span>
      </div>
      <div className="p-4 flex gap-4 flex-wrap min-w-[700px]">
        <div
          className="rounded-lg overflow-hidden shrink-0 flex flex-col select-none relative"
          style={{ backgroundColor: BG, border: `1px solid ${BORDER}`, width: diagramW + leftPad + rightPad }}
        >
          <div
            className="absolute left-0 top-0 cursor-grab active:cursor-grabbing touch-none z-10"
            style={{ width: leftPad, height: DIAGRAM_HEIGHT + 50 }}
            onPointerDown={handleAxisPointerDown}
            onPointerMove={handleAxisPointerMove}
            onPointerUp={handleAxisPointerUp}
            onPointerCancel={handleAxisPointerUp}
            title="Y-Achse ziehen: Skala zoomen"
          />
          <div className="overflow-hidden relative" style={{ height: DIAGRAM_HEIGHT + 50 }}>
            <svg width={diagramW + leftPad + rightPad} height={DIAGRAM_HEIGHT + 50} style={{ display: 'block' }}>
              <g transform={`translate(${leftPad}, 35)`}>
                <line x1={0} y1={0} x2={0} y2={DIAGRAM_HEIGHT} stroke={BORDER} strokeWidth={1} />
                {axisTicks.map((E) => {
                  const y = yScale(E);
                  if (y < -5 || y > DIAGRAM_HEIGHT + 5) return null;
                  const label = E === 0 ? '0' : E === -13.6 ? '-13,6' : E.toFixed(1);
                  return (
                    <g key={E}>
                      <line x1={0} y1={y} x2={-5} y2={y} stroke={BORDER} strokeWidth={1} />
                      <text x={-8} y={y + 4} fill={TEXT_DIM} fontSize={10} textAnchor="end">
                        {label}
                      </text>
                    </g>
                  );
                })}
                <text x={-30} y={DIAGRAM_HEIGHT / 2} fill={TEXT_DIM} fontSize={10} textAnchor="middle" transform={`rotate(-90, -30, ${DIAGRAM_HEIGHT / 2})`}>
                  E (eV)
                </text>
                {levels.map(({ n, E }) => {
                  const y = yScale(E);
                  const isFrom = fromTo ? n === fromTo.from : selectedLevels.includes(n);
                  const isTo = fromTo ? n === fromTo.to : false;
                  const accent = isTo ? getSeriesColor(getSeries(n)) : ACCENT;
                  const isHighlighted = isFrom || isTo;
                  return (
                    <g
                      key={n}
                      cursor="pointer"
                      onClick={() => handleLevelClick(n)}
                    >
                      <line
                        x1={50}
                        y1={y}
                        x2={diagramW}
                        y2={y}
                        stroke={isHighlighted ? accent : BORDER}
                        strokeWidth={isHighlighted ? 2.5 : 1}
                        strokeDasharray={(n > 4) ? '5 3' : undefined}
                      />
                      <rect
                        x={0}
                        y={y - 18}
                        width={46}
                        height={36}
                        rx={6}
                        fill={isHighlighted ? `${accent}30` : SURFACE2}
                        stroke={isHighlighted ? accent : BORDER}
                        strokeWidth={1}
                        pointerEvents="all"
                      />
                      <text x={23} y={y + 5} fill={TEXT} fontSize={13} textAnchor="middle" pointerEvents="none">n = {n}</text>
                    </g>
                  );
                })}
                {shownTransitions.map((t, idx) => {
                  const y1 = yScale(E_n(t.from));
                  const y2 = yScale(E_n(t.to));
                  const color = getSeriesColor(t.series);
                  const xOffset = diagramW + 25 + (idx % 3) * 42;
                  return (
                    <g key={`${t.from}-${t.to}`}>
                      <line
                        x1={xOffset}
                        y1={y1}
                        x2={xOffset}
                        y2={y2}
                        stroke={color}
                        strokeWidth={2.5}
                        markerEnd={`url(#arrow-${t.from}-${t.to})`}
                      />
                      <rect
                        x={xOffset - 15}
                        y={Math.min(y1, y2) - 4}
                        width={30}
                        height={Math.abs(y2 - y1) + 8}
                        fill="transparent"
                        cursor="pointer"
                        onClick={() => {
                          setSelectedLevels([t.from, t.to]);
                          setLyman(false);
                          setBalmer(false);
                          setPaschen(false);
                        }}
                      />
                    </g>
                  );
                })}
                <defs>
                  {transitions.map((t) => {
                    const color = getSeriesColor(t.series);
                    return (
                      <marker key={`arrow-${t.from}-${t.to}`} id={`arrow-${t.from}-${t.to}`} markerWidth="8" markerHeight="6" refX="4" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill={color} />
                      </marker>
                    );
                  })}
                </defs>
              </g>
            </svg>
          </div>
        </div>
        <div
          className="rounded-lg p-4 shrink-0"
          style={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, minWidth: 280 }}
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <h4 style={{ color: TEXT }} className="text-sm font-medium shrink-0">ΔE = h·f = hc/λ</h4>
            {selectedLevels.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedLevels([])}
                className="text-xs px-2 py-1 rounded shrink-0"
                style={{ color: TEXT_DIM, border: `1px solid ${BORDER}` }}
              >
                Abwählen
              </button>
            )}
          </div>
          {visibleTransitions.length === 0 ? (
            <p style={{ color: TEXT_DIM }} className="text-sm">
              Serie wählen oder zwei Niveaus antippen (Reihenfolge egal) – ΔE und Serie werden angezeigt.
            </p>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto">
              {visibleTransitions.map((t) => {
                const color = getSeriesColor(t.series);
                const { label } = wavelengthToColor(t.lambda);
                const lambdaStr = (t.lambda < 1000) ? t.lambda.toFixed(1) : (t.lambda / 1000).toFixed(3);
                const lambdaUnit = (t.lambda < 1000) ? 'nm' : 'µm';
                return (
                  <div key={`${t.from}-${t.to}`} className="rounded px-3 py-2" style={{ backgroundColor: SURFACE2, borderLeft: `4px solid ${color}` }}>
                    <p style={{ color }} className="text-sm font-medium">
                      n={t.from} → n={t.to} ({t.series || '—'})
                    </p>
                    <p style={{ color: TEXT_DIM }} className="text-xs">ΔE = {t.dE.toFixed(2)} eV</p>
                    <p style={{ color: TEXT_DIM }} className="text-xs">
                      λ = {lambdaStr} {lambdaUnit} ({label})
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
