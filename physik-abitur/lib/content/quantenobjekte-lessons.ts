import type { LessonContent } from '@/lib/types';

/**
 * Lektionsinhalte Modul 3: Quantenobjekte
 * Basiert auf: Inhalte + Themen Quantenobjekte eN.pdf
 */

// --- Lektion 1: Photoeffekt & Plancksches Wirkungsquantum ---
export const photoeffekt: LessonContent = {
  intro:
    'Beim äußeren photoelektrischen Effekt werden Elektronen aus einer Metalloberfläche durch Licht freigesetzt. Die Energie der Photonen $E = h \\cdot f$ ist proportional zur Frequenz. Mit der Vakuum-Fotozelle und LEDs lässt sich das Plancksche Wirkungsquantum $h$ experimentell bestimmen.',
  learningGoals: [
    'Den äußeren photoelektrischen Effekt beschreiben',
    'Die Beziehung $e \\cdot U_s = h \\cdot f$ erklären und anwenden',
    'Das $f$-$E$-Diagramm interpretieren (Proportionalität $E \\propto f$)',
    'Das Photonenmodell zur Quantennatur des Lichts nutzen',
    '(eA) Messwerte auswerten und die Proportionalität prüfen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Trifft Licht auf eine Metalloberfläche, können Elektronen freigesetzt werden — der Photoeffekt. Entscheidend ist die Frequenz des Lichts: Unter der Grenzfrequenz f_G passiert nichts, ab f_G steigt die kinetische Energie der Photoelektronen linear mit der Frequenz. Die Lichtintensität beeinflusst nur die Anzahl der Elektronen, nicht ihre maximale Energie.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'e \\cdot U_s = h \\cdot f - W_A',
      variables: {
        e: 'Elementarladung [C]',
        'U_s': 'Sperrspannung [V]',
        h: 'Plancksches Wirkungsquantum [$\\text{J} \\cdot \\text{s}$]',
        f: 'Lichtfrequenz [Hz]',
        'W_A': 'Austrittsarbeit (materialabhängig) [J]',
      },
    },
    {
      type: 'remember',
      content:
        'Die maximale kinetische Energie der Photoelektronen ist $E_{kin,max} = e \\cdot U_s$. Im $f$-$E$-Diagramm ergibt sich eine Gerade: $E_{kin,max} = h \\cdot f - W_A$. Die Steigung der Geraden ist $h$, der Achsenabschnitt bei $f = 0$ ist $-W_A$. Mit LEDs bekannter Wellenlänge kann $h$ bestimmt werden.',
    },
    {
      type: 'text',
      content:
        'Photonenmodell: Licht besteht aus Energiequanten (Photonen) mit $E = h \\cdot f$. Jedes Photon überträgt seine Energie an höchstens ein Elektron. Damit erklärt sich die Frequenzabhängigkeit — klassische Wellenoptik würde vorhersagen, dass die Energie mit der Intensität ansteigt, was nicht der Fall ist.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du Messwerte aus der Vakuum-Fotozelle (Sperrspannung $U_s$ für verschiedene LED-Frequenzen) auswerten: $f$-$E$-Diagramm zeichnen, Geradenausgleich durchführen, $h$ aus der Steigung und $W_A$ aus dem Achsenabschnitt bestimmen. Prüfe die Proportionalität $E \\propto f$.',
    },
    {
      type: 'tip',
      content:
        '$h \\approx 6{,}626 \\cdot 10^{-34}\\,\\text{J} \\cdot \\text{s}$. Typische Austrittsarbeiten für Metalle liegen bei 2–5 eV. Sichtbares Licht (400–700 nm) entspricht etwa 1,8–3,1 eV.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-photo-1',
      type: 'formula-select',
      question: 'Welcher Zusammenhang gilt zwischen Photonenenergie und Frequenz?',
      options: ['$E = f/h$', '$E = h \\cdot f$', '$E = h/f$', '$E = h + f$'],
      correct: 1,
      explanation: 'Die Photonenenergie ist proportional zur Frequenz: $E = h \\cdot f$ mit dem Planckschen Wirkungsquantum $h$.',
    },
    {
      id: 'cc-photo-2',
      type: 'multiple-choice',
      question: 'Was zeigt der Photoeffekt über die Natur des Lichts?',
      options: [
        'Licht ist eine klassische Welle',
        'Licht besteht aus Energiequanten (Photonen)',
        'Die Lichtgeschwindigkeit ist konstant',
        'Licht wird an Spalten gebeugt',
      ],
      correct: 1,
      explanation: 'Der Photoeffekt belegt die Quantennatur des Lichts: Energie wird in Portionen $h \\cdot f$ übertragen, nicht kontinuierlich.',
    },
  ],
  summaryChecklist: [
    'Photoeffekt: $e \\cdot U_s = h \\cdot f - W_A$',
    '$f$-$E$-Diagramm: Gerade mit Steigung $h$',
    'Photonenmodell: $E = h \\cdot f$',
    '(eA) Messwerte auswerten, h bestimmen',
  ],
};

// --- Lektion 2: Röntgenbremsspektrum ---
export const roentgen: LessonContent = {
  intro:
    'In einer Röntgenröhre werden Elektronen durch eine Anodenspannung $U_A$ beschleunigt. Beim Abbremsen in der Anode entsteht Röntgenbremsstrahlung. Die maximale Photonenenergie ist $h \\cdot f_{max} = e \\cdot U_A$. Aus dem Röntgenspektrum lässt sich das Plancksche Wirkungsquantum $h$ bestimmen.',
  learningGoals: [
    'Die Energieübertragung Elektron → Photon bei der Bremsstrahlung erklären',
    'Die Beziehung $E = e \\cdot U_A = h \\cdot f_{max} = hc/\\lambda_{min}$ anwenden',
    'h aus dem Röntgenbremsspektrum bestimmen',
    '(eA) Berechnung und Erläuterung durchführen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Elektronen werden in der Röntgenröhre durch die Anodenspannung $U_A$ beschleunigt und treffen mit kinetischer Energie $E_{kin} = e \\cdot U_A$ auf die Anode. Beim Abbremsen wird ein Teil dieser Energie als Röntgenphoton abgegeben. Die maximale Photonenenergie entspricht der gesamten kinetischen Energie.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'E = e \\cdot U_A = h \\cdot f_{max} = \\frac{h \\cdot c}{\\lambda_{min}}',
      variables: {
        E: 'Maximale Photonenenergie [J]',
        e: 'Elementarladung [C]',
        'U_A': 'Beschleunigungsspannung [V]',
        h: 'Plancksches Wirkungsquantum [$\\text{J} \\cdot \\text{s}$]',
        'f_{max}': 'Maximale Frequenz der Bremsstrahlung [Hz]',
        '\\lambda_{min}': 'Minimale Wellenlänge (Grenzwellenlänge) [m]',
        c: 'Lichtgeschwindigkeit [m/s]',
      },
    },
    {
      type: 'remember',
      content:
        'Das Röntgenbremsspektrum ist kontinuierlich mit einer scharfen Grenze bei $\\lambda_{min}$. Kürzere Wellenlängen (höhere Energien) können nicht entstehen, da kein Elektron mehr Energie hat als $e \\cdot U_A$. Aus $\\lambda_{min}$ und $U_A$ folgt: $h = e \\cdot U_A \\cdot \\lambda_{min}/c$.',
    },
    {
      type: 'text',
      content:
        'Die Grenzwellenlänge $\\lambda_{min} = hc/(e \\cdot U_A)$ hängt nur von der Anodenspannung ab. Typische Werte: $U_A = 30\\,\\text{kV}$ $\\to$ $\\lambda_{min} \\approx 41\\,\\text{pm}$. Das charakteristische Röntgenspektrum (Linien) stammt von Übergängen in der Atomhülle der Anodenatome.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du aus gegebenem Röntgenspektrum die Grenzwellenlänge ablesen, h berechnen und die Energieübertragung Elektron → Photon erläutern. Vergleiche mit dem Wert aus dem Photoeffekt.',
    },
    {
      type: 'tip',
      content:
        '$hc \\approx 1240\\,\\text{eV} \\cdot \\text{nm}$. Für $\\lambda_{min}$ in nm und $U_A$ in kV: $\\lambda_{min} \\approx 1240/U_A$ (in nm). Praktisch nutzbar zur schnellen Abschätzung.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-roent-1',
      type: 'formula-select',
      question: 'Wie hängen maximale Photonenenergie und Anodenspannung zusammen?',
      options: ['$E = U_A/h$', '$E = e \\cdot U_A$', '$E = h \\cdot U_A$', '$E = e/(U_A)$'],
      correct: 1,
      explanation: 'Die maximale Photonenenergie der Bremsstrahlung entspricht der kinetischen Energie des Elektrons: $E = e \\cdot U_A$.',
    },
    {
      id: 'cc-roent-2',
      type: 'multiple-choice',
      question: 'Warum gibt es eine Grenzwellenlänge $\\lambda_{min}$ im Röntgenbremsspektrum?',
      options: [
        'Weil die Anode absorbiert',
        'Weil kein Elektron mehr Energie als $e \\cdot U_A$ hat',
        'Weil Röntgenlicht gebrochen wird',
        'Weil die Röhre gekühlt wird',
      ],
      correct: 1,
      explanation: 'Das schnellste Elektron hat maximal $E_{kin} = e \\cdot U_A$. Ein Photon kann nicht mehr Energie haben $\\to$ $\\lambda_{min} = hc/(e \\cdot U_A)$.',
    },
  ],
  summaryChecklist: [
    'Energieübertragung: $E_{kin,e} = e \\cdot U_A \\to E_{Photon} = h \\cdot f_{max}$',
    '$E = e \\cdot U_A = hc/\\lambda_{min}$',
    '$h$ aus $\\lambda_{min}$ und $U_A$ bestimmen',
    '(eA) Berechnung und Erläuterung',
  ],
};

// --- Lektion 3: de-Broglie-Wellenlänge ---
export const debroglie: LessonContent = {
  intro:
    'Materiewellen: Jedem Teilchen mit Impuls $p$ kann eine Wellenlänge $\\lambda = h/p$ zugeordnet werden. Die de-Broglie-Wellenlänge ist antiproportional zur Geschwindigkeit. In der Elektronenbeugungsröhre wird dies mit Bragg-Reflexion sichtbar.',
  learningGoals: [
    'Die de-Broglie-Beziehung $\\lambda = h/p = h/(m \\cdot v)$ anwenden',
    'Die Elektronenbeugungsröhre und Bragg-Reflexion beschreiben',
    'Die Antiproportionalität λ ∝ 1/v aus Messwerten bestätigen',
    '(eA) Wellenlänge berechnen, Antiproportionalität auswerten',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Louis de Broglie verknüpfte 1924 die Teilchen- und Wellennatur: Jedem Teilchen mit Impuls $p = m \\cdot v$ entspricht eine Wellenlänge $\\lambda$. Damit besitzen auch Elektronen, Neutronen und alle anderen Teilchen Welleneigenschaften — nachweisbar durch Beugung und Interferenz.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\lambda = \\frac{h}{p} = \\frac{h}{m \\cdot v}',
      variables: {
        '\\lambda': 'de-Broglie-Wellenlänge [m]',
        h: 'Plancksches Wirkungsquantum [$\\text{J} \\cdot \\text{s}$]',
        p: 'Impuls [kg $\\cdot$ m/s]',
        m: 'Masse [kg]',
        v: 'Geschwindigkeit [m/s]',
      },
    },
    {
      type: 'remember',
      content:
        'Schnellere Teilchen haben kürzere Wellenlängen. Für Elektronen mit $v$ aus $\\frac{1}{2}m_e \\cdot v^2 = e \\cdot U_A$ gilt: $\\lambda = h/\\sqrt{2m_e \\cdot e \\cdot U_A}$. Typisch: $U = 100\\,\\text{V}$ $\\to$ $\\lambda \\approx 0{,}12\\,\\text{nm}$ (vergleichbar mit Atomabständen in Kristallen).',
    },
    {
      type: 'text',
      content:
        'Elektronenbeugungsröhre: Elektronen werden beschleunigt und treffen auf einen Graphitkristall. Die reflektierten Elektronen zeigen Beugungsringe (Bragg-Reflexion an den Netzebenen). Aus dem Ringradius, der Beschleunigungsspannung und der Bragg-Bedingung lässt sich $\\lambda$ bestimmen und mit $\\lambda = h/p$ vergleichen.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du die Wellenlänge für gegebene Beschleunigungsspannung berechnen und aus einem Versuchsdiagramm (z.B. Ringradius vs. $1/\\sqrt{U}$) die Antiproportionalität $\\lambda \\propto 1/v$ bestätigen. Nutze die Bragg-Bedingung $n \\cdot \\lambda = 2d \\cdot \\sin(\\theta)$.',
    },
    {
      type: 'tip',
      content:
        'Auch Neutronen, Protonen und größere Molekülverbände zeigen Welleneigenschaften. Die Wellenlänge nimmt mit zunehmender Masse ab — bei makroskopischen Körpern ist λ praktisch vernachlässigbar.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-debro-1',
      type: 'formula-select',
      question: 'Wie lautet die de-Broglie-Wellenlänge?',
      options: ['$\\lambda = p/h$', '$\\lambda = h/p$', '$\\lambda = h \\cdot p$', '$\\lambda = m \\cdot v/h$'],
      correct: 1,
      explanation: 'Die de-Broglie-Wellenlänge ist $\\lambda = h/p = h/(m \\cdot v)$. Sie ist antiproportional zum Impuls.',
    },
    {
      id: 'cc-debro-2',
      type: 'multiple-choice',
      question: 'Wie ändert sich λ, wenn die Elektronengeschwindigkeit verdoppelt wird?',
      options: ['$\\lambda$ verdoppelt sich', '$\\lambda$ halbiert sich', '$\\lambda$ vervierfacht sich', '$\\lambda$ bleibt gleich'],
      correct: 1,
      explanation: 'Da $\\lambda \\propto 1/v$, halbiert sich die Wellenlänge bei Verdopplung der Geschwindigkeit.',
    },
  ],
  summaryChecklist: [
    '$\\lambda = h/p = h/(m \\cdot v)$',
    'Elektronenbeugungsröhre: Bragg-Reflexion',
    '$\\lambda \\propto 1/v$ (antiproportional)',
    '(eA) $\\lambda$ berechnen, Antiproportionalität bestätigen',
  ],
  interactiveComponent: 'DebroglieWave',
};

// --- Lektion 4: Interferenz einzelner Quantenobjekte ---
export const interferenzQuanten: LessonContent = {
  intro:
    'Beim Doppelspalt mit einzelnen Photonen oder Elektronen entsteht trotzdem ein Interferenzmuster. Das zeigt: Quantenobjekte haben sowohl Teilchen- als auch Wellencharakter. Das Intensitätsmuster entspricht einer Wahrscheinlichkeitsverteilung — stochastische Deutung.',
  learningGoals: [
    'Das Doppelspaltexperiment mit einzelnen Quantenobjekten beschreiben',
    'Die stochastische Deutung: Intensitätsmuster = Wahrscheinlichkeitsverteilung',
    'Das Zeigermodell: Nachweiswahrscheinlichkeit $\\propto$ (Zeigerlänge)$^2$ erklären',
    'Anwendung auf Neutronen und größere Massen nennen',
    '(eA) Erläuterung mit Zeigerdarstellung',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Sendet man Photonen oder Elektronen einzeln durch einen Doppelspalt, trifft jedes Teilchen als Ganzes auf dem Schirm auf. Trotzdem entsteht nach vielen Einzelregistrierungen das bekannte Interferenzmuster. Einzelne Quantenobjekte „wissen" also um beide Wege und zeigen Wellenverhalten.',
    },
    {
      type: 'remember',
      content:
        'Stochastische Deutung: Das Intensitätsmuster beschreibt die Wahrscheinlichkeitsverteilung für den Nachweis eines Quantenobjekts. Wo das klassische Interferenzmuster ein Maximum hat, ist die Nachweiswahrscheinlichkeit hoch. Das Muster entsteht erst durch viele Einzelereignisse.',
    },
    {
      type: 'text',
      content:
        'Zeigermodell: Jeder Weg (z.B. durch Spalt 1 oder Spalt 2) wird durch einen Zeiger dargestellt. Die Zeiger werden addiert (Vektoraddition). Die Nachweiswahrscheinlichkeit ist proportional zum Quadrat der resultierenden Zeigerlänge: $P \\propto |\\text{Zeiger}|^2$. Bei destruktiver Interferenz heben sich die Zeiger auf $\\to$ $P = 0$.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'P \\propto (\\text{Zeigerlänge})^2',
      variables: {
        P: 'Nachweiswahrscheinlichkeit',
      },
    },
    {
      type: 'text',
      content:
        'Das Experiment funktioniert mit Photonen, Elektronen, Neutronen und sogar mit Fullerenen (C₆₀). Je größer das Objekt, desto schwieriger die experimentelle Realisierung — die Wellenlänge wird extrem klein. Das Prinzip bleibt gleich.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du die Zeigerdarstellung für den Doppelspalt erläutern: Zwei Zeiger für die beiden Wege, Phasendifferenz abhängig vom Gangunterschied, Addition der Zeiger, Nachweiswahrscheinlichkeit $\\propto |\\Sigma \\text{ Zeiger}|^2$.',
    },
    {
      type: 'tip',
      content:
        'Komplementarität: Information über den Weg (Welcher-Weg-Experiment) zerstört das Interferenzmuster. Man kann nicht gleichzeitig Weginformation und Interferenz haben.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-intq-1',
      type: 'multiple-choice',
      question: 'Was zeigt das Doppelspaltexperiment mit einzelnen Photonen?',
      options: [
        'Photonen sind nur Teilchen',
        'Trotz Einzelregistrierung entsteht ein Interferenzmuster — Wellencharakter',
        'Das Muster entsteht sofort',
        'Es gibt keine Wahrscheinlichkeit',
      ],
      correct: 1,
      explanation: 'Einzelne Photonen erzeugen Punkt für Punkt ein Muster. Nach vielen Treffern zeigt sich das Interferenzmuster — Beweis für den Wellencharakter.',
    },
    {
      id: 'cc-intq-2',
      type: 'multiple-choice',
      question: 'Wovon ist die Nachweiswahrscheinlichkeit im Zeigermodell proportional?',
      options: ['Zeigerlänge', '(Zeigerlänge)$^2$', 'Kehrwert der Zeigerlänge', 'Zeigerlänge + Konstante'],
      correct: 1,
      explanation: 'Die Nachweiswahrscheinlichkeit ist proportional zum Quadrat der resultierenden Zeigerlänge: $P \\propto |\\text{Zeiger}|^2$.',
    },
  ],
  summaryChecklist: [
    'Einzelne Quanten → Interferenzmuster nach vielen Ereignissen',
    'Stochastische Deutung: Intensität = Wahrscheinlichkeitsverteilung',
    'Zeigermodell: $P \\propto$ (Zeigerlänge)$^2$',
    '(eA) Zeigerdarstellung erläutern',
  ],
};

// --- Lektion 5: Unschärferelation, Nichtlokalität & Komplementarität ---
export const unschaerferelation: LessonContent = {
  intro:
    'Die Heisenbergsche Unschärferelation verknüpft Ort und Impuls: Je genauer der Ort bekannt ist, desto unschärfer der Impuls. Komplementarität beschreibt, dass gewisse Eigenschaften sich gegenseitig ausschließen. Das Mach-Zehnder-Interferometer veranschaulicht diese Konzepte.',
  learningGoals: [
    'Die Unschärferelation $\\Delta x \\cdot \\Delta p \\geq h/(4\\pi)$ formulieren und anwenden',
    'Die Unschärfe am Mehrfachspalt-Experiment erläutern',
    'Das Welcher-Weg-Experiment und Komplementarität verstehen',
    'Den Aufbau des Mach-Zehnder-Interferometers beschreiben',
    '(eA) Begriffe erläutern und anwenden',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Die Heisenbergsche Unschärferelation besagt: Ort und Impuls können nicht gleichzeitig beliebig genau gemessen werden. Eine präzise Ortsmessung (z.B. durch einen engen Spalt) erhöht die Unschärfe des Impulses — das Teilchen wird abgelenkt.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\Delta x \\cdot \\Delta p \\geq \\frac{h}{4\\pi}',
      variables: {
        '\\Delta x': 'Ortsunschärfe [m]',
        '\\Delta p': 'Impulsunschärfe [kg $\\cdot$ m/s]',
        h: 'Plancksches Wirkungsquantum [$\\text{J} \\cdot \\text{s}$]',
      },
    },
    {
      type: 'remember',
      content:
        'Das Produkt $\\Delta x \\cdot \\Delta p$ kann nicht kleiner als $h/(4\\pi) \\approx \\hbar/2$ werden ($\\hbar = h/(2\\pi)$). Mehrfachspalt: Je mehr Spalte, desto schärfer die Maxima (Ortsunschärfe am Schirm klein) — dafür wird die Impulsunschärfe (Richtung) größer.',
    },
    {
      type: 'text',
      content:
        'Welcher-Weg-Experiment: Versucht man zu messen, durch welchen Spalt das Quantenobjekt ging, verschwindet das Interferenzmuster. Komplementarität: Weginformation und Interferenz schließen einander aus. Man kann nicht beides gleichzeitig haben.',
    },
    {
      type: 'text',
      content:
        'Mach-Zehnder-Interferometer: Ein Lichtstrahl wird durch Strahlteiler in zwei Arme aufgeteilt, an Spiegeln reflektiert und wieder zusammengeführt. Mit verschiebbaren Spiegeln oder Phasenschiebern lässt sich konstruktive/destruktive Interferenz einstellen. Der Aufbau zeigt Weginformation vs. Interferenz — Komplementarität.',
    },
    {
      type: 'text',
      content:
        'Nichtlokalität: Bei verschränkten Quantenobjekten kann die Messung an einem Teilchen instantan den Zustand des anderen beeinflussen — ohne dass Information mit Überlichtgeschwindigkeit übertragen wird. Eine detaillierte Erklärung geht über den Abiturstoff hinaus.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du die Begriffe Unschärferelation, Komplementarität und Nichtlokalität erläutern und am Mehrfachspalt bzw. Mach-Zehnder-Interferometer anwenden. Erkläre, warum $\\Delta x \\cdot \\Delta p$ nicht beliebig klein werden kann.',
    },
    {
      type: 'tip',
      content:
        'Es gibt auch eine Energie-Zeit-Unschärferelation: $\\Delta E \\cdot \\Delta t \\geq \\hbar/2$. Kurzlebige Zustände haben eine größere Energieunschärfe.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-uns-1',
      type: 'formula-select',
      question: 'Wie lautet die Heisenbergsche Unschärferelation für Ort und Impuls?',
      options: [
        '$\\Delta x \\cdot \\Delta p = 0$',
        '$\\Delta x \\cdot \\Delta p \\geq h/(4\\pi)$',
        '$\\Delta x \\cdot \\Delta p \\leq h$',
        '$\\Delta x + \\Delta p \\geq h$',
      ],
      correct: 1,
      explanation: 'Die Unschärferelation lautet $\\Delta x \\cdot \\Delta p \\geq h/(4\\pi)$. Das Produkt kann nicht kleiner werden.',
    },
    {
      id: 'cc-uns-2',
      type: 'multiple-choice',
      question: 'Was besagt die Komplementarität beim Welcher-Weg-Experiment?',
      options: [
        'Ort und Impuls sind immer messbar',
        'Weginformation und Interferenz schließen einander aus',
        'Licht ist nur Welle',
        'Es gibt keine Quantenobjekte',
      ],
      correct: 1,
      explanation: 'Komplementarität: Misst man, welchen Weg das Quantenobjekt nahm, verschwindet das Interferenzmuster. Beides gleichzeitig ist nicht möglich.',
    },
  ],
  summaryChecklist: [
    'Unschärferelation: $\\Delta x \\cdot \\Delta p \\geq h/(4\\pi)$',
    'Mehrfachspalt: Orts- und Impulsunschärfe',
    'Welcher-Weg-Experiment: Komplementarität',
    'Mach-Zehnder-Interferometer: Aufbau',
    '(eA) Begriffe erläutern und anwenden',
  ],
};
