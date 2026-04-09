import { CheckCircle2 } from 'lucide-react'

type BadgeCardProps = {
  emoji: string
  title: string
  earned: boolean
  dark: boolean
}

export const BadgeCard = ({ emoji, title, earned, dark }: BadgeCardProps) => (
  <div
    className={`p-4 rounded-2xl border text-center transition-all ${
      earned
        ? dark
          ? 'bg-emerald-500/10 border-emerald-500'
          : 'bg-emerald-50 border-emerald-400 border-2'
        : dark
          ? 'bg-[#2A2A40] border-[#3A3A55] opacity-40'
          : 'bg-gray-50 border-gray-100 opacity-40'
    }`}
  >
    <span className="text-3xl block mb-2">{emoji}</span>
    <span
      className={`text-[10px] font-bold block ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      {title}
    </span>
    {earned && (
      <span className="flex items-center justify-center gap-1 text-[9px] text-emerald-500 font-bold">
        <CheckCircle2 className="w-3 h-3" /> Earned
      </span>
    )}
  </div>
)
