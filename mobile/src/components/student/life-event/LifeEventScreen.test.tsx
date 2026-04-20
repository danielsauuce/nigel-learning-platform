import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { LifeEventScreen } from './LifeEventScreen';

describe('LifeEventScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, LifeEventScreen);

    result.unmount();
  });
});
