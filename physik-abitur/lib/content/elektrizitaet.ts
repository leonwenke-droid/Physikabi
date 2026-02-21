import type { Module } from '@/lib/types';

export const elektrizitaet: Module = {
  id: 'elektrizitaet',
  title: 'Elektrizität',
  slug: 'elektrizitaet',
  color: '#4f9cf9',
  description: 'Elektrisches und magnetisches Feld, Kondensatoren, Induktion',
  chapters: [
    {
      id: 'elektrisches-feld',
      title: 'Elektrisches Feld',
      slug: 'elektrisches-feld',
      topics: [
        { id: 'feldstaerke-feldlinien', title: 'Elektrische Feldstärke & Feldlinien', slug: 'feldstaerke-feldlinien', hasInteractive: true },
        { id: 'kondensator-kapazitaet', title: 'Kondensator & Kapazität', slug: 'kondensator-kapazitaet' },
        { id: 'entladevorgang', title: 'Entladevorgang des Kondensators', slug: 'entladevorgang', hasInteractive: true, hasQuiz: true },
      ],
    },
    {
      id: 'magnetisches-feld',
      title: 'Magnetisches Feld',
      slug: 'magnetisches-feld',
      topics: [
        { id: 'flussdichte', title: 'Magnetische Flussdichte B', slug: 'flussdichte' },
        { id: 'lorentzkraft', title: 'Lorentzkraft & Bahnkurven', slug: 'lorentzkraft', hasInteractive: true },
        { id: 'em-bestimmung', title: 'e/m-Bestimmung (Fadenstrahlrohr)', slug: 'em-bestimmung' },
        { id: 'hallspannung', title: 'Hallspannung', slug: 'hallspannung' },
        { id: 'induktionsgesetz', title: 'Induktionsgesetz', slug: 'induktionsgesetz', hasQuiz: true },
      ],
    },
  ],
};
