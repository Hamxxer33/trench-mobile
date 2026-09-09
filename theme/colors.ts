/** Base-inspired palette for Trench (mock UI only). */
export const colors = {
  baseBlue: '#0052FF',
  baseBlueLight: '#3B7AFF',
  baseBlueDark: '#003CC7',
  background: '#0A0B0D',
  surface: '#12141A',
  surfaceElevated: '#1A1D26',
  border: '#2A2F3A',
  text: '#F5F7FA',
  textSecondary: '#9AA3B2',
  textMuted: '#6B7280',
  success: '#22C55E',
  danger: '#EF4444',
  warning: '#F59E0B',
  chartFill: 'rgba(0, 82, 255, 0.25)',
  chartLine: '#0052FF',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorName = keyof typeof colors;
