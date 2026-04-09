interface LessonProgressProps {
  lessons: Array<{ id: string }>
  completedLessons: Set<string>
  currentLessonIdx: number
}

export const LessonProgress = ({
  lessons,
  completedLessons,
  currentLessonIdx,
}: LessonProgressProps) => {
  return (
    <div className="flex gap-2 mb-8">
      {lessons.map((l, i) => (
        <div
          key={l.id}
          className={`h-2 flex-1 rounded-full transition-all ${
            completedLessons.has(l.id)
              ? 'bg-[#B9A7F8]'
              : i === currentLessonIdx
                ? 'bg-[#B9A7F8]/40'
                : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  )
}
