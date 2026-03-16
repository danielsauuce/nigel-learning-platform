/**
 * Teacher Data — mirrors mobile/src/components/teacher/data/
 *
 * Same structure used by both mobile and web so they can share a backend.
 */

import type { Student, ActivityItem } from '../types'

export const STUDENTS: Student[] = [
  {
    name: 'Alex Thompson',
    id: 'ST-2024-001',
    missions: 24,
    avg: 92,
    badges: 12,
    active: true,
    lastActive: '2 MINS AGO',
    simLevel: 'HIGH',
  },
  {
    name: 'Sarah Jenkins',
    id: 'ST-2024-008',
    missions: 19,
    avg: 85,
    badges: 8,
    active: true,
    lastActive: '1 HOUR AGO',
    simLevel: 'STEADY',
  },
  {
    name: 'Marcus Chen',
    id: 'ST-2024-012',
    missions: 31,
    avg: 98,
    badges: 15,
    active: true,
    lastActive: 'NOW',
    simLevel: 'HIGH',
  },
  {
    name: 'Emma Watson',
    id: 'ST-2024-003',
    missions: 15,
    avg: 78,
    badges: 6,
    active: true,
    lastActive: '3 HOURS AGO',
    simLevel: 'STEADY',
  },
  {
    name: 'Leo Martinez',
    id: 'ST-2024-015',
    missions: 8,
    avg: 65,
    badges: 3,
    active: false,
    lastActive: '2 DAYS AGO',
    simLevel: 'LOW',
  },
  {
    name: 'Priya Sharma',
    id: 'ST-2024-021',
    missions: 22,
    avg: 91,
    badges: 10,
    active: true,
    lastActive: '15 MINS AGO',
    simLevel: 'HIGH',
  },
]

export const RECENT_ACTIVITY: ActivityItem[] = [
  {
    icon: '📝',
    name: 'Emma Watson',
    action: 'Scored 100% in "Advanced Grammar Quiz"',
    time: '12m ago',
  },
  {
    icon: '🎯',
    name: 'Alex Thompson',
    action: 'Completed "The Great Expedition" mission series',
    time: '1h ago',
  },
  {
    icon: '🏆',
    name: 'Sarah Jenkins',
    action: 'Earned "Consistent Learner" badge for 7-day streak',
    time: '3h ago',
  },
]

/** Teacher dashboard stat cards — matches mobile StatCard component data */
export const TEACHER_STATS = [
  { label: 'Total Students', value: '124', trend: '+4%' },
  { label: 'Active (7 Days)', value: '98', trend: undefined },
  { label: 'Mission Comp.', value: '84%', trend: '+2%' },
  { label: 'Avg Quiz Score', value: '76.2', trend: undefined },
] as const
