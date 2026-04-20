import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ParentSummaryScreen } from './ParentSummaryScreen';

describe('ParentSummaryScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ParentSummaryScreen);

    result.unmount();
  });
});
