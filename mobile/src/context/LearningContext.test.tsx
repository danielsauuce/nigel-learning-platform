import React from 'react';
import { Text } from 'react-native';
import TestRenderer, { act } from 'react-test-renderer';
import { LEARNING_PATHS } from '@/constants/learning-paths';
import { LearningProvider, useLearning } from './LearningContext';

type LearningSnapshot = ReturnType<typeof useLearning>;

function LearningConsumer({ onRender }: { onRender: (value: LearningSnapshot) => void }) {
  const value = useLearning();
  onRender(value);
  return <Text>{String(value.level)}</Text>;
}

describe('LearningContext', () => {
  const firstPath = LEARNING_PATHS[0];
  const secondPath = LEARNING_PATHS[1];
  const firstLesson = firstPath.lessons[0].id;
  const secondLesson = firstPath.lessons[1].id;

  it('exposes the default learning state and derived values', () => {
    let latestValue: LearningSnapshot | undefined;

    act(() => {
      TestRenderer.create(
        <LearningProvider>
          <LearningConsumer onRender={(value) => void (latestValue = value)} />
        </LearningProvider>,
      );
    });

    expect(latestValue?.completedLessons.size).toBe(0);
    expect(latestValue?.earnedBadges.has('first_lesson')).toBe(true);
    expect(latestValue?.streak).toBe(7);
    expect(latestValue?.xp).toBe(0);
    expect(latestValue?.level).toBe(1);
    expect(latestValue?.isPathUnlocked(firstPath.key)).toBe(true);
    expect(latestValue?.isPathUnlocked(secondPath.key)).toBe(false);
    expect(latestValue?.isLessonUnlocked(firstLesson)).toBe(true);
    expect(latestValue?.isLessonUnlocked(secondLesson)).toBe(false);
    expect(latestValue?.getPathProgress(firstPath.key)).toEqual({ completed: 0, total: 8 });
    expect(latestValue?.getCurrentLesson(firstPath.key)).toBe(firstLesson);
    expect(latestValue?.getPathStatus(firstPath.key)).toBe('active');
    expect(latestValue?.getPathStatus(secondPath.key)).toBe('locked');
  });

  it('completes a lesson, increases xp, levels up, and unlocks the next lesson', () => {
    let latestValue: LearningSnapshot | undefined;

    act(() => {
      TestRenderer.create(
        <LearningProvider>
          <LearningConsumer onRender={(value) => void (latestValue = value)} />
        </LearningProvider>,
      );
    });

    act(() => {
      latestValue?.completeLesson(firstLesson);
      latestValue?.completeLesson(secondLesson);
      latestValue?.completeLesson(firstPath.lessons[2].id);
      latestValue?.completeLesson(firstPath.lessons[3].id);
    });

    expect(latestValue?.completedLessons.has(firstLesson)).toBe(true);
    expect(latestValue?.completedLessons.has(secondLesson)).toBe(true);
    expect(latestValue?.xp).toBe(100);
    expect(latestValue?.level).toBe(2);
    expect(latestValue?.isLessonUnlocked(firstPath.lessons[4].id)).toBe(true);
    expect(latestValue?.getPathProgress(firstPath.key)).toEqual({ completed: 4, total: 8 });
    expect(latestValue?.getCurrentLesson(firstPath.key)).toBe(firstPath.lessons[4].id);
  });

  it('awards path badges and unlocks the next path after completion', () => {
    let latestValue: LearningSnapshot | undefined;

    act(() => {
      TestRenderer.create(
        <LearningProvider>
          <LearningConsumer onRender={(value) => void (latestValue = value)} />
        </LearningProvider>,
      );
    });

    act(() => {
      for (const lesson of firstPath.lessons) {
        latestValue?.completeLesson(lesson.id);
      }
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(latestValue?.isPathCompleted(firstPath.key)).toBe(true);
    expect(latestValue?.getPathStatus(firstPath.key)).toBe('mastered');
    expect(latestValue?.isPathUnlocked(secondPath.key)).toBe(true);
    expect(latestValue?.getPathStatus(secondPath.key)).toBe('active');
    expect(latestValue?.earnedBadges.has('saving_basics')).toBe(true);
  });

  it('can award a badge manually and reset progress state', () => {
    let latestValue: LearningSnapshot | undefined;

    act(() => {
      TestRenderer.create(
        <LearningProvider>
          <LearningConsumer onRender={(value) => void (latestValue = value)} />
        </LearningProvider>,
      );
    });

    act(() => {
      latestValue?.earnBadge('quiz_ace');
    });
    expect(latestValue?.earnedBadges.has('quiz_ace')).toBe(true);

    act(() => {
      latestValue?.completeLesson(firstLesson);
    });

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(latestValue?.completedLessons.has(firstLesson)).toBe(true);
    expect(latestValue?.xp).toBe(25);

    act(() => {
      latestValue?.resetProgress();
    });

    expect(latestValue?.completedLessons.size).toBe(0);
    expect(latestValue?.earnedBadges.size).toBe(0);
    expect(latestValue?.xp).toBe(0);
    expect(latestValue?.level).toBe(1);
    expect(latestValue?.getCurrentLesson(firstPath.key)).toBe(firstLesson);
    expect(latestValue?.isLessonUnlocked(firstLesson)).toBe(true);
    expect(latestValue?.isPathUnlocked(secondPath.key)).toBe(false);
  });
});
