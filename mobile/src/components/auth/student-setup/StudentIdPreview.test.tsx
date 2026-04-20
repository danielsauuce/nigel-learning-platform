import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentIdPreview } from './StudentIdPreview';

describe('StudentIdPreview', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentIdPreview);

    result.unmount();
  });
});
