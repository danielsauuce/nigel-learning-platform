import React from 'react'
import { motion } from 'motion/react'

interface DetailedFeatureCardProps {
  icon: React.ReactNode
  title: string
  desc: string
  color: string
  delay?: number
}

export const DetailedFeatureCard: React.FC<DetailedFeatureCardProps> = ({
  icon,
  title,
  desc,
  color,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm border border-gray-50 hover:shadow-md transition-shadow"
  >
    <div
      className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}
    >
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-edulite-navy text-sm">{title}</h4>
      <p className="text-edulite-gray text-xs mt-1 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
)
