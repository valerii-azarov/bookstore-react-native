import React, { useEffect } from "react";
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";
import {
  selectGroupedViewingHistory,
  selectViewingHistoryStatus,
  selectViewingHistoryResponse,
  selectLoadViewingHistory,
} from "@/selectors/viewingHistorySelectors";
import { colors } from "@/constants/theme";
import { ViewingHistoryBook } from "@/types";
import ListViewWrapper from "@/components/ListViewWrapper";
import Typography from "@/components/Typography";

const ViewingHistoryScreen = () => {
  const router = useRouter();

  const viewingHistory = useViewingHistoryStore(selectGroupedViewingHistory);
  const viewingHistoryStatus = useViewingHistoryStore(selectViewingHistoryStatus);
  const viewingHistoryResponse = useViewingHistoryStore(selectViewingHistoryResponse);

  const loadViewingHistory = useViewingHistoryStore(selectLoadViewingHistory);

  const isLoading = viewingHistoryStatus === "loading";
  const isEmpty = !isLoading && viewingHistory.length === 0;
  const isError = !isLoading && viewingHistoryResponse?.status === "error";

  useEffect(() => {
    loadViewingHistory();
  }, [loadViewingHistory]);

  const BookItem = ({ book }: { book: ViewingHistoryBook }) => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.white,
        padding: 15,
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 1,
      }}
      onPress={() => router.push(`/book/${book.id}`)}
    >
      <Image
        style={{ 
          width: 48, 
          height: 75, 
          marginRight: 10,
        }}
        source={{ uri: book.coverImage }}
        resizeMode="cover"
      />
      <View style={{ flex: 1 }}>
        <Typography fontSize={14} fontWeight="bold" color={colors.gray} style={{ marginBottom: 5 }}>
          {new Date(book.timestamp).toLocaleTimeString()}
        </Typography>

        <Typography fontSize={12} fontWeight="bold" color={colors.gray} numberOfLines={1}>
          {book.authors?.join(", ") || "Unknown Author"}
        </Typography>

        <Typography fontSize={16} fontWeight="bold" numberOfLines={1}>
          {book.title}
        </Typography>
      </View>
    </TouchableOpacity>
  );

  return (
    <ListViewWrapper title="Viewing History" onBackPress={() => router.back()}>      
      {isLoading && (
        <View style={styles.overlayContainer}>
          <Typography fontSize={16} fontWeight="medium">
            Loading...
          </Typography>
        </View>
      )}
      
      {isEmpty && (
        <View style={styles.overlayContainer}>
          <Typography fontSize={16} fontWeight="medium">
            No viewing history available
          </Typography>
        </View>
      )}

      {isError && (
        <View style={styles.overlayContainer}>
          <Typography fontSize={16} fontWeight="medium" color={colors.red}>
            {viewingHistoryResponse?.message}
          </Typography>
        </View>
      )}

      {!isLoading && !isEmpty && !isError && (
        <ScrollView contentContainerStyle={{ padding: 15 }}>
          {viewingHistory.map((group) => (
            <View key={group.date} style={{ marginBottom: 20 }}>
              <Typography fontSize={18} fontWeight="bold" style={{ marginBottom: 10 }}>
                {new Date(group.date).toLocaleDateString()}
              </Typography>
              
              {group.books.map((book, index) => (
                <BookItem
                  key={index}
                  book={book}
                />
              ))}
            </View>
          ))}
        </ScrollView>
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

export default ViewingHistoryScreen;
