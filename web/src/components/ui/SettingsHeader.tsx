import { ArrowLeft } from 'lucide-react'

type SettingsHeaderProps = {
  title: string
  dark: boolean
  onBack: () => void
}

export const SettingsHeader = ({
  title,
  dark,
  onBack,
}: SettingsHeaderProps) => (
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
          dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'
        } hover:text-[#B9A7F8]`}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h1
        className={`text-3xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
      >
        {title}
      </h1>
    </div>
  </div>
)
