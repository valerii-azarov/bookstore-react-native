import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
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
  selectResetCategory,
} from "@/selectors/categoryBooksSelectors";
import { selectToggleCart } from "@/selectors/cartSelectors";
import { selectToggleFavorite } from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";
import { Book } from "@/types";

import ViewWrapper from "@/components/ViewWrapper";
import CategoryBookItem from "@/components/CategoryBookItem";
import Loading from "@/components/Loading";
import ListLoader from "@/components/ListLoader";
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
  const resetCategory = useCategoryBooksStore(selectResetCategory);

  const toggleCart = useCartStore(selectToggleCart);

  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const isLoading = categoryStatus === "loading";
  const isFetching = categoryStatus === "fetching";
  const isEmpty = !isLoading && categoryBooks.length === 0;
  const isError = !isLoading && categoryResponse?.status === "error";

  const renderItem = useCallback(({ item }: { item: Book }) => {
    return (
      <CategoryBookItem
        item={item}
        mode="list"
        onView={() => router.push(`/(user)/book/${item.id}`)}
        onAddToFavorites={(bookId) => toggleFavorite(bookId)}
        onAddToCart={(item) => toggleCart(item)}
      />
    );
  }, [router]);

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
    <ViewWrapper 
      title= {t(`genres.${category}`)} 
      onBackPress={() => router.back()}
    >
      {isLoading && <Loading size="small" color={colors.orange} />}

      {isError && !isLoading && (
        <ErrorWithRetry 
          message={t("screens.categoryBooks.messages.error.text")}
          subMessage={t("screens.categoryBooks.messages.error.subText")}
          containerStyle={styles.padded}
          hideButton
        />
      )}

      {isEmpty && !isError && !isLoading && (
        <Empty 
          message={t("screens.categoryBooks.messages.empty.text")}
          subMessage={t("screens.categoryBooks.messages.empty.subText")} 
          containerStyle={styles.padded}
        />
      )}

      {!isLoading && !isEmpty && !isError && (
        <FlatList
          data={categoryBooks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={{
            padding: 15,
            gap: 10,
          }}
          onEndReached={loadMoreCategoryBooks}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      )}
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  padded: {
    padding: 15,
  },
});

export default CategoryBooksScreen;
