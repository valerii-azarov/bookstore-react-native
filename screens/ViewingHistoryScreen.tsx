import React, { useEffect } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { enUS, uk } from "date-fns/locale";
import { View, ScrollView } from "react-native";
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
  const status = useViewingHistoryStore(selectViewingHistoryStatus);
  const response = useViewingHistoryStore(selectViewingHistoryResponse);

  const fetchData = useViewingHistoryStore(selectLoadViewingHistory);
  const reset = useViewingHistoryStore(selectResetViewingHistory);

  const isLoading = status === "loading";
  const isEmpty = !isLoading && viewingHistory.length === 0;
  const isError = !isLoading && response?.status === "error";

  const transformToDateString = (date: string) => {
    const diffDays = differenceInCalendarDays(new Date(), new Date(date));
    const dateKey = [0, 1, 2].includes(diffDays) ? ["today", "yesterday", "dayBeforeYesterday"][diffDays] : "";
    
    return dateKey ? t(`common.date.${dateKey}`) : format(new Date(date), "d MMMM yyyy", { 
      locale: language === "en" ? enUS : uk 
    });
  };

  useEffect(() => {
    if (isConnected) {
      fetchData();
    }

    return () => reset();
  }, [isConnected]);

  const sectionDelayStep = 150;
  const itemDelayStep = 75;

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
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1, padding: 15 }}>
            {viewingHistory.map((history, sectionIndex) => {
              const sectionDelay = sectionIndex * (sectionDelayStep + history.books.length * itemDelayStep);

              return (
                <Animated.View
                  key={`section-${history.date}`}
                  entering={FadeInDown.delay(sectionDelay)}
                  style={{
                    marginBottom: sectionIndex === viewingHistory.length - 1 ? 0 : 15,
                  }}
                >
                  <Typography fontSize={16} fontWeight="bold" style={{ marginBottom: 5 }}>
                    {transformToDateString(history.date)}
                  </Typography>

                  <View style={{ flexDirection: "column", gap: 10 }}>
                    {history.books.map((book, i) => (
                      <Animated.View
                        key={`book-${book.id}`}
                        entering={FadeInDown.delay(sectionDelay + i * itemDelayStep)}
                      >
                        <ViewingHistoryItem
                          item={book}
                          onViewDetails={() => router.push(`/(user)/book/${book.id}`)}
                        />
                      </Animated.View>
                    ))}
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </ViewWrapper>
  );
};

export default ViewingHistoryScreen;
