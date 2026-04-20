import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SplashLogo } from './SplashLogo';

describe('SplashLogo', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SplashLogo);

    result.unmount();
  });
});
