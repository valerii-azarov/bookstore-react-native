import { ScreenConfig } from "./appScreens";

export const userScreens: ScreenConfig[] = [
  // books
  { name: "(user)/(tabs)", disableGesture: true },
  { name: "(user)/category-books/[category]" },
  { name: "(user)/books-search" },
  { name: "(user)/book/[bookId]" },
  { name: "(user)/(modals)/book-characteristics", isModal: true },
  { name: "(user)/(modals)/book-description", isModal: true },

  // orders
  { name: "(user)/order/[orderId]" },
  { name: "(user)/(modals)/order-status/[state]", isModal: true },
  { name: "(user)/(modals)/order-receipt/[receiptId]", isModal: true },
  {
    name: "(user)/(modals)/cart",
    isModal: true,
    disableGesture: true,
  },
  {
    name: "(user)/(modals)/checkout",
    isModal: true,
    disableGesture: true,
  },

  // menu
  { name: "(user)/profile" },
  {
    name: "(user)/(modals)/edit-profile/[field]",
    isModal: true,
    disableGesture: true,
  },
  { name: "(user)/favorites" },
  { name: "(user)/viewing-history" },
];
