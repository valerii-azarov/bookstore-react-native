import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import ReanimatedSwipeable, { type SwipeableProps } from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
} from "react-native-reanimated";
import { format } from "date-fns";
import { colors } from "@/constants/theme";
import { Order } from "@/types";

import Icon from "./Icon";
import Image from "./Image";
import Typography from "./Typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type OrderItemProps = Partial<SwipeableProps> & {
  item: Order;
  onView: (orderId: string) => void;
  onEdit?: (orderId: string) => void;
  disableSwipe?: boolean;
  labels?: {
    quantity: string;
    cost: string;
    date: string;
  },
  actionLabels?: {
    edit: string;
  },
};

export type SwipeableRef = React.ComponentRef<typeof ReanimatedSwipeable>;

const OrderItem = forwardRef<SwipeableRef, OrderItemProps>(
  (
    { 
      item, 
      onView, 
      onEdit,
      disableSwipe = false,
      labels = {
        quantity: "Number of books",
        cost: "Cost",
        date: "Creation date",
      },
      actionLabels = {
        edit: "Edit",
      },
      ...props
    }, 
    ref
  ) => {
    const swipeableRef = useRef<SwipeableRef>(null);
    
    useImperativeHandle(ref, () => swipeableRef.current as SwipeableRef, []);

    const coverImagesScale = useSharedValue(1);
        
    const coverImagesAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: coverImagesScale.value }],
    }));
  
    const startAnimation = () => {
      coverImagesScale.value = withSequence(
        withTiming(0.9, { duration: 250 }),
        withTiming(1, { duration: 250 })
      );
    };

    const handlePress = () => {
      startAnimation();
      setTimeout(() => onView(item?.id), 500);
    };

    const renderRightActions = () => {
      const actions = [
        {
          iconName: "edit",
          label: actionLabels.edit,
          backgroundColor: colors.orangeTint1,
          onPress: () => {
            if (swipeableRef) {
              swipeableRef.current?.close();
            }
            setTimeout(() => onEdit?.(item.id), 500);
          },
        },
      ];
    
      return (
        <View style={styles.rightActionsContainer}>
          {actions.map((action, index) => {
            const buttonScale = useSharedValue(1);
    
            const buttonAnimatedStyle = useAnimatedStyle(() => ({
              transform: [{ scale: buttonScale.value }],
            }));
    
            const handlePressIn = () => {
              buttonScale.value = withTiming(0.95, { duration: 100 });
            };
    
            const handlePressOut = () => {
              buttonScale.value = withTiming(1, { duration: 100 });
            };
    
            return (
              <Animated.View
                key={index}
                style={[styles.actionButton, buttonAnimatedStyle]}
              >
                <TouchableOpacity
                  style={[
                    styles.actionButtonInner,
                    { 
                      backgroundColor: action.backgroundColor 
                    },
                  ]}
                  onPress={action.onPress}
                  onPressIn={handlePressIn}
                  onPressOut={handlePressOut}
                  activeOpacity={0.7}
                >
                  <Icon
                    iconSet="MaterialIcons"
                    iconName={action.iconName}
                    iconSize={20}
                    iconColor={colors.white}
                  />

                  <Typography fontSize={12} fontWeight="medium" color={colors.white}>
                    {action.label}
                  </Typography>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      );
    };

    const coverBooks = item.books.slice(0, 3);

    const imageWidth = 66;
    const overlapOffset = 10;

    const maxWidth = imageWidth + (3 - 1) * overlapOffset;
    const currentWidth = imageWidth + (coverBooks.length - 1) * overlapOffset;
    const offset = coverBooks.length < 3 ? (maxWidth - currentWidth) / 2 : 0;
    
    return (
      <ReanimatedSwipeable
        ref={swipeableRef}
        rightThreshold={40}
        renderRightActions={!disableSwipe ? () => renderRightActions() : undefined}
        enabled={!disableSwipe}
        {...props}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
            <Animated.View style={[styles.coverImagesWrapper, coverImagesAnimatedStyle]}>
              {coverBooks.map((book, index) => (
                <Image
                  key={index}
                  source={{ uri: book.coverImage }}
                  textSize={6}
                  style={[
                    styles.coverImage,
                    {
                      zIndex: -index,
                      transform: [{ translateX: offset + index * overlapOffset }],
                    },
                  ]}
                  resizeMode="cover"
                />
              ))}
            </Animated.View>
          </TouchableOpacity>

          <View style={styles.contentWrapper}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} numberOfLines={1}>
              #{item.id}
            </Typography>
            
            <View 
              style={[
                styles.detailRow,
                {
                  marginTop: 5,
                }
              ]}
            >
              <Typography fontSize={14} fontWeight="medium" color={colors.black}>
                {labels.quantity}:
              </Typography> 
              
              <Typography fontSize={14} fontWeight="bold" color={colors.black}>
                {item.books.reduce((sum, book) => sum + (book.quantity || 0), 0)}
              </Typography>
            </View>

            <View 
              style={[
                styles.detailRow,
                {
                  marginTop: 5,
                }
              ]}
            >
              <Typography fontSize={14} fontWeight="medium" color={colors.black}>
                {labels.cost}:
              </Typography> 
              
              <Typography fontSize={14} fontWeight="bold" color={colors.black} numberOfLines={1} style={{ flexShrink: 1 }}>
                {item.total.toFixed(2)}₴
              </Typography>
            </View>

            <View style={styles.space} />
            
            <View style={styles.divider} />

            <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
              {labels.date}: {format(new Date(item.createdAt), "dd.MM.yyyy HH:mm")}
            </Typography>
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
    gap: 15,
  },
  coverImagesWrapper: {
    position: "relative",
    width: 86,
    height: 104,
  },
  coverImage: {
    position: "absolute",
    width: 66,
    height: 104,
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
  detailRow: {
    flexDirection: "row",
    gap: 5,
  },
  divider: {
    height: 1.5,
    opacity: 0.3,
    backgroundColor: colors.grayTint5,
    marginVertical: 10,
  },
  space: {
    flex: 1,
  },
  rightActionsContainer: {
    height: "100%",
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionButton: {
    width: SCREEN_WIDTH * 0.2,
    maxWidth: 100,
    borderRadius: 12,
    overflow: "hidden",
  },
  actionButtonInner: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

export default OrderItem;
