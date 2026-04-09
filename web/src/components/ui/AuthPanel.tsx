import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type AuthPanelProps = {
  isTeacher: boolean
  title: string
  description: string
  icon: ReactNode
}

export const AuthPanel = ({
  isTeacher,
  title,
  description,
  icon,
}: AuthPanelProps) => {
  const backgroundClass = isTeacher ? 'bg-[#22223B]' : 'bg-[#B9A7F8]'

  return (
    <div
      className={`hidden md:flex flex-1 ${backgroundClass} items-center justify-center p-20 relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border-4 border-white rounded-[4rem] rotate-12" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-8 relative z-10"
      >
        <div className="w-32 h-32 bg-white/20 rounded-[2.5rem] flex items-center justify-center mx-auto backdrop-blur-md">
          {icon}
        </div>

        <h2 className="text-5xl font-bold text-white leading-tight">{title}</h2>
        <p className="text-white/70 text-lg max-w-md mx-auto font-medium">
          {description}
        </p>
      </motion.div>
    </div>
  )
}
