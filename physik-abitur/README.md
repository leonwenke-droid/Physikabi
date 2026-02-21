# Physik Abitur Lernplattform

Interaktive Lernplattform für das Physik-Abitur (erhöhtes Anforderungsniveau, eA).

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **KaTeX** (Formeln)
- **Zustand** (Fortschritt)
- **Lucide React** (Icons)

## Erste Schritte

```bash
# Abhängigkeiten installieren
npm install

# Alle laufenden Next.js-Server stoppen (Strg+C in jedem Terminal)
# Optional: npx kill-port 3000 3001

# Entwicklungsserver starten (nur eine Instanz!)
npm run dev
```

Die App läuft dann unter [http://localhost:3000](http://localhost:3000).

**Bei "missing required error components":** Zwei Dev-Server laufen gleichzeitig. Alle stoppen, dann `npm run dev:clean` für einen sauberen Neustart.

## Projektstruktur (Schritte 1–4)

- `app/` – Layout, Dashboard, Modul- und Lektionsseiten
- `components/layout/` – Sidebar, ProgressBar, Breadcrumb
- `components/dashboard/` – ModuleCard, StreakCounter, StatsPanel
- `lib/content/` – Module (Elektrizität, Schwingungen, Quantenobjekte, Atomhülle, Messunsicherheiten)
- `lib/types.ts` – TypeScript-Typen
- `lib/progress.ts` – Fortschritts-Logik mit Zustand + localStorage

## Module

1. **Elektrizität** – Elektrisches & magnetisches Feld
2. **Schwingungen & Wellen** – Harmonische Schwingungen, Interferenz
3. **Quantenobjekte** – Photoeffekt, de-Broglie, Unschärferelation
4. **Atomhülle & Atomkern** – Potenzialtopf, Radioaktivität
5. **Messunsicherheiten** – Signifikante Stellen, relative/absolute Unsicherheit

## Nächste Schritte (aus PROMPT.md)

- Schritt 5: Lektionsseiten mit Inhalten füllen
- Schritt 6: Quiz-Engine
- Schritt 7: Interaktive Simulationen
- Schritt 8: Formelsammlung
