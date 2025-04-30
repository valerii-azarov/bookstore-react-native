import { create } from "zustand";
import { Order } from "@/types";

interface OrdersStore {
  orders: Order[];
  resetOrders: () => void;
}

export const useOrdersStore = create<OrdersStore>((set) => ({
  orders: [],
  
  resetOrders: () => {
    set({ orders: [] });
  },
}));
