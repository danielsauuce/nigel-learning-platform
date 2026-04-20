import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SettingSection } from './SettingSection';

describe('SettingSection', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SettingSection);

    result.unmount();
  });
});
