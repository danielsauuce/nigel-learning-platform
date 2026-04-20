import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { RecentActivity } from './RecentActivity';

describe('RecentActivity', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, RecentActivity);

    result.unmount();
  });
});
