import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ScreenWrapper } from './ScreenWrapper';

describe('ScreenWrapper', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ScreenWrapper);

    result.unmount();
  });
});
