import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { LessonScreen } from './LessonScreen';

describe('LessonScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, LessonScreen);

    result.unmount();
  });
});
