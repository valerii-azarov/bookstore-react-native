import React, { useRef, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
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

  const searchQuery = useSearchedBooksStore(selectSearchQuery);
  const searchedBooks = useSearchedBooksStore(selectSearchedBooks);
  const status = useSearchedBooksStore(selectSearchedBooksStatus);
  const response =  useSearchedBooksStore(selectSearchedBooksResponse);
  const hasMore = useSearchedBooksStore(selectSearchedBooksHasMore);
  
  const setSearchQuery = useSearchedBooksStore(selectSetSearchQuery);
  const fetchData = useSearchedBooksStore(selectLoadSearchedBooks);
  const loadMore = useSearchedBooksStore(selectLoadMoreSearchedBooks);
  const reset = useSearchedBooksStore(selectResetAll);

  const inputRef = useRef<TextInput>(null);

  const isLoading = status === "loading";
  const isFetching = status === "fetching";
  const isEmpty = !isLoading && searchQuery.trim().length > 0 && searchedBooks.length === 0;
  const isError = !isLoading && response?.status === "error";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isConnected) {
        inputRef.current?.focus();
        isFocused.value = true;
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isConnected]);

  return (
    <ViewWrapper 
      title={t("screens.searchBooks.header.title")}
      onBackPress={() => router.back()}
      hideHeaderBorder
    >
      <View 
        style={{
          backgroundColor: colors.white,
          borderBottomColor: colors.grayTint7,
          borderBottomWidth: 1,
          paddingBottom: 10,
          paddingHorizontal: 15,
        }}
      >
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
                style={{
                  backgroundColor: colors.grayTint8,
                  borderRadius: 12,
                  padding: 4,
                }}
                onPress={() => {
                  reset();
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
        <View style={{ flex: 1 }}>
          {isConnected && isLoading && (
            <Loading size="small" color={colors.orange} />
          )}

          {isConnected && isError && !isLoading && (
            <ErrorWithRetry
              message={t("common.messages.errorWithRetry.title")}
              subMessage={t("common.messages.errorWithRetry.subtitle")}
              buttonText={t("common.buttons.errorWithRetry")}
              onRetry={() => fetchData(true)}
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
              renderItem={({ item, index }) => (
                <Animated.View
                  key={`book-${item.id}`}
                  entering={FadeInDown.delay(index * 75)}
                >
                  <BookItem
                    item={item}
                    isOwner={isAdmin}
                    disableSwipe
                    onView={(bookId) => router.push(`/book/${bookId}`)}
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
              scrollEnabled={isConnected}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </ViewWrapper>
  );
};

export default SearchBooksScreen;
