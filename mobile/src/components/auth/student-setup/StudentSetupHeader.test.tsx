import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentSetupHeader } from './StudentSetupHeader';

describe('StudentSetupHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentSetupHeader);

    result.unmount();
  });
});
