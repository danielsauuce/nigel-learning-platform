import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SimBadge } from './SimBadge';

describe('SimBadge', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SimBadge);

    result.unmount();
  });
});
