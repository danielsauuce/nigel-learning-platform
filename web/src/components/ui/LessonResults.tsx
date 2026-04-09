import { motion } from 'motion/react'
import { Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface LessonResultsProps {
  score: number
  completedInSession: number
}

export const LessonResults = ({
  score,
  completedInSession,
}: LessonResultsProps) => {
  const navigate = useNavigate()

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-16 rounded-[4rem] shadow-sm border border-gray-100 text-center space-y-8"
    >
      <div className="w-24 h-24 bg-amber-100 rounded-[2.5rem] flex items-center justify-center text-amber-500 mx-auto">
        <Trophy className="w-12 h-12" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black text-[#22223B]">Path Complete!</h2>
        <p className="text-gray-500 font-medium text-lg">
          You scored {score} / {completedInSession} and earned +
          {completedInSession * 25} XP
        </p>
      </div>
      <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 inline-block">
        <p className="text-emerald-600 font-black text-xl">
          +{completedInSession * 25} XP
        </p>
        <p className="text-emerald-500/60 text-[10px] font-bold uppercase tracking-widest">
          Experience Earned
        </p>
      </div>
      <div className="pt-6">
        <button
          onClick={() => navigate('/student-dashboard')}
          className="bg-[#22223B] text-white font-black px-12 py-5 rounded-3xl shadow-xl hover:scale-105 transition-transform"
        >
          Back to Dashboard
        </button>
      </div>
    </motion.div>
  )
}
