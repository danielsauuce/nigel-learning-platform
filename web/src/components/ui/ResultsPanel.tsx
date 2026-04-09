import { Sparkles, Info } from 'lucide-react'
import { ResultCard } from './ResultCard'

type ResultsPanelProps = {
  savingsAmount: number
  emergencyAmount: number
  finalBalance: number
  advice: string
  onTryAgain: () => void
  onBackToDashboard: () => void
}

export const ResultsPanel = ({
  savingsAmount,
  emergencyAmount,
  finalBalance,
  advice,
  onTryAgain,
  onBackToDashboard,
}: ResultsPanelProps) => (
  <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto space-y-10">
    <div className="text-center">
      <div className="w-20 h-20 bg-amber-100 rounded-[2rem] flex items-center justify-center text-amber-500 mx-auto mb-6">
        <Sparkles className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-black text-[#22223B]">Month Complete!</h2>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <ResultCard
        value={`£${savingsAmount + emergencyAmount}`}
        label="Total Saved"
        bgClass="bg-emerald-50"
        borderClass="border-emerald-100"
        textClass="text-emerald-600"
      />
      <ResultCard
        value={`£${finalBalance}`}
        label="Final Balance"
        bgClass={finalBalance >= 0 ? 'bg-blue-50' : 'bg-rose-50'}
        borderClass={finalBalance >= 0 ? 'border-blue-100' : 'border-rose-100'}
        textClass={finalBalance >= 0 ? 'text-blue-600' : 'text-rose-600'}
      />
    </div>
    <div className="bg-gray-50 p-8 rounded-[3rem] space-y-4">
      <h3 className="font-black text-[#22223B] flex items-center gap-2">
        <Info className="w-5 h-5 text-[#B9A7F8]" /> Nigel's Advice
      </h3>
      <p className="text-gray-500 text-sm font-medium leading-relaxed">
        {advice}
      </p>
    </div>
    <div className="flex gap-4">
      <button
        onClick={onTryAgain}
        className="flex-1 bg-gray-100 text-[#22223B] font-black py-5 rounded-3xl hover:bg-gray-200 transition-all"
      >
        Try Again
      </button>
      <button
        onClick={onBackToDashboard}
        className="flex-1 bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg hover:scale-[1.02] transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  </div>
)
