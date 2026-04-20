import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { DailyChallenge } from './DailyChallenge';

describe('DailyChallenge', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, DailyChallenge);

    result.unmount();
  });
});
