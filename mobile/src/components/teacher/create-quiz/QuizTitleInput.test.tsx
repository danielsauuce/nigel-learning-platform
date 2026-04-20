import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuizTitleInput } from './QuizTitleInput';

describe('QuizTitleInput', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuizTitleInput);

    result.unmount();
  });
});
