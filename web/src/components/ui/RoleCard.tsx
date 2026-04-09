import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type RoleCardProps = {
  title: string
  description: string
  cta: string
  icon: ReactNode
  accentClass: string
  panelClass: string
  iconWrapperClass: string
  textClass: string
  ctaClass: string
  transitionDelay: number
  onSelect: () => void
}

export const RoleCard = ({
  title,
  description,
  cta,
  icon,
  accentClass,
  panelClass,
  iconWrapperClass,
  textClass,
  ctaClass,
  transitionDelay,
  onSelect,
}: RoleCardProps) => (
  <motion.button
    initial={{ opacity: 0, x: transitionDelay < 0 ? -30 : 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: Math.abs(transitionDelay) }}
    onClick={onSelect}
    className={`group ${panelClass} p-12 rounded-[3rem] border-2 border-transparent hover:border-current hover:shadow-2xl transition-all text-left relative overflow-hidden`}
  >
    <div
      className={`absolute top-0 right-0 w-32 h-32 ${accentClass} rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}
    />
    <div
      className={`${iconWrapperClass} rounded-3xl flex items-center justify-center mb-8 transition-colors`}
    >
      {icon}
    </div>
    <h3 className={`text-3xl font-bold mb-4 ${textClass}`}>{title}</h3>
    <p className={`leading-relaxed mb-8 ${textClass}`}>{description}</p>
    <div className={`flex items-center gap-2 font-bold ${ctaClass}`}>
      {cta}
      <span className="w-5 h-5">
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 group-hover:translate-x-2 transition-transform"
          fill="currentColor"
        >
          <path d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
        </svg>
      </span>
    </div>
  </motion.button>
)
