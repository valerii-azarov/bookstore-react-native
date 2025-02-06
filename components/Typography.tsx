import { Text, TextProps, TextStyle, StyleProp, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { getFontSize, getFontFamily } from "@/helpers/common";
import { FontWeight } from "@/types";

type TypographyProps = TextProps & {
  fontSize?: number;
  fontWeight?: FontWeight;
  color?: string;
  style?: StyleProp<TextStyle>;
};

const Typography = ({ children, fontSize = 16, fontWeight = "regular", color = colors.black, style, ...props }: TypographyProps) => {
  return (
    <Text
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
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    includeFontPadding: false,
  },
});

export default Typography;
