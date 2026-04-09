import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import {
  JOBS,
  TAKE_HOME,
  createBudgetCategories,
  LIFE_EVENTS,
} from '../data/simulator'
import { useLearning } from '../context/LearningContext'
import type { BudgetCategory } from '../types'
import { SimulatorHeader } from '../components/ui/SimulatorHeader'
import { JobCard } from '../components/ui/JobCard'
import { PayslipCard } from '../components/ui/PayslipCard'
import { BudgetSlider } from '../components/ui/BudgetSlider'
import { BudgetSummary } from '../components/ui/BudgetSummary'
import { EventCard } from '../components/ui/EventCard'
import { ResultsPanel } from '../components/ui/ResultsPanel'

export const BudgetSimulator = () => {
  const navigate = useNavigate()
  const learning = useLearning()
  const [step, setStep] = useState<
    'select' | 'payslip' | 'budget' | 'event' | 'results'
  >('select')
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [budget, setBudget] = useState<BudgetCategory[]>(
    createBudgetCategories()
  )
  const [event, setEvent] = useState<{
    title: string
    cost: number
    desc: string
  } | null>(null)

  const job = JOBS.find((j) => j.key === selectedJob)
  const totalSpent = budget.reduce((acc, c) => acc + c.value, 0)
  const moneyLeft = TAKE_HOME - totalSpent

  const updateBudget = (key: string, value: number) => {
    setBudget((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value: Math.max(0, value) } : c))
    )
  }

  const triggerEvent = () => {
    const ev = LIFE_EVENTS[Math.floor(Math.random() * LIFE_EVENTS.length)]
    setEvent(ev)
    setStep('event')
  }

  const handleFinish = () => {
    // Award budget_pro badge if balanced within 5% of take-home
    if (Math.abs(moneyLeft) < TAKE_HOME * 0.05) learning.earnBadge('budget_pro')
    setStep('results')
  }

  const savingsAmount = budget.find((c) => c.key === 'savings')?.value ?? 0
  const emergencyAmount = budget.find((c) => c.key === 'emergency')?.value ?? 0
  const finalBalance = moneyLeft - (event?.cost ?? 0)

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <SimulatorHeader
          title="Budget Simulator"
          subtitle="Experience your first month of earning!"
          onBack={() =>
            step === 'select'
              ? navigate('/student-dashboard')
              : setStep('select')
          }
        />

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-black text-[#22223B] text-center">
                Choose Your Career
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {JOBS.map((j) => (
                  <JobCard
                    key={j.key}
                    emoji={j.emoji}
                    title={j.title}
                    description={j.description}
                    salary={j.salary}
                    onSelect={() => {
                      setSelectedJob(j.key)
                      setStep('payslip')
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {step === 'payslip' && (
            <motion.div
              key="payslip"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <PayslipCard
                jobTitle={job?.title || ''}
                takeHome={TAKE_HOME}
                onContinue={() => setStep('budget')}
              />
            </motion.div>
          )}

          {step === 'budget' && (
            <motion.div
              key="budget"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid lg:grid-cols-5 gap-10"
            >
              <div className="lg:col-span-3 space-y-6">
                <h2 className="text-2xl font-black text-[#22223B]">
                  Allocate Your Budget
                </h2>
                <div className="space-y-4">
                  {budget.map((cat) => (
                    <BudgetSlider
                      key={cat.key}
                      category={cat}
                      onChange={updateBudget}
                    />
                  ))}
                </div>
              </div>
              <div className="lg:col-span-2">
                <BudgetSummary
                  moneyLeft={moneyLeft}
                  totalSpent={totalSpent}
                  takeHome={TAKE_HOME}
                  onFinish={triggerEvent}
                />
              </div>
            </motion.div>
          )}

          {step === 'event' && event && (
            <motion.div
              key="event"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <EventCard
                title={event.title}
                description={event.desc}
                cost={event.cost}
                onContinue={handleFinish}
              />
            </motion.div>
          )}

          {step === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <ResultsPanel
                savingsAmount={savingsAmount}
                emergencyAmount={emergencyAmount}
                finalBalance={finalBalance}
                advice={
                  finalBalance < 0
                    ? 'Tough month! Those unexpected costs can really hurt. Try building a larger emergency fund next time.'
                    : savingsAmount < TAKE_HOME * 0.1
                      ? 'Good job staying in the black! Try saving at least 10% of your income.'
                      : "Excellent budgeting! You handled the surprise and still saved well. You're a natural! 🌟"
                }
                onTryAgain={() => {
                  setBudget(createBudgetCategories())
                  setStep('select')
                  setEvent(null)
                }}
                onBackToDashboard={() => navigate('/student-dashboard')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
