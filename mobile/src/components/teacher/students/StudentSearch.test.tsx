import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentSearch } from './StudentSearch';

describe('StudentSearch', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentSearch);

    result.unmount();
  });
});
