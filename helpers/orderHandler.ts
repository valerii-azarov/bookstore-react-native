import { format } from "date-fns";
import { Order, OrderHistoryByDate, OrderStateType, OrderStatusStyle, TimelineType, TimelineStep } from "@/types";

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
        label: t("orderStatuses.titles.pending"),
        backgroundColor: "#FFB300",
      },
      processing: {
        label: t("orderStatuses.titles.processing"),
        backgroundColor: "#FF5722",
      },
      shipped: {
        label: t("orderStatuses.titles.shipped"),
        backgroundColor: "#0288D1",
      },
      delivered: {
        label: t("orderStatuses.titles.delivered"),
        backgroundColor: "#81C784",
      },
      received: {
        label: t("orderStatuses.titles.received"),
        backgroundColor: "#388E3C",
      },
    };

    return statusMap[status];
  },

  getOrderTimelineSteps: <T extends OrderStateType>(currentState: T, t: (key: string) => string): TimelineStep<T>[] => {
    const statusMap: Record<OrderStateType, TimelineType> = {
      pending: {
        title: t("orderStatuses.titles.pending"),
        subtitle: t("orderStatuses.subtitles.pending"),
        iconSet: "Ionicons",
        iconName: "time-outline",
      },
      processing: {
        title: t("orderStatuses.titles.processing"),
        subtitle: t("orderStatuses.subtitles.processing"),
        iconSet: "Feather",
        iconName: "box",
      },
      shipped: {
        title: t("orderStatuses.titles.shipped"),
        subtitle: t("orderStatuses.subtitles.shipped"),
        iconSet: "MaterialIcons",
        iconName: "local-shipping",
      },
      delivered: {
        title: t("orderStatuses.titles.delivered"),
        subtitle: t("orderStatuses.subtitles.delivered"),
        iconSet: "Feather",
        iconName: "package",
      },
      received: {
        title: t("orderStatuses.titles.received"),
        subtitle: t("orderStatuses.subtitles.received"),
        iconSet: "Ionicons",
        iconName: "checkmark-circle-outline",
      },
    };
  
    const stateKeys = Object.keys(statusMap) as OrderStateType[];
    const currentStateIndex = stateKeys.indexOf(currentState);
  
    return stateKeys.map((state, index) => ({
      ...statusMap[state],
      completed: index <= currentStateIndex,
      state: state as T,
    }));
  },
};
