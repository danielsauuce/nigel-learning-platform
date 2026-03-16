import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLearning } from '../context/LearningContext'
import { useTheme } from '../context/ThemeContext'
import { LEARNING_PATHS, BADGES } from '../data/learning-paths'

export const ProgressStats = () => {
  const navigate = useNavigate()
  const learning = useLearning()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const totalLessons = LEARNING_PATHS.reduce((s, p) => s + p.lessons.length, 0)
  const completedCount = learning.completedLessons.size
  const overallPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
  const pathsCompleted = LEARNING_PATHS.filter((p) =>
    learning.isPathCompleted(p.key)
  ).length

  return (
    <div
      className={`min-h-screen p-6 md:p-10 transition-colors ${dark ? 'bg-[#1A1A2E]' : 'bg-[#F8F9FE]'}`}
    >
      <div className="max-w-3xl mx-auto">
        <header className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate('/student-dashboard')}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'}`}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1
            className={`text-2xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            Progress & Stats
          </h1>
        </header>

        {/* Overall progress hero */}
        <div
          className={`p-10 rounded-[3rem] border text-center mb-8 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-[#F3F0FF] border-[#B9A7F830]'}`}
        >
          <div className="relative w-28 h-28 mx-auto mb-4">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={dark ? '#3A3A55' : '#E8E4F0'}
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#B9A7F8"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallPercent / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-2xl font-black ${dark ? 'text-white' : 'text-[#B9A7F8]'}`}
              >
                {overallPercent}%
              </span>
              <span className="text-[9px] text-gray-400 font-bold">
                complete
              </span>
            </div>
          </div>
          <p
            className={`font-medium text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}
          >
            {completedCount} of {totalLessons} lessons completed
          </p>
        </div>

        {/* Quick stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { emoji: '🔥', label: 'Day Streak', value: `${learning.streak}` },
            { emoji: '⭐', label: 'XP Earned', value: `${learning.xp}` },
            { emoji: '🏝️', label: 'Paths Done', value: `${pathsCompleted}/5` },
          ].map((s) => (
            <div
              key={s.label}
              className={`p-5 rounded-2xl border text-center ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
            >
              <span className="text-2xl block mb-2">{s.emoji}</span>
              <span
                className={`text-xl font-black block ${dark ? 'text-white' : 'text-[#22223B]'}`}
              >
                {s.value}
              </span>
              <span className="text-[10px] text-gray-400 font-bold">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Learning path progress */}
        <h2
          className={`text-xl font-black mb-4 ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          Learning Paths
        </h2>
        <div className="space-y-3 mb-10">
          {LEARNING_PATHS.map((path) => {
            const { completed, total } = learning.getPathProgress(path.key)
            const pPercent =
              total > 0 ? Math.round((completed / total) * 100) : 0
            const status = learning.getPathStatus(path.key)
            return (
              <div
                key={path.key}
                className={`flex items-center gap-4 p-4 rounded-2xl border ${status === 'locked' ? 'opacity-50' : ''} ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ backgroundColor: path.color + '15' }}
                >
                  {path.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
                    >
                      {path.title}
                    </span>
                    <span
                      className="font-bold text-xs"
                      style={{
                        color: status === 'mastered' ? '#4CAF50' : path.color,
                      }}
                    >
                      {status === 'mastered'
                        ? '✅'
                        : status === 'locked'
                          ? '🔒'
                          : `${pPercent}%`}
                    </span>
                  </div>
                  <div
                    className={`h-1.5 rounded-full overflow-hidden ${dark ? 'bg-[#3A3A55]' : 'bg-gray-100'}`}
                  >
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pPercent}%`,
                        backgroundColor:
                          status === 'mastered' ? '#4CAF50' : path.color,
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {completed}/{total} lessons
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* All Badges */}
        <h2
          className={`text-xl font-black mb-4 ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          Badges ({learning.earnedBadges.size}/{BADGES.length})
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {BADGES.map((badge) => {
            const earned = learning.earnedBadges.has(badge.id)
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition-all ${earned ? (dark ? 'bg-emerald-500/10 border-emerald-500' : 'bg-emerald-50 border-emerald-400 border-2') : dark ? 'bg-[#2A2A40] border-[#3A3A55] opacity-40' : 'bg-gray-50 border-gray-100 opacity-40'}`}
              >
                <span className="text-3xl block mb-2">{badge.emoji}</span>
                <span
                  className={`text-[10px] font-bold block ${dark ? 'text-white' : 'text-[#22223B]'}`}
                >
                  {badge.title}
                </span>
                {earned && (
                  <span className="text-[9px] text-emerald-500 font-bold">
                    Earned ✅
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
