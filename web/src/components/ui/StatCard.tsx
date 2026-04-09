import { motion } from 'motion/react'

type StatCardProps = {
  num: string
  label: string
  delay?: number
}

export const StatCard = ({ num, label, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay }}
    className="bg-white/5 rounded-2xl p-6 text-center"
  >
    <p className="text-2xl font-bold text-edulite-purple">{num}</p>
    <p className="text-white/50 text-xs mt-1">{label}</p>
  </motion.div>
)
