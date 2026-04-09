type TopPerformerCardProps = {
  rank: number
  name: string
  missions: number
  avg: number
  dark: boolean
}

export const TopPerformerCard = ({
  rank,
  name,
  missions,
  avg,
  dark,
}: TopPerformerCardProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
          rank === 1
            ? 'bg-amber-400 text-white'
            : dark
              ? 'bg-[#1A1A2E] text-gray-400'
              : 'bg-gray-100 text-gray-400'
        }`}
      >
        {rank}
      </div>
      <div>
        <span className={`font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}>
          {name}
        </span>
        <p className="text-[10px] text-gray-400">{missions} missions</p>
      </div>
    </div>
    <span className="text-[#F7B6B6] font-bold">{avg}%</span>
  </div>
)
