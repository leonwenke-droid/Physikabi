import type { Module } from '@/lib/types';

export const messunsicherheiten: Module = {
  id: 'messunsicherheiten',
  title: 'Messunsicherheiten',
  slug: 'messunsicherheiten',
  color: '#ffd166',
  description: 'Signifikante Stellen, absolute und relative Unsicherheiten',
  chapters: [
    {
      id: 'messunsicherheiten-kapitel',
      title: 'Messunsicherheiten',
      slug: 'messunsicherheiten-kapitel',
      topics: [
        { id: 'signifikante-stellen', title: 'Signifikante Stellen & Rundungsregeln', slug: 'signifikante-stellen' },
        { id: 'absolute-relative', title: 'Absolute & relative Messunsicherheit', slug: 'absolute-relative', level: 'eA' },
        { id: 'zusammengesetzte-groessen', title: 'Zusammengesetzte Messgrößen', slug: 'zusammengesetzte-groessen', level: 'eA', hasInteractive: true, hasQuiz: true },
      ],
    },
  ],
};
