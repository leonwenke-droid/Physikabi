import type { Module } from '@/lib/types';
import { elektrizitaet } from './elektrizitaet';
import { schwingungen } from './schwingungen';
import { quantenobjekte } from './quantenobjekte';
import { atomhuelle } from './atomhuelle';
import { messunsicherheiten } from './messunsicherheiten';

export const modules: Module[] = [
  elektrizitaet,
  schwingungen,
  quantenobjekte,
  atomhuelle,
  messunsicherheiten,
];

export { elektrizitaet, schwingungen, quantenobjekte, atomhuelle, messunsicherheiten };

export function getModule(moduleId: string): Module | undefined {
  return modules.find((m) => m.id === moduleId);
}

export function getTopic(moduleId: string, topicId: string) {
  const module = getModule(moduleId);
  if (!module) return undefined;
  for (const chapter of module.chapters) {
    const topic = chapter.topics.find((t) => t.id === topicId || t.slug === topicId);
    if (topic) return { module, chapter, topic };
  }
  return undefined;
}

export function getTopicByPath(moduleId: string, chapterSlug: string, topicSlug: string) {
  const module = getModule(moduleId);
  if (!module) return undefined;
  const chapter = module.chapters.find((c) => c.slug === chapterSlug || c.id === chapterSlug);
  if (!chapter) return undefined;
  const topic = chapter.topics.find((t) => t.slug === topicSlug || t.id === topicSlug);
  if (!topic) return undefined;
  return { module, chapter, topic };
}

import type { LessonContent } from '@/lib/types';
import {
  feldstaerkeFeldlinien,
  kondensatorKapazitaet,
  entladevorgang,
  flussdichte,
  lorentzkraft,
  emBestimmung,
  hallspannung,
  induktionsgesetz,
} from './elektrizitaet-lessons';
import {
  grundgroessen,
  federMasse,
  elektromagnetischerSchwingkreis,
  resonanz,
  wellenausbreitung,
  polarisation,
  interferenz,
  gitterBragg,
} from './schwingungen-lessons';
import {
  photoeffekt,
  roentgen,
  debroglie,
  interferenzQuanten,
  unschaerferelation,
} from './quantenobjekte-lessons';
import {
  potenzialtopf,
  linienspektren,
  franckHertz,
  laser,
  radioaktivitaet,
  zerfallsgesetz,
  nuklidkarte,
  braggKurve,
} from './atomhuelle-lessons';
import {
  signifikanteStellen,
  absoluteRelative,
  zusammengesetzteGroessen,
} from './messunsicherheiten-lessons';

const lessonContentMap: Record<string, LessonContent> = {
  'elektrizitaet/elektrisches-feld/feldstaerke-feldlinien': feldstaerkeFeldlinien,
  'elektrizitaet/elektrisches-feld/kondensator-kapazitaet': kondensatorKapazitaet,
  'elektrizitaet/elektrisches-feld/entladevorgang': entladevorgang,
  'elektrizitaet/magnetisches-feld/flussdichte': flussdichte,
  'elektrizitaet/magnetisches-feld/lorentzkraft': lorentzkraft,
  'elektrizitaet/magnetisches-feld/em-bestimmung': emBestimmung,
  'elektrizitaet/magnetisches-feld/hallspannung': hallspannung,
  'elektrizitaet/magnetisches-feld/induktionsgesetz': induktionsgesetz,
  // Modul 2: Schwingungen & Wellen
  'schwingungen/harmonische-schwingungen/grundgroessen': grundgroessen,
  'schwingungen/harmonische-schwingungen/feder-masse': federMasse,
  'schwingungen/harmonische-schwingungen/elektromagnetischer-schwingkreis': elektromagnetischerSchwingkreis,
  'schwingungen/harmonische-schwingungen/resonanz': resonanz,
  'schwingungen/wellen-interferenz/wellenausbreitung': wellenausbreitung,
  'schwingungen/wellen-interferenz/polarisation': polarisation,
  'schwingungen/wellen-interferenz/interferenz': interferenz,
  'schwingungen/wellen-interferenz/gitter-bragg': gitterBragg,
  // Modul 3: Quantenobjekte
  'quantenobjekte/quantenphysik/photoeffekt': photoeffekt,
  'quantenobjekte/quantenphysik/roentgen': roentgen,
  'quantenobjekte/quantenphysik/debroglie': debroglie,
  'quantenobjekte/quantenphysik/interferenz-quanten': interferenzQuanten,
  'quantenobjekte/quantenphysik/unschaerferelation': unschaerferelation,
  // Modul 4: Atomhülle & Atomkern
  'atomhuelle/atomhuelle-kapitel/potenzialtopf': potenzialtopf,
  'atomhuelle/atomhuelle-kapitel/linienspektren': linienspektren,
  'atomhuelle/atomhuelle-kapitel/franck-hertz': franckHertz,
  'atomhuelle/atomhuelle-kapitel/laser': laser,
  'atomhuelle/atomkern/radioaktivitaet': radioaktivitaet,
  'atomhuelle/atomkern/zerfallsgesetz': zerfallsgesetz,
  'atomhuelle/atomkern/nuklidkarte': nuklidkarte,
  'atomhuelle/atomkern/bragg-kurve': braggKurve,
  // Modul 5: Messunsicherheiten
  'messunsicherheiten/messunsicherheiten-kapitel/signifikante-stellen': signifikanteStellen,
  'messunsicherheiten/messunsicherheiten-kapitel/absolute-relative': absoluteRelative,
  'messunsicherheiten/messunsicherheiten-kapitel/zusammengesetzte-groessen': zusammengesetzteGroessen,
};

export function getLessonContent(
  moduleId: string,
  chapterSlug: string,
  topicSlug: string
): LessonContent | null {
  const key = `${moduleId}/${chapterSlug}/${topicSlug}`;
  return lessonContentMap[key] ?? null;
}

export function getNextLesson(moduleId: string, chapterSlug: string, topicSlug: string): { href: string; label: string } | null {
  const result = getTopicByPath(moduleId, chapterSlug, topicSlug);
  if (!result) return null;
  const { module, chapter, topic } = result;
  const topicIndex = chapter.topics.findIndex((t) => t.slug === topicSlug || t.id === topicSlug);

  if (topicIndex < chapter.topics.length - 1) {
    const nextTopic = chapter.topics[topicIndex + 1];
    return {
      href: `/${module.slug}/${chapter.slug}/${nextTopic.slug}`,
      label: nextTopic.title,
    };
  }

  // Letztes Thema im Kapitel: Wenn Quiz vorhanden, zum Quiz
  if (topic.hasQuiz) {
    return {
      href: `/${module.slug}/${chapter.slug}/${topic.slug}/quiz`,
      label: 'Zum Quiz',
    };
  }

  // Sonst zum nächsten Kapitel
  const chapterIndex = module.chapters.findIndex((c) => c.slug === chapterSlug || c.id === chapterSlug);
  if (chapterIndex < module.chapters.length - 1) {
    const nextChapter = module.chapters[chapterIndex + 1];
    const nextTopic = nextChapter.topics[0];
    return {
      href: `/${module.slug}/${nextChapter.slug}/${nextTopic.slug}`,
      label: nextTopic.title,
    };
  }

  return null;
}
