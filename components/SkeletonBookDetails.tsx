import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, interpolateColor } from "react-native-reanimated";
import { colors } from "@/constants/theme";

const SkeletonBookDetails = () => {
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
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.View style={[styles.coverImage, animatedStyle]} />
      </View>

      <View style={styles.contentWrapper}>
        <View style={styles.titleContainer}>
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "60%",
                height: 14,
                marginBottom: 5,
              },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "80%",
                height: 24,
              },
              animatedStyle,
            ]}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.priceContainer}>
            <Animated.View
              style={[
                styles.textSkeleton,
                {
                  width: 80,
                  height: 28,
                },
                animatedStyle,
              ]}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "40%",
                height: 20,
                marginBottom: 15,
              },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "80%",
                height: 16,
              },
              animatedStyle,
            ]}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "50%",
                height: 20,
                marginBottom: 15,
              },
              animatedStyle,
            ]}
          />
          {Array(5).fill(0).map((_, index) => (
            <View key={index} style={styles.detailContainer}>
              <Animated.View
                style={[
                  styles.textSkeleton,
                  {
                    width: "35%",
                    height: 16,
                    marginRight: "5%",
                  },
                  animatedStyle,
                ]}
              />
              <Animated.View
                style={[
                  styles.textSkeleton,
                  {
                    width: "60%",
                    height: 16,
                  },
                  animatedStyle,
                ]}
              />
            </View>
          ))}
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "30%",
                height: 16,
                marginTop: 15,
              },
              animatedStyle,
            ]}
          />
        </View>

        <View style={styles.sectionContainer}>
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "40%",
                height: 20,
                marginBottom: 15,
              },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "100%",
                height: 16,
                marginBottom: 5,
              },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "100%",
                height: 16,
                marginBottom: 5,
              },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "80%",
                height: 16,
                marginBottom: 15,
              },
              animatedStyle,
            ]}
          />
          <Animated.View
            style={[
              styles.textSkeleton,
              {
                width: "30%",
                height: 16,
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
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 15,
  },
  imageContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  coverImage: {
    width: 300,
    height: 441,
    borderRadius: 12,
  },
  contentWrapper: {
    flex: 1,
    gap: 15,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: colors.grayTint6,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  textSkeleton: {
    borderRadius: 4,
  },
});

export default SkeletonBookDetails;
