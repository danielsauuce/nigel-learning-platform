import { motion } from 'motion/react'

/** Default Mascot — matches mobile Mascot.tsx exactly */
export const NigelMascot = ({
  size = 160,
  animate = true,
}: {
  size?: number
  animate?: boolean
}) => {
  const w = size
  const h = size * 1.35
  const Inner = (
    <svg width={w} height={h} viewBox="0 0 200 270" fill="none">
      {/* Puzzle body */}
      <path
        d="M30 15C30 7 37 0 45 0L155 0C163 0 170 7 170 15L170 70L185 70C193 70 200 77 200 85L200 115C200 123 193 130 185 130L170 130L170 185C170 193 163 200 155 200L115 200L115 185C115 177 108 170 100 170C92 170 85 177 85 185L85 200L45 200C37 200 30 193 30 185L30 130L15 130C7 130 0 123 0 115L0 85C0 77 7 70 15 70L30 70Z"
        fill="#B9A7F8"
      />
      {/* Eyes */}
      <ellipse cx="75" cy="92" rx="18" ry="20" fill="#22223B" />
      <ellipse cx="130" cy="92" rx="18" ry="20" fill="#22223B" />
      <circle cx="82" cy="86" r="5.5" fill="white" />
      <circle cx="137" cy="86" r="5.5" fill="white" />
      {/* Mouth */}
      <path d="M80 130 Q100 160 125 133" fill="#22223B" />
      <rect x="95" y="130" width="8" height="11" rx="2" fill="white" />
      <rect x="106" y="130" width="8" height="11" rx="2" fill="white" />
      {/* Cheeks */}
      <ellipse cx="50" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
      <ellipse
        cx="155"
        cy="115"
        rx="16"
        ry="12"
        fill="#F7B6B6"
        opacity={0.75}
      />
      {/* White drip arms */}
      <g opacity={0.85}>
        <path
          d="M18 140 Q8 175 18 210 Q22 220 26 210 Q32 180 28 145 Z"
          fill="white"
        />
        <path
          d="M182 140 Q192 170 182 205 Q178 215 174 205 Q168 180 172 145 Z"
          fill="white"
        />
      </g>
    </svg>
  )

  if (!animate) return <div style={{ width: w, height: h }}>{Inner}</div>

  return (
    <motion.div
      style={{ width: w, height: h }}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      {Inner}
    </motion.div>
  )
}

/** Waving Mascot — matches mobile MascotWaving exactly */
export const NigelMascotWaving = ({ size = 64 }: { size?: number }) => {
  const w = size
  const h = size * 1.4
  return (
    <svg width={w} height={h} viewBox="0 0 200 280" fill="none">
      <path
        d="M30 15C30 7 37 0 45 0L155 0C163 0 170 7 170 15L170 70L185 70C193 70 200 77 200 85L200 115C200 123 193 130 185 130L170 130L170 185C170 193 163 200 155 200L115 200L115 185C115 177 108 170 100 170C92 170 85 177 85 185L85 200L45 200C37 200 30 193 30 185L30 130L15 130C7 130 0 123 0 115L0 85C0 77 7 70 15 70L30 70Z"
        fill="#B9A7F8"
      />
      <ellipse cx="75" cy="92" rx="18" ry="20" fill="#22223B" />
      <ellipse cx="130" cy="92" rx="18" ry="20" fill="#22223B" />
      <circle cx="82" cy="86" r="5.5" fill="white" />
      <circle cx="137" cy="86" r="5.5" fill="white" />
      <path d="M80 128 Q100 155 125 128" fill="#22223B" />
      <rect x="95" y="128" width="8" height="10" rx="2" fill="white" />
      <rect x="106" y="128" width="8" height="10" rx="2" fill="white" />
      <ellipse cx="50" cy="115" rx="16" ry="12" fill="#F7B6B6" opacity={0.75} />
      <ellipse
        cx="155"
        cy="115"
        rx="16"
        ry="12"
        fill="#F7B6B6"
        opacity={0.75}
      />
      {/* Left arm down */}
      <path
        d="M18 140 Q8 175 18 210 Q22 220 26 210 Q32 180 28 145 Z"
        fill="white"
        opacity={0.85}
      />
      {/* Right arm waving up */}
      <path
        d="M185 90 Q210 50 195 15 Q190 8 185 15 Q175 45 180 85 Z"
        fill="white"
        opacity={0.85}
      />
      {/* Wave marks */}
      <path
        d="M198 25 Q205 20 198 15"
        stroke="#F7E6B6"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M205 30 Q212 25 205 20"
        stroke="#F9D6D0"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

/** Small puzzle icon for logos */
export const NigelPuzzleIcon = ({
  size = 20,
  color = 'white',
}: {
  size?: number
  color?: string
}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
    <path
      d="M30 15C30 7 37 0 45 0L155 0C163 0 170 7 170 15L170 70L185 70C193 70 200 77 200 85L200 115C200 123 193 130 185 130L170 130L170 185C170 193 163 200 155 200L115 200L115 185C115 177 108 170 100 170C92 170 85 177 85 185L85 200L45 200C37 200 30 193 30 185L30 130L15 130C7 130 0 123 0 115L0 85C0 77 7 70 15 70L30 70Z"
      fill={color}
    />
  </svg>
)
