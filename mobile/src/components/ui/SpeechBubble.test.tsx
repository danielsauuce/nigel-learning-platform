import React from 'react';
import { renderComponent } from '@/components/__tests__/componentTestUtils';
import { SpeechBubble } from './SpeechBubble';

describe('SpeechBubble', () => {
  it('renders successfully', () => {
    const result = renderComponent(__filename, SpeechBubble);

    result.unmount();
  });
});
