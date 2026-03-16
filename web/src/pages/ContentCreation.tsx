import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  BookOpen,
  Video,
  Gamepad2,
  Plus,
  Save,
  Eye,
  Trash2,
  Send,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TeacherSidebar } from '../components/TeacherSidebar'
import { useTheme } from '../context/ThemeContext'
import { LEARNING_PATHS } from '../data/learning-paths'

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
const TIME_OPTIONS = [5, 10, 15, 20, 30, 45, 60] as const
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
  const totalPoints = questions.reduce((s, q) => s + q.points, 0)

  // Lesson builder state
  const [lessonTitle, setLessonTitle] = useState('')
  const [lessonContent, setLessonContent] = useState('')
  const [lessonEmoji, setLessonEmoji] = useState('📚')

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

  const contentTypes = [
    {
      id: 'lesson' as const,
      title: 'Interactive Lesson',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-[#B9A7F8]',
      desc: 'Create lesson slides that students see in their Learning Paths',
    },
    {
      id: 'video' as const,
      title: 'Video Content',
      icon: <Video className="w-6 h-6" />,
      color: 'bg-[#F7B6B6]',
      desc: 'Upload or link an educational video with timestamped notes',
    },
    {
      id: 'quiz' as const,
      title: 'Fun Quiz',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'bg-[#FFD93D]',
      desc: 'Build a quiz that appears in student missions — matching the mobile quiz flow',
    },
  ]

  return (
    <div
      className={`min-h-screen flex ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
    >
      <TeacherSidebar />
      <div className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <header className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  contentType
                    ? setContentType(null)
                    : navigate('/teacher-dashboard')
                }
                className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'}`}
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1
                  className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
                >
                  Create Content
                </h1>
                <p className={dark ? 'text-gray-400' : 'text-gray-500'}>
                  Build content that students see on mobile & web
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold ${dark ? 'text-gray-400 hover:bg-[#2A2A40]' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Eye className="w-5 h-5" /> Preview
              </button>
              <button className="flex items-center gap-2 bg-[#22223B] text-white font-bold px-8 py-3 rounded-2xl shadow-lg">
                <Save className="w-5 h-5" /> Save Draft
              </button>
            </div>
          </header>

          {!contentType ? (
            <div className="grid md:grid-cols-3 gap-8">
              {contentTypes.map((type) => (
                <motion.button
                  key={type.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setContentType(type.id)}
                  className={`p-10 rounded-[3rem] border text-left ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'} hover:shadow-xl transition-all`}
                >
                  <div
                    className={`${type.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                  >
                    {type.icon}
                  </div>
                  <h3
                    className={`text-xl font-black mb-2 ${dark ? 'text-white' : 'text-[#22223B]'}`}
                  >
                    {type.title}
                  </h3>
                  <p
                    className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}
                  >
                    {type.desc}
                  </p>
                </motion.button>
              ))}
            </div>
          ) : contentType === 'quiz' ? (
            /* ── QUIZ BUILDER (matches mobile CreateQuizScreen) ── */
            <div className="space-y-8">
              {/* Meta card */}
              <div
                className={`p-8 rounded-[3rem] border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
              >
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Quiz Title"
                  className={`w-full text-2xl font-black outline-none mb-3 bg-transparent ${dark ? 'text-white placeholder-gray-600' : 'text-[#22223B] placeholder-gray-300'}`}
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description (optional)"
                  rows={2}
                  className={`w-full text-sm font-medium outline-none resize-none mb-4 bg-transparent ${dark ? 'text-gray-300 placeholder-gray-600' : 'text-gray-500 placeholder-gray-300'}`}
                />

                {/* Target learning path */}
                <div className="mb-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Assign to Learning Path
                  </label>
                  <select
                    value={targetPath}
                    onChange={(e) => setTargetPath(e.target.value)}
                    className={`w-full p-3 rounded-xl border font-bold text-sm ${dark ? 'bg-[#1A1A2E] border-[#3A3A55] text-white' : 'bg-gray-50 border-gray-200 text-[#22223B]'}`}
                  >
                    {LEARNING_PATHS.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.emoji} {p.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Meta badges */}
                <div className="flex gap-3 flex-wrap">
                  {[
                    {
                      icon: <Clock className="w-3.5 h-3.5" />,
                      label: `${timeLimit} min`,
                    },
                    {
                      icon: <Gamepad2 className="w-3.5 h-3.5" />,
                      label: `${questions.length} Q${questions.length !== 1 ? 's' : ''}`,
                    },
                    {
                      icon: <Zap className="w-3.5 h-3.5" />,
                      label: `${totalPoints} pts`,
                    },
                  ].map((b) => (
                    <span
                      key={b.label}
                      className="flex items-center gap-1.5 bg-[#B9A7F8]/10 text-[#B9A7F8] text-xs font-bold px-3 py-1.5 rounded-lg"
                    >
                      {b.icon} {b.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Time limit */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                  Time Limit
                </p>
                <div className="flex gap-2 flex-wrap">
                  {TIME_OPTIONS.map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setTimeLimit(mins)}
                      className={`px-4 py-2 rounded-full border text-xs font-bold ${timeLimit === mins ? 'bg-[#B9A7F8] border-[#B9A7F8] text-white' : dark ? 'border-[#3A3A55] text-gray-400' : 'border-gray-200 text-gray-500'}`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Questions
                </p>
                {questions.map((q, qi) => (
                  <div
                    key={q.id}
                    className={`p-8 rounded-[2.5rem] border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`font-black text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
                      >
                        Question {qi + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        {(
                          [
                            'multiple_choice',
                            'true_false',
                            'short_answer',
                          ] as const
                        ).map((t) => (
                          <button
                            key={t}
                            onClick={() => changeType(q.id, t)}
                            className={`px-3 py-1 rounded-lg text-[10px] font-bold ${q.type === t ? 'bg-[#B9A7F8] text-white' : dark ? 'bg-[#1A1A2E] text-gray-400' : 'bg-gray-100 text-gray-400'}`}
                          >
                            {t === 'multiple_choice'
                              ? 'Multiple'
                              : t === 'true_false'
                                ? 'T/F'
                                : 'Short'}
                          </button>
                        ))}
                        <button
                          onClick={() => removeQuestion(q.id)}
                          className="text-gray-300 hover:text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <input
                      type="text"
                      value={q.text}
                      onChange={(e) => updateQuestionText(q.id, e.target.value)}
                      placeholder="Enter your question..."
                      className={`w-full text-lg font-bold outline-none mb-6 bg-transparent ${dark ? 'text-white placeholder-gray-600' : 'text-[#22223B] placeholder-gray-300'}`}
                    />

                    {/* Answer options */}
                    {q.type !== 'short_answer' && (
                      <div className="space-y-3">
                        {q.answers.map((a) => (
                          <div
                            key={a.id}
                            className={`flex items-center gap-3 p-4 rounded-2xl border ${a.correct ? (dark ? 'border-emerald-500 bg-emerald-500/10' : 'border-emerald-400 bg-emerald-50') : dark ? 'border-[#3A3A55] bg-[#1A1A2E]' : 'border-gray-100 bg-gray-50'}`}
                          >
                            <button
                              onClick={() => toggleCorrect(q.id, a.id)}
                              className={`w-7 h-7 rounded-full flex items-center justify-center ${a.correct ? 'bg-emerald-500' : dark ? 'bg-[#2A2A40] border border-[#3A3A55]' : 'bg-white border border-gray-200'}`}
                            >
                              {a.correct ? (
                                <CheckCircle2 className="w-4 h-4 text-white" />
                              ) : (
                                <XCircle className="w-3 h-3 text-gray-300" />
                              )}
                            </button>
                            <input
                              type="text"
                              value={a.text}
                              onChange={(e) =>
                                updateAnswerText(q.id, a.id, e.target.value)
                              }
                              placeholder="Answer option..."
                              className={`flex-1 outline-none font-medium text-sm bg-transparent ${dark ? 'text-gray-300 placeholder-gray-600' : 'text-[#22223B] placeholder-gray-300'}`}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {q.type === 'short_answer' && (
                      <div
                        className={`p-4 rounded-2xl border ${dark ? 'border-[#3A3A55] bg-[#1A1A2E]' : 'border-gray-100 bg-gray-50'}`}
                      >
                        <p className="text-xs text-gray-400 font-medium">
                          Students will type their answer — you can set accepted
                          answers after publishing.
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                <button
                  onClick={addQuestion}
                  className={`w-full p-5 rounded-[2.5rem] border-2 border-dashed flex items-center justify-center gap-2 font-bold text-sm ${dark ? 'border-[#3A3A55] text-gray-400 hover:border-[#B9A7F8] hover:text-[#B9A7F8]' : 'border-gray-200 text-gray-400 hover:border-[#B9A7F8] hover:text-[#B9A7F8]'}`}
                >
                  <Plus className="w-5 h-5" /> Add Question
                </button>
              </div>

              {/* Bottom action bar */}
              <div className="flex gap-4 pt-6 border-t border-gray-100 dark:border-[#3A3A55]">
                <button
                  className={`flex-1 py-4 rounded-2xl border font-bold ${dark ? 'border-[#3A3A55] text-gray-300' : 'border-gray-200 text-[#22223B]'}`}
                >
                  Save Draft
                </button>
                <button className="flex-1 py-4 rounded-2xl bg-[#B9A7F8] text-white font-bold flex items-center justify-center gap-2 shadow-lg">
                  <Send className="w-4 h-4" /> Publish
                </button>
              </div>
            </div>
          ) : contentType === 'lesson' ? (
            /* ── LESSON BUILDER ── */
            <div className="space-y-8">
              <div
                className={`p-8 rounded-[3rem] border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
              >
                <div className="mb-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                    Assign to Learning Path
                  </label>
                  <select
                    value={targetPath}
                    onChange={(e) => setTargetPath(e.target.value)}
                    className={`w-full p-3 rounded-xl border font-bold text-sm ${dark ? 'bg-[#1A1A2E] border-[#3A3A55] text-white' : 'bg-gray-50 border-gray-200 text-[#22223B]'}`}
                  >
                    {LEARNING_PATHS.map((p) => (
                      <option key={p.key} value={p.key}>
                        {p.emoji} {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <input
                    type="text"
                    value={lessonEmoji}
                    onChange={(e) => setLessonEmoji(e.target.value)}
                    className={`w-16 h-16 text-3xl text-center rounded-2xl border ${dark ? 'bg-[#1A1A2E] border-[#3A3A55]' : 'bg-gray-50 border-gray-200'}`}
                  />
                  <input
                    type="text"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    placeholder="Lesson Title"
                    className={`flex-1 text-2xl font-black outline-none bg-transparent ${dark ? 'text-white placeholder-gray-600' : 'text-[#22223B] placeholder-gray-300'}`}
                  />
                </div>
                <textarea
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  placeholder="Write the lesson content that students will see in their slide view..."
                  rows={10}
                  className={`w-full text-sm font-medium outline-none resize-none bg-transparent leading-relaxed ${dark ? 'text-gray-300 placeholder-gray-600' : 'text-gray-500 placeholder-gray-300'}`}
                />
              </div>
              <p
                className={`text-xs font-medium ${dark ? 'text-gray-500' : 'text-gray-400'}`}
              >
                💡 Tip: On mobile, this appears as a lesson slide. Students tap
                "Next" to advance. You can add a quiz question after the lesson
                to test understanding.
              </p>
              <div className="flex gap-4">
                <button
                  className={`flex-1 py-4 rounded-2xl border font-bold ${dark ? 'border-[#3A3A55] text-gray-300' : 'border-gray-200 text-[#22223B]'}`}
                >
                  Save Draft
                </button>
                <button className="flex-1 py-4 rounded-2xl bg-[#B9A7F8] text-white font-bold flex items-center justify-center gap-2 shadow-lg">
                  <Send className="w-4 h-4" /> Publish
                </button>
              </div>
            </div>
          ) : (
            /* ── VIDEO BUILDER ── */
            <div
              className={`p-8 rounded-[3rem] border space-y-6 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
            >
              <div className="mb-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                  Assign to Learning Path
                </label>
                <select
                  value={targetPath}
                  onChange={(e) => setTargetPath(e.target.value)}
                  className={`w-full p-3 rounded-xl border font-bold text-sm ${dark ? 'bg-[#1A1A2E] border-[#3A3A55] text-white' : 'bg-gray-50 border-gray-200 text-[#22223B]'}`}
                >
                  {LEARNING_PATHS.map((p) => (
                    <option key={p.key} value={p.key}>
                      {p.emoji} {p.title}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="Video Title"
                className={`w-full text-2xl font-black outline-none bg-transparent ${dark ? 'text-white placeholder-gray-600' : 'text-[#22223B] placeholder-gray-300'}`}
              />
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                className={`w-full p-4 rounded-2xl border font-medium text-sm ${dark ? 'bg-[#1A1A2E] border-[#3A3A55] text-gray-300 placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-[#22223B] placeholder-gray-300'}`}
              />
              <textarea
                placeholder="Timestamped notes (optional)..."
                rows={5}
                className={`w-full p-4 rounded-2xl border font-medium text-sm resize-none ${dark ? 'bg-[#1A1A2E] border-[#3A3A55] text-gray-300 placeholder-gray-600' : 'bg-gray-50 border-gray-200 text-gray-500 placeholder-gray-300'}`}
              />
              <div className="flex gap-4">
                <button
                  className={`flex-1 py-4 rounded-2xl border font-bold ${dark ? 'border-[#3A3A55] text-gray-300' : 'border-gray-200 text-[#22223B]'}`}
                >
                  Save Draft
                </button>
                <button className="flex-1 py-4 rounded-2xl bg-[#B9A7F8] text-white font-bold flex items-center justify-center gap-2 shadow-lg">
                  <Send className="w-4 h-4" /> Publish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
