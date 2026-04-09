import React from 'react'
import { ArrowLeft, Zap, Clock } from 'lucide-react'

interface ChallengeHeaderProps {
  onBack: () => void
  timer: number
  formatTime: (s: number) => string
  dark: boolean
}

export const ChallengeHeader: React.FC<ChallengeHeaderProps> = ({
  onBack,
  timer,
  formatTime,
  dark,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onBack}
        className={`w-10 h-10 rounded-xl flex items-center justify-center ${dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'}`}
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-[#B9A7F8]" />
        <span
          className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          Daily Challenge
        </span>
      </div>
      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border ${timer < 60 ? 'border-rose-300 text-rose-500' : dark ? 'border-[#3A3A55] text-gray-400' : 'border-gray-200 text-gray-400'}`}
      >
        <Clock className="w-3 h-3" />
        <span className="font-bold text-xs">{formatTime(timer)}</span>
      </div>
    </div>
  )
}
