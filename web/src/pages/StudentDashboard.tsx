import type { ReactNode } from 'react'
import {
  Target,
  Zap,
  Wallet,
  ShieldCheck,
  TrendingUp,
  Star,
  ChevronRight,
  Flame,
  Coins,
  BarChart2,
  Briefcase,
  BookOpen,
  Award,
  Users,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { StudentDashboardHeader } from '../components/ui/StudentDashboardHeader'
import { DailyChallengeCard } from '../components/ui/DailyChallengeCard'
import { CategoryChip } from '../components/ui/CategoryChip'
import { MissionCard } from '../components/ui/MissionCard'
import { SimulatorTeaser } from '../components/ui/SimulatorTeaser'
import { ProTipCard } from '../components/ui/ProTipCard'
import { QuickStatTile } from '../components/ui/QuickStatTile'
import { BadgePreview } from '../components/ui/BadgePreview'
import { AchievementGrid } from '../components/ui/AchievementGrid'
import { FamilyShareCard } from '../components/ui/FamilyShareCard'
import { useLearning } from '../context/LearningContext'
import { useTheme } from '../context/ThemeContext'
import { LEARNING_PATHS, BADGES } from '../data/learning-paths'

const PATH_ICONS: Record<string, ReactNode> = {
  saving_basics: <Wallet className="w-6 h-6" />,
  smart_spending: <Zap className="w-6 h-6" />,
  earning_income: <Target className="w-6 h-6" />,
  borrowing_debt: <ShieldCheck className="w-6 h-6" />,
  investing_future: <TrendingUp className="w-6 h-6" />,
}
const PATH_COLORS: Record<string, string> = {
  saving_basics: 'bg-purple-500',
  smart_spending: 'bg-amber-500',
  earning_income: 'bg-emerald-500',
  borrowing_debt: 'bg-rose-500',
  investing_future: 'bg-blue-500',
}

/** Daily challenge data — mirrors mobile DailyChallengeScreen CHALLENGE_STEPS */
const DAILY_CHALLENGE = {
  title: 'The Power of Compound Interest',
  desc: 'Allocate your monthly income using the 50/30/20 rule!',
  time: '5 Mins',
  xp: '50 XP',
}

export const StudentDashboard = () => {
  const navigate = useNavigate()
  const learning = useLearning()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const missions = LEARNING_PATHS.map((path) => {
    const { completed, total } = learning.getPathProgress(path.key)
    const status = learning.getPathStatus(path.key)
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0
    return {
      id: path.key,
      title: path.title,
      emoji: path.emoji,
      desc: `${total} lessons · ${path.category}`,
      icon: PATH_ICONS[path.key] ?? <Target className="w-6 h-6" />,
      color: PATH_COLORS[path.key] ?? 'bg-gray-500',
      progress,
      status,
    }
  })

  const displayBadges = BADGES.filter((b) =>
    learning.earnedBadges.has(b.id)
  ).slice(0, 3)
  const completedCount = missions.filter((m) => m.status === 'mastered').length

  return (
    <div
      className={`min-h-screen p-6 md:p-10 transition-colors ${dark ? 'bg-[#1A1A2E]' : 'bg-[#F8F9FE]'}`}
    >
      <div className="max-w-6xl mx-auto">
        <StudentDashboardHeader
          level={learning.level}
          xp={learning.xp}
          streak={learning.streak}
          dark={dark}
          onSettings={() => navigate('/student-settings')}
        />

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <DailyChallengeCard
              title={DAILY_CHALLENGE.title}
              desc={DAILY_CHALLENGE.desc}
              time={DAILY_CHALLENGE.time}
              xp={DAILY_CHALLENGE.xp}
              onStart={() => navigate('/daily-challenge')}
            />

            <div className="flex gap-3 flex-wrap">
              {[
                {
                  name: 'Saving',
                  icon: <Coins className="w-4 h-4 text-[#B9A7F8]" />,
                  bg: dark ? 'bg-[#2A2A40]' : 'bg-[#F3F0FF]',
                },
                {
                  name: 'Budgets',
                  icon: <BarChart2 className="w-4 h-4 text-orange-500" />,
                  bg: dark ? 'bg-[#2A2A40]' : 'bg-[#FDE8E4]',
                },
                {
                  name: 'Earning',
                  icon: <Briefcase className="w-4 h-4 text-amber-500" />,
                  bg: dark ? 'bg-[#2A2A40]' : 'bg-[#FFF8E8]',
                },
              ].map((cat) => (
                <CategoryChip
                  key={cat.name}
                  name={cat.name}
                  icon={cat.icon}
                  bgClass={cat.bg}
                  dark={dark}
                />
              ))}
            </div>

            {/* ── Learning Paths Grid ── */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
                >
                  Learning Paths
                </h2>
                <span className="text-sm font-bold text-[#B9A7F8]">
                  {completedCount}/{missions.length} Completed
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {missions.map((mission) => (
                  <MissionCard
                    key={mission.id}
                    id={mission.id}
                    title={mission.title}
                    emoji={mission.emoji}
                    desc={mission.desc}
                    icon={mission.icon}
                    colorClass={mission.color}
                    progress={mission.progress}
                    status={mission.status}
                    dark={dark}
                    onAction={(id) => navigate(`/mission/${id}`)}
                  />
                ))}
              </div>
            </section>

            <SimulatorTeaser onEnter={() => navigate('/simulator')} />

            <ProTipCard
              title="Pro Tip: 50/30/20 Rule"
              desc="Divide your income into Needs (50%), Wants (30%), and Savings (20%)."
              dark={dark}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <section
              className={`p-8 rounded-[3rem] shadow-sm border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
            >
              <h2
                className={`text-xl font-black mb-6 ${dark ? 'text-white' : 'text-[#22223B]'}`}
              >
                Quick Stats
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: 'Streak',
                    value: `${learning.streak}d`,
                    icon: <Flame className="w-5 h-5 text-orange-400" />,
                    bg: dark ? 'bg-[#1A1A2E]' : 'bg-[#FDE8E4]',
                  },
                  {
                    label: 'Coins',
                    value: `${learning.xp}`,
                    icon: <Coins className="w-5 h-5 text-amber-400" />,
                    bg: dark ? 'bg-[#1A1A2E]' : 'bg-[#FFF8E8]',
                  },
                  {
                    label: 'Lessons Done',
                    value: `${learning.completedLessons.size}`,
                    icon: <BookOpen className="w-5 h-5 text-[#B9A7F8]" />,
                    bg: dark ? 'bg-[#1A1A2E]' : 'bg-[#F3F0FF]',
                  },
                ].map((stat) => (
                  <QuickStatTile
                    key={stat.label}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    bgClass={stat.bg}
                    dark={dark}
                  />
                ))}
              </div>
            </section>

            <section
              className={`p-8 rounded-[3rem] shadow-sm border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
            >
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-amber-500" />
                <h2
                  className={`text-xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
                >
                  Your Badges
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {displayBadges.map((badge) => (
                  <BadgePreview
                    key={badge.id}
                    emoji={badge.emoji}
                    title={badge.title}
                    dark={dark}
                  />
                ))}
                {displayBadges.length < 3 && (
                  <div
                    className={`w-16 h-16 rounded-3xl border-2 border-dashed flex items-center justify-center ${
                      dark
                        ? 'border-[#3A3A55] text-gray-600'
                        : 'border-gray-100 text-gray-200'
                    }`}
                  >
                    <Users className="w-5 h-5" />
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate('/progress-stats')}
                className="w-full mt-6 text-gray-400 font-bold text-sm flex items-center justify-center gap-1 hover:text-[#B9A7F8]"
              >
                All Badges ({learning.earnedBadges.size}/{BADGES.length}){' '}
                <ChevronRight className="w-4 h-4" />
              </button>
            </section>

            <AchievementGrid
              dark={dark}
              items={[
                {
                  icon: <Flame className="w-6 h-6 text-orange-500" />,
                  label: 'Early Bird',
                },
                {
                  icon: <Coins className="w-6 h-6 text-amber-400" />,
                  label: 'Saver',
                },
                {
                  icon: <Award className="w-6 h-6 text-amber-500" />,
                  label: 'Champion',
                },
                {
                  icon: <Star className="w-6 h-6 text-[#B9A7F8]" />,
                  label: 'Goal Setter',
                },
              ]}
            />

            <FamilyShareCard
              onShare={() => navigate('/family-share')}
              dark={dark}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
