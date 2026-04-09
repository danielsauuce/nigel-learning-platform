import type { ReactNode } from 'react'
import { Clock, MoreVertical } from 'lucide-react'

type RecentActivityCardProps = {
  icon: ReactNode
  name: string
  action: string
  time: string
  dark: boolean
}

export const RecentActivityCard = ({
  icon,
  name,
  action,
  time,
  dark,
}: RecentActivityCardProps) => (
  <div
    className={`p-6 rounded-[2.5rem] shadow-sm border flex items-center justify-between group hover:shadow-md transition-all ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <div className="flex items-center gap-6">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
      >
        {icon}
      </div>
      <div>
        <h4 className={`font-bold ${dark ? 'text-white' : 'text-[#22223B]'}`}>
          {name}
        </h4>
        <p className="text-xs text-gray-400 font-medium">{action}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-xs font-bold text-gray-400 flex items-center gap-1">
        <Clock className="w-3 h-3" /> {time}
      </span>
      <button className="text-gray-300 hover:text-[#22223B]">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>
  </div>
)
