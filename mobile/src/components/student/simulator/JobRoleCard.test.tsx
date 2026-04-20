import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { JobRoleCard } from './JobRoleCard';

describe('JobRoleCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, JobRoleCard);

    result.unmount();
  });
});
