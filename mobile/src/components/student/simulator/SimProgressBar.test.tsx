import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SimProgressBar } from './SimProgressBar';

describe('SimProgressBar', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SimProgressBar);

    result.unmount();
  });
});
