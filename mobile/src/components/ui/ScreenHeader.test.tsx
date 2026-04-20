import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ScreenHeader } from './ScreenHeader';

describe('ScreenHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ScreenHeader);

    result.unmount();
  });
});
