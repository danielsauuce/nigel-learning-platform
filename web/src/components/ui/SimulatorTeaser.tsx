import { TrendingUp, Wallet } from 'lucide-react'

type SimulatorTeaserProps = {
  onEnter: () => void
}

export const SimulatorTeaser = ({ onEnter }: SimulatorTeaserProps) => (
  <section className="bg-[#22223B] p-10 rounded-[4rem] text-white relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9A7F8] rounded-full -mr-20 -mt-20 blur-[80px] opacity-20" />
    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-4">
        <div className="bg-amber-400 text-[#22223B] text-[10px] font-black px-3 py-1 rounded-full w-fit uppercase tracking-widest">
          Simulation
        </div>
        <h2 className="text-3xl font-black">Budget Builder Challenge</h2>
        <p className="text-gray-300 font-medium">
          Pick a career, receive your payslip, and allocate your monthly budget
          — then survive a surprise life event!
        </p>
        <button
          onClick={onEnter}
          className="bg-white text-[#22223B] font-black px-8 py-4 rounded-2xl hover:scale-105 transition-transform flex items-center gap-2"
        >
          Enter Simulator <TrendingUp className="w-5 h-5" />
        </button>
      </div>
      <div className="w-48 h-48 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center">
        <Wallet className="w-20 h-20 text-[#B9A7F8]" />
      </div>
    </div>
  </section>
)
