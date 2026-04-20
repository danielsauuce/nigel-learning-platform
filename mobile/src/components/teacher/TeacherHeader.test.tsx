import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { TeacherHeader } from './TeacherHeader';

describe('TeacherHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, TeacherHeader);

    result.unmount();
  });
});
