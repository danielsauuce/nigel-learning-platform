import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { LinkGeneratedScreen } from './LinkGeneratedScreen';

describe('LinkGeneratedScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, LinkGeneratedScreen);

    result.unmount();
  });
});
