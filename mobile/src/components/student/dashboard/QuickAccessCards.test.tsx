import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuickAccessCards } from './QuickAccessCards';

describe('QuickAccessCards', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuickAccessCards);

    result.unmount();
  });
});
