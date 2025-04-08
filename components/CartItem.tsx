import { useRef } from "react";
import { View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";
import { Cart } from "@/types";

import Typography from "./Typography";

interface CartItemProps {
  item: Cart;
  onViewDetails: () => void;
  onRemoveFromCart: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
}

const CartItem = ({ item, onRemoveFromCart, onViewDetails, onUpdateQuantity }: CartItemProps) => {
  const swipeableRef = useRef<Swipeable>(null);

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

  const confirmDeleteCart = () => {
    Alert.alert(
      t("alerts.confirmDeleteCartBook.title"),
      t("alerts.confirmDeleteCartBook.message"),
      [
        { 
          text: t("alerts.confirmDeleteCartBook.cancel"), 
          style: "cancel", 
          onPress: () => swipeableRef.current?.close(),
        },
        { 
          text: t("alerts.confirmDeleteCartBook.confirm"), 
          style: "destructive", 
          onPress: () => onRemoveFromCart(item.id),
        },
      ]
    );
  };

  const handlePress = () => {
    startAnimation();
    setTimeout(onViewDetails, 500);
  };

  return (
    <Swipeable 
      ref={swipeableRef} 
      renderRightActions={() => (
        <TouchableOpacity 
          onPress={confirmDeleteCart} 
          style={styles.deleteButton}
        >
          <Ionicons name="trash" size={28} color={colors.white} />
        </TouchableOpacity>
      )}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <Animated.Image
              style={[styles.image, animatedStyle]}
              source={{ uri: item.coverImage }}
              resizeMode="cover"
            />
          </TouchableOpacity>

          {item.discount > 0 && (
            <View style={styles.discountBadgeContainer}>
              <View style={styles.discountBadge}>
                <Typography fontSize={10} fontWeight="bold" color={colors.white}>
                  {`-${item.discount}%`}
                </Typography>
              </View>
            </View>
          )}
        </View>

        <View style={styles.contentContainer}>
          <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
            {item.authors?.join(", ")}
          </Typography>

          <Typography fontSize={16} fontWeight="bold" numberOfLines={1} style={styles.title}>
            {item.title}
          </Typography>

          <View style={styles.infoContainer}>
            <View style={styles.priceContainer}>
              {item.discount > 0 && (
                <Typography 
                  fontSize={14} 
                  numberOfLines={1} 
                  ellipsizeMode="tail" 
                  color={colors.grayTint5} 
                  style={styles.originalPrice}
                >
                  {`${(item.originalPrice * item.cartQuantity).toFixed(2)}₴`}
                </Typography>
              )}

              <Typography 
                fontSize={20} 
                fontWeight="bold" 
                numberOfLines={1} 
                ellipsizeMode="tail" 
                color={item.discount > 0 ? colors.red : colors.black} style={styles.price}
              >
                {`${(item.price * item.cartQuantity).toFixed(2)}₴`}
              </Typography>
            </View>

            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.id, item.cartQuantity - 1)}
                disabled={item.cartQuantity <= 1}
                style={styles.quantityButton}
              >
                <Ionicons 
                  name="remove" 
                  size={20} 
                  color={item.cartQuantity <= 1 ? colors.grayTint5 : colors.black} 
                />
              </TouchableOpacity>

              <Typography fontSize={16} style={styles.quantityText}>
                {item.cartQuantity}
              </Typography>

              <TouchableOpacity
                onPress={() => onUpdateQuantity(item.id, item.cartQuantity + 1)}
                disabled={item.cartQuantity >= item.availableQuantity}
                style={styles.quantityButton}
              >
                <Ionicons 
                  name="add" 
                  size={20} 
                  color={item.cartQuantity >= item.availableQuantity ? colors.grayTint5 : colors.black} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>  
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: 60,
    height: 94,
    borderColor: colors.gray,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 1,
    borderWidth: 0.5,
  },
  discountBadgeContainer: {
    position: "absolute",
    top: -5,
    right: -10,
  },
  discountBadge: {
    backgroundColor: colors.red,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 15,
  },
  title: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    maxWidth: 150,
    marginTop: 10,
  },
  price: {
    maxWidth: 150,
  },
  quantityContainer: {
    height: 30,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    minWidth: 20,
    textAlign: "center",
  },
  deleteButton: {
    width: 100,
    backgroundColor: colors.red,
    borderRadius: 10,
    marginLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartItem;
