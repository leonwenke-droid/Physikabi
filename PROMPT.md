# Cursor AI Prompt: Physik Abitur Lernplattform

> **Anleitung:** Kopiere diesen gesamten Prompt in Cursor AI (z.B. als neue Datei `PROMPT.md`, dann im Composer-Modus einfügen). Füge die 5 PDF-Dateien als Kontext hinzu. Dann starte mit „Erstelle die Lernplattform gemäß diesem Prompt."

---

## Projektziel

Erstelle eine vollständige, interaktive **Physik-Abitur-Lernplattform** als moderne Webanwendung. Die App soll ähnlich wie Brilliant.org oder Google's „Learn Your Way" funktionieren — strukturiertes Lernen mit Erklärungen, interaktiven Übungen, Quizzen, Animationen und Fortschrittstracking.

Die Inhalte basieren auf den beigefügten PDF-Dateien, die den kompletten Lehrplan für das Physik-Abitur (erhöhtes Anforderungsniveau, eA) abdecken.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router) mit TypeScript
- **Styling:** Tailwind CSS + shadcn/ui Komponenten
- **Animationen:** Framer Motion
- **Mathe-Rendering:** KaTeX (für Formeln)
- **Diagramme/Graphen:** Recharts oder Chart.js
- **Interaktive Physik-Visualisierungen:** p5.js oder custom Canvas/SVG
- **State Management:** Zustand (für Fortschritt) + localStorage
- **Datenbank (Fortschritt):** localStorage / optional Supabase für Persistenz
- **Icons:** Lucide React

---

## Projektstruktur

```
physik-abitur/
├── app/
│   ├── layout.tsx              # Root Layout mit Sidebar
│   ├── page.tsx                # Dashboard / Startseite
│   ├── [moduleId]/
│   │   ├── page.tsx            # Modul-Übersicht
│   │   └── [topicId]/
│   │       ├── page.tsx        # Lektions-Seite
│   │       └── quiz/
│   │           └── page.tsx    # Quiz-Seite
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Breadcrumb.tsx
│   ├── lesson/
│   │   ├── LessonCard.tsx
│   │   ├── FormulaBox.tsx
│   │   ├── ConceptCheck.tsx    # Kleine Zwischenübungen
│   │   ├── Checklist.tsx
│   │   └── NoteBox.tsx
│   ├── quiz/
│   │   ├── QuizEngine.tsx
│   │   ├── MultipleChoice.tsx
│   │   ├── FormulaInput.tsx    # Zahlen eingeben
│   │   ├── DragDrop.tsx        # Zuordnungs-Aufgaben
│   │   └── QuizResults.tsx
│   ├── interactive/
│   │   ├── OscillationSim.tsx  # Feder-Masse-Pendel Animation
│   │   ├── FieldLines.tsx      # Elektrische Feldlinien
│   │   ├── DecayCurve.tsx      # Abklingkurven
│   │   ├── WaveInterference.tsx# Interferenzmuster
│   │   └── EnergyLevels.tsx    # Energieniveauschema
│   └── dashboard/
│       ├── ModuleCard.tsx
│       ├── StreakCounter.tsx
│       └── StatsPanel.tsx
├── lib/
│   ├── content/                # Alle Lerninhalte als TS-Objekte
│   │   ├── elektrizitaet.ts
│   │   ├── schwingungen.ts
│   │   ├── quantenobjekte.ts
│   │   ├── atomhuelle.ts
│   │   └── messunsicherheiten.ts
│   ├── progress.ts             # Fortschritt-Logik
│   └── types.ts                # TypeScript Typen
└── public/
    └── formulas/               # Formel-Bilder falls nötig
```

---

## Inhaltsstruktur (4 Halbjahre + Messunsicherheiten)

### Modul 1 — Elektrizität (HJ 1 & 2)
**Farbe:** Blau `#4f9cf9`

#### Kapitel 1: Elektrisches Feld
Themen (je eine eigene Lektions-Seite):
1. **Elektrische Feldstärke & Feldlinien**
   - Def: `E = F/q` mit Einheit N/C = V/m
   - Feldlinienbilder: homogenes Feld, Punktladung (interaktive SVG-Skizze)
   - Plattenkondensator: `E = U/d`
   - eA: Skizzen zeichnen, Bedeutung erläutern
   
2. **Kondensator & Kapazität**
   - Def: `C = Q/U`; Einheit Farad
   - Energiebilanz: `½mv² = eU_A`, Herleitung der Geschwindigkeit
   - Geometrische Berechnung von C
   - eA: Experiment planen, C bestimmen

3. **Entladevorgang des Kondensators**
   - Exponentialfunktion: `I(t) = I₀ · e^(-t/RC)`
   - t-I-Diagramm: Fläche = Ladung Q
   - Parameter R und C ermitteln
   - eA: Selbständige Auswertung, Begründung des exp. Verlaufs
   - **Interaktiv:** Animierter Entladevorgang mit einstellbarem R und C

#### Kapitel 2: Magnetisches Feld
4. **Magnetische Flussdichte B**
   - Def: `B = F/(I·s)` analog zu E
   - Dreifingerregel
   - Stromwaage-Experiment
   - eA: Planung, Auswertung, Begründung mit Messdaten

5. **Lorentzkraft & Bahnkurven**
   - `F_L = q·v·B`; Kreisbahn im homogenen B-Feld
   - Bewegung im E-Feld: `s_y = ½ · (qU)/(md) · (1/v₀²) · s_x²` (Parabel)
   - Wien-Filter: `v = E/B`
   - eA: Herleitung der Bahnkurvengleichungen
   - **Interaktiv:** Elektron im wählbaren E/B-Feld animieren

6. **e/m-Bestimmung (Fadenstrahlrohr)**
   - `e/m_e = v/(r·B)`
   - Elektronenmasse: `m_e = (B²·r²)/(2·U_A) · e`
   - eA: Vollständige Herleitung

7. **Hallspannung**
   - Entstehung, Skizze
   - `U_H = R_H · (I·b)/d` mit `R_H = 1/(n·e)`
   - eA: Herleitung mit Ladungsträgerdichte

8. **Induktionsgesetz**
   - Qualitativ: `U_ind ~ ΔB/Δt` und `U_ind ~ ΔA/Δt`
   - Differenziell: `U_ind = -N · ΔΦ/Δt`
   - Lineare und sinusförmige Verläufe
   - eA: Auswertung von Versuchsdiagrammen

---

### Modul 2 — Schwingungen & Wellen (HJ 2)
**Farbe:** Orange `#ff7a5c`

#### Kapitel 1: Harmonische Schwingungen
1. **Grundgrößen harmonischer Schwingungen**
   - `y(t) = y_max · sin(ω·t)`
   - `f = 1/T` und `ω = 2π·f`
   - Sinuskurve + Zeigerdarstellung (interaktiv wählbar)
   - **Interaktiv:** Zeiger dreht sich, Sinuskurve entsteht live

2. **Feder-Masse-Pendel**
   - `T = 2π · √(m/D)`; lineares Kraftgesetz `F = -D·x`
   - Abhängigkeiten: T von m und D
   - Energieumwandlung: E_pot ↔ E_kin
   - eA: Ausgleichskurven, Übertragung auf andere Oszillatoren
   - **Interaktiv:** Feder-Masse-Animation mit einstellbarem m und D

3. **Elektromagnetischer Schwingkreis**
   - Analogie: L↔m, C↔1/D, U_C↔s, I↔v
   - Resonanzkurve, Abhängigkeit f von C
   - Anwendung: RFID-Chip
   - eA: Experiment, Resonanzkurve auswerten

4. **Resonanz erzwungener Schwingungen**
   - Begriff, Experiment
   - Bedeutung in Technik

#### Kapitel 2: Wellen & Interferenz
5. **Wellenausbreitung & Grundgrößen**
   - `c = λ · f`; Wellenlänge, Frequenz, Amplitude, Phase
   - Längs- vs. Transversalwellen
   - Zeigerketten und Sinuskurven

6. **Polarisation**
   - Eigenschaft transversaler Wellen
   - Winkelabhängigkeit der Intensität (Malus'sches Gesetz)
   - Intensität ∝ Amplitude²
   - Anwendung: LCD-Display
   - eA: Experiment mit Polarisationsfiltern auswerten

7. **Interferenzphänomene**
   - Stehende Wellen, Schwebung
   - Doppelspalt: `Δs = n·λ` (Maxima), `Δs = (n-½)·λ` (Minima)
   - **Interaktiv:** Doppelspalt-Simulation mit wählbarem λ und d

8. **Gitter & Bragg-Reflexion**
   - `sin(α_n) = Δs/g` und `tan(α_n) = a_K/e`
   - Bragg: `n·λ = 2d·sin(θ_n)`
   - Anwendung: CD/DVD, Röntgenstrukturanalyse
   - eA: Selbständige Herleitung der Gleichungen
   - Michelson-Interferometer (MIF), Lichtgeschwindigkeit

---

### Modul 3 — Quantenobjekte (HJ 3)
**Farbe:** Violett `#b16fff`

1. **Photoeffekt & Plancksches Wirkungsquantum**
   - Äußerer photoelektrischer Effekt (Vakuum-Fotozelle)
   - `e·U_s = h·f` → h bestimmen mit LEDs
   - f-E-Diagramm: Proportionalität E ∝ f
   - Photonenmodell
   - eA: Messwerte auswerten, Proportionalität prüfen

2. **Röntgenbremsspektrum**
   - Energieübertragung: Elektron → Photon
   - `E = e·U_A = h·f_max = hc/λ_min`
   - h aus Röntgenspektrum bestimmen
   - eA: Berechnung und Erläuterung

3. **de-Broglie-Wellenlänge**
   - `λ = h/p = h/(m·v)`
   - Elektronenbeugungsröhre (Bragg-Reflexion)
   - λ antiproportional zu v (Messwerte auswerten)
   - eA: Wellenlänge berechnen, Antiproportionalität bestätigen
   - **Interaktiv:** λ als Funktion von v visualisieren

4. **Interferenz einzelner Quantenobjekte**
   - Doppelspalt mit einzelnen Photonen/Elektronen
   - Stochastische Deutung: Intensitätsmuster = Wahrscheinlichkeitsverteilung
   - Zeigermodell: Nachweiswahrsch. ∝ (Zeigerlänge)²
   - Anwendung auf Neutronen, größere Massen
   - eA: Erläuterung mit Zeigerdarstellung

5. **Unschärferelation, Nichtlokalität & Komplementarität**
   - `Δx · Δp ≥ h/(4π)` (Ort-Impuls)
   - Erläuterung am Mehrfachspalt-Experiment
   - „Welcher-Weg"-Experiment: Komplementarität
   - Mach-Zehnder-Interferometer: Aufbau
   - eA: Begriffe erläutern und anwenden

---

### Modul 4 — Atomhülle & Atomkern (HJ 3 & 4)
**Farbe:** Grün `#3ecf8e`

#### Kapitel 1: Atomhülle
1. **Eindimensionaler Potenzialtopf**
   - `E_n = h²/(8·m_e·L²) · n²` für n = 1, 2, 3, …
   - Herleitung (stehende Wellen → diskrete Energien)
   - Aussagekraft und Grenzen des Modells
   - eA: Vollständige Herleitung, Kritik

2. **Linienspektren & Energieniveauschema**
   - Emission und Absorption: `ΔE = E_m - E_n = h·f_mn`
   - Balmerformel: `f = R·(1/2² - 1/m²)` für m = 3, 4, 5, …
   - Zuordnung: Wellenlänge ↔ Energieübergang
   - Fluoreszenz am Energieniveauschema
   - Wellenlängen-Intensitätsspektren
   - eA: Berechnung von Wellenlängen, charakteristisches Röntgenspektrum

3. **Franck-Hertz-Versuch**
   - Aufbau, Messung der Anregungsenergie
   - Franck-Hertz-Kennlinie auswerten
   - Resonanzabsorption
   - eA: Anregungsenergie aus Kennlinie ermitteln

4. **He-Ne-Laser & technische Anwendungen**
   - Funktionsprinzip: Besetzungsinversion, stimulierte Emission
   - Fluoreszenz bei Energiesparlampen und weißer LED
   - Bedeutung und Bewertung von Leuchtstoffen
   - eA: Erläuterung mit vorgegebenen Darstellungen

#### Kapitel 2: Atomkern
5. **Radioaktivität: α, β, γ**
   - Eigenschaften der drei Strahlungsarten (Reichweite, Ionisierung, Abschirmung)
   - Geiger-Müller-Zählrohr (GMZ): Funktionsprinzip
   - Halbleiterdetektor für Energiemessung
   - eA: Erläuterung GMZ und Halbleiterdetektor

6. **Zerfallsgesetz & Halbwertszeit**
   - `N(t) = N(0) · (½)^(t/T½)` und `N(t) = N(0) · e^(-λt)`
   - `T½ = ln(2)/λ`
   - Abklingkurven grafisch darstellen und auswerten
   - Übertragung auf Kondensatorentladung
   - Stochastische Natur: Gültigkeitsgrenzen
   - C14-Methode zur Altersbestimmung
   - Differenzenverfahren: Simulation in Tabellenkalkulation
   - Mutter-Tochter-Zerfall
   - eA: Vollständige Auswertung, Modellierung
   - **Interaktiv:** Abklingkurven-Simulator mit einstellbarer Halbwertszeit

7. **Nuklidkarte & Zerfallsreihen**
   - Nuklidkarte lesen: Kernladungszahl, Massenzahl, Strahlungsart, T½
   - Zerfallsreihen aufstellen (α: -2Z, -4A; β⁻: +1Z, 0A)
   - α-Energiespektrum interpretieren
   - Bragg-Kurve in der Strahlentherapie
   - Potenzialtopf für Nukleonen: Größenordnung Kernprozesse
   - eA: Nuklidkarte anwenden, Zerfallsreihe aufstellen, α-Spektrum deuten

---

### Modul 5 — Messunsicherheiten (Übergreifend)
**Farbe:** Gelb `#ffd166`
**Hinweis:** Dieser Bereich erscheint als Querschnittsthema in allen anderen Modulen als Hinweisbox.

1. **Signifikante Stellen & Rundungsregeln**
   - Letzte angegebene Stelle entstand durch Rundung
   - Ergebnis mit (n+1) signifikanten Stellen angeben, wenn schwächste Eingangsgröße n Stellen hat
   - Rechnen mit voller Taschenrechnergenauigkeit bis zum Endergebnis
   - Beispiele: `s = 70mm` (2 sig. Stellen) → Ergebnis mit 3 sig. Stellen

2. **Absolute & relative Messunsicherheit (nur eA)**
   - Absolute Unsicherheit: `Δx` (aus Ablesefehler, Herstellerangabe, Digitalisierungsfehler)
   - Relative Unsicherheit: `Δx/x`
   - Absolute Unsicherheit des Ergebnisses: stets mit **2 signifikanten Stellen**

3. **Zusammengesetzte Messgrößen (nur eA)**
   - Relative Unsicherheit des Ergebnisses ≥ größte relative Unsicherheit der Eingangsgrößen
   - Schwächstes Glied bestimmt die Gesamtunsicherheit
   - Beispiel 1: Wellenlänge am Gitter: `Δs/s = 1/70 ≈ 1,43%` → `λ ≈ 454 nm ± 1,4%`
   - Beispiel 2: Stromwaage: `Δs/s = 0,5/40 = 1,25%` → `B ≈ 75,8 mT ± 1,25%`
   - **Interaktiv:** Rechner für Messunsicherheiten mit Schritt-für-Schritt-Anleitung

---

## UI/UX Design — Detaillierte Anforderungen

### Design-System

```typescript
// Design Tokens
const theme = {
  colors: {
    bg: '#0a0a0f',
    surface: '#111118',
    surface2: '#18181f',
    border: '#2a2a38',
    text: '#f0f0f8',
    textDim: '#8888aa',
    textMuted: '#44445a',
    // Modul-Farben
    elektrizitaet: '#4f9cf9',
    schwingungen: '#ff7a5c',
    quantenobjekte: '#b16fff',
    atom: '#3ecf8e',
    messunsicherheiten: '#ffd166',
  },
  fonts: {
    heading: 'Syne',      // Für Titel, Labels
    mono: 'DM Mono',      // Für Formeln, Code
    body: 'DM Sans',      // Fließtext
  }
}
```

### Layout
- **Sidebar (280px):** Fixiert, zeigt Modulstruktur, Fortschritt pro Thema, Häkchen bei abgeschlossenen Lektionen
- **Main Content:** Scrollbarer Bereich mit max-width 780px (Lektionen) oder 1000px (Dashboard)
- **Sticky Header** auf Lektionsseiten: Modul-Name, Lektion-Titel, Fortschrittsbalken, Zurück-Button

### Dashboard (Startseite)
- Begrüßung mit aktuellem Streak (🔥 x Tage in Folge gelernt)
- 5 Modul-Karten mit Farbcodierung, Fortschrittsring (SVG-Kreisdiagramm %), kurze Beschreibung
- „Weitermachen"-Button für zuletzt geöffnete Lektion
- Statistik-Panel: Gesamt % abgeschlossen, Anzahl gelernte Lektionen, Quizze bestanden
- Motivierende Meldungen bei Meilensteinen (25%, 50%, 75%, 100%)

### Lektionsseite (Aufbau je Thema)
Jede Lektionsseite folgt diesem Muster:

```
1. HEADER: Modul > Kapitel > Thema | [Fortschrittsbalken]
2. INTRO: Kurze Einführung in das Thema (2-3 Sätze), Lernziele als Bullets
3. KERNINHALT: 
   - Erklärungskarten mit Fließtext
   - Formelboxen (KaTeX-gerendert, farblich hervorgehoben)
   - Hinweisboxen (💡 Tipp, ⚠️ Merke, 🔬 Experiment)
   - eA-Boxen (speziell markiert für erhöhtes Anforderungsniveau)
4. INTERAKTIVE KOMPONENTE (falls vorhanden)
5. CONCEPT CHECKS: 1-2 Zwischenfragen (Multiple Choice, sofortiges Feedback)
6. ZUSAMMENFASSUNG: Abschluss-Checkliste mit allen Kernpunkten (anklickbar)
7. WEITER-BUTTON: Nächste Lektion oder Quiz
```

### Quiz-System
Jedes Kapitel endet mit einem Quiz (5-10 Fragen). Fragetypen:

**1. Multiple Choice** (4 Antworten)
```typescript
{
  type: 'multiple-choice',
  question: 'Welche Aussage über den Kondensator ist richtig?',
  options: ['...', '...', '...', '...'],
  correct: 1,
  explanation: 'Der Kondensator speichert elektrische Energie in Form...'
}
```

**2. Formel-Lückentext** (richtige Formel zusammensetzen)
```typescript
{
  type: 'formula-select',
  question: 'Wie lautet die Gleichung für die Periodendauer des Feder-Masse-Pendels?',
  options: ['T = 2π√(m/D)', 'T = 2π√(D/m)', 'T = √(m/D)', 'T = 2π·m·D'],
  correct: 0,
  hint: 'Je größer die Masse, desto länger die Periode...'
}
```

**3. Zahleneingabe** (Ergebnis berechnen)
```typescript
{
  type: 'numeric',
  question: 'Ein Kondensator (C = 100 μF) wird mit U = 12 V geladen. Welche Ladung Q speichert er?',
  answer: 1.2e-3,
  unit: 'mC',
  tolerance: 0.05, // 5% Toleranz
  hint: 'Verwende Q = C · U',
  solution: 'Q = 100·10⁻⁶ F · 12 V = 1,2·10⁻³ C = 1,2 mC'
}
```

**4. Drag & Drop Zuordnung**
```typescript
{
  type: 'drag-drop',
  question: 'Ordne die Strahlungsarten ihren Eigenschaften zu',
  items: ['Alpha', 'Beta', 'Gamma'],
  targets: ['Heliumkern', 'Elektron', 'elektromagnetische Welle'],
  correct: [[0,0], [1,1], [2,2]]
}
```

**5. Sortier-Aufgabe**
```typescript
{
  type: 'sort',
  question: 'Bringe die Energieniveauübergänge in der richtigen Reihenfolge (höchste → niedrigste Energie)',
  items: ['UV', 'sichtbares Licht', 'Infrarot'],
  correct: [0, 1, 2]
}
```

**Quiz-Flow:**
- Frage für Frage
- Sofortiges Feedback nach Antwort mit Erklärung
- Fortschrittsanzeige (Frage 3/7)
- Endergebnis: Score, Zeit, welche falsch (mit korrekten Antworten)
- „Wiederholen" oder „Weiter" Option
- Ab 80% → Kapitel als abgeschlossen markieren ✅

---

## Interaktive Physik-Komponenten

### 1. Feder-Masse-Pendel Simulation (`OscillationSim.tsx`)
```
- Canvas-basierte Animation
- Einstellbar: Masse m (Slider), Federkonstante D (Slider)
- Zeigt live: T, f, aktuelle Auslenkung y(t)
- Daneben: t-y-Diagramm und t-v-Diagramm in Echtzeit
- Farben: Auslenkung in orange, Geschwindigkeit in blau
- Energiebalken: E_pot (rot) und E_kin (grün) animiert
```

### 2. Elektrische Feldlinien (`FieldLines.tsx`)
```
- SVG-basiert
- Wählbar: homogenes Feld (Plattenkondensator) oder Punktladung
- Klick auf Canvas: Probekörper hinzufügen, Kraft-Pfeil anzeigen
- Formel live berechnet: F = q·E anzeigen
```

### 3. Kondensator-Entladung (`DecayAnimation.tsx`)
```
- Animierter Schaltkreis (Kondensator + Widerstand)
- Einstellbar: R und C mit Slidern
- Live-Plot: I(t)-Kurve entsteht während Animation
- Anzeige: Zeitkonstante τ = R·C, Halbwertszeit
- Fläche unter Kurve = Q hervorheben
```

### 4. Interferenz-Simulator (`WaveInterference.tsx`)
```
- Doppelspalt-Visualisierung
- Slider: Wellenlänge λ (400-700nm, Farbe ändert sich!), Spaltabstand d, Abstand L
- Berechnet Positionen der Maxima/Minima live
- Intensitätsprofil auf dem Schirm
- Formel neben dem Bild: sin(α) = n·λ/d
```

### 5. Abklingkurven-Simulator (`DecayCurve.tsx`)
```
- Radioaktiver Zerfall
- Einstellbar: N(0), T½ (Slider)
- Plot: N(t) auf linearer und logarithmischer Skala (Tabs)
- Zeigt: Tangente, Halbwertszeit-Markierungen
- Vergleich mit Kondensatorentladung nebeneinander
```

### 6. Energieniveauschema (`EnergyLevels.tsx`)
```
- Interaktives Wasserstoff-Diagramm
- Klick auf Niveau: Mögliche Übergänge aufleuchten
- Zeigt: ΔE und berechnete Wellenlänge λ = hc/ΔE
- Farbcode: UV (violett), sichtbar (Regenbogen), IR (rot gestrichelt)
- Lyman, Balmer, Paschen-Serien markierbar
```

### 7. Messunsicherheits-Rechner (`UncertaintyCalculator.tsx`)
```
- Schritt-für-Schritt Eingabe:
  1. Eingangsgrößen mit Wert und absoluter Unsicherheit eingeben
  2. Formel wählen (Multiplikation, Division, Potenz)
  3. Berechnung mit Schritten angezeigt
  4. Ergebnis mit korrekter Anzahl signifikanter Stellen
  5. Relative und absolute Unsicherheit des Ergebnisses
- Zeigt: welche Größe den größten Beitrag liefert (hervorgehoben)
```

---

## Fortschritts-System

### Datenspeicherung (localStorage)
```typescript
interface Progress {
  lessons: Record<string, {
    completed: boolean;
    completedAt?: Date;
    checklistItems: Record<string, boolean>;
  }>;
  quizzes: Record<string, {
    score: number;        // 0-100
    attempts: number;
    bestScore: number;
    passed: boolean;      // >= 80%
    lastAttempt: Date;
  }>;
  streak: {
    current: number;
    lastActive: Date;
    longest: number;
  };
  totalTimeMinutes: number;
}
```

### Sidebar-Fortschritt
- Jedes Thema zeigt: ○ (nicht begonnen) → ◐ (begonnen) → ✓ (abgeschlossen)
- Kapitel-Fortschrittsbalken (z.B. 3/5 Themen abgeschlossen)
- Gesamt-Fortschrittsring im Sidebar-Header

### Badges / Erfolge (optional)
- 🚀 „Raktenstart" — Erste Lektion abgeschlossen
- ⚡ „Voltmeister" — Modul Elektrizität 100%
- 🌊 „Wellensurfer" — Modul Schwingungen 100%
- ⬡ „Quantendenker" — Modul Quantenobjekte 100%
- ◎ „Atomforscher" — Modul Atomhülle & Kern 100%
- ± „Präzisionsdenker" — Modul Messunsicherheiten 100%
- 🔥 „7-Tage-Streak" — 7 Tage in Folge gelernt
- 🏆 „Abiturbereit" — Alle Module 100%

---

## Formel-Referenz (globale Formelsammlung)

Erstelle eine separate **`/formeln`-Seite** mit allen wichtigen Formeln:
- Suchfunktion nach Stichwort
- Gefiltert nach Modul
- Jede Formel: Name, KaTeX-Darstellung, Variablenerklärung, Kontext
- Druckbares Format (CSS print media query)

Beispiel-Eintrag:
```typescript
{
  id: 'zerfallsgesetz',
  name: 'Zerfallsgesetz',
  module: 'atomkern',
  formula: 'N(t) = N_0 \\cdot e^{-\\lambda t}',
  variables: {
    'N(t)': 'Anzahl der Kerne zum Zeitpunkt t',
    'N_0': 'Anfangszahl der Kerne',
    'λ': 'Zerfallskonstante [1/s]',
    't': 'Zeit [s]'
  },
  relatedFormulas: ['halbwertszeit', 'zerfallskonstante'],
  level: 'eA'
}
```

---

## Quiz-Datenbank — Beispielfragen (je Modul min. 15 Fragen)

### Elektrizität — Beispielfragen
1. Ein Plattenkondensator hat Plattenabstand d = 2 cm, Spannung U = 400 V. Berechne E. [Ergebnis: 20.000 V/m]
2. Was beschreibt die Zeitkonstante τ = R·C physikalisch?
3. Warum verläuft die Entladekurve exponentiell? (Begründung)
4. Ein Elektron wird durch U_A = 500 V beschleunigt. Berechne v. [Ergebnis: ~1,33·10⁷ m/s]
5. Lorentzkraft-Richtung: B zeigt in z, v in x → F in...?
6. Die spezifische Ladung e/m_e beträgt...? [1,76·10¹¹ C/kg]
7. Warum wird beim Wien-Filter v = E/B für alle Teilchen gleicher Geschwindigkeit?
8. Was ist die Hall-Spannung und wovon hängt sie ab?
9. Induktionsgesetz: Was bewirkt das negative Vorzeichen in U_ind = -N·ΔΦ/Δt?
10. Zeichne das Feldlinienbild eines homogenen Feldes und einer Punktladung. [Skizze-Aufgabe]

### Schwingungen & Wellen — Beispielfragen
1. T verdoppelt sich, wenn m auf das _-fache zunimmt. [4-fache]
2. Berechne T für m = 0,5 kg, D = 8 N/m. [T ≈ 1,57 s]
3. Analogie LC-Schwingkreis: Was entspricht der Federkonstante D?
4. Bei Resonanz gilt: Erregerfrequenz = ...?
5. Gangunterschied für 2. Maximum am Doppelspalt?
6. Was ist Schwebung und wie entsteht sie?
7. Bragg-Reflexion: Was ist d und θ?
8. Welche Wellen können polarisiert werden — und warum nicht die anderen?
9. Berechne λ für f = 440 Hz, c = 340 m/s. [λ ≈ 0,773 m]
10. Was zeigt das Intensitäts-Amplituden-Diagramm beim Doppelspalt?

### Quantenobjekte — Beispielfragen
1. Welche Messung belegt die Quantennatur des Lichts beim Photoeffekt?
2. Berechne λ für Elektron mit v = 10⁶ m/s. [λ ≈ 0,73 nm]
3. Warum erscheint beim Doppelspalt mit einzelnen Photonen trotzdem ein Interferenzmuster?
4. Nachweiswahrscheinlichkeit ist proportional zu...?
5. Was bedeutet Komplementarität? Beispiel nennen.
6. Unschärferelation: Wenn Δx kleiner wird, was passiert mit Δp?
7. Röntgenbremsspektrum: Bei welcher Frequenz liegt das Maximum? [f_max = eU_A/h]
8. Was ist die de-Broglie-Hypothese in einem Satz?

### Atomhülle & Atomkern — Beispielfragen
1. Welche Energie hat der Grundzustand (n=1) im Potenzialtopf mit L = 0,1 nm?
2. Welche Wellenlänge hat der Übergang Hα (n=3→2) nach Balmer? [≈ 656 nm]
3. Franck-Hertz: Was bedeuten die regelmäßigen Einbrüche der Kurve?
4. Was ist Besetzungsinversion und warum braucht man sie für den Laser?
5. α-Zerfall: Wie ändern sich Z und A?
6. Berechne T½ für λ = 0,001 s⁻¹. [T½ ≈ 693 s]
7. C14-Methode: Warum kann man damit nicht unbegrenzt weit in die Vergangenheit?
8. Was zeigt die Bragg-Kurve und warum ist sie in der Strahlentherapie wichtig?

### Messunsicherheiten — Beispielfragen
1. s = 70 mm. Wie viele signifikante Stellen? Ergebnis mit wie vielen Stellen?
2. Relative Unsicherheit: Δs/s = 1/70 ≈ ? [1,43%]
3. Welche Eingangsgröße bestimmt die Gesamtunsicherheit — und warum?
4. Absolute Unsicherheit des Ergebnisses: mit wie vielen signifikanten Stellen? [2]
5. Unterschied: absolute vs. relative Unsicherheit erklären.

---

## Technische Implementierungshinweise

### Formeln (KaTeX)
```bash
npm install katex
npm install @types/katex
```
Alle Formeln als KaTeX-String speichern, render-Funktion erstellen:
```typescript
import katex from 'katex';
const renderFormula = (tex: string, displayMode = true) =>
  katex.renderToString(tex, { throwOnError: false, displayMode });
```

### Animationen (Framer Motion)
```bash
npm install framer-motion
```
- Seiten-Übergänge: `AnimatePresence` mit `fadeInUp`-Variante
- Karten: `whileHover={{ y: -2 }}`, `whileTap={{ scale: 0.98 }}`
- Fortschrittsbalken: `animate={{ width: `${progress}%` }}`

### p5.js für Physik-Simulationen
```bash
npm install p5
npm install @types/p5
```
Wrapper-Komponente für Next.js (wegen SSR):
```typescript
'use client';
import dynamic from 'next/dynamic';
const Sketch = dynamic(() => import('react-p5'), { ssr: false });
```

### Fonts (next/font)
```typescript
import { Syne, DM_Mono, DM_Sans } from 'next/font/google';
```

### shadcn/ui Setup
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card progress slider tabs badge
```

---

## Erste Schritte / Reihenfolge der Implementierung

1. **Setup:** Next.js + Tailwind + shadcn + KaTeX + Framer Motion installieren
2. **Types & Content-Struktur:** `lib/types.ts` und Content-Dateien anlegen
3. **Layout:** Sidebar + Root Layout implementieren
4. **Dashboard:** Modulkarten mit Fortschrittsringen
5. **Lektionsseite-Template:** Wiederverwendbares Layout für alle Themen
6. **Inhalte einfüllen:** Modul für Modul, Thema für Thema
7. **Quiz-Engine:** Grundlegende Quiz-Mechanik, dann Fragentypen erweitern
8. **Interaktive Komponenten:** Simulationen (mit p5.js oder Canvas)
9. **Fortschritts-System:** localStorage Integration
10. **Formelsammlung:** Separate Referenz-Seite
11. **Polish:** Animationen, Transitions, Responsive Design, Dark Mode

---

## Qualitätsanforderungen

- **Responsiv:** Mobile-first, funktioniert auf Tablet und Desktop
- **Zugänglich:** aria-labels, Keyboard-Navigation, Farbkontrast WCAG AA
- **Performance:** Code-Splitting per Modul, lazy loading für Simulationen
- **Korrektheit:** Alle Formeln und Inhalte exakt aus den PDF-Dokumenten
- **eA-Kennzeichnung:** Inhalte für erhöhtes Anforderungsniveau immer deutlich mit Badge `eA` markieren
- **Messunsicherheiten:** In jeder Lektion, die experimentelle Auswertung beinhaltet, einen Hinweis-Block mit dem relevanten Messunsicherheits-Prinzip einbauen

---

## Wichtige Hinweise für die Implementierung

1. Alle Formeln kommen aus den beigefügten PDFs — nicht erfinden
2. Die Unterscheidung **gA** (Grundanforderungen) und **eA** (erhöhtes Niveau) immer sichtbar machen
3. **Messunsicherheiten** sind kein eigenes Modul im Sinne der Halbjahre, sondern erscheinen als Querschnittsthema in jeder experimentellen Lektion als Tooltip/Hinweisbox
4. Das Modul Messunsicherheiten kann zusätzlich als eigenes Modul mit dedizierter Übungsseite existieren
5. Die interaktiven Simulationen sollen das physikalische Verständnis fördern, nicht nur schön aussehen — immer die Formel sichtbar und die Parameter live angezeigt
6. Quizfragen sollen abiturtypisch sein: Berechnen, Erläutern, Begründen, Skizzieren (soweit digital möglich)

---

*Prompt erstellt für Cursor AI — Physik Abitur Lernplattform (eA)*
*Basiert auf: Inhalte_Themen_E-B-Lehre_eN.pdf, Inhalte_Themen_Schwgn_Wellen_eN.pdf, Inhalte_Themen_Quantenobjekte_eN.pdf, Inhalte_Themen_Atomhülle-Atomkern_eN.pdf, Messunsicherheiten_Phyunt.pdf*
