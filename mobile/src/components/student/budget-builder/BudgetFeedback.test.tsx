import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { BudgetFeedback } from './BudgetFeedback';

describe('BudgetFeedback', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, BudgetFeedback);

    result.unmount();
  });
});
