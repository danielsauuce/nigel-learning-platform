import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ResultsScoreCard } from './ResultsScoreCard';

describe('ResultsScoreCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ResultsScoreCard);

    result.unmount();
  });
});
