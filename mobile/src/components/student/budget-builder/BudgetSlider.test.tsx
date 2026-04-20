import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { BudgetSlider } from './BudgetSlider';

describe('BudgetSlider', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, BudgetSlider);

    result.unmount();
  });
});
