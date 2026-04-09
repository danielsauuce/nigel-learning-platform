import React from 'react'
import { motion } from 'motion/react'

interface FeaturesCardProps {
  icon: React.ReactNode
  title: string
  desc: string
  accent: string
  highlight?: boolean
  delay?: number
}

export const FeaturesCard: React.FC<FeaturesCardProps> = ({
  icon,
  title,
  desc,
  accent,
  highlight = false,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`${
      highlight ? 'bg-edulite-purple' : 'bg-white/5'
    } p-10 rounded-3xl space-y-5`}
  >
    <div
      className={`w-14 h-14 ${accent} flex items-center justify-center rounded-2xl text-white`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white">{title}</h3>
    <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
  </motion.div>
)
