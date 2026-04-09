import { Wallet, AlertTriangle } from 'lucide-react'

type BudgetSummaryProps = {
  moneyLeft: number
  totalSpent: number
  takeHome: number
  onFinish: () => void
}

export const BudgetSummary = ({
  moneyLeft,
  totalSpent,
  takeHome,
  onFinish,
}: BudgetSummaryProps) => (
  <div className="sticky top-10 space-y-6">
    <div className="bg-[#22223B] p-8 rounded-[3rem] text-white shadow-2xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
            Money Remaining
          </p>
          <h3
            className={`text-4xl font-black ${moneyLeft < 0 ? 'text-rose-400' : 'text-white'}`}
          >
            £{moneyLeft}
          </h3>
        </div>
        <div
          className={`p-3 rounded-2xl ${moneyLeft < 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-white/10 text-white/50'}`}
        >
          <Wallet className="w-6 h-6" />
        </div>
      </div>
      {moneyLeft < 0 && (
        <div className="flex items-center gap-3 p-4 bg-rose-500/20 rounded-2xl border border-rose-500/30 mb-6">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <p className="text-xs font-bold text-rose-100">
            You're overspending! Reduce some categories.
          </p>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex justify-between text-xs font-bold text-white/40 uppercase">
          <span>Total Spent</span>
          <span>£{totalSpent}</span>
        </div>
        <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${moneyLeft < 0 ? 'bg-rose-500' : 'bg-[#B9A7F8]'}`}
            style={{
              width: `${Math.min(100, (totalSpent / takeHome) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
    <button
      disabled={moneyLeft < 0 || totalSpent === 0}
      onClick={onFinish}
      className="w-full bg-[#B9A7F8] text-white font-black py-6 rounded-[2.5rem] shadow-lg disabled:opacity-50 disabled:hover:scale-100 hover:scale-[1.02] transition-all"
    >
      Finish Month
    </button>
  </div>
)
