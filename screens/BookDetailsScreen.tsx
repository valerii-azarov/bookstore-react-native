import { useRef, useState, useMemo, useEffect } from "react";
import { Alert, View, Image, TouchableOpacity, RefreshControl, Platform, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { useBookStore } from "@/stores/bookStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectBook, 
  selectBookStatus, 
  selectBookResponse, 
  selectLoadBookById, 
  selectDeleteBook, 
  selectRefreshBook,
} from "@/selectors/bookSelectors";
import { selectToggleCart } from "@/selectors/cartSelectors";
import { selectToggleFavorite } from "@/selectors/favoritesSelectors";
import { selectIsAdmin } from "@/selectors/authSelectors";

import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";

import BookDetailsWrapper from "@/components/BookDetailsWrapper";
import SkeletonBookDetails from "@/components/SkeletonBookDetails";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import Typography from "@/components/Typography";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const BookDetailsScreen = () => {
  const insets = useSafeAreaInsets();

  const router = useRouter();
  const { bookId } = useLocalSearchParams<{ bookId: string }>();  

  const t = useTranslation();
  const isAdmin = useAuthStore(selectIsAdmin);
  
  const book = useBookStore(selectBook);
  const bookStatus = useBookStore(selectBookStatus);
  const bookResponse = useBookStore(selectBookResponse);
  
  const loadBookById = useBookStore(selectLoadBookById);
  const deleteBook = useBookStore(selectDeleteBook); 
  const refreshBook = useBookStore(selectRefreshBook);

  const toggleCart = useCartStore(selectToggleCart);

  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const imagesBlockRef = useRef<View>(null);
  const titleBlockRef = useRef<View>(null);
  const priceBlockRef = useRef<View>(null);
  const footerRef = useRef<View>(null);
  
  const scrollY = useSharedValue(0);
  const imagesBlockPosition = useSharedValue(0);
  const titleBlockPosition = useSharedValue(0);
  const priceBlockPosition = useSharedValue(0);
  const footerHeight = useSharedValue(0);
  
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [isExpandedParams, setIsExpandedParams] = useState<boolean>(false);
  const [isExpandedDescription, setIsExpandedDescription] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pullToRefresh = () => {
    refreshBook()
      .then(() => setIsPulling(true))
      .finally(() => setIsPulling(false));
  };

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
    if (!isEditing) {
      scrollToTitleBlock();
    }
  };  

  const confirmDeleteBook = () => {
    Alert.alert(
      t("alerts.confirmDeleteBook.title"),
      t("alerts.confirmDeleteBook.message"),
      [
        {
          text: t("alerts.static.cancel"),
          style: "cancel",
        },
        {
          text: t("alerts.confirmDeleteBook.confirm"),
          style: "destructive",
          onPress: async () => {
            await deleteBook(bookId)
              .then(() => {
                Alert.alert(
                  t("alerts.confirmDeleteBook.success.title"),
                  t("alerts.confirmDeleteBook.success.message"),
                  [{ text: "OK", onPress: () => router.back() }]
                );
              })
              .catch((error) => {
                Alert.alert(
                  t("alerts.static.error.title"),
                  error.message || t("alerts.confirmDeleteBook.error.message")
                );
              });
          },
        },
      ]
    );
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const scrollToTitleBlock = () => {
    if (titleBlockPosition.value > 0 && scrollViewRef.current) {
      const scrollPosition = titleBlockPosition.value - insets.top;
      scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
    }
  };
  
  const measureImagesBlockPosition = () => {
    imagesBlockRef.current?.measureInWindow((_x, y, _width, height) => {
      imagesBlockPosition.value = y + height + scrollY.value;
    });
  };

  const measureTitleBlockPosition = () => {
    titleBlockRef.current?.measureInWindow((_x, y, _width, height) => {
      titleBlockPosition.value = y + scrollY.value;
    });
  };

  const measurePriceBlockPosition = () => {
    priceBlockRef.current?.measureInWindow((_x, y, _width, height) => {
      priceBlockPosition.value = y + height + scrollY.value;
    });
  };

  const measureFooterHeight = () => {
    footerRef.current?.measureInWindow((_x, _y, _width, height) => {
      footerHeight.value = height;
    });
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (!imagesBlockPosition.value) {
      return {
        opacity: withTiming(1, { duration: 200 }),
      };
    }
    const isTitleBlockVisible = scrollY.value < imagesBlockPosition.value - insets.top - 15;
    return {
      opacity: withTiming(isTitleBlockVisible ? 1 : 0, { duration: 200 }),
    };
  });

  const footerAnimatedStyle = useAnimatedStyle(() => {
    // console.log("scrollY:", scrollY.value, "priceBlockPosition:", priceBlockPosition.value, "isEditing:", isEditing);
    
    if (!priceBlockPosition.value || !footerHeight.value) {
      return {
        transform: [
          { 
            translateY: withTiming(footerHeight.value || 75, { duration: 300 }),
          }
        ],
      };
    }
    const isPriceBlockOutOfView = scrollY.value >= priceBlockPosition.value - insets.top;
    return {
      transform: [
        {
          translateY: withTiming(
            !isEditing && isPriceBlockOutOfView ? 0 : footerHeight.value + insets.bottom,
            { duration: 300 }
          ),
        },
      ],
    };
  });

  const spacerAnimatedStyle = useAnimatedStyle(() => {
    const isBlock4Visible = scrollY.value < priceBlockPosition.value;
    return {
      height: withTiming(isEditing || isBlock4Visible ? 0 : footerHeight.value, { duration: 100 }),
    };
  });

  const memoizedParameters = useMemo(() => {
    return [
      { 
        field: "images",
        label: t("screens.bookDetails.labels.images"),
      },
      { 
        field: "backgroundColor",
        label: t("screens.bookDetails.labels.backgroundColor"),
      },
      { 
        field: "title",
        label: t("screens.bookDetails.labels.title"),
      },
      { 
        field: "authors",
        label: t("screens.bookDetails.labels.authors"),
      },
    ]
  }, [t]);

  const memoizedGenres = useMemo(() => {
    return book?.genres ? book.genres.map((key) => t(`genres.${key}`)) : [];
  }, [t, book]);

  const memoizedDetails = useMemo(() => {
    if (!book) return [];
    return [
      { 
        field: "pageCount",
        label: t("screens.bookDetails.labels.pageCount"), 
        value: book.pageCount || "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "publisher",
        label: t("screens.bookDetails.labels.publisher"), 
        value: book.publisher || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "coverType",
        label: t("screens.bookDetails.labels.coverType"), 
        value: book.coverType ? t(`coverTypes.${book.coverType}`) : "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "publicationYear",
        label: t("screens.bookDetails.labels.publicationYear"),
        value: book.publicationYear || "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "language",
        label: t("screens.bookDetails.labels.language"), 
        value: book.language ? t(`languages.${book.language}`) : "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "size",
        label: t("screens.bookDetails.labels.size"), 
        value: book.size || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "weight",
        label: t("screens.bookDetails.labels.weight"), 
        value: book.weight || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "illustrations",
        label: t("screens.bookDetails.labels.illustrations"), 
        value: t(`screens.bookDetails.values.illustrations.${book.illustrations ? "contains" : "notContains"}`),
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "bookType",
        label: t("screens.bookDetails.labels.bookType"), 
        value: book.bookType ? t(`bookTypes.${book.bookType}`) : "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "paperType",
        label: t("screens.bookDetails.labels.paperType"), 
        value: book.paperType ? t(`paperTypes.${book.paperType}`) : "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "isbn",
        label: t("screens.bookDetails.labels.isbn"), 
        value: book.isbn || "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "sku",
        label: t("screens.bookDetails.labels.sku"), 
        value: book.sku || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "quantity",
        label: t("screens.bookDetails.labels.quantity"), 
        value: book.availableQuantity || 0, 
        isVisible: isAdmin,
        isEditable: true,
      },
      { 
        label: t("screens.bookDetails.labels.createdAt"), 
        value: book.createdAt ? new Date(book.createdAt).toLocaleString() : "-", 
        isVisible: isAdmin,
        isEditable: false,
      },
      { 
        label: t("screens.bookDetails.labels.updatedAt"), 
        value: book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "-", 
        isVisible: isAdmin,
        isEditable: false,
      },
    ]
  }, [t, book, isAdmin]);

  useEffect(() => {
    if (!isEditing) {
      setTimeout(() => {
        measurePriceBlockPosition();
      }, 100);
    }
  }, [isEditing]);
  
  useEffect(() => {
    if (bookId) {
      loadBookById(bookId);
    }
  }, [bookId, loadBookById]);
  
  if (bookStatus === "loading") {
    return (
      <BookDetailsWrapper>
        <SkeletonBookDetails />
      </BookDetailsWrapper>
    );
  }

  if (!book && bookResponse?.status === "error") {
    return (
      <BookDetailsWrapper>
        <View style={styles.loadingContainer}> 
          <ErrorWithRetry 
            message={t("screens.bookDetails.messages.error.text")}
            subMessage={t("screens.bookDetails.messages.error.subText")}
            buttonText={t("screens.bookDetails.buttons.error.text")}
            onRetry={refreshBook} 
          />
        </View>
      </BookDetailsWrapper>
    );
  }

  if (!book) {
    return (
      <BookDetailsWrapper>
        <View style={styles.loadingContainer}> 
          <Empty 
            message={t("screens.bookDetails.messages.empty.text")}
            subMessage={t("screens.bookDetails.messages.empty.subText")} 
          />
        </View>
      </BookDetailsWrapper>
    );
  }

  return (
    <BookDetailsWrapper 
      backgroundColor={book.backgroundColor || colors.grayTint6}
      showHeader={false}
    >
      <Animated.View
        style={[
          styles.headerContainer,
          headerAnimatedStyle,
        ]}
      >
        <Header
          iconLeft={
            <BackButton 
              style={{
                backgroundColor: book.backgroundColor ? colorConverter.lighterHexColor(book.backgroundColor) : colors.grayTint4,
              }}
            />
          }
          enableAbsolutePosition
          style={{
            paddingHorizontal: 15,
            backgroundColor: "transparent",
          }}
        />
      </Animated.View>
      
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollViewContainer,
          { 
            paddingBottom: Platform.OS === "ios" ? insets.bottom : insets.bottom + 10,
          },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isPulling}
            onRefresh={pullToRefresh}
          />
        }
      >
        <View ref={imagesBlockRef} onLayout={measureImagesBlockPosition} style={styles.imagesContainer}>
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
        </View>

        <View ref={titleBlockRef} onLayout={measureTitleBlockPosition} style={styles.titleContainer}>
          <Typography fontSize={14} fontWeight="bold" color={colors.whiteTint1} numberOfLines={1}>
            {book.authors.join(", ")}
          </Typography>

          <Typography fontSize={24} fontWeight="bold" color={colors.white} numberOfLines={1} style={styles.titleText}>
            {book.title}
          </Typography>
        </View>

        <View style={styles.contentContainer}> 
          {isEditing && (
            <View
              style={[
                styles.blockContainer,
                {
                  backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
                },
              ]}
            >
              <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.blockTitle}>
                {t("screens.bookDetails.titles.editing")}
              </Typography>
            
              <View style={styles.parametersContainer}>
                {memoizedParameters.map(({ field, label }, index) => (
                  <View key={index} style={styles.parameterRow}>
                    <View style={{ width: "68%" }}>
                      <Typography fontSize={16} fontWeight="medium" color={colors.white} numberOfLines={1}>
                        {label}
                      </Typography>
                    </View>
            
                    <View style={{ width: "28%" }}>
                      <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity
                          onPressIn={() =>
                            router.push({
                              pathname: "/(admin)/(modals)/edit-book/[field]",
                              params: { field: field || "defaultField", data: JSON.stringify(book) },
                            })
                          }
                        >
                          <Typography fontSize={16} fontWeight="bold" color={colors.white} style={{ textDecorationLine: "underline" }}>
                            {t("screens.bookDetails.buttons.edit.text")}
                          </Typography>
                        </TouchableOpacity>
                      </View>  
                    </View>
                  </View>
                ))}
              </View>
            </View>            
          )}
          
          <View
            ref={priceBlockRef}
            onLayout={measurePriceBlockPosition}
            style={[
              styles.blockContainer,
              { 
                backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
              },
            ]}
          >
            <View
              style={[
                styles.priceContainer,
                {
                  marginBottom: !isAdmin && book.availableQuantity === 0 ? 0 : isAdmin && !isEditing ? 0 : 15,
                },
              ]}
            >
              <View style={styles.priceRow}>
                <Typography fontSize={28} fontWeight="bold" color={book.discount > 0 ? colors.red : colors.white}>
                  {`${book.price}₴`}
                </Typography>

                {book.discount > 0 && (
                  <Typography fontSize={18} color={colors.grayTint5} style={styles.originalPrice}>
                    {book.originalPrice}
                  </Typography>
                )}
              </View>

              {book.discount > 0 && (
                <View
                  style={[
                    styles.discountBadge,
                    {
                      paddingVertical: 3,
                      paddingHorizontal: 6,
                    }
                  ]} 
                >
                  <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                    {`-${book.discount}%`}
                  </Typography>
                </View>
              )}
            </View>

            {!isAdmin && book.availableQuantity === 0 && (
              <Typography fontSize={16} fontWeight="bold" color={colors.grayTint5}>
                {t("screens.bookDetails.static.outOfStock")}
              </Typography>
            )}
            
            {!isAdmin && book.availableQuantity > 0 && (
              <View style={styles.actionButtonsContainer}>
                <TouchableOpacity
                  onPressIn={() => {}}
                  style={[
                    styles.actionButton,
                    {
                      flex: 1,
                      backgroundColor: colors.white,
                      borderColor: colors.black,
                      borderRadius: 25,
                      borderWidth: 1.5,
                      marginRight: 10,
                    },
                  ]}
                >
                  <Typography fontSize={18} fontWeight="bold" color={colors.black}>
                    {t("screens.bookDetails.buttons.buy.text")}
                  </Typography>
                </TouchableOpacity>

                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity
                    onPressIn={() => toggleCart(book)}
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: colors.black,
                        borderRadius: 30,
                      },
                    ]}
                  >
                    <Icon 
                      name={book?.inCart ? "bag-check" : "bag-add-outline"} 
                      size={24} 
                      color={colors.white} 
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPressIn={() => toggleFavorite(book.id)}
                    style={[
                      styles.actionButton,
                      {
                        backgroundColor: colors.black,
                        borderRadius: 30,
                      },
                    ]}
                  >
                    <Icon 
                      name={book.isFavorite ? "heart" : "heart-outline"} 
                      size={24} 
                      color={book.isFavorite ? colors.red : colors.white} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {isEditing && (
              <View style={{ alignItems: "flex-start" }}>
                <TouchableOpacity
                  onPressIn={() =>
                    router.push({
                      pathname: "/(admin)/(modals)/edit-book/[field]",
                      params: { field: "pricing", data: JSON.stringify(book) },
                    })
                  }
                >
                  <Typography fontSize={16} fontWeight="bold" color={colors.white} style={styles.link}>
                    {t("screens.bookDetails.buttons.edit.text")}
                  </Typography>
                </TouchableOpacity>
              </View>  
            )}
          </View>

          <View
            style={[
              styles.blockContainer,
              { 
                backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
              },
            ]}
          >
            <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.blockTitle}>
              {t("screens.bookDetails.titles.genres")}
            </Typography>

            <Typography fontSize={16} fontWeight="medium" color={colors.white}>
              {memoizedGenres.join(", ")}
            </Typography>

            {isEditing && (
              <View style={{ alignItems: "flex-start", marginTop: 15 }}>
                <TouchableOpacity
                  onPressIn={() =>
                    router.push({
                      pathname: "/(admin)/(modals)/edit-book/[field]",
                      params: { field: "genres", data: JSON.stringify(book) },
                    })
                  }
                >
                  <Typography fontSize={16} fontWeight="bold" color={colors.white} style={styles.link}>
                    {t("screens.bookDetails.buttons.edit.text")}
                  </Typography>
                </TouchableOpacity>
              </View>
            )} 
          </View>

          <View
            style={[
              styles.blockContainer,
              { 
                backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
              },
            ]}
          >
            <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.blockTitle}>
              {t("screens.bookDetails.titles.parameters")}
            </Typography>
             
            <View style={styles.detailsContainer}>
              {!isEditing && (isExpandedParams ? memoizedDetails : memoizedDetails.slice(0, 5)).map((detail, index) => detail.isVisible !== false && (
                <View key={index} style={styles.detailRow}>
                  <View style={{ width: "48%" }}>
                    <Typography fontSize={16} fontWeight="medium" color={colors.grayTint5} numberOfLines={1}>
                      {detail.label}
                    </Typography>
                  </View>

                  <View style={{ width: "48%" }}>
                    <Typography fontSize={16} fontWeight="bold" color={colors.white} numberOfLines={1} style={{ textAlign: "left" }}>
                      {detail.value}
                    </Typography>
                  </View>
                </View>
              ))}

              {isEditing && (memoizedDetails.map(({ field, label, value, isEditable }, index) => (
                <View key={index} style={{ flexDirection: "column" }}>
                  <Typography fontSize={14} fontWeight="medium" color={colors.grayTint5}>
                    {label}
                  </Typography>
          
                  <View style={styles.detailRow}>
                    <View style={{ width: isEditable ? "74%" : "100%" }}>
                      <Typography fontSize={16} fontWeight="bold" color={colors.white} numberOfLines={1}>
                        {value}
                      </Typography>
                    </View>

                    {isEditable && (
                      <View style={{ alignItems: "flex-end", width: "22%" }}>
                        <TouchableOpacity
                          onPressIn={() =>
                            router.push({
                              pathname: "/(admin)/(modals)/edit-book/[field]",
                              params: { field: field || "defaultField", data: JSON.stringify(book) },
                            })
                          }
                        >
                          <Typography 
                            fontSize={16} 
                            fontWeight="bold" 
                            color={colors.white} 
                            style={[
                              styles.link,
                              { 
                                textAlign: "right",
                              }, 
                            ]}
                          >
                            {t("screens.bookDetails.buttons.edit.text")}
                          </Typography>
                        </TouchableOpacity>
                      </View>  
                    )}  
                  </View>
                </View>
              )))}

              {!isEditing && (
                <TouchableOpacity onPressIn={() => setIsExpandedParams(!isExpandedParams)}>
                  <Typography fontSize={16} fontWeight="bold" color={colors.white} style={styles.link}>
                    {t(`screens.bookDetails.buttons.${isExpandedParams ? "collapse" : "expand"}.text`)}
                  </Typography>
                </TouchableOpacity>
              )}
            </View>  
          </View>

          <View
            style={[
              styles.blockContainer,
              { 
                backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
              },
            ]}
          >
            <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.blockTitle}>
              {t("screens.bookDetails.titles.about")}
            </Typography>

            <Typography fontSize={16} fontWeight="medium" color={colors.white} numberOfLines={isEditing ? 5 : isExpandedDescription ? undefined : 5}>
              {book.description}
            </Typography>

            <View style={{ alignItems: "flex-start", marginTop: 15 }}>
              <TouchableOpacity
                onPressIn={() =>
                  isEditing
                    ? router.push({
                        pathname: "/(admin)/(modals)/edit-book/[field]",
                        params: { field: "description", data: JSON.stringify(book) },
                      })
                    : setIsExpandedDescription(!isExpandedDescription)
                }
              >
                <Typography fontSize={16} fontWeight="bold" color={colors.white} style={styles.link}>
                  {t(`screens.bookDetails.buttons.${isEditing ? "edit" : isExpandedDescription ? "collapse" : "expand"}.text`)}
                </Typography>
              </TouchableOpacity>
            </View>
          </View>

          {isAdmin && (
            <View
              style={[
                styles.blockContainer,
                { 
                  backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
                },
              ]}
            >
              <View style={{ alignItems: "flex-start" }}>
                <TouchableOpacity onPressIn={toggleEdit}>
                  <Typography fontSize={16} fontWeight="bold" color={colors.white} style={{ textDecorationLine: "underline" }}>
                    {t(`screens.bookDetails.buttons.${isEditing ? "back" : "adminEdit"}.text`)}
                  </Typography>
                </TouchableOpacity>
              </View>  
            </View>
          )}

          {isAdmin && (
            <View
              style={[
                styles.blockContainer,
                { 
                  backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
                },
              ]}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPressIn={confirmDeleteBook}>
                  <Typography fontSize={16} fontWeight="bold" color={colors.red} style={{ textDecorationLine: "underline" }}>
                    {t(`screens.bookDetails.buttons.delete.text`)}
                  </Typography>
                </TouchableOpacity>
              </View>  
            </View>
          )}
        </View>

        <Animated.View style={spacerAnimatedStyle} />
      </Animated.ScrollView>

      <Animated.View
        ref={footerRef}
        onLayout={measureFooterHeight}
        style={[
          styles.footerContainer,
          {
            backgroundColor: book.backgroundColor ? colorConverter.darkerHexColor(book.backgroundColor) : colors.grayTint2,
            borderTopColor: book.backgroundColor ? colorConverter.lighterHexColor(book.backgroundColor) : colors.grayTint6,
            paddingBottom: Platform.OS === "ios" ? insets.bottom : 10 + insets.bottom,
          },
          footerAnimatedStyle,
        ]}
      >
        <View style={styles.footerPriceContainer}>
          <Typography fontSize={book.discount > 0 ? 24 : 32} fontWeight="bold" color={book.discount > 0 ? colors.red : colors.white}>
            {`${book.price}₴`}
          </Typography>

          {book.discount > 0 && (
            <View style={styles.footerDiscountContainer}>
              <Typography fontSize={18} color={colors.grayTint5} style={{ textDecorationLine: "line-through" }}>
                {book.originalPrice}
              </Typography>

              <View 
                style={[
                  styles.discountBadge,
                  {
                    paddingVertical: 1,
                    paddingHorizontal: 4,
                  }
                ]}
              >
                <Typography fontSize={16} fontWeight="bold" color={colors.white}>
                  {`-${book.discount}%`}
                </Typography>
              </View>
            </View>
          )}
        </View>

        {!isAdmin && (  
          <View style={styles.actionButtonsRow}>
            <TouchableOpacity
              onPressIn={() => toggleCart(book)}
              style={[
                styles.actionButton,
                {
                  backgroundColor: colors.black,
                  borderRadius: 30,
                },
              ]}
            >
              <Icon 
                name={book?.inCart ? "bag-check" : "bag-add-outline"} 
                size={24} 
                color={colors.white} 
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPressIn={() => toggleFavorite(book.id)}
              style={[
                styles.actionButton,
                {
                  backgroundColor: colors.black,
                  borderRadius: 30,
                },
              ]}
            >
              <Icon 
                name={book.isFavorite ? "heart" : "heart-outline"}
                size={24} 
                color={book.isFavorite ? colors.red : colors.white}
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </BookDetailsWrapper>
  );
};

const styles = StyleSheet.create({
  loadingContainer: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
  },
  headerContainer: { 
    position: "absolute", 
    top: Platform.OS === "android" ? 15 : 0, 
    left: 0, 
    right: 0, 
    zIndex: 10,
  },
  scrollViewContainer: {
    flexGrow: 1, 
    paddingTop: 35, 
    paddingHorizontal: 15,
  },
  imagesContainer: {
    flexDirection: "column",
    marginBottom: 15,
  },
  coverImageContainer: { 
    paddingVertical: 15,
    alignItems: "center",
  },
  coverImage: { 
    width: 300, 
    height: 441, 
    borderColor: colors.gray, 
    borderTopLeftRadius: 4, 
    borderTopRightRadius: 12, 
    borderBottomRightRadius: 12, 
    borderBottomLeftRadius: 4,
    borderWidth: 2,
  },
  additionalImagesContainer: { 
    paddingVertical: 10,
    alignItems: "center",
  },
  thumbnailImage: { 
    width: 60, 
    height: 88,
  },
  titleContainer: { 
    justifyContent: "center", 
    alignItems: "center",
  },
  titleText: { 
    marginBottom: 15,
  },
  contentContainer: {
    flexDirection: "column",
    gap: 15,
  },
  blockContainer: { 
    borderRadius: 15, 
    paddingVertical: 20, 
    paddingHorizontal: 15,
  },
  blockTitle: { 
    marginBottom: 15,
  },
  link: {
    textDecorationLine: "underline",
  },
  parametersContainer: {
    flexDirection: "column",
    gap: 15,
  },
  parameterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 5,
  },
  originalPrice: {
    textDecorationLine: "line-through",
  },
  discountBadge: {
    backgroundColor: colors.red,
    borderRadius: 4,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtonsRow: {
    flexDirection: "row", 
    gap: 10,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    flexDirection: "column",
    gap: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerPriceContainer: { 
    flexDirection: "column", 
    alignItems: "flex-start",
  }, 
  footerDiscountContainer: { 
    flexDirection: "row", 
    alignItems: "baseline",
    gap: 5,
  },
});

export default BookDetailsScreen;
