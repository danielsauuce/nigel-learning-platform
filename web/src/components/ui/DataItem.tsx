import React from 'react'

interface DataItem {
  key: string
  icon: React.ReactNode
  label: string
}

interface DataItemProps {
  item: DataItem
  isShared?: boolean
  dark: boolean
}

export const FamilyDataItem: React.FC<DataItemProps> = ({
  item,
  isShared = false,
  dark,
}) => {
  return (
    <div className="flex items-center gap-3">
      {item.icon}
      <span
        className={`flex-1 text-sm font-medium ${isShared ? (dark ? 'text-gray-300' : 'text-[#22223B]') : 'text-gray-400'}`}
      >
        {item.label}
      </span>
      {isShared && <span className="text-emerald-500 text-xs">✓</span>}
    </div>
  )
}
