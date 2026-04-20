import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { TextButton } from './TextButton';

describe('TextButton', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, TextButton);

    result.unmount();
  });
});
