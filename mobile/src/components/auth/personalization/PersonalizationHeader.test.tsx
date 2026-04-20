import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PersonalizationHeader } from './PersonalizationHeader';

describe('PersonalizationHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PersonalizationHeader);

    result.unmount();
  });
});
