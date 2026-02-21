import type { LessonContent } from '@/lib/types';

/**
 * Lektionsinhalte Modul 2: Schwingungen & Wellen
 * Basiert auf: Inhalte + Themen Schwgn + Wellen eN.pdf
 */

// --- Lektion 1: Grundgrößen harmonischer Schwingungen ---
export const grundgroessen: LessonContent = {
  intro:
    'Harmonische Schwingungen lassen sich durch Sinusfunktionen beschreiben. Die wichtigsten Größen sind Auslenkung, Amplitude, Periodendauer, Frequenz und Kreisfrequenz. Mit der Zeigerdarstellung kannst du Schwingungen anschaulich verstehen — ein rotierender Zeiger projiziert seine Spitze auf eine Sinuskurve.',
  learningGoals: [
    'Die Grundgrößen einer harmonischen Schwingung nennen und erklären',
    'Die Beziehung $f = 1/T$ und $\\omega = 2\\pi \\cdot f$ anwenden',
    'Den Verlauf $y(t) = y_{max} \\cdot \\sin(\\omega \\cdot t)$ interpretieren und zeichnen',
    'Die Zeigerdarstellung als Projektion einer Kreisbewegung verstehen',
    '(eA) Sinuskurve und Zeigerdarstellung skizzieren und erläutern',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Bei einer harmonischen Schwingung führt ein schwingender Körper eine periodische Bewegung aus, die sich mathematisch durch eine Sinus- oder Kosinusfunktion beschreiben lässt. Beispiele: Federpendel, Fadenpendel (kleine Auslenkung), Schwingkreis.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'y(t) = y_{max} \\cdot \\sin(\\omega \\cdot t)',
      variables: {
        'y(t)': 'Auslenkung zum Zeitpunkt t [m]',
        'y_{max}': 'Amplitude (maximale Auslenkung) [m]',
        '\\omega': 'Kreisfrequenz [rad/s]',
        t: 'Zeit [s]',
      },
    },
    {
      type: 'formula',
      content: '',
      formula: 'f = \\frac{1}{T} \\quad \\text{und} \\quad \\omega = 2\\pi \\cdot f = \\frac{2\\pi}{T}',
      variables: {
        f: 'Frequenz [Hz = 1/s]',
        T: 'Periodendauer [s]',
        '\\omega': 'Kreisfrequenz [rad/s]',
      },
    },
    {
      type: 'remember',
      content:
        'Die Amplitude ist die maximale Auslenkung, die Periodendauer T die Zeit für eine vollständige Schwingung. Die Frequenz f gibt an, wie viele Schwingungen pro Sekunde stattfinden. Die Phase bestimmt den Startpunkt der Schwingung.',
    },
    {
      type: 'text',
      content:
        'Zeigerdarstellung: Stell dir einen Zeiger vor, der mit konstanter Winkelgeschwindigkeit $\\omega$ im Kreis rotiert. Die Projektion der Zeigerspitze auf eine Achse ($y$-Achse) beschreibt eine harmonische Schwingung. Der Zeiger zeigt zum Zeitpunkt $t$ den Phasenwinkel $\\varphi = \\omega \\cdot t$.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du Sinuskurve und Zeigerdarstellung skizzieren können. Erläutere: Der Zeiger dreht sich um den Ursprung, die Projektion auf die y-Achse ergibt die Auslenkung y(t). Beide Darstellungen sind äquivalent.',
    },
    {
      type: 'tip',
      content:
        'Alternativ zur Sinusfunktion kann man $y(t) = y_{max} \\cdot \\cos(\\omega \\cdot t)$ verwenden — der Unterschied ist nur die Phase (Start bei maximaler bzw. mittlerer Auslenkung). Allgemein: $y(t) = y_{max} \\cdot \\sin(\\omega \\cdot t + \\varphi_0)$ mit Phasenverschiebung $\\varphi_0$.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-grund-1',
      type: 'formula-select',
      question: 'Welcher Zusammenhang besteht zwischen Frequenz f und Periodendauer T?',
      options: ['$f = T$', '$f = 1/T$', '$f = 2\\pi \\cdot T$', '$f = T/(2\\pi)$'],
      correct: 1,
      explanation: 'Die Frequenz ist der Kehrwert der Periodendauer: $f = 1/T$. Eine Schwingung mit $T = 0{,}5\\,\\text{s}$ hat $f = 2\\,\\text{Hz}$.',
    },
    {
      id: 'cc-grund-2',
      type: 'multiple-choice',
      question: 'Was beschreibt die Kreisfrequenz $\\omega$ physikalisch?',
      options: [
        'Die Anzahl der Schwingungen pro Sekunde',
        'Den Winkel, um den der Zeiger pro Sekunde dreht',
        'Die maximale Geschwindigkeit',
        'Die Amplitude',
      ],
      correct: 1,
      explanation: 'Die Kreisfrequenz $\\omega = 2\\pi \\cdot f$ gibt an, welcher Winkel (in rad) pro Sekunde durchlaufen wird. Es gilt $\\omega = 2\\pi/T$.',
    },
  ],
  summaryChecklist: [
    'Grundgrößen: Amplitude, $T$, $f$, $\\omega$, Phase',
    '$y(t) = y_{max} \\cdot \\sin(\\omega \\cdot t)$ mit $f = 1/T$ und $\\omega = 2\\pi \\cdot f$',
    'Zeigerdarstellung: Projektion der Kreisbewegung',
    '(eA) Sinuskurve und Zeiger skizzieren',
  ],
  interactiveComponent: 'OscillationSim',
};

// --- Lektion 2: Feder-Masse-Pendel ---
export const federMasse: LessonContent = {
  intro:
    'Ein Körper an einer Feder führt eine harmonische Schwingung aus, wenn die Rückstellkraft proportional zur Auslenkung ist ($F = -D \\cdot x$). Die Periodendauer hängt nur von Masse und Federkonstante ab — nicht von der Amplitude. In dieser Lektion lernst du die Formel $T = 2\\pi \\cdot \\sqrt{m/D}$ und die Energieumwandlung kennen.',
  learningGoals: [
    'Das lineare Kraftgesetz $F = -D \\cdot x$ und seine Bedeutung erklären',
    'Die Schwingungsdauer $T = 2\\pi \\cdot \\sqrt{m/D}$ herleiten und anwenden',
    'Die Abhängigkeit von T von m und D beschreiben',
    'Energieumwandlung $E_{pot} \\leftrightarrow E_{kin}$ während der Schwingung erklären',
    '(eA) Ausgleichskurven zeichnen, auf andere Oszillatoren übertragen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'An einer horizontal gelagerten Feder (Federkonstante $D$) ist eine Masse $m$ befestigt. Wird die Masse aus der Ruhelage ausgelenkt, wirkt die Rückstellkraft $F = -D \\cdot x$. Das negative Vorzeichen bedeutet: Die Kraft ist der Auslenkung entgegengerichtet und treibt die Masse zurück.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'F = -D \\cdot x',
      variables: {
        F: 'Rückstellkraft [N]',
        D: 'Federkonstante [N/m]',
        x: 'Auslenkung aus der Ruhelage [m]',
      },
    },
    {
      type: 'formula',
      content: '',
      formula: 'T = 2\\pi \\cdot \\sqrt{\\frac{m}{D}}',
      variables: {
        T: 'Periodendauer [s]',
        m: 'Masse [kg]',
        D: 'Federkonstante [N/m]',
      },
    },
    {
      type: 'text',
      content:
        'Je größer die Masse, desto träger das System — $T$ nimmt zu ($T \\propto \\sqrt{m}$). Je steifer die Feder (größeres $D$), desto schneller die Schwingung — $T$ nimmt ab ($T \\propto 1/\\sqrt{D}$). Die Periodendauer ist unabhängig von der Amplitude (Isochronismus).',
    },
    {
      type: 'remember',
      content:
        'Energieumwandlung: In der Ruhelage ist die kinetische Energie maximal, die potenzielle Energie null. An den Umkehrpunkten ist $E_{kin} = 0$ und $E_{pot}$ maximal. Die Gesamtenergie $E = \\frac{1}{2}D \\cdot y_{max}^2$ bleibt erhalten.',
    },
    {
      type: 'text',
      content:
        'Die potenzielle Energie der Feder ist $E_{pot} = \\frac{1}{2}D \\cdot x^2$. Zusammen mit $E_{kin} = \\frac{1}{2}m \\cdot v^2$ ergibt sich die Gesamtenergie $E = \\frac{1}{2}D \\cdot y_{max}^2 = \\frac{1}{2}m \\cdot v_{max}^2$. Beide Formen sind äquivalent und konstant.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du Ausgleichskurven für T(m) und T(D) zeichnen und die Abhängigkeiten bestätigen. Außerdem: die Analogie zum elektromagnetischen Schwingkreis herstellen — Masse entspricht Induktivität L, Federkonstante entspricht 1/Kapazität.',
    },
    {
      type: 'tip',
      content:
        'Für kleine Auslenkungen gilt das lineare Kraftgesetz auch beim Fadenpendel: $T = 2\\pi \\cdot \\sqrt{l/g}$, wobei $l$ die Pendellänge und $g$ die Fallbeschleunigung ist. Die Schwingung ist dann näherungsweise harmonisch.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-fed-1',
      type: 'formula-select',
      question: 'Wie lautet die Periodendauer des Feder-Masse-Pendels?',
      options: ['$T = 2\\pi \\cdot m/D$', '$T = 2\\pi \\cdot \\sqrt{m/D}$', '$T = \\sqrt{m \\cdot D}$', '$T = 2\\pi \\cdot \\sqrt{D/m}$'],
      correct: 1,
      explanation: 'Die Periodendauer ist $T = 2\\pi \\cdot \\sqrt{m/D}$. Sie hängt von der Wurzel aus Masse und Kehrwert der Federkonstante ab.',
    },
    {
      id: 'cc-fed-2',
      type: 'multiple-choice',
      question: 'Wenn sich die Masse vervierfacht, wie ändert sich T?',
      options: ['T verdoppelt sich', 'T vervierfacht sich', 'T halbiert sich', 'T bleibt gleich'],
      correct: 0,
      explanation: 'Da $T \\propto \\sqrt{m}$, führt $m \\to 4m$ zu $T \\to 2T$. Die Periodendauer verdoppelt sich.',
    },
  ],
  summaryChecklist: [
    '$F = -D \\cdot x$ (lineares Kraftgesetz)',
    '$T = 2\\pi \\cdot \\sqrt{m/D}$, unabhängig von Amplitude',
    'Energieumwandlung $E_{pot} \\leftrightarrow E_{kin}$, $E$ konstant',
    '(eA) Ausgleichskurven, Übertragung auf LC-Schwingkreis',
  ],
  interactiveComponent: 'OscillationSim',
  uncertaintyHint:
    'Bei der Bestimmung von $D$ oder $T$ aus dem Feder-Masse-Experiment: $T = 2\\pi \\cdot \\sqrt{m/D}$ enthält die Wurzel — die relative Unsicherheit von $T$ ist halb so groß wie die von $m/D$. Bei Ausgleichskurven $T^2(m)$: Die Steigung liefert $4\\pi^2/D$; Unsicherheit der Steigung $\\to$ Unsicherheit von $D$.',
};

// --- Lektion 3: Elektromagnetischer Schwingkreis ---
export const elektromagnetischerSchwingkreis: LessonContent = {
  intro:
    'Ein Schwingkreis besteht aus Spule (Induktivität L) und Kondensator (Kapazität C). Beim Anstoßen schwingt Energie zwischen elektrischem Feld (Kondensator) und magnetischem Feld (Spule) hin und her. Die Analogie zum Feder-Masse-Pendel hilft beim Verständnis: L entspricht m, C entspricht 1/D.',
  learningGoals: [
    'Die Analogie $L \\leftrightarrow m$, $C \\leftrightarrow 1/D$, $U_C \\leftrightarrow x$, $I \\leftrightarrow v$ erklären',
    'Die Thomson-Schwingungsgleichung $f = 1/(2\\pi \\cdot \\sqrt{LC})$ anwenden',
    'Die Abhängigkeit der Resonanzfrequenz von $C$ und $L$ beschreiben',
    'Anwendung RFID-Chip als Beispiel nennen',
    '(eA) Experiment durchführen, Resonanzkurve auswerten',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Ein idealer Schwingkreis (ohne Ohm-Widerstand) enthält eine Spule und einen Kondensator. Beim Entladen des Kondensators fließt ein Strom durch die Spule und baut ein Magnetfeld auf. Wenn der Kondensator leer ist, bricht das Feld zusammen und lädt den Kondensator umgekehrt — die Schwingung setzt sich fort.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'f = \\frac{1}{2\\pi \\cdot \\sqrt{L \\cdot C}}',
      variables: {
        f: 'Eigenfrequenz des Schwingkreises [Hz]',
        L: 'Induktivität der Spule [H]',
        C: 'Kapazität des Kondensators [F]',
      },
    },
    {
      type: 'remember',
      content:
        'Analogie Feder-Masse $\\leftrightarrow$ Schwingkreis: Masse $m$ $\\leftrightarrow$ Induktivität $L$, Federkonstante $D$ $\\leftrightarrow$ $1/C$ (Kehrwert der Kapazität), Auslenkung $x$ $\\leftrightarrow$ Spannung $U_C$ am Kondensator, Geschwindigkeit $v$ $\\leftrightarrow$ Stromstärke $I$. Die Thomson-Gleichung entspricht $T = 2\\pi \\cdot \\sqrt{m/D}$.',
    },
    {
      type: 'text',
      content:
        'Die Resonanzfrequenz hängt nur von $L$ und $C$ ab. Größere Kapazität $C$ $\\to$ kleinere Frequenz, größere Induktivität $L$ $\\to$ kleinere Frequenz. Eine Resonanzkurve zeigt die Stromamplitude oder Spannungsamplitude als Funktion der Erregerfrequenz — bei $f = f_{Eigen}$ ist das Maximum.',
    },
    {
      type: 'text',
      content:
        'Anwendung: RFID-Chips nutzen Schwingkreise mit charakteristischer Eigenfrequenz. Ein Lesegerät sendet elektromagnetische Wellen; der Chip „antwortet" bei Resonanz und überträgt so seine Information.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du ein Experiment planen und durchführen: Eigenfrequenz aus L und C berechnen, Schwingkreis anregend mit Frequenz variieren, Resonanzkurve aufnehmen und auswerten. Bestätige, dass das Maximum bei der berechneten Eigenfrequenz liegt.',
    },
    {
      type: 'tip',
      content:
        'Reale Schwingkreise haben Ohmsche Verluste (Widerstand $R$). Die Schwingung klingt dann exponentiell ab. Die Güte $Q = \\omega_0 \\cdot L/R$ beschreibt, wie wenig gedämpft der Schwingkreis ist.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-lc-1',
      type: 'multiple-choice',
      question: 'Was entspricht der Federkonstante D im LC-Schwingkreis?',
      options: ['Die Induktivität L', 'Die Kapazität C', 'Der Kehrwert 1/C', 'Der Widerstand R'],
      correct: 2,
      explanation: 'Im Schwingkreis entspricht 1/C der Federkonstante D. Es gilt die Analogie: D ↔ 1/C, m ↔ L.',
    },
    {
      id: 'cc-lc-2',
      type: 'formula-select',
      question: 'Wie lautet die Eigenfrequenz des Schwingkreises?',
      options: [
        '$f = 2\\pi \\cdot \\sqrt{LC}$',
        '$f = 1/(2\\pi \\cdot \\sqrt{LC})$',
        '$f = \\sqrt{L \\cdot C}$',
        '$f = 1/(L \\cdot C)$',
      ],
      correct: 1,
      explanation: 'Die Thomson-Schwingungsgleichung lautet $f = 1/(2\\pi \\cdot \\sqrt{LC})$. Größere $L$ oder $C$ führen zu kleinerer Frequenz.',
    },
  ],
  summaryChecklist: [
    'Analogie: $L \\leftrightarrow m$, $C \\leftrightarrow 1/D$, $U_C \\leftrightarrow x$, $I \\leftrightarrow v$',
    '$f = 1/(2\\pi \\cdot \\sqrt{LC})$ (Thomson)',
    'Resonanzkurve: Maximum bei Eigenfrequenz',
    '(eA) Experiment, Resonanzkurve auswerten',
  ],
  uncertaintyHint:
    'Bei der Auswertung des LC-Schwingkreises: Aus $f = 1/(2\\pi \\cdot \\sqrt{LC})$ folgt für $L$ oder $C$ bei bekannter Frequenz. Die relative Unsicherheit von $f$ ist entscheidend — aus der Resonanzkurve ergibt sich die Frequenzauflösung. Bei der Bestimmung von $L$ aus bekannter Kapazität $C$: Die relative Unsicherheit von $L$ ist etwa doppelt so groß wie die von $f$.',
};

// --- Lektion 4: Resonanz erzwungener Schwingungen ---
export const resonanz: LessonContent = {
  intro:
    'Wird ein schwingungsfähiges System periodisch von außen angeregt, kann es bei Übereinstimmung von Erregerfrequenz und Eigenfrequenz zu besonders starken Schwingungen kommen — Resonanz. In dieser Lektion lernst du den Begriff, typische Experimente und die technische Bedeutung kennen.',
  learningGoals: [
    'Den Begriff der Resonanz erklären',
    'Das Experiment zur erzwungenen Schwingung beschreiben',
    'Die Bedingung für Resonanz (f_Erreger = f_Eigen) nennen',
    'Die Bedeutung in Technik (positiv und negativ) erläutern',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Bei einer erzwungenen Schwingung wirkt eine periodische äußere Kraft auf das System. Die Amplitude der Schwingung hängt von der Erregerfrequenz ab. Stimmt die Erregerfrequenz mit der Eigenfrequenz des Systems überein, wird die Amplitude maximal — man spricht von Resonanz.',
    },
    {
      type: 'remember',
      content:
        'Resonanz tritt auf, wenn f_Erreger = f_Eigen. Das System „schwingt mit" und nimmt Energie besonders effektiv auf. Bei starker Dämpfung ist die Resonanzkurve flacher und das Maximum liegt etwas unter der Eigenfrequenz.',
    },
    {
      type: 'experiment',
      content:
        'Experiment: Mehrere gleiche Pendel an einer gemeinsamen Aufhängung. Ein Pendel wird angestoßen — die anderen schwingen mit, wenn ihre Eigenfrequenz übereinstimmt. Oder: Feder-Masse-System mit Motoranregung; bei variabler Motorfrequenz zeigt sich die Resonanz als maximale Auslenkung.',
    },
    {
      type: 'text',
      content:
        'Technische Bedeutung: Positiv — Schwingkreise zur Frequenzauswahl (Radio), Musikinstrumente (Resonanzkörper), RFID. Negativ — Brücken können bei Wind oder marschierenden Soldaten in Resonanz geraten (Tacoma Narrows), Maschinen müssen gedämpft werden, um Resonanzkatastrophen zu vermeiden.',
    },
    {
      type: 'tip',
      content:
        'Die Resonanzfrequenz bei Dämpfung liegt bei $\\omega_{res} = \\sqrt{\\omega_0^2 - 2\\delta^2}$, wobei $\\omega_0$ die Eigenkreisfrequenz und $\\delta$ die Dämpfungskonstante ist. Bei schwacher Dämpfung ist $\\omega_{res} \\approx \\omega_0$.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-res-1',
      type: 'multiple-choice',
      question: 'Wann tritt Resonanz bei einer erzwungenen Schwingung auf?',
      options: [
        'Wenn die Erregerfrequenz viel kleiner als die Eigenfrequenz ist',
        'Wenn die Erregerfrequenz gleich der Eigenfrequenz ist',
        'Wenn keine Dämpfung vorliegt',
        'Wenn die Amplitude maximal ist',
      ],
      correct: 1,
      explanation: 'Resonanz tritt auf, wenn f_Erreger = f_Eigen. Dann ist die Amplitude maximal.',
    },
    {
      id: 'cc-res-2',
      type: 'multiple-choice',
      question: 'Welches Beispiel zeigt eine positive Nutzung der Resonanz?',
      options: [
        'Einsturz einer Brücke durch Wind',
        'Radio-Empfang durch abgestimmten Schwingkreis',
        'Vibrationen von Maschinen',
        'Schwingungen eines Autos auf holpriger Straße',
      ],
      correct: 1,
      explanation: 'Beim Radio wird die gewünschte Frequenz durch einen abgestimmten Schwingkreis aus dem Sendegemisch „herausgefiltert" — positive Nutzung der Resonanz.',
    },
  ],
  summaryChecklist: [
    'Resonanz: $f_{Erreger} = f_{Eigen}$ $\\to$ maximale Amplitude',
    'Experiment: erzwungene Schwingung mit variabler Erregerfrequenz',
    'Technik: positiv (Radio, RFID) und negativ (Brücken)',
  ],
};

// --- Lektion 5: Wellenausbreitung & Grundgrößen ---
export const wellenausbreitung: LessonContent = {
  intro:
    'Wellen übertragen Energie und Informationen ohne Stofftransport. Die wichtigsten Größen sind Wellenlänge $\\lambda$, Frequenz $f$, Ausbreitungsgeschwindigkeit $c$ und Amplitude. Es gibt Longitudinal- und Transversalwellen. In dieser Lektion lernst du die Zusammenhänge $c = \\lambda \\cdot f$ sowie Zeigerketten und Sinuskurven kennen.',
  learningGoals: [
    'Die Grundgrößen einer Welle definieren ($\\lambda$, $f$, $c$, Amplitude, Phase)',
    'Die Beziehung $c = \\lambda \\cdot f$ anwenden',
    'Längs- und Transversalwellen unterscheiden',
    'Zeigerketten und Sinuskurven als Darstellung von Wellen verstehen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Eine Welle ist eine räumlich und zeitlich periodische Störung, die sich im Raum ausbreitet. Die Wellenlänge $\\lambda$ ist der Abstand zwischen zwei benachbarten Punkten gleicher Phase. Die Ausbreitungsgeschwindigkeit $c$ gibt an, wie schnell sich die Welle fortpflanzt.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'c = \\lambda \\cdot f',
      variables: {
        c: 'Ausbreitungsgeschwindigkeit [m/s]',
        '\\lambda': 'Wellenlänge [m]',
        f: 'Frequenz [Hz]',
      },
    },
    {
      type: 'remember',
      content:
        'Transversalwellen: Schwingungsrichtung senkrecht zur Ausbreitungsrichtung (z.B. Seilwelle, elektromagnetische Welle). Longitudinalwellen: Schwingungsrichtung parallel zur Ausbreitungsrichtung (z.B. Schallwelle). Nur Transversalwellen können polarisiert werden.',
    },
    {
      type: 'text',
      content:
        'Zeigerketten: Jeder Punkt der Welle kann durch einen Zeiger dargestellt werden. Benachbarte Zeiger sind phasenverschoben — das ergibt eine „laufende" Welle. Die Projektion der Zeigerkette auf eine Achse liefert die momentane räumliche Verteilung der Auslenkung (Sinuskurve y(x)).',
    },
    {
      type: 'text',
      content:
        'Für eine harmonische Welle gilt: $y(x,t) = y_{max} \\cdot \\sin(k \\cdot x - \\omega \\cdot t)$ mit $k = 2\\pi/\\lambda$ (Wellenzahl). Der Term $(k \\cdot x - \\omega \\cdot t)$ ist die Phase. Wellenlänge und Frequenz hängen über $c = \\lambda \\cdot f$ zusammen.',
    },
    {
      type: 'tip',
      content:
        'Beispiel: Schall in Luft bei $20\\,\\text{°C}$: $c \\approx 343\\,\\text{m}/\\text{s}$. Ein Ton von $f = 440\\,\\text{Hz}$ hat $\\lambda = c/f \\approx 0{,}78\\,\\text{m}$. Licht: $c \\approx 3 \\cdot 10^8\\,\\text{m}/\\text{s}$, sichtbares Licht $\\lambda \\approx 400{-}700\\,\\text{nm}$, also $f \\approx 4 \\cdot 10^{14}{-}7{,}5 \\cdot 10^{14}\\,\\text{Hz}$.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-well-1',
      type: 'formula-select',
      question: 'Welcher Zusammenhang gilt zwischen Ausbreitungsgeschwindigkeit, Wellenlänge und Frequenz?',
      options: ['$c = \\lambda/f$', '$c = \\lambda \\cdot f$', '$c = \\lambda + f$', '$c = f/\\lambda$'],
      correct: 1,
      explanation: 'Es gilt $c = \\lambda \\cdot f$. Die Welle legt in einer Periodendauer $T$ genau eine Wellenlänge zurück: $c = \\lambda/T = \\lambda \\cdot f$.',
    },
    {
      id: 'cc-well-2',
      type: 'multiple-choice',
      question: 'Was unterscheidet Longitudinal- von Transversalwellen?',
      options: [
        'Transversalwellen haben keine Frequenz',
        'Bei Transversalwellen schwingt senkrecht zur Ausbreitung, bei Longitudinalwellen parallel',
        'Longitudinalwellen können polarisiert werden',
        'Es gibt keinen Unterschied',
      ],
      correct: 1,
      explanation: 'Transversalwellen: Schwingung senkrecht zur Ausbreitung. Longitudinalwellen: Schwingung parallel zur Ausbreitung (z.B. Schall).',
    },
  ],
  summaryChecklist: [
    'Grundgrößen: $\\lambda$, $f$, $c$, Amplitude, Phase',
    '$c = \\lambda \\cdot f$',
    'Longitudinal vs. Transversal',
    'Zeigerketten und Sinuskurven',
  ],
};

// --- Lektion 6: Polarisation ---
export const polarisation: LessonContent = {
  intro:
    'Polarisation ist eine Eigenschaft transversaler Wellen. Bei polarisiertem Licht schwingt das elektrische Feld nur in einer Ebene. Polarisationsfilter lassen Licht nur einer Schwingungsrichtung durch. Das Malus\'sche Gesetz beschreibt die Intensitätsabnahme bei gekreuzten Polarisatoren.',
  learningGoals: [
    'Polarisation als Eigenschaft transversaler Wellen erklären',
    'Die Winkelabhängigkeit der Intensität (Malus\'sches Gesetz) anwenden',
    'Den Zusammenhang $I \\propto A^2$ für Intensität und Amplitude nennen',
    'Anwendung LCD-Display erklären',
    '(eA) Experiment mit Polarisationsfiltern auswerten',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Nur Transversalwellen können polarisiert werden — bei Longitudinalwellen (z.B. Schall) gibt es keine bevorzugte Schwingungsrichtung. Bei Licht ist das elektrische Feld die schwingende Größe. Unpolarisiertes Licht enthält alle Schwingungsrichtungen; polarisiertes Licht nur eine.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'I = I_0 \\cdot \\cos^2(\\alpha)',
      variables: {
        I: 'Intensität nach dem Polarisator [W/m²]',
        'I_0': 'Intensität vor dem Polarisator [W/m²]',
        '\\alpha': 'Winkel zwischen Polarisationsrichtung und Schwingungsebene des einfallenden Lichts [°]',
      },
    },
    {
      type: 'remember',
      content:
        'Malus\'sches Gesetz: Die durchgelassene Intensität hängt vom Winkel ab. Bei $\\alpha = 0°$ ist $I = I_0$, bei $\\alpha = 90°$ (gekreuzte Polarisatoren) ist $I = 0$. Die Intensität ist proportional zum Quadrat der Amplitude: $I \\propto A^2$.',
    },
    {
      type: 'text',
      content:
        'Anwendung LCD-Display: Flüssigkristalle drehen die Polarisationsebene. Zusammen mit Polarisationsfolien kann jeder Pixel ein- oder ausgeschaltet werden. Ohne angelegte Spannung dreht der Kristall das Licht; mit Spannung bleibt die Polarisation erhalten — der zweite Polarisator blockiert dann das Licht.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du ein Experiment mit Polarisationsfiltern auswerten: Zwei Filter hintereinander, Winkel variieren, Intensität messen. Bestätige das Malus\'sche Gesetz und diskutiere Messunsicherheiten.',
    },
    {
      type: 'tip',
      content:
        'Polarisationsbrillen (z.B. 3D-Kino) nutzen die unterschiedliche Polarisation für linkes und rechtes Auge. Reflektiertes Licht ist oft teilweise polarisiert — deshalb helfen Polarisationsfilter bei Sonnenbrillen gegen Blendeffekte.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-pol-1',
      type: 'multiple-choice',
      question: 'Welche Wellen können polarisiert werden?',
      options: [
        'Nur Longitudinalwellen',
        'Nur Transversalwellen',
        'Beide Wellentypen',
        'Weder noch',
      ],
      correct: 1,
      explanation: 'Nur Transversalwellen haben eine Schwingungsrichtung senkrecht zur Ausbreitung und können daher polarisiert werden.',
    },
    {
      id: 'cc-pol-2',
      type: 'formula-select',
      question: 'Wie lautet das Malus\'sche Gesetz für die Intensität nach einem Polarisator?',
      options: [
        '$I = I_0 \\cdot \\cos(\\alpha)$',
        '$I = I_0 \\cdot \\cos^2(\\alpha)$',
        '$I = I_0 \\cdot \\sin(\\alpha)$',
        '$I = I_0 \\cdot \\alpha$',
      ],
      correct: 1,
      explanation: 'Die Intensität hinter einem Polarisator folgt $I = I_0 \\cdot \\cos^2(\\alpha)$. Bei gekreuzten Polarisatoren ($\\alpha = 90°$) ist $I = 0$.',
    },
  ],
  summaryChecklist: [
    'Polarisation nur bei Transversalwellen',
    'Malus: $I = I_0 \\cdot \\cos^2(\\alpha)$, $I \\propto A^2$',
    'LCD: Flüssigkristall + Polarisatoren',
    '(eA) Experiment mit Polarisationsfiltern',
  ],
};

// --- Lektion 7: Interferenzphänomene ---
export const interferenz: LessonContent = {
  intro:
    'Überlagern sich zwei oder mehr Wellen, entsteht Interferenz. Bei gleicher Frequenz und fester Phasenbeziehung entstehen Maxima und Minima. Bekannte Beispiele: stehende Wellen, Schwebung, Doppelspalt. In dieser Lektion lernst du die Bedingungen für konstruktive und destruktive Interferenz.',
  learningGoals: [
    'Stehende Wellen und Schwebung als Interferenzphänomene erklären',
    'Die Bedingung für Maxima ($\\Delta s = n \\cdot \\lambda$) und Minima ($\\Delta s = (n - 1/2) \\cdot \\lambda$) am Doppelspalt anwenden',
    'Den Gangunterschied $\\Delta s$ als Wegdifferenz interpretieren',
    'Die Intensitätsverteilung am Doppelspalt beschreiben',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Interferenz entsteht, wenn sich Wellen überlagern. Konstruktive Interferenz (Verstärkung): Gangunterschied $\\Delta s = n \\cdot \\lambda$ mit $n = 0, 1, 2, \\ldots$ Destruktive Interferenz (Auslöschung): $\\Delta s = (n - 1/2) \\cdot \\lambda$.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\Delta s = n \\cdot \\lambda \\quad \\text{(Maxima)} \\qquad \\Delta s = \\left(n - \\frac{1}{2}\\right) \\cdot \\lambda \\quad \\text{(Minima)}',
      variables: {
        '\\Delta s': 'Gangunterschied [m]',
        n: 'Ordnung (n = 1, 2, 3, …)',
        '\\lambda': 'Wellenlänge [m]',
      },
    },
    {
      type: 'text',
      content:
        'Stehende Wellen: Zwei gegenläufige Wellen gleicher Frequenz erzeugen ortsfeste Maxima (Bäuche) und Minima (Knoten). Bedingung: Länge $= n \\cdot \\lambda/2$. Schwebung: Zwei Wellen mit leicht unterschiedlicher Frequenz $f_1$, $f_2$ erzeugen eine Einhüllende mit Schwebungsfrequenz $f_{Schweb} = |f_1 - f_2|$.',
    },
    {
      type: 'text',
      content:
        'Doppelspalt: Zwei kohärente Lichtquellen (Spalte) erzeugen auf einem Schirm ein Interferenzmuster. Die Position des $n$-ten Maximums folgt aus $\\sin(\\alpha_n) = n \\cdot \\lambda/d$, wobei $d$ der Spaltabstand ist. Für kleine Winkel: Abstand vom Hauptmaximum proportional zu $n \\cdot \\lambda \\cdot L/d$.',
    },
    {
      type: 'remember',
      content:
        'Für kleine Winkel gilt: $a_n \\approx n \\cdot \\lambda \\cdot L/d$, wobei $a_n$ der Abstand des $n$-ten Maximums vom Zentrum, $L$ der Abstand Spalt–Schirm und $d$ der Spaltabstand ist. Das Intensitätsprofil zeigt abwechselnd Maxima und Minima.',
    },
    {
      type: 'tip',
      content:
        'Kohärenz ist notwendig: Die Wellen müssen eine feste Phasenbeziehung haben. Beim Doppelspalt stammt das Licht aus derselben Quelle und wird an zwei Spalten gebeugt — deshalb sind die Teilwellen kohärent.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-int-1',
      type: 'formula-select',
      question: 'Welcher Gangunterschied führt zu einem Maximum am Doppelspalt?',
      options: ['$\\Delta s = (n-1/2) \\cdot \\lambda$', '$\\Delta s = n \\cdot \\lambda$', '$\\Delta s = \\lambda/n$', '$\\Delta s = n/\\lambda$'],
      correct: 1,
      explanation: 'Konstruktive Interferenz (Maximum) bei $\\Delta s = n \\cdot \\lambda$. Destruktive Interferenz (Minimum) bei $\\Delta s = (n - 1/2) \\cdot \\lambda$.',
    },
    {
      id: 'cc-int-2',
      type: 'multiple-choice',
      question: 'Was ist Schwebung?',
      options: [
        'Stehende Welle',
        'Überlagerung zweier Wellen mit leicht unterschiedlicher Frequenz',
        'Konstruktive Interferenz',
        'Polarisation',
      ],
      correct: 1,
      explanation: 'Schwebung entsteht bei der Überlagerung zweier Wellen mit Frequenzen $f_1$ und $f_2$. Die Einhüllende hat die Schwebungsfrequenz $|f_1 - f_2|$.',
    },
  ],
  summaryChecklist: [
    'Maxima: $\\Delta s = n \\cdot \\lambda$, Minima: $\\Delta s = (n-1/2) \\cdot \\lambda$',
    'Stehende Wellen: gegenläufige Wellen',
    'Schwebung: $|f_1 - f_2|$',
    'Doppelspalt: $\\sin(\\alpha) = n \\cdot \\lambda/d$',
  ],
  interactiveComponent: 'WaveInterference',
  uncertaintyHint:
    'Bei Doppelspalt und Gitter: Die Wellenlänge $\\lambda$ folgt aus $\\sin(\\alpha) = n \\cdot \\lambda/d$. Die Unsicherheit von $\\lambda$ hängt von der Ableseungenauigkeit des Winkels $\\alpha$ bzw. des Abstands $a_n$ ab. Für kleine Winkel: $a_n \\approx n \\cdot \\lambda \\cdot L/d$ $\\to$ $\\lambda \\approx a_n \\cdot d/(n \\cdot L)$. Die relative Unsicherheit von $\\lambda$ ergibt sich aus den relativen Unsicherheiten von $a_n$, $d$ und $L$.',
};

// --- Lektion 8: Gitter & Bragg-Reflexion ---
export const gitterBragg: LessonContent = {
  intro:
    'Optische Gitter und die Bragg-Reflexion nutzen Interferenz zur Wellenlängenbestimmung. Beim Gitter gilt $\\sin(\\alpha_n) = n \\cdot \\lambda/g$, bei der Bragg-Reflexion $n \\cdot \\lambda = 2d \\cdot \\sin(\\theta_n)$. Anwendungen: CD/DVD, Röntgenstrukturanalyse. Das Michelson-Interferometer dient zur präzisen Längen- und Lichtgeschwindigkeitsmessung.',
  learningGoals: [
    'Die Gittergleichung $\\sin(\\alpha_n) = n \\cdot \\lambda/g$ anwenden',
    'Die Beziehung tan(α_n) = a_n/e für die Messung nutzen',
    'Die Bragg-Bedingung $n \\cdot \\lambda = 2d \\cdot \\sin(\\theta_n)$ anwenden',
    'Anwendungen CD/DVD, Röntgenstrukturanalyse nennen',
    '(eA) Herleitung der Gitter- und Bragg-Gleichung',
    'Das Michelson-Interferometer (MIF) und seine Verwendung kennen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Ein optisches Gitter besteht aus vielen parallel angeordneten Spalten im Abstand $g$ (Gitterkonstante). Licht wird an jedem Spalt gebeugt; die Teilwellen interferieren. Maxima entstehen, wenn der Gangunterschied zwischen benachbarten Spalten $\\Delta s = n \\cdot \\lambda$ beträgt.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\sin(\\alpha_n) = \\frac{n \\cdot \\lambda}{g} = \\frac{\\Delta s}{g}',
      variables: {
        '\\alpha_n': 'Winkel des n-ten Maximums',
        n: 'Ordnung',
        '\\lambda': 'Wellenlänge [m]',
        g: 'Gitterkonstante (Spaltabstand) [m]',
      },
    },
    {
      type: 'formula',
      content: '',
      formula: '\\tan(\\alpha_n) = \\frac{a_n}{e}',
      variables: {
        'a_n': 'Abstand des n-ten Maximums vom 0. Maximum auf dem Schirm [m]',
        e: 'Abstand Gitter–Schirm [m]',
      },
    },
    {
      type: 'text',
      content:
        'Bragg-Reflexion: Röntgenstrahlen werden an den Netzebenen eines Kristalls reflektiert. Konstruktive Interferenz bei Gangunterschied $2d \\cdot \\sin(\\theta) = n \\cdot \\lambda$, wobei $d$ der Abstand der Netzebenen und $\\theta$ der Glanzwinkel ist.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'n \\cdot \\lambda = 2d \\cdot \\sin(\\theta_n)',
      variables: {
        n: 'Ordnung',
        '\\lambda': 'Wellenlänge [m]',
        d: 'Netzebenenabstand [m]',
        '\\theta_n': 'Glanzwinkel (Bragg-Winkel)',
      },
    },
    {
      type: 'remember',
      content:
        'CD/DVD: Die Spurteilung wirkt als Reflexionsgitter. Aus dem Beugungswinkel kann die Wellenlänge (oder aus bekannter Wellenlänge die Spurteilung) bestimmt werden. Röntgenstrukturanalyse: Aus den Bragg-Winkeln werden Abstände in Kristallen ermittelt.',
    },
    {
      type: 'text',
      content:
        'Michelson-Interferometer (MIF): Ein Strahlteiler spaltet Licht in zwei Arme. Nach Reflexion an Spiegeln werden die Teilstrahlen wieder überlagert. Eine Verschiebung eines Spiegels um $\\lambda/2$ ändert den Gangunterschied um $\\lambda$ und erzeugt einen Hell–Dunkel–Wechsel. Damit lassen sich Wellenlängen und Längenänderungen sehr präzise messen — Grundlage für die moderne Definition des Meters und Messungen der Lichtgeschwindigkeit.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du die Gittergleichung und die Bragg-Bedingung selbständig herleiten: Gangunterschied zwischen benachbarten Quellen (Gitter) bzw. zwischen reflektierten Wellen an aufeinanderfolgenden Ebenen (Bragg) bestimmen und für konstruktive Interferenz $\\Delta s = n \\cdot \\lambda$ setzen.',
    },
    {
      type: 'tip',
      content:
        'Bei der Röntgenbeugung sind die Wellenlängen ($\\lambda \\approx 0{,}1\\,\\text{nm}$) vergleichbar mit Atomabständen ($d \\approx 0{,}2$–$0{,}3\\,\\text{nm}$). Daher eignet sich Röntgenlicht für die Strukturaufklärung von Kristallen.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-git-1',
      type: 'formula-select',
      question: 'Wie lautet die Bragg-Bedingung für konstruktive Interferenz?',
      options: [
        '$n \\cdot \\lambda = d \\cdot \\sin(\\theta)$',
        '$n \\cdot \\lambda = 2d \\cdot \\sin(\\theta)$',
        '$\\lambda = 2nd \\cdot \\sin(\\theta)$',
        '$n \\cdot \\lambda = d/\\cos(\\theta)$',
      ],
      correct: 1,
      explanation: 'Die Bragg-Bedingung lautet $n \\cdot \\lambda = 2d \\cdot \\sin(\\theta_n)$. Der Faktor 2 kommt vom Hin- und Rückweg der Welle zwischen den Netzebenen.',
    },
    {
      id: 'cc-git-2',
      type: 'multiple-choice',
      question: 'Wofür wird das Michelson-Interferometer genutzt?',
      options: [
        'Zur Polarisation von Licht',
        'Zur präzisen Messung von Wellenlängen und Längenänderungen',
        'Zur Erzeugung von Röntgenstrahlung',
        'Zur Frequenzverdopplung',
      ],
      correct: 1,
      explanation: 'Das Michelson-Interferometer nutzt Interferenz zur präzisen Messung von Wellenlängen und Längenänderungen (z.B. Spiegelverschiebung um $\\lambda/2$ $\\to$ Hell–Dunkel–Wechsel).',
    },
  ],
  summaryChecklist: [
    'Gitter: $\\sin(\\alpha_n) = n \\cdot \\lambda/g$, $\\tan(\\alpha_n) = a_n/e$',
    'Bragg: $n \\cdot \\lambda = 2d \\cdot \\sin(\\theta_n)$',
    'Anwendung: CD/DVD, Röntgenstrukturanalyse',
    '(eA) Herleitung Gitter- und Bragg-Gleichung',
    'Michelson-Interferometer: Längen- und Lichtgeschwindigkeitsmessung',
  ],
};
