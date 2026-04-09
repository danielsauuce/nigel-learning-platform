const TIME_OPTIONS = [5, 10, 15, 20, 30, 45, 60] as const

type TimeLimitSelectorProps = {
  selectedTime: number
  onTimeChange: (time: number) => void
  dark?: boolean
}

export const TimeLimitSelector = ({
  selectedTime,
  onTimeChange,
  dark = false,
}: TimeLimitSelectorProps) => (
  <div>
    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
      Time Limit
    </p>
    <div className="flex gap-2 flex-wrap">
      {TIME_OPTIONS.map((mins) => (
        <button
          key={mins}
          onClick={() => onTimeChange(mins)}
          className={`px-4 py-2 rounded-full border text-xs font-bold ${
            selectedTime === mins
              ? 'bg-[#B9A7F8] border-[#B9A7F8] text-white'
              : dark
                ? 'border-[#3A3A55] text-gray-400'
                : 'border-gray-200 text-gray-500'
          }`}
        >
          {mins} min
        </button>
      ))}
    </div>
  </div>
)
