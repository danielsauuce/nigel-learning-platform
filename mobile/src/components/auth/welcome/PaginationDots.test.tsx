import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PaginationDots } from './PaginationDots';

describe('PaginationDots', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PaginationDots);

    result.unmount();
  });
});
