import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentFAB } from './StudentFAB';

describe('StudentFAB', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentFAB);

    result.unmount();
  });
});
