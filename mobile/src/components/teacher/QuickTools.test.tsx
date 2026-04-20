import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { QuickTools } from './QuickTools';

describe('QuickTools', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, QuickTools);

    result.unmount();
  });
});
