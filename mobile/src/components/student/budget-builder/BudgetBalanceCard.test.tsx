import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { BudgetBalanceCard } from './BudgetBalanceCard';

describe('BudgetBalanceCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, BudgetBalanceCard);

    result.unmount();
  });
});
