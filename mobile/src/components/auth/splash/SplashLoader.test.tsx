import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SplashLoader } from './SplashLoader';

describe('SplashLoader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SplashLoader);

    result.unmount();
  });
});
