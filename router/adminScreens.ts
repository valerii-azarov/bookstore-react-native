import { ScreenConfig } from "./appScreens";

export const adminScreens: ScreenConfig[] = [
  // books
  { name: "(admin)/(tabs)", disableGesture: true },
  { name: "(admin)/books-search" },
  { name: "(admin)/book/[bookId]" },
  { name: "(admin)/book-settings/[bookId]" },
  {
    name: "(admin)/(modals)/create-book",
    isTransparent: true,
    disableGesture: true,
  },
  { name: "(admin)/(modals)/book-characteristics", isModal: true },
  { name: "(admin)/(modals)/book-description", isModal: true },
  {
    name: "(admin)/(modals)/edit-book/[field]",
    isModal: true,
    disableGesture: true,
  },

  // orders
  { name: "(admin)/order/[orderId]" },
  {
    name: "(admin)/(modals)/edit-order/[orderId]",
    isModal: true,
    disableGesture: true,
  },
];
