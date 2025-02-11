import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { TabType } from "@/types";

import Typography from "@/components/Typography";

type TabBarProps = {
  tabs: TabType[];
  activeIndex: number;
  onTabPress: (tabName: string) => void;
};

const TabBar = ({ tabs, activeIndex, onTabPress }: TabBarProps) => {
  const createAnimatedStyles = (isActive: boolean) => {
    const textOpacity = useSharedValue(isActive ? 1 : 0);
    const textTranslateY = useSharedValue(isActive ? 0 : 10);
    const iconTranslateY = useSharedValue(isActive ? -5 : 0);

    useEffect(() => {
      textOpacity.value = withTiming(isActive ? 1 : 0, { duration: 200 });
      textTranslateY.value = withTiming(isActive ? 0 : 10, { duration: 200 });
      iconTranslateY.value = withTiming(isActive ? -5 : 0, { duration: 200 });
    }, [isActive]);

    const animatedTextStyle = useAnimatedStyle(() => ({
      opacity: textOpacity.value,
      transform: [{ translateY: textTranslateY.value }],
    }));

    const animatedIconStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: iconTranslateY.value }],
    }));

    return {
      animatedTextStyle,
      animatedIconStyle,
    };
  };

  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;
        const { animatedTextStyle, animatedIconStyle } = createAnimatedStyles(isActive);

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => onTabPress(tab.name)}
          >
            <View style={styles.iconContainer}>
              <Animated.View style={animatedIconStyle}>
                {React.cloneElement(tab.icon, {
                  size: isActive ? 24 : 28,
                  color: isActive ? colors.orange : colors.gray,
                })}
              </Animated.View>
              <Animated.View style={[animatedTextStyle, styles.labelContainer]}>
                <Typography
                  fontSize={12}
                  fontWeight="medium"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  color={isActive ? colors.orange : colors.gray}
                >
                  {tab.label}
                </Typography>
              </Animated.View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    height: Platform.OS === "ios" ? verticalScale(75) : verticalScale(65),
    backgroundColor: colors.white,
    borderTopColor: colors.grayTint7,
    borderTopWidth: 1,
    paddingBottom: Platform.OS === "ios" ? 10 : 0,
  },
  tabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  labelContainer: {
    position: "absolute",
    top: 20,
  },
});

export default TabBar;
