import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PayslipSummaryCard } from './PayslipSummaryCard';

describe('PayslipSummaryCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PayslipSummaryCard);

    result.unmount();
  });
});
