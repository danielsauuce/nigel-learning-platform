import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { AgePicker } from './AgePicker';

describe('AgePicker', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, AgePicker);

    result.unmount();
  });
});
