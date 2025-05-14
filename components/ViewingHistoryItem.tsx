import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
  interpolate,
} from "react-native-reanimated";
import { format } from "date-fns";
import { colors } from "@/constants/theme";
import { ViewingHistory } from "@/types";

import Image from "./Image";
import Typography from "./Typography";

type ViewingHistoryItemProps = {
  item: ViewingHistory;
  onViewDetails: () => void;
};

const ViewingHistoryItem = ({ item, onViewDetails }: ViewingHistoryItemProps) => {
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  const circleStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
    transform: [{
      scale: interpolate(
        circleScale.value,
        [0, 1],
        [0, 15]
      )
    }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const startAnimation = () => {
    circleScale.value = withSequence(
      withTiming(1, { duration: 450 }),
      withTiming(0, { duration: 0 })
    );
    
    circleOpacity.value = withSequence(
      withTiming(0.4, { duration: 150 }),
      withTiming(0, { duration: 300 })
    );

    contentOpacity.value = withSequence(
      withTiming(0.7, { duration: 200 }),
      withTiming(1, { duration: 250 })
    );
  };

  const handlePress = () => {
    startAnimation();
    setTimeout(onViewDetails, 500);
  };
  
  return (
    <TouchableOpacity
      style={styles.container}  
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.circle, circleStyle]} />
      
      <Animated.View style={[styles.contentWrapper, contentStyle]}>
        <Image
          source={{ uri: item.coverImage }}
          textSize={6}
          style={styles.coverImage}
          resizeMode="cover"
        />
        
        <View style={styles.contentContainer}>
          <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
            {item.authors?.join(", ") || "Unknown Author"}
          </Typography>
          
          <Typography fontSize={16} fontWeight="bold" numberOfLines={1} style={styles.title}>
            {item.title}
          </Typography>

          <Typography fontSize={12} fontWeight="bold" color={colors.gray}>
            {format(new Date(item.timestamp), "dd.MM.yyyy HH:mm")}
          </Typography>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: colors.gray,
    borderRadius: 25,
    position: "absolute",
    left: 15,
    top: "50%",
    marginTop: -25,
  },
  coverImage: {
    width: 48,
    height: 75,
    borderColor: colors.gray,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 1,
    borderWidth: 0.5,
  },
  title: {
    flex: 1,
  },
});

export default ViewingHistoryItem;
