/**
 * LearningContext — Web port of mobile/src/context/LearningContext.tsx
 *
 * Identical logic: sequential path unlocking, lesson unlocking,
 * badge auto-granting, XP and level calculation.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import { LEARNING_PATHS } from '../data/learning-paths'

interface LearningState {
  completedLessons: Set<string>
  earnedBadges: Set<string>
  streak: number
  xp: number
}

interface LearningContextValue extends LearningState {
  completeLesson: (lessonId: string) => void
  earnBadge: (badgeId: string) => void
  isLessonUnlocked: (lessonId: string) => boolean
  isPathUnlocked: (pathKey: string) => boolean
  isPathCompleted: (pathKey: string) => boolean
  getPathStatus: (pathKey: string) => 'mastered' | 'active' | 'locked'
  getPathProgress: (pathKey: string) => { completed: number; total: number }
  getCurrentLesson: (pathKey: string) => string | null
  level: number
  resetProgress: () => void
}

const LearningContext = createContext<LearningContextValue>(
  {} as LearningContextValue
)

const INITIAL_STATE: LearningState = {
  completedLessons: new Set<string>(),
  earnedBadges: new Set(['first_lesson']),
  streak: 7,
  xp: 0,
}

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    INITIAL_STATE.completedLessons
  )
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(
    INITIAL_STATE.earnedBadges
  )
  const [streak] = useState(INITIAL_STATE.streak)
  const [xp, setXp] = useState(INITIAL_STATE.xp)

  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp])

  const isPathCompleted = useCallback(
    (pathKey: string) => {
      const path = LEARNING_PATHS.find((p) => p.key === pathKey)
      if (!path) return false
      return path.lessons.every((l) => completedLessons.has(l.id))
    },
    [completedLessons]
  )

  const isPathUnlocked = useCallback(
    (pathKey: string) => {
      const idx = LEARNING_PATHS.findIndex((p) => p.key === pathKey)
      if (idx === 0) return true
      const prevPath = LEARNING_PATHS[idx - 1]
      return prevPath ? isPathCompleted(prevPath.key) : false
    },
    [isPathCompleted]
  )

  const isLessonUnlocked = useCallback(
    (lessonId: string) => {
      for (const path of LEARNING_PATHS) {
        const lessonIdx = path.lessons.findIndex((l) => l.id === lessonId)
        if (lessonIdx === -1) continue
        if (!isPathUnlocked(path.key)) return false
        if (lessonIdx === 0) return true
        return completedLessons.has(path.lessons[lessonIdx - 1].id)
      }
      return false
    },
    [completedLessons, isPathUnlocked]
  )

  const getPathStatus = useCallback(
    (pathKey: string): 'mastered' | 'active' | 'locked' => {
      if (isPathCompleted(pathKey)) return 'mastered'
      if (isPathUnlocked(pathKey)) return 'active'
      return 'locked'
    },
    [isPathCompleted, isPathUnlocked]
  )

  const getPathProgress = useCallback(
    (pathKey: string) => {
      const path = LEARNING_PATHS.find((p) => p.key === pathKey)
      if (!path) return { completed: 0, total: 0 }
      const completed = path.lessons.filter((l) =>
        completedLessons.has(l.id)
      ).length
      return { completed, total: path.lessons.length }
    },
    [completedLessons]
  )

  const getCurrentLesson = useCallback(
    (pathKey: string) => {
      const path = LEARNING_PATHS.find((p) => p.key === pathKey)
      if (!path) return null
      const next = path.lessons.find((l) => !completedLessons.has(l.id))
      return next?.id ?? null
    },
    [completedLessons]
  )

  const completeLesson = useCallback(
    (lessonId: string) => {
      setCompletedLessons((prev) => {
        const next = new Set(prev)
        next.add(lessonId)
        return next
      })
      setXp((prev) => prev + 25)

      // Check for badge unlocks
      setTimeout(() => {
        setCompletedLessons((current) => {
          const newBadges = new Set(earnedBadges)
          if (current.size === 1 && !newBadges.has('first_lesson'))
            newBadges.add('first_lesson')
          for (const path of LEARNING_PATHS) {
            if (path.lessons.every((l) => current.has(l.id))) {
              const badgeMap: Record<string, string> = {
                saving_basics: 'saving_basics',
                smart_spending: 'smart_spender',
                earning_income: 'earner',
                borrowing_debt: 'debt_wise',
                investing_future: 'investor',
              }
              if (badgeMap[path.key]) newBadges.add(badgeMap[path.key])
            }
          }
          if (
            LEARNING_PATHS.every((p) =>
              p.lessons.every((l) => current.has(l.id))
            )
          ) {
            newBadges.add('money_master')
          }
          setEarnedBadges(newBadges)
          return current
        })
      }, 100)
    },
    [earnedBadges]
  )

  const earnBadge = useCallback((badgeId: string) => {
    setEarnedBadges((prev) => {
      const n = new Set(prev)
      n.add(badgeId)
      return n
    })
  }, [])

  const resetProgress = useCallback(() => {
    setCompletedLessons(new Set())
    setEarnedBadges(new Set())
    setXp(0)
  }, [])

  const value = useMemo(
    () => ({
      completedLessons,
      earnedBadges,
      streak,
      xp,
      level,
      completeLesson,
      earnBadge,
      isLessonUnlocked,
      isPathUnlocked,
      isPathCompleted,
      getPathStatus,
      getPathProgress,
      getCurrentLesson,
      resetProgress,
    }),
    [
      completedLessons,
      earnedBadges,
      streak,
      xp,
      level,
      completeLesson,
      earnBadge,
      isLessonUnlocked,
      isPathUnlocked,
      isPathCompleted,
      getPathStatus,
      getPathProgress,
      getCurrentLesson,
      resetProgress,
    ]
  )

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  )
}

export function useLearning() {
  return useContext(LearningContext)
}
