'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), { ssr: false });

// App-Design (globals.css)
const BG = '#0a0a0f';
const SURFACE = '#18181f';
const SURFACE2 = '#111118';
const BORDER = '#2a2a38';
const TEXT = '#f0f0f8';
const TEXT_DIM = '#8888aa';
const ACCENT = '#ff7a5c';

const COLORS = {
  elongation: '#ef4444',
  velocity: '#eab308',
  acceleration: '#a855f7',
  force: '#3b82f6',
  body: '#4a4a5a',
};

type DiagramType = 0 | 1 | 2 | 3 | 4; // s, v, a, F, E

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/** Physikalisch sinnvolle Formatierung: 2–3 signifikante Stellen */
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

const PARAM_LIMITS: Record<string, [number, number]> = {
  D: [1, 50],
  m: [0.1, 10],
  g: [1, 100],
  A: [0.01, 0.1],
};

export function OscillationSim() {
  // Standard: D=20, m=5, A=0,05 → v_max = A·ω = 0,1 m/s, a_max = A·ω² = 0,2 m/s²
  const [params, setParams] = useState({ D: 20, m: 5, g: 9.81, A: 0.05 });
  const [inputVals, setInputVals] = useState({ D: '20,0', m: '5,00', g: '9,81', A: '0,0500' });
  const paramsRef = useRef(params);
  paramsRef.current = params;
  const stateRef = useRef({ running: false, t: 0, t0: 0, slow: false });
  const [btnState, setBtnState] = useState(0); // 0=Start, 1=Pause, 2=Weiter
  const [diagram, setDiagram] = useState<DiagramType>(0);

  const omega = Math.sqrt(params.D / params.m);
  const T = 2 * Math.PI / omega;

  const setup = (p5: Parameters<NonNullable<React.ComponentProps<typeof Sketch>['setup']>>[0], parent: Element) => {
    p5.createCanvas(800, 400).parent(parent);
  };

  const draw = (p5: Parameters<NonNullable<React.ComponentProps<typeof Sketch>['draw']>>[0]) => {
    const { D, m, A } = paramsRef.current;
    const st = stateRef.current;

    const om = Math.sqrt(D / m);
    const Tval = 2 * Math.PI / om;

    if (st.running) {
      const dt = (Date.now() - st.t0) / 1000 * (st.slow ? 0.1 : 1);
      st.t += dt;
      st.t0 = Date.now();
    }

    const phi = om * st.t;
    const cosPhi = Math.cos(phi);
    const sinPhi = Math.sin(phi);
    const s = A * cosPhi;
    const v = -A * om * sinPhi;
    const a = -A * om * om * cosPhi;
    const f = -m * A * om * om * cosPhi;
    const eTot = 0.5 * D * A * A;
    const ePot = 0.5 * D * s * s;
    const eKin = eTot - ePot;

    const ax = 100;
    const ay = 50;
    const py0 = 180;
    const diagramGh = 120;
    const yPixPerM = diagramGh / (2 * A);
    const py = py0 - s * yPixPerM;
    const xD = 270;
    const yD1 = py0 - diagramGh / 2;
    const gw = 200;
    const tWindow = gw / 22;
    const tEnd = st.t;
    const minRange = 0.5;
    const tRange = tEnd > tWindow ? tWindow : (tEnd > minRange ? tEnd * 2 : minRange * 2);
    const tU = Math.max(0, tEnd - tRange / 2);
    const tPix = gw / tRange;

    p5.background(BG);

    // Federpendel (wie HTML)
    p5.fill(SURFACE);
    p5.stroke(BORDER);
    p5.strokeWeight(1);
    p5.rect(ax - 50, ay - 5, 100, 5, 2);
    p5.line(ax, ay, ax, ay + 10);

    const springLen = Math.max(20, py - ay - 25);
    const per = springLen / 10;
    p5.stroke(ACCENT);
    p5.strokeWeight(2);
    p5.noFill();
    p5.beginShape();
    p5.vertex(ax, ay + 10);
    for (let y = ay + 11; y <= py - 15; y++) {
      let x = ax + 10 * Math.sin((2 * Math.PI / per) * (y - ay - 10));
      if (y > py - 16) x = Math.max(x, ax);
      p5.vertex(x, y);
    }
    p5.endShape();

    p5.line(ax, py - 15, ax, py - 5);
    p5.fill(COLORS.body);
    p5.stroke(BORDER);
    p5.circle(ax, py, 10);

    p5.stroke(BORDER);
    p5.strokeWeight(1);
    p5.line(ax - 40, py0, ax - 20, py0);
    p5.line(ax + 20, py0, ax + 40, py0);

    const drawArrow = (x1: number, y1: number, x2: number, y2: number, color: string) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 2) return;
      p5.stroke(color);
      p5.strokeWeight(2);
      p5.line(x1, y1, x2, y2);
      const sx = x2 - (dx / len) * 12;
      const sy = y2 - (dy / len) * 12;
      const h = 4;
      p5.fill(color);
      p5.noStroke();
      p5.triangle(x2, y2, sx - h * (dy / len), sy + h * (dx / len), sx + h * (dy / len), sy - h * (dx / len));
    };

    const sy = py;
    if (diagram === 0) {
      p5.stroke(COLORS.elongation);
      p5.strokeWeight(3);
      p5.line(ax, py0, ax, py);
    } else if (diagram === 1 && Math.abs(v) > 0.001) {
      const vPix = 60 / (A * om || 0.001);
      drawArrow(ax, sy, ax, sy - v * vPix, COLORS.velocity);
    } else if (diagram === 2 && Math.abs(a) > 0.001) {
      const aPix = 40 / (A * om * om || 0.001);
      drawArrow(ax, sy, ax, sy - a * aPix, COLORS.acceleration);
    } else if (diagram === 3 && Math.abs(f) > 0.001) {
      const fPix = 40 / (m * A * om * om || 0.001);
      drawArrow(ax, sy, ax, sy - f * fPix, COLORS.force);
    }

    const drawDiagram = (
      yMax: number,
      color: string,
      getVal: (t: number) => number,
      currVal: number,
      ySymbol: string,
      yUnit: string
    ) => {
      const gw = 200;
      const gh = diagramGh;
      const gx = xD - 20;
      const gy = yD1;
      const yPix = gh / 2 / (yMax || 0.001);
      const midY = gy + gh / 2;

      p5.fill(TEXT_DIM);
      p5.noStroke();
      p5.textSize(10);
      p5.textAlign(p5.LEFT, p5.TOP);
      p5.text(`${ySymbol} [${yUnit}]`, gx, gy - 16);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      p5.text('t [s]', gx + gw / 2 - 10, gy + gh + 14);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      p5.text(`+${formatPhys(yMax)}`, gx - 6, gy + 2);
      p5.text('0', gx - 6, midY);
      p5.text(`−${formatPhys(yMax)}`, gx - 6, gy + gh - 2);
      const tStep = Math.max(0.5, Math.round(Tval * 2) / 2);
      for (let k = 0; k * tStep <= gw / tPix; k++) {
        const tt = tU + k * tStep;
        const xx = gx + (tt - tU) * tPix;
        if (xx >= gx + 4 && xx <= gx + gw - 4) {
          p5.textAlign(p5.CENTER, p5.TOP);
          p5.text(tt % 1 === 0 ? tt.toFixed(0) : tt.toFixed(1), xx, gy + gh + 2);
          p5.textAlign(p5.RIGHT, p5.CENTER);
        }
      }

      p5.stroke(BORDER);
      p5.strokeWeight(1);
      p5.noFill();
      p5.rect(gx, gy, gw, gh, 4);

      p5.stroke(color);
      p5.strokeWeight(2);
      p5.beginShape();
      for (let i = 0; i <= 150; i++) {
        const tt = tU + (i / 150) * (gw / tPix);
        const xx = gx + (tt - tU) * tPix;
        if (xx >= gx + 2 && xx <= gx + gw - 2) {
          p5.vertex(xx, midY - getVal(tt) * yPix);
        }
      }
      p5.endShape();

      const currX = gx + (st.t - tU) * tPix;
      if (currX >= gx + 2 && currX <= gx + gw - 2) {
        p5.stroke(BORDER);
        p5.drawingContext.setLineDash([2, 2]);
        p5.line(currX, gy + 2, currX, gy + gh - 2);
        p5.drawingContext.setLineDash([]);
        p5.fill(color);
        p5.noStroke();
        p5.circle(currX, midY - currVal * yPix, 5);
      }
    };

    const gx = xD - 20;
    const currX = gx + (st.t - tU) * tPix;
    const currXInDiagram = currX >= gx + 2 && currX <= gx + 200 - 2;

    if (diagram === 0) {
      drawDiagram(A, COLORS.elongation, (t) => A * Math.cos(om * t), s, 's', 'm');
      if (currXInDiagram) {
        p5.stroke(COLORS.elongation);
        p5.strokeWeight(1);
        p5.drawingContext.setLineDash([4, 4]);
        p5.line(ax + 8, py, currX, py);
        p5.drawingContext.setLineDash([]);
      }
    } else if (diagram === 1) {
      drawDiagram(A * om, COLORS.velocity, (t) => -A * om * Math.sin(om * t), v, 'v', 'm/s');
    } else if (diagram === 2) {
      drawDiagram(A * om * om, COLORS.acceleration, (t) => -A * om * om * Math.cos(om * t), a, 'a', 'm/s²');
    } else if (diagram === 3) {
      const Fmax = D * A;
      drawDiagram(Fmax, COLORS.force, (t) => -D * A * Math.cos(om * t), f, 'F', 'N');
    } else {
      const gw = 200;
      const gh = 100;
      const gx = xD - 20;
      const gy = py0 - gh / 2;
      const baseY = gy + gh - 4;
      const ePix = (gh - 8) / (eTot || 0.001);

      p5.fill(TEXT_DIM);
      p5.textSize(10);
      p5.textAlign(p5.LEFT, p5.TOP);
      p5.text('E [J]', gx, gy - 16);
      p5.textAlign(p5.RIGHT, p5.CENTER);
      p5.text('t [s]', gx + gw / 2 - 10, gy + gh + 14);
      p5.text(`E_tot = ${formatPhys(eTot)}`, gx - 6, gy + 2);
      p5.text('0', gx - 6, baseY + 4);
      const tStepE = Math.max(0.5, Math.round(Tval * 2) / 2);
      for (let k = 0; k * tStepE <= gw / tPix; k++) {
        const tt = tU + k * tStepE;
        const xx = gx + (tt - tU) * tPix;
        if (xx >= gx + 4 && xx <= gx + gw - 4) {
          p5.textAlign(p5.CENTER, p5.TOP);
          p5.text(tt % 1 === 0 ? tt.toFixed(0) : tt.toFixed(1), xx, gy + gh + 2);
          p5.textAlign(p5.RIGHT, p5.CENTER);
        }
      }

      p5.stroke(BORDER);
      p5.noFill();
      p5.rect(gx, gy, gw, gh, 4);
      p5.line(gx, baseY - eTot * ePix, gx + gw, baseY - eTot * ePix);

      p5.stroke(COLORS.elongation);
      p5.strokeWeight(1.5);
      p5.beginShape();
      for (let i = 0; i <= 150; i++) {
        const tt = tU + (i / 150) * (gw / tPix);
        const xx = gx + (tt - tU) * tPix;
        if (xx >= gx + 2 && xx <= gx + gw - 2) {
          const ep = 0.5 * D * A * A * Math.cos(om * tt) ** 2;
          p5.vertex(xx, baseY - ep * ePix);
        }
      }
      p5.endShape();
      p5.stroke(COLORS.velocity);
      p5.beginShape();
      for (let i = 0; i <= 150; i++) {
        const tt = tU + (i / 150) * (gw / tPix);
        const xx = gx + (tt - tU) * tPix;
        if (xx >= gx + 2 && xx <= gx + gw - 2) {
          const ek = eTot * Math.sin(om * tt) ** 2;
          p5.vertex(xx, baseY - ek * ePix);
        }
      }
      p5.endShape();

      const currX = gx + (st.t - tU) * tPix;
      if (currX >= gx + 2 && currX <= gx + gw - 2) {
        p5.stroke(BORDER);
        p5.drawingContext.setLineDash([2, 2]);
        p5.line(currX, gy + 2, currX, baseY);
        p5.drawingContext.setLineDash([]);
        p5.fill(COLORS.elongation);
        p5.noStroke();
        p5.circle(currX, baseY - ePot * ePix, 5);
        p5.fill(COLORS.velocity);
        p5.circle(currX, baseY - eKin * ePix, 5);
      }
    }

    p5.fill(SURFACE);
    p5.stroke(BORDER);
    p5.rect(ax - 55, 330, 110, 32, 4);
    p5.noStroke();
    p5.fill(COLORS.elongation);
    p5.textAlign(p5.CENTER, p5.CENTER);
    p5.textSize(14);
    p5.text(`t = ${(st.t % 1000).toFixed(2)} s`, ax, 346);

    if (diagram === 4) {
      const egx = xD - 20;
      const egw = 200;
      const egh = 100;
      const egy = py0 - egh / 2;
      const ebX = egx + egw + 18;
      const ebY = egy;
      const ebW = 22;
      const ebH = egh;
      p5.fill(BORDER);
      p5.noStroke();
      p5.rect(ebX, ebY, ebW, ebH, 4);
      p5.fill(COLORS.elongation);
      p5.rect(ebX, ebY + ebH * (1 - ePot / eTot), ebW, ebH * (ePot / eTot), 4);
      p5.fill(COLORS.velocity);
      p5.rect(ebX, ebY, ebW, ebH * (eKin / eTot), 4);
    }

    p5.fill(TEXT_DIM);
    p5.textSize(10);
    p5.textAlign(p5.LEFT, p5.TOP);
    p5.text(`Schwingungsdauer: ${Tval.toFixed(3)} s`, ax - 55, 368);
  };

  const handleParamChange = (key: 'D' | 'm' | 'g' | 'A', raw: string) => {
    setInputVals((v) => ({ ...v, [key]: raw }));
    const n = parseFloat(raw.replace(',', '.'));
    if (!isNaN(n)) {
      const [min, max] = PARAM_LIMITS[key];
      setParams((p) => ({ ...p, [key]: clamp(n, min, max) }));
    }
  };

  const handleParamBlur = (key: 'D' | 'm' | 'g' | 'A') => {
    const n = parseFloat(inputVals[key].replace(',', '.'));
    const [min, max] = PARAM_LIMITS[key];
    const val = clamp(isNaN(n) ? params[key] : n, min, max);
    setParams((p) => ({ ...p, [key]: val }));
    setInputVals((v) => ({ ...v, [key]: val.toString() }));
  };

  const handleStart = () => {
    const st = stateRef.current;
    if (btnState === 0) {
      st.running = true;
      st.t0 = Date.now();
      setBtnState(1);
    } else if (btnState === 1) {
      st.running = false;
      setBtnState(2);
    } else {
      st.running = true;
      st.t0 = Date.now();
      setBtnState(1);
    }
  };

  const handleReset = () => {
    stateRef.current.running = false;
    stateRef.current.t = 0;
    setBtnState(0);
  };

  const btnLabels = ['Start', 'Pause', 'Weiter'];

  return (
    <div
      className="rounded-xl border overflow-hidden my-6 w-full max-w-full"
      style={{ borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}08` }}
    >
      <div
        className="p-4 w-full"
        style={{ backgroundColor: SURFACE, borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="flex flex-wrap items-end gap-x-4 gap-y-4">
          <div className="flex items-center gap-2 shrink-0">
            <span style={{ color: TEXT_DIM }} className="text-sm font-mono">T = 2π√(m/D) =</span>
            <span style={{ color: TEXT }} className="text-sm font-mono">{T.toFixed(3)} s</span>
            <span style={{ color: TEXT_DIM }} className="text-sm font-mono">f =</span>
            <span style={{ color: TEXT }} className="text-sm font-mono">{(1 / T).toFixed(2)} Hz</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleStart}
              className="py-2 px-3 rounded-lg text-sm font-medium shrink-0"
              style={{ backgroundColor: ACCENT, color: '#fff' }}
            >
              {btnLabels[btnState]}
            </button>
            <button
              onClick={handleReset}
              className="py-2 px-3 rounded-lg text-sm font-medium border shrink-0"
              style={{ borderColor: BORDER, color: TEXT }}
            >
              Zurück
            </button>
            <label className="flex items-center gap-1.5 text-sm cursor-pointer shrink-0" style={{ color: TEXT_DIM }}>
              <input
                type="checkbox"
                className="rounded"
                style={{ accentColor: ACCENT }}
                onChange={(e) => { stateRef.current.slow = e.target.checked; }}
              />
              Zeitlupe
            </label>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <label className="shrink-0 text-sm whitespace-nowrap" style={{ color: TEXT_DIM }}>Federkonst.:</label>
              <input
                type="text"
                className="w-16 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
                value={inputVals.D}
                onChange={(e) => handleParamChange('D', e.target.value)}
                onBlur={() => handleParamBlur('D')}
                onKeyDown={(e) => e.key === 'Enter' && handleParamBlur('D')}
              />
              <span className="text-sm shrink-0" style={{ color: TEXT_DIM }}>N/m</span>
            </div>
            <div className="flex items-center gap-1.5">
              <label className="shrink-0 text-sm whitespace-nowrap" style={{ color: TEXT_DIM }}>Masse:</label>
              <input
                type="text"
                className="w-16 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
                value={inputVals.m}
                onChange={(e) => handleParamChange('m', e.target.value)}
                onBlur={() => handleParamBlur('m')}
                onKeyDown={(e) => e.key === 'Enter' && handleParamBlur('m')}
              />
              <span className="text-sm shrink-0" style={{ color: TEXT_DIM }}>kg</span>
            </div>
            <div className="flex items-center gap-1.5">
              <label className="shrink-0 text-sm whitespace-nowrap" style={{ color: TEXT_DIM }}>Fallbeschl.:</label>
              <input
                type="text"
                className="w-16 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
                value={inputVals.g}
                onChange={(e) => handleParamChange('g', e.target.value)}
                onBlur={() => handleParamBlur('g')}
                onKeyDown={(e) => e.key === 'Enter' && handleParamBlur('g')}
              />
              <span className="text-sm shrink-0" style={{ color: TEXT_DIM }}>m/s²</span>
            </div>
            <div className="flex items-center gap-1.5">
              <label className="shrink-0 text-sm whitespace-nowrap" style={{ color: TEXT_DIM }}>Amplitude:</label>
              <input
                type="text"
                className="w-16 px-2 py-1 rounded text-right text-sm"
                style={{ backgroundColor: SURFACE2, border: `1px solid ${BORDER}`, color: TEXT }}
                value={inputVals.A}
                onChange={(e) => handleParamChange('A', e.target.value)}
                onBlur={() => handleParamBlur('A')}
                onKeyDown={(e) => e.key === 'Enter' && handleParamBlur('A')}
              />
              <span className="text-sm shrink-0" style={{ color: TEXT_DIM }}>m</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 shrink-0" style={{ borderLeft: `1px solid ${BORDER}`, paddingLeft: '0.75rem', marginLeft: '0.25rem' }}>
            <span className="text-sm shrink-0" style={{ color: TEXT_DIM }}>Diagramm:</span>
            {[
              { id: 0 as DiagramType, label: 'Elongation', color: COLORS.elongation },
              { id: 1 as DiagramType, label: 'Geschwindigkeit', color: COLORS.velocity },
              { id: 2 as DiagramType, label: 'Beschleunigung', color: COLORS.acceleration },
              { id: 3 as DiagramType, label: 'Kraft', color: COLORS.force },
              { id: 4 as DiagramType, label: 'Energie', color: COLORS.velocity },
            ].map(({ id, label, color }) => (
              <label key={id} className="flex items-center gap-1 cursor-pointer text-sm shrink-0">
                <input
                  type="radio"
                  name="diagram"
                  checked={diagram === id}
                  onChange={() => setDiagram(id)}
                  style={{ accentColor: ACCENT }}
                />
                <span style={{ color: diagram === id ? color : TEXT_DIM }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div
          className="mb-2 px-1 text-sm"
          style={{ color: TEXT_DIM }}
        >
          <span style={{ color: COLORS[diagram === 0 ? 'elongation' : diagram === 1 ? 'velocity' : diagram === 2 ? 'acceleration' : diagram === 3 ? 'force' : 'velocity'] }}>
            {['Elongation', 'Geschwindigkeit', 'Beschleunigung', 'Kraft', 'Energie'][diagram]}
          </span>
          <span style={{ color: TEXT_DIM }}> {['s [m]', 'v [m/s]', 'a [m/s²]', 'F [N]', 'E [J]'][diagram]}</span>
        </div>
        <div
          className="rounded-lg overflow-hidden w-[800px] max-w-full"
          style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
        >
          <Sketch setup={setup} draw={draw} />
        </div>
      </div>
    </div>
  );
}
