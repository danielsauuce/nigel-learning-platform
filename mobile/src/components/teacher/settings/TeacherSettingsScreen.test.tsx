import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { TeacherSettingsScreen } from './TeacherSettingsScreen';

describe('TeacherSettingsScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, TeacherSettingsScreen);

    result.unmount();
  });
});
