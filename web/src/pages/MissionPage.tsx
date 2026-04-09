import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useParams } from 'react-router-dom'
import { LEARNING_PATHS } from '../data/learning-paths'
import { useLearning } from '../context/LearningContext'
import { MissionHeader } from '../components/ui/MissionHeader'
import { LessonProgress } from '../components/ui/LessonProgress'
import { LessonResults } from '../components/ui/LessonResults'
import { LockedLesson } from '../components/ui/LockedLesson'
import { LessonSlide } from '../components/ui/LessonSlide'
import { QuizQuestion } from '../components/ui/QuizQuestion'

/**
 * Lesson content per path — each lesson has a slide + quiz question.
 * This mirrors the mobile LessonScreen / QuizScreen flow.
 */
const LESSON_CONTENT: Record<
  string,
  {
    slide: { title: string; content: string }
    quiz: {
      text: string
      options: string[]
      correct: number
      explanation: string
    }
  }
> = {
  sb1: {
    slide: {
      title: "What's Money?",
      content:
        'Money is a tool we use to exchange value. It can be coins, notes, or digital. Understanding what money is and how it works is the first step to financial literacy.',
    },
    quiz: {
      text: 'What is money primarily used for?',
      options: [
        'Decoration',
        'Exchanging value',
        'Starting fires',
        'Art projects',
      ],
      correct: 1,
      explanation:
        'Money is a medium of exchange — it lets us trade goods and services!',
    },
  },
  sb2: {
    slide: {
      title: 'Why Do We Save?',
      content:
        'Saving means keeping some money aside instead of spending it all. We save for emergencies, future goals, and to have peace of mind.',
    },
    quiz: {
      text: 'Why is saving important?',
      options: [
        "It's not important",
        'For emergencies and goals',
        'To impress friends',
        'Banks require it',
      ],
      correct: 1,
      explanation:
        'Saving gives you a safety net and helps you reach your goals!',
    },
  },
  sb3: {
    slide: {
      title: 'Piggy Banks & Savings Accounts',
      content:
        'A piggy bank is great for small savings. A bank savings account is safer for larger amounts and can even earn you interest over time.',
    },
    quiz: {
      text: "What's an advantage of a savings account over a piggy bank?",
      options: ["It's pink", 'It earns interest', "It's smaller", "It's free"],
      correct: 1,
      explanation:
        'Savings accounts earn interest — your money grows while sitting there!',
    },
  },
  sb4: {
    slide: {
      title: 'Setting a Savings Goal',
      content:
        'A savings goal gives you something to work towards. Start with a target amount and a deadline, then figure out how much to save each week.',
    },
    quiz: {
      text: 'What should a savings goal include?',
      options: [
        'Just a wish',
        'A target amount and deadline',
        'Only a date',
        'Nothing specific',
      ],
      correct: 1,
      explanation:
        'Good goals have a specific amount and a timeframe to keep you on track.',
    },
  },
  sb5: {
    slide: {
      title: 'Needs vs Wants',
      content:
        'Needs are things you must have to survive — food, shelter, water. Wants are things that are nice to have but you can live without — games, sweets, toys.',
    },
    quiz: {
      text: 'Which is a NEED?',
      options: [
        'A new PlayStation',
        'Clean drinking water',
        'Designer trainers',
        'Netflix',
      ],
      correct: 1,
      explanation: "Water is essential for survival — it's a primary need!",
    },
  },
  sb6: {
    slide: {
      title: 'Emergency Funds',
      content:
        'An emergency fund is money set aside for unexpected events — like a broken phone or a surprise bill. Experts recommend saving 3-6 months of expenses.',
    },
    quiz: {
      text: 'What is an emergency fund for?',
      options: [
        'Holiday spending',
        'Unexpected events',
        'Daily shopping',
        'Gifts',
      ],
      correct: 1,
      explanation: 'Emergency funds protect you when life throws surprises!',
    },
  },
  sb7: {
    slide: {
      title: 'Interest — Free Money?',
      content:
        "When you save money in a bank, they pay you interest — a small percentage of your balance. It's like getting paid for saving! Compound interest means you earn interest on your interest.",
    },
    quiz: {
      text: 'What is compound interest?',
      options: [
        'A type of tax',
        'Interest earned on interest',
        'A bank fee',
        'A loan type',
      ],
      correct: 1,
      explanation:
        'Compound interest is earning interest on your interest — your money grows faster over time!',
    },
  },
  sb8: {
    slide: {
      title: 'Saving Basics — Final Review',
      content:
        "You've learned about money, saving, needs vs wants, emergency funds, and interest. These are the building blocks of financial literacy!",
    },
    quiz: {
      text: "What's the golden rule of budgeting?",
      options: [
        'Spend everything',
        'Never spend more than you earn',
        'Only use cash',
        'Save 100%',
      ],
      correct: 1,
      explanation: 'The golden rule: never spend more than you earn!',
    },
  },
}

export const MissionPage = () => {
  const { id } = useParams()
  const learning = useLearning()

  const [currentLessonIdx, setCurrentLessonIdx] = useState(0)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [completedInSession, setCompletedInSession] = useState(0)

  // Find the learning path by key
  const path = LEARNING_PATHS.find((p) => p.key === id)
  if (!path)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold text-gray-500">
        Path not found
      </div>
    )

  // Get lessons for this path that are unlocked
  const lessons = path.lessons

  const currentLesson = lessons[currentLessonIdx]
  const content = LESSON_CONTENT[currentLesson?.id]
  const isLessonLocked = currentLesson
    ? !learning.isLessonUnlocked(currentLesson.id) &&
      !learning.completedLessons.has(currentLesson.id)
    : false

  const handleNextSlide = () => {
    if (content?.quiz) {
      setShowQuiz(true)
    } else {
      handleLessonComplete()
    }
  }

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return
    setSelectedOption(index)
    const correct = content && index === content.quiz.correct
    setIsCorrect(!!correct)
    if (correct) setScore((s) => s + 1)
  }

  const handleLessonComplete = () => {
    if (currentLesson) {
      learning.completeLesson(currentLesson.id)
      setCompletedInSession((c) => c + 1)
    }
    if (currentLessonIdx < lessons.length - 1) {
      setCurrentLessonIdx((i) => i + 1)
      setShowQuiz(false)
      setSelectedOption(null)
      setIsCorrect(null)
    } else {
      setShowResults(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FE] p-6 md:p-10">
      <div className="max-w-3xl mx-auto">
        <MissionHeader emoji={path.emoji} title={path.title} />

        <LessonProgress
          lessons={lessons}
          completedLessons={learning.completedLessons}
          currentLessonIdx={currentLessonIdx}
        />

        <AnimatePresence mode="wait">
          {showResults ? (
            <LessonResults
              score={score}
              completedInSession={completedInSession}
            />
          ) : !showQuiz ? (
            isLessonLocked ? (
              <motion.div
                key="slide"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm border border-gray-100 space-y-8"
              >
                <LockedLesson />
              </motion.div>
            ) : (
              <LessonSlide
                emoji={currentLesson?.emoji}
                title={content?.slide.title ?? currentLesson?.title ?? ''}
                content={
                  content?.slide.content ?? 'Lesson content coming soon...'
                }
                lessonNumber={currentLessonIdx + 1}
                totalLessons={lessons.length}
                hasQuiz={!!content?.quiz}
                onNext={handleNextSlide}
              />
            )
          ) : content?.quiz ? (
            <QuizQuestion
              question={content.quiz.text}
              options={content.quiz.options}
              correct={content.quiz.correct}
              explanation={content.quiz.explanation}
              selectedOption={selectedOption}
              isCorrect={isCorrect}
              onAnswer={handleAnswer}
              onComplete={handleLessonComplete}
              isLastLesson={currentLessonIdx === lessons.length - 1}
            />
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
