import React from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

interface QuizOption {
  key: string
  text: string
}

interface QuizOptionsProps {
  options: QuizOption[]
  selectedKey: string | null
  correctKey: string
  answered: boolean
  onSelect: (key: string) => void
  dark: boolean
}

export const QuizOptions: React.FC<QuizOptionsProps> = ({
  options,
  selectedKey,
  correctKey,
  answered,
  onSelect,
  dark,
}) => {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const isSelected = selectedKey === opt.key
        const isCorrect = opt.key === correctKey
        let cls = dark
          ? 'bg-[#2A2A40] border-[#3A3A55]'
          : 'bg-white border-gray-100'
        if (answered && isCorrect)
          cls = 'bg-emerald-50 border-emerald-500 dark:bg-emerald-500/10'
        else if (answered && isSelected && !isCorrect)
          cls = 'bg-rose-50 border-rose-500 dark:bg-rose-500/10'
        return (
          <button
            key={opt.key}
            disabled={answered}
            onClick={() => onSelect(opt.key)}
            className={`w-full p-5 rounded-2xl border-2 text-left font-bold flex items-center gap-4 transition-all ${cls}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                answered && isCorrect
                  ? 'bg-emerald-500 text-white'
                  : answered && isSelected
                    ? 'bg-rose-500 text-white'
                    : isSelected
                      ? 'bg-[#B9A7F8] text-white'
                      : dark
                        ? 'bg-[#1A1A2E] text-gray-400'
                        : 'bg-gray-100 text-gray-400'
              }`}
            >
              {answered && isCorrect ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : answered && isSelected ? (
                <XCircle className="w-4 h-4" />
              ) : (
                opt.key.toUpperCase()
              )}
            </div>
            <span className={dark ? 'text-gray-200' : 'text-[#22223B]'}>
              {opt.text}
            </span>
          </button>
        )
      })}
    </div>
  )
}
