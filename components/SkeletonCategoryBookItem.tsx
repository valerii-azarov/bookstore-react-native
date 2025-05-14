import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing, 
  interpolateColor,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { ModeType } from "@/types";

const SkeletonCategoryBookItem = ({ mode }: { mode: ModeType }) => {
  const animation = useSharedValue(0);

  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [animation]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animation.value,
      [0, 1],
      [colors.grayTint6, colors.grayTint4]
    ),
  }));

  return (
    <View
      style={[
        styles.container,
        mode === "horizontal" && { flex: 1 },
        {
          width: mode === "horizontal" 
            ? 200 
            : mode === "list" 
              ? "100%" 
              : "48%",
          height: mode === "list" ? 180 : 280,
          flexDirection: mode === "list" ? "row" : "column",
        },
      ]}
    >
      <Animated.View
        style={[
          styles.imageWrapper,
          animatedStyle,
          { 
            width: mode === "list" ? "44%" : "100%",
          },
        ]}
      />

      <View
        style={[
          styles.contentWrapper,
          mode === "list" ? { paddingLeft: 15 } : { paddingTop: 10 },
        ]}
      >
        <Animated.View
          style={[
            styles.textSkeleton,
            { 
              height: 10, 
              width: "60%", 
              marginBottom: 5,
            },
            animatedStyle,
          ]}
        />

        <Animated.View
          style={[
            styles.textSkeleton,
            { 
              height: 14, 
              width: "80%", 
              marginBottom: 10,
            },
            animatedStyle,
          ]}
        />

        <Animated.View
          style={[
            styles.textSkeleton,
            { 
              height: 16, 
              width: 60,
            },
            animatedStyle,
          ]}
        />

        <View style={styles.space} />   

        <View style={styles.buttonsContainer}>
          <Animated.View
            style={[
              styles.actionButtonSkeleton, 
              animatedStyle,
            ]}
          />
          
          <Animated.View
            style={[
              styles.actionButtonSkeleton, 
              animatedStyle,
            ]}
          />

          <Animated.View
            style={[
              styles.detailButtonSkeleton,
              { 
                width: 100,
              },
              animatedStyle,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  imageWrapper: {
    height: 150,
    borderRadius: 12,
  },
  contentWrapper: {
    flex: 1,
  },
  textSkeleton: {
    borderRadius: 4,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtonSkeleton: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  detailButtonSkeleton: {
    height: 30,
    borderRadius: 20,
  },
  space: {
    flex: 1,
  }
});

export default SkeletonCategoryBookItem;
