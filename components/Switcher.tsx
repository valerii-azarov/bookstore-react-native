import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { Option } from "@/types";

import Typography from "./Typography";

type SwitcherProps<T extends string> = {
  options: Option<T>[];
  selectedValue: T;
  onChange: (val: T) => void;
  width?: number;
  height?: number;
  borderRadius?: number;
  padding?: number;
  textSize?: number;
};

const Switcher = <T extends string>({
  options,
  selectedValue,
  onChange,
  width = 120,
  height = 30,
  borderRadius = 8,
  padding = 2,
  textSize = 12,
}: SwitcherProps<T>) => {
  const adjustedWidth = width - 2 * padding;
  const adjustedHeight = height - 2 * padding;

  const itemWidth = adjustedWidth / options.length;
  const selectedIndex = options.findIndex((option) => option.value === selectedValue);

  const translateX = useSharedValue(itemWidth * selectedIndex);

  useEffect(() => {
    translateX.value = withTiming(itemWidth * selectedIndex);
  }, [selectedIndex]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + padding }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          padding,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.indicator,
          {
            width: itemWidth,
            height: adjustedHeight,
            borderRadius,
            top: padding,
          },
          indicatorStyle,
        ]}
      />

      {options.map(({ label, value }) => (
        <TouchableOpacity
          key={value}
          style={styles.option}
          onPress={() => onChange(value)}
          activeOpacity={0.7}
        >
          <Typography
            fontSize={textSize}
            fontWeight={selectedValue === value ? "bold" : "medium"}
            color={colors.black}
            style={styles.optionText}
          >
            {label}
          </Typography>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grayTint8,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  indicator: {
    position: "absolute",
    backgroundColor: colors.white,
    zIndex: 0,
  },
  option: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  optionText: { 
    textAlign: "center",
  },
});

export default Switcher;
