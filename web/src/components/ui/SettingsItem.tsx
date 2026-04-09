import type { ReactNode } from 'react'

type SettingsItemProps = {
  icon: ReactNode
  label: string
  subtitle: string
  dark: boolean
  isLogout?: boolean
  showDivider: boolean
  onClick: () => void
}

export const SettingsItem = ({
  icon,
  label,
  subtitle,
  dark,
  isLogout = false,
  showDivider,
  onClick,
}: SettingsItemProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-5 text-left transition-colors ${
      showDivider
        ? dark
          ? 'border-b border-[#3A3A55]'
          : 'border-b border-gray-50'
        : ''
    } ${isLogout ? '' : dark ? 'hover:bg-[#1A1A2E]' : 'hover:bg-gray-50'}`}
  >
    <span className={isLogout ? 'text-rose-500' : 'text-gray-400'}>{icon}</span>
    <div className="flex-1">
      <p
        className={`font-bold text-sm ${isLogout ? 'text-rose-500' : dark ? 'text-white' : 'text-[#22223B]'}`}
      >
        {label}
      </p>
      <p className="text-xs text-gray-400">{subtitle}</p>
    </div>
  </button>
)
