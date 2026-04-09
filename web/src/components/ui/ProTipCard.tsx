import { Lightbulb } from 'lucide-react'

type ProTipCardProps = {
  title: string
  desc: string
  dark: boolean
}

export const ProTipCard = ({ title, desc, dark }: ProTipCardProps) => (
  <div
    className={`p-6 rounded-[2rem] flex items-start gap-4 ${dark ? 'bg-[#2A2A40]' : 'bg-[#FDE8E4]'}`}
  >
    <Lightbulb className="w-6 h-6 text-orange-500 shrink-0" />
    <div>
      <h4
        className={`font-black text-sm mb-1 ${dark ? 'text-white' : 'text-[#22223B]'}`}
      >
        {title}
      </h4>
      <p
        className={`text-xs font-medium leading-relaxed ${dark ? 'text-gray-400' : 'text-[#6C6C80]'}`}
      >
        {desc}
      </p>
    </div>
  </div>
)
