import { useOrderHistoryStore } from "@/stores/orderHistoryStore";

type OrderHistoryStoreType = ReturnType<typeof useOrderHistoryStore.getState>;

export const selectOrderHistory = (state: OrderHistoryStoreType) => state.orderHistory;
export const selectOrderHistoryLastDoc = (state: OrderHistoryStoreType) => state.orderHistoryLastDoc;
export const selectOrderHistoryStatus = (state: OrderHistoryStoreType) => state.orderHistoryStatus;
export const selectOrderHistoryResponse = (state: OrderHistoryStoreType) => state.orderHistoryResponse;
export const selectOrderHistoryHasMore = (state: OrderHistoryStoreType) => state.orderHistoryHasMore;

export const selectLoadOrderHistory = (state: OrderHistoryStoreType) => state.loadOrderHistory;
export const selectLoadMoreOrderHistory = (state: OrderHistoryStoreType) => state.loadMoreOrderHistory;
export const selectRefreshOrderHistory = (state: OrderHistoryStoreType) => state.refreshOrderHistory;
export const selectResetOrderHistory = (state: OrderHistoryStoreType) => state.resetOrderHistory;
