import type { ReactNode } from 'react'

type CategoryChipProps = {
  name: string
  icon: ReactNode
  bgClass: string
  dark: boolean
}

export const CategoryChip = ({
  name,
  icon,
  bgClass,
  dark,
}: CategoryChipProps) => (
  <button
    className={`flex items-center gap-2 px-5 py-2.5 rounded-full ${bgClass} ${dark ? 'text-gray-300' : 'text-gray-500'} text-sm font-medium`}
  >
    {icon} {name}
  </button>
)
