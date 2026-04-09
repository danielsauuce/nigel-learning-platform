import type { ReactNode } from 'react'

type QuickStatTileProps = {
  label: string
  value: string
  icon: ReactNode
  bgClass: string
  dark: boolean
}

export const QuickStatTile = ({
  label,
  value,
  icon,
  bgClass,
  dark,
}: QuickStatTileProps) => (
  <div
    className={`flex items-center justify-between p-4 rounded-2xl ${bgClass}`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span
        className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
      >
        {label}
      </span>
    </div>
    <span
      className={`font-black text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      {value}
    </span>
  </div>
)
