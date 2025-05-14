import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import { format } from "date-fns";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { useBookStore } from "@/stores/bookStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import {
  selectCurrentBook,
  selectFetchBookStatus,
  selectFetchBookResponse,
  selectSetBookById,
  selectFetchBookById,
  selectResetCurrentBook,
} from "@/selectors/bookSelectors";
import { selectIsAdmin } from "@/selectors/authSelectors";
import { selectToggleCart, selectBuyNow } from "@/selectors/cartSelectors";
import { selectToggleFavorite } from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";

import ViewWrapper from "@/components/ViewWrapper";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Loading from "@/components/Loading";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const BookDetailsScreen = () => {
  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();  

  const t = useTranslation();
  const isConnected = useIsConnected();
  
  const isAdmin = useAuthStore(selectIsAdmin);

  const currentBook = useBookStore(selectCurrentBook);
  const fetchBookStatus = useBookStore(selectFetchBookStatus);
  const fetchBookResponse = useBookStore(selectFetchBookResponse);
  
  const setBookById = useBookStore(selectSetBookById);
  const fetchBookById = useBookStore(selectFetchBookById);
  const resetCurrentBook = useBookStore(selectResetCurrentBook);

  const toggleCart = useCartStore(selectToggleCart);
  const buyNow = useCartStore(selectBuyNow);

  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isLoading = fetchBookStatus === "loading";
  const isError = !isLoading && fetchBookResponse?.status === "error";

  const buyScale = useSharedValue(1);
  const cartScale = useSharedValue(1);
  const favoriteScale = useSharedValue(1);

  const buyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buyScale.value }],
  }));
  
  const cartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartScale.value }],
  }));

  const favoriteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  const startBuyAnimation = () => {
    buyScale.value = withSequence(
      withTiming(1.08, { duration: 150 }),
      withTiming(0.95, { duration: 150 }),
      withTiming(1, { duration: 200 })
    );
  };  

  const startCartAnimation = (inCart: boolean) => {
    cartScale.value = inCart
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

  const sections = [
    {
      type: "attribute",
      title: t("screens.bookDetails.titles.details"),
      items: [
        {
          key: "sku",
          label: t("screens.bookDetails.labels.sku"),
          value: currentBook?.sku || "-",
        },
        {
          key: "quantity",
          label: t("screens.bookDetails.labels.quantity"),
          value: currentBook?.availableQuantity?.toString() || "-",
        },
        {
          key: "createdAt",
          label: t("screens.bookDetails.labels.createdAt"),
          value: currentBook?.createdAt ? format(new Date(currentBook.createdAt), "dd.MM.yyyy HH:mm") : "-",
        },
        {
          key: "updatedAt",
          label: t("screens.bookDetails.labels.updatedAt"),
          value: currentBook?.updatedAt ? format(new Date(currentBook.updatedAt), "dd.MM.yyyy HH:mm") : "-",
        },
      ],
      isVisibleItems: isAdmin,
    },
    {
      type: "attribute",
      title: t("screens.bookDetails.titles.characteristics"),
      items: [
        {
          key: "pageCount",
          label: t("screens.bookDetails.labels.pageCount"),
          value: currentBook?.pageCount?.toString() || "-",
        },
        {
          key: "publisher",
          label: t("screens.bookDetails.labels.publisher"),
          value: currentBook?.publisher || "-",
        },
        {
          key: "coverType",
          label: t("screens.bookDetails.labels.coverType"),
          value: currentBook?.coverType ? t(`coverTypes.${currentBook.coverType}`) : "-",
        },
        {
          key: "publicationYear",
          label: t("screens.bookDetails.labels.publicationYear"),
          value: currentBook?.publicationYear?.toString() || "-",
        },
        {
          key: "language",
          label: t("screens.bookDetails.labels.language"),
          value: currentBook?.language ? t(`languages.${currentBook.language}`) : "-",
        },
      ],
      button: {
        label: t("screens.bookDetails.buttons.viewAllCharacteristics.text"),
        onPress: () => router.push("/book-characteristics"),
      },
    },
    {
      type: "text",
      title: t("screens.bookDetails.titles.description"),
      items: [
        {
          key: "description",
          label: "",
          value: currentBook?.description || "-",
        },
      ],
      button: {
        label: t("screens.bookDetails.buttons.viewFullDescription.text"),
        onPress: () => router.push("/book-description"),
      },
    },
  ];
  
  useEffect(() => {
    if (bookId && isConnected) {
      setBookById(bookId);
      fetchBookById();
    }
    return () => resetCurrentBook();
  }, [bookId, isConnected]);

  return (
    <ViewWrapper
      title={t("screens.bookDetails.header.text")}
      onBackPress={() => router.back()}
      hideFooter
    >
      {!isConnected && (
        <ErrorNetwork 
          message={t("components.errorNetwork.title")}
          subMessage={t("components.errorNetwork.subtitle")}
        />
      )}
      
      {isConnected && isLoading && (
        <Loading size="small" color={colors.orange} />
      )}

      {isConnected && isError && !isLoading && (
        <ErrorWithRetry 
          message={t("screens.bookDetails.messages.error.text")}
          subMessage={t("screens.bookDetails.messages.error.subText")}
          hideButton 
        />
      )}

      {isConnected && !isLoading && !isError && currentBook !== null && (
        <ScrollView 
          contentContainerStyle={styles.scrollViewContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentContainer}>
            <View style={styles.sectionContainer}>
              <View 
                style={[
                  styles.sectionWrapper, 
                  { 
                    backgroundColor: currentBook.backgroundColor ? colorConverter.lighterHexColor(currentBook.backgroundColor) : colors.grayTint5,
                    borderRadius: 0,
                  }
                ]}
              > 
                <View style={styles.coverImageContainer}>
                  <Image
                    source={{ uri: selectedImage || currentBook.coverImage }}
                    style={styles.coverImage}
                    resizeMode="cover"
                  />
                </View>

                {(currentBook.additionalImages || []).length > 0 && (
                  <View style={styles.additionalImagesContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {[currentBook.coverImage, ...(currentBook.additionalImages || [])].map((imageUri, index) => (
                        <TouchableOpacity key={index} onPressIn={() => setSelectedImage(imageUri)}>
                          <Image
                            source={{ uri: imageUri }}
                            style={[
                              styles.thumbnailImage,
                              {
                                borderColor: imageUri === (selectedImage || currentBook.coverImage) ? colors.white : colors.gray,
                                borderWidth: imageUri === (selectedImage || currentBook.coverImage) ? 2 : 1,
                                marginRight: index < [currentBook.coverImage, ...(currentBook.additionalImages || [])].length - 1 ? 10 : 0,
                              },
                            ]}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}

                <View style={styles.detailsContainer}>
                  {currentBook.discount > 0 && (
                    <View
                      style={[
                        styles.detailBadge, 
                        {
                          backgroundColor: colors.red,
                        }
                      ]}
                    >
                      <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                        -{currentBook.discount}%
                      </Typography>
                    </View>
                  )}
                </View>
              </View>
            </View>

            <View style={[styles.sectionContainer, styles.paddedHorizontal]}>
              <View style={styles.sectionWrapper}>
                <Typography 
                  fontSize={14}
                  fontWeight="bold" 
                  color={colors.gray} 
                  numberOfLines={1} 
                  style={{ marginBottom: 2.5 }}
                >
                  {currentBook.authors.join(", ")}
                </Typography>

                <Typography 
                  fontSize={16} 
                  fontWeight="bold" 
                  color={colors.black} 
                  numberOfLines={2}
                >
                  {currentBook.title}
                </Typography>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />   

                <View style={styles.priceAndActionsRow}>
                  <View style={styles.priceColumn}>
                    {currentBook.availableQuantity === 0 && (
                      <Typography fontSize={16} fontWeight="bold" color={colors.black}>
                        Немає в наявності
                      </Typography>
                    )}

                    {currentBook.availableQuantity > 0 && (
                      <Typography
                        fontSize={currentBook.discount > 0 ? 20 : 24}
                        fontWeight="bold"
                        color={currentBook.discount > 0 ? colors.red : colors.black}
                        numberOfLines={1}
                        style={{ maxWidth: 150 }}
                      >
                        {currentBook.price}₴
                      </Typography>
                    )}

                    {currentBook.availableQuantity > 0 && currentBook.discount > 0 && (
                      <Typography
                        fontSize={14}
                        color={colors.gray}
                        numberOfLines={1}
                        style={{ maxWidth: 150, textDecorationLine: "line-through" }}
                      >
                        {currentBook.originalPrice}₴
                      </Typography>
                    )}
                  </View>

                  {!isAdmin && (  
                    <View style={styles.actionsRow}>
                      {currentBook.availableQuantity > 0 && (
                        <TouchableOpacity
                          onPress={() => {
                            startBuyAnimation();
                            setTimeout(() => {
                              buyNow(currentBook, 1);
                              router.push("/cart");
                            }, 500);
                          }}                     
                          style={[
                            styles.actionButton, 
                            {
                              height: 40,
                              paddingHorizontal: 15,
                            }
                          ]}
                        >
                          <Animated.View style={buyAnimatedStyle}>
                            <Typography fontSize={16} fontWeight="bold" color={colors.black}>
                              {t("screens.bookDetails.buttons.buy.text")}
                            </Typography>
                          </Animated.View>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        onPressIn={() => {
                          startFavoriteAnimation(!currentBook.isFavorite);
                          toggleFavorite(currentBook.id);
                        }}
                        style={[
                          styles.actionButton, 
                          {
                            width: 40,
                            height: 40,
                          }
                        ]}
                      >
                        <Animated.View style={favoriteAnimatedStyle}>
                          <Icon 
                            iconSet="Ionicons"
                            iconName={currentBook.isFavorite ? "heart" : "heart-outline"} 
                            iconSize={24} 
                            iconColor={currentBook.isFavorite ? colors.red : colors.black} 
                          />
                        </Animated.View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPressIn={() => {
                          startCartAnimation(!currentBook.inCart);
                          toggleCart(currentBook);
                        }}
                        style={[
                          styles.actionButton, 
                          {
                            width: 40,
                            height: 40,
                          }
                        ]}
                        disabled={currentBook.availableQuantity === 0}
                      >
                        <Animated.View style={cartAnimatedStyle}>
                          <Icon
                            iconSet="Ionicons"
                            iconName={currentBook.inCart ? "bag-check" : "bag-add-outline"}
                            iconSize={24}
                            iconColor={currentBook.availableQuantity === 0 ? colors.grayTint1 : colors.black}
                          />
                        </Animated.View>
                      </TouchableOpacity>                    
                    </View>
                  )}
                </View>
              </View>
            </View>

            {sections.map((section, sectionIndex) => {
              if (section.isVisibleItems === false) return null;

              return (
                <View 
                  key={`section-${sectionIndex}`}
                  style={[styles.sectionContainer, styles.paddedHorizontal]}
                >
                  <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                    {section.title}
                  </Typography>

                  <View style={styles.sectionWrapper}>
                    {section.items.map((item, itemIndex) => (
                      <View key={`item-${itemIndex}`}>
                        {section.type === "attribute" && (
                          <View 
                            style={{
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography
                              fontSize={14}
                              fontWeight="medium"
                              color={colors.gray}
                              numberOfLines={1}
                              style={{ marginBottom: 2.5 }}
                            >
                              {item.label}
                            </Typography>

                            <Typography
                              fontSize={16}
                              fontWeight="bold"
                              color={colors.black}
                              numberOfLines={1}
                            >
                              {item.value}
                            </Typography>
                          </View>
                        )}

                        {section.type === "text" && (
                          <Typography
                            fontSize={16}
                            fontWeight="medium"
                            color={colors.black}
                            numberOfLines={5}
                          >
                            {item.value}
                          </Typography>
                        )}
                        
                        {(itemIndex < section.items.length - 1 || !!section.button) && (
                          <View
                            style={[
                              styles.divider,
                              {
                                marginVertical: 15,
                              },
                            ]}
                          />
                        )}
                      </View>
                    ))}

                    {section.button && (
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.grayTint9,
                          borderRadius: 10,
                          padding: 10,
                        }}
                        onPress={section.button.onPress}
                        activeOpacity={0.7}
                      >
                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color={colors.black}
                          style={{ textAlign: "center" }}
                        >
                          {section.button.label}
                        </Typography>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>     
      )}
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  contentContainer: {
    flexDirection: "column",
    gap: 15,
  },
  coverImageContainer: {
    alignItems: "center",
  },
  coverImage: { 
    width: 200,
    height: 294,
    borderColor: colors.gray,
    borderTopLeftRadius: 4, 
    borderTopRightRadius: 12, 
    borderBottomRightRadius: 12, 
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  additionalImagesContainer: { 
    alignItems: "center", 
    marginTop: 15, 
  },
  thumbnailImage: { 
    width: 50,
    height: 73,
  },
  detailsContainer: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  detailBadge: {
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  sectionContainer: {
    flex: 1,
  },
  sectionWrapper: { 
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: { 
    marginBottom: 5,
  },
  priceAndActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  priceColumn: {
    flexDirection: "column",
    justifyContent: "center",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  actionButton: {
    backgroundColor: colors.white,
    borderColor: colors.black,
    borderWidth: 1.5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.grayTint5,
    opacity: 0.3,
  },
  padded: {
    padding: 15,
  },
  paddedVertical: {
    paddingVertical: 15,
  },
  paddedHorizontal: {
    paddingHorizontal: 15,
  },
});

export default BookDetailsScreen;
