import React, { useEffect } from "react";
import { FlatList } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
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
  selectCategoryHasMore,
  selectLoadCategoryBooks,
  selectSetCategory,
  selectLoadMoreCategoryBooks,
  selectResetCategory,
} from "@/selectors/categoryBooksSelectors";
import { selectToggleCart } from "@/selectors/cartSelectors";
import { selectToggleFavorite } from "@/selectors/favoritesSelectors";
import { colors } from "@/constants/theme";

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
  const status = useCategoryBooksStore(selectCategoryStatus);
  const response = useCategoryBooksStore(selectCategoryResponse);
  const hasMore = useCategoryBooksStore(selectCategoryHasMore);
  
  const setCategory = useCategoryBooksStore(selectSetCategory);
  const fetchData = useCategoryBooksStore(selectLoadCategoryBooks);
  const loadMore = useCategoryBooksStore(selectLoadMoreCategoryBooks);
  const reset = useCategoryBooksStore(selectResetCategory);

  const toggleCart = useCartStore(selectToggleCart);
  const toggleFavorite = useFavoritesStore(selectToggleFavorite);

  const isLoading = status === "loading";
  const isFetching = status === "fetching";
  const isEmpty = !isLoading && categoryBooks.length === 0;
  const isError = !isLoading && response?.status === "error";

  useEffect(() => {
    const shouldFetch = category && isConnected;
    if (shouldFetch) {
      setCategory(category);
      fetchData(true);
    }

    return () => reset();
  }, [category, isConnected]);
  
  return (
    <ViewWrapper 
      title= {t(`common.genres.${category}`)} 
      onBackPress={() => router.back()}
    >
      {!isConnected && (
        <ErrorNetwork 
          message={t("common.messages.errorNetwork.title")}
          subMessage={t("common.messages.errorNetwork.subtitle")}
        />
      )}
      
      {isConnected && isLoading && (
        <Loading size="small" color={colors.orange} />
      )}

      {isConnected && isError && !isLoading && (
        <ErrorWithRetry 
          message={t("common.messages.failedLoad.title")}
          subMessage={t("common.messages.failedLoad.subtitle")}
          hideButton
        />
      )}

      {isConnected && isEmpty && !isError && !isLoading && (
        <Empty 
          message={t("screens.categoryBooks.messages.empty.title")}
          subMessage={t("screens.categoryBooks.messages.empty.subtitle")} 
        />
      )}

      {isConnected && !isLoading && !isEmpty && !isError && (
        <FlatList
          data={categoryBooks}
          renderItem={({ item, index }) => (
            <Animated.View
              key={`book-${item.id}`}
              entering={FadeInDown.delay(index * 75)}
            >
              <CategoryBookItem
                item={item}
                mode="list"
                onView={(bookId) => router.push(`/(user)/book/${bookId}`)}
                onAddToFavorites={(bookId) => toggleFavorite(bookId)}
                onAddToCart={(item) => toggleCart(item)}
                labels={{
                  details: t("components.bookItem.buttons.details"),
                }}
              />
            </Animated.View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={{
            padding: 15,
            gap: 10,
          }}
          onEndReached={hasMore ? loadMore : undefined}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isFetching ? <ListLoader /> : null}
        />
      )}
    </ViewWrapper>
  );
};

export default CategoryBooksScreen;
