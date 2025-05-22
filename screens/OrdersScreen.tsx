import React, { useRef, useEffect } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useIsConnected } from "@/contexts/networkContext";
import { useTranslation } from "@/contexts/translateContext";
import { useOrdersStore } from "@/stores/ordersStore";
import {
  selectOrders,
  selectOrdersStatus,
  selectOrdersResponse,
  selectOrdersHasMore,
  selectSelectedStatuses,
  selectSetSelectedStatuses,
  selectLoadOrdersByStatuses,
  selectLoadMore,
  selectRefresh,
  selectResetAll,
} from "@/selectors/ordersSelectors";
import { orderStatusKeys, colorOptions } from "@/constants/order";
import { colors } from "@/constants/theme";
import { OrderStatusType } from "@/types";

import ScreenWrapper from "@/components/ScreenWrapper";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import ListLoader from "@/components/ListLoader";
import OrderItem, { SwipeableRef } from "@/components/OrderItem";
import Empty from "@/components/Empty";
import ErrorNetwork from "@/components/ErrorNetwork";
import ErrorWithRetry from "@/components/ErrorWithRetry";
import Typography from "@/components/Typography";

const OrdersScreen = () => {
  const router = useRouter();

  const t = useTranslation();
  const isConnected = useIsConnected();

  const orders = useOrdersStore(selectOrders);
  const ordersStatus = useOrdersStore(selectOrdersStatus);
  const ordersResponse = useOrdersStore(selectOrdersResponse);
  const ordersHasMore = useOrdersStore(selectOrdersHasMore);
  const selectedStatuses = useOrdersStore(selectSelectedStatuses);

  const setSelectedStatuses = useOrdersStore(selectSetSelectedStatuses);
  const loadOrdersByStatuses = useOrdersStore(selectLoadOrdersByStatuses);
  const loadMore = useOrdersStore(selectLoadMore);
  const refresh = useOrdersStore(selectRefresh);
  const resetAll = useOrdersStore(selectResetAll);

  const isLoading = ordersStatus === "loading";
  const isFetching = ordersStatus === "fetching";
  const isRefreshing = ordersStatus === "refreshing";
  const isEmpty = !isLoading && orders.length === 0;
  const isError = ordersResponse?.status === "error";

  const swipeableRefs = useRef<Array<SwipeableRef | null>>([]);
  const openSwipeableRef = useRef<SwipeableRef | null>(null);
  const closeSwipeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleToggleStatus = (status: OrderStatusType) => {
    const updatedStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter((selectedStatus) => selectedStatus !== status)
      : [...selectedStatuses, status];

    setSelectedStatuses(updatedStatuses);
    refresh();
  };

  const handleSwipeOpen = (index: number) => {
    const current = swipeableRefs.current[index];

    if (openSwipeableRef.current && openSwipeableRef.current !== current) {
      openSwipeableRef.current.close();
    }

    openSwipeableRef.current = current;

    if (closeSwipeTimeout.current) {
      clearTimeout(closeSwipeTimeout.current);
      closeSwipeTimeout.current = null;
    }

    closeSwipeTimeout.current = setTimeout(() => {
      openSwipeableRef.current?.close();
      openSwipeableRef.current = null;
      closeSwipeTimeout.current = null;
    }, 10000);
  };

  useEffect(() => {
    if (!isConnected) return;

    if (!selectedStatuses.length) {
      setSelectedStatuses(["processing"]);
    }

    loadOrdersByStatuses(true);

    return () => resetAll();
  }, [isConnected]);

  return (
    <ScreenWrapper hideStatusBarBorder>
      <Header
        title={t("screens.orders.header.title")}
        titleSize={18}
        style={[
          styles.header,
          {
            minHeight: 40,
          },
        ]}
      />

      <View>
        <FlatList
          data={orderStatusKeys.map((key) => ({ label: t(`common.orderStatus.${key}.title`), value: key as OrderStatusType }))}
          renderItem={({ item, index }) => {
            const isActive = selectedStatuses.includes(item.value);

            return (
              <TouchableOpacity
                onPress={() => handleToggleStatus(item.value)}
                style={[
                  styles.status,
                  {
                    backgroundColor: !isConnected
                      ? colors.grayTint7
                      : isActive
                        ? colors.orange
                        : colorOptions[index % colorOptions.length],
                    opacity: !isConnected ? 0.6 : 1,
                  },
                ]}
                disabled={!isConnected}
              >
                <Typography
                  fontSize={16}
                  fontWeight="medium"
                  color={isActive ? colors.white : colors.black}
                >
                  {item.label}
                </Typography>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.statusContainer,
            {
              paddingVertical: 10,
              paddingHorizontal: 15,
            },
          ]}
        />
      </View>

      <View style={styles.content}>
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
            message={t("common.messages.errorWithRetry.title")}
            subMessage={t("common.messages.errorWithRetry.subtitle")}
            buttonText={t("common.buttons.errorWithRetry")}
            onRetry={() => loadOrdersByStatuses(true)}
          />
        )}

        {isConnected && isEmpty && !isError && !isLoading && (
          <Empty
            message={t("screens.orders.messages.empty.title")}
            subMessage={t("screens.orders.messages.empty.subtitle")}
          />
        )}

        {isConnected && !isLoading && !isEmpty && !isError && (
          <FlatList
            data={orders}
            renderItem={({ item, index }) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 100)}
              >
                <OrderItem
                  ref={(ref) => {
                    if (ref) {
                      swipeableRefs.current[index] = ref;
                    }
                  }}
                  item={item}
                  onView={(orderId) => router.push(`/order/${orderId}`)}
                  onEdit={(orderId) => router.push(`/edit-order/${orderId}`)}
                  labels={{
                    quantity: t("components.orderItem.labels.quantity"),
                    cost: t("components.orderItem.labels.cost"),
                    date: t("components.orderItem.labels.date"),
                  }}
                  actionLabels={{
                    edit: t("components.orderItem.actions.edit"),
                  }}
                  onSwipeableOpen={() => handleSwipeOpen(index)}
                />
              </Animated.View>
            )}
            keyExtractor={(item) => item.id}
            numColumns={1}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingBottom: 15,
              gap: 10,
            }}
            refreshing={isRefreshing}
            onRefresh={refresh}
            onEndReached={ordersHasMore ? loadMore : undefined}
            onEndReachedThreshold={0.1}
            ListFooterComponent={isFetching ? <ListLoader /> : null}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    borderBottomColor: colors.grayTint7,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 10,
  },
  status: {
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  padded: {
    padding: 15,
  },
});

export default OrdersScreen;
