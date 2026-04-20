import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PersonalizationMascot } from './PersonalizationMascot';

describe('PersonalizationMascot', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PersonalizationMascot);

    result.unmount();
  });
});
