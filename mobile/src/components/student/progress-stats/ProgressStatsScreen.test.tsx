import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ProgressStatsScreen } from './ProgressStatsScreen';

describe('ProgressStatsScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ProgressStatsScreen);

    result.unmount();
  });
});
