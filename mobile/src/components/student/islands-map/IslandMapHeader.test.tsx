import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { IslandMapHeader } from './IslandMapHeader';

describe('IslandMapHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, IslandMapHeader);

    result.unmount();
  });
});
