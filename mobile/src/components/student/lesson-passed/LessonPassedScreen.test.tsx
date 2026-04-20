import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { LessonPassedScreen } from './LessonPassedScreen';

describe('LessonPassedScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, LessonPassedScreen);

    result.unmount();
  });
});
