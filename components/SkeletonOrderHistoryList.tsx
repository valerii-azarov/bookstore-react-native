import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, interpolateColor } from "react-native-reanimated";
import { colors } from "@/constants/theme";

const SkeletonOrderHistoryList = ({ count = 5 }: { count?: number }) => {
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
      <Animated.View
        style={[
          styles.textSkeleton, 
          { 
            width: "50%", 
            height: 16, 
            marginBottom: 8,
          }, 
          animatedStyle,
        ]}
      />

      <View style={styles.listContainer}>
        {Array.from({ length: count }).map((_, index) => (
          <View 
            key={index} 
            style={styles.orderItem}
          >
            <View style={styles.contentWrapper}>
              <Animated.View 
                style={[
                  styles.imageWrapper, 
                  animatedStyle,
                ]} 
              />

              <View style={styles.contentContainer}>
                <View style={styles.header}>
                  <Animated.View
                    style={[
                      styles.textSkeleton, 
                      { 
                        width: "40%", 
                        height: 16,
                      }, 
                      animatedStyle,
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.textSkeleton, 
                      { 
                        width: "30%", 
                        height: 18,
                      }, 
                      animatedStyle,
                    ]}
                  />
                </View>

                <Animated.View
                  style={[
                    styles.textSkeleton, 
                    { 
                      width: "50%", 
                      height: 12, 
                      marginTop: 2.5,
                    }, 
                    animatedStyle,
                  ]}
                />
                
                <View style={styles.space}/>

                <View style={styles.footer}>
                  <Animated.View 
                    style={[
                      styles.statusBadge, 
                      animatedStyle,
                    ]} 
                  />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginBottom: 0,
  },
  listContainer: {
    gap: 10,
  },
  orderItem: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    overflow: "hidden",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageWrapper: {
    position: "relative",
    width: 73,
    height: 83,
    marginRight: 15,
    borderRadius: 4,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  textSkeleton: {
    borderRadius: 4,
  },
  space: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  statusBadge: {
    minWidth: 100,
    height: 24,
    borderRadius: 4,
  },
});

export default SkeletonOrderHistoryList;
