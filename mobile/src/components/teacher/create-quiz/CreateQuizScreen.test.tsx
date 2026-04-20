import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { CreateQuizScreen } from './CreateQuizScreen';

describe('CreateQuizScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, CreateQuizScreen);

    result.unmount();
  });
});
