import { ArrowLeft, Gamepad2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface MissionHeaderProps {
  emoji: string
  title: string
}

export const MissionHeader = ({ emoji, title }: MissionHeaderProps) => {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between mb-10">
      <button
        onClick={() => navigate('/student-dashboard')}
        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 hover:text-[#22223B] transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="text-center">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Learning Path
        </p>
        <h1 className="text-xl font-black text-[#22223B]">
          {emoji} {title}
        </h1>
      </div>
      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-[#B9A7F8]">
        <Gamepad2 className="w-6 h-6" />
      </div>
    </header>
  )
}
