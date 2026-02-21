'use client';

import { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), { ssr: false });

const BG = '#0a0a0f';
const SURFACE = '#18181f';
const BORDER = '#2a2a38';
const TEXT = '#f0f0f8';
const TEXT_DIM = '#8888aa';
const ACCENT = '#ff7a5c';

/** Bruton-Algorithmus: Wellenlänge (m), relInt 0–1 → Hex (für Schirm-Balken) */
function rgb(lambdaM: number, relInt: number): string {
  const l = lambdaM * 1e9;
  if (relInt === undefined) relInt = 1;
  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (l >= 380 && l < 440) {
    r1 = (440 - l) / 60;
    g1 = 0;
    b1 = 1;
  } else if (l < 490) {
    r1 = 0;
    g1 = (l - 440) / 50;
    b1 = 1;
  } else if (l < 510) {
    r1 = 0;
    g1 = 1;
    b1 = (510 - l) / 20;
  } else if (l < 580) {
    r1 = (l - 510) / 70;
    g1 = 1;
    b1 = 0;
  } else if (l < 645) {
    r1 = 1;
    g1 = (645 - l) / 65;
    b1 = 0;
  } else if (l <= 780) {
    r1 = 1;
    g1 = 0;
    b1 = 0;
  }
  let f = 1;
  if (l >= 380 && l < 420) f = 0.3 + (0.7 * (l - 380)) / 40;
  else if (l >= 700 && l <= 780) f = 0.3 + (0.7 * (780 - l)) / 80;
  const gamma = 0.8;
  const r2 = relInt * Math.pow(f * r1, gamma);
  const g2 = relInt * Math.pow(f * g1, gamma);
  const b2 = relInt * Math.pow(f * b1, gamma);
  const toHex = (z: number) => {
    const v = Math.max(0, Math.min(1, z));
    return Math.floor(255 * v)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${toHex(r2)}${toHex(g2)}${toHex(b2)}`;
}

/** Variante für kleine Intensitäten (aufgehellt) */
function rgb2(lambdaM: number, relInt: number): string {
  return rgb(lambdaM, Math.pow(relInt, 1 / 3));
}

/** Wellenlänge (nm) → Hex für Slider-Farbvorschau */
function wavelengthToHex(nm: number): string {
  return rgb(nm * 1e-9, 1);
}

export function WaveInterference() {
  const [lambda, setLambda] = useState(580);
  const [d, setD] = useState(3000); // nm
  const [b, setB] = useState(500); // nm
  const paramsRef = useRef({ lambda, d, b });
  paramsRef.current = { lambda, d, b };

  const setup = (p5: Parameters<NonNullable<React.ComponentProps<typeof Sketch>['setup']>>[0], parent: Element) => {
    p5.createCanvas(700, 450).parent(parent);
  };

  const draw = (p5: Parameters<NonNullable<React.ComponentProps<typeof Sketch>['draw']>>[0]) => {
    const { lambda: lam, d: dVal, b: bVal } = paramsRef.current;
    const lamM = lam * 1e-9;

    p5.background(BG);

    const cw = 700;

    const KS = {
      x: 10,
      y: 110,
      breite: cw - 20,
      hoehe: 300,
    };
    const xanfang = -90;
    const xende = 90;
    const yanfang = -10;
    const yende = 110;

    // Intensitätsberechnung (wie LEIFI)
    const x: number[] = [];
    const x2: number[] = [];
    const y: number[] = [];
    const ye: number[] = [];

    for (let i = 0; i <= KS.breite; i++) {
      x[i] = xanfang + (i * (xende - xanfang)) / KS.breite;
      x2[i] = (x[i] * Math.PI) / 180;
    }

    const half = Math.floor(KS.breite / 2);
    for (let i = 0; i < half; i++) {
      const k0 = Math.sin(x2[i]) / lam;
      const k1 = Math.PI * bVal * k0;
      const k2 = Math.abs(k1) < 1e-10 ? 1 : Math.sin(k1) / k1;
      ye[KS.breite - i] = ye[i] = 100 * k2 * k2;
      const k3 = Math.cos(Math.PI * dVal * k0);
      y[KS.breite - i] = y[i] = k3 * k3 * ye[i];
    }
    ye[half] = 100;
    y[half] = 100;

    // Schirm: farbige Balken (wie LEIFI)
    const stripX = 9;
    const stripY = 10;
    const stripW = cw - 18;
    const stripH = 80;

    p5.stroke(BORDER);
    p5.strokeWeight(1);
    p5.noFill();
    p5.rect(stripX, stripY, stripW, stripH);

    for (let i = 0; i <= KS.breite; i++) {
      const relInt = 0.01 * y[i];
      const barColor = rgb2(lamM, relInt);
      p5.stroke(barColor);
      p5.strokeWeight(1.5);
      p5.line(KS.x + i, stripY + 10, KS.x + i, stripY + stripH);
    }

    // Koordinatensystem
    const xf = KS.breite / (xende - xanfang);
    const yf = KS.hoehe / (yende - yanfang);
    const x0 = KS.x + (Math.abs(xanfang) / (Math.abs(xanfang) + Math.abs(xende))) * KS.breite;
    const y0 = KS.y + KS.hoehe - (Math.abs(yanfang) / (Math.abs(yanfang) + Math.abs(yende))) * KS.hoehe;

    p5.fill(SURFACE);
    p5.stroke(BORDER);
    p5.rect(KS.x, KS.y, KS.breite, KS.hoehe);

    // X-Achse (α)
    p5.stroke(TEXT);
    p5.strokeWeight(1);
    p5.line(KS.x, y0, KS.x + KS.breite, y0);
    // Pfeilspitze
    const phi = Math.PI / 8;
    p5.line(KS.x + KS.breite, y0, KS.x + KS.breite - 10 * Math.cos(-phi), y0 - 10 * Math.sin(-phi));
    p5.line(KS.x + KS.breite, y0, KS.x + KS.breite - 10 * Math.cos(phi), y0 - 10 * Math.sin(phi));
    p5.fill(TEXT);
    p5.noStroke();
    p5.textSize(11);
    p5.textAlign(p5.LEFT, p5.BASELINE);
    p5.text('α in °', KS.x + KS.breite - 40, y0 - 8);
    // Skala
    for (let xv = -80; xv <= 80; xv += 10) {
      if (xv !== 0) {
        p5.textAlign(p5.CENTER, p5.TOP);
        p5.fill(TEXT_DIM);
        p5.text(String(xv), KS.x + xf * (xv - xanfang), y0 + 5);
      }
    }
    p5.textAlign(p5.CENTER, p5.TOP);
    p5.fill(TEXT_DIM);
    p5.text('0', x0, y0 + 5);

    // Y-Achse (I)
    p5.stroke(TEXT);
    p5.line(x0, KS.y + KS.hoehe, x0, KS.y);
    p5.line(x0, KS.y, x0 - 10 * Math.sin(-phi), KS.y + 10 * Math.cos(-phi));
    p5.line(x0, KS.y, x0 - 10 * Math.sin(phi), KS.y + 10 * Math.cos(phi));
    p5.fill(TEXT);
    p5.noStroke();
    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.text('I in %', x0 + 8, KS.y - 15);
    for (let yv = 10; yv <= 100; yv += 10) {
      if (yv !== 0) {
        p5.textAlign(p5.RIGHT, p5.CENTER);
        p5.fill(TEXT_DIM);
        p5.text(String(yv), x0 - 8, y0 - yv * yf);
      }
    }
    p5.textAlign(p5.RIGHT, p5.CENTER);
    p5.fill(TEXT_DIM);
    p5.text('0', x0 - 8, y0 + 5);

    // Raster
    p5.stroke(BORDER);
    p5.strokeWeight(0.25);
    for (let xv = -90; xv <= 90; xv += 10) {
      if (xv !== 0) {
        const xx = KS.x + xf * (xv - xanfang);
        p5.line(xx, KS.y + KS.hoehe, xx, KS.y);
      }
    }
    for (let yv = 10; yv <= 100; yv += 10) {
      const yy = y0 - yv * yf;
      p5.line(KS.x, yy, KS.x + KS.breite, yy);
    }
    p5.strokeWeight(1);

    // Kurve: Gesamtintensität (schwarz/weiß)
    p5.stroke(TEXT);
    p5.strokeWeight(2);
    p5.noFill();
    p5.drawingContext.save();
    p5.drawingContext.beginPath();
    p5.drawingContext.rect(KS.x, KS.y, KS.breite, KS.hoehe);
    p5.drawingContext.clip();

    p5.beginShape();
    for (let i = 0; i <= KS.breite; i++) {
      const xx = KS.x + xf * (x[i] - xanfang);
      const yy = KS.y + KS.hoehe + yf * (yanfang - y[i]);
      p5.vertex(xx, yy);
    }
    p5.endShape();

    // Kurve: Einzelspalt-Einhüllende (rot)
    p5.stroke('#ef4444');
    p5.beginShape();
    for (let i = 0; i <= KS.breite; i++) {
      const xx = KS.x + xf * (x[i] - xanfang);
      const yy = KS.y + KS.hoehe + yf * (yanfang - ye[i]);
      p5.vertex(xx, yy);
    }
    p5.endShape();
    p5.drawingContext.restore();

    // Legende
    p5.fill(TEXT);
    p5.noStroke();
    p5.textSize(10);
    p5.textAlign(p5.LEFT, p5.CENTER);
    p5.text('I(α) gesamt', KS.x + KS.breite - 120, KS.y + KS.hoehe + 18);
    p5.stroke(TEXT);
    p5.line(KS.x + KS.breite - 135, KS.y + KS.hoehe + 15, KS.x + KS.breite - 115, KS.y + KS.hoehe + 15);
    p5.stroke('#ef4444');
    p5.line(KS.x + KS.breite - 70, KS.y + KS.hoehe + 15, KS.x + KS.breite - 50, KS.y + KS.hoehe + 15);
    p5.noStroke();
    p5.fill('#ef4444');
    p5.text('Einhüllende', KS.x + KS.breite - 45, KS.y + KS.hoehe + 18);
  };

  return (
    <div
      className="rounded-xl border my-6 w-full overflow-x-auto"
      style={{ borderColor: `${ACCENT}40`, backgroundColor: `${ACCENT}08` }}
    >
      <div
        className="flex min-w-[900px]"
        style={{ backgroundColor: BG, border: `1px solid ${BORDER}` }}
      >
        {/* Linkes Panel: Parameter + Slider direkt unter den Werten */}
        <div
          className="w-[200px] shrink-0 flex flex-col items-center py-6 px-4 gap-6"
          style={{ backgroundColor: SURFACE, borderRight: `1px solid ${BORDER}` }}
        >
          <div className="text-center">
            <h3 style={{ color: TEXT }} className="font-bold text-base">
              Doppelspalt
            </h3>
            <p style={{ color: TEXT_DIM }} className="text-sm mt-1">
              N = 2
            </p>
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <span style={{ color: TEXT_DIM }} className="text-sm">
              Spaltabstand
            </span>
            <span style={{ color: TEXT }} className="font-mono text-sm">
              d = {d} nm
            </span>
            <input
              type="range"
              min={1000}
              max={5000}
              step={100}
              value={d}
              onChange={(e) => setD(Number(e.target.value))}
              className="w-full accent-[#ff7a5c]"
            />
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <span style={{ color: TEXT_DIM }} className="text-sm">
              Spaltbreite
            </span>
            <span style={{ color: TEXT }} className="font-mono text-sm">
              b = {b} nm
            </span>
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={b}
              onChange={(e) => setB(Number(e.target.value))}
              className="w-full accent-[#ff7a5c]"
            />
          </div>

          <div className="w-full flex flex-col items-center gap-2">
            <span style={{ color: TEXT_DIM }} className="text-sm">
              Wellenlänge
            </span>
            <span style={{ color: TEXT }} className="font-mono text-sm flex items-center gap-2">
              λ = {lambda} nm
              <span
                className="w-4 h-4 rounded border shrink-0"
                style={{ backgroundColor: wavelengthToHex(lambda), borderColor: BORDER }}
                title={`${lambda} nm`}
              />
            </span>
            <input
              type="range"
              min={380}
              max={780}
              step={1}
              value={lambda}
              onChange={(e) => setLambda(Number(e.target.value))}
              className="w-full accent-[#ff7a5c]"
            />
          </div>
        </div>

        {/* Rechter Bereich: Canvas mit Schirm + Diagramm */}
        <div className="flex-1 p-4 flex justify-center min-w-[700px]">
          <div
            className="rounded-lg shrink-0"
            style={{ backgroundColor: BG, border: `1px solid ${BORDER}`, width: 700 }}
          >
            <Sketch setup={setup} draw={draw} />
          </div>
        </div>
      </div>
    </div>
  );
}
