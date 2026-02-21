'use client';

import { useState, useMemo } from 'react';

const SURFACE = '#18181f';
const SURFACE2 = '#111118';
const BORDER = '#2a2a38';
const TEXT = '#f0f0f8';
const TEXT_DIM = '#8888aa';
const ACCENT = '#ffd166'; // Messunsicherheiten-Farbe
const HIGHLIGHT_BG = 'rgba(255, 209, 102, 0.15)';
const HIGHLIGHT_BORDER = '#ffd166';

type FormulaType = 'product' | 'quotient' | 'productQuotient' | 'power';

interface InputVar {
  id: string;
  name: string;
  value: number;
  delta: number;
  unit: string;
}

function countSigFigs(x: number): number {
  if (x === 0 || !Number.isFinite(x)) return 0;
  let str = Math.abs(x).toString();
  if (str.includes('e')) {
    const [m] = str.split('e');
    const mantissa = m.replace('.', '');
    const sig = mantissa.replace(/^0+/, '').length;
    return Math.max(1, sig);
  }
  str = str.replace(/^0+\.?0*/, '') || '0';
  if (str === '0') return 0;
  return str.replace('.', '').replace(/0+$/, '').length;
}

function roundToSigFigs(num: number, sig: number): string {
  if (!Number.isFinite(num) || sig < 1) return String(num);
  if (num === 0) return '0';
  const mag = Math.floor(Math.log10(Math.abs(num))) + 1;
  const scale = Math.pow(10, sig - mag);
  const rounded = Math.round(num * scale) / scale;
  if (Math.abs(rounded) >= 1e4 || (Math.abs(rounded) < 0.01 && rounded !== 0)) {
    return rounded.toExponential(Math.max(0, sig - 1));
  }
  return rounded.toString();
}

function formatWithUncertainty(value: number, delta: number): string {
  const deltaStr = roundToSigFigs(delta, 2);
  const deltaNum = parseFloat(deltaStr);
  if (deltaNum === 0) return `${value}`;
  const deltaMag = Math.floor(Math.log10(Math.abs(deltaNum)));
  const valueRounded = Math.round(value / Math.pow(10, deltaMag)) * Math.pow(10, deltaMag);
  const valueStr = roundToSigFigs(valueRounded, Math.max(countSigFigs(deltaNum) + 1, 2));
  return `${valueStr} ± ${deltaStr}`;
}

const FORMULA_OPTIONS: { id: FormulaType; label: string; desc: string }[] = [
  { id: 'product', label: 'Produkt', desc: 'y = x₁ · x₂' },
  { id: 'quotient', label: 'Quotient', desc: 'y = x₁ / x₂' },
  { id: 'productQuotient', label: 'Produkt/Quotient', desc: 'y = x₁ · x₂ / x₃' },
  { id: 'power', label: 'Potenz', desc: 'y = x^n' },
];

function createVar(id: string, name = '', value = 0, delta = 0, unit = ''): InputVar {
  return { id, name: name || `x${id}`, value, delta, unit };
}

export function UncertaintyCalculator() {
  const [vars, setVars] = useState<InputVar[]>([
    createVar('1', 'x₁', 70, 1, 'mm'),
    createVar('2', 'x₂', 1, 0.01, ''),
  ]);
  const [formulaType, setFormulaType] = useState<FormulaType>('quotient');
  const [powerExp, setPowerExp] = useState(2);

  const updateVar = (id: string, upd: Partial<InputVar>) => {
    setVars((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...upd } : v))
    );
  };

  const addVar = () => {
    const maxId = vars.length > 0 ? Math.max(...vars.map((v) => parseInt(v.id, 10) || 0)) : 0;
    const nextId = String(maxId + 1);
    setVars((prev) => [...prev, createVar(nextId, `x${nextId}`, 1, 0.1, '')]);
  };

  const removeVar = (id: string) => {
    if (vars.length <= 2) return;
    setVars((prev) => prev.filter((v) => v.id !== id));
  };

  const { result, steps } = useMemo(() => {
    const contributions: { rel: number; index: number }[] = [];
    let resultValue = 0;
    let relUncertainty = 0;

    if (formulaType === 'product' && vars.length >= 2) {
      resultValue = vars[0].value * vars[1].value;
      for (let i = 0; i < 2; i++) {
        const r = vars[i].delta / vars[i].value;
        contributions.push({ rel: r, index: i });
        relUncertainty += r;
      }
      // Mehr Faktoren bei Bedarf
      for (let i = 2; i < vars.length; i++) {
        resultValue *= vars[i].value;
        const r = vars[i].delta / vars[i].value;
        contributions.push({ rel: r, index: i });
        relUncertainty += r;
      }
    } else if (formulaType === 'quotient' && vars.length >= 2) {
      resultValue = vars[0].value / vars[1].value;
      contributions.push({ rel: vars[0].delta / vars[0].value, index: 0 });
      contributions.push({ rel: vars[1].delta / vars[1].value, index: 1 });
      relUncertainty = vars[0].delta / vars[0].value + vars[1].delta / vars[1].value;
    } else if (formulaType === 'productQuotient' && vars.length >= 3) {
      resultValue = (vars[0].value * vars[1].value) / vars[2].value;
      for (let i = 0; i < 3; i++) {
        const r = vars[i].delta / vars[i].value;
        contributions.push({ rel: r, index: i });
        relUncertainty += r;
      }
    } else if (formulaType === 'power' && vars.length >= 1) {
      const n = powerExp;
      resultValue = Math.pow(vars[0].value, n);
      const r = Math.abs(n) * (vars[0].delta / vars[0].value);
      contributions.push({ rel: r, index: 0 });
      relUncertainty = r;
    } else {
      return { result: null, steps: [], dominantIndex: -1, relativeContributions: [] };
    }

    const absUncertainty = Math.abs(resultValue) * relUncertainty;
    const dominant =
      contributions.length > 0
        ? contributions.reduce((a, b) => (a.rel > b.rel ? a : b))
        : { rel: 0, index: -1 };

    const steps: { label: string; value: string; isDominant?: boolean }[] = [];
    contributions.forEach((c) => {
      const pct = ((c.rel / relUncertainty) * 100).toFixed(1);
      steps.push({
        label: `Δ${vars[c.index].name || `x${c.index + 1}`}/${vars[c.index].name || `x${c.index + 1}`} = ${vars[c.index].delta}/${vars[c.index].value} ≈ ${(c.rel * 100).toFixed(2)} %`,
        value: `Beitrag: ${pct} %`,
        isDominant: c.index === dominant.index,
      });
    });

    steps.push({
      label: `Δy/y = Σ(Δxᵢ/xᵢ) ≈ ${(relUncertainty * 100).toFixed(3)} %`,
      value: 'relative Unsicherheit',
    });
    steps.push({
      label: `Δy = y · (Δy/y) = ${resultValue.toPrecision(4)} · ${(relUncertainty * 100).toFixed(2)} % ≈ ${absUncertainty.toPrecision(4)}`,
      value: 'absolute Unsicherheit (2 sig. Stellen)',
    });

    const deltaRounded = parseFloat(roundToSigFigs(absUncertainty, 2));
    const valueRounded = parseFloat(
      roundToSigFigs(resultValue, Math.max(countSigFigs(deltaRounded) + 1, 2))
    );

    return {
      result: {
        value: valueRounded,
        delta: deltaRounded,
        relPercent: relUncertainty * 100,
      },
      steps,
      dominantIndex: dominant.index,
      relativeContributions: contributions,
    };
  }, [vars, formulaType, powerExp]);

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
          Messunsicherheiten – Schritt-für-Schritt
        </span>
        <span style={{ color: TEXT_DIM }} className="text-sm">
          Zusammengesetzte Messgrößen: Eingangsgrößen eingeben, Formel wählen, berechnen.
        </span>
      </div>
      <div className="p-4 flex flex-col gap-6">
        {/* Schritt 1: Eingangsgrößen */}
        <section>
          <h4 style={{ color: TEXT }} className="text-sm font-medium mb-2">
            1. Eingangsgrößen (Wert und absolute Unsicherheit Δ)
          </h4>
          <div className="flex flex-wrap gap-3">
            {vars.map((v) => (
              <div
                key={v.id}
                className="flex flex-wrap items-center gap-2 p-3 rounded-lg"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}` }}
              >
                <input
                  type="text"
                  value={v.name}
                  onChange={(e) => updateVar(v.id, { name: e.target.value })}
                  placeholder="Name"
                  className="w-12 bg-transparent border-b px-1 text-sm"
                  style={{ color: TEXT, borderColor: BORDER }}
                />
                <input
                  type="number"
                  value={v.value || ''}
                  onChange={(e) => updateVar(v.id, { value: parseFloat(e.target.value) || 0 })}
                  placeholder="Wert"
                  className="w-24 bg-transparent border-b px-1 text-sm"
                  style={{ color: TEXT, borderColor: BORDER }}
                  step="any"
                />
                <span style={{ color: TEXT_DIM }} className="text-sm">±</span>
                <input
                  type="number"
                  value={v.delta || ''}
                  onChange={(e) => updateVar(v.id, { delta: parseFloat(e.target.value) || 0 })}
                  placeholder="Δ"
                  className="w-20 bg-transparent border-b px-1 text-sm"
                  style={{ color: TEXT, borderColor: BORDER }}
                  step="any"
                />
                <input
                  type="text"
                  value={v.unit}
                  onChange={(e) => updateVar(v.id, { unit: e.target.value })}
                  placeholder="Einheit"
                  className="w-14 bg-transparent border-b px-1 text-sm"
                  style={{ color: TEXT_DIM, borderColor: BORDER }}
                />
                {vars.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeVar(v.id)}
                    className="text-xs px-1.5 py-0.5 rounded"
                    style={{ color: TEXT_DIM, border: `1px solid ${BORDER}` }}
                  >
                    Entfernen
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addVar}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm"
              style={{ color: ACCENT, border: `1px dashed ${BORDER}` }}
            >
              + Größe
            </button>
          </div>
        </section>

        {/* Schritt 2: Formel wählen */}
        <section>
          <h4 style={{ color: TEXT }} className="text-sm font-medium mb-2">
            2. Formel wählen
          </h4>
          <div className="flex flex-wrap gap-2">
            {FORMULA_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setFormulaType(opt.id)}
                className="px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  color: formulaType === opt.id ? '#0a0a0f' : TEXT,
                  backgroundColor: formulaType === opt.id ? ACCENT : SURFACE2,
                  border: `1px solid ${formulaType === opt.id ? ACCENT : BORDER}`,
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p style={{ color: TEXT_DIM }} className="text-xs mt-1">
            {FORMULA_OPTIONS.find((o) => o.id === formulaType)?.desc}
          </p>
          {formulaType === 'power' && (
            <div className="mt-2 flex items-center gap-2">
              <span style={{ color: TEXT_DIM }} className="text-sm">Exponent n =</span>
              <input
                type="number"
                value={powerExp}
                onChange={(e) => setPowerExp(parseInt(e.target.value, 10) || 1)}
                className="w-14 bg-transparent border px-2 py-1 rounded text-sm"
                style={{ color: TEXT, borderColor: BORDER }}
              />
            </div>
          )}
        </section>

        {/* Schritt 3–5: Berechnung und Ergebnis */}
        {result && (
          <>
            <section>
              <h4 style={{ color: TEXT }} className="text-sm font-medium mb-2">
                3. Schritte der Berechnung
              </h4>
              <div className="space-y-2">
                {steps.map((s, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 rounded-lg text-sm"
                    style={{
                      backgroundColor: s.isDominant ? HIGHLIGHT_BG : SURFACE2,
                      border: `1px solid ${s.isDominant ? HIGHLIGHT_BORDER : BORDER}`,
                    }}
                  >
                    <span style={{ color: s.isDominant ? ACCENT : TEXT }}>
                      {s.label}
                    </span>
                    {s.isDominant && (
                      <span
                        className="ml-2 text-xs font-medium"
                        style={{ color: ACCENT }}
                      >
                        ← größter Beitrag (schwächstes Glied)
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h4 style={{ color: TEXT }} className="text-sm font-medium mb-2">
                4. Ergebnis (korrekte signifikante Stellen)
              </h4>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: SURFACE2,
                  border: `2px solid ${ACCENT}`,
                }}
              >
                <p style={{ color: TEXT }} className="text-lg font-mono">
                  y = {formatWithUncertainty(result.value, result.delta)}
                  <span style={{ color: TEXT_DIM }} className="font-normal">
                    {' '}(Einheit aus Formelzusammenhang)
                  </span>
                </p>
                <p style={{ color: TEXT_DIM }} className="text-sm mt-1">
                  Relative Unsicherheit: Δy/y ≈ {(result.relPercent).toFixed(2)} %
                </p>
                <p style={{ color: TEXT_DIM }} className="text-xs mt-0.5">
                  Absolute Unsicherheit Δy mit 2 signifikanten Stellen.
                </p>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
