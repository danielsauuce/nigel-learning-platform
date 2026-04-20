import { describe, expect, it } from 'vitest'
import {
  createBudgetCategories,
  JOBS,
  LIFE_EVENTS,
  TAKE_HOME,
} from '../simulator'

describe('simulator data', () => {
  it('defines the expected take-home amount and unique job roles', () => {
    expect(TAKE_HOME).toBe(2195)
    expect(JOBS).toHaveLength(4)

    const jobKeys = JOBS.map((job) => job.key)
    expect(new Set(jobKeys).size).toBe(jobKeys.length)

    for (const job of JOBS) {
      expect(job.title).toBeTruthy()
      expect(job.emoji).toBeTruthy()
      expect(job.salary).toMatch(/^£\d{2},\d{3}$/)
      expect(job.description).toBeTruthy()
      expect(job.bg).toMatch(/^#/)
    }
  })

  it('creates a fresh, normalized budget category list on each call', () => {
    const first = createBudgetCategories()
    const second = createBudgetCategories()

    expect(first).toHaveLength(8)
    expect(second).toHaveLength(8)
    expect(first).not.toBe(second)
    expect(first[0]).not.toBe(second[0])

    const categoryKeys = first.map((category) => category.key)
    expect(new Set(categoryKeys).size).toBe(categoryKeys.length)

    for (const category of first) {
      expect(category.label).toBeTruthy()
      expect(category.emoji).toBeTruthy()
      expect(category.color).toMatch(/^#/)
      expect(category.max).toBeGreaterThan(0)
      expect(category.step).toBeGreaterThan(0)
      expect(category.recommended).toBeGreaterThan(0)
      expect(category.value).toBe(0)
      expect(category.tip).toBeTruthy()
    }

    first[0].value = 500
    expect(second[0].value).toBe(0)
  })

  it('defines life events with unique titles and positive costs', () => {
    expect(LIFE_EVENTS).toHaveLength(5)

    const titles = LIFE_EVENTS.map((event) => event.title)
    expect(new Set(titles).size).toBe(titles.length)

    for (const event of LIFE_EVENTS) {
      expect(event.title).toBeTruthy()
      expect(event.cost).toBeGreaterThan(0)
      expect(event.desc).toBeTruthy()
    }
  })
})
