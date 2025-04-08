import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { orderHistoryApi } from "@/api/orderHistoryApi";
import { orderHandler } from "@/helpers/orderHandler";
import { USER_ORDER_HISTORY_PAGE_SIZE } from "@/constants/settings";
import { OrderHistoryByDate, OrdersStatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";

interface OrderHistoryStore {
  orderHistory: OrderHistoryByDate[];
  orderHistoryLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  orderHistoryStatus: OrdersStatusType;
  orderHistoryResponse: ResponseType | null;
  orderHistoryHasMore: boolean;
  loadOrderHistory: (reset?: boolean) => Promise<void>;
  loadMoreOrderHistory: () => void;
  refreshOrderHistory: () => void;
  resetOrderHistory: () => void;
}

export const useOrderHistoryStore = create<OrderHistoryStore>((set, get) => ({
  orderHistory: [],
  orderHistoryLastDoc: null,
  orderHistoryStatus: "idle",
  orderHistoryResponse: null,
  orderHistoryHasMore: true,

  loadOrderHistory: async (reset = false) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    const { orderHistory, orderHistoryLastDoc } = get();

    set({
      orderHistoryStatus: reset || orderHistory.length === 0 ? "loading" : "fetching",
      orderHistoryResponse: null,
    });

    orderHistoryApi
      .fetchOrderHistory(
        userId,
        reset ? null : orderHistoryLastDoc,
        USER_ORDER_HISTORY_PAGE_SIZE
      )
      .then(({ orders: newOrders, lastDoc: newLastDoc }) => 
        set((state) => ({
          orderHistory: orderHandler.groupOrdersByDate(reset ? [] : state.orderHistory, newOrders),
          orderHistoryLastDoc: newLastDoc,
          orderHistoryHasMore: newOrders.length === USER_ORDER_HISTORY_PAGE_SIZE,
          orderHistoryResponse: { status: "success" },
          orderHistoryStatus: "idle",
        }))
      )
      .catch((error) =>
        set((state) => ({
          orderHistory: reset ? [] : state.orderHistory,
          orderHistoryLastDoc: reset ? null : state.orderHistoryLastDoc,
          orderHistoryHasMore: reset ? true : state.orderHistoryHasMore,
          orderHistoryResponse: { status: "error", message: error.message },
          orderHistoryStatus: "idle",
        }))
      );
  },

  loadMoreOrderHistory: () => {
    if (get().orderHistoryHasMore && get().orderHistoryStatus === "idle") {
      get().loadOrderHistory();
    }
  },

  refreshOrderHistory: () => {
    if (get().orderHistoryStatus === "refreshing") return;

    set({ orderHistoryStatus: "refreshing" });
    get().loadOrderHistory(true);
  },

  resetOrderHistory: () => {
    set({
      orderHistory: [],
      orderHistoryLastDoc: null,
      orderHistoryStatus: "idle",
      orderHistoryResponse: null,
      orderHistoryHasMore: true,
    });
  },
  
}));
