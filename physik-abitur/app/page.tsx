'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SECTION_STAGGER } from '@/lib/transitions';
import { ArrowRight, BookOpen } from 'lucide-react';
import { modules } from '@/lib/content';
import { useProgressStore } from '@/lib/progress';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { StreakCounter } from '@/components/dashboard/StreakCounter';
import { StatsPanel } from '@/components/dashboard/StatsPanel';
import { BadgesPanel } from '@/components/dashboard/BadgesPanel';

export default function DashboardPage() {
  const { progress, getModuleProgress } = useProgressStore();

  const lastLesson = progress.lastLesson;
  const lastLessonData = lastLesson
    ? (() => {
        const mod = modules.find((m) => m.id === lastLesson.moduleId);
        if (!mod) return null;
        for (const ch of mod.chapters) {
          const topic = ch.topics.find((t) => t.id === lastLesson.topicId);
          if (topic) return { mod, chapter: ch, topic };
        }
        return null;
      })()
    : null;

  return (
    <div className="max-w-[1000px] mx-auto p-4 sm:p-6 md:p-8">
      <motion.header
        initial={SECTION_STAGGER.initial}
        animate={SECTION_STAGGER.animate}
        transition={SECTION_STAGGER.transition}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl font-bold mb-1">
              Willkommen zurück!
            </h1>
            <p className="text-text-dim">
              Bereite dich auf dein Physik-Abitur vor.
            </p>
          </div>
          <StreakCounter />
        </div>
        <StatsPanel />
        <div className="mt-4">
          <BadgesPanel />
        </div>
      </motion.header>

      {lastLessonData && (
        <motion.section
          initial={SECTION_STAGGER.initial}
          animate={SECTION_STAGGER.animate}
          transition={{ ...SECTION_STAGGER.transition, delay: SECTION_STAGGER.staggerDelay * 4 }}
          className="mb-10"
        >
          <h2 className="text-sm font-medium text-text-dim uppercase tracking-wider mb-4">
            Weitermachen
          </h2>
          <Link
            href={`/${lastLessonData.mod.slug}/${lastLessonData.chapter.slug}/${lastLessonData.topic.slug}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-surface border border-border hover:border-elektrizitaet/50 hover:bg-surface2/50 transition-all group"
            aria-label={`Weitermachen mit ${lastLessonData.topic.title}`}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${lastLessonData.mod.color}20` }}
            >
              <BookOpen
                className="w-6 h-6"
                style={{ color: lastLessonData.mod.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium">{lastLessonData.topic.title}</p>
              <p className="text-sm text-text-dim">
                {lastLessonData.mod.title} · {lastLessonData.chapter.title}
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-text-dim group-hover:text-elektrizitaet group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.section>
      )}

      <section aria-labelledby="modules-heading">
        <h2 id="modules-heading" className="text-sm font-medium text-text-dim uppercase tracking-wider mb-6">
          Module
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((mod, i) => {
            const lessonCount = mod.chapters.reduce(
              (a, c) => a + c.topics.length,
              0
            );
            const modProgress = getModuleProgress(mod.id, lessonCount);
            return (
              <ModuleCard
                key={mod.id}
                module={mod}
                progress={modProgress}
                index={i}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
