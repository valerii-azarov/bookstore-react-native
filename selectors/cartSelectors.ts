import { useCartStore } from "@/stores/cartStore";

type CartStoreType = ReturnType<typeof useCartStore.getState>;

export const selectCartBooks = (state: CartStoreType) => state.cartBooks;

export const selectToggleCart = (state: CartStoreType) => state.toggleCart;
export const selectGetCartCount = (state: CartStoreType) => state.getCartCount;
