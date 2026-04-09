import { Clock, Gamepad2, Zap } from 'lucide-react'

type MetaBadgesProps = {
  timeLimit: number
  questionCount: number
  totalPoints: number
}

export const MetaBadges = ({
  timeLimit,
  questionCount,
  totalPoints,
}: MetaBadgesProps) => {
  const badges = [
    {
      icon: <Clock className="w-3.5 h-3.5" />,
      label: `${timeLimit} min`,
    },
    {
      icon: <Gamepad2 className="w-3.5 h-3.5" />,
      label: `${questionCount} Q${questionCount !== 1 ? 's' : ''}`,
    },
    {
      icon: <Zap className="w-3.5 h-3.5" />,
      label: `${totalPoints} pts`,
    },
  ]

  return (
    <div className="flex gap-3 flex-wrap">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className="flex items-center gap-1.5 bg-[#B9A7F8]/10 text-[#B9A7F8] text-xs font-bold px-3 py-1.5 rounded-lg"
        >
          {badge.icon} {badge.label}
        </span>
      ))}
    </div>
  )
}
