import type { ReactNode } from 'react'

type ResultCardProps = {
  value: string | number
  label: string
  bgClass: string
  borderClass: string
  textClass: string
  icon?: ReactNode
}

export const ResultCard = ({
  value,
  label,
  bgClass,
  borderClass,
  textClass,
  icon,
}: ResultCardProps) => (
  <div
    className={`p-8 rounded-[3rem] border text-center ${bgClass} ${borderClass}`}
  >
    <p className={`font-black text-3xl ${textClass}`}>{value}</p>
    <p
      className={`text-[10px] font-bold uppercase tracking-widest ${textClass}/60`}
    >
      {label}
    </p>
    {icon && <div className="mt-2">{icon}</div>}
  </div>
)
