import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ResultsBreakdown } from './ResultsBreakdown';

describe('ResultsBreakdown', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ResultsBreakdown);

    result.unmount();
  });
});
