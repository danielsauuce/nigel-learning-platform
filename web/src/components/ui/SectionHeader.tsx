import { motion } from 'motion/react'

type SectionHeaderProps = {
  title: string
  subtitle: string
}

export const SectionHeader = ({ title, subtitle }: SectionHeaderProps) => (
  <div className="text-center space-y-4 mb-16">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-5xl font-bold text-[#22223B]"
    >
      {title}
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="text-gray-500 text-lg font-medium"
    >
      {subtitle}
    </motion.p>
  </div>
)
