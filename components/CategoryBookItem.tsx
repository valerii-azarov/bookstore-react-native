import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";
import { Book, ModeType } from "@/types";

import Icon from "./Icon";
import Image from "./Image";
import RedirectButton from "./RedirectButton";
import Typography from "./Typography";

type CategoryBookItemProps = {
  item: Book;
  mode: ModeType;
  onView: (bookId: string) => void;
  onAddToFavorites?: (bookId: string) => void;
  onAddToCart?: (item: Book) => void;
  labels?: { details: string; };
}

const CategoryBookItem = ({ 
  item,
  mode,
  onView, 
  onAddToFavorites, 
  onAddToCart,
  labels = {
    details: "Details"
  } 
}: CategoryBookItemProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: mode === "horizontal" 
            ? 200 
            : mode === "list" 
              ? "100%" 
              : "48%",
          height: mode === "list" ? 180 : 280,
          flexDirection: mode === "list" ? "row" : "column",
        },
      ]}
    >
      <View
        style={[
          styles.imageWrapper,
          { 
            width: mode === "list" ? "44%" : "100%",
          },
        ]}
      >
        <View
          style={[
            styles.imageBackground,
            { 
              backgroundColor: item?.backgroundColor || colors.grayTint5,
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item?.coverImage }}
              textSize={10}
              textColor={colors.white}
              fallbackColor={
                item.backgroundColor
                  ? colorConverter.lighterHexColor(item.backgroundColor)
                  : colors.grayTint4
              }
              style={styles.coverImage}
              resizeMode="cover"
            />

            {item?.discount > 0 && (
              <View style={styles.discountBadgeContainer}>
                <View style={styles.discountBadge}>
                  <Typography fontSize={12} fontWeight="bold" color={colors.white}>
                    {`-${item?.discount}%`}
                  </Typography>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>     

      <View
        style={[
          styles.contentWrapper,
          mode === "list" ? { paddingLeft: 15 } : { paddingTop: 10 },
        ]}
      >
        <Typography fontSize={10} fontWeight="bold" color={colors.gray} numberOfLines={1}>
          {item?.authors.join(", ")}
        </Typography>

        <Typography fontSize={14} fontWeight="bold" numberOfLines={1} style={{ marginBottom: 5 }}>
          {item?.title}
        </Typography>

        <View style={styles.priceContainer}>
          <Typography 
            fontSize={16} 
            fontWeight="bold" 
            color={item?.discount > 0 ? colors.red : colors.black}
            numberOfLines={1}
            style={{ maxWidth: 85 }}
          >
            {item?.price}₴
          </Typography>

          {item?.discount > 0 && (
            <Typography 
              fontSize={12} 
              color={colors.gray} 
              numberOfLines={1}
              style={{ 
                maxWidth: 85, 
                textDecorationLine: "line-through"
              }}
            >
              {item?.originalPrice}₴
            </Typography>
          )}
        </View>

        <View style={styles.space} />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => onAddToFavorites?.(item.id)}
            style={[
              styles.actionButton, 
              { 
                backgroundColor: colors.black,
                borderRadius: 15,
              }
            ]}
          >
            <Icon 
              iconSet="Ionicons"
              iconName={item?.isFavorite ? "heart" : "heart-outline"} 
              iconSize={18} 
              iconColor={item?.isFavorite ? colors.red : colors.white} 
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onAddToCart?.(item)}
            style={[
              styles.actionButton, 
              { 
                backgroundColor: colors.black, 
                borderRadius: 15,
              }
            ]}
            disabled={item?.availableQuantity === 0}
          >
            <Icon
              iconSet="Ionicons"
              iconName={item?.inCart ? "bag-check" : "bag-add-outline"}
              iconSize={18}
              iconColor={item?.availableQuantity === 0 ? colors.grayTint1 : colors.white}
            />
          </TouchableOpacity>

          <RedirectButton 
            title={labels.details}
            onPress={() => onView(item?.id)}
            style={[
              styles.detailButton,
              { 
                paddingHorizontal: 15,
              }
            ]}
            textSize={12}
            textWeight="bold"
            textSpacing={5}
            arrowSize={16}
            arrowColor={colors.black}
          />
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
  },
  imageWrapper: {
    height: 150,
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
    width: 80,
    height: 125,
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
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  contentWrapper: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  detailButton: {
    height: 30,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
  },
  space: {
    flex: 1,
  }
});

export default CategoryBookItem;
