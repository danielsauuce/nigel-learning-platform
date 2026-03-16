import { motion } from 'motion/react'

export const PuzzleCharacter = () => (
  <div className="relative w-64 h-72 mx-auto flex items-center justify-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full h-full relative"
    >
      <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-2xl">
        <path
          d="M40,40 Q40,20 60,20 H80 Q100,0 120,20 H140 Q160,20 160,40 V80 Q180,100 160,120 V160 Q160,180 140,180 H120 Q100,200 80,180 H60 Q40,180 40,160 V120 Q20,100 40,80 Z"
          fill="#B9A7F8"
        />
      </svg>
    </motion.div>
  </div>
)
