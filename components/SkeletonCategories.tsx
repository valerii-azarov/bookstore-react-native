import { useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing, interpolateColor } from "react-native-reanimated";
import { DEFAULT_CATEGORIES_LIMIT, DEFAULT_BOOKS_LIMIT } from "@/constants/settings";
import { colors } from "@/constants/theme";

import SkeletonCategoryBookItem from "./SkeletonCategoryBookItem";

const SkeletonCategories = () => {
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
  
  const categories = Array.from({ length: DEFAULT_CATEGORIES_LIMIT }, (_, index) => `category-${index}`);
  const books = Array.from({ length: DEFAULT_BOOKS_LIMIT }, (_, index) => `book-${index}`);

  return (
    <View style={styles.container}>
      {categories.map((category, _) => (
        <View 
          key={category} 
          style={styles.categoryContainer}
        >
          <View style={styles.categoryHeader}>
            <Animated.View 
              style={[
                styles.textSkeleton,
                {
                  width: 100,
                  height: 22,
                },
                animatedStyle,
              ]} 
            />

            <Animated.View 
              style={[
                styles.textSkeleton,
                {
                  width: 60,
                  height: 18,
                },
                animatedStyle,
              ]} 
            />
          </View>
          
          <FlatList
            data={books}
            renderItem={() => (
              <SkeletonCategoryBookItem 
                mode="horizontal" 
              />
            )}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              gap: 15,
            }}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryContainer: {
    marginTop: 15,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  textSkeleton: {
    borderRadius: 4,
  },
});

export default SkeletonCategories;
