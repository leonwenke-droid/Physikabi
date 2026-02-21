import type { LessonContent } from '@/lib/types';

/**
 * Lektionsinhalte Modul 4: Atomhülle & Atomkern
 * Basiert auf: Inhalte + Themen Atomhülle-Atomkern eN.pdf
 */

// --- Lektion 1: Eindimensionaler Potenzialtopf ---
export const potenzialtopf: LessonContent = {
  intro:
    'Im eindimensionalen Potenzialtopf sind Elektronen in einem Kasten der Länge L eingeschlossen. Wie bei stehenden Wellen entstehen diskrete Energieniveaus. Das Modell erklärt quantenmechanische Randbedingungen und die Quantisierung der Energie.',
  learningGoals: [
    'Die Energieformel $E_n = h^2/(8 \\cdot m_e \\cdot L^2) \\cdot n^2$ anwenden',
    'Die Herleitung über stehende Wellen und Randbedingungen nachvollziehen',
    'Aussagekraft und Grenzen des Modells beurteilen',
    '(eA) Vollständige Herleitung durchführen, Modell kritisch bewerten',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Ein Teilchen der Masse $m_e$ ist in einem eindimensionalen Kasten ($0 \\leq x \\leq L$) eingeschlossen. An den Wänden muss die Wellenfunktion verschwinden — analog zu einer schwingenden Saite. Es entstehen stehende Wellen mit $\\lambda_n = 2L/n$ für $n = 1, 2, 3, \\ldots$',
    },
    {
      type: 'formula',
      content: '',
      formula: 'E_n = \\frac{h^2}{8 \\cdot m_e \\cdot L^2} \\cdot n^2 \\quad \\text{für } n = 1, 2, 3, \\ldots',
      variables: {
        'E_n': 'Energie des n-ten Niveaus [J]',
        h: 'Plancksches Wirkungsquantum [$\\text{J} \\cdot \\text{s}$]',
        'm_e': 'Elektronenmasse [kg]',
        L: 'Länge des Potenzialtopfs [m]',
        n: 'Quantenzahl',
      },
    },
    {
      type: 'remember',
      content:
        'Grundzustand: $n = 1$, niedrigste Energie. Die Energien nehmen quadratisch mit $n$ zu: $E_n \\propto n^2$. Das Modell ist vereinfacht — reale Atome haben Coulomb-Potenzial und dreidimensionale Geometrie. Trotzdem zeigt es Kernideen: Quantisierung, diskrete Niveaus.',
    },
    {
      type: 'text',
      content:
        'Herleitung: Aus de-Broglie $\\lambda = h/p$ und $p = \\sqrt{2m_e \\cdot E}$ folgt für stehende Wellen mit $\\lambda_n = 2L/n$: $E_n = h^2/(8m_e \\cdot L^2) \\cdot n^2$. Die Randbedingungen ($\\psi = 0$ an den Wänden) erzwingen ganzzahlige Vielfache der halben Wellenlänge.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du die vollständige Herleitung durchführen: 1) Randbedingungen, 2) Wellenzahl $k_n = n\\pi/L$, 3) Energie $E = p^2/(2m) = \\hbar^2 k^2/(2m)$. Außerdem: Grenzen des Modells diskutieren (kein Coulomb-Potenzial, nur 1D, unendlich hohe Wände).',
    },
    {
      type: 'tip',
      content:
        'Typische Größenordnung: $L = 0{,}1\\,\\text{nm}$ (Atomradius) $\\to$ $E_1 \\approx 37\\,\\text{eV}$. Die Anregungsenergien liegen im eV-Bereich, passend zu optischen Übergängen.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-pot-1',
      type: 'formula-select',
      question: 'Wie hängt die Energie E_n im Potenzialtopf von der Quantenzahl n ab?',
      options: ['$E_n \\propto n$', '$E_n \\propto n^2$', '$E_n \\propto 1/n$', '$E_n \\propto \\sqrt{n}$'],
      correct: 1,
      explanation: 'Die Energie nimmt quadratisch mit $n$ zu: $E_n = h^2/(8m_e L^2) \\cdot n^2$.',
    },
    {
      id: 'cc-pot-2',
      type: 'multiple-choice',
      question: 'Warum entstehen im Potenzialtopf diskrete Energieniveaus?',
      options: [
        'Wegen der Masse des Elektrons',
        'Wegen der Randbedingungen (stehende Wellen)',
        'Wegen der Temperatur',
        'Wegen des Magnetfelds',
      ],
      correct: 1,
      explanation: 'Die Randbedingungen an den Wänden erlauben nur stehende Wellen mit λ_n = 2L/n. Das führt zu diskreten Energien.',
    },
  ],
  summaryChecklist: [
    '$E_n = h^2/(8m_e \\cdot L^2) \\cdot n^2$',
    'Herleitung: stehende Wellen → diskrete Energien',
    'Grenzen: 1D, unendliche Wände, kein Coulomb',
    '(eA) Vollständige Herleitung, Kritik',
  ],
};

// --- Lektion 2: Linienspektren & Energieniveauschema ---
export const linienspektren: LessonContent = {
  intro:
    'Atome emittieren und absorbieren Licht nur bei bestimmten Wellenlängen — Linienspektren. Diese entsprechen Übergängen zwischen diskreten Energieniveaus. Die Balmerformel beschreibt die Wasserstoff-Serien; das Energieniveauschema liefert die Zuordnung Wellenlänge ↔ Energieübergang.',
  learningGoals: [
    'Emission und Absorption: $\\Delta E = E_m - E_n = h \\cdot f_{mn}$ anwenden',
    'Die Balmerformel $f = R \\cdot (1/2^2 - 1/m^2)$ für die Wasserstoff-Linien nutzen',
    'Wellenlänge und Energieübergang einander zuordnen',
    'Fluoreszenz und Wellenlängen-Intensitätsspektren beschreiben',
    '(eA) Wellenlängen berechnen, charakteristisches Röntgenspektrum deuten',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Angeregte Atome geben Energie als Licht ab — Emission. Umgekehrt absorbieren sie Licht genau der Energien, die Übergängen entsprechen. Die Wellenlänge $\\lambda$ einer Spektrallinie hängt mit der Energiedifferenz zusammen: $\\Delta E = h \\cdot f = hc/\\lambda$.',
    },
    {
      type: 'formula',
      content: '',
      formula: '\\Delta E = E_m - E_n = h \\cdot f_{mn} = \\frac{h \\cdot c}{\\lambda}',
      variables: {
        '\\Delta E': 'Energiedifferenz [J]',
        'E_m, E_n': 'Energieniveaus',
        'f_{mn}': 'Frequenz des Übergangs [Hz]',
        '\\lambda': 'Wellenlänge [m]',
      },
    },
    {
      type: 'formula',
      content: '',
      formula: 'f = R \\cdot \\left(\\frac{1}{2^2} - \\frac{1}{m^2}\\right) \\quad \\text{für } m = 3, 4, 5, \\ldots',
      variables: {
        f: 'Frequenz der Balmer-Linie [Hz]',
        R: 'Rydberg-Konstante [Hz]',
        m: 'Endniveau (n = 2 bei Balmer)',
      },
    },
    {
      type: 'remember',
      content:
        'Balmer-Serie: Übergänge nach n = 2 (sichtbar). Lyman nach n = 1 (UV), Paschen nach n = 3 (IR). Fluoreszenz: Kurzwellige Anregung, längere Wellenlänge bei Emission (Stokes-Verschiebung). Das charakteristische Röntgenspektrum entsteht durch innerste Schalen-Übergänge.',
    },
    {
      type: 'text',
      content:
        'Energieniveauschema: Zeichne die Niveaus E_n, markiere Übergänge mit Pfeilen. Die Pfeillänge entspricht ΔE, die Farbe der emittierten Strahlung. Wellenlängen-Intensitätsspektren zeigen die relative Helligkeit der Linien.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du Wellenlängen aus $\\Delta E$ berechnen ($\\lambda = hc/\\Delta E$) und das charakteristische Röntgenspektrum deuten: $K_\\alpha$, $K_\\beta$-Linien als Übergänge in die K-Schale.',
    },
    {
      type: 'tip',
      content:
        '$hc \\approx 1240\\,\\text{eV} \\cdot \\text{nm}$. Für $\\Delta E$ in eV: $\\lambda$ [nm] $\\approx 1240/\\Delta E$. Balmer $H_\\alpha$ ($n=3 \\to 2$): $\\lambda \\approx 656\\,\\text{nm}$.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-lin-1',
      type: 'formula-select',
      question: 'Wie hängt die Wellenlänge einer Spektrallinie mit der Energiedifferenz zusammen?',
      options: ['$\\Delta E = \\lambda/(hc)$', '$\\Delta E = hc/\\lambda$', '$\\Delta E = \\lambda \\cdot hc$', '$\\Delta E = h/\\lambda$'],
      correct: 1,
      explanation: 'Es gilt $\\Delta E = h \\cdot f = hc/\\lambda$. Je größer $\\Delta E$, desto kleiner die Wellenlänge.',
    },
    {
      id: 'cc-lin-2',
      type: 'multiple-choice',
      question: 'Welche Serie des Wasserstoffspektrums liegt im sichtbaren Bereich?',
      options: ['Lyman-Serie', 'Balmer-Serie', 'Paschen-Serie', 'Brackett-Serie'],
      correct: 1,
      explanation: 'Die Balmer-Serie (Übergänge nach $n=2$) liegt im sichtbaren Spektralbereich. Lyman ist UV, Paschen IR.',
    },
  ],
  summaryChecklist: [
    '$\\Delta E = h \\cdot f = hc/\\lambda$',
    'Balmer: $f = R \\cdot (1/2^2 - 1/m^2)$',
    'Zuordnung Wellenlänge ↔ Energieübergang',
    '(eA) Wellenlängen berechnen, Röntgenspektrum',
  ],
  interactiveComponent: 'EnergyLevels',
};

// --- Lektion 3: Franck-Hertz-Versuch ---
export const franckHertz: LessonContent = {
  intro:
    'Im Franck-Hertz-Versuch stoßen Elektronen mit Quecksilberatomen zusammen. Bei einer bestimmten Beschleunigungsspannung nehmen die Atome genau die Anregungsenergie auf — Resonanzabsorption. Die Franck-Hertz-Kennlinie zeigt regelmäßige Einbrüche des Anodenstroms.',
  learningGoals: [
    'Den Aufbau des Franck-Hertz-Versuchs beschreiben',
    'Die Anregungsenergie aus der Kennlinie ermitteln',
    'Die Franck-Hertz-Kennlinie auswerten',
    'Resonanzabsorption erklären',
    '(eA) Anregungsenergie aus der Kennlinie bestimmen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'In einer mit Quecksilberdampf gefüllten Röhre werden Elektronen von einer Glühkathode zur Anode beschleunigt. Bei ausreichender Energie können sie Quecksilberatome anregen. Die angeregten Atome geben die Energie als UV-Licht ab; die Elektronen verlieren kinetische Energie.',
    },
    {
      type: 'remember',
      content:
        'Franck-Hertz-Kennlinie: Anodenstrom I_A als Funktion der Beschleunigungsspannung U. Der Strom steigt an, fällt bei U ≈ 4,9 V (Anregungsenergie von Hg) stark ab, steigt wieder und zeigt weitere Einbrüche bei 9,8 V, 14,7 V usw. Der Abstand der Einbrüche entspricht der Anregungsenergie.',
    },
    {
      type: 'text',
      content:
        'Resonanzabsorption: Die Anregung geschieht nur, wenn die Elektronenenergie mindestens der Anregungsenergie $E_{anr}$ entspricht. Bei $E_{kin} \\approx E_{anr}$ wird die Energie praktisch vollständig übertragen — die Elektronen haben danach kaum noch Energie und erreichen die Anode nicht.',
    },
    {
      type: 'experiment',
      content:
        'Aufbau: Glühkathode, Gitter (Beschleunigung), Anode. Gegenspannung zwischen Gitter und Anode verhindert langsame Elektronen. Im Abstand $\\Delta U \\approx 4{,}9\\,\\text{V}$ zwischen den Minima erkennt man die Anregungsenergie des Quecksilber-Atoms ($6^1P_1$-Zustand).',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du aus einer vorgegebenen Franck-Hertz-Kennlinie die Anregungsenergie ermitteln: Abstand der Stromminima ablesen, in eV umrechnen, den Übergang am Energieniveauschema von Quecksilber zuordnen.',
    },
    {
      type: 'tip',
      content:
        'Die Anregungsenergie von Quecksilber beträgt etwa 4,9 eV. Das entspricht einer Wellenlänge von ca. 254 nm (UV).',
    },
  ],
  uncertaintyHint:
    'Bei der Auswertung der Franck-Hertz-Kennlinie: Der Abstand der Stromminima liefert die Anregungsenergie. Die Unsicherheit ergibt sich aus der Ableseungenauigkeit der Spannungsachse — typischerweise $\\pm 0{,}1\\,\\text{V}$. Gib $E_{anr}$ mit passender Genauigkeit an (z.B. $4{,}9 \\pm 0{,}1\\,\\text{eV}$).',
  conceptChecks: [
    {
      id: 'cc-fh-1',
      type: 'multiple-choice',
      question: 'Was zeigen die regelmäßigen Einbrüche in der Franck-Hertz-Kennlinie?',
      options: [
        'Die Kathode erhitzt sich',
        'Die Elektronen übertragen Energie an die Quecksilberatome (Anregung)',
        'Der Quecksilberdampf kondensiert',
        'Die Anodenspannung ist zu hoch',
      ],
      correct: 1,
      explanation: 'Bei der Anregungsenergie übertragen die Elektronen Energie an die Atome. Sie erreichen die Anode nicht mehr → Stromabfall.',
    },
    {
      id: 'cc-fh-2',
      type: 'multiple-choice',
      question: 'Wie ermittelt man die Anregungsenergie aus der Franck-Hertz-Kennlinie?',
      options: [
        'Aus der Maximalspannung',
        'Aus dem Abstand zwischen zwei aufeinanderfolgenden Stromminima',
        'Aus dem Anfangsstrom',
        'Aus der Anzahl der Minima',
      ],
      correct: 1,
      explanation: 'Der Abstand $\\Delta U$ zwischen den Minima entspricht der Anregungsenergie in eV (da $E = e \\cdot U$).',
    },
  ],
  summaryChecklist: [
    'Aufbau: Glühkathode, Gitter, Anode, Quecksilberdampf',
    'Kennlinie: Einbrüche bei Vielfachen der Anregungsenergie',
    'Resonanzabsorption: Energieübertragung bei $E_{kin} = E_{anr}$',
    '(eA) Anregungsenergie aus Kennlinie ermitteln',
  ],
};

// --- Lektion 4: He-Ne-Laser & technische Anwendungen ---
export const laser: LessonContent = {
  intro:
    'Ein Laser erzeugt kohärentes, gebündeltes Licht durch stimulierte Emission. Entscheidend ist die Besetzungsinversion: Es müssen mehr Atome im oberen als im unteren Niveau sein. He-Ne-Laser, Energiesparlampen und weiße LEDs nutzen Fluoreszenz und Leuchtstoffe.',
  learningGoals: [
    'Das Funktionsprinzip Laser: Besetzungsinversion, stimulierte Emission',
    'Fluoreszenz bei Energiesparlampen und weißer LED erklären',
    'Bedeutung und Bewertung von Leuchtstoffen einordnen',
    '(eA) Erläuterung mit vorgegebenen Darstellungen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Stimulierte Emission: Ein Photon trifft auf ein angeregtes Atom und löst die Emission eines zweiten, phasengleichen Photons aus. Im thermischen Gleichgewicht sind aber mehr Atome im Grundzustand — man braucht Besetzungsinversion durch energetisches Pumpen.',
    },
    {
      type: 'remember',
      content:
        'Laser-Prinzip: 1) Pumpen (Atome anregen), 2) Besetzungsinversion (mehr oben als unten), 3) Verstärkung durch stimulierte Emission, 4) Resonator (Spiegel) für Rückkopplung. He-Ne-Laser: Helium pumpt Neon, Neon emittiert bei 632,8 nm (rot).',
    },
    {
      type: 'text',
      content:
        'Energiesparlampen: Quecksilberdampf emittiert UV (254 nm). Ein Leuchtstoff auf der Glaswand wandelt UV in sichtbares Licht um (Fluoreszenz). Weiße LED: Blaue LED + gelber Leuchtstoff (Phosphor) ergibt Mischfarbe. Leuchtstoffe haben Bedeutung für Energieeffizienz und Farbwiedergabe.',
    },
    {
      type: 'text',
      content:
        'Bewertung: Leuchtstoffe ermöglichen effiziente Lampen, enthalten aber oft Seltene Erden. Weiße LEDs haben hohe Lebensdauer und Effizienz. Die Wahl des Leuchtstoffs beeinflusst Farbtemperatur und Farbwiedergabeindex.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du vorgegebene Darstellungen (z.B. Energieniveauschema eines Lasers, Fluoreszenz-Schema einer Lampe) erläutern: Besetzungsinversion, Pump- und Laserniveaus, Stokes-Verschiebung bei Fluoreszenz.',
    },
    {
      type: 'tip',
      content:
        'Spontane Emission: Atom gibt zufällig Photon ab. Stimulierte Emission: Photon löst emission aus, neues Photon identisch (Kohärenz).',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-las-1',
      type: 'multiple-choice',
      question: 'Was ist Besetzungsinversion?',
      options: [
        'Gleich viele Atome in allen Niveaus',
        'Mehr Atome im oberen als im unteren Niveau',
        'Alle Atome im Grundzustand',
        'Keine Anregung möglich',
      ],
      correct: 1,
      explanation: 'Besetzungsinversion bedeutet: Mehr Atome im angeregten als im Grundzustand. Nur so überwiegt stimulierte Emission die Absorption.',
    },
    {
      id: 'cc-las-2',
      type: 'multiple-choice',
      question: 'Wie entsteht bei einer Energiesparlampe sichtbares Licht?',
      options: [
        'Direkt aus dem Quecksilberdampf',
        'Durch Leuchtstoff, der UV in sichtbares Licht umwandelt (Fluoreszenz)',
        'Durch Erhitzung des Glases',
        'Durch chemische Reaktion',
      ],
      correct: 1,
      explanation: 'Quecksilber emittiert UV. Der Leuchtstoff an der Wand absorbiert UV und emittiert sichtbares Licht (Fluoreszenz, Stokes-Verschiebung).',
    },
  ],
  summaryChecklist: [
    'Laser: Besetzungsinversion, stimulierte Emission, Resonator',
    'He-Ne-Laser: He pumpt Ne, 632,8 nm',
    'Energiesparlampe/LED: Fluoreszenz, Leuchtstoffe',
    '(eA) Darstellungen erläutern',
  ],
};

// --- Lektion 5: Radioaktivität: α, β, γ ---
export const radioaktivitaet: LessonContent = {
  intro:
    'Radioaktive Strahlung umfasst drei Arten: Alpha (Heliumkerne), Beta (Elektronen/Positronen) und Gamma (elektromagnetische Wellen). Sie unterscheiden sich in Reichweite, Ionisierungsvermögen und Abschirmung. Geiger-Müller-Zählrohr und Halbleiterdetektor messen sie.',
  learningGoals: [
    'Die Eigenschaften von α-, β- und γ-Strahlung nennen',
    'Reichweite, Ionisierung und Abschirmung vergleichen',
    'Das Geiger-Müller-Zählrohr (GMZ) beschreiben',
    'Den Halbleiterdetektor für Energiemessung erläutern',
    '(eA) GMZ und Halbleiterdetektor detailliert erläutern',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Alpha-Strahlung: Heliumkerne ($^4\\text{He}^{2+}$), geringe Reichweite (cm in Luft, Papier reicht zur Abschirmung), stark ionisierend. Beta-Strahlung: Elektronen oder Positronen, mittlere Reichweite, Aluminium zur Abschirmung. Gamma-Strahlung: Photonen, große Reichweite, Blei oder dicke Betonwände nötig, schwache Ionisation.',
    },
    {
      type: 'remember',
      content:
        'Übersicht: α — Reichweite gering, Ionisierung stark, Abschirmung leicht. β — mittel, mittel, Aluminium. γ — groß, schwach, Blei/Beton. Die biologische Schadwirkung hängt von Energie und Ionisationsvermögen ab.',
    },
    {
      type: 'text',
      content:
        'Geiger-Müller-Zählrohr (GMZ): Eine mit Gas gefüllte Röhre, in der ein starkes elektrisches Feld herrscht. Ein einfallendes Teilchen ionisiert das Gas; die Ionen lösen eine Lawine aus (Vervielfachung). Ein Stromstoß wird gezählt. Das GMZ misst die Teilchenanzahl, nicht die Energie.',
    },
    {
      type: 'text',
      content:
        'Halbleiterdetektor: In einem Halbleiter (z.B. Silizium, Germanium) erzeugen ionisierende Teilchen Ladungsträgerpaare. Die Anzahl ist proportional zur eingebrachten Energie. Mit einem Verstärker und Vielkanalanalysator entsteht ein Energiespektrum. Eignet sich für präzise Energiemessung (α-, γ-Spektroskopie).',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du GMZ und Halbleiterdetektor detailliert erläutern: Aufbau, Funktionsprinzip, was gemessen wird (Anzahl vs. Energie), Vor- und Nachteile.',
    },
    {
      type: 'tip',
      content:
        'α-Strahlung hat die höchste Ionisationsdichte und gibt ihre Energie auf kurzer Strecke ab — gefährlich bei Aufnahme in den Körper. γ durchdringt gut, ionisiert schwach — Gefahr bei äußerer Bestrahlung.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-rad-1',
      type: 'multiple-choice',
      question: 'Welche Strahlungsart besteht aus Heliumkernen?',
      options: ['Beta', 'Alpha', 'Gamma', 'Röntgen'],
      correct: 1,
      explanation: 'Alpha-Strahlung besteht aus Heliumkernen ($^4\\text{He}^{2+}$). Beta aus Elektronen/Positronen, Gamma aus Photonen.',
    },
    {
      id: 'cc-rad-2',
      type: 'multiple-choice',
      question: 'Was misst ein Geiger-Müller-Zählrohr?',
      options: ['Die Energie der Teilchen', 'Die Art der Strahlung', 'Die Anzahl der ionisierenden Ereignisse', 'Die Reichweite'],
      correct: 2,
      explanation: 'Das GMZ zählt ionisierende Ereignisse (Teilchenanzahl). Die Energie wird nicht gemessen — dafür eignet sich ein Halbleiterdetektor.',
    },
  ],
  summaryChecklist: [
    'α, β, γ: Eigenschaften, Reichweite, Abschirmung',
    'GMZ: Funktionsprinzip, Zählung',
    'Halbleiterdetektor: Energiemessung',
    '(eA) GMZ und Halbleiterdetektor erläutern',
  ],
};

// --- Lektion 6: Zerfallsgesetz & Halbwertszeit ---
export const zerfallsgesetz: LessonContent = {
  intro:
    'Radioaktive Kerne zerfallen rein zufällig. Die Anzahl N(t) folgt einem Exponentialgesetz. Die Halbwertszeit T½ gibt an, nach welcher Zeit die Hälfte der Kerne zerfallen ist. Das Zerfallsgesetz hat Parallelen zur Kondensatorentladung.',
  learningGoals: [
    'Die Formeln $N(t) = N(0) \\cdot (1/2)^{t/T_{1/2}}$ und $N(t) = N(0) \\cdot e^{-\\lambda t}$ anwenden',
    '$T_{1/2} = \\ln(2)/\\lambda$ nutzen',
    'Abklingkurven darstellen und auswerten',
    'C14-Methode, Differenzenverfahren, Mutter-Tochter-Zerfall kennen',
    '(eA) Vollständige Auswertung, Modellierung',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Jeder Kern hat eine bestimmte Wahrscheinlichkeit $\\lambda$ pro Zeiteinheit zu zerfallen. Die Anzahl der noch nicht zerfallenen Kerne nimmt exponentiell ab: $N(t) = N(0) \\cdot e^{-\\lambda t}$. Die Zerfallskonstante $\\lambda$ und die Halbwertszeit $T_{1/2}$ hängen zusammen.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'N(t) = N(0) \\cdot e^{-\\lambda t} = N(0) \\cdot \\left(\\frac{1}{2}\\right)^{t/T_{1/2}}',
      variables: {
        'N(t)': 'Anzahl der Kerne zum Zeitpunkt t',
        'N(0)': 'Anfangsanzahl',
        '\\lambda': 'Zerfallskonstante [1/s]',
        'T_{1/2}': 'Halbwertszeit [s]',
      },
    },
    {
      type: 'formula',
      content: '',
      formula: 'T_{1/2} = \\frac{\\ln(2)}{\\lambda} \\approx \\frac{0{,}693}{\\lambda}',
      variables: {
        'T_{1/2}': 'Halbwertszeit [s]',
        '\\lambda': 'Zerfallskonstante [1/s]',
      },
    },
    {
      type: 'remember',
      content:
        'Die Aktivität $A(t) = -\\mathrm{d}N/\\mathrm{d}t = \\lambda \\cdot N(t)$ ist proportional zu $N$. Auch $A(t)$ klingt exponentiell ab. Analogie Kondensator: $U(t) = U_0 \\cdot e^{-t/\\tau}$ mit $\\tau = R \\cdot C$. Stochastische Natur: Bei wenigen Kernen sind Schwankungen groß; das Gesetz gilt für große $N$.',
    },
    {
      type: 'text',
      content:
        'C14-Methode: Lebende Organismen haben festes $^{14}\\text{C}/^{12}\\text{C}$-Verhältnis. Nach dem Tod zerfällt $^{14}\\text{C}$ ($T_{1/2} \\approx 5730\\,\\text{a}$). Aus dem verbleibenden Anteil kann das Alter bestimmt werden. Differenzenverfahren: Simulation in Tabellenkalkulation mit $\\Delta N/\\Delta t = -\\lambda \\cdot N$. Mutter-Tochter-Zerfall: Tochterkern kann wieder zerfallen, Ketten entstehen.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du Abklingkurven vollständig auswerten (T½ aus Diagramm, λ berechnen), das Zerfallsgesetz modellieren (Tabellenkalkulation) und Mutter-Tochter-Zerfall skizzieren.',
    },
    {
      type: 'tip',
      content:
        'In Halblogarithmischer Darstellung ($\\ln N$ vs. $t$) ergibt sich eine Gerade mit Steigung $-\\lambda$. $T_{1/2}$ aus Tangente bei $N = N_0/2$.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-zerf-1',
      type: 'formula-select',
      question: 'Wie hängen Halbwertszeit $T_{1/2}$ und Zerfallskonstante $\\lambda$ zusammen?',
      options: ['$T_{1/2} = \\lambda \\cdot \\ln(2)$', '$T_{1/2} = \\ln(2)/\\lambda$', '$T_{1/2} = \\lambda/2$', '$T_{1/2} = 1/\\lambda$'],
      correct: 1,
      explanation: 'Es gilt $T_{1/2} = \\ln(2)/\\lambda \\approx 0{,}693/\\lambda$. Je größer $\\lambda$, desto kürzer die Halbwertszeit.',
    },
    {
      id: 'cc-zerf-2',
      type: 'multiple-choice',
      question: 'Was beschreibt die C14-Methode?',
      options: [
        'Die Energie von Gamma-Strahlung',
        'Die Altersbestimmung organischer Proben durch $^{14}\\text{C}$-Zerfall',
        'Die Halbwertszeit von Uran',
        'Die Aktivität von Radon',
      ],
      correct: 1,
      explanation: 'Die C14-Methode nutzt den radioaktiven Zerfall von $^{14}\\text{C}$ ($T_{1/2} \\approx 5730\\,\\text{a}$) zur Altersbestimmung von organischem Material.',
    },
  ],
  summaryChecklist: [
    '$N(t) = N(0) \\cdot e^{-\\lambda t} = N(0) \\cdot (1/2)^{t/T_{1/2}}$',
    '$T_{1/2} = \\ln(2)/\\lambda$',
    'Analogie Kondensatorentladung, C14-Methode',
    '(eA) Auswertung, Modellierung',
  ],
  interactiveComponent: 'DecayCurve',
  uncertaintyHint:
    'Bei Zerfallskurven: Aus der Halbwertszeit oder der Zeitkonstante $\\tau$ lässt sich $\\lambda$ bestimmen. Die statistische Natur des radioaktiven Zerfalls führt zu Schwankungen im Zählraten-Diagramm. Bei der Auswertung: Unsicherheit von $T_{1/2}$ aus der Kurvenanpassung berücksichtigen; Aktivität $A = \\lambda \\cdot N$ mit Fehlerfortpflanzung.',
};

// --- Lektion 7: Nuklidkarte & Zerfallsreihen ---
export const nuklidkarte: LessonContent = {
  intro:
    'Die Nuklidkarte ordnet alle bekannten Nuklide nach Kernladungszahl Z und Massenzahl A. Zerfallsreihen zeigen die Abfolge von α- und β-Zerfällen bis zum stabilen Kern. Das α-Energiespektrum ist diskret; der Potenzialtopf beschreibt Nukleonen im Kern.',
  learningGoals: [
    'Die Nuklidkarte lesen: Z, A, Strahlungsart, T½',
    'Zerfallsreihen aufstellen ($\\alpha$: $-2Z$, $-4A$; $\\beta^-$: $+1Z$, $0A$)',
    'Das α-Energiespektrum interpretieren',
    'Potenzialtopf für Nukleonen: Größenordnung',
    '(eA) Nuklidkarte anwenden, Zerfallsreihe aufstellen, α-Spektrum deuten',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Nuklidkarte: Achse Z (Kernladungszahl), Achse N = A−Z (Neutronenzahl) oder A (Massenzahl). Jedes Nuklid ein Punkt. Farbe/Symbol: stabil, α-strahlend, β-strahlend usw. Halbwertszeiten sind angegeben. Die Stabilitätszone („Tal der Stabilität") verläuft schräg.',
    },
    {
      type: 'remember',
      content:
        '$\\alpha$-Zerfall: $Z \\to Z-2$, $A \\to A-4$ (2 Protonen, 2 Neutronen als $^4\\text{He}$ abgegeben). $\\beta^-$-Zerfall: $Z \\to Z+1$, $A$ unverändert (Neutron wird Proton + Elektron). $\\beta^+$-Zerfall: $Z \\to Z-1$, $A$ unverändert.',
    },
    {
      type: 'text',
      content:
        'Zerfallsreihen: Schwere Kerne zerfallen über mehrere Stufen. Natürliche Reihen: Uran-Radium (238U), Uran-Actinium (235U), Thorium (232Th). Jede endet bei einem stabilen Blei-Isotop. Die Reihen können mit Pfeilen (α, β) in der Nuklidkarte nachverfolgt werden.',
    },
    {
      type: 'text',
      content:
        'α-Energiespektrum: Beim α-Zerfall gibt es diskrete Linien — verschiedene Übergänge zwischen Kernniveaus. Die Energie teilt sich auf: kinetische Energie des α-Teilchens + Rückstoß des Tochterkerns. Das Spektrum verrät die Kernstruktur.',
    },
    {
      type: 'text',
      content:
        'Potenzialtopf für Nukleonen: Protonen und Neutronen im Kern sehen ein gemeinsames Potenzial. Die Fermi-Energie und Bindungsenergie pro Nukleon liegen in typischer Größenordnung ($\\approx 8\\,\\text{MeV}$). Das Modell erklärt Größenordnung der Kernprozesse.',
    },
    {
      type: 'ea',
      content:
        'Auf erhöhtem Anforderungsniveau sollst du in der Nuklidkarte einen Ausgangskern finden, eine Zerfallsreihe bis zum stabilen Ende aufstellen (α und β schrittweise) und das α-Spektrum deuten (warum diskret, was bedeuten die Linien).',
    },
    {
      type: 'tip',
      content:
        'Die Stabilitätslinie folgt etwa $N/Z \\approx 1$ für leichte Kerne, $N/Z$ steigt für schwere Kerne (mehr Neutronen nötig wegen Coulomb-Abstoßung der Protonen).',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-nuk-1',
      type: 'multiple-choice',
      question: 'Wie ändern sich Z und A beim α-Zerfall?',
      options: ['Z −2, A −4', 'Z +1, A gleich', 'Z −1, A gleich', 'Z +2, A +4'],
      correct: 0,
      explanation: 'Beim $\\alpha$-Zerfall werden 2 Protonen und 2 Neutronen ($^4\\text{He}$) abgegeben: $Z \\to Z-2$, $A \\to A-4$.',
    },
    {
      id: 'cc-nuk-2',
      type: 'multiple-choice',
      question: 'Warum ist das α-Energiespektrum diskret?',
      options: [
        'Weil α-Teilchen immer gleich sind',
        'Weil verschiedene Übergänge zwischen Kernniveaus verschiedene Energien haben',
        'Weil die Halbwertszeit variiert',
        'Weil die Temperatur eine Rolle spielt',
      ],
      correct: 1,
      explanation: 'Die α-Teilchen stammen von Übergängen zwischen diskreten Kernniveaus. Jeder Übergang hat eine feste Energiedifferenz → diskretes Spektrum.',
    },
  ],
  summaryChecklist: [
    'Nuklidkarte: Z, A, T½, Strahlungsart',
    'Zerfallsreihen: $\\alpha$ ($-2Z$, $-4A$), $\\beta^-$ ($+1Z$, $0A$)',
    'α-Spektrum: diskret, Kernniveaus',
    '(eA) Nuklidkarte, Zerfallsreihe, α-Spektrum',
  ],
};

// --- Lektion 8: Bragg-Kurve in der Strahlentherapie ---
export const braggKurve: LessonContent = {
  intro:
    'Die Bragg-Kurve beschreibt, wie geladene Teilchen (Protonen, Ionen) ihre Energie in Materie abgeben. Die Energieabgabe steigt zunächst an und hat ein scharfes Maximum (Bragg-Peak) kurz vor dem Stillstand. In der Strahlentherapie nutzt man das für präzise Tumorbestrahlung.',
  learningGoals: [
    'Die Bragg-Kurve und den Bragg-Peak erklären',
    'Den Zusammenhang mit Reichweite und Ionisation verstehen',
    'Die Anwendung in der Strahlentherapie beschreiben',
    'Vorteile gegenüber konventioneller Röntgenbestrahlung nennen',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Geladene Teilchen (α, Protonen, schwere Ionen) geben ihre Energie beim Durchgang durch Materie hauptsächlich durch Ionisation ab. Am Anfang der Bahn ist die Geschwindigkeit hoch — die Wechselwirkungszeit kurz, die Energieabgabe gering. Mit abnehmender Geschwindigkeit steigt die Ionisation stark an.',
    },
    {
      type: 'remember',
      content:
        'Bragg-Kurve: Dosis (Energie pro Weg) als Funktion der Eindringtiefe. Die Kurve steigt an, erreicht ein Maximum (Bragg-Peak) und fällt danach steil ab. Der Peak liegt kurz vor dem Ende der Reichweite. Hinter dem Peak: praktisch keine Dosis.',
    },
    {
      type: 'text',
      content:
        'Strahlentherapie: Bei konventioneller Röntgen- oder γ-Bestrahlung durchdringt die Strahlung den Körper und gibt Energie auf dem gesamten Weg ab — auch im gesunden Gewebe. Protonen und Ionen können so eingestellt werden, dass der Bragg-Peak exakt im Tumor liegt. Dahinter: minimale Dosis.',
    },
    {
      type: 'text',
      content:
        'Vorteile: Weniger Schädigung von gesundem Gewebe vor und hinter dem Tumor. Präzise Steuerung der Eindringtiefe durch Einstellung der Teilchenenergie. Besonders wichtig bei tief liegenden Tumoren und bei Kindern.',
    },
    {
      type: 'tip',
      content:
        'Die Reichweite der Teilchen hängt von ihrer Energie und dem Material ab. In Wasser/Biologischem Gewebe: typische Reichweiten von Zentimetern bis Dezimetern für Protonen im MeV-Bereich.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-bragg-1',
      type: 'multiple-choice',
      question: 'Wo liegt der Bragg-Peak relativ zur Reichweite der Teilchen?',
      options: [
        'Am Anfang der Bahn',
        'Kurz vor dem Ende der Reichweite (Stillstand)',
        'Genau bei halber Reichweite',
        'Hinter der Reichweite',
      ],
      correct: 1,
      explanation: 'Der Bragg-Peak liegt kurz vor dem Ende der Reichweite. Dort ist die Geschwindigkeit klein, die Ionisation und damit die Energieabgabe maximal.',
    },
    {
      id: 'cc-bragg-2',
      type: 'multiple-choice',
      question: 'Warum nutzt man Protonen oder Ionen in der Strahlentherapie?',
      options: [
        'Weil sie billiger sind',
        'Weil der Bragg-Peak die Dosis gezielt im Tumor konzentriert',
        'Weil sie keine Nebenwirkungen haben',
        'Weil sie schneller appliziert werden',
      ],
      correct: 1,
      explanation: 'Der Bragg-Peak ermöglicht eine gezielte Abgabe der Dosis im Tumor bei geringer Belastung des umgebenden Gewebes.',
    },
  ],
  summaryChecklist: [
    'Bragg-Kurve: Dosis vs. Eindringtiefe',
    'Bragg-Peak kurz vor Reichweitenende',
    'Strahlentherapie: gezielte Tumorbestrahlung',
    'Vorteil: weniger Schädigung gesunden Gewebes',
  ],
};
