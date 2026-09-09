/** Base-inspired palette for Trench (mock UI only). */
export const colors = {
  /** Official Base Blue — not Coinbase #0052FF */
  baseBlue: '#0000FF',
  baseBlueLight: '#4D4DFF',
  baseBlueDark: '#0000CC',
  /** Base Gray — surfaces / elevated chrome */
  baseGray: '#32353D',
  background: '#0A0B0D',
  surface: '#32353D',
  surfaceElevated: '#32353D',
  border: '#32353D',
  text: '#F5F7FA',
  textSecondary: '#9AA3B2',
  textMuted: '#6B7280',
  /** PnL green */
  success: '#66C800',
  /** PnL red */
  danger: '#FC401F',
  warning: '#F59E0B',
  chartFill: 'rgba(0, 0, 255, 0.25)',
  chartLine: '#0000FF',
  white: '#FFFFFF',
  black: '#000000',
  /** V1.1 liquid-glass — thin white@~10% edge */
  glassBorder: 'rgba(255, 255, 255, 0.1)',
  /** Translucent fill over BlurView */
  glassFill: 'rgba(50, 53, 61, 0.45)',
  /** Android solid fallback when blur is weak */
  glassFallback: '#32353D',
  /** Active tab icon square */
  glassActiveIcon: '#FFFFFF',
  glassActiveIconTint: '#0A0B0D',
} as const;

export type ColorName = keyof typeof colors;
