import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuizQuestionCard } from './QuizQuestionCard';

describe('QuizQuestionCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuizQuestionCard);

    result.unmount();
  });
});
