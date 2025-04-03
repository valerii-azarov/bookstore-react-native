import { create } from "zustand";
import { ordersApi } from "@/api/ordersApi";
import { messageHandler } from "@/helpers/messageHandler";
import { Order, OrderCreation, OrderFormValues, OrderStatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useCartStore } from "./cartStore";
import { useOrdersStore } from "./ordersStore";

interface OrderStore {
  order: Order | null;
  orderStatus: OrderStatusType;
  orderResponse: ResponseType | null;
  createOrder: (formValues: OrderFormValues, bookIds: string[]) => Promise<void>;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  order: null,
  orderStatus: "idle",
  orderResponse: null,

  createOrder: async (formValues: OrderFormValues, bookIds: string[]) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    set({ orderStatus: "creating", orderResponse: null });

    const orderData: OrderCreation = {
      bookIds,
      status: "pending",
      paymentMethod: formValues.paymentMethod,
      isPaid: formValues.paymentMethod === "card",
      customer: {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        middleName: formValues.middleName || undefined,
        phoneNumber: formValues.phoneNumber,
      },
      delivery: {
        city: formValues.city,
        warehouse: formValues.warehouse,
      },
    };

    ordersApi.createOrder(userId, orderData)
      .then((order) => {
        set({
          orderStatus: "idle",
          orderResponse: { status: "success" },
        });
        useOrdersStore.setState((state) => ({
          orders: [order, ...state.orders],
        }));
        useCartStore.getState().clearCart();
      })
      .catch((error) =>
        set({
          orderResponse: {
            status: "error",
            message: messageHandler.getErrorMessage(error, {
              "users/user-not-found": "users.userNotFound",
              "orders/created-order-not-found": "orders.createdOrderNotFound",
            }),
          },
        })
      )
      .finally(() => set({ orderStatus: "idle" }));
  },

  resetOrder: () => {
    set({ orderStatus: "idle", orderResponse: null });
  },

}));
