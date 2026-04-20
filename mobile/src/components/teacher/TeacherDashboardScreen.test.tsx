import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { TeacherDashboardScreen } from './TeacherDashboardScreen';

describe('TeacherDashboardScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, TeacherDashboardScreen);

    result.unmount();
  });
});
