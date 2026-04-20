import type { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LEARNING_PATHS } from '../../data/learning-paths'
import { LearningProvider, useLearning } from '../LearningContext'

function wrapper({ children }: { children: ReactNode }) {
  return <LearningProvider>{children}</LearningProvider>
}

describe('LearningContext', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  it('provides the expected initial state and unlocks the first path only', () => {
    const { result } = renderHook(() => useLearning(), { wrapper })

    expect(result.current.completedLessons.size).toBe(0)
    expect(result.current.earnedBadges.has('first_lesson')).toBe(true)
    expect(result.current.streak).toBe(7)
    expect(result.current.xp).toBe(0)
    expect(result.current.level).toBe(1)

    expect(result.current.isPathUnlocked('saving_basics')).toBe(true)
    expect(result.current.isPathUnlocked('smart_spending')).toBe(false)
    expect(result.current.isLessonUnlocked('sb1')).toBe(true)
    expect(result.current.isLessonUnlocked('sb2')).toBe(false)
    expect(result.current.getPathStatus('saving_basics')).toBe('active')
    expect(result.current.getPathProgress('saving_basics')).toEqual({
      completed: 0,
      total: LEARNING_PATHS[0].lessons.length,
    })
    expect(result.current.getCurrentLesson('saving_basics')).toBe('sb1')
  })

  it('completes lessons sequentially and updates xp, level, progress, and current lesson', () => {
    const { result } = renderHook(() => useLearning(), { wrapper })

    act(() => {
      result.current.completeLesson('sb1')
      result.current.completeLesson('sb2')
      result.current.completeLesson('sb3')
      result.current.completeLesson('sb4')
    })

    expect(result.current.completedLessons.has('sb1')).toBe(true)
    expect(result.current.completedLessons.has('sb4')).toBe(true)
    expect(result.current.xp).toBe(100)
    expect(result.current.level).toBe(2)
    expect(result.current.isLessonUnlocked('sb5')).toBe(true)
    expect(result.current.getPathProgress('saving_basics')).toEqual({
      completed: 4,
      total: LEARNING_PATHS[0].lessons.length,
    })
    expect(result.current.getCurrentLesson('saving_basics')).toBe('sb5')
  })

  it('unlocks the next path and awards the mapped badge after completing a full path', async () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useLearning(), { wrapper })

    act(() => {
      for (const lesson of LEARNING_PATHS[0].lessons) {
        result.current.completeLesson(lesson.id)
      }
    })

    expect(result.current.isPathCompleted('saving_basics')).toBe(true)
    expect(result.current.getPathStatus('saving_basics')).toBe('mastered')
    expect(result.current.isPathUnlocked('smart_spending')).toBe(true)
    expect(result.current.isLessonUnlocked('ss1')).toBe(true)

    act(() => {
      vi.runAllTimers()
    })
    expect(result.current.earnedBadges.has('saving_basics')).toBe(true)

    expect(result.current.xp).toBe(LEARNING_PATHS[0].lessons.length * 25)
  })

  it('earns manual badges and resets progress state', () => {
    const { result } = renderHook(() => useLearning(), { wrapper })

    act(() => {
      result.current.completeLesson('sb1')
      result.current.earnBadge('quiz_ace')
    })

    expect(result.current.completedLessons.has('sb1')).toBe(true)
    expect(result.current.earnedBadges.has('quiz_ace')).toBe(true)

    act(() => {
      result.current.resetProgress()
    })

    expect(result.current.completedLessons.size).toBe(0)
    expect(result.current.earnedBadges.size).toBe(0)
    expect(result.current.xp).toBe(0)
    expect(result.current.level).toBe(1)
    expect(result.current.isPathUnlocked('saving_basics')).toBe(true)
    expect(result.current.isPathUnlocked('smart_spending')).toBe(false)
  })
})
