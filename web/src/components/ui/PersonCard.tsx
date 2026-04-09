import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type PersonCardProps = {
  name: string
  role: string
  icon: ReactNode
  delay?: number
}

export const PersonCard = ({
  name,
  role,
  icon,
  delay = 0,
}: PersonCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="space-y-4"
  >
    <div className="w-40 h-40 bg-white rounded-full mx-auto shadow-xl overflow-hidden flex items-center justify-center">
      {icon}
    </div>
    <h4 className="font-bold text-lg text-edulite-navy">{name}</h4>
    <p className="text-gray-500 text-sm">{role}</p>
  </motion.div>
)
