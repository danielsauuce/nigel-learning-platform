import { motion } from 'motion/react'
import { ChevronRight, Lightbulb } from 'lucide-react'

interface LessonSlideProps {
  emoji?: string
  title: string
  content: string
  lessonNumber: number
  totalLessons: number
  hasQuiz: boolean
  onNext: () => void
}

export const LessonSlide = ({
  emoji,
  title,
  content,
  lessonNumber,
  totalLessons,
  hasQuiz,
  onNext,
}: LessonSlideProps) => {
  return (
    <motion.div
      key="slide"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border border-gray-100 space-y-8"
    >
      <div className="space-y-4">
        <div className="w-12 h-12 bg-[#B9A7F8]/10 rounded-2xl flex items-center justify-center text-[#B9A7F8]">
          <Lightbulb className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-black text-[#22223B]">
          {emoji} {title}
        </h2>
        <p className="text-gray-500 text-lg font-medium leading-relaxed">
          {content}
        </p>
      </div>
      <div className="pt-10 flex items-center justify-between">
        <p className="text-sm font-bold text-gray-400">
          Lesson {lessonNumber} of {totalLessons}
        </p>
        <button
          onClick={onNext}
          className="bg-[#22223B] text-white font-black px-8 py-4 rounded-2xl flex items-center gap-2 hover:scale-105 transition-transform"
        >
          {hasQuiz ? 'Take Quiz' : 'Complete'}{' '}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  )
}
