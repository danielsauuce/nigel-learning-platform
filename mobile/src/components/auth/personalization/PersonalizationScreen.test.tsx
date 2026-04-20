import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PersonalizationScreen } from './PersonalizationScreen';

describe('PersonalizationScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PersonalizationScreen);

    result.unmount();
  });
});
