import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { LifeEventReveal } from './LifeEventReveal';

describe('LifeEventReveal', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, LifeEventReveal);

    result.unmount();
  });
});
