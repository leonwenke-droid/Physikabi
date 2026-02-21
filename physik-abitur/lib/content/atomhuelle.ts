import type { Module } from '@/lib/types';

export const atomhuelle: Module = {
  id: 'atomhuelle',
  title: 'Atomhülle & Atomkern',
  slug: 'atomhuelle',
  color: '#3ecf8e',
  description: 'Potenzialtopf, Energieniveaus, Radioaktivität',
  chapters: [
    {
      id: 'atomhuelle-kapitel',
      title: 'Atomhülle',
      slug: 'atomhuelle-kapitel',
      topics: [
        { id: 'potenzialtopf', title: 'Eindimensionaler Potenzialtopf', slug: 'potenzialtopf' },
        { id: 'linienspektren', title: 'Linienspektren & Energieniveauschema', slug: 'linienspektren', hasInteractive: true },
        { id: 'franck-hertz', title: 'Franck-Hertz-Versuch', slug: 'franck-hertz' },
        { id: 'laser', title: 'He-Ne-Laser & technische Anwendungen', slug: 'laser', hasQuiz: true },
      ],
    },
    {
      id: 'atomkern',
      title: 'Atomkern',
      slug: 'atomkern',
      topics: [
        { id: 'radioaktivitaet', title: 'Radioaktivität: α, β, γ', slug: 'radioaktivitaet' },
        { id: 'zerfallsgesetz', title: 'Zerfallsgesetz & Halbwertszeit', slug: 'zerfallsgesetz', hasInteractive: true },
        { id: 'nuklidkarte', title: 'Nuklidkarte & Zerfallsreihen', slug: 'nuklidkarte' },
        { id: 'bragg-kurve', title: 'Bragg-Kurve in der Strahlentherapie', slug: 'bragg-kurve', hasQuiz: true },
      ],
    },
  ],
};
