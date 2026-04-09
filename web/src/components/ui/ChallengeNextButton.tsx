import React from 'react'
import { motion } from 'motion/react'

interface ChallengeNextButtonProps {
  onNext: () => void
  isLastStep: boolean
}

export const ChallengeNextButton: React.FC<ChallengeNextButtonProps> = ({
  onNext,
  isLastStep,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <button
        onClick={onNext}
        className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg hover:scale-[1.02] transition-all"
      >
        {isLastStep ? 'See Results' : 'Next →'}
      </button>
    </motion.div>
  )
}
