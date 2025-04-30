import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence } from "react-native-reanimated";
import { format } from "date-fns";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { useBookStore } from "@/stores/bookStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectBook, 
  selectBookStatus, 
  selectBookResponse, 
  selectSetBookById,
  selectLoadBookById,
  selectResetBook,
} from "@/selectors/bookSelectors";
import { selectIsAdmin } from "@/selectors/authSelectors";
import { selectToggleCart } from "@/selectors/cartSelectors";
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

  const book = useBookStore(selectBook);
  const bookStatus = useBookStore(selectBookStatus);
  const bookResponse = useBookStore(selectBookResponse);
  
  const setBookById = useBookStore(selectSetBookById);
  const loadBookById = useBookStore(selectLoadBookById);
  const resetBook = useBookStore(selectResetBook); 

  const toggleCart = useCartStore(selectToggleCart);

  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isLoading = bookStatus === "loading";
  const isError = !isLoading && bookResponse?.status === "error";

  const cartScale = useSharedValue(1);
  const favoriteScale = useSharedValue(1);
  
  const cartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartScale.value }],
  }));

  const favoriteAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

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

  useEffect(() => {
    if (bookId && isConnected) {
      setBookById(bookId);
      loadBookById();
    }
    return () => resetBook();
  }, [bookId, isConnected]);

  return (
    <ViewWrapper
      title={t("screens.bookDetails.header.text")}
      onBackPress={() => router.back()}
      hideFooter
    >
      {!isConnected && <ErrorNetwork />}

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

      {isConnected && !isLoading && !isError && book !== null && (
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
                    backgroundColor: book.backgroundColor ? colorConverter.lighterHexColor(book.backgroundColor) : colors.grayTint5,
                    borderRadius: 0,
                  }
                ]}
              > 
                <View style={styles.coverImageContainer}>
                  <Image
                    style={styles.coverImage}
                    source={{ uri: selectedImage || book.coverImage }}
                    resizeMode="cover"
                  />
                </View>

                {(book.additionalImages || []).length > 0 && (
                  <View style={styles.additionalImagesContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {[book.coverImage, ...(book.additionalImages || [])].map((imageUri, index) => (
                        <TouchableOpacity key={index} onPressIn={() => setSelectedImage(imageUri)}>
                          <Image
                            style={[
                              styles.thumbnailImage,
                              {
                                borderColor: imageUri === (selectedImage || book.coverImage) ? colors.white : colors.gray,
                                borderWidth: imageUri === (selectedImage || book.coverImage) ? 2 : 1,
                                marginRight: index < [book.coverImage, ...(book.additionalImages || [])].length - 1 ? 10 : 0,
                              },
                            ]}
                            source={{ uri: imageUri }}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}

                <View style={styles.detailsContainer}>
                  {book.discount > 0 && (
                    <View
                      style={[
                        styles.detailBadge, 
                        {
                          backgroundColor: colors.red,
                        }
                      ]}
                    >
                      <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                        -{book.discount}%
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
                  {book.authors.join(", ")}
                </Typography>

                <Typography 
                  fontSize={16} 
                  fontWeight="bold" 
                  color={colors.black} 
                  numberOfLines={2}
                >
                  {book.title}
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
                    {book.availableQuantity === 0 && (
                      <Typography fontSize={16} fontWeight="bold" color={colors.black}>
                        Немає в наявності
                      </Typography>
                    )}

                    {book.availableQuantity > 0 && (
                      <Typography
                        fontSize={book.discount > 0 ? 20 : 24}
                        fontWeight="bold"
                        color={book.discount > 0 ? colors.red : colors.black}
                        numberOfLines={1}
                        style={{ maxWidth: 150 }}
                      >
                        {book.price}₴
                      </Typography>
                    )}

                    {book.availableQuantity > 0 && book.discount > 0 && (
                      <Typography
                        fontSize={14}
                        color={colors.gray}
                        numberOfLines={1}
                        style={{ maxWidth: 150, textDecorationLine: "line-through" }}
                      >
                        {book.originalPrice}₴
                      </Typography>
                    )}
                  </View>

                  {!isAdmin && (  
                    <View style={styles.actionsRow}>
                      {book.availableQuantity > 0 && (
                        <TouchableOpacity
                          onPress={() => {}}
                          style={[
                            styles.actionButton, 
                            {
                              height: 40,
                              paddingHorizontal: 15,
                            }
                          ]}
                        >
                          <Typography fontSize={16} fontWeight="bold" color={colors.black}>
                            {t("screens.bookDetails.buttons.buy.text")}
                          </Typography>
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity
                        onPressIn={() => {
                          startFavoriteAnimation(!book.isFavorite);
                          toggleFavorite(book.id);
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
                            iconName={book.isFavorite ? "heart" : "heart-outline"} 
                            iconSize={24} 
                            iconColor={book.isFavorite ? colors.red : colors.black} 
                          />
                        </Animated.View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPressIn={() => {
                          startCartAnimation(!book.inCart);
                          toggleCart(book);
                        }}
                        style={[
                          styles.actionButton, 
                          {
                            width: 40,
                            height: 40,
                          }
                        ]}
                        disabled={book.availableQuantity === 0}
                      >
                        <Animated.View style={cartAnimatedStyle}>
                          <Icon
                            iconSet="Ionicons"
                            iconName={book.inCart ? "bag-check" : "bag-add-outline"}
                            iconSize={24}
                            iconColor={book.availableQuantity === 0 ? colors.grayTint1 : colors.black}
                          />
                        </Animated.View>
                      </TouchableOpacity>                    
                    </View>
                  )}
                </View>
              </View>
            </View>

            {isAdmin && (
              <View style={[styles.sectionContainer, styles.paddedHorizontal]}>
                <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                  {t("screens.bookDetails.titles.details")}
                </Typography>

                <View style={styles.sectionWrapper}>
                  <View style={styles.parameterColumn}>
                    <Typography
                      fontSize={14}
                      fontWeight="medium"
                      color={colors.gray}
                      numberOfLines={1}
                      style={{ marginBottom: 2.5 }}
                    >
                      {t("screens.bookDetails.labels.sku")}
                    </Typography>

                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      color={colors.black}
                      numberOfLines={2}
                    >
                      {book.sku || "-"}
                    </Typography>
                  </View>

                  <View
                    style={[
                      styles.divider,
                      {
                        marginVertical: 15,
                      },
                    ]}
                  />

                  <View style={styles.parameterColumn}>
                    <Typography
                      fontSize={14}
                      fontWeight="medium"
                      color={colors.gray}
                      numberOfLines={1}
                      style={{ marginBottom: 2.5 }}
                    >
                      {t("screens.bookDetails.labels.quantity")}
                    </Typography>

                    <Typography
                      fontSize={16}
                      fontWeight="bold"
                      color={colors.black}
                      numberOfLines={1}
                    >
                      {book.availableQuantity || 0}
                    </Typography>
                  </View>   

                  {book.createdAt && (  
                    <>
                      <View
                        style={[
                          styles.divider,
                          {
                            marginVertical: 15,
                          },
                        ]}
                      />

                      <View style={styles.parameterColumn}>
                        <Typography
                          fontSize={14}
                          fontWeight="medium"
                          color={colors.gray}
                          numberOfLines={1}
                          style={{ marginBottom: 2.5 }}
                        >
                          {t("screens.bookDetails.labels.createdAt")}
                        </Typography>

                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color={colors.black}
                          numberOfLines={1}
                        >
                          {format(new Date(book.createdAt), "dd.MM.yyyy HH:mm")}
                        </Typography>
                      </View>
                    </>
                  )}

                  {book.updatedAt && (
                    <>
                      <View
                        style={[
                          styles.divider,
                          {
                            marginVertical: 15,
                          },
                        ]}
                      />

                      <View style={styles.parameterColumn}>
                        <Typography
                          fontSize={14}
                          fontWeight="medium"
                          color={colors.gray}
                          numberOfLines={1}
                          style={{ marginBottom: 2.5 }}
                        >
                          {t("screens.bookDetails.labels.updatedAt")}
                        </Typography>

                        <Typography
                          fontSize={16}
                          fontWeight="bold"
                          color={colors.black}
                          numberOfLines={1}
                        >
                          {format(new Date(book.updatedAt), "dd.MM.yyyy HH:mm")}
                        </Typography>
                      </View> 
                    </>
                  )}              
                </View>
              </View>
            )}
            
            <View style={[styles.sectionContainer, styles.paddedHorizontal]}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.bookDetails.titles.characteristics")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <View style={styles.parameterColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.bookDetails.labels.pageCount")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={2}
                  >
                    {book.pageCount || "-"}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />

                <View style={styles.parameterColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.bookDetails.labels.publisher")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                  >
                    {book.publisher || "-"}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />

                <View style={styles.parameterColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.bookDetails.labels.coverType")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                  >
                    {book.coverType ? t(`coverTypes.${book.coverType}`) : "-"}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />
                
                <View style={styles.parameterColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.bookDetails.labels.publicationYear")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                  >
                    {book.publicationYear || "-"}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />
                
                <View style={styles.parameterColumn}>
                  <Typography
                    fontSize={14}
                    fontWeight="medium"
                    color={colors.gray}
                    numberOfLines={1}
                    style={{ marginBottom: 2.5 }}
                  >
                    {t("screens.bookDetails.labels.language")}
                  </Typography>

                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    numberOfLines={1}
                  >
                    {book.language ? t(`languages.${book.language}`) : "-"}
                  </Typography>
                </View>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />

                <TouchableOpacity
                  style={{ 
                    backgroundColor: colors.grayTint9,
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onPress={() => { 
                    router.push("/book-characteristics");
                  }}
                  activeOpacity={0.7}
                >
                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    style={{ textAlign: "center" }}
                  >
                    {t("screens.bookDetails.buttons.viewAllCharacteristics.text")}
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>

            <View style={[styles.sectionContainer, styles.paddedHorizontal]}>
              <Typography fontSize={16} fontWeight="bold" style={styles.sectionTitle}>
                {t("screens.bookDetails.titles.description")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <Typography
                  fontSize={16} 
                  fontWeight="medium" 
                  color={colors.black}
                  numberOfLines={5}
                >
                  {book.description}
                </Typography>

                <View
                  style={[
                    styles.divider,
                    {
                      marginVertical: 15,
                    },
                  ]}
                />

                <TouchableOpacity
                  style={{ 
                    backgroundColor: colors.grayTint9,
                    borderRadius: 10,
                    padding: 10,
                  }}
                  onPress={() => { 
                    router.push("/book-description");
                  }}
                  activeOpacity={0.7}
                >
                  <Typography
                    fontSize={16}
                    fontWeight="bold"
                    color={colors.black}
                    style={{ textAlign: "center" }}
                  >
                    {t("screens.bookDetails.buttons.viewFullDescription.text")}
                  </Typography>
                </TouchableOpacity>
              </View>
            </View>
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
  parameterColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
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
