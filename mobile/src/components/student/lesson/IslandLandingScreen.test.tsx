import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { IslandLandingScreen } from './IslandLandingScreen';

describe('IslandLandingScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, IslandLandingScreen);

    result.unmount();
  });
});
