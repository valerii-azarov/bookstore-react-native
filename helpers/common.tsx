import { Dimensions, PixelRatio } from "react-native";
import { FontWeight } from "@/types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BASE_SCALE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT);
const BASE_WIDTH = 393;
const BASE_HEIGHT = 852;

type ScreenCategory = "small" | "medium" | "large";

interface FontScaleRange {
  min: number;
  max: number;
}

const fontConfig: Record<ScreenCategory, FontScaleRange> = {
  small: { min: 0.85, max: 1 },
  medium: { min: 0.9, max: 1.1 },
  large: { min: 1, max: 1.2 },
};

const scale = (size: number, base: number, current: number): number => {
  return (current / base) * size;
};

const fontScale = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size) / PixelRatio.getFontScale();
};

const getScreenCategory = (): ScreenCategory => {
  return BASE_SCALE < 350 ? "small" : BASE_SCALE > 500 ? "large" : "medium";
};

export const getFontSize = (baseSize: number): number => {
  const screenCategory = getScreenCategory();

  const { min, max } = fontConfig[screenCategory];
  const scaleFactor = Math.min(Math.max(BASE_SCALE / BASE_WIDTH, min), max);

  return fontScale(baseSize * scaleFactor);
};

export const getFontFamily = (fontWeight: FontWeight): string => {
  return `Montserrat-${fontWeight[0].toUpperCase()}${fontWeight.slice(1)}`;
}

export const horizontalScale = (size: number): number => scale(size, BASE_WIDTH, SCREEN_WIDTH);
export const verticalScale = (size: number): number => scale(size, BASE_HEIGHT, SCREEN_HEIGHT);

export const widthPercentage = (percentage: number): number => Math.round((SCREEN_WIDTH * percentage) / 100);
export const heightPercentage = (percentage: number): number => Math.round((SCREEN_HEIGHT * percentage) / 100);

//
export const wp = (percentage: number) => {
  return Math.round((SCREEN_WIDTH * percentage) / 100);
};

//
export const hp = (percentage: number) => {
  return Math.round((SCREEN_HEIGHT * percentage) / 100);
};
