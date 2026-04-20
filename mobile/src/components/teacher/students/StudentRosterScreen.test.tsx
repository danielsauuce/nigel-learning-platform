import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { StudentRosterScreen } from './StudentRosterScreen';

describe('StudentRosterScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, StudentRosterScreen);

    result.unmount();
  });
});
