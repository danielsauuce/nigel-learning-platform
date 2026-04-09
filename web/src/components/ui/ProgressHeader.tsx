import { ArrowLeft } from 'lucide-react'

type ProgressHeaderProps = {
  title: string
  onBack: () => void
  dark: boolean
}

export const ProgressHeader = ({
  title,
  onBack,
  dark,
}: ProgressHeaderProps) => (
  <header className="flex items-center gap-4 mb-10">
    <button
      onClick={onBack}
      className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
        dark ? 'bg-[#2A2A40] text-gray-400' : 'bg-white text-gray-400'
      }`}
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
    <h1
      className={`text-2xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      {title}
    </h1>
  </header>
)
