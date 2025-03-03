import React, { useState, useRef, useMemo } from "react";
import { View, Image, TouchableOpacity, Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { Ionicons as Icon } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useAuthContext } from "@/contexts/AuthContext";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useBook } from "@/hooks/useBook";
import { colors } from "@/constants/theme";
import { colorConverter } from "@/helpers/colorConverter";

import BookDetailsWrapper from "@/components/BookDetailsWrapper";
import SkeletonBookDetails from "@/components/SkeletonBookDetails";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import RefreshButton from "@/components/RefreshButton";
import Typography from "@/components/Typography";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const BookDetailsScreen = () => {
  const insets = useSafeAreaInsets();

  const { t } = useLanguageContext();
  const { isAdmin } = useAuthContext();

  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { data, isLoading, response, refresh } = useBook(bookId);

  const scrollY = useSharedValue(0);
  const titleBlockRef = useRef<View>(null);
  const priceBlockRef = useRef<View>(null);
  const scrollViewRef = useRef<Animated.ScrollView>(null);

  const [titleBlockTop, setTitleBlockTop] = useState<number | null>(null);
  const [priceBlockTop, setPriceBlockTop] = useState<number | null>(null);
  const [isPulling, setIsPulling] = useState<boolean>(false);
  const [isExpandedParams, setIsExpandedParams] = useState<boolean>(false);
  const [isExpandedDescription, setIsExpandedDescription] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pullToRefresh = () => {
    refresh()
      .then(() => setIsPulling(true))
      .finally(() => setIsPulling(false));
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const measureTitleBlockPosition = () => {
    titleBlockRef.current?.measureInWindow((_x, y) => {
      setTitleBlockTop(y);
    });
  };

  const measurePriceBlockPosition = () => {
    priceBlockRef.current?.measureInWindow((_x, y, _width, height) => {
      setPriceBlockTop(y + height);
    });
  };

  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (titleBlockTop === null) {
      return {
        opacity: withTiming(1, { duration: 200 }),
      };
    }
    const isTitleBlockVisible = scrollY.value < titleBlockTop - insets.top;
    return {
      opacity: withTiming(isTitleBlockVisible ? 1 : 0, { duration: 200 }),
    };
  });

  const footerAnimatedStyle = useAnimatedStyle(() => {
    if (priceBlockTop === null) {
      return {
        transform: [{ translateY: withTiming(insets.bottom + 75, { duration: 300 }) }],
      };
    }
    const isPriceBlockVisible = scrollY.value >= priceBlockTop - insets.top;
    return {
      transform: [
        {
          translateY: withTiming(!isEditing && isPriceBlockVisible ? 0 : insets.bottom + 75, { duration: 300 }),
        },
      ],
    };
  });

  const memoizedGenres = useMemo(() => {
    return data?.genres ? data.genres.map((key) => t(`genres.${key}`)) : [];
  }, [t, data]);

  const memoizedDetails = useMemo(() => {
    if (!data) return [];
    return [
      { 
        field: "pageCount",
        label: t("screens.bookDetails.labels.pageCount"), 
        value: data.pageCount || "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "publisher",
        label: t("screens.bookDetails.labels.publisher"), 
        value: data.publisher || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "coverType",
        label: t("screens.bookDetails.labels.coverType"), 
        value: data.coverType ? t(`coverTypes.${data.coverType}`) : "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "publicationYear",
        label: t("screens.bookDetails.labels.publicationYear"),
        value: data.publicationYear || "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "language",
        label: t("screens.bookDetails.labels.language"), 
        value: data.language ? t(`languages.${data.language}`) : "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "size",
        label: t("screens.bookDetails.labels.size"), 
        value: data.size || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "weight",
        label: t("screens.bookDetails.labels.weight"), 
        value: data.weight || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "illustrations",
        label: t("screens.bookDetails.labels.illustrations"), 
        value: t(`screens.bookDetails.values.illustrations.${data.illustrations ? "contains" : "notContains"}`),
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "bookType",
        label: t("screens.bookDetails.labels.bookType"), 
        value: data.bookType ? t(`bookTypes.${data.bookType}`) : "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "paperType",
        label: t("screens.bookDetails.labels.paperType"), 
        value: data.paperType ? t(`paperTypes.${data.paperType}`) : "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "isbn",
        label: t("screens.bookDetails.labels.isbn"), 
        value: data.isbn || "-", 
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "sku",
        label: t("screens.bookDetails.labels.sku"), 
        value: data.sku || "-",
        isVisible: true,
        isEditable: true,
      },
      { 
        field: "quantity",
        label: t("screens.bookDetails.labels.quantity"), 
        value: data.quantity || 0, 
        isVisible: isAdmin,
        isEditable: true,
      },
      { 
        label: t("screens.bookDetails.labels.createdAt"), 
        value: data.createdAt ? new Date(data.createdAt).toLocaleString() : "-", 
        isVisible: isAdmin,
        isEditable: false,
      },
      { 
        label: t("screens.bookDetails.labels.updatedAt"), 
        value: data.updatedAt ? new Date(data.updatedAt).toLocaleString() : "-", 
        isVisible: isAdmin,
        isEditable: false,
      },
    ]
  }, [t, data, isAdmin]);

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

  const dynamicPaddingBottom = useMemo(() => {
    const basePadding = Platform.OS === "ios" ? insets.bottom : insets.bottom + 10;
    return basePadding + (isEditing ? 15 : 75);
  }, [isEditing, insets.bottom]);

  if (isLoading) {
    return (
      <BookDetailsWrapper>
        <SkeletonBookDetails />
      </BookDetailsWrapper>
    );
  }

  if (!data && response?.status === "error") {
    return (
      <BookDetailsWrapper>
        <View style={styles.loadingContainer}> 
          <ErrorWithRetry 
            message={t("screens.bookDetails.messages.error.text")}
            subMessage={t("screens.bookDetails.messages.error.subText")}
            buttonText={t("screens.bookDetails.buttons.error.text")}
            onRetry={refresh} 
          />
        </View>
      </BookDetailsWrapper>
    );
  }

  if (!data) {
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
      backgroundColor={data.backgroundColor || colors.grayTint6}
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
                backgroundColor: data.backgroundColor ? colorConverter.lighterHexColor(data.backgroundColor) : colors.grayTint4,
              }}
            />
          }
          iconRight={
            isAdmin && !isPulling && !isEditing ? (
              <RefreshButton 
                onRefresh={pullToRefresh}
                style={{
                  backgroundColor: "transport",
                }}
              />
            ) : undefined
          }
          enableAbsolutePosition
          style={{
            paddingHorizontal: 15,
            backgroundColor: "transparent",
          }}
        />
      </Animated.View>

      <View style={styles.contentContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          contentContainerStyle={[
            styles.scrollViewContainer,
            {
              paddingBottom: dynamicPaddingBottom, // Platform.OS === "ios" ? insets.bottom + 75 : 10 + insets.bottom + 75,
            },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.coverImage}
              source={{ uri: selectedImage || data.coverImage }}
              resizeMode="cover"
            />
          </View>

          {(data.additionalImages || []).length > 0 && (
            <View style={styles.additionalImagesContainer}>
              <Animated.ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
              >
                {[data.coverImage, ...(data.additionalImages || [])].map((imageUri, index) => {
                  const allImages = [data.coverImage, ...(data.additionalImages || [])];
                  const displayedImage = imageUri === (selectedImage || data.coverImage);

                  return (
                    <TouchableOpacity
                      key={index}
                      onPressIn={() => setSelectedImage(imageUri)}
                    >
                      <Image
                        style={[
                          styles.thumbnailImage,
                          {
                            borderColor: displayedImage ? colors.white : colors.gray,
                            borderWidth: displayedImage ? 2 : 1,
                            marginRight: index < allImages.length - 1 ? 10 : 0,
                          },
                        ]}
                        source={{ uri: imageUri }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                })}
              </Animated.ScrollView>
            </View>
          )}

          <View style={styles.contentWrapper}>
            <View
              ref={titleBlockRef}
              onLayout={measureTitleBlockPosition}
              style={styles.titleContainer}
            >
              <Typography fontSize={14} fontWeight="bold" color={colors.whiteTint1} numberOfLines={1}>
                {data.authors.join(", ")}
              </Typography>

              <Typography fontSize={24} fontWeight="bold" color={colors.white} numberOfLines={1} style={styles.titleText}>
                {data.title}
              </Typography>
            </View>

            {isEditing && (  
              <View
                style={[
                  styles.sectionContainer,
                  { 
                    backgroundColor: data.backgroundColor ? colorConverter.darkerHexColor(data.backgroundColor) : colors.grayTint2,
                  },
                ]}
              >
                <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.sectionTitle}>
                  {t("screens.bookDetails.titles.editing")}
                </Typography>
              
                <View style={styles.sectionWrapper}>
                  {memoizedParameters.map(({ field, label }, index) => (
                    <View key={index} style={styles.parameterRow}>
                      <View 
                        style={{ 
                          width: "74%", 
                          marginRight: "4%",
                        }}
                      >
                        <Typography fontSize={16} fontWeight="medium" color={colors.white} numberOfLines={1}>
                          {label}
                        </Typography>
                      </View>
              
                      <View style={{ width: "22%", alignItems: "flex-end" }}>
                        <TouchableOpacity
                          onPressIn={() =>
                            router.push({
                              pathname: "/(admin)/(modals)/edit-book/[field]",
                              params: { field: field || "defaultField", data: JSON.stringify(data) },
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
                    </View>
                  ))}
                </View>
              </View>            
            )}

            <View
              ref={priceBlockRef}
              onLayout={measurePriceBlockPosition}
              style={[
                styles.sectionContainer,
                { 
                  backgroundColor: data.backgroundColor ? colorConverter.darkerHexColor(data.backgroundColor) : colors.grayTint2,
                },
              ]}
            >
              <View
                style={[
                  styles.priceContainer,
                  {
                    marginBottom: !isAdmin && data.quantity === 0 ? 0 : isAdmin && !isEditing ? 0 : 15,
                  },
                ]}
              >
                <View style={styles.priceWrapper}>
                  <Typography fontSize={28} fontWeight="bold" color={data.discount > 0 ? colors.red : colors.white}>
                    {`${data.price}₴`}
                  </Typography>

                  {data.discount > 0 && (
                    <Typography fontSize={18} color={colors.grayTint5} style={styles.originalPrice}>
                      {data.originalPrice}
                    </Typography>
                  )}
                </View>

                {data.discount > 0 && (
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
                      {`-${data.discount}%`}
                    </Typography>
                  </View>
                )}
              </View>

              {!isAdmin && data.quantity === 0 && (
                <Typography fontSize={16} fontWeight="bold" color={colors.grayTint5}>
                  {t("screens.bookDetails.static.outOfStock")}
                </Typography>
              )}
              
              {!isAdmin && data.quantity > 0 && (
                <View style={styles.actionContainer}>
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

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      onPressIn={() => {}}
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor: colors.black,
                          borderRadius: 30,
                        },
                      ]}
                    >
                      <Icon name="bag-add-outline" size={24} color={colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPressIn={() => {}}
                      style={[
                        styles.actionButton,
                        {
                          backgroundColor: colors.black,
                          borderRadius: 30,
                        },
                      ]}
                    >
                      <Icon name="heart-outline" size={24} color={colors.white} />
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
                        params: { field: "pricing", data: JSON.stringify(data) },
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
                styles.sectionContainer,
                { 
                  backgroundColor: data.backgroundColor ? colorConverter.darkerHexColor(data.backgroundColor) : colors.grayTint2,
                },
              ]}
            >
              <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.sectionTitle}>
                {t("screens.bookDetails.titles.genres")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <Typography fontSize={16} fontWeight="medium" color={colors.white}>
                  {memoizedGenres.join(", ")}
                </Typography>

                {isEditing && (
                  <TouchableOpacity
                    onPressIn={() =>
                      router.push({
                        pathname: "/(admin)/(modals)/edit-book/[field]",
                        params: { field: "genres", data: JSON.stringify(data) },
                      })
                    }
                  >
                    <Typography fontSize={16} fontWeight="bold" color={colors.white} style={styles.link}>
                      {t("screens.bookDetails.buttons.edit.text")}
                    </Typography>
                  </TouchableOpacity>
                )}
              </View>  
            </View>

            <View
              style={[
                styles.sectionContainer,
                { 
                  backgroundColor: data.backgroundColor ? colorConverter.darkerHexColor(data.backgroundColor) : colors.grayTint2,
                },
              ]}
            >
              <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.sectionTitle}>
                {t("screens.bookDetails.titles.parameters")}
              </Typography>

              <View style={styles.sectionWrapper}> 
                {!isEditing && (isExpandedParams ? memoizedDetails : memoizedDetails.slice(0, 5)).map((detail, index) => detail.isVisible !== false && (
                  <View key={index} style={styles.detailContainer}>
                    <View 
                      style={{ 
                        width: "48%",
                        marginRight: "4%",
                       }}
                      >
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
                  <View key={index} style={styles.detailEditContainer}>
                    <Typography fontSize={14} fontWeight="medium" color={colors.grayTint5}>
                      {label}
                    </Typography>
          
                    <View style={styles.detailEditRow}>
                      <View 
                        style={{ 
                          width: isEditable ? "74%" : "100%", 
                          marginRight: isEditable ? "4%" : 0,
                        }}
                      >
                        <Typography fontSize={16} fontWeight="bold" color={colors.white} numberOfLines={1}>
                          {value}
                        </Typography>
                      </View>

                      {isEditable && (
                        <View style={{ width: "22%", alignItems: "flex-end" }}>
                          <TouchableOpacity
                            onPressIn={() =>
                              router.push({
                                pathname: "/(admin)/(modals)/edit-book/[field]",
                                params: { field: field || "defaultField", data: JSON.stringify(data) },
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
                styles.sectionContainer,
                { 
                  backgroundColor: data.backgroundColor ? colorConverter.darkerHexColor(data.backgroundColor) : colors.grayTint2,
                },
              ]}
            >
              <Typography fontSize={20} fontWeight="bold" color={colors.white} style={styles.sectionTitle}>
                {t("screens.bookDetails.titles.about")}
              </Typography>

              <View style={styles.sectionWrapper}>
                <Typography fontSize={16} fontWeight="medium" color={colors.white} numberOfLines={isEditing ? 5 : isExpandedDescription ? undefined : 5}>
                  {data.description}
                </Typography>

                <TouchableOpacity
                  onPressIn={() =>
                    isEditing
                      ? router.push({
                          pathname: "/(admin)/(modals)/edit-book/[field]",
                          params: { field: "description", data: JSON.stringify(data) },
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
                  styles.sectionContainer,
                  { 
                    backgroundColor: data.backgroundColor ? colorConverter.darkerHexColor(data.backgroundColor) : colors.grayTint2,
                  },
                ]}
              >
                <View style={styles.sectionWrapper}>
                  <TouchableOpacity onPressIn={() => setIsEditing(!isEditing)}>
                    <Typography fontSize={16} fontWeight="bold" color={colors.white} style={{ textDecorationLine: "underline" }}>
                      {t(`screens.bookDetails.buttons.${isEditing ? "back" : "adminEdit"}.text`)}
                    </Typography>
                  </TouchableOpacity>
                </View>  
              </View>
            )}
          </View>
        </Animated.ScrollView>

        <Animated.View
          style={[
            styles.footerContainer,
            {
              backgroundColor: data.backgroundColor ? colorConverter.darkerHexColor(data.backgroundColor) : colors.grayTint2,
              borderTopColor: data.backgroundColor ? colorConverter.lighterHexColor(data.backgroundColor) : colors.grayTint6,
              paddingBottom: Platform.OS === "ios" ? insets.bottom : 10 + insets.bottom,
            },
            footerAnimatedStyle,
          ]}
        >
          <View style={styles.footerPriceContainer}>
            <Typography fontSize={data.discount > 0 ? 24 : 32} fontWeight="bold" color={data.discount > 0 ? colors.red : colors.white}>
              {`${data.price}₴`}
            </Typography>

            {data.discount > 0 && (
              <View style={styles.footerDiscountContainer}>
                <Typography fontSize={18} color={colors.grayTint5} style={{ textDecorationLine: "line-through" }}>
                  {data.originalPrice}
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
                    {`-${data.discount}%`}
                  </Typography>
                </View>
              </View>
            )}
          </View>

          {!isAdmin && (  
            <View style={styles.actionButtons}>
              <TouchableOpacity
                onPressIn={() => {}}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: colors.black,
                    borderRadius: 30,
                  },
                ]}
              >
                <Icon name="bag-add-outline" size={24} color={colors.white} />
              </TouchableOpacity>

              <TouchableOpacity
                onPressIn={() => {}}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: colors.black,
                    borderRadius: 30,
                  },
                ]}
              >
                <Icon name="heart-outline" size={24} color={colors.white} />
              </TouchableOpacity>
            </View>
          )}  
        </Animated.View>
      </View>
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
  contentContainer: { 
    flex: 1,
  },  
  scrollViewContainer: {
    flexGrow: 1, 
    paddingTop: 35, 
    paddingHorizontal: 15,
  }, 
  imageContainer: { 
    paddingVertical: 20, 
    paddingHorizontal: 15, 
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
    marginBottom: 20, 
    alignItems: "center",
  },
  thumbnailImage: { 
    width: 60, 
    height: 88,
  },
  contentWrapper: {
    flex: 1, 
    gap: 15,
  },
  titleContainer: { 
    justifyContent: "center", 
    alignItems: "center",
  },
  titleText: { 
    marginBottom: 15,
  },
  sectionContainer: { 
    borderRadius: 15, 
    paddingVertical: 20, 
    paddingHorizontal: 15,
  },
  sectionWrapper: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 15,
  },
  sectionTitle: { 
    marginBottom: 15,
  },
  link: {
    textDecorationLine: "underline",
  },
  parameterRow: { 
    flexDirection: "row", 
    alignItems: "baseline",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceWrapper: {
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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButtons: {
    flexDirection: "row", 
    gap: 10,
  },
  actionButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    flexDirection: "row",
  },
  detailEditContainer: {
    flexDirection: "column",
  },
  detailEditRow: {
    flexDirection: "row",
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
