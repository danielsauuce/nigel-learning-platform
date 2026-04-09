import { Moon, Sun } from 'lucide-react'

type ThemeModeCardProps = {
  dark: boolean
  isOn: boolean
  onToggle: () => void
}

export const ThemeModeCard = ({ dark, isOn, onToggle }: ThemeModeCardProps) => (
  <div
    className={`p-5 rounded-[2rem] border mb-6 ${
      dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        {isOn ? (
          <Moon className="w-5 h-5 text-[#B9A7F8]" />
        ) : (
          <Sun className="w-5 h-5 text-amber-500" />
        )}
        <div className="text-left">
          <p
            className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            Dark Mode
          </p>
          <p className="text-xs text-gray-400">
            {isOn ? 'On — easier on the eyes' : 'Off — bright and clean'}
          </p>
        </div>
      </div>
      <div
        className={`w-12 h-7 rounded-full relative transition-all ${isOn ? 'bg-[#B9A7F8]' : 'bg-gray-200'}`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-all shadow ${
            isOn ? 'left-6' : 'left-1'
          }`}
        />
      </div>
    </button>
  </div>
)
