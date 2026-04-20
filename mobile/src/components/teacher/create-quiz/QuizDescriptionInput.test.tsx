import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuizDescriptionInput } from './QuizDescriptionInput';

describe('QuizDescriptionInput', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuizDescriptionInput);

    result.unmount();
  });
});
