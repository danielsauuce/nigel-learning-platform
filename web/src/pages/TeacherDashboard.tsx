import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  ChevronRight,
  FileText,
  Target,
  Trophy,
} from 'lucide-react'

const ACTIVITY_ICON_MAP: Record<string, React.ReactElement> = {
  'file-text': <FileText className="w-5 h-5 text-purple-400" />,
  target: <Target className="w-5 h-5 text-blue-400" />,
  trophy: <Trophy className="w-5 h-5 text-amber-400" />,
}
import { TeacherSidebar } from '../components/TeacherSidebar'
import { TeacherDashboardHeader } from '../components/ui/TeacherDashboardHeader'
import { DashboardStatCard } from '../components/ui/DashboardStatCard'
import { RecentActivityCard } from '../components/ui/RecentActivityCard'
import { StudentPreviewCard } from '../components/ui/StudentPreviewCard'
import { TopPerformerCard } from '../components/ui/TopPerformerCard'
import { useTheme } from '../context/ThemeContext'
import { STUDENTS, RECENT_ACTIVITY, TEACHER_STATS } from '../data/teachers'

export const TeacherDashboard = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const topPerformers = [...STUDENTS].sort((a, b) => b.avg - a.avg).slice(0, 3)
  const activeCount = STUDENTS.filter((s) => s.active).length

  return (
    <div
      className={`min-h-screen flex ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
    >
      <TeacherSidebar />

      <main className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <TeacherDashboardHeader
          activeCount={activeCount}
          totalStudents={STUDENTS.length}
          dark={dark}
          onStudentView={() => navigate('/student-dashboard')}
          onCreateContent={() => navigate('/create-content')}
          onSettings={() => navigate('/teacher-settings')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TEACHER_STATS.map((stat, i) => (
            <DashboardStatCard
              key={stat.label}
              icon={
                [
                  <Users className="w-5 h-5" />,
                  <LayoutDashboard className="w-5 h-5" />,
                  <BookOpen className="w-5 h-5" />,
                  <BarChart3 className="w-5 h-5" />,
                ][i]
              }
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              positive={stat.trend?.startsWith('+')}
              colorClass={
                [
                  'bg-[#B9A7F8]',
                  'bg-[#F7B6B6]',
                  'bg-[#FFD93D]',
                  'bg-[#22223B]',
                ][i]
              }
              dark={dark}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3
                className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
              >
                Recent Activity
              </h3>
              <button
                onClick={() => navigate('/manage-classes')}
                className="text-[#F7B6B6] font-bold flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {RECENT_ACTIVITY.map((act, i) => (
                <RecentActivityCard
                  key={`${act.name}-${i}`}
                  icon={ACTIVITY_ICON_MAP[act.icon]}
                  name={act.name}
                  action={act.action}
                  time={act.time}
                  dark={dark}
                />
              ))}
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex justify-between items-center">
                <h3
                  className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
                >
                  Students
                </h3>
                <button
                  onClick={() => navigate('/manage-classes')}
                  className="text-[#B9A7F8] font-bold flex items-center gap-1"
                >
                  Full Roster <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              {STUDENTS.slice(0, 3).map((student) => (
                <StudentPreviewCard
                  key={student.id}
                  name={student.name}
                  missions={student.missions}
                  badges={student.badges}
                  avg={student.avg}
                  simLevel={student.simLevel}
                  active={student.active}
                  dark={dark}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3
              className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
            >
              Top Performers
            </h3>
            <div
              className={`p-8 rounded-[3rem] shadow-sm border space-y-6 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
            >
              {topPerformers.map((student, i) => (
                <TopPerformerCard
                  key={student.id}
                  rank={i + 1}
                  name={student.name}
                  missions={student.missions}
                  avg={student.avg}
                  dark={dark}
                />
              ))}
              <button
                onClick={() => navigate('/teacher-analytics')}
                className={`w-full py-4 rounded-2xl font-bold transition-colors ${dark ? 'bg-[#1A1A2E] text-gray-300 hover:bg-[#22223B]' : 'bg-gray-50 text-[#22223B] hover:bg-gray-100'}`}
              >
                Detailed Analytics
              </button>
            </div>

            <div className="bg-[#B9A7F8] p-8 rounded-[3rem] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
              <h3 className="text-xl font-bold relative z-10">Need Help?</h3>
              <p className="text-white/70 text-sm font-medium relative z-10 mb-6">
                Check out our teacher resources and community forums.
              </p>
              <button className="bg-[#22223B] text-white text-xs font-bold px-6 py-3 rounded-full relative z-10">
                Visit Help Center
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
