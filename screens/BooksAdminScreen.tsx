import React, { useCallback, useEffect } from "react";
import { View, FlatList, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons as Icon } from "@expo/vector-icons";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useBooksListStore } from "@/stores/booksListStore";
import { useModeStore } from "@/stores/modeStore";
import { colors } from "@/constants/theme";
import { booksAdminPageSize } from "@/constants/settings";
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
  const { data, isLoading, isFetching, isRefreshing, response, searchText, setSearchText, refresh, loadMore } = useBooksListStore();
  const router = useRouter();

  useEffect(() => refresh(), [refresh]);

  const renderItem = useCallback(({ item }: { item: Book | undefined }) => {
    if (isLoading || !item) {
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
  }, [isLoading, mode, router]);

  const renderFooter = useCallback(() => {
    if (isFetching) {
      return <ListLoader />;
    }
    return null;
  }, [isFetching]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;
    
    if (response?.status === "error") {
      return ( 
        <ErrorWithRetry 
          message={t("screens.books.messages.error.text")}
          subMessage={t("screens.books.messages.error.subText")}
          buttonText={t("screens.books.buttons.error.text")}
          onRetry={refresh} 
        />
      );
    }

    if (data.length === 0) {
      return (
        <Empty 
          message={t("screens.books.messages.empty.text")}
          subMessage={t("screens.books.messages.empty.subText")} 
        />
      );
    }
    return null;
  }, [isLoading, response, data.length, refresh]);

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
        searchText={searchText}
        onSearchChange={setSearchText}
        placeholder={t("screens.books.search.placeholder")}
        size="medium"
        mode={mode}
        onToggleMode={toggleMode}
      />

      <View style={styles.contentContainer}>
        <FlatList
          data={isLoading ? [...Array(booksAdminPageSize)] : data}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            isLoading ? `skeleton-${index}` : (item?.id || `item-${index}`)
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
          refreshing={isRefreshing}
          onRefresh={refresh}
          onEndReached={loadMore}
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
