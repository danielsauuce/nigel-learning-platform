import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PayslipScreen } from './PayslipScreen';

describe('PayslipScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PayslipScreen);

    result.unmount();
  });
});
