import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SimulatorHeader } from './SimulatorHeader';

describe('SimulatorHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SimulatorHeader);

    result.unmount();
  });
});
