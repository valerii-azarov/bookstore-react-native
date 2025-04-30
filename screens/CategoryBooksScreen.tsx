import { useCallback, useEffect } from "react";
import { FlatList } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useCategoryBooksStore } from "@/stores/categoryBooksStore";
import { useCartStore } from "@/stores/cartStore";
import { useFavoritesStore } from "@/stores/favoritesStore";
import { 
  selectCategoryBooks, 
  selectCategoryStatus, 
  selectCategoryResponse, 
  selectLoadCategoryBooks, 
  selectSetCategory,
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
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const CategoryBooksScreen = () => {  
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category: string }>();
   
  const t = useTranslation();
  const isConnected = useIsConnected();
  
  const categoryBooks = useCategoryBooksStore(selectCategoryBooks);
  const categoryStatus = useCategoryBooksStore(selectCategoryStatus);
  const categoryResponse = useCategoryBooksStore(selectCategoryResponse);
  
  const setCategory = useCategoryBooksStore(selectSetCategory);
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
        onView={() => router.push(`/book/${item.id}`)}
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
    if (category && isConnected) {
      setCategory(category);
      loadCategoryBooks(true);
    }
    return () => resetCategory();
  }, [category, isConnected]);

  return (
    <ViewWrapper 
      title= {t(`genres.${category}`)} 
      onBackPress={() => router.back()}
    >
      {!isConnected && <ErrorNetwork />}
      
      {isConnected && isLoading && (
        <Loading size="small" color={colors.orange} />
      )}

      {isConnected && isError && !isLoading && (
        <ErrorWithRetry 
          message={t("screens.categoryBooks.messages.error.text")}
          subMessage={t("screens.categoryBooks.messages.error.subText")}
          hideButton
        />
      )}

      {isConnected && isEmpty && !isError && !isLoading && (
        <Empty 
          message={t("screens.categoryBooks.messages.empty.text")}
          subMessage={t("screens.categoryBooks.messages.empty.subText")} 
        />
      )}

      {isConnected && !isLoading && !isEmpty && !isError && (
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

export default CategoryBooksScreen;
