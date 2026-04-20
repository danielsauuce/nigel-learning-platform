import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { GradientButton } from './GradientButton';

describe('GradientButton', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, GradientButton);

    result.unmount();
  });
});
