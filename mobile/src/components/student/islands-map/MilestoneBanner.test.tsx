import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { MilestoneBanner } from './MilestoneBanner';

describe('MilestoneBanner', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, MilestoneBanner);

    result.unmount();
  });
});
