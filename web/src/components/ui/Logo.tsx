import { Link } from 'react-router-dom'
import nigelLogo from '../../assets/nigel-logo.png'

export const NigelBrandIcon = ({ size = 36 }: { size?: number }) => (
  <img
    src={nigelLogo}
    alt="Nigel"
    width={size}
    height={size}
    style={{ objectFit: 'contain' }}
  />
)

export const NigelBrandIconWhite = ({ size = 36 }: { size?: number }) => (
  <img
    src={nigelLogo}
    alt="Nigel"
    width={size}
    height={size}
    style={{ objectFit: 'contain' }}
  />
)

export const Logo = ({ className = '' }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
    <NigelBrandIcon size={36} />
    <span
      className="font-bold text-xl tracking-tight text-edulite-navy lowercase"
      style={{ fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.02em' }}
    >
      nigel
    </span>
  </Link>
)
