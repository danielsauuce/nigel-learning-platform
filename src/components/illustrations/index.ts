/**
 * Illustration components barrel export.
 *
 * Individual SVG illustrations are in their own files for readability.
 * Primitive building blocks (BaseSvg, Coin, Sparkle) are also exported
 * so new illustrations can compose from them.
 */

// ─── Primitives ─────────────────────────────────────────────────────
export { BaseSvg } from './BaseSvg';
export { Coin } from './Coin';
export { Sparkle } from './Sparkle';

// ─── Character illustrations ────────────────────────────────────────
export { StudentIllustration } from './StudentIllustration';
export { TeacherIllustration } from './TeacherIllustration';

// ─── Onboarding slide illustrations ─────────────────────────────────
export { IslandIllustration } from './IslandIllustration';
export { PiggyIllustration } from './PiggyIllustration';
export { TrophyIllustration } from './TrophyIllustration';

// ─── Splash screen ──────────────────────────────────────────────────
export { IslandIcon } from './IslandIcon';
export { FloatingCoin } from './FloatingCoin';

// ─── Slide illustration lookup ──────────────────────────────────────
export { SlideIllustration } from './SlideIllustration';
