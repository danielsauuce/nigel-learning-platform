import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { DashboardGreeting } from './DashboardGreeting';

describe('DashboardGreeting', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, DashboardGreeting);

    result.unmount();
  });
});
