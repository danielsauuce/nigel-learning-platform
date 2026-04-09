import { motion } from 'motion/react'
import { CheckCircle2, HelpCircle } from 'lucide-react'

interface QuizQuestionProps {
  question: string
  options: string[]
  correct: number
  explanation: string
  selectedOption: number | null
  isCorrect: boolean | null
  onAnswer: (index: number) => void
  onComplete: () => void
  isLastLesson: boolean
}

export const QuizQuestion = ({
  question,
  options,
  correct,
  explanation,
  selectedOption,
  isCorrect,
  onAnswer,
  onComplete,
  isLastLesson,
}: QuizQuestionProps) => {
  return (
    <motion.div
      key="quiz"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border border-gray-100 space-y-8"
    >
      <div className="space-y-2">
        <p className="text-xs font-bold text-[#B9A7F8] uppercase tracking-widest">
          Quiz
        </p>
        <h2 className="text-2xl font-black text-[#22223B]">{question}</h2>
      </div>
      <div className="space-y-4">
        {options.map((option, i) => (
          <button
            key={i}
            disabled={selectedOption !== null}
            onClick={() => onAnswer(i)}
            className={`w-full p-6 rounded-3xl border-2 text-left font-bold transition-all flex items-center justify-between ${
              selectedOption === i
                ? isCorrect
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-rose-50 border-rose-500 text-rose-700'
                : selectedOption !== null && i === correct
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                  : 'bg-gray-50 border-transparent hover:border-gray-200 text-[#22223B]'
            }`}
          >
            {option}
            {selectedOption === i &&
              (isCorrect ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <HelpCircle className="w-5 h-5" />
              ))}
          </button>
        ))}
      </div>
      {selectedOption !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-3xl ${
            isCorrect
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-rose-50 text-rose-700'
          }`}
        >
          <p className="text-sm font-bold">{explanation}</p>
          <button
            onClick={onComplete}
            className="mt-4 w-full bg-white font-black py-4 rounded-2xl shadow-sm"
          >
            {isLastLesson ? 'Finish Path' : 'Next Lesson'}
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
