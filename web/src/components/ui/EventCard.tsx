import { AlertTriangle } from 'lucide-react'

type EventCardProps = {
  title: string
  description: string
  cost: number
  onContinue: () => void
}

export const EventCard = ({
  title,
  description,
  cost,
  onContinue,
}: EventCardProps) => (
  <div className="bg-white p-12 rounded-[4rem] shadow-2xl border-4 border-rose-100 max-w-xl mx-auto text-center space-y-8">
    <div className="w-24 h-24 bg-rose-50 rounded-[2.5rem] flex items-center justify-center text-rose-500 mx-auto animate-bounce">
      <AlertTriangle className="w-12 h-12" />
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-black text-[#22223B]">{title}</h2>
      <p className="text-gray-500 font-medium">{description}</p>
    </div>
    <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
      <p className="text-rose-500 font-black text-2xl">-£{cost}</p>
      <p className="text-rose-400 text-xs font-bold uppercase">
        Unexpected Cost
      </p>
    </div>
    <button
      onClick={onContinue}
      className="w-full bg-[#22223B] text-white font-black py-5 rounded-3xl shadow-xl"
    >
      See Results
    </button>
  </div>
)
