import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { BudgetBreakdownBar } from './BudgetBreakdownBar';

describe('BudgetBreakdownBar', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, BudgetBreakdownBar);

    result.unmount();
  });
});
