import { create } from "zustand";
import { orderApi } from "@/api/orderApi";
import { cartHandler } from "@/helpers/cartHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Order, OrderCreation, OrderReceiptCreation, OrderFormValues, OrderStatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useCartStore } from "./cartStore";
// import { useOrdersStore } from "./ordersUserStore";

interface OrderStore {
  order: Order | null;
  orderStatus: OrderStatusType;
  orderResponse: ResponseType | null;
  loadOrderById: (orderId: string) => Promise<void>;
  createOrder: (formValues: OrderFormValues) => Promise<void>;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  order: null,
  orderStatus: "idle",
  orderResponse: null,

  loadOrderById: async (orderId: string) => {
    set({ orderStatus: "loading", orderResponse: null });
    
    orderApi.fetchOrderById(orderId)
      .then((order) =>
        set({
          order,
          orderStatus: "idle",
          orderResponse: { status: "success" },
        })
      )
      .catch((error) => {
        set({
          order: null,
          orderResponse: { status: "error", message: error.message },
        });
      })
      .finally(() => set({ orderStatus: "idle" }));
  },

  createOrder: async (formValues: OrderFormValues) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    const cartBooks = useCartStore.getState().cartBooks;
    if (!cartBooks || cartBooks.length === 0) return;

    set({ orderStatus: "creating", orderResponse: null });
    
    const orderData: OrderCreation = {
      books: cartBooks.map(({ id, title, authors, cartQuantity, price, originalPrice, coverImage }) => ({
        bookId: id,
        title,
        authors,
        quantity: cartQuantity,
        price,
        originalPrice,
        coverImage,
      })),
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
      subtotal: useCartStore.getState().getSubtotal(),
      discountAmount: useCartStore.getState().getDiscountAmount(),
      total: useCartStore.getState().getTotal(),
    };

    const receiptData: OrderReceiptCreation = {
      books: orderData.books.map(({ title, quantity, price, originalPrice }) => ({
        title,
        quantity,
        price,
        originalPrice,
        total: cartHandler.roundToTwo(price * quantity),
      })),
      subtotal: orderData.subtotal,
      discountAmount: orderData.discountAmount,
      total: orderData.total,
      paymentMethod: orderData.paymentMethod,
    };

    orderApi.createOrder(userId, orderData, receiptData)
      .then((order) => {
        set({
          orderStatus: "idle",
          orderResponse: { status: "success" },
        });
        // useOrdersStore.setState((state) => ({
        //   orders: [order, ...state.orders],
        // }));
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
