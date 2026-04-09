type OverallProgressHeroProps = {
  overallPercent: number
  completedCount: number
  totalLessons: number
  dark: boolean
}

export const OverallProgressHero = ({
  overallPercent,
  completedCount,
  totalLessons,
  dark,
}: OverallProgressHeroProps) => (
  <div
    className={`p-10 rounded-[3rem] border text-center mb-8 ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-[#F3F0FF] border-[#B9A7F830]'
    }`}
  >
    <div className="relative w-28 h-28 mx-auto mb-4">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke={dark ? '#3A3A55' : '#E8E4F0'}
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="#B9A7F8"
          strokeWidth="8"
          strokeDasharray={`${2 * Math.PI * 42}`}
          strokeDashoffset={`${2 * Math.PI * 42 * (1 - overallPercent / 100)}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`text-2xl font-black ${dark ? 'text-white' : 'text-[#B9A7F8]'}`}
        >
          {overallPercent}%
        </span>
        <span className="text-[9px] text-gray-400 font-bold">complete</span>
      </div>
    </div>
    <p
      className={`font-medium text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}
    >
      {completedCount} of {totalLessons} lessons completed
    </p>
  </div>
)
