import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useBooksStore } from "@/stores/booksStore";
import { useModeStore } from "@/stores/modeStore";
import { colors } from "@/constants/theme";
import { ADMIN_BOOKS_PAGE_SIZE } from "@/constants/settings";
import { verticalScale } from "@/helpers/common";
import { Book } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import BookItem from "@/components/BookItem";
import SkeletonBookItem from "@/components/SkeletonBookItem";
import ListLoader from "@/components/ListLoader";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import FloatingActionButton from "@/components/FloatingButton";

const BooksAdminScreen = () => {
  const { t } = useLanguageContext();
  const { mode, toggleMode } = useModeStore();
  const { bookList, booksStatus, booksResponse, booksSearchQuery, setBooksSearchQuery, refreshBooks, loadMoreBooks } = useBooksStore();
  const router = useRouter();

  useEffect(() => refreshBooks(), [refreshBooks]);

  const renderItem = useCallback(({ item }: { item: Book | undefined }) => {
    if (booksStatus === "loading" || !item) {
      return <SkeletonBookItem mode={mode} isOwner />;
    }
    return (
      <BookItem
        item={item}
        mode={mode}
        onViewDetails={() => router.push(`/(admin)/book/${item.id}`)}
        isOwner
      />
    );
  }, [booksStatus, mode, router]);

  const renderFooter = useCallback(() => {
    if (booksStatus === "fetching") {
      return <ListLoader />;
    }
    return null;
  }, [booksStatus]);

  const renderEmpty = useCallback(() => {
    if (booksStatus === "loading") return null;
    
    if (booksResponse?.status === "error") {
      return ( 
        <ErrorWithRetry 
          message={t("screens.books.messages.error.text")}
          subMessage={t("screens.books.messages.error.subText")}
          buttonText={t("screens.books.buttons.error.text")}
          onRetry={refreshBooks} 
        />
      );
    }

    if (bookList.length === 0) {
      return (
        <Empty 
          message={t("screens.books.messages.empty.text")}
          subMessage={t("screens.books.messages.empty.subText")} 
        />
      );
    }
    return null;
  }, [booksStatus, booksResponse, bookList.length, refreshBooks]);

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <Header
        title={t("screens.books.header.text")}
        titleSize={18}
        style={[
          styles.headerContainer,
          {
            backgroundColor: colors.white,
            minHeight: Platform.OS === "ios" ? verticalScale(100) : verticalScale(85),
          },
        ]}
        enableTopInset
      />

      <SearchBar
        searchText={booksSearchQuery}
        onSearchChange={(text) => setBooksSearchQuery(text, ["title", "sku"])}
        placeholder={t("screens.books.search.placeholder")}
        size="medium"
        mode={mode}
        onToggleMode={toggleMode}
      />

      <View style={styles.contentContainer}>
        <FlatList
          data={booksStatus === "loading" ? [...Array(ADMIN_BOOKS_PAGE_SIZE)] : bookList}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            booksStatus === "loading" ? `skeleton-${index}` : (item?.id || `item-${index}`)
          }
          numColumns={mode === "grid" ? 2 : 1}
          key={mode}
          columnWrapperStyle={
            mode === "grid" ? { justifyContent: "space-between" } : undefined
          }
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 15,
            gap: 10,
          }}
          refreshing={booksStatus === "refreshing"}
          onRefresh={refreshBooks}
          onEndReached={loadMoreBooks}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmpty}
        />
      </View>

      <FloatingActionButton
        onPress={() => router.push("/(admin)/(modals)/create-book")}
        icon={<Icon name="add" size={32} color={colors.white} />}
      />
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
});

export default BooksAdminScreen;
