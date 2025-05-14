import React, { forwardRef } from "react";
import { 
  Text, 
  TextProps, 
  TextStyle, 
  StyleProp, 
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { fontHandler } from "@/helpers/fontHandler";
import { WeightType } from "@/types";

const AnimatedText = Animated.createAnimatedComponent(Text);

type TypographyProps = TextProps & {
  fontSize?: number;
  fontWeight?: WeightType;
  color?: string;
  style?: StyleProp<TextStyle>;
};

const Typography = forwardRef<Text, TypographyProps>(
  (
    {
      children,
      fontSize = 16,
      fontWeight = "regular",
      color = colors.black,
      style,
      ...props
    },
    ref
  ) => {
    const adjustedFontSize = fontHandler.resolveFontSize(fontSize);
    const adjustedFontWeight = fontHandler.resolveFontFamily(fontWeight);

    return (
      <AnimatedText
        ref={ref}
        style={[
          styles.text,
          {
            fontSize: adjustedFontSize,
            fontFamily: adjustedFontWeight,
            color,
          },
          style,
        ]}
        {...props}
      >
        {children}
      </AnimatedText>
    );
  }
);

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});

export default Typography;
