import type { ReactNode } from 'react'

type AchievementItem = {
  icon: ReactNode
  label: string
}

type AchievementGridProps = {
  items: AchievementItem[]
  dark: boolean
}

export const AchievementGrid = ({ items, dark }: AchievementGridProps) => (
  <div
    className={`p-8 rounded-[3rem] shadow-sm border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
  >
    <h2
      className={`text-xl font-black mb-6 ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      Achievements
    </h2>
    <div className="grid grid-cols-4 gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1.5">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
          >
            {item.icon}
          </div>
          <span className="text-[9px] font-bold text-gray-400 text-center">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
)
