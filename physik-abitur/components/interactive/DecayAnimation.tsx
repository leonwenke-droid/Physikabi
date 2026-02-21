'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), { ssr: false });

const BG = '#0a0a0f';
const SURFACE = '#18181f';
const SURFACE2 = '#111118';
const BORDER = '#2a2a38';
const TEXT = '#f0f0f8';
const TEXT_DIM = '#8888aa';
const ACCENT = '#4f9cf9';

function formatPhys(x: number): string {
  const abs = Math.abs(x);
  if (abs === 0) return '0';
  if (abs >= 1000) return x.toExponential(2);
  if (abs >= 100) return x.toFixed(0);
  if (abs >= 10) return x.toFixed(1);
  if (abs >= 1) return x.toFixed(2);
  if (abs >= 0.01) return x.toFixed(3);
  return x.toExponential(2);
}

type State = 0 | 1 | 10 | 2 | 20; // 0=stop, 1=charge, 10=charge pause, 2=discharge, 20=discharge pause

export function DecayAnimation() {
  const [U0, setU0] = useState(12);
  const [C, setC] = useState(100);
  const [R1, setR1] = useState(8200);
  const [R2, setR2] = useState(8200);
  const [speed, setSpeed] = useState(10);
  const paramsRef = useRef({ U0, C, R1, R2, speed });
  const speedRef = useRef(speed);
  paramsRef.current = { U0, C, R1, R2, speed };
  speedRef.current = speed;
  const stateRef = useRef<State>(0);
  const timeRef = useRef(0);
  const t0Ref = useRef(0);
  const URef = useRef(0);
  const IRef = useRef(0);
  const IeRef = useRef(0);
  const teRef = useRef(0);
  const UaRef = useRef(0);
  const IaRef = useRef(0);
  const taRef = useRef(0);
  const historyRef = useRef<{ t: number; U: number; I: number }[]>([]);

  const [, forceUpdate] = useState(0);

  const setup = (p5: Parameters<NonNullable<React.ComponentProps<typeof Sketch>['setup']>>[0], parent: Element) => {
    p5.createCanvas(900, 480).parent(parent);
  };

  const speedFactor = (s: number) => 0.02 + ((s - 1) / 9) * 0.98;

  const draw = (p5: Parameters<NonNullable<React.ComponentProps<typeof Sketch>['draw']>>[0]) => {
    const { U0: U0val, C: Cval, R1: R1val, R2: R2val } = paramsRef.current;
    const speedVal = speedRef.current;
    const C_F = Cval * 1e-6;
    const sf = speedFactor(speedVal);
    const st = stateRef.current;

    if (st === 1 || st === 2) {
      const elapsed = (Date.now() - t0Ref.current) / 1000;
      const simAdvance = elapsed * sf;
      const stepSize = 0.02;
      const steps = Math.min(Math.max(1, Math.floor(simAdvance / stepSize)), 12);
      const dt = simAdvance / steps;
      if (simAdvance > 0.001) {
        t0Ref.current = Date.now();
        for (let i = 0; i < steps; i++) {
          timeRef.current += dt;
          const t = timeRef.current;
          if (st === 1) {
            IRef.current = IeRef.current * Math.exp(-(t - teRef.current) / (R1val * C_F));
            URef.current = U0val - IRef.current * R1val;
          } else {
            IRef.current = IaRef.current * Math.exp(-(t - taRef.current) / (R2val * C_F));
            URef.current = UaRef.current * Math.exp(-(t - taRef.current) / (R2val * C_F));
          }
          historyRef.current.push({ t, U: URef.current, I: IRef.current });
        }
        if (historyRef.current.length > 5000) {
          historyRef.current = historyRef.current.slice(-4000);
        }
        forceUpdate((n) => n + 1);
      }
    }

    const scaleCurrentExponent = Math.ceil(Math.log10(U0val / Math.max(U0val / R1val, U0val / R2val)));
    const scaleCurrentFactor = 10 ** scaleCurrentExponent;
    const yMax = 1.1 * Math.max(U0val, (scaleCurrentFactor * U0val) / R1val);
    const yMin = -1.1 * (scaleCurrentFactor * U0val) / R2val;
    const tEnd = timeRef.current;
    const tWindow = 12;
    const minRange = 0.8;
    const tRange = tEnd > tWindow ? tWindow : (tEnd > minRange ? tEnd * 2 : minRange * 2);
    const tU = Math.max(0, tEnd - tRange / 2);

    p5.background(BG);

    const cw = 340;
    const ch = Math.round(0.68 * cw);
    const s = cw / 10;
    const load = st === 1 || st === 10;
    const unload = st === 2 || st === 20;

    const drawLine = (x0: number, y0: number, x1: number, y1: number, inPath: boolean) => {
      p5.stroke(inPath ? ACCENT : BORDER);
      p5.strokeWeight(inPath ? 2.5 : 1.5);
      p5.line(x0, y0, x1, y1);
    };

    const drawRect = (x: number, y: number, w: number, h: number, inPath: boolean) => {
      p5.fill(SURFACE2);
      p5.stroke(inPath ? ACCENT : BORDER);
      p5.strokeWeight(inPath ? 2.5 : 1.5);
      p5.rect(x, y, w, h);
    };

    const drawDisc = (x: number, y: number, r: number, inPath: boolean) => {
      p5.stroke(inPath ? ACCENT : BORDER);
      p5.strokeWeight(inPath ? 2.5 : 1.5);
      p5.fill(inPath ? ACCENT : SURFACE2);
      p5.circle(x, y, r * 2);
    };

    const drawMeterDisc = (x: number, y: number, r: number, inPath: boolean) => {
      p5.stroke(inPath ? ACCENT : BORDER);
      p5.strokeWeight(inPath ? 2.5 : 1.5);
      p5.fill(SURFACE2);
      p5.circle(x, y, r * 2);
    };

    const cx = 30;
    const cy = 80;

    drawLine(cx + 1 * s, cy + 3.5 * s, cx + 1 * s, cy + 0.5 * s, load);
    drawLine(cx + 1 * s, cy + 0.5 * s, cx + 5 * s, cy + 0.5 * s, load);
    drawLine(cx + 7 * s, cy + 0.5 * s, cx + 9 * s, cy + 0.5 * s, unload);
    drawLine(cx + 9 * s, cy + 0.5 * s, cx + 9 * s, cy + 6.5 * s, unload);
    drawLine(cx + 6 * s, cy + 6.5 * s, cx + 1 * s, cy + 6.5 * s, load);
    drawLine(cx + 9 * s, cy + 6.5 * s, cx + 6 * s, cy + 6.5 * s, unload);
    drawLine(cx + 1 * s, cy + 6.5 * s, cx + 1 * s, cy + 3.7 * s, load);
    drawLine(cx + 6 * s, cy + 6.5 * s, cx + 6 * s, cy + 3.6 * s, load || unload);
    drawLine(cx + 6 * s, cy + 3 * s, cx + 6 * s, cy + 1.5 * s, load || unload);
    drawLine(cx + 3 * s, cy + 2 * s, cx + 6 * s, cy + 2 * s, load || unload);
    drawLine(cx + 3 * s, cy + 4.5 * s, cx + 3 * s, cy + 2 * s, load || unload);
    drawLine(cx + 3 * s, cy + 4.5 * s, cx + 6 * s, cy + 4.5 * s, load || unload);

    drawRect(cx + 2 * s, cy + 0.2 * s, 2 * s, 0.6 * s, load);
    drawRect(cx + 8.7 * s, cy + 2.5 * s, 0.6 * s, 2 * s, unload);

    p5.fill(TEXT_DIM);
    p5.noStroke();
    p5.textSize(11);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text('R₁', cx + 3 * s, cy + 0.5 * s);
    p5.text('R₂', cx + 9 * s, cy + 3.5 * s);

    p5.stroke(BORDER);
    p5.strokeWeight(1.5);
    p5.fill(BORDER);
    p5.rect(cx + 5 * s, cy + 2.9 * s, 2 * s, 0.1 * s);
    p5.rect(cx + 5 * s, cy + 3.6 * s, 2 * s, 0.1 * s);
    p5.noStroke();
    p5.fill(TEXT_DIM);
    p5.text('C', cx + 4.5 * s, cy + 3.25 * s);

    drawLine(cx + 0.5 * s, cy + 3.5 * s, cx + 1.5 * s, cy + 3.5 * s, load);
    drawLine(cx + 0.75 * s, cy + 3.7 * s, cx + 1.25 * s, cy + 3.7 * s, load);
    p5.noStroke();
    p5.fill(TEXT_DIM);
    p5.textSize(10);
    p5.text(`U₀ ${U0val}V`, cx + 0.5 * s, cy + 2.8 * s);

    if (load) drawLine(cx + 6 * s, cy + 1.5 * s, cx + 5 * s, cy + 0.5 * s, load);
    else if (unload) drawLine(cx + 6 * s, cy + 1.5 * s, cx + 7 * s, cy + 0.5 * s, unload);
    else {
      p5.stroke(BORDER);
      p5.strokeWeight(1.5);
      p5.line(cx + 6 * s, cy + 1.5 * s, cx + 5 * s, cy + 0.5 * s);
      p5.line(cx + 6 * s, cy + 1.5 * s, cx + 7 * s, cy + 0.5 * s);
    }
    drawDisc(cx + 5 * s, cy + 0.5 * s, 4, load);
    drawDisc(cx + 7 * s, cy + 0.5 * s, 4, unload);
    drawDisc(cx + 6 * s, cy + 1.5 * s, 4, load || unload);
    p5.fill(TEXT_DIM);
    p5.text('S', cx + 6 * s, cy + 1.5 * s);

    drawMeterDisc(cx + 3 * s, cy + 3.3 * s, 14, false);
    p5.fill(TEXT_DIM);
    p5.noStroke();
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.text('V', cx + 3 * s, cy + 3.3 * s);
    drawMeterDisc(cx + 6 * s, cy + 5.5 * s, 14, load || unload);
    p5.fill(TEXT_DIM);
    p5.noStroke();
    p5.text('A', cx + 6 * s, cy + 5.5 * s);

    const gx = 390;
    const gy = 40;
    const gw = 480;
    const gh = 200;
    const tPix = gw / tRange;
    const yPix = gh / (yMax - yMin);

    p5.stroke(BORDER);
    p5.strokeWeight(1);
    p5.noFill();
    p5.rect(gx, gy, gw, gh, 4);

    p5.fill(TEXT_DIM);
    p5.textSize(10);
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.text('t [s]', gx + gw / 2 - 10, gy + gh + 4);
    const tStep = tRange <= 2 ? 0.2 : tRange <= 5 ? 0.5 : tRange <= 15 ? 2 : 5;
    for (let k = 0; k * tStep <= tRange + 0.01; k++) {
      const tt = tU + k * tStep;
      const xx = gx + (tt - tU) * tPix;
      if (xx >= gx + 4 && xx <= gx + gw - 4) {
        p5.textAlign(p5.CENTER, p5.TOP);
        p5.text(tt % 1 === 0 ? tt.toFixed(0) : tt.toFixed(1), xx, gy + gh + 2);
      }
    }
    p5.textAlign(p5.RIGHT, p5.CENTER);
    p5.text(`${formatPhys(yMax)}`, gx - 4, gy + 2);
    p5.text('0', gx - 4, gy + gh / 2 + 4);
    p5.text(`${formatPhys(yMin)}`, gx - 4, gy + gh - 2);
    const unitI = scaleCurrentExponent === 0 ? 'A' : `10^${-scaleCurrentExponent} A`;
    p5.fill(ACCENT);
    p5.text(`U_C [V]`, gx + gw - 45, gy - 2);
    p5.fill('#22c55e');
    p5.text(`I_C [${unitI}]`, gx + gw - 45, gy + 12);

    const hist = historyRef.current;
    if (hist.length > 1) {
      const baseY = gy + gh;
      p5.stroke(ACCENT);
      p5.strokeWeight(2);
      p5.noFill();
      p5.beginShape();
      for (let i = 0; i < hist.length; i++) {
        if (hist[i].t < tU) continue;
        const xx = gx + (hist[i].t - tU) * tPix;
        const yy = baseY - (hist[i].U - yMin) * yPix;
        if (xx >= gx - 1 && xx <= gx + gw + 1) p5.vertex(xx, yy);
      }
      p5.endShape();

      p5.stroke('#22c55e');
      p5.beginShape();
      for (let i = 0; i < hist.length; i++) {
        if (hist[i].t < tU) continue;
        const xx = gx + (hist[i].t - tU) * tPix;
        const iScaled = hist[i].I * scaleCurrentFactor;
        const yy = baseY - (iScaled - yMin) * yPix;
        if (xx >= gx - 1 && xx <= gx + gw + 1) p5.vertex(xx, yy);
      }
      p5.endShape();
    }

    p5.fill(SURFACE);
    p5.stroke(BORDER);
    p5.rect(gx, gy + gh + 25, 200, 85, 4);
    p5.noStroke();
    p5.fill(TEXT_DIM);
    p5.textSize(10);
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.text('t:', gx + 10, gy + gh + 32);
    p5.text('U_C:', gx + 10, gy + gh + 50);
    p5.text('I_C:', gx + 10, gy + gh + 68);
    p5.fill(TEXT);
    p5.textAlign(p5.RIGHT, p5.TOP);
    p5.text(`${formatPhys(timeRef.current)} s`, gx + 190, gy + gh + 32);
    p5.text(`${formatPhys(URef.current)} V`, gx + 190, gy + gh + 50);
    p5.text(`${formatPhys(IRef.current * scaleCurrentFactor)} ${unitI}`, gx + 190, gy + gh + 68);
  };

  const startCharge = () => {
    const { U0: U0val, R1: R1val } = paramsRef.current;
    const st = stateRef.current;
    IeRef.current = (U0val - URef.current) / R1val;
    teRef.current = timeRef.current;
    if (st === 10) timeRef.current += 0.02 * speedFactor(speedRef.current);
    stateRef.current = 1;
    t0Ref.current = Date.now();
    forceUpdate((n) => n + 1);
  };

  const startDischarge = () => {
    const { R2: R2val } = paramsRef.current;
    const st = stateRef.current;
    UaRef.current = URef.current;
    IaRef.current = -UaRef.current / R2val;
    taRef.current = timeRef.current;
    if (st === 20) timeRef.current += 0.02 * speedFactor(speedRef.current);
    stateRef.current = 2;
    t0Ref.current = Date.now();
    forceUpdate((n) => n + 1);
  };

  const pause = () => {
    const st = stateRef.current;
    if (st === 1) stateRef.current = 10;
    if (st === 2) stateRef.current = 20;
    forceUpdate((n) => n + 1);
  };

  const reset = () => {
    timeRef.current = 0;
    URef.current = 0;
    IRef.current = 0;
    stateRef.current = 0;
    historyRef.current = [];
    forceUpdate((n) => n + 1);
  };

  const st = stateRef.current;
  const showCharge = st !== 1;
  const showPause = st !== 0 && st !== 10 && st !== 20;
  const showDischarge = st !== 2 && st !== 0;
  const showReset = st !== 0;

  return (
    <div
      className="rounded-xl border overflow-hidden my-6 w-full max-w-full"
      style={{ borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}08` }}
    >
      <div className="p-4" style={{ backgroundColor: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: TEXT_DIM }}>U₀ [V]:</label>
              <input
                type="number"
                min={1}
                max={1000}
                value={U0}
                onChange={(e) => { setU0(Number(e.target.value) || 1); reset(); }}
                className="w-20 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: TEXT_DIM }}>C [µF]:</label>
              <input
                type="number"
                min={0.01}
                max={1000}
                step={0.01}
                value={C}
                onChange={(e) => { setC(Number(e.target.value) || 0.01); reset(); }}
                className="w-20 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: TEXT_DIM }}>R₁ [Ω]:</label>
              <input
                type="number"
                min={1}
                max={1000000}
                value={R1}
                onChange={(e) => { setR1(Number(e.target.value) || 1); reset(); }}
                className="w-24 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: TEXT_DIM }}>R₂ [Ω]:</label>
              <input
                type="number"
                min={1}
                max={1000000}
                value={R2}
                onChange={(e) => { setR2(Number(e.target.value) || 1); reset(); }}
                className="w-24 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm" style={{ color: TEXT_DIM }}>Geschw.:</label>
              <input
                type="range"
                min={1}
                max={10}
                value={speed}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setSpeed(v);
                  speedRef.current = v;
                }}
                className="w-48"
                style={{ accentColor: ACCENT }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2" style={{ borderLeft: `1px solid ${BORDER}`, paddingLeft: '1rem' }}>
            {showCharge && (
              <button
                onClick={startCharge}
                className="py-2 px-4 rounded-lg text-sm font-medium"
                style={{ backgroundColor: ACCENT, color: '#fff' }}
              >
                Aufladen
              </button>
            )}
            {showPause && (
              <button
                onClick={pause}
                className="py-2 px-4 rounded-lg text-sm font-medium border"
                style={{ borderColor: BORDER, color: TEXT }}
              >
                Pause
              </button>
            )}
            {showDischarge && (
              <button
                onClick={startDischarge}
                className="py-2 px-4 rounded-lg text-sm font-medium"
                style={{ backgroundColor: ACCENT, color: '#fff' }}
              >
                Entladen
              </button>
            )}
            {showReset && (
              <button
                onClick={reset}
                className="py-2 px-4 rounded-lg text-sm font-medium border"
                style={{ borderColor: BORDER, color: TEXT }}
              >
                Zurücksetzen
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div
          className="rounded-lg overflow-hidden w-[900px] max-w-full"
          style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
        >
          <Sketch setup={setup} draw={draw} />
        </div>
        <div
          className="mt-2 text-sm rounded px-3 py-2"
          style={{ backgroundColor: SURFACE2, color: TEXT_DIM }}
        >
          Ein Kondensator der Kapazität C kann über den Widerstand R₁ geladen bzw. über R₂ entladen werden. Mittels der Messgeräte V und A werden Stromstärke und Spannung am Kondensator erfasst.
        </div>
      </div>
    </div>
  );
}
