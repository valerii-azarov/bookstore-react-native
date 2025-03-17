import React, { useEffect } from "react";
import { View, FlatList, ScrollView, RefreshControl, StyleSheet, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useLanguageContext } from "@/contexts/LanguageContext";
import { useBooksStore } from "@/stores/booksStore";
import { colors } from "@/constants/theme";
import { verticalScale } from "@/helpers/common";
import { Book } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import SkeletonCategories from "@/components/SkeletonCategories";
import Header from "@/components/Header";
import IconBadge from "@/components/IconBadge";
import BookItem from "@/components/BookItem";
import Empty from "@/components/Empty";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import RedirectButton from "@/components/RedirectButton";
import Typography from "@/components/Typography";

const BooksUserScreen = () => {
  const { t } = useLanguageContext();
  const { categories, categoriesStatus, categoriesResponse, loadCategories, refreshCategories } = useBooksStore();
  const router = useRouter();

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const renderCategory = (category: string) => {
    return (
      <View key={category} style={styles.categoryContainer}>
        <View style={styles.categoryHeader}>
          <Typography fontSize={18} fontWeight="bold">
            {t(`genres.${category}`)}
          </Typography>
          <RedirectButton 
            title={t("screens.books.showAll.text")}
            onPress={() => console.log("redirect to books by category")}
          />
        </View>
        <FlatList
          data={categories[category]}
          renderItem={({ item }: { item: Book }) => (
            <BookItem
              item={item}
              mode="horizontal"
              onViewDetails={() => router.push(`/(user)/book/${item.id}`)}
            />
          )}
          keyExtractor={(item: Book) => item.id}
          horizontal
          contentContainerStyle={{
            paddingHorizontal: 15,
            paddingVertical: 10,
            gap: 15,
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScreenWrapper statusBarStyle="dark" disableTopInset>
      <Header
        title={t("screens.books.header.text")}
        titleSize={18}
        iconRight={
          <IconBadge 
            count={3} 
            iconName="cart" 
            onPress={() => router.push("/(user)/(modals)/cart")}
          />
        }
        style={[
          styles.headerContainer, 
          {
            backgroundColor: colors.white,
            borderBottomColor: colors.grayTint7,
            borderBottomWidth: 1,
            minHeight: Platform.OS === "ios" ? verticalScale(100) : verticalScale(85),
          }
        ]}
        enableTopInset
      />

      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={categoriesStatus === "refreshing"}
            onRefresh={refreshCategories}
          />
        }
        scrollEnabled={categoriesResponse?.status !== "error" && Object.keys(categories).length > 0}
      >
        {categoriesStatus === "loading" && <SkeletonCategories />}

        {categoriesStatus !== "loading" && categoriesResponse?.status === "error" && (
          <ErrorWithRetry 
            message={t("screens.books.messages.error.text")}
            subMessage={t("screens.books.messages.error.subText")}
            buttonText={t("screens.books.buttons.error.text")}
            onRetry={refreshCategories} 
          />
        )}

        {categoriesStatus !== "loading" && Object.keys(categories).length === 0 && (
          <Empty 
            message={t("screens.books.messages.noData.text")}
            subMessage={t("screens.books.messages.noData.subText")} 
          />
        )}

        {categoriesStatus !== "loading" && Object.keys(categories).length > 0 && (
          Object.keys(categories).map(renderCategory)
        )}
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  headerContainer: { 
    paddingHorizontal: 15,
  },
  scrollViewContent: { 
    flexGrow: 1,
  },
  categoryContainer: { 
    marginTop: 15,
  },
  categoryHeader: { 
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between",
    paddingHorizontal: 15 
  },
});

export default BooksUserScreen;
