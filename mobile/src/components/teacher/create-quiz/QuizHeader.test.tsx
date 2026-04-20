import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuizHeader } from './QuizHeader';

describe('QuizHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuizHeader);

    result.unmount();
  });
});
