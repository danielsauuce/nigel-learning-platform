import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { PrivacyCheckbox } from './PrivacyCheckbox';

describe('PrivacyCheckbox', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, PrivacyCheckbox);

    result.unmount();
  });
});
