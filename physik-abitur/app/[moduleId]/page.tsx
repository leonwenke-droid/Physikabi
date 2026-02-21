'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SECTION_STAGGER } from '@/lib/transitions';
import { ChevronRight, BookOpen } from 'lucide-react';
import { getModule } from '@/lib/content';
import { useProgressStore } from '@/lib/progress';
import { Breadcrumb } from '@/components/layout/Breadcrumb';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const mod = getModule(moduleId);
  const { getLessonProgress, getModuleProgress } = useProgressStore();

  if (!mod) {
    return (
      <div className="max-w-[780px] mx-auto p-8">
        <p className="text-text-dim">Modul nicht gefunden.</p>
        <Link href="/" className="text-elektrizitaet hover:underline mt-4 inline-block">
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  const lessonCount = mod.chapters.reduce((a, c) => a + c.topics.length, 0);
  const progress = getModuleProgress(mod.id, lessonCount);

  return (
    <div className="max-w-[780px] mx-auto p-8">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/' },
          { label: mod.title },
        ]}
      />
      <motion.header
        initial={SECTION_STAGGER.initial}
        animate={SECTION_STAGGER.animate}
        transition={SECTION_STAGGER.transition}
        className="mb-8 mt-4"
      >
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
          style={{ backgroundColor: `${mod.color}20` }}
        >
          <BookOpen className="w-6 h-6" style={{ color: mod.color }} />
        </div>
        <h1 className="font-heading text-3xl font-bold mb-2">{mod.title}</h1>
        <p className="text-text-dim mb-4">{mod.description}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 flex-1 max-w-xs bg-surface2 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: mod.color }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className="text-sm text-text-dim">{progress}%</span>
        </div>
      </motion.header>

      <div className="space-y-8">
        {mod.chapters.map((chapter, ci) => (
          <motion.section
            key={chapter.id}
            initial={SECTION_STAGGER.initial}
            animate={SECTION_STAGGER.animate}
            transition={{ ...SECTION_STAGGER.transition, delay: ci * SECTION_STAGGER.staggerDelay * 2 }}
          >
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
              {chapter.title}
            </h2>
            <ul className="space-y-2">
              {chapter.topics.map((topic) => {
                const lessonProgress = getLessonProgress(mod.id, topic.id);
                const href = `/${mod.slug}/${chapter.slug}/${topic.slug}`;
                return (
                  <li key={topic.id}>
                    <Link
                      href={href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface2/50 transition-colors group"
                    >
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          lessonProgress.completed
                            ? 'bg-atom/20 text-atom'
                            : 'bg-surface2 text-text-muted'
                        }`}
                      >
                        {lessonProgress.completed ? '✓' : (chapter.topics.indexOf(topic) + 1)}
                      </span>
                      <span className="flex-1">{topic.title}</span>
                      {topic.hasInteractive && (
                        <span className="text-xs px-2 py-0.5 rounded bg-quantenobjekte/20 text-quantenobjekte">
                          Interaktiv
                        </span>
                      )}
                      <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
