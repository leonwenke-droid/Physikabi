'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Waves,
  Atom,
  FlaskConical,
  Ruler,
  Check,
  Circle,
  CircleDot,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';
import { modules } from '@/lib/content';
import { useProgressStore } from '@/lib/progress';

const moduleIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  elektrizitaet: Zap,
  schwingungen: Waves,
  quantenobjekte: Atom,
  atomhuelle: FlaskConical,
  messunsicherheiten: Ruler,
};

function ProgressRing({ progress, color }: { progress: number; color: string }) {
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  return (
    <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="var(--surface2)"
        strokeWidth="3"
      />
      <motion.circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 0.5 }}
      />
    </svg>
  );
}

function ChapterProgressBar({ done, total }: { done: number; total: number }) {
  const pct = total > 0 ? (done / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1 bg-surface2 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-atom/60"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <span className="text-xs text-text-muted tabular-nums">
        {done}/{total}
      </span>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { progress, getLessonProgress, getModuleProgress, getChapterProgress } = useProgressStore();

  const totalLessons = modules.reduce(
    (acc, m) =>
      acc + m.chapters.reduce((a, c) => a + c.topics.length, 0),
    0
  );
  const completedLessons = Object.values(progress.lessons).filter((l) => l.completed).length;
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const closeMobile = () => setMobileOpen(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-border text-text hover:bg-surface2 transition-colors"
        aria-label={mobileOpen ? 'Navigation schließen' : 'Navigation öffnen'}
        aria-expanded={mobileOpen}
        aria-controls="sidebar-nav"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop (mobile) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="md:hidden fixed inset-0 bg-black/60 z-40"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        id="sidebar-nav"
        initial={false}
        animate={{
          x: isMobile ? (mobileOpen ? 0 : '-100%') : 0,
        }}
        transition={{ type: 'tween', duration: 0.2 }}
        className="fixed left-0 top-0 h-screen w-[280px] max-w-[85vw] bg-surface border-r border-border flex flex-col z-50 md:translate-x-0"
        aria-label="Modul-Navigation"
      >
      <Link
        href="/"
        onClick={closeMobile}
        className="p-4 border-b border-border flex items-center gap-3 hover:bg-surface2/50 transition-colors"
        aria-label="Zur Startseite"
      >
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-elektrizitaet to-quantenobjekte flex items-center justify-center">
          <Atom className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-heading font-bold text-lg">Physik Abitur</h1>
          <p className="text-xs text-text-dim">eA Lernplattform</p>
        </div>
      </Link>

      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-dim">Gesamtfortschritt</span>
          <span className="text-sm font-mono font-medium">{overallProgress}%</span>
        </div>
        <div className="flex justify-center">
          <ProgressRing progress={overallProgress} color="#4f9cf9" />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4" aria-label="Module">
        <ul className="space-y-1 px-3">
          {modules.map((mod) => {
            const Icon = moduleIcons[mod.id] || Atom;
            const lessonCount = mod.chapters.reduce(
              (a, c) => a + c.topics.length,
              0
            );
            const modProgress = getModuleProgress(mod.id, lessonCount);
            const isActive = pathname.includes(mod.slug);

            return (
              <li key={mod.id}>
                <Link
                  href={`/${mod.slug}`}
                  onClick={closeMobile}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive ? 'bg-surface2' : 'hover:bg-surface2/50'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${mod.color}20`, color: mod.color }}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium block truncate">
                      {mod.title}
                    </span>
                    <span className="text-xs text-text-dim">
                      {modProgress}%
                    </span>
                  </div>
                </Link>
                {(isActive || pathname === '/') && (
                  <div className="mt-1 ml-4 pl-4 border-l border-border space-y-2">
                    {mod.chapters.map((chapter) => {
                      const topicIds = chapter.topics.map((t) => t.id);
                      const chapterProg = getChapterProgress(mod.id, chapter.slug, topicIds);
                      return (
                        <div key={chapter.id}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-xs font-medium text-text-dim">
                              {chapter.title}
                            </span>
                          </div>
                          <ChapterProgressBar done={chapterProg.done} total={chapterProg.total} />
                          <ul className="space-y-0.5 mt-1">
                            {chapter.topics.map((topic) => {
                              const key = `${mod.id}/${topic.id}`;
                              const lessonProgress = getLessonProgress(mod.id, topic.id);
                              const topicPath = `/${mod.slug}/${chapter.slug}/${topic.slug}`;
                              const isTopicActive = pathname === topicPath;

                              const hasStarted =
                                lessonProgress.completed ||
                                Object.values(lessonProgress.checklistItems || {}).some(Boolean);

                              return (
                                <li key={topic.id}>
                                  <Link
                                    href={topicPath}
                                    onClick={closeMobile}
                                    className={`flex items-center gap-2 py-1.5 px-2 rounded text-sm transition-colors ${
                                      isTopicActive
                                        ? 'text-white bg-surface2'
                                        : 'text-text-dim hover:text-text'
                                    }`}
                                    aria-current={isTopicActive ? 'page' : undefined}
                                  >
                                    {lessonProgress.completed ? (
                                      <Check className="w-4 h-4 text-atom shrink-0" />
                                    ) : hasStarted ? (
                                      <CircleDot className="w-4 h-4 shrink-0" style={{ color: mod.color }} />
                                    ) : (
                                      <Circle className="w-4 h-4 shrink-0 opacity-50" />
                                    )}
                                    <span className="truncate">{topic.title}</span>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <Link
        href="/formeln"
        onClick={closeMobile}
        className={`p-3 mx-3 mb-2 rounded-lg flex items-center gap-2 text-sm transition-colors ${
          pathname === '/formeln'
            ? 'bg-elektrizitaet/20 text-elektrizitaet'
            : 'text-text-dim hover:bg-surface2/50 hover:text-text'
        }`}
        aria-current={pathname === '/formeln' ? 'page' : undefined}
      >
        <BookOpen className="w-4 h-4 shrink-0" aria-hidden />
        Formelsammlung
      </Link>

      <div className="mt-auto p-3 border-t border-border">
        <a
          href="https://lyniqmedia.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-xs text-text-dim hover:text-elektrizitaet transition-colors text-center"
        >
          powered by LYNIQ Media
        </a>
      </div>
    </motion.aside>
    </>
  );
}
