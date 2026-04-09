import React from 'react'

interface ChallengeProgressProps {
  steps: any[]
  currentStep: number
  dark: boolean
}

export const ChallengeProgress: React.FC<ChallengeProgressProps> = ({
  steps,
  currentStep,
  dark,
}) => {
  return (
    <div className="flex gap-1.5 mb-8">
      {steps.map((_, i) => (
        <div
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-all ${i < currentStep ? 'bg-emerald-400' : i === currentStep ? 'bg-[#B9A7F8]' : dark ? 'bg-[#3A3A55]' : 'bg-gray-200'}`}
        />
      ))}
    </div>
  )
}
