import { useState, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import {
  BarChart2,
  Trophy,
  Flame,
  Star,
  Lock,
  MessageCircle,
  ShieldCheck,
  ShoppingCart,
  Target,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLearning } from '../context/LearningContext'
import { FamilyShareHeader } from '../components/ui/FamilyShareHeader'
import { ConsentStep } from '../components/ui/ConsentStep'
import { LinkStep } from '../components/ui/LinkStep'
import { PreviewStep } from '../components/ui/PreviewStep'

/** Mirrors mobile ConsentScreen data */
const SHARED_ITEMS = [
  {
    key: 'progress',
    icon: <BarChart2 className="w-4 h-4 text-[#B9A7F8]" />,
    label: 'Learning progress & completion %',
  },
  {
    key: 'badges',
    icon: <Trophy className="w-4 h-4 text-amber-500" />,
    label: 'Badges and achievements earned',
  },
  {
    key: 'streak',
    icon: <Flame className="w-4 h-4 text-orange-500" />,
    label: 'Current streak & activity',
  },
  {
    key: 'score',
    icon: <Star className="w-4 h-4 text-[#B9A7F8]" />,
    label: 'Quiz scores & simulation grades',
  },
]
const NOT_SHARED_ITEMS = [
  {
    key: 'answers',
    icon: <Lock className="w-4 h-4 text-gray-400" />,
    label: 'Your individual quiz answers',
  },
  {
    key: 'chat',
    icon: <MessageCircle className="w-4 h-4 text-gray-400" />,
    label: 'Messages with teachers or classmates',
  },
  {
    key: 'personal',
    icon: <ShieldCheck className="w-4 h-4 text-gray-400" />,
    label: 'Personal settings or preferences',
  },
]

const MOCK_LINK = 'nigel.app/family/a7x9k2m'

const CONVERSATION_STARTERS = [
  {
    icon: <MessageCircle className="w-4 h-4 text-[#B9A7F8]" />,
    prompt: 'Ask about saving',
    detail: '"What did you learn about where to keep money safely?"',
  },
  {
    icon: <ShoppingCart className="w-4 h-4 text-[#B9A7F8]" />,
    prompt: 'Discuss budgeting',
    detail: '"Can you show me how you built a budget in the simulator?"',
  },
  {
    icon: <Target className="w-4 h-4 text-[#B9A7F8]" />,
    prompt: 'Celebrate progress',
    detail: '"I saw you completed 12 missions — which one was your favourite?"',
  },
]

export const FamilyShare = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const learning = useLearning()
  const dark = theme === 'dark'

  const [step, setStep] = useState<'consent' | 'link' | 'preview'>('consent')
  const [agreed, setAgreed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  const handleCopy = useCallback(() => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])
  const handleSendFeedback = useCallback(() => {
    if (feedback.trim()) {
      setFeedbackSent(true)
      setFeedback('')
    }
  }, [feedback])

  const totalLessons = 33
  const overallProgress =
    totalLessons > 0
      ? Math.round((learning.completedLessons.size / totalLessons) * 100)
      : 0

  return (
    <div
      className={`min-h-screen p-6 md:p-10 transition-colors ${dark ? 'bg-[#1A1A2E]' : 'bg-[#F8F9FE]'}`}
    >
      <div className="max-w-2xl mx-auto">
        <FamilyShareHeader
          onBack={() =>
            step === 'consent'
              ? navigate('/student-dashboard')
              : setStep('consent')
          }
          dark={dark}
        />

        <AnimatePresence mode="wait">
          {step === 'consent' && (
            <ConsentStep
              sharedItems={SHARED_ITEMS}
              notSharedItems={NOT_SHARED_ITEMS}
              agreed={agreed}
              onAgreeChange={setAgreed}
              onContinue={() => setStep('link')}
              dark={dark}
            />
          )}

          {step === 'link' && (
            <LinkStep
              link={MOCK_LINK}
              copied={copied}
              onCopy={handleCopy}
              onPreview={() => setStep('preview')}
              onDone={() => navigate('/student-settings')}
              overallProgress={overallProgress}
              earnedBadges={learning.earnedBadges.size}
              streak={learning.streak}
              dark={dark}
            />
          )}

          {step === 'preview' && (
            <PreviewStep
              overallProgress={overallProgress}
              completedLessons={learning.completedLessons.size}
              level={learning.level}
              streak={learning.streak}
              conversationStarters={CONVERSATION_STARTERS}
              feedback={feedback}
              onFeedbackChange={setFeedback}
              feedbackSent={feedbackSent}
              onSendFeedback={handleSendFeedback}
              onBack={() => setStep('link')}
              dark={dark}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
