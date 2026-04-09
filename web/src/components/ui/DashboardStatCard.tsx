import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type DashboardStatCardProps = {
  icon: ReactNode
  label: string
  value: string
  trend?: string
  positive?: boolean
  colorClass: string
  dark: boolean
}

export const DashboardStatCard = ({
  icon,
  label,
  value,
  trend,
  positive = true,
  colorClass,
  dark,
}: DashboardStatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`p-6 rounded-[2.5rem] shadow-sm border flex items-center gap-6 ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <div
      className={`w-14 h-14 ${colorClass} rounded-2xl flex items-center justify-center text-white`}
    >
      {icon}
    </div>
    <div>
      <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <h3
          className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          {value}
        </h3>
        {trend ? (
          <span
            className={`text-xs font-bold ${positive ? 'text-emerald-500' : 'text-red-500'}`}
          >
            {trend}
          </span>
        ) : null}
      </div>
    </div>
  </motion.div>
)
