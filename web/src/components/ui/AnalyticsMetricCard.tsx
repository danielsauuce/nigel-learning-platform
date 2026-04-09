import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type AnalyticsMetricCardProps = {
  icon: ReactNode
  label: string
  value: string
  trend: string
  positive: boolean
}

export const AnalyticsMetricCard = ({
  icon,
  label,
  value,
  trend,
  positive,
}: AnalyticsMetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-600">
        {icon}
      </div>
      <span
        className={`text-xs font-bold px-2 py-1 rounded-lg ${positive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}
      >
        {trend}
      </span>
    </div>
    <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
      {label}
    </p>
    <h3 className="text-4xl font-bold text-[#22223B]">{value}</h3>
  </motion.div>
)
