import React, { forwardRef } from "react";
import { 
  View,
  ViewStyle, 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleProp, 
  StyleSheet, 
} from "react-native";
import * as IconSets from "@expo/vector-icons";
import { colors } from "@/constants/theme";

import Icon from "./Icon";
import Typography from "./Typography";

type IconBadgeProps = TouchableOpacityProps & {
  badgeCount: number;
  onPress?: () => void;
  badgeIconSet: keyof typeof IconSets;
  badgeIconName: string;
  badgeIconSize?: number;
  badgeIconColor?: string;
  style?: StyleProp<ViewStyle>;
};

type ButtonRef = React.ComponentRef<typeof TouchableOpacity>;

const IconBadge = forwardRef<ButtonRef, IconBadgeProps>(
  (
    {
      badgeCount,
      onPress,
      badgeIconSet,
      badgeIconName,
      badgeIconSize = 24,
      badgeIconColor = colors.orange,
      style,
      ...props 
    }, 
    ref
  ) => {
    const displayedCount = badgeCount >= 100 ? "99+" : badgeCount.toString();

    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={[
          styles.container, 
          style
        ]}
        {...props}
      >
        <Icon
          iconSet={badgeIconSet}
          iconName={badgeIconName}
          iconSize={badgeIconSize}
          iconColor={badgeIconColor}
        />

        {badgeCount > 0 && (
          <View
            style={[
              styles.badge,
              {
                minWidth: displayedCount.length > 2 ? 32 : 16,
                paddingHorizontal: displayedCount.length > 2 ? 6 : 4,
              },
            ]}
          >
            <Typography fontSize={10} fontWeight="bold" color={colors.white}>
              {displayedCount}
            </Typography>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
  },
  badge: {
    backgroundColor: colors.red,
    borderRadius: 10,
    height: 16,
    position: "absolute",
    top: -3,
    right: -5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconBadge;
