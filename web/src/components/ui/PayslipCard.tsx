import { CheckCircle2, Info } from 'lucide-react'

type PayslipCardProps = {
  jobTitle: string
  takeHome: number
  onContinue: () => void
}

export const PayslipCard = ({
  jobTitle,
  takeHome,
  onContinue,
}: PayslipCardProps) => (
  <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-gray-100 max-w-2xl mx-auto relative overflow-hidden">
    <div className="text-center mb-12">
      <div className="w-20 h-20 bg-[#B9A7F8] rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
        <CheckCircle2 className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-black text-[#22223B]">You Got Paid!</h2>
      <p className="text-gray-400 font-medium">
        Your monthly take-home pay as a {jobTitle}
      </p>
    </div>
    <div className="flex justify-between items-center p-8 bg-[#22223B] rounded-[2.5rem] text-white shadow-xl">
      <div>
        <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
          Take-Home Pay
        </p>
        <p className="text-3xl font-black">£{takeHome}</p>
      </div>
      <Info className="w-6 h-6 text-white/20" />
    </div>
    <button
      onClick={onContinue}
      className="w-full mt-12 bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg hover:scale-[1.02] transition-all"
    >
      Start Budgeting
    </button>
  </div>
)
