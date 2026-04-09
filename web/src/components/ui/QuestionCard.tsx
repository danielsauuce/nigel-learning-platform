import { Trash2 } from 'lucide-react'
import { AnswerOption } from './AnswerOption'

type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer'

type Answer = {
  id: string
  text: string
  correct: boolean
}

type Question = {
  id: string
  text: string
  type: QuestionType
  answers: Answer[]
  points: number
}

type QuestionCardProps = {
  question: Question
  index: number
  onTextChange: (text: string) => void
  onTypeChange: (type: QuestionType) => void
  onAnswerTextChange: (answerId: string, text: string) => void
  onToggleCorrect: (answerId: string) => void
  onRemove: () => void
  dark?: boolean
}

export const QuestionCard = ({
  question,
  index,
  onTextChange,
  onTypeChange,
  onAnswerTextChange,
  onToggleCorrect,
  onRemove,
  dark = false,
}: QuestionCardProps) => (
  <div
    className={`p-8 rounded-[2.5rem] border ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <div className="flex items-center justify-between mb-4">
      <span
        className={`font-black text-sm ${
          dark ? 'text-white' : 'text-[#22223B]'
        }`}
      >
        Question {index + 1}
      </span>
      <div className="flex items-center gap-2">
        {(['multiple_choice', 'true_false', 'short_answer'] as const).map(
          (type) => (
            <button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-3 py-1 rounded-lg text-[10px] font-bold ${
                question.type === type
                  ? 'bg-[#B9A7F8] text-white'
                  : dark
                    ? 'bg-[#1A1A2E] text-gray-400'
                    : 'bg-gray-100 text-gray-400'
              }`}
            >
              {type === 'multiple_choice'
                ? 'Multiple'
                : type === 'true_false'
                  ? 'T/F'
                  : 'Short'}
            </button>
          )
        )}
        <button
          onClick={onRemove}
          className="text-gray-300 hover:text-rose-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    <input
      type="text"
      value={question.text}
      onChange={(e) => onTextChange(e.target.value)}
      placeholder="Enter your question..."
      className={`w-full text-lg font-bold outline-none mb-6 bg-transparent ${
        dark
          ? 'text-white placeholder-gray-600'
          : 'text-[#22223B] placeholder-gray-300'
      }`}
    />

    {/* Answer options */}
    {question.type !== 'short_answer' && (
      <div className="space-y-3">
        {question.answers.map((answer) => (
          <AnswerOption
            key={answer.id}
            answer={answer}
            onTextChange={(text) => onAnswerTextChange(answer.id, text)}
            onToggleCorrect={() => onToggleCorrect(answer.id)}
            dark={dark}
          />
        ))}
      </div>
    )}
    {question.type === 'short_answer' && (
      <div
        className={`p-4 rounded-2xl border ${
          dark ? 'border-[#3A3A55] bg-[#1A1A2E]' : 'border-gray-100 bg-gray-50'
        }`}
      >
        <p className="text-xs text-gray-400 font-medium">
          Students will type their answer — you can set accepted answers after
          publishing.
        </p>
      </div>
    )}
  </div>
)
