import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { View, Alert, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import ReanimatedSwipeable, { type SwipeableProps } from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { Cart } from "@/types";

import Icon from "./Icon";
import Image from "./Image";
import Typography from "./Typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type CartItemProps = Partial<SwipeableProps> & {
  item: Cart;
  onViewDetails: () => void;
  onRemoveFromCart: (bookId: string) => void;
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  alerts?: {
    title: string;
    message: string;
    buttons: {
      cancel: string;
      confirm: string;
    };
  },
};

export type SwipeableRef = React.ComponentRef<typeof ReanimatedSwipeable>;

const CartItem = forwardRef<SwipeableRef, CartItemProps>(
  (
    { 
      item,
      onViewDetails, 
      onRemoveFromCart, 
      onUpdateQuantity,
      alerts = {
        title: "Delete Book",
        message: "Do you want to remove this book from your cart?",
        buttons: {
          cancel: "Cancel",
          confirm: "Confirm",
        },
      },
      ...props
    }, 
    ref
  ) => {
    const swipeableRef = useRef<SwipeableRef>(null);

    useImperativeHandle(ref, () => swipeableRef.current as SwipeableRef, []);

    const scale = useSharedValue(1);
    const buttonScale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    const buttonAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: buttonScale.value }],
    }));

    const startAnimation = () => {
      scale.value = withSequence(
        withTiming(0.9, { duration: 250 }),
        withTiming(1, { duration: 250 })
      );
    };

    const confirmDeleteCart = () => {
      Alert.alert(alerts.title, alerts.message, [
        {
          text: alerts.buttons.cancel,
          style: "cancel",
          onPress: () => swipeableRef.current?.close(),
        },
        {
          text: alerts.buttons.confirm,
          style: "destructive",
          onPress: () => onRemoveFromCart(item.id),
        },
      ]);
    };

    const handlePress = () => {
      startAnimation();
      setTimeout(onViewDetails, 500);
    };

    const handlePressIn = () => {
      buttonScale.value = withTiming(0.95, { duration: 100 });
    };

    const handlePressOut = () => {
      buttonScale.value = withTiming(1, { duration: 100 });
    };

    const renderDeleteAction = () => {    
      return (          
        <Animated.View 
          style={[
            styles.actionButton,
            {
              marginLeft: 15,
            },
            buttonAnimatedStyle
          ]}
        >
          <TouchableOpacity
            style={styles.actionButtonInner}
            onPress={confirmDeleteCart}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
          >
            <Icon
              iconSet="MaterialIcons"
              iconName="delete" 
              iconSize={24} 
              iconColor={colors.white} 
            />
          </TouchableOpacity>
        </Animated.View>    
      );
    };

    return (
      <ReanimatedSwipeable 
        ref={swipeableRef}
        rightThreshold={40}
        renderRightActions={renderDeleteAction}
        {...props}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
              <Animated.View style={animatedStyle}>
                <Image
                  source={{ uri: item.coverImage }}
                  textSize={8}
                  style={styles.image}
                  resizeMode="cover"
                />
              </Animated.View>
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
                  <Icon
                    iconSet="Ionicons" 
                    iconName="remove" 
                    iconSize={20} 
                    iconColor={item.cartQuantity <= 1 ? colors.grayTint5 : colors.black} 
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
                  <Icon 
                    iconSet="Ionicons"
                    iconName="add" 
                    iconSize={20} 
                    iconColor={item.cartQuantity >= item.availableQuantity ? colors.grayTint5 : colors.black} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ReanimatedSwipeable>  
    );
  }
);

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
  actionButton: {
    width: SCREEN_WIDTH * 0.2,
    maxWidth: 100,
    backgroundColor: colors.redTint1,
    borderRadius: 12,
    overflow: "hidden",
  },
  actionButtonInner: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CartItem;
