import type { ReactNode } from 'react'
import { ThemeModeCard } from './ThemeModeCard'

type SettingsSidebarTab = {
  id: string
  label: string
  icon: ReactNode
}

type SettingsSidebarProps = {
  tabs: SettingsSidebarTab[]
  activeTab: string
  dark: boolean
  isDark: boolean
  onTabSelect: (id: string) => void
  onToggleTheme: () => void
  onLogout: () => void
}

export const SettingsSidebar = ({
  tabs,
  activeTab,
  dark,
  isDark,
  onTabSelect,
  onToggleTheme,
  onLogout,
}: SettingsSidebarProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabSelect(tab.id)}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all ${
            activeTab === tab.id
              ? dark
                ? 'bg-[#2A2A40] text-white shadow-sm'
                : 'bg-white text-[#22223B] shadow-sm'
              : dark
                ? 'text-gray-500 hover:text-gray-300'
                : 'text-gray-400 hover:text-[#22223B]'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>

    <ThemeModeCard dark={dark} isOn={isDark} onToggle={onToggleTheme} />

    <button
      onClick={onLogout}
      className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
    >
      Log Out
    </button>
  </div>
)
