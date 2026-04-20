import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { IslandMapScreen } from './IslandMapScreen';

describe('IslandMapScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, IslandMapScreen);

    result.unmount();
  });
});
