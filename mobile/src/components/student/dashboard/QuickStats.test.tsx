import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuickStats } from './QuickStats';

describe('QuickStats', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuickStats);

    result.unmount();
  });
});
