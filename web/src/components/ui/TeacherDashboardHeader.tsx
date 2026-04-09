import { Gamepad2, Plus, Settings } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

type TeacherDashboardHeaderProps = {
  activeCount: number
  totalStudents: number
  dark: boolean
  onStudentView: () => void
  onCreateContent: () => void
  onSettings: () => void
}

export const TeacherDashboardHeader = ({
  activeCount,
  totalStudents,
  dark,
  onStudentView,
  onCreateContent,
  onSettings,
}: TeacherDashboardHeaderProps) => (
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
        {activeCount} of {totalStudents} students active today.
      </p>
    </div>
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <button
        onClick={onStudentView}
        className="bg-[#B9A7F8] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
      >
        <Gamepad2 className="w-5 h-5" /> Student View
      </button>
      <button
        onClick={onCreateContent}
        className="bg-[#22223B] text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg"
      >
        <Plus className="w-5 h-5" /> Create Content
      </button>
      <button
        onClick={onSettings}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
          dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'
        }`}
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  </header>
)
