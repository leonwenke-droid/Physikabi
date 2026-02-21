'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getTopicByPath, getNextLesson, getLessonContent } from '@/lib/content';
import { useProgressStore, EMPTY_LESSON_PROGRESS } from '@/lib/progress';
import { LessonLayout } from '@/components/lesson/LessonLayout';
import { InteractiveWrapper } from '@/components/layout/InteractiveWrapper';
import { placeholderLessonContent } from '@/lib/content/lessons';
import { SimulationFallback } from '@/components/interactive/SimulationFallback';

const OscillationSim = dynamic(
  () => import('@/components/interactive/OscillationSim').then((m) => ({ default: m.OscillationSim })),
  { ssr: false, loading: () => <SimulationFallback /> }
);
const DecayAnimation = dynamic(
  () => import('@/components/interactive/DecayAnimation').then((m) => ({ default: m.DecayAnimation })),
  { ssr: false, loading: () => <SimulationFallback /> }
);
const WaveInterference = dynamic(
  () => import('@/components/interactive/WaveInterference').then((m) => ({ default: m.WaveInterference })),
  { ssr: false, loading: () => <SimulationFallback /> }
);
const DecayCurve = dynamic(
  () => import('@/components/interactive/DecayCurve').then((m) => ({ default: m.DecayCurve })),
  { ssr: false, loading: () => <SimulationFallback /> }
);
const EnergyLevels = dynamic(
  () => import('@/components/interactive/EnergyLevels').then((m) => ({ default: m.EnergyLevels })),
  { ssr: false, loading: () => <SimulationFallback /> }
);
const UncertaintyCalculator = dynamic(
  () => import('@/components/interactive/UncertaintyCalculator').then((m) => ({ default: m.UncertaintyCalculator })),
  { ssr: false, loading: () => <SimulationFallback /> }
);
const FieldLines = dynamic(
  () => import('@/components/interactive/FieldLines').then((m) => ({ default: m.FieldLines })),
  { ssr: false, loading: () => <SimulationFallback /> }
);

export default function LessonPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const chapterSlug = params.chapterSlug as string;
  const topicSlug = params.topicSlug as string;
  const result = getTopicByPath(moduleId, chapterSlug, topicSlug);
  const topicKey = result ? `${result.module.id}/${result.topic.id}` : null;
  const lessonProgress = useProgressStore((s) => {
    if (!topicKey) return EMPTY_LESSON_PROGRESS;
    return s.progress?.lessons?.[topicKey] ?? EMPTY_LESSON_PROGRESS;
  });
  const setLastLesson = useProgressStore((s) => s.setLastLesson);

  useEffect(() => {
    if (result) {
      setLastLesson(result.module.id, result.topic.id);
    }
  }, [result, setLastLesson]);

  if (!result) {
    return (
      <div className="max-w-[780px] mx-auto p-8">
        <p className="text-text-dim">Lektion nicht gefunden.</p>
        <Link href="/" className="text-elektrizitaet hover:underline mt-4 inline-block">
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  const { module, chapter, topic } = result;
  const content = getLessonContent(moduleId, chapterSlug, topicSlug) ?? placeholderLessonContent;
  const checklistCount = content.summaryChecklist?.length ?? 3;
  const checkedCount = Object.values(lessonProgress.checklistItems || {}).filter(Boolean).length;
  const progress = lessonProgress.completed
    ? 100
    : Math.round((checkedCount / checklistCount) * 90);
  const next = getNextLesson(moduleId, chapterSlug, topicSlug);

  const wrapInteractive = (node: React.ReactNode, needsWrapper: boolean) =>
    needsWrapper ? <InteractiveWrapper>{node}</InteractiveWrapper> : node;

  const interactiveSlot = content.interactiveComponent
    ? content.interactiveComponent === 'OscillationSim'
      ? wrapInteractive(<OscillationSim />, true)
      : content.interactiveComponent === 'DecayAnimation'
        ? wrapInteractive(<DecayAnimation />, true)
        : content.interactiveComponent === 'WaveInterference'
          ? wrapInteractive(<WaveInterference />, true)
          : content.interactiveComponent === 'DecayCurve'
            ? wrapInteractive(<DecayCurve />, true)
            : content.interactiveComponent === 'EnergyLevels'
              ? wrapInteractive(<EnergyLevels />, true)
              : content.interactiveComponent === 'UncertaintyCalculator'
                ? <UncertaintyCalculator />
                : content.interactiveComponent === 'FieldLines'
                  ? wrapInteractive(<FieldLines />, true)
                  : (
          <div className="rounded-xl border border-border bg-surface2/50 p-6 text-center text-text-dim">
            <p className="font-medium mb-2">Interaktive Visualisierung</p>
            <p className="text-sm">Komponente &quot;{content.interactiveComponent}&quot; wird implementiert.</p>
          </div>
        )
    : undefined;

  return (
    <LessonLayout
      moduleId={module.id}
      moduleTitle={module.title}
      moduleSlug={module.slug}
      topicId={topic.id}
      chapterTitle={chapter.title}
      chapterSlug={chapter.slug}
      topicTitle={topic.title}
      topicSlug={topic.slug}
      moduleColor={module.color}
      progress={lessonProgress.completed ? 100 : progress}
      content={content}
      interactiveSlot={interactiveSlot}
      nextHref={next?.href}
      nextLabel={next?.label ?? 'Weiter'}
    />
  );
}
