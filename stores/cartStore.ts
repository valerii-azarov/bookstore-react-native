import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { asyncStorage } from "@/storages/asyncStorage"; // import { mmkvStorage } from "@/storages/mmkvStorage";
import { Book } from "@/types";

interface CartStore {
  cartBooks: Book[];
  toggleCart: (book: Book, quantity?: number) => void;
  getCartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartBooks: [],

        toggleCart: (book: Book, quantity = 1) => {
          set((state) => {
            const isInCart = state.cartBooks.some((item) => item.id === book.id);

            if (isInCart) {
              return {
                cartBooks: state.cartBooks.filter((item) => item.id !== book.id),
              };
            }

            const newQuantity = Math.min(quantity, book.quantity);
            if (newQuantity <= 0) {
              return state;
            }

            return {
              cartBooks: [...state.cartBooks, { ...book, inCart: true, quantity: newQuantity }],
            };
          });
        },

        getCartCount: () => {
          return get().cartBooks.length;
        },
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => asyncStorage),
      }
    ),
    { name: "CartStore" }
  )
);
