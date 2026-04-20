import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { DailyChallengeScreen } from './DailyChallengeScreen';

describe('DailyChallengeScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, DailyChallengeScreen);

    result.unmount();
  });
});
