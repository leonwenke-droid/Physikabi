'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTopicByPath } from '@/lib/content';
import { getQuizQuestions } from '@/lib/content/quiz-questions';
import { useProgressStore } from '@/lib/progress';
import { QuizEngine } from '@/components/quiz/QuizEngine';

export default function QuizPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const chapterSlug = params.chapterSlug as string;
  const topicSlug = params.topicSlug as string;
  const result = getTopicByPath(moduleId, chapterSlug, topicSlug);
  const completeQuiz = useProgressStore((s) => s.completeQuiz);
  const completeChapterByQuiz = useProgressStore((s) => s.completeChapterByQuiz);

  if (!result) {
    return (
      <div className="max-w-[780px] mx-auto p-8">
        <p className="text-text-dim">Quiz nicht gefunden.</p>
        <Link href="/" className="text-elektrizitaet hover:underline mt-4 inline-block">
          Zurück zum Dashboard
        </Link>
      </div>
    );
  }

  const { module, chapter, topic } = result;
  const questions = getQuizQuestions(moduleId, chapterSlug);

  const handleComplete = (percentage: number, passed: boolean) => {
    const quizId = `${moduleId}/${chapterSlug}`;
    completeQuiz(quizId, percentage);
    if (passed) {
      const topicIds = chapter.topics.map((t) => t.id);
      completeChapterByQuiz(moduleId, topicIds);
    }
  };

  return (
    <div className="max-w-[780px] mx-auto p-8">
      <div className="mb-6">
        <Link
          href={`/${module.slug}/${chapter.slug}/${topic.slug}`}
          className="text-text-dim hover:text-text text-sm inline-flex items-center gap-1 mb-4"
        >
          ← Zurück zur Lektion
        </Link>
        <h1 className="font-heading text-2xl font-bold">
          Quiz: {topic.title}
        </h1>
        <p className="text-text-dim text-sm mt-1">
          {chapter.title} · {module.title}
        </p>
      </div>

      <QuizEngine
        questions={questions}
        moduleSlug={module.slug}
        chapterSlug={chapter.slug}
        topicSlug={topic.slug}
        topicTitle={topic.title}
        moduleColor={module.color}
        onComplete={handleComplete}
      />
    </div>
  );
}
