import React from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

interface FeedbackFormProps {
  feedback: string
  onFeedbackChange: (feedback: string) => void
  feedbackSent: boolean
  onSendFeedback: () => void
  dark: boolean
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  feedback,
  onFeedbackChange,
  feedbackSent,
  onSendFeedback,
  dark,
}) => {
  const cardCls = `rounded-[3rem] border ${dark ? 'bg-[#2A2A40] border-[#3A3A55]' : 'bg-white border-gray-100'}`

  if (feedbackSent) {
    return (
      <div
        className={`p-6 rounded-2xl border text-center ${dark ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}
      >
        <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
        <p className="font-bold text-emerald-600 text-sm">Thank you!</p>
        <p className="text-xs text-gray-400">
          Your feedback has been sent anonymously.
        </p>
      </div>
    )
  }

  return (
    <div className={`p-5 rounded-2xl border ${cardCls}`}>
      <textarea
        value={feedback}
        onChange={(e) => onFeedbackChange(e.target.value)}
        rows={3}
        placeholder="e.g. Alex really enjoyed the budget simulator, but found the quiz hard..."
        className={`w-full resize-none outline-none text-sm font-medium mb-3 bg-transparent ${dark ? 'text-white placeholder-gray-600' : 'text-[#22223B] placeholder-gray-300'}`}
      />
      <button
        disabled={!feedback.trim()}
        onClick={onSendFeedback}
        className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm ${feedback.trim() ? 'bg-[#B9A7F8] text-white' : dark ? 'bg-[#1A1A2E] text-gray-500' : 'bg-gray-100 text-gray-400'}`}
      >
        <Send className="w-3.5 h-3.5" /> Send Anonymously
      </button>
    </div>
  )
}
