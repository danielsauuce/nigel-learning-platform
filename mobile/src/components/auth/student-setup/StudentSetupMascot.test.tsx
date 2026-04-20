import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentSetupMascot } from './StudentSetupMascot';

describe('StudentSetupMascot', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentSetupMascot);

    result.unmount();
  });
});
