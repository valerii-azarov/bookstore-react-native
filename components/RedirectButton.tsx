import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import { colors } from "@/constants/theme";
import Typography from "@/components/Typography";

type RedirectButtonProps = {
  title: string;
  onPress: () => void;
};

const RedirectButton = ({ title, onPress }: RedirectButtonProps) => {
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const startAnimation = () => {
    translateX.value = withSequence(
      withTiming(-10, { duration: 250 }),
      withTiming(0, { duration: 250 }),
    );
  };

  const handlePress = () => {
    startAnimation();
    setTimeout(onPress, 500);
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Typography fontSize={14} fontWeight="medium" color={colors.black} style={{ marginRight: 10 }}>
        {title}
      </Typography>
      <Animated.View style={animatedStyle}>
        <Icon name="arrow-forward-sharp" size={20} color={colors.black} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { 
    flexDirection: "row", 
    alignItems: "center",
  },
});

export default RedirectButton;
