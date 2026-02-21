import type { LessonContent } from '@/lib/types';

/**
 * Lektionsinhalte Modul 1: Elektrizität
 * Basiert auf: Inhalte + Themen E-B-Lehre eN.pdf
 */

export const feldstaerkeFeldlinien: LessonContent = {
  intro:
    'Das elektrische Feld beschreibt die Wirkung von Ladungen auf ihren Raum. Die Feldstärke ist eine zentrale Größe zur Beschreibung dieser Wirkung. In dieser Lektion lernst du die Definition der elektrischen Feldstärke, ihre Einheit sowie die Darstellung durch Feldlinienbilder kennen.',
  learningGoals: [
    'Die elektrische Feldstärke $E = \\frac{F}{q}$ definieren und anwenden können',
    'Die Einheiten N/C und V/m erklären und ineinander umrechnen',
    'Feldlinienbilder für homogenes Feld und Punktladung zeichnen und interpretieren',
    'Die Feldstärke beim Plattenkondensator mit $E = \\frac{U}{d}$ berechnen',
    '(eA) Skizzen anfertigen und die Bedeutung der Feldlinien erläutern',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Bringt man eine kleine positive Probeladung q in die Nähe einer geladenen Kugel, wirkt eine Kraft F auf sie. Die Stärke dieser Kraft hängt von der Ladung q und vom Ort ab. Um die Eigenschaft des Raums unabhängig von der Probeladung zu beschreiben, definiert man die elektrische Feldstärke.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'E = \\frac{F}{q}',
      variables: {
        E: 'Elektrische Feldstärke [N/C oder V/m]',
        F: 'Kraft auf die Probeladung [N]',
        q: 'Ladung der Probeladung [C]',
      },
    },
    {
      type: 'remember',
      content:
        'Die elektrische Feldstärke ist eine vektorielle Größe. Sie zeigt in Richtung der Kraft auf eine positive Probeladung. Die Einheit N/C (Newton pro Coulomb) ist gleich V/m (Volt pro Meter): 1 N/C = 1 V/m. Man spricht von einem homogenen Feld, wenn Betrag und Richtung der Feldstärke überall gleich sind.',
    },
    {
      type: 'text',
      content:
        'Feldlinien sind eine anschauliche Darstellung des elektrischen Felds: Die Tangenten an die Feldlinien zeigen die Feldrichtung, die Dichte der Linien die Feldstärke. Feldlinien beginnen an positiven Ladungen und enden an negativen.',
    },
    {
      type: 'text',
      content:
        'Beim homogenen Feld (z.B. im Plattenkondensator) verlaufen die Feldlinien parallel und gleichmäßig. Bei einer Punktladung gehen die Feldlinien radial von der Ladung aus (positive Ladung) oder auf sie zu (negative Ladung).',
    },
    {
      type: 'formula',
      content: '',
      formula: 'E = \\frac{U}{d}',
      variables: {
        E: 'Elektrische Feldstärke im Plattenkondensator [V/m]',
        U: 'Spannung zwischen den Platten [V]',
        d: 'Plattenabstand [m]',
      },
    },
    {
      type: 'text',
      content:
        'Im Plattenkondensator mit kleinen Plattenabständen gegenüber der Plattenfläche kann das Feld als homogen angenommen werden. Die Feldstärke hängt dann nur von der Spannung und dem Abstand ab — nicht von der Ladung auf den Platten.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du Feldlinienbilder für ein homogenes Feld und eine Punktladung zeichnen können. Erläutere dabei die Bedeutung der Feldlinien: Richtung als Tangentenrichtung, Dichte als Maß für die Feldstärke, sowie Anfang und Ende der Feldlinien an den Ladungen.',
    },
    {
      type: 'tip',
      content:
        'Bei der Punktladung gilt außerdem $E \\propto Q/r^2$ (Coulomb-Feld). Im Plattenkondensator ist $E$ konstant, daher eignet er sich gut für gleichmäßig beschleunigte Bewegungen von Ladungen.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-feld-1',
      type: 'multiple-choice',
      question: 'Welche Einheit hat die elektrische Feldstärke?',
      options: ['$N \\cdot m$', '$N/C$', '$C/s$', '$V \\cdot A$'],
      correct: 1,
      explanation:
        'Die elektrische Feldstärke $E = \\frac{F}{q}$ hat die Einheit Newton pro Coulomb (N/C). Dies ist äquivalent zu Volt pro Meter (V/m), da $1\\,\\text{V} = 1\\,\\text{J}/\\text{C}$ und $1\\,\\text{N} \\cdot \\text{m} = 1\\,\\text{J}$.',
    },
    {
      id: 'cc-feld-2',
      type: 'formula-select',
      question: 'Wie lautet die Feldstärke im Plattenkondensator?',
      options: ['$E = U \\cdot d$', '$E = \\frac{U}{d}$', '$E = \\frac{Q}{U}$', '$E = F \\cdot q$'],
      correct: 1,
      explanation:
        'Im homogenen Feld des Plattenkondensators gilt $E = \\frac{U}{d}$. Je größer die Spannung und je kleiner der Abstand, desto stärker das Feld.',
      hint: 'Denke an die Einheit V/m.',
    },
    {
      id: 'cc-feld-3',
      type: 'multiple-choice',
      question: 'Wo beginnen die Feldlinien bei einer positiven Punktladung?',
      options: [
        'Sie enden in der Ladung',
        'Sie beginnen in der Ladung und gehen radial nach außen',
        'Sie verlaufen parallel',
        'Es gibt keine Feldlinien',
      ],
      correct: 1,
      explanation:
        'Feldlinien beginnen an positiven Ladungen und enden an negativen. Bei einer einzelnen positiven Punktladung gehen sie radial von der Ladung nach außen.',
    },
  ],
  summaryChecklist: [
    'Definition $E = \\frac{F}{q}$ mit Einheit N/C = V/m',
    'Feldlinienbild: homogenes Feld (parallel) und Punktladung (radial) skizzieren',
    'Plattenkondensator: $E = \\frac{U}{d}$ anwenden',
    '(eA) Bedeutung der Feldlinien erläutern',
  ],
  interactiveComponent: 'FieldLines',
};

// --- Lektion 2: Kondensator & Kapazität ---
export const kondensatorKapazitaet: LessonContent = {
  intro:
    'Kondensatoren speichern elektrische Ladung und Energie. Die Kapazität C beschreibt, wie viel Ladung bei gegebener Spannung gespeichert werden kann. In dieser Lektion lernst du die Definition der Kapazität, die Energiebilanz beim Beschleunigen von Ladungen sowie die geometrische Berechnung von C kennen.',
  learningGoals: [
    'Die Kapazität $C = \\frac{Q}{U}$ definieren und die Einheit Farad erklären',
    'Die Energiebilanz $\\frac{1}{2}mv^2 = e \\cdot U_A$ herleiten und die Geschwindigkeit berechnen',
    'Die geometrische Berechnung der Kapazität beim Plattenkondensator anwenden',
    '(eA) Ein Experiment planen und die Kapazität bestimmen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Ein Kondensator besteht aus zwei leitenden Platten, die durch einen Isolator (Dielektrikum) getrennt sind. Legt man eine Spannung an, laden sich die Platten entgegengesetzt auf. Die gespeicherte Ladung Q ist proportional zur Spannung U.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'C = \\frac{Q}{U}',
      variables: {
        C: 'Kapazität [F = Farad = C/V]',
        Q: 'Gespeicherte Ladung [C]',
        U: 'Spannung zwischen den Platten [V]',
      },
    },
    {
      type: 'remember',
      content:
        'Die Einheit der Kapazität ist Farad (F): $1\\,\\text{F} = 1\\,\\text{C}/\\text{V}$. Typische Werte liegen im Bereich $\\mu\\text{F}$ (Mikrofarad) bis $\\text{pF}$ (Pikofarad).',
    },
    {
      type: 'text',
      content:
        'Wird ein Elektron (Ladung $e$, Masse $m_e$) im Plattenkondensator durch die Beschleunigungsspannung $U_A$ von der Kathode zur Anode beschleunigt, gewinnt es kinetische Energie. Die potentielle Energie $e \\cdot U_A$ wird vollständig in kinetische Energie umgewandelt.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\frac{1}{2} m v^2 = e \\cdot U_A',
      variables: {
        m: 'Masse des Teilchens [kg]',
        v: 'Endgeschwindigkeit [m/s]',
        e: 'Elementarladung ($1{,}602 \\cdot 10^{-19}\\,\\text{C}$) [C]',
        'U_A': 'Beschleunigungsspannung [V]',
      },
    },
    {
      type: 'text',
      content:
        'Auflösen nach v ergibt: $v = \\sqrt{2e \\cdot U_A/m}$. Für ein Elektron mit $U_A = 100\\,\\text{V}$ erhält man $v \\approx 5{,}9 \\cdot 10^6\\,\\text{m/s}$.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'C = \\varepsilon_0 \\cdot \\varepsilon_r \\cdot \\frac{A}{d}',
      variables: {
        C: 'Kapazität [F]',
        '\\varepsilon_0': 'Elektrische Feldkonstante ($8{,}854 \\cdot 10^{-12}\\,\\text{F}/\\text{m}$)',
        '\\varepsilon_r': 'Relative Permittivität des Dielektrikums',
        A: 'Plattenfläche [m²]',
        d: 'Plattenabstand [m]',
      },
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du ein Experiment planen können, um die Kapazität eines Kondensators zu bestimmen. Dies kann über die Entladung (Messung von Q über die Stromstärke-Zeit-Fläche) oder über die Ladekurve erfolgen.',
    },
    {
      type: 'tip',
      content:
        'Die im Kondensator gespeicherte Energie beträgt $W = \\frac{1}{2} C U^2 = \\frac{1}{2} Q U$. Beim Entladen wird diese Energie im Widerstand in Wärme umgewandelt.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-kond-1',
      type: 'multiple-choice',
      question: 'Welche Einheit hat die Kapazität?',
      options: ['C/s', 'V/C', 'F (Farad)', 'J/V'],
      correct: 2,
      explanation: 'Die Kapazität hat die Einheit Farad (F). Es gilt 1 F = 1 C/V.',
    },
    {
      id: 'cc-kond-2',
      type: 'formula-select',
      question: 'Wie berechnet man die Geschwindigkeit eines Elektrons nach Beschleunigung durch U_A?',
      options: ['$v = e \\cdot U_A/m$', '$v = \\sqrt{2e \\cdot U_A/m}$', '$v = 2e \\cdot U_A/m$', '$v = e \\cdot U_A/(2m)$'],
      correct: 1,
      explanation: 'Aus $\\frac{1}{2}mv^2 = e \\cdot U_A$ folgt $v = \\sqrt{2e \\cdot U_A/m}$. Die kinetische Energie entspricht der geleisteten Arbeit $e \\cdot U_A$.',
    },
    {
      id: 'cc-kond-3',
      type: 'multiple-choice',
      question: 'Wie ändert sich die Kapazität beim Plattenkondensator, wenn der Abstand d halbiert wird?',
      options: ['Sie halbiert sich', 'Sie verdoppelt sich', 'Sie vervierfacht sich', 'Sie bleibt gleich'],
      correct: 1,
      explanation: 'Da $C \\propto 1/d$, verdoppelt sich die Kapazität bei Halbierung des Abstands.',
    },
  ],
  summaryChecklist: [
    'Definition $C = \\frac{Q}{U}$ mit Einheit Farad',
    'Energiebilanz $\\frac{1}{2}mv^2 = e \\cdot U_A$ herleiten und anwenden',
    'Geometrische Formel $C = \\varepsilon_0 \\cdot \\varepsilon_r \\cdot \\frac{A}{d}$ kennen',
    '(eA) Experiment zur Kapazitätsbestimmung planen',
  ],
};

// --- Lektion 3: Entladevorgang des Kondensators ---
export const entladevorgang: LessonContent = {
  intro:
    'Schließt man einen geladenen Kondensator über einen Widerstand, entlädt er sich. Der Strom und die Spannung nehmen dabei exponentiell ab. In dieser Lektion lernst du die mathematische Beschreibung des Entladevorgangs und die Bedeutung der Zeitkonstante $\\tau = R \\cdot C$.',
  learningGoals: [
    'Die Exponentialfunktion $I(t) = I_0 \\cdot e^{-t/\\tau}$ für den Entladestrom anwenden',
    'Die Zeitkonstante $\\tau = R \\cdot C$ erklären und aus Diagrammen ermitteln',
    'Die Fläche unter der I-t-Kurve als Ladung Q interpretieren',
    '(eA) Den exponentiellen Verlauf aus der Differentialgleichung begründen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Beim Entladevorgang fließt ein Strom I(t) vom Kondensator durch den Widerstand. Da die Spannung am Kondensator proportional zur verbleibenden Ladung ist, nimmt der Strom mit der Zeit ab. Die Abnahme folgt einer Exponentialfunktion.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'I(t) = I_0 \\cdot e^{-t/(RC)}',
      variables: {
        'I(t)': 'Stromstärke zum Zeitpunkt t [A]',
        'I_0': 'Anfangsstrom (bei t=0) [A]',
        t: 'Zeit [s]',
        R: 'Widerstand [Ω]',
        C: 'Kapazität [F]',
      },
    },
    {
      type: 'formula',
      content: '',
      formula: '\\tau = R \\cdot C',
      variables: {
        '\\tau': 'Zeitkonstante [s]',
        R: 'Widerstand [Ω]',
        C: 'Kapazität [F]',
      },
    },
    {
      type: 'remember',
      content:
        'Nach der Zeit $t = \\tau$ ist der Strom auf etwa 37% des Anfangswerts abgefallen ($e^{-1} \\approx 0{,}37$). Nach $t = 5\\tau$ ist der Kondensator praktisch entladen. Die Halbwertszeit beträgt $T_{1/2} = \\ln(2) \\cdot \\tau \\approx 0{,}69 \\cdot \\tau$.',
    },
    {
      type: 'text',
      content:
        'Die Fläche unter der I-t-Kurve von $t=0$ bis $t = \\infty$ entspricht der gesamten entladenen Ladung $Q$. Es gilt: $Q = \\int I(t)\\,\\mathrm{d}t = I_0 \\cdot \\tau = I_0 \\cdot R \\cdot C = U_0 \\cdot C$ (da $I_0 = U_0/R$).',
    },
    {
      type: 'text',
      content:
        'Aus einem $I$-$t$- oder $U$-$t$-Diagramm kann man $\\tau$ ermitteln: Zeichne die Tangente an $t=0$; deren Schnittpunkt mit der $t$-Achse liegt bei $t=\\tau$. Alternativ liest man den Zeitpunkt ab, zu dem der Wert auf 37% gefallen ist.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du den exponentiellen Verlauf begründen können. Aus $U_C = Q/C$ und $I = -\\mathrm{d}Q/\\mathrm{d}t$ sowie $U_R = R \\cdot I$ folgt die Differentialgleichung $\\mathrm{d}Q/\\mathrm{d}t = -Q/(RC)$, deren Lösung $Q(t) = Q_0 \\cdot e^{-t/\\tau}$ ist.',
    },
    {
      type: 'tip',
      content:
        'Analog gilt für die Spannung: $U(t) = U_0 \\cdot e^{-t/\\tau}$. Die gleiche Exponentialfunktion beschreibt auch radioaktiven Zerfall und andere Abklingprozesse.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-entl-1',
      type: 'multiple-choice',
      question: 'Was gibt die Zeitkonstante $\\tau = R \\cdot C$ physikalisch an?',
      options: [
        'Die Zeit bis zur vollständigen Entladung',
        'Die Zeit, nach der Strom/Spannung auf 37% gefallen sind',
        'Die Halbwertszeit',
        'Die Periodendauer der Schwingung',
      ],
      correct: 1,
      explanation: 'Nach $t = \\tau$ ist $e^{-1} \\approx 0{,}37$. Der Wert ist also auf 37% des Anfangswerts abgefallen.',
    },
    {
      id: 'cc-entl-2',
      type: 'formula-select',
      question: 'Wie lautet der Entladestrom I(t) beim Kondensator?',
      options: [
        '$I(t) = I_0 \\cdot t/(RC)$',
        '$I(t) = I_0 \\cdot e^{-t/(RC)}$',
        '$I(t) = I_0 \\cdot (1 - t/(RC))$',
        '$I(t) = I_0 \\cdot \\sin(t/(RC))$',
      ],
      correct: 1,
      explanation: 'Der Entladestrom nimmt exponentiell ab: $I(t) = I_0 \\cdot e^{-t/\\tau}$ mit $\\tau = R \\cdot C$.',
    },
    {
      id: 'cc-entl-3',
      type: 'multiple-choice',
      question: 'Was stellt die Fläche unter der I-t-Kurve beim Entladevorgang dar?',
      options: ['Die Leistung', 'Die Energie', 'Die Ladung Q', 'Die Spannung'],
      correct: 2,
      explanation: 'Da I = dQ/dt, gilt Q = ∫I dt. Die Fläche unter der Kurve ist die entladene Ladung.',
    },
  ],
  summaryChecklist: [
    'Exponentialfunktion $I(t) = I_0 \\cdot e^{-t/(RC)}$ anwenden',
    'Zeitkonstante $\\tau = R \\cdot C$ erklären und aus Diagramm ermitteln',
    'Fläche unter I-t-Kurve = Ladung Q',
    '(eA) Exponentiellen Verlauf aus DGL begründen',
  ],
  interactiveComponent: 'DecayAnimation',
  uncertaintyHint:
    'Bei der Auswertung von I-t- oder U-t-Diagrammen: Gib alle Messwerte mit korrekter Anzahl signifikanter Stellen an. Die relative Unsicherheit von $\\tau$ ergibt sich aus der grafischen Auswertung (Tangente, 37%-Methode) – berücksichtige Ableseungenauigkeiten.',
};

// --- Lektion 4: Magnetische Flussdichte B ---
export const flussdichte: LessonContent = {
  intro:
    'Die magnetische Flussdichte $B$ beschreibt die Stärke eines Magnetfelds und seine Wirkung auf stromdurchflossene Leiter. Sie ist analog zur elektrischen Feldstärke $E$ definiert. In dieser Lektion lernst du die Definition, die Dreifingerregel und das Stromwaage-Experiment kennen.',
  learningGoals: [
    'Die magnetische Flussdichte $B = F/(I \\cdot s)$ definieren',
    'Die Dreifingerregel anwenden (technische und physikalische Stromrichtung)',
    'Das Stromwaage-Experiment durchführen und auswerten',
    '(eA) Versuch planen, auswerten und mit Messdaten begründen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Ein stromdurchflossener Leiter der Länge s erfährt in einem Magnetfeld eine Kraft F. Diese Kraft ist proportional zu Stromstärke I, Leiterlänge s und der magnetischen Flussdichte B. Die Flussdichte beschreibt somit die „Stärke" des Magnetfelds.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'B = \\frac{F}{I \\cdot s}',
      variables: {
        B: 'Magnetische Flussdichte [$T = \\text{Tesla} = N/(A \\cdot m)$]',
        F: 'Kraft auf den Leiter [N]',
        I: 'Stromstärke [A]',
        s: 'Länge des Leiterabschnitts im Feld [m]',
      },
    },
    {
      type: 'remember',
      content:
        'Die Einheit der Flussdichte ist Tesla (T): $1\\,\\text{T} = 1\\,\\text{N}/(\\text{A} \\cdot \\text{m})$. Das Erdmagnetfeld hat etwa $50\\,\\mu\\text{T}$, ein starker Permanentmagnet etwa $1\\,\\text{T}$.',
    },
    {
      type: 'text',
      content:
        'Die Dreifingerregel gibt die Richtung der Kraft an: Zeigefinger = Magnetfeld (N→S), Mittelfinger = technische Stromrichtung (+→−), Daumen = Kraft. Bei physikalischer Stromrichtung (Elektronenfluss) die linke Hand verwenden.',
    },
    {
      type: 'experiment',
      content:
        'Stromwaage-Experiment: Ein U-förmiger Leiter befindet sich im Magnetfeld eines Hufeisenmagneten. Fließt Strom, wirkt eine Kraft, die über einen Waagebalken messbar ist. Aus F, I und s lässt sich B berechnen. Die Kraft wirkt senkrecht zu B und I.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du den Versuch planen (Aufbau, Messgrößen), die Auswertung durchführen (B berechnen, Fehlerbetrachtung) und die Messergebnisse physikalisch begründen können. Beachte die Messunsicherheiten bei der Auswertung.',
    },
    {
      type: 'tip',
      content:
        'Die Kraft auf einen geraden Leiter lässt sich auch schreiben als $F = B \\cdot I \\cdot s \\cdot \\sin(\\alpha)$, wobei $\\alpha$ der Winkel zwischen Leiter und Feldrichtung ist. Steht der Leiter senkrecht zum Feld, ist $\\sin(\\alpha) = 1$.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-fluss-1',
      type: 'multiple-choice',
      question: 'Welche Einheit hat die magnetische Flussdichte B?',
      options: ['N/A', 'T (Tesla)', '$\\text{V} \\cdot \\text{s}/\\text{m}^2$', 'A/m'],
      correct: 1,
      explanation: 'Die magnetische Flussdichte hat die Einheit Tesla (T). Es gilt $1\\,\\text{T} = 1\\,\\text{N}/(\\text{A} \\cdot \\text{m})$.',
    },
    {
      id: 'cc-fluss-2',
      type: 'formula-select',
      question: 'Wie ist die magnetische Flussdichte definiert?',
      options: ['$B = F \\cdot I \\cdot s$', '$B = F/(I \\cdot s)$', '$B = I/(F \\cdot s)$', '$B = F \\cdot s/I$'],
      correct: 1,
      explanation: 'Die magnetische Flussdichte ist definiert als $B = F/(I \\cdot s)$, analog zu $E = F/q$ beim elektrischen Feld.',
    },
  ],
  summaryChecklist: [
    'Definition $B = F/(I \\cdot s)$ mit Einheit Tesla',
    'Dreifingerregel für Kraftrichtung anwenden',
    'Stromwaage-Experiment: B aus F, I, s berechnen',
    '(eA) Versuch planen und auswerten',
  ],
  uncertaintyHint:
    'Bei der Stromwaage: Die Flussdichte $B = F/(I \\cdot s)$ hängt von drei Messgrößen ab. Für die Auswertung musst du die Unsicherheiten von $F$, $I$ und $s$ berücksichtigen. Bei Produkten und Quotienten: Die relative Unsicherheit des Ergebnisses ergibt sich aus der Summe der relativen Unsicherheiten der Eingangsgrößen.',
};

// --- Lektion 5: Lorentzkraft & Bahnkurven ---
export const lorentzkraft: LessonContent = {
  intro:
    'Bewegte Ladungen erfahren in einem Magnetfeld die Lorentzkraft. Sie wirkt senkrecht zur Bewegungsrichtung und zur Feldrichtung und zwingt geladene Teilchen auf Kreis- oder Schraubenbahnen. In dieser Lektion lernst du die Lorentzkraft, die Kreisbahn im B-Feld und die Parabelbahn im E-Feld kennen.',
  learningGoals: [
    'Die Lorentzkraft $F_L = q \\cdot v \\cdot B$ anwenden',
    'Die Kreisbahn im homogenen B-Feld analysieren ($r = mv/(qB)$)',
    'Die Parabelbahn im E-Feld beschreiben ($s_y \\propto s_x^2$)',
    'Den Wien-Filter ($v = E/B$) erklären',
    '(eA) Bahnkurvengleichungen herleiten',
  ],
  sections: [
    {
      type: 'formula',
      content: '',
      formula: 'F_L = q \\cdot v \\cdot B',
      variables: {
        'F_L': 'Lorentzkraft [N]',
        q: 'Ladung des Teilchens [C]',
        v: 'Geschwindigkeit senkrecht zu B [m/s]',
        B: 'Magnetische Flussdichte [T]',
      },
    },
    {
      type: 'text',
      content:
        'Die Lorentzkraft wirkt immer senkrecht zur Bewegungsrichtung. Sie ändert nur die Richtung, nicht den Betrag der Geschwindigkeit. Im homogenen B-Feld ergibt sich daher eine Kreisbahn. Die Lorentzkraft wirkt als Zentripetalkraft.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'r = \\frac{m \\cdot v}{q \\cdot B}',
      variables: {
        r: 'Kreisradius [m]',
        m: 'Teilchenmasse [kg]',
        v: 'Geschwindigkeit [m/s]',
        q: 'Ladung [C]',
        B: 'Flussdichte [T]',
      },
    },
    {
      type: 'text',
      content:
        'Im elektrischen Feld (Plattenkondensator) wirkt $F = q \\cdot E$ konstant in eine Richtung. Ein geladenes Teilchen mit Anfangsgeschwindigkeit $v_0$ in x-Richtung beschreibt eine Parabel: $s_y = \\frac{1}{2} \\cdot \\frac{qU}{md} \\cdot \\frac{1}{v_0^2} \\cdot s_x^2$.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'v = \\frac{E}{B}',
      variables: {
        v: 'Geschwindigkeit der durchgelassenen Teilchen [m/s]',
        E: 'Elektrische Feldstärke [V/m]',
        B: 'Magnetische Flussdichte [T]',
      },
    },
    {
      type: 'text',
      content:
        'Im Wien-Filter stehen E- und B-Feld senkrecht. Nur Teilchen mit exakt $v = E/B$ werden nicht abgelenkt und können den Filter passieren. So kann man Teilchen einer bestimmten Geschwindigkeit auswählen.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du die Bahnkurvengleichungen herleiten: Aus $F_L = F_Z$ folgt $mv^2/r = qvB$, also $r = mv/(qB)$. Für die Parabel im E-Feld: $a_y = qE/m$, $s_y = \\frac{1}{2}a_y \\cdot t^2$ mit $t = s_x/v_0$.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-lor-1',
      type: 'multiple-choice',
      question: 'Welche Aussage zur Lorentzkraft ist richtig?',
      options: [
        'Sie beschleunigt Teilchen in Bewegungsrichtung',
        'Sie wirkt senkrecht zu v und B',
        'Sie hängt nicht von der Ladung ab',
        'Sie wird im Wien-Filter zum Abbremsen genutzt',
      ],
      correct: 1,
      explanation: 'Die Lorentzkraft wirkt senkrecht sowohl zur Geschwindigkeit als auch zur magnetischen Flussdichte.',
    },
    {
      id: 'cc-lor-2',
      type: 'formula-select',
      question: 'Wie lautet die Bedingung beim Wien-Filter für durchgelassene Teilchen?',
      options: ['$v = E \\cdot B$', '$v = E/B$', '$v = B/E$', '$v = E + B$'],
      correct: 1,
      explanation: 'Nur Teilchen mit $v = E/B$ werden weder vom E-Feld noch vom B-Feld abgelenkt und passieren den Filter.',
    },
  ],
  summaryChecklist: [
    'Lorentzkraft $F_L = q \\cdot v \\cdot B$',
    'Kreisradius $r = mv/(qB)$ im B-Feld',
    'Parabelbahn im E-Feld',
    'Wien-Filter: $v = E/B$',
    '(eA) Herleitungen der Bahnkurvengleichungen',
  ],
  interactiveComponent: 'LorentzField',
  uncertaintyHint:
    'Bei Experimenten mit Wien-Filter oder Fadenstrahlrohr: $v = E/B$ bzw. $e/m = v/(r \\cdot B)$ enthalten mehrere Messgrößen. Die relative Unsicherheit von $v$ ergibt sich aus den relativen Unsicherheiten von $E$ und $B$. Für zusammengesetzte Größen gelten die Regeln für Produkte und Quotienten.',
};

// --- Lektion 6: e/m-Bestimmung (Fadenstrahlrohr) ---
export const emBestimmung: LessonContent = {
  intro:
    'Im Fadenstrahlrohr werden Elektronen durch eine Spannung beschleunigt und im Magnetfeld auf eine Kreisbahn gezwungen. Aus Spannung, Magnetfeld und Kreisradius lässt sich die spezifische Ladung e/m_e und damit die Elektronenmasse bestimmen.',
  learningGoals: [
    'Den Aufbau des Fadenstrahlrohrs beschreiben',
    'Die Beziehung $e/m_e = v/(r \\cdot B)$ herleiten und anwenden',
    'Die Elektronenmasse aus $m_e = (B^2 \\cdot r^2)/(2 \\cdot U_A) \\cdot e$ berechnen',
    '(eA) Die vollständige Herleitung durchführen',
  ],
  sections: [
    { type: 'text', content: 'Im Fadenstrahlrohr treten Elektronen aus einer Glühkathode aus, werden durch die Anodenspannung U_A beschleunigt und treten danach senkrecht in ein homogenes B-Feld ein. Dort beschreiben sie eine Kreisbahn mit Radius r. Aus v, B und r kann e/m_e bestimmt werden.' },
    { type: 'formula', content: '', formula: '\\frac{e}{m_e} = \\frac{v}{r \\cdot B}', variables: { e: 'Elementarladung [C]', 'm_e': 'Elektronenmasse [kg]', v: 'Geschwindigkeit [m/s]', r: 'Kreisradius [m]', B: 'Magnetische Flussdichte [T]' } },
    { type: 'text', content: 'Die Geschwindigkeit erhält man aus der Energiebilanz: $\\frac{1}{2}m_e v^2 = e \\cdot U_A$, also $v = \\sqrt{2e \\cdot U_A/m_e}$. Setzt man dies in die Kreisbahnbedingung $r = m_e v/(eB)$ ein und löst nach $e/m_e$ auf, erhält man $e/m_e = 2 \\cdot U_A/(B^2 \\cdot r^2)$.' },
    { type: 'formula', content: '', formula: 'm_e = \\frac{B^2 \\cdot r^2}{2 \\cdot U_A} \\cdot e', variables: { 'm_e': 'Elektronenmasse [kg]', B: 'Flussdichte [T]', r: 'Kreisradius [m]', 'U_A': 'Beschleunigungsspannung [V]', e: 'Elementarladung [C]' } },
    { type: 'remember', content: 'Die spezifische Ladung des Elektrons beträgt $e/m_e \\approx 1{,}76 \\cdot 10^{11}\\,\\text{C}/\\text{kg}$. Daraus folgt $m_e \\approx 9{,}1 \\cdot 10^{-31}\\,\\text{kg}$.' },
    { type: 'ea', content: 'Auf erhöhtem Anforderungsniveau sollst du die vollständige Herleitung durchführen: 1) Energieerhaltung für v, 2) Lorentzkraft = Zentripetalkraft für r, 3) Auflösen der Gleichungen nach e/m_e bzw. m_e.' },
  ],
  conceptChecks: [
    { id: 'cc-em-1', type: 'multiple-choice', question: 'Wie erhält man die Geschwindigkeit der Elektronen im Fadenstrahlrohr?', options: ['Aus der Lorenzkraft', 'Aus der Energiebilanz $\\frac{1}{2}mv^2 = e \\cdot U_A$', 'Aus dem Ohmschen Gesetz', 'Aus der Kapazität'], correct: 1, explanation: 'Die kinetische Energie nach der Beschleunigung entspricht der Arbeit $e \\cdot U_A$. Daraus folgt $v = \\sqrt{2e \\cdot U_A/m_e}$.' },
    { id: 'cc-em-2', type: 'formula-select', question: 'Welcher Zusammenhang gilt für e/m_e im Fadenstrahlrohr?', options: ['$e/m_e = r \\cdot B/v$', '$e/m_e = v/(r \\cdot B)$', '$e/m_e = v \\cdot r \\cdot B$', '$e/m_e = B/(v \\cdot r)$'], correct: 1, explanation: 'Aus der Kreisbahnbedingung $r = mv/(qB)$ folgt für Elektronen: $e/m_e = v/(r \\cdot B)$.' },
  ],
  summaryChecklist: ['Aufbau Fadenstrahlrohr: Kathode, Anode, B-Feld', '$e/m_e = v/(r \\cdot B)$ und $v$ aus $\\frac{1}{2}mv^2 = e \\cdot U_A$', '$m_e = (B^2 r^2)/(2 U_A) \\cdot e$', '(eA) Vollständige Herleitung'],
  uncertaintyHint:
    'Bei der e/m-Bestimmung hängt das Ergebnis von $U_A$, $B$ und $r$ ab. Da $e/m \\propto U_A/(B^2 r^2)$, tragen die Unsicherheiten von $B$ und $r$ am stärksten bei (Potenz 2). Gib das Endergebnis mit korrekter Anzahl signifikanter Stellen an.',
};

// --- Lektion 7: Hallspannung ---
export const hallspannung: LessonContent = {
  intro:
    'Fließt ein Strom durch einen Leiter im Magnetfeld, entsteht senkrecht zu Strom und Feld die Hallspannung. Sie entsteht durch die Ablenkung der Ladungsträger durch die Lorentzkraft und ermöglicht die Bestimmung der Ladungsträgerdichte.',
  learningGoals: [
    'Die Entstehung der Hallspannung erklären',
    'Die Formel $U_H = R_H \\cdot (I \\cdot B)/d$ mit $R_H = 1/(n \\cdot e)$ anwenden',
    'Die Hallspannung aus einer Skizze ableiten',
    '(eA) Die Herleitung mit Ladungsträgerdichte durchführen',
  ],
  sections: [
    { type: 'text', content: 'Ein stromdurchflossener Leiter (z.B. eine dünne Platte) befindet sich in einem Magnetfeld senkrecht zum Strom. Die Lorentzkraft lenkt die Ladungsträger zur Seite ab. Es entsteht eine Ladungstrennung und damit eine Spannung U_H (Hallspannung) senkrecht zum Strom.' },
    { type: 'formula', content: '', formula: 'U_H = R_H \\cdot \\frac{I \\cdot B}{d}', variables: { 'U_H': 'Hallspannung [V]', 'R_H': 'Hall-Konstante [m³/C]', I: 'Stromstärke [A]', B: 'Magnetische Flussdichte [T]', d: 'Dicke des Leiters in B-Richtung [m]' } },
    { type: 'formula', content: '', formula: 'R_H = \\frac{1}{n \\cdot e}', variables: { 'R_H': 'Hall-Konstante [m³/C]', n: 'Ladungsträgerdichte [1/m³]', e: 'Elementarladung [C]' } },
    { type: 'text', content: 'Vollständig: $U_H = R_H \\cdot (I \\cdot B)/d$. Bei einer Platte der Breite $b$ in Stromrichtung gilt: $U_H = (1/(n \\cdot e)) \\cdot (I \\cdot B)/d$. Die Hallspannung ist proportional zu $I$ und $B$, und antiproportional zu $n$ und $d$. Mit der Hallspannung kann man $n$ und die Vorzeichen der Ladungsträger bestimmen.' },
    { type: 'ea', content: 'Auf erhöhtem Anforderungsniveau sollst du die Herleitung mit der Ladungsträgerdichte durchführen: Im Gleichgewicht kompensiert das Hall-Feld $E_H$ die Lorentzkraft: $e \\cdot E_H = e \\cdot v \\cdot B$. Mit $I = n \\cdot e \\cdot v \\cdot A$ und $A = b \\cdot d$ sowie $U_H = E_H \\cdot b$ erhält man die Hallspannung.' },
    { type: 'tip', content: 'Hall-Sensoren nutzen die Hallspannung zur Messung von Magnetfeldern (z.B. in Fahrzeugen für ABS) oder zur berührungslosen Strommessung.' },
  ],
  conceptChecks: [
    { id: 'cc-hall-1', type: 'multiple-choice', question: 'Wodurch entsteht die Hallspannung?', options: ['Durch den Stromfluss allein', 'Durch die Lorentzkraft-Ablenkung der Ladungsträger', 'Durch die Erwärmung des Leiters', 'Durch Induktion'], correct: 1, explanation: 'Die Lorentzkraft lenkt die bewegten Ladungsträger zur Seite ab. Die Ladungstrennung erzeugt die Hallspannung.' },
    { id: 'cc-hall-2', type: 'multiple-choice', question: 'Wovon hängt die Hall-Konstante R_H ab?', options: ['Von der Stromstärke', 'Von der Ladungsträgerdichte n', 'Von der Magnetfeldstärke', 'Von der Leiterlänge'], correct: 1, explanation: 'Es gilt $R_H = 1/(n \\cdot e)$. Die Hall-Konstante hängt von der Ladungsträgerdichte $n$ ab.' },
  ],
  summaryChecklist: ['Entstehung: Lorentzkraft $\\to$ Ladungstrennung $\\to$ $U_H$', '$U_H = R_H \\cdot (I \\cdot B)/d$', '$R_H = 1/(n \\cdot e)$', '(eA) Herleitung mit Ladungsträgerdichte'],
};

// --- Lektion 8: Induktionsgesetz ---
export const induktionsgesetz: LessonContent = {
  intro:
    'Ändert sich der magnetische Fluss Φ durch eine Leiterschleife, wird eine Spannung induziert. Das Induktionsgesetz verknüpft die induzierte Spannung mit der zeitlichen Änderung des Flusses. In dieser Lektion lernst du die qualitative und quantitative Beschreibung der Induktion.',
  learningGoals: [
    'Die qualitative Abhängigkeit $U_{ind} \\sim \\Delta B/\\Delta t$ und $U_{ind} \\sim \\Delta A/\\Delta t$ erklären',
    'Das Induktionsgesetz $U_{ind} = -N \\cdot \\Delta\\Phi/\\Delta t$ anwenden',
    'Lineare und sinusförmige Verläufe auswerten',
    '(eA) Versuchsdiagramme auswerten',
  ],
  sections: [
    { type: 'text', content: 'Bewegt man einen Magneten in eine Spule oder ändert man die von einer Spule umfasste Fläche in einem Magnetfeld, wird eine Spannung induziert. Die induzierte Spannung $U_{ind}$ ist proportional zur Änderungsrate des magnetischen Flusses $\\Phi$.' },
    { type: 'formula', content: '', formula: 'U_{ind} = -N \\cdot \\frac{\\Delta \\Phi}{\\Delta t}', variables: { 'U_{ind}': 'Induzierte Spannung [V]', N: 'Windungszahl der Spule', '\\Phi': 'Magnetischer Fluss ($\\Phi = B \\cdot A$) [Wb = $T \\cdot m^2$]', t: 'Zeit [s]' } },
    { type: 'remember', content: 'Das negative Vorzeichen (Lenzsche Regel): Der Induktionsstrom wirkt seiner Ursache entgegen. Der magnetische Fluss $\\Phi = B \\cdot A \\cdot \\cos(\\alpha)$ ist das Produkt aus Flussdichte, Fläche und Kosinus des Winkels.' },
    { type: 'text', content: 'Qualitativ: $U_{ind}$ ist groß, wenn sich $B$ schnell ändert (starker Magnet, schnelle Bewegung) oder wenn sich die Fläche $A$ schnell ändert (große Spule, schnelle Rotation). Bei konstantem $\\Phi$ ist $U_{ind} = 0$.' },
    { type: 'text', content: 'Lineare Änderung: $\\Delta\\Phi/\\Delta t$ konstant $\\to$ konstante $U_{ind}$. Sinusförmige Änderung (z.B. rotierende Spule): $\\Phi(t) = \\Phi_0 \\cdot \\sin(\\omega t)$ $\\to$ $U_{ind} = -N \\cdot \\Phi_0 \\cdot \\omega \\cdot \\cos(\\omega t)$. Die induzierte Spannung ist ebenfalls sinusförmig, aber um 90° phasenverschoben.' },
    { type: 'ea', content: 'Auf erhöhtem Anforderungsniveau sollst du Versuchsdiagramme auswerten können: Aus der Steigung der Φ-t-Kurve die induzierte Spannung bestimmen, aus U_ind(t) auf den Verlauf von Φ schließen, und die Lenzsche Regel anwenden.' },
    { type: 'tip', content: 'Das Induktionsgesetz ist die Grundlage für Generatoren, Transformatoren und viele Sensoren. In einem Fahrraddynamo wird durch Rotation der Spule im Magnetfeld eine Wechselspannung erzeugt.' },
  ],
  conceptChecks: [
    { id: 'cc-ind-1', type: 'multiple-choice', question: 'Was besagt die Lenzsche Regel?', options: ['$U_{ind}$ ist proportional zu $\\Phi$', 'Der Induktionsstrom wirkt seiner Ursache entgegen', 'Die Induktion hängt nicht von $N$ ab', '$U_{ind} = N \\cdot \\Phi \\cdot t$'], correct: 1, explanation: 'Die Lenzsche Regel: Der Induktionsstrom ist stets so gerichtet, dass er der Ursache der Induktion entgegenwirkt. Daher das negative Vorzeichen in $U_{ind} = -N \\cdot \\Delta\\Phi/\\Delta t$.' },
    { id: 'cc-ind-2', type: 'formula-select', question: 'Wie lautet das Induktionsgesetz?', options: ['$U_{ind} = N \\cdot \\Phi \\cdot t$', '$U_{ind} = -N \\cdot \\Delta\\Phi/\\Delta t$', '$U_{ind} = \\Phi/(N \\cdot t)$', '$U_{ind} = N \\cdot \\Phi + t$'], correct: 1, explanation: 'Das Induktionsgesetz lautet $U_{ind} = -N \\cdot \\Delta\\Phi/\\Delta t$. Die induzierte Spannung ist proportional zur Änderungsrate des magnetischen Flusses.' },
    { id: 'cc-ind-3', type: 'multiple-choice', question: 'Wann ist die induzierte Spannung am größten?', options: ['Bei konstantem $\\Phi$', 'Wenn sich $\\Phi$ möglichst schnell ändert', 'Wenn $B = 0$', 'Bei Gleichstrom'], correct: 1, explanation: '$U_{ind}$ ist proportional zu $\\Delta\\Phi/\\Delta t$. Je schneller sich der magnetische Fluss ändert, desto größer die induzierte Spannung.' },
  ],
  summaryChecklist: ['Qualitativ: $U_{ind} \\sim \\Delta B/\\Delta t$ und $U_{ind} \\sim \\Delta A/\\Delta t$', '$U_{ind} = -N \\cdot \\Delta\\Phi/\\Delta t$ (Lenzsche Regel)', '$\\Phi = B \\cdot A \\cdot \\cos(\\alpha)$', '(eA) Versuchsdiagramme auswerten'],
  uncertaintyHint:
    'Bei der Auswertung von Induktionsversuchen: Aus der Steigung $\\Delta\\Phi/\\Delta t$ ergibt sich $U_{ind}$. Die Unsicherheit der Steigung (aus grafischer Auswertung oder Regression) bestimmt die Unsicherheit von $U_{ind}$. Gib Zeit- und Spannungswerte mit sinnvollen signifikanten Stellen an.',
};
