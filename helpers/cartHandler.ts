import { Cart } from "@/types";

export const cartHandler = {
  getDiscountedPrice: (book: Cart): number => {
    const basePrice = book.originalPrice;
    const discountedPrice = book.discount > 0 ? basePrice * (1 - book.discount / 100) : basePrice;

    return book.price === discountedPrice ? book.price : discountedPrice;
  },

  roundToTwo: (value: number): number => Math.round(value * 100) / 100,
};
