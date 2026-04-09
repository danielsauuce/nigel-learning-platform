import { CheckCircle2, Lock } from 'lucide-react'
import type { LearningPath } from '../../types'

type LearningPathCardProps = {
  path: LearningPath
  completed: number
  total: number
  status: 'locked' | 'mastered' | 'active'
  dark: boolean
}

export const LearningPathCard = ({
  path,
  completed,
  total,
  status,
  dark,
}: LearningPathCardProps) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-2xl border ${
        status === 'locked' ? 'opacity-50' : ''
      } ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
        style={{ backgroundColor: path.color + '15' }}
      >
        {path.emoji}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span
            className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            {path.title}
          </span>
          {status === 'mastered' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          ) : status === 'locked' ? (
            <Lock className="w-4 h-4 text-gray-400" />
          ) : (
            <span className="font-bold text-xs" style={{ color: path.color }}>
              {percent}%
            </span>
          )}
        </div>
        <div
          className={`h-1.5 rounded-full overflow-hidden ${dark ? 'bg-[#3A3A55]' : 'bg-gray-100'}`}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${percent}%`,
              backgroundColor: status === 'mastered' ? '#4CAF50' : path.color,
            }}
          />
        </div>
        <span className="text-[10px] text-gray-400">
          {completed}/{total} lessons
        </span>
      </div>
    </div>
  )
}
