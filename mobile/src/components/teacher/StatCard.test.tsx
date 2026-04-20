import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StatCard } from './StatCard';

describe('StatCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StatCard);

    result.unmount();
  });
});
