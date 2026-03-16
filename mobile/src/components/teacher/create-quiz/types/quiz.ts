export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export interface Answer {
  id: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  answers: Answer[];
  points: number;
}

export interface QuestionTypeConfig {
  label: string;
  icon: any;
  activeColor: string;
}

export const TIME_OPTIONS = [5, 10, 15, 20, 30, 45, 60] as const;

export function makeId(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function makeAnswer(text = ''): Answer {
  return { id: makeId(), text, correct: false };
}

export function makeQuestion(): Question {
  return {
    id: makeId(),
    text: '',
    type: 'multiple_choice',
    answers: [makeAnswer(), makeAnswer(), makeAnswer(), makeAnswer()],
    points: 10,
  };
}
