import { useState, useCallback, useMemo } from 'react';
import { makeQuestion, makeAnswer, makeId, type Question, type Answer } from '../types/quiz';

export function useCreateQuiz() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(15);
  const [questions, setQuestions] = useState<Question[]>([makeQuestion()]);

  const totalPoints = useMemo(() => questions.reduce((sum, q) => sum + q.points, 0), [questions]);

  const addQuestion = useCallback(() => {
    setQuestions((prev) => [...prev, makeQuestion()]);
  }, []);

  const removeQuestion = useCallback((id: string) => {
    setQuestions((prev) => (prev.length > 1 ? prev.filter((q) => q.id !== id) : prev));
  }, []);

  const updateQuestion = useCallback((id: string, updated: Question) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? updated : q)));
  }, []);

  const changeQuestionType = useCallback(
    (id: string, question: Question, type: Question['type']) => {
      let answers: Answer[];
      if (type === 'true_false') {
        answers = [
          { id: makeId(), text: 'True', correct: true },
          { id: makeId(), text: 'False', correct: false },
        ];
      } else if (type === 'short_answer') {
        answers = [];
      } else {
        answers = [makeAnswer(), makeAnswer(), makeAnswer(), makeAnswer()];
      }
      updateQuestion(id, { ...question, type, answers });
    },
    [updateQuestion],
  );

  const toggleCorrectAnswer = useCallback(
    (questionId: string, question: Question, answerId: string) => {
      updateQuestion(questionId, {
        ...question,
        answers: question.answers.map((a) => ({
          ...a,
          correct: a.id === answerId ? !a.correct : false,
        })),
      });
    },
    [updateQuestion],
  );

  const updateAnswerText = useCallback(
    (questionId: string, question: Question, answerId: string, text: string) => {
      updateQuestion(questionId, {
        ...question,
        answers: question.answers.map((a) => (a.id === answerId ? { ...a, text } : a)),
      });
    },
    [updateQuestion],
  );

  return {
    title,
    setTitle,
    description,
    setDescription,
    timeLimit,
    setTimeLimit,
    questions,
    totalPoints,
    addQuestion,
    removeQuestion,
    updateQuestion,
    changeQuestionType,
    toggleCorrectAnswer,
    updateAnswerText,
  };
}
