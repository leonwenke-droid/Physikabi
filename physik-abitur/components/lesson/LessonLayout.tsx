'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SECTION_STAGGER } from '@/lib/transitions';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ProgressBar } from '@/components/layout/ProgressBar';
import { FormulaBox } from './FormulaBox';
import { NoteBox } from './NoteBox';
import { TextWithMath } from './TextWithMath';
import { UncertaintyHintBox } from './UncertaintyHintBox';
import { ConceptCheck } from './ConceptCheck';
import { Checklist } from './Checklist';
import type { LessonContent, ContentSection } from '@/lib/types';

interface LessonLayoutProps {
  moduleId: string;
  moduleTitle: string;
  moduleSlug: string;
  topicId: string;
  chapterTitle: string;
  chapterSlug: string;
  topicTitle: string;
  topicSlug: string;
  moduleColor: string;
  progress: number;
  content: LessonContent;
  interactiveSlot?: React.ReactNode;
  nextHref?: string;
  nextLabel?: string;
}

function ContentSectionRenderer({ section, accentColor }: { section: ContentSection; accentColor: string }) {
  switch (section.type) {
    case 'formula':
      return (
        <FormulaBox
          formula={section.formula ?? ''}
          variables={section.variables}
          accentColor={accentColor}
        />
      );
    case 'tip':
      return <NoteBox type="tip"><TextWithMath content={section.content ?? ''} className="[&>span]:align-baseline" /></NoteBox>;
    case 'remember':
      return <NoteBox type="remember"><TextWithMath content={section.content ?? ''} className="[&>span]:align-baseline" /></NoteBox>;
    case 'experiment':
      return <NoteBox type="experiment"><TextWithMath content={section.content ?? ''} className="[&>span]:align-baseline" /></NoteBox>;
    case 'ea':
      return <NoteBox type="ea"><TextWithMath content={section.content ?? ''} className="[&>span]:align-baseline" /></NoteBox>;
    case 'text':
    default:
      return (
        <div className="prose prose-invert prose-p:text-text-dim max-w-none [&>p]:mb-4 [&_.katex]:text-[1em]">
          <TextWithMath content={section.content ?? ''} className="text-text-dim [&>span]:align-baseline" />
        </div>
      );
  }
}

export function LessonLayout({
  moduleId,
  moduleTitle,
  moduleSlug,
  topicId,
  chapterTitle,
  chapterSlug,
  topicTitle,
  topicSlug,
  moduleColor,
  progress,
  content,
  interactiveSlot,
  nextHref,
  nextLabel = 'Weiter',
}: LessonLayoutProps) {
  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: moduleTitle, href: `/${moduleSlug}` },
    { label: chapterTitle },
    { label: topicTitle },
  ];

  return (
    <div className="max-w-[780px] mx-auto p-4 sm:p-6 md:p-8">
      {/* 1. HEADER */}
      <header className="sticky top-0 z-10 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 py-4 bg-[#0a0a0f]/95 backdrop-blur-sm border-b border-border mb-6 md:mb-8">
        <Breadcrumb items={breadcrumbItems} />
        <Link
          href={`/${moduleSlug}`}
          className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-text mt-2 mb-4 transition-colors"
          aria-label={`Zurück zu ${moduleTitle}`}
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zu {moduleTitle}
        </Link>
        <h1 className="font-heading text-2xl font-bold mb-4">{topicTitle}</h1>
        <ProgressBar progress={progress} color={moduleColor} showLabel />
      </header>

      {/* 2. INTRO */}
      {content.intro && (
        <motion.section
          initial={SECTION_STAGGER.initial}
          animate={SECTION_STAGGER.animate}
          transition={SECTION_STAGGER.transition}
          className="mb-8"
        >
          <TextWithMath content={content.intro} className="text-text-dim text-lg leading-relaxed mb-4 [&>span]:align-baseline" />
          {content.learningGoals && content.learningGoals.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-text-dim mb-2">
                Lernziele
              </h3>
              <ul className="list-disc list-inside space-y-1 text-text-dim">
                {content.learningGoals.map((goal, i) => (
                  <li key={i}><TextWithMath content={goal} as="span" className="[&>span]:align-baseline" /></li>
                ))}
              </ul>
            </div>
          )}
        </motion.section>
      )}

      {/* 2b. MESSUNSICHERHEITS-HINWEIS (experimentelle Lektionen) */}
      {content.uncertaintyHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <UncertaintyHintBox content={content.uncertaintyHint} />
        </motion.div>
      )}

      {/* 3. KERNINHALT */}
      <section className="mb-8">
        {content.sections?.map((section, i) => (
          <motion.div
            key={i}
            initial={SECTION_STAGGER.initial}
            animate={SECTION_STAGGER.animate}
            transition={{ ...SECTION_STAGGER.transition, delay: i * SECTION_STAGGER.staggerDelay }}
          >
            <ContentSectionRenderer section={section} accentColor={moduleColor} />
          </motion.div>
        ))}
      </section>

      {/* 4. INTERAKTIVE KOMPONENTE */}
      {interactiveSlot && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {interactiveSlot}
        </motion.section>
      )}

      {/* 5. CONCEPT CHECKS */}
      {content.conceptChecks && content.conceptChecks.length > 0 && (
        <section className="mb-8">
          {content.conceptChecks.map((check, i) => (
            <ConceptCheck key={check.id} check={check} index={i} />
          ))}
        </section>
      )}

      {/* 6. ZUSAMMENFASSUNG / CHECKLISTE */}
      {content.summaryChecklist && content.summaryChecklist.length > 0 && (
        <Checklist
          items={content.summaryChecklist}
          moduleId={moduleId}
          topicId={topicId}
        />
      )}

      {/* 7. WEITER-BUTTON */}
      {nextHref && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 pt-8 border-t border-border"
        >
          <Link
            href={nextHref}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:gap-3"
            style={{
              backgroundColor: `${moduleColor}20`,
              color: moduleColor,
            }}
            aria-label={`Weiter zu ${nextLabel}`}
          >
            {nextLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}
