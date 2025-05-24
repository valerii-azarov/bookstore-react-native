import React, { useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";
import { TabType } from "@/types";

import Icon from "./Icon";
import Typography from "./Typography";

type TabItemProps = {
  tab: TabType;
  isActive: boolean;
  onPress: () => void;
};

const TabItem = ({ tab, isActive, onPress }: TabItemProps) => {
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

  return (
    <TouchableOpacity style={styles.tabButton} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Animated.View style={animatedIconStyle}>
          <Icon
            iconSet={tab.iconSet}
            iconName={tab.iconName}
            iconSize={isActive ? 24 : 28}
            iconColor={isActive ? colors.orange : colors.gray}
          />
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
};

type TabBarProps = {
  tabs: TabType[];
  activeIndex: number;
  onTabPress: (tabName: string) => void;
};

const TabBar = ({ tabs, activeIndex, onTabPress }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          paddingBottom: insets.bottom,
          height: insets.bottom + 55,
        },
      ]}
    >
      {tabs.map((tab, index) => (
        <TabItem
          key={tab.name}
          tab={tab}
          isActive={activeIndex === index}
          onPress={() => onTabPress(tab.name)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderTopColor: colors.grayTint7,
    borderTopWidth: 1,
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
