import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ResultsFeedbackList } from './ResultsFeedbackList';

describe('ResultsFeedbackList', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ResultsFeedbackList);

    result.unmount();
  });
});
