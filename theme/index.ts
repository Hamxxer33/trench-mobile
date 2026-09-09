export { colors } from './colors';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

/** Floating frosted tab bar metrics (content padding). */
export const tabBar = {
  pillHeight: 64,
  bottomGap: 12,
  /** Extra scroll padding so lists clear the floating pill + safe area. */
  contentInset: 96,
} as const;

export const typography = {
  title: { fontSize: 28, fontWeight: '700' as const },
  heading: { fontSize: 20, fontWeight: '600' as const },
  /** Big portfolio / balance number */
  hero: { fontSize: 40, fontWeight: '700' as const, letterSpacing: -0.5 },
  body: { fontSize: 16, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  mono: { fontSize: 14, fontFamily: 'SpaceMono' },
};
