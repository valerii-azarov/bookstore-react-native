import { Platform } from "react-native";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export const screenHandler = {
  buildScreenOptions: (
    isModal: boolean = false,
    isTransparent: boolean = false,
    disableGesture: boolean = false
  ): NativeStackNavigationOptions => ({
    headerShown: false,
    presentation: isTransparent ? "transparentModal" : undefined,
    gestureEnabled: !disableGesture,
    ...(Platform.OS === "ios" && isModal
      ? {
          animation: "slide_from_bottom",
          animationDuration: 250,
        }
      : {}),
  }),
};
