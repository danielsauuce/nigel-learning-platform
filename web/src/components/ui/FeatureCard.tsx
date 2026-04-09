import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type FeatureCardProps = {
  icon: ReactNode
  title: string
  description: string
  accentClass: string
  textClass: string
  delay?: number
}

export const FeatureCard = ({
  icon,
  title,
  description,
  accentClass,
  textClass,
  delay = 0,
}: FeatureCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-3xl p-10 space-y-5 shadow-sm"
  >
    <div
      className={`w-14 h-14 ${accentClass} rounded-2xl flex items-center justify-center`}
    >
      {icon}
    </div>
    <h3 className={`text-xl font-bold ${textClass}`}>{title}</h3>
    <p className="text-edulite-gray text-sm leading-relaxed">{description}</p>
  </motion.div>
)
