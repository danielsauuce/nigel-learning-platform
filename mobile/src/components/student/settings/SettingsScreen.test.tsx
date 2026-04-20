import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SettingsScreen } from './SettingsScreen';

describe('SettingsScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SettingsScreen);

    result.unmount();
  });
});
