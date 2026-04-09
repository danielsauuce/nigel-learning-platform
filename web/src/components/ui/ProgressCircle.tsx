import React from 'react'

interface ProgressCircleProps {
  progress: number
  dark: boolean
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  dark,
}) => {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={dark ? '#3A3A55' : '#E5E7EB'}
          strokeWidth="8"
          opacity="0.25"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#B9A7F8"
          strokeWidth="8"
          strokeDasharray={`${2 * Math.PI * 42}`}
          strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-lg font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          {progress}%
        </span>
        <span className="text-[8px] text-gray-400">complete</span>
      </div>
    </div>
  )
}
