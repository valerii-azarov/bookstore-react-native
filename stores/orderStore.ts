import { create } from "zustand";
import { orderApi } from "@/api/orderApi";
import { cartHandler } from "@/helpers/cartHandler";
import { messageHandler } from "@/helpers/messageHandler";
import { Order, OrderStatusType, OrderCreation, OrderReceiptCreation, OrderFormValues, StatusType, ResponseType } from "@/types";

import { useAuthStore } from "./authStore";
import { useCartStore } from "./cartStore";
import { useOrdersStore } from "./ordersStore";

type OrderOperation = "fetch" | "create" | "updateStatus";

type OrderOperationState = {
  status: StatusType;
  response: ResponseType | null;
};

interface OrderStore {
  orderId: string;
  currentOrder: Order | null;
  orderOperations: Record<OrderOperation, OrderOperationState>;
  setOrderById: (id: string) => void;
  loadOrderById: () => Promise<void>;
  createOrder: (formValues: OrderFormValues) => Promise<void>;
  updateStatus: (orderId: string, status: OrderStatusType) => Promise<void>;
  setOrderOperationState: (op: OrderOperation, state: Partial<OrderOperationState>) => void;
  resetOrderOperationState: (op: OrderOperation) => void;
  resetCurrentOrder: () => void;
  resetAll: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orderId: "",
  currentOrder: null,
  orderOperations: {
    fetch: { status: "idle", response: null },
    create: { status: "idle", response: null },
    updateStatus: { status: "idle", response: null },
  },

  setOrderById: (id: string) => {
    set({ orderId: id });
  },

  loadOrderById: async () => {
    const orderId = get().orderId;
    if (!orderId) return;

    set((state) => ({
      orderOperations: {
        ...state.orderOperations,
        fetch: { status: "loading", response: null },
      },
    }));
    
    orderApi
      .fetchOrderById(orderId)
      .then((order) =>
        set((state) => ({
          currentOrder: order,
          orderOperations: {
            ...state.orderOperations,
            fetch: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }))
      )
      .catch((error) =>
        set((state) => ({
          currentOrder: null,
          orderOperations: {
            ...state.orderOperations,
            fetch: {
              status: "idle",
              response: { status: "error", message: error.message },
            },
          },
        }))
      );
  },

  createOrder: async (formValues: OrderFormValues) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    const cartBooks = useCartStore.getState().cartBooks;
    if (!cartBooks || cartBooks.length === 0) return;

    set((state) => ({
      orderOperations: {
        ...state.orderOperations,
        create: { status: "creating", response: null },
      },
    }));
    
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
        set((state) => ({
          orderOperations: {
            ...state.orderOperations,
            create: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }));
        // useOrdersStore.setState((state) => ({
        //   orders: [order, ...state.orders],
        // }));
        useCartStore.getState().clearCart();
      })
      .catch((error) =>
        set((state) => ({
          orderOperations: {
            ...state.orderOperations,
            create: {
              status: "idle",
              response: { 
                status: "error", 
                message: messageHandler.getErrorMessage(
                  error.message, 
                  {
                    "users/user-not-found": "users.userNotFound",
                    "orders/created-order-not-found": "orders.createdOrderNotFound",
                  }
                ),
              },
            },
          },
        }))
      );
  },

  updateStatus: async (orderId: string, newStatus: OrderStatusType) => {
    if (get().currentOrder?.status === newStatus) return;
    
    set((state) => ({
      orderOperations: {
        ...state.orderOperations,
        updateStatus: { status: "updating", response: null },
      },
    }));

    orderApi
      .updateOrderStatus(orderId, newStatus)
      .then((updatedOrder) => {
        set((state) => ({
          currentOrder: updatedOrder,
          orderOperations: {
            ...state.orderOperations,
            updateStatus: {
              status: "idle",
              response: { status: "success" },
            },
          },
        }));
        useOrdersStore.setState((state) => ({
          orders: state.orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
          ),
        }));
      })
      .catch((error) =>
        set((state) => ({
          orderOperations: {
            ...state.orderOperations,
            updateStatus: {
              status: "idle",
              response: { 
                status: "error", 
                message: messageHandler.getErrorMessage(
                  error.message, 
                  {
                    "orders/order-not-found-after-update": "orders.orderNotFoundAfterUpdate",
                  }
                ),
              },
            },
          },
        }))
      );
  },

  setOrderOperationState: (op, stateUpdate) => {
    set((state) => ({
      orderOperations: {
        ...state.orderOperations,
        [op]: { ...state.orderOperations[op], ...stateUpdate },
      },
    }));
  },
  
  resetOrderOperationState: (op) => {
    set((state) => ({
      orderOperations: {
        ...state.orderOperations,
        [op]: { status: "idle", response: null },
      },
    }));
  },

  resetCurrentOrder: () => {
    set((state) => ({
      orderId: "",
      currentOrder: null,
      orderOperations: {
        ...state.orderOperations,
        fetch: { status: "idle", response: null },
      },
    }));
  },  

  resetAll: () => {
    set({
      orderId: "",
      currentOrder: null,
      orderOperations: {
        fetch: { status: "idle", response: null },
        create: { status: "idle", response: null },
        updateStatus: { status: "idle", response: null },
      },
    });
  },

}));
