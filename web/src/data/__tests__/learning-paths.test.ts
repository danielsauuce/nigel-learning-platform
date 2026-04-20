import { describe, expect, it } from 'vitest'
import { BADGES, LEARNING_PATHS } from '../learning-paths'

describe('learning-paths data', () => {
  it('defines learning paths in the expected sequential order with unique keys and lesson ids', () => {
    expect(LEARNING_PATHS.map((path) => path.key)).toEqual([
      'saving_basics',
      'smart_spending',
      'earning_income',
      'borrowing_debt',
      'investing_future',
    ])

    const pathKeys = LEARNING_PATHS.map((path) => path.key)
    expect(new Set(pathKeys).size).toBe(pathKeys.length)

    const lessonIds = LEARNING_PATHS.flatMap((path) =>
      path.lessons.map((lesson) => lesson.id)
    )
    expect(new Set(lessonIds).size).toBe(lessonIds.length)
    expect(lessonIds.length).toBeGreaterThan(0)
  })

  it('ensures every path and lesson carries the display fields used by the UI', () => {
    for (const path of LEARNING_PATHS) {
      expect(path.title).toBeTruthy()
      expect(path.emoji).toBeTruthy()
      expect(path.category).toBeTruthy()
      expect(path.color).toMatch(/^#/)
      expect(path.lessons.length).toBeGreaterThanOrEqual(6)

      for (const lesson of path.lessons) {
        expect(lesson.id).toBeTruthy()
        expect(lesson.title).toBeTruthy()
        expect(lesson.emoji).toBeTruthy()
      }
    }
  })

  it('defines unique badges including completion badges for each learning path', () => {
    const badgeIds = BADGES.map((badge) => badge.id)

    expect(new Set(badgeIds).size).toBe(badgeIds.length)
    expect(BADGES).toHaveLength(12)

    expect(badgeIds).toEqual(
      expect.arrayContaining([
        'first_lesson',
        'saving_basics',
        'smart_spender',
        'earner',
        'debt_wise',
        'investor',
        'money_master',
      ])
    )

    for (const badge of BADGES) {
      expect(badge.title).toBeTruthy()
      expect(badge.emoji).toBeTruthy()
      expect(badge.desc).toBeTruthy()
    }
  })
})
