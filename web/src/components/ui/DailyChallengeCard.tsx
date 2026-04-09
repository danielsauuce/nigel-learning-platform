import { motion } from 'motion/react'
import { Sparkles, Timer, Zap } from 'lucide-react'

type DailyChallengeCardProps = {
  title: string
  desc: string
  time: string
  xp: string
  onStart: () => void
}

export const DailyChallengeCard = ({
  title,
  desc,
  time,
  xp,
  onStart,
}: DailyChallengeCardProps) => (
  <motion.section
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 }}
    className="bg-[#22223B] p-8 rounded-[3rem] text-white relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-48 h-48 bg-[#B9A7F8] rounded-full -mr-16 -mt-16 blur-[60px] opacity-15" />
    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#F7E6B6]" />
          <span className="text-[10px] font-bold text-[#F7E6B6] uppercase tracking-widest">
            Daily Challenge
          </span>
        </div>
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="text-white/60 text-sm font-medium">{desc}</p>
        <div className="flex items-center gap-4 text-white/40 text-xs font-medium">
          <span className="flex items-center gap-1">
            <Timer className="w-3 h-3" /> {time}
          </span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> {xp}
          </span>
        </div>
      </div>
      <button
        onClick={onStart}
        className="bg-[#B9A7F8] text-white font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg"
      >
        Start →
      </button>
    </div>
  </motion.section>
)
