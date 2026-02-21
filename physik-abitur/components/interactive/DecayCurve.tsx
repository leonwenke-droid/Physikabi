'use client';

import { useMemo, useState } from 'react';
import { TextWithMath } from '@/components/lesson/TextWithMath';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

const BG = '#0a0a0f';
const SURFACE = '#18181f';
const SURFACE2 = '#111118';
const BORDER = '#2a2a38';
const TEXT = '#f0f0f8';
const TEXT_DIM = '#8888aa';
const ACCENT_RAD = '#3ecf8e'; // Atomhülle
const ACCENT_CAP = '#4f9cf9'; // Elektrizität

export function DecayCurve() {
  const [N0, setN0] = useState(1000);
  const [tHalf, setTHalf] = useState(5);
  const [scaleMode, setScaleMode] = useState<'linear' | 'log'>('linear');

  const lambda = Math.LN2 / tHalf;
  const tau = tHalf / Math.LN2;
  const tMax = tHalf * 5;

  const { data, halfLifeLines } = useMemo(() => {
    const nPoints = 150;
    const pts: Array<{ t: number; N: number; U: number }> = [];
    for (let i = 0; i <= nPoints; i++) {
      const ti = (i / nPoints) * tMax;
      pts.push({
        t: ti,
        N: N0 * Math.exp(-lambda * ti),
        U: N0 * Math.exp(-ti / tau),
      });
    }
    const lines = [1, 2, 3, 4].map((k) => tHalf * k).filter((x) => x <= tMax);
    return { data: pts, halfLifeLines: lines };
  }, [N0, tHalf, lambda, tau, tMax]);

  return (
    <div
      className="rounded-xl border my-6 w-full overflow-x-auto"
      style={{ borderColor: `${ACCENT_RAD}40`, backgroundColor: `${ACCENT_RAD}08` }}
    >
      <div
        className="p-4 w-full flex flex-wrap items-center gap-x-6 gap-y-4"
        style={{ backgroundColor: SURFACE, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-sm shrink-0" style={{ color: TEXT_DIM }}>
            N(0) =
          </label>
          <input
            type="range"
            min={100}
            max={5000}
            step={100}
            value={N0}
            onChange={(e) => setN0(Number(e.target.value))}
            onInput={(e) => setN0(Number((e.target as HTMLInputElement).value))}
            className="w-28 accent-[#3ecf8e]"
          />
          <span className="text-sm font-mono" style={{ color: TEXT }}>
            {N0}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-sm shrink-0" style={{ color: TEXT_DIM }}>
            T½ =
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={0.5}
            value={tHalf}
            onChange={(e) => setTHalf(Number(e.target.value))}
            onInput={(e) => setTHalf(Number((e.target as HTMLInputElement).value))}
            className="w-28 accent-[#3ecf8e]"
          />
          <span className="text-sm font-mono" style={{ color: TEXT }}>
            {tHalf.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm" style={{ color: TEXT_DIM }}>
            Skala:
          </span>
          <button
            onClick={() => setScaleMode('linear')}
            className="px-3 py-1.5 rounded text-sm"
            style={{
              backgroundColor: scaleMode === 'linear' ? ACCENT_RAD : SURFACE2,
              color: scaleMode === 'linear' ? '#fff' : TEXT_DIM,
              border: `1px solid ${BORDER}`,
            }}
          >
            Linear
          </button>
          <button
            onClick={() => setScaleMode('log')}
            className="px-3 py-1.5 rounded text-sm"
            style={{
              backgroundColor: scaleMode === 'log' ? ACCENT_RAD : SURFACE2,
              color: scaleMode === 'log' ? '#fff' : TEXT_DIM,
              border: `1px solid ${BORDER}`,
            }}
          >
            Logarithmisch
          </button>
        </div>
      </div>
      <div className="p-4 min-w-[900px]">
        <div
          className="rounded-lg"
          style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
        >
          <div
            className="px-4 py-3 rounded-t-lg"
            style={{ backgroundColor: SURFACE2, borderBottom: `1px solid ${BORDER}` }}
          >
            <div style={{ color: TEXT_DIM }}>
              <TextWithMath
                as="p"
                content={`Radioaktiv: $N(t) = N_0 \\cdot e^{-\\lambda t}$, $T_{1/2} = \\ln(2)/\\lambda$, $\\lambda = ${lambda.toFixed(3)}$ — Kondensator: $U(t) = U_0 \\cdot e^{-t/\\tau}$, $\\tau = R \\cdot C = T_{1/2}/\\ln(2)$, $\\tau = ${tau.toFixed(2)}$`}
                className="text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div>
              <h3 style={{ color: ACCENT_RAD }} className="text-sm font-medium mb-2">
                Radioaktiver Zerfall N(t)
              </h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 15, bottom: 25, left: 35 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                    <XAxis
                      dataKey="t"
                      stroke={TEXT_DIM}
                      tick={{ fill: TEXT_DIM, fontSize: 10 }}
                      label={{ value: 't', position: 'insideBottom', fill: TEXT_DIM }}
                    />
                    <YAxis
                      stroke={TEXT_DIM}
                      tick={{ fill: TEXT_DIM, fontSize: 10 }}
                      scale={scaleMode === 'log' ? 'log' : 'linear'}
                      domain={scaleMode === 'log' ? [1, N0 * 1.1] : [0, N0 * 1.05]}
                      label={{ value: 'N', angle: -90, position: 'insideLeft', fill: TEXT_DIM }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }}
                      formatter={(val: number | undefined) => [val != null ? val.toFixed(2) : '', 'N']}
                    />
                    {halfLifeLines.map((x) => (
                      <ReferenceLine key={x} x={x} stroke={BORDER} strokeDasharray="4 4" />
                    ))}
                    <Line type="monotone" dataKey="N" stroke={ACCENT_RAD} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {halfLifeLines.map((x, i) => (
                <div key={x} style={{ color: TEXT_DIM }}>
                  <TextWithMath
                    as="p"
                    content={`$T_{1/2} \\cdot ${i + 1} = ${x.toFixed(2)}$`}
                    className="text-xs mt-1"
                  />
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ color: ACCENT_CAP }} className="text-sm font-medium mb-2">
                Kondensatorentladung U(t)
              </h3>
              <div className="h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data} margin={{ top: 10, right: 15, bottom: 25, left: 35 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                    <XAxis
                      dataKey="t"
                      stroke={TEXT_DIM}
                      tick={{ fill: TEXT_DIM, fontSize: 10 }}
                      label={{ value: 't', position: 'insideBottom', fill: TEXT_DIM }}
                    />
                    <YAxis
                      stroke={TEXT_DIM}
                      tick={{ fill: TEXT_DIM, fontSize: 10 }}
                      scale={scaleMode === 'log' ? 'log' : 'linear'}
                      domain={scaleMode === 'log' ? [1, N0 * 1.1] : [0, N0 * 1.05]}
                      label={{ value: 'U', angle: -90, position: 'insideLeft', fill: TEXT_DIM }}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }}
                      formatter={(val: number | undefined) => [val != null ? val.toFixed(2) : '', 'U']}
                    />
                    {halfLifeLines.map((x) => (
                      <ReferenceLine key={x} x={x} stroke={BORDER} strokeDasharray="4 4" />
                    ))}
                    <Line type="monotone" dataKey="U" stroke={ACCENT_CAP} strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {halfLifeLines.map((x, i) => (
                <div key={x} style={{ color: TEXT_DIM }}>
                  <TextWithMath
                    as="p"
                    content={`$T_{1/2} \\cdot ${i + 1} = ${x.toFixed(2)}$`}
                    className="text-xs mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
