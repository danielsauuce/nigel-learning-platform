import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { LEARNING_PATHS, BADGES, type LearningPath } from '@/constants/learning-paths';

interface LearningState {
  /** Set of completed lesson IDs, e.g. 'sb1', 'sb2' */
  completedLessons: Set<string>;
  /** Set of earned badge IDs */
  earnedBadges: Set<string>;
  /** Current streak */
  streak: number;
  /** XP */
  xp: number;
}

interface LearningContextValue extends LearningState {
  /** Complete a lesson by ID — auto-checks for badge unlocks & path progression */
  completeLesson: (lessonId: string) => void;
  /** Earn a badge manually */
  earnBadge: (badgeId: string) => void;
  /** Is a specific lesson unlocked? */
  isLessonUnlocked: (lessonId: string) => boolean;
  /** Is a learning path unlocked? */
  isPathUnlocked: (pathKey: string) => boolean;
  /** Is a path fully completed? */
  isPathCompleted: (pathKey: string) => boolean;
  /** Get path status */
  getPathStatus: (pathKey: string) => 'mastered' | 'active' | 'locked';
  /** Get completed count for a path */
  getPathProgress: (pathKey: string) => { completed: number; total: number };
  /** Get the current active lesson in a path (first incomplete) */
  getCurrentLesson: (pathKey: string) => string | null;
  /** Level derived from XP */
  level: number;
  /** Reset all progress */
  resetProgress: () => void;
}

const LearningContext = createContext<LearningContextValue>({} as any);

const INITIAL_STATE: LearningState = {
  completedLessons: new Set<string>(),
  earnedBadges: new Set(['first_lesson']),
  streak: 7,
  xp: 0,
};

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    INITIAL_STATE.completedLessons,
  );
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(INITIAL_STATE.earnedBadges);
  const [streak] = useState(INITIAL_STATE.streak);
  const [xp, setXp] = useState(INITIAL_STATE.xp);

  const level = useMemo(() => Math.floor(xp / 100) + 1, [xp]);

  const isPathCompleted = useCallback(
    (pathKey: string) => {
      const path = LEARNING_PATHS.find((p) => p.key === pathKey);
      if (!path) return false;
      return path.lessons.every((l) => completedLessons.has(l.id));
    },
    [completedLessons],
  );

  const isPathUnlocked = useCallback(
    (pathKey: string) => {
      const idx = LEARNING_PATHS.findIndex((p) => p.key === pathKey);
      if (idx === 0) return true; // First path always unlocked
      // Previous path must be completed
      const prevPath = LEARNING_PATHS[idx - 1];
      return prevPath ? isPathCompleted(prevPath.key) : false;
    },
    [isPathCompleted],
  );

  const isLessonUnlocked = useCallback(
    (lessonId: string) => {
      for (const path of LEARNING_PATHS) {
        const lessonIdx = path.lessons.findIndex((l) => l.id === lessonId);
        if (lessonIdx === -1) continue;
        // Path must be unlocked
        if (!isPathUnlocked(path.key)) return false;
        // First lesson of an unlocked path is always available
        if (lessonIdx === 0) return true;
        // Previous lesson in this path must be completed
        return completedLessons.has(path.lessons[lessonIdx - 1].id);
      }
      return false;
    },
    [completedLessons, isPathUnlocked],
  );

  const getPathStatus = useCallback(
    (pathKey: string): 'mastered' | 'active' | 'locked' => {
      if (isPathCompleted(pathKey)) return 'mastered';
      if (isPathUnlocked(pathKey)) return 'active';
      return 'locked';
    },
    [isPathCompleted, isPathUnlocked],
  );

  const getPathProgress = useCallback(
    (pathKey: string) => {
      const path = LEARNING_PATHS.find((p) => p.key === pathKey);
      if (!path) return { completed: 0, total: 0 };
      const completed = path.lessons.filter((l) => completedLessons.has(l.id)).length;
      return { completed, total: path.lessons.length };
    },
    [completedLessons],
  );

  const getCurrentLesson = useCallback(
    (pathKey: string) => {
      const path = LEARNING_PATHS.find((p) => p.key === pathKey);
      if (!path) return null;
      const next = path.lessons.find((l) => !completedLessons.has(l.id));
      return next?.id ?? null;
    },
    [completedLessons],
  );

  const completeLesson = useCallback(
    (lessonId: string) => {
      setCompletedLessons((prev) => {
        const next = new Set(prev);
        next.add(lessonId);
        return next;
      });
      setXp((prev) => prev + 25);

      // Check for badge unlocks
      setTimeout(() => {
        setCompletedLessons((current) => {
          const newBadges = new Set(earnedBadges);
          if (current.size === 1 && !newBadges.has('first_lesson')) newBadges.add('first_lesson');
          for (const path of LEARNING_PATHS) {
            if (path.lessons.every((l) => current.has(l.id))) {
              const badgeMap: Record<string, string> = {
                saving_basics: 'saving_basics',
                smart_spending: 'smart_spender',
                earning_income: 'earner',
                borrowing_debt: 'debt_wise',
                investing_future: 'investor',
              };
              if (badgeMap[path.key]) newBadges.add(badgeMap[path.key]);
            }
          }
          // Money master — all paths done
          if (LEARNING_PATHS.every((p) => p.lessons.every((l) => current.has(l.id)))) {
            newBadges.add('money_master');
          }
          setEarnedBadges(newBadges);
          return current;
        });
      }, 100);
    },
    [earnedBadges],
  );

  const earnBadge = useCallback((badgeId: string) => {
    setEarnedBadges((prev) => {
      const n = new Set(prev);
      n.add(badgeId);
      return n;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setCompletedLessons(new Set());
    setEarnedBadges(new Set());
    setXp(0);
  }, []);

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
    ],
  );

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
}

export function useLearning() {
  return useContext(LearningContext);
}
