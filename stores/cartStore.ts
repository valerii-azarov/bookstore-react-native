import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { cartHandler } from "@/helpers/cartHandler";
import { asyncStorage } from "@/storages/asyncStorage";
import { Book, CartBook } from "@/types";

interface CartStore {
  cartBooks: CartBook[];
  addToCart: (book: Book, quantity?: number) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  toggleCart: (book: Book, quantity?: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getDiscountAmount: () => number;
  getSubtotal: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartBooks: [],

        addToCart: (book: Book, quantity = 1) => {
          set((state) => {
            const existingBook = state.cartBooks.find((item) => item.id === book.id);
            const newQuantity = Math.min(quantity, book.availableQuantity);

            if (newQuantity <= 0) return state;

            if (existingBook) {
              return {
                cartBooks: state.cartBooks.map((item) =>
                  item.id === book.id
                    ? {
                        ...item, 
                        cartQuantity: Math.min(item.cartQuantity + newQuantity, book.availableQuantity),
                      }
                    : item
                ),
              };
            }

            return {
              cartBooks: [...state.cartBooks, { ...book, inCart: true, cartQuantity: newQuantity }],
            };
          });
        },

        removeFromCart: (bookId: string) => {
          set((state) => ({
            cartBooks: state.cartBooks.filter((item) => item.id !== bookId),
          }));
        },

        updateQuantity: (bookId: string, quantity: number) => {
          set((state) => {
            const book = state.cartBooks.find((item) => item.id === bookId);
            if (!book) return state;

            const newQuantity = Math.min(quantity, book.availableQuantity);
            if (newQuantity <= 0) {
              return {
                cartBooks: state.cartBooks.filter((item) => item.id !== bookId),
              };
            }

            return {
              cartBooks: state.cartBooks.map((item) =>
                item.id === bookId ? { ...item, cartQuantity: newQuantity } : item
              ),
            };
          });
        },

        toggleCart: (book: Book, quantity = 1) => {
          set((state) => {
            const isInCart = state.cartBooks.some((item) => item.id === book.id);

            if (isInCart) {
              return {
                cartBooks: state.cartBooks.filter((item) => item.id !== book.id),
              };
            }

            const newQuantity = Math.min(quantity, book.availableQuantity);
            if (newQuantity <= 0) {
              return state;
            }

            return {
              cartBooks: [...state.cartBooks, { ...book, inCart: true, cartQuantity: newQuantity }],
            };
          });
        },

        clearCart: () => {
          set({ cartBooks: [] });
        },

        getCartCount: () => {
          return get().cartBooks.length;
        },

        getDiscountAmount: () => {
          return get().cartBooks.reduce((total, book) => {
            const price = cartHandler.calculatePrice(book);
            const itemDiscount = (book.originalPrice - price) * book.cartQuantity;
            
            return total + itemDiscount;
          }, 0);
        },

        getSubtotal: () => {
          return get().cartBooks.reduce((total, book) => {
            return total + book.originalPrice * book.cartQuantity;
          }, 0);
        },

        getTotal: () => {
          const subtotal = get().getSubtotal();
          const discount = get().getDiscountAmount();

          return subtotal - discount;
        },
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => asyncStorage),
        partialize: (state) => ({
          cartBooks: state.cartBooks,
        }),
      }
    ),
    { name: "CartStore" }
  )
);
