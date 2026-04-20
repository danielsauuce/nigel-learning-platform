import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PersonalizationQuestion } from './PersonalizationQuestion';

describe('PersonalizationQuestion', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PersonalizationQuestion);

    result.unmount();
  });
});
