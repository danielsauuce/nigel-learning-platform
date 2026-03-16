/**
 * Shared Types — mirrors mobile/src/constants/learning-paths.ts
 * and mobile/src/components/teacher/data/students.ts exactly.
 *
 * Both web and mobile apps use the same backend, so these types
 * must remain identical across platforms.
 */

// ─── Learning Paths ────────────────────────────────────────────
export interface LessonItem {
  id: string
  title: string
  emoji: string
}

export interface LearningPath {
  key: string
  title: string
  emoji: string
  category: string
  color: string
  lessons: LessonItem[]
}

export interface Badge {
  id: string
  title: string
  emoji: string
  desc: string
}

// ─── Student ───────────────────────────────────────────────────
export type SimLevel = 'HIGH' | 'STEADY' | 'LOW'

export interface Student {
  name: string
  id: string
  missions: number
  avg: number
  badges: number
  active: boolean
  lastActive: string
  simLevel: SimLevel
}

// ─── Auth ──────────────────────────────────────────────────────
export type RoleType = 'student' | 'teacher' | null

// ─── Quiz (teacher create-quiz) ────────────────────────────────
export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer'

export interface Answer {
  id: string
  text: string
  correct: boolean
}

export interface Question {
  id: string
  text: string
  type: QuestionType
  answers: Answer[]
  points: number
}

// ─── Budget Simulator ──────────────────────────────────────────
export interface JobRole {
  key: string
  title: string
  emoji: string
  salary: string
  description: string
  bg: string
}

export interface BudgetCategory {
  key: string
  label: string
  emoji: string
  color: string
  max: number
  step: number
  recommended: number
  value: number
  tip: string
}

// ─── Activity (teacher) ────────────────────────────────────────
export interface ActivityItem {
  icon: string
  name: string
  action: string
  time: string
}

// ─── Personalization ───────────────────────────────────────────
export interface PersonalizationOption {
  key: string
  title: string
  subtitle: string
  iconName: string
}

export interface PersonalizationQuestion {
  mascotText: string
  title: string
  subtitle: string
  sectionLabel: string
  question: string
  options: PersonalizationOption[]
}
