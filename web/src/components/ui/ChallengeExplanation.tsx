import React from 'react'
import { motion } from 'motion/react'
import { CheckCircle2, Lightbulb } from 'lucide-react'

interface ChallengeExplanationProps {
  explanation: string
  isCorrect: boolean
  dark: boolean
}

export const ChallengeExplanation: React.FC<ChallengeExplanationProps> = ({
  explanation,
  isCorrect,
  dark, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-6 p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-500/10 dark:border-emerald-500/30' : 'bg-rose-50 border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30'}`}
    >
      <p
        className={`text-sm font-bold ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}
      >
        <span className="inline-flex items-center gap-1.5">
          {isCorrect ? (
            <CheckCircle2 className="w-4 h-4 inline shrink-0" />
          ) : (
            <Lightbulb className="w-4 h-4 inline shrink-0" />
          )}
          {explanation}
        </span>
      </p>
    </motion.div>
  )
}
