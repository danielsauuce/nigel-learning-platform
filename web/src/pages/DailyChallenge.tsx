import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLearning } from '../context/LearningContext'
import { ChallengeResults } from '../components/ui/ChallengeResults'
import { ChallengeHeader } from '../components/ui/ChallengeHeader'
import { ChallengeProgress } from '../components/ui/ChallengeProgress'
import { ChallengeStep } from '../components/ui/ChallengeStep'
import { ChallengeNextButton } from '../components/ui/ChallengeNextButton'

interface ChallengeStepData {
  type: 'info' | 'quiz' | 'input'
  title: string
  content: string
  options?: { key: string; text: string }[]
  correctKey?: string
  correctAnswer?: string
  placeholder?: string
  explanation?: string
}

/** Exact copy from mobile DailyChallengeScreen */
const CHALLENGE_STEPS: ChallengeStepData[] = [
  {
    type: 'info',
    title: 'The Scenario',
    content:
      "You invest £100 in a savings account that earns 10% compound interest per year. The bank adds interest to your balance, and next year you earn interest on the NEW total. Let's see how this works!",
  },
  {
    type: 'quiz',
    title: 'Year 1',
    content:
      'You start with £100 and earn 10% interest. How much do you have after Year 1?',
    options: [
      { key: 'a', text: '£100' },
      { key: 'b', text: '£110' },
      { key: 'c', text: '£120' },
      { key: 'd', text: '£105' },
    ],
    correctKey: 'b',
    explanation: '10% of £100 = £10. So £100 + £10 = £110.',
  },
  {
    type: 'quiz',
    title: 'Year 2',
    content:
      'Now you have £110. You earn 10% interest again, but this time on £110, not £100. How much after Year 2?',
    options: [
      { key: 'a', text: '£120' },
      { key: 'b', text: '£121' },
      { key: 'c', text: '£115' },
      { key: 'd', text: '£125' },
    ],
    correctKey: 'b',
    explanation:
      "10% of £110 = £11. So £110 + £11 = £121. That's £1 more than simple interest!",
  },
  {
    type: 'input',
    title: 'Year 5 — You Solve It!',
    content:
      'After 5 years of 10% compound interest on £100, how much will you have? Round to the nearest whole pound.',
    correctAnswer: '161',
    placeholder: 'Type your answer...',
    explanation:
      "£100 → £110 → £121 → £133 → £146 → £161. That's £11 more than simple interest would give!",
  },
]

export const DailyChallenge = () => {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const learning = useLearning()
  const dark = theme === 'dark'

  const [step, setStep] = useState(0)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [inputChecked, setInputChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [timer, setTimer] = useState(300)

  const current = CHALLENGE_STEPS[step]
  const totalQuestions = CHALLENGE_STEPS.filter((s) => s.type !== 'info').length

  useEffect(() => {
    if (finished) return
    const interval = setInterval(
      () => setTimer((p) => (p > 0 ? p - 1 : 0)),
      1000
    )
    return () => clearInterval(interval)
  }, [finished])

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`

  const handleSelectOption = useCallback(
    (key: string) => {
      if (answered) return
      setSelectedKey(key)
      setAnswered(true)
      if (key === current.correctKey) setScore((p) => p + 1)
    },
    [answered, current]
  )

  const handleCheckInput = useCallback(() => {
    setInputChecked(true)
    const clean = inputValue.replace(/[£,\s]/g, '')
    if (clean === current.correctAnswer) setScore((p) => p + 1)
  }, [inputValue, current])

  const handleNext = useCallback(() => {
    if (step < CHALLENGE_STEPS.length - 1) {
      setStep((p) => p + 1)
      setSelectedKey(null)
      setAnswered(false)
      setInputValue('')
      setInputChecked(false)
    } else {
      setFinished(true)
    }
  }, [step])

  const xpEarned = score * 20 + (timer > 0 ? 10 : 0)

  if (finished) {
    return (
      <ChallengeResults
        score={score}
        totalQuestions={totalQuestions}
        timer={timer}
        streak={learning.streak}
        xpEarned={xpEarned}
        dark={dark}
        onBack={() => navigate('/student-dashboard')}
      />
    )
  }

  const canProceed =
    current.type === 'info' ||
    (current.type === 'quiz' && answered) ||
    (current.type === 'input' && inputChecked)

  return (
    <div
      className={`min-h-screen p-6 md:p-10 ${dark ? 'bg-[#1A1A2E]' : 'bg-[#F8F9FE]'}`}
    >
      <div className="max-w-2xl mx-auto">
        <ChallengeHeader
          onBack={() => navigate('/student-dashboard')}
          timer={timer}
          formatTime={formatTime}
          dark={dark}
        />

        <ChallengeProgress
          steps={CHALLENGE_STEPS}
          currentStep={step}
          dark={dark}
        />

        <AnimatePresence mode="wait">
          <ChallengeStep
            stepData={current}
            stepNumber={step}
            totalSteps={CHALLENGE_STEPS.length}
            selectedKey={selectedKey}
            answered={answered}
            inputValue={inputValue}
            inputChecked={inputChecked}
            onSelectOption={handleSelectOption}
            onInputChange={setInputValue}
            onCheckInput={handleCheckInput}
            dark={dark}
          />
        </AnimatePresence>

        {canProceed && (
          <ChallengeNextButton
            onNext={handleNext}
            isLastStep={step >= CHALLENGE_STEPS.length - 1}
          />
        )}
      </div>
    </div>
  )
}
