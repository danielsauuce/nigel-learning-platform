import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SplashMascot } from './SplashMascot';

describe('SplashMascot', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SplashMascot);

    result.unmount();
  });
});
