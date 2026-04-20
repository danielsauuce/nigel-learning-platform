import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentSetupForm } from './StudentSetupForm';

describe('StudentSetupForm', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentSetupForm);

    result.unmount();
  });
});
