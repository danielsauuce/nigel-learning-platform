import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { TeacherLoginScreen } from './TeacherLoginScreen';

describe('TeacherLoginScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, TeacherLoginScreen);

    result.unmount();
  });
});
