import { useCartStore } from "@/stores/cartStore";

type CartStoreType = ReturnType<typeof useCartStore.getState>;

export const selectCartBooks = (state: CartStoreType) => state.cartBooks;

export const selectAddToCart = (state: CartStoreType) => state.addToCart;
export const selectRemoveFromCart = (state: CartStoreType) => state.removeFromCart;
export const selectUpdateQuantity = (state: CartStoreType) => state.updateQuantity;
export const selectToggleCart = (state: CartStoreType) => state.toggleCart;
export const selectClearCart = (state: CartStoreType) => state.clearCart;

export const selectGetCartCount = (state: CartStoreType) => state.getCartCount;
export const selectGetDiscountAmount = (state: CartStoreType) => state.getDiscountAmount;
export const selectGetSubtotal = (state: CartStoreType) => state.getSubtotal;
export const selectGetTotal = (state: CartStoreType) => state.getTotal;
