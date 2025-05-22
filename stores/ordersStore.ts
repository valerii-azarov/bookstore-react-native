import { create } from "zustand";
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import { ordersApi } from "@/api/ordersApi";
import { DEFAULT_ORDERS_LIMIT } from "@/constants/settings";
import { Order, OrderStatusType, StatusType, ResponseType } from "@/types";

interface OrdersStore {
  orders: Order[];
  ordersLastDoc: QueryDocumentSnapshot<DocumentData> | null;
  ordersStatus: StatusType;
  ordersResponse: ResponseType | null;
  ordersHasMore: boolean;
  selectedStatuses: OrderStatusType[];
  setSelectedStatuses: (statuses: OrderStatusType[]) => void;
  loadOrdersByStatuses: (reset?: boolean) => Promise<void>;
  loadMore: () => void;
  refresh: () => void;
  resetAll: () => void;
}

export const useOrdersStore = create<OrdersStore>((set, get) => ({
  orders: [],
  ordersLastDoc: null,
  ordersStatus: "idle",
  ordersResponse: null,
  ordersHasMore: false,
  selectedStatuses: [],

  setSelectedStatuses: (statuses: OrderStatusType[]) => {
    set({ selectedStatuses: statuses });
  },
  
  loadOrdersByStatuses: async (reset = false) => {
      if (get().ordersStatus === "fetching" || get().ordersStatus === "loading") return;
  
      set({
        ordersStatus: reset ? "loading" : "fetching",
        ordersResponse: null,
        ...(reset && { 
          categoryBooks: [],
          categoryLastDoc: null, 
          categoryHasMore: false
        }),
      });
        
      ordersApi
        .fetchOrdersByStatuses(
          get().selectedStatuses,
          reset ? null : get().ordersLastDoc,
          DEFAULT_ORDERS_LIMIT
        )
        .then(({ orders: newOrders, lastDoc: newLastDoc }) =>  
          set((state) => ({
            orders: reset ? newOrders : [...state.orders, ...newOrders],
            ordersLastDoc: newLastDoc,
            ordersHasMore: newOrders.length === DEFAULT_ORDERS_LIMIT,
            ordersResponse: { status: "success" },
            ordersStatus: "idle",
          }))
        )
        .catch((error) =>
          set((state) => ({
            orders: reset ? [] : state.orders,
            ordersLastDoc: reset ? null : state.ordersLastDoc,
            ordersHasMore: false,
            ordersResponse: { status: "error", message: error.message },
            ordersStatus: "idle",
          }))
        );
    },
  
    loadMore: () => {
      if (get().ordersHasMore && get().ordersStatus !== "fetching") {
        get().loadOrdersByStatuses();
      }
    },
  
    refresh: () => {
      get().loadOrdersByStatuses(true);
    },
  
    resetAll: () => {
      set({ 
        orders: [],
        ordersLastDoc: null,
        ordersStatus: "idle",
        ordersResponse: null,
        ordersHasMore: false,
        selectedStatuses: [],
      });
    },

}));
