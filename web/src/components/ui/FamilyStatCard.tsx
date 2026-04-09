import React from 'react'

interface FamilyStatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  dark: boolean
}

export const FamilyStatCard: React.FC<FamilyStatCardProps> = ({
  icon,
  label,
  value,
  dark,
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-lg flex items-center justify-center ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-400">{label}</p>
        <p
          className={`text-sm font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          {value}
        </p>
      </div>
    </div>
  )
}
