import { View, ViewStyle, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import { horizontalScale, verticalScale } from "@/helpers/common";

import Typography from "@/components/Typography";

interface NotificationProps {
  count?: number;
  onPress?: () => void;
  style?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
}

const Notification = ({
  count = 0,
  onPress,
  style,
  iconSize = 24,
  iconColor = colors.orange,
}: NotificationProps) => {
  const displayedCount = count >= 100 ? "99+" : count.toString();

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[
        styles.container,
        style
      ]}
    >
      <Icon name="notifications" size={iconSize} color={iconColor} />
      {count > 0 && (
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

export default Notification;
