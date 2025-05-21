import { format } from "date-fns";
import { Order, OrderHistoryByDate, OrderStatusType, OrderStatusStyle, TimelineType, TimelineStep } from "@/types";

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

  getOrderStatusStyle: (status: OrderStatusType, t: (key: string) => string): OrderStatusStyle => {
    const statusMap: Record<OrderStatusType, OrderStatusStyle> = {
      processing: {
        label: t("common.orderStatus.processing.title"),
        backgroundColor: "#FFB300",
      },
      shipped: {
        label: t("common.orderStatus.shipped.title"),
        backgroundColor: "#FF5722",
      },
      delivered: {
        label: t("common.orderStatus.delivered.title"),
        backgroundColor: "#0288D1",
      },
      received: {
        label: t("common.orderStatus.received.title"),
        backgroundColor: "#388E3C",
      },
    };

    return statusMap[status];
  },

  getOrderTimelineSteps: <T extends OrderStatusType>(currentState: T, t: (key: string) => string): TimelineStep<T>[] => {
    const statusMap: Record<OrderStatusType, TimelineType> = {
      processing: {
        title: t("common.orderStatus.processing.title"),
        subtitle: t("common.orderStatus.processing.subtitle"),
        iconSet: "Feather",
        iconName: "box",
      },
      shipped: {
        title: t("common.orderStatus.shipped.title"),
        subtitle: t("common.orderStatus.shipped.subtitle"),
        iconSet: "MaterialIcons",
        iconName: "local-shipping",
      },
      delivered: {
        title: t("common.orderStatus.delivered.title"),
        subtitle: t("common.orderStatus.delivered.subtitle"),
        iconSet: "Feather",
        iconName: "package",
      },
      received: {
        title: t("common.orderStatus.received.title"),
        subtitle: t("common.orderStatus.received.subtitle"),
        iconSet: "Ionicons",
        iconName: "checkmark-circle-outline",
      },
    };
  
    const stateKeys = Object.keys(statusMap) as OrderStatusType[];
    const currentStateIndex = stateKeys.indexOf(currentState);
  
    return stateKeys.map((state, index) => ({
      ...statusMap[state],
      completed: index <= currentStateIndex,
      state: state as T,
    }));
  },
};
