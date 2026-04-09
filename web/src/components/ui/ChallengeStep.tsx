import React from 'react'
import { motion } from 'motion/react'
import { QuizOptions } from './QuizOptions'
import { ChallengeInput } from './ChallengeInput'
import { ChallengeExplanation } from './ChallengeExplanation'

interface ChallengeStepData {
  type: 'info' | 'quiz' | 'input'
  title: string
  content: string
  options?: { key: string; text: string }[]
  correctKey?: string
  correctAnswer?: string
  placeholder?: string
  explanation?: string
}

interface ChallengeStepProps {
  stepData: ChallengeStepData
  stepNumber: number
  totalSteps: number
  selectedKey: string | null
  answered: boolean
  inputValue: string
  inputChecked: boolean
  onSelectOption: (key: string) => void
  onInputChange: (value: string) => void
  onCheckInput: () => void
  dark: boolean
}

export const ChallengeStep: React.FC<ChallengeStepProps> = ({
  stepData,
  stepNumber,
  totalSteps,
  selectedKey,
  answered,
  inputValue,
  inputChecked,
  onSelectOption,
  onInputChange,
  onCheckInput,
  dark,
}) => {
  const showExplanation =
    (stepData.type === 'quiz' && answered) ||
    (stepData.type === 'input' && inputChecked)
  const isCorrect =
    (stepData.type === 'quiz' && selectedKey === stepData.correctKey) ||
    (stepData.type === 'input' &&
      inputValue.replace(/[£,\s]/g, '') === stepData.correctAnswer)

  return (
    <motion.div
      key={stepNumber}
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -25 }}
    >
      {/* Step label */}
      <div className="flex items-center gap-2 mb-4">
        <span className="bg-[#B9A7F8]/10 text-[#B9A7F8] text-[10px] font-bold px-3 py-1 rounded-lg uppercase tracking-wider">
          Step {stepNumber + 1}/{totalSteps}
        </span>
        <span
          className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          {stepData.title}
        </span>
      </div>

      {/* Content */}
      <div
        className={`p-6 rounded-3xl border mb-6 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
      >
        <p
          className={`text-sm leading-relaxed font-medium ${dark ? 'text-gray-300' : 'text-[#22223B]'}`}
        >
          {stepData.content}
        </p>
      </div>

      {/* Quiz options */}
      {stepData.type === 'quiz' && stepData.options && (
        <QuizOptions
          options={stepData.options}
          selectedKey={selectedKey}
          correctKey={stepData.correctKey || ''}
          answered={answered}
          onSelect={onSelectOption}
          dark={dark}
        />
      )}

      {/* Input */}
      {stepData.type === 'input' && (
        <ChallengeInput
          value={inputValue}
          onChange={onInputChange}
          placeholder={stepData.placeholder}
          disabled={inputChecked}
          inputChecked={inputChecked}
          onCheck={onCheckInput}
          dark={dark}
        />
      )}

      {/* Explanation */}
      {showExplanation && stepData.explanation && (
        <ChallengeExplanation
          explanation={stepData.explanation}
          isCorrect={isCorrect}
          dark={dark}
        />
      )}
    </motion.div>
  )
}
