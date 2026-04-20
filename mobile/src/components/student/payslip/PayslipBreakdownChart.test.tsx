import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PayslipBreakdownChart } from './PayslipBreakdownChart';

describe('PayslipBreakdownChart', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PayslipBreakdownChart);

    result.unmount();
  });
});
