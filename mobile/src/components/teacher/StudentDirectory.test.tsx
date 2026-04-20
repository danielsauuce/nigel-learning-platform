import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentDirectory } from './StudentDirectory';

describe('StudentDirectory', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentDirectory);

    result.unmount();
  });
});
