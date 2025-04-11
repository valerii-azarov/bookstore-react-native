import { useEffect } from "react";
import { View, FlatList, ScrollView, RefreshControl, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/contexts/translateContext";
import { useCategoriesStore } from "@/stores/categoriesStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectCategories, 
  selectCategoriesStatus, 
  selectCategoriesResponse, 
  selectLoadCategories, 
  selectRefreshCategories,
} from "@/selectors/categoriesSelectors";
import { selectToggleCart, selectGetCartCount } from "@/selectors/cartSelectors";
import { selectToggleFavorite } from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { Book } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import SkeletonCategories from "@/components/SkeletonCategories";
import Header from "@/components/Header";
import IconBadge from "@/components/IconBadge";
import BookItem from "@/components/BookItem";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import RedirectButton from "@/components/RedirectButton";
import Typography from "@/components/Typography";

const BooksUserScreen = () => {
  const router = useRouter();

  const t = useTranslation();

  const categories = useCategoriesStore(selectCategories);
  const categoriesStatus = useCategoriesStore(selectCategoriesStatus);
  const categoriesResponse = useCategoriesStore(selectCategoriesResponse);
  
  const loadCategories = useCategoriesStore(selectLoadCategories);
  const refreshCategories = useCategoriesStore(selectRefreshCategories);
  
  const toggleCart = useCartStore(selectToggleCart);
  const getCartCount= useCartStore(selectGetCartCount);
  
  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const isLoading = categoriesStatus === "loading";
  const isRefreshing = categoriesStatus === "refreshing";
  const isEmpty = !isLoading && Object.keys(categories).length === 0;
  const isError = !isLoading && categoriesResponse?.status === "error";

  const renderCategory = (category: string) => {
    return (
      <View key={category} style={{ marginTop: 15 }}>
        <View 
          style={{
            flexDirection: "row", 
            alignItems: "center", 
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}
        >
          <Typography fontSize={18} fontWeight="bold">
            {t(`genres.${category}`)}
          </Typography>

          <RedirectButton 
            title={t("screens.books.showAll.text")}
            onPress={() =>
              router.push({
                pathname: "/(user)/category-books/[category]",
                params: { category },
              })
            }
          />
        </View>
        
        <FlatList
          data={categories[category]}
          renderItem={({ item }: { item: Book }) => (
            <BookItem
              item={item}
              mode="horizontal"
              onViewDetails={() => router.push(`/(user)/book/${item.id}`)}
              onAddToFavorites={() => toggleFavorite(item.id)}
              onAddToCart={() => toggleCart(item)}
            />
          )}
          keyExtractor={(item: Book) => item.id}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            gap: 15,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <Header
        title={t("screens.books.header.text")}
        titleSize={18}
        iconRight={
          <IconBadge 
            badgeCount={getCartCount()} 
            badgeIconSet="MaterialIcons"
            badgeIconName="shopping-cart" 
            onPress={() => router.push("/(user)/(modals)/cart")}
          />
        }
        style={[
          styles.header,
          {
            minHeight: Platform.OS === "ios" ? verticalScale(100) : verticalScale(85),
          },
        ]}
        enableTopInset
      />

      <ScrollView 
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshCategories}
          />
        }
        scrollEnabled={!isEmpty && !isError}
      >
        {isLoading && <SkeletonCategories />}

        {isError && !isLoading && (
          <View style={styles.overlayContainer}>
            <ErrorWithRetry 
              message={t("screens.books.messages.error.text")}
              subMessage={t("screens.books.messages.error.subText")}
              buttonText={t("screens.books.buttons.error.text")}
              onRetry={() => loadCategories()} 
            />
          </View>
        )}

        {isEmpty && !isError && !isLoading && (
          <View style={styles.overlayContainer}>
            <Empty 
              message={t("screens.books.messages.empty.text")}
              subMessage={t("screens.books.messages.empty.subText")} 
            />
          </View>
        )}

        {!isLoading && !isEmpty && !isError && Object.keys(categories).map(renderCategory)}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
    // padding: 15,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default BooksUserScreen;
