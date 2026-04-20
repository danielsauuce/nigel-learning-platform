import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuizScreen } from './QuizScreen';

describe('QuizScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuizScreen);

    result.unmount();
  });
});
