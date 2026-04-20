import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { WelcomeHeader } from './WelcomeHeader';

describe('WelcomeHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, WelcomeHeader);

    result.unmount();
  });
});
