import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { FamilySharingCard } from './FamilySharingCard';

describe('FamilySharingCard', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, FamilySharingCard);

    result.unmount();
  });
});
