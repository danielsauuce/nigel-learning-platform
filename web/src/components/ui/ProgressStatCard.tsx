import type { ReactNode } from 'react'

type ProgressStatCardProps = {
  icon: ReactNode
  label: string
  value: string
  dark: boolean
}

export const ProgressStatCard = ({
  icon,
  label,
  value,
  dark,
}: ProgressStatCardProps) => (
  <div
    className={`p-5 rounded-2xl border text-center ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <div className="flex justify-center mb-2">{icon}</div>
    <span
      className={`text-xl font-black block ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      {value}
    </span>
    <span className="text-[10px] text-gray-400 font-bold">{label}</span>
  </div>
)
