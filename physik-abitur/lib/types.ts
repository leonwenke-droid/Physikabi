// Physik Abitur Lernplattform - TypeScript Typen

export type ModuleId = 'elektrizitaet' | 'schwingungen' | 'quantenobjekte' | 'atomhuelle' | 'messunsicherheiten';

export type ModuleColor = string;

export interface Topic {
  id: string;
  title: string;
  slug: string;
  description?: string;
  hasInteractive?: boolean;
  hasQuiz?: boolean;
  level?: 'gA' | 'eA';
}

export interface Chapter {
  id: string;
  title: string;
  slug: string;
  topics: Topic[];
}

export interface Module {
  id: ModuleId;
  title: string;
  slug: string;
  color: string;
  description: string;
  chapters: Chapter[];
}

export interface LessonContent {
  intro: string;
  learningGoals: string[];
  sections: ContentSection[];
  conceptChecks?: ConceptCheck[];
  summaryChecklist: string[];
  interactiveComponent?: string;
  /** Messunsicherheits-Hinweis für experimentelle Lektionen */
  uncertaintyHint?: string;
}

export interface ContentSection {
  type: 'text' | 'formula' | 'note' | 'ea' | 'experiment' | 'tip' | 'remember';
  content?: string;
  formula?: string;
  variables?: Record<string, string>;
}

export interface ConceptCheck {
  id: string;
  type: 'multiple-choice' | 'formula-select' | 'numeric';
  question: string;
  options?: string[];
  correct: number;
  explanation: string;
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'formula-select' | 'numeric' | 'drag-drop' | 'sort';
  question: string;
  options?: string[];
  correct?: number;
  answer?: number;
  unit?: string;
  tolerance?: number;
  items?: string[];
  targets?: string[];
  correctPairs?: [number, number][];
  correctOrder?: number[];
  explanation: string;
  hint?: string;
  solution?: string;
}

export interface LessonProgress {
  completed: boolean;
  completedAt?: Date;
  checklistItems: Record<string, boolean>;
}

export interface QuizProgress {
  score: number;
  attempts: number;
  bestScore: number;
  passed: boolean;
  lastAttempt: Date;
}

export interface StreakData {
  current: number;
  lastActive: Date;
  longest: number;
}

export interface Progress {
  lessons: Record<string, LessonProgress>;
  quizzes: Record<string, QuizProgress>;
  streak: StreakData;
  totalTimeMinutes: number;
  lastLesson?: { moduleId: string; topicId: string };
  unlockedBadges?: string[];
}

export interface BadgeDef {
  id: string;
  emoji: string;
  name: string;
  description: string;
}
