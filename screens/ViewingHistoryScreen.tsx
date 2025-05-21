import { useEffect } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { enUS, uk } from "date-fns/locale";
import { View, ScrollView, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useLanguage, useTranslation } from "@/contexts/translateContext";
import { useViewingHistoryStore } from "@/stores/viewingHistoryStore";
import {
  selectViewingHistory,
  selectViewingHistoryStatus,
  selectViewingHistoryResponse,
  selectLoadViewingHistory,
  selectResetViewingHistory,
} from "@/selectors/viewingHistorySelectors";
import { colors } from "@/constants/theme";

import ViewWrapper from "@/components/ViewWrapper";
import Loading from "@/components/Loading";
import ViewingHistoryItem from "@/components/ViewingHistoryItem";
import Empty from "@/components/Empty";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const ViewingHistoryScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const language = useLanguage();
  const isConnected = useIsConnected();

  const viewingHistory = useViewingHistoryStore(selectViewingHistory);
  const viewingHistoryStatus = useViewingHistoryStore(selectViewingHistoryStatus);
  const viewingHistoryResponse = useViewingHistoryStore(selectViewingHistoryResponse);

  const loadViewingHistory = useViewingHistoryStore(selectLoadViewingHistory);
  const resetViewingHistory = useViewingHistoryStore(selectResetViewingHistory);

  const isLoading = viewingHistoryStatus === "loading";
  const isEmpty = !isLoading && viewingHistory.length === 0;
  const isError = !isLoading && viewingHistoryResponse?.status === "error";

  const transformToDateString = (date: string) => {
    const diffDays = differenceInCalendarDays(new Date(), new Date(date));
    const dateKey = [0, 1, 2].includes(diffDays) ? ["today", "yesterday", "dayBeforeYesterday"][diffDays] : "";
    
    return dateKey ? t(`common.date.${dateKey}`) : format(new Date(date), "d MMMM yyyy", { 
      locale: language === "en" ? enUS : uk 
    });
  };

  useEffect(() => {
    if (isConnected) {
      loadViewingHistory();
    }
    return () => resetViewingHistory();
  }, [isConnected]);

  return (
    <ViewWrapper 
      title= {t("screens.viewingHistory.header.title")} 
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
          message={t("screens.viewingHistory.messages.empty.title")} 
          hideSubMessage
        />
      )}

      {isConnected && !isLoading && !isEmpty && !isError && (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {viewingHistory.map((history, index) => (
            <Animated.View 
              key={index}
              entering={FadeInDown.delay(index * 100)}
              style={{ 
                marginBottom: index === viewingHistory.length - 1 ? 0 : 15 
              }}
            >
              <Typography fontSize={16} fontWeight="bold" style={{ marginBottom: 5 }}>
                {transformToDateString(history.date)}
              </Typography>
              
              <View style={styles.historyList}>  
                {history.books.map((book, index) => (
                  <ViewingHistoryItem
                    key={index}
                    item={book}
                    onViewDetails={() => 
                      router.push(`/book/${book.id}`)
                    }
                  />
                ))}
              </View>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </ViewWrapper>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    padding: 15,
  },
  historyList: {
    gap: 10,
  },
});

export default ViewingHistoryScreen;
