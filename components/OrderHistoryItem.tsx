import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSequence, interpolate } from "react-native-reanimated";
import { format } from "date-fns";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";
import { Order, OrderStateType, OrderStatusStyle } from "@/types";
import Typography from "./Typography";

interface OrderHistoryItemProps {
  item: Order;
  onViewDetails: () => void;
}

const OrderHistoryItem = ({ item, onViewDetails }: OrderHistoryItemProps) => {
  const t = useTranslation();
  
  const circleScale = useSharedValue(0);
  const circleOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(1);

  const circleStyle = useAnimatedStyle(() => ({
    opacity: circleOpacity.value,
    transform: [{ scale: interpolate(circleScale.value, [0, 1], [0, 15]) }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const startAnimation = () => {
    circleScale.value = withSequence(withTiming(1, { duration: 450 }), withTiming(0, { duration: 0 }));
    circleOpacity.value = withSequence(withTiming(0.4, { duration: 150 }), withTiming(0, { duration: 300 }));
    contentOpacity.value = withSequence(withTiming(0.7, { duration: 200 }), withTiming(1, { duration: 250 }));
  };

  const handlePress = () => {
    startAnimation();
    setTimeout(onViewDetails, 500);
  };

  const statusMap: Record<OrderStateType, OrderStatusStyle> = {
    pending: {
      label: t("orderStatuses.pending"),
      backgroundColor: "#FFC107",
    },
    processing: {
      label: t("orderStatuses.processing"),
      backgroundColor: "#FF9800",
    },
    shipped: {
      label: t("orderStatuses.shipped"),
      backgroundColor: "#2196F3",
    },
    delivered: {
      label: t("orderStatuses.delivered"),
      backgroundColor: "#A5D6A7",
    },
    received: {
      label: t("orderStatuses.received"),
      backgroundColor: "#4CAF50",
    },
    cancelled: {
      label: t("orderStatuses.cancelled"),
      backgroundColor: "#F44336"
    },
  };

  const coverBooks = item.books.slice(0, 3);

  const imageWidth = 53;
  const overlapOffset = 10;

  const maxWidth = imageWidth + (3 - 1) * overlapOffset;
  const currentWidth = imageWidth + (coverBooks.length - 1) * overlapOffset;
  const offset = coverBooks.length < 3 ? (maxWidth - currentWidth) / 2 : 0;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress} 
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.circle, circleStyle]} />

      <Animated.View style={[styles.contentWrapper, contentStyle]}>
        <View style={styles.imageWrapper}>
          {coverBooks.map((book, index) => (
            <Image
              key={index}
              style={[
                styles.coverImage,
                {
                  zIndex: -index,
                  transform: [{ translateX: offset + index * overlapOffset }],
                },
              ]}
              source={{ uri: book.coverImage }}
              resizeMode="cover"
            />
          ))}
        </View>

        <View style={[styles.contentContainer, contentStyle]}>
          <View style={styles.header}>
            <Typography fontSize={16} fontWeight="bold" color={colors.black} numberOfLines={1} style={styles.orderNumber}>
              #{item.id}
            </Typography>

            <Typography fontSize={18} fontWeight="bold" color={colors.black} numberOfLines={1} style={styles.orderTotal}>
              {item.total.toFixed(2)}₴
            </Typography>
          </View>

          <Typography fontSize={12} fontWeight="bold" color={colors.gray} style={styles.orderDate}>
            {format(new Date(item.createdAt), "dd.MM.yyyy HH:mm")}
          </Typography>

          <View style={styles.divider} />

          <View style={styles.footer}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: statusMap[item.status].backgroundColor,
                },
              ]}
            >
              <Typography fontSize={14} fontWeight="bold" color={colors.white}>
                {statusMap[item.status].label}
              </Typography>
            </View>
          </View>
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
    overflow: "hidden",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  circle: {
    width: 50,
    height: 50,
    backgroundColor: colors.gray,
    borderRadius: 25,
    position: "absolute",
    left: 0,
    top: "50%",
    marginTop: -25,
  },
  imageWrapper: {
    position: "relative",
    width: 73,
    height: 83,
    marginRight: 15,
  },
  coverImage: {
    position: "absolute",
    width: 53,
    height: 83,
    borderColor: colors.gray,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 1,
    borderWidth: 0.5,
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  orderNumber: {
    maxWidth: "55%",
  },
  orderTotal: {
    maxWidth: "40%",
  },
  orderDate: {
    marginTop: 2.5,
  },
  divider: {
    height: 1.5,
    opacity: 0.3,
    backgroundColor: colors.grayTint5,
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  statusBadge: {
    minWidth: 100,
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    alignItems: "center",
  },
});

export default OrderHistoryItem;
