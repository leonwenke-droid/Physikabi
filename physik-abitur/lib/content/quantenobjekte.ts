import type { Module } from '@/lib/types';

export const quantenobjekte: Module = {
  id: 'quantenobjekte',
  title: 'Quantenobjekte',
  slug: 'quantenobjekte',
  color: '#b16fff',
  description: 'Photoeffekt, Röntgenstrahlung, de-Broglie, Unschärfe',
  chapters: [
    {
      id: 'quantenphysik',
      title: 'Quantenphysik',
      slug: 'quantenphysik',
      topics: [
        { id: 'photoeffekt', title: 'Photoeffekt & Plancksches Wirkungsquantum', slug: 'photoeffekt' },
        { id: 'roentgen', title: 'Röntgenbremsspektrum', slug: 'roentgen' },
        { id: 'debroglie', title: 'de-Broglie-Wellenlänge', slug: 'debroglie', hasInteractive: true },
        { id: 'interferenz-quanten', title: 'Interferenz einzelner Quantenobjekte', slug: 'interferenz-quanten' },
        { id: 'unschaerferelation', title: 'Unschärferelation, Nichtlokalität & Komplementarität', slug: 'unschaerferelation', hasQuiz: true },
      ],
    },
  ],
};
