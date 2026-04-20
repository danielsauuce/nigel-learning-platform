import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PayslipHeader } from './PayslipHeader';

describe('PayslipHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PayslipHeader);

    result.unmount();
  });
});
