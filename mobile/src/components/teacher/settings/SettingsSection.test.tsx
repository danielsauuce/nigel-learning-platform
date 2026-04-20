import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SettingsSection } from './SettingsSection';

describe('SettingsSection', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SettingsSection);

    result.unmount();
  });
});
