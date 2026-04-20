import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { IslandCard } from './IslandCard';

describe('IslandCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, IslandCard);

    result.unmount();
  });
});
