import { Platform, StatusBar } from 'react-native';

/**
 * Consistent safe-area insets for screens that use translucent status bars.
 * Avoids the repeated Platform.OS === 'android' ? StatusBar.currentHeight... pattern.
 */
export const SAFE_TOP = Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 12 : 56;
export const SAFE_BOTTOM = Platform.OS === 'android' ? 24 : 40;
