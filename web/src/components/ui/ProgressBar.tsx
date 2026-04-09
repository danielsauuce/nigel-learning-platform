type ProgressBarProps = {
  value: number
  max?: number
  showValue?: boolean
  className?: string
}

export const ProgressBar = ({
  value,
  max = 100,
  showValue = false,
  className = '',
}: ProgressBarProps) => {
  const getBarColor = () => {
    if (value > 85) return 'bg-emerald-400'
    if (value > 70) return 'bg-amber-400'
    return 'bg-rose-400'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${getBarColor()}`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-bold text-[#22223B]">{value}%</span>
      )}
    </div>
  )
}
