import { Dimensions, PixelRatio } from "react-native";
import { SizeType, WeightType } from "@/types";

const { width, height } = Dimensions.get("window");

const BASE_WIDTH = 393;
// const BASE_HEIGHT = 852;

export const fontHandler = {
  resolveFontSize: (size: number): number => {
    const baseScale = Math.min(width, height);

    const fontSize: Record<SizeType, { min: number; max: number }> = {
      small: { min: 0.85, max: 1 },
      medium: { min: 0.9, max: 1.1 },
      large: { min: 1, max: 1.2 },
    };

    const { min, max } = baseScale < 350 ? fontSize.small : baseScale > 500 ? fontSize.large : fontSize.medium;
    
    const scaleFactor = Math.min(Math.max(width / BASE_WIDTH, min), max);

    return PixelRatio.roundToNearestPixel(size * scaleFactor) / PixelRatio.getFontScale();
  },

  resolveFontFamily: (weight: WeightType): string => {
    const fontWeight: Record<WeightType, string> = {
      light: "Montserrat-Light",
      regular: "Montserrat-Regular",
      medium: "Montserrat-Medium",
      bold: "Montserrat-Bold",
    };

    return fontWeight[weight] || fontWeight.regular;
  },
};
