import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SettingsHeader } from './SettingsHeader';

describe('SettingsHeader', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SettingsHeader);

    result.unmount();
  });
});
