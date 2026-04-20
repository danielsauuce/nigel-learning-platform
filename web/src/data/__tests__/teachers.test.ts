import { describe, expect, it } from 'vitest'
import {
  RECENT_ACTIVITY,
  STUDENTS,
  TEACHER_STATS,
} from '../teachers'

describe('teachers data', () => {
  it('defines unique students with valid dashboard-facing fields', () => {
    expect(STUDENTS).toHaveLength(6)

    const ids = STUDENTS.map((student) => student.id)
    expect(new Set(ids).size).toBe(ids.length)

    for (const student of STUDENTS) {
      expect(student.name).toBeTruthy()
      expect(student.id).toMatch(/^ST-\d{4}-\d{3}$/)
      expect(student.missions).toBeGreaterThanOrEqual(0)
      expect(student.avg).toBeGreaterThanOrEqual(0)
      expect(student.avg).toBeLessThanOrEqual(100)
      expect(student.badges).toBeGreaterThanOrEqual(0)
      expect(typeof student.active).toBe('boolean')
      expect(student.lastActive).toBeTruthy()
      expect(['HIGH', 'STEADY', 'LOW']).toContain(student.simLevel)
    }
  })

  it('defines recent activity items with the content expected by the teacher feed', () => {
    expect(RECENT_ACTIVITY).toHaveLength(3)

    for (const item of RECENT_ACTIVITY) {
      expect(item.icon).toBeTruthy()
      expect(item.name).toBeTruthy()
      expect(item.action).toBeTruthy()
      expect(item.time).toBeTruthy()
    }
  })

  it('defines the teacher stats cards used on the dashboard', () => {
    expect(TEACHER_STATS).toEqual([
      { label: 'Total Students', value: '124', trend: '+4%' },
      { label: 'Active (7 Days)', value: '98', trend: undefined },
      { label: 'Mission Comp.', value: '84%', trend: '+2%' },
      { label: 'Avg Quiz Score', value: '76.2', trend: undefined },
    ])
  })
})
