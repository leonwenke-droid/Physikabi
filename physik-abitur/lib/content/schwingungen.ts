import type { Module } from '@/lib/types';

export const schwingungen: Module = {
  id: 'schwingungen',
  title: 'Schwingungen & Wellen',
  slug: 'schwingungen',
  color: '#ff7a5c',
  description: 'Harmonische Schwingungen, Wellen, Interferenz',
  chapters: [
    {
      id: 'harmonische-schwingungen',
      title: 'Harmonische Schwingungen',
      slug: 'harmonische-schwingungen',
      topics: [
        { id: 'grundgroessen', title: 'Grundgrößen harmonischer Schwingungen', slug: 'grundgroessen', hasInteractive: true },
        { id: 'feder-masse', title: 'Feder-Masse-Pendel', slug: 'feder-masse', hasInteractive: true },
        { id: 'elektromagnetischer-schwingkreis', title: 'Elektromagnetischer Schwingkreis', slug: 'elektromagnetischer-schwingkreis' },
        { id: 'resonanz', title: 'Resonanz erzwungener Schwingungen', slug: 'resonanz', hasQuiz: true },
      ],
    },
    {
      id: 'wellen-interferenz',
      title: 'Wellen & Interferenz',
      slug: 'wellen-interferenz',
      topics: [
        { id: 'wellenausbreitung', title: 'Wellenausbreitung & Grundgrößen', slug: 'wellenausbreitung' },
        { id: 'polarisation', title: 'Polarisation', slug: 'polarisation' },
        { id: 'interferenz', title: 'Interferenzphänomene', slug: 'interferenz', hasInteractive: true },
        { id: 'gitter-bragg', title: 'Gitter & Bragg-Reflexion', slug: 'gitter-bragg', hasQuiz: true },
      ],
    },
  ],
};
