import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useTranslation } from "@/contexts/translateContext";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";
import { Book, ModeType } from "@/types";

import Image from "./Image";
import Typography from "@/components/Typography";

interface BookItemProps {
  mode: ModeType;
  item: Book;
  onViewDetails: () => void;
  onAddToFavorites?: (item: Book) => void;
  onAddToCart?: (item: Book) => void;
  isOwner?: boolean;
}

const BookItem = ({ mode, item, onViewDetails, onAddToFavorites, onAddToCart, isOwner = false }: BookItemProps) => {
  const t = useTranslation();

  return (
    <View
      style={[
        styles.container,
        mode === "horizontal" && { flex: 1 },
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
              backgroundColor: item?.backgroundColor || colors.creamTint3,
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item?.coverImage }}
              style={styles.coverImage}
              textSize={10}
              textColor={colors.white}
              fallbackColor={
                item.backgroundColor
                  ? colorConverter.lighterHexColor(item.backgroundColor)
                  : colors.grayTint4
              }
              resizeMode="cover"
            />

            <View style={styles.overlayButtons}>
              {item?.discount > 0 && (
                <View style={styles.discountBadge}>
                  <Typography fontSize={12} fontWeight="bold" color={colors.white}>
                    {`-${item?.discount}%`}
                  </Typography>
                </View>
              )}

              {mode === "grid" && !isOwner && (
                <View style={styles.gridButtons}>
                  <TouchableOpacity
                    onPress={() => onAddToCart?.(item)}
                    style={[
                      styles.actionButton, 
                      { 
                        backgroundColor: "rgba(0, 0, 0, 0.6)", 
                        borderRadius: 10,
                      }
                    ]}
                  >
                    <Icon
                      name={item?.inCart ? "bag-check" : "bag-add-outline"}
                      size={18}
                      color={colors.white}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => onAddToFavorites?.(item)}
                    style={[
                      styles.actionButton, 
                      { 
                        backgroundColor: "rgba(0, 0, 0, 0.6)", 
                        borderRadius: 10,
                      }
                    ]}
                  >
                    <Icon 
                      name={item?.isFavorite ? "heart" : "heart-outline"} 
                      size={18} 
                      color={item?.isFavorite ? colors.red : colors.white} 
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
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

        <Typography fontSize={14} fontWeight="bold" numberOfLines={1} style={styles.title}>
          {item?.title}
        </Typography>

        <View style={styles.priceContainer}>
          <Typography fontSize={16} fontWeight="bold" color={item?.discount > 0 ? colors.red : colors.black}>
            {`${item?.price}₴`}
          </Typography>

          {item?.discount > 0 && (
            <Typography fontSize={12} color={colors.gray} style={styles.originalPrice}>
              {item?.originalPrice}
            </Typography>
          )}
        </View>

        {mode === "list" && isOwner && (
          <View 
            style={[
              styles.infoContainer, 
              { 
                marginTop: 5,
              }
            ]}
          >
            <View
              style={[
                styles.infoBadge,
                { 
                  backgroundColor: item.availableQuantity > 0 ? colors.greenTint4 : colors.redTint4,
                },
              ]}
            >
              <Typography fontSize={12} color={colors.white}>
                {item?.availableQuantity > 0 ? (
                  <>
                    {`${t("components.bookItem.available")}: `}
                    <Typography fontSize={12} fontWeight="bold" color={colors.white}>
                      {item?.availableQuantity}
                    </Typography>
                  </>
                ) : (
                  t("components.bookItem.unavailable")
                )}
              </Typography>
            </View>

            <View 
              style={[
                styles.infoBadge, 
                { 
                  backgroundColor: colors.creamTint4,
                }
              ]}
            >
              <Typography fontSize={12} color={colors.gray}>
                {`${t("components.bookItem.article")}: `}
                <Typography fontSize={12} fontWeight="bold" color={colors.black}>
                  {item?.sku}
                </Typography>
              </Typography>
            </View>
          </View>
        )}

        <View style={styles.actionsContainer}>
          {mode === "list" ? (
            <View style={styles.listActionsWrapper}>
              <View
                style={[
                  styles.listButtons, 
                  isOwner && { justifyContent: "flex-end" },
                ]}
              >
                {!isOwner && (
                  <>
                    <TouchableOpacity
                      onPress={() => onAddToFavorites?.(item)}
                      style={[
                        styles.actionButton, 
                        { 
                          backgroundColor: colors.black,
                          borderRadius: 15,
                        }
                      ]}
                    >
                      <Icon 
                        name={item?.isFavorite ? "heart" : "heart-outline"} 
                        size={18} 
                        color={item?.isFavorite ? colors.red : colors.white} 
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
                    >
                      <Icon
                        name={item?.inCart ? "bag-check" : "bag-add-outline"}
                        size={18}
                        color={colors.white}
                      />
                    </TouchableOpacity>
                  </>
                )}

                <TouchableOpacity
                  onPress={onViewDetails}
                  style={[
                    styles.detailsButton, 
                    { 
                      paddingHorizontal: 15,
                    }
                  ]}
                >
                  <Typography fontSize={12} fontWeight="bold" color={colors.black}>
                    {t("components.bookItem.details")}
                  </Typography>
                  <Icon name="arrow-forward-outline" size={16} color={colors.black} />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.nonListActions}>
              {mode === "horizontal" && !isOwner && (
                <>
                  <TouchableOpacity
                    onPress={() => onAddToFavorites?.(item)}
                    style={[
                      styles.actionButton, 
                      { 
                        backgroundColor: colors.black, 
                        borderRadius: 15,
                      }
                    ]}
                  >
                    <Icon 
                      name={item?.isFavorite ? "heart" : "heart-outline"} 
                      size={18} 
                      color={item?.isFavorite ? colors.red : colors.white} 
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
                  >
                    <Icon
                      name={item?.inCart ? "bag-check" : "bag-add-outline"}
                      size={18}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </>
              )}

              <TouchableOpacity
                onPress={onViewDetails}
                style={[
                  styles.detailsButton, 
                  { 
                    flex: 1,
                  }
                ]}
              >
                <View style={styles.detailsContent}>
                  <Typography fontSize={12} fontWeight="bold" color={colors.black}>
                    {t("components.bookItem.details")}
                  </Typography>
                  <Icon name="arrow-forward-outline" size={16} color={colors.black} />
                </View>
              </TouchableOpacity>
            </View>
          )}
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
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  imageBackground: {
    height: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
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
  overlayButtons: {
    position: "absolute",
    top: 5,
    right: 10,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 5,
  },
  discountBadge: {
    backgroundColor: colors.red,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  gridButtons: {
    flexDirection: "column",
    gap: 5,
  },
  actionButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  contentWrapper: {
    flex: 1,
  },
  title: {
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
  infoContainer: {
    flexDirection: "column",
    gap: 5,
  },
  infoBadge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  actionsContainer: {
    flex: 1,
    marginTop: 5,
  },
  listActionsWrapper: {
    flex: 1,
    justifyContent: "flex-end",
  },
  listButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailsButton: {
    height: 30,
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  nonListActions: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  detailsContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});

export default BookItem;
