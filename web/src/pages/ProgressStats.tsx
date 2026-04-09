import { Flame, Star, Map } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useLearning } from '../context/LearningContext'
import { useTheme } from '../context/ThemeContext'
import { LEARNING_PATHS, BADGES } from '../data/learning-paths'
import { ProgressHeader } from '../components/ui/ProgressHeader'
import { OverallProgressHero } from '../components/ui/OverallProgressHero'
import { ProgressStatCard } from '../components/ui/ProgressStatCard'
import { LearningPathCard } from '../components/ui/LearningPathCard'
import { BadgeCard } from '../components/ui/BadgeCard'

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
      className={`min-h-screen p-6 md:p-10 transition-colors ${
        dark ? 'bg-[#1A1A2E]' : 'bg-[#F8F9FE]'
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <ProgressHeader
          title="Progress & Stats"
          onBack={() => navigate('/student-dashboard')}
          dark={dark}
        />

        <OverallProgressHero
          overallPercent={overallPercent}
          completedCount={completedCount}
          totalLessons={totalLessons}
          dark={dark}
        />

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: <Flame className="w-6 h-6 text-orange-500" />,
              label: 'Day Streak',
              value: `${learning.streak}`,
            },
            {
              icon: <Star className="w-6 h-6 text-[#B9A7F8]" />,
              label: 'XP Earned',
              value: `${learning.xp}`,
            },
            {
              icon: <Map className="w-6 h-6 text-emerald-500" />,
              label: 'Paths Done',
              value: `${pathsCompleted}/${LEARNING_PATHS.length}`,
            },
          ].map((stat) => (
            <ProgressStatCard
              key={stat.label}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
              dark={dark}
            />
          ))}
        </div>

        <h2
          className={`text-xl font-black mb-4 ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          Learning Paths
        </h2>
        <div className="space-y-3 mb-10">
          {LEARNING_PATHS.map((path) => {
            const { completed, total } = learning.getPathProgress(path.key)
            const status = learning.getPathStatus(path.key)
            return (
              <LearningPathCard
                key={path.key}
                path={path}
                completed={completed}
                total={total}
                status={status}
                dark={dark}
              />
            )
          })}
        </div>

        <h2
          className={`text-xl font-black mb-4 ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          Badges ({learning.earnedBadges.size}/{BADGES.length})
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {BADGES.map((badge) => (
            <BadgeCard
              key={badge.id}
              emoji={badge.emoji}
              title={badge.title}
              earned={learning.earnedBadges.has(badge.id)}
              dark={dark}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
