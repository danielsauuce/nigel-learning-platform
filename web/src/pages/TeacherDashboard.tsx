import React from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  LayoutDashboard,
  BookOpen,
  BarChart3,
  ChevronRight,
  Clock,
  MoreVertical,
  Plus,
  Gamepad2,
  Settings,
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
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { useTheme } from '../context/ThemeContext'
import { STUDENTS, RECENT_ACTIVITY, TEACHER_STATS } from '../data/teachers'

export const TeacherDashboard = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const dark = theme === 'dark'

  const statIcons = [
    <Users className="w-5 h-5" />,
    <LayoutDashboard className="w-5 h-5" />,
    <BookOpen className="w-5 h-5" />,
    <BarChart3 className="w-5 h-5" />,
  ]
  const statColors = [
    'bg-[#B9A7F8]',
    'bg-[#F7B6B6]',
    'bg-[#FFD93D]',
    'bg-[#22223B]',
  ]

  const topPerformers = [...STUDENTS].sort((a, b) => b.avg - a.avg).slice(0, 3)
  const activeCount = STUDENTS.filter((s) => s.active).length

  return (
    <div
      className={`min-h-screen flex ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
    >
      <TeacherSidebar />

      <main className="flex-1 lg:ml-80 p-6 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#22223B] text-white text-[10px] font-bold px-2 py-0.5 rounded">
                Nigel Junior
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Powered by Beyond Encryption
              </span>
            </div>
            <h1
              className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
            >
              Hello, Teacher Yukari!
            </h1>
            <p className={dark ? 'text-gray-400' : 'text-gray-500'}>
              {activeCount} of {STUDENTS.length} students active today.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/student-dashboard')}
              className="bg-[#B9A7F8] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
            >
              <Gamepad2 className="w-5 h-5" /> Student View
            </button>
            <button
              onClick={() => navigate('/create-content')}
              className="bg-[#22223B] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" /> Create Content
            </button>
            <button
              onClick={() => navigate('/teacher-settings')}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'}`}
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TEACHER_STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-[2.5rem] shadow-sm border flex items-center gap-6 ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
            >
              <div
                className={`w-14 h-14 ${statColors[i]} rounded-2xl flex items-center justify-center text-white`}
              >
                {statIcons[i]}
              </div>
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
                  {stat.label}
                </p>
                <div className="flex items-center gap-2">
                  <h3
                    className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
                  >
                    {stat.value}
                  </h3>
                  {stat.trend && (
                    <span className="text-xs font-bold text-emerald-500">
                      {stat.trend}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity + Students */}
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
                <div
                  key={i}
                  className={`p-6 rounded-[2.5rem] shadow-sm border flex items-center justify-between group hover:shadow-md transition-all ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
                >
                  <div className="flex items-center gap-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
                    >
                      {ACTIVITY_ICON_MAP[act.icon]}
                    </div>
                    <div>
                      <h4
                        className={`font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
                      >
                        {act.name}
                      </h4>
                      <p className="text-xs text-gray-400 font-medium">
                        {act.action}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {act.time}
                    </span>
                    <button className="text-gray-300 hover:text-[#22223B]">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Student Directory Preview */}
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
                <div
                  key={student.id}
                  className={`p-6 rounded-[2.5rem] shadow-sm border flex items-center justify-between ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#B9A7F8]/20 flex items-center justify-center text-[#B9A7F8] font-bold">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <p
                        className={`font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
                      >
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-400 font-medium">
                        {student.missions} missions · {student.badges} badges ·
                        Avg {student.avg}%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-3 py-1 rounded-full ${student.simLevel === 'HIGH' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10' : student.simLevel === 'STEADY' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'}`}
                    >
                      {student.simLevel}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${student.active ? 'bg-emerald-400' : 'bg-gray-300'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
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
                <div
                  key={student.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${i === 0 ? 'bg-amber-400 text-white' : dark ? 'bg-[#1A1A2E] text-gray-400' : 'bg-gray-100 text-gray-400'}`}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <span
                        className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
                      >
                        {student.name}
                      </span>
                      <p className="text-[10px] text-gray-400">
                        {student.missions} missions
                      </p>
                    </div>
                  </div>
                  <span className="text-[#F7B6B6] font-bold">
                    {student.avg}%
                  </span>
                </div>
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
