import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StatPill } from './StatPill';

describe('StatPill', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StatPill);

    result.unmount();
  });
});
