import { View, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from "react-native-reanimated";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";
import { Favorite } from "@/types";

import Icon from "./Icon";
import Typography from "./Typography";

interface FavoriteItemProps {
  item: Favorite;
  onViewDetails: () => void;
  onToggleFavorite?: (item: Favorite) => void;
}

const FavoriteItem = ({ item, onViewDetails, onToggleFavorite }: FavoriteItemProps) => {
  const t = useTranslation();
  
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const startAnimation = () => {
    scale.value = withSequence(
      withTiming(0.9, { duration: 250 }),
      withTiming(1, { duration: 250 })
    );
  };
  
  const handlePress = () => {
    startAnimation();
    setTimeout(onViewDetails, 500);
  };

  return (
    <View style={styles.container}>      
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <Animated.Image
            style={[styles.coverImage, animatedStyle]}
            source={{ uri: item.coverImage }}
            resizeMode="cover"
          />
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
          <View style={styles.favoriteRow}>
            <TouchableOpacity  
              onPress={() => onToggleFavorite?.(item)}
              style={styles.favoriteButton}
            >
              <Icon 
                iconSet="Ionicons"
                iconName={item?.isFavorite ? "heart" : "heart-outline"} 
                iconSize={24}
                iconColor={item?.isFavorite ? colors.red : colors.black}
              />
            </TouchableOpacity>

            <Typography fontSize={14} fontWeight="bold" color={colors.black}>
              {t("components.favoriteBookItem.labels.favorite")}
            </Typography>
          </View>
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
