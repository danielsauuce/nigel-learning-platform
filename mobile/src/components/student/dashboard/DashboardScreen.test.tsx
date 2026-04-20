import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { DashboardScreen } from './DashboardScreen';

describe('DashboardScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, DashboardScreen);

    result.unmount();
  });
});
