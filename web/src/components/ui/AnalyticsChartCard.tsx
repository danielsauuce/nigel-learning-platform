import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type AnalyticsChartCardProps = {
  title: string
  legend?: ReactNode
  children: ReactNode
  delay?: number
}

export const AnalyticsChartCard = ({
  title,
  legend,
  children,
  delay = 0,
}: AnalyticsChartCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.35, delay }}
    className="bg-white p-10 rounded-[4rem] shadow-sm border border-gray-100"
  >
    <div className="flex justify-between items-center mb-10">
      <h3 className="text-2xl font-bold text-[#22223B]">{title}</h3>
      {legend}
    </div>
    {children}
  </motion.div>
)
