import { View, StyleProp, ViewStyle, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";

import Typography from "./Typography";

interface DottedLineProps {
  style?: StyleProp<ViewStyle>;
  color?: string;
  size?: number;
  dashCount?: number;
  dashSymbol?: string;
}

const DottedLine = ({ style, color = colors.black, size = 14, dashCount = 50, dashSymbol = "- " }: DottedLineProps) => {
  return (
    <View 
      style={[
        styles.line, 
        style
      ]}
    >
      <Typography fontSize={size} fontWeight="medium" style={{ color }}>
        {dashSymbol.repeat(dashCount)}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 10,
    alignItems: "center",
  },
});

export default DottedLine;