import React from 'react'
import { motion } from 'motion/react'
import { Trophy, CheckCircle2, Timer, Zap, Flame } from 'lucide-react'

interface ChallengeResultsProps {
  score: number
  totalQuestions: number
  timer: number
  streak: number
  xpEarned: number
  dark: boolean
  onBack: () => void
}

export const ChallengeResults: React.FC<ChallengeResultsProps> = ({
  score,
  totalQuestions,
  timer,
  streak,
  xpEarned,
  dark,
  onBack,
}) => {
  const items = [
    {
      label: 'Correct answers',
      value: `+${score * 20} XP`,
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    },
    {
      label: 'Time bonus',
      value: timer > 0 ? '+10 XP' : '+0 XP',
      icon: <Timer className="w-4 h-4 text-[#B9A7F8]" />,
    },
    {
      label: 'Total earned',
      value: `+${xpEarned} XP`,
      icon: <Zap className="w-4 h-4 text-amber-500" />,
    },
  ]

  return (
    <div
      className={`min-h-screen p-6 md:p-10 flex items-center justify-center ${dark ? 'bg-[#1A1A2E]' : 'bg-[#F8F9FE]'}`}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`p-12 rounded-[4rem] shadow-2xl border max-w-md w-full text-center space-y-8 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
      >
        <div className="w-24 h-24 bg-amber-100 rounded-[2.5rem] flex items-center justify-center text-amber-500 mx-auto">
          <Trophy className="w-12 h-12" />
        </div>
        <h2
          className={`text-3xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          {score === totalQuestions ? 'Perfect Score!' : 'Challenge Complete!'}
        </h2>
        <p
          className={`font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          You scored {score}/{totalQuestions} on today's challenge.
        </p>
        <div
          className={`p-5 rounded-3xl space-y-3 ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
        >
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.icon}
                <span
                  className={`font-medium text-sm ${dark ? 'text-gray-300' : 'text-[#22223B]'}`}
                >
                  {item.label}
                </span>
              </div>
              <span className="font-bold text-sm text-[#B9A7F8]">
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div
          className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? 'bg-amber-500/10 border-amber-500/20' : 'bg-amber-50 border-amber-100'}`}
        >
          <Flame className="w-5 h-5 text-orange-500 shrink-0" />
          <div className="text-left flex-1">
            <p
              className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
            >
              {streak + 1}-day streak!
            </p>
            <p className="text-xs text-gray-400">
              Come back tomorrow to keep it going
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg"
        >
          Back to Dashboard
        </button>
      </motion.div>
    </div>
  )
}
