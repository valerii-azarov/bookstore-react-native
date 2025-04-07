import { format } from "date-fns";
import { Order, OrderHistoryByDate } from "@/types";

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
};
