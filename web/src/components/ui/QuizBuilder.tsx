import { Plus } from 'lucide-react'
import { MetaBadges } from './MetaBadges'
import { TimeLimitSelector } from './TimeLimitSelector'
import { QuestionCard } from './QuestionCard'
import { ActionBar } from './ActionBar'

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

type LearningPath = {
  key: string
  emoji: string
  title: string
}

type QuizBuilderProps = {
  title: string
  description: string
  timeLimit: number
  questions: Question[]
  targetPath: string
  learningPaths: LearningPath[]
  onTitleChange: (title: string) => void
  onDescriptionChange: (description: string) => void
  onTimeLimitChange: (time: number) => void
  onTargetPathChange: (path: string) => void
  onAddQuestion: () => void
  onRemoveQuestion: (questionId: string) => void
  onQuestionTextChange: (questionId: string, text: string) => void
  onQuestionTypeChange: (questionId: string, type: QuestionType) => void
  onAnswerTextChange: (
    questionId: string,
    answerId: string,
    text: string
  ) => void
  onToggleCorrect: (questionId: string, answerId: string) => void
  onSaveDraft?: () => void
  onPublish?: () => void
  dark?: boolean
}

export const QuizBuilder = ({
  title,
  description,
  timeLimit,
  questions,
  targetPath,
  learningPaths,
  onTitleChange,
  onDescriptionChange,
  onTimeLimitChange,
  onTargetPathChange,
  onAddQuestion,
  onRemoveQuestion,
  onQuestionTextChange,
  onQuestionTypeChange,
  onAnswerTextChange,
  onToggleCorrect,
  onSaveDraft,
  onPublish,
  dark = false,
}: QuizBuilderProps) => {
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0)

  return (
    <div className="space-y-8">
      {/* Meta card */}
      <div
        className={`p-8 rounded-[3rem] border ${
          dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
        }`}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Quiz Title"
          className={`w-full text-2xl font-black outline-none mb-3 bg-transparent ${
            dark
              ? 'text-white placeholder-gray-600'
              : 'text-[#22223B] placeholder-gray-300'
          }`}
        />
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
          className={`w-full text-sm font-medium outline-none resize-none mb-4 bg-transparent ${
            dark
              ? 'text-gray-300 placeholder-gray-600'
              : 'text-gray-500 placeholder-gray-300'
          }`}
        />

        {/* Target learning path */}
        <div className="mb-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
            Assign to Learning Path
          </label>
          <select
            value={targetPath}
            onChange={(e) => onTargetPathChange(e.target.value)}
            className={`w-full p-3 rounded-xl border font-bold text-sm ${
              dark
                ? 'bg-[#1A1A2E] border-[#3A3A55] text-white'
                : 'bg-gray-50 border-gray-200 text-[#22223B]'
            }`}
          >
            {learningPaths.map((path) => (
              <option key={path.key} value={path.key}>
                {path.emoji} {path.title}
              </option>
            ))}
          </select>
        </div>

        {/* Meta badges */}
        <MetaBadges
          timeLimit={timeLimit}
          questionCount={questions.length}
          totalPoints={totalPoints}
        />
      </div>

      {/* Time limit */}
      <TimeLimitSelector
        selectedTime={timeLimit}
        onTimeChange={onTimeLimitChange}
        dark={dark}
      />

      {/* Questions */}
      <div className="space-y-6">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Questions
        </p>
        {questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onTextChange={(text) => onQuestionTextChange(question.id, text)}
            onTypeChange={(type) => onQuestionTypeChange(question.id, type)}
            onAnswerTextChange={(answerId, text) =>
              onAnswerTextChange(question.id, answerId, text)
            }
            onToggleCorrect={(answerId) =>
              onToggleCorrect(question.id, answerId)
            }
            onRemove={() => onRemoveQuestion(question.id)}
            dark={dark}
          />
        ))}

        <button
          onClick={onAddQuestion}
          className={`w-full p-5 rounded-[2.5rem] border-2 border-dashed flex items-center justify-center gap-2 font-bold text-sm ${
            dark
              ? 'border-[#3A3A55] text-gray-400 hover:border-[#B9A7F8] hover:text-[#B9A7F8]'
              : 'border-gray-200 text-gray-400 hover:border-[#B9A7F8] hover:text-[#B9A7F8]'
          }`}
        >
          <Plus className="w-5 h-5" /> Add Question
        </button>
      </div>

      {/* Bottom action bar */}
      <ActionBar onSaveDraft={onSaveDraft} onPublish={onPublish} dark={dark} />
    </div>
  )
}
