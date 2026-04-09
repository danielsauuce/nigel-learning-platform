type StudentPreviewCardProps = {
  name: string
  missions: number
  badges: number
  avg: number
  simLevel: 'HIGH' | 'STEADY' | 'LOW'
  active: boolean
  dark: boolean
}

export const StudentPreviewCard = ({
  name,
  missions,
  badges,
  avg,
  simLevel,
  active,
  dark,
}: StudentPreviewCardProps) => (
  <div
    className={`p-6 rounded-[2.5rem] shadow-sm border flex items-center justify-between ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-[#B9A7F8]/20 flex items-center justify-center text-[#B9A7F8] font-bold">
        {name.charAt(0)}
      </div>
      <div>
        <p className={`font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}>
          {name}
        </p>
        <p className="text-xs text-gray-400 font-medium">
          {missions} missions · {badges} badges · Avg {avg}%
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <span
        className={`text-[10px] font-bold px-3 py-1 rounded-full ${
          simLevel === 'HIGH'
            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'
            : simLevel === 'STEADY'
              ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'
              : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10'
        }`}
      >
        {simLevel}
      </span>
      <span
        className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-400' : 'bg-gray-300'}`}
      />
    </div>
  </div>
)
