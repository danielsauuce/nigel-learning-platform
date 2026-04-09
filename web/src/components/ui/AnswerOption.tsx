import { CheckCircle2, XCircle } from 'lucide-react'

type Answer = {
  id: string
  text: string
  correct: boolean
}

type AnswerOptionProps = {
  answer: Answer
  onTextChange: (text: string) => void
  onToggleCorrect: () => void
  dark?: boolean
}

export const AnswerOption = ({
  answer,
  onTextChange,
  onToggleCorrect,
  dark = false,
}: AnswerOptionProps) => (
  <div
    className={`flex items-center gap-3 p-4 rounded-2xl border ${
      answer.correct
        ? dark
          ? 'border-emerald-500 bg-emerald-500/10'
          : 'border-emerald-400 bg-emerald-50'
        : dark
          ? 'border-[#3A3A55] bg-[#1A1A2E]'
          : 'border-gray-100 bg-gray-50'
    }`}
  >
    <button
      onClick={onToggleCorrect}
      className={`w-7 h-7 rounded-full flex items-center justify-center ${
        answer.correct
          ? 'bg-emerald-500'
          : dark
            ? 'bg-[#2A2A40] border border-[#3A3A55]'
            : 'bg-white border border-gray-200'
      }`}
    >
      {answer.correct ? (
        <CheckCircle2 className="w-4 h-4 text-white" />
      ) : (
        <XCircle className="w-3 h-3 text-gray-300" />
      )}
    </button>
    <input
      type="text"
      value={answer.text}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Answer option..."
      className={`flex-1 outline-none font-medium text-sm bg-transparent ${
        dark
          ? 'text-gray-300 placeholder-gray-600'
          : 'text-[#22223B] placeholder-gray-300'
      }`}
    />
  </div>
)
