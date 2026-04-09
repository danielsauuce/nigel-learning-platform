import React from 'react'
import { motion } from 'motion/react'
import {
  Shield,
  Clock,
  Heart,
  Send,
  Flame,
  Target,
  TrendingUp,
  Award,
} from 'lucide-react'
import { ConversationStarter } from './ConversationStarter'
import { FeedbackForm } from './FeedbackForm'
import { ProgressCircle } from './ProgressCircle'
import { FamilyStatCard } from './FamilyStatCard'

interface ConversationStarterData {
  icon: React.ReactNode
  prompt: string
  detail: string
}

interface PreviewStepProps {
  overallProgress: number
  completedLessons: number
  level: number
  streak: number
  conversationStarters: ConversationStarterData[]
  feedback: string
  onFeedbackChange: (feedback: string) => void
  feedbackSent: boolean
  onSendFeedback: () => void
  onBack: () => void
  dark: boolean
}

export const PreviewStep: React.FC<PreviewStepProps> = ({
  overallProgress,
  completedLessons,
  level,
  streak,
  conversationStarters,
  feedback,
  onFeedbackChange,
  feedbackSent,
  onSendFeedback,
  onBack,
  dark,
}) => {
  const cardCls = `rounded-[3rem] border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`

  const stats = [
    {
      icon: <Target className="w-3.5 h-3.5 text-[#B9A7F8]" />,
      label: 'Missions',
      value: `${completedLessons}/33`,
    },
    {
      icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />,
      label: 'Sim Grade',
      value: 'B',
    },
    {
      icon: <Award className="w-3.5 h-3.5 text-amber-500" />,
      label: 'Quiz Avg',
      value: '82%',
    },
  ]

  return (
    <motion.div
      key="preview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Brand header */}
      <div className="text-center space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Shield className="w-5 h-5 text-[#B9A7F8]" />
          <span className="font-black text-[#B9A7F8]">Nigel</span>
        </div>
        <p className="text-xs text-gray-400">Family Progress Summary</p>
      </div>

      {/* Expiry */}
      <div
        className={`flex items-center gap-2 p-3 rounded-xl border ${dark ? 'bg-amber-500/5 border-amber-500/15' : 'bg-amber-50 border-amber-100'}`}
      >
        <Clock className="w-3 h-3 text-amber-500" />
        <span className="text-[11px] text-gray-400">
          This link expires in 6 days · Read-only
        </span>
      </div>

      {/* Student profile card */}
      <div className={`overflow-hidden ${cardCls}`}>
        <div
          className={`p-6 text-center ${dark ? 'bg-[#B9A7F8]/5' : 'bg-[#B9A7F8]/5'}`}
        >
          <div className="w-16 h-16 bg-[#B9A7F8]/15 rounded-full flex items-center justify-center text-[#B9A7F8] font-black text-2xl mx-auto mb-2">
            S
          </div>
          <h3
            className={`text-xl font-black ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            Sarah's Progress
          </h3>
          <p className="text-xs text-gray-400">
            Level {level} · <Flame className="w-3 h-3 inline text-orange-500" />{' '}
            {streak}-day streak
          </p>
        </div>
        <div className="p-6 flex items-center gap-6">
          <ProgressCircle progress={overallProgress} dark={dark} />
          <div className="flex-1 space-y-2">
            {stats.map((stat) => (
              <FamilyStatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                dark={dark}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Conversation starters */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-[#B9A7F8]" />
          <span
            className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            Talk About It Together
          </span>
        </div>
        <div className="space-y-2">
          {conversationStarters.map((starter, i) => (
            <ConversationStarter
              key={i}
              icon={starter.icon}
              prompt={starter.prompt}
              detail={starter.detail}
              dark={dark}
            />
          ))}
        </div>
      </div>

      {/* Feedback to teacher */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Send className="w-4 h-4 text-gray-400" />
          <span
            className={`font-bold text-sm ${dark ? 'text-white' : 'text-[#22223B]'}`}
          >
            Feedback for the Teacher
          </span>
        </div>
        <FeedbackForm
          feedback={feedback}
          onFeedbackChange={onFeedbackChange}
          feedbackSent={feedbackSent}
          onSendFeedback={onSendFeedback}
          dark={dark}
        />
      </div>

      <button
        onClick={onBack}
        className="w-full bg-[#B9A7F8] text-white font-black py-5 rounded-3xl shadow-lg"
      >
        ← Back to Link
      </button>
    </motion.div>
  )
}
