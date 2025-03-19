import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface SafeAreaReturn {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export const useSafeAreaPadding = (): SafeAreaReturn => {
  const insets = useSafeAreaInsets();

  return {
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,
  };
};