import { BlurView } from 'expo-blur';
import {
  Platform,
  StyleSheet,
  View,
  type StyleProp,
  type ViewProps,
  type ViewStyle,
} from 'react-native';

import { colors, radius } from '@/theme';

type Props = ViewProps & {
  intensity?: number;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  /** Override corner radius (default lg). Use full for pills/circles. */
  borderRadius?: number;
};

/**
 * Liquid-glass material: Expo BlurView + thin white@~10% border.
 * Android: best-effort blur + solid `#32353D` fallback for readability.
 */
export function GlassSurface({
  children,
  intensity = 48,
  style,
  contentStyle,
  borderRadius = radius.lg,
  ...rest
}: Props) {
  const shellStyle: ViewStyle = {
    borderRadius,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  };

  return (
    <View style={[shellStyle, style]} {...rest}>
      <BlurView
        intensity={Platform.OS === 'ios' ? intensity : Math.min(intensity, 28)}
        tint="dark"
        style={StyleSheet.absoluteFill}
        {...(Platform.OS === 'android'
          ? { experimentalBlurMethod: 'dimezisBlurView' as const }
          : {})}
      />
      <View
        pointerEvents="none"
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor:
              Platform.OS === 'android' ? colors.glassFallback : colors.glassFill,
            opacity: Platform.OS === 'android' ? 0.92 : 1,
          },
        ]}
      />
      <View style={contentStyle}>{children}</View>
    </View>
  );
}
