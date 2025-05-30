import { ScreenConfig } from "./appScreens";

export const authScreens: ScreenConfig[] = [
  { name: "sign-in", disableGesture: true },
  { name: "sign-up", isModal: true, disableGesture: true },
];
