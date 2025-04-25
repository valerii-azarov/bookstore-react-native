import React, { forwardRef } from "react";
import { Text, TextProps, TextStyle, StyleProp, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { getFontSize, getFontFamily } from "@/helpers/common";
import { FontWeight } from "@/types";

const AnimatedText = Animated.createAnimatedComponent(Text);

type TypographyProps = TextProps & {
  fontSize?: number;
  fontWeight?: FontWeight;
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
    return (
      <AnimatedText
        ref={ref}
        style={[
          styles.text,
          {
            fontSize: getFontSize(fontSize),
            fontFamily: getFontFamily(fontWeight),
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
