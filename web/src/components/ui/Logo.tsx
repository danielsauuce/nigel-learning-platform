import { Link } from 'react-router-dom'
import { NigelPuzzleIcon } from '../mobile/NigelMascot'

export const Logo = ({ className = '' }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
    <div className="w-9 h-9 bg-edulite-purple rounded-xl flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-3 h-3 bg-edulite-pink rounded-full -mr-1 -mt-1" />
      <NigelPuzzleIcon size={20} color="white" />
    </div>
    <span className="font-bold text-xl tracking-tight text-edulite-navy">
      Nigel Junior
    </span>
  </Link>
)
