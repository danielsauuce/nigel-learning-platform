import { Link } from 'react-router-dom'

/** Nigel brand icon — pink rounded square with arch cutout */
export const NigelBrandIcon = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect
      x="4"
      y="4"
      width="92"
      height="92"
      rx="18"
      stroke="#E91E8C"
      strokeWidth="8"
      fill="#E91E8C"
    />
    <path
      d="M30 100 V65 C30 45 50 30 50 30 C50 30 70 45 70 65 V100"
      fill="white"
    />
  </svg>
)

/** Nigel brand icon — white version for dark backgrounds */
export const NigelBrandIconWhite = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect
      x="4"
      y="4"
      width="92"
      height="92"
      rx="18"
      stroke="white"
      strokeWidth="8"
      fill="white"
    />
    <path
      d="M30 100 V65 C30 45 50 30 50 30 C50 30 70 45 70 65 V100"
      fill="#E91E8C"
    />
  </svg>
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
