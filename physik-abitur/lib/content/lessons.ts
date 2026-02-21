import type { LessonContent } from '@/lib/types';

/**
 * Platzhalter-Inhalte für Lektionen.
 * In Schritt 6 werden die echten Inhalte aus den Modulen eingefügt.
 */
export const placeholderLessonContent: LessonContent = {
  intro: 'Diese Lektion wird in Schritt 6 mit den vollständigen Inhalten befüllt.',
  learningGoals: [
    'Die zentralen Begriffe und Formeln verstehen',
    'Die physikalischen Zusammenhänge erklären können',
    'Typische Aufgaben bearbeiten können',
  ],
  sections: [
    {
      type: 'text',
      content:
        'Der Kerninhalt wird hier mit Erklärungstexten, Formelboxen und Hinweisboxen erscheinen.',
    },
    {
      type: 'formula',
      content: '',
      formula: 'E = \\frac{F}{q}',
      variables: {
        E: 'Elektrische Feldstärke [N/C]',
        F: 'Kraft auf Probekörper [N]',
        q: 'Ladung des Probekörpers [C]',
      },
    },
    {
      type: 'tip',
      content: 'Tipp-Boxen helfen bei der Vertiefung des Themas.',
    },
    {
      type: 'remember',
      content: 'Merke-Boxen heben wichtige Punkte hervor.',
    },
    {
      type: 'ea',
      content: 'eA-Boxen kennzeichnen Inhalte für das erhöhte Anforderungsniveau.',
    },
  ],
  conceptChecks: [
    {
      id: 'cc-1',
      type: 'multiple-choice',
      question: 'Welche Einheit hat die elektrische Feldstärke?',
      options: ['$N \\cdot m$', '$N/C$', '$C/s$', '$V \\cdot A$'],
      correct: 1,
      explanation: 'Die elektrische Feldstärke $E = F/q$ hat die Einheit Newton pro Coulomb (N/C), was gleich Volt pro Meter (V/m) ist.',
    },
  ],
  summaryChecklist: [
    'Formel für elektrische Feldstärke kennen',
    'Feldlinienbilder interpretieren können',
    'Plattenkondensator: $E = U/d$ anwenden',
  ],
};
