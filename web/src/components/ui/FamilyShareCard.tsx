import { Users } from 'lucide-react'

type FamilyShareCardProps = {
  onShare: () => void
  dark: boolean
}

export const FamilyShareCard = ({ onShare, dark }: FamilyShareCardProps) => (
  <section
    className={`p-8 rounded-[3rem] shadow-sm border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`}
  >
    <h2
      className={`text-xl font-black mb-4 flex items-center gap-2 ${dark ? 'text-white' : 'text-[#22223B]'}`}
    >
      <Users className="w-5 h-5" /> Family Sharing
    </h2>
    <p
      className={`text-sm font-medium mb-6 ${dark ? 'text-gray-400' : 'text-gray-500'}`}
    >
      Share your progress with a parent or guardian.
    </p>
    <button
      onClick={onShare}
      className="w-full bg-[#B9A7F8] text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.02] transition-all"
    >
      Share Progress
    </button>
  </section>
)
