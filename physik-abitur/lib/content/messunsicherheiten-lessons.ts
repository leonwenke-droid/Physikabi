import type { LessonContent } from '@/lib/types';

/**
 * Lektionsinhalte Modul 5: Messunsicherheiten
 * Basiert auf: Messunsicherheiten Phyunt.pdf
 */

// --- Lektion 1: Signifikante Stellen & Rundungsregeln ---
export const signifikanteStellen: LessonContent = {
  intro:
    'Signifikante Stellen zeigen die Genauigkeit eines Messwerts. Die letzte angegebene Stelle ist unsicher (durch Rundung entstanden). Bei Berechnungen aus mehreren Größen bestimmt die ungenaueste Eingangsgröße die Genauigkeit des Ergebnisses.',
  learningGoals: [
    'Die Bedeutung signifikanter Stellen erklären',
    'Die Regel „Ergebnis mit (n+1) signifikanten Stellen bei schwächster Eingangsgröße mit n Stellen" anwenden',
    'Mit voller Taschenrechnergenauigkeit rechnen und erst am Ende runden',
    'Beispiele korrekt angeben',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Die Anzahl der signifikanten Stellen gibt die Genauigkeit einer Zahl an. Bei $s = 70\\,\\text{mm}$ haben wir 2 signifikante Stellen — die Null ist hier relevant (70,0 wäre 3 Stellen). Führende Nullen zählen nicht: 0,0045 hat 2 signifikante Stellen.',
    },
    {
      type: 'remember',
      content:
        'Regel: Hat die ungenaueste (schwächste) Eingangsgröße n signifikante Stellen, wird das Ergebnis mit (n+1) signifikanten Stellen angegeben. Beispiel: s = 70 mm (2 Stellen) → Ergebnis mit 3 signifikanten Stellen. Die letzte Stelle ist unsicher und entstand durch Rundung.',
    },
    {
      type: 'text',
      content:
        'Während der Rechnung: Immer mit voller Taschenrechnergenauigkeit rechnen. Keine Zwischenrundungen. Erst das Endergebnis wird auf die richtige Anzahl signifikanter Stellen gerundet.',
    },
    {
      type: 'text',
      content:
        'Beispiele: $70\\,\\text{mm} + 23\\,\\text{mm} = 93\\,\\text{mm}$ (beide 2 Stellen $\\to$ Ergebnis 2–3 Stellen). Bei Multiplikation/Division entscheidet die Größe mit den wenigsten signifikanten Stellen. $12{,}5 \\cdot 3{,}14 = 39{,}25$ $\\to$ gerundet 39,3 (12,5 hat 3 Stellen).',
    },
    {
      type: 'tip',
      content:
        'Bei Addition/Subtraktion gilt: Die Stelle mit der größten Unsicherheit (am weitesten links) bestimmt das Ergebnis. 123,4 + 5,67 = 129,07 → 129,1 (letzte Dezimalstelle unsicher).',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-sig-1',
      type: 'multiple-choice',
      question: 'Wie viele signifikante Stellen hat die Zahl 70 mm?',
      options: ['1', '2', '3', 'Unendlich viele'],
      correct: 1,
      explanation: '70 mm hat 2 signifikante Stellen. Würde man 70,0 mm schreiben, wären es 3 — dann wäre die Messung genauer.',
    },
    {
      id: 'cc-sig-2',
      type: 'multiple-choice',
      question: 'Die schwächste Eingangsgröße hat 3 signifikante Stellen. Mit wie vielen Stellen gibst du das Ergebnis an?',
      options: ['2 Stellen', '3 Stellen', '4 Stellen', 'So viele wie der Taschenrechner zeigt'],
      correct: 2,
      explanation: 'Bei n signifikanten Stellen der ungenauesten Eingangsgröße wird das Ergebnis mit (n+1) signifikanten Stellen angegeben.',
    },
  ],
  summaryChecklist: [
    'Letzte Stelle unsicher (Rundung)',
    'Ergebnis: (n+1) signifikante Stellen bei schwächster Eingangsgröße mit n Stellen',
    'Rechnen mit voller Genauigkeit, Rundung nur am Ende',
    'Beispiele: s = 70 mm → Ergebnis mit 3 Stellen',
  ],
};

// --- Lektion 2: Absolute & relative Messunsicherheit ---
export const absoluteRelative: LessonContent = {
  intro:
    'Jede Messung hat eine Unsicherheit. Die absolute Unsicherheit $\\Delta x$ hat die gleiche Einheit wie der Messwert. Die relative Unsicherheit $\\Delta x/x$ ist dimensionslos (oft in %) und erlaubt den Vergleich verschiedener Größen. Die absolute Unsicherheit des Ergebnisses wird stets mit 2 signifikanten Stellen angegeben.',
  learningGoals: [
    'Absolute Unsicherheit Δx und ihre Quellen nennen',
    'Relative Unsicherheit Δx/x berechnen und interpretieren',
    'Die absolute Unsicherheit des Ergebnisses mit 2 signifikanten Stellen angeben',
    '(eA) Unsicherheiten aus Ablesefehler, Herstellerangabe, Digitalisierung ableiten',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Quellen der absoluten Unsicherheit $\\Delta x$: Ablesefehler (z.B. bei Messstab $\\pm 0{,}5\\,\\text{mm}$), Herstellerangabe („$\\pm 1\\%$ vom Messwert"), Digitalisierungsfehler (bei Digitalanzeige: Auflösung, z.B. $\\pm 0{,}1$ Einheiten). Man wählt die größte plausible Unsicherheit.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\text{Relative Unsicherheit} = \\frac{\\Delta x}{x}',
      variables: {
        '\\Delta x': 'Absolute Unsicherheit',
        x: 'Messwert',
      },
    },
    {
      type: 'remember',
      content:
        'Die relative Unsicherheit $\\Delta x/x$ ist dimensionslos. Oft in Prozent: $(\\Delta x/x) \\cdot 100\\,\\%$. Beispiel: $\\Delta x = 1\\,\\text{mm}$, $x = 70\\,\\text{mm}$ $\\to$ $\\Delta x/x = 1/70 \\approx 0{,}0143 \\approx 1{,}43\\,\\%$. Wichtig: Die absolute Unsicherheit des Ergebnisses wird stets mit 2 signifikanten Stellen angegeben (z.B. $\\pm 6{,}4\\,\\text{nm}$, nicht $\\pm 6{,}35\\,\\text{nm}$).',
    },
    {
      type: 'text',
      content:
        'Bei Angabe des Ergebnisses: $x \\pm \\Delta x$. Die Rundung von $\\Delta x$ auf 2 signifikante Stellen kann dazu führen, dass der Hauptwert $x$ ebenfalls angepasst wird (gleiche Stelle unsicher). Beispiel: $454{,}2\\,\\text{nm} \\pm 6{,}35\\,\\text{nm}$ $\\to$ $454\\,\\text{nm} \\pm 6{,}4\\,\\text{nm}$.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du die Unsicherheit aus verschiedenen Quellen abschätzen und die sinnvollste (i.d.R. größte) wählen. Bei Ablesung: typisch ± halbe Skalenteilung. Bei Digital: ± eine Einheit der letzten Stelle.',
    },
    {
      type: 'tip',
      content:
        'Relative Unsicherheiten erleichtern den Vergleich: 1 mm bei 10 mm ist 10 %, bei 100 mm nur 1 %. Die 1-mm-Unsicherheit ist bei der kurzen Strecke gravierender.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-abs-1',
      type: 'multiple-choice',
      question: 'Was ist die relative Unsicherheit bei $\\Delta x = 0{,}5\\,\\text{mm}$ und $x = 40\\,\\text{mm}$?',
      options: ['$0{,}5/40 = 1{,}25\\,\\%$', '$40/0{,}5 = 80\\,\\%$', '$0{,}5\\,\\text{mm}$', '$40\\,\\text{mm}$'],
      correct: 0,
      explanation: 'Die relative Unsicherheit ist $\\Delta x/x = 0{,}5/40 = 0{,}0125 = 1{,}25\\,\\%$.',
    },
    {
      id: 'cc-abs-2',
      type: 'multiple-choice',
      question: 'Mit wie vielen signifikanten Stellen gibt man die absolute Unsicherheit des Ergebnisses an?',
      options: ['1 Stelle', '2 Stellen', '3 Stellen', 'So viele wie der Rechner liefert'],
      correct: 1,
      explanation: 'Die absolute Unsicherheit des Ergebnisses wird stets mit 2 signifikanten Stellen angegeben.',
    },
  ],
  summaryChecklist: [
    '$\\Delta x$: Ablesefehler, Herstellerangabe, Digitalisierung',
    'Relative Unsicherheit: $\\Delta x/x$ (oft in %)',
    'Ergebnis-Unsicherheit: 2 signifikante Stellen',
    '(eA) Unsicherheitsquellen abschätzen',
  ],
};

// --- Lektion 3: Zusammengesetzte Messgrößen ---
export const zusammengesetzteGroessen: LessonContent = {
  intro:
    'Bei zusammengesetzten Größen (aus mehreren Messgrößen berechnet) bestimmt die größte relative Unsicherheit der Eingangsgrößen die Gesamtunsicherheit. Das schwächste Glied setzt die Grenze. Die beiden Beispiele aus dem PDF — Wellenlänge am Gitter und Stromwaage — werden Schritt für Schritt durchgerechnet.',
  learningGoals: [
    'Die Regel „relative Unsicherheit des Ergebnisses ≥ größte relative Unsicherheit" anwenden',
    'Das schwächste Glied identifizieren',
    'Beispiel Wellenlänge am Gitter vollständig lösen',
    'Beispiel Stromwaage vollständig lösen',
    '(eA) Selbständige Fehlerfortpflanzung bei zusammengesetzten Größen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Regel: Die relative Unsicherheit des Ergebnisses ist mindestens so groß wie die größte relative Unsicherheit der Eingangsgrößen. Oft gilt näherungsweise: $\\Delta y/y \\approx \\max(\\Delta x_1/x_1, \\Delta x_2/x_2, \\ldots)$. Das schwächste Glied (größte relative Unsicherheit) dominiert.',
    },
    {
      type: 'remember',
      content:
        'Schwächstes Glied: Die Messgröße mit der größten relativen Unsicherheit bestimmt die Gesamtunsicherheit. Weitere, genauere Messungen verbessern das Ergebnis kaum — man muss die ungenaueste Größe genauer messen.',
    },
    {
      type: 'text',
      content: '**Beispiel 1: Wellenlänge am Gitter — Schritt-für-Schritt-Lösung**',
    },
    {
      type: 'text',
      content:
        '**Aufgabe:** Die Wellenlänge $\\lambda$ wird aus einer Gitterbeugung bestimmt. Eine zentral gemessene Größe ist der Abstand $s$ (z.B. Abstand zwischen nulltem und erstem Maximum auf dem Schirm). Gegeben: $s = 70\\,\\text{mm}$ (Ablesegenauigkeit $\\pm 1\\,\\text{mm}$). Weitere Größen (Gitterkonstante $g$, Abstand $L$) seien genauer bekannt.',
    },
    {
      type: 'text',
      content:
        '**Schritt 1:** Unsicherheit der kritischen Größe. Für $s = 70\\,\\text{mm}$ mit $\\Delta s = 1\\,\\text{mm}$ (Ablesefehler): relative Unsicherheit $\\Delta s/s = 1/70 \\approx 0{,}0143 \\approx 1{,}43\\,\\%$.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\frac{\\Delta s}{s} = \\frac{1}{70} \\approx 1{,}43 \\%',
      variables: {},
    },
    {
      type: 'text',
      content:
        '**Schritt 2:** Da $\\lambda$ proportional zu $s$ ist (für kleine Winkel gilt $\\lambda \\propto s$), überträgt sich die relative Unsicherheit: $\\Delta\\lambda/\\lambda \\approx \\Delta s/s \\approx 1{,}43\\,\\%$.',
    },
    {
      type: 'text',
      content:
        '**Schritt 3:** Angenommen die berechnete Wellenlänge ist $\\lambda = 454\\,\\text{nm}$. Dann: $\\Delta\\lambda = \\lambda \\cdot (\\Delta s/s) = 454\\,\\text{nm} \\cdot 0{,}0143 \\approx 6{,}5\\,\\text{nm}$. Mit 2 signifikanten Stellen: $\\Delta\\lambda = 6{,}5\\,\\text{nm}$ (bereits 2 Stellen).',
    },
    {
      type: 'text',
      content:
        '**Schritt 4:** Endergebnis: $\\lambda = (454 \\pm 6{,}5)\\,\\text{nm}$ oder in relativer Schreibweise: $\\lambda \\approx 454\\,\\text{nm} \\pm 1{,}4\\,\\%$. Die 1,4 % entsprechen der gerundeten relativen Unsicherheit.',
    },
    {
      type: 'text',
      content: '**Beispiel 2: Stromwaage — Schritt-für-Schritt-Lösung**',
    },
    {
      type: 'text',
      content:
        '**Aufgabe:** Die magnetische Flussdichte $B$ wird mit der Stromwaage bestimmt. Aus $B = F/(I \\cdot s)$ hängt $B$ von der Leiterlänge $s$ ab. Gemessen: $s = 40\\,\\text{mm}$ mit $\\Delta s = 0{,}5\\,\\text{mm}$ (Ablesegenauigkeit). $I$ und $F$ seien genauer bestimmt.',
    },
    {
      type: 'text',
      content:
        '**Schritt 1:** Relative Unsicherheit von $s$: $\\Delta s/s = 0{,}5/40 = 0{,}0125 = 1{,}25\\,\\%$. Da $B \\propto 1/s$, gilt für die relative Unsicherheit von $B$ ebenfalls $\\Delta B/B \\approx \\Delta s/s = 1{,}25\\,\\%$ (bei umgekehrter Proportionalität hat $1/s$ dieselbe relative Unsicherheit wie $s$).',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\frac{\\Delta s}{s} = \\frac{0{,}5}{40} = 1{,}25 \\%',
      variables: {},
    },
    {
      type: 'text',
      content:
        '**Schritt 2:** Berechnete Flussdichte $B = 75{,}8\\,\\text{mT}$. Absolute Unsicherheit: $\\Delta B = B \\cdot (\\Delta s/s) = 75{,}8\\,\\text{mT} \\cdot 0{,}0125 \\approx 0{,}95\\,\\text{mT}$. Mit 2 signifikanten Stellen: $\\Delta B = 0{,}95\\,\\text{mT}$.',
    },
    {
      type: 'text',
      content:
        '**Schritt 3:** Endergebnis: $B = (75{,}8 \\pm 0{,}95)\\,\\text{mT}$ oder $B \\approx 75{,}8\\,\\text{mT} \\pm 1{,}25\\,\\%$. Die relative Unsicherheit von 1,25 % wird durch $s$ dominiert (schwächstes Glied).',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du bei beliebigen zusammengesetzten Größen das schwächste Glied identifizieren, die relative Unsicherheit des Ergebnisses angeben und das Endergebnis in der Form x ± Δx mit Δx auf 2 signifikante Stellen korrekt formulieren.',
    },
    {
      type: 'tip',
      content:
        'Bei Produkten und Quotienten: Die relativen Unsicherheiten addieren sich (bei voneinander unabhängigen Größen). Bei $y = x_1 \\cdot x_2/x_3$ gilt näherungsweise: $\\Delta y/y \\approx \\Delta x_1/x_1 + \\Delta x_2/x_2 + \\Delta x_3/x_3$. Das Maximum der Einzelbeiträge ist eine grobe Abschätzung.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-zus-1',
      type: 'multiple-choice',
      question: 'Welche Größe bestimmt die Gesamtunsicherheit bei zusammengesetzten Messgrößen?',
      options: [
        'Die Größe mit dem kleinsten Messwert',
        'Die Größe mit der größten relativen Unsicherheit (schwächstes Glied)',
        'Die erste gemessene Größe',
        'Immer die Wellenlänge',
      ],
      correct: 1,
      explanation: 'Das schwächste Glied — die Größe mit der größten relativen Unsicherheit — bestimmt die Gesamtunsicherheit des Ergebnisses.',
    },
    {
      id: 'cc-zus-2',
      type: 'multiple-choice',
      question: 'Bei $\\Delta s/s = 1/70 \\approx 1{,}43\\,\\%$ und $\\lambda = 454\\,\\text{nm}$: Wie groß ist die absolute Unsicherheit von $\\lambda$?',
      options: ['$1{,}43\\,\\text{nm}$', 'ca. $6{,}5\\,\\text{nm}$', '$454\\,\\text{nm}$', '$70\\,\\text{nm}$'],
      correct: 1,
      explanation: '$\\Delta\\lambda = \\lambda \\cdot (\\Delta s/s) = 454\\,\\text{nm} \\cdot 0{,}0143 \\approx 6{,}5\\,\\text{nm}$. Die relative Unsicherheit überträgt sich auf die absolute.',
    },
  ],
  summaryChecklist: [
    'Relative Unsicherheit des Ergebnisses ≥ größte relative Unsicherheit',
    'Schwächstes Glied identifizieren',
    'Beispiel Gitter: $\\Delta s/s = 1/70 \\approx 1{,}43\\,\\%$ $\\to$ $\\lambda \\approx 454\\,\\text{nm} \\pm 1{,}4\\,\\%$',
    'Beispiel Stromwaage: $\\Delta s/s = 0{,}5/40 = 1{,}25\\,\\%$ $\\to$ $B \\approx 75{,}8\\,\\text{mT} \\pm 1{,}25\\,\\%$',
    '(eA) Fehlerfortpflanzung bei zusammengesetzten Größen',
  ],
  interactiveComponent: 'UncertaintyCalculator',
};
