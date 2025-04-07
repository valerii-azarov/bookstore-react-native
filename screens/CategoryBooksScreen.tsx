import { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useTranslation } from "@/contexts/translateContext";
import { useCategoryBooksStore } from "@/stores/categoryBooksStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectCategoryBooks, 
  selectCategoryStatus, 
  selectCategoryResponse, 
  selectLoadCategoryBooks, 
  selectLoadMoreCategoryBooks, 
  selectRefreshCategoryBooks,
  selectResetCategory,
} from "@/selectors/categoryBooksSelectors";
import { selectToggleCart } from "@/selectors/cartSelectors";
import { selectToggleFavorite } from "@/selectors/favoritesSelectors";
import { USER_CATEGORY_BOOKS_PAGE_SIZE } from "@/constants/settings";
import { Book } from "@/types";

import ListViewWrapper from "@/components/ListViewWrapper";
import ListLoader from "@/components/ListLoader";
import BookItem from "@/components/BookItem";
import SkeletonBookItem from "@/components/SkeletonBookItem";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const CategoryBooksScreen = () => {  
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
   
  const t = useTranslation();
  
  const categoryBooks = useCategoryBooksStore(selectCategoryBooks);
  const categoryStatus = useCategoryBooksStore(selectCategoryStatus);
  const categoryResponse = useCategoryBooksStore(selectCategoryResponse);
  
  const loadCategoryBooks = useCategoryBooksStore(selectLoadCategoryBooks);
  const loadMoreCategoryBooks = useCategoryBooksStore(selectLoadMoreCategoryBooks);
  const refreshCategoryBooks = useCategoryBooksStore(selectRefreshCategoryBooks);
  const resetCategory = useCategoryBooksStore(selectResetCategory);

  const toggleCart = useCartStore(selectToggleCart);

  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const isLoading = categoryStatus === "loading";
  const isFetching = categoryStatus === "fetching";
  const isEmpty = !isLoading && categoryBooks.length === 0;
  const isError = !isLoading && categoryResponse?.status === "error";

  const renderItem = useCallback(({ item }: { item: Book | undefined }) => {
    if (isLoading || !item) {
      return <SkeletonBookItem mode="list" />;
    }
    return (
      <BookItem
        item={item}
        mode="list"
        onViewDetails={() => router.push(`/(user)/book/${item.id}`)}
        onAddToFavorites={() => toggleFavorite(item.id)}
        onAddToCart={() => toggleCart(item)}
      />
    );
  }, [isLoading, router]);

  const renderFooter = useCallback(() => {
    if (isFetching) {
      return <ListLoader />;
    }
    return null;
  }, [isFetching]);

  useEffect(() => {
    if (category) {
      loadCategoryBooks(category);
    }
    return () => resetCategory();
  }, [category]);

  return (
    <ListViewWrapper 
      title= {t(`genres.${category}`)} 
      onBackPress={() => router.back()}
    >
      {isError && !isLoading && (
        <View style={styles.overlayContainer}>
          <ErrorWithRetry 
            message={t("screens.categoryBooks.messages.error.text")}
            subMessage={t("screens.categoryBooks.messages.error.subText")}
            buttonText={t("screens.categoryBooks.buttons.error.text")}
            onRetry={refreshCategoryBooks}
          />
        </View>
      )}

      {isEmpty && !isError && !isLoading && (
        <View style={styles.overlayContainer}>
          <Empty 
            message={t("screens.categoryBooks.messages.empty.text")}
            subMessage={t("screens.categoryBooks.messages.empty.subText")} 
          />
        </View>
      )}

      {!isEmpty && !isError && (
        <FlatList
          data={isLoading ? Array(USER_CATEGORY_BOOKS_PAGE_SIZE) : categoryBooks}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            isLoading ? `skeleton-${index}` : (item?.id || `item-${index}`)
          }
          numColumns={1}
          key="list"
          contentContainerStyle={{
            padding: 15,
            gap: 10,
          }}
          onEndReached={loadMoreCategoryBooks}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      )}
    </ListViewWrapper>
  );
};

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default CategoryBooksScreen;
