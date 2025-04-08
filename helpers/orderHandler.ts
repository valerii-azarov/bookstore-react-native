import { format } from "date-fns";
import { Order, OrderHistoryByDate, OrderStateType, OrderStatusStyle } from "@/types";

export const orderHandler = {
  groupOrdersByDate: (existing: OrderHistoryByDate[] = [], incoming: Order[] = []): OrderHistoryByDate[] => {
    const grouped: Record<string, Order[]> = {
      ...Object.fromEntries(existing.map(({ date, orders }) => [date, orders])),
    };

    incoming.forEach((order) => {
      const date = format(new Date(order.createdAt), "yyyy-MM-dd");
      
      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(order);
    });

    return Object.entries(grouped).map(([date, orders]) => ({ date, orders }));
  },

  getOrderStatusStyle: (status: OrderStateType, t: (key: string) => string): OrderStatusStyle => {
    const statusMap: Record<OrderStateType, OrderStatusStyle> = {
      pending: {
        label: t("orderStatuses.pending"),
        backgroundColor: "#FFB300",
      },
      processing: {
        label: t("orderStatuses.processing"),
        backgroundColor: "#FF5722",
      },
      shipped: {
        label: t("orderStatuses.shipped"),
        backgroundColor: "#0288D1",
      },
      delivered: {
        label: t("orderStatuses.delivered"),
        backgroundColor: "#81C784",
      },
      received: {
        label: t("orderStatuses.received"),
        backgroundColor: "#388E3C",
      },
      cancelled: {
        label: t("orderStatuses.cancelled"),
        backgroundColor: "#D32F2F",
      },
      returned: {
        label: t("orderStatuses.returned"),
        backgroundColor: "#F06292",
      },
    };

    return statusMap[status];
  },
};
