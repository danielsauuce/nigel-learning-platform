import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SplashScreen } from './SplashScreen';

describe('SplashScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SplashScreen);

    result.unmount();
  });
});
