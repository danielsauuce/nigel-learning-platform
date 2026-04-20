import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StepIndicator } from './StepIndicator';

describe('StepIndicator', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StepIndicator);

    result.unmount();
  });
});
