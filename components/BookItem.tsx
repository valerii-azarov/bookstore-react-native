import React, { forwardRef, useRef, useImperativeHandle } from "react";
import { View, TouchableOpacity, Dimensions, StyleSheet } from "react-native";
import ReanimatedSwipeable, { type SwipeableProps } from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence, 
} from "react-native-reanimated";
import { colors } from "@/constants/theme";
import { BaseBook } from "@/types";

import Icon from "./Icon";
import Image from "./Image";
import Typography from "./Typography";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type BookItemProps = Partial<SwipeableProps> & {
  item: BaseBook;
  isOwner?: boolean;
  disableSwipe?: boolean;
  onView: () => void;
  onEdit?: (bookId: string) => void;
  onDelete?: (bookId: string) => void;
  labels?: {
    available: string;
    unavailable: string;
    article: string;
  },
  actionLabels?: {
    edit: string;
    delete: string;
  },
};

export type SwipeableRef = React.ComponentRef<typeof ReanimatedSwipeable>;

const BookItem = forwardRef<SwipeableRef, BookItemProps>(
  (
    { 
      item, 
      isOwner = false, 
      disableSwipe = false, 
      onView, 
      onEdit, 
      onDelete,
      labels = {
        available: "Quantity",
        unavailable: "Not Available",
        article: "Article",
      },
      actionLabels = {
        edit: "Edit",
        delete: "Delete",
      }, 
      ...props
    }, 
    ref
  ) => {
    const swipeableRef = useRef<SwipeableRef>(null);

    useImperativeHandle(ref, () => swipeableRef.current as SwipeableRef, []);

    const imageScale = useSharedValue(1);
    
    const imageAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: imageScale.value }],
    }));

    const startAnimation = () => {
      imageScale.value = withSequence(
        withTiming(0.9, { duration: 250 }),
        withTiming(1, { duration: 250 })
      );
    };

    const handlePress = () => {
      startAnimation();
      setTimeout(onView, 500);
    };

    const renderRightActions = () => {
      if (!isOwner) return null;

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
        {
          iconName: "delete",
          label: actionLabels.delete,
          backgroundColor: colors.redTint1,
          onPress: () => onDelete?.(item.id),
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

    return (
      <ReanimatedSwipeable
        ref={swipeableRef}
        rightThreshold={40}
        renderRightActions={isOwner && !disableSwipe ? () => renderRightActions() : undefined}
        enabled={isOwner && !disableSwipe}
        {...props}
      >
        <View style={styles.container}>
          <View style={styles.imageWrapper}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
              <View
                style={[
                  styles.imageBackground,
                  {
                    backgroundColor: item?.backgroundColor || colors.grayTint5,
                  },
                ]}
              >
                <View style={styles.imageContainer}>
                  <Animated.View style={imageAnimatedStyle}>
                    <Image
                      source={{ uri: item.coverImage }}
                      textSize={6}
                      style={styles.coverImage}
                      resizeMode="cover"
                    />
                  </Animated.View>

                  {!isOwner && item?.discount > 0 && (
                    <View style={styles.discountBadgeContainer}>
                      <View style={styles.discountBadge}>
                        <Typography fontSize={10} fontWeight="bold" color={colors.white}>
                          -{item.discount}%
                        </Typography>
                      </View>
                    </View>
                  )}               
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.contentWrapper}>
            <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
              {item.authors?.join(", ")}
            </Typography>

            <Typography fontSize={16} fontWeight="bold" numberOfLines={1} style={{ flex: 1 }}>
              {item.title}
            </Typography>

            {isOwner && (
              <View style={styles.detailsContainer}>
                <View style={{ alignSelf: "flex-start" }}>
                  <View
                    style={[
                      styles.detailBadge,
                      { 
                        backgroundColor: item.availableQuantity > 0 ? colors.greenTint1 : colors.redTint1,
                      },
                    ]}
                  >
                    {item?.availableQuantity > 0 && (
                      <View style={styles.detailBadgeRow}>
                        <Typography fontSize={12} fontWeight="medium" color={colors.white}>
                          {labels.available}:
                        </Typography>

                        <Typography 
                          fontSize={12} 
                          fontWeight="bold" 
                          color={colors.white}
                          numberOfLines={1}
                          style={{ maxWidth: 120 }}
                        >
                          {item?.availableQuantity}
                        </Typography>
                      </View>
                    )}

                    {item?.availableQuantity === 0 && (
                      <Typography fontSize={12} color={colors.white}>
                        {labels.unavailable}
                      </Typography>
                    )}
                  </View>
                </View>

                <View style={{ alignSelf: "flex-start" }}> 
                  <View 
                    style={[
                      styles.detailBadge, 
                      { 
                        backgroundColor: colors.creamTint1,
                      }
                    ]}
                  >
                    <View style={styles.detailBadgeRow}>
                      <Typography fontSize={12} fontWeight="medium" color={colors.black}>
                        {labels.article}:
                      </Typography>
                      
                      <Typography 
                        fontSize={12} 
                        fontWeight="bold" 
                        color={colors.black} 
                        numberOfLines={1} 
                        style={{ maxWidth: 120 }}
                      >
                        {item?.sku}
                      </Typography>
                    </View>
                  </View>
                </View>
              </View>
            )}

            {!isOwner && (    
              <View style={styles.priceContainer}>
                <Typography 
                  fontSize={18}
                  fontWeight="bold" 
                  color={item?.discount > 0 ? colors.red : colors.black}
                  numberOfLines={1}
                  style={{ maxWidth: 120 }}
                >
                  {item?.price}₴
                </Typography>

                {item?.discount > 0 && (
                  <Typography 
                    fontSize={12} 
                    color={colors.gray} 
                    numberOfLines={1}
                    style={{ 
                      maxWidth: 120, 
                      textDecorationLine: "line-through",
                    }}
                  >
                    {item?.originalPrice}₴
                  </Typography>
                )}
              </View>
            )}
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
  imageWrapper: {
    width: 95,
    height: 95,
  },
  imageBackground: {
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  discountBadgeContainer: {
    position: "absolute",
    top: 5,
    right: 10,
  },
  discountBadge: {
    backgroundColor: colors.red,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  contentWrapper: {
    flex: 1,
  },
  detailsContainer: {
    flexDirection: "column",
    gap: 5,
  },
  detailBadge: {
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  detailBadgeRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
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

export default BookItem;
