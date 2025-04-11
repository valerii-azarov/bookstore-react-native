import { View, ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import * as IconSets from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { horizontalScale, verticalScale } from "@/helpers/common";

import Icon from "./Icon";
import Typography from "./Typography";

type IconBadgeProps = {
  badgeCount: number;
  badgeIconSet: keyof typeof IconSets;
  badgeIconName: string;
  badgeIconSize?: number;
  badgeIconColor?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

const IconBadge = ({
  badgeCount,
  badgeIconSet,
  badgeIconName,
  badgeIconSize = 24,
  badgeIconColor = colors.orange,
  onPress,
  style,
}: IconBadgeProps) => {
  const displayedCount = badgeCount >= 100 ? "99+" : badgeCount.toString();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
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
              minWidth: horizontalScale(displayedCount.length > 2 ? 32 : 16),
              paddingHorizontal: horizontalScale(displayedCount.length > 2 ? 6 : 4),
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
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignSelf: "center",
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -5,
    backgroundColor: colors.red,
    borderRadius: 10,
    height: verticalScale(16),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IconBadge;
