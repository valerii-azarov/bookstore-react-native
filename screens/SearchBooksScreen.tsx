import { useRef, useCallback, useEffect } from "react";
import { View, FlatList, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet } from "react-native";
import { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useAuthStore } from "@/stores/authStore";
import { useSearchedBooksStore } from "@/stores/searchedBooksStore";
import { selectIsAdmin } from "@/selectors/authSelectors";
import {
  selectSearchedBooks,
  selectSearchedBooksStatus,
  selectSearchedBooksResponse,
  selectSearchedBooksHasMore,
  selectSearchQuery,
  selectSetSearchQuery,
  selectLoadSearchedBooks,
  selectLoadMoreSearchedBooks,
  selectResetAll,
} from "@/selectors/booksSearchSelectors";
import { colors } from "@/constants/theme";
import { BaseBook } from "@/types";

import ViewWrapper from "@/components/ViewWrapper";
import BookItem from "@/components/BookItem";
import Icon from "@/components/Icon";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import ListLoader from "@/components/ListLoader";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";

const SearchBooksScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const isAdmin = useAuthStore(selectIsAdmin);

  const searchedBooks = useSearchedBooksStore(selectSearchedBooks);
  const searchedBooksStatus = useSearchedBooksStore(selectSearchedBooksStatus);
  const searchedBooksResponse =  useSearchedBooksStore(selectSearchedBooksResponse);
  const searchedBooksHasMore = useSearchedBooksStore(selectSearchedBooksHasMore);
  const searchQuery = useSearchedBooksStore(selectSearchQuery);

  const setSearchQuery = useSearchedBooksStore(selectSetSearchQuery);
  const loadSearchedBooks = useSearchedBooksStore(selectLoadSearchedBooks);
  const loadMoreSearchedBooks = useSearchedBooksStore(selectLoadMoreSearchedBooks);
  const resetAll = useSearchedBooksStore(selectResetAll);

  const inputRef = useRef<TextInput>(null);

  const isLoading = searchedBooksStatus === "loading";
  const isFetching = searchedBooksStatus === "fetching";
  const isEmpty = !isLoading && searchQuery.trim().length > 0 && searchedBooks.length === 0;
  const isError = !isLoading && searchedBooksResponse?.status === "error";

  const isFocused = useSharedValue(false);

  const animatedInputStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      !isConnected
        ? colors.grayTint7
        : isFocused.value
          ? colors.white
          : colors.grayTint9,
      { duration: 150 }
    ),
    borderColor: withTiming(
      isFocused.value ? colors.gray : colors.grayTint6,
      { duration: 150 }
    ),
  }));

  const renderItem = useCallback(({ item }: { item: BaseBook }) => (
    <BookItem
      item={item}
      isOwner={isAdmin}
      disableSwipe
      onView={() => router.push(`/book/${item.id}`)}
      labels={{
        available: t("components.bookItem.labels.availability.available"),
        unavailable: t("components.bookItem.labels.availability.unavailable"),
        article: t("components.bookItem.labels.article"),
      }} 
      actionLabels={{
        edit: t("components.bookItem.actions.edit"),
        delete: t("components.bookItem.actions.delete"),
      }}
    />
  ), [isAdmin, router]);

  const renderFooter = useCallback(() => {
    if (isFetching) {
      return <ListLoader />;
    }
    return null;
  }, [isFetching]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isConnected) {
        inputRef.current?.focus();
        isFocused.value = true;
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isConnected]);

  useEffect(() => {
    return () => resetAll();
  }, []);
  
  return (
    <ViewWrapper 
      title={t("screens.searchBooks.header.title")}
      onBackPress={() => router.back()}
      hideHeaderBorder
    >
      <View style={styles.searchContainer}>
        <Input
          ref={inputRef}
          placeholder={t(`screens.searchBooks.searchInput.title.${isAdmin ? "admin" : "user"}`)}
          placeholderTextColor={colors.grayTint5}
          value={searchQuery}
          onFocus={() => {
            isFocused.value = true;
          }}
          onBlur={() => {
            if (!searchQuery) {
              isFocused.value = false;
            }
          }}
          onChangeText={(text) => {
            isConnected && setSearchQuery(text, isAdmin ? ["title", "sku"] : ["title"]);
          }}
          returnKeyType="done"
          editable={isConnected}
          iconLeft={
            <Icon
              iconSet="Ionicons"
              iconName="search-outline"
              iconSize={24}
              iconColor={colors.grayTint3}
            />
          }
          iconRight={
            searchQuery.length > 0 ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  resetAll();
                  inputRef.current?.blur();
                  isFocused.value = false;
                }}
              >
                <Icon
                  iconSet="Ionicons"
                  iconName="close-outline"
                  iconSize={24}
                  iconColor={colors.gray}
                />
              </TouchableOpacity>
            ) : undefined
          }          
          containerStyle={[
            {
              height: 50,
            },
            animatedInputStyle
          ]}
        />
      </View>

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>    
        <View style={styles.content}>
          {isConnected && isLoading && (
            <Loading size="small" color={colors.orange} />
          )}

          {isConnected && isError && !isLoading && (
            <ErrorWithRetry
              message={t("common.messages.errorWithRetry.title")}
              subMessage={t("common.messages.errorWithRetry.subtitle")}
              buttonText={t("common.buttons.errorWithRetry")}
              onRetry={() => loadSearchedBooks(true)}
            />
          )}

          {isConnected && isEmpty && !isError && !isLoading && (
            <Empty
              message={t("screens.searchBooks.messages.empty.title")}
              hideSubMessage
            />
          )}

          {isConnected && !isLoading && !isEmpty && !isError && (
            <FlatList
              data={searchedBooks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={1}
              contentContainerStyle={{
                padding: 15,
                gap: 10,
              }}
              onEndReached={
                searchedBooksHasMore ? loadMoreSearchedBooks : undefined
              }
              onEndReachedThreshold={0.1}
              ListFooterComponent={renderFooter}
              scrollEnabled={isConnected}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  clearButton: {
    backgroundColor: colors.grayTint8,
    borderRadius: 12,
    padding: 4,
  },
  content: {
    flex: 1,
  },
});

export default SearchBooksScreen;
