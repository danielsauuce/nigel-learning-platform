import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentCard } from './StudentCard';

describe('StudentCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentCard);

    result.unmount();
  });
});
