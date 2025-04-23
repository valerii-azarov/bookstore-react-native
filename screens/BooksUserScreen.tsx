import { useEffect } from "react";
import { View, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
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
import CategoryBookItem from "@/components/CategoryBookItem";
import SkeletonCategories from "@/components/SkeletonCategories";
import Header from "@/components/Header";
import IconBadge from "@/components/IconBadge";
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

  const renderCategory = (category: string, index: number) => {
    return (
      <View 
        key={index}
        style={{ marginTop: 15 }}
      >
        <View style={styles.categoryHeader}>
          <Typography fontSize={18} fontWeight="bold" color={colors.black}>
            {t(`genres.${category}`)}
          </Typography>

          <RedirectButton 
            title={t("screens.books.buttons.showAll.text")}
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
            <CategoryBookItem
              item={item}
              mode="horizontal"
              onView={() => router.push(`/(user)/book/${item.id}`)}
              onAddToFavorites={(bookId) => toggleFavorite(bookId)}
              onAddToCart={(item) => toggleCart(item)}
            />
          )}
          keyExtractor={(item: Book) => item.id}
          horizontal
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 15,
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
    <ScreenWrapper hideStatusBarBorder>
      <Header
        title={t("screens.books.headers.titleUser")}
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
            minHeight: verticalScale(40),
          },
        ]}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshCategories}
          />
        }
        scrollEnabled={!isEmpty && !isError && !isRefreshing}
      >
        {isLoading && <SkeletonCategories />}

        {isError && !isLoading && (
          <ErrorWithRetry 
            message={t("screens.books.messages.error.text")}
            subMessage={t("screens.books.messages.error.subText")}
            buttonText={t("screens.books.buttons.error.text")}
            containerStyle={styles.padded}
            onRetry={() => loadCategories()} 
          />
        )}

        {isEmpty && !isError && !isLoading && (
          <Empty 
            message={t("screens.books.messages.empty.text")}
            subMessage={t("screens.books.messages.empty.subText")} 
            containerStyle={styles.padded}
          />
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
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  padded: {
    padding: 15,
  },
});

export default BooksUserScreen;
