import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { TeacherRegisterScreen } from './TeacherRegisterScreen';

describe('TeacherRegisterScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, TeacherRegisterScreen);

    result.unmount();
  });
});
