import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PersonalizationFooter } from './PersonalizationFooter';

describe('PersonalizationFooter', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PersonalizationFooter);

    result.unmount();
  });
});
