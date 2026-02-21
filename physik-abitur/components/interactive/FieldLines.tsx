'use client';

import { useState, useCallback, useRef } from 'react';
import katex from 'katex';

const BG = '#0a0a0f';
const SURFACE = '#18181f';
const BORDER = '#2a2a38';
const TEXT = '#f0f0f8';
const TEXT_DIM = '#8888aa';
const ACCENT = '#4f9cf9';
const FIELD_LINE = '#4f9cf9';
const FORCE_ARROW = '#ef4444';
const PROBE = '#fbbf24';
const SKETCH_STROKE = '#3ecf8e';

const K_COULOMB = 8.99e9; // N·m²/C²
const PX_PER_M = 8000; // 1 m = 8000 px im Feld (für Plattenabstand ca. 2cm → 160px)

const W = 640;
const H = 400;
const CX = W / 2;
const CY = H / 2;

/** Pixel → Physik: Zentrum (CX,CY) = (0,0), 1 m = PX_PER_M px */
function pxToM(px: number, axis: 'x' | 'y'): number {
  const center = axis === 'x' ? CX : CY;
  const scale = axis === 'y' ? -1 : 1; // y nach oben positiv
  return (scale * (px - center)) / PX_PER_M;
}
function mToPx(m: number, axis: 'x' | 'y'): number {
  const center = axis === 'x' ? CX : CY;
  const scale = axis === 'y' ? -1 : 1;
  return center + scale * m * PX_PER_M;
}

type Mode = 'homogeneous' | 'point';
type SketchMode = 'off' | 'draw' | 'compare';

export function FieldLines() {
  const [mode, setMode] = useState<Mode>('homogeneous');
  const [U, setU] = useState(200); // V
  const [d, setD] = useState(2); // cm
  const [q, setQ] = useState(10); // nC (für Punktladung)
  const [qProbe, setQProbe] = useState(1); // nC (+1 oder -1)
  const [probe, setProbe] = useState<{ x: number; y: number } | null>(null);
  const [sketchMode, setSketchMode] = useState<SketchMode>('off');
  const [userStrokes, setUserStrokes] = useState<{ x: number; y: number }[][]>([]);
  const currentStroke = useRef<{ x: number; y: number }[]>([]);
  const isDrawing = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Feldstärke berechnen
  const getE = useCallback(
    (xM: number, yM: number): { Ex: number; Ey: number; E: number } => {
      if (mode === 'homogeneous') {
        const E = (U * 100) / (d * 0.01); // U in V, d in cm → E in V/m
        return { Ex: 0, Ey: -E, E };
      }
      const r = Math.sqrt(xM * xM + yM * yM) || 1e-10;
      const Q = q * 1e-9; // nC → C
      const E = (K_COULOMB * Math.abs(Q)) / (r * r);
      const dir = Q > 0 ? 1 : -1;
      return {
        Ex: (dir * E * xM) / r,
        Ey: (dir * E * yM) / r,
        E,
      };
    },
    [mode, U, d, q]
  );

  const handleSvgClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (sketchMode === 'draw') return;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px >= 0 && px <= W && py >= 0 && py <= H) {
        setProbe({ x: px, y: py });
      }
    },
    [sketchMode]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (sketchMode !== 'draw') return;
      e.preventDefault();
      isDrawing.current = true;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      currentStroke.current = [{ x, y }];
      setUserStrokes((prev) => [...prev, [{ x, y }]]);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [sketchMode]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDrawing.current || sketchMode !== 'draw') return;
      const rect = svgRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      currentStroke.current.push({ x, y });
      setUserStrokes((prev) => (prev.length ? [...prev.slice(0, -1), [...currentStroke.current]] : [[...currentStroke.current]]));
    },
    [sketchMode]
  );

  const handlePointerUp = useCallback(() => {
    if (isDrawing.current && currentStroke.current.length > 1) {
      setUserStrokes((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.length < 2) return prev.slice(0, -1);
        return prev;
      });
    }
    isDrawing.current = false;
    currentStroke.current = [];
  }, []);

  const clearSketch = useCallback(() => {
    setUserStrokes([]);
  }, []);

  // Formel-Strings mit aktuellen Werten
  const formulaHomogeneous = `E = \\frac{U}{d} = \\frac{${U}\\,\\text{V}}{${d}\\,\\text{cm}} = ${((U * 100) / (d * 0.01)).toFixed(0)}\\,\\frac{\\text{V}}{\\text{m}}`;
  const formulaPoint = (r: number) => {
    const rCm = (r * 100).toFixed(2);
    const E = (K_COULOMB * Math.abs(q) * 1e-9) / (r * r);
    const Estr = E >= 1000 ? E.toExponential(1) : E.toFixed(0);
    return `E = k \\cdot \\frac{|q|}{r^2} \\approx ${Estr}\\,\\frac{\\text{V}}{\\text{m}} \\; (r=${rCm}\\,\\text{cm})`;
  };

  let formulaHtml = '';
  let forceHtml = '';

  if (mode === 'homogeneous') {
    try {
      formulaHtml = katex.renderToString(formulaHomogeneous, { throwOnError: false, displayMode: false });
    } catch {
      formulaHtml = formulaHomogeneous;
    }
  } else {
    if (probe) {
      const xM = pxToM(probe.x, 'x');
      const yM = pxToM(probe.y, 'y');
      try {
        formulaHtml = katex.renderToString(formulaPoint(Math.sqrt(xM * xM + yM * yM)), { throwOnError: false, displayMode: false });
      } catch {
        formulaHtml = formulaPoint(Math.sqrt(xM * xM + yM * yM));
      }
    } else {
      try {
        formulaHtml = katex.renderToString(`E = k \\cdot \\frac{|q|}{r^2} \\quad (q=${q}\\,\\text{nC})`, { throwOnError: false, displayMode: false });
      } catch {
        formulaHtml = `E = k·|q|/r² (q=${q} nC)`;
      }
    }
  }

  if (probe) {
    const xM = pxToM(probe.x, 'x');
    const yM = pxToM(probe.y, 'y');
    const { Ex, Ey } = getE(xM, yM);
    const qP = qProbe * 1e-9;
    const Fx = qP * Ex;
    const Fy = qP * Ey;
    const Fval = Math.sqrt(Fx * Fx + Fy * Fy);
    const FµN = Fval * 1e6;
    try {
      forceHtml = katex.renderToString(`F = q \\cdot E = ${FµN.toFixed(2)}\\,\\mu\\text{N}`, { throwOnError: false, displayMode: false });
    } catch {
      forceHtml = `F = q·E = ${FµN.toFixed(2)} µN`;
    }
  }

  // Feldlinien generieren
  const fieldLinePaths: string[] = [];
  if (mode === 'homogeneous') {
    const dPx = (d * 0.01 * PX_PER_M) / 2;
    const topY = CY - dPx;
    const bottomY = CY + dPx;
    for (let i = -3; i <= 3; i++) {
      const x0 = CX + i * 80;
      fieldLinePaths.push(`M ${x0} ${topY} L ${x0} ${bottomY}`);
    }
  } else {
    const Q = q * 1e-9;
    const nLines = 12;
    for (let i = 0; i < nLines; i++) {
      const theta0 = (i * 2 * Math.PI) / nLines;
      const points: { x: number; y: number }[] = [];
      const r0 = 15;
      const r1 = 180;
      const steps = Q > 0 ? [0, 1] : [1, 0]; // +q: von innen nach außen; −q: von außen nach innen
      for (let j = 0; j <= 50; j++) {
        const t = (steps[0] === 0 ? j / 50 : 1 - j / 50);
        const r = r0 * Math.pow(r1 / r0, t);
        const x = CX + r * Math.cos(theta0);
        const y = CY - r * Math.sin(theta0);
        if (x > -50 && x < W + 50 && y > -50 && y < H + 50) {
          points.push({ x, y });
        }
      }
      if (points.length > 1) {
        fieldLinePaths.push(
          points.map((p, k) => `${k === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
        );
      }
    }
  }

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <div className="p-4 border-b border-border flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-dim">Modus:</span>
          <button
            type="button"
            onClick={() => {
              setMode('homogeneous');
              setProbe(null);
              if (sketchMode !== 'off') setSketchMode('off');
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === 'homogeneous' ? 'bg-elektrizitaet text-white' : 'bg-surface2 text-text-dim hover:bg-border'
            }`}
          >
            Homogenes Feld
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('point');
              setProbe(null);
              if (sketchMode !== 'off') setSketchMode('off');
            }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              mode === 'point' ? 'bg-elektrizitaet text-white' : 'bg-surface2 text-text-dim hover:bg-border'
            }`}
          >
            Punktladung
          </button>
        </div>

        {mode === 'homogeneous' && (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-text-dim w-16">U (V)</span>
              <input
                type="range"
                min={10}
                max={500}
                value={U}
                onChange={(e) => setU(Number(e.target.value))}
                className="w-24 accent-elektrizitaet"
              />
              <span className="font-mono w-10">{U}</span>
            </label>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-text-dim w-16">d (cm)</span>
              <input
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={d}
                onChange={(e) => setD(Number(e.target.value))}
                className="w-24 accent-elektrizitaet"
              />
              <span className="font-mono w-10">{d}</span>
            </label>
          </div>
        )}

        {mode === 'point' && (
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <span className="text-text-dim w-16">q (nC)</span>
              <input
                type="range"
                min={1}
                max={50}
                value={Math.abs(q)}
                onChange={(e) => setQ(Number(e.target.value))}
                className="w-24 accent-elektrizitaet"
              />
              <span className="font-mono w-10">{q}</span>
            </label>
            <button
              type="button"
              onClick={() => setQ(-q)}
              className="text-xs px-2 py-1 rounded bg-surface2 text-text-dim hover:bg-border"
            >
              {q > 0 ? '+' : '−'} umschalten
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-text-dim">q_probe:</span>
            <button
              type="button"
              onClick={() => setQProbe(1)}
              className={`px-2 py-1 rounded text-xs ${qProbe > 0 ? 'bg-elektrizitaet/30 text-elektrizitaet' : 'bg-surface2 text-text-dim'}`}
            >
              +1 nC
            </button>
            <button
              type="button"
              onClick={() => setQProbe(-1)}
              className={`px-2 py-1 rounded text-xs ${qProbe < 0 ? 'bg-elektrizitaet/30 text-elektrizitaet' : 'bg-surface2 text-text-dim'}`}
            >
              −1 nC
            </button>
          </label>
        </div>
      </div>

      {/* Formel-Anzeige */}
      <div className="px-4 py-2 border-b border-border/50 bg-surface2/30">
        <div className="flex flex-wrap items-center gap-4">
          <div className="text-sm">
            <span className="text-text-dim mr-2">Formel:</span>
            <span className="katex-inline" dangerouslySetInnerHTML={{ __html: formulaHtml }} />
          </div>
          {probe && (
            <div className="text-sm text-red-400">
              <span className="text-text-dim mr-2">Kraft:</span>
              <span className="katex-inline" dangerouslySetInnerHTML={{ __html: forceHtml }} />
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative">
        <div className="text-xs text-text-dim px-4 py-1 bg-[#0a0a0f]">
          Klicke auf das Feld, um einen Probekörper zu platzieren. Die Kraft F = q·E wird live berechnet.
        </div>

        {/* eA Skizziermodus */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border/50">
          <span className="text-xs px-2 py-0.5 rounded bg-atom/20 text-atom font-medium">eA</span>
          <span className="text-sm text-text-dim">Skizziermodus:</span>
          <button
            type="button"
            onClick={() => setSketchMode('off')}
            className={`px-2 py-1 rounded text-xs ${sketchMode === 'off' ? 'bg-border text-text' : 'bg-surface2 text-text-dim'}`}
          >
            Aus
          </button>
          <button
            type="button"
            onClick={() => {
              setSketchMode('draw');
              setProbe(null);
            }}
            className={`px-2 py-1 rounded text-xs ${sketchMode === 'draw' ? 'bg-atom/30 text-atom' : 'bg-surface2 text-text-dim'}`}
          >
            Zeichnen
          </button>
          <button
            type="button"
            onClick={() => setSketchMode(s => (s === 'compare' ? 'off' : 'compare'))}
            className={`px-2 py-1 rounded text-xs ${sketchMode === 'compare' ? 'bg-atom/30 text-atom' : 'bg-surface2 text-text-dim'}`}
          >
            Vergleichen
          </button>
          {sketchMode === 'draw' && (
            <button
              type="button"
              onClick={clearSketch}
              className="px-2 py-1 rounded text-xs bg-surface2 text-text-dim hover:bg-border"
            >
              Löschen
            </button>
          )}
          {sketchMode === 'draw' && (
            <span className="text-xs text-text-dim ml-2">Zeichne Feldlinien mit der Maus.</span>
          )}
        </div>

        <svg
          ref={svgRef}
          width={W}
          height={H}
          className="block cursor-crosshair"
          style={{ backgroundColor: BG }}
          onClick={handleSvgClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Hintergrund-Raster (dezent) */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={BORDER} strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width={W} height={H} fill="url(#fieldlines-grid)" />

          {/* Korrekte Feldlinien (immer sichtbar außer im reinen Zeichenmodus) */}
          {sketchMode !== 'compare' && (
            <g opacity={sketchMode === 'draw' ? 0.4 : 1}>
              {fieldLinePaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={FIELD_LINE}
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                />
              ))}
            </g>
          )}

          {/* Vergleichsmodus: korrekte Feldlinien kräftig */}
          {sketchMode === 'compare' && (
            <g>
              {fieldLinePaths.map((d, i) => (
                <path
                  key={`sol-${i}`}
                  d={d}
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.9"
                />
              ))}
            </g>
          )}

          {/* User-Skizze */}
          {userStrokes.map((stroke, si) =>
            stroke.length > 1 ? (
              <path
                key={si}
                d={stroke.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')}
                fill="none"
                stroke={SKETCH_STROKE}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : null
          )}

          {/* Platten (homogen) */}
          {mode === 'homogeneous' && (
            <>
              <rect
                x={80}
                y={CY - (d * 0.01 * PX_PER_M) / 2 - 4}
                width={W - 160}
                height={8}
                fill={SURFACE}
                stroke={ACCENT}
                strokeWidth="2"
              />
              <rect
                x={80}
                y={CY + (d * 0.01 * PX_PER_M) / 2 - 4}
                width={W - 160}
                height={8}
                fill={SURFACE}
                stroke={ACCENT}
                strokeWidth="2"
              />
              <text x={W - 100} y={CY - (d * 0.01 * PX_PER_M) / 2 - 12} fill={TEXT} fontSize="12">+</text>
              <text x={W - 100} y={CY + (d * 0.01 * PX_PER_M) / 2 + 20} fill={TEXT} fontSize="12">−</text>
            </>
          )}

          {/* Punktladung */}
          {mode === 'point' && (
            <g>
              <circle cx={CX} cy={CY} r="12" fill={q > 0 ? ACCENT : '#ef4444'} stroke={TEXT} strokeWidth="1" />
              <text x={CX} y={CY + 4} textAnchor="middle" fill={BG} fontSize="14" fontWeight="bold">
                {q > 0 ? '+' : '−'}
              </text>
            </g>
          )}

          {/* Probekörper + Kraft-Pfeil */}
          {probe && sketchMode !== 'draw' && (
            <g>
              <circle
                cx={probe.x}
                cy={probe.y}
                r="10"
                fill={PROBE}
                stroke={TEXT}
                strokeWidth="1.5"
              />
              <text
                x={probe.x}
                y={probe.y + 4}
                textAnchor="middle"
                fill={BG}
                fontSize="12"
                fontWeight="bold"
              >
                {qProbe > 0 ? '+' : '−'}
              </text>
              {(() => {
                const xM = pxToM(probe.x, 'x');
                const yM = pxToM(probe.y, 'y');
                const { Ex, Ey, E } = getE(xM, yM);
                const qP = qProbe * 1e-9;
                let Fx = qP * Ex;
                let Fy = qP * Ey;
                const F = Math.sqrt(Fx * Fx + Fy * Fy);
                if (F < 1e-12) return null;
                const FµN = F * 1e6;
                const arrowLen = Math.min(120, Math.max(30, 8 * FµN));
                const ux = Fx / F;
                const uy = Fy / F;
                const endX = probe.x + arrowLen * ux;
                const endY = probe.y - arrowLen * uy;
                return (
                  <line
                    x1={probe.x}
                    y1={probe.y}
                    x2={endX}
                    y2={endY}
                    stroke={FORCE_ARROW}
                    strokeWidth="3"
                    markerEnd="url(#force-arrowhead)"
                  />
                );
              })()}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
