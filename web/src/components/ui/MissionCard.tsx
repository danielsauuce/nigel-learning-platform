import { motion } from 'motion/react'
import { CheckCircle2, Lock, Play } from 'lucide-react'
import type { ReactNode } from 'react'

type MissionCardProps = {
  id: string
  title: string
  emoji: string
  desc: string
  icon: ReactNode
  colorClass: string
  progress: number
  status: 'locked' | 'mastered' | 'active'
  dark: boolean
  onAction: (id: string) => void
}

export const MissionCard = ({
  id,
  title,
  emoji,
  desc,
  icon,
  colorClass,
  progress,
  status,
  dark,
  onAction,
}: MissionCardProps) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`p-8 rounded-[3rem] shadow-sm border relative overflow-hidden group ${
      status === 'locked' ? 'opacity-75' : ''
    } ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
  >
    {status === 'locked' && (
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center ${dark ? 'bg-[#1A1A2E]/60' : 'bg-gray-50/50'} backdrop-blur-[2px]`}
      >
        <div
          className={`p-4 rounded-2xl shadow-xl ${dark ? 'bg-[#2A2A40]' : 'bg-white'}`}
        >
          <Lock className="w-6 h-6 text-gray-400" />
        </div>
      </div>
    )}
    <div
      className={`${colorClass} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
    >
      {icon}
    </div>
    <h3
      className={`text-xl font-black mb-1 ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      {emoji} {title}
    </h3>
    <p
      className={`text-sm font-medium mb-6 leading-relaxed ${dark ? 'text-gray-400' : 'text-gray-500'}`}
    >
      {desc}
    </p>
    <div className="space-y-4">
      <div
        className={`w-full h-2 rounded-full overflow-hidden ${dark ? 'bg-[#3A3A55]' : 'bg-gray-100'}`}
      >
        <div
          className={`${colorClass} h-full transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold text-gray-400">
          {progress}% Complete
        </span>
        <button
          onClick={() => status !== 'locked' && onAction(id)}
          className={`flex items-center gap-2 font-black text-sm transition-all ${
            status === 'mastered'
              ? 'text-emerald-500'
              : dark
                ? 'text-white group-hover:gap-3'
                : 'text-[#22223B] group-hover:gap-3'
          }`}
        >
          {status === 'mastered' ? (
            <>
              Review <CheckCircle2 className="w-4 h-4" />
            </>
          ) : (
            <>
              Start Mission <Play className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  </motion.div>
)
