import type { ReactNode } from 'react'
import { SettingsItem } from './SettingsItem'

type SettingsSectionItem = {
  key: string
  icon: ReactNode
  label: string
  subtitle: string
}

type SettingsSectionProps = {
  title: string
  items: SettingsSectionItem[]
  dark: boolean
  onItemPress: (key: string) => void
}

export const SettingsSection = ({
  title,
  items,
  dark,
  onItemPress,
}: SettingsSectionProps) => (
  <div className="mb-6">
    {title && (
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">
        {title}
      </p>
    )}
    <div
      className={`rounded-[2rem] border overflow-hidden ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
    >
      {items.map((item, index) => (
        <SettingsItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          subtitle={item.subtitle}
          dark={dark}
          isLogout={item.key === 'logout'}
          showDivider={index < items.length - 1}
          onClick={() => onItemPress(item.key)}
        />
      ))}
    </div>
  </div>
)
