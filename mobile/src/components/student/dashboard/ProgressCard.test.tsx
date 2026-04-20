import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ProgressCard } from './ProgressCard';

describe('ProgressCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ProgressCard);

    result.unmount();
  });
});
