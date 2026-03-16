import { Link } from 'react-router-dom'
import { Lightbulb } from 'lucide-react'

export const Logo = ({ className = '' }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`}>
    <div className="w-8 h-8 bg-edulite-purple rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-3 h-3 bg-edulite-pink rounded-full -mr-1 -mt-1" />
      <Lightbulb className="w-5 h-5 text-edulite-navy" />
    </div>

    <span className="font-bold text-xl tracking-tight text-edulite-navy">
      Nigel Junior
    </span>
  </Link>
)
