import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TeacherSidebar } from '../components/TeacherSidebar'
import { useTheme } from '../context/ThemeContext'
import { LEARNING_PATHS } from '../data/learning-paths'
import { ContentTypeSelector } from '../components/ui/ContentTypeSelector'
import { ContentHeader } from '../components/ui/ContentHeader'
import { QuizBuilder } from '../components/ui/QuizBuilder'
import { LessonBuilder } from '../components/ui/LessonBuilder'
import { VideoBuilder } from '../components/ui/VideoBuilder'

/** Quiz types — mirrors mobile create-quiz/types/quiz.ts */
type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer'
interface Answer {
  id: string
  text: string
  correct: boolean
}
interface Question {
  id: string
  text: string
  type: QuestionType
  answers: Answer[]
  points: number
}
const makeId = () => Math.random().toString(36).slice(2, 8)
const makeAnswer = (text = ''): Answer => ({
  id: makeId(),
  text,
  correct: false,
})
const makeQuestion = (): Question => ({
  id: makeId(),
  text: '',
  type: 'multiple_choice',
  answers: [makeAnswer(), makeAnswer(), makeAnswer(), makeAnswer()],
  points: 10,
})

export const ContentCreation = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const [contentType, setContentType] = useState<
    'lesson' | 'quiz' | 'video' | null
  >(null)

  // Quiz builder state (mirrors mobile useCreateQuiz)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [timeLimit, setTimeLimit] = useState(15)
  const [questions, setQuestions] = useState<Question[]>([makeQuestion()])
  const [targetPath, setTargetPath] = useState(LEARNING_PATHS[0].key)

  // Lesson builder state
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonContent, setLessonContent] = useState('')
  const [lessonEmoji, setLessonEmoji] = useState('📚')

  // Video builder state
  const [videoTitle, setVideoTitle] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoNotes, setVideoNotes] = useState('')

  const addQuestion = useCallback(
    () => setQuestions((p) => [...p, makeQuestion()]),
    []
  )
  const removeQuestion = useCallback(
    (id: string) =>
      setQuestions((p) => (p.length > 1 ? p.filter((q) => q.id !== id) : p)),
    []
  )
  const updateQuestionText = useCallback(
    (id: string, text: string) =>
      setQuestions((p) => p.map((q) => (q.id === id ? { ...q, text } : q))),
    []
  )
  const updateAnswerText = useCallback(
    (qId: string, aId: string, text: string) => {
      setQuestions((p) =>
        p.map((q) =>
          q.id === qId
            ? {
                ...q,
                answers: q.answers.map((a) =>
                  a.id === aId ? { ...a, text } : a
                ),
              }
            : q
        )
      )
    },
    []
  )
  const toggleCorrect = useCallback((qId: string, aId: string) => {
    setQuestions((p) =>
      p.map((q) =>
        q.id === qId
          ? {
              ...q,
              answers: q.answers.map((a) => ({
                ...a,
                correct: a.id === aId ? !a.correct : false,
              })),
            }
          : q
      )
    )
  }, [])
  const changeType = useCallback((qId: string, type: QuestionType) => {
    setQuestions((p) =>
      p.map((q) => {
        if (q.id !== qId) return q
        let answers: Answer[]
        if (type === 'true_false')
          answers = [
            { id: makeId(), text: 'True', correct: true },
            { id: makeId(), text: 'False', correct: false },
          ]
        else if (type === 'short_answer') answers = []
        else answers = [makeAnswer(), makeAnswer(), makeAnswer(), makeAnswer()]
        return { ...q, type, answers }
      })
    )
  }, [])

  return (
    <div
      className={`min-h-screen flex ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
    >
      <TeacherSidebar />
      <div className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <ContentHeader
            onBack={() =>
              contentType
                ? setContentType(null)
                : navigate('/teacher-dashboard')
            }
          />

          {!contentType ? (
            <ContentTypeSelector onSelect={setContentType} dark={dark} />
          ) : contentType === 'quiz' ? (
            <QuizBuilder
              title={title}
              description={description}
              timeLimit={timeLimit}
              questions={questions}
              targetPath={targetPath}
              learningPaths={LEARNING_PATHS}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onTimeLimitChange={setTimeLimit}
              onTargetPathChange={setTargetPath}
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}
              onQuestionTextChange={updateQuestionText}
              onQuestionTypeChange={changeType}
              onAnswerTextChange={updateAnswerText}
              onToggleCorrect={toggleCorrect}
              dark={dark}
            />
          ) : contentType === 'lesson' ? (
            <LessonBuilder
              title={lessonTitle}
              content={lessonContent}
              emoji={lessonEmoji}
              targetPath={targetPath}
              learningPaths={LEARNING_PATHS}
              onTitleChange={setLessonTitle}
              onContentChange={setLessonContent}
              onEmojiChange={setLessonEmoji}
              onTargetPathChange={setTargetPath}
              dark={dark}
            />
          ) : (
            <VideoBuilder
              title={videoTitle}
              url={videoUrl}
              notes={videoNotes}
              targetPath={targetPath}
              learningPaths={LEARNING_PATHS}
              onTitleChange={setVideoTitle}
              onUrlChange={setVideoUrl}
              onNotesChange={setVideoNotes}
              onTargetPathChange={setTargetPath}
              dark={dark}
            />
          )}
        </div>
      </div>
    </div>
  )
}
