import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type CtaBannerProps = {
  title: string
  description: string
  buttonLabel: string
  buttonIcon: ReactNode
  onClick?: () => void
  mascot: ReactNode
}

export const CtaBanner = ({
  title,
  description,
  buttonLabel,
  buttonIcon,
  onClick,
  mascot,
}: CtaBannerProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="max-w-7xl mx-auto bg-edulite-navy rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-64 h-64 bg-edulite-purple/10 rounded-full blur-3xl" />

    <div className="flex-1 space-y-5 relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
      <p className="text-white/50 max-w-md">{description}</p>
      <button
        type="button"
        onClick={onClick}
        className="bg-white text-edulite-navy font-bold px-10 py-4 rounded-full flex items-center gap-2 text-sm hover:bg-edulite-purple hover:text-white transition-colors"
      >
        {buttonLabel}
        {buttonIcon}
      </button>
    </div>

    <motion.div
      className="relative z-10"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {mascot}
    </motion.div>
  </motion.div>
)
