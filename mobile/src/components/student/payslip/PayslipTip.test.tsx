import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PayslipTip } from './PayslipTip';

describe('PayslipTip', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PayslipTip);

    result.unmount();
  });
});
