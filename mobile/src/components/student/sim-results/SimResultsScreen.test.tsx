import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SimResultsScreen } from './SimResultsScreen';

describe('SimResultsScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SimResultsScreen);

    result.unmount();
  });
});
