import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";
import { Book } from "@/types";

import Typography from "./Typography";

interface FavoriteBookItemProps {
  item: Book;
  onViewDetails: () => void;
  onToggleFavorite?: (item: Book) => void;
}

const FavoriteBookItem = ({ item, onViewDetails, onToggleFavorite }: FavoriteBookItemProps) => {
  const t = useTranslation();
  
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const startAnimation = () => {
    translateX.value = withSequence(
      withTiming(-5, { duration: 250 }),
      withTiming(0, { duration: 250 }),
    );
  };

  const handlePress = () => {
    startAnimation();
    setTimeout(onViewDetails, 500);
  };
  
  return (
    <View style={styles.container}>      
      <Image
        style={styles.coverImage}
        source={{ uri: item.coverImage }}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
          {item.authors?.join(", ")}
        </Typography>
        
        <Typography fontSize={16} fontWeight="bold" numberOfLines={1} style={styles.title}>
          {item.title}
        </Typography>

        <View style={{ alignItems: "flex-start" }}>
          <TouchableOpacity
            onPress={handlePress}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Typography fontSize={12} fontWeight="bold" color={colors.black}>
              {t("components.favoriteBookItem.details")}
            </Typography>

            <Animated.View style={animatedStyle}>
              <Icon name="arrow-forward-outline" size={16} color={colors.black} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.favoriteContainer}>
        <TouchableOpacity
          onPress={() => onToggleFavorite?.(item)}
          style={styles.favoriteButton}
        >
          <Icon 
            name={item?.isFavorite ? "heart" : "heart-outline"} 
            size={28}
            color={item?.isFavorite ? colors.red : colors.black}
          />
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingLeft: 15,
  },
  title: {
    flex: 1,
  },
  button: {
    height: 30,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  favoriteContainer: {
    height: 75,
    justifyContent: "center",
  },
  favoriteButton: {
    paddingLeft: 15,
  },
});

export default FavoriteBookItem;
