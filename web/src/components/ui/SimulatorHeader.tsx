import { ArrowLeft } from 'lucide-react'

type SimulatorHeaderProps = {
  title: string
  subtitle: string
  onBack: () => void
}

export const SimulatorHeader = ({
  title,
  subtitle,
  onBack,
}: SimulatorHeaderProps) => (
  <header className="flex items-center gap-4 mb-10">
    <button
      onClick={onBack}
      className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-gray-400 hover:text-[#22223B] transition-colors"
    >
      <ArrowLeft className="w-6 h-6" />
    </button>
    <div>
      <h1 className="text-2xl font-black text-[#22223B]">{title}</h1>
      <p className="text-gray-500 font-medium text-sm">{subtitle}</p>
    </div>
  </header>
)
