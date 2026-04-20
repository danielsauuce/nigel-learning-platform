import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { EditProfileScreen } from './EditProfileScreen';

describe('EditProfileScreen', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, EditProfileScreen);

    result.unmount();
  });
});
