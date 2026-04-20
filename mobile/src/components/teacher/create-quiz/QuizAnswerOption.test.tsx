import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuizAnswerOption } from './QuizAnswerOption';

describe('QuizAnswerOption', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuizAnswerOption);

    result.unmount();
  });
});
