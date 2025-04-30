import { create } from "zustand";
import { orderApi } from "@/api/orderApi";
import { cartHandler } from "@/helpers/cartHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Order, OrderCreation, OrderReceiptCreation, OrderFormValues, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useCartStore } from "./cartStore";
// import { useOrdersStore } from "./ordersUserStore";

interface OrderStore {
  order: Order | null;
  orderId: string;
  orderStatus: StatusType;
  orderResponse: ResponseType | null;
  setOrderById: (id: string) => void;
  loadOrderById: () => Promise<void>;
  createOrder: (formValues: OrderFormValues) => Promise<void>;
  resetOrder: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  order: null,
  orderId: "",
  orderStatus: "idle",
  orderResponse: null,

  setOrderById: (id: string) => {
    set({ orderId: id });
  },

  loadOrderById: async () => {
    const orderId = get().orderId;
    if (!orderId) return;

    set({ orderStatus: "loading", orderResponse: null });
    
    orderApi
      .fetchOrderById(orderId)
      .then((order) =>
        set({
          order,
          orderResponse: { status: "success" },
          orderStatus: "idle",
        })
      )
      .catch((error) => {
        set({
          order: null,
          orderResponse: { status: "error", message: error.message },
          orderStatus: "idle",
        });
      });
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
      status: "processing",
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
          orderResponse: { status: "success" },
          orderStatus: "idle",
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
          orderStatus: "idle",
        })
      );
  },

  resetOrder: () => {
    set({ 
      order: null,
      orderId: "",
      orderStatus: "idle",
      orderResponse: null,
    });
  },

}));
