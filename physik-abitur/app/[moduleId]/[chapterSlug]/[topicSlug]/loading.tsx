export default function LessonLoading() {
  return (
    <div className="max-w-[780px] mx-auto p-4 sm:p-6 md:p-8 animate-pulse">
      <div className="h-6 w-48 bg-surface2 rounded mb-4" />
      <div className="h-4 w-32 bg-surface2 rounded mb-6" />
      <div className="h-8 w-3/4 bg-surface2 rounded mb-4" />
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-surface2 rounded w-full" />
        <div className="h-4 bg-surface2 rounded w-5/6" />
        <div className="h-4 bg-surface2 rounded w-4/5" />
      </div>
      <div className="h-48 bg-surface2 rounded-xl" />
    </div>
  );
}
