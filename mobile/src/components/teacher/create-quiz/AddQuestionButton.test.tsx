import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { AddQuestionButton } from './AddQuestionButton';

describe('AddQuestionButton', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, AddQuestionButton);

    result.unmount();
  });
});
