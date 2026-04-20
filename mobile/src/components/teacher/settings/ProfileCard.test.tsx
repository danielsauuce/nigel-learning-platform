import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ProfileCard } from './ProfileCard';

describe('ProfileCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ProfileCard);

    result.unmount();
  });
});
