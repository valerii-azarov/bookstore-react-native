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

const SkeletonBookItem = ({ isOwner = false }: { isOwner?: boolean }) => {
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
      <View style={styles.wrapper}>
        <Animated.View 
          style={[
            styles.imageWrapper, 
            animatedStyle
          ]} 
        />

        <View style={styles.contentWrapper}>
          <Animated.View 
            style={[
              styles.textSkeleton, 
              { 
                width: "60%",
                height: 12, 
              },
              animatedStyle
            ]} 
          />

          <Animated.View 
            style={[
              styles.textSkeleton, 
              { 
                width: "80%", 
                height: 16,
                marginTop: 5,
              }, 
              animatedStyle
            ]} 
          />

          <View style={styles.space}/>

          {isOwner && (
            <View style={styles.detailsContainer}>
              <Animated.View 
                style={[
                  styles.detailBadge,
                  animatedStyle
                ]} 
              />

              <Animated.View 
                style={[
                  styles.detailBadge,
                  animatedStyle
                ]} 
              />
            </View>
          )}

          {!isOwner && (
            <View style={styles.priceContainer}>
              <Animated.View 
                style={[
                  styles.textSkeleton, 
                  { 
                    width: 60, 
                    height: 18, 
                  }, 
                  animatedStyle
                ]} 
              />

              <Animated.View 
                style={[
                  styles.textSkeleton, 
                  { 
                    width: 40, 
                    height: 12, 
                    marginLeft: 5,
                  },
                  animatedStyle
                ]} 
              />
            </View>
          )}
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
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 15,
  },
  imageWrapper: {
    width: 95,
    height: 95,
    borderRadius: 12,
  },
  contentWrapper: {
    flex: 1,
  },
  space: {
    flex: 1,
  },
  textSkeleton: {
    borderRadius: 4,
  },
  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 5,
  },
  detailBadge: {
    width: 120,
    height: 18,
    borderRadius: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
    marginTop: 5,
  },
});

export default SkeletonBookItem;
