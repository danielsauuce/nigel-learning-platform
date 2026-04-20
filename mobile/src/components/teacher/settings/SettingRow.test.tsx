import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SettingRow } from './SettingRow';

describe('SettingRow', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SettingRow);

    result.unmount();
  });
});
