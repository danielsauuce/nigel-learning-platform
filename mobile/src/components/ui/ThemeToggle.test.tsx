import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, ThemeToggle);

    result.unmount();
  });
});
