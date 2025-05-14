import { useEffect } from "react";
import { View, FlatList, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
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
import { Book } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import CategoryBookItem from "@/components/CategoryBookItem";
import SkeletonCategories from "@/components/SkeletonCategories";
import Header from "@/components/Header";
import IconBadge from "@/components/IconBadge";
import Empty from "@/components/Empty";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import RedirectButton from "@/components/RedirectButton";
import Typography from "@/components/Typography";

const BooksUserScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const categories = useCategoriesStore(selectCategories);
  const categoriesStatus = useCategoriesStore(selectCategoriesStatus);
  const categoriesResponse = useCategoriesStore(selectCategoriesResponse);

  const loadCategories = useCategoriesStore(selectLoadCategories);
  const refreshCategories = useCategoriesStore(selectRefreshCategories);

  const toggleCart = useCartStore(selectToggleCart);
  const getCartCount = useCartStore(selectGetCartCount);

  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const isLoading = categoriesStatus === "loading";
  const isRefreshing = categoriesStatus === "refreshing";
  const isEmpty = !isLoading && Object.keys(categories).length === 0;
  const isError = !isLoading && categoriesResponse?.status === "error";

  const renderCategory = (category: string, index: number) => (
    <View key={index} style={{ marginTop: 15 }}>
      <View style={styles.categoryHeader}>
        <Typography fontSize={18} fontWeight="bold" color={colors.black}>
          {t(`genres.${category}`)}
        </Typography>

        <RedirectButton
          title={t("screens.books.buttons.showAll.text")}
          onPress={() =>
            router.push({
              pathname: "/category-books/[category]",
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
            onView={() => router.push(`/book/${item.id}`)}
            onAddToFavorites={(bookId) => toggleFavorite(bookId)}
            onAddToCart={(item) => toggleCart(item)}
            labels={{
              details: t("components.bookItem.details")
            }}
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

  useEffect(() => {
    if (isConnected) {
      loadCategories();
    }
  }, [isConnected]);

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
            onPress={() => router.push("/cart")}
          />
        }
        style={[
          styles.header, 
          { 
            minHeight: 40,
          }
        ]}
      />
      
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        refreshControl={
          isConnected ? (
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshCategories}
            />
          ) : undefined
        }
        scrollEnabled={isConnected && !isEmpty && !isError && !isRefreshing}
      >
        {!isConnected && (
          <ErrorNetwork 
            message={t("components.errorNetwork.title")}
            subMessage={t("components.errorNetwork.subtitle")}
          />
        )}
        
        {isConnected && isLoading && <SkeletonCategories />}

        {isConnected && isError && !isLoading && (
          <ErrorWithRetry 
            message={t("screens.books.messages.error.text")}
            subMessage={t("screens.books.messages.error.subText")}
            buttonText={t("screens.books.buttons.error.text")}
            onRetry={() => loadCategories()}
          />
        )}

        {isConnected && isEmpty && !isError && !isLoading && (
          <Empty 
            message={t("screens.books.messages.empty.text")}
            subMessage={t("screens.books.messages.empty.subText")}
          />
        )}

        {isConnected && !isLoading && !isEmpty && !isError && (
          Object.keys(categories).map(renderCategory)
        )}
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
});

export default BooksUserScreen;
