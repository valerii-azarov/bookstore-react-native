import { adminScreens } from "./adminScreens";
import { userScreens } from "./userScreens";
import { authScreens } from "./authScreens";
import { sharedScreens } from "./sharedScreens";

export type ScreenConfig = {
  name: string;
  isModal?: boolean;
  isTransparent?: boolean;
  disableGesture?: boolean;
};

export const appScreens: ScreenConfig[] = [
  ...sharedScreens,
  ...adminScreens,
  ...userScreens,
  ...authScreens,
];
