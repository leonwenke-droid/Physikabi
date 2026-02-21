'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Progress, LessonProgress, QuizProgress, StreakData } from './types';
import { modules } from './content';

const STORAGE_KEY = 'physik-abitur-progress';

const defaultStreak: StreakData = {
  current: 0,
  lastActive: new Date(0), // Epoch = "never learned"
  longest: 0,
};

const defaultProgress: Progress = {
  lessons: {},
  quizzes: {},
  streak: defaultStreak,
  totalTimeMinutes: 0,
  unlockedBadges: [],
};

function getDaysBetween(a: Date | string, b: Date | string): number {
  const d1 = typeof a === 'string' ? new Date(a) : a;
  const d2 = typeof b === 'string' ? new Date(b) : b;
  const ms = d2.getTime() - d1.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

const BADGES: { id: string; emoji: string; name: string; check: (p: Progress, total: number) => boolean }[] = [
  {
    id: 'raketenstart',
    emoji: '🚀',
    name: 'Raketenstart',
    check: (p, _total) => Object.values(p.lessons).filter((l) => l.completed).length >= 1,
  },
  {
    id: 'voltmeister',
    emoji: '⚡',
    name: 'Voltmeister',
    check: (p) => {
      const mod = modules.find((m) => m.id === 'elektrizitaet');
      if (!mod) return false;
      const total = mod.chapters.reduce((a, c) => a + c.topics.length, 0);
      const done = Object.keys(p.lessons).filter(
        (k) => k.startsWith('elektrizitaet/') && p.lessons[k].completed
      ).length;
      return total > 0 && done >= total;
    },
  },
  {
    id: 'wellensurfer',
    emoji: '🌊',
    name: 'Wellensurfer',
    check: (p) => {
      const mod = modules.find((m) => m.id === 'schwingungen');
      if (!mod) return false;
      const total = mod.chapters.reduce((a, c) => a + c.topics.length, 0);
      const done = Object.keys(p.lessons).filter(
        (k) => k.startsWith('schwingungen/') && p.lessons[k].completed
      ).length;
      return total > 0 && done >= total;
    },
  },
  {
    id: 'quantendenker',
    emoji: '⬡',
    name: 'Quantendenker',
    check: (p) => {
      const mod = modules.find((m) => m.id === 'quantenobjekte');
      if (!mod) return false;
      const total = mod.chapters.reduce((a, c) => a + c.topics.length, 0);
      const done = Object.keys(p.lessons).filter(
        (k) => k.startsWith('quantenobjekte/') && p.lessons[k].completed
      ).length;
      return total > 0 && done >= total;
    },
  },
  {
    id: 'atomforscher',
    emoji: '◎',
    name: 'Atomforscher',
    check: (p) => {
      const mod = modules.find((m) => m.id === 'atomhuelle');
      if (!mod) return false;
      const total = mod.chapters.reduce((a, c) => a + c.topics.length, 0);
      const done = Object.keys(p.lessons).filter(
        (k) => k.startsWith('atomhuelle/') && p.lessons[k].completed
      ).length;
      return total > 0 && done >= total;
    },
  },
  {
    id: 'praezisionsdenker',
    emoji: '±',
    name: 'Präzisionsdenker',
    check: (p) => {
      const mod = modules.find((m) => m.id === 'messunsicherheiten');
      if (!mod) return false;
      const total = mod.chapters.reduce((a, c) => a + c.topics.length, 0);
      const done = Object.keys(p.lessons).filter(
        (k) => k.startsWith('messunsicherheiten/') && p.lessons[k].completed
      ).length;
      return total > 0 && done >= total;
    },
  },
  {
    id: 'streak7',
    emoji: '🔥',
    name: '7-Tage-Streak',
    check: (p) => (p.streak?.current ?? 0) >= 7,
  },
  {
    id: 'abiturbereit',
    emoji: '🏆',
    name: 'Abiturbereit',
    check: (p, total) => {
      const done = Object.values(p.lessons).filter((l) => l.completed).length;
      return total > 0 && done >= total;
    },
  },
];

function computeUnlockedBadges(p: Progress, totalLessons: number): string[] {
  const ids: string[] = [];
  for (const b of BADGES) {
    if (b.check(p, totalLessons)) ids.push(b.id);
  }
  return ids;
}

export const MILESTONES = [25, 50, 75, 100] as const;
export const MILESTONE_MESSAGES: Record<number, string> = {
  25: '25% geschafft — guter Start! Du hast den Grundstein gelegt.',
  50: '50% erreicht — halb durch! Weiter so!',
  75: '75% abgeschlossen — fast geschafft!',
  100: '100% — Abiturbereit! Alle Lektionen gemeistert. 🏆',
};

export { BADGES };

export const useProgressStore = create<{
  progress: Progress;
  completeLesson: (moduleId: string, topicId: string, checklistItems?: Record<string, boolean>) => void;
  completeQuiz: (quizId: string, score: number) => void;
  completeChapterByQuiz: (moduleId: string, topicIds: string[]) => void;
  updateChecklistItem: (moduleId: string, topicId: string, itemKey: string, checked: boolean, totalItems: number) => void;
  updateStreak: () => void;
  setLastLesson: (moduleId: string, topicId: string) => void;
  getQuizProgress: (quizId: string) => QuizProgress | null;
  getLessonProgress: (moduleId: string, topicId: string) => LessonProgress;
  getModuleProgress: (moduleId: string, totalLessons: number) => number;
  getChapterProgress: (moduleId: string, chapterSlug: string, topicIds: string[]) => { done: number; total: number };
  getTotalProgress: (totalLessons: number) => number;
  getTotalLessons: () => number;
  getUnlockedBadges: () => string[];
  getMilestoneMessage: (percent: number) => string | null;
  resetProgress: () => void;
}>()(
  persist(
    (set, get) => {
      const totalLessons = () =>
        modules.reduce((a, m) => a + m.chapters.reduce((c, ch) => c + ch.topics.length, 0), 0);

      return {
        progress: defaultProgress,

        completeLesson: (moduleId, topicId, checklistItems = {}) => {
          const key = `${moduleId}/${topicId}`;
          set((state) => {
            const lessons = { ...state.progress.lessons };
            lessons[key] = {
              completed: true,
              completedAt: new Date(),
              checklistItems,
            };
            const progress = {
              ...state.progress,
              lessons,
              lastLesson: { moduleId, topicId },
            };
            return { progress };
          });
          get().updateStreak();
        },

        completeQuiz: (quizId, score) => {
          set((state) => {
            const existing = state.progress.quizzes[quizId];
            const attempts = (existing?.attempts || 0) + 1;
            const bestScore = Math.max(existing?.bestScore || 0, score);
            const passed = score >= 80;
            const quizzes = {
              ...state.progress.quizzes,
              [quizId]: {
                score,
                attempts,
                bestScore,
                passed,
                lastAttempt: new Date(),
              },
            };
            const progress = { ...state.progress, quizzes };
            return { progress };
          });
          get().updateStreak();
        },

        completeChapterByQuiz: (moduleId, topicIds) => {
          set((state) => {
            const lessons = { ...state.progress.lessons };
            topicIds.forEach((topicId) => {
              const key = `${moduleId}/${topicId}`;
              lessons[key] = {
                completed: true,
                completedAt: new Date(),
                checklistItems: {},
              };
            });
            const progress = { ...state.progress, lessons };
            return { progress };
          });
        get().updateStreak();
      },

        updateChecklistItem: (moduleId, topicId, itemKey, checked, totalItems) => {
          const key = `${moduleId}/${topicId}`;
          set((state) => {
            const lessons = { ...state.progress.lessons };
            const existing = lessons[key] || { completed: false, checklistItems: {} };
            const checklistItems = { ...existing.checklistItems, [itemKey]: checked };
            const checkedCount = Object.values(checklistItems).filter(Boolean).length;
            const allChecked = totalItems > 0 && checkedCount >= totalItems;

            lessons[key] = {
              ...existing,
              checklistItems,
              completed: existing.completed || allChecked,
              completedAt: existing.completedAt || (allChecked ? new Date() : undefined),
            };
            const progress = {
              ...state.progress,
              lessons,
              lastLesson: { moduleId, topicId },
            };
            return { progress };
          });
          get().updateStreak();
        },

        updateStreak: () => {
          const now = new Date();
          set((state) => {
            const last = state.progress.streak?.lastActive;
            const lastDate = last ? (typeof last === 'string' ? new Date(last) : last) : new Date(0);
            const diffDays = getDaysBetween(lastDate, now);
            let { current, longest } = state.progress.streak ?? defaultStreak;

            if (diffDays === 0) {
              if (current === 0 && lastDate.getTime() === 0) {
                current = 1;
                longest = Math.max(longest, 1);
              } else {
                return state;
              }
            } else if (diffDays === 1) {
              current += 1;
              longest = Math.max(longest, current);
            } else {
              current = 1;
            }

            const progress = {
              ...state.progress,
              streak: {
                current,
                lastActive: now,
                longest,
              },
            };
            return { progress };
          });
        },

        setLastLesson: (moduleId, topicId) => {
          set((state) => ({
            progress: {
              ...state.progress,
              lastLesson: { moduleId, topicId },
            },
          }));
          get().updateStreak();
        },

        getQuizProgress: (quizId: string) => {
          return get().progress.quizzes[quizId] || null;
        },

        getLessonProgress: (moduleId, topicId) => {
          const key = `${moduleId}/${topicId}`;
          return get().progress.lessons[key] || { completed: false, checklistItems: {} };
        },

        getModuleProgress: (moduleId, totalLessons) => {
          const lessons = get().progress.lessons;
          const completed = Object.keys(lessons).filter(
            (k) => k.startsWith(`${moduleId}/`) && lessons[k].completed
          ).length;
          return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
        },

        getChapterProgress: (moduleId, chapterSlug, topicIds) => {
          const lessons = get().progress.lessons;
          let done = 0;
          for (const tid of topicIds) {
            const key = `${moduleId}/${tid}`;
            if (lessons[key]?.completed) done++;
          }
          return { done, total: topicIds.length };
        },

        getTotalProgress: (totalLessons) => {
          const completed = Object.values(get().progress.lessons).filter((l) => l.completed).length;
          return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
        },

        getTotalLessons: () => totalLessons(),

        getUnlockedBadges: () =>
          computeUnlockedBadges(get().progress, get().getTotalLessons()),

        getMilestoneMessage: (percent) => MILESTONE_MESSAGES[percent] ?? null,

        resetProgress: () => {
          set({ progress: { ...defaultProgress } });
        },
      };
    },
    {
      name: STORAGE_KEY,
      partialize: (state) => ({ progress: state.progress }),
      skipHydration: true,
    }
  )
);
