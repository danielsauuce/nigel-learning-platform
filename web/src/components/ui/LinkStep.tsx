import React from 'react'
import { motion } from 'motion/react'
import {
  PartyPopper,
  Link2,
  Copy,
  Check,
  Share2,
  Eye,
  BarChart2,
  Trophy,
  Flame,
  Star,
  Clock,
} from 'lucide-react'

interface LinkStepProps {
  link: string
  copied: boolean
  onCopy: () => void
  onPreview: () => void
  onDone: () => void
  overallProgress: number
  earnedBadges: number
  streak: number
  dark: boolean
}

export const LinkStep: React.FC<LinkStepProps> = ({
  link,
  copied,
  onCopy,
  onPreview,
  onDone,
  overallProgress,
  earnedBadges,
  streak,
  dark,
}) => {
  const cardCls = `rounded-[3rem] border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`

  const previewItems = [
    {
      icon: <BarChart2 className="w-4 h-4 text-[#B9A7F8]" />,
      text: `${overallProgress}% overall progress`,
    },
    {
      icon: <Trophy className="w-4 h-4 text-amber-500" />,
      text: `${earnedBadges} badges earned`,
    },
    {
      icon: <Flame className="w-4 h-4 text-orange-500" />,
      text: `${streak}-day learning streak`,
    },
    {
      icon: <Star className="w-4 h-4 text-[#B9A7F8]" />,
      text: 'Budget simulation: B grade',
    },
  ]

  return (
    <motion.div
      key="link"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <div className="text-center space-y-3">
        <div className="flex justify-center">
          <PartyPopper className="w-12 h-12 text-[#B9A7F8]" />
        </div>
        <h2
          className={`text-2xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          Link Created!
        </h2>
        <p
          className={`text-sm font-medium ${dark ? 'text-gray-400' : 'text-gray-500'}`}
        >
          Share this link with your parent or guardian so they can see your
          progress.
        </p>
      </div>

      {/* Link card */}
      <div className={`p-5 ${cardCls}`}>
        <div
          className={`flex items-center justify-between p-4 rounded-2xl mb-3 ${dark ? 'bg-[#1A1A2E]' : 'bg-gray-50'}`}
        >
          <div className="flex items-center gap-2 flex-1">
            <Link2 className="w-4 h-4 text-[#B9A7F8]" />
            <span className="text-[#B9A7F8] font-bold text-sm truncate">
              {link}
            </span>
          </div>
          <button
            onClick={onCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-[#B9A7F8]/10 text-[#B9A7F8]'}`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 text-gray-400 text-xs">
          <Clock className="w-3 h-3" /> Expires in 7 days · Single-use ·
          Read-only
        </div>
      </div>

      {/* Share */}
      <button
        className={`w-full flex items-center justify-center gap-3 p-4 rounded-2xl border ${dark ? 'border-[#B9A7F8]/20 bg-[#B9A7F8]/5' : 'border-[#B9A7F8]/15 bg-[#B9A7F8]/5'}`}
      >
        <Share2 className="w-5 h-5 text-[#B9A7F8]" />
        <span className="font-bold text-sm text-[#B9A7F8]">
          Share via Message or Email
        </span>
      </button>

      {/* Preview summary */}
      <div>
        <h3
          className={`font-bold text-sm mb-3 ${dark ? 'text-white' : 'text-[#22223B]'}`}
        >
          What your family will see
        </h3>
        <div className={`p-5 rounded-2xl border space-y-3 ${cardCls}`}>
          {previewItems.map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              {item.icon}
              <span
                className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-[#22223B]'}`}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onPreview}
        className="w-full flex items-center justify-center gap-2 py-3 text-[#B9A7F8] font-bold"
      >
        <Eye className="w-4 h-4" /> Preview what they'll see
      </button>

      <button
        onClick={onDone}
        className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg"
      >
        Done
      </button>
    </motion.div>
  )
}
