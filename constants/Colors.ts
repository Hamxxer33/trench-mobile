/**
 * Legacy Colors helper — dark-only (Figma lock).
 * Prefer `@/theme` colors in new code. No light theme.
 */
const tintColorDark = '#0000FF';

export default {
  dark: {
    text: '#F5F7FA',
    background: '#0A0B0D',
    tint: tintColorDark,
    tabIconDefault: '#6B7280',
    tabIconSelected: tintColorDark,
  },
};
