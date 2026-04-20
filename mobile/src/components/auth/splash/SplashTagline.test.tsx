import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SplashTagline } from './SplashTagline';

describe('SplashTagline', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SplashTagline);

    result.unmount();
  });
});
