import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ConsentScreen } from './ConsentScreen';

describe('ConsentScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ConsentScreen);

    result.unmount();
  });
});
