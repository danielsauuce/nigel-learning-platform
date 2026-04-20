import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { BudgetBuilderHeader } from './BudgetBuilderHeader';

describe('BudgetBuilderHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, BudgetBuilderHeader);

    result.unmount();
  });
});
