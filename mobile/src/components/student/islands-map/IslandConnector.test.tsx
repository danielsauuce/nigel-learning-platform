import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { IslandConnector } from './IslandConnector';

describe('IslandConnector', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, IslandConnector);

    result.unmount();
  });
});
