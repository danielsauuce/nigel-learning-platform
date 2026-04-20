import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { WelcomeSlide } from './WelcomeSlide';

describe('WelcomeSlide', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, WelcomeSlide);

    result.unmount();
  });
});
