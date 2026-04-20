import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ProTipBanner } from './ProTipBanner';

describe('ProTipBanner', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ProTipBanner);

    result.unmount();
  });
});
