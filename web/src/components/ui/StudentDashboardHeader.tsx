import { Settings } from 'lucide-react'
import { NigelBrandIcon } from './Logo'
import { ThemeToggle } from './ThemeToggle'

type StudentDashboardHeaderProps = {
  level: number
  xp: number
  streak: number
  dark: boolean
  onSettings: () => void
}

export const StudentDashboardHeader = ({
  level,
  xp,
  streak,
  dark,
  onSettings,
}: StudentDashboardHeaderProps) => (
  <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <NigelBrandIcon size={32} />
        <span
          className={`font-bold text-xl tracking-tight lowercase ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          nigel
        </span>
      </div>
      <p className="text-[10px] font-bold text-[#B9A7F8] uppercase tracking-widest ml-10 -mt-1">
        Powered by Beyond Encryption
      </p>
      <h1
        className={`text-4xl font-black mt-4 ${dark ? 'text-white' : 'text-[#22223B]'}`}
      >
        Hey, Sarah!
      </h1>
      <p
        className={`font-medium flex items-center gap-1.5 ${dark ? 'text-gray-400' : 'text-gray-500'}`}
      >
        Level {level} · {xp} XP · {streak} day streak
      </p>
    </div>
    <div className="flex items-center gap-4">
      <ThemeToggle />
      <button
        onClick={onSettings}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm transition-colors ${
          dark
            ? 'bg-[#2A2A40] text-gray-400 hover:text-white'
            : 'bg-white text-gray-400 hover:text-[#22223B]'
        }`}
      >
        <Settings className="w-6 h-6" />
      </button>
      <div
        className={`flex items-center gap-4 p-4 rounded-[2rem] shadow-sm border ${
          dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
        }`}
      >
        <div className="text-right">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Your Level
          </p>
          <p
            className={`text-lg font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            Level {level}
          </p>
        </div>
        <div className="w-12 h-12 bg-[#B9A7F8] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#B9A7F8]/30">
          {level}
        </div>
      </div>
    </div>
  </header>
)
