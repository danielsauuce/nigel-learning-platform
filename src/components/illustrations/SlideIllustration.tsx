import React from 'react';

import type { SlideIcon } from '@/constants/app';

import { IslandIllustration } from './IslandIllustration';
import { PiggyIllustration } from './PiggyIllustration';
import { TrophyIllustration } from './TrophyIllustration';

const ILLUSTRATION_MAP: Record<SlideIcon, React.FC> = {
  island: IslandIllustration,
  piggy: PiggyIllustration,
  trophy: TrophyIllustration,
};

/**
 * Renders the correct illustration component based on a slide icon key.
 */
export function SlideIllustration({ icon }: { icon: SlideIcon }) {
  const Component = ILLUSTRATION_MAP[icon];
  return Component ? <Component /> : null;
}
