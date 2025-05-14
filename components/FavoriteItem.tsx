import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence, 
} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { Favorite } from "@/types";

import Icon from "./Icon";
import Image from "./Image";
import Typography from "./Typography";

type FavoriteItemProps = {
  item: Favorite;
  onViewDetails: () => void;
  onToggleFavorite?: (item: Favorite) => void;
  labels?: { favorite: string; };
};

const FavoriteItem = ({ 
  item, 
  onViewDetails, 
  onToggleFavorite, 
  labels = {
    favorite: "Favorite"
  }
}: FavoriteItemProps) => {
  const imageScale = useSharedValue(1);
  const favoriteScale = useSharedValue(1);
  
  const imageAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const favoriteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  const startImageAnimation = () => {
    imageScale.value = withSequence(
      withTiming(0.9, { duration: 250 }),
      withTiming(1, { duration: 250 })
    );
  };

  const startFavoriteAnimation = (isFavorite: boolean) => {
    favoriteScale.value = isFavorite
      ? withSequence(
          withTiming(1.2, { duration: 150 }),
          withTiming(1, { duration: 150 }),
          withRepeat(withTiming(1.1, { duration: 200 }), 2, true)
        )
      : withSequence(
          withTiming(0.8, { duration: 150 }),
          withTiming(1, { duration: 150 })
        );
  };
  
  const handleDetailsPress = () => {
    startImageAnimation();
    setTimeout(onViewDetails, 500);
  };

  const handleFavoritePress = () => {
    const newFavoriteState = !item.isFavorite;
    startFavoriteAnimation(newFavoriteState);
    onToggleFavorite?.({ ...item, isFavorite: newFavoriteState });
  };

  return (
    <View style={styles.container}>      
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={handleDetailsPress} activeOpacity={0.7}>
          <Animated.View style={imageAnimatedStyle}>
            <Image
              source={{ uri: item.coverImage }}
              textSize={6}
              style={styles.coverImage}
              resizeMode="cover"
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentWrapper}>
        <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
          {item.authors?.join(", ")}
        </Typography>
        
        <Typography fontSize={16} fontWeight="bold" color={colors.black} numberOfLines={1} style={{ flex: 1 }}>
          {item.title}
        </Typography>

        <View style={{ alignItems: "flex-start" }}>
          <TouchableOpacity
            onPress={handleFavoritePress}
            activeOpacity={0.7}
          >
            <View style={styles.favoriteRow}>
              <Animated.View style={[styles.favoriteButton, favoriteAnimatedStyle]}>
                <Icon 
                  iconSet="Ionicons"
                  iconName={item?.isFavorite ? "heart" : "heart-outline"} 
                  iconSize={24}
                  iconColor={item?.isFavorite ? colors.red : colors.black}
                />
              </Animated.View>

              <Typography fontSize={14} fontWeight="bold" color={colors.black}>
                {labels.favorite}
              </Typography>
            </View>
          </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageWrapper: {
    marginRight: 15,
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
  contentWrapper: {
    flex: 1,
  },
  favoriteRow: {
    backgroundColor: colors.grayTint9,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  favoriteButton: {
    marginRight: 5,
  },
});

export default FavoriteItem;
