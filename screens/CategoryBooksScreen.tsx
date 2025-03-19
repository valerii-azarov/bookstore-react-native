import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useSafeAreaPadding } from "@/hooks/useSafeAreaPadding";
import { useBooksStore } from "@/stores/booksStore";
import { colors } from "@/constants/theme";
import { USER_CATEGORY_BOOKS_PAGE_SIZE } from "@/constants/settings";
import { Book } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import BookItem from "@/components/BookItem";
import SkeletonBookItem from "@/components/SkeletonBookItem";
import ListLoader from "@/components/ListLoader";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const CategoryBooksScreen = () => {
  const router = useRouter();
  
  const { t } = useLanguageContext();
  const { top } = useSafeAreaPadding();

  const { category } = useLocalSearchParams<{ category?: string }>();
  const { categoryBooks, categoryStatus, categoryResponse, loadCategoryBooks, loadMoreCategoryBooks, resetCategory } = useBooksStore();
  
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
  }, [category, loadCategoryBooks, resetCategory]);

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <Header
        title={category ? t(`genres.${category}`) : t("genres.unknown")}
        iconLeft={<BackButton />}
        style={[
          styles.headerContainer, 
          {
            backgroundColor: colors.white,
            borderBottomColor: colors.grayTint7,
            borderBottomWidth: 1,
            paddingTop: Platform.OS === "ios" ? top : 15 + top,
            paddingBottom: 10,
          },
        ]}
      />

      <View style={styles.contentContainer}>
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
              paddingVertical: 10,
              paddingHorizontal: 15,
              gap: 10,
            }}
            onEndReached={loadMoreCategoryBooks}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
        )}

        {isEmpty && (
          <View style={styles.overlayContainer}>
            <Empty 
              message={t("screens.categoryBooks.messages.empty.text")}
              subMessage={t("screens.categoryBooks.messages.empty.subText")} 
            />
          </View>
        )}

        {isError && (
          <View style={styles.overlayContainer}>
            <ErrorWithRetry 
              message={t("screens.categoryBooks.messages.error.text")}
              subMessage={t("screens.categoryBooks.messages.error.subText")}
              buttonText={t("screens.categoryBooks.buttons.error.text")}
              onRetry={() => router.back()}
            />
          </View>
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
});

export default CategoryBooksScreen;
